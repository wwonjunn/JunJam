# Juneeth

A jazz piano trainer with two sides:

- **Hands**: chord symbols fall toward the keyboard. Play any valid voicing on a MIDI keyboard.
  Practice mode (waits for you) or Game mode (five tempo tiers, Misty to Giant Steps).
- **Ears**: functional ear training in four worlds (pitch, scale degrees, intervals, chord qualities),
  with stars, bosses, and a weakness drill built from your mix-ups.

Both sides share the sound engine, MIDI input, the chord rules, and XP.

## Run it
Open `index.html` in Chrome or Edge (Web MIDI only works there). No server or build step needed.

## Project layout
```
index.html            page markup; loads everything below in order
css/style.css         all styling (light and dark themes)
js/theory.js          chord rules, spelling, scoring, chord naming, requests (pure, no DOM)
js/state.js           storage, mastery stats, smart mix weights, XP and ranks
js/audio.js           electric piano synth, hi-hat, scheduled tones and timbres
js/views.js           on-screen keyboard, grand staff, analysis panel
js/input.js           MIDI, computer keyboard, click input, routing to Hands or Ears
js/hands.js           the falling-chord game
js/ears/questions.js  ear-training question generators
js/ears/levels.js     worlds and levels as data (edit here to add levels)
js/ears/session.js    Ears game loop, stars, drill, Ears menu
js/menu.js            start menu, progress map, boot
tools/bundle.py       builds dist/juneeth.html, a single self-contained file
tests/theory.test.js  checks for the theory core and generators
```
Files are plain scripts sharing one global scope (not ES modules), so the page also works
when opened straight from disk.

## Commands
```
node tests/theory.test.js     # run checks
python3 tools/bundle.py       # rebuild dist/juneeth.html
```
