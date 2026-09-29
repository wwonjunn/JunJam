#!/bin/bash
# Double-click in Finder (or run ./run.command) to open Jun Jam in Chrome, where Web MIDI works.
cd "$(dirname "$0")"
if open -Ra "Google Chrome" 2>/dev/null; then
  open -a "Google Chrome" index.html
else
  echo "Google Chrome isn't installed. Get it from https://www.google.com/chrome/"
  echo "Opening in your default browser for now (MIDI keyboards won't work there)."
  open index.html
fi
