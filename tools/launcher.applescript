-- Jun Jam launcher: opens index.html (next to this app) in Chrome, where Web MIDI works.
set appDir to do shell script "dirname " & quoted form of POSIX path of (path to me)
set page to quoted form of (appDir & "/index.html")
-- If the transcriber helper is installed, start it in the background (with the project's latest server.py)
do shell script "S=\"$HOME/Library/Application Support/Jun Jam\"; if [ -x \"$S/transcriber-venv/bin/python\" ] && ! curl -s -m 1 http://127.0.0.1:8771/health >/dev/null; then cp " & quoted form of (appDir & "/tools/transcriber/server.py") & " \"$S/server.py\" 2>/dev/null; nohup \"$S/transcriber-venv/bin/python\" \"$S/server.py\" > \"$S/transcriber.log\" 2>&1 & fi; exit 0"
try
	do shell script "open -Ra 'Google Chrome'"
	do shell script "open -a 'Google Chrome' " & page
on error
	display dialog "Google Chrome isn't installed, so MIDI keyboards won't work. Opening in your default browser for now." buttons {"OK"} default button 1 with title "Jun Jam"
	do shell script "open " & page
end try
