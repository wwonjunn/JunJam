/* Ears: worlds and levels. Each level is data: a generator name plus its parameters.
   Normal levels: 20 questions, 90% to pass. Boss levels: 15 questions, 3 lives, a timer, no replays. */
const ALL12=[1,2,3,4,5,6,7,8,9,10,11,12];
const WORLDS=[
  {id:'pitch',name:'Pitch',blurb:'Warm-up: which way, and how far',rt:3,levels:[
    {id:'p1',name:'Higher or lower',gen:'hl',p:{min:5,max:12}},
    {id:'p2',name:'Closer calls',gen:'hl',p:{min:1,max:4}},
    {id:'p3',name:'Same or different',gen:'same',p:{}},
    {id:'p4',name:'Melody shape',gen:'contour',p:{len:4}},
    {id:'pB',name:'Five-note shapes',gen:'contour',p:{len:5,timbre:'random'},boss:true},
  ]},
  {id:'degrees',name:'Scale degrees',blurb:'Hear every note against the key',rt:4,levels:[
    {id:'d1',name:'1, 3 and 5',gen:'degree',p:{set:[0,4,7]}},
    {id:'d2',name:'Add 2',gen:'degree',p:{set:[0,2,4,7]}},
    {id:'d3',name:'Add 4',gen:'degree',p:{set:[0,2,4,5,7]}},
    {id:'d4',name:'Add 6',gen:'degree',p:{set:[0,2,4,5,7,9]}},
    {id:'d5',name:'The whole major scale',gen:'degree',p:{set:MAJOR,timbre:'random'}},
    {id:'d6',name:'Blue notes: ♭3 and ♭7',gen:'degree',p:{set:[...MAJOR,3,10],timbre:'random'}},
    {id:'d7',name:'Every chromatic degree',gen:'degree',p:{set:[0,1,2,3,4,5,6,7,8,9,10,11],timbre:'random'}},
    {id:'d8',name:'Minor keys',gen:'degree',p:{set:MINOR,minor:true,timbre:'random'}},
    {id:'dB',name:'New key every question',gen:'degree',p:{set:[...MAJOR,3,10],newKeyEach:true,timbre:'random'},boss:true},
  ]},
  {id:'intervals',name:'Intervals',blurb:'The distance between two notes',rt:4,levels:[
    {id:'i1',name:'Fifths and octaves',gen:'interval',p:{set:[7,12],dir:'up'}},
    {id:'i2',name:'Add the thirds',gen:'interval',p:{set:[3,4,7,12],dir:'up'}},
    {id:'i3',name:'Seconds and fourths',gen:'interval',p:{set:[1,2,3,4,5,7,12],dir:'up'}},
    {id:'i4',name:'Every interval, going up',gen:'interval',p:{set:ALL12,dir:'up',timbre:'random'}},
    {id:'i5',name:'Going down',gen:'interval',p:{set:ALL12,dir:'down',timbre:'random'}},
    {id:'i6',name:'Played together',gen:'interval',p:{set:ALL12,dir:'together',timbre:'random'}},
    {id:'iB',name:'Any direction',gen:'interval',p:{set:ALL12,dir:'mix',timbre:'random'},boss:true},
  ]},
  {id:'chords',name:'Chord qualities',blurb:'Name the sound, from triads to altered',rt:5,levels:[
    {id:'c1',name:'Major or minor',gen:'chord',p:{set:['maj','min']}},
    {id:'c2',name:'Add diminished and augmented',gen:'chord',p:{set:['maj','min','dim','aug']}},
    {id:'c3',name:'Sus chords',gen:'chord',p:{set:['maj','min','sus2','sus4']}},
    {id:'c4',name:'Inversions',gen:'inversion',p:{}},
    {id:'c5',name:'Seventh chords',gen:'chord',p:{set:['maj7','dom7','min7']}},
    {id:'c6',name:'More sevenths',gen:'chord',p:{set:['maj7','dom7','min7','hdim','dim7','mmaj7'],timbre:'random'}},
    {id:'c7',name:'Extensions',gen:'chord',p:{set:['maj9','dom9','min9','dom13','six'],timbre:'random'}},
    {id:'c8',name:'Altered dominants',gen:'chord',p:{set:['d7b9','d7s9','d7s11','d7b13','alt'],timbre:'random'}},
    {id:'c9',name:'Any voicing',gen:'chord',p:{set:['maj7','dom7','min7','hdim','dim7'],style:'mixed',timbre:'random'}},
    {id:'cB',name:'Rootless, any register',gen:'chord',p:{set:['maj7','dom7','min7','hdim','maj9','min9','dom13','d7b9'],style:'rootless',timbre:'random'},boss:true},
  ]},
  {id:'progs',name:'Progressions',blurb:'Name the J-pop, city pop and jazz moves by ear',rt:6,levels:[
    {id:'g1',name:'Royal Road, Komuro, 1–5–6–4',gen:'prog',p:{set:['royal','komuro','axis']}},
    {id:'g2',name:'Add Canon and Just the Two of Us',gen:'prog',p:{set:['royal','komuro','axis','canon','marusa']}},
    {id:'g3',name:'Passing dim, minor iv, turnarounds',gen:'prog',p:{set:['royal','marusa','passdim','minorIV','turnI','turnIII']}},
    {id:'g4',name:'Jazz moves: ii–V–I, backdoor, cliché',gen:'prog',p:{set:['iiVI','iiVIm','backdoor','cliche','turnI','minorIV'],timbre:'random'}},
    {id:'gB',name:'Every progression',gen:'prog',p:{set:PROGS.map(x=>x.id),timbre:'random'},boss:true},
  ]},
];
const LEVELS=Object.fromEntries(WORLDS.flatMap(w=>w.levels.map((l,i)=>[l.id,{...l,world:w,index:i}])));
