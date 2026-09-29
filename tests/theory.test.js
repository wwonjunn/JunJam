// Quick checks for the theory core and ear-training generators. Run: node tests/theory.test.js
const fs=require('fs'), vm=require('vm'), path=require('path');
const ctx={console,store:{get:(k,d)=>d,set(){}},localStorage:null};
vm.createContext(ctx);
const load=f=>vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx,{filename:f});
load('js/theory.js');
vm.runInContext("function weightedPick(items){ const tot=items.reduce((a,x)=>a+x.w,0); let r=Math.random()*tot; for(const x of items){ r-=x.w; if(r<=0) return x; } return items[items.length-1]; } const TIMBRES=['epiano']; function earWeight(){return 1;}",ctx);
load('js/ears/questions.js'); load('js/ears/levels.js');
let fails=0; const ok=(c,msg)=>{ if(!c){fails++; console.log('FAIL',msg);} };
const T=vm.runInContext('({QUALS,Q,evaluate,hintVoicing,defaultRoot,identify,symText,GEN,WORLDS,LEVELS,voiceChord,mod12})',ctx);
const t=(pc,id)=>({root:T.defaultRoot(pc,T.Q[id].minor),q:T.Q[id]});
ok(T.evaluate([53,56,60,63],t(5,'min7'),{rootless:true}).ok,'Fm7 root position');
ok(T.evaluate([56,60,63,67],t(5,'min7'),{rootless:true}).ok,'Fm7 rootless');
ok(!T.evaluate([60,64,65,71],t(0,'maj7'),{rootless:true}).ok,'Cmaj7 with natural 11 rejected');
ok(T.identify([48,64,67,71,74])[0].name==='Cmaj9','names Cmaj9');
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
