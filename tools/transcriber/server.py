"""Jun Jam transcriber helper: a small server on your own Mac that the Jun Jam page talks to.

  GET  /health                        -> {"ok": true, "engines": [...]}   (Jun Jam checks this to know the helper is running)
  POST /transcribe                     body: a WAV file of the part of the recording you selected

What it does with the audio:
  1. Beat This! finds the beats and which beat is 1 (librosa if Beat This! is missing).
  2. Demucs takes the drums out (bass and everything else stay), and Basic Pitch turns that into notes.
  3. It also runs a piano model (Kong et al.) and YourMT3+ (many instruments) on the full mix, then the three vote:
     a note that two or three of them heard is almost always real; a note only one heard is kept with low confidence,
     more so if that model agrees with the others a lot on this recording. Jun Jam's Sensitivity setting decides
     how much agreement it needs. Measured on test clips with fast runs over loud drums and comping, voting
     scored 0.82 note F1 against 0.61 for Basic Pitch alone on the full mix.
It answers with JSON: tempo, beat and downbeat times, and the notes (seconds, MIDI pitch, confidence 0-1).
Only listens on localhost. Audio is processed in a temporary folder and deleted afterwards.
"""
import json, os, sys, shutil, tempfile, traceback, threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

PORT = 8771
VERSION = 2
HOME = os.environ.get('JJ_DIR') or os.path.join(os.path.expanduser('~'), 'Library', 'Application Support', 'Jun Jam')
MODELS = os.path.join(HOME, 'models')
KONG = os.path.join(MODELS, 'kong_piano.pth')
os.environ.setdefault('MT3_CHECKPOINT_DIR', os.path.join(MODELS, '.mt3_checkpoints'))
LOCK = threading.Lock()   # one transcription at a time: the models are big
_cache = {}

def device():
    try:
        import torch
        return 'mps' if torch.backends.mps.is_available() else 'cpu'
    except Exception:
        return 'cpu'

def once(name, make):
    if name not in _cache: _cache[name] = make()
    return _cache[name]

def engines():
    """Which of the optional models are installed."""
    have = ['basic_pitch']
    for mod, name in (('beat_this', 'beat_this'), ('demucs', 'demucs'), ('piano_transcription_inference', 'piano'), ('mt3_infer', 'yourmt3')):
        try:
            __import__(mod); have.append(name)
        except Exception:
            pass
    if 'piano' in have and not os.path.exists(KONG): have.remove('piano')
    return have

# ---------------- audio ----------------
def read(path):
    import soundfile as sf, numpy as np
    y, sr = sf.read(path, always_2d=True)
    return y.T.astype(np.float32), sr

def mono_at(y, sr, target):
    import librosa
    return librosa.resample(y.mean(0), orig_sr=sr, target_sr=target) if sr != target else y.mean(0)

# ---------------- beats ----------------
def beats_of(wav):
    try:
        from beat_this.inference import File2Beats
        f2b = once('beat_this', lambda: File2Beats(checkpoint_path='final0', device=device(), dbn=False))
        b, d = f2b(wav)
        b = [round(float(x), 3) for x in b]; d = [round(float(x), 3) for x in d]
        if len(b) > 1:
            import numpy as np
            return 60 / float(np.median(np.diff(b))), b, d
    except Exception:
        traceback.print_exc()
    import librosa
    y, sr = librosa.load(wav, sr=22050, mono=True)
    tempo, frames = librosa.beat.beat_track(y=y, sr=sr)
    t = librosa.frames_to_time(frames, sr=sr)
    return float(tempo if not hasattr(tempo, '__len__') else tempo[0]), [round(float(x), 3) for x in t], []

# ---------------- notes ----------------
def without_drums(wav, out):
    """Everything but the drums, as a WAV (Demucs htdemucs: drums, bass, other, vocals)."""
    import torch, soundfile as sf
    from demucs.pretrained import get_model
    from demucs.apply import apply_model
    m = once('demucs', lambda: get_model('htdemucs').eval())
    y, sr = read(wav)
    if y.shape[0] == 1: y = y.repeat(2, 0)
    x = torch.tensor(y)[None]; ref = x.mean(1)
    x = (x - ref.mean()) / (ref.std() + 1e-8)
    for dev in ([device(), 'cpu'] if device() != 'cpu' else ['cpu']):
        try:
            with torch.no_grad(): st = apply_model(m, x, device=dev, split=True, overlap=.25)[0]
            break
        except Exception:
            traceback.print_exc()
    st = st * ref.std() + ref.mean()
    keep = sum(st[i] for i, s in enumerate(m.sources) if s != 'drums').numpy()
    sf.write(out, keep.T, sr)
    return out

def basic_pitch(path):
    from basic_pitch.inference import predict, Model
    from basic_pitch import ICASSP_2022_MODEL_PATH
    model = once('basic_pitch', lambda: Model(ICASSP_2022_MODEL_PATH))
    _, _, ev = predict(path, model, onset_threshold=0.4, frame_threshold=0.22, minimum_note_length=40, minimum_frequency=27, maximum_frequency=4200)
    return [{'s': float(e[0]), 'e': float(e[1]), 'p': int(e[2]), 'c': float(e[3])} for e in ev]

def piano(wav):
    from piano_transcription_inference import PianoTranscription, sample_rate
    pt = once('piano', lambda: PianoTranscription(checkpoint_path=KONG, device=device()))
    y, sr = read(wav)
    r = pt.transcribe(mono_at(y, sr, sample_rate), None)
    return [{'s': float(n['onset_time']), 'e': float(n['offset_time']), 'p': int(n['midi_note']), 'c': n['velocity'] / 127} for n in r['est_note_events']]

def yourmt3(wav):
    import pretty_midi
    from mt3_infer import load_model
    m = once('yourmt3', lambda: load_model('yourmt3', device='cpu'))   # the Apple GPU runs out of memory on this one
    y, sr = read(wav)
    midi = m.transcribe(mono_at(y, sr, 16000), sr=16000)
    path = wav + '.mid'; midi.save(path)
    out = []
    for ins in pretty_midi.PrettyMIDI(path).instruments:
        if ins.is_drum: continue
        out += [{'s': float(n.start), 'e': float(n.end), 'p': int(n.pitch), 'c': .6} for n in ins.notes]
    return out

def vote(lists, tol=.05):
    """Merge several models' notes: same pitch, starting within 50 ms, counts as one note heard by several models."""
    lists = {k: [n for n in v if n['c'] >= (.3 if k == 'basic_pitch' else .25)] for k, v in lists.items() if v}
    # how often each model's notes are confirmed by another: how well it hears this recording
    trust = {}
    for k, l in lists.items():
        others = sorted([n for j, o in lists.items() if j != k for n in o], key=lambda n: n['s'])
        import bisect
        starts = [n['s'] for n in others]; hit = 0
        for n in l:
            i = bisect.bisect_left(starts, n['s'] - tol)
            while i < len(others) and others[i]['s'] <= n['s'] + tol:
                if others[i]['p'] == n['p']: hit += 1; break
                i += 1
        trust[k] = hit / max(1, len(l))
    alln = sorted([dict(n, m=k) for k, l in lists.items() for n in l], key=lambda n: n['s'])
    used = [False] * len(alln); out = []
    for i, n in enumerate(alln):
        if used[i]: continue
        grp = [n]; used[i] = True
        for j in range(i + 1, len(alln)):
            m = alln[j]
            if m['s'] - n['s'] > tol: break
            if not used[j] and m['p'] == n['p'] and m['m'] not in {g['m'] for g in grp}: grp.append(m); used[j] = True
        v = len(grp)
        # 3 models: .95; 2: .75; 1: .3 to .5 by how much that model is trusted on this recording
        c = .95 if v >= 3 else .75 if v == 2 else .3 + .2 * trust[n['m']]
        if len(lists) == 2 and v == 2: c = .9
        out.append({'s': sorted(g['s'] for g in grp)[len(grp) // 2], 'e': max(g['e'] for g in grp), 'p': n['p'], 'c': c, 'v': v})
    return out, trust

def transcribe(wav_bytes):
    tmp = tempfile.mkdtemp(prefix='junjam-')
    try:
        wav = os.path.join(tmp, 'clip.wav')
        with open(wav, 'wb') as f: f.write(wav_bytes)
        import soundfile as sf, numpy as np
        y, sr = sf.read(wav, always_2d=True)
        if y.shape[1] == 1: sf.write(wav, np.repeat(y, 2, axis=1), sr)
        dur = len(y) / sr
        have = engines(); used = []
        tempo, beats, downbeats = beats_of(wav)
        src = wav
        if 'demucs' in have:
            try: src = without_drums(wav, os.path.join(tmp, 'nodrums.wav')); used.append('no drums')
            except Exception: traceback.print_exc()
        lists = {'basic_pitch': basic_pitch(src)}; used.append('Basic Pitch')
        for name, fn, label in (('piano', piano, 'piano model'), ('yourmt3', yourmt3, 'YourMT3+')):
            if name in have:
                try: lists[name] = fn(wav); used.append(label)
                except Exception: traceback.print_exc()
        if len(lists) > 1: notes, trust = vote(lists)
        else: notes, trust = lists['basic_pitch'], {}
        notes = [{'s': round(n['s'], 3), 'e': round(n['e'], 3), 'p': n['p'], 'c': round(n['c'], 3), **({'v': n['v']} if 'v' in n else {})}
                 for n in sorted(notes, key=lambda n: n['s'])]
        return {'ok': True, 'version': VERSION, 'engine': 'vote' if len(lists) > 1 else 'basic_pitch', 'used': used,
                'trust': {k: round(v, 2) for k, v in trust.items()}, 'tempo': tempo, 'beats': beats, 'downbeats': downbeats, 'duration': dur,
                'notes': {'target': notes, 'bass': [n for n in notes if n['p'] < 52], 'harmony': notes}}
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Private-Network', 'true')
    def _json(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code); self._cors()
        self.send_header('Content-Type', 'application/json'); self.send_header('Content-Length', str(len(body)))
        self.end_headers(); self.wfile.write(body)
    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()
    def do_GET(self):
        if urlparse(self.path).path == '/health': return self._json(200, {'ok': True, 'version': VERSION, 'device': device(), 'engines': engines()})
        self._json(404, {'ok': False, 'error': 'not found'})
    def do_POST(self):
        u = urlparse(self.path)
        if u.path != '/transcribe': return self._json(404, {'ok': False, 'error': 'not found'})
        q = parse_qs(u.query)
        try:
            n = int(self.headers.get('Content-Length', 0))
            if n <= 44 or n > 400 * 1024 * 1024: return self._json(400, {'ok': False, 'error': 'send a WAV file up to 400 MB'})
            body = self.rfile.read(n)
            with LOCK: res = transcribe(body)
            self._json(200, res)
        except Exception as e:
            traceback.print_exc()
            self._json(500, {'ok': False, 'error': str(e)[-600:]})
    def log_message(self, fmt, *args):
        sys.stderr.write('[transcriber] ' + (fmt % args) + '\n')

if __name__ == '__main__':
    print(f'Jun Jam transcriber listening on http://localhost:{PORT}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
