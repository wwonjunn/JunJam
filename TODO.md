# Jun Jam to-do

## Bosses
- [x] Chords, Ears and Voicings: bosses every 3-4, chapter bosses, a final boss. Tempos capped at 200.
- [ ] Play-test boss lengths (5/8/20 hits in Ears; gauntlet sizes in Voicings).

## Devil modes
- [x] Chords (per stage), Ears (per world) and Comp Hero (per song), each with 💀 ranks.
- [ ] Play-test how brutal they are; maybe a Devil leaderboard of your own bests.

## Ears (Call & Response, the game)
Done so far: the monsters, the ladder inside a run, lives, the spell and fireball, armoured brutes, the daily wave
with medals and a streak, the weekly boss, a reference note for every call, and the canvas lane.

**Content**
- [x] The Melodies world, which is melodic dictation. The same key-setting cadence plays, then a melody of 2 or 3
      notes, and you play all of them back in order. As a serpent with one segment per note: each right note blasts
      off a segment, a wrong note makes it lunge. Starts at 2 notes and grows to 3, 4, then 5 up the ladder. Use real
      melodic shapes (J-pop hooks, jazz enclosures, licks from Lines), and always name and light the first note.
      (The progression world's "play the bass line" is a different skill, and it stays.)
- [ ] Longer phrases in the other worlds: progressions of 2 to 5 chords (a caravan of wagons), and two chords in a row
      for Chord qualities.
- [ ] Star twists, like Chords' 🔥:
  - [ ] no cadence (remember the key)
  - [ ] a key change mid-run (the castle flag changes colour)
  - [ ] ghost monsters that are heard once, faster
  - [ ] the instrument changing during a run
  - [ ] inversions and voicings in Chord qualities
- [ ] A boss every 5 levels: one big monster with a health bar spread over several answers.
- [ ] Endless mode once a world's ladder is cleared.

**Feel**
- [ ] Play-test the walk speed, the 170 px lane height, how often the scenery changes, and whether hits feel satisfying.
- [ ] Hit and miss sounds without a pitch (soft thumps), or the answer note itself as the bolt's sound. Nothing that
      clashes with the ear training.
- [ ] Run medals: a flawless level, five fireballs, killing a brute without being hit.
- [x] One enemy per answer length: 👾 one note, 🐍 2, 🦎 3, 🐊 4, 🐉 5, 🕷️ chord, 🦖 bass line, bigger and slower as they grow.
- [ ] The electric piano sound: the Wurlitzer recordings are trimmed unevenly; find a better sample set.

**Rules to keep**
- Nothing needs perfect pitch: every call names and lights the note you measure from.
- Keys count from the moment the call's last sound starts, and never before it.
- No clicking during a run. Play any chord to go again.
- The Classic levels stay as they are.

## Voicings (Comp Hero, the game)
- [x] Revamp: one card per chord type with every way to play it, one lesson per chord type, stars per chord type, six chapters in order, the old dictionary as Classic.
- [ ] Play-test the lesson length (each way in C, then max(5, ways + 2) from memory).
- [x] First version: a Gig chart, scrolling chord cards with an ask on each, named voicings recognised, timing grades,
      a voice-leading bonus, a band meter, Easy/Normal/Hard. Rush and the cards stay as Classic.
- [ ] Play-test the timing windows, the scroll speed and the band meter.
- [ ] Stars twists: a held melody note your voicing must keep on top, "move at most 3 semitones", no repeats in a section.
- [ ] Pick the section of a song (or a loop of it) so long charts don't take forever.
- [ ] Graphics pass like Ears: a stage, a crowd that reacts, the band members.
- [ ] A collection page: every named voicing you've played in a song gets ticked off.
- [x] Show the hand formula ("L 1 5 9 · R ♭3 ♭7 11") next to the name in the drill and Rush, until ★★ on that voicing.

## Reharm
- [ ] A game (Loop Station: a loop that keeps playing, the slot glows, you play the move in the band, then a new key).
      Keep the current cards and drill as Classic.

## Links between modes
- [x] Chords briefings link to Voicings (chapter tab, scrolled), the Ears game (matching level) and Lines (filtered); voicing cards link back to their Chords stage.
- [x] Briefings name four licks to try (a progression's own licks first), each starting its drill.

## Lines (decided: no race, and no rhythm grading)
The transcribed timing isn't reliable. What matters is the order of the notes, which notes over which chord, and the
sound each one makes. Rhythm is never graded.
- [x] Line of the week: one line all week. Monday, learn it in its own key; each day after, play it from memory in more
      keys (2, 4, 6, then all 12 by Sunday). Finishing adds it to your vocabulary with a badge.
      Keys go round the circle of 4ths; the learn session flows into today's keys; today's share is fixed for the day;
      "All the keys left" runs the rest in one go; any chord on the results carries on.
- [x] Daily practice (about 5 minutes, one button): today's keys of the weekly line, 3 older lines due for spaced
      review, and one new line. A day streak and a calendar.
- [ ] Maybe: "where lines go": the app plays a short progression, and you drop the line onto the chord it belongs to.
- [ ] No octave-up twist.
- [x] Lick expansion: 222 to about 1,000 (860 from the Weimar solos, 79 new originals; three that repeated older licks taken out), with search, a chord filter and paging.
- [ ] Play-test the new originals; tidy any solo phrase that sounds like half a thought (thumb it down?).
- Keep the current library and drill as Classic.

## Practice (routines)
- [x] Routines of timed blocks, a timer chip across modes, a log with notes, weekly minutes and a streak.
- [x] Workout-app redesign: My routines / Explore (13, each with its reason) / History, detail view, block-card editor with drag, steppers and a picker.
- [x] A recommended order in every mode (js/path.js), soft: dimmed cards, a note, never locked.
- [ ] Maybe: count only the minutes you actually played (notes coming in), and suggest a routine from what's weakest.

## Gig
- [x] 98 charts to 1,153 (iReal Pro community playlists, U-FRET, Ultimate Guitar; chords only, converted by script).
- [ ] Script-converted chord-site charts: bar lengths are approximate (two chords a bar, a line at a time) and U-FRET sections are lettered; fix the ones you play most with Edit a copy.
- [ ] Backing track quality (parked until the AI music tools are better).
