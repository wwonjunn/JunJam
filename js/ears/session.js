/* Ears: session loop, scoring, stats, weakness drill, and the Ears menu pane. */
let EARDATA=store.get('ears',{items:{},conf:{},stars:{},best:{}});
EARDATA.keys=EARDATA.keys||{}; // per key: {n, ok, t}; t is answer time divided by the world's target time
const saveEars=()=>store.set('ears',EARDATA);
function earWeight(key){ const s=EARDATA.items[key]; if(!s||!s.n) return 1.5; return 1+2*(1-s.ok/s.n); }
function earRecord(key,ok,secs){ if(!key) return; const s=EARDATA.items[key]||(EARDATA.items[key]={n:0,ok:0,t:null}); s.n++; if(ok) s.ok++; if(secs!=null) s.t=s.t==null?secs:s.t*0.7+secs*0.3; }
function keyRecord(pc,ok,tn){ const s=EARDATA.keys[pc]||(EARDATA.keys[pc]={n:0,ok:0,t:null}); s.n++; if(ok) s.ok++; if(tn!=null) s.t=s.t==null?tn:s.t*0.7+tn*0.3; }
function levelUnlocked(l){ return l.index===0 || (EARDATA.stars[l.world.levels[l.index-1].id]||0)>=1; }
const starStr=n=>'★'.repeat(n)+'☆'.repeat(3-n);

const EARS={active:false};
// Mixed: practice run drawing from every unlocked level of one world. No stars.
const mixPool=w=>w.levels.filter(l=>levelUnlocked(LEVELS[l.id]));
function earsStart(levelId){
  const drill=levelId==='drill', mixW=levelId.startsWith('mix:')?WORLDS.find(w=>'mix:'+w.id===levelId):null;
  const lv=drill?{id:'drill',name:'Weakness drill',world:{name:'Ears',rt:4},boss:false}
    :mixW?{id:levelId,name:'Mixed',world:mixW,boss:false,mix:true}:LEVELS[levelId];
  Object.assign(EARS,{active:true,lv,drill,total:lv.boss?15:20,idx:0,correct:0,lives:3,times:[],ctx:{},ctxs:{},q:null,bus:null,
    answered:false,readyAt:0,timerRaf:0,misses:[],xp:0,advanceTimer:0});
  if(drill){ EARS.pairs=topConfusions(12); if(!EARS.pairs.length){ earsMenuNote('No mix-ups recorded yet. Play a few levels first.'); EARS.active=false; return; } }
  if(mixW) EARS.pool=mixPool(mixW);
  synth.init(); hideOv(); document.body.classList.add('earsmode'); document.body.classList.remove('menu');
  $('earsStage').hidden=false; $('eResults').hidden=true; $('ePlay').hidden=false;
  $('eTitle').textContent=(lv.boss?'Boss: ':'')+(lv.mix?lv.world.name+': ':'')+lv.name; $('modetag').textContent='Ears: '+lv.world.name;
  kbMarks={}; paintKeys(); $('staff').innerHTML=staffSVG([],[]);
  $('verdict').className='verdict'; $('verdict').textContent='Listen.'; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
  earsNext();
}
function earsGen(){
  if(EARS.drill){
    const e=weightedPick(EARS.pairs.map(p=>({...p,w:p.count})));
    const lv=LEVELS[e.level]; const g=GEN[lv.gen];
    const pool=lv.p.set?lv.p.set.map(String):null;
    const opts=pool?[...new Set([e.a,e.b,pickOne(pool),pickOne(pool)])].map(x=>isNaN(+x)?x:+x):null;
    const q=g(lv.p,EARS.ctx,{answer:pickOne([e.a,e.b]),options:opts?(lv.gen==='chord'?opts.map(String):opts):undefined});
    q.levelId=lv.id; q.sub=`${lv.world.name}: ${lv.name}. `+(q.sub||''); return q;
  }
  if(EARS.lv.mix){ // each level keeps its own context, so a degree level's key doesn't leak into another
    const l=LEVELS[pickOne(EARS.pool).id], c=EARS.ctxs[l.id]||(EARS.ctxs[l.id]={});
    const q=GEN[l.gen](l.p,c); q.levelId=l.id; q.sub=`${l.name}. `+(q.sub||''); return q;
  }
  const q=GEN[EARS.lv.gen](EARS.lv.p,EARS.ctx); q.levelId=EARS.lv.id; return q;
}
function earsNext(){
  clearTimeout(EARS.advanceTimer);
  if(EARS.idx>=EARS.total || EARS.lives<=0){ earsFinish(); return; }
  killBus(EARS.bus); EARS.q=earsGen(); EARS.answered=false; EARS.idx++;
  const q=EARS.q;
  $('ePrompt').textContent=q.prompt; $('eSub').textContent=q.sub||'';
  $('eOpts').innerHTML=q.options.map((o,i)=>`<button class="eopt" data-id="${o.id}"><span class="k">${i<9?i+1:''}</span>${o.label}</button>`).join('');
  $('eNext').hidden=true; $('eReplay').hidden=!!EARS.lv.boss;
  earsHud();
  earsPlay();
}
function earsPlay(){
  killBus(EARS.bus); EARS.bus=newBus(); if(!EARS.bus) return;
  const t0=now()+0.08, end=EARS.q.play(EARS.bus,t0);
  EARS.readyAt=performance.now()+(end-now())*1000;
  if(EARS.lv.boss) earsTimer();
}
function earsTimer(){
  cancelAnimationFrame(EARS.timerRaf);
  const limit=EARS.lv.world.rt*2*1000, bar=$('eTimer');
  const step=()=>{
    if(!EARS.active||EARS.answered) return;
    const left=EARS.readyAt+limit-performance.now();
    bar.style.width=Math.max(0,Math.min(100,100*left/limit))+'%';
    if(left<=0){ earsAnswer('timeout','timer'); return; }
    EARS.timerRaf=requestAnimationFrame(step);
  };
  EARS.timerRaf=requestAnimationFrame(step);
}
function earsAnswer(id,via){
  if(!EARS.active||EARS.answered||!EARS.q) return;
  EARS.answered=true; cancelAnimationFrame(EARS.timerRaf);
  const q=EARS.q, ok=String(id)===String(q.answer);
  const secs=Math.max(0,(performance.now()-EARS.readyAt)/1000);
  earRecord(q.item,ok,ok?secs:null);
  if(q.keyPc!=null) keyRecord(q.keyPc,ok,ok?secs/LEVELS[q.levelId].world.rt:null);
  document.querySelectorAll('.eopt').forEach(b=>{ if(b.dataset.id===String(q.answer)) b.classList.add('right'); else if(b.dataset.id===String(id)) b.classList.add('wrong'); b.disabled=true; });
  const label=id==='timeout'?'Out of time':(q.options.find(o=>o.id===String(id))||{label:id}).label;
  const right=q.options.find(o=>o.id===String(q.answer)).label;
  earsReveal(q,ok);
  killBus(EARS.bus); EARS.bus=newBus();
  if(ok){
    EARS.correct++; EARS.times.push(secs);
    const gain=10+(secs<=EARS.lv.world.rt?5:0); EARS.xp+=gain;
    $('verdict').className='verdict ok'; $('verdict').textContent=`${right}. Yes.`;
    let end=now()+0.05;
    if(q.resolve) end=q.resolve(EARS.bus,end);
    EARS.advanceTimer=setTimeout(earsNext,Math.max(650,(end-now())*1000+250));
  } else {
    if(q.item && id!=='timeout'){ const k=`${q.levelId}|${q.answer}|${id}`; EARDATA.conf[k]=(EARDATA.conf[k]||0)+1; }
    EARS.misses.push({right,said:label});
    if(EARS.lv.boss) EARS.lives--;
    $('verdict').className='verdict no'; $('verdict').textContent=id==='timeout'?`Out of time. It was ${right}.`:`It was ${right}. You said ${label}.`;
    $('why').textContent=(id==='timeout'?'Here it is again. ':'Yours first, then the right one. ')+$('why').textContent;
    q.compare(id,EARS.bus,now()+0.1);
    $('eNext').hidden=false; $('eNext').focus();
  }
  saveEars(); earsHud();
}
function earsReveal(q,ok){
  const r=q.reveal||{notes:[]};
  kbMarks={};
  if(r.target){
    const ev=evaluate(r.notes,r.target,{rootless:true});
    $('staff').innerHTML=staffSVG(ev.per.map(p=>({...p.spell,midi:p.midi})),ev.per.map(p=>p.role));
    ev.per.forEach(p=>kbMarks[p.midi]='k-'+p.role);
    $('chips').innerHTML=ev.per.map(p=>`<span class="r-${p.role}">${p.spell.name}<em>${p.label==='R'?'root':p.label}</em></span>`).join('');
  } else {
    $('staff').innerHTML=staffSVG(r.notes.map(plainSpell),r.notes.map(()=>ok?'chord':'held'));
    r.notes.forEach(m=>kbMarks[m]=ok?'k-chord':'k-hint');
    $('chips').innerHTML='';
  }
  $('why').textContent=r.text||''; $('tags').textContent='';
  paintKeys();
}
function earsNotes(notes){
  if(!EARS.active||!EARS.q) return;
  if(EARS.answered){ return; }
  if(!EARS.q.fromMidi) return;
  const id=EARS.q.fromMidi(notes);
  if(EARS.q.options.some(o=>o.id===id)) earsAnswer(id,'midi');
  else { // a note outside this level's choices still counts, and still gets explained
    earsAnswer(id,'midi');
  }
}
function earsHud(){
  const pct=EARS.idx?Math.round(100*EARS.correct/Math.max(1,EARS.idx-(EARS.answered?0:1))):0;
  $('eCount').textContent=`${Math.min(EARS.idx,EARS.total)} of ${EARS.total}`+(EARS.idx>1||EARS.answered?`, ${pct}% right`:'');
  $('eLives').innerHTML=EARS.lv.boss?[0,1,2].map(i=>`<i class="${i<EARS.lives?'':'gone'}"></i>`).join(''):'';
  $('eBar').style.width=(EARS.lv.boss?100*(EARS.total-EARS.correct)/EARS.total:100*(EARS.idx-(EARS.answered?0:1))/EARS.total)+'%';
  $('eBar').classList.toggle('boss',!!EARS.lv.boss);
  $('eTimerWrap').classList.toggle('hide',!EARS.lv.boss);
}
function earsFinish(quit){
  EARS.active=false; clearTimeout(EARS.advanceTimer); cancelAnimationFrame(EARS.timerRaf); killBus(EARS.bus);
  const lv=EARS.lv, done=EARS.idx-(EARS.answered?0:1), acc=done?EARS.correct/done:0;
  const avg=EARS.times.length?EARS.times.reduce((a,b)=>a+b,0)/EARS.times.length:null;
  const fast=avg!==null&&avg<=lv.world.rt;
  let stars=0, title;
  if(quit){ title='Session ended'; }
  else if(lv.boss){ const won=EARS.lives>0&&EARS.correct>=EARS.total-2; stars=won?(EARS.lives===3?3:EARS.lives===2?2:1):0; title=won?'Boss beaten':'The boss wins this round'; }
  else if(lv.id==='drill'){ title='Drill done'; }
  else if(lv.mix){ title='Mix done'; }
  else { stars=acc>=0.9?(acc===1&&fast?3:acc>=0.95&&fast?2:1):0; title=stars?'Level passed':'Not quite 90% yet'; }
  const practice=lv.id==='drill'||lv.mix;
  if(!practice && !quit){
    const prev=EARDATA.stars[lv.id]||0; if(stars>prev) EARDATA.stars[lv.id]=stars;
    if(stars&&!prev) EARS.xp+=lv.boss?100:50;
  }
  addXP(EARS.xp); saveEars();
  const next=!practice&&lv.world.levels?lv.world.levels[lv.index+1]:null;
  const nextOpen=next&&levelUnlocked(LEVELS[next.id]);
  const mix={}; EARS.misses.forEach(m=>{const k=`${m.right} heard as ${m.said}`; mix[k]=(mix[k]||0)+1;});
  const mixTop=Object.entries(mix).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,v])=>v>1?`${k} (${v} times)`:k);
  $('ePlay').hidden=true; $('eResults').hidden=false;
  $('eResults').innerHTML=`<h2>${title}</h2>${stars?`<div class="stars">${starStr(stars)}</div>`:''}
    <div class="results"><div><b>${Math.round(acc*100)}%</b>right</div><div><b>${EARS.correct}</b>of ${done}</div><div><b>${avg===null?'–':avg.toFixed(1)+'s'}</b>average answer</div><div><b>+${EARS.xp}</b>XP</div></div>
    ${!lv.boss&&!practice&&!quit?`<p>Pass with 90%. Two stars: 95% and answers averaging under ${lv.world.rt}s. Three stars: every answer right and under ${lv.world.rt}s.</p>`:''}
    ${mixTop.length?`<p>Mix-ups: ${mixTop.join(', ')}.</p>`:''}
    <button class="go" id="eAgain">${lv.id==='drill'?'Drill again':lv.mix?'Mix again':'Try again'}</button>${nextOpen?`<button class="ghost" id="eNextLv">Next: ${next.name}</button>`:''}<button class="ghost" id="eMap">Back to map</button>`;
  $('eAgain').onclick=()=>earsStart(lv.id);
  if(nextOpen) $('eNextLv').onclick=()=>earsStart(next.id);
  $('eMap').onclick=earsToMenu;
  $('eAgain').focus();
}
function earsToMenu(){
  EARS.active=false; killBus(EARS.bus); cancelAnimationFrame(EARS.timerRaf); clearTimeout(EARS.advanceTimer);
  $('earsStage').hidden=true; document.body.classList.remove('earsmode');
  side='ears'; $('startOv').hidden=false; document.body.classList.add('menu'); renderMenu();
}
function topConfusions(n){
  return Object.entries(EARDATA.conf).map(([k,count])=>{const [level,a,b]=k.split('|'); return {level,a,b,count};})
    .filter(x=>LEVELS[x.level]&&x.count>=1).sort((x,y)=>y.count-x.count).slice(0,n);
}
function confLabel(c){
  const lv=LEVELS[c.level], lab=id=>{
    if(lv.gen==='degree') return DEG_LABEL[+id]; if(lv.gen==='interval') return INT_LABEL[+id];
    if(lv.gen==='chord') return QNAME(id); if(lv.gen==='prog') return PROG[id].short; if(lv.gen==='inversion') return ['root','3rd','5th'][+id]+' in bass'; return id; };
  return `${lab(c.a)} heard as ${lab(c.b)}`;
}
function earsMenuNote(t){ const el=$('earsNote'); if(el){ el.textContent=t; } }

function renderEarsPane(){
  const conf=topConfusions(3);
  let h=`<p>Short listening levels. Pass a level with 90% to open the next one. Each world ends with a boss: 15 questions, 3 lives, a timer and no replays.</p>
    <div class="drill"><button class="ghost" id="drillBtn" style="margin-left:0">Weakness drill</button><span id="earsNote">${conf.length?`Your biggest mix-ups: ${conf.map(confLabel).join(', ')}.`:'The drill builds itself from your mix-ups once you have some.'}</span></div>`;
  const pushed=pushedKeys();
  if(pushed) h+=`<p class="fine" style="margin:-6px 0 14px">Scale degrees and chords lean on your shakiest keys, from Hands and Ears together. Right now: ${pushed}.</p>`;
  WORLDS.forEach(w=>{
    const got=w.levels.reduce((a,l)=>a+(EARDATA.stars[l.id]||0),0);
    h+=`<div class="world"><div class="wh"><span class="wn">${w.name}</span><span class="wb">${w.blurb}</span><span class="ws">${got} of ${w.levels.length*3} stars</span></div><div class="lvls">`;
    w.levels.forEach(l=>{
      const L=LEVELS[l.id], open=levelUnlocked(L), st=EARDATA.stars[l.id]||0;
      h+=`<button class="lvl${l.boss?' boss':''}" data-lv="${l.id}" ${open?'':'disabled'} title="${open?'':'Pass the level before this one first'}"><span class="ln">${l.boss?'Boss':L.index+1}</span><span class="lt">${l.name}</span><span class="lst">${open?starStr(st):'Locked'}</span></button>`;
    });
    const n=mixPool(w).length;
    h+=`<button class="lvl mix" data-lv="mix:${w.id}" ${n>=2?'':'disabled'} title="${n>=2?'Random questions from your unlocked levels. Practice only, no stars.':'Unlock a second level to mix'}"><span class="ln">Practice</span><span class="lt">Mixed</span><span class="lst">${n>=2?`${n} level${n>1?'s':''}`:'Locked'}</span></button>`;
    h+='</div></div>';
  });
  $('earsPane').innerHTML=h;
  $('drillBtn').onclick=()=>earsStart('drill');
  $('earsPane').querySelectorAll('.lvl').forEach(b=>b.onclick=()=>earsStart(b.dataset.lv));
}

function earsKey(e){
  if(!EARS.active) return false;
  if(e.key==='Escape'){ earsFinish(true); return true; }
  if(!$('eResults').hidden) return false;
  if(/^[1-9]$/.test(e.key)){ const b=document.querySelectorAll('.eopt')[+e.key-1]; if(b&&!EARS.answered) earsAnswer(b.dataset.id,'key'); return true; }
  if(e.key==='r'||e.key==='R'){ if(!EARS.lv.boss&&!EARS.answered) earsPlay(); else if(EARS.answered&&!EARS.lv.boss){ killBus(EARS.bus); EARS.bus=newBus(); EARS.q.compare(null,EARS.bus,now()+0.05);} return true; }
  if((e.key==='Enter'||e.key===' ')&&EARS.answered){ e.preventDefault(); earsNext(); return true; }
  return e.key===' '||e.key==='Enter';
}
