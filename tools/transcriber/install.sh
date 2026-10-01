#!/bin/bash
# Installs the Jun Jam transcriber helper into a private Python environment.
# Nothing goes into your project folder; remove it any time by deleting the folder below.
set -e
DIR="$HOME/Library/Application Support/Jun Jam"
VENV="$DIR/transcriber-venv"
HERE="$(cd "$(dirname "$0")" && pwd)"
echo "Jun Jam transcriber: installing into $VENV (about 2-3 GB, a few minutes)"
mkdir -p "$DIR"
python3 -m venv "$VENV"
"$VENV/bin/python" -m pip install --quiet --upgrade pip
"$VENV/bin/python" -m pip install -r "$HERE/requirements.txt"
cp "$HERE/server.py" "$DIR/server.py"
echo "Done. Start it with: \"$VENV/bin/python\" \"$DIR/server.py\""
