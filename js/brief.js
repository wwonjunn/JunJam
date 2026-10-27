/* Chords briefing. Double-click a stage, progression or boss card: a short card says what's coming (the chord types,
   the tempo and lives, your stars and what the next one needs), with Start, and links to the same chords in the other
   modes: their named voicings in Voicings, the matching level of the Ears game, and the Lines licks over them
   (with four of them by name, to start straight away).
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
  if(typeof id==='string'){ // the progressions level holding the most of them (a boss: its progressions; every one: the last level)
    const pb=PBOSS.find(b=>'p:'+b.id===id), rs=arcRungs('progs'), want=pb?PROGS.slice(pb.from,pb.to).map(p=>p.id):PROG[id.slice(2)]?[id.slice(2)]:null;
    if(!want) return {world:'progs',rung:rs.length-1};
    let bi=rs.length-1, bs=0; rs.forEach((l,i)=>{ if(l.boss||!l.p.set) return; const n=want.filter(x=>l.p.set.includes(x)).length; if(n>bs){ bs=n; bi=i; } }); return {world:'progs',rung:bi}; }
  const rs=arcRungs('chords');
  if(qids.some(q=>Q[q]&&Q[q].bass!=null)&&!qids.some(q=>Q[q]&&Q[q].stage<6)) return {world:'chords',rung:Math.max(0,rs.findIndex(l=>l.gen==='inversion'))};   // slash chords: hearing the bass note
  let best=0, score=-1;
  rs.forEach((l,i)=>{ if(l.gen!=='chord'||l.boss) return; const s=l.p.set.filter(x=>qids.includes(x)).length/l.p.set.length; if(s>score){ score=s; best=i; } });
  return {world:'chords',rung:best};
}
// Four licks to try right away. For a progression, the ones that follow its own chord moves come first (the Royal Road
// line for the Royal Road); then ones that sit only on these chords, crossing as many as they can; not yet starred and
// easiest first; taken in turn from the originals, the famous solos and the runs, one per player.
const briefFam=q=>{ const f=LCHORDS.find(c=>c[2]&&c[2].includes(q)); return !f?q:f[0]==='altd'?'dom':f[0]; };   // an altered V7 still counts as a V7
function briefMoves(l,progs){
  if(!l.ch||l.ch.length<2) return 0;
  const lk=l.ch.map(c=>[mod12(c[1]-l.ch[0][1]),briefFam(c[2])]); let best=0;   // its moves, counted from its own first chord
  progs.forEach(p=>{ const pc=progChords(p,0).map(c=>[c.root.pc,briefFam(c.q.id)]), n=pc.length;
    for(let o=0;o<n;o++){ let k=0; while(k<lk.length&&k<n&&mod12(pc[(o+k)%n][0]-pc[o][0])===lk[k][0]&&pc[(o+k)%n][1]===lk[k][1]) k++; if(k===lk.length) best=Math.max(best,k+(o===0?.5:0)); } });   // a match from the progression's first chord counts a little more
  return best;
}
function briefLicks(id,qids,licks){
  const pb=typeof id==='string'&&PBOSS.find(b=>'p:'+b.id===id), progs=typeof id!=='string'?[]:pb?PROGS.slice(pb.from,pb.to):PROG[id.slice(2)]?[PROG[id.slice(2)]]:PROGS;
  const own=l=>l.ch?l.ch.map(c=>c[2]):[l.over], only=l=>own(l).every(q=>qids.includes(q)), span=l=>new Set(own(l)).size;
  const m=new Map(licks.map(l=>[l.id,briefMoves(l,progs)]));
  const ranked=[...licks].sort((a,b)=>m.get(b.id)-m.get(a.id)||only(b)-only(a)||span(b)-span(a)||!!LDATA.stars[a.id]-!!LDATA.stars[b.id]||a.diff-b.diff||a.name.localeCompare(b.name));
  const who=l=>l.artist||lickFrom(l)+l.style, out=ranked.filter(l=>m.get(l.id)>0).slice(0,2), seen=new Set(out.map(who));
  const groups=['orig','solo','runs','user'].map(g=>ranked.filter(l=>lickFrom(l)===g&&!out.includes(l)));
  for(let i=0;out.length<4&&groups.some(g=>g.length);i=(i+1)%groups.length){ const g=groups[i]; while(g.length){ const l=g.shift(), k=who(l); if(!seen.has(k)){ seen.add(k); out.push(l); break; } } }
  return out;
}
function briefOpen(id){
  stageN=id; store.set('stage',stageN); renderMenu(); BRIEF.id=id;
  const qids=briefQids(id), sym=q=>symText({root:defaultRoot(0,Q[q].minor),q:Q[q]});
  const t=tierOf(tierId), st=starsOf(id), fire=fireLevel(id), open=mode==='practice'||tierUnlocked(t);
  const vs=VOICINGS.filter(v=>qids.includes(v.qid)), vtypes=VTYPES.filter(q=>qids.includes(q)), ears=briefEars(id,qids), el=arcRungs(ears.world)[ears.rung];
  const licks=allLicks().filter(l=>lickIsOver(l,qids));
  const pick=briefLicks(id,qids,licks);
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
      <button class="ghost" data-brief="ears">👂 Hear them: Ears game, ${arcWorld(ears.world).name}, from “${gigAccHTML(el.name)}”</button>
      ${licks.length?`<button class="ghost" data-brief="lines">🎷 Lines: all ${licks.length} lick${licks.length>1?'s':''} over these chords</button>`:''}
      ${pick.length?`<div class="brieflicks">${pick.map(l=>`<button class="chip" data-brief="lick:${l.id}" title="${(lickLabel(l)+', over '+lickOver(l)).replace(/"/g,'&quot;')}">${gigAccHTML(l.name)} <i>${LDIFF[l.diff]}</i></button>`).join('')}</div>`:''}
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
  if(where.startsWith('lick:')){ linesStart(where.slice(5)); return; }
  if(where==='lines'){ LINES.over=qids; LINES.q=''; LINES.show=0; LDATA.diff=0; LDATA.from='all'; LDATA.artist=''; LDATA.chord=''; side='lines'; renderMenu(); $('startOv').scrollTop=0; return; }
  // Voicings, on the chapter tab that holds these chords (All if they span chapters), scrolled to the first of them
  const chs=VCHAPTERS.filter(c=>vcChapterTypes(c.id).some(q=>qids.includes(q)));
  VCDATA.fam='all'; VCDATA.ch=chs.length===1?chs[0].id:'all'; side='voicings'; renderMenu();
  const first=VTYPES.find(q=>qids.includes(q)), el=first&&document.querySelector(`.vctype[data-qid="${first}"]`);
  if(el){ el.scrollIntoView({block:'start'}); qids.forEach(q=>{ const x=document.querySelector(`.vctype[data-qid="${q}"]`); if(x){ x.classList.remove('flash'); void x.offsetWidth; x.classList.add('flash'); setTimeout(()=>x.classList.remove('flash'),1700); } }); }   // the highlight goes once it has faded
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
