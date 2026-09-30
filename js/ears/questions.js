/* Ears: question generators.
   gen(p, ctx, force) returns a question:
   { prompt, sub, options:[{id,label}], answer, item, play(bus,t)->endTime, compare(pickedId,bus,t)->endTime,
     resolve?(bus,t)->endTime, fromMidi?(notes)->optionId, reveal:{notes, target?, text} }
   force = {answer, options} lets the weakness drill aim at a confused pair. */
const rint=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pickOne=a=>a[Math.floor(Math.random()*a.length)];
const shuffled=a=>{const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;};
const DEG_LABEL={0:'1',1:'♭2',2:'2',3:'♭3',4:'3',5:'4',6:'♯4',7:'5',8:'♭6',9:'6',10:'♭7',11:'7'};
const INT_LABEL={1:'m2',2:'M2',3:'m3',4:'M3',5:'P4',6:'Tritone',7:'P5',8:'m6',9:'M6',10:'m7',11:'M7',12:'Octave'};
const INT_LONG={1:'minor 2nd',2:'major 2nd',3:'minor 3rd',4:'major 3rd',5:'perfect 4th',6:'tritone',7:'perfect 5th',8:'minor 6th',9:'major 6th',10:'minor 7th',11:'major 7th',12:'octave'};
const QNAME=(id,suf)=>({maj:'major',min:'minor',dim:'diminished',aug:'augmented'})[id]||suf||Q[id].suf;
const MAJOR=[0,2,4,5,7,9,11], MINOR=[0,2,3,5,7,8,10];
const pcName=(m,minor)=>rootName(defaultRoot(mod12(m),minor));

function timbreFor(p){ return p.timbre==='random'?pickOne(TIMBRES):'epiano'; }
// A key (pitch class) for the question, leaning on the keys you're shakiest in.
// Squared, because unlike Hands there's no per chord-in-key weight stacked on top.
function pickKeyPc(){ return weightedPick([...Array(12).keys()].map(pc=>({pc,w:keyWeight(pc,'ears')**2}))).pc; }
function answerFrom(opts,prefix,force){
  if(force && force.answer!==undefined) return String(force.answer);
  return String(weightedPick(opts.map(o=>({o,w:earWeight(prefix+o)}))).o);
}

function cadence(bus,t,T,minor,timbre){
  const I=minor?[0,3,7]:[0,4,7], IV=minor?[0,5,8]:[0,5,9], V=[-1,2,5,7], bass=[0,5,-5,0];
  [I,IV,V,I].forEach((ch,i)=>{ const at=t+i*0.5; playChord(ch.map(x=>T+x),at,0.46,timbre,bus,62); tone(T-12+bass[i],at,0.46,70,timbre,bus); });
  return t+4*0.5+0.35;
}

const GEN={
  hl(p,ctx,force){
    const ans=force&&force.answer?force.answer:pickOne(['higher','lower']);
    const a=rint(55,72), gap=rint(p.min,p.max), b=ans==='higher'?a+gap:a-gap, tb=timbreFor(p);
    const two=(bus,t)=>{tone(a,t,0.6,90,tb,bus); tone(b,t+0.7,0.8,90,tb,bus); return t+1.6;};
    return {prompt:'Is the second note higher or lower?',sub:'',options:[{id:'higher',label:'Higher'},{id:'lower',label:'Lower'}],
      answer:ans,item:`hl:${ans}`,play:two,compare:two,reveal:{notes:[a,b],text:`${gap} half step${gap>1?'s':''} ${ans==='higher'?'up':'down'}.`}};
  },
  same(p,ctx,force){
    const ans=force&&force.answer?force.answer:pickOne(['same','different']);
    const a=rint(55,72), b=ans==='same'?a:a+pickOne([-2,-1,1,2]), tb=timbreFor(p);
    const two=(bus,t)=>{tone(a,t,0.6,90,tb,bus); tone(b,t+0.8,0.8,90,tb,bus); return t+1.7;};
    return {prompt:'Same note, or different?',sub:'',options:[{id:'same',label:'Same'},{id:'different',label:'Different'}],
      answer:ans,item:`same:${ans}`,play:two,compare:two,reveal:{notes:ans==='same'?[a]:[a,b],text:ans==='same'?'Both the same pitch.':`Off by ${Math.abs(b-a)} half step${Math.abs(b-a)>1?'s':''}.`}};
  },
  contour(p){
    const moves=[]; for(let i=0;i<p.len-1;i++) moves.push(Math.random()<0.1?'same':pickOne(['up','down']));
    const notes=[rint(58,68)]; moves.forEach(mv=>notes.push(notes[notes.length-1]+(mv==='same'?0:(mv==='up'?1:-1)*rint(2,5))));
    const key=moves.join(', '), tb=timbreFor(p);
    const opts=new Set([key]);
    while(opts.size<4){ const alt=[...moves]; const flips=rint(1,2); for(let f=0;f<flips;f++){const i=rint(0,alt.length-1); alt[i]=pickOne(['up','down','same'].filter(x=>x!==alt[i]));} opts.add(alt.join(', ')); }
    const run=(bus,t)=>{notes.forEach((m,i)=>tone(m,t+i*0.42,0.4,90,tb,bus)); return t+notes.length*0.42+0.4;};
    return {prompt:'What shape did the melody make?',sub:`${p.len} notes`,options:shuffled([...opts]).map(o=>({id:o,label:o})),
      answer:key,item:null,play:run,compare:run,reveal:{notes,text:`The shape was ${key}.`}};
  },
  degree(p,ctx,force){
    if(!ctx.key||ctx.keyLeft<=0||p.newKeyEach){ ctx.key=55+mod12(pickKeyPc()-55); ctx.keyLeft=5; }
    ctx.keyLeft--;
    const T=ctx.key, minor=!!p.minor, set=force&&force.options?force.options:p.set, tb=timbreFor(p);
    const ans=+answerFrom(set,`deg${minor?'m':''}:`,force);
    const m=pickOne([T+ans-12,T+ans,T+ans+12].filter(x=>x>=50&&x<=79));
    const base=m-ans, key=pcName(T,minor)+(minor?' minor':' major');
    const scale=minor?MINOR:MAJOR;
    return {prompt:'Which scale degree?',sub:`Key of ${key}. Play it on your keyboard or pick below.`,
      options:[...set].sort((a,b)=>a-b).map(s=>({id:String(s),label:DEG_LABEL[s]})),answer:String(ans),item:`deg${minor?'m':''}:${ans}`,keyPc:mod12(T),
      play:(bus,t)=>{const e=cadence(bus,t,T,minor,tb); tone(m,e,1.1,96,tb,bus); return e+1.1;},
      compare:(pk,bus,t)=>{ if(pk!=null&&pk!=='timeout') tone(base+(+pk),t,0.8,90,tb,bus); tone(m,t+1.0,0.9,96,tb,bus); return t+2; },
      resolve:(bus,t)=>{
        const path=[ans];
        if(ans<=5){ scale.filter(s=>s<ans).reverse().forEach(s=>path.push(s)); if(path[path.length-1]!==0) path.push(0); }
        else { scale.filter(s=>s>ans).forEach(s=>path.push(s)); path.push(12); }
        path.forEach((s,i)=>tone(base+s,t+i*0.24,0.26,80,tb,bus)); return t+path.length*0.24+0.2;
      },
      fromMidi:notes=>String(mod12(Math.min(...notes)-T)),
      reveal:{notes:[m],text:`${pcName(m,minor)} is ${DEG_LABEL[ans]} in ${key}.`}};
  },
  interval(p,ctx,force){
    const set=force&&force.options?force.options:p.set, tb=timbreFor(p);
    const ans=+answerFrom(set,`int:${p.dir}:`,force);
    const dir=p.dir==='mix'?pickOne(['up','down','together']):p.dir;
    const lo=rint(48,64), a=dir==='down'?lo+ans:lo, b=dir==='down'?lo:lo+ans;
    const pair=(iv,bus,t)=>{ const x=dir==='down'?lo+ans:lo, y=dir==='down'?x-iv:x+iv;
      if(dir==='together'){ tone(x,t,1.2,88,tb,bus); tone(y,t,1.2,88,tb,bus); return t+1.4; }
      tone(x,t,0.6,88,tb,bus); tone(y,t+0.7,0.9,88,tb,bus); return t+1.7; };
    return {prompt:dir==='together'?'Which interval? (played together)':`Which interval, going ${dir}?`,sub:'Play the second note on your keyboard or pick below.',
      options:[...set].sort((x,y)=>x-y).map(s=>({id:String(s),label:INT_LABEL[s]})),answer:String(ans),item:`int:${p.dir}:${ans}`,
      play:(bus,t)=>pair(ans,bus,t),
      compare:(pk,bus,t)=>{ let e=t; if(pk!=null&&pk!=='timeout') e=pair(+pk,bus,t)+0.2; return pair(ans,bus,e); },
      fromMidi:notes=>{ const n=notes[notes.length-1]; const iv=dir==='down'?mod12(a-n):mod12(n-lo); return String(iv===0?12:iv); },
      reveal:{notes:[a,b],text:`${INT_LONG[ans]}: ${pcName(Math.min(a,b))} to ${pcName(Math.max(a,b))}.`}};
  },
  inversion(p,ctx,force){
    const ans=force&&force.answer!==undefined?String(force.answer):String(rint(0,2));
    const minor=Math.random()<0.5, third=minor?3:4, r=48+mod12(pickKeyPc()-48), tb=timbreFor(p);
    const shapes={0:[0,third,7],1:[third,7,12],2:[7,12,12+third]};
    const v=inv=>shapes[inv].map(x=>r+x);
    const q=Q[minor?'min':'maj'];
    return {prompt:'Which note is in the bass?',sub:`A ${minor?'minor':'major'} triad`,
      options:[{id:'0',label:'Root'},{id:'1',label:'3rd'},{id:'2',label:'5th'}],answer:ans,item:`inv:${ans}`,keyPc:mod12(r),
      play:(bus,t)=>{playChord(v(+ans),t,1.4,tb,bus); return t+1.6;},
      compare:(pk,bus,t)=>{let e=t; if(pk!=null&&pk!=='timeout'){playChord(v(+pk),t,1.2,tb,bus); e=t+1.5;} playChord(v(+ans),e,1.4,tb,bus); return e+1.6;},
      reveal:{notes:v(+ans),target:{root:defaultRoot(r%12,minor),q},text:['Root position','First inversion, 3rd in the bass','Second inversion, 5th in the bass'][+ans]+'.'}};
  },
  chord(p,ctx,force){
    const set=force&&force.options?force.options:p.set, tb=timbreFor(p);
    const ans=answerFrom(set,'chord:',force);
    const pc=pickKeyPc(), style=p.style==='mixed'?pickOne(['close','open','rootless']):(p.style||'close');
    const v=id=>voiceChord(Q[id],pc,style);
    const notes=v(ans), q=Q[ans];
    const styleName={close:'close',open:'open',rootless:'rootless'}[style];
    const sufs=Object.fromEntries(set.map(id=>[id,pickSuf(Q[id])])); // one spelling per question, e.g. m7♭5 or ø7
    return {prompt:'What kind of chord?',sub:p.style==='mixed'||p.style==='rootless'?`Voiced ${styleName}, any register`:'',
      options:set.map(id=>({id,label:QNAME(id,sufs[id])})),answer:ans,item:`chord:${ans}`,keyPc:pc,
      play:(bus,t)=>{playChord(notes,t,1.6,tb,bus); return t+1.8;},
      compare:(pk,bus,t)=>{let e=t; if(pk!=null&&pk!=='timeout'&&Q[pk]){playChord(v(pk),t,1.4,tb,bus); e=t+1.7;} playChord(notes,e,1.6,tb,bus); return e+1.8;},
      reveal:{notes,target:{root:defaultRoot(pc,q.minor),q},text:`${symText({root:defaultRoot(pc,q.minor),q,suf:sufs[ans]})}, ${styleName} voicing.`}};
  },
};

// Build a voicing of chord quality q on pitch class pc: close, open (drop 2) or rootless
function voiceChord(q,pc,style){
  const t={root:defaultRoot(pc,q.minor),q};
  if(style==='rootless' && q.rootless){
    const v=hintVoicing(t,{rootless:true}); const shift=pickOne([-12,0,0,12]);
    return v.map(m=>m+shift).every(m=>m>=48&&m<=84)?v.map(m=>m+shift):v;
  }
  let ivs=q.id==='alt'?[0,4,10,...shuffled([1,3,6,8]).slice(0,2)]:[...new Set([...q.ct,...q.req])];
  const num=iv=>iv===0?1:(parseInt(String(q.lab[iv]).replace(/[^0-9]/g,''),10)||1);
  ivs.sort((a,b)=>num(a)-num(b)||a-b);
  const r=48+mod12(pc-48); const out=[r]; let prev=r;
  ivs.slice(1).forEach(iv=>{ let m=prev+1; while(mod12(m-pc)!==iv) m++; out.push(m); prev=m; });
  if(style==='open' && out.length>=4){
    const up=out.slice(1); up[up.length-2]-=12; up.sort((a,b)=>a-b);
    let bass=out[0]; while(bass>=up[0]) bass-=12;
    return [bass,...up];
  }
  return out;
}
