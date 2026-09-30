// Quick checks for the theory core and ear-training generators. Run: node tests/theory.test.js
const fs=require('fs'), vm=require('vm'), path=require('path');
const ctx={console,store:{get:(k,d)=>d,set(){}},localStorage:null};
vm.createContext(ctx);
const load=f=>vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx,{filename:f});
load('js/theory.js');
vm.runInContext("function weightedPick(items){ const tot=items.reduce((a,x)=>a+x.w,0); let r=Math.random()*tot; for(const x of items){ r-=x.w; if(r<=0) return x; } return items[items.length-1]; } const TIMBRES=['epiano']; function earWeight(){return 1;} function keyWeight(){return 1;}",ctx);
load('js/ears/questions.js'); load('js/ears/levels.js');
let fails=0; const ok=(c,msg)=>{ if(!c){fails++; console.log('FAIL',msg);} };
const T=vm.runInContext('({QUALS,Q,evaluate,hintVoicing,defaultRoot,identify,symText,GEN,WORLDS,LEVELS,voiceChord,mod12,PROGS,progChords,voiceProg})',ctx);
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
console.log(fails?`${fails} failures`:'all theory and generator checks passed');
process.exit(fails?1:0);
