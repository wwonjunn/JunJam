-- Jun Jam launcher: opens index.html (next to this app) in Chrome, where Web MIDI works.
set appDir to do shell script "dirname " & quoted form of POSIX path of (path to me)
set page to quoted form of (appDir & "/index.html")
try
	do shell script "open -Ra 'Google Chrome'"
	do shell script "open -a 'Google Chrome' " & page
on error
	display dialog "Google Chrome isn't installed, so MIDI keyboards won't work. Opening in your default browser for now." buttons {"OK"} default button 1 with title "Jun Jam"
	do shell script "open " & page
end try
