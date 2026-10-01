/* Reharm: the moves as data. Pure, no DOM. Tested by tests/theory.test.js
   Each move: a short progression before and after, written like PROGS ([letter steps, semitones, quality, degree, bass degree]),
   the positions you play (slots), and a card that says what it is, why it works and where you hear it. */
const RHSRC={
  secdom:'https://pianowithjonny.com/piano-lessons/secondary-dominants-the-complete-guide/',
  passing:'https://pianowithjonny.com/piano-lessons/passing-chords-5-levels-beginner-to-pro/',
  tritone:'https://learnmusictheory.net/pdfs/pdffiles/04-09-introductiontoreharmonization.pdf',
  iiV:'https://www.thejazzpianosite.com/jazz-piano-lessons/jazz-reharmonization/ii-v-substitution/',
  cadence:'https://www.learnjazzstandards.com/blog/musical-cadences/',
  reharm:'https://en.wikipedia.org/wiki/Harmonization',
};
const I_=[0,0,'maj7','I'], II_=[1,2,'min7','II'], III_=[2,4,'min7','III'], IV_=[3,5,'maj7','IV'], V_=[4,7,'dom7','V'], VI_=[5,9,'min7','VI'];
const RH=(id,name,tier,o)=>({id,name,tier,...o});
const REHARM_MOVES=[
  // ---------------- Tier 1: everyday moves ----------------
  RH('secdom','Secondary dominant',1,{what:'Put a dominant 7th in front of a chord to point at it, as if that chord were briefly home.',
    why:'A7 is the V of Dm. Its C♯ is a leading note that pulls up to D, so IIm7 arrives with a real pull instead of just showing up.',
    where:'Everywhere. The VI7 in the I–VI–II–V turnaround.',ask:'Make VIm7 a dominant that points at IIm7',
    before:[I_,VI_,II_,V_],after:[I_,[5,9,'dom7','VI'],II_,V_],slots:[1],src:RHSRC.secdom}),
  RH('addii','Add the ii',1,{what:'Put the ii chord right before a dominant, so V7 becomes IIm7–V7.',
    why:'Two chords leading in is smoother than one: IIm7 moves to V7 by a 4th, the strongest root motion there is.',
    where:'The ii–V–I, the most common move in jazz. It works in front of any dominant, secondary ones too.',ask:'Add the ii in front of V7',
    before:[I_,V_,I_],after:[I_,II_,V_,I_],slots:[1],src:RHSRC.iiV}),
  RH('ivv','IV/V instead of V7',1,{what:'Swap V7 for the IV chord over the V bass note: F/G in C.',
    why:'F/G keeps G in the bass but leaves out the 3rd (B), so the pull home is softer and more open. It is the same sound as G9sus4.',
    where:'All over J-pop, gospel and city pop: the IV/V option in Royal Road and Passing diminished.',ask:'Replace V7 with IV over the V bass',
    before:[II_,V_,I_],after:[II_,[3,5,'maj_2','IV','V'],I_],slots:[1]}),
  RH('minoriv','Minor iv',1,{what:'After IV, make it minor before going home: F → Fm6 → C.',
    why:'Fm borrows A♭ from C minor. A♭ falls a half step to G, a bittersweet sigh into the I.',
    where:'J-pop ballads; the Minor iv progression (サブドミナントマイナー).',ask:'Make the IV minor before going home',
    before:[IV_,I_],after:[IV_,[3,5,'min6','IV'],I_],slots:[1],src:RHSRC.reharm}),
  RH('passdim','Passing diminished',1,{what:'Slide a diminished 7th between two chords a whole step apart: C → C♯°7 → Dm7.',
    why:'C♯°7 is A7♭9 without its root, a secondary dominant in disguise, and the bass climbs by half steps.',
    where:'Gospel, city pop and J-pop; the ♯IV°7 in the Passing diminished progression.',ask:'Fill the gap between I and IIm7 with a passing chord',
    before:[I_,II_,V_],after:[I_,[0,1,'dim7','♯I'],II_,V_],slots:[1],src:RHSRC.passing}),
  RH('deceptive','Deceptive cadence',1,{what:'Resolve V7 to VIm7 instead of I.',
    why:'VIm7 shares notes with I (C, E and G), so it sounds like home but sadder, and the phrase keeps going instead of ending.',
    where:'The end of a verse that wants one more line; ballads.',ask:'Fake the ending: resolve V7 somewhere else',
    before:[II_,V_,I_],after:[II_,V_,VI_],slots:[2],src:RHSRC.cadence}),
  RH('sus','Sus before the 3rd',1,{what:'Delay the V7: play V7sus4 first, then V7.',
    why:'The sus4 (C over G) holds the 3rd back; letting it fall to B makes a small resolution before the big one.',
    where:'Gospel and pop endings, film-score cadences.',ask:'Hold the V back with a sus chord first',
    before:[II_,V_,I_],after:[II_,[4,7,'sus7','V'],V_,I_],slots:[1]}),
  RH('iiiForI','I to IIIm7',1,{what:'Replace the second bar of I with IIIm7.',
    why:'Em7 shares three notes with Cmaj7 (E, G and B), so it keeps the home sound while the bass moves, setting up III–VI–II–V.',
    where:'City pop turnarounds; the III–VI–II–V progression.',ask:'Swap the second bar of I for a chord that shares its notes',
    before:[I_,I_,II_,V_],after:[I_,III_,II_,V_],slots:[1],src:RHSRC.reharm}),
  // ---------------- Tier 2: colour and motion ----------------
  RH('tritone','Tritone sub',2,{what:'Replace V7 with the dominant a tritone away: D♭7 for G7.',
    why:'G7 and D♭7 share the same 3rd and 7th (B and F, swapped), so the pull home stays, but the bass slides down by half step.',
    where:'Jazz everywhere, neo-soul, Jacob Collier-style reharms.',ask:'Replace V7 with its tritone sub',
    before:[II_,V_,I_],after:[II_,[1,1,'dom7','♭II'],I_],slots:[1],src:RHSRC.tritone}),
  RH('backdoor','Backdoor ii–V',2,{what:'Come home from the flat side: IVm7 → ♭VII7 → I instead of IIm7 → V7 → I.',
    why:'B♭7 in C has A♭ and D in it; A♭ falls to G and D steps up to E, a warm, slightly bluesy way into the I.',
    where:'Standards, gospel, and the Backdoor progression.',ask:'Replace the ii–V with the backdoor ii–V',
    before:[II_,V_,I_],after:[[3,5,'min7','IV'],[6,10,'dom7','♭VII'],I_],slots:[0,1],src:RHSRC.iiV}),
  RH('borrowed','Borrowed ♭VI and ♭VII',2,{what:'Approach I from the flat side with two borrowed major chords: A♭maj7 → B♭7 → C.',
    why:'Both come from C minor. The roots climb by whole steps into I, a bright, triumphant arrival: the video-game victory sound.',
    where:'Anime and game endings, rock ballads, J-pop final choruses.',ask:'Swap IV and V for the two borrowed chords',
    before:[IV_,V_,I_],after:[[5,8,'maj7','♭VI'],[6,10,'dom7','♭VII'],I_],slots:[0,1],src:RHSRC.reharm}),
  RH('iii7','III7 instead of IIIm7',2,{what:'Make the IIIm7 in the Royal Road a dominant: III7, pointing at VIm7.',
    why:'E7 is the V of Am. Its G♯ leans into A, which turns the Royal Road into the Just the Two of Us sound.',
    where:'Just the Two of Us (丸サ進行) and countless J-pop choruses.',ask:'Turn the IIIm7 into a dominant that points at VIm7',
    before:[IV_,V_,III_,VI_],after:[IV_,V_,[2,4,'dom7','III'],VI_],slots:[2],src:RHSRC.secdom}),
  RH('slip','Chromatic approach chord',2,{what:'Approach a chord from a half step above with the same chord type: E♭m7 → Dm7.',
    why:'Every note slides down a half step into the target: the smoothest possible way in, a slick slip into place.',
    where:'Neo-soul, gospel, and any time a chord needs a lead-in.',ask:'Slip into IIm7 from a half step above',
    before:[I_,II_,V_],after:[I_,[2,3,'min7','♭III'],II_,V_],slots:[1],src:RHSRC.reharm}),
];
const RHMOVE=Object.fromEntries(REHARM_MOVES.map(m=>[m.id,m]));
// Chord types that count for a slot: any member of the written chord's family
const RH_FAM={dom7:['dom7','dom9','dom13','d7b9','d7s9','alt','d7b13','d7s11'],min7:['min7','min9','min11'],maj7:['maj7','maj9','six','six9','mj7s11'],
  dim7:['dim7','dim'],min6:['min6','min7','min','mmaj7','min9'],sus7:['sus7'],maj_2:['maj_2']};
const rhAccepts=q=>(RH_FAM[q.id]||[q.id]).map(id=>Q[id]);
const rhChords=(entries,keyPc)=>progChords({ch:entries},keyPc,a=>a[0]);
