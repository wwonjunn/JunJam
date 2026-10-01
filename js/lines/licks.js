/* Lines: the lick library. Pure data and helpers, no DOM. Tested by tests/theory.test.js
   A lick is short on purpose: a cell you can drop anywhere beats a memorised 4-bar solo.
   notes: [semitones above the chord root (or the key, for multi-chord licks), length in beats]
   over:  the chord it sits on, or ch: [[letter steps, semitones, quality, beats], ...] for licks that cross chords
   src:   where the formula is documented; licks without one are Jun Jam originals in that style */
const S=(semis,d=.5,last)=>semis.map((s,i)=>[s,i===semis.length-1&&last?last:(Array.isArray(d)?d[i]:d)]);
const LSRC={
  lick:'https://en.wikipedia.org/wiki/The_Lick',
  coltrane:'https://www.freejazzlessons.com/jazz-patterns/',
  cry:'https://www.learnjazzstandards.com/blog/lick-of-the-week-11-cry-me-a-river-lick/',
  bebopScale:'https://www.learnjazzstandards.com/blog/learning-jazz/jazz-theory/use-bebop-scales-like-pro/',
  schneider:'https://jeffschneidermusic.com/blog/3-bebop-licks-every-jazz-musician-needs-to-know',
  parker:'https://www.jazzguitar.be/blog/charlie-parker/',
  enclosure:'https://fertilemindsjazzacademy.com/enclosures-surrounds-what-you-should-know/',
  iiVI:'https://www.londonpianoinstitute.co.uk/five-cool-ii-v-i-jazz-piano-licks-that-you-should-know/',
  gospel:'https://www.pianote.com/blog/gospel-piano-101/',
  pent:'https://www.pianote.com/blog/pentatonic-scale-piano/',
  blues:'https://pianowithjonny.com/piano-lessons/blues-scale-for-piano-beginner-guide/',
  neo:'https://pianowithjonny.com/piano-lessons/neo-soul-piano-improv-with-the-pentatonic-scale/',
  mccoy:'https://www.jazzadvice.com/lessons/mccoy-tyner-and-the-pentatonic-scale/',
};
const VtoI=(v,i,vb=4,ib=2)=>[[0,0,v,vb],[3,5,i,ib]];           // reference = the V chord's root
const IIVI=[[1,2,'min7',2],[4,7,'dom7',2],[0,0,'maj7',4]];       // reference = the key
const LSTYLES=['Jazz','Bebop','Coltrane','Blues','Gospel','Neo-soul','Modern jazz','Fusion','City pop & J-pop'];
const LDIFF=['','Easy','Medium','Hard'];
function Lk(id,name,diff,style,over,notes,o={}){ return {id,name,diff,style,over:typeof over==='string'?over:null,ch:Array.isArray(over)?over:null,notes,swing:!!o.swing,src:o.src||null,tip:o.tip||''}; }
const LICKS=[
  // ---------------- Easy ----------------
  Lk('thelick','The Lick',1,'Jazz','min7',S([0,2,3,5,2,-2,0],[.5,.5,.5,.5,1,.5],1.5),{swing:1,src:LSRC.lick,tip:'1 2 ♭3 4 2 ♭7 1. The most famous jazz cliché.'}),
  Lk('c1235','Coltrane 1-2-3-5',1,'Coltrane','maj7',S([0,2,4,7],.5,1.5),{src:LSRC.coltrane,tip:'The digital pattern Coltrane used all over Giant Steps.'}),
  Lk('c5321','Coltrane 5-3-2-1',1,'Coltrane','maj7',S([7,4,2,0],.5,1.5),{src:LSRC.coltrane,tip:'The same cell, coming down.'}),
  Lk('encl3','Enclosure onto the 3rd',1,'Bebop','maj7',S([5,3,4],.5,2),{swing:1,src:LSRC.enclosure,tip:'Scale step above, half step below, land on the 3rd.'}),
  Lk('enclR','Enclosure onto the root',1,'Bebop','maj7',S([2,-1,0],.5,2),{swing:1,src:LSRC.enclosure,tip:'Above, below, target.'}),
  Lk('appr3','Chromatic step into the 3rd',1,'Bebop','maj7',S([2,3,4],.5,2),{swing:1,src:LSRC.enclosure,tip:'9, then a passing ♭3, into the 3rd.'}),
  Lk('dbl5','Double chromatic up to the 5th',1,'Bebop','dom7',S([5,6,7],.5,2),{swing:1,src:LSRC.enclosure,tip:'4, ♯4, 5.'}),
  Lk('blue3','Blue third',1,'Blues','dom7',S([3,4,0],[.25,.75],1.5),{swing:1,src:LSRC.blues,tip:'Crush the ♭3 into the 3, then home.'}),
  Lk('bluesdn','Blues scale descent',1,'Blues','dom7',S([10,7,6,5,3,0],.5,1.5),{swing:1,src:LSRC.blues,tip:'♭7 5 ♭5 4 ♭3 1.'}),
  Lk('gospdn','Gospel run: 6-5-3-2-1',1,'Gospel','maj',S([9,7,4,2,0],.25,1.5),{src:LSRC.pent,tip:'Major pentatonic, straight down.'}),
  Lk('amen','Amen: 4 to 3',1,'Gospel','maj',S([5,4,2,0],[1,.5,.5],2),{tip:'The sus-to-3 resolution, then step home.'}),
  Lk('minpent','Minor pentatonic climb',1,'Neo-soul','min7',S([0,3,5,7,10,12],.5,1.5),{src:LSRC.neo}),
  Lk('sabi','Sabi pickup (3-5-6-1)',1,'City pop & J-pop','maj',S([4,7,9,12],.25,2),{tip:'A 16th-note lift into the chorus.'}),
  Lk('turn3','Ballad turn around the 3rd',1,'City pop & J-pop','maj',S([4,5,4,2,4],.25,2),{tip:'Upper neighbour, back, lower neighbour, back.'}),
  // ---------------- Medium ----------------
  Lk('cry','Cry Me a River (minor)',2,'Jazz','min7',S([2,0,-5,3,2,0],.5,1.5),{swing:1,src:LSRC.cry,tip:'2 1 5 ♭3 2 1. Fits in dozens of places.'}),
  Lk('cryalt','Cry Me a River over V7alt',2,'Jazz',VtoI('alt','min6',3,3),S([3,1,-4,4,3,1,0,-2,-4],[.5,.5,.5,.5,.5,.5,.5,.5],1.5),{swing:1,src:LSRC.cry,tip:'♯9 ♭9 ♭13 3 ♯9 ♭9, resolving 5 4 ♭3 of the minor I.'}),
  Lk('bebopdom','Bebop dominant scale descent',2,'Bebop','dom7',S([12,11,10,9,7,5,4,2,0],.5,1.5),{swing:1,src:LSRC.bebopScale,tip:'The passing major 7 puts chord tones on the beats.'}),
  Lk('arp39','3-to-9 arpeggio, down to the 5th',2,'Bebop','dom7',S([4,7,10,14,9,7],.5,1.5),{swing:1,src:LSRC.schneider,tip:'3 5 ♭7 9, then 13 5.'}),
  Lk('p3b9','Parker: 3 up to ♭9',2,'Bebop',VtoI('d7b9','maj7',2,2),S([4,7,10,13,12],.5,2),{swing:1,src:LSRC.parker,tip:'A diminished arpeggio from the 3rd; the ♭9 falls to the 5th of I.'}),
  Lk('arpdown','Arpeggio up, scale down (ii–V–I)',2,'Jazz',IIVI,S([2,5,9,12,11,9,7,5,4],.5,2),{swing:1,src:LSRC.iiVI,tip:'ii7 arpeggio, V7 scale down, land on the 3rd of I.'}),
  Lk('c1235iiVI','Coltrane 1-2-3-5 through ii–V–I',2,'Coltrane',IIVI,S([2,4,5,9,7,9,11,14,12,14,16,19],.5,1.5),{src:LSRC.coltrane,tip:'One 1-2-3-5 cell per chord.'}),
  Lk('gospup','Gospel scale run up',2,'Gospel','maj',S([0,2,3,4,7,9,12],.25,1.5),{src:LSRC.gospel,tip:'1 2 ♭3 3 5 6 1.'}),
  Lk('gospdn2','Gospel scale run down',2,'Gospel','maj',S([12,9,7,4,3,2,0],.25,1.5),{src:LSRC.gospel}),
  Lk('neo911','Neo-soul 9 and 11',2,'Neo-soul','min9',S([7,10,14,17,14,10],.5,1.5),{src:LSRC.neo,tip:'5 ♭7 9 11 9 ♭7.'}),
  Lk('neoslide','R&B slide into the ♭3',2,'Neo-soul','min7',S([2,3,7,10,12,10,7],[.25,.75,.5,.5,.5,.5],1.5)),
  Lk('bturn','Blues turnaround line',2,'Blues','dom7',S([12,10,9,8,7,4],.5,1.5),{swing:1,tip:'Chromatic slide down from the ♭7 to the 5th.'}),
  Lk('mccoy','McCoy quartal cells',2,'Modern jazz','min7',S([0,5,10,3,7,12,5,10,15],.5,1.5),{src:LSRC.mccoy,tip:'Minor pentatonic grouped in 4ths.'}),
  Lk('wtone','Whole-tone run',2,'Modern jazz','d7s11',S([0,2,4,6,8,10,12],.25,1.5)),
  Lk('cityfill','City pop maj9 cascade',2,'City pop & J-pop','maj9',S([14,11,7,4,2,0],.25,1.5)),
  Lk('ivv','IV to V fill',2,'City pop & J-pop',[[0,0,'maj7',2],[1,2,'dom7',2]],S([4,7,11,14,18],.5,2),{tip:'Up the IV chord, landing on the 3rd of V. Royal Road territory.'}),
  // ---------------- Hard ----------------
  Lk('slip','Side-slip out and back',3,'Fusion','min7',S([12,10,7,5,13,11,8,6,12,10,7],.25,1.5),{src:LSRC.mccoy,tip:'Pentatonic, the same shape a half step up, then back in.'}),
  Lk('pent4','Pentatonic 4-note sequence',3,'Fusion','min7',S([0,3,5,7,3,5,7,10,5,7,10,12,7,10,12,15],.25,1.5),{src:LSRC.mccoy}),
  Lk('octrun','Two-octave pentatonic run',3,'City pop & J-pop','maj',S([0,2,4,7,9,12,14,16,19,21,24],.25,1.5),{tip:'The anime-ending flourish.'}),
  Lk('altdn','Altered scale descent',3,'Jazz',VtoI('alt','maj7',4,2),S([13,10,8,6,4,3,1,0,-3],.5,2),{swing:1,tip:'♭9 ♭7 ♭13 ♯11 3 ♯9 ♭9 1, into the 3rd of I.'}),
  Lk('hw','Half-whole diminished climb',3,'Jazz','d7b9',S([0,1,3,4,6,7,9,10,12],.25,1.5)),
  Lk('trisub','Tritone-sub arpeggio into I',3,'Jazz',VtoI('dom7','maj7',4,2),S([6,10,13,16,13,10,6,5],[.5,.5,.5,.5,.5,.5,1],2),{tip:'Outline ♭II7 over V7, then fall a half step to I.'}),
  Lk('shout','Gospel shout run',3,'Gospel','dom7',S([12,9,7,4,3,4,2,0],.25,1.5),{src:LSRC.gospel,tip:'1 6 5 3 ♭3 3 2 1, fast.'}),
];
// Place a lick on a reference pitch class: real notes, chords with start beats, and spellings
function lickInstance(l,refPc){
  const k=defaultRoot(refPc,false);
  const at=(s,i)=>{const lt=(k.l+s)%7;let a=mod12(refPc+i-LETTER_PC[lt]);if(a>6)a-=12;return mkRoot(lt,a);};
  const total=l.notes.reduce((a,n)=>a+n[1],0);
  let t=0;
  const chords=(l.ch||[[0,0,l.over,0]]).map(([s,i,qid,b])=>{ const beats=b||Math.max(2,Math.ceil(total)); const c={root:at(s,i),q:Q[qid],at:t,beats}; t+=beats; return c; });
  const R=60+mod12(refPc); t=0;
  const raw=l.notes.map(([s,d])=>{ const n={midi:R+s,at:t,dur:d}; t+=d; return n; });
  let shift=0; const lo=Math.min(...raw.map(n=>n.midi)), hi=Math.max(...raw.map(n=>n.midi));
  while(hi+shift>84) shift-=12; while(lo+shift<53) shift+=12; // a comfortable right-hand register
  // Blues and gospel write the blue notes as ♭3 and ♭5, not ♯9 and ♯11
  const blue=l.style==='Blues'||l.style==='Gospel', qOf=c=>blue?{...c.q,lab:{...c.q.lab,3:'♭3',6:'♭5'}}:c.q;
  const notes=raw.map(n=>{ const m=n.midi+shift, c=chords.filter(c=>c.at<=n.at+1e-6).pop()||chords[0], sp=spellNote(m,c.root,qOf(c)); return {...n,midi:m,spell:{...sp,midi:m},name:sp.name}; });
  return {notes,chords,total,ref:refPc};
}
const lickOver=l=>l.ch?l.ch.map(([,,qid])=>Q[qid].suf||'maj').join(' → '):(Q[l.over].suf||'major');
