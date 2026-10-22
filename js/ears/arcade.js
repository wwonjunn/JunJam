/* Ears: Call & Response. The game version of Ears; the level-by-level quiz is still there as Classic.
   Rune Defender: every call is a monster walking at your wall. The app plays the call (a note against its key, an
   interval, a chord, a progression) and you answer on the keyboard before the monster arrives: play the scale degree, the second note, the chord itself on
   the root shown, the note in the bass, or the progression's bass line. No buttons: a right answer rolls straight
   into the next call, a wrong or late one plays you what it was and costs one of three lives, and the run goes on.
   Every right answer nudges the tempo up (less time to answer); every six, the next level of that world's ladder
   joins in (Add 2, Add 4…), so one run climbs the whole world. Missed answers come back a few calls later.
   Right answers charge a spell; once it's full, the next right answer is a fireball: triple points and a life back.
   From the third level on, armoured brutes turn up that take two answers in a row, and each hit only knocks them back.
   Daily wave: one fixed wave of 20 a day from every world, at the levels you've reached plus one above (today's
   stretch); your first try that day earns a medal and keeps your streak. Weekly boss: 12 armoured brutes, the same all
   week, your best try counts. After a run, play any chord to go again. */
let ARCDATA=store.get('earsArcade',{best:{},reach:{},stars:{}}); ARCDATA.daily=ARCDATA.daily||{}; ARCDATA.weekly=ARCDATA.weekly||{};
const saveArc=()=>store.set('earsArcade',ARCDATA);
const ARC={active:false};
const ARC_WORLDS=['degrees','melody','intervals','chords','progs'];   // the worlds you answer by playing (Pitch is Classic only)
/* Melodies: melodic dictation, the game's own world (Classic has no buttons for it). The key-setting cadence, then a
   short melody, and you play every note back in order, any octave. It starts at two notes and grows to five; the
   first note is always named and lit. Shapes follow how melodies move: mostly steps, some 3rds, leaps later, and
   from level 6 a chromatic approach note into a scale note (the jazz and city pop sound). */
const ARC_MEL={id:'melody',name:'Melodies',blurb:'Hear a short melody, play it back note for note',levels:[
  {id:'m1',name:'Two notes, by step',gen:'melody',p:{len:2,leap:0}},
  {id:'m2',name:'Two notes, any',gen:'melody',p:{len:2,leap:1}},
  {id:'m3',name:'Three notes, by step',gen:'melody',p:{len:3,leap:0}},
  {id:'m4',name:'Three notes, with leaps',gen:'melody',p:{len:3,leap:1}},
  {id:'m5',name:'Four notes',gen:'melody',p:{len:4,leap:1}},
  {id:'m6',name:'Four, with a chromatic note',gen:'melody',p:{len:4,leap:1,chrom:1}},
  {id:'m7',name:'Five notes',gen:'melody',p:{len:5,leap:1,chrom:1}},
]};
ARC_MEL.levels.forEach((l,i)=>Object.assign(l,{world:ARC_MEL,index:i}));
const arcWorld=id=>id==='melody'?ARC_MEL:WORLDS.find(w=>w.id===id);
const arcLv=id=>LEVELS[id]||ARC_MEL.levels.find(l=>l.id===id);
const arcWorldOf=lv=>lv.world||arcWorld(ARC_WORLDS.find(w=>arcWorld(w).levels.some(l=>l.id===lv.id)));
GEN.melody=function(p,ctx,force){
  { let pc,n=0; do{ pc=pickKeyPc(); n++; } while(ctx.key&&pc===mod12(ctx.key)&&n<20); ctx.key=55+mod12(pc-55); }
  const T=ctx.key, sc=MAJOR, cad=pickCadence(false,ctx), at=i=>T+sc[((i%7)+7)%7]+12*Math.floor(i/7);
  let mel;
  if(force&&force.answer){ const [t0,ns]=force.answer.split(':'); mel=ns.split(',').map(n=>+n-(+t0)+T); }   // a missed melody, back again in the new key
  else { let idx=[0,2,4,0,4][Math.floor(Math.random()*5)]+(Math.random()<0.3?7:0); const ix=[idx];
    for(let k=1;k<p.len;k++){ const r=Math.random(), size=r<0.6?1:r<0.9||!p.leap?2:3+Math.floor(Math.random()*2);
      let dir=Math.random()<0.5?-1:1; if(idx+dir*size<-2||idx+dir*size>11) dir=-dir; idx+=dir*size; ix.push(idx); }
    mel=ix.map(at);
    if(p.chrom&&mel.length>=3&&Math.random()<0.75){ const k=1+Math.floor(Math.random()*(mel.length-1)), a=mel[k]+(Math.random()<0.5?-1:1);
      if(k>=1&&a!==mel[k-1]&&!sc.includes(mod12(a-T))) mel.splice(k,0,a), mel.length=p.len; } }
  const ans=`${T}:${mel.join(',')}`, key=pcName(T,false)+' major', names=mel.map(m=>pcName(m,false)).join(' '), degs=mel.map(m=>DEG_LABEL[mod12(m-T)]).join(' ');
  const run=(bus,t,gap=0.45)=>{ mel.forEach((m,i)=>tone(m,t+i*gap,gap*0.93,96,'epiano',bus)); return t+(mel.length-1)*gap+0.6; };
  return {prompt:'Play the melody back',sub:`Key of ${key}.`,options:[{id:ans,label:names}],answer:ans,item:`mel:${p.len}`,keyPc:mod12(T),mel,
    play:(bus,t)=>run(bus,cadence(bus,t,T,false,'epiano',cad)),compare:(pk,bus,t)=>run(bus,t,0.55),
    reveal:{notes:mel,text:`${names}: ${degs} in ${key}.`}};
};
// The enemy says how many notes it takes. One note: the little one. Then one kind per length, each a bit bigger and
// slower than the last, so a longer answer gets more time. A chord is the spider; a bass line is the big one.
const ARC_SPECIES={1:{face:'👾',size:38,beats:4},chord:{face:'🕷️',size:44,beats:6},2:{face:'🐍',size:40,beats:5},3:{face:'🦎',size:44,beats:6},
  4:{face:'🐊',size:50,beats:7},5:{face:'🐉',size:56,beats:8},bass:{face:'🦖',size:60,beats:0}};
function arcNeed(q){ if(q.gen==='melody') return q.mel.length; if(q.gen==='prog') return q.roots.length; return 1; }
function arcKind(q){ return q.gen==='prog'?'bass':q.gen==='chord'?'chord':q.gen==='melody'?Math.min(5,q.mel.length):1; }
const ARC_LIVES=3, ARC_STEP=6, ARC_SPELL=5, ARC_SLOW=1.25;   // the walk takes 25% longer than the answer bar it replaced (a fifth slower)
const ARC_DAILY=20, ARC_WEEKLY=12;
const arcRungs=w=>arcWorld(w).levels;
// What you play to answer, per generator (an interval's first note is named and lit, see arcRef)
const ARC_ASK={degree:'Play the note you hear',interval:'Play the second note',melody:'Play the melody back, note for note',chord:'Play the chord you hear, on this root',inversion:'Play the note in the bass',prog:'Play the bass line, one root at a time'};

/* ---------------- days, weeks and a seeded shuffle, so a daily or weekly wave is the same wave every try ---------------- */
const arcDay=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
function arcWeek(d=new Date()){ const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())), day=t.getUTCDay()||7; t.setUTCDate(t.getUTCDate()+4-day);
  const y=t.getUTCFullYear(), w=Math.ceil(((t-Date.UTC(y,0,1))/864e5+1)/7); return `${y}-W${String(w).padStart(2,'0')}`; }
const arcSeed=str=>{ let h=2166136261; for(const ch of str){ h^=ch.charCodeAt(0); h=Math.imul(h,16777619); } return h>>>0; };
const arcRng=seed=>()=>{ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
// run f with Math.random swapped for the wave's own sequence (the question generators all draw from Math.random)
function arcSeeded(f){ if(!ARC.rng) return f(); const real=Math.random; Math.random=ARC.rng; try{ return f(); } finally{ Math.random=real; } }
// days in a row with the daily played, ending today (or yesterday, if today's isn't done yet)
function arcStreak(){ let n=0; const d=new Date(); if(!ARCDATA.daily[arcDay(d)]) d.setDate(d.getDate()-1);
  while(ARCDATA.daily[arcDay(d)]){ n++; d.setDate(d.getDate()-1); } return n; }
const ARC_MEDAL={gold:'🥇',silver:'🥈',bronze:'🥉',tried:'·'};
// The levels a daily or weekly wave draws from: what you've reached in each world, plus one level above it (the stretch)
function arcWavePool(kind,rng){
  const pool=[], stretch=[];
  ARC_WORLDS.forEach(w=>{ const rs=arcRungs(w).filter(l=>!l.boss), r=Math.min(ARCDATA.reach[w]||0,rs.length);
    const have=kind==='weekly'?rs.slice(Math.max(0,r-2),Math.max(1,r)):rs.slice(0,Math.max(1,r)); pool.push(...have);
    if(rs[r]) stretch.push(rs[r]); });
  const pick=kind==='weekly'?stretch:stretch.length?[stretch[Math.floor(rng()*stretch.length)]]:[];
  return {pool,stretch:pick};
}

/* ---------------- menu: one card per world, above the Classic levels ---------------- */
function arcStars(w){ const n=arcRungs(w).length, r=ARCDATA.reach[w]||0; return r>n?3:r>=n?2:r>=2?1:0; }   // reach: ladder levels reached, one more once the last is cleared
function arcPaneHTML(){
  const today=ARCDATA.daily[arcDay()], wk=ARCDATA.weekly[arcWeek()], streak=arcStreak();
  const cal=[...Array(14)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-13+i); const r=ARCDATA.daily[arcDay(d)];
    return `<i class="${r?'on':''}${i===13?' today':''}" title="${arcDay(d)}${r?`: ${r.score.toLocaleString()}`:''}">${r?ARC_MEDAL[r.medal]:''}</i>`; }).join('');
  const todayRow=`<div class="arctoday">
    <button class="arcw arcday" data-arcd="daily"><span class="lt">Daily wave ${today?ARC_MEDAL[today.medal]:''}</span><span class="lst">${today?`Done today: ${today.score.toLocaleString()}. Play again for practice.`:`${ARC_DAILY} monsters from every world, plus today's stretch level. Your first try counts.`}</span><span class="fine">${streak?`🔥 ${streak}-day streak`:'Start a streak'}</span><span class="arccal">${cal}</span></button>
    <button class="arcw arcweek" data-arcd="weekly"><span class="lt">Weekly boss ${wk&&wk.beaten?'🏆':'👹'}</span><span class="lst">${wk?`${wk.beaten?'Beaten':'Best'}: ${wk.best.toLocaleString()} (${wk.kills} of ${ARC_WEEKLY})`:`${ARC_WEEKLY} armoured brutes, faster, from your top levels and one above each. Same wave all week.`}</span><span class="fine">Resets Monday</span></button></div>`;
  return `<div class="arcwrap">${todayRow}<div class="sec">Call &amp; Response <span class="fine">the game: monsters march at your wall, and the right answer on your keyboard blasts them</span></div><div class="arcworlds">${ARC_WORLDS.map(id=>{
    const w=arcWorld(id), r=ARCDATA.reach[id]||0, b=ARCDATA.best[id];
    return `<button class="arcw" data-arc="${id}"><span class="lt">${w.name}</span><span class="lst"><b>${starStr(arcStars(id))}</b>${r?`Reached ${arcRungs(id)[Math.min(r,arcRungs(id).length)-1].name}`:'Not played yet'}</span><span class="fine">${b?`Best ${b.toLocaleString()}`:w.blurb}</span></button>`; }).join('')}</div>
    <p class="fine">★ reach level 2 of the ladder in one run. ★★ reach the last level. ★★★ clear it. Answer on your keyboard: there's nothing to click once it starts.</p></div>
    <div class="sec arcclassic">Classic levels <span class="fine">the original quiz, level by level</span></div>`;
}

/* ---------------- the run ---------------- */
function arcStart(world){
  arcStop(); synth.init();
  const kind=world==='daily'||world==='weekly'?world:'world', id=kind==='daily'?arcDay():kind==='weekly'?arcWeek():null;
  Object.assign(ARC,{active:true,mode:'run',kind,world,mon:null,spell:0,rung:0,rungOk:0,lives:ARC_LIVES,score:0,combo:0,n:0,right:0,kills:0,misses:0,bpm:kind==='weekly'?84:72,ctx:{},again:[],missed:{},xp:0,top:0,rng:null,waveId:id});
  if(kind!=='world'){ ARC.rng=arcRng(arcSeed(kind+id)); const w=arcWavePool(kind,ARC.rng); ARC.pool=w.pool; ARC.stretch=w.stretch;
    ARC.target=kind==='daily'?ARC_DAILY:ARC_WEEKLY; ARC.practice=kind==='daily'&&!!ARCDATA.daily[id]; }
  $('modetag').textContent=kind==='daily'?'Ears: Daily wave':kind==='weekly'?'Ears: Weekly boss':'Ears: Call & Response';
  hideOv(); document.body.classList.add('nohud','earsmode'); document.body.classList.remove('menu'); $('arcStage').hidden=false;
  $('arcBody').innerHTML='<div id="arcHead"></div><canvas class="arccv" id="arcCv"></canvas><div id="arcInfo"></div>';
  arcFxStart($('arcCv')); arcFxTheme(0);
  $('staff').innerHTML=staffSVG([],[]); $('verdict').className='verdict'; $('verdict').textContent='Listen, then play it back.'; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
  ARC.timer=setTimeout(arcCall,600);
}
function arcStop(){ killBus(ARC.bus); ARC.bus=null; clearTimeout(ARC.timer); clearInterval(ARC.tick); }
// The moment the last sound of each call starts (seconds before the call's end): the note, the second note, the chord, the last chord
const arcTail=q=>q.gen==='melody'?0.6:q.gen==='degree'?1.1:q.gen==='interval'?(q.prompt.includes('together')?1.4:1.0):q.gen==='chord'?1.8:q.gen==='inversion'?1.6:1.35;
// The note you measure from, so nothing needs perfect pitch: the key's home note, the chord's root, or an interval's first note
function arcRef(q){
  if(q.gen==='interval'){ const n=q.reveal.notes, first=q.prompt.includes('going down')?Math.max(...n):Math.min(...n);   // played together: the lower one
    return {pc:mod12(first),label:`First note ${pcName(first,false)}`,midi:first}; }
  if(q.gen==='chord'||q.gen==='inversion') return {pc:q.keyPc,label:`Root ${pcName(q.keyPc,false)}`};
  if(q.gen==='melody') return {pc:q.keyPc,label:`First note ${pcName(q.mel[0],false)}`,midi:q.mel[0]};
  return null;
}
const arcLevel=()=>ARC.kind==='world'?arcRungs(ARC.world)[ARC.rung]:ARC.q?ARC.q.lv:ARC.pool[0];
// The next call: a missed one that's come due (in a new key), or a fresh one from the current rung or any below it
function arcGen(){
  const R=ARC, due=R.again.findIndex(a=>a.at<=R.n);
  let lv=R.kind==='world'?arcRungs(R.world)[R.rung]:null, force;
  if(due>=0){ const a=R.again.splice(due,1)[0]; lv=arcLv(a.lv); force={answer:a.answer}; }
  else if(R.kind!=='world'){ const s=R.stretch.length&&Math.random()<(R.kind==='weekly'?0.35:0.2); lv=s?R.stretch[Math.floor(Math.random()*R.stretch.length)]:R.pool[Math.floor(Math.random()*R.pool.length)]; lv=arcLv(lv.id); }
  else if(R.rung&&Math.random()<0.3) lv=arcRungs(R.world)[Math.floor(Math.random()*R.rung)];   // older levels keep coming back
  const c=R.ctx[lv.id]||(R.ctx[lv.id]={}), q=GEN[lv.gen](lv.p,c,force);
  q.lv=lv; q.gen=lv.gen; q.review=!!force; q.stretch=R.kind!=='world'&&R.stretch.some(x=>x.id===lv.id); return q;
}
function arcCall(){
  const R=ARC; if(!R.active||R.mode!=='run') return; arcStop(); clearDraft();
  if(R.lives<=0||R.kind!=='world'&&R.kills>=R.target&&!R.mon) return arcOver();
  const q=R.q=arcSeeded(arcGen); R.n++; R.got=[]; R.done=false; R.tried=false;
  const bus=R.bus=newBus(); if(!bus) return;
  const t0=now()+0.1, end=arcSeeded(()=>q.play(bus,t0)), spb=60/R.bpm;
  const sp=ARC_SPECIES[arcKind(q)], beats=q.gen==='prog'?6+1.3*q.roots.length:sp.beats;   // bigger enemies walk slower
  // The monster steps out the moment the call's last sound starts (the note, the second note, the chord, the last chord
  // of a progression), and that's when your answer starts to count: nothing before it, and no gap after it.
  const spawn=Math.max(t0,end-arcTail(q));
  R.open=spawn; R.callEnd=spawn; R.close=spawn+beats*spb*ARC_SLOW; R.beats=beats; R.spb=spb;
  // the monster: a fresh one at the far end, or a brute still standing from the last hit, walking from where it is now
  // (only one-answer enemies come armoured; a melody or a bass line is long enough already)
  if(!R.mon){ const need=arcNeed(q), brute=need===1&&arcSeeded(()=>R.kind==='weekly'||(R.kind==='daily'?R.n>7:R.rung>=2)&&Math.random()<0.25);
    R.mon={hp:brute?2:1,max:brute?2:1,brute,face:sp.face,size:sp.size*(brute?1.25:1),segs:need,x:1}; }
  R.mon.segs=arcNeed(q); R.mon.left=R.mon.segs;
  R.walk={x0:R.mon.x,t0:spawn,t1:R.close};   // it waits (out of sight, or where a brute stands) until then
  arcRender(); if(R.kind==='world') arcFxTheme(Math.floor(R.rung/Math.max(1,arcRungs(R.world).length/4))); else arcFxTheme(Math.floor(4*R.kills/R.target));
  kbMarks={}; const ref=arcRef(q), refPc=ref?ref.pc:q.keyPc;   // light the note you measure from, in every octave
  if(refPc!=null) for(const m in keyEls) if(mod12(+m-refPc)===0) kbMarks[m]='k-root'; if(ref&&ref.midi) kbMarks[ref.midi]='k-chord'; paintKeys();
  R.tick=setInterval(()=>{ const t=now(), W=R.walk;
    if(t>=W.t0) R.mon.x=Math.max(0,W.x0*(W.t1-t)/(W.t1-W.t0));
    const ph=$('arcPhase'); if(ph) ph.textContent=t<R.open?'Listen…':'Your turn';
    if(t>R.close&&!R.done) arcMiss(null); },60);
}
function arcRender(){
  const R=ARC, q=R.q, lv=q.lv, rungs=R.kind==='world'?arcRungs(R.world):[];
  const key=q.gen==='degree'?q.sub.match(/Key of ([^.]+)/)?.[1]:q.gen==='prog'?q.reveal.text.match(/ in ([A-G][♭♯]? (?:major|minor))/)?.[1]:null;
  const ref=arcRef(q);
  const head=$('arcHead'), info=$('arcInfo'); if(!head) return;
  head.innerHTML=`<div class="etop"><span class="etitle">${R.kind==='daily'?`Daily wave${R.practice?' (practice)':''}`:R.kind==='weekly'?'Weekly boss':arcWorld(R.world).name}</span><span>Score <b>${R.score.toLocaleString()}</b></span><span>Combo <b>${R.combo}</b></span><span>♩ = ${R.bpm}</span><span class="lives">${[...Array(ARC_LIVES)].map((_,k)=>`<i${k<R.lives?'':' class="gone"'}></i>`).join('')}</span></div>
    <div class="arcladder">${R.kind==='world'?rungs.map((l,i)=>`<i class="${i<R.rung?'done':i===R.rung?'cur':''}" title="${l.name}"></i>`).join(''):`<b class="arccount">${Math.min(R.kills+1,R.target)} of ${R.target}</b>`}<span>${R.kind!=='world'?WORLDS.find(w=>w.levels.some(l=>l.id===lv.id)).name+': ':''}${gigAccHTML(lv.name)}${q.stretch?' · stretch':''}${q.review?' · back again':''}</span></div>
    <div class="arcask"><span id="arcPhase">Listen…</span><b>${ARC_ASK[q.gen]}</b>${key?`<em>Key of ${gigAccHTML(key)}</em>`:''}${ref?`<em>${gigAccHTML(ref.label)}</em>`:''}${q.gen==='prog'?`<em>${q.roots.length} chords</em>`:q.gen==='melody'?`<em>${q.mel.length} notes</em>`:''}</div>${q.gen==='chord'&&document.body.classList.contains('nomidi')?'<p class="fine">Clicking the keys? Pick the notes, then press Enter.</p>':''}
`;
  info.innerHTML=`<div class="arcspell${R.spell>=ARC_SPELL?' ready':''}"><span>${R.spell>=ARC_SPELL?'🔥 Spell ready: your next right answer is a fireball':'Spell'}</span>${[...Array(ARC_SPELL)].map((_,k)=>`<i${k<R.spell?' class="on"':''}></i>`).join('')}</div>
    <div class="arcprog" id="arcProg">${q.gen==='prog'?q.roots.map(()=>'<i></i>').join(''):q.gen==='melody'?q.mel.map(()=>'<i></i>').join(''):''}</div>
    <div class="lmsg" id="arcMsg"></div>
    <p class="fine">Esc ends the run.</p>`;
}
// Read your answer for this call. Returns the option id you played, or null while a bass line is still coming in.
function arcRead(q,notes){
  const lo=Math.min(...notes);
  if(q.gen==='degree'||q.gen==='interval') return q.fromMidi(notes);
  if(q.gen==='inversion'){ const iv=mod12(lo-q.keyPc); return {0:'0',3:'1',4:'1',7:'2'}[iv]??'x'; }
  if(q.gen==='chord'){ if(notes.length<3) return undefined; const root=defaultRoot(q.keyPc,Q[q.answer].minor);
    if(evaluate(notes,{root,q:Q[q.answer]},opts).ok) return q.answer;
    const r=identify(notes).find(x=>x.t.root.pc===q.keyPc); return r?r.t.q.id:'x'; }
  return undefined;
}
// Clicking the on-screen keys: a single-note answer (degree, interval, bass note, a bass-line root) goes in at once;
// a chord is picked key by key and played with Enter, as everywhere else
function arcClick(m){
  const R=ARC; if(!R.active||R.mode!=='run'||!R.q||R.q.gen==='chord') return false;
  synth.on(m,80); setTimeout(()=>synth.off(m,0.5),400); if(arcSeq()) arcSeqNote(m); else arcNotes([m]); return true;
}
// A melody or a bass line is read note by note as you play (not as chords), any octave, each one against the next in line
const arcSeq=()=>ARC.active&&ARC.mode==='run'&&ARC.q&&(ARC.q.gen==='melody'||ARC.q.gen==='prog');
function arcSeqNote(m){
  const R=ARC, q=R.q; if(R.done||now()<R.open) return;
  const i=R.got.length, want=q.gen==='prog'?q.roots[i]:mod12(q.mel[i]);
  if(mod12(m)!==want) return arcMiss('x');
  R.got.push(m); const dots=$('arcProg'); if(dots&&dots.children[i]) dots.children[i].className='ok';
  if(R.mon) R.mon.left=q.gen==='prog'?q.roots.length-R.got.length:q.mel.length-R.got.length;
  if(R.got.length===(q.gen==='prog'?q.roots.length:q.mel.length)) arcHit(R.got); else arcFxSeg(m);
}
function arcNotes(notes){
  const R=ARC; if(!R.active) return;
  if(R.mode==='over'){ if(notes.length>=3) arcStart(R.kind==='world'?R.world:R.kind); return; }   // any chord: go again
  if(R.mode!=='run'||R.done||now()<R.open) return;
  const q=R.q;
  if(arcSeq()){ notes.forEach(arcSeqNote); return; }   // (from Enter after clicking; MIDI notes come in one by one)
  const pick=arcRead(q,notes); if(pick===undefined) return;
  if(pick===q.answer) arcHit(notes); else arcMiss(pick);
}
function arcHit(notes){
  const R=ARC; R.done=true; clearInterval(R.tick);
  const left=Math.min(1,Math.max(0,(R.close-now())/(R.close-R.callEnd))), mult=1+Math.min(2,R.combo*0.1), fire=R.spell>=ARC_SPELL;
  const pts=Math.round((100+100*left)*mult*(fire?3:1)*(R.mon.brute?1.5:1)*(1+0.35*(arcNeed(R.q)-1)));
  R.score+=pts; R.combo++;
  let kill;
  if(fire){ R.spell=0; R.mon.hp=0; R.lives=Math.min(ARC_LIVES,R.lives+1); kill='🔥'; }
  else { R.spell=Math.min(ARC_SPELL,R.spell+1); R.mon.hp--; kill=R.mon.hp>0?null:'💥'; }
  arcFxHit({notes,kill:!!kill,fire,brute:R.mon.brute,pts,quick:left>0.6,combo:R.combo});
  if(kill){ R.mon=null; R.kills++; } else R.mon.x=Math.min(1,R.mon.x+0.3);   // a brute only staggers back
  R.right++; R.rungOk++; R.xp+=3; R.bpm=Math.min(150,R.bpm+2);
  earRecord(R.q.item,true,null); if(R.q.keyPc!=null) keyRecord(R.q.keyPc,true,null);
  let up='';
  if(R.kind==='world'&&R.rungOk>=ARC_STEP){ R.rungOk=0;
    if(R.rung<arcRungs(R.world).length-1){ R.rung++; up=` Level up: ${arcLevel().name}.`; setTimeout(()=>arcFxBanner(`Level up: ${arcLevel().name}`),350); R.bpm=Math.max(72,R.bpm-8); }   // a breath when new answers join
    else R.top++; }
  $('arcMsg').textContent=`${fire?'Fireball! ':!kill?'Hit! It\'s still coming. ':''}+${pts}${R.combo>2?` ×${mult.toFixed(1)}`:''}${left>0.6?' Quick!':''}${up}`; $('arcMsg').className='lmsg ok';
  $('verdict').className='verdict ok'; $('verdict').textContent=R.q.reveal.text;
  R.timer=setTimeout(arcCall,up?1300:kill?550:250);
}
function arcMiss(pick){
  const R=ARC, q=R.q; R.done=true; clearInterval(R.tick);
  R.lives--; R.combo=0; R.spell=0; R.misses++; R.missed[q.lv.id]=(R.missed[q.lv.id]||0)+1; if(R.mon) R.kills++;   // it got through: one fewer in the wave
  arcFxMiss(); R.mon=null;   // it winds up and charges the wall
  earRecord(q.item,false,null); if(q.keyPc!=null) keyRecord(q.keyPc,false,null);
  R.again.push({lv:q.lv.id,answer:q.answer,at:R.n+3+Math.floor(arcSeeded(Math.random)*3)});
  killBus(R.bus); const bus=R.bus=newBus();
  const known=pick!=null&&pick!=='x'&&q.options.some(o=>o.id===pick);
  const end=bus?q.compare(known?pick:null,bus,now()+0.15):now()+1.5;
  const lab=id=>(q.options.find(o=>o.id===id)||{}).label;
  $('arcMsg').textContent=pick==null?`Too late. It was ${lab(q.answer)}.`:known?`You played ${lab(pick)}; it was ${lab(q.answer)}. Hear both.`:`It was ${lab(q.answer)}.`; $('arcMsg').className='lmsg no';
  $('verdict').className='verdict no'; $('verdict').textContent=q.reveal.text;
  if(q.reveal.notes){ kbMarks={}; q.reveal.notes.forEach(m=>kbMarks[m]='k-hint'); paintKeys(); }
  R.timer=setTimeout(arcCall,Math.max(1200,(end-now())*1000+500));
}
function arcOver(quit){
  const R=ARC; arcStop(); arcFxStop(); clearDraft(); R.mode='over';
  if(R.kind!=='world') return arcWaveOver(quit);
  const w=R.world, reach=R.rung+1+(R.top>0?1:0), prevBest=ARCDATA.best[w]||0;
  if(R.score>prevBest) ARCDATA.best[w]=R.score; if(reach>(ARCDATA.reach[w]||0)) ARCDATA.reach[w]=Math.min(reach,arcRungs(w).length+1);
  addXP(R.xp+Math.round(R.score/100)); saveArc(); saveEars();
  const weak=Object.entries(R.missed).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([id])=>arcLv(id).name);
  $('arcBody').innerHTML=`<h2>${R.score>prevBest&&R.score?'New best':quit?'Run ended':'Out of lives'}</h2>
    <div class="results"><div><b>${R.score.toLocaleString()}</b>score</div><div><b>${R.right}</b>right</div><div><b>${gigAccHTML(arcLevel().name)}</b>reached</div><div><b>${Math.max(prevBest,R.score).toLocaleString()}</b>best</div></div>
    <div class="stars eresults" style="margin:0"><span class="stars">${starStr(arcStars(w))}</span></div>
    ${weak.length?`<p>Most misses: ${weak.map(gigAccHTML).join(', ')}. They came back during the run; they'll keep coming back.</p>`:''}
    <p class="arcagain"><b>Play any chord to go again.</b></p>
    <div class="erow"><button class="go" id="arcAgain">Again</button><button class="ghost" id="arcMenu">Back to Ears</button></div>`;
  $('arcAgain').onclick=()=>arcStart(w); $('arcMenu').onclick=arcToMenu;
  $('verdict').className='verdict'; $('verdict').textContent='Play any chord to go again.'; kbMarks={}; paintKeys();
}
function arcWaveOver(quit){
  const R=ARC, done=R.kills>=R.target&&R.lives>0, daily=R.kind==='daily';
  const medal=!done?'tried':R.misses===0?'gold':R.misses<=2?'silver':'bronze';
  let line='';
  if(daily){ if(!R.practice&&(R.n>1||!quit)){ ARCDATA.daily[R.waveId]={score:R.score,medal,misses:R.misses,kills:R.kills}; line=`${ARC_MEDAL[medal]!=='·'?ARC_MEDAL[medal]+' ':''}Today's counted. 🔥 ${arcStreak()}-day streak. A new wave tomorrow.`; }
    else line='Practice: your first try today is the one that counts.'; }
  else { const w=ARCDATA.weekly[R.waveId]||{best:0,kills:0,beaten:false};
    if(R.score>w.best) w.best=R.score; w.kills=Math.max(w.kills,Math.min(R.kills,R.target)); if(done) w.beaten=true; ARCDATA.weekly[R.waveId]=w;
    line=done?'🏆 Boss beaten this week.':`${Math.min(R.kills,R.target)} of ${R.target} down. Same wave all week: try again any time.`; }
  addXP(R.xp+Math.round(R.score/100)+(done?(daily?40:120):0)); saveArc(); saveEars();
  const weak=Object.entries(R.missed).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([id])=>arcLv(id).name);
  $('arcBody').innerHTML=`<h2>${done?(daily?'Wave cleared':'Boss beaten'):quit?'Run ended':'The wall fell'}</h2>
    <div class="results"><div><b>${R.score.toLocaleString()}</b>score</div><div><b>${Math.min(R.kills,R.target)} of ${R.target}</b>monsters</div><div><b>${R.misses}</b>misses</div>${daily?`<div><b>${ARC_MEDAL[medal]==='·'?'–':ARC_MEDAL[medal]}</b>medal</div>`:''}</div>
    <p>${line}</p>${weak.length?`<p>Most misses: ${weak.map(gigAccHTML).join(', ')}.</p>`:''}
    <p class="arcagain"><b>Play any chord to go again${daily?' (practice)':''}.</b></p>
    <div class="erow"><button class="go" id="arcAgain">Again</button><button class="ghost" id="arcMenu">Back to Ears</button></div>`;
  $('arcAgain').onclick=()=>arcStart(R.kind); $('arcMenu').onclick=arcToMenu;
  $('verdict').className='verdict'; $('verdict').textContent='Play any chord to go again.'; kbMarks={}; paintKeys();
}
function arcToMenu(){ arcStop(); arcFxStop(); ARC.active=false; clearDraft(); $('arcStage').hidden=true; document.body.classList.remove('earsmode');
  side='ears'; $('startOv').hidden=false; document.body.classList.add('menu'); kbMarks={}; paintKeys(); renderMenu(); }
function arcKey(e){
  if(!ARC.active) return false;
  if(e.key==='Escape'){ ARC.mode==='run'?arcOver(true):arcToMenu(); return true; }
  return false;
}
