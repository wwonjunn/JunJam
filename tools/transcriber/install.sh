#!/bin/bash
# Installs the Jun Jam transcriber helper into a private Python environment.
# Nothing goes into your project folder; remove it any time by deleting the folder below.
set -e
DIR="${JJ_DIR:-$HOME/Library/Application Support/Jun Jam}"
VENV="$DIR/transcriber-venv"
MODELS="$DIR/models"
HERE="$(cd "$(dirname "$0")" && pwd)"
echo "Jun Jam transcriber: installing into $DIR (about 4 GB, 5 to 15 minutes)"
mkdir -p "$DIR" "$MODELS"

# The models need Python 3.10 or newer. macOS ships 3.9, so if there's no newer one, fetch a private copy with uv
okpy() { "$1" -c 'import sys; sys.exit(0 if sys.version_info[:2]>=(3,10) else 1)' 2>/dev/null; }
PY=""
for c in python3.11 python3.12 python3.10 python3; do
  if command -v "$c" >/dev/null && okpy "$(command -v "$c")"; then PY="$(command -v "$c")"; break; fi
done
if [ -z "$PY" ]; then
  echo "No Python 3.10+ found: downloading a private Python 3.11 (uv, from astral.sh)"
  [ -x "$DIR/uv/uv" ] || curl -LsSf https://astral.sh/uv/install.sh | env UV_UNMANAGED_INSTALL="$DIR/uv" sh
  UV_PYTHON_INSTALL_DIR="$DIR/python" "$DIR/uv/uv" python install 3.11
  PY="$(UV_PYTHON_INSTALL_DIR="$DIR/python" "$DIR/uv/uv" python find 3.11)"
fi
# an older helper environment (Python 3.9) is replaced
if [ -x "$VENV/bin/python" ] && ! okpy "$VENV/bin/python"; then echo "Replacing the old helper environment"; rm -rf "$VENV"; fi
[ -x "$VENV/bin/python" ] || "$PY" -m venv "$VENV"
"$VENV/bin/python" -m pip install --quiet --upgrade pip
"$VENV/bin/python" -m pip install -r "$HERE/requirements.txt"

# model checkpoints
fetch() { # url, file, sha256
  if [ -f "$2" ] && [ "$(shasum -a 256 "$2" | cut -d' ' -f1)" = "$3" ]; then return; fi
  echo "Downloading $(basename "$2")"; mkdir -p "$(dirname "$2")"; curl -fL --retry 3 -# -o "$2.part" "$1"
  [ "$(shasum -a 256 "$2.part" | cut -d' ' -f1)" = "$3" ] || { echo "Checksum mismatch for $2"; rm -f "$2.part"; exit 1; }
  mv "$2.part" "$2"
}
fetch 'https://zenodo.org/record/4034264/files/CRNN_note_F1%3D0.9677_pedal_F1%3D0.9186.pth?download=1' "$MODELS/kong_piano.pth" \
  c3fa9730725bf4a762f1c14bc80cd5986eacda01b026f5a4a2525cd607876141
Y=mc13_256_g4_all_v7_mt3f_sqr_rms_moe_wf4_n8k2_silu_rope_rp_b36_nops
fetch "https://huggingface.co/spaces/mimbres/YourMT3/resolve/main/amt/logs/2024/$Y/checkpoints/last.ckpt" "$MODELS/.mt3_checkpoints/yourmt3/$Y/last.ckpt" \
  ae38e415c79efd5592dcb9b658cdb99ddb11d4c4e1eaa364cab04a052473fc25
# the beat and separation models download themselves; fetch them now so the first transcription isn't slow
"$VENV/bin/python" -c "from beat_this.inference import File2Beats; File2Beats(checkpoint_path='final0', device='cpu'); from demucs.pretrained import get_model; get_model('htdemucs')" >/dev/null 2>&1 || true

cp "$HERE/server.py" "$DIR/server.py"
echo "Done. Jun Jam.app starts the helper for you. To start it by hand: \"$VENV/bin/python\" \"$DIR/server.py\""
