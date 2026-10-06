/* Reharm: learn a move from its card, hear it before and after, then play it yourself in six keys.
   The app plays the progression around you and waits on the chord you're reharmonising. Plus an ear quiz. */
let RHDATA=store.get('reharm',{stars:{}});
const saveRh=()=>store.set('reharm',RHDATA);
const REHARM={active:false};
const RH_KEYS=5, RH_BAR=1.25; // keys after the first, seconds per chord in playback

/* ---------------- menu pane ---------------- */
const rhStarTotal=()=>REHARM_MOVES.reduce((a,m)=>a+(RHDATA.stars[m.id]||0),0);
function renderReharmPane(){
  const tier=(t,title)=>`<div class="sec" style="margin-top:12px">${title}</div><div class="licks">${REHARM_MOVES.filter(m=>m.tier===t).map(m=>
    `<button class="lick" data-move="${m.id}"><span class="ln">${rhChords(m.after,0,m.minor).map(c=>c.rn).join(' ')}</span><span class="lt">${m.name}</span><span class="lst"><b>${starStr(RHDATA.stars[m.id]||0)}</b></span><span class="rwhat">${m.what}</span></button>`).join('')}</div>`;
  $('reharmPane').innerHTML=`<button class="back" data-home>← All modes</button><h2>Reharm</h2>
    <p>Every chord type you've drilled has a job. Reharm teaches the jobs: swap or add chords so a progression pulls harder, slides smoother or changes colour, while still going where it was going. ${rhStarTotal()} of ${REHARM_MOVES.length*3} stars.</p>
    <div class="drill"><button class="ghost" id="rhEarBtn" style="margin-left:0">Ear quiz: name the move</button><span>Hear a progression plain, then reharmonised, and say what changed.</span></div>
    ${tier(1,'Everyday moves')}${tier(2,'Colour and motion')}${tier(3,'The modern sound')}
    <p class="fine" style="margin-top:12px">Moves marked exact want that exact chord type; the others take any chord of the right family (A7, A7♭9 and A13 all count as a dominant). ★ learn the move. ★★ four of five new keys right first time, no hints. ★★★ all five. Explanations follow the sources linked on each card.</p>`;
}
function bindReharmPane(){
  $('reharmPane').onclick=e=>{ const b=e.target.closest('button'); if(!b) return;
    if(b.dataset.move) rhOpen(b.dataset.move); else if(b.id==='rhEarBtn') rhEarStart(); };
}

/* ---------------- shared stage helpers ---------------- */
function rhShow(){ synth.init(); hideOv(); document.body.classList.add('nohud'); document.body.classList.remove('menu'); $('reharmStage').hidden=false; }
function rhPlay(voiced,from,to,t0,mel=null){ // play chords [from,to) of a voiced progression (plus a held melody note); returns the end time
  const bus=REHARM.bus||(REHARM.bus=newBus()); if(!bus) return t0;
  for(let i=from;i<to;i++){ const at=t0+(i-from)*RH_BAR; playChord(voiced[i].upper,at,RH_BAR*.95,'epiano',bus,70); tone(voiced[i].bass,at,RH_BAR*.95,82,'epiano',bus); if(mel!==null) tone(mel,at,RH_BAR*.95,96,'mellow',bus); }
  return t0+(to-from)*RH_BAR;
}
function rhStop(){ killBus(REHARM.bus); REHARM.bus=null; clearTimeout(REHARM.timer); }
const rhMel=(m,key)=>m.melody==null?null:76+mod12(key+m.melody-4); // the held melody note, around E5
const chordRow=(chords,hide=new Set(),solved=new Set(),cur=-1)=>`<div class="rhrow">${chords.map((c,i)=>
  `<div class="rhc${hide.has(i)&&!solved.has(i)?' slot':''}${solved.has(i)?' solved':''}${i===cur?' cur':''}"><b>${hide.has(i)&&!solved.has(i)?'?':symText(c)}</b><span>${hide.has(i)&&!solved.has(i)?'':c.rn}</span></div>`).join('')}</div>`;

/* ---------------- learn: the card ---------------- */
function rhOpen(id){
  rhStop(); const m=RHMOVE[id];
  Object.assign(REHARM,{active:true,mode:'card',move:m});
  const before=rhChords(m.before,0,m.minor), after=rhChords(m.after,0,m.minor), mel=rhMel(m,0);
  rhShow();
  $('rhBody').innerHTML=`<div class="etop"><span class="etitle">${m.name}</span><span>${m.tier===1?'Everyday move':'Colour and motion'}</span></div>
    <p class="rhwhat">${m.what}</p><p><b>Why it works.</b> ${m.why}</p><p><b>Where you hear it.</b> ${m.where}${m.src?` <a href="${m.src}" target="_blank" rel="noopener">Source</a>`:''}</p>
    <div class="sec">Before (in ${keyName(0,m.minor)})${mel!==null?`, melody note ${plainSpell(mel).name} held on top`:''}</div>${chordRow(before)}<div class="sec">After${m.alts?' (one of several right answers)':''}</div>${chordRow(after,new Set(),new Set(m.slots))}
    <div class="erow"><button class="ghost" id="rhB">Hear before</button><button class="ghost" id="rhA">Hear after</button><button class="go" id="rhGo">Play it yourself</button><button class="ghost" id="rhBack">Back</button></div>`;
  const vb=voiceProg(before), va=voiceProg(after);
  $('rhB').onclick=()=>{ rhStop(); rhPlay(vb,0,vb.length,now()+.08,mel); };
  $('rhA').onclick=()=>{ rhStop(); rhPlay(va,0,va.length,now()+.08,mel); };
  $('rhGo').onclick=()=>rhDrillStart(id); $('rhBack').onclick=rhToMenu;
  $('verdict').className='verdict'; $('verdict').textContent='Hear it before and after.'; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent=''; $('staff').innerHTML=staffSVG([],[]);
}

/* ---------------- drill: play the move in six keys ---------------- */
function rhDrillStart(id){
  rhStop(); const m=RHMOVE[id];
  const keys=[0]; while(keys.length<1+RH_KEYS){ const k=weightedPick([...Array(12).keys()].filter(x=>!keys.includes(x)).map(pc=>({pc,w:keyWeight(pc,'hands')}))).pc; keys.push(k); }
  Object.assign(REHARM,{active:true,mode:'drill',move:m,keys,round:0,results:[],clean:0,xp:0});
  rhShow(); rhRound();
}
function rhRound(){
  rhStop(); clearDraft(); const R=REHARM, m=R.move, key=R.keys[R.round];
  const after=rhChords(m.after,key,m.minor), before=rhChords(m.before,key,m.minor);
  Object.assign(R,{after,before,mel:rhMel(m,key),voiced:voiceProg(after),slotPos:0,solved:new Set(),mistakes:0,hinted:R.round===0,done:false});
  rhRender(); R.timer=setTimeout(rhPlayToSlot,350);
}
function rhRender(){
  const R=REHARM, m=R.move, learn=R.round===0, slot=m.slots[R.slotPos];
  $('rhBody').innerHTML=`<div class="etop"><span class="etitle">${m.name}</span><span>${learn?'Learn it, in C':`New key ${R.round} of ${RH_KEYS}`}</span></div>
    <p class="rhwhat">${R.done?'Done.':m.ask+(R.hinted&&slot!==undefined?`: play <b>${rhTargets(m,slot,R.keys[R.round]).slice(0,3).map(c=>symText(c)).join('</b> or <b>')}</b>`:'.')}</p>
    <div class="sec">Original in ${keyName(R.keys[R.round],m.minor)}${R.mel!==null?`, melody note ${plainSpell(R.mel).name} held on top`:''}</div>${chordRow(R.before)}
    <div class="sec">Reharmonised</div>${chordRow(R.after,new Set(m.slots),R.solved,R.done?-1:slot)}
    <div class="lmsg" id="rhMsg"></div>
    <div class="erow"><button class="ghost" id="rhHear">Hear it (R)</button>${!R.hinted&&!R.done?'<button class="ghost" id="rhHint">Show the chord</button>':''}${R.done?'<button class="go" id="rhNext">Next (Enter)</button>':''}<button class="ghost" id="rhEnd">End</button></div>`;
  $('rhHear').onclick=()=>rhPlayToSlot();
  if($('rhHint')) $('rhHint').onclick=()=>{ R.hinted=true; showHint(R.after[slot]); rhRender(); };
  if($('rhNext')) $('rhNext').onclick=rhNext;
  $('rhEnd').onclick=()=>R.results.length?rhFinish(true):rhToMenu();
}
// Play the progression up to the chord you're on, then wait for you
function rhPlayToSlot(){
  const R=REHARM; if(!R.active||R.mode!=='drill') return; rhStop();
  const slot=R.done?R.after.length:R.move.slots[R.slotPos];
  rhPlay(R.voiced,0,slot,now()+.08,R.mel);
  if(R.mel!==null&&!R.done){ const b=REHARM.bus||(REHARM.bus=newBus()); if(b) tone(R.mel,now()+.08+slot*RH_BAR,RH_BAR*2.5,90,'mellow',b); } // keep the melody note sounding over your chord
  $('verdict').className='verdict'; $('verdict').textContent=R.done?'':'Your chord.'; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
}
function rhNotes(notes){
  const R=REHARM; if(!R.active) return;
  if(R.mode!=='drill'){ showAnalysis(null,null,null,notes); return; } // free play: just name the chord
  if(R.done) return;
  const m=R.move, slot=m.slots[R.slotPos], want=R.after[slot];
  const hit=rhTargets(m,slot,R.keys[R.round]).flatMap(t=>rhAccepts(t.q,m.exact).map(q=>({t,q,ev:evaluate(notes,{root:t.root,q},opts)}))).find(x=>x.ev.ok);
  if(hit){
    showAnalysis(hit.ev,{root:hit.t.root,q:hit.q,rn:hit.t.rn},null);
    if(hit.t!==want){ R.after[slot]=hit.t; R.voiced=voiceProg(R.after); } // melody reharm: keep the chord you chose
    R.solved.add(slot); R.slotPos++;
    const next=R.move.slots[R.slotPos];
    rhStop(); const t=rhPlay(R.voiced,slot+1,next===undefined?R.after.length:next,now()+RH_BAR*.9,R.mel);
    if(next===undefined) return rhRoundDone(t);
    rhRender(); return;
  }
  R.mistakes++;
  const ev=evaluate(notes,want,opts);
  if(R.hinted&&!m.alts) showAnalysis(ev,want,null); // with several right answers, compare against none of them
  else { $('verdict').className='verdict no'; $('verdict').textContent='Not that one.'; $('chips').innerHTML=''; $('why').textContent=m.alts?`Hint: the held ${plainSpell(R.mel).name} should be the 9th, 11th or 13th of your chord, not a chord tone.`:R.mistakes>=2?`It's the ${want.rn} in ${keyName(R.keys[R.round],m.minor)}. Still stuck? Press Show the chord.`:`Hint: it's the ${want.rn} of this key.`; $('tags').textContent=''; kbMarks={}; paintKeys(); }
}
function rhRoundDone(endT){
  const R=REHARM, clean=R.mistakes===0&&(R.round===0||!R.hinted);
  R.done=true; R.results.push({key:R.keys[R.round],clean,mistakes:R.mistakes,hinted:R.round>0&&R.hinted});
  if(R.round>0&&clean) R.clean++; R.xp+=10+(clean?10:0);
  rhRender(); $('rhMsg').textContent=clean?'Clean.':`Done${R.mistakes?`, after ${R.mistakes} wrong tr${R.mistakes>1?'ies':'y'}`:''}.`; $('rhMsg').className='lmsg '+(clean?'ok':'');
  R.timer=setTimeout(rhNext,Math.max(800,(endT-now())*1000+500)); // hear it resolve, then the next key
}
function rhNext(){ const R=REHARM; if(!R.active||!R.done) return; R.round++; if(R.round>RH_KEYS) return rhFinish(false); rhRound(); }
function rhFinish(quit){ clearDraft();
  const R=REHARM; rhStop(); R.active=false;
  const learned=R.results.length>0, finished=R.round>RH_KEYS;
  const stars=!learned?0:finished&&R.clean===RH_KEYS?3:finished&&R.clean>=4?2:1;
  const prev=RHDATA.stars[R.move.id]||0; if(stars>prev) RHDATA.stars[R.move.id]=stars;
  addXP(R.xp); saveRh(); R.active=true; R.mode='results';
  $('rhBody').innerHTML=`<h2>${quit?'Session ended':stars===3?'Every key clean':'Move done'}</h2>${learned?`<div class="stars eresults" style="margin:0"><span class="stars">${starStr(Math.max(stars,prev))}</span></div>`:''}
    <ul class="lkeys">${R.results.map((r,i)=>`<li><b>${keyName(r.key,R.move.minor).replace(' major','')}</b> ${i===0?'learned':r.clean?'clean':r.hinted?'with the chord shown':`${r.mistakes} wrong tr${r.mistakes>1?'ies':'y'}`}</li>`).join('')}</ul>
    <p>+${R.xp} XP.${stars<3&&learned?` Next star: ${stars<2?'four of the five new keys clean.':'all five clean.'}`:''}</p>
    <div class="erow"><button class="go" id="rhAgain">Again</button><button class="ghost" id="rhCard">Back to the card</button><button class="ghost" id="rhMenu">All moves</button></div>`;
  $('rhAgain').onclick=()=>rhDrillStart(R.move.id); $('rhCard').onclick=()=>rhOpen(R.move.id); $('rhMenu').onclick=rhToMenu;
}

/* ---------------- ear quiz: hear before and after, name the move ---------------- */
function rhEarStart(){
  rhStop(); Object.assign(REHARM,{active:true,mode:'ear',n:0,total:10,right:0,xp:0,deck:shuffled(REHARM_MOVES.map(m=>m.id))});
  rhShow(); rhEarNext();
}
function rhEarNext(){
  const R=REHARM; rhStop(); clearDraft();
  if(R.n>=R.total) return rhEarFinish();
  if(!R.deck.length) R.deck=shuffled(REHARM_MOVES.map(m=>m.id));
  const m=RHMOVE[R.deck.pop()], key=pickKeyPc();
  const opts4=shuffled([m.id,...shuffled(REHARM_MOVES.filter(x=>x.id!==m.id)).slice(0,3).map(x=>x.id)]);
  Object.assign(R,{q:m,key,opts4,answered:false,mel:rhMel(m,key),before:rhChords(m.before,key,m.minor),after:rhChords(m.after,key,m.minor)}); R.n++;
  R.vb=voiceProg(R.before); R.va=voiceProg(R.after);
  $('rhBody').innerHTML=`<div class="etop"><span class="etitle">Name the move</span><span>${R.n} of ${R.total}</span></div>
    <p class="rhwhat">First the plain progression, then the reharm. What changed?</p>
    <div class="eopts" id="rhOpts">${opts4.map((id,i)=>`<button class="eopt" data-id="${id}"><span class="k">${i+1}</span>${RHMOVE[id].name}</button>`).join('')}</div>
    <div class="lmsg" id="rhMsg"></div><div id="rhReveal"></div>
    <div class="erow"><button class="ghost" id="rhHear">Hear both (R)</button><button class="go" id="rhNext" hidden>Next (Enter)</button><button class="ghost" id="rhEnd">End</button></div>`;
  $('rhOpts').onclick=e=>{ const b=e.target.closest('.eopt'); if(b) rhEarAnswer(b.dataset.id); };
  $('rhHear').onclick=rhEarPlay; $('rhNext').onclick=rhEarNext; $('rhEnd').onclick=rhEarFinish;
  R.timer=setTimeout(rhEarPlay,300);
}
function rhEarPlay(){ const R=REHARM; rhStop(); const t=rhPlay(R.vb,0,R.vb.length,now()+.08,R.mel); rhPlay(R.va,0,R.va.length,t+.7,R.mel); }
function rhEarAnswer(id){
  const R=REHARM; if(R.answered) return; R.answered=true;
  const ok=id===R.q.id; if(ok){ R.right++; R.xp+=10; }
  document.querySelectorAll('#rhOpts .eopt').forEach(b=>{ b.disabled=true; if(b.dataset.id===R.q.id) b.classList.add('right'); else if(b.dataset.id===id) b.classList.add('wrong'); });
  $('rhMsg').textContent=ok?`${R.q.name}. Yes.`:`It was ${R.q.name}.`; $('rhMsg').className='lmsg '+(ok?'ok':'no');
  $('rhReveal').innerHTML=`<div class="sec">Before</div>${chordRow(R.before)}<div class="sec">After</div>${chordRow(R.after,new Set(),new Set(R.q.slots))}`;
  if(ok) R.timer=setTimeout(rhEarNext,1400); else $('rhNext').hidden=false;
}
function rhEarFinish(){
  const R=REHARM; rhStop(); addXP(R.xp); R.mode='results';
  $('rhBody').innerHTML=`<h2>Ear quiz done</h2><div class="results"><div><b>${R.right}</b>of ${R.n} right</div><div><b>+${R.xp}</b>XP</div></div>
    <div class="erow"><button class="go" id="rhAgain">Again</button><button class="ghost" id="rhMenu">All moves</button></div>`;
  $('rhAgain').onclick=rhEarStart; $('rhMenu').onclick=rhToMenu;
}

function rhToMenu(){ clearDraft();
  rhStop(); REHARM.active=false; $('reharmStage').hidden=true;
  side='reharm'; $('startOv').hidden=false; document.body.classList.add('menu'); kbMarks={}; paintKeys(); renderMenu();
}
function rhKey(e){
  const R=REHARM; if(!R.active) return false;
  if(e.key==='Escape'){ R.mode==='drill'&&R.results.length?rhFinish(true):rhToMenu(); return true; }
  if(e.key==='r'||e.key==='R'){ if(R.mode==='drill') rhPlayToSlot(); else if(R.mode==='ear') rhEarPlay(); return true; }
  if(R.mode==='ear'&&/^[1-4]$/.test(e.key)&&!R.answered){ rhEarAnswer(R.opts4[+e.key-1]); return true; }
  if((e.key==='Enter'||e.key===' ')&&(R.mode==='drill'&&R.done||R.mode==='ear'&&R.answered)){ e.preventDefault(); R.mode==='drill'?rhNext():rhEarNext(); return true; }
  return false;
}
