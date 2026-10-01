/* Transcribe: mp3 in, editable sheet music out. The helper (tools/transcriber) does the listening on this Mac;
   this screen imports the recording, asks what you want to see, sends the selection, and lets you fix the result. */
const TR_URL='http://127.0.0.1:8771';
let TRDATA=store.get('trans',{list:[]});
const saveTr=()=>store.set('trans',TRDATA);
const TR={active:false,timing:store.get('trTiming','beat'),backing:store.get('trBacking',true)};

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
    <div class="trhome"><button class="ghost" id="trRec" style="margin-left:0">Record from a tab</button><span>Playing it on YouTube or anywhere else in Chrome? Capture that tab's sound while you play the part you want.</span></div>
    ${TRDATA.list.length?`<div class="sec" style="margin-top:14px">Saved transcriptions</div><div class="licks">${TRDATA.list.map((t,i)=>`<button class="lick" data-open="${i}"><span class="ln">${t.mode==='lead'?'Lead sheet':(TR_INSTRUMENTS[t.instrument]||{}).name+(t.texture==='full'?' with chords':' line')} · ${t.bars} bars</span><span class="lt">${t.title}</span><span class="lst">♩ = ${t.tempo}, ${keyName(t.key.pc,t.key.minor)}</span><span class="del" data-del="${i}" title="Delete">×</span></button>`).join('')}</div>`:''}
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
    if(e.target.id==='trRecheck') trCheck(); if(e.target.id==='trRec') trTabRecord(); };
  trCheck();
}
async function trCheck(){
  const ok=await trHelperOk(); TR.helper=ok; if(!$('trStatus')) return;
  $('trStatus').textContent=ok?'Helper ready':'Helper not running'; $('trStatus').className=ok?'trok':'trno';
  if($('trGuide')) $('trGuide').innerHTML=ok?'':trInstallGuide();
  if($('trGo')) $('trGo').disabled=!ok;
}

/* ---------------- record from a tab: Chrome's tab sharing, audio only ---------------- */
async function trTabRecord(){
  let stream;
  try{ stream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:true,preferCurrentTab:false,selfBrowserSurface:'exclude',surfaceSwitching:'include'}); }
  catch(e){ $('trStatus').textContent='Recording cancelled.'; return; }
  const audio=stream.getAudioTracks();
  if(!audio.length){ stream.getTracks().forEach(t=>t.stop()); $('trStatus').textContent='No sound came through. Choose a Chrome tab and tick "Also share tab audio".'; $('trStatus').className='trno'; return; }
  stream.getVideoTracks().forEach(t=>t.enabled=false); // only the sound is used
  const rec=new MediaRecorder(new MediaStream(audio),{mimeType:MediaRecorder.isTypeSupported('audio/webm;codecs=opus')?'audio/webm;codecs=opus':'audio/webm'}), chunks=[];
  const t0=performance.now(), MAX=6*60*1000;
  rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  const finish=()=>{ if(rec.state!=='inactive') rec.stop(); };
  rec.onstop=async()=>{ clearInterval(tick); stream.getTracks().forEach(t=>t.stop());
    const blob=new Blob(chunks,{type:rec.mimeType}); if(blob.size<2000){ trOpen(); return; }
    const when=new Date(), file=new File([blob],`Tab recording ${when.getHours()}.${String(when.getMinutes()).padStart(2,'0')}.webm`,{type:rec.mimeType});
    await trLoad(file); TR.sel=[0,TR.buf.duration]; trDrawWave(); };
  audio[0].onended=finish; // the person pressed Chrome's own Stop sharing
  // a level meter, so it's obvious the sound is coming through
  const ac=synth.ctx, an=ac.createAnalyser(); an.fftSize=512; ac.createMediaStreamSource(new MediaStream(audio)).connect(an); const buf=new Uint8Array(an.fftSize);
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">Recording the tab</span><span class="trno">● REC <span id="trRecT">0:00</span></span></div>
    <p class="rhwhat">Play the part you want in the other tab. A few seconds before and after is fine; you'll trim it next.</p>
    <div class="trmeter"><i id="trLvl"></i></div>
    <p class="fine">Jun Jam only hears that tab while this screen is open, and the recording stays on this Mac. Up to 6 minutes.</p>
    <div class="erow"><button class="go" id="trRecStop">Stop and use it</button><button class="ghost" id="trRecCancel">Cancel</button></div>`;
  $('trRecStop').onclick=finish; $('trRecCancel').onclick=()=>{ chunks.length=0; finish(); };
  const tick=setInterval(()=>{ const ms=performance.now()-t0; if($('trRecT')) $('trRecT').textContent=fmtT(ms/1000).replace(/\..$/,'');
    an.getByteTimeDomainData(buf); let pk=0; for(const v of buf) pk=Math.max(pk,Math.abs(v-128)); if($('trLvl')) $('trLvl').style.width=Math.min(100,pk/128*160)+'%';
    if(ms>MAX) finish(); },100);
  rec.start(500);
}

/* ---------------- setup: waveform, region, what you want to see ---------------- */
async function trLoad(file){
  const c=synth.ctx, say=t=>{ const st=$('trStatus'); if(st) st.textContent=t; else $('trBody').innerHTML=`<p class="lmsg no">${t}</p><div class="erow"><button class="go" onclick="trOpen()">Back</button></div>`; };
  say('Reading the file…');
  let buf; try{ buf=await c.decodeAudioData(await file.arrayBuffer()); }catch(e){ say("Couldn't read that file. Try an mp3, m4a or wav."); return; }
  if(TR.url) URL.revokeObjectURL(TR.url);
  Object.assign(TR,{step:'setup',buf,file,url:URL.createObjectURL(file),title:file.name.replace(/\.[^.]+$/,''),sel:[0,Math.min(buf.duration,30)],mode:'solo',instrument:'piano',texture:'full'});
  trSetupRender();
}
const fmtT=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}.${Math.floor((s%1)*10)}`;
function trSetupRender(){
  const T=TR;
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">${T.title.replace(/</g,'&lt;')}</span><span id="trStatus"></span></div>
    <div class="sec">1. What do you want to see?</div>
    <div class="trmodes"><button class="trpick" data-mode="solo" aria-pressed="${T.mode==='solo'}"><b>Solo transcription</b><span>One instrument's line, note for note, with the chords under it.</span></button>
      <button class="trpick" data-mode="lead" aria-pressed="${T.mode==='lead'}"><b>Lead sheet</b><span>The tune's melody and chord changes. Mark solo sections afterwards to leave them out.</span></button></div>
    <div class="irow">${T.mode==='solo'?`<span>Instrument</span><select id="trInst">${Object.entries(TR_INSTRUMENTS).map(([k,v])=>`<option value="${k}"${k===T.instrument?' selected':''}>${v.name}</option>`).join('')}</select>
      ${TR_INSTRUMENTS[T.instrument].full?`<div class="seg" role="group"><button data-tex="line" aria-pressed="${T.texture==='line'}">Single line</button><button data-tex="full" aria-pressed="${T.texture==='full'}">With chords${TR_INSTRUMENTS[T.instrument].grand?' (both hands)':''}</button></div>`:''}`:'<span>The melody is taken from the vocals, or the lead instrument if there are none.</span>'}</div>
    <div class="sec">2. Select the part to transcribe <span class="fine" id="trSelT"></span></div>
    <div class="trwavewrap" id="trWaveWrap"><canvas class="trwave" id="trWave" height="110"></canvas>
      <i class="trhandle" id="trH0" title="Drag to set the start"></i><i class="trhandle" id="trH1" title="Drag to set the end"></i><i class="trwhead" id="trWHead"></i></div>
    <div class="erow"><button class="ghost" id="trPlaySel">Play selection</button><button class="ghost" id="trAll">Whole song</button>
      <div class="seg" role="group">${[[.5,'50%'],[.75,'75%'],[1,'100%']].map(([v,t])=>`<button data-rate="${v}" aria-pressed="${(T.rate||1)===v}">${t}</button>`).join('')}</div></div>
    <p class="fine">Drag the two handles to set the start and end (or click the waveform to move the nearest one). About 30 to 90 seconds works best for a solo.</p>
    <div class="erow"><button class="go" id="trGo">Transcribe</button><button class="ghost" id="trBack">Back</button></div>`;
  $('trBack').onclick=trOpen; $('trGo').onclick=trRun;
  $('trBody').querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ T.mode=b.dataset.mode; trSetupRender(); });
  $('trBody').querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ T.rate=+b.dataset.rate; trSetupRender(); });
  if($('trInst')) $('trInst').onchange=e=>{ T.instrument=e.target.value; trSetupRender(); };
  $('trBody').querySelectorAll('[data-tex]').forEach(b=>b.onclick=()=>{ T.texture=b.dataset.tex; trSetupRender(); });
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
  const pc=x=>(x/T.buf.duration*100)+'%'; if($('trH0')){ $('trH0').style.left=pc(T.sel[0]); $('trH1').style.left=pc(T.sel[1]); }
}
// Two handles, start and end; clicking the waveform moves the nearer one there
function trWaveDrag(){
  const wrap=$('trWaveWrap'); let which=null;
  const at=e=>{ const r=wrap.getBoundingClientRect(); return Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*TR.buf.duration; };
  const set=(w,t)=>{ if(w===0) TR.sel[0]=Math.min(t,TR.sel[1]-.5); else TR.sel[1]=Math.max(t,TR.sel[0]+.5); trDrawWave(); };
  wrap.onpointerdown=e=>{ const t=at(e); which=e.target.id==='trH0'?0:e.target.id==='trH1'?1:(Math.abs(t-TR.sel[0])<Math.abs(t-TR.sel[1])?0:1);
    set(which,t); wrap.setPointerCapture(e.pointerId); e.preventDefault(); };
  wrap.onpointermove=e=>{ if(which!==null) set(which,at(e)); };
  wrap.onpointerup=()=>{ which=null; };
}
// The original recording, through an audio element so it can slow down without changing pitch
function trPlayOriginal(from,to){
  trStopAll(); if(!TR.url) return;
  const au=TR.audio||(TR.audio=new Audio()); if(au.src!==TR.url) au.src=TR.url;
  au.preservesPitch=true; au.playbackRate=TR.rate||1; au.currentTime=from; au.play();
  clearInterval(TR.audioTimer); TR.audioTimer=setInterval(()=>{ if(au.currentTime>=to){ au.pause(); clearInterval(TR.audioTimer); } trPlayhead(au.currentTime);
    const wh=$('trWHead'); if(wh&&TR.buf){ wh.style.left=(au.currentTime/TR.buf.duration*100)+'%'; wh.style.display=au.paused?'none':'block'; } },40);
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
    <p class="rhwhat">Listening… <span id="trEl">0</span> s</p><p class="fine">Finding the notes and the beat in the whole recording, then picking out the line and the chords. Usually a few seconds; longer the very first time.</p>
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
    T.res=res;
    // full parts start on 'Fewer' (every real chord note is still found, with less junk); single lines on 'Normal'
    const sc=buildScore(res,{mode:T.mode,instrument:T.mode==='lead'?'voice':T.instrument,title:T.title,texture:T.texture,sens:T.mode==='solo'&&T.texture==='full'?1:2}); T.shift=sc.shift;
    trEdit(sc,res,null);
  }catch(e){ clearInterval(tick); if(e.name==='AbortError') return; $('trBody').innerHTML=`<p class="lmsg no">${String(e.message||e).replace(/</g,'&lt;')}</p><div class="erow"><button class="go" id="trBack">Back</button></div>`; $('trBack').onclick=trSetupRender; }
}

/* ---------------- the editor ---------------- */
const PXB=46, ROW=11, RULER=16, LANE=26; // the ruler (beat numbers, click to set beat 1) sits above the chord lane
function trEdit(score,res,savedIndex){
  trStopAll(); Object.assign(TR,{active:true,step:'edit',score,res:res||TR.res||null,saved:savedIndex,sel:TR.sel,undo:[],selected:new Set(),rate:TR.rate||1,speed:1});
  if(!res){ TR.res=null; } // reopened from the list: no audio, no re-analysis
  $('trBody').innerHTML=`<div class="etop"><span class="etitle" id="trTitle"></span><span id="trInfo"></span></div>
    <div class="erow trtools"><button class="go" id="trPlay">Play (Space)</button>${TR.url&&TR.res?'<button class="ghost" id="trOrig">Original</button>':''}<button class="ghost" id="trStop">Stop</button>
      <div class="seg" role="group">${[[.5,'50%'],[.75,'75%'],[1,'100%']].map(([v,t])=>`<button data-speed="${v}" aria-pressed="${TR.speed===v}">${t}</button>`).join('')}</div>
      ${TR.res?'<button class="ghost" id="trShiftL" title="Move the bar lines one beat earlier">◀ bar line</button><button class="ghost" id="trShiftR" title="One beat later">bar line ▶</button>':''}
      <button class="ghost" id="trUndo">Undo</button>${TR.buf&&TR.res?'<button class="ghost" id="trSettings">← Settings</button>':''}</div>
    ${TR.res?`<div class="erow trtools"><span class="fine">Notes</span><div class="seg" role="group">${['Fewest','Fewer','Normal','More','Most'].map((t,i)=>`<button data-sens="${i}" aria-pressed="${(score.sens??2)===i}">${t}</button>`).join('')}</div>
      <span class="fine">Tempo</span><div class="seg" role="group">${[[.5,'Half time'],[1,'As heard'],[2,'Double time']].map(([v,t])=>`<button data-bs="${v}" aria-pressed="${(score.beatScale||1)===v}">${t}</button>`).join('')}</div></div>`:''}
    <div class="erow trtools"><span class="fine">Timing</span><div class="seg" role="group"><button data-tm="played" aria-pressed="${TR.timing==='played'}" title="Notes where they were really played, over the recording">As played</button><button data-tm="beat" aria-pressed="${TR.timing!=='played'}" title="Notes on the beat grid, like the sheet music">On the beat</button></div>
      <button class="ghost" id="trBacking" aria-pressed="${!!TR.backing}" title="Chords and bass under the notes when you press Play">Backing chords: ${TR.backing?'on':'off'}</button></div>
    <div class="trscore" id="trScore"></div>
    <div class="sec">Edit: drag notes to move them, drag their right edge to change length, double-click to add, Delete to remove, ↑/↓ to transpose. Click a chord to change it.${TR.res?' Beat 1 in the wrong place? Click the beat number that should be 1.':''}</div>
    <div class="trroll" id="trRoll"></div>
    <div class="lmsg" id="trMsg"></div>
    <div class="erow"><button class="go" id="trSave">Save</button><button class="ghost" id="trXml">Export MusicXML</button><button class="ghost" id="trMid">Export MIDI</button><button class="ghost" id="trLick">Selected notes → Lines</button><button class="ghost" id="trClose">Close</button></div>`;
  const B=$('trBody');
  $('trPlay').onclick=()=>trPlayScore(); $('trStop').onclick=trStopAll; if($('trOrig')) $('trOrig').onclick=()=>trPlayOriginal(TR.sel[0],TR.sel[1]);
  B.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{ TR.speed=+b.dataset.speed; TR.rate=TR.speed; B.querySelectorAll('[data-speed]').forEach(x=>x.setAttribute('aria-pressed',x===b)); });
  if($('trShiftL')){ $('trShiftL').onclick=()=>trReshift(-1); $('trShiftR').onclick=()=>trReshift(1); }
  if($('trSettings')) $('trSettings').onclick=()=>{ trStopAll(); TR.step='setup'; trSetupRender(); };
  B.querySelectorAll('[data-sens]').forEach(b=>b.onclick=()=>trRebuild({sens:+b.dataset.sens},`Notes: ${b.textContent.toLowerCase()}.`));
  B.querySelectorAll('[data-bs]').forEach(b=>b.onclick=()=>trRebuild({beatScale:+b.dataset.bs,shift:null},b.dataset.bs==='1'?'Tempo as heard.':`Read in ${b.textContent.toLowerCase()}.`));
  B.querySelectorAll('[data-tm]').forEach(b=>b.onclick=()=>{ trStopAll(); TR.timing=b.dataset.tm; store.set('trTiming',TR.timing); B.querySelectorAll('[data-tm]').forEach(x=>x.setAttribute('aria-pressed',x===b)); trRender();
    trMsg(TR.timing==='played'?'As played: every note where it was really played, over the recording. Edits here move the sheet music too.':'On the beat: notes on the grid, like the sheet music.'); });
  $('trBacking').onclick=()=>{ TR.backing=!TR.backing; store.set('trBacking',TR.backing); $('trBacking').setAttribute('aria-pressed',TR.backing); $('trBacking').textContent=`Backing chords: ${TR.backing?'on':'off'}`; if(TR.playing) trPlayScore(); };
  $('trUndo').onclick=trUndo; $('trSave').onclick=trSave; $('trXml').onclick=()=>trDownload(toMusicXML(TR.score),'musicxml','application/vnd.recordare.musicxml+xml');
  $('trMid').onclick=()=>trDownload(toMidiFile(TR.score,TR.timing==='played'?trMaps():null),'mid','audio/midi'); $('trLick').onclick=trToLick; $('trClose').onclick=trOpen;
  trRender();
}
function trRender(){ trFillSec(); trInfo(); trScoreView(); trRollView(); const m=$('trMid'); if(m) m.textContent=TR.timing==='played'?'Export MIDI (as played)':'Export MIDI'; }
// Beats ↔ seconds for the score on screen, and the As played view's scale (as wide per second as a beat is at this tempo)
const trMaps=()=>scoreMaps(TR.res,{...TR.score,shift:TR.score.shift??TR.shift});
const trPlayed=()=>TR.timing==='played';
const trPXS=()=>PXB*(TR.score.tempo||100)/60;
// notes added or saved before seconds were kept get them from the grid
function trFillSec(){ const mp=trMaps(); TR.score.melody.forEach(n=>{ if(n.sec==null){ n.sec=Math.max(0,mp.toSec(n.gat)); n.dsec=Math.max(.05,mp.toSec(n.gat+n.gdur)-n.sec); } }); }
function trInfo(){ const s=TR.score;
  $('trTitle').textContent=s.title; $('trInfo').textContent=`${s.mode==='lead'?'Lead sheet':s.texture==='full'?'Full part':'Solo line'} · ♩ = ${s.tempo} · ${keyName(s.key.pc,s.key.minor)} · ${s.bars} bars · ${s.melody.length} notes`; }
// Undo keeps whole snapshots (notes, chords, bars, tempo, the Notes and Tempo settings, beat 1)
function trPush(){ TR.undo.push(JSON.stringify({score:TR.score,sh:TR.shift})); if(TR.undo.length>80) TR.undo.shift(); }
function trUndo(){ const u=TR.undo.pop(); if(!u) return; const o=JSON.parse(u); TR.score=o.score; TR.shift=o.sh; TR.selected.clear();
  $('trBody').querySelectorAll('[data-sens]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.sens===(TR.score.sens??2)));
  $('trBody').querySelectorAll('[data-bs]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.bs===(TR.score.beatScale||1)));
  trRender(); }
// Re-read the helper's answer with different settings (fewer or more notes, half or double time); undo goes back
function trRebuild(over,msg){ if(!TR.res) return; trPush(); const s=TR.score;
  const opts={mode:s.mode,instrument:s.instrument,title:s.title,texture:s.texture||'line',sens:s.sens??2,beatScale:s.beatScale||1,shift:TR.shift,...over};
  TR.score={...buildScore(TR.res,opts),soloBars:s.soloBars}; TR.shift=TR.score.shift; TR.selected.clear();
  $('trBody').querySelectorAll('[data-sens]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.sens===TR.score.sens));
  $('trBody').querySelectorAll('[data-bs]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.bs===TR.score.beatScale));
  trRender(); trMsg(msg); }
function trSetBeat1(beat){ if(!TR.res) return; const k=mod12(beat)%4; if(!k) return; let sh=(TR.shift||0)+k; while(sh>0) sh-=4; trApplyShift(sh,`Beat 1 set. The score is redrawn from there.`); }
function trApplyShift(sh,msg){ trPush(); TR.shift=sh; const s=TR.score;
  TR.score={...buildScore(TR.res,{mode:s.mode,instrument:s.instrument,shift:TR.shift,title:s.title,texture:s.texture||'line',sens:s.sens??2,beatScale:s.beatScale||1}),soloBars:s.soloBars}; TR.selected.clear(); trRender(); trMsg(msg); }
function trReshift(d){ if(!TR.res) return; let sh=(TR.shift||0)+d; while(sh>0) sh-=4; while(sh<=-4) sh+=4; trApplyShift(sh,`Bar lines moved ${d<0?'earlier':'later'}.`); }
function trMsg(t,cls=''){ const m=$('trMsg'); if(m){ m.textContent=t; m.className='lmsg '+cls; } }

// Sheet music: four bars to a line, chord symbols above, notes spelled from their chords
function trScoreView(){
  const s=TR.score, vis=visibleMelody(s), lines=[];
  for(let b=0;b<s.bars;b+=4){
    const a=b*4, z=a+16, notes=vis.filter(n=>n.gat>=a-1e-6&&n.gat<z-1e-6).map(n=>{ const sp=spellIn(s,n.midi,n.gat);
      return {midi:n.midi,gat:n.gat-a,gdur:Math.min(n.gdur,z-n.gat),tri:n.tri,spell:{...sp,midi:n.midi},name:sp.name}; });
    const chords=s.chords.filter(c=>c.at>=a-1e-6&&c.at<z-1e-6).map(c=>({...chordObj(c),at:c.at-a}));
    const solo=(s.soloBars||[]).filter(x=>x>=b&&x<b+4);
    const svg=s.texture==='full'?grandStaffSVG({notes,chords,beats:16,grand:!!s.grand}):lineStaffSVG({notes,chords,total:16},-1,false);
    lines.push(`<div class="trline"><span class="trbar">${b+1}${solo.length?` · solo ${solo.map(x=>x+1).join(', ')}`:''}</span>${svg}</div>`);
  }
  $('trScore').innerHTML=lines.join('');
}
// Piano roll with a chord lane; everything editable
// x positions: on the beat, one beat is PXB wide; as played, the axis is the recording's seconds and the beats fall where they were heard
function trXs(){ const s=TR.score;
  if(!trPlayed()) return {bx:b=>b*PXB, nx:n=>n.gat*PXB, nw:n=>n.gdur*PXB, W:s.bars*4*PXB+20, b0:0, b1:s.bars*4};
  const mp=trMaps(), k=trPXS(), dur=Math.max(mp.duration||0,...s.melody.map(n=>n.sec+n.dsec),mp.toSec(s.bars*4));
  return {bx:b=>mp.toSec(b)*k, nx:n=>n.sec*k, nw:n=>n.dsec*k, W:Math.ceil(dur*k)+20, b0:Math.max(-4,Math.ceil(mp.toBeat(0)-1e-6)), b1:Math.floor(mp.toBeat(dur)), mp, k, dur};
}
// the recording under the As played roll, as one path (cached: redraws happen on every drag step)
function trWavePath(W,dur,k,hgt){ const key=[W,dur,k,TR.sel&&TR.sel[0]].join('|'); if(TR.wave&&TR.wave.key===key) return TR.wave.d;
  let d=''; if(TR.buf){ const ch=TR.buf.getChannelData(0), sr=TR.buf.sampleRate, off=Math.round((TR.sel?TR.sel[0]:0)*sr), per=sr/k;
    for(let x=0;x<W-20;x++){ let mx=0; const a=off+Math.floor(x*per), z=Math.min(ch.length,off+Math.floor((x+1)*per)); for(let i=a;i<z;i+=8) mx=Math.max(mx,Math.abs(ch[i]));
      const h2=Math.max(.5,mx*hgt/2); d+=`M${x} ${(hgt/2-h2).toFixed(1)}v${(h2*2).toFixed(1)}`; } }
  TR.wave={key,d}; return d; }
const WAVE=34;
function trRollView(){
  const s=TR.score, mel=s.melody, ps=mel.map(n=>n.midi), lo=Math.min(...ps,60)-3, hi=Math.max(...ps,72)+3, X=trXs(), {bx,nx,nw,W}=X, pl=trPlayed();
  const WV=pl?WAVE:0, HH=RULER+WV+LANE, LY=RULER+WV, H=(hi-lo+1)*ROW, y=m=>(hi-m)*ROW;
  // header (beat ruler, the recording when as played, chord lane) stays pinned while the notes scroll underneath
  let h=`<svg id="trHeadSvg" width="${W}" height="${HH}" viewBox="0 0 ${W} ${HH}">`;
  for(let b=X.b0;b<X.b1;b++){ const one=mod12(b)%4===0, x0=bx(b), w=bx(b+1)-x0;
    h+=`<rect x="${x0}" y="0" width="${w}" height="${RULER}" class="rruler${one?' one':''}" data-beat="${b}"><title>${TR.res?'Click to make this beat 1':''}</title></rect><text x="${x0+4}" y="12" class="rbeatn${one?' one':''}">${b<0?'':one?(b/4+1)+'.':''}${b<0?'·':mod12(b)%4+1}</text>`; }
  if(pl){ h+=`<rect x="0" y="${RULER}" width="${W}" height="${WV}" class="rwavebg"/><g transform="translate(0 ${RULER})"><path d="${trWavePath(W,X.dur,X.k,WV)}" class="rwave"/></g>`;
    for(let t=0;t<X.dur;t+=5) h+=`<text x="${t*X.k+3}" y="${RULER+WV-3}" class="rsec">${fmtT(t).slice(0,-2)}</text>`; }
  for(let b=0;b<s.bars;b++){ const solo=(s.soloBars||[]).includes(b), x0=bx(b*4), w=bx(b*4+4)-x0;
    h+=`<rect x="${x0}" y="${LY}" width="${w}" height="${LANE}" class="rlane${solo?' solo':''}" data-bar="${b}"/>`+(s.mode==='lead'?`<text x="${x0+w-4}" y="${LY+16}" text-anchor="end" class="rsolo" data-solo="${b}">${solo?'solo ✓':'solo?'}</text>`:''); }
  s.chords.forEach((c,i)=>{ h+=`<text x="${bx(c.at)+3}" y="${LY+17}" class="rchord" data-chord="${i}">${symText(chordObj(c))}</text>`; });
  h+='</svg>';
  let g=`<svg id="trSvg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  for(let m=lo;m<=hi;m++) g+=`<rect x="0" y="${y(m)}" width="${W}" height="${ROW}" class="${isBlack(m)?'rbk':'rwh'}"/>${m%12===0?`<text x="2" y="${y(m)+ROW-2}" class="rlab">C${m/12-1}</text>`:''}`;
  for(let b=X.b0;b<=X.b1;b++) g+=`<line x1="${bx(b)}" x2="${bx(b)}" y1="0" y2="${H}" class="${mod12(b)%4===0?'rbar':'rbeat'}"/>`;
  mel.forEach((n,i)=>{ const hid=(s.soloBars||[]).includes(Math.floor(n.gat/4+1e-6));
    g+=`<rect x="${nx(n)+1}" y="${y(n.midi)+1}" width="${Math.max(4,nw(n)-2)}" height="${ROW-2}" rx="2" class="rnote${TR.selected.has(i)?' sel':''}${hid?' hid':''}" data-i="${i}"><title>${plainSpell(n.midi).name}${Math.floor(n.midi/12)-1}, bar ${Math.floor(n.gat/4)+1} beat ${+(n.gat%4+1).toFixed(2)}${n.sec!=null?`, played at ${n.sec.toFixed(2)} s`:''}</title></rect>`; });
  g+=`<line id="trHead" x1="-5" x2="-5" y1="0" y2="${H}" class="rhead"/></svg>`;
  // the keyboard down the side, like a DAW: every key, names on the C's and on rows that hold selected notes
  const KW=46, selP=new Set([...TR.selected].map(i=>mel[i]&&mel[i].midi)), usedP=new Set(ps);
  let k=`<svg id="trKeys" width="${KW}" height="${H}" viewBox="0 0 ${KW} ${H}">`;
  for(let m=lo;m<=hi;m++){ const blk=isBlack(m), nm=plainSpell(m).name+(Math.floor(m/12)-1);
    k+=`<rect x="0" y="${y(m)}" width="${blk?KW*.62:KW}" height="${ROW}" class="${blk?'kbk':'kwh'}${selP.has(m)?' ksel':usedP.has(m)?' kuse':''}" data-key="${m}"><title>${nm}</title></rect>`;
    if(m%12===0||selP.has(m)) k+=`<text x="${KW-3}" y="${y(m)+ROW-2}" text-anchor="end" class="klab${selP.has(m)?' on':''}">${nm}</text>`; }
  k+='</svg>';
  const roll=$('trRoll'), keepT=roll.scrollTop, keepL=roll.scrollLeft, firstDraw=!TR.roll||TR.roll.score!==s, viewChanged=TR.roll&&TR.roll.pl!==pl, oldW=roll.scrollWidth;
  roll.innerHTML=`<div class="trgrid" style="grid-template-columns:${KW}px ${W}px"><div class="trcorner"></div><div class="trrollhead">${h}</div><div class="trkeys">${k}</div><div>${g}</div></div>`;
  TR.roll={lo,hi,y,score:s,X,pl}; roll.scrollTop=keepT; roll.scrollLeft=viewChanged?keepL*W/Math.max(1,oldW):keepL; // switching views keeps roughly the same place in view
  if(firstDraw&&ps.length){ const mid=ps.slice().sort((a,b)=>a-b)[ps.length>>1]; roll.scrollTop=Math.max(0,y(mid)+HH-roll.clientHeight/2); } // open centred on the notes
  trRollEvents();
}
// Dragging survives redraws: the drag lives in TR.drag and the window follows the pointer
const trPt=(e,el)=>{ const r=el.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; };
const trSnap=b=>Math.max(0,Math.round(b*4)/4);
// Edits keep both timings: as played, a note moves freely and its written place is re-snapped; on the beat, it snaps and keeps its feel (how early or late it was played)
window.addEventListener('pointermove',e=>{ const d=TR.drag, svg=$('trSvg'); if(!d||!svg||!TR.active) return; const s=TR.score, p=trPt(e,svg), px=p.x-d.p0.x, dy=Math.round((d.p0.y-p.y)/ROW);
  const pl=trPlayed(), mp=trMaps(), k=trPXS(), dx=px/PXB, ds=px/k;
  if(d.mode==='move') d.orig.forEach(o=>{ const midi=Math.max(21,Math.min(108,o.midi+dy));
    if(pl){ const sec=Math.max(0,o.sec+ds), gat=Math.abs(ds)<.01?o.gat:trSnap(mp.toBeat(sec)); s.melody[o.k]={...s.melody[o.k],midi,sec:Math.round(sec*1000)/1000,gat,tri:gat===o.gat&&o.tri}; }
    else { const gat=trSnap(o.gat+dx); s.melody[o.k]={...s.melody[o.k],midi,gat,sec:gat===o.gat?o.sec:Math.max(0,Math.round((o.sec+mp.toSec(gat)-mp.toSec(o.gat))*1000)/1000)}; } });
  else if(d.mode==='len') d.orig.forEach(o=>{
    if(pl){ const dsec=Math.max(.05,o.dsec+ds); s.melody[o.k]={...s.melody[o.k],dsec:Math.round(dsec*1000)/1000,gdur:Math.max(.25,trSnap(mp.toBeat(o.sec+dsec))-o.gat),tri:false}; }
    else { const gdur=Math.max(.25,trSnap(o.gdur+dx)); s.melody[o.k]={...s.melody[o.k],gdur,dsec:Math.max(.05,Math.round((mp.toSec(o.gat+gdur)-mp.toSec(o.gat))*1000)/1000),tri:false}; } });
  else { const x0=Math.min(p.x,d.p0.x), x1=Math.max(p.x,d.p0.x), y0=Math.min(p.y,d.p0.y), y1=Math.max(p.y,d.p0.y), X=TR.roll.X;
    TR.selected=new Set(s.melody.map((n,i)=>i).filter(i=>{ const n=s.melody[i], ny=TR.roll.y(n.midi)+ROW/2; return X.nx(n)<x1&&X.nx(n)+X.nw(n)>x0&&ny>y0&&ny<y1; })); }
  trRollView(); });
window.addEventListener('pointerup',()=>{ const d=TR.drag; if(!d) return; TR.drag=null; if(d.mode!=='box'&&d.moved!==false){ trTidy(); trRender(); } });
function trRollEvents(){
  const svg=$('trSvg'), head=$('trHeadSvg'), s=TR.score;
  const pt=(e,el=svg)=>trPt(e,el);
  const toPitch=py=>TR.roll.hi-Math.floor(py/ROW);
  const keys=$('trKeys'); if(keys) keys.onpointerdown=e=>{ const k=e.target.closest('[data-key]'); if(k){ const m=+k.dataset.key; synth.init(); synth.on(m,80); setTimeout(()=>synth.off(m,.3),300); } };
  head.onpointerdown=e=>{
    const rEl=e.target.closest('[data-beat]'), cEl=e.target.closest('[data-chord]'), sEl=e.target.closest('[data-solo]');
    if(rEl){ trSetBeat1(+rEl.dataset.beat); return; }
    const beatAt=x=>trPlayed()?trMaps().toBeat(x/trPXS()):x/PXB;
    if(sEl){ trPush(); const b=+sEl.dataset.solo, sb=s.soloBars||(s.soloBars=[]); sb.includes(b)?sb.splice(sb.indexOf(b),1):sb.push(b); trRender(); return; }
    if(cEl){ trChordEdit(+cEl.dataset.chord,e); return; }
    if(e.target.closest('.rlane')){ trChordAdd(Math.max(0,Math.floor(beatAt(pt(e,head).x)/4)*4),e); return; }
  };
  svg.onpointerdown=e=>{
    const p=pt(e), nEl=e.target.closest('.rnote');
    if(nEl){ const i=+nEl.dataset.i, n=s.melody[i]; synth.init(); synth.on(n.midi,80); setTimeout(()=>synth.off(n.midi,.3),260); // hear it
      if(!e.shiftKey&&!TR.selected.has(i)) TR.selected.clear(); TR.selected.add(i);
      const edge=p.x>TR.roll.X.nx(n)+TR.roll.X.nw(n)-7;
      trPush(); TR.drag={mode:edge?'len':'move',p0:p,orig:[...TR.selected].map(k=>({k,...s.melody[k]}))};
      trRollView(); e.preventDefault(); return; }
    TR.selected.clear(); TR.drag={mode:'box',p0:p}; e.preventDefault();
  };
  svg.ondblclick=e=>{ if(e.target.closest('.rnote')) return; const p=pt(e); trPush();
    const mp=trMaps(), sec=trPlayed()?p.x/trPXS():null, at=trPlayed()?trSnap(mp.toBeat(sec)):Math.floor(p.x/PXB*4)/4, m=toPitch(p.y);
    const s0=sec??Math.max(0,mp.toSec(at)); s.melody.push({midi:m,gat:at,gdur:.5,tri:false,sec:Math.round(s0*1000)/1000,dsec:Math.max(.05,Math.round((mp.toSec(at+.5)-mp.toSec(at))*1000)/1000)}); trTidy(); TR.selected=new Set([s.melody.findIndex(n=>n.gat===at&&n.midi===m)]); trRender(); };
}
// keep notes in time order; a single line can't run into its next note (full parts can overlap: chords and held notes)
function trTidy(){ const m=TR.score.melody; const sel=[...TR.selected].map(i=>m[i]); m.sort((a,b)=>a.gat-b.gat||b.midi-a.midi);
  if(TR.score.texture!=='full') for(let i=0;i<m.length-1;i++){ if(m[i].gat+m[i].gdur>m[i+1].gat) m[i].gdur=Math.max(.05,m[i+1].gat-m[i].gat);
    if(m[i].sec!=null&&m[i+1].sec!=null&&m[i].sec<m[i+1].sec&&m[i].sec+m[i].dsec>m[i+1].sec) m[i].dsec=Math.max(.03,m[i+1].sec-m[i].sec); }
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
// On the beat: steady tempo from the grid. As played: every note when it was really played (the recording's own timing)
function trPlayScore(){
  trStopAll(); const s=TR.score, pl=trPlayed(), mp=trMaps(), spb=60/(s.tempo*TR.speed), t0=now()+.1, bus=TR.bus=newBus(); if(!bus) return; TR.playing=true;
  const when=b=>pl?Math.max(0,mp.toSec(b))/TR.speed:b*spb; // seconds after the start
  visibleMelody(s).forEach(n=>{ const a=pl?n.sec/TR.speed:n.gat*spb, d=pl?n.dsec/TR.speed:n.gdur*spb*.92; tone(n.midi,t0+a,Math.max(.08,d),94,'epiano',bus); });
  if(TR.backing) s.chords.forEach((c,i)=>{ const a=when(c.at), z=when(s.chords[i+1]?s.chords[i+1].at:s.bars*4), t=chordObj(c);
    playChord(compUnder({root:t.root,q:t.q},58),t0+a,(z-a)*.95,'mellow',bus,42); tone(36+mod12(c.root-36),t0+a,(z-a)*.95,56,'mellow',bus); });
  const last=Math.max(when(s.bars*4),...(pl?s.melody.map(n=>(n.sec+n.dsec)/TR.speed):[0])), end=t0+last;
  const step=()=>{ const el=now()-t0; pl?trPlayhead(el*TR.speed+(TR.sel?TR.sel[0]:0)):trPlayhead(null,el/spb); if(now()<end) TR.raf=requestAnimationFrame(step); else TR.playing=false; };
  TR.raf=requestAnimationFrame(step);
}
// sec: a time in the whole recording (the original playing); beat: a place in the score
function trPlayhead(sec,beat){ const h=$('trHead'); if(!h||!TR.score) return; let x;
  if(sec!=null){ const t=sec-(TR.sel?TR.sel[0]:0); x=trPlayed()?t*trPXS():TR.res?trMaps().toBeat(t)*PXB:null; }
  else if(beat!=null) x=beat*PXB;
  if(x==null) return; h.setAttribute('x1',x); h.setAttribute('x2',x);
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
  const s=TR.score; let sel=[...TR.selected].sort((a,b)=>a-b).map(i=>s.melody[i]).filter(Boolean);
  if(s.texture==='full') sel=sel.filter((n,i,a)=>!a.some(o=>o!==n&&Math.abs(o.gat-n.gat)<1e-6&&o.midi>n.midi)); // a lick is one line: the top note of each chord
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
