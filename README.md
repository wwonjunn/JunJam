# Jun Jam

A jazz piano trainer with two sides:

- **Hands**: chord symbols fall toward the keyboard. Play any valid voicing on a MIDI keyboard.
  Practice mode (waits for you) or Game mode (five tempo tiers, Misty to Donna Lee).
- **Progressions**: 13 common J-pop, city pop and jazz progressions (Royal Road, Just the Two of Us,
  Canon, Komuro, passing diminished, minor iv, turnarounds, ii–V–I...) to play in every key in Hands,
  with J-pop style degrees (IVmaj7 V7 IIIm7 VIm7), and to name by ear in the Ears Progressions world.
- **Weak keys**: Hands and Ears share one profile of how shaky each of the 12 keys is, and both lean
  on your shaky keys within every round (Hands with Smart mix on; Ears scale degrees and chords always).
- **Lines**: short licks (jazz, bebop, Coltrane, blues, gospel, neo-soul, fusion, city pop and J-pop) that you
  learn in one key and then play in five more without looking. Import your own over MIDI.
- **Reharm**: 30 reharmonisation moves in three tiers (secondary dominants, IV/V, minor iv, passing diminished, tritone sub,
  backdoor, line clichés, pedal point, Coltrane changes, negative harmony, melody reharm...). Each has a card (what, why, where you hear it), before/after audio, a drill
  where you play the move in six keys while the app plays the progression around you, and an ear quiz.
- **Transcribe** (button on the home screen): drop in an mp3, choose a solo transcription or a lead sheet, select
  the part, and get editable sheet music with chords. Edit in a piano roll, either on the beat or as played (every note where it really was, over the recording's waveform), export MusicXML or MIDI (on the grid or as played), or send a phrase
  to Lines. Needs the local helper in `tools/transcriber` (Basic Pitch + librosa; Demucs separation is optional and off), installed once with
  `bash tools/transcriber/install.sh`; Jun Jam.app starts it automatically. Everything else works without it.
- **Ears**: functional ear training in four worlds (pitch, scale degrees, intervals, chord qualities),
  with stars, bosses, and a weakness drill built from your mix-ups.

Both sides share the sound engine, MIDI input, the chord rules, and XP.

## Run it
Double-click `Jun Jam.app` to open it in Chrome (no Terminal window). Or open `index.html` in
Chrome or Edge yourself (Web MIDI only works there). No server or build step needed.

## Project layout
```
index.html            page markup; loads everything below in order
css/style.css         all styling (light and dark themes)
js/theory.js          chord rules, spelling, scoring, chord naming, progressions, requests (pure, no DOM)
js/state.js           storage, mastery stats, smart mix weights, XP and ranks
js/audio.js           electric piano synth, hi-hat, scheduled tones and timbres
js/views.js           on-screen keyboard, grand staff, analysis panel
js/input.js           MIDI, computer keyboard, click input, routing to Hands or Ears
js/hands.js           the falling-chord game
js/ears/questions.js  ear-training question generators
js/ears/levels.js     worlds and levels as data (edit here to add levels)
js/ears/session.js    Ears game loop, stars, drill, Ears menu
js/lines/licks.js     the lick library as data (edit here to add licks), with sources
js/lines/solos.js     licks from real solos, generated from the Weimar Jazz Database (ODbL)
js/lines/session.js   Lines drill (learn, then transfer to new keys), import your own
js/reharm/moves.js    reharm moves as data (edit here to add moves), with sources
js/reharm/session.js  Reharm cards, drill and ear quiz
js/transcribe/analyze.js   helper notes (seconds) to a score: beats, top line, chords, key
js/transcribe/export.js    spelling, MIDI and MusicXML export (one line, or a two-staff part with chords)
js/transcribe/notation.js  sheet music for full parts: chords stacked, grand staff for piano
js/transcribe/session.js   Transcribe screens: import, what to see, region, helper call, editor
tools/transcriber/         the local helper: install.sh, requirements.txt, server.py
js/menu.js            home screen of mode cards, menus, progress map, boot
tools/bundle.py       builds dist/junjam.html, a single self-contained file
tools/launcher.applescript  source of Jun Jam.app; rebuild: osacompile -o "Jun Jam.app" tools/launcher.applescript
tests/theory.test.js  checks for the theory core and generators
```
Files are plain scripts sharing one global scope (not ES modules), so the page also works
when opened straight from disk.

## Commands
```
node tests/theory.test.js     # run checks
python3 tools/bundle.py       # rebuild dist/junjam.html
python3 tools/mine_licks.py wjazzd.db js/lines/solos.js   # regenerate solo licks (download wjazzd.db from jazzomat.hfm-weimar.de first)
```

## Credits
Licks from famous solos (`js/lines/solos.js`) are short phrases taken from the
[Weimar Jazz Database](https://jazzomat.hfm-weimar.de/) by the Jazzomat Research Project,
Hochschule für Musik Franz Liszt Weimar. That lick data is derived from the database and is
shared under the [Open Database License (ODbL 1.0)](https://opendatacommons.org/licenses/odbl/1.0/).
