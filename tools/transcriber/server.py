"""Jun Jam transcriber helper: a small server on your own Mac that the Jun Jam page talks to.

  GET  /health                  -> {"ok": true, ...}   (Jun Jam checks this to know the helper is running)
  POST /transcribe?target=piano  body: a WAV file of the part of the recording you selected

What it does with the audio:
  1. Basic Pitch turns the whole recording into notes, in one pass (no instrument separation: on real
     recordings it gave worse results and was slow).
  2. librosa finds the beats.
It answers with JSON: tempo, beat times, and the notes, also split into the bass (low notes) and the
harmony (everything), so Jun Jam can pull out the solo line by range and work out the chords.
Add ?separate=1 to split instruments with Demucs first (slower; needs the separation model).
Only listens on localhost. Audio is processed in a temporary folder and deleted afterwards.
"""
import json, os, sys, shutil, tempfile, subprocess, traceback
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

PORT = 8771
VERSION = 1
STEMS = ['drums', 'bass', 'vocals', 'guitar', 'piano', 'other']
# Frequency ranges per part, so a stem's leftovers outside its instrument's range are ignored
RANGE = {'full': (27, 4200), 'piano': (27, 4200), 'guitar': (80, 1400), 'vocals': (80, 1100), 'other': (100, 1600), 'bass': (30, 400)}

_model = None
def model():
    global _model
    if _model is None:
        from basic_pitch.inference import Model
        from basic_pitch import ICASSP_2022_MODEL_PATH
        _model = Model(ICASSP_2022_MODEL_PATH)
    return _model

def device():
    try:
        import torch
        return 'mps' if torch.backends.mps.is_available() else 'cpu'
    except Exception:
        return 'cpu'

def separate(wav, out):
    """Run Demucs; try the Apple GPU first, fall back to the CPU."""
    for dev in ([device()] + (['cpu'] if device() != 'cpu' else [])):
        r = subprocess.run([sys.executable, '-m', 'demucs', '-n', 'htdemucs_6s', '-d', dev, '-o', out, wav],
                           capture_output=True, text=True)
        if r.returncode == 0:
            base = os.path.join(out, 'htdemucs_6s', os.path.splitext(os.path.basename(wav))[0])
            return {s: os.path.join(base, s + '.wav') for s in STEMS if os.path.exists(os.path.join(base, s + '.wav'))}
    raise RuntimeError('Demucs failed: ' + (r.stderr or '')[-800:])

def notes_of(path, part, solo):
    from basic_pitch.inference import predict
    lo, hi = RANGE.get(part, (27, 4200))
    _, _, events = predict(path, model(), onset_threshold=0.55 if solo else 0.5, frame_threshold=0.3,
                           minimum_note_length=60, minimum_frequency=lo, maximum_frequency=hi)
    return [{'s': round(float(e[0]), 3), 'e': round(float(e[1]), 3), 'p': int(e[2]), 'c': round(float(e[3]), 3)}
            for e in sorted(events, key=lambda e: e[0])]

def beats_of(wav):
    import librosa
    y, sr = librosa.load(wav, sr=22050, mono=True)
    tempo, frames = librosa.beat.beat_track(y=y, sr=sr)
    t = librosa.frames_to_time(frames, sr=sr)
    return float(tempo if not hasattr(tempo, '__len__') else tempo[0]), [round(float(x), 3) for x in t], len(y) / sr

def transcribe(wav_bytes, target, mode, separate_first=False):
    tmp = tempfile.mkdtemp(prefix='junjam-')
    try:
        wav = os.path.join(tmp, 'clip.wav')
        with open(wav, 'wb') as f: f.write(wav_bytes)
        import soundfile as sf, numpy as np
        data, sr = sf.read(wav, always_2d=True)
        if data.shape[1] == 1: sf.write(wav, np.repeat(data, 2, axis=1), sr)   # Demucs 4.0.1 + new PyTorch crash on mono input
        tempo, beats, dur = beats_of(wav)
        if not separate_first:
            notes = notes_of(wav, 'full', True)
            return {'ok': True, 'version': VERSION, 'mode': mode, 'target': 'full', 'tempo': tempo, 'beats': beats, 'duration': dur,
                    'notes': {'target': notes, 'bass': [n for n in notes if n['p'] < 52], 'harmony': notes}}
        stems = separate(wav, tmp)
        if target not in stems: target = 'other'
        harmony_parts = [s for s in ('piano', 'guitar', 'other', 'vocals') if s in stems and s != target]
        out = {'ok': True, 'version': VERSION, 'mode': mode, 'target': target, 'tempo': tempo, 'beats': beats, 'duration': dur,
               'notes': {'target': notes_of(stems[target], target, True),
                         'bass': notes_of(stems['bass'], 'bass', False) if 'bass' in stems else [],
                         'harmony': sorted([n for s in harmony_parts for n in notes_of(stems[s], s, False)], key=lambda n: n['s'])}}
        if mode == 'lead' and target == 'vocals':   # instrumentals: the lead instrument's line, in case there are no vocals
            alt = 'piano' if 'piano' in stems and 'other' not in stems else 'other'
            out['notes']['alt'] = notes_of(stems[alt], alt, True) if alt in stems else []
        return out
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
        if urlparse(self.path).path == '/health': return self._json(200, {'ok': True, 'version': VERSION, 'device': device()})
        self._json(404, {'ok': False, 'error': 'not found'})
    def do_POST(self):
        u = urlparse(self.path)
        if u.path != '/transcribe': return self._json(404, {'ok': False, 'error': 'not found'})
        q = parse_qs(u.query)
        try:
            n = int(self.headers.get('Content-Length', 0))
            if n <= 44 or n > 400 * 1024 * 1024: return self._json(400, {'ok': False, 'error': 'send a WAV file up to 400 MB'})
            res = transcribe(self.rfile.read(n), q.get('target', ['piano'])[0], q.get('mode', ['solo'])[0], q.get('separate', ['0'])[0] == '1')
            self._json(200, res)
        except Exception as e:
            traceback.print_exc()
            self._json(500, {'ok': False, 'error': str(e)[-600:]})
    def log_message(self, fmt, *args):
        sys.stderr.write('[transcriber] ' + (fmt % args) + '\n')

if __name__ == '__main__':
    print(f'Jun Jam transcriber listening on http://localhost:{PORT}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
