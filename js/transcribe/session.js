/* Transcribe: mp3 in, editable sheet music out. The helper (tools/transcriber) does the listening on this Mac;
   this screen imports the recording, asks what you want to see, sends the selection, and lets you fix the result. */
const TR_URL='http://127.0.0.1:8771';
let TRDATA=store.get('trans',{list:[]});
const saveTr=()=>store.set('trans',TRDATA);
const TR={active:false};

/* ---------------- helper status and install guide ---------------- */
async function trHelperOk(){ try{ const c=new AbortController(); setTimeout(()=>c.abort(),1500); const r=await fetch(TR_URL+'/health',{signal:c.signal}); return (await r.json()).ok; }catch(e){ return false; } }
function trProjectDir(){ if(location.protocol!=='file:') return null; const p=decodeURIComponent(location.pathname); return p.slice(0,p.lastIndexOf('/')); }
function trInstallGuide(){
  const dir=trProjectDir(), q=s=>`"${s}"`;
  const install=`bash ${q((dir||'/path/to/Jun Jam')+'/tools/transcriber/install.sh')}`;
  const start=`"$HOME/Library/Application Support/Jun Jam/transcriber-venv/bin/python" "$HOME/Library/Application Support/Jun Jam/server.py"`;
  const cmd=(t,id)=>`<div class="trcmd"><code id="${id}">${t.replace(/</g,'&lt;')}</code><button class="ghost" data-copy="${id}">Copy</button></div>`;
  return `<div class="trguide"><b>The transcriber helper isn't running.</b> Everything else in Jun Jam works without it; transcribing needs it once, on this Mac.
    <ol><li>Open <b>Terminal</b> (Cmd+Space, type Terminal) and paste this to install it (about 700 MB, a few minutes, one time only):${cmd(install,'trCmd1')}${dir?'':'<span class="fine">Replace /path/to/Jun Jam with the folder Jun Jam is in.</span>'}</li>
    <li>From then on <b>Jun Jam.app starts it for you</b>. If you open Jun Jam another way, start it with:${cmd(start,'trCmd2')}</li>
    <li><button class="go" id="trRecheck">Check again</button></li></ol></div>`;
}

/* ---------------- start screen ---------------- */
async function trOpen(){
  trStopAll(); Object.assign(TR,{active:true,step:'start'});
  synth.init(); hideOv(); document.body.classList.add('nohud','trmode'); document.body.classList.remove('menu'); $('transStage').hidden=false;
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">Transcribe a recording</span><span id="trStatus">Checking the helper…</span></div>
    <p>Drop in an mp3 (or any audio file you own). Choose what you want to see, select the part of the song, and it comes back as sheet music with chords that you can fix and save.</p>
    <div id="trGuide"></div>
    <label class="trdrop" id="trDrop"><input type="file" id="trFile" accept="audio/*" hidden><b>Choose an audio file</b><span>or drop it here</span></label>
    ${TRDATA.list.length?`<div class="sec" style="margin-top:14px">Saved transcriptions</div><div class="licks">${TRDATA.list.map((t,i)=>`<button class="lick" data-open="${i}"><span class="ln">${t.mode==='lead'?'Lead sheet':'Solo: '+(TR_INSTRUMENTS[t.instrument]||{}).name} · ${t.bars} bars</span><span class="lt">${t.title}</span><span class="lst">♩ = ${t.tempo}, ${keyName(t.key.pc,t.key.minor)}</span><span class="del" data-del="${i}" title="Delete">×</span></button>`).join('')}</div>`:''}
    <div class="erow" style="margin-top:14px"><button class="ghost" id="trHome">Back</button></div>`;
  $('trHome').onclick=trToMenu;
  const f=$('trFile'), drop=$('trDrop');
  f.onchange=()=>f.files[0]&&trLoad(f.files[0]);
  drop.ondragover=e=>{ e.preventDefault(); drop.classList.add('over'); }; drop.ondragleave=()=>drop.classList.remove('over');
  drop.ondrop=e=>{ e.preventDefault(); drop.classList.remove('over'); const file=e.dataTransfer.files[0]; if(file) trLoad(file); };
  $('trBody').onclick=e=>{ const d=e.target.closest('[data-del]'), o=e.target.closest('[data-open]'), c=e.target.closest('[data-copy]');
    if(d){ e.stopPropagation(); if(confirm('Delete this transcription?')){ TRDATA.list.splice(+d.dataset.del,1); saveTr(); trOpen(); } return; }
    if(o){ trEdit(JSON.parse(JSON.stringify(TRDATA.list[+o.dataset.open])),null,+o.dataset.open); return; }
    if(c){ navigator.clipboard&&navigator.clipboard.writeText($(c.dataset.copy).textContent); c.textContent='Copied'; setTimeout(()=>c.textContent='Copy',1200); return; }
    if(e.target.id==='trRecheck') trCheck(); };
  trCheck();
}
async function trCheck(){
  const ok=await trHelperOk(); TR.helper=ok; if(!$('trStatus')) return;
  $('trStatus').textContent=ok?'Helper ready':'Helper not running'; $('trStatus').className=ok?'trok':'trno';
  if($('trGuide')) $('trGuide').innerHTML=ok?'':trInstallGuide();
  if($('trGo')) $('trGo').disabled=!ok;
}

/* ---------------- setup: waveform, region, what you want to see ---------------- */
async function trLoad(file){
  const c=synth.ctx; $('trStatus').textContent='Reading the file…';
  let buf; try{ buf=await c.decodeAudioData(await file.arrayBuffer()); }catch(e){ $('trStatus').textContent="Couldn't read that file. Try an mp3, m4a or wav."; return; }
  if(TR.url) URL.revokeObjectURL(TR.url);
  Object.assign(TR,{step:'setup',buf,file,url:URL.createObjectURL(file),title:file.name.replace(/\.[^.]+$/,''),sel:[0,Math.min(buf.duration,30)],mode:'solo',instrument:'piano'});
  trSetupRender();
}
const fmtT=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}.${Math.floor((s%1)*10)}`;
function trSetupRender(){
  const T=TR;
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">${T.title.replace(/</g,'&lt;')}</span><span id="trStatus"></span></div>
    <div class="sec">1. What do you want to see?</div>
    <div class="trmodes"><button class="trpick" data-mode="solo" aria-pressed="${T.mode==='solo'}"><b>Solo transcription</b><span>One instrument's line, note for note, with the chords under it.</span></button>
      <button class="trpick" data-mode="lead" aria-pressed="${T.mode==='lead'}"><b>Lead sheet</b><span>The tune's melody and chord changes. Mark solo sections afterwards to leave them out.</span></button></div>
    <div class="irow">${T.mode==='solo'?`<span>Instrument</span><select id="trInst">${Object.entries(TR_INSTRUMENTS).map(([k,v])=>`<option value="${k}"${k===T.instrument?' selected':''}>${v.name}</option>`).join('')}</select>`:'<span>The melody is taken from the vocals, or the lead instrument if there are none.</span>'}</div>
    <div class="sec">2. Select the part to transcribe <span class="fine" id="trSelT"></span></div>
    <canvas class="trwave" id="trWave" height="110"></canvas>
    <div class="erow"><button class="ghost" id="trPlaySel">Play selection</button><button class="ghost" id="trAll">Whole song</button>
      <div class="seg" role="group">${[[.5,'50%'],[.75,'75%'],[1,'100%']].map(([v,t])=>`<button data-rate="${v}" aria-pressed="${(T.rate||1)===v}">${t}</button>`).join('')}</div></div>
    <p class="fine">Drag across the waveform to select. About 30 to 90 seconds works best for a solo; a whole song for a lead sheet takes a few minutes.</p>
    <div class="erow"><button class="go" id="trGo">Transcribe</button><button class="ghost" id="trBack">Back</button></div>`;
  $('trBack').onclick=trOpen; $('trGo').onclick=trRun;
  $('trBody').querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ T.mode=b.dataset.mode; trSetupRender(); });
  $('trBody').querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ T.rate=+b.dataset.rate; trSetupRender(); });
  if($('trInst')) $('trInst').onchange=e=>T.instrument=e.target.value;
  $('trPlaySel').onclick=()=>trPlayOriginal(T.sel[0],T.sel[1]);
  $('trAll').onclick=()=>{ T.sel=[0,T.buf.duration]; trDrawWave(); };
  trDrawWave(); trWaveDrag(); trCheck();
}
function trDrawWave(){
  const cv=$('trWave'); if(!cv) return; const T=TR, w=cv.clientWidth*2, h=220; cv.width=w; cv.height=h;
  const g=cv.getContext('2d'), d=T.buf.getChannelData(0), step=Math.ceil(d.length/w), css=getComputedStyle(document.body);
  g.clearRect(0,0,w,h); g.fillStyle=css.getPropertyValue('--line-strong');
  const x0=T.sel[0]/T.buf.duration*w, x1=T.sel[1]/T.buf.duration*w;
  g.fillStyle='rgba(224,169,59,.22)'; g.fillRect(x0,0,x1-x0,h);
  for(let x=0;x<w;x++){ let mx=0; for(let i=x*step;i<(x+1)*step&&i<d.length;i+=4) mx=Math.max(mx,Math.abs(d[i]));
    g.fillStyle=x>=x0&&x<=x1?css.getPropertyValue('--brass'):css.getPropertyValue('--muted'); g.fillRect(x,h/2-mx*h/2,1,Math.max(1,mx*h)); }
  if($('trSelT')) $('trSelT').textContent=`${fmtT(T.sel[0])} to ${fmtT(T.sel[1])} (${Math.round(T.sel[1]-T.sel[0])} s)`;
}
function trWaveDrag(){
  const cv=$('trWave'); let a=null;
  const at=e=>{ const r=cv.getBoundingClientRect(); return Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*TR.buf.duration; };
  cv.onpointerdown=e=>{ a=at(e); TR.sel=[a,a]; cv.setPointerCapture(e.pointerId); };
  cv.onpointermove=e=>{ if(a===null) return; const b=at(e); TR.sel=[Math.min(a,b),Math.max(a,b)]; trDrawWave(); };
  cv.onpointerup=()=>{ if(TR.sel[1]-TR.sel[0]<1) TR.sel=[TR.sel[0],Math.min(TR.buf.duration,TR.sel[0]+15)]; a=null; trDrawWave(); };
}
// The original recording, through an audio element so it can slow down without changing pitch
function trPlayOriginal(from,to){
  trStopAll(); if(!TR.url) return;
  const au=TR.audio||(TR.audio=new Audio()); if(au.src!==TR.url) au.src=TR.url;
  au.preservesPitch=true; au.playbackRate=TR.rate||1; au.currentTime=from; au.play();
  clearInterval(TR.audioTimer); TR.audioTimer=setInterval(()=>{ if(au.currentTime>=to){ au.pause(); clearInterval(TR.audioTimer); } trPlayhead(au.currentTime); },40);
}
function trStopAll(){ if(TR.audio) TR.audio.pause(); clearInterval(TR.audioTimer); killBus(TR.bus); TR.bus=null; cancelAnimationFrame(TR.raf); TR.playing=false; }

/* ---------------- send the selection to the helper ---------------- */
async function trWav(buf,from,to){ // the selection, resampled to 44.1 kHz stereo, as a 16-bit WAV
  const sr=44100, len=Math.ceil((to-from)*sr), off=new OfflineAudioContext(2,len,sr), src=off.createBufferSource();
  src.buffer=buf; src.connect(off.destination); src.start(0,from,to-from); const r=await off.startRendering();
  const L=r.getChannelData(0), R=r.getChannelData(1), out=new DataView(new ArrayBuffer(44+len*4));
  const w=(o,s)=>[...s].forEach((ch,i)=>out.setUint8(o+i,ch.charCodeAt(0)));
  w(0,'RIFF'); out.setUint32(4,36+len*4,true); w(8,'WAVE'); w(12,'fmt '); out.setUint32(16,16,true); out.setUint16(20,1,true); out.setUint16(22,2,true);
  out.setUint32(24,sr,true); out.setUint32(28,sr*4,true); out.setUint16(32,4,true); out.setUint16(34,16,true); w(36,'data'); out.setUint32(40,len*4,true);
  for(let i=0;i<len;i++){ out.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true); out.setInt16(46+i*4,Math.max(-1,Math.min(1,R[i]))*32767,true); }
  return new Blob([out],{type:'audio/wav'});
}
async function trRun(){
  const T=TR; if(!(await trHelperOk())) return trCheck();
  trStopAll(); T.step='working';
  const target=T.mode==='lead'?'vocals':TR_INSTRUMENTS[T.instrument].stem, t0=performance.now();
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">${T.title.replace(/</g,'&lt;')}</span></div>
    <p class="rhwhat">Listening… <span id="trEl">0</span> s</p><p class="fine">Separating the instruments, then finding the notes and the beat. Roughly as long as the selection, longer the first time (the separation model downloads once).</p>
    <div class="erow"><button class="ghost" id="trCancel">Cancel</button></div>`;
  const tick=setInterval(()=>{ if($('trEl')) $('trEl').textContent=Math.round((performance.now()-t0)/1000); },500);
  const ctl=new AbortController(); $('trCancel').onclick=()=>{ ctl.abort(); clearInterval(tick); trSetupRender(); };
  try{
    const wav=await trWav(T.buf,T.sel[0],T.sel[1]);
    const r=await fetch(`${TR_URL}/transcribe?target=${target}&mode=${T.mode}`,{method:'POST',body:wav,signal:ctl.signal}), res=await r.json();
    clearInterval(tick);
    if(!res.ok) throw new Error(res.error||'The helper could not transcribe this.');
    // lead sheets: no vocals (an instrumental)? the melody comes from the lead instrument instead
    if(T.mode==='lead'&&res.notes.target.length<12&&res.notes.alt&&res.notes.alt.length>res.notes.target.length) res.notes.target=res.notes.alt;
    T.res=res; T.shift=0;
    trEdit(buildScore(res,{mode:T.mode,instrument:T.mode==='lead'?'voice':T.instrument,title:T.title}),res,null);
  }catch(e){ clearInterval(tick); if(e.name==='AbortError') return; $('trBody').innerHTML=`<p class="lmsg no">${String(e.message||e).replace(/</g,'&lt;')}</p><div class="erow"><button class="go" id="trBack">Back</button></div>`; $('trBack').onclick=trSetupRender; }
}

/* ---------------- the editor ---------------- */
const PXB=46, ROW=11, LANE=26;
function trEdit(score,res,savedIndex){
  trStopAll(); Object.assign(TR,{active:true,step:'edit',score,res:res||TR.res||null,saved:savedIndex,sel:TR.sel,undo:[],selected:new Set(),rate:TR.rate||1,speed:1});
  if(!res){ TR.res=null; } // reopened from the list: no audio, no re-analysis
  $('trBody').innerHTML=`<div class="etop"><span class="etitle" id="trTitle"></span><span id="trInfo"></span></div>
    <div class="erow trtools"><button class="go" id="trPlay">Play (Space)</button>${TR.url&&TR.res?'<button class="ghost" id="trOrig">Original</button>':''}<button class="ghost" id="trStop">Stop</button>
      <div class="seg" role="group">${[[.5,'50%'],[.75,'75%'],[1,'100%']].map(([v,t])=>`<button data-speed="${v}" aria-pressed="${TR.speed===v}">${t}</button>`).join('')}</div>
      ${TR.res?'<button class="ghost" id="trShiftL" title="Move the bar lines one beat earlier">◀ bar line</button><button class="ghost" id="trShiftR" title="One beat later">bar line ▶</button>':''}
      <button class="ghost" id="trUndo">Undo</button></div>
    <div class="trscore" id="trScore"></div>
    <div class="sec">Edit: drag notes to move them, drag their right edge to change length, double-click to add, Delete to remove, ↑/↓ to transpose. Click a chord to change it.</div>
    <div class="trroll" id="trRoll"></div>
    <div class="lmsg" id="trMsg"></div>
    <div class="erow"><button class="go" id="trSave">Save</button><button class="ghost" id="trXml">Export MusicXML</button><button class="ghost" id="trMid">Export MIDI</button><button class="ghost" id="trLick">Selected notes → Lines</button><button class="ghost" id="trClose">Close</button></div>`;
  const B=$('trBody');
  $('trPlay').onclick=()=>trPlayScore(); $('trStop').onclick=trStopAll; if($('trOrig')) $('trOrig').onclick=()=>trPlayOriginal(TR.sel[0],TR.sel[1]);
  B.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{ TR.speed=+b.dataset.speed; TR.rate=TR.speed; B.querySelectorAll('[data-speed]').forEach(x=>x.setAttribute('aria-pressed',x===b)); });
  if($('trShiftL')){ $('trShiftL').onclick=()=>trReshift(-1); $('trShiftR').onclick=()=>trReshift(1); }
  $('trUndo').onclick=trUndo; $('trSave').onclick=trSave; $('trXml').onclick=()=>trDownload(toMusicXML(TR.score),'musicxml','application/vnd.recordare.musicxml+xml');
  $('trMid').onclick=()=>trDownload(toMidiFile(TR.score),'mid','audio/midi'); $('trLick').onclick=trToLick; $('trClose').onclick=trOpen;
  trRender();
}
function trRender(){ trInfo(); trScoreView(); trRollView(); }
function trInfo(){ const s=TR.score;
  $('trTitle').textContent=s.title; $('trInfo').textContent=`${s.mode==='lead'?'Lead sheet':'Solo'} · ♩ = ${s.tempo} · ${keyName(s.key.pc,s.key.minor)} · ${s.bars} bars · ${s.melody.length} notes`; }
function trPush(){ TR.undo.push(JSON.stringify({m:TR.score.melody,c:TR.score.chords,s:TR.score.soloBars})); if(TR.undo.length>80) TR.undo.shift(); }
function trUndo(){ const u=TR.undo.pop(); if(!u) return; const o=JSON.parse(u); TR.score.melody=o.m; TR.score.chords=o.c; TR.score.soloBars=o.s; TR.selected.clear(); trRender(); }
function trReshift(d){ if(!TR.res) return; trPush(); TR.shift=(TR.shift||0)+d; const s=TR.score;
  TR.score={...buildScore(TR.res,{mode:s.mode,instrument:s.instrument,shift:TR.shift,title:s.title}),soloBars:s.soloBars}; TR.selected.clear(); trRender(); trMsg(`Bar lines moved ${d<0?'earlier':'later'}.`); }
function trMsg(t,cls=''){ const m=$('trMsg'); if(m){ m.textContent=t; m.className='lmsg '+cls; } }

// Sheet music: four bars to a line, chord symbols above, notes spelled from their chords
function trScoreView(){
  const s=TR.score, vis=visibleMelody(s), lines=[];
  for(let b=0;b<s.bars;b+=4){
    const a=b*4, z=a+16, notes=vis.filter(n=>n.gat>=a-1e-6&&n.gat<z-1e-6).map(n=>{ const sp=spellIn(s,n.midi,n.gat);
      return {midi:n.midi,gat:n.gat-a,gdur:Math.min(n.gdur,z-n.gat),tri:n.tri,spell:{...sp,midi:n.midi},name:sp.name}; });
    const chords=s.chords.filter(c=>c.at>=a-1e-6&&c.at<z-1e-6).map(c=>({...chordObj(c),at:c.at-a}));
    const solo=(s.soloBars||[]).filter(x=>x>=b&&x<b+4);
    lines.push(`<div class="trline"><span class="trbar">${b+1}${solo.length?` · solo ${solo.map(x=>x+1).join(', ')}`:''}</span>${lineStaffSVG({notes,chords,total:16},-1,false)}</div>`);
  }
  $('trScore').innerHTML=lines.join('');
}
// Piano roll with a chord lane; everything editable
function trRollView(){
  const s=TR.score, mel=s.melody, ps=mel.map(n=>n.midi), lo=Math.min(...ps,60)-3, hi=Math.max(...ps,72)+3;
  const W=s.bars*4*PXB+20, H=LANE+(hi-lo+1)*ROW, y=m=>LANE+(hi-m)*ROW;
  let g=`<svg id="trSvg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  for(let m=lo;m<=hi;m++) g+=`<rect x="0" y="${y(m)}" width="${W}" height="${ROW}" class="${isBlack(m)?'rbk':'rwh'}"/>${m%12===0?`<text x="2" y="${y(m)+ROW-2}" class="rlab">C${m/12-1}</text>`:''}`;
  for(let b=0;b<=s.bars*4;b++) g+=`<line x1="${b*PXB}" x2="${b*PXB}" y1="${LANE}" y2="${H}" class="${b%4===0?'rbar':'rbeat'}"/>`;
  for(let b=0;b<s.bars;b++){ const solo=(s.soloBars||[]).includes(b);
    g+=`<rect x="${b*4*PXB}" y="0" width="${4*PXB}" height="${LANE}" class="rlane${solo?' solo':''}" data-bar="${b}"/>`+(s.mode==='lead'?`<text x="${b*4*PXB+4*PXB-4}" y="16" text-anchor="end" class="rsolo" data-solo="${b}">${solo?'solo ✓':'solo?'}</text>`:''); }
  s.chords.forEach((c,i)=>{ g+=`<text x="${c.at*PXB+3}" y="17" class="rchord" data-chord="${i}">${symText(chordObj(c))}</text>`; });
  mel.forEach((n,i)=>{ const hid=(s.soloBars||[]).includes(Math.floor(n.gat/4+1e-6));
    g+=`<rect x="${n.gat*PXB+1}" y="${y(n.midi)+1}" width="${Math.max(4,n.gdur*PXB-2)}" height="${ROW-2}" rx="2" class="rnote${TR.selected.has(i)?' sel':''}${hid?' hid':''}" data-i="${i}"/>`; });
  g+=`<line id="trHead" x1="-5" x2="-5" y1="0" y2="${H}" class="rhead"/></svg>`;
  $('trRoll').innerHTML=g; TR.roll={lo,hi,y};
  trRollEvents();
}
function trRollEvents(){
  const svg=$('trSvg'), s=TR.score; let drag=null;
  const pt=e=>{ const r=svg.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; };
  const toPitch=py=>TR.roll.hi-Math.floor((py-LANE)/ROW), snap=b=>Math.max(0,Math.round(b*4)/4);
  svg.onpointerdown=e=>{
    const p=pt(e), nEl=e.target.closest('.rnote'), cEl=e.target.closest('[data-chord]'), sEl=e.target.closest('[data-solo]');
    if(sEl){ trPush(); const b=+sEl.dataset.solo, sb=s.soloBars||(s.soloBars=[]); sb.includes(b)?sb.splice(sb.indexOf(b),1):sb.push(b); trRender(); return; }
    if(cEl){ trChordEdit(+cEl.dataset.chord,e); return; }
    if(e.target.closest('.rlane')){ trChordAdd(Math.floor(p.x/PXB/4)*4,e); return; }
    if(nEl){ const i=+nEl.dataset.i, n=s.melody[i];
      if(!e.shiftKey&&!TR.selected.has(i)) TR.selected.clear(); TR.selected.add(i);
      const edge=p.x>(n.gat+n.gdur)*PXB-7;
      trPush(); drag={mode:edge?'len':'move',p0:p,orig:[...TR.selected].map(k=>({k,...s.melody[k]}))};
      svg.setPointerCapture(e.pointerId); trRollView(); return; }
    TR.selected.clear(); drag={mode:'box',p0:p}; svg.setPointerCapture(e.pointerId);
  };
  svg.onpointermove=e=>{ if(!drag) return; const p=pt(e), dx=(p.x-drag.p0.x)/PXB, dy=Math.round((drag.p0.y-p.y)/ROW);
    if(drag.mode==='move') drag.orig.forEach(o=>{ s.melody[o.k]={...s.melody[o.k],gat:snap(o.gat+dx),midi:Math.max(21,Math.min(108,o.midi+dy))}; });
    else if(drag.mode==='len') drag.orig.forEach(o=>{ s.melody[o.k]={...s.melody[o.k],gdur:Math.max(.25,snap(o.gdur+dx)),tri:false}; });
    else { const x0=Math.min(p.x,drag.p0.x), x1=Math.max(p.x,drag.p0.x), y0=Math.min(p.y,drag.p0.y), y1=Math.max(p.y,drag.p0.y);
      TR.selected=new Set(s.melody.map((n,i)=>i).filter(i=>{ const n=s.melody[i], ny=TR.roll.y(n.midi)+ROW/2; return n.gat*PXB<x1&&(n.gat+n.gdur)*PXB>x0&&ny>y0&&ny<y1; })); }
    trRollView();
  };
  svg.onpointerup=()=>{ if(drag&&drag.mode!=='box'){ trTidy(); trRender(); } drag=null; };
  svg.ondblclick=e=>{ if(e.target.closest('.rnote')||e.target.closest('.rlane')) return; const p=pt(e); trPush();
    s.melody.push({midi:toPitch(p.y),gat:Math.floor(p.x/PXB*4)/4,gdur:.5,tri:false}); trTidy(); TR.selected=new Set([s.melody.findIndex(n=>n.gat===Math.floor(p.x/PXB*4)/4&&n.midi===toPitch(p.y))]); trRender(); };
}
// keep notes in time order, one line: a note can't run into the next one
function trTidy(){ const m=TR.score.melody; const sel=[...TR.selected].map(i=>m[i]); m.sort((a,b)=>a.gat-b.gat||b.midi-a.midi);
  for(let i=0;i<m.length-1;i++) if(m[i].gat+m[i].gdur>m[i+1].gat) m[i].gdur=Math.max(.05,m[i+1].gat-m[i].gat);
  TR.selected=new Set(sel.map(n=>m.indexOf(n)).filter(i=>i>=0)); }
// chord symbols: click to change, click an empty spot in the lane to add one
const TR_QUALS=['maj','min','dom7','maj7','min7','hdim','dim7','dim','aug','sus4','sus7','six','min6','mmaj7','maj9','dom9','min9','dom13','min11','d7b9','d7s9','alt','d7s11','add9','six9'];
function trChordPopup(e,c,onSave,onDel){
  document.querySelectorAll('.trpop').forEach(x=>x.remove());
  const pop=document.createElement('div'); pop.className='trpop';
  pop.innerHTML=`<select id="tpR">${[...Array(12).keys()].map(pc=>`<option value="${pc}"${pc===c.root?' selected':''}>${rootName(defaultRoot(pc,false))}</option>`).join('')}</select>
    <select id="tpQ">${TR_QUALS.map(id=>`<option value="${id}"${id===c.qid?' selected':''}>${Q[id].suf||'major'}</option>`).join('')}</select>
    <button class="go" id="tpOk">OK</button>${onDel?'<button class="ghost" id="tpDel">Remove</button>':''}`;
  document.body.appendChild(pop); pop.style.left=Math.min(innerWidth-300,e.clientX)+'px'; pop.style.top=(e.clientY+12)+'px';
  pop.querySelector('#tpOk').onclick=()=>{ onSave(+pop.querySelector('#tpR').value,pop.querySelector('#tpQ').value); pop.remove(); };
  if(onDel) pop.querySelector('#tpDel').onclick=()=>{ onDel(); pop.remove(); };
  setTimeout(()=>document.addEventListener('pointerdown',function f(ev){ if(!pop.contains(ev.target)){ pop.remove(); document.removeEventListener('pointerdown',f); } }),0);
}
function trChordEdit(i,e){ const s=TR.score, c=s.chords[i];
  trChordPopup(e,c,(root,qid)=>{ trPush(); s.chords[i]={...c,root,qid}; trRender(); },()=>{ trPush(); s.chords.splice(i,1); trRender(); }); }
function trChordAdd(at,e){ const s=TR.score, prev=scoreChordAt(s,at)||{root:s.key.pc,qid:'maj7'};
  trChordPopup(e,{...prev},(root,qid)=>{ trPush(); s.chords=s.chords.filter(c=>Math.abs(c.at-at)>1e-6); s.chords.push({at,root,qid}); s.chords.sort((a,b)=>a.at-b.at); trRender(); }); }

/* ---------------- playback, save, export, to Lines ---------------- */
function trPlayScore(){
  trStopAll(); const s=TR.score, spb=60/(s.tempo*TR.speed), t0=now()+.1, bus=TR.bus=newBus(); if(!bus) return; TR.playing=true;
  visibleMelody(s).forEach(n=>tone(n.midi,t0+n.gat*spb,Math.max(.08,n.gdur*spb*.92),94,'epiano',bus));
  s.chords.forEach((c,i)=>{ const end=s.chords[i+1]?s.chords[i+1].at:s.bars*4, t=chordObj(c);
    playChord(compUnder({root:t.root,q:t.q},58),t0+c.at*spb,(end-c.at)*spb*.95,'mellow',bus,42); tone(36+mod12(c.root-36),t0+c.at*spb,(end-c.at)*spb*.95,56,'mellow',bus); });
  const end=t0+s.bars*4*spb, step=()=>{ const b=(now()-t0)/spb; trPlayhead(null,b); if(now()<end) TR.raf=requestAnimationFrame(step); else TR.playing=false; };
  TR.raf=requestAnimationFrame(step);
}
function trPlayhead(sec,beat){ const h=$('trHead'); if(!h) return;
  if(beat==null&&TR.res&&sec!=null){ const toB=beatMapper(fillBeats(TR.res.beats,TR.res.duration),TR.shift||0); beat=toB(sec-TR.sel[0]); }
  if(beat==null) return; const x=beat*PXB; h.setAttribute('x1',x); h.setAttribute('x2',x);
  const roll=$('trRoll'); if(roll&&(x<roll.scrollLeft||x>roll.scrollLeft+roll.clientWidth-40)) roll.scrollLeft=x-60; }
function trSave(){
  const s=TR.score, item={...s,saved:Date.now()};
  if(TR.saved!=null&&TRDATA.list[TR.saved]) TRDATA.list[TR.saved]=item; else { TRDATA.list.unshift(item); TR.saved=0; if(TRDATA.list.length>40) TRDATA.list.pop(); }
  saveTr(); trMsg('Saved. Find it under Saved transcriptions.','ok');
}
function trDownload(data,ext,type){
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([data],{type})); a.download=(TR.score.title||'transcription').replace(/[\\/:*?"<>|]/g,'')+'.'+ext;
  document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },500);
}
// Selected notes become a lick in Lines, with the chords under them
function trToLick(){
  const s=TR.score, sel=[...TR.selected].sort((a,b)=>a-b).map(i=>s.melody[i]).filter(Boolean);
  if(sel.length<3||sel.length>16) return trMsg('Select 3 to 16 notes in the piano roll first (drag a box around them).','no');
  const start=Math.floor(sel[0].gat), end=Math.max(...sel.map(n=>n.gat+n.gdur)), c0=scoreChordAt(s,sel[0].gat)||{root:s.key.pc,qid:'maj7'};
  const chs=[c0,...s.chords.filter(c=>c.at>sel[0].gat+1e-6&&c.at<end-1e-6)], r0=chordObj(c0).root;
  const ch=chs.map((c,i)=>{ const r=chordObj(c).root, at=Math.max(start,i?c.at:start), next=i<chs.length-1?chs[i+1].at:Math.ceil(end);
    return [mod7(r.l-r0.l),mod12(c.root-c0.root),c.qid,Math.max(.5,next-at)]; });
  const lick=Lk('u'+Date.now(),`${s.title}, bar ${start/4+1|0}`,2,'Yours',ch,sel.map(n=>[n.midi-60-c0.root,n.gdur,n.gat-start]));
  lick.user=true; lick.tip=`From your transcription of ${s.title}.`; applyRatings([],[lick]); LDATA.user.push(lick); saveLines();
  trMsg(`Saved to Lines as "${lick.name}" (${lick.diff===1?'Easy':lick.diff===2?'Medium':'Hard'}). It's under Yours.`,'ok');
}
const mod7=x=>((x%7)+7)%7;
function trToMenu(){ trStopAll(); TR.active=false; $('transStage').hidden=true; document.body.classList.remove('trmode'); side='home'; $('startOv').hidden=false; document.body.classList.add('menu'); renderMenu(); }
function trKey(e){
  if(!TR.active) return false;
  if(e.target&&['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return true;
  if(e.key==='Escape'){ document.querySelectorAll('.trpop').forEach(x=>x.remove()); TR.step==='edit'||TR.step==='setup'?trOpen():trToMenu(); return true; }
  if(TR.step!=='edit') return true;
  const s=TR.score, sel=[...TR.selected];
  if(e.key===' '){ e.preventDefault(); TR.playing?trStopAll():trPlayScore(); return true; }
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='z'){ e.preventDefault(); trUndo(); return true; }
  if((e.key==='Delete'||e.key==='Backspace')&&sel.length){ trPush(); s.melody=s.melody.filter((n,i)=>!TR.selected.has(i)); TR.selected.clear(); trRender(); return true; }
  if((e.key==='ArrowUp'||e.key==='ArrowDown')&&sel.length){ e.preventDefault(); trPush(); const d=(e.key==='ArrowUp'?1:-1)*(e.shiftKey?12:1); sel.forEach(i=>s.melody[i].midi+=d); trRender(); return true; }
  return true; // nothing else in Jun Jam reacts to keys while transcribing
}
