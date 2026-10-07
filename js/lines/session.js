/* Lines: learn a lick in one key, then move it to five more. The drill is transfer, not memorising.
   Grading follows the notes in order, in any octave; rhythm is free for now. */
let LDATA=store.get('lines',{stars:{},user:[],tempo:100,diff:0});
if(typeof LDATA.lh!=='boolean') LDATA.lh=true; // left hand: notes below middle C are your comping, not part of the lick
const LH_SPLIT=60; // playback feel for every lick, the player's choice
if(!['all','solo','orig','user','fav'].includes(LDATA.from)) LDATA.from='all'; LDATA.artist=LDATA.artist||''; LDATA.fav=LDATA.fav||{}; // fav: licks saved with ♥
const isFav=id=>!!LDATA.fav[id];
function toggleFav(id){ if(LDATA.fav[id]) delete LDATA.fav[id]; else LDATA.fav[id]=1; saveLines(); }
const saveLines=()=>store.set('lines',LDATA);
const allLicks=()=>[...LICKS,...SOLO_LICKS,...LDATA.user];
applyRatings([...LICKS,...SOLO_LICKS],LDATA.user); // difficulty and tags from what the notes are, not just how many
const lickFrom=l=>l.user?'user':l.style==='Solo'?'solo':'orig';
const lickLabel=l=>l.user?'Yours':l.artist||'Original';
const lickById=id=>allLicks().find(l=>l.id===id);
const LINES={active:false,rec:null};
const TRANSFER_KEYS=5;

/* ---------------- menu pane ---------------- */
function linesStarTotal(){ return allLicks().reduce((a,l)=>a+(LDATA.stars[l.id]||0),0); }
function renderLinesPane(){
  const list=allLicks().filter(l=>(!LDATA.diff||l.diff===LDATA.diff)&&(LDATA.from==='all'||(LDATA.from==='fav'?isFav(l.id):lickFrom(l)===LDATA.from))&&(!LDATA.artist||l.artist===LDATA.artist))
    .sort((a,b)=>a.diff-b.diff||lickLabel(a).localeCompare(lickLabel(b))||a.name.localeCompare(b.name));
  const artists=[...new Set(allLicks().map(l=>l.artist).filter(Boolean))].sort();
  const seg=(items,cur,attr)=>`<div class="seg" role="group">${items.map(([v,t])=>`<button data-${attr}="${v}" aria-pressed="${v===cur}">${t}</button>`).join('')}</div>`;
  let h=`<button class="back" data-home>← All modes</button><h2>Lines</h2>
    <p>Short licks you can drop anywhere. Learn one in a key, then play it in five more without looking. ${linesStarTotal()} of ${allLicks().length*3} stars.</p>
    ${seg([[0,'All'],[1,'Easy'],[2,'Medium'],[3,'Hard']],LDATA.diff,'diff')} ${seg([[70,'Slow'],[100,'Medium'],[130,'Fast']],LDATA.tempo,'tempo')}
    <div class="chipsrow">${[['all','All'],['fav',`♥ Favourites (${Object.keys(LDATA.fav).filter(id=>lickById(id)).length})`],['solo','From famous solos'],['orig','Originals'],['user','Yours']].map(([v,t])=>`<button class="chip" data-from="${v}" aria-pressed="${v===LDATA.from}">${t}</button>`).join('')}
      <select id="lArtist" aria-label="Artist"><option value="">Any player</option>${artists.map(a=>`<option${a===LDATA.artist?' selected':''}>${a}</option>`).join('')}</select></div>
    <p class="fine" style="margin:-4px 0 10px">${list.length} licks</p>
    <div class="licks">${list.map(l=>`<button class="lick" data-lick="${l.id}"><span class="ln">${LDIFF[l.diff]} · ${lickLabel(l)}</span><span class="lt">${l.name}</span><span class="lst"><b>${starStr(LDATA.stars[l.id]||0)}</b> ${l.notes.length} notes, over ${lickOver(l)}</span><span class="ltags">${(l.tags||[]).slice(0,3).map(t=>`<i>${t}</i>`).join('')}</span><span class="fav${isFav(l.id)?' on':''}${l.user?' withdel':''}" data-fav="${l.id}" title="${isFav(l.id)?'Remove from favourites':'Add to favourites'}">${isFav(l.id)?'♥':'♡'}</span>${l.user?`<span class="del" data-del="${l.id}" title="Delete this lick">×</span>`:''}</button>`).join('')||`<p class="fine">${LDATA.from==='fav'?'No favourites yet. Tap the ♡ on any lick to save it here.':'Nothing here yet.'}</p>`}</div>
    <p class="fine" style="margin-top:12px">Difficulty comes from what the notes are over the chord and how you reach them: chord tones are easy, tensions harder, altered notes hardest unless you step through them chromatically; wide leaps, 16ths and chord changes add to it. ★ learn it. ★★ four of the five new keys clean (no mistakes, no peeking). ★★★ all five clean. Licks from famous solos are short phrases from the <a href="https://jazzomat.hfm-weimar.de/" target="_blank" rel="noopener">Weimar Jazz Database</a> (Jazzomat Research Project, HfM Weimar), used under the <a href="https://opendatacommons.org/licenses/odbl/1.0/" target="_blank" rel="noopener">ODbL</a>. A few others follow formulas documented by teachers; the rest are Jun Jam originals.</p>
    ${importHTML()}`;
  $('linesPane').innerHTML=h;
}
function importHTML(){
  const roots=[...Array(12).keys()].map(pc=>`<option value="${pc}">${rootName(defaultRoot(pc,false))}</option>`).join('');
  const quals=['maj7','dom7','min7','hdim','maj','min','alt'].map(id=>`<option value="${id}">${Q[id].suf||'major'}</option>`).join('');
  const r=LINES.rec;
  return `<details class="import"${r?' open':''}><summary>Add your own lick</summary>
    <p class="fine">Pick the chord it goes over, press Record, play it (a few notes to about a bar is ideal), then Save. Your rhythm is measured at the Lines tempo and cleaned up onto straight 8ths, 16ths and triplets.</p>
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
    const f=e.target.closest('[data-fav]'); if(f){ e.stopPropagation(); toggleFav(f.dataset.fav); renderLinesPane(); return; }
    const b=e.target.closest('button,[data-del]'); if(!b) return;
    if(b.dataset.del){ e.stopPropagation(); if(confirm('Delete this lick?')){ LDATA.user=LDATA.user.filter(l=>l.id!==b.dataset.del); delete LDATA.stars[b.dataset.del]; saveLines(); renderLinesPane(); } return; }
    if(b.dataset.diff!==undefined){ LDATA.diff=+b.dataset.diff; saveLines(); renderLinesPane(); }
    else if(b.dataset.tempo){ LDATA.tempo=+b.dataset.tempo; saveLines(); renderLinesPane(); }
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
  // Rhythm exactly as played, measured in beats at the Lines tempo; Straight and Swing snap it to a grid on playback
  const bps=LDATA.tempo/60/1000, t0=r.notes[0].t, ats=r.notes.map(n=>Math.round((n.t-t0)*bps*100)/100);
  let semis=r.notes.map(n=>n.m-(60+r.root)); while(Math.min(...semis)<-12) semis=semis.map(s=>s+12); while(Math.min(...semis)>11) semis=semis.map(s=>s-12);
  const lick=Lk('u'+Date.now(),r.name,r.diff,'Yours',r.qual,semis.map((s,i)=>[s,i<ats.length-1?Math.max(.05,ats[i+1]-ats[i]):1,ats[i]]));
  lick.user=true; applyRatings([],[lick]); LDATA.user.push(lick); LINES.rec=null; LDATA.from='user'; LDATA.artist=''; saveLines(); renderLinesPane();
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
  const inst=lickInstance(LINES.lick,ref);
  if(LDATA.lh&&Math.min(...inst.notes.map(n=>n.midi))<LH_SPLIT) inst.notes.forEach(n=>{ n.midi+=12; n.spell={...n.spell,midi:n.midi,oct:n.spell.oct+1,di:n.spell.di+7}; });
  Object.assign(LINES,{inst,idx:0,offset:null,mistakes:0,revealed:LINES.round===0,done:false});
  $('lMsg').textContent=''; $('lMsg').className='lmsg';
  kbMarks={}; linesRender(); setTimeout(linesPlay,250);
}
function linesRender(){
  const L=LINES, inst=L.inst, learn=L.round===0;
  $('lTitle').textContent=L.lick.name; $('lFav').textContent=isFav(L.lick.id)?'♥':'♡'; $('lFav').title=isFav(L.lick.id)?'Remove from favourites':'Add to favourites';
  $('lCount').textContent=learn?'Learn it':`New key ${L.round} of ${TRANSFER_KEYS}`;
  $('lChords').textContent=inst.chords.map(c=>symText(c)).join('  →  ');
  $('lSub').textContent=learn?(LDATA.lh?'Listen, then play it back with your right hand above middle C; hold the chord with your left if you like.':'Listen, then play it back on your keyboard. Any octave works.')+(L.lick.tip?' '+L.lick.tip:'')
    :'Same lick, new key. Play it without looking; press N if you need the notes.';
  $('lDots').innerHTML=inst.notes.map((_,i)=>`<i class="${i<L.idx?'on':i===L.idx&&!L.done?'cur':''}"></i>`).join('');
  $('lStaff').innerHTML=L.revealed?lineStaffSVG(inst,L.idx,L.done):'<p class="fine">Notes hidden. Hear it with R, or press N to show them.</p>';
  $('lShow').hidden=L.revealed; $('lNext').hidden=!L.done; $('lLH').textContent=LDATA.lh?'Left hand: on':'Left hand: off';
  if(learn&&!L.done){ kbMarks={}; const n=inst.notes[L.idx]; kbMarks[n.midi+(L.offset??0)]='k-hint'; }
  paintKeys();
}
// The lick in real rhythm notation on one treble staff: stems, flags, beams per beat, dots, ties, bar lines every 4 beats.
// Written values come from the lick's lengths in beats; anything that isn't a single note value is tied.
const NOTE_VALUES=[4,3,2,1.5,1,.75,.5,.25];
function splitDur(at,d){
  const out=[]; let t=at, left=d;
  while(left>1e-6){
    const f=t-Math.floor(t+1e-9);
    // keep notes inside the beat unless they start on it or are a normal syncopation (8th-offbeat quarter or dotted quarter)
    let room=f>1e-6&&!(Math.abs(f-.5)<1e-6&&(Math.abs(left-1)<1e-6||Math.abs(left-1.5)<1e-6))?Math.min(left,Math.ceil(t-1e-9)-t):left;
    room=Math.min(room,Math.floor(t/4+1e-9)*4+4-t); // and never across a bar line
    const v=NOTE_VALUES.find(x=>x<=room+1e-6)||.25;
    out.push({at:t,d:v}); t+=v; left-=v;
  }
  return out;
}
function lineStaffSVG(inst,idx,done){
  const BW=78, X0=60, y=di=>40+(38-di)*5, xOf=t=>X0+t*BW;
  const total=Math.max(inst.total||0,inst.notes.reduce((a,n)=>Math.max(a,n.gat+n.gdur),0)), W=Math.max(320,xOf(total)+24);
  // pieces: each note split into writable values, tied together
  // pieces: each note split into writable values and tied; triplet notes are written as triplet 8ths or quarters
  const P=[]; inst.notes.forEach((n,i)=>n.tri?P.push({at:n.gat,d:n.gdur,n,i,first:true,tie:false,tri:true}):splitDur(n.gat,n.gdur).forEach((pc,k,arr)=>P.push({...pc,n,i,first:k===0,tie:k<arr.length-1})));
  const col=i=>done||i<idx?'var(--chord)':i===idx?'var(--brass)':'var(--ink)';
  let s=`<svg viewBox="0 0 ${W} 140" width="${W}" height="140" aria-label="The lick on a staff">`;
  for(let k=0;k<5;k++) s+=`<line class="ln" x1="8" x2="${W-6}" y1="${y(38-2*k)}" y2="${y(38-2*k)}"/>`;
  s+=`<text class="clef" x="10" y="${y(32)+9}" font-size="44">𝄞</text>`;
  for(let b=4;b<total-1e-6;b+=4) s+=`<line class="ln" x1="${xOf(b)-8}" x2="${xOf(b)-8}" y1="${y(38)}" y2="${y(30)}"/>`;
  inst.chords.forEach(c=>{ if(c.at<total) s+=`<text class="csym" x="${xOf(c.at)-6}" y="14">${symText(c)}</text>`; });
  // beam groups: consecutive notes shorter than a beat inside the same beat
  const groups=[]; let g=null;
  P.forEach((p,k)=>{ const short=p.d<1-1e-6&&!(p.tri&&p.d>.5), beat=Math.floor(p.at+1e-9);
    if(short&&g&&g.beat===beat&&P[k-1].d<1-1e-6) g.items.push(k); else { g=short?{beat,items:[k]}:null; if(g) groups.push(g); } });
  const inGroup=new Map(); groups.forEach(gr=>gr.items.forEach(k=>inGroup.set(k,gr)));
  const stemUp=ks=>ks.reduce((a,k)=>a+P[k].n.spell.di,0)/ks.length<34;
  P.forEach((p,k)=>{
    const di=p.n.spell.di, cx=xOf(p.at), cy=y(di), c=col(p.i), open=p.d>=2-1e-6;
    for(let d=28;d>=di;d-=2) s+=`<line class="ln" x1="${cx-10}" x2="${cx+10}" y1="${y(d)}" y2="${y(d)}"/>`;
    for(let d=40;d<=di;d+=2) s+=`<line class="ln" x1="${cx-10}" x2="${cx+10}" y1="${y(d)}" y2="${y(d)}"/>`;
    s+=open?`<ellipse cx="${cx}" cy="${cy}" rx="6" ry="4.3" transform="rotate(-20 ${cx} ${cy})" fill="none" stroke="${c}" stroke-width="1.8"/>`
           :`<ellipse cx="${cx}" cy="${cy}" rx="6.4" ry="4.6" transform="rotate(-20 ${cx} ${cy})" fill="${c}"/>`;
    if(p.first&&p.n.spell.a) s+=`<text class="acc" x="${cx-13}" y="${cy+5}" text-anchor="middle" fill="${c}">${ACC[p.n.spell.a]}</text>`;
    if([.75,1.5,3].some(v=>Math.abs(p.d-v)<1e-6)) s+=`<circle cx="${cx+10}" cy="${cy-(di%2===0?5:0)}" r="1.8" fill="${c}"/>`;
    if(p.tie){ const nx=xOf(p.at+p.d), dn=di>=34; s+=`<path d="M${cx+4} ${cy+(dn?-7:7)} Q${(cx+nx)/2} ${cy+(dn?-16:16)} ${nx-4} ${cy+(dn?-7:7)}" fill="none" stroke="${c}" stroke-width="1.4"/>`; }
    if(p.d>=4-1e-6) return; // whole note: no stem
    const gr=inGroup.get(k);
    if(gr&&gr.items.length>1) return; // beamed below
    const up=stemUp([k]), sx=up?cx+5.6:cx-5.6, ey=up?cy-34:cy+34;
    s+=`<line x1="${sx}" x2="${sx}" y1="${cy}" y2="${ey}" stroke="${c}" stroke-width="1.4"/>`;
    const flags=p.tri?(p.d>.5?0:1):p.d<=.25+1e-6?2:p.d<1-1e-6?1:0;
    for(let f=0;f<flags;f++){ const fy=ey+(up?f*7:-f*7); s+=`<path d="M${sx} ${fy} q9 ${up?8:-8} 7 ${up?20:-20}" fill="none" stroke="${c}" stroke-width="2"/>`; }
  });
  groups.filter(gr=>gr.items.length>1).forEach(gr=>{
    const ks=gr.items, up=stemUp(ks), cys=ks.map(k=>y(P[k].n.spell.di));
    const by=up?Math.min(...cys)-32:Math.max(...cys)+32, xs=ks.map(k=>xOf(P[k].at)+(up?5.6:-5.6));
    ks.forEach((k,j)=>{ s+=`<line x1="${xs[j]}" x2="${xs[j]}" y1="${cys[j]}" y2="${by}" stroke="${col(P[k].i)}" stroke-width="1.4"/>`; });
    const bc=col(P[ks[0]].i), th=4, off=up?7:-7;
    s+=`<rect x="${xs[0]}" y="${up?by:by-th}" width="${xs[xs.length-1]-xs[0]}" height="${th}" fill="${bc}"/>`;
    ks.forEach((k,j)=>{ if(P[k].d>.25+1e-6) return; // 16ths: second beam to a 16th neighbour, or a stub
      const nxt=j+1<ks.length&&P[ks[j+1]].d<=.25+1e-6, prv=j>0&&P[ks[j-1]].d<=.25+1e-6;
      if(nxt) s+=`<rect x="${xs[j]}" y="${(up?by:by-th)+off}" width="${xs[j+1]-xs[j]}" height="${th}" fill="${bc}"/>`;
      else if(!prv){ const w=9, x1=j===ks.length-1?xs[j]-w:xs[j]; s+=`<rect x="${x1}" y="${(up?by:by-th)+off}" width="${w}" height="${th}" fill="${bc}"/>`; }
    });
  });
  // a 3 over each beat written as triplets
  [...new Set(P.filter(p=>p.tri).map(p=>Math.floor(p.at+1e-9)))].forEach(b=>{ s+=`<text class="csym" x="${xOf(b+1/3)}" y="${y(44)}" text-anchor="middle">3</text>`; });
  return s+'</svg>';
}
// Play the lick over its chords: soft comp an octave down, bass, melody on top. Jazz licks swing their 8ths.
function playLine(inst,lick,bus,t0,bpm){
  // Straight, exactly as written on the staff (see gridTimes): what you see is what you hear
  const spb=60/bpm, T=b=>t0+b*spb, startOf=n=>n.gat, lenOf=n=>n.gdur;
  // Comp: the 3rd, 7th and a colour tone packed just under the lick's lowest note (down to C3), root in the bass
  const low=Math.min(...inst.notes.map(n=>n.midi)), ceil=Math.max(55,Math.min(low-1,69));
  inst.chords.forEach(c=>{
    const at=T(c.at), d=c.beats*spb*.95;
    playChord(compUnder(c,ceil),at,d,backSound(),bus,backVel(44));
    tone(40+mod12(c.root.pc-40),at,Math.min(d,2.2),70,'bass',bus);
  });
  let end=0;
  inst.notes.forEach(n=>{ const a=T(startOf(n)), e=T(startOf(n)+lenOf(n)); end=Math.max(end,e); tone(n.midi,a,Math.max(.1,(e-a)*.92),96,'epiano',bus); });
  return Math.max(end,T(inst.total))+.3;
}
function compUnder(c,ceil){
  const q=c.q; let ivs=q.id==='alt'?[4,10,1]:[...new Set([...q.ct,...q.req])];
  if(ivs.length>3) ivs=ivs.filter(x=>x!==0); if(ivs.length>3) ivs=ivs.filter(x=>x!==7); // the bass has the root; the 5th is the first to go
  // Tones go down to C3 at most; anything that would still reach the melody is left out (keeping at least two)
  const out=ivs.map(iv=>{ let m=ceil; while(mod12(m-c.root.pc-iv)!==0) m--; return m<48?m+12:m; }).sort((x,y)=>x-y);
  const under=out.filter(m=>m<=ceil);
  return under.length>=2?under:out;
}
// Returns how many seconds the playback lasts
function linesPlay(delay=.08){ if(!LINES.active) return 0; killBus(LINES.bus); LINES.bus=newBus(); if(!LINES.bus) return 0; const t0=now()+delay; return playLine(LINES.inst,LINES.lick,LINES.bus,t0,LDATA.tempo)-now(); }
function linesNote(m){
  if(LINES.rec){ LINES.rec.notes.push({m,t:performance.now()}); const c=$('iCount'); if(c) c.textContent=`${LINES.rec.notes.length} notes`; return; }
  const L=LINES; if(!L.active||L.done) return;
  if(LDATA.lh&&m<LH_SPLIT) return; // left-hand comping
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
  // Replay the lick you just played, then go to the next key on its own (Enter skips the wait)
  const secs=linesPlay(.35)||1.2;
  L.advance=setTimeout(linesNext,secs*1000+500);
}
function linesNext(){ if(!LINES.active) return; if(!LINES.done) return; clearTimeout(LINES.advance); LINES.round++; if(LINES.round>TRANSFER_KEYS) return linesFinish(false); linesRound(); }
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
