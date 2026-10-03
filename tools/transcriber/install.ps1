# Installs the Jun Jam transcriber helper on Windows, into a private Python environment.
# Nothing goes into your project folder; remove it any time by deleting %LOCALAPPDATA%\Jun Jam.
# Run from PowerShell:  powershell -ExecutionPolicy Bypass -File "<Jun Jam folder>\tools\transcriber\install.ps1"
$ErrorActionPreference = 'Stop'
$Dir    = if ($env:JJ_DIR) { $env:JJ_DIR } else { Join-Path $env:LOCALAPPDATA 'Jun Jam' }
$Venv   = Join-Path $Dir 'transcriber-venv'
$Models = Join-Path $Dir 'models'
$Here   = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "Jun Jam transcriber: installing into $Dir (about 4 GB, 5 to 15 minutes)"
New-Item -ItemType Directory -Force -Path $Dir, $Models | Out-Null

# A private Python 3.11, fetched with uv (from astral.sh): no Python install needed beforehand
$Uv = Join-Path $Dir 'uv\uv.exe'
if (-not (Test-Path $Uv)) {
  Write-Host 'Downloading uv (it fetches a private Python)'
  $env:UV_UNMANAGED_INSTALL = (Join-Path $Dir 'uv')
  Invoke-RestMethod https://astral.sh/uv/install.ps1 | Invoke-Expression
}
$env:UV_PYTHON_INSTALL_DIR = (Join-Path $Dir 'python')
& $Uv python install 3.11
$Py = (& $Uv python find 3.11).Trim()
if (-not (Test-Path (Join-Path $Venv 'Scripts\python.exe'))) { & $Py -m venv $Venv }
$VPy = Join-Path $Venv 'Scripts\python.exe'
& $VPy -m pip install --quiet --upgrade pip
& $VPy -m pip install -r (Join-Path $Here 'requirements.txt')
& $VPy -m pip install --quiet onnxruntime      # Basic Pitch runs its model with ONNX on Windows

# model checkpoints, checked against known hashes
function Fetch($Url, $File, $Sha) {
  if ((Test-Path $File) -and ((Get-FileHash $File -Algorithm SHA256).Hash -eq $Sha.ToUpper())) { return }
  Write-Host "Downloading $(Split-Path -Leaf $File)"; New-Item -ItemType Directory -Force -Path (Split-Path -Parent $File) | Out-Null
  Invoke-WebRequest -Uri $Url -OutFile "$File.part"
  if ((Get-FileHash "$File.part" -Algorithm SHA256).Hash -ne $Sha.ToUpper()) { Remove-Item "$File.part"; throw "Checksum mismatch for $File" }
  Move-Item -Force "$File.part" $File
}
Fetch 'https://zenodo.org/record/4034264/files/CRNN_note_F1%3D0.9677_pedal_F1%3D0.9186.pth?download=1' (Join-Path $Models 'kong_piano.pth') `
  'c3fa9730725bf4a762f1c14bc80cd5986eacda01b026f5a4a2525cd607876141'
$Y = 'mc13_256_g4_all_v7_mt3f_sqr_rms_moe_wf4_n8k2_silu_rope_rp_b36_nops'
Fetch "https://huggingface.co/spaces/mimbres/YourMT3/resolve/main/amt/logs/2024/$Y/checkpoints/last.ckpt" (Join-Path $Models ".mt3_checkpoints\yourmt3\$Y\last.ckpt") `
  'ae38e415c79efd5592dcb9b658cdb99ddb11d4c4e1eaa364cab04a052473fc25'
# the beat and separation models download themselves; fetch them now so the first transcription isn't slow
try { & $VPy -c "from beat_this.inference import File2Beats; File2Beats(checkpoint_path='final0', device='cpu'); from demucs.pretrained import get_model; get_model('htdemucs')" | Out-Null } catch {}

Copy-Item -Force (Join-Path $Here 'server.py') (Join-Path $Dir 'server.py')
# a file to double-click whenever you want to transcribe
$Start = Join-Path $Dir 'Start Jun Jam helper.bat'
"@echo off`r`ntitle Jun Jam transcriber helper`r`necho Jun Jam transcriber helper. Leave this window open while you transcribe.`r`n`"$VPy`" `"$Dir\server.py`"`r`npause" | Set-Content -Encoding ASCII $Start
Copy-Item -Force $Start (Join-Path ([Environment]::GetFolderPath('Desktop')) 'Start Jun Jam helper.bat')
Write-Host ''
Write-Host 'Done. Double-click "Start Jun Jam helper" on your Desktop whenever you want to transcribe, then use Jun Jam.'
