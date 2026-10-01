/* Lines: learn a lick in one key, then move it to five more. The drill is transfer, not memorising.
   Grading follows the notes in order, in any octave; rhythm is free for now. */
let LDATA=store.get('lines',{stars:{},user:[],tempo:100,diff:0});
if(LDATA.feel!=='swing'&&LDATA.feel!=='straight') LDATA.feel='swing'; // playback feel for every lick, the player's choice
if(!['all','solo','orig','user'].includes(LDATA.from)) LDATA.from='all'; LDATA.artist=LDATA.artist||'';
const saveLines=()=>store.set('lines',LDATA);
const allLicks=()=>[...LICKS,...SOLO_LICKS,...LDATA.user];
const lickFrom=l=>l.user?'user':l.style==='Solo'?'solo':'orig';
const lickLabel=l=>l.user?'Yours':l.artist||'Original';
const lickById=id=>allLicks().find(l=>l.id===id);
const LINES={active:false,rec:null};
const TRANSFER_KEYS=5;

/* ---------------- menu pane ---------------- */
function linesStarTotal(){ return allLicks().reduce((a,l)=>a+(LDATA.stars[l.id]||0),0); }
function renderLinesPane(){
  const list=allLicks().filter(l=>(!LDATA.diff||l.diff===LDATA.diff)&&(LDATA.from==='all'||lickFrom(l)===LDATA.from)&&(!LDATA.artist||l.artist===LDATA.artist))
    .sort((a,b)=>a.diff-b.diff||lickLabel(a).localeCompare(lickLabel(b))||a.name.localeCompare(b.name));
  const artists=[...new Set(allLicks().map(l=>l.artist).filter(Boolean))].sort();
  const seg=(items,cur,attr)=>`<div class="seg" role="group">${items.map(([v,t])=>`<button data-${attr}="${v}" aria-pressed="${v===cur}">${t}</button>`).join('')}</div>`;
  let h=`<button class="back" data-home>← All modes</button><h2>Lines</h2>
    <p>Short licks you can drop anywhere. Learn one in a key, then play it in five more without looking. ${linesStarTotal()} of ${allLicks().length*3} stars.</p>
    ${seg([[0,'All'],[1,'Easy'],[2,'Medium'],[3,'Hard']],LDATA.diff,'diff')} ${seg([[70,'Slow'],[100,'Medium'],[130,'Fast']],LDATA.tempo,'tempo')} ${seg([['straight','Straight'],['swing','Swing']],LDATA.feel,'feel')}
    <div class="chipsrow">${[['all','All'],['solo','From famous solos'],['orig','Originals'],['user','Yours']].map(([v,t])=>`<button class="chip" data-from="${v}" aria-pressed="${v===LDATA.from}">${t}</button>`).join('')}
      <select id="lArtist" aria-label="Artist"><option value="">Any player</option>${artists.map(a=>`<option${a===LDATA.artist?' selected':''}>${a}</option>`).join('')}</select></div>
    <p class="fine" style="margin:-4px 0 10px">${list.length} licks</p>
    <div class="licks">${list.map(l=>`<button class="lick" data-lick="${l.id}"><span class="ln">${LDIFF[l.diff]} · ${lickLabel(l)}</span><span class="lt">${l.name}</span><span class="lst"><b>${starStr(LDATA.stars[l.id]||0)}</b> ${l.notes.length} notes, over ${lickOver(l)}</span>${l.user?`<span class="del" data-del="${l.id}" title="Delete this lick">×</span>`:''}</button>`).join('')||'<p class="fine">Nothing here yet.</p>'}</div>
    <p class="fine" style="margin-top:12px">★ learn it. ★★ four of the five new keys clean (no mistakes, no peeking). ★★★ all five clean. Licks from famous solos are short phrases from the <a href="https://jazzomat.hfm-weimar.de/" target="_blank" rel="noopener">Weimar Jazz Database</a> (Jazzomat Research Project, HfM Weimar), used under the <a href="https://opendatacommons.org/licenses/odbl/1.0/" target="_blank" rel="noopener">ODbL</a>. A few others follow formulas documented by teachers; the rest are Jun Jam originals.</p>
    ${importHTML()}`;
  $('linesPane').innerHTML=h;
}
function importHTML(){
  const roots=[...Array(12).keys()].map(pc=>`<option value="${pc}">${rootName(defaultRoot(pc,false))}</option>`).join('');
  const quals=['maj7','dom7','min7','hdim','maj','min','alt'].map(id=>`<option value="${id}">${Q[id].suf||'major'}</option>`).join('');
  const r=LINES.rec;
  return `<details class="import"${r?' open':''}><summary>Add your own lick</summary>
    <p class="fine">Pick the chord it goes over, press Record, play it (a few notes to about a bar is ideal), then Save. Rhythm is taken from how you played it.</p>
    <div class="irow"><input id="iName" placeholder="Name" maxlength="40" value="${r?r.name:''}">
      <select id="iRoot">${roots}</select><select id="iQual">${quals}</select>
      <select id="iDiff"><option value="1">Easy</option><option value="2">Medium</option><option value="3">Hard</option></select></div>
    <div class="irow">${r?`<span class="recdot"></span><span id="iCount">${r.notes.length} notes</span><button class="go" id="iSave">Save</button><button class="ghost" id="iCancel">Cancel</button>`:'<button class="go" id="iRec">Record</button>'}</div>
    <p class="fine" id="iMsg"></p></details>`;
}
function bindLinesPane(){
  const p=$('linesPane');
  p.onchange=e=>{ if(e.target.id==='lArtist'){ LDATA.artist=e.target.value; if(LDATA.artist&&LDATA.from!=='all'&&LDATA.from!=='solo'&&LDATA.from!=='orig') LDATA.from='all'; saveLines(); renderLinesPane(); } };
  p.onclick=e=>{
    const b=e.target.closest('button,[data-del]'); if(!b) return;
    if(b.dataset.del){ e.stopPropagation(); if(confirm('Delete this lick?')){ LDATA.user=LDATA.user.filter(l=>l.id!==b.dataset.del); delete LDATA.stars[b.dataset.del]; saveLines(); renderLinesPane(); } return; }
    if(b.dataset.diff!==undefined){ LDATA.diff=+b.dataset.diff; saveLines(); renderLinesPane(); }
    else if(b.dataset.tempo){ LDATA.tempo=+b.dataset.tempo; saveLines(); renderLinesPane(); }
    else if(b.dataset.feel){ LDATA.feel=b.dataset.feel; saveLines(); renderLinesPane(); }
    else if(b.dataset.from){ LDATA.from=b.dataset.from; saveLines(); renderLinesPane(); }
    else if(b.dataset.lick) linesStart(b.dataset.lick);
    else if(b.id==='iRec'){ LINES.rec={notes:[],name:$('iName').value,root:+$('iRoot').value,qual:$('iQual').value,diff:+$('iDiff').value}; synth.init(); renderLinesPane(); keepImportFields(); }
    else if(b.id==='iCancel'){ LINES.rec=null; renderLinesPane(); }
    else if(b.id==='iSave') saveRecording();
  };
}
function keepImportFields(){ const r=LINES.rec; if(!r) return; $('iRoot').value=r.root; $('iQual').value=r.qual; $('iDiff').value=r.diff; }
function saveRecording(){
  const r=LINES.rec, msg=$('iMsg');
  r.name=$('iName').value.trim()||'My lick'; r.root=+$('iRoot').value; r.qual=$('iQual').value; r.diff=+$('iDiff').value;
  if(r.notes.length<3){ msg.textContent='Play at least 3 notes first.'; return; }
  if(r.notes.length>24){ msg.textContent='That is a long one. Keep it to 24 notes or fewer; shorter licks transfer better.'; return; }
  // Rhythm: the typical gap between notes counts as an 8th; everything rounds to the nearest 16th
  const gaps=r.notes.slice(1).map((n,i)=>n.t-r.notes[i].t), med=[...gaps].sort((a,b)=>a-b)[Math.floor(gaps.length/2)]||300;
  const beats=gaps.map(g=>Math.min(2,Math.max(.25,Math.round(g/med*.5*4)/4)));
  let semis=r.notes.map(n=>n.m-(60+r.root)); while(Math.min(...semis)<-12) semis=semis.map(s=>s+12); while(Math.min(...semis)>11) semis=semis.map(s=>s-12);
  const lick=Lk('u'+Date.now(),r.name,r.diff,'Yours',r.qual,semis.map((s,i)=>[s,i<beats.length?beats[i]:1.5]));
  lick.user=true; LDATA.user.push(lick); LINES.rec=null; LDATA.from='user'; LDATA.artist=''; saveLines(); renderLinesPane();
}

/* ---------------- the drill ---------------- */
function pickLineKeys(){
  const keys=[]; while(keys.length<1+TRANSFER_KEYS){ const k=weightedPick([...Array(12).keys()].filter(x=>!keys.includes(x)).map(pc=>({pc,w:keyWeight(pc,'hands')}))).pc; keys.push(k); }
  return keys;
}
function linesStart(id){
  const lick=lickById(id); if(!lick) return;
  Object.assign(LINES,{active:true,lick,keys:pickLineKeys(),round:0,clean:0,results:[],bus:null,xp:0,advance:0});
  synth.init(); hideOv(); document.body.classList.add('nohud','linesmode'); document.body.classList.remove('menu');
  $('linesStage').hidden=false; $('lResults').hidden=true; $('lPlay').hidden=false;
  linesRound();
}
function linesRound(){
  clearTimeout(LINES.advance);
  const ref=LINES.keys[LINES.round];
  Object.assign(LINES,{inst:lickInstance(LINES.lick,ref),idx:0,offset:null,mistakes:0,revealed:LINES.round===0,done:false});
  $('lMsg').textContent=''; $('lMsg').className='lmsg';
  kbMarks={}; linesRender(); setTimeout(linesPlay,250);
}
function linesRender(){
  const L=LINES, inst=L.inst, learn=L.round===0;
  $('lTitle').textContent=L.lick.name;
  $('lCount').textContent=learn?'Learn it':`New key ${L.round} of ${TRANSFER_KEYS}`;
  $('lChords').textContent=inst.chords.map(c=>symText(c)).join('  →  ');
  $('lSub').textContent=learn?'Listen, then play it back on your keyboard. Any octave works.'+(L.lick.tip?' '+L.lick.tip:'')
    :'Same lick, new key. Play it without looking; press N if you need the notes.';
  $('lDots').innerHTML=inst.notes.map((_,i)=>`<i class="${i<L.idx?'on':i===L.idx&&!L.done?'cur':''}"></i>`).join('');
  $('lStaff').innerHTML=L.revealed?lineStaffSVG(inst,L.idx,L.done):'<p class="fine">Notes hidden. Hear it with R, or press N to show them.</p>';
  $('lShow').hidden=L.revealed; $('lNext').hidden=!L.done; $('lFeel').textContent=LDATA.feel==='swing'?'Feel: swing':'Feel: straight';
  if(learn&&!L.done){ kbMarks={}; const n=inst.notes[L.idx]; kbMarks[n.midi+(L.offset??0)]='k-hint'; }
  paintKeys();
}
// A one-line treble staff, spaced by rhythm, chord symbols above
function lineStaffSVG(inst,idx,done){
  const xs=[]; let x=58; inst.notes.forEach(n=>{ xs.push(x); x+=Math.max(26,n.dur*52); });
  const W=Math.max(320,x+10), y=di=>34+(38-di)*5;
  let s=`<svg viewBox="0 0 ${W} 130" width="${W}" height="130" aria-label="The lick on a staff">`;
  for(let i=0;i<5;i++) s+=`<line class="ln" x1="8" x2="${W-6}" y1="${y(38-2*i)}" y2="${y(38-2*i)}"/>`;
  s+=`<text class="clef" x="10" y="${y(32)+9}" font-size="44">𝄞</text>`;
  inst.chords.forEach(c=>{ const i=inst.notes.findIndex(n=>n.at>=c.at-1e-6); if(i>=0) s+=`<text class="csym" x="${xs[i]-6}" y="14">${symText(c)}</text>`; });
  inst.notes.forEach((n,i)=>{
    const di=n.spell.di, cy=y(di), cx=xs[i], col=done||i<idx?'var(--chord)':i===idx?'var(--brass)':'var(--ink)';
    for(let d=28;d>=di;d-=2) s+=`<line class="ln" x1="${cx-10}" x2="${cx+10}" y1="${y(d)}" y2="${y(d)}"/>`;
    for(let d=40;d<=di;d+=2) s+=`<line class="ln" x1="${cx-10}" x2="${cx+10}" y1="${y(d)}" y2="${y(d)}"/>`;
    s+=`<ellipse cx="${cx}" cy="${cy}" rx="6.4" ry="4.6" transform="rotate(-20 ${cx} ${cy})" fill="${col}"/>`;
    if(n.spell.a) s+=`<text class="acc" x="${cx-13}" y="${cy+5}" text-anchor="middle" fill="${col}">${ACC[n.spell.a]}</text>`;
  });
  return s+'</svg>';
}
// Play the lick over its chords: soft comp an octave down, bass, melody on top. Jazz licks swing their 8ths.
function playLine(inst,lick,bus,t0,bpm){
  // Swing stretches the first half of each beat to 2/3 and squeezes the second half into the last 1/3, so every
  // 16th moves in proportion (the 'a' stays after the 'and' instead of crashing into it)
  const swing=LDATA.feel==='swing', spb=60/bpm;
  const T=b=>{ const i=Math.floor(b+1e-9), f=b-i, g=!swing?f:f<=.5?f*4/3:2/3+(f-.5)*2/3; return t0+(i+g)*spb; };
  // Comp: the 3rd, 7th and a colour tone packed just under the lick's lowest note (down to C3), root in the bass
  const low=Math.min(...inst.notes.map(n=>n.midi)), ceil=Math.max(55,Math.min(low-1,69));
  inst.chords.forEach(c=>{
    const at=T(c.at), d=c.beats*spb*.95;
    playChord(compUnder(c,ceil),at,d,'mellow',bus,44);
    tone(40+mod12(c.root.pc-40),at,d,58,'mellow',bus);
  });
  inst.notes.forEach(n=>{ const a=T(n.at), e=T(n.at+n.dur); tone(n.midi,a,Math.max(.12,(e-a)*.92),96,'epiano',bus); });
  return T(inst.total)+.3;
}
function compUnder(c,ceil){
  const q=c.q; let ivs=q.id==='alt'?[4,10,1]:[...new Set([...q.ct,...q.req])];
  if(ivs.length>3) ivs=ivs.filter(x=>x!==0); if(ivs.length>3) ivs=ivs.filter(x=>x!==7); // the bass has the root; the 5th is the first to go
  // Tones go down to C3 at most; anything that would still reach the melody is left out (keeping at least two)
  const out=ivs.map(iv=>{ let m=ceil; while(mod12(m-c.root.pc-iv)!==0) m--; return m<48?m+12:m; }).sort((x,y)=>x-y);
  const under=out.filter(m=>m<=ceil);
  return under.length>=2?under:out;
}
function linesPlay(){ if(!LINES.active) return; killBus(LINES.bus); LINES.bus=newBus(); if(LINES.bus) playLine(LINES.inst,LINES.lick,LINES.bus,now()+.08,LDATA.tempo); }
function linesNote(m){
  if(LINES.rec){ LINES.rec.notes.push({m,t:performance.now()}); const c=$('iCount'); if(c) c.textContent=`${LINES.rec.notes.length} notes`; return; }
  const L=LINES; if(!L.active||L.done) return;
  const want=L.inst.notes[L.idx].midi;
  const ok=L.idx===0?mod12(m-want)===0:m===want+L.offset;
  if(ok){
    if(L.idx===0) L.offset=m-want;
    L.idx++; kbMarks={}; kbMarks[m]='k-chord';
    if(L.idx===L.inst.notes.length) return linesRoundDone();
    $('lMsg').textContent=''; linesRender(); return;
  }
  L.mistakes++; L.idx=0; L.offset=null;
  const name=plainSpell(m).name;
  $('lMsg').textContent=L.round===0?`${name} isn't it. Start again from ${L.inst.notes[0].name}.`:`${name} isn't it. From the top.`;
  $('lMsg').className='lmsg no'; linesRender(); kbMarks={}; kbMarks[m]='k-wrong'; paintKeys();
}
function linesRoundDone(){
  const L=LINES, clean=L.mistakes===0&&(L.round===0||!L.revealed);
  L.done=true; L.results.push({ref:L.keys[L.round],clean,mistakes:L.mistakes,revealed:L.round>0&&L.revealed});
  if(L.round>0&&clean) L.clean++;
  L.xp+=10+(clean?10:0);
  $('lMsg').textContent=clean?(L.round===0?'Got it. Now the real test: new keys.':'Clean.'):`Done${L.mistakes?`, after ${L.mistakes} restart${L.mistakes>1?'s':''}`:''}${L.round>0&&L.revealed?', with the notes showing':''}.`;
  $('lMsg').className='lmsg '+(clean?'ok':'');
  L.revealed=true; linesRender();
  if(clean) L.advance=setTimeout(linesNext,1100);
}
function linesNext(){ if(!LINES.active) return; if(!LINES.done) return; LINES.round++; if(LINES.round>TRANSFER_KEYS) return linesFinish(false); linesRound(); }
function linesFinish(quit){
  const L=LINES; clearTimeout(L.advance); killBus(L.bus); L.active=false;
  const learned=L.results.length>0, finished=L.round>TRANSFER_KEYS;
  const stars=!learned?0:finished&&L.clean===TRANSFER_KEYS?3:finished&&L.clean>=4?2:1;
  const prev=LDATA.stars[L.lick.id]||0; if(stars>prev) LDATA.stars[L.lick.id]=stars;
  addXP(L.xp); saveLines();
  $('lPlay').hidden=true; $('lResults').hidden=false;
  const rows=L.results.map((r,i)=>`<li><b>${keyName(r.ref,false).replace(' major','')}</b> ${i===0?'learned':r.clean?'clean':r.revealed?'with notes showing':`${r.mistakes} restart${r.mistakes>1?'s':''}`}</li>`).join('');
  $('lResults').innerHTML=`<h2>${quit?'Session ended':stars===3?'Perfect transfer':'Lick done'}</h2>${learned?`<div class="stars">${starStr(Math.max(stars,prev))}</div>`:''}
    <ul class="lkeys">${rows}</ul><p>+${L.xp} XP.${stars<3&&learned?` Next star: ${stars<2?'four of the five new keys clean.':'all five new keys clean.'}`:''}</p>
    <button class="go" id="lAgain">Again</button><button class="ghost" id="lBack">Back to Lines</button>`;
  $('lAgain').onclick=()=>linesStart(L.lick.id); $('lBack').onclick=linesToMenu; $('lAgain').focus();
}
function linesToMenu(){
  LINES.active=false; killBus(LINES.bus); clearTimeout(LINES.advance);
  $('linesStage').hidden=true; document.body.classList.remove('linesmode');
  side='lines'; $('startOv').hidden=false; document.body.classList.add('menu'); kbMarks={}; paintKeys(); renderMenu();
}
function linesKey(e){
  if(!LINES.active) return false;
  if(e.key==='Escape'){ LINES.results.length?linesFinish(true):linesToMenu(); return true; }
  if(!$('lResults').hidden) return false;
  if(e.key==='r'||e.key==='R'){ linesPlay(); return true; }
  if(e.key==='n'||e.key==='N'){ LINES.revealed=true; linesRender(); return true; }
  if((e.key==='Enter'||e.key===' ')&&LINES.done){ e.preventDefault(); linesNext(); return true; }
  return false;
}
