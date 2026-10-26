/* Voicings: many ways to play one chord, with both hands, written out note for note in C (C4 = middle C).
   Left hand | right hand. Every hand stays within a reach of 15 semitones (C up to the D♯ above the octave, big hands)
   and most within a 10th's worth less than that; the two hands together often span two octaves or more, which is the point:
   these fill the keyboard. Families: Pop & gospel, Shells, Rootless (Bill Evans A and B), Upper structures (a triad
   on top of a shell), Quartal (stacked 4ths), Spreads & clusters, and Slash chords. */
// Chord types beyond the ones Chords drills, so the library can name the big ones (same shape as QUALS entries)
const VX=Object.fromEntries([
  Qd('maj13','maj13',0,[0,4,7,11],[4,11,9],[2,6],{rootless:1,lab:{9:'13'}}),
  Qd('min13','m13',0,[0,3,7,10],[3,10,9],[2,5],{rootless:1,minor:1,lab:{9:'13'}}),
  Qd('sus9','9sus4',0,[0,5,7,10],[5,10,2],[9],{rootless:1,lab:{5:'4'}}),
  Qd('sus13','13sus4',0,[0,5,7,10],[5,10,9],[2],{rootless:1,lab:{5:'4',9:'13'}}),
  Qd('susb9','7sus4♭9',0,[0,5,7,10],[5,10,1],[8],{rootless:1,lab:{5:'4'}}),
  Qd('d13b9','13♭9',0,[0,4,7,10],[4,10,9,1],[6],{rootless:1,lab:{9:'13'}}),
  Qd('d13s11','13♯11',0,[0,4,7,10],[4,10,9,6],[2],{rootless:1,lab:{9:'13'}}),
  Qd('d7s5','7♯5',0,[0,4,8,10],[4,8,10],[2,6],{rootless:1,lab:{8:'♯5'}}),
  Qd('min69','m6/9',0,[0,3,7,9],[3,9,2],[5],{rootless:1,minor:1,lab:{9:'6'}}),
].map(q=>[q.id,q]));
const vqOf=id=>Q[id]||VX[id];
const VFAM={pop:'Pop & gospel',shell:'Shells',rootless:'Rootless',us:'Upper structures',quartal:'Quartal',spread:'Spreads & clusters',slash:'Slash chords'};
// Chord types in the order the library lists them
const VTYPES=['maj','min','sus2','sus4','dim','aug','add9','madd9','maj7','six','six9','maj9','maj13','mj7s11','mj7s5',
  'min7','min6','min69','min9','min11','min13','mmaj7','hdim','dim7',
  'dom7','dom9','dom13','sus7','sus9','sus13','susb9','d7b9','d13b9','d7s9','alt','d7b13','d7s5','d7s11','d13s11',
  'maj_3','maj_5','min_3','dom7_3','maj_2'];
const vNote=s=>{ const m=s.match(/^([A-G])([b#]?)(-?\d)$/); return 12*(+m[3]+1)+LETTER_PC[LETTERS.indexOf(m[1])]+(m[2]==='#'?1:m[2]==='b'?-1:0); };
const vSlug=s=>s.toLowerCase().replace(/[♭]/g,'b').replace(/[♯]/g,'s').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
// V(chord type, family, name, 'left hand | right hand', difficulty 1-3, tip)
const V=(qid,fam,name,notes,diff,tip)=>{ const [l,r]=notes.split('|').map(h=>h.trim().split(/\s+/).filter(Boolean).map(vNote));
  return {id:qid+'_'+vSlug(name),qid,fam,name,lh:l,rh:r,diff,tip}; };
const VOICINGS=[
  // ---------- triads ----------
  V('maj','pop','Octave and triad','C2 C3 | E4 G4 C5',1,'The pop ballad default: an octave in the left hand, a root-position triad in the right. Big, clean, nothing to clash.'),
  V('maj','pop','Gospel stack','C2 G2 C3 | G3 C4 E4 G4',1,'Root, 5th and octave low, a second-inversion triad doubled on top: the full church sound. Lean on it at the end of a phrase.'),
  V('maj','spread','Spread 10th','C3 G3 | E4 G4 C5',1,'Root and 5th in the left hand, the 3rd lifted a 10th above the root. Spreading the triad out like this is what makes it sound like a piano, not an organ.'),
  V('min','pop','Octave and triad','C2 C3 | Eb4 G4 C5',1,'The minor version of the pop default: octave low, triad high.'),
  V('min','spread','Fifths low, triad high','C2 G2 | G3 C4 Eb4',1,'An open 5th in the left hand, a second-inversion minor triad close above it. Dark and full without getting muddy.'),
  V('sus2','spread','Stacked fifths','C3 G3 D4 | G4 C5 D5',2,'C G D in the left hand is three notes a 5th apart; the right doubles the top. No 3rd at all, so it floats: the modern worship and post-rock pad.'),
  V('sus4','pop','Open sus4','C3 G3 | F4 G4 C5',1,'Root and 5th low, the 4th and 5th rubbing a step apart up top. Resolve the F down to E and you have the classic sus–major move.'),
  V('dim','spread','Spread diminished','C3 Gb3 | C4 Eb4 Gb4',1,'Root and ♭5 in the left hand, the triad on top. Used as a passing chord, so keep it light.'),
  V('aug','spread','Augmented spread','C3 G#3 | E4 G#4 C5',1,'Root and ♯5 low, the whole augmented triad above. Every note is a major 3rd apart, so it pulls in every direction at once.'),
  // ---------- pop colours ----------
  V('add9','pop','Mu chord','C3 | D4 E4 G4',1,'Steely Dan\'s favourite: the 9 squeezed right next to the 3rd in a close triad. That one-step rub is the whole sound.'),
  V('add9','spread','Open add9','C3 G3 D4 | E4 G4',1,'1 5 9 stacked in the left hand (two 5ths), 3 and 5 on top. The J-pop ballad intro chord.'),
  V('add9','pop','Gospel add9','C2 C3 | E4 G4 D5',2,'Octave bass, a triad with the 9 on the very top. The 9 as the top note sings over everything.'),
  V('madd9','pop','Minor Mu','C3 | D4 Eb4 G4',1,'The 9 crushed against the ♭3: a half step of rub inside a minor triad. The sad anime ballad chord.'),
  V('madd9','spread','Open minor add9','C3 G3 D4 | Eb4 G4',2,'Fifths in the left hand (1 5 9), the ♭3 and 5 above. Wide and wistful.'),
  // ---------- major 7 family ----------
  V('maj7','shell','Shell plus 3 and 5','C3 B3 | E4 G4',1,'The left hand plays the shell, root and 7th; the right fills in 3 and 5. The most useful two-hand layout there is: learn it on every chord.'),
  V('maj7','pop','Em over C','C2 C3 | E4 G4 B4',1,'A major 7 is a minor triad a 3rd up over the root: Em over C. Pop players think of it this way, and it sounds soft and modern.'),
  V('maj7','spread','Open 1–5, 7–3–5','C3 G3 | B3 E4 G4',2,'Root and 5th apart in the left hand, the 7th at the bottom of the right. The 7th next to the root\'s octave is where the colour lives.'),
  V('six','pop','Pop 6','C3 G3 | A3 C4 E4',1,'Root and 5th low, the 6th at the bottom of the right hand. The 6 is the sweeter, older cousin of the major 7: the end of a swing tune.'),
  V('six','spread','Sixth on top','C2 G2 | E4 G4 A4',2,'Fifths low, the 3rd, 5th and 6th close on top so the 6th sings. Big band ending.'),
  V('six9','quartal','6/9 in fourths','C3 G3 | E4 A4 D5',2,'The right hand is all 4ths, starting on the 3rd (E A D). It\'s the major pentatonic as one chord: the McCoy Tyner and Herbie Hancock opener, and the city pop "sparkle".'),
  V('six9','spread','6/9 in fifths','C2 G2 D3 | A3 E4',3,'Root, 5th and 9 stacked in 5ths in the left hand, 6 and 3 above. Fills the whole bottom of the keyboard without a single clash.'),
  V('maj9','rootless','Rootless A','C3 | E4 G4 B4 D5',2,'Bill Evans\' A voicing: 3 5 7 9 in the right hand, the root alone below. With a bass player you drop the root and play only the right hand.'),
  V('maj9','rootless','Rootless B','C3 | B3 D4 E4 G4',2,'Bill Evans\' B voicing: 7 9 3 5, the A voicing turned upside down. Use whichever of A and B is closer to the chord before.'),
  V('maj9','spread','Neo-soul 1–5, 7–9–3','C3 G3 | B3 D4 E4',2,'Root and 5th open, then a tight cluster of 7, 9 and 3. The 9 sits a step from both neighbours: the soft rub of neo-soul and lofi.'),
  V('maj9','spread','Wide major 9','C2 G2 D3 | E4 G4 B4 D5',3,'1 5 9 in the left hand, 3 5 7 9 in the right. Over two and a half octaves: the end-of-song chord that fills the room.'),
  V('maj13','spread','Shell plus 3, 13, 9','C3 B3 | E4 A4 D5',2,'Shell in the left (1 and 7), then 3, 13 and 9 in the right, each a 4th apart. The lush jazz ballad major.'),
  V('maj13','spread','Neo-soul major 13','C3 G3 B3 | D4 E4 A4',3,'1 5 7 low, then 9, 3 and 13. Every tension, nothing doubled.'),
  V('mj7s11','us','D over Cmaj7 (Lydian)','C3 E3 B3 | D4 F#4 A4',2,'A D major triad on top of a C major 7 shell gives 9, ♯11 and 13: the Lydian sound of film scores and anime. The ♯11 is what makes it shimmer.'),
  V('mj7s11','spread','Lydian 1–5, 7–3–♯11','C3 G3 | B3 E4 F#4',2,'The ♯11 a half step above the 3rd, on top. Brighter than bright.'),
  V('mj7s5','us','E over C','C2 C3 | E4 G#4 B4',2,'An E major triad over a C bass. The ♯5 makes the major 7 restless, a chord that wants to move.'),
  V('mj7s5','shell','Shell plus 3 and ♯5','C3 B3 | E4 G#4',1,'The plain shell with the 5th raised. Try it as the chord before a plain C major 7.'),
  // ---------- minor family ----------
  V('min7','shell','Shell plus ♭3 and 5','C3 Bb3 | Eb4 G4',1,'Root and ♭7 in the left, ♭3 and 5 in the right. The minor version of the most useful shape.'),
  V('min7','pop','E♭ over C','C2 C3 | Eb4 G4 Bb4',1,'A minor 7 is a major triad a minor 3rd up over the root: E♭ over C. Easy to find, sounds smooth.'),
  V('min7','spread','Open 1–5, ♭7–♭3–5','C3 G3 | Bb3 Eb4 G4',2,'Root and 5th open, the ♭7 at the bottom of the right hand.'),
  V('min6','spread','Minor 6 spread','C3 G3 | A3 Eb4 G4',2,'The natural 6th next to the 5th, under the ♭3. The minor 6 is the Dorian chord: dark but with a light in it.'),
  V('min69','spread','Bond minor 6/9','C3 G3 | A3 D4 Eb4',3,'6, 9 and ♭3 up top, the 9 and ♭3 a half step apart. Mysterious, spy-movie minor.'),
  V('min9','rootless','Rootless A','C3 | Eb4 G4 Bb4 D5',2,'♭3 5 ♭7 9 in the right hand over the root. The minor 9 every ii–V starts with.'),
  V('min9','rootless','Rootless B','C3 | Bb3 D4 Eb4 G4',2,'♭7 9 ♭3 5: the A voicing flipped. The 9 and ♭3 a half step apart in the middle give it that warm rub.'),
  V('min9','pop','E♭maj7 over C','C2 C3 | Eb4 G4 Bb4 D5',2,'A minor 9 is a major 7 chord a minor 3rd up, over the root. Octave bass, E♭maj7 on top: the neo-soul minor.'),
  V('min9','spread','Wide minor 9','C2 G2 Bb2 | Eb4 G4 Bb4 D5',3,'1 5 ♭7 in the left hand, ♭3 5 ♭7 9 in the right. Wide enough to fill the keyboard, still clear.'),
  V('min11','spread','Kenny Barron','C3 G3 D4 | Eb4 Bb4 F5',3,'Kenny Barron\'s minor 11: the left hand stacks 1 5 9 in 5ths, the right stacks ♭3 ♭7 11 in 5ths. Two hands, all 5ths, over two octaves: the most beautiful minor chord in jazz.'),
  V('min11','quartal','So What','C3 F3 Bb3 | Eb4 G4',2,'Bill Evans\' chord from Miles Davis\'s “So What”: three 4ths stacked up from the root, then a major 3rd on top. Modal and open.'),
  V('min11','spread','Neo-soul minor 11','C3 Bb3 | Eb4 F4 G4',2,'Shell low, then a cluster of ♭3, 11 and 5. The 11 squeezed in the middle is the lofi minor.'),
  V('min13','spread','Dorian 13','C3 Bb3 | Eb4 A4 D5',3,'Shell low, then ♭3, 13 and 9 in 4ths. The natural 13 (A in C minor) makes it Dorian: the minor chord of fusion and city pop.'),
  V('mmaj7','spread','James Bond chord','C3 G3 | B3 D4 Eb4 G4',2,'Minor triad with a major 7 and 9: the chord that ends the 007 theme. B and D and E♭ packed together, pure suspense.'),
  V('mmaj7','shell','Shell plus ♭3 and 5','C3 B3 | Eb4 G4',1,'Root and major 7 low, ♭3 and 5 high. Hear the major 7 grind against the minor 3rd.'),
  V('hdim','shell','Shell plus ♭7 and ♭3','C3 Gb3 | Bb3 Eb4',1,'Root and ♭5 in the left hand, ♭7 and ♭3 in the right. The ii of a minor ii–V.'),
  V('hdim','rootless','Locrian ♮9','C3 | Eb4 Gb4 Bb4 D5',2,'♭3 ♭5 ♭7 and a natural 9 over the root. The natural 9 softens the half-diminished: the modern jazz sound.'),
  V('hdim','pop','E♭m over C','C2 C3 | Eb4 Gb4 Bb4',1,'Half-diminished is a minor triad a minor 3rd up over the root: E♭m over C.'),
  V('dim7','spread','Spread diminished 7','C3 Gb3 | A3 C4 Eb4',1,'Root and ♭5 in the left, the ♭♭7, root and ♭3 in the right. Every note a minor 3rd apart: it\'s the same four notes in four keys.'),
  V('dim7','spread','Diminished with a 9','C3 Gb3 | A3 D4 Eb4',2,'Swap a chord tone for the note a whole step above (here a 9 under the ♭3): Barry Harris\' trick for diminished chords that sing.'),
  // ---------- dominant family ----------
  V('dom7','shell','Bud Powell shell','C3 E3 Bb3 | G4 C5',1,'1 3 ♭7 in the left hand (Bud Powell\'s shell), 5 and root on top. The 3 and ♭7 are the two notes that make it a dominant.'),
  V('dom7','shell','Shell plus 3, 5, 1','C3 Bb3 | E4 G4 C5',1,'Root and ♭7 low, a C triad high. The blues and gospel 7.'),
  V('dom7','spread','Open 1–5, ♭7–3','C3 G3 | Bb3 E4',1,'Four notes, wide: the tritone (B♭ up to E) sits in the middle of the right hand.'),
  V('dom9','rootless','Rootless A','C3 | E4 G4 Bb4 D5',2,'3 5 ♭7 9 in the right hand. With a bass player, this is the whole dominant.'),
  V('dom9','rootless','Rootless B','C3 | Bb3 D4 E4 G4',2,'♭7 9 3 5. The B voicing of the dominant: it follows a rootless A minor 9 a 4th below with almost no movement.'),
  V('dom9','spread','Gospel 9','C3 Bb3 | E4 G4 D5',2,'Shell low, 3 and 5 and the 9 on top in the right. The 9 on top is the soulful part.'),
  V('dom13','rootless','Rootless A13','C3 | Bb3 D4 E4 A4',2,'♭7 9 3 13: the A voicing of the 13. The 13 on top is the melody note of a thousand standards.'),
  V('dom13','rootless','Rootless B13','C3 | E4 A4 Bb4 D5',2,'3 13 ♭7 9, with the 13 and ♭7 a half step apart. The rub is the jazz.'),
  V('dom13','shell','Count Basie 13','C2 Bb2 | E3 A3 D4',2,'Shell in the left (1 ♭7), then 3, 13 and 9 in 4ths. The big band 13: punchy and complete.'),
  V('dom13','shell','Red Garland 13','C3 Bb3 | E4 A4',1,'Just four notes: shell, then 3 and 13. Easy to grab and it already sounds like jazz.'),
  V('sus7','shell','Shell sus','C3 Bb3 | F4 G4',1,'Root and ♭7 low, the 4th and 5th a step apart up top. No 3rd, so it hangs in the air.'),
  V('sus9','us','B♭ over C (Herbie sus)','C3 | Bb3 D4 F4',1,'A B♭ triad over a C bass gives 9sus4. Herbie Hancock made it the sound of “Maiden Voyage”; it\'s also the J-pop IV-over-V.'),
  V('sus9','spread','Gospel sus 1–5, ♭7–9–4','C3 G3 | Bb3 D4 F4',2,'Root and 5th open, then a B♭ triad. The gospel “IV over V” before the final chord.'),
  V('sus13','us','B♭maj7 over C','C3 | Bb3 D4 F4 A4',2,'B♭maj7 over C: a 13sus4. Wide open, the fusion and neo-soul sus.'),
  V('susb9','us','B♭m over C (Phrygian)','C3 | Bb3 Db4 F4',2,'A B♭ minor triad over C gives 7sus4♭9, the Phrygian chord: Spanish, dark, the sound of flamenco and of Chick Corea.'),
  V('d7b9','us','D♭°7 over C','C3 | Db4 E4 G4 Bb4',2,'A 7♭9 is a diminished 7 a half step above the root, over the root. Find D♭°7 and put C under it.'),
  V('d7b9','shell','Shell plus 3 and ♭9','C3 Bb3 | E4 Db5',2,'Root and ♭7 low, 3 and ♭9 up top. The ♭9 on top is the tense note that falls into the next chord\'s 5th.'),
  V('d13b9','us','A over C7 (upper structure VI)','C3 E3 Bb3 | A4 Db5 E5',3,'An A major triad over the C7 shell gives 13, ♭9 and 3. The tight, dark-and-bright dominant of bebop ballads.'),
  V('d13b9','rootless','Rootless 13♭9','C3 | E4 A4 Bb4 Db5',2,'3 13 ♭7 ♭9 over the root: the rootless B13 with the 9 lowered.'),
  V('d7s9','spread','Hendrix chord','C3 | E4 Bb4 D#5',1,'Root, then 3, ♭7 and ♯9 on top. The ♯9 is the ♭3 on top of a major 3rd: blues in one chord (“Purple Haze”).'),
  V('d7s9','us','E♭ over C7 (upper structure ♭III)','C3 E3 Bb3 | Eb4 G4 Bb4',2,'An E♭ major triad over the C7 shell: ♯9, 5 and ♭7. Funk and gospel.'),
  V('alt','us','A♭ over C7 (upper structure ♭VI)','C3 E3 Bb3 | Ab4 C5 Eb5',2,'An A♭ major triad over the C7 shell gives ♭13, root and ♯9: the altered dominant in one shape. The most used upper structure.'),
  V('alt','us','G♭ over C7 (upper structure ♭V)','C3 E3 Bb3 | Gb4 Bb4 Db5',3,'A G♭ triad (the tritone sub) over the C7 shell: ♯11, ♭7, ♭9. Two dominants at once.'),
  V('alt','rootless','Rootless alt','E3 Bb3 | Eb4 Ab4',2,'No root at all: the tritone (3 and ♭7) in the left hand, ♯9 and ♭13 in the right. With a bass player, this is the altered chord.'),
  V('d7b13','rootless','Whole-tone 7♭13','C3 | Bb3 D4 E4 Ab4',2,'♭7 9 3 ♭13: all from one whole-tone scale. Dreamy, floating, the anime-score dominant.'),
  V('d7s5','us','Augmented on the 3rd','C3 Bb3 | E4 G#4 C5',2,'Shell low, an E augmented triad (3 ♯5 1) high. The ♯5 rises into the next chord\'s 3rd.'),
  V('d7s11','rootless','Lydian dominant','C3 | Bb3 E4 F#4 A4',2,'♭7 3 ♯11 13 over the root. The ♯11 a half step above the 3rd: the bright dominant of bossa and fusion.'),
  V('d13s11','us','D over C7 (upper structure II)','C3 E3 Bb3 | D4 F#4 A4',2,'A D major triad on the C7 shell gives 9, ♯11 and 13. Every tension a dominant can have without altering it.'),
  // ---------- slash chords: the bass note is the point ----------
  V('maj_3','slash','Octave bass, triad up','E2 E3 | C4 E4 G4',1,'C over E: the 3rd in the bass, an octave in the left hand. The stepping-stone in a walking bass line (C, C/E, F).'),
  V('maj_3','slash','6th in the left hand','E2 C3 | G3 C4 E4',2,'E up to C in the left hand (a minor 6th), the triad above. The classical way: smooth and full.'),
  V('maj_5','slash','Fifth in the bass','G2 G3 | C4 E4 G4',1,'C over G: the 5th in the bass. A pedal point, often before the V or under a big ending.'),
  V('min_3','slash','Octave bass, triad up','Eb2 Eb3 | C4 Eb4 G4',1,'Cm over E♭: the ♭3 in the bass. The minor line cliché moves through it.'),
  V('dom7_3','slash','Passing 7 over the 3rd','E2 E3 | G3 Bb3 C4',1,'C7 over E: the 3rd in the bass leads up a half step into F. The gospel and J-pop passing chord.'),
  V('maj_2','slash','IV over V','D2 D3 | C4 E4 G4',1,'C over D (a IV triad on the V bass, in G): the J-pop and gospel dominant. Softer than a D7, and it still pulls home.'),
  V('maj_2','slash','IV over V, spread','D3 | E4 G4 C5',1,'D in the left hand alone, C triad high. Lighter, for ballads.'),
];
const VOICE=Object.fromEntries(VOICINGS.map(v=>[v.id,v]));
// The voicing in a key: midi notes for both hands, the root and the chord
function vcIn(v,pc){
  const q=vqOf(v.qid); let sh=pc; const lo=Math.min(...v.lh,...v.rh);
  if(pc>6&&lo+pc-12>=36) sh-=12;
  const lh=v.lh.map(m=>m+sh), rh=v.rh.map(m=>m+sh), root=defaultRoot(pc,q.minor);
  return {v,q,root,lh,rh,notes:[...lh,...rh].sort((a,b)=>a-b),pc};
}
const vcWide=v=>Math.max(...v.lh,...v.rh)-Math.min(...v.lh,...v.rh)>=24;   // fills the keyboard: two octaves or more, low to high
const vcSym=t=>symText({root:t.root,q:t.q});
const vcLab=(t,m)=>{ const iv=mod12(m-t.root.pc); return iv===0?'1':t.q.lab[iv]||BASE_LABEL[iv]; };
const vcSpell=(t,m)=>spellNote(m,t.root,t.q);
