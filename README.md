# Jun Jam

A jazz piano trainer with two sides:

- **Hands**: chord symbols fall toward the keyboard. Play any valid voicing on a MIDI keyboard.
  Practice mode (waits for you) or Game mode (five tempo tiers, Misty to Donna Lee).
- **Progressions**: 13 common J-pop, city pop and jazz progressions (Royal Road, Just the Two of Us,
  Canon, Komuro, passing diminished, minor iv, turnarounds, ii–V–I...) to play in every key in Hands,
  with J-pop style degrees (IVmaj7 V7 IIIm7 VIm7), and to name by ear in the Ears Progressions world.
- **Real instrument sounds, optional**: Profile & settings → Sound. Download a Wurlitzer electric piano (0.9 MB) or a
  Steinway grand (5.8 MB) once and your keys, the licks and the Keys backing play on it, offline from then on (kept in
  the browser's database). The built-in synth always works and is the fallback. Wurlitzer EP200 samples by Greg
  Sullivan (CC BY 3.0); Steinway grand samples released into the public domain by Akai; both via sfzinstruments.
  Drums: one simple beat, a deep kick on 1 and a snare on 3 with a little reverb, plus a hi-hat on 2 and 4 for jazz;
  the kit is built in (Sonic Pi samples, CC0) and you can load your own kick, snare and hi-hat. One deep, soft bass sound.
- **Spaced review in Chords** (part of Smart mix): a chord you miss, need the hint for, or play slowly for you comes
  back a few chords later, never straight away, and each quick return spaces it further out until it graduates to
  days (tomorrow, a few days, a week…). Gaps are jittered and capped (never two reviews in a row, at most two in six),
  so it doesn't fall into a pattern. Review chords wear a small ↻.
- **Gig**: lead sheets to play from, with "Why it works" marking every ii–V–I, backdoor, tritone sub, secondary dominant,
  passing diminished and minor iv, and how far each chord's root moves (tap any tag to see why) (chord changes only), about 100 real songs: J-pop and city pop (IRIS OUT, Pretender,
  夜に駆ける, 紅蓮華, Plastic Love…), pop and rock (Paramore, Olivia Rodrigo, Billie Eilish, Coldplay, Stevie Wonder…),
  jazz standards, blues heads, Latin and bossa (Recorda Me, A Night in Tunisia, Jobim…), funk and soul. Jazz, Latin and
  classic pop/soul come from iReal Pro's community charts; J-pop and recent pop from U-FRET and Ultimate Guitar charts
  (those mark no bar lines, so chord lengths there are approximate). Search, filter, 🎲 random, transpose, chord names
  or Roman numerals, the current chord lit on the keyboard, a simple pad that plays the changes. Drums under it too: synthesized grooves for R&B / trap soul (808
  kick, clap, hat rolls, an 808 sub bass), pop, rock, funk, swing, bossa, samba and ballads, picked from the song's
  feel or chosen. Paste in any chart you
  find and it's kept under Yours. A band will play from the same charts later.
- **Five stars per Chords stage**: ★ clear 16 chords, ★★ 90% right first try. After that 🔥 chords say which chord tone your
  left hand has to put at the bottom, and you work out the note (C with the 3rd at the bottom is C/E): ★★★ the 3rd, ★★★★ the 3rd or 5th, ★★★★★ the 3rd, 5th or 7th at Cherokee tempo.
- **Weak keys**: Hands and Ears share one profile of how shaky each of the 12 keys is, and both lean
  on your shaky keys within every round (Hands with Smart mix on; Ears scale degrees and chords always).
- **Ears: Call & Response** (the game; the level-by-level quiz is still there as Classic): the app plays a call while a
  monster walks at your wall, and you answer on the keyboard before it gets there (the scale degree, the second note, the chord on the
  root shown, the bass note, or a progression's bass line). No buttons. Right answers speed the tempo up and every six bring
  in the next level of the world's ladder; a wrong or late one plays what it was and costs one of three lives, and it comes
  back a few calls later. Right answers charge a spell (a fireball: triple points, a life back); from the third level,
  armoured brutes need two answers in a row. Play any chord to go again.
- **Lines**: short licks (jazz, bebop, Coltrane, blues, gospel, neo-soul, fusion, city pop and J-pop) that you
  learn in one key and then play in five more without looking. Import your own over MIDI.
- **Reharm**: 30 reharmonisation moves in three tiers (secondary dominants, IV/V, minor iv, passing diminished, tritone sub,
  backdoor, line clichés, pedal point, Coltrane changes, negative harmony, melody reharm...). Each has a card (what, why, where you hear it), before/after audio, a drill
  where you play the move in six keys while the app plays the progression around you, and an ear quiz.
- **Voicings**: 86 named two-hand voicings over 44 chord types (Kenny Barron, So What, Bill Evans rootless A and B,
  upper-structure triads, the Mu chord, the Hendrix and James Bond chords, Herbie sus, gospel stacks, neo-soul clusters,
  slash chords...), each hand within about a 10th. Learn one from its card (a keyboard diagram labelled by degree, both
  hands named), play it in C and then five keys from memory, then Rush: a timed game that often asks for one chord two or
  three ways in a row; a miss shows the shape, you play it, and it comes back a few chords later. Graded on the exact layout, in any octave.
- **Transcribe** (button on the home screen): drop in an mp3 (or record a browser tab), choose a solo transcription or a
  lead sheet, select the part, and get editable sheet music with chords. Rhythms are written down to 32nds, with triplets,
  quintuplets, sextuplets and septuplets. Edit in a piano roll, either on the beat or as played (every note where it
  really was, over the recording's waveform); play the transcription, the original, or both, with pause, click-to-seek and
  loops; save it in Jun Jam with its recording (it reopens ready to play, under Your transcriptions), as a PDF,
  as MusicXML or MIDI (on the grid or as played), or send a phrase to Lines.
  Needs a helper program on your computer (one-time install, about 4 GB with its models, 5 to 15 minutes; it fetches
  its own Python, so you don't need one). Jun Jam shows these steps when the helper isn't running:
  - **Mac:** in Terminal, `bash "<Jun Jam folder>/tools/transcriber/install.sh"`. After that, Jun Jam.app starts it for you.
  - **Windows:** in PowerShell, `powershell -ExecutionPolicy Bypass -File "<Jun Jam folder>\tools\transcriber\install.ps1"`.
    Then double-click **Start Jun Jam helper** on your Desktop whenever you want to transcribe. (The Windows installer
    is new and not yet tested on a real PC; tell us if it trips.)
  The helper takes the drums out (Demucs), finds beats and beat 1 (Beat This!), and lets three models vote on every
  note: Basic Pitch, a piano model (Kong et al.) and YourMT3+.
- **Themes** (Profile & settings, from the button on the home card): Classic (dark, light or follow the system),
  Manuscript, Studio, Neon Grid and Pixel Autumn. Pixel Autumn paints its background in code (js/scenes.js), once, so it
  costs nothing while you play. Your name lives there too.
- **Ears**: functional ear training in four worlds (pitch, scale degrees, intervals, chord qualities),
  with stars, bosses, and a weakness drill built from your mix-ups.

Both sides share the sound engine, MIDI input, the chord rules, and XP.

## Run it
Double-click `Jun Jam.app` to open it in Chrome (no Terminal window). Or open `index.html` in
Chrome or Edge yourself (Web MIDI only works there). No server or build step needed.

Click the **Jun Jam** logo (or use the browser's Back button) to get back to the home screen from anywhere.
No MIDI keyboard? The on-screen keys show which computer key plays them: press the letters, then Enter.

## Project layout
```
index.html            page markup; loads everything below in order
css/style.css         all styling (the Classic look, light and dark)
css/themes.css        the other themes: variables and component styles per data-theme
js/scenes.js          each theme's background art, painted in code (also draws the preview tiles)
js/theme.js           theme registry, fonts, Neon's 3D background, Profile & settings (runs in <head>)
js/theory.js          chord rules, spelling, scoring, chord naming, progressions, requests (pure, no DOM)
js/state.js           storage, mastery stats, smart mix weights, XP and ranks
js/audio.js           electric piano synth, hi-hat, scheduled tones and timbres
js/views.js           on-screen keyboard, grand staff, analysis panel
js/input.js           MIDI, computer keyboard, click input, routing to Hands or Ears
js/hands.js           the falling-chord game
js/ears/questions.js  ear-training question generators
js/ears/levels.js     worlds and levels as data (edit here to add levels)
js/ears/session.js    Ears game loop, stars, drill, Ears menu
js/ears/arcade.js     Call & Response, the Ears game (Classic levels live in session.js)
js/lines/licks.js     the lick library as data (edit here to add licks), with sources
js/lines/solos.js     licks from real solos, generated from the Weimar Jazz Database (ODbL)
js/lines/players.js   licks transcribed from players' own videos (A.N.M-PIANO), credited, filed with the solo licks
js/lines/runs.js      scale runs that sound like music: pentatonic threes and fours, cascades, gospel and blues runs, the Magic Run…
js/lines/session.js   Lines drill (learn, then transfer to new keys), import your own
js/reharm/moves.js    reharm moves as data (edit here to add moves), with sources
js/reharm/session.js  Reharm cards, drill and ear quiz
js/voicings/library.js  the voicing library (both hands, written in C) and the extra chord types it names
js/voicings/session.js  Voicings cards, the six-key drill and Rush
js/transcribe/analyze.js   helper notes (seconds) to a score: beats, top line, chords, key
js/transcribe/export.js    spelling, MIDI and MusicXML export (one line, or a two-staff part with chords)
js/transcribe/notation.js  sheet music for full parts: chords stacked, grand staff for piano
js/transcribe/session.js   Transcribe screens: import, what to see, region, helper call, editor
tools/transcriber/         the local helper: install.sh, requirements.txt, server.py
js/gig/sheets.js      Gig: the built-in lead sheets (chord charts as text)
js/gig/session.js     Gig: reading charts, the library, the sheet, playing the changes, adding your own
js/srs.js             spaced review for Chords: per chord-and-key memory, in-run gaps and day-based reviews
js/sampled.js         real instruments (Wurlitzer, Steinway grand): one download, kept in the browser, offline after; the synth is the fallback
js/drumkit.js         the built-in drum kit: a kick, snare and hi-hat (Sonic Pi samples, CC0)
js/drums.js           the one beat: kick on 1, snare on 3 with a little room, hi-hat on 2 and 4 if you want it
js/gig/analysis.js    Gig's "Why it works": ii–V–I, backdoor, tritone subs, V of…, passing °, minor iv, root motion
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
