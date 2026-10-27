/* Practice: your own practice routines, like a workout app. A routine is a list of blocks (a mode, maybe a stage, world,
   tab or lick pick, how many minutes, a note). Start runs it: each block opens its mode, a timer chip at the top keeps
   time wherever you go, a soft chime says when it's up, and the chip moves you to the next block. A finished session is
   logged with its minutes per mode and a note of your own; the page shows the week's minutes, a streak and the log.
   The timer runs on the clock, not on a page: it survives switching modes and reloading. */
let PLAN=store.get('plan',null);
const PLAN_MODES={hands:'Chords',voicings:'Voicings',lines:'Lines',ears:'Ears',reharm:'Reharm',gig:'Gig',free:'Your own'};
const planBlock=(mode,min,target='',note='')=>({mode,min,target,note});
if(!PLAN||!Array.isArray(PLAN.routines)) PLAN={routines:[
  {id:'r1',name:'Daily 45',blocks:[planBlock('hands',5,'','Warm-up: a stage you are working on'),planBlock('voicings',10,'','A few new shapes, or one song in Comp Hero'),
    planBlock('lines',10,'daily',"Today's practice: the weekly line and reviews"),planBlock('ears',8,'daily','The daily wave'),planBlock('gig',12,'','Play a tune with today’s voicings and line')]},
  {id:'r2',name:'Quick 10',blocks:[planBlock('lines',5,'daily'),planBlock('ears',5,'daily')]},
  {id:'r3',name:'Comping day',blocks:[planBlock('hands',10),planBlock('voicings',15,'dom'),planBlock('reharm',10),planBlock('gig',10,'','Comp the whole tune')]},
],log:[],run:null,edit:null};
const savePlan=()=>store.set('plan',PLAN);
// what a block can point at, per mode: [value, label]
function planTargets(mode){
  if(mode==='hands') return [['','Where you left off'],...STAGES.map(s=>[String(s.n),s.boss?`👹 ${s.t}`:s.chapter?`👑 ${s.t}`:`Stage ${s.n}: ${s.t}`]),...PROGS.map(p=>['p:'+p.id,p.short])];
  if(mode==='voicings') return [['','The page'],...VCHAPTERS.map(c=>[c.id,c.name]),['all','Every chapter']];
  if(mode==='lines') return [['','The page'],['daily',"Today's practice"],['week','Line of the week'],['rand1','🎲 Easy'],['rand2','🎲 Medium'],['rand3','🎲 Hard']];
  if(mode==='ears') return [['','The page'],['daily','Daily wave'],...ARC_WORLDS.map(w=>[w,arcWorld(w).name])];
  return [['','']];
}
const planTargetName=b=>{ const t=planTargets(b.mode).find(x=>x[0]===b.target); return t&&t[0]?t[1]:''; };
const planMins=r=>r.blocks.reduce((a,b)=>a+(+b.min||0),0);
const fmtClock=s=>`${Math.floor(Math.max(0,s)/60)}:${String(Math.floor(Math.max(0,s)%60)).padStart(2,'0')}`;

/* ---------------- running a routine ---------------- */
// seconds spent in the current block (the clock keeps going between modes; pausing holds it)
const planElapsed=()=>{ const r=PLAN.run; return !r?0:(r.held??(Date.now()-r.t0))/1000; };
const planRoutine=()=>PLAN.run&&PLAN.routines.find(x=>x.id===PLAN.run.rid);
function planStart(rid){ const r=PLAN.routines.find(x=>x.id===rid); if(!r||!r.blocks.length) return;
  PLAN.run={rid,i:0,t0:Date.now(),held:null,done:[],chimed:false}; savePlan(); planOpenBlock(); }
// take the current block's mode, at its stage, world, tab or pick
function planOpenBlock(){
  const r=planRoutine(), b=r&&r.blocks[PLAN.run.i]; planChip(); if(!b) return;
  if(!atHome()) goHome();
  const t=b.target;
  if(b.mode==='free'){ side='plan'; renderMenu(); return; }
  if(b.mode==='gig'){ gigOpen(); return; }
  if(b.mode==='hands'&&t){ stageN=t.startsWith('p:')?t:+t; store.set('stage',stageN); }
  if(b.mode==='voicings'&&t){ VCDATA.ch=t; VCDATA.fam='all'; }
  if(b.mode==='lines'){ LINES.over=null; if(t==='daily'||t==='week'){ lpStart(t); return; } if(t.startsWith('rand')){ linesRandom(+t.slice(4)); return; } }
  if(b.mode==='ears'&&t){ arcStart(t); return; }
  side=b.mode; renderMenu(); $('startOv').scrollTop=0;
}
function planNext(){
  const run=PLAN.run, r=planRoutine(); if(!run||!r) return;
  run.done.push({mode:r.blocks[run.i].mode,secs:Math.round(planElapsed())});
  run.i++; run.t0=Date.now(); run.held=null; run.chimed=false;
  if(run.i>=r.blocks.length) return planFinish();
  savePlan(); planOpenBlock();
}
function planPause(){ const r=PLAN.run; if(!r) return; if(r.held==null) r.held=Date.now()-r.t0; else { r.t0=Date.now()-r.held; r.held=null; } savePlan(); planChip(); if(side==='plan') renderPlanPane(); }
// the session goes into the log (blocks you finished, and the one you were in), and you're asked for a note
function planFinish(){
  const run=PLAN.run, r=planRoutine(); if(!run) return;
  if(r&&run.i<r.blocks.length&&planElapsed()>=30) run.done.push({mode:r.blocks[run.i].mode,secs:Math.round(planElapsed())});
  const secs=run.done.reduce((a,d)=>a+d.secs,0);
  if(secs>=60) PLAN.log.unshift({d:arcDay(),t:Date.now(),name:r?r.name:'Practice',blocks:run.done,note:''});
  PLAN.run=null; PLAN.fresh=secs>=60; savePlan(); planChip(); if(side==='home') renderHome();   // the home card drew before this file loaded
  if(!atHome()) goHome(); side='plan'; renderMenu(); $('startOv').scrollTop=0;
}
// the chip: the block and the time left, wherever you are; when it's up, a chime and "next"
let planTick=null;
function planChip(){
  const c=$('planChip'), run=PLAN.run, r=planRoutine();
  clearInterval(planTick); planTick=null;
  if(!run||!r){ c.hidden=true; return; }
  const b=r.blocks[run.i], left=b.min*60-planElapsed(), nx=r.blocks[run.i+1];
  if(left<=0&&!run.chimed){ run.chimed=true; savePlan(); planChime(); }
  c.hidden=false; c.classList.toggle('due',left<=0); c.classList.toggle('paused',run.held!=null);
  c.innerHTML=`<span class="pcw" data-pc="page" title="Open Practice">${run.i+1}/${r.blocks.length} ${PLAN_MODES[b.mode]}${planTargetName(b)?` · ${planTargetName(b)}`:''}</span>
    <b>${left>0?fmtClock(left):`+${fmtClock(-left)}`}</b>
    <button data-pc="pause" title="${run.held!=null?'Resume':'Pause'}">${run.held!=null?'▶':'⏸'}</button>
    <button data-pc="next" title="${nx?`Next: ${PLAN_MODES[nx.mode]}`:'Finish'}">${left<=0?(nx?`Next: ${PLAN_MODES[nx.mode]} ⏭`:'Finish ✓'):'⏭'}</button>`;
  if(run.held==null) planTick=setInterval(planChip,1000);
}
function planChime(){ synth.init(); const bus=newBus(); if(!bus) return; const t=now()+.05; tone(79,t,1.4,46,'mellow',bus); tone(84,t+.18,1.8,42,'mellow',bus); }
$('planChip').addEventListener('click',e=>{ const b=e.target.closest('[data-pc]'); if(!b) return;
  if(b.dataset.pc==='next') planNext(); else if(b.dataset.pc==='pause') planPause(); else { if(!atHome()) goHome(); side='plan'; renderMenu(); $('startOv').scrollTop=0; } });

/* ---------------- the page ---------------- */
function planWeek(){ const d=new Date(), day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); const from=arcDay(d), by={};
  PLAN.log.filter(s=>s.d>=from).forEach(s=>s.blocks.forEach(b=>by[b.mode]=(by[b.mode]||0)+b.secs/60)); return by; }
function planStreak(){ const days=new Set(PLAN.log.map(s=>s.d)); let n=0; const d=new Date(); if(!days.has(arcDay(d))) d.setDate(d.getDate()-1); while(days.has(arcDay(d))){ n++; d.setDate(d.getDate()-1); } return n; }
function renderPlanPane(){
  const run=PLAN.run, cur=planRoutine(), week=planWeek(), wk=Object.values(week).reduce((a,b)=>a+b,0), top=Math.max(1,...Object.values(week)), st=planStreak();
  const days=new Set(PLAN.log.map(s=>s.d));
  const cal=[...Array(14)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-13+i); const on=days.has(arcDay(d)); return `<i class="${on?'on':''}${i===13?' today':''}" title="${arcDay(d)}">${on?'✓':''}</i>`; }).join('');
  const chips=r=>r.blocks.map(b=>`<span class="pblk m-${b.mode}">${PLAN_MODES[b.mode]} ${b.min}′</span>`).join('');
  let h=`<button class="back" data-home>← All modes</button><h2>Practice</h2>
    <p>Your own routines. Start one and each block opens its mode; the timer at the top keeps time wherever you go and tells you when to move on.</p>`;
  if(run&&cur){ const b=cur.blocks[run.i], left=b.min*60-planElapsed();
    h+=`<div class="prun"><div class="sec">Now: ${gigAccHTML(cur.name)}, block ${run.i+1} of ${cur.blocks.length}</div>
      <div class="lt">${PLAN_MODES[b.mode]}${planTargetName(b)?` · ${gigAccHTML(planTargetName(b))}`:''} <b>${left>0?`${fmtClock(left)} left`:'time’s up'}</b></div>${b.note?`<p class="fine">${gigAccHTML(b.note)}</p>`:''}
      <div class="erow"><button class="go" data-pl="open">Go there</button><button class="ghost" data-pl="pause">${run.held!=null?'Resume':'Pause'}</button><button class="ghost" data-pl="next">${cur.blocks[run.i+1]?`Next: ${PLAN_MODES[cur.blocks[run.i+1].mode]}`:'Finish'}</button><button class="ghost" data-pl="end">End session</button></div></div>`; }
  if(PLAN.fresh&&PLAN.log[0]){ const s=PLAN.log[0];
    h+=`<div class="prun"><div class="sec">Done: ${gigAccHTML(s.name)}, ${Math.round(s.blocks.reduce((a,b)=>a+b.secs,0)/60)} minutes${st>1?` · 🔥 ${st}-day streak`:''}</div>
      <textarea id="plNote" rows="2" placeholder="A note for next time: what felt shaky, what clicked, what to do tomorrow">${gigAccHTML(s.note||'')}</textarea>
      <div class="erow"><button class="go" data-pl="savenote">Save note</button></div></div>`; }
  if(PLAN.edit) h+=planEditorHTML();
  else h+=`<div class="sec">Routines</div><div class="proutines">${PLAN.routines.map(r=>`<div class="proutine"><div class="lt">${gigAccHTML(r.name)} <span class="fine">${planMins(r)} min</span></div><div class="pblks">${chips(r)}</div>
      <div class="erow"><button class="go" data-pl="start" data-r="${r.id}"${run?' disabled':''}>Start</button><button class="ghost" data-pl="edit" data-r="${r.id}">Edit</button><button class="ghost" data-pl="copy" data-r="${r.id}">Copy</button></div></div>`).join('')}
      <button class="proutine pnew" data-pl="new">+ New routine</button></div>`;
  h+=`<div class="sec">This week: ${Math.round(wk)} minutes${st?` · 🔥 ${st}-day streak`:''}</div>
    <div class="pweek">${Object.keys(PLAN_MODES).filter(m=>week[m]).map(m=>`<div class="pbar"><span>${PLAN_MODES[m]}</span><i style="width:${Math.round(week[m]/top*100)}%"></i><b>${Math.round(week[m])}′</b></div>`).join('')||'<p class="fine">Nothing yet this week.</p>'}</div>
    <div class="arccal">${cal}</div>
    <div class="sec">Log</div>${PLAN.log.length?`<ul class="plog">${PLAN.log.slice(0,15).map((s,i)=>`<li><b>${s.d}</b> ${gigAccHTML(s.name)}, ${Math.round(s.blocks.reduce((a,b)=>a+b.secs,0)/60)} min <span class="fine">${[...new Set(s.blocks.map(b=>PLAN_MODES[b.mode]))].join(', ')}</span>${s.note?`<br><span class="pnote">${gigAccHTML(s.note)}</span>`:''} <button class="linkish" data-pl="delog" data-i="${i}" title="Remove from the log">×</button></li>`).join('')}</ul>`:'<p class="fine">Finished sessions show up here, with your notes.</p>'}`;
  $('planPane').innerHTML=h;
}
function planEditorHTML(){
  const e=PLAN.edit, opt=(list,cur)=>list.map(([v,t])=>`<option value="${v}"${v===cur?' selected':''}>${gigAccHTML(t)}</option>`).join('');
  return `<div class="sec">Edit routine</div><div class="pedit">
    <input id="peName" value="${gigAccHTML(e.name)}" placeholder="Name" maxlength="40">
    ${e.blocks.map((b,i)=>`<div class="perow" data-i="${i}"><select data-f="mode">${opt(Object.entries(PLAN_MODES),b.mode)}</select>
      ${b.mode==='free'||planTargets(b.mode).length<2?'<span></span>':`<select data-f="target">${opt(planTargets(b.mode),b.target)}</select>`}
      <label class="pemin"><input type="number" min="1" max="120" data-f="min" value="${b.min}"> min</label>
      <input data-f="note" value="${gigAccHTML(b.note||'')}" placeholder="${b.mode==='free'?'What to do (scales, a tune, sight-reading…)':'Note (optional)'}">
      <span class="pebtn"><button class="ghost" data-pe="up"${i?'':' disabled'}>↑</button><button class="ghost" data-pe="down"${i<e.blocks.length-1?'':' disabled'}>↓</button><button class="ghost" data-pe="del">×</button></span></div>`).join('')}
    <button class="ghost" data-pe="add">+ Add a block</button>
    <p class="fine">${planMins(e)} minutes in all.</p>
    <div class="erow"><button class="go" data-pe="save">Save</button><button class="ghost" data-pe="cancel">Cancel</button>${PLAN.routines.some(r=>r.id===e.id)?'<button class="ghost" data-pe="remove">Delete routine</button>':''}</div></div>`;
}
// keep what's typed in the editor before it redraws
function planReadEditor(){ const e=PLAN.edit; if(!e) return; const n=$('peName'); if(n) e.name=n.value;
  document.querySelectorAll('#planPane .perow').forEach(row=>{ const b=e.blocks[+row.dataset.i]; row.querySelectorAll('[data-f]').forEach(x=>{ const f=x.dataset.f; b[f]=f==='min'?Math.max(1,Math.min(120,+x.value||1)):x.value; }); }); }
$('planPane').addEventListener('change',e=>{ const f=e.target.dataset&&e.target.dataset.f; if(!PLAN.edit||!f) return; planReadEditor();
  if(f==='mode'){ const b=PLAN.edit.blocks[+e.target.closest('.perow').dataset.i]; b.target=''; } renderPlanPane(); });
$('planPane').addEventListener('click',e=>{
  const p=e.target.closest('[data-pl]'), q=e.target.closest('[data-pe]');
  if(p){ const a=p.dataset.pl, r=PLAN.routines.find(x=>x.id===p.dataset.r);
    if(a==='start') planStart(r.id);
    else if(a==='open') planOpenBlock();
    else if(a==='pause') planPause();
    else if(a==='next') planNext();
    else if(a==='end'){ if(confirm('End this session? The time so far is logged.')) planFinish(); return; }
    else if(a==='savenote'){ PLAN.log[0].note=$('plNote').value.trim(); PLAN.fresh=false; savePlan(); renderPlanPane(); }
    else if(a==='edit') { PLAN.edit=JSON.parse(JSON.stringify(r)); renderPlanPane(); }
    else if(a==='copy'){ PLAN.routines.push({...JSON.parse(JSON.stringify(r)),id:'r'+Date.now(),name:r.name+' (copy)'}); savePlan(); renderPlanPane(); }
    else if(a==='new'){ PLAN.edit={id:'r'+Date.now(),name:'My routine',blocks:[planBlock('hands',10)]}; renderPlanPane(); }
    else if(a==='delog'){ PLAN.log.splice(+p.dataset.i,1); savePlan(); renderPlanPane(); }
    return; }
  if(q){ planReadEditor(); const ed=PLAN.edit, a=q.dataset.pe, row=q.closest('.perow'), i=row?+row.dataset.i:-1;
    if(a==='add') ed.blocks.push(planBlock('lines',5));
    else if(a==='del') ed.blocks.splice(i,1);
    else if(a==='up'&&i>0) [ed.blocks[i-1],ed.blocks[i]]=[ed.blocks[i],ed.blocks[i-1]];
    else if(a==='down'&&i<ed.blocks.length-1) [ed.blocks[i+1],ed.blocks[i]]=[ed.blocks[i],ed.blocks[i+1]];
    else if(a==='save'){ if(!ed.blocks.length) return; ed.name=ed.name.trim()||'My routine'; const k=PLAN.routines.findIndex(r=>r.id===ed.id); if(k>=0) PLAN.routines[k]=ed; else PLAN.routines.push(ed); PLAN.edit=null; savePlan(); }
    else if(a==='cancel') PLAN.edit=null;
    else if(a==='remove'){ if(!confirm(`Delete “${ed.name}”?`)) return; PLAN.routines=PLAN.routines.filter(r=>r.id!==ed.id); PLAN.edit=null; savePlan(); }
    renderPlanPane(); }
});
planChip(); if(side==='home') renderHome();   // the home card drew before this file loaded
