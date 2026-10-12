/* Lines: scale runs that sound like music, not like practising scales. What makes a run sing (see the sources):
   a small cell of three or four notes moved through the scale instead of the scale straight up; starting away from the
   root and landing on a chord tone; groups of three played as 16ths, so the cell rolls across the beat (the R&B and
   gospel sound); blue notes (♭3 → 3, ♭5) crushed in as passing notes; and every run sitting over its chord.
   Notes are semitones above the chord's root (or above the V for the run into i). Jun Jam originals on these patterns,
   except the Magic Run, which is Piano With Jonny's. */
const RSRC={
  magic:'https://pianowithjonny.com/piano-lessons/the-ultimate-piano-run-the-magic-run/',
  pent:'https://www.skoove.com/blog/pentatonic-scales-on-piano/',
  popPent:'https://www.the-maestro-online.com/blog/how-can-you-use-pentatonic-runs-for-pop-piano-solos-a-practical-approach/',
  gospel:'https://pianowithjonny.com/piano-lessons/play-contemporary-gospel-and-rb-piano-in-3-steps/',
};
const run=(id,name,diff,over,notes,o)=>Lk('run_'+id,name,diff,'Runs',over,notes,o);
const T3=1/3;
LICKS.push(
  run('pent3','Pentatonic threes, down',1,'six',S([21,19,16, 19,16,14, 16,14,12, 14,12,9, 12],T3,1),
    {src:RSRC.pent,tip:'Major pentatonic in falling groups of three (6 5 3, 5 3 2, 3 2 1…), as triplets. Starts on the 6, lands on the root.'}),
  run('pent4','Pentatonic fours, up',2,'maj',S([0,2,4,7, 2,4,7,9, 4,7,9,12, 7,9,12,14],.25,.5),
    {src:LSRC.mccoy,tip:'1 2 3 5 cells climbing a step of the pentatonic at a time, the McCoy Tyner and Herbie Hancock way to make a scale fly.'}),
  run('mcascade','Minor pentatonic cascade',2,'min7',S([24,22,19, 22,19,17, 19,17,15, 17,15,12, 15,12,10, 12],.25,.75),
    {src:LSRC.neo,tip:'Groups of three played as 16ths, so each cell starts on a different part of the beat. That roll is the R&B sound.'}),
  run('blues5','Blues run with the ♭5',2,'dom7',S([24,22,19,18,17,15,16,12],.25,1),
    {src:LSRC.blues,tip:'Down the blues scale through the ♭5 (G♭ in C), then the ♭3 crushed up into the 3 on the way to the root.'}),
  run('gospel','Gospel crush run',2,'maj',S([21,19,15,16,14,12,9,7,3,4,0],.25,1),
    {src:RSRC.gospel,tip:'The gospel scale (major pentatonic plus ♭3): every time it passes the 3, it slides in from the ♭3.'}),
  run('magic','The Magic Run',3,'maj7',S([0,2,7,2,4,6, 7,9,14,9,11, 12,14,19,14,16],.25,.75),
    {src:RSRC.magic,tip:'Piano With Jonny\'s Magic Run: Lydian split into two 5-note groups that share the 5, each played 1 2 5 2 3 4. Repeats up the octaves.'}),
  run('thirds','Thirds down the scale',2,'maj',S([24,21,23,19,21,17,19,16,17,14,16,12],.25,1),
    {src:LSRC.bebopScale,tip:'The scale in falling 3rds (C A, B G, A F…). Same notes as the scale, a far more melodic shape.'}),
  run('dorian','Dorian sweep',2,'min7',S([0,2,3,7, 2,3,5,9, 3,5,7,10, 5,7,9,12],.25,.75),
    {tip:'1 2 ♭3 5 cells stepping up the Dorian mode. The natural 6 (A in Cm) on the second cell is the Dorian colour.'}),
  run('spread','Spread arpeggio, 1 5 9 10',1,'maj',S([0,7,14,16,19,24,26,28],.25,1),
    {src:LSRC.wilson,tip:'Root, 5, 9, 10, then the same an octave up: the wide add9 sweep for intros and endings. Use both hands if it stretches.'}),
  run('bebop','Bebop line into the 3rd',1,'dom7',S([12,11,10,9,7,5,4],.5,1),
    {swing:1,src:LSRC.bebopScale,tip:'Down the bebop dominant scale: the extra major 7 passing note keeps the chord tones on the beats, so it lands on the 3.'}),
  run('hminor','Harmonic minor fall into i',2,[[0,0,'d7b9',1.75],[3,5,'min',2]],S([13,12,10,8,7,5,4,5],.25,1.5),
    {tip:'Over V7♭9 in a minor key: down harmonic minor from the ♭9, through the leading tone, home on the root of i.'}),
  run('whole','Whole-tone drop',2,'d7b13',S([22,20,18,16,14,12,10,8],.25,1),
    {tip:'A whole-tone scale falling over a 7♭13. The ♯5 and ♯11 in it give the dreamy, floating sound of fusion and anime scores.'}),
  run('dim','Diminished cells',3,'d7b9',S([0,1,3,4, 3,4,6,7, 6,7,9,10, 9,10,12,13],.25,.75),
    {tip:'The half-whole scale over a 7♭9 as one 4-note cell (1 ♭9 ♯9 3) moved up a minor 3rd each time. Same shape, four times.'}),
  run('fifthpent','Pentatonic from the 5th',2,'min7',S([29,26,24,22, 26,24,22,19, 24,22,19,17, 22,19,17,14],.25,.75),
    {src:LSRC.neo,tip:'Over Cm7, G minor pentatonic: the 5, ♭7, root, 9 and 11. Falling fours, all colour, no plain root-position sound.'}),
  run('rolls','Rolling triad climb',1,'maj',S([4,7,12, 7,12,16, 12,16,19, 16,19,24, 19],.25,.75),
    {tip:'A 3 5 1 cell climbing the inversions of the triad, in 16ths so it rolls over the beat. The same idea as the ANM rolling cells.'}),
);
