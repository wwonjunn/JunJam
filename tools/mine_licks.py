"""Mine short licks from the Weimar Jazz Database (ODbL) into js/lines/solos.js.
Uses the transcribers' own PHRASE boundaries, the chord under each beat, and the solo's feel."""
import sqlite3, json, random, re, sys, collections

DB = sys.argv[1]; OUT = sys.argv[2]
random.seed(7)
con = sqlite3.connect(DB); cur = con.cursor()

LET = 'CDEFGAB'; LPC = [0, 2, 4, 5, 7, 9, 11]
def parse_root(ch):
    m = re.match(r'^([A-G])([b#]?)(.*)$', ch)
    if not m: return None
    l = LET.index(m.group(1)); a = {'': 0, 'b': -1, '#': 1}[m.group(2)]
    return l, (LPC[l] + a) % 12, m.group(3)

def qual(s):
    s = s.split('/')[0]                     # ignore slash bass
    table = {'7': 'dom7', '-7': 'min7', 'j7': 'maj7', 'm7b5': 'hdim', '': 'maj', '-': 'min', '6': 'six', '-6': 'min6',
             '79b': 'd7b9', '79#': 'd7s9', '7alt': 'alt', 'sus7': 'sus7', 'sus': 'sus7', 'sus79': 'sus7', 'sus7913': 'sus7',
             '+7': 'd7b13', '+79#': 'alt', '+79': 'd7b13', 'o': 'dim', 'o7': 'dim7', '-j7': 'mmaj7', 'j7911#': 'mj7s11',
             '79': 'dom9', '7913': 'dom13', '-79': 'min9', '-7911': 'min11', 'j79': 'maj9', '7911#': 'd7s11', '69': 'six9',
             '-69': 'min6', '79b13': 'alt', '79b13b': 'alt', '7913b': 'd7b9', '79#13': 'd7s9', '79#11#': 'alt', '+j7': 'mj7s5', '+': 'aug'}
    return table.get(s)

solos = cur.execute("select melid, performer, title, rhythmfeel, avgtempo, trackid, instrument from solo_info").fetchall()
# recording year (not the reissue date): the last 4-digit year in the track's recording date
years = {t: (re.findall(r'(1[89]\d\d|20\d\d)', d or '') or [''])[-1] for t, d in cur.execute("select trackid, recordingdate from track_info")}
cands = collections.defaultdict(list)

for melid, perf, title, feel, tempo, trackid, inst in solos:
    ev = cur.execute("select onset, pitch, duration, beatdur from melody where melid=? order by eventid", (melid,)).fetchall()
    beats = cur.execute("select onset, chord from beats where melid=? order by onset", (melid,)).fetchall()
    phrases = cur.execute("select start, end from sections where melid=? and type='PHRASE'", (melid,)).fetchall()
    swing = (feel or '').startswith('SWING') or feel == 'TWOBEAT'
    for st, en in phrases:
        notes = ev[st:en + 1]
        n = len(notes)
        if n < 5 or n > 14: continue
        bd = sorted(x[3] for x in notes)[n // 2]   # local beat length (s)
        if not bd or bd <= 0: continue
        # durations in beats: inter-onset times, rounded to 16ths; no rests longer than 3/4 beat inside the line
        iois = [(notes[i + 1][0] - notes[i][0]) / bd for i in range(n - 1)]
        gaps = [(notes[i + 1][0] - notes[i][0] - notes[i][2]) / bd for i in range(n - 1)]
        if max(gaps) > 0.75: continue
        d = [min(2.0, max(0.25, round(x * 4) / 4)) for x in iois]
        if swing:  # a swung 8th pair (long-short) is written as two straight 8ths and played back swung
            i = 0
            while i < len(d) - 1:
                if d[i] == 0.75 and d[i + 1] == 0.25: d[i] = d[i + 1] = 0.5; i += 2
                else: i += 1
        last = min(2.0, max(0.5, round(notes[-1][2] / bd * 2) / 2))
        d.append(last)
        total = sum(d)
        if total < 1.5 or total > 8: continue
        pitches = [int(round(x[1])) for x in notes]
        if max(pitches) - min(pitches) > 22: continue
        leaps = [abs(pitches[i + 1] - pitches[i]) for i in range(n - 1)]
        if max(leaps) > 14: continue
        # chords: the one under the first note, then each change before the last note
        t0, tl = notes[0][0], notes[-1][0]
        segs = []; curch = None
        for bo, ch in beats:
            if ch:
                if bo <= t0 + 1e-3: curch = ch
        if not curch or curch == 'NC': continue
        segs.append((0.0, curch))
        last_ch = curch
        for bo, ch in beats:
            if t0 + 1e-3 < bo <= tl and ch and ch != last_ch:
                if ch == 'NC': segs = None; break
                segs.append((round((bo - t0) / bd * 2) / 2, ch)); last_ch = ch
        if not segs or len(segs) > 3: continue
        parsed = []
        ok = True
        for at, ch in segs:
            p = parse_root(ch); q = p and qual(p[2])
            if not q: ok = False; break
            parsed.append((at, p[0], p[1], q))
        if not ok: continue
        l0, pc0 = parsed[0][1], parsed[0][2]
        ch = []
        for i, (at, l, pc, q) in enumerate(parsed):
            end = parsed[i + 1][0] if i + 1 < len(parsed) else max(total, at + 1)
            beatsz = max(0.5, end - at)
            if i == len(parsed) - 1: beatsz = max(beatsz, total - at)
            ch.append([(l - l0) % 7, (pc - pc0) % 12, q, beatsz])
        if sum(c[3] for c in ch) < total - 1e-6: ch[-1][3] += total - sum(c[3] for c in ch)
        semis = [p - 60 - pc0 for p in pitches]
        nps = n / (total * bd)
        cands[perf].append(dict(melid=melid, perf=perf, title=title, year=years.get(trackid, ''), swing=swing, ch=ch,
                                notes=[[s, x] for s, x in zip(semis, d)], nps=nps, leap=max(leaps),
                                nleaps=sum(1 for x in leaps if x >= 5), pattern=tuple(pitches[i + 1] - pitches[i] for i in range(n - 1))))

# Two per player (one with real jumps when there is one), plus extras from the richest players, no repeated shapes
picked, seen = [], set()
def take(c):
    if c['pattern'] in seen: return False
    seen.add(c['pattern']); picked.append(c); return True
for perf, cs in sorted(cands.items()):
    random.shuffle(cs)
    jumpy = [c for c in cs if c['nleaps'] >= 2 and c['leap'] >= 5]
    other = [c for c in cs if c not in jumpy]
    for pool in (jumpy, other):
        for c in pool:
            if take(c): break
extra = [c for cs in cands.values() for c in cs if c['nleaps'] >= 2]
random.shuffle(extra)
for c in extra:
    if len(picked) >= 160: break
    take(c)

# Difficulty at the app's own tempo: notes per beat, jumps and length (not the record's speed), split into thirds
for c in picked:
    beats = sum(x[1] for x in c['notes']); c['score'] = len(c['notes']) / beats + 0.25 * c['nleaps'] + 0.08 * len(c['notes'])
sc = sorted(c['score'] for c in picked); a, b = sc[len(sc) // 3], sc[2 * len(sc) // 3]
for c in picked: c['diff'] = 1 if c['score'] <= a else 2 if c['score'] <= b else 3

count = collections.Counter()
lines = []
for c in sorted(picked, key=lambda c: (c['diff'], c['perf'], c['title'])):
    count[(c['perf'], c['title'])] += 1
    k = count[(c['perf'], c['title'])]
    name = c['title'] + (f' ({k})' if k > 1 else '')
    tip = f"From {c['perf']}'s solo on {c['title']}" + (f" ({c['year']})" if c['year'] else '') + '.'
    lines.append(f"  Lk('wj{c['melid']}_{k}',{json.dumps(name, ensure_ascii=False)},{c['diff']},'Solo',{json.dumps(c['ch'])},{json.dumps(c['notes'])},"
                 f"{{swing:{1 if c['swing'] else 0},artist:{json.dumps(c['perf'], ensure_ascii=False)},src:WJAZZD,tip:{json.dumps(tip, ensure_ascii=False)}}}),")

with open(OUT, 'w') as f:
    f.write('/* Lines from real solos: short phrases taken from the Weimar Jazz Database, generated by a script.\n'
            '   Jazzomat Research Project, Hochschule für Musik Franz Liszt Weimar. https://jazzomat.hfm-weimar.de/\n'
            '   This lick data is derived from that database and is shared under the Open Database License (ODbL 1.0):\n'
            '   https://opendatacommons.org/licenses/odbl/1.0/ . Each lick names the player and tune it comes from. */\n')
    f.write("const WJAZZD='https://jazzomat.hfm-weimar.de/';\nconst SOLO_LICKS=[\n" + '\n'.join(lines) + '\n];\n')
print(len(picked), 'licks from', len({c['perf'] for c in picked}), 'players;', 'by difficulty', collections.Counter(c['diff'] for c in picked),
      '; with 2+ jumps', sum(1 for c in picked if c['nleaps'] >= 2))
