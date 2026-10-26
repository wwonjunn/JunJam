/* Chords briefing. Double-click a stage, progression or boss card: a short card says what's coming (the chord types,
   the tempo and lives, your stars and what the next one needs), with Start, and links to the same chords in the other
   modes: their named voicings in Voicings, the matching level of the Ears game, and the Lines licks over them.
   So each stage leads somewhere, instead of you having to know where to go next. */
const BRIEF={id:null,last:{id:null,t:0}};
// the chord types a stage or progression stage uses
function briefQids(id){
  if(typeof id==='number') return [...new Set(stagePool(id).map(q=>q.id))];
  const pb=PBOSS.find(b=>'p:'+b.id===id), list=id==='p:mix'||id==='p:final'?PROGS:pb?PROGS.slice(pb.from,pb.to):[PROG[id.slice(2)]];
  const q=new Set(list.flatMap(p=>progChords(p,0).map(c=>c.q.id))); if(id==='p:final') QUALS.forEach(x=>q.add(x.id));
  return [...q];
}
const briefTitle=id=>typeof id==='number'?STAGE[id].t:id==='p:mix'?'Chapter boss: every progression':id==='p:final'?'Final boss: everything':PBOSS.find(b=>'p:'+b.id===id)?`Boss: ${PROGS.slice(PBOSS.find(b=>'p:'+b.id===id).from,PBOSS.find(b=>'p:'+b.id===id).to).map(p=>p.short).join(', ')}`:PROG[id.slice(2)].name;
// the Ears game level that hears the most of these: Progressions for a progression, Chord qualities for chords
function briefEars(id,qids){
  if(typeof id==='string'){ const pb=PBOSS.find(b=>'p:'+b.id===id), rs=arcRungs('progs'), want=pb?PROGS[pb.from].id:id.slice(2), i=rs.findIndex(l=>l.p.set&&l.p.set.includes(want)); return {world:'progs',rung:Math.max(0,i<0?rs.length-1:i)}; }
  const rs=arcRungs('chords'); let best=0, score=-1;
  rs.forEach((l,i)=>{ if(l.gen!=='chord'||l.boss) return; const s=l.p.set.filter(x=>qids.includes(x)).length/l.p.set.length; if(s>score){ score=s; best=i; } });
  return {world:'chords',rung:best};
}
function briefOpen(id){
  stageN=id; store.set('stage',stageN); renderMenu(); BRIEF.id=id;
  const qids=briefQids(id), sym=q=>symText({root:defaultRoot(0,Q[q].minor),q:Q[q]});
  const t=tierOf(tierId), st=starsOf(id), fire=fireLevel(id), open=mode==='practice'||tierUnlocked(t);
  const vs=VOICINGS.filter(v=>qids.includes(v.qid)), vtypes=VTYPES.filter(q=>qids.includes(q)), ears=briefEars(id,qids), el=arcRungs(ears.world)[ears.rung];
  const licks=allLicks().filter(l=>lickIsOver(l,qids));
  const P=typeof id==='string'&&PROG[id.slice(2)], pb=typeof id==='string'&&PBOSS.find(b=>'p:'+b.id===id);
  // a progression: its chords in C with their degrees; a progression boss: the four it mixes; chords: the types
  const chords=P?progChords(P,0).map(c=>`<span>${gigAccHTML(symText(c))}<em>${gigAccHTML(c.rn)}</em></span>`).join('')
    :pb?PROGS.slice(pb.from,pb.to).map(p=>`<span>${p.short}</span>`).join('')
    :id==='p:mix'?`<span>All ${PROGS.length} progressions</span>`:id==='p:final'?`<span>All ${PROGS.length} progressions</span><span>and every chord type</span>`
    :qids.length>16?`<span>All ${qids.length} chord types</span>`:qids.map(q=>`<span>${gigAccHTML(sym(q))}</span>`).join('');
  $('briefCard').innerHTML=`<div class="etop"><span class="etitle">${gigAccHTML(briefTitle(id))}</span><span>${starStr(st,STAR_MAX)}${devilOf(id)?' '+'💀'.repeat(devilOf(id)):''}</span></div>
    <div class="sec">What's coming</div><div class="briefchords">${chords}</div>
    <p>${mode==='practice'?'Practice: no clock, take your time.':`${t.name}, ♩ = ${t.bpm}, ${t.lives} ${t.lives===1?'life':'lives'}${t.devil?'. Every chord on fire, no hints':''}.`}${fire&&mode==='game'?` 🔥 chords will ask for the ${['','3rd','3rd or 5th','3rd, 5th or 7th'][fire]} in the bass.`:''} 💚 life chords now and then.</p>
    <p class="fine">${st<STAR_MAX?`Next star: ${STAR_GOALS[st]}`:'Every star. 😈 Devil is open for this one in the tempo list.'}</p>
    <div class="sec">The same chords elsewhere</div>
    <div class="brieflinks">
      ${vs.length?`<button class="ghost" data-brief="voicings">🎹 Voicings: ${vs.length} named voicings for ${vtypes.length>4?'these chords':vtypes.map(sym).map(gigAccHTML).join(', ')}</button>`:''}
      <button class="ghost" data-brief="ears">👂 Hear them: Ears game, ${arcWorld(ears.world).name}, from "${gigAccHTML(el.name)}"</button>
      ${licks.length?`<button class="ghost" data-brief="lines">🎷 Lines: ${licks.length} lick${licks.length>1?'s':''} over these chords</button>`:''}
    </div>
    <div class="erow"><button class="go" id="briefGo"${open?'':' disabled'}>${open?`Start${mode==='game'?` at ♩ = ${t.bpm}`:''} (Enter)`:'Locked at this tempo'}</button><button class="ghost" id="briefBack">Back (Esc)</button></div>`;
  $('briefOv').hidden=false;
  $('briefGo').onclick=()=>{ $('briefOv').hidden=true; start(); };
  $('briefBack').onclick=briefClose;
  $('briefCard').querySelectorAll('[data-brief]').forEach(b=>b.onclick=()=>briefGo(b.dataset.brief,qids,ears));
}
function briefClose(){ $('briefOv').hidden=true; BRIEF.id=null; }
function briefGo(where,qids,ears){
  briefClose();
  if(where==='ears'){ arcStart(ears.world,ears.rung); return; }
  if(where==='lines'){ LINES.over=qids; LDATA.diff=0; LDATA.from='all'; LDATA.artist=''; side='lines'; renderMenu(); $('startOv').scrollTop=0; return; }
  VCDATA.fam='all'; side='voicings'; renderMenu();   // Voicings, scrolled to the first of these chord types
  const first=VTYPES.find(q=>qids.includes(q)), el=first&&document.querySelector(`.vctype[data-qid="${first}"]`);
  if(el){ el.scrollIntoView({block:'start'}); qids.forEach(q=>{ const x=document.querySelector(`.vctype[data-qid="${q}"]`); if(x){ x.classList.remove('flash'); void x.offsetWidth; x.classList.add('flash'); } }); }
}
// two clicks on the same card within 450 ms: the briefing (the first click has already selected it)
function briefClicks(box,attr,parse){
  box.addEventListener('click',e=>{ const b=e.target.closest('.stage'); if(!b||b.getAttribute('aria-disabled')==='true') return;
    const id=parse(b.dataset[attr]), t=performance.now(), L=BRIEF.last;
    if(L.id===id&&t-L.t<450){ BRIEF.last={id:null,t:0}; setTimeout(()=>briefOpen(id),0); } else BRIEF.last={id,t}; },true);
}
briefClicks($('stages'),'n',v=>+v); briefClicks($('progs'),'p',v=>v);
document.addEventListener('keydown',e=>{ if($('briefOv').hidden) return;
  if(e.key==='Escape'){ briefClose(); e.stopImmediatePropagation(); e.preventDefault(); }
  else if(e.key==='Enter'){ const g=$('briefGo'); if(g&&!g.disabled) g.click(); e.stopImmediatePropagation(); e.preventDefault(); } },true);
