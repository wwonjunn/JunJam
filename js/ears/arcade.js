/* Ears: Call & Response. The game version of Ears; the level-by-level quiz is still there as Classic.
   The app plays a call (a note against its key, an interval, a chord, a progression), then a bar of hi-hat counts you
   in, and you answer on the keyboard inside that bar: play the scale degree, the second note, the chord itself on
   the root shown, the note in the bass, or the progression's bass line. No buttons: a right answer rolls straight
   into the next call, a wrong or late one plays you what it was and costs one of three lives, and the run goes on.
   Every right answer nudges the tempo up (less time to answer); every six, the next level of that world's ladder
   joins in (Add 2, Add 4…), so one run climbs the whole world. Missed answers come back a few calls later.
   After a run, play any chord to go again. */
let ARCDATA=store.get('earsArcade',{best:{},reach:{},stars:{}});
const saveArc=()=>store.set('earsArcade',ARCDATA);
const ARC={active:false};
const ARC_WORLDS=['degrees','intervals','chords','progs'];   // the worlds you answer by playing (Pitch is Classic only)
const ARC_LIVES=3, ARC_STEP=6;
const arcRungs=w=>WORLDS.find(x=>x.id===w).levels;
// What you play to answer, per generator
const ARC_ASK={degree:'Play the note you hear',interval:'Play the second note',chord:'Play the chord you hear, on this root',inversion:'Play the note in the bass',prog:'Play the bass line, one root at a time'};

/* ---------------- menu: one card per world, above the Classic levels ---------------- */
function arcStars(w){ const n=arcRungs(w).length, r=ARCDATA.reach[w]||0; return r>n?3:r>=n?2:r>=2?1:0; }   // reach: ladder levels reached, one more once the last is cleared
function arcPaneHTML(){
  return `<div class="arcwrap"><div class="sec">Call &amp; Response <span class="fine">the game: hear it, play it back before the bar ends, three lives</span></div><div class="arcworlds">${ARC_WORLDS.map(id=>{
    const w=WORLDS.find(x=>x.id===id), r=ARCDATA.reach[id]||0, b=ARCDATA.best[id];
    return `<button class="arcw" data-arc="${id}"><span class="lt">${w.name}</span><span class="lst"><b>${starStr(arcStars(id))}</b>${r?`Reached ${arcRungs(id)[Math.min(r,arcRungs(id).length)-1].name}`:'Not played yet'}</span><span class="fine">${b?`Best ${b.toLocaleString()}`:w.blurb}</span></button>`; }).join('')}</div>
    <p class="fine">★ reach level 2 of the ladder in one run. ★★ reach the last level. ★★★ clear it. Answer on your keyboard: there's nothing to click once it starts.</p></div>
    <div class="sec" style="margin-top:18px">Classic levels <span class="fine">the original quiz, level by level</span></div>`;
}

/* ---------------- the run ---------------- */
function arcStart(world){
  arcStop(); synth.init(); drumsInit();
  Object.assign(ARC,{active:true,mode:'run',world,rung:0,rungOk:0,lives:ARC_LIVES,score:0,combo:0,n:0,right:0,bpm:72,ctx:{},again:[],missed:{},xp:0,top:0});
  $('modetag').textContent='Ears: Call & Response';
  hideOv(); document.body.classList.add('nohud','earsmode'); document.body.classList.remove('menu'); $('arcStage').hidden=false;
  $('staff').innerHTML=staffSVG([],[]); $('verdict').className='verdict'; $('verdict').textContent='Listen, then play it back.'; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
  ARC.timer=setTimeout(arcCall,600);
}
function arcStop(){ killBus(ARC.bus); ARC.bus=null; clearTimeout(ARC.timer); clearInterval(ARC.tick); }
const arcLevel=()=>arcRungs(ARC.world)[ARC.rung];
// The next call: a missed one that's come due (in a new key), or a fresh one from the current rung or any below it
function arcGen(){
  const R=ARC, due=R.again.findIndex(a=>a.at<=R.n);
  let lv=arcLevel(), force;
  if(due>=0){ const a=R.again.splice(due,1)[0]; lv=LEVELS[a.lv]; force={answer:a.answer}; }
  else if(R.rung&&Math.random()<0.3) lv=arcRungs(R.world)[Math.floor(Math.random()*R.rung)];   // older levels keep coming back
  const c=R.ctx[lv.id]||(R.ctx[lv.id]={}), q=GEN[lv.gen](lv.p,c,force);
  q.lv=lv; q.gen=lv.gen; q.review=!!force; return q;
}
function arcCall(){
  const R=ARC; if(!R.active||R.mode!=='run') return; arcStop(); clearDraft();
  if(R.lives<=0) return arcOver();
  const q=R.q=arcGen(); R.n++; R.got=[]; R.done=false; R.tried=false;
  const bus=R.bus=newBus(); if(!bus) return;
  const t0=now()+0.1, end=q.play(bus,t0), spb=60/R.bpm;
  const beats=q.gen==='prog'?Math.max(6,(q.roots||[]).length+3):q.gen==='chord'?6:4;
  R.open=end-0.15; R.close=end+beats*spb; R.beats=beats; R.spb=spb; R.callEnd=end;
  for(let k=0;k<beats;k++) drumHit('hat',end+k*spb,k===0?1:0.7,bus);   // the count-in you answer over
  arcRender();
  kbMarks={}; if(q.gen==='degree'){ for(const m in keyEls) if(mod12(+m-q.keyPc)===0) kbMarks[m]='k-root'; } paintKeys();   // the key's home notes, to find your way
  R.tick=setInterval(()=>{ const t=now(), bar=$('arcBar');
    if(bar) bar.style.width=t<R.callEnd?'100%':Math.max(0,100*(R.close-t)/(R.close-R.callEnd))+'%';
    const ph=$('arcPhase'); if(ph) ph.textContent=t<R.open?'Listen…':'Your turn';
    if(t>R.close&&!R.done) arcMiss(null); },60);
}
function arcRender(){
  const R=ARC, q=R.q, lv=q.lv, rungs=arcRungs(R.world);
  const key=q.gen==='degree'?q.sub.match(/Key of ([^.]+)/)?.[1]:q.gen==='prog'?q.reveal.text.match(/ in ([A-G][♭♯]? (?:major|minor))/)?.[1]:null;
  const root=q.gen==='chord'||q.gen==='inversion'?pcName(q.keyPc,false):null;
  $('arcBody').innerHTML=`<div class="etop"><span class="etitle">${WORLDS.find(w=>w.id===R.world).name}</span><span>Score <b>${R.score.toLocaleString()}</b></span><span>Combo <b>${R.combo}</b></span><span>♩ = ${R.bpm}</span><span class="lives">${[...Array(ARC_LIVES)].map((_,k)=>`<i${k<R.lives?'':' class="gone"'}></i>`).join('')}</span></div>
    <div class="arcladder">${rungs.map((l,i)=>`<i class="${i<R.rung?'done':i===R.rung?'cur':''}" title="${l.name}"></i>`).join('')}<span>${gigAccHTML(lv.name)}${q.review?' · back again':''}</span></div>
    <div class="arcask"><span id="arcPhase">Listen…</span><b>${ARC_ASK[q.gen]}</b>${key?`<em>Key of ${gigAccHTML(key)}</em>`:''}${root?`<em>Root ${gigAccHTML(root)}</em>`:''}${q.gen==='prog'?`<em>${q.roots.length} chords</em>`:''}</div>
    <div class="ebar arcbar"><i id="arcBar" style="width:100%"></i></div>
    <div class="arcprog" id="arcProg">${q.gen==='prog'?q.roots.map(()=>'<i></i>').join(''):''}</div>
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
function arcNotes(notes){
  const R=ARC; if(!R.active) return;
  if(R.mode==='over'){ if(notes.length>=3) arcStart(R.world); return; }   // any chord: go again
  if(R.mode!=='run'||R.done||now()<R.open) return;
  const q=R.q;
  if(q.gen==='prog'){ // one root at a time; each must be the next chord's bass note
    const i=R.got.length, want=q.roots[i];
    if(mod12(Math.min(...notes))!==want) return arcMiss('x');
    R.got.push(want); const dots=$('arcProg'); if(dots) dots.children[i].className='ok';
    if(R.got.length===q.roots.length) arcHit(); return;
  }
  const pick=arcRead(q,notes); if(pick===undefined) return;
  if(pick===q.answer) arcHit(); else arcMiss(pick);
}
function arcHit(){
  const R=ARC; R.done=true; clearInterval(R.tick);
  const left=Math.max(0,(R.close-now())/(R.close-R.callEnd)), mult=1+Math.min(2,R.combo*0.1), pts=Math.round((100+100*left)*mult);
  R.score+=pts; R.combo++; R.right++; R.rungOk++; R.xp+=3; R.bpm=Math.min(150,R.bpm+2);
  earRecord(R.q.item,true,null); if(R.q.keyPc!=null) keyRecord(R.q.keyPc,true,null);
  let up='';
  if(R.rungOk>=ARC_STEP){ R.rungOk=0;
    if(R.rung<arcRungs(R.world).length-1){ R.rung++; up=` Level up: ${arcLevel().name}.`; R.bpm=Math.max(72,R.bpm-8); }   // a breath when new answers join
    else R.top++; }
  $('arcMsg').textContent=`+${pts}${R.combo>2?` ×${mult.toFixed(1)}`:''}${left>0.6?' Quick!':''}${up}`; $('arcMsg').className='lmsg ok';
  $('verdict').className='verdict ok'; $('verdict').textContent=R.q.reveal.text;
  R.timer=setTimeout(arcCall,up?1300:500);
}
function arcMiss(pick){
  const R=ARC, q=R.q; R.done=true; clearInterval(R.tick);
  R.lives--; R.combo=0; R.missed[q.lv.id]=(R.missed[q.lv.id]||0)+1;
  earRecord(q.item,false,null); if(q.keyPc!=null) keyRecord(q.keyPc,false,null);
  R.again.push({lv:q.lv.id,answer:q.answer,at:R.n+3+Math.floor(Math.random()*3)});
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
  const R=ARC; arcStop(); clearDraft(); R.mode='over';
  const w=R.world, reach=R.rung+1+(R.top>0?1:0), prevBest=ARCDATA.best[w]||0;
  if(R.score>prevBest) ARCDATA.best[w]=R.score; if(reach>(ARCDATA.reach[w]||0)) ARCDATA.reach[w]=Math.min(reach,arcRungs(w).length+1);
  addXP(R.xp+Math.round(R.score/100)); saveArc(); saveEars();
  const weak=Object.entries(R.missed).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([id])=>LEVELS[id].name);
  $('arcBody').innerHTML=`<h2>${R.score>prevBest&&R.score?'New best':quit?'Run ended':'Out of lives'}</h2>
    <div class="results"><div><b>${R.score.toLocaleString()}</b>score</div><div><b>${R.right}</b>right</div><div><b>${gigAccHTML(arcLevel().name)}</b>reached</div><div><b>${Math.max(prevBest,R.score).toLocaleString()}</b>best</div></div>
    <div class="stars eresults" style="margin:0"><span class="stars">${starStr(arcStars(w))}</span></div>
    ${weak.length?`<p>Most misses: ${weak.map(gigAccHTML).join(', ')}. They came back during the run; they'll keep coming back.</p>`:''}
    <p class="arcagain"><b>Play any chord to go again.</b></p>
    <div class="erow"><button class="go" id="arcAgain">Again</button><button class="ghost" id="arcMenu">Back to Ears</button></div>`;
  $('arcAgain').onclick=()=>arcStart(w); $('arcMenu').onclick=arcToMenu;
  $('verdict').className='verdict'; $('verdict').textContent='Play any chord to go again.'; kbMarks={}; paintKeys();
}
function arcToMenu(){ arcStop(); ARC.active=false; clearDraft(); $('arcStage').hidden=true; document.body.classList.remove('earsmode');
  side='ears'; $('startOv').hidden=false; document.body.classList.add('menu'); kbMarks={}; paintKeys(); renderMenu(); }
function arcKey(e){
  if(!ARC.active) return false;
  if(e.key==='Escape'){ ARC.mode==='run'?arcOver(true):arcToMenu(); return true; }
  return false;
}
