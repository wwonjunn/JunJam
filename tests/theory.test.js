// Quick checks for the theory core and ear-training generators. Run: node tests/theory.test.js
const fs=require('fs'), vm=require('vm'), path=require('path');
const ctx={console,TextEncoder,store:{get:(k,d)=>d,set(){}},localStorage:null};
vm.createContext(ctx);
const load=f=>vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx,{filename:f});
load('js/theory.js');
vm.runInContext("function weightedPick(items){ const tot=items.reduce((a,x)=>a+x.w,0); let r=Math.random()*tot; for(const x of items){ r-=x.w; if(r<=0) return x; } return items[items.length-1]; } const TIMBRES=['epiano']; function earWeight(){return 1;} function keyWeight(){return 1;}",ctx);
load('js/ears/questions.js'); load('js/ears/levels.js'); load('js/lines/licks.js'); load('js/lines/solos.js'); load('js/reharm/moves.js'); load('js/transcribe/analyze.js'); load('js/transcribe/export.js');
let fails=0; const ok=(c,msg)=>{ if(!c){fails++; console.log('FAIL',msg);} };
const T=vm.runInContext('({QUALS,Q,evaluate,hintVoicing,defaultRoot,identify,symText,GEN,WORLDS,LEVELS,voiceChord,mod12,PROGS,progChords,voiceProg,LICKS,SOLO_LICKS,lickInstance,REHARM_MOVES,rhChords,rhAccepts,PROG,fillBeats,beatMapper,topLine,chordAt,buildScore,toMusicXML,toMidiFile,tupletGrid,XDIV,XBAR,leadLine,gapFill})',ctx);
const t=(pc,id)=>({root:T.defaultRoot(pc,T.Q[id].minor),q:T.Q[id]});
ok(T.evaluate([53,56,60,63],t(5,'min7'),{rootless:true}).ok,'Fm7 root position');
ok(T.evaluate([56,60,63,67],t(5,'min7'),{rootless:true}).ok,'Fm7 rootless');
ok(!T.evaluate([60,64,65,71],t(0,'maj7'),{rootless:true}).ok,'Cmaj7 with natural 11 rejected');
ok(T.identify([48,64,67,71,74])[0].name==='Cmaj9','names Cmaj9');
// slash chords: the bass note after the slash has to be lowest
ok(T.evaluate([52,60,64,67],t(0,'maj_3'),{rootless:true}).ok,'C/E');
ok(!T.evaluate([48,52,55],t(0,'maj_3'),{rootless:true}).ok,'C/E with C in the bass rejected');
ok(T.evaluate([43,53,57,60],t(5,'maj_2'),{rootless:true}).ok,'F/G');
ok(T.symText(t(5,'maj_2'))==='F/G' && T.symText(t(9,'min_3'))==='Am/C','slash names');
ok(T.identify([52,60,64,67])[0].name==='C/E','names C/E');
ok(T.identify([43,53,57,60])[0].name==='F/G','names F/G');
ok(T.identify([48,50,52,55])[0].name==='Cadd9','names Cadd9');
// every progression spells correctly in every key, and its band voicings are valid chords
const first=a=>a[0];
ok(T.progChords(T.PROGS.find(p=>p.id==='canon'),0,first).map(T.symText).join(' ')==='C G/B Am Em/G F C/E Dm7 G','Canon in C');
ok(T.progChords(T.PROGS.find(p=>p.id==='royal'),3,first).map(T.symText).join(' ')==='A♭maj7 B♭7 Gm7 Cm7','Royal Road in E♭');
for(const p of T.PROGS) for(let k=0;k<12;k++) for(let i=0;i<4;i++){
  const ch=T.progChords(p,k), v=T.voiceProg(ch);
  ch.forEach((c,j)=>ok(T.evaluate(v[j].all,c,{rootless:true}).ok,`${p.id} in ${k}: ${T.symText(c)} voiced ${v[j].all}`));
  ok(ch.every(c=>!/𝄫|𝄪/.test(T.symText(c))),`${p.id} in ${k} avoids double accidentals`);
}
for(const q of T.QUALS) for(let pc=0;pc<12;pc++){
  const tt=t(pc,q.id); ok(T.evaluate(T.hintVoicing(tt,{rootless:true}),tt,{rootless:true}).ok,'hint '+T.symText(tt));
  for(const st of ['close','open','rootless']){ const v=T.voiceChord(q,pc,st); ok(T.evaluate(v,tt,{rootless:true}).ok,`voicing ${st} ${T.symText(tt)} ${v}`); }
}
// every level generates valid questions whose answer is one of its options
for(const lv of Object.values(T.LEVELS)) for(let i=0;i<40;i++){
  const q=T.GEN[lv.gen](lv.p,{}); ok(q.options.some(o=>o.id===q.answer),`${lv.id} answer in options`);
  if(q.fromMidi && q.reveal && lv.gen!=='chord') ok(q.fromMidi(q.reveal.notes.slice(-1))===q.answer || lv.gen==='interval' && q.fromMidi([q.reveal.notes[1]])===q.answer || lv.gen==='degree','midi answer '+lv.id);
}
// intervals: playing the second note back gives the right answer
for(let i=0;i<200;i++){ const lv=T.LEVELS[['i4','i5','i6'][i%3]]; const q=T.GEN.interval(lv.p,{}); const second=q.reveal.notes[1];
  ok(q.fromMidi([second])===q.answer,`interval midi ${lv.id} ans ${q.answer} notes ${q.reveal.notes}`); }
// licks: short, playable in every key, chords valid, The Lick spelled right in D
const ALL=[...T.LICKS,...T.SOLO_LICKS];
ok(new Set(ALL.map(l=>l.id)).size===ALL.length,'lick ids unique');
ok(ALL.length>=185,'library is at least 5x the first 37');
for(const l of ALL){
  ok(l.notes.length>=3&&l.notes.length<=16,`${l.id} is 3 to 16 notes`);
  ok(T.lickInstance(l,0).total<=8.25,`${l.id} is at most two bars`);
  { const li=T.lickInstance(l,0); ok(li.notes.every((n,i)=>i===0||n.gat>li.notes[i-1].gat+1e-6)&&li.notes.every(n=>n.gdur>0),`${l.id}: written rhythm always moves forward`); }
  for(let k=0;k<12;k++){ const li=T.lickInstance(l,k);
    ok(li.chords.every(c=>c.q)&&li.notes.every(n=>n.midi>=48&&n.midi<=96&&n.name),`${l.id} in ${k}`);
    ok(li.chords.reduce((a,c)=>a+c.beats,0)>=li.total-1e-6,`${l.id} chords cover the lick`);
    ok(li.chords.every(c=>Math.abs(c.root.a)<=1),`${l.id} in ${k}: no double-accidental chord roots`); }
}
// difficulty follows the notes' roles: stepping chromatically through is easy, leaping to altered notes is hard
vm.runInContext('applyRatings([...LICKS,...SOLO_LICKS])',ctx);
const L=id=>T.LICKS.find(l=>l.id===id);
ok(L('dbl5').diff===1,'chromatic 4-#4-5 is easy');
ok(L('c1235').diff===1,'Coltrane 1-2-3-5 is easy');
ok(L('trisub').rate.score>L('arp39').rate.score,'tritone-sub arpeggio is harder than a 3-to-9 arpeggio');
ok(L('trisub').rate.tags.includes('altered')&&L('dbl5').rate.tags.includes('chromatic')&&!L('c1235').rate.tags.includes('chromatic'),'tags: altered, chromatic only for half steps');
ok(L('altdn').diff>1,'a stepwise run through altered notes is not easy');
ok(T.lickInstance(T.LICKS.find(l=>l.id==='thelick'),2).notes.map(n=>n.name).join(' ')==='D E F G E C D','The Lick in D');
ok(T.lickInstance(T.LICKS.find(l=>l.id==='c1235'),0).notes.map(n=>n.name).join(' ')==='C D E G','Coltrane 1-2-3-5 in C');
// reharm moves: valid in every key, slots point at real chords, and each slot's chord can be played
for(const m of T.REHARM_MOVES){
  ok(m.slots.every(i=>i>=0&&i<m.after.length),`${m.id} slots`);
  for(let k=0;k<12;k++){ const a=T.rhChords(m.after,k,m.minor), b=T.rhChords(m.before,k,m.minor);
    ok(a.every(c=>c.q&&Math.abs(c.root.a)<=1)&&b.every(c=>c.q),`${m.id} in ${k} spells`);
    m.slots.forEach(i=>{ const ts=m.alts&&m.alts[i]?T.rhChords(m.alts[i],k,m.minor):[a[i]];
      ts.forEach(c=>{ const t={root:c.root,q:c.q}; ok(T.evaluate(T.hintVoicing(t,{rootless:true}),t,{rootless:true}).ok&&T.rhAccepts(c.q,m.exact).length>0,`${m.id} slot ${i} (${T.symText(c)}) playable in ${k}`); }); }); }
}
ok(T.rhChords(T.REHARM_MOVES.find(m=>m.id==='tritone').after,0).map(T.symText).join(' ')==='Dm7 D♭7 Cmaj7','tritone sub in C');
ok(T.rhChords(T.REHARM_MOVES.find(m=>m.id==='ivv').after,0).map(T.symText).join(' ')==='Dm7 F/G Cmaj7','IV/V in C');
const R_=id=>T.REHARM_MOVES.find(m=>m.id===id), names=(id,k=0)=>T.rhChords(R_(id).after,k,R_(id).minor).map(T.symText).join(' ');
ok(names('coltrane')==='Dm7 E♭7 A♭maj7 B7 Emaj7 G7 Cmaj7','Coltrane changes in C');
ok(names('negative')==='Gm7 Fm6 Cmaj7','negative harmony ii–V in C');
ok(names('ladybird')==='Cmaj7 E♭7 A♭maj7 D♭maj7','Lady Bird in C');
ok(names('cliche',9)==='Am Am(maj7) Am7 Am6','minor line cliché in A minor');
ok(names('bassdown')==='C G/B Am C/G','descending bass in C');
ok(T.REHARM_MOVES.length===30,'30 moves');
// transcribe: beats, the top line, chord naming, and exports that open in MuseScore
{ const map=T.beatMapper(T.fillBeats([.6,1.2,1.8,2.4],3),0); ok(Math.abs(map(0))<.01&&Math.abs(map(.9)-1.5)<.01,'beat grid filled back to 0 and mapped');
  const line=T.topLine([{s:0,e:.5,p:60,c:.9},{s:.01,e:.5,p:72,c:.9},{s:.5,e:1,p:74,c:.2},{s:.6,e:1,p:76,c:.8}]);
  ok(line.map(n=>n.p).join()==='72,76','top line keeps the highest confident note');
  const N=(p,s,e)=>({p,s,e,c:.8}), c=T.chordAt([N(45,0,2)],[N(60,0,2),N(64,0,2),N(69,0,2),N(67,0,2)],0,2);
  ok(c&&c.root===9&&c.qid==='min7','A in the bass with C E G A over it is Am7');
  const res={tempo:100,duration:4.8,beats:[0,.6,1.2,1.8,2.4,3,3.6,4.2],notes:{target:[N(72,0,.6),N(74,.6,1.2),N(76,1.2,2.4)],bass:[N(36,0,2.4)],harmony:[N(60,0,2.4),N(64,0,2.4),N(67,0,2.4)]}};
  const sc=T.buildScore(res,{mode:'solo',instrument:'piano',title:'t'});
  ok(sc.melody.map(n=>n.gat).join()==='0,1,2'&&sc.chords[0].root===0,'score from helper output');
  const xml=T.toMusicXML(sc); ok(xml.includes('<harmony>')&&xml.includes('<step>C</step>')&&(xml.match(/<measure /g)||[]).length===sc.bars,'MusicXML has chords, notes and every bar');
  const mid=T.toMidiFile(sc); ok(mid[0]===0x4d&&mid[1]===0x54&&mid[2]===0x68&&mid[3]===0x64,'MIDI header'); }
// voted notes: the line follows the solo, past an octave ghost above it and a comping chord below it
{ const V=(p,s,c)=>({p,s,e:s+.12,c}), lead=[72,74,76,77,79,77,76,74].map((p,i)=>V(p,i*.15,.95));
  const notes=[...lead,V(86,.3,.75),V(88,.45,.75),V(55,.6,.75),V(59,.6,.75),V(62,.6,.75),V(65,.6,.75),V(57,1.25,.75),V(60,1.25,.75),V(64,1.25,.75),V(67,1.25,.75)];
  const line=T.leadLine(notes,{lo:40,hi:100});
  ok(line.map(n=>n.p).join()===lead.map(n=>n.p).join(),'lead line skips octave ghosts and comping chords: '+line.map(n=>n.p).join()); }
// a skipped beat in the tracker's grid comes back; piano octaves write the top note, e-piano doesn't
{ const g=T.gapFill([0,.5,1,2,2.5,3,3.5]); ok(g.length===8&&Math.abs(g[3]-1.5)<1e-9,'a missing beat is filled in: '+g);
  const V=(p,s,c)=>({p,s,e:s+.12,c}), oct=[[72,84],[74,86],[76,88],[77,89]].flatMap(([a,b],i)=>[V(a,i*.15,.95),V(b,i*.15,.75)]);
  ok(T.leadLine(oct,{lo:40,hi:100,octaves:true}).map(n=>n.p).join()==='84,86,88,89','octave doubling: the top is the melody');
  ok(T.leadLine(oct,{lo:40,hi:100}).map(n=>n.p).join()==='72,74,76,77','without the octave rule the better-heard note stays'); }
// rhythm: sextuplets, 32nds and quintuplets are found from slightly uneven timing, and plain 8ths stay plain
{ const jit=[.01,-.012,.008,-.006,.011,-.009,.004,-.01];
  const run=(D,b0)=>[...Array(D)].map((_,k)=>({at:b0+k/D+jit[k]*.5,dur:1/D}));
  const g=T.tupletGrid([...run(6,0),...run(8,1),...run(5,2),{at:3.02,dur:.5},{at:3.55,dur:.45}]);
  ok(g.slice(0,6).every(x=>x.tup===6)&&Math.abs(g[3].gat-.5)<1e-9,'sextuplet beat');
  ok(g.slice(6,14).every(x=>x.tup===0&&x.div===8)&&Math.abs(g[7].gat-1.125)<1e-9,'32nds');
  ok(g.slice(14,19).every(x=>x.tup===5),'quintuplet beat');
  ok(g[19].gat===3&&g[20].gat===3.5&&!g[20].tup,'a swung pair of 8ths is written as straight 8ths');
  const sc2={v:1,title:'t',mode:'solo',instrument:'piano',texture:'line',tempo:100,bars:1,key:{pc:0,minor:false},chords:[{at:0,root:0,qid:'maj7'}],soloBars:[],
    melody:g.map((x,i)=>({midi:60+i%12,gat:x.gat,gdur:x.gdur,tri:x.tri,tup:x.tup}))};
  const x2=T.toMusicXML(sc2), durs=[...x2.matchAll(/<duration>(\d+)<\/duration>/g)].map(m=>+m[1]);
  ok(durs.reduce((a,b)=>a+b,0)===T.XBAR,'a bar of tuplets adds up to four beats in MusicXML');
  ok(x2.includes('<actual-notes>6</actual-notes><normal-notes>4</normal-notes>')&&x2.includes('<actual-notes>5</actual-notes>')&&x2.includes('<type>32nd</type>')&&(x2.match(/<tuplet type="start"/g)||[]).length===2,'MusicXML writes the tuplets and 32nds'); }
console.log(fails?`${fails} failures`:'all theory and generator checks passed');
process.exit(fails?1:0);
