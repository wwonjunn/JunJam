"""Mine short licks from the Weimar Jazz Database (ODbL) into js/lines/solos.js.
Uses the transcribers' own PHRASE boundaries, the chord under each beat, and the solo's feel.
   python3 tools/mine_licks.py wjazzd.db js/lines/solos.js [total]
The licks already in the file are kept exactly as they are (stars and reviews are saved by id), and new ones are
added until there are `total` (default 860), spread over every player and many tunes."""
import sqlite3, json, random, re, sys, collections

DB = sys.argv[1]; OUT = sys.argv[2]; TOTAL = int(sys.argv[3]) if len(sys.argv) > 3 else 860
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
        # Real positions in beats, read off the transcription's own beat times (so swing and phrasing survive)
        bo = [b[0] for b in beats]
        if len(bo) < 2: continue
        def pos(t):
            lo, hi = 0, len(bo) - 2
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if bo[mid] <= t: lo = mid
                else: hi = mid - 1
            k = lo; span = bo[k + 1] - bo[k] or 1e-3
            return k + (t - bo[k]) / span
        ps = [pos(x[0]) for x in notes]
        origin = int(ps[0] // 1)                      # the beat the phrase starts in (it may start off the beat)
        ats = [round(p_ - origin, 2) for p_ in ps]
        local = [(bo[min(int(p_), len(bo) - 2) + 1] - bo[min(int(p_), len(bo) - 2)]) or 1e-3 for p_ in ps]
        own = [x[2] / lb for x, lb in zip(notes, local)]   # each note's own length in beats
        if any(ats[i + 1] - (ats[i] + own[i]) > 0.75 for i in range(n - 1)): continue   # no long rests inside a line
        d = [round(min(ats[i + 1] - ats[i], max(own[i], 0.05)), 2) for i in range(n - 1)]
        d.append(min(2.0, max(0.25, round(own[-1] * 4) / 4)))
        total = ats[-1] + d[-1]
        if total < 1.5 or total > 8.25: continue
        swing = (feel or '').startswith('SWING') or feel == 'TWOBEAT'
        pitches = [int(round(x[1])) for x in notes]
        if max(pitches) - min(pitches) > 22: continue
        leaps = [abs(pitches[i + 1] - pitches[i]) for i in range(n - 1)]
        if max(leaps) > 14: continue
        # chords: the one in force on the phrase's first beat, then each change up to the last note, in whole beats
        curch = None
        for k in range(0, origin + 1):
            if k < len(beats) and beats[k][1]: curch = beats[k][1]
        if not curch or curch == 'NC': continue
        segs = [(0, curch)]; last_ch = curch
        for k in range(origin + 1, int(ps[-1] // 1) + 1):
            if k < len(beats) and beats[k][1] and beats[k][1] != last_ch:
                if beats[k][1] == 'NC': segs = None; break
                segs.append((k - origin, beats[k][1])); last_ch = beats[k][1]
        if not segs or len(segs) > 3: continue
        parsed = []
        ok = True
        for at, chs in segs:
            p_ = parse_root(chs); q = p_ and qual(p_[2])
            if not q: ok = False; break
            parsed.append((at, p_[0], p_[1], q))
        if not ok: continue
        l0, pc0 = parsed[0][1], parsed[0][2]
        ch = []
        for i, (at, l, pc, q) in enumerate(parsed):
            end = parsed[i + 1][0] if i + 1 < len(parsed) else max(total, at + 1)
            ch.append([(l - l0) % 7, (pc - pc0) % 12, q, max(1, end - at)])
        if sum(c[3] for c in ch) < total: ch[-1][3] += total - sum(c[3] for c in ch)
        ch[-1][3] = round(ch[-1][3] * 4) / 4 + (0.25 if round(ch[-1][3] * 4) / 4 < ch[-1][3] else 0)
        semis = [p - 60 - pc0 for p in pitches]
        nps = n / total
        cands[perf].append(dict(melid=melid, perf=perf, title=title, year=years.get(trackid, ''), swing=swing, ch=ch,
                                notes=[[s, x, a] for s, x, a in zip(semis, d, ats)], nps=nps, leap=max(leaps),
                                nleaps=sum(1 for x in leaps if x >= 5), pattern=tuple(pitches[i + 1] - pitches[i] for i in range(n - 1))))

# The licks already in the file: kept line for line, and their shapes, ids and numbering are taken
old_lines, seen, ids, count = [], set(), set(), collections.Counter()
try:
    for ln in open(OUT):
        m = re.match(r"  Lk\('(wj\d+_\d+)',(\".*?\"),\d,'Solo',(\[\[.*?\]\]),(\[\[.*?\]\]),\{.*?artist:(\".*?\")", ln)
        if not m: continue
        old_lines.append(ln.rstrip('\n')); ids.add(m.group(1))
        ns = json.loads(m.group(4)); seen.add(tuple(ns[i + 1][0] - ns[i][0] for i in range(len(ns) - 1)))
        name = json.loads(m.group(2)); base = re.sub(r' \(\d+\)$', '', name); k = re.search(r' \((\d+)\)$', name)
        key = (json.loads(m.group(5)), base); count[key] = max(count[key], int(k.group(1)) if k else 1)
except FileNotFoundError: pass

# A good line lands: its last note is a chord tone (or the 9) of the chord it ends on, and it doesn't stutter on one note
TONES = {'dom7': [0, 4, 7, 10], 'min7': [0, 3, 7, 10], 'maj7': [0, 4, 7, 11], 'hdim': [0, 3, 6, 10], 'maj': [0, 4, 7], 'min': [0, 3, 7],
         'six': [0, 4, 7, 9], 'min6': [0, 3, 7, 9], 'dim': [0, 3, 6, 9], 'dim7': [0, 3, 6, 9], 'mmaj7': [0, 3, 7, 11], 'aug': [0, 4, 8]}
def quality(c):
    last = c['ch'][-1]; tones = TONES.get(last[2], [0, 4, 7, 10])
    land = (c['notes'][-1][0] - last[1]) % 12
    stutter = max(collections.Counter(c['notes'][i][0] for i in range(len(c['notes']))).values()) / len(c['notes'])
    return (2 if land in tones else 1 if land in (2, 9) else 0) - (2 if stutter > .4 else 0) + (1 if c['nleaps'] >= 1 else 0)
for cs in cands.values():
    for c in cs: c['q'] = quality(c) + random.random() * 1.5
    cs.sort(key=lambda c: -c['q'])

# New licks: one per player per round, best first, at most 4 from any one solo, never a shape already in, until TOTAL
picked, per_solo = [], collections.Counter()
for ln in old_lines: per_solo[re.match(r"  Lk\('wj(\d+)_", ln).group(1)] += 1
players = sorted(cands); random.shuffle(players)
while len(old_lines) + len(picked) < TOTAL:
    added = False
    for perf in players:
        for c in cands[perf]:
            if c['pattern'] in seen or per_solo[str(c['melid'])] >= 4 or c['q'] < 1: continue
            seen.add(c['pattern']); per_solo[str(c['melid'])] += 1; picked.append(c); added = True; break
        if len(old_lines) + len(picked) >= TOTAL: break
    if not added: break

# Difficulty at the app's own tempo: notes per beat, jumps and length (not the record's speed), split into thirds
# (the app rates every lick again from its notes; this is only the starting guess)
for c in picked:
    beats = c['notes'][-1][2] + c['notes'][-1][1]; c['score'] = len(c['notes']) / beats + 0.25 * c['nleaps'] + 0.08 * len(c['notes'])
sc = sorted(c['score'] for c in picked) or [0]; a, b = sc[len(sc) // 3], sc[2 * len(sc) // 3]
for c in picked: c['diff'] = 1 if c['score'] <= a else 2 if c['score'] <= b else 3

lines = list(old_lines)
for c in sorted(picked, key=lambda c: (c['diff'], c['perf'], c['title'])):
    key = (c['perf'], c['title']); count[key] += 1; k = count[key]
    lid = f"wj{c['melid']}_{k}"
    while lid in ids: k += 1; lid = f"wj{c['melid']}_{k}"
    ids.add(lid)
    name = c['title'] + (f' ({k})' if k > 1 else '')
    tip = f"From {c['perf']}'s solo on {c['title']}" + (f" ({c['year']})" if c['year'] else '') + '.'
    lines.append(f"  Lk('{lid}',{json.dumps(name, ensure_ascii=False)},{c['diff']},'Solo',{json.dumps(c['ch'])},{json.dumps(c['notes'])},"
                 f"{{swing:{1 if c['swing'] else 0},artist:{json.dumps(c['perf'], ensure_ascii=False)},src:WJAZZD,tip:{json.dumps(tip, ensure_ascii=False)}}}),")

with open(OUT, 'w') as f:
    f.write('/* Lines from real solos: short phrases taken from the Weimar Jazz Database, generated by a script.\n'
            '   Jazzomat Research Project, Hochschule für Musik Franz Liszt Weimar. https://jazzomat.hfm-weimar.de/\n'
            '   This lick data is derived from that database and is shared under the Open Database License (ODbL 1.0):\n'
            '   https://opendatacommons.org/licenses/odbl/1.0/ . Each lick names the player and tune it comes from. */\n')
    f.write("const WJAZZD='https://jazzomat.hfm-weimar.de/';\nconst SOLO_LICKS=[\n" + '\n'.join(lines) + '\n];\n')
print(len(old_lines), 'kept,', len(picked), 'new from', len({c['perf'] for c in picked}), 'players and',
      len({(c['perf'], c['title']) for c in picked}), 'solos; by difficulty', collections.Counter(c['diff'] for c in picked))
