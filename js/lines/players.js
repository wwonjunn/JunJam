/* Lines from players' own videos, transcribed with Jun Jam's Transcribe (three models voting), cut at the phrase and checked against the chord.
   Short phrases, credited to the player and the video, filed with the famous-solo licks.
   A.N.M-PIANO: https://www.youtube.com/@anmpiano. From "Free Music.. No Limitations.. Nubbin hit 🎯.. Lead Synth
   Music 2025" (A♭ major, 80 bpm, on a lead synth). Fast lines: these are 32nd notes at 80, so start them on Slow. */
const ANM_SRC='https://www.youtube.com/@anmpiano';
const ANM_TUNE='"Free Music.. Nubbin hit" (lead synth, 2025)';
const anm=(id,name,diff,ch,notes,tip)=>Lk('anm_'+id,name,diff,'Solo',ch,notes,{artist:'A.N.M-PIANO',src:ANM_SRC,tip:`From A.N.M-PIANO's ${ANM_TUNE}. ${tip}`});
SOLO_LICKS.push(
  anm('roll','Rolling 6 chord',2,[[0,0,'six',2]],[[-3,0.125,0],[0,0.125,0.125],[7,0.125,0.25],[0,0.125,0.375],[-3,0.125,0.5],[7,0.125,0.625],[0,0.125,0.75],[-3,0.125,0.875],[7,0.125,1],[0,0.125,1.125],[-3,0.125,1.25],[7,0.125,1.375],[0,0.125,1.5],[-3,0.125,1.625],[7,0.125,1.75],[0,0.125,1.875]],
    'Bar 7: one three-note cell (6, root, 5) rolled over and over. The R&B shimmer: easy notes, all in the speed.'),
  anm('dbroll','add9 roll on the IV',2,[[0,0,'maj',2]],[[7,0.125,0],[4,0.125,0.125],[7,0.125,0.25],[12,0.125,0.375],[14,0.125,0.5],[12,0.125,0.625],[4,0.125,0.75],[7,0.125,0.875],[12,0.125,1],[14,0.125,1.125],[12,0.125,1.25],[7,0.125,1.375],[4,0.125,1.5],[7,0.125,1.625],[12,0.125,1.75],[14,0.125,1.875]],
    'Bar 23: 5, 3, 5, root, 9, root, a six-note wave over the IV chord. The 9 on top is what makes it sparkle.'),
  anm('cascade','Pentatonic cascade',3,[[0,0,'min7',2.25]],[[2,0.125,0],[0,0.125,0.125],[-2,0.125,0.25],[5,0.125,0.375],[2,0.125,0.5],[-2,0.125,0.625],[-5,0.125,0.75],[0,0.125,0.875],[2,0.125,1],[0,0.125,1.125],[-2,0.125,1.25],[-3,0.125,1.375],[-5,0.125,1.5],[-7,0.125,1.625],[-8,0.125,1.75],[-5,0.375,1.875]],
    'Bar 3: a pentatonic run that steps down in little loops, then falls straight to the 5.'),
  anm('rundown','Run down to the sus',3,[[0,0,'six',1],[4,7,'sus7',1.5]],[[5,0.125,0],[4,0.125,0.125],[2,0.125,0.25],[0,0.25,0.375],[0,0.125,0.625],[2,0.125,0.75],[4,0.125,0.875],[2,0.125,1],[0,0.125,1.125],[-3,0.125,1.25],[-5,0.125,1.375],[0,0.125,1.625],[-7,0.125,1.75],[0,0.25,1.875],[-7,0.25,2.25]],
    'Bars 7–8: down the scale to the root, a quick turn, then the root and the 5 below it over the V7sus4.'),
  anm('c7fm','C7 into the minor',3,[[0,0,'dom7',2.88]],[[16,0.125,0],[19,0.25,0.125],[19,0.125,0.375],[16,0.125,0.5],[12,0.125,0.625],[19,0.125,0.75],[16,0.125,0.875],[12,0.125,1],[7,0.125,1.125],[8,0.125,1.25],[12,0.125,1.375],[10,0.125,1.5],[8,0.125,1.625],[7,0.125,1.75],[5,1,1.875]],
    'Bar 13: the C7 arpeggio, then a ♭13 (A♭) slipping down to land on F: the V7 pulling into Fm.'),
  anm('home','Gospel run home',3,[[0,0,'sus7',2.13]],[[-2,0.125,0],[-5,0.125,0.125],[-7,0.125,0.25],[-2,0.125,0.375],[0,0.125,0.5],[-7,0.125,0.625],[-2,0.125,0.75],[-7,0.125,0.875],[-2,0.25,1],[-2,0.125,1.25],[-7,0.125,1.375],[-9,0.125,1.5],[-10,0.125,1.625],[-12,0.125,1.75],[-14,0.25,1.875]],
    'Bar 19: zigzags around the sus chord, then runs down to the key note an octave below.'),
  anm('fmfall','Climb and fall',3,[[0,0,'maj',1.75],[5,9,'min7',2.75]],[[16,0.25,0],[19,0.25,0.25],[21,0.25,0.5],[24,1,0.75],[9,0.125,2.125],[7,0.125,2.25],[5,0.125,2.375],[4,0.125,2.5],[2,0.125,2.625],[7,0.125,2.875],[0,0.125,3.125],[-3,0.125,3.25],[-5,0.125,3.375],[-7,0.125,3.5],[-5,0.5,4]],
    'Bars 25–26: climbs to the top note and holds it, then pours down two octaves into the vi chord.'),
  anm('trill','Turn and trill',3,[[0,0,'min7',1.5],[4,7,'dom7',0.5]],[[19,0.125,0],[20,0.125,0.125],[22,0.125,0.25],[20,0.125,0.375],[19,0.125,0.5],[20,0.125,0.625],[22,0.125,0.75],[20,0.125,0.875],[19,0.125,1],[17,0.125,1.125],[15,0.125,1.25],[17,0.125,1.375],[19,0.125,1.5],[17,0.125,1.625],[15,0.125,1.75],[14,0.125,1.875]],
    'Bars 32–33: a turn on the 5 of Fm7 (C D♭ E♭ D♭), twice, then down a step at a time into C7.'),
);
