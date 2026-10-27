/* Practice: your own practice routines, built like a workout app (Hevy, Strong). Three tabs:
   My routines: your list; tap one for its blocks, then Start, Edit, Copy or Delete. The editor works on block cards
     (drag to reorder, − and + for the minutes, a note each) and an Add-blocks picker with search and multi-select.
   Explore: ready-made routines, each with the reason for its order. Start one as it is, or add it to yours.
   History: the week's minutes per mode, a streak, a 14-day calendar and every session with its note.
   A running session keeps its own copy of the routine. Each block opens its mode; a timer chip keeps time wherever you
   go (pause, skip; it runs on the clock, so it survives a reload), chimes when time's up and takes you to the next block. */
let PLAN=store.get('plan',null);
const PLAN_MODES={hands:'Chords',voicings:'Voicings',lines:'Lines',ears:'Ears',reharm:'Reharm',gig:'Gig',free:'Your own'};
const PLAN_ICON={hands:'🎹',voicings:'🖐️',lines:'🎷',ears:'👂',reharm:'🔀',gig:'🎤',free:'✏️'};
const planBlock=(mode,min,target='',note='')=>({mode,min,target,note});
if(!PLAN||!Array.isArray(PLAN.routines)) PLAN={routines:[],log:[],run:null};
PLAN.tab=PLAN.tab||'mine'; PLAN.edit=null; PLAN.pick=null;
const savePlan=()=>{ const {edit,pick,...keep}=PLAN; store.set('plan',keep); };

/* ---------------- the order every built-in routine follows ----------------
   1. Warm up on something you already know: hands and reading get going, low stakes.
   2. New material next, while you're freshest: learning a new voicing or line is the hardest work, so never last.
   3. Then recall: spaced review and from-memory drills soon after learning are what make it stick; mixing skills
      beats long blocks of one.
   4. Ears as the change of pace: it needs attention but not your hands, so it sits between hands-heavy blocks.
   5. Apply it last: real music with what you drilled turns drills into playing, and ending on something fun brings
      you back tomorrow.
   6. Blocks of 5 to 15 minutes: switch before autopilot. */
const PLAN_RULES=['Warm up on something you know','New material while you’re fresh','Then recall it: review and from memory','Ears as the change of pace','Apply it in real music, last','5 to 15 minutes a block'];
const B=planBlock;
const PLAN_EXPLORE=[
  {group:'Everyday',items:[
    {id:'x_d30',name:'Daily 30',why:'The whole loop in half an hour: warm up, learn one new chord, review lines, ears, then play a tune.',blocks:[B('hands',5,'next','Warm-up: the step you’re on, a slow tempo is fine'),B('voicings',8,'next','New: the next chord on the Voicings path'),B('lines',7,'daily','Recall: the weekly line and the reviews that are due'),B('ears',5,'daily','Change of pace: the daily wave'),B('gig',5,'','Apply: one tune, with today’s voicing in it')]},
    {id:'x_d45',name:'Daily 45',why:'The same loop with room to breathe: longer on the new chord and on the tune at the end.',blocks:[B('hands',5,'next','Warm-up'),B('voicings',10,'next','New chord, then Rush it if time’s left'),B('lines',10,'daily','Recall'),B('ears',8,'daily','Change of pace'),B('gig',12,'','Apply: comp it, then solo with the weekly line')]},
    {id:'x_d60',name:'Deep work 60',why:'An hour, with harmony too: new comping and a new line early, Reharm once your ears are warm, a long tune to end.',blocks:[B('hands',8,'next','Warm-up'),B('voicings',12,'next','New chord'),B('lines',10,'week','New keys of the weekly line'),B('ears',8,'daily','Change of pace'),B('reharm',10,'','One move, then hear it in the ear quiz'),B('gig',12,'','Apply: reharm one bar of the tune')]},
  ]},
  {group:'Short',items:[
    {id:'x_q10',name:'Quick 10',why:'For busy days: the two things that fade fastest when you skip, spaced review and ears.',blocks:[B('lines',5,'daily','The reviews that are due today'),B('ears',5,'daily','The daily wave keeps the streak')]},
    {id:'x_q15',name:'Quick 15',why:'Nothing new, just keeping it all warm: chords, lines, ears.',blocks:[B('hands',5,'next','Chords at a tempo you can win'),B('lines',5,'daily','Reviews'),B('ears',5,'daily','Daily wave')]},
    {id:'x_q20',name:'One new thing, 20',why:'Short but still moving forward: one new chord, then straight into using it.',blocks:[B('hands',4,'next','Warm-up'),B('voicings',8,'next','New chord'),B('voicings',4,'rush','Recall it under the clock'),B('gig',4,'','Find it in a tune')]},
  ]},
  {group:'Focus days',items:[
    {id:'x_comp',name:'Comping day 45',why:'Learn a voicing, recall it under pressure, see what Reharm can do with it, then comp a whole song.',blocks:[B('hands',5,'next','Warm-up'),B('voicings',12,'next','New chord'),B('voicings',6,'rush','Recall: Rush'),B('reharm',10,'','A move that uses it'),B('voicings',12,'comp','Apply: Comp Hero, a whole song')]},
    {id:'x_solo',name:'Soloing day 45',why:'The progression first so the changes are in your hands, then the weekly line in new keys, reviews, melodic ear work, and a solo.',blocks:[B('hands',5,'p:iiVI','Warm-up on the ii–V–I'),B('lines',10,'week','New keys of the weekly line'),B('lines',8,'daily','Reviews'),B('ears',7,'melody','Hear lines: melodies'),B('gig',15,'','Apply: solo over a tune with the line in it')]},
    {id:'x_ears',name:'Ear day 30',why:'From single notes up to whole progressions: each world builds on the one before.',blocks:[B('ears',6,'degrees','Notes in the key'),B('ears',6,'intervals','Two notes'),B('ears',6,'melody','Whole melodies'),B('ears',6,'chords','Chord qualities'),B('ears',6,'progs','Progressions')]},
    {id:'x_harm',name:'Harmony day 40',why:'Chords in the hands, a reharm move in the head, the same move by ear, then on a tune.',blocks:[B('hands',8,'next','Warm-up'),B('reharm',12,'','A new move'),B('ears',8,'progs','Hear progressions'),B('gig',12,'','Apply: reharm the tune')]},
  ]},
  {group:'Special',items:[
    {id:'x_lesson',name:'Lesson prep 30',why:'Your teacher’s work first, while you’re freshest; then quick recall, then the lesson tune.',blocks:[B('free',10,'','What your teacher assigned'),B('lines',7,'daily','Reviews'),B('voicings',6,'rush','Rush'),B('gig',7,'','Play the lesson tune')]},
    {id:'x_gig',name:'Before a gig 25',why:'No new material the day of a gig: warm, confident, the set run top to bottom.',blocks:[B('hands',5,'next','Easy warm-up'),B('voicings',10,'comp','Comp Hero on the set’s songs'),B('gig',10,'','Run the tunes, no stopping')]},
    {id:'x_90',name:'Weekend 90',why:'The long session: everything in the usual order, two Lines blocks, and a long stretch on real tunes at the end.',blocks:[B('hands',10,'next','Warm-up'),B('voicings',15,'next','New chord'),B('lines',10,'week','Weekly line, new keys'),B('lines',10,'daily','Reviews'),B('ears',10,'daily','Change of pace'),B('reharm',10,'','A move'),B('gig',25,'','Tunes: learn a new one or polish one')]},
  ]},
];
const planExplore=id=>PLAN_EXPLORE.flatMap(g=>g.items).find(x=>x.id===id);
const planCopyOf=(r,name)=>({id:'r'+Date.now()+Math.floor(Math.random()*1000),name:name||r.name,why:r.why||'',blocks:JSON.parse(JSON.stringify(r.blocks))});
// what a block can point at, per mode: [value, label]
function planTargets(mode){
  if(mode==='hands') return [['next','Next step on your path'],['','Where you left off'],...STAGES.map(s=>[String(s.n),s.boss?`👹 ${s.t}`:s.chapter?`👑 ${s.t}`:`Stage ${s.n}: ${s.t}`]),...PROGS.map(p=>['p:'+p.id,p.short])];
  if(mode==='voicings') return [['next','Next chord on the path'],['rush','Rush (chords you’ve learned)'],['comp','Comp Hero'],['','The page'],...VCHAPTERS.map((c,i)=>[c.id,`Chapter ${i+1}: ${c.name}`])];
  if(mode==='lines') return [['daily',"Today's practice"],['week','Line of the week'],['rand1','🎲 Easy'],['rand2','🎲 Medium'],['rand3','🎲 Hard'],['','The page']];
  if(mode==='ears') return [['daily','Daily wave'],['next','Next world on the path'],...ARC_PATH.map(w=>[w,arcWorld(w).name]),['','The page']];
  return [['','']];
}
const PLAN_MODE_BLURB={hands:'Chords against the clock',voicings:'Two-hand voicings, Rush, Comp Hero',lines:'Licks in all 12 keys',ears:'The ear game',reharm:'Substitutions and why they work',gig:'Lead sheets to play from',free:'Anything outside the app: scales, a tune, sight-reading'};
const planTargetName=b=>{ const t=planTargets(b.mode).find(x=>x[0]===b.target); return t&&t[0]?t[1]:''; };
const planMins=r=>r.blocks.reduce((a,b)=>a+(+b.min||0),0);
const fmtClock=s=>`${Math.floor(Math.max(0,s)/60)}:${String(Math.floor(Math.max(0,s)%60)).padStart(2,'0')}`;
const planModesLine=r=>[...new Set(r.blocks.map(b=>PLAN_ICON[b.mode]))].join(' ');

/* ---------------- running a routine ---------------- */
// seconds spent in the current block (the clock keeps going between modes; pausing holds it)
const planElapsed=()=>{ const r=PLAN.run; return !r?0:(r.held??(Date.now()-r.t0))/1000; };
const planRoutine=()=>PLAN.run&&(PLAN.run.r||PLAN.routines.find(x=>x.id===PLAN.run.rid));
function planStart(r){ if(!r||!r.blocks.length) return; PLAN.run={rid:r.id,r:JSON.parse(JSON.stringify(r)),i:0,t0:Date.now(),held:null,done:[],chimed:false}; PLAN.tab='mine'; PLAN.view=null; savePlan(); planOpenBlock(); }
// take the current block's mode, at its stage, world, tab or pick
function planOpenBlock(){
  const r=planRoutine(), b=r&&r.blocks[PLAN.run.i]; planChip(); if(!b) return;
  if(!atHome()) goHome();
  const t=b.target;
  if(b.mode==='free'){ side='plan'; renderMenu(); return; }
  if(b.mode==='gig'){ gigOpen(); return; }
  if(b.mode==='hands'&&t){ const id=t==='next'?nextUp():t; if(id){ stageN=/^\d+$/.test(id)?+id:id; store.set('stage',stageN); } }
  if(b.mode==='voicings'&&t){ if(t==='next'){ vcTypeOpen(vcNextType()); return; } if(t==='rush'){ VCDATA.pool='learned'; vcRushStart(); return; } if(t==='comp'){ side='voicings'; renderMenu(); const c=document.querySelector('#voicingsPane .chcard'); if(c) c.scrollIntoView({block:'center'}); return; } (VCDATA.open=VCDATA.open||{})[t]=true; side='voicings'; renderMenu(); const el=document.querySelector(`#voicingsPane [data-vchap="${t}"]`); if(el) el.scrollIntoView({block:'start'}); return; }
  if(b.mode==='lines'){ LINES.over=null; if(t==='daily'||t==='week'){ lpStart(t); return; } if(t.startsWith('rand')){ linesRandom(+t.slice(4)); return; } }
  if(b.mode==='ears'&&t){ arcStart(t==='next'?earsNextWorld():t); return; }
  side=b.mode; renderMenu(); $('startOv').scrollTop=0;
}
function planNext(){
  const run=PLAN.run, r=planRoutine(); if(!run||!r) return;
  run.done.push({mode:r.blocks[run.i].mode,secs:Math.round(planElapsed()),i:run.i});
  run.i++; run.t0=Date.now(); run.held=null; run.chimed=false;
  if(run.i>=r.blocks.length) return planFinish();
  savePlan(); planOpenBlock();
}
function planPause(){ const r=PLAN.run; if(!r) return; if(r.held==null) r.held=Date.now()-r.t0; else { r.t0=Date.now()-r.held; r.held=null; } savePlan(); planChip(); if(side==='plan') renderPlanPane(); }
// the session goes into the log (blocks you finished, and the one you were in), and you're asked for a note
function planFinish(){
  const run=PLAN.run, r=planRoutine(); if(!run) return;
  if(r&&run.i<r.blocks.length&&planElapsed()>=30) run.done.push({mode:r.blocks[run.i].mode,secs:Math.round(planElapsed()),i:run.i});
  const secs=run.done.reduce((a,d)=>a+d.secs,0);
  if(secs>=60) PLAN.log.unshift({d:arcDay(),t:Date.now(),name:r?r.name:'Practice',blocks:run.done.map(({mode,secs})=>({mode,secs})),note:'',planned:r?planMins(r):0});
  PLAN.run=null; PLAN.fresh=secs>=60; savePlan(); planChip();
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
  c.innerHTML=`<span class="pcw" data-pc="page" title="Open Practice">${PLAN_ICON[b.mode]} ${run.i+1}/${r.blocks.length} ${PLAN_MODES[b.mode]}${planTargetName(b)?` · ${planTargetName(b)}`:''}</span>
    <b>${left>0?fmtClock(left):`+${fmtClock(-left)}`}</b>
    <button data-pc="pause" title="${run.held!=null?'Resume':'Pause'}">${run.held!=null?'▶':'⏸'}</button>
    <button data-pc="next" title="${nx?`Next: ${PLAN_MODES[nx.mode]}`:'Finish'}">${left<=0?(nx?`Next: ${PLAN_MODES[nx.mode]} ⏭`:'Finish ✓'):'⏭'}</button>`;
  if(run.held==null) planTick=setInterval(()=>{ planChip(); if(side==='plan'&&!$('startOv').hidden&&!PLAN.edit) planRunTick(); },1000);
}
function planChime(){ synth.init(); const bus=newBus(); if(!bus) return; const t=now()+.05; tone(79,t,1.4,46,'mellow',bus); tone(84,t+.18,1.8,42,'mellow',bus); }
$('planChip').addEventListener('click',e=>{ const b=e.target.closest('[data-pc]'); if(!b) return;
  if(b.dataset.pc==='next') planNext(); else if(b.dataset.pc==='pause') planPause(); else { if(!atHome()) goHome(); side='plan'; renderMenu(); $('startOv').scrollTop=0; } });

/* ---------------- the page ---------------- */
function planWeek(){ const d=new Date(), day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); const from=arcDay(d), by={};
  PLAN.log.filter(s=>s.d>=from).forEach(s=>s.blocks.forEach(b=>by[b.mode]=(by[b.mode]||0)+b.secs/60)); return by; }
function planStreak(){ const days=new Set(PLAN.log.map(s=>s.d)); let n=0; const d=new Date(); if(!days.has(arcDay(d))) d.setDate(d.getDate()-1); while(days.has(arcDay(d))){ n++; d.setDate(d.getDate()-1); } return n; }
const planBlockLine=b=>`<span class="pbi">${PLAN_ICON[b.mode]}</span><span class="pbt"><b>${PLAN_MODES[b.mode]}</b>${planTargetName(b)?` · ${gigAccHTML(planTargetName(b))}`:''}${b.note?`<em>${gigAccHTML(b.note)}</em>`:''}</span><span class="pbm">${b.min} min</span>`;
// the running session: a checklist, the current block with its clock
function planRunHTML(){
  const run=PLAN.run, r=planRoutine(); if(!run||!r) return '';
  const left=r.blocks[run.i].min*60-planElapsed();
  return `<div class="prun"><div class="prunh"><b>${gigAccHTML(r.name)}</b><span>block ${run.i+1} of ${r.blocks.length}</span><span class="prclock" id="plClock">${left>0?`${fmtClock(left)} left`:`${fmtClock(-left)} over`}</span></div>
    <ol class="pchk">${r.blocks.map((b,i)=>{ const d=run.done.find(x=>x.i===i); return `<li class="${d?'done':i===run.i?'now':''}">${d?'<i>✓</i>':`<i>${i+1}</i>`}${planBlockLine(b)}${d?`<span class="pbm">${Math.round(d.secs/60)} min</span>`:''}</li>`; }).join('')}</ol>
    <div class="erow"><button class="go" data-pl="open">Go there</button><button class="ghost" data-pl="pause">${run.held!=null?'Resume':'Pause'}</button><button class="ghost" data-pl="next">${r.blocks[run.i+1]?`Next: ${PLAN_MODES[r.blocks[run.i+1].mode]}`:'Finish'}</button><button class="ghost" data-pl="end">End session</button></div></div>`;
}
function planRunTick(){ const el=$('plClock'), run=PLAN.run, r=planRoutine(); if(!el||!run||!r) return; const left=r.blocks[run.i].min*60-planElapsed(); el.textContent=left>0?`${fmtClock(left)} left`:`${fmtClock(-left)} over`; }
function planRoutineCard(r,kind){
  return `<div class="proutine" data-open="${kind}:${r.id}" tabindex="0" role="button"><div class="prh"><b>${gigAccHTML(r.name)}</b><span>${planMins(r)} min</span></div>
    <div class="prm">${planModesLine(r)} <span>${r.blocks.length} block${r.blocks.length>1?'s':''}</span></div>${r.why?`<p class="fine">${gigAccHTML(r.why)}</p>`:''}</div>`;
}
function renderPlanPane(){
  if(PLAN.edit) return renderPlanEditor();
  const tab=PLAN.tab, st=planStreak();
  let h=`<button class="back" data-home>← All modes</button><h2>Practice</h2>${planRunHTML()}`;
  if(PLAN.fresh&&PLAN.log[0]){ const s=PLAN.log[0];
    h+=`<div class="prun pdone"><div class="prunh"><b>Done: ${gigAccHTML(s.name)}</b><span>${Math.round(s.blocks.reduce((a,b)=>a+b.secs,0)/60)} minutes${st>1?` · 🔥 ${st}-day streak`:''}</span></div>
      <textarea id="plNote" rows="2" placeholder="A note for next time: what felt shaky, what clicked, what to do tomorrow">${gigAccHTML(s.note||'')}</textarea>
      <div class="erow"><button class="go" data-pl="savenote">Save note</button><button class="ghost" data-pl="skipnote">Skip</button></div></div>`; }
  h+=`<div class="ptabs" role="tablist">${[['mine','My routines'],['explore','Explore'],['history','History']].map(([k,n])=>`<button role="tab" data-ptab="${k}" aria-selected="${tab===k}">${n}</button>`).join('')}</div>`;
  if(PLAN.view) h+=planDetailHTML();
  else if(tab==='mine') h+=PLAN.routines.length?`<div class="proutines">${PLAN.routines.map(r=>planRoutineCard(r,'mine')).join('')}<button class="proutine pnew" data-pl="new">+ New routine</button></div>`
      :`<div class="pempty"><p>No routines yet. Pick one in <b>Explore</b> to start from, or build your own.</p><div class="erow"><button class="go" data-ptab="explore">Explore routines</button><button class="ghost" data-pl="new">+ New routine</button></div></div>`;
  else if(tab==='explore') h+=`<p class="fine" style="margin:0 0 4px">Every routine here is built in the same order:</p><ol class="prules">${PLAN_RULES.map(x=>`<li>${x}</li>`).join('')}</ol>
      ${PLAN_EXPLORE.map(g=>`<div class="sec">${g.group}</div><div class="proutines">${g.items.map(r=>planRoutineCard(r,'x')).join('')}</div>`).join('')}`;
  else h+=planHistoryHTML();
  $('planPane').innerHTML=h;
}
function planDetailHTML(){
  const [kind,id]=PLAN.view.split(':'), r=kind==='x'?planExplore(id):PLAN.routines.find(x=>x.id===id); if(!r){ PLAN.view=null; return ''; }
  return `<div class="pdetail"><button class="back" data-pl="close">← ${kind==='x'?'Explore':'My routines'}</button>
    <div class="prh big"><b>${gigAccHTML(r.name)}</b><span>${planMins(r)} min · ${r.blocks.length} blocks</span></div>${r.why?`<p>${gigAccHTML(r.why)}</p>`:''}
    <ol class="pchk">${r.blocks.map((b,i)=>`<li><i>${i+1}</i>${planBlockLine(b)}</li>`).join('')}</ol>
    <div class="erow"><button class="go" data-pl="start"${PLAN.run?' disabled title="A session is already running"':''}>Start</button>${kind==='x'?'<button class="ghost" data-pl="adopt">Add to my routines</button>':'<button class="ghost" data-pl="edit">Edit</button><button class="ghost" data-pl="copy">Copy</button><button class="ghost" data-pl="del">Delete</button>'}</div></div>`;
}
function planHistoryHTML(){
  const week=planWeek(), wk=Object.values(week).reduce((a,b)=>a+b,0), top=Math.max(1,...Object.values(week)), st=planStreak(), days=new Set(PLAN.log.map(s=>s.d));
  const cal=[...Array(14)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-13+i); const on=days.has(arcDay(d)); return `<i class="${on?'on':''}${i===13?' today':''}" title="${arcDay(d)}">${on?'✓':''}</i>`; }).join('');
  return `<div class="sec">This week: ${Math.round(wk)} minutes${st?` · 🔥 ${st}-day streak`:''}</div>
    <div class="pweek">${Object.keys(PLAN_MODES).filter(m=>week[m]).map(m=>`<div class="pbar"><span>${PLAN_ICON[m]} ${PLAN_MODES[m]}</span><i style="width:${Math.round(week[m]/top*100)}%"></i><b>${Math.round(week[m])}′</b></div>`).join('')||'<p class="fine">Nothing yet this week.</p>'}</div>
    <div class="arccal">${cal}</div>
    <div class="sec">Sessions</div>${PLAN.log.length?`<ul class="plog">${PLAN.log.slice(0,30).map((s,i)=>`<li><b>${s.d}</b> ${gigAccHTML(s.name)}, ${Math.round(s.blocks.reduce((a,b)=>a+b.secs,0)/60)} min${s.planned?` of ${s.planned}`:''} <span class="fine">${[...new Set(s.blocks.map(b=>PLAN_ICON[b.mode]))].join(' ')}</span>${s.note?`<br><span class="pnote">${gigAccHTML(s.note)}</span>`:''} <button class="linkish" data-pl="delog" data-i="${i}" title="Remove from the log">×</button></li>`).join('')}</ul>`:'<p class="fine">Finished sessions show up here, with your notes.</p>'}`;
}

/* ---------------- the editor: block cards, steppers, drag to reorder, the Add-blocks picker ---------------- */
function renderPlanEditor(){
  const e=PLAN.edit, opt=(list,cur)=>list.map(([v,t])=>`<option value="${v}"${v===cur?' selected':''}>${gigAccHTML(t)}</option>`).join('');
  let h=`<div class="pedhead"><button class="ghost" data-pe="cancel">Cancel</button><b>${PLAN.routines.some(r=>r.id===e.id)?'Edit routine':'New routine'}</b><button class="go" data-pe="save"${e.blocks.length?'':' disabled'}>Save</button></div>
    <input id="peName" value="${gigAccHTML(e.name)}" placeholder="Routine name" maxlength="40">
    <p class="fine">${planMins(e)} minutes · ${e.blocks.length} block${e.blocks.length===1?'':'s'}. Drag a card by ≡ to move it.</p>
    <div class="pecards">${e.blocks.map((b,i)=>`<div class="pecard" data-i="${i}" draggable="true">
      <span class="pegrip" title="Drag to move">≡</span>
      <div class="pebody"><div class="petop"><span class="pbi">${PLAN_ICON[b.mode]}</span><b>${PLAN_MODES[b.mode]}</b>
        ${planTargets(b.mode).length>1?`<select data-f="target" aria-label="What in ${PLAN_MODES[b.mode]}">${opt(planTargets(b.mode),b.target)}</select>`:''}</div>
        <input data-f="note" value="${gigAccHTML(b.note||'')}" placeholder="${b.mode==='free'?'What to do: scales, a tune, sight-reading…':'Note (why this block, what to focus on)'}"></div>
      <div class="pestep"><button class="ghost" data-pe="minus" aria-label="One minute less">−</button><span><b>${b.min}</b> min</span><button class="ghost" data-pe="plus" aria-label="One minute more">+</button></div>
      <div class="pemore"><button class="ghost" data-pe="up"${i?'':' disabled'} aria-label="Move up">↑</button><button class="ghost" data-pe="down"${i<e.blocks.length-1?'':' disabled'} aria-label="Move down">↓</button><button class="ghost" data-pe="dup" title="Duplicate">⧉</button><button class="ghost" data-pe="del" title="Remove">×</button></div></div>`).join('')}</div>
    ${PLAN.pick?planPickerHTML():'<button class="ghost padd" data-pe="pick">+ Add blocks</button>'}
    ${PLAN.routines.some(r=>r.id===e.id)?'<p style="margin-top:16px"><button class="linkish pdanger" data-pe="remove">Delete this routine</button></p>':''}`;
  $('planPane').innerHTML=h;
}
// every block you can add: a mode and what in it, with what it's for
function planChoices(){ return Object.keys(PLAN_MODES).flatMap(m=>planTargets(m).map(([t,label])=>({mode:m,target:t,label:label||PLAN_MODE_BLURB[m]}))); }
function planPickerHTML(){
  const P=PLAN.pick, q=(P.q||'').toLowerCase(), list=planChoices().filter(c=>(!P.mode||c.mode===P.mode)&&(!q||(PLAN_MODES[c.mode]+' '+c.label).toLowerCase().includes(q)));
  return `<div class="ppick"><div class="ppickh"><b>Add blocks</b><input id="ppSearch" type="search" placeholder="Search: rush, ii–V, melodies…" value="${gigAccHTML(P.q||'')}"><button class="ghost" data-pe="pickclose">Close</button></div>
    <div class="chipsrow">${[['','All'],...Object.entries(PLAN_MODES)].map(([k,n])=>`<button class="chip" data-pm="${k}" aria-pressed="${(P.mode||'')===k}">${k?PLAN_ICON[k]+' ':''}${n}</button>`).join('')}</div>
    <div class="ppl" id="ppList">${planPickListHTML(list)}</div>
    <div class="erow"><button class="go" data-pe="pickadd"${P.sel.length?'':' disabled'}>Add ${P.sel.length||''} block${P.sel.length===1?'':'s'}</button></div></div>`;
}
const planPickKey=c=>c.mode+'|'+c.target;
function planPickListHTML(list){ const sel=PLAN.pick.sel; return list.map(c=>{ const k=planPickKey(c), n=sel.filter(x=>x===k).length;
  return `<button class="ppitem${n?' on':''}" data-pk="${k}"><span class="pbi">${PLAN_ICON[c.mode]}</span><span><b>${PLAN_MODES[c.mode]}</b> ${gigAccHTML(c.label)}</span>${n?`<i>${n>1?'×'+n:'✓'}</i>`:''}</button>`; }).join('')||'<p class="fine">Nothing matches.</p>'; }
// keep what's typed in the editor before it redraws
function planReadEditor(){ const e=PLAN.edit; if(!e) return; const n=$('peName'); if(n) e.name=n.value;
  document.querySelectorAll('#planPane .pecard').forEach(card=>{ const b=e.blocks[+card.dataset.i]; card.querySelectorAll('[data-f]').forEach(x=>b[x.dataset.f]=x.value); }); }
const PLAN_DEFAULT_MIN={hands:5,voicings:10,lines:8,ears:6,reharm:10,gig:10,free:10};

$('planPane').addEventListener('change',e=>{ if(!PLAN.edit||!e.target.dataset.f) return; planReadEditor(); renderPlanPane(); });
$('planPane').addEventListener('input',e=>{ if(e.target.id==='ppSearch'){ PLAN.pick.q=e.target.value; const P=PLAN.pick, q=P.q.toLowerCase(); $('ppList').innerHTML=planPickListHTML(planChoices().filter(c=>(!P.mode||c.mode===P.mode)&&(!q||(PLAN_MODES[c.mode]+' '+c.label).toLowerCase().includes(q)))); } });
$('planPane').addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&e.target.matches('.proutine[data-open]')){ e.preventDefault(); e.target.click(); } });
$('planPane').addEventListener('click',e=>{
  const t=e.target, tabB=t.closest('[data-ptab]'), card=t.closest('.proutine[data-open]'), p=t.closest('[data-pl]'), q=t.closest('[data-pe]'), pm=t.closest('[data-pm]'), pk=t.closest('[data-pk]');
  if(tabB){ PLAN.tab=tabB.dataset.ptab; PLAN.view=null; savePlan(); renderPlanPane(); return; }
  if(card&&!p){ PLAN.view=card.dataset.open; renderPlanPane(); $('startOv').scrollTop=0; return; }
  if(p){ const a=p.dataset.pl, [kind,id]=(PLAN.view||':').split(':'), r=kind==='x'?planExplore(id):PLAN.routines.find(x=>x.id===id);
    if(a==='start') planStart(r);
    else if(a==='close') PLAN.view=null;
    else if(a==='adopt'){ const c=planCopyOf(r); PLAN.routines.push(c); PLAN.tab='mine'; PLAN.view='mine:'+c.id; savePlan(); }
    else if(a==='edit'){ PLAN.edit=JSON.parse(JSON.stringify(r)); }
    else if(a==='copy'){ const c=planCopyOf(r,r.name+' (copy)'); PLAN.routines.push(c); PLAN.view='mine:'+c.id; savePlan(); }
    else if(a==='del'){ if(!confirm(`Delete “${r.name}”?`)) return; PLAN.routines=PLAN.routines.filter(x=>x.id!==r.id); PLAN.view=null; savePlan(); }
    else if(a==='new'){ PLAN.edit={id:'r'+Date.now(),name:'My routine',blocks:[]}; PLAN.pick={sel:[],q:'',mode:''}; }
    else if(a==='open') { planOpenBlock(); return; }
    else if(a==='pause') { planPause(); return; }
    else if(a==='next') { planNext(); return; }
    else if(a==='end'){ if(confirm('End this session? The time so far is logged.')) planFinish(); return; }
    else if(a==='savenote'){ PLAN.log[0].note=$('plNote').value.trim(); PLAN.fresh=false; savePlan(); }
    else if(a==='skipnote'){ PLAN.fresh=false; savePlan(); }
    else if(a==='delog'){ PLAN.log.splice(+p.dataset.i,1); savePlan(); }
    if(a!=='start') renderPlanPane(); return; }
  if(pm){ PLAN.pick.mode=pm.dataset.pm; renderPlanPane(); return; }
  if(pk){ PLAN.pick.sel.push(pk.dataset.pk); planReadEditor(); renderPlanPane(); return; }   // tap again to add it twice
  if(q){ planReadEditor(); const ed=PLAN.edit, a=q.dataset.pe, card=q.closest('.pecard'), i=card?+card.dataset.i:-1, b=ed.blocks[i];
    if(a==='minus') b.min=Math.max(1,b.min-1);
    else if(a==='plus') b.min=Math.min(120,b.min+1);
    else if(a==='up'&&i>0) [ed.blocks[i-1],ed.blocks[i]]=[ed.blocks[i],ed.blocks[i-1]];
    else if(a==='down'&&i<ed.blocks.length-1) [ed.blocks[i+1],ed.blocks[i]]=[ed.blocks[i],ed.blocks[i+1]];
    else if(a==='dup') ed.blocks.splice(i+1,0,{...b});
    else if(a==='del') ed.blocks.splice(i,1);
    else if(a==='pick') PLAN.pick={sel:[],q:'',mode:''};
    else if(a==='pickclose') PLAN.pick=null;
    else if(a==='pickadd'){ PLAN.pick.sel.forEach(k=>{ const [m,tg]=k.split('|'); ed.blocks.push(planBlock(m,PLAN_DEFAULT_MIN[m],tg)); }); PLAN.pick=null; }
    else if(a==='save'){ if(!ed.blocks.length) return; ed.name=ed.name.trim()||'My routine'; const k=PLAN.routines.findIndex(r=>r.id===ed.id); if(k>=0) PLAN.routines[k]=ed; else PLAN.routines.push(ed); PLAN.edit=null; PLAN.pick=null; PLAN.tab='mine'; PLAN.view='mine:'+ed.id; savePlan(); }
    else if(a==='cancel'){ PLAN.edit=null; PLAN.pick=null; }
    else if(a==='remove'){ if(!confirm(`Delete “${ed.name}”?`)) return; PLAN.routines=PLAN.routines.filter(r=>r.id!==ed.id); PLAN.edit=null; PLAN.pick=null; PLAN.view=null; savePlan(); }
    renderPlanPane(); }
});
// drag a block card to a new place (the ↑ ↓ buttons do the same without a mouse)
let planDrag=null;
$('planPane').addEventListener('dragstart',e=>{ const c=e.target.closest&&e.target.closest('.pecard'); if(!c) return; planReadEditor(); planDrag=+c.dataset.i; c.classList.add('dragging'); e.dataTransfer.effectAllowed='move'; e.dataTransfer.setData('text/plain',String(planDrag)); });
$('planPane').addEventListener('dragover',e=>{ const c=e.target.closest&&e.target.closest('.pecard'); if(planDrag==null||!c) return; e.preventDefault();
  document.querySelectorAll('#planPane .pecard').forEach(x=>x.classList.remove('dropabove','dropbelow')); const r=c.getBoundingClientRect(); c.classList.add(e.clientY<r.top+r.height/2?'dropabove':'dropbelow'); });
$('planPane').addEventListener('drop',e=>{ const c=e.target.closest&&e.target.closest('.pecard'); if(planDrag==null||!c) return; e.preventDefault();
  const r=c.getBoundingClientRect(), bl=PLAN.edit.blocks, from=planDrag; let to=+c.dataset.i+(e.clientY<r.top+r.height/2?0:1); const [m]=bl.splice(from,1); if(to>from) to--; bl.splice(to,0,m); planDrag=null; renderPlanPane(); });
$('planPane').addEventListener('dragend',()=>{ planDrag=null; document.querySelectorAll('#planPane .pecard').forEach(x=>x.classList.remove('dragging','dropabove','dropbelow')); });
planChip(); if(side==='home') renderHome();   // the home card drew before this file loaded
