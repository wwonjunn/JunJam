/* Lines: the lick library. Pure data and helpers, no DOM. Tested by tests/theory.test.js
   A lick is short on purpose: a cell you can drop anywhere beats a memorised 4-bar solo.
   notes: [semitones above the chord root (or the key, for multi-chord licks), length in beats]
   over:  the chord it sits on, or ch: [[letter steps, semitones, quality, beats], ...] for licks that cross chords
   src:   where the formula is documented; licks without one are Jun Jam originals
   artist: only when the lick really comes from that player. style is kept for the code, not shown. */
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
  wilson:'https://seanwilsonpiano.com/9-gospel-piano-licks-for-every-musician/',
};
const VtoI=(v,i,vb=4,ib=2)=>[[0,0,v,vb],[3,5,i,ib]];           // reference = the V chord's root
const IIVI=[[1,2,'min7',2],[4,7,'dom7',2],[0,0,'maj7',4]];       // reference = the key
const LSTYLES=['Jazz','Bebop','Coltrane','Blues','Gospel','Neo-soul','Modern jazz','Fusion','City pop & J-pop'];
const LDIFF=['','Easy','Medium','Hard'];
function Lk(id,name,diff,style,over,notes,o={}){ return {id,name,diff,style,over:typeof over==='string'?over:null,ch:Array.isArray(over)?over:null,notes,swing:!!o.swing,src:o.src||null,artist:o.artist||null,tip:o.tip||''}; }
const LICKS=[
  // ---------------- Easy ----------------
  Lk('thelick','The Lick',1,'Jazz','min7',S([0,2,3,5,2,-2,0],[.5,.5,.5,.5,1,.5],1.5),{swing:1,src:LSRC.lick,tip:'1 2 ♭3 4 2 ♭7 1. The most famous jazz cliché.'}),
  Lk('c1235','Coltrane 1-2-3-5',1,'Coltrane','maj7',S([0,2,4,7],.5,1.5),{src:LSRC.coltrane,artist:'John Coltrane',tip:'The digital pattern Coltrane used all over Giant Steps.'}),
  Lk('c5321','Coltrane 5-3-2-1',1,'Coltrane','maj7',S([7,4,2,0],.5,1.5),{src:LSRC.coltrane,artist:'John Coltrane',tip:'The same cell, coming down.'}),
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
  Lk('p3b9','Parker: 3 up to ♭9',2,'Bebop',VtoI('d7b9','maj7',2,2),S([4,7,10,13,12],.5,2),{swing:1,src:LSRC.parker,artist:'Charlie Parker',tip:'A diminished arpeggio from the 3rd; the ♭9 falls to the 5th of I.'}),
  Lk('arpdown','Arpeggio up, scale down (ii–V–I)',2,'Jazz',IIVI,S([2,5,9,12,11,9,7,5,4],.5,2),{swing:1,src:LSRC.iiVI,tip:'ii7 arpeggio, V7 scale down, land on the 3rd of I.'}),
  Lk('c1235iiVI','Coltrane 1-2-3-5 through ii–V–I',2,'Coltrane',IIVI,S([2,4,5,9,7,9,11,14,12,14,16,19],.5,1.5),{src:LSRC.coltrane,artist:'John Coltrane',tip:'One 1-2-3-5 cell per chord.'}),
  Lk('gospup','Gospel scale run up',2,'Gospel','maj',S([0,2,3,4,7,9,12],.25,1.5),{src:LSRC.gospel,tip:'1 2 ♭3 3 5 6 1.'}),
  Lk('gospdn2','Gospel scale run down',2,'Gospel','maj',S([12,9,7,4,3,2,0],.25,1.5),{src:LSRC.gospel}),
  Lk('neo911','Neo-soul 9 and 11',2,'Neo-soul','min9',S([7,10,14,17,14,10],.5,1.5),{src:LSRC.neo,tip:'5 ♭7 9 11 9 ♭7.'}),
  Lk('neoslide','R&B slide into the ♭3',2,'Neo-soul','min7',S([2,3,7,10,12,10,7],[.25,.75,.5,.5,.5,.5],1.5)),
  Lk('bturn','Blues turnaround line',2,'Blues','dom7',S([12,10,9,8,7,4],.5,1.5),{swing:1,tip:'Chromatic slide down from the ♭7 to the 5th.'}),
  Lk('mccoy','McCoy quartal cells',2,'Modern jazz','min7',S([0,5,10,3,7,12,5,10,15],.5,1.5),{src:LSRC.mccoy,artist:'McCoy Tyner',tip:'Minor pentatonic grouped in 4ths.'}),
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
  Lk('pryor','Running-bass gospel line',2,'Gospel','dom7',S([7,4,5,6,7,9,12,11,10],.5,1.5),{src:LSRC.wilson,artist:'Joseph Pryor',tip:'5, down to 3, then chromatic up to the root and back to ♭7. Notes as written by Sean Wilson; rhythm approximate.'}),
  Lk('shout','Gospel shout run',3,'Gospel','dom7',S([12,9,7,4,3,4,2,0],.25,1.5),{src:LSRC.gospel,tip:'1 6 5 3 ♭3 3 2 1, fast.'}),
];
// Place a lick on a reference pitch class: real notes, chords with start beats, and spellings
function lickInstance(l,refPc){
  const first=Q[l.ch?l.ch[0][2]:l.over], k=defaultRoot(refPc,!!(first&&first.minor));
  // Spell chord roots by letter from the reference, but never with a double sharp or flat (E𝄫7 becomes D7)
  const at=(s,i)=>{const lt=(k.l+s)%7;let a=mod12(refPc+i-LETTER_PC[lt]);if(a>6)a-=12;return Math.abs(a)>1?defaultRoot(mod12(refPc+i),false):mkRoot(lt,a);};
  const total=l.notes.reduce((a,n)=>a+n[1],0);
  let t=0;
  const chords=(l.ch||[[0,0,l.over,0]]).map(([s,i,qid,b])=>{ const beats=b||Math.max(2,Math.ceil(total)); const c={root:at(s,i),q:Q[qid],at:t,beats}; t+=beats; return c; });
  const R=60+mod12(refPc); t=0;
  const raw=l.notes.map(([s,d])=>{ const n={midi:R+s,at:t,dur:d}; t+=d; return n; });
  // Right-hand register: lowest note from middle C up when it fits, so the comp has room underneath
  const lo=Math.min(...raw.map(n=>n.midi)), hi=Math.max(...raw.map(n=>n.midi));
  let shift=12*Math.round((60-lo)/12); if(lo+shift<60) shift+=12;
  while(hi+shift>88&&lo+shift-12>=50) shift-=12;
  // Blues and gospel write the blue notes as ♭3 and ♭5, not ♯9 and ♯11
  const blue=l.style==='Blues'||l.style==='Gospel', qOf=c=>blue?{...c.q,lab:{...c.q.lab,3:'♭3',6:'♭5'}}:c.q;
  // Passing notes that would need a double sharp or flat get a plain spelling, flats in flat keys, sharps otherwise
  const plain=(m,sp)=>{ if(Math.abs(sp.a)<=1) return sp; const opts=spellingsFor(mod12(m)), pk=opts.find(([,a])=>a===0)||opts.find(([,a])=>k.a<0?a<0:a>0)||opts[0];
    const oct=Math.floor((m-pk[1])/12)-1; return {l:pk[0],a:pk[1],oct,di:oct*7+pk[0],name:LETTERS[pk[0]]+ACC[pk[1]]}; };
  const notes=raw.map(n=>{ const m=n.midi+shift, c=chords.filter(c=>c.at<=n.at+1e-6).pop()||chords[0], sp=plain(m,spellNote(m,c.root,qOf(c))); return {...n,midi:m,spell:{...sp,midi:m},name:sp.name}; });
  return {notes,chords,total,ref:refPc};
}
const lickOver=l=>l.ch?l.ch.map(([,,qid])=>Q[qid].suf||'maj').join(' → '):(Q[l.over].suf||'major');

/* ---------------- difficulty: what each note is over its chord, and how you get to it ----------------
   Chord tones are free; natural tensions cost a little; altered or outside notes cost a lot, unless they're
   walked through by half or whole step (passing notes, neighbours, enclosures), which is easy for hand and ear.
   Wide intervals, 16ths and syncopation, length and chord changes add on top. Easy/Medium/Hard split the library. */
function noteRole(iv,q){
  const has=x=>q.ct.includes(x)||q.req.includes(x);
  if(has(iv)) return 0;                                         // chord tone
  const dom=has(4)&&has(10), minor=has(3), maj=has(4)&&!has(10);
  if(iv===2||iv===9) return 1;                                  // 9 and 13
  if(iv===5&&(minor||q.id.startsWith('sus'))) return 1;         // 11 on minor and sus chords
  if((iv===6&&maj)||(iv===8&&minor)) return 1.5;                // ♯11 on major, ♭13 on minor: colour
  if(dom&&[1,3,6,8].includes(iv)) return q.id==='alt'||q.anyOf?2:2.5; // altered tensions on a dominant
  return 3;                                                     // outside the chord's sound
}
const LEAP_COST=d=>d===0?.1:d<=2?0:d<=4?.3:d===5?.6:d===6?1.2:d===7?.8:d<=9?1.2:d<=11?1.6:d===12?1:2;
function rateLick(l){
  const chs=l.ch||[[0,0,l.over,99]]; let t=0;
  const tl=chs.map(([,semis,qid,b])=>{ const c={at:t,r:semis,q:Q[qid]}; t+=b||99; return c; });
  const at=[]; t=0; l.notes.forEach(n=>{ at.push(t); t+=n[1]; });
  let role=0, leaps=0, rhythm=0, worst=0, chrom=0, tension=0, altered=0, outside=0, wide=0, tritone=0, sixteenths=0, sync=0;
  const roles=l.notes.map(([s],i)=>{ const c=tl.filter(c=>c.at<=at[i]+1e-6).pop()||tl[0]; return noteRole(mod12(s-c.r),c.q); });
  l.notes.forEach(([s,d],i)=>{
    const base=roles[i], into=i>0?Math.abs(s-l.notes[i-1][0]):null, out=i<l.notes.length-1?Math.abs(l.notes[i+1][0]-s):null;
    let cost=base;
    if(base>0){
      const stepIn=into!==null&&into<=2&&into>0, stepOut=out!==null&&out<=2&&out>0;
      const chromatic=(stepIn&&into===1)||(stepOut&&out===1);    // a half step on at least one side
      const reachCT=(dir)=>{ for(let k=i,n=0;n<3;n++){ const j=k+dir; if(j<0||j>=l.notes.length||Math.abs(l.notes[j][0]-l.notes[k][0])>2||l.notes[j][0]===l.notes[k][0]) return false; if(roles[j]===0) return true; k=j; } return false; };
      const linked=reachCT(1)||reachCT(-1);                       // a short step-wise chain reaches a chord tone
      if(stepIn&&stepOut&&linked) cost*=chromatic?(base>=2?.35:.2):(base>=2?.5:.3); // passing: chromatic is easiest, scalar altered still sounds out
      else if(stepOut&&reachCT(1)) cost*=chromatic?.4:.6;         // leapt to, then steps into a chord tone (enclosure, approach)
      else if(stepIn&&stepOut) cost*=.7;                         // a run of outside notes going nowhere near the chord
      if(cost<base){ if(chromatic) chrom++; } else if(base>=3) outside++; else if(base>=2) altered++; else tension++;
    }
    role+=cost; worst=Math.max(worst,cost);
    if(into!==null){ leaps+=LEAP_COST(into); if(into>=8) wide++; if(into===6) tritone++; }
    if(Math.abs(d-.25)<1e-6){ rhythm+=.4; sixteenths++; } else if(Math.abs(d-.75)<1e-6) rhythm+=.3;
    const f=at[i]-Math.floor(at[i]+1e-9); if((Math.abs(f-.25)<1e-6||Math.abs(f-.75)<1e-6)&&d>=.5-1e-6){ rhythm+=.3; sync++; } // off-beat 16th that's held
  });
  const score=role+leaps+.6*rhythm+.12*l.notes.length+.5*(tl.length-1);
  const tags=[];
  if(altered) tags.push('altered'); if(outside) tags.push('outside'); if(!altered&&!outside) tags.push(tension?'tensions':'chord tones');
  if(chrom) tags.push('chromatic');
  if(tritone) tags.push('tritone'); if(wide||l.notes.slice(1).filter((n,i)=>Math.abs(n[0]-l.notes[i][0])>=5).length>=2) tags.push('wide leaps');
  if(sixteenths>=2) tags.push('16ths'); if(sync>=2) tags.push('syncopated');
  if(tl.length>1) tags.push('chord changes');
  return {score,tags};
}
// Rate a set of licks: thresholds split the built-in library into thirds; user licks are placed with the same cut-offs
let RATE_CUTS=null;
function applyRatings(builtIn,extra=[]){
  builtIn.forEach(l=>Object.assign(l,{rate:rateLick(l)}));
  const sc=builtIn.map(l=>l.rate.score).sort((a,b)=>a-b);
  RATE_CUTS=[sc[Math.floor(sc.length/3)],sc[Math.floor(2*sc.length/3)]];
  [...builtIn,...extra].forEach(l=>{ if(!l.rate) l.rate=rateLick(l); l.diff=l.rate.score<=RATE_CUTS[0]?1:l.rate.score<=RATE_CUTS[1]?2:3; l.tags=l.rate.tags; });
}
