/* Transcribe: mp3 in, editable sheet music out. The helper (tools/transcriber) does the listening on this Mac;
   this screen imports the recording, asks what you want to see, sends the selection, and lets you fix the result. */
const TR_URL='http://127.0.0.1:8771';
let TRDATA=store.get('trans',{list:[]});
const saveTr=()=>store.set('trans',TRDATA);
const TR={active:false,engine:store.get('trEngine','best'),timing:store.get('trTiming','beat'),backing:store.get('trBacking',true)};

/* ---------------- helper status and install guide ---------------- */
async function trHelperOk(){ try{ const c=new AbortController(); setTimeout(()=>c.abort(),1500); const r=await fetch(TR_URL+'/health',{signal:c.signal}), h=await r.json(); TR.health=h; return h.ok; }catch(e){ TR.health=null; return false; } }
// Best needs the extra models (helper version 2 with the piano model and YourMT3+); otherwise Quick is all there is
const trCanBest=()=>!!(TR.health&&TR.health.version>=2&&(TR.health.engines||[]).some(e=>e==='piano'||e==='yourmt3'));
function trProjectDir(){ if(location.protocol!=='file:') return null; const p=decodeURIComponent(location.pathname); return p.slice(0,p.lastIndexOf('/')); }
function trInstallGuide(){
  const dir=trProjectDir(), q=s=>`"${s}"`;
  const install=`bash ${q((dir||'/path/to/Jun Jam')+'/tools/transcriber/install.sh')}`;
  const start=`"$HOME/Library/Application Support/Jun Jam/transcriber-venv/bin/python" "$HOME/Library/Application Support/Jun Jam/server.py"`;
  const cmd=(t,id)=>`<div class="trcmd"><code id="${id}">${t.replace(/</g,'&lt;')}</code><button class="ghost" data-copy="${id}">Copy</button></div>`;
  return `<div class="trguide"><b>The transcriber helper isn't running.</b> Everything else in Jun Jam works without it; transcribing needs it once, on this Mac.
    <ol><li>Open <b>Terminal</b> (Cmd+Space, type Terminal) and paste this to install it (about 2 GB with the models, 5 to 15 minutes, one time only):${cmd(install,'trCmd1')}${dir?'':'<span class="fine">Replace /path/to/Jun Jam with the folder Jun Jam is in.</span>'}</li>
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
  if(ok&&TR.health.version<2){ $('trStatus').textContent='Helper is out of date: quit and reopen Jun Jam.app, or run the install again'; $('trStatus').className='trno'; }
  const bb=document.querySelector('#trBody [data-eng="best"]');
  if(bb){ bb.disabled=!trCanBest(); if(!trCanBest()&&TR.engine!=='quick') $('trEngNote').textContent='Best needs the newer helper: run the install command again (it adds two extra models, about 1 GB more). Quick works now.'; }
  if(TR.buf&&$('trEst')) trDrawWave();
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
// Setup: what to write, the instrument, how carefully to listen, and which part of the recording
const trSeg=(attr,items,cur)=>`<div class="seg" role="group">${items.map(([v,t,tip])=>`<button data-${attr}="${v}" aria-pressed="${cur===v}"${tip?` title="${tip}"`:''}>${t}</button>`).join('')}</div>`;
function trSetupRender(){
  const T=TR, inst=TR_INSTRUMENTS[T.instrument]||TR_INSTRUMENTS.piano, best=T.engine!=='quick';
  $('trBody').innerHTML=`<div class="trtop"><button class="ghost" id="trBack">← Back</button><span class="etitle">${T.title.replace(/</g,'&lt;')}</span><span id="trStatus"></span></div>
    <div class="trform">
      <label>Write it as</label><div class="trmodes"><button class="trpick" data-mode="solo" aria-pressed="${T.mode==='solo'}"><b>Solo transcription</b><span>One instrument's part, note for note, with the chords under it.</span></button>
        <button class="trpick" data-mode="lead" aria-pressed="${T.mode==='lead'}"><b>Lead sheet</b><span>The tune's melody and chord changes. Mark solo sections afterwards to leave them out.</span></button></div>
      ${T.mode==='solo'?`<label for="trInst">Instrument</label><div class="trctl"><select id="trInst">${Object.entries(TR_INSTRUMENTS).map(([k,v])=>`<option value="${k}"${k===T.instrument?' selected':''}>${v.name}</option>`).join('')}</select>
        ${inst.full?trSeg('tex',[['line','Single line','The top line only: the solo'],['full',`With chords${inst.grand?' (both hands)':''}`,'Every note, chords stacked'+(inst.grand?', on a grand staff':'')]],T.texture):''}</div>`
        :`<label>Melody</label><div class="trctl fine">Taken from the vocals, or the lead instrument if there are none.</div>`}
      <label>Listening</label><div class="trctl">${trSeg('eng',[['best','Best'],['quick','Quick']],best?'best':'quick')}<span class="fine" id="trEngNote">${best?'Three models listen and vote on every note.':'One model. A few seconds.'}</span></div>
      <label>Part</label><div><div class="trwavewrap" id="trWaveWrap"><canvas class="trwave" id="trWave" height="110"></canvas>
          <i class="trhandle" id="trH0" title="Drag to set the start"></i><i class="trhandle" id="trH1" title="Drag to set the end"></i><i class="trwhead" id="trWHead"></i></div>
        <div class="trctl"><button class="ghost" id="trPlaySel">▶ Play part</button><button class="ghost" id="trAll">Whole recording</button>
          <span class="fine">Speed</span>${trSeg('rate',[[.5,'50%'],[.75,'75%'],[1,'100%']],T.rate||1)}<span class="fine trright" id="trSelT"></span></div>
        <p class="fine">Drag the handles to set the start and end, or click the waveform to move the nearer one. 30 to 90 seconds works best for a solo.</p></div>
    </div>
    <div class="trgo"><span class="fine" id="trEst"></span><button class="go" id="trGo">Transcribe</button></div>`;
  $('trBack').onclick=()=>{ trStopAll(); trOpen(); }; $('trGo').onclick=trRun;
  $('trBody').querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ T.mode=b.dataset.mode; trSetupRender(); });
  $('trBody').querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ T.rate=+b.dataset.rate; if(TR.audio) TR.audio.playbackRate=T.rate; $('trBody').querySelectorAll('[data-rate]').forEach(x=>x.setAttribute('aria-pressed',x===b)); });
  if($('trInst')) $('trInst').onchange=e=>{ T.instrument=e.target.value; if(!TR_INSTRUMENTS[T.instrument].full) T.texture='line'; trSetupRender(); };
  $('trBody').querySelectorAll('[data-eng]').forEach(b=>b.onclick=()=>{ T.engine=b.dataset.eng; store.set('trEngine',T.engine); trSetupRender(); });
  $('trBody').querySelectorAll('[data-tex]').forEach(b=>b.onclick=()=>{ T.texture=b.dataset.tex; trSetupRender(); });
  $('trPlaySel').onclick=()=>{ if(TR.audio&&!TR.audio.paused) trStopAll(); else trPlayOriginal(T.sel[0],T.sel[1]); };
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
  if($('trEst')){ const d=T.sel[1]-T.sel[0], q=T.engine==='quick'||!trCanBest(); $('trEst').textContent=`About ${Math.max(q?3:10,Math.round(d*(q?.15:1.3)))} s`; }
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
  clearInterval(TR.audioTimer); TR.audioTimer=setInterval(()=>{ if(au.currentTime>=to){ au.pause(); clearInterval(TR.audioTimer); }
    const wh=$('trWHead'); if(wh&&TR.buf){ wh.style.left=(au.currentTime/TR.buf.duration*100)+'%'; wh.style.display=au.paused?'none':'block'; }
    const pb=$('trPlaySel'); if(pb) pb.textContent=au.paused?'▶ Play part':'■ Stop'; },40);
}
function trStopAll(){ if(TR.audio){ TR.audio.onplaying=null; TR.audio.pause(); } TR.token=(TR.token||0)+1; clearInterval(TR.audioTimer); killBus(TR.bus); TR.bus=null; cancelAnimationFrame(TR.raf); TR.playing=false; }

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
  const engine=T.engine==='quick'||!trCanBest()?'quick':'best', t0=performance.now();
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">${T.title.replace(/</g,'&lt;')}</span></div>
    <p class="rhwhat">Listening… <span id="trEl">0</span> s</p><p class="fine">${engine==='best'?`Taking the drums out, then three models listen and vote on every note. Usually about ${Math.max(10,Math.round((T.sel[1]-T.sel[0])*1.3))} s for this part; the first time also loads the models.`:'Taking the drums out and finding the notes and the beat. Usually a few seconds; longer the very first time.'}</p>
    <div class="erow"><button class="ghost" id="trCancel">Cancel</button></div>`;
  const tick=setInterval(()=>{ if($('trEl')) $('trEl').textContent=Math.round((performance.now()-t0)/1000); },500);
  const ctl=new AbortController(); $('trCancel').onclick=()=>{ ctl.abort(); clearInterval(tick); trSetupRender(); };
  try{
    const wav=await trWav(T.buf,T.sel[0],T.sel[1]);
    const r=await fetch(`${TR_URL}/transcribe?engine=${engine}`,{method:'POST',body:wav,signal:ctl.signal}), res=await r.json();
    clearInterval(tick);
    if(!res.ok) throw new Error(res.error||'The helper could not transcribe this.');
    T.res=smoothBeats(res);
    // full parts start on 'Fewer' (every real chord note is still found, with less junk); single lines on 'Normal'
    const sc=buildScore(T.res,{mode:T.mode,instrument:T.mode==='lead'?'voice':T.instrument,title:T.title,texture:T.texture,sens:T.mode==='solo'&&T.texture==='full'?1:2}); T.shift=sc.shift;
    trEdit(sc,T.res,null);
  }catch(e){ clearInterval(tick); if(e.name==='AbortError') return; $('trBody').innerHTML=`<p class="lmsg no">${String(e.message||e).replace(/</g,'&lt;')}</p><div class="erow"><button class="go" id="trBack">Back</button></div>`; $('trBack').onclick=trSetupRender; }
}

/* ---------------- the editor ---------------- */
const PXB=46, ROW=11, RULER=16, LANE=26; // the ruler (beat numbers, click to set beat 1) sits above the chord lane
/* The editor. Top: what it is, and Save / Export / Lines / Close. Under it a transport bar that stays in view
   (play, where you are, what you hear, loop, speed, undo). Then "Fix the reading" (re-reads the recording), the
   sheet music (click it to play from there) and the piano roll. Messages pop up at the bottom of the screen. */
function trEdit(score,res,savedIndex){
  trStopAll(); Object.assign(TR,{active:true,step:'edit',score,res:res||TR.res||null,saved:savedIndex,sel:TR.sel,undo:[],redo:[],selected:new Set(),rate:TR.rate||1,speed:1,posB:0,loop:null,looping:false,dirty:savedIndex==null,edited:false});
  if(!res){ TR.res=null; } // reopened from the list: no audio, no re-analysis
  const R=!!TR.res, A=!!(TR.url&&TR.res);
  $('trBody').innerHTML=`<div class="trtop">${TR.buf&&R?'<button class="ghost" id="trSettings" title="Back to what to write, instrument and part">← Settings</button>':''}
      <span class="etitle" id="trTitle" title="Click to rename"></span><span class="fine" id="trInfo"></span><span class="trspace"></span><span class="fine" id="trDirty"></span>
      <button class="go" id="trSave" title="Cmd+S">Save</button>
      <div class="trmenu"><button class="ghost" id="trExportBtn" aria-haspopup="true">Export ▾</button><div class="trmenulist" id="trExportList" hidden>
        <button data-exp="xml">MusicXML <span class="fine">MuseScore, Sibelius, Finale, Dorico</span></button><button data-exp="mid">MIDI, on the beat</button>${R?'<button data-exp="midp">MIDI, as played</button>':''}</div></div>
      <button class="ghost" id="trLick" title="Select 3 to 16 notes in the piano roll first">→ Lines</button><button class="ghost" id="trClose">Close</button></div>
    <div class="trbar" id="trBar">
      <button class="go trplay" id="trPlay" title="Play / pause (Space)">▶</button><button class="ghost" id="trStop" title="Stop, back to the start">■</button>
      <span class="trpos" id="trPos">1 · 1</span>
      ${A?`<span class="trgrp"><span class="fine">Hear</span>${trSeg('src',[['notes','Notes'],['orig','Recording'],['both','Both']],TR.src||'notes')}</span>`:''}
      <span class="trgrp"><span class="fine">Speed</span>${trSeg('speed',[[.5,'50%'],[.75,'75%'],[1,'100%']],TR.speed)}</span>
      <button class="ghost tgl" id="trLoopBtn" aria-pressed="${!!TR.looping}" title="Loop (L). Drag across the beat numbers to choose the bars">⟳ Loop</button>
      <button class="ghost tgl" id="trBacking" aria-pressed="${!!TR.backing}" title="Play chords and bass under the notes">Chords</button>
      <span class="trspace"></span>
      <button class="ghost ic" id="trUndo" title="Undo (Cmd+Z)">↶</button><button class="ghost ic" id="trRedo" title="Redo (Shift+Cmd+Z)">↷</button>
      <button class="ghost ic" id="trHelpBtn" title="How to edit, and keyboard shortcuts">?</button></div>
    <div class="trfix">${R?`<span class="trgrp"><span class="fine">Notes</span>${trSeg('sens',['Fewest','Fewer','Normal','More','Most'].map((t,i)=>[i,t]),score.sens??2)}</span>
      <span class="trgrp"><span class="fine">Tempo</span>${trSeg('bs',[[.5,'Half'],[1,'As heard'],[2,'Double']],score.beatScale||1)}</span>
      <span class="trgrp"><span class="fine">Bar lines</span><span class="seg"><button id="trShiftL" title="Move every bar line one beat earlier">◀ Earlier</button><button id="trShiftR" title="One beat later">Later ▶</button></span></span>`:''}
      <span class="trgrp"><span class="fine">Roll</span>${trSeg('tm',[['beat','On the beat','Notes on the grid, like the sheet music'],['played','As played','Notes where they really were, over the recording']],TR.timing==='played'?'played':'beat')}</span></div>
    <div class="trscore" id="trScore"></div>
    <div class="trroll" id="trRoll"></div>`;
  const B=$('trBody');
  $('trPlay').onclick=trToggle; $('trStop').onclick=()=>{ trStopAll(); TR.posB=TR.looping&&TR.loop?TR.loop.a:0; trHead(TR.posB); };
  B.querySelectorAll('[data-src]').forEach(b=>b.onclick=()=>{ TR.src=b.dataset.src; trPress('src',b.dataset.src); trResume(); });
  $('trLoopBtn').onclick=trLoopToggle;
  B.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{ TR.speed=+b.dataset.speed; TR.rate=TR.speed; trPress('speed',b.dataset.speed); trResume(); });
  $('trBacking').onclick=()=>{ TR.backing=!TR.backing; store.set('trBacking',TR.backing); $('trBacking').setAttribute('aria-pressed',TR.backing); trResume(); };
  $('trUndo').onclick=trUndo; $('trRedo').onclick=trRedo; $('trHelpBtn').onclick=trHelp;
  if($('trShiftL')){ $('trShiftL').onclick=()=>trReshift(-1); $('trShiftR').onclick=()=>trReshift(1); }
  if($('trSettings')) $('trSettings').onclick=()=>trLeave(()=>{ trStopAll(); TR.step='setup'; trSetupRender(); },'Go back to the settings?');
  B.querySelectorAll('[data-sens]').forEach(b=>b.onclick=()=>trRebuild({sens:+b.dataset.sens},`Notes: ${b.textContent.toLowerCase()}.`));
  B.querySelectorAll('[data-bs]').forEach(b=>b.onclick=()=>trRebuild({beatScale:+b.dataset.bs,shift:null},b.dataset.bs==='1'?'Tempo as heard.':`Read in ${b.textContent.toLowerCase()} time.`));
  B.querySelectorAll('[data-tm]').forEach(b=>b.onclick=()=>{ TR.timing=b.dataset.tm; store.set('trTiming',TR.timing); trPress('tm',TR.timing); trRollView();
    trMsg(TR.timing==='played'?'As played: every note where it really was, over the recording. Edits here move the sheet music too.':'On the beat: notes on the grid, like the sheet music.'); trResume(); });
  $('trSave').onclick=trSave; $('trLick').onclick=trToLick; $('trClose').onclick=()=>trLeave(trOpen,'Close this transcription?');
  $('trTitle').onclick=()=>{ const t=prompt('Name',TR.score.title); if(t&&t.trim()){ TR.score.title=t.trim(); trSetDirty(); trInfo(); } };
  const list=$('trExportList'); $('trExportBtn').onclick=e=>{ list.hidden=!list.hidden; e.stopPropagation(); };
  document.addEventListener('pointerdown',e=>{ if(list&&!list.hidden&&!e.target.closest('.trmenu')) list.hidden=true; });
  list.querySelectorAll('[data-exp]').forEach(b=>b.onclick=()=>{ list.hidden=true; const k=b.dataset.exp;
    if(k==='xml') trDownload(toMusicXML(TR.score),'musicxml','application/vnd.recordare.musicxml+xml');
    else trDownload(toMidiFile(TR.score,k==='midp'?trMaps():null),'mid','audio/midi'); });
  trRender(); trHead(0);
}
const trPress=(attr,v)=>$('trBody').querySelectorAll(`[data-${attr}]`).forEach(x=>x.setAttribute('aria-pressed',String(x.dataset[attr==='bs'?'bs':attr])===String(v)));
function trLoopToggle(){ TR.looping=!TR.looping; if(TR.looping&&!TR.loop){ const a=Math.floor((TR.posB||0)/4)*4; TR.loop={a,b:a+4}; }
  $('trLoopBtn').setAttribute('aria-pressed',TR.looping); trRollView(); if(TR.looping) trMsg(`Looping bar${TR.loop.b-TR.loop.a>4?'s':''} ${trBars(TR.loop)}. Drag across the beat numbers to loop other bars.`); trResume(); }
const trBars=l=>{ const a=Math.floor(l.a/4)+1, b=Math.ceil(l.b/4); return b>a?`${a}–${b}`:`${a}`; };
// leaving with unsaved edits asks first
function trLeave(go,q){ if(TR.dirty&&!confirm(`${q} ${TR.saved==null?'This transcription isn\'t saved yet.':'Your changes since the last save will be lost.'}`)) return; trStopAll(); go(); }
function trSetDirty(){ TR.dirty=true; const d=$('trDirty'); if(d) d.textContent='Not saved'; }
function trHelp(){
  document.querySelectorAll('.trpop').forEach(x=>x.remove());
  const pop=document.createElement('div'); pop.className='trpop trhelp';
  pop.innerHTML=`<b>Playing</b><ul><li><kbd>Space</kbd> play / pause from the playhead</li><li>Click the sheet music or the beat numbers to move the playhead there</li>
    <li>Drag across the beat numbers to loop those bars; <kbd>L</kbd> turns the loop on and off</li><li><kbd>←</kbd> <kbd>→</kbd> move the playhead a beat (with <kbd>Shift</kbd>, a bar) when no notes are selected</li></ul>
    <b>Editing (piano roll)</b><ul><li>Drag a note to move it, drag its right edge to change its length</li><li>Double-click to add a note; drag a box to select several</li>
    <li><kbd>↑</kbd> <kbd>↓</kbd> transpose (with <kbd>Shift</kbd>, an octave); <kbd>←</kbd> <kbd>→</kbd> nudge the selected notes</li><li><kbd>Delete</kbd> removes; <kbd>Cmd+Z</kbd> undo, <kbd>Shift+Cmd+Z</kbd> redo; <kbd>Cmd+S</kbd> save</li>
    <li>Click a chord to change it, or an empty spot in the chord lane to add one</li><li>Beat 1 in the wrong place? Double-click the beat number that should be 1, or use Bar lines</li></ul>
    <button class="go" id="trHelpOk">OK</button>`;
  document.body.appendChild(pop); const r=$('trHelpBtn').getBoundingClientRect(); pop.style.left=Math.max(8,Math.min(innerWidth-440,r.right-420))+'px'; pop.style.top=(r.bottom+8)+'px';
  pop.querySelector('#trHelpOk').onclick=()=>pop.remove();
  setTimeout(()=>document.addEventListener('pointerdown',function f(ev){ if(!pop.contains(ev.target)){ pop.remove(); document.removeEventListener('pointerdown',f); } }),0);
}
function trRender(){ trFillSec(); trInfo(); trScoreView(); trRollView(); }
// Beats ↔ seconds for the score on screen, and the As played view's scale (as wide per second as a beat is at this tempo)
const trMaps=()=>scoreMaps(TR.res,{...TR.score,shift:TR.score.shift??TR.shift});
const trPlayed=()=>TR.timing==='played';
const trPXS=()=>PXB*(TR.score.tempo||100)/60;
const trBeatAtX=x=>trPlayed()?trMaps().toBeat(x/trPXS()):x/PXB;
// notes added or saved before seconds were kept get them from the grid
function trFillSec(){ const mp=trMaps(); TR.score.melody.forEach(n=>{ if(n.sec==null){ n.sec=Math.max(0,mp.toSec(n.gat)); n.dsec=Math.max(.05,mp.toSec(n.gat+n.gdur)-n.sec); } }); }
function trInfo(){ const s=TR.score;
  $('trTitle').textContent=s.title; $('trInfo').textContent=`${s.mode==='lead'?'Lead sheet':s.texture==='full'?'Full part':'Solo line'} · ♩ = ${s.tempo} · ${keyName(s.key.pc,s.key.minor)} · ${s.bars} bars · ${s.melody.length} notes`;
  const d=$('trDirty'); if(d) d.textContent=TR.dirty?'Not saved':'Saved';
  const u=$('trUndo'), r=$('trRedo'); if(u) u.disabled=!TR.undo.length; if(r) r.disabled=!TR.redo.length; }
// Undo keeps whole snapshots (notes, chords, bars, tempo, the Notes and Tempo settings, beat 1). edit: a change you made by hand
const trSnap0=()=>JSON.stringify({score:TR.score,sh:TR.shift});
function trPush(edit=true){ TR.undo.push(trSnap0()); if(TR.undo.length>80) TR.undo.shift(); TR.redo=[]; if(edit) TR.edited=true; trSetDirty(); }
function trRestore(u){ const o=JSON.parse(u); TR.score=o.score; TR.shift=o.sh; TR.selected.clear(); trPress('sens',TR.score.sens??2); trPress('bs',TR.score.beatScale||1); trSetDirty(); trRender(); }
function trUndo(){ const u=TR.undo.pop(); if(!u) return trMsg('Nothing to undo.'); TR.redo.push(trSnap0()); trRestore(u); }
function trRedo(){ const u=TR.redo.pop(); if(!u) return trMsg('Nothing to redo.'); TR.undo.push(trSnap0()); trRestore(u); }
// Re-read the helper's answer with different settings (fewer or more notes, half or double time, beat 1). Hand edits are
// replaced, so say so; Undo brings them back.
function trReread(opts,msg){ const s=TR.score, had=TR.edited; trPush(false);
  TR.score={...buildScore(TR.res,{mode:s.mode,instrument:s.instrument,title:s.title,texture:s.texture||'line',sens:s.sens??2,beatScale:s.beatScale||1,shift:TR.shift,...opts}),soloBars:s.soloBars};
  TR.shift=TR.score.shift; TR.selected.clear(); TR.edited=false; trPress('sens',TR.score.sens); trPress('bs',TR.score.beatScale);
  trRender(); trMsg(msg+(had?' Your note edits were replaced: Undo brings them back.':'')); trResume(); }
function trRebuild(over,msg){ if(TR.res) trReread(over,msg); }
function trSetBeat1(beat){ if(!TR.res) return; const k=mod12(beat)%4; if(!k) return trMsg('That beat is already beat 1.'); let sh=(TR.shift||0)+k; while(sh>0) sh-=4; trReread({shift:sh},'Beat 1 set. The score is redrawn from there.'); }
function trReshift(d){ if(!TR.res) return; let sh=(TR.shift||0)+d; while(sh>0) sh-=4; while(sh<=-4) sh+=4; trReread({shift:sh},`Bar lines moved ${d<0?'earlier':'later'}.`); }
// messages pop up at the bottom of the screen for a few seconds
function trMsg(t,cls=''){ if(!t) return; let m=$('trToast'); if(!m){ m=document.createElement('div'); m.id='trToast'; document.body.appendChild(m); }
  m.textContent=t; m.className='trtoast show '+cls; clearTimeout(TR.toastT); TR.toastT=setTimeout(()=>m.classList.remove('show'),cls==='no'?6000:4200); }

// Sheet music: four bars to a line, chord symbols above, notes spelled from their chords
function trScoreView(){
  const s=TR.score, vis=visibleMelody(s), lines=[], ps=vis.map(n=>n.midi).sort((a,b)=>a-b), low=ps.length&&ps[ps.length>>1]<57; // a low line reads on a bass clef
  // up to four bars to a line, fewer when they're busy, so fast runs stay readable (beats widen like grandStaffSVG's)
  const per=Array(s.bars*4).fill(0); vis.forEach(n=>{ const b=Math.floor(n.gat+1e-6); if(b>=0&&b<per.length) per[b]++; });
  const barW=b=>[0,1,2,3].reduce((a,k)=>a+Math.max(44,per[b*4+k]*15+10),0), room=Math.max(560,($('trScore').clientWidth||900)-90);
  TR.lines=[]; const starts=[]; for(let b=0;b<s.bars;){ let n=1, w=barW(b); while(n<4&&b+n<s.bars&&w+barW(b+n)<=room){ w+=barW(b+n); n++; } starts.push([b,n]); b+=n; }
  starts.forEach(([b,nb])=>{
    const a=b*4, z=a+nb*4, notes=vis.filter(n=>n.gat>=a-1e-6&&n.gat<z-1e-6).map(n=>{ const sp=spellIn(s,n.midi,n.gat);
      return {midi:n.midi,gat:n.gat-a,gdur:Math.min(n.gdur,z-n.gat),tri:n.tri,tup:n.tup||0,spell:{...sp,midi:n.midi},name:sp.name}; });
    const chords=s.chords.filter(c=>c.at>=a-1e-6&&c.at<z-1e-6).map(c=>({...chordObj(c),at:c.at-a}));
    const solo=(s.soloBars||[]).filter(x=>x>=b&&x<b+nb);
    const svg=s.texture==='full'?grandStaffSVG({notes,chords,beats:nb*4,grand:!!s.grand}):s.mode==='lead'?lineStaffSVG({notes,chords,total:nb*4},-1,false)
      :grandStaffSVG({notes,chords,beats:nb*4,grand:false,clef:low?'bass':'treble'});
    const bw=[...Array(nb*4)].map((_,k)=>Math.max(44,per[a+k]*15+10)), cum=[0]; bw.forEach(w=>cum.push(cum[cum.length-1]+w));
    TR.lines.push({a,nb,bw,cum,X0:s.mode==='lead'&&s.texture!=='full'?null:64,W:64+cum[nb*4]+16});
    lines.push(`<div class="trline" data-line="${TR.lines.length-1}"><span class="trbar">${b+1}${solo.length?` · solo ${solo.map(x=>x+1).join(', ')}`:''}</span>${svg}<i class="trshead"></i></div>`);
  });
  $('trScore').innerHTML=lines.join('');
  if(s.mode==='lead'&&s.texture!=='full') TR.lines=null; // the lead sheet's staff is drawn by Lines (its own spacing)
  // click the music to put the playhead there
  $('trScore').onclick=e=>{ const el=e.target.closest('[data-line]'); if(!el||!TR.lines) return; const L=TR.lines[+el.dataset.line], svg=el.querySelector('svg'), r=svg.getBoundingClientRect();
    const x=(e.clientX-r.left)*L.W/r.width-L.X0; let i=0; while(i<L.nb*4-1&&L.cum[i+1]<=x) i++;
    TR.posB=Math.max(0,L.a+i+Math.max(0,Math.min(1,(x-L.cum[i])/L.bw[i]))); if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); };
  trSheetHead(TR.posB||0);
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
  if(TR.loop&&TR.looping) h+=`<rect x="${bx(TR.loop.a)}" y="0" width="${bx(TR.loop.b)-bx(TR.loop.a)}" height="${RULER}" class="rloop"/>`;
  h+='</svg>';
  let g=`<svg id="trSvg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  for(let m=lo;m<=hi;m++) g+=`<rect x="0" y="${y(m)}" width="${W}" height="${ROW}" class="${isBlack(m)?'rbk':'rwh'}"/>${m%12===0?`<text x="2" y="${y(m)+ROW-2}" class="rlab">C${m/12-1}</text>`:''}`;
  for(let b=X.b0;b<=X.b1;b++) g+=`<line x1="${bx(b)}" x2="${bx(b)}" y1="0" y2="${H}" class="${mod12(b)%4===0?'rbar':'rbeat'}"/>`;
  mel.forEach((n,i)=>{ const hid=(s.soloBars||[]).includes(Math.floor(n.gat/4+1e-6));
    g+=`<rect x="${nx(n)+1}" y="${y(n.midi)+1}" width="${Math.max(4,nw(n)-2)}" height="${ROW-2}" rx="2" class="rnote${TR.selected.has(i)?' sel':''}${hid?' hid':''}" data-i="${i}"><title>${plainSpell(n.midi).name}${Math.floor(n.midi/12)-1}, bar ${Math.floor(n.gat/4)+1} beat ${+(n.gat%4+1).toFixed(2)}${n.sec!=null?`, played at ${n.sec.toFixed(2)} s`:''}</title></rect>`; });
  if(TR.loop&&TR.looping) g+=`<rect x="${bx(TR.loop.a)}" y="0" width="${bx(TR.loop.b)-bx(TR.loop.a)}" height="${H}" class="rloopbg"/>`;
  const hx=TR.posB?trHeadX(TR.posB):-5; g+=`<line id="trHead" x1="${hx}" x2="${hx}" y1="0" y2="${H}" class="rhead"/></svg>`;
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
// snap to 16ths, or to the spots of the note's own tuplet (a sextuplet note moves between sextuplet spots)
const trSnap=(b,D=4)=>Math.max(0,Math.round(b*D)/D);
// Edits keep both timings: as played, a note moves freely and its written place is re-snapped; on the beat, it snaps and keeps its feel (how early or late it was played)
window.addEventListener('pointermove',e=>{ const d=TR.drag, svg=$('trSvg'); if(!d||!svg||!TR.active) return; const s=TR.score, p=trPt(e,svg), px=p.x-d.p0.x, dy=Math.round((d.p0.y-p.y)/ROW);
  const pl=trPlayed(), mp=trMaps(), k=trPXS(), dx=px/PXB, ds=px/k;
  if(d.mode==='move') d.orig.forEach(o=>{ const midi=Math.max(21,Math.min(108,o.midi+dy));
    if(pl){ const sec=Math.max(0,o.sec+ds), b=mp.toBeat(sec), gat=Math.abs(ds)<.01?o.gat:trSnap(b,trDivAt(Math.floor(b+.04),o.k)); s.melody[o.k]={...s.melody[o.k],midi,sec:Math.round(sec*1000)/1000,gat,tri:gat===o.gat&&o.tri}; }
    else { const gat=trSnap(o.gat+dx,o.tup||4); s.melody[o.k]={...s.melody[o.k],midi,gat,sec:gat===o.gat?o.sec:Math.max(0,Math.round((o.sec+mp.toSec(gat)-mp.toSec(o.gat))*1000)/1000)}; } });
  else if(d.mode==='len') d.orig.forEach(o=>{
    if(pl){ const dsec=Math.max(.05,o.dsec+ds); s.melody[o.k]={...s.melody[o.k],dsec:Math.round(dsec*1000)/1000,gdur:Math.max(.25,trSnap(mp.toBeat(o.sec+dsec))-o.gat),tri:false}; }
    else { const u=1/(o.tup||4), gdur=Math.max(u,trSnap(o.gdur+dx,o.tup||4)); s.melody[o.k]={...s.melody[o.k],gdur,dsec:Math.max(.05,Math.round((mp.toSec(o.gat+gdur)-mp.toSec(o.gat))*1000)/1000),tri:false}; } });
  else { const x0=Math.min(p.x,d.p0.x), x1=Math.max(p.x,d.p0.x), y0=Math.min(p.y,d.p0.y), y1=Math.max(p.y,d.p0.y), X=TR.roll.X;
    TR.selected=new Set(s.melody.map((n,i)=>i).filter(i=>{ const n=s.melody[i], ny=TR.roll.y(n.midi)+ROW/2; return X.nx(n)<x1&&X.nx(n)+X.nw(n)>x0&&ny>y0&&ny<y1; })); }
  trRollView(); });
// the beat ruler: a click plays from there (or moves the playhead), a drag sets the loop
window.addEventListener('pointermove',e=>{ const r=TR.rdrag, head=$('trHeadSvg'); if(!r||!head||!TR.active) return; const x=trPt(e,head).x; if(Math.abs(x-r.x0)<5&&!r.moved) return;
  r.moved=true; const a=trBeatAtX(Math.min(x,r.x0)), b=trBeatAtX(Math.max(x,r.x0)); TR.loop={a:Math.max(0,Math.floor(a)),b:Math.max(Math.floor(a)+1,Math.ceil(b))}; TR.looping=true;
  const lb=$('trLoopBtn'); if(lb) lb.setAttribute('aria-pressed',true); trRollView(); });
window.addEventListener('pointerup',e=>{ const r=TR.rdrag; if(!r) return; TR.rdrag=null; const head=$('trHeadSvg');
  if(!r.moved&&head){ TR.posB=Math.max(0,trBeatAtX(r.x0)); if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); }
  else if(r.moved){ TR.posB=TR.loop.a; if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); trMsg(`Looping bar${TR.loop.b-TR.loop.a>4?'s':''} ${trBars(TR.loop)}. L or ⟳ Loop turns it off.`); } });
window.addEventListener('pointerup',()=>{ const d=TR.drag; if(!d) return; TR.drag=null; if(d.mode!=='box'&&d.moved!==false){ trTidy(); trRender(); } });
function trRollEvents(){
  const svg=$('trSvg'), head=$('trHeadSvg'), s=TR.score;
  const pt=(e,el=svg)=>trPt(e,el);
  const toPitch=py=>TR.roll.hi-Math.floor(py/ROW);
  const keys=$('trKeys'); if(keys) keys.onpointerdown=e=>{ const k=e.target.closest('[data-key]'); if(k){ const m=+k.dataset.key; synth.init(); synth.on(m,80); setTimeout(()=>synth.off(m,.3),300); } };
  head.onpointerdown=e=>{
    const rEl=e.target.closest('[data-beat]'), cEl=e.target.closest('[data-chord]'), sEl=e.target.closest('[data-solo]');
    if(rEl){ TR.rdrag={x0:pt(e,head).x,moved:false}; e.preventDefault(); return; }
    const beatAt=trBeatAtX;
    if(sEl){ trPush(); const b=+sEl.dataset.solo, sb=s.soloBars||(s.soloBars=[]); sb.includes(b)?sb.splice(sb.indexOf(b),1):sb.push(b); trRender(); return; }
    if(cEl){ trChordEdit(+cEl.dataset.chord,e); return; }
    if(e.target.closest('.rlane')){ trChordAdd(Math.max(0,Math.floor(beatAt(pt(e,head).x)/4)*4),e); return; }
  };
  head.ondblclick=e=>{ const rEl=e.target.closest('[data-beat]'); if(rEl) trSetBeat1(+rEl.dataset.beat); };
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
function trTidy(){ const m=TR.score.melody; const sel=[...TR.selected].map(i=>m[i]); m.sort((a,b)=>a.gat-b.gat||b.midi-a.midi); trRetuple(m);
  if(TR.score.texture!=='full') for(let i=0;i<m.length-1;i++){ if(m[i].gat+m[i].gdur>m[i+1].gat) m[i].gdur=Math.max(.05,m[i+1].gat-m[i].gat);
    if(m[i].sec!=null&&m[i+1].sec!=null&&m[i].sec<m[i+1].sec&&m[i].sec+m[i].dsec>m[i+1].sec) m[i].dsec=Math.max(.03,m[i+1].sec-m[i].sec); }
  TR.selected=new Set(sel.map(n=>m.indexOf(n)).filter(i=>i>=0)); }
// the division a beat is written in: its notes' tuplet, else 16ths (skip: the note being moved)
function trDivAt(beat,skip){ const ns=TR.score.melody.filter((n,i)=>i!==skip&&Math.floor(n.gat+1e-6)===beat&&n.tup); return ns.length?ns[0].tup:4; }
// after an edit, each beat's tuplet is whatever its notes still fit: the beat's most common tuplet if they all sit on its spots, else plain
function trRetuple(m){ const by=new Map(); m.forEach(n=>{ const b=Math.floor(n.gat+1e-6); if(!by.has(b)) by.set(b,[]); by.get(b).push(n); });
  const on=(n,D)=>Math.abs((n.gat-Math.floor(n.gat+1e-6))*D-Math.round((n.gat-Math.floor(n.gat+1e-6))*D))<1e-4;
  by.forEach(ns=>{ const cnt={}; ns.forEach(n=>{ if(n.tup) cnt[n.tup]=(cnt[n.tup]||0)+1; }); const D=+Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0]||0;
    const all=D&&ns.every(n=>on(n,D)); ns.forEach(n=>{ const t=all||(D&&on(n,D)&&!on(n,8))?D:0; n.tup=t; n.tri=t===3; }); }); }
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
/* Playback from the playhead (TR.posB, in beats). Space plays and pauses where it is; Stop goes back to the start.
   What it plays: the transcription, the original recording, or both together (then the notes keep their real timing,
   so you hear them against the recording). On the beat, notes play on the grid at a steady tempo; as played, when they
   were really played. Changing a setting while it plays carries on from the same spot (trResume). */
function trToggle(){ if(TR.playing){ const p=TR.posB; trStopAll(); TR.posB=p; trHead(p); } else trPlayScore(); }
function trResume(){ if(TR.playing) trPlayScore(TR.posB); }
function trPlayScore(from){
  const s=TR.score; if(from==null) from=TR.posB||0; trStopAll();
  const src=TR.url&&TR.res?TR.src||'notes':'notes', real=trPlayed()||src!=='notes', mp=trMaps(), sp=TR.speed, spb=60/(s.tempo||100);
  const loop=TR.looping&&TR.loop?TR.loop:null; if(loop&&(from<loop.a-1e-6||from>=loop.b-1e-6)) from=loop.a;
  const endB=loop?loop.b:s.bars*4; if(from>=endB-1e-6) from=0;
  const secOf=b=>real?Math.max(0,mp.toSec(b)):b*spb, sec0=secOf(from), T=b=>(secOf(b)-sec0)/sp, endT=T(endB);
  const bus=TR.bus=newBus(); if(!bus) return; TR.playing=true; TR.posB=from;
  const go=t0=>{
    if(src!=='orig'){
      visibleMelody(s).forEach(n=>{ const a=real?(n.sec-sec0)/sp:T(n.gat), d=real?n.dsec/sp:n.gdur*spb*.92/sp; if(a<-.005||a>=endT) return; tone(n.midi,t0+a,Math.max(.08,Math.min(d,endT-a)),94,'epiano',bus); });
      if(TR.backing) s.chords.forEach((c,i)=>{ const cz=s.chords[i+1]?s.chords[i+1].at:s.bars*4; if(cz<=from||c.at>=endB) return;
        const a=Math.max(0,T(c.at)), z=Math.min(endT,T(cz)), t=chordObj(c); if(z-a<.05) return;
        playChord(compUnder({root:t.root,q:t.q},58),t0+a,(z-a)*.95,'mellow',bus,42); tone(36+mod12(c.root-36),t0+a,(z-a)*.95,56,'mellow',bus); }); }
    const step=()=>{ if(!TR.playing) return; const el=now()-t0;
      TR.posB=Math.min(endB,real?mp.toBeat(sec0+Math.max(0,el)*sp):from+Math.max(0,el)*sp/spb); trHead(TR.posB);
      if(el<endT) TR.raf=requestAnimationFrame(step); else if(loop) trPlayScore(loop.a); else { trStopAll(); TR.posB=0; trHead(0); } };
    TR.raf=requestAnimationFrame(step);
  };
  if(src==='notes') return go(now()+.1);
  // with the recording: start it, then line the notes up with where it really is once it plays
  const au=TR.audio||(TR.audio=new Audio()); if(au.src!==TR.url) au.src=TR.url;
  au.preservesPitch=true; au.playbackRate=sp; au.currentTime=TR.sel[0]+sec0;
  const token=TR.token=(TR.token||0)+1;
  au.onplaying=()=>{ au.onplaying=null; if(token!==TR.token||!TR.playing) return; go(now()-(au.currentTime-TR.sel[0]-sec0)/sp); };
  au.play().catch(()=>{});
}
const trHeadX=b=>trPlayed()?Math.max(0,trMaps().toSec(b))*trPXS():b*PXB;
// the playhead: in the piano roll, on the sheet music (a line over the bar being played), and as bar · beat
function trHead(b){ const pos=$('trPos'); if(pos){ const bb=Math.max(0,b); pos.textContent=`${Math.floor(bb/4)+1} · ${Math.floor(bb%4)+1}`; }
  const pb=$('trPlay'); if(pb) pb.textContent=TR.playing?'❚❚':'▶';
  const h=$('trHead'); if(h){ const x=trHeadX(b); h.setAttribute('x1',x); h.setAttribute('x2',x);
    const roll=$('trRoll'); if(TR.playing&&roll&&(x<roll.scrollLeft||x>roll.scrollLeft+roll.clientWidth-40)) roll.scrollLeft=x-60; }
  trSheetHead(b); }
function trSheetHead(b){ const sc=$('trScore'); if(!sc||!TR.lines) return;
  TR.lines.forEach((L,k)=>{ const el=sc.querySelector(`[data-line="${k}"]`); if(!el) return; const hd=el.querySelector('.trshead'), svg=el.querySelector('svg');
    const inside=b>=L.a-1e-6&&b<L.a+L.nb*4-1e-6&&(TR.playing||b>0);
    if(!inside||!svg){ hd.style.display='none'; return; }
    const i=Math.min(L.nb*4-1,Math.floor(b-L.a+1e-9)), x=L.X0+L.cum[i]+(b-L.a-i)*L.bw[i], sr=svg.getBoundingClientRect(), er=el.getBoundingClientRect();
    hd.style.display='block'; hd.style.left=(sr.left-er.left+x*sr.width/L.W)+'px';
    if(TR.playing){ const top=el.offsetTop, bot=top+el.offsetHeight; if(top<sc.scrollTop||bot>sc.scrollTop+sc.clientHeight) sc.scrollTop=top-6; } }); }
function trSave(){
  const s=TR.score, item={...s,saved:Date.now()};
  if(TR.saved!=null&&TRDATA.list[TR.saved]) TRDATA.list[TR.saved]=item; else { TRDATA.list.unshift(item); TR.saved=0; if(TRDATA.list.length>40) TRDATA.list.pop(); }
  saveTr(); TR.dirty=false; trInfo(); trMsg('Saved. Find it under Saved transcriptions.','ok');
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
  if(e.key==='Escape'){ const pops=document.querySelectorAll('.trpop,.trmenulist:not([hidden])');
    if(pops.length){ pops.forEach(x=>x.classList.contains('trpop')?x.remove():x.hidden=true); return true; }
    if(TR.step==='edit') trLeave(trOpen,'Close this transcription?'); else if(TR.step==='setup') trOpen(); else trToMenu(); return true; }
  if(TR.step!=='edit') return true;
  const s=TR.score, sel=[...TR.selected], cmd=e.metaKey||e.ctrlKey;
  if(e.key===' '){ e.preventDefault(); trToggle(); return true; }
  if(cmd&&e.key.toLowerCase()==='z'){ e.preventDefault(); e.shiftKey?trRedo():trUndo(); return true; }
  if(cmd&&e.key.toLowerCase()==='y'){ e.preventDefault(); trRedo(); return true; }
  if(cmd&&e.key.toLowerCase()==='s'){ e.preventDefault(); trSave(); return true; }
  if(!cmd&&e.key.toLowerCase()==='l'){ trLoopToggle(); return true; }
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){ e.preventDefault(); const dir=e.key==='ArrowRight'?1:-1;
    if(!sel.length){ const st=e.shiftKey?4:1; TR.posB=Math.max(0,Math.min(s.bars*4-1e-3,(dir>0?Math.floor(TR.posB/st+1e-6)+1:Math.ceil(TR.posB/st-1e-6)-1)*st)); if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); return true; }
    trPush(); const mp=trMaps(); sel.forEach(i=>{ const n=s.melody[i], u=1/(n.tup||4), g=Math.max(0,n.gat+dir*u); n.sec=Math.max(0,n.sec+mp.toSec(g)-mp.toSec(n.gat)); n.gat=g; }); trTidy(); trRender(); return true; }
  if((e.key==='Delete'||e.key==='Backspace')&&sel.length){ trPush(); s.melody=s.melody.filter((n,i)=>!TR.selected.has(i)); TR.selected.clear(); trRender(); return true; }
  if((e.key==='ArrowUp'||e.key==='ArrowDown')&&sel.length){ e.preventDefault(); trPush(); const d=(e.key==='ArrowUp'?1:-1)*(e.shiftKey?12:1); sel.forEach(i=>s.melody[i].midi+=d); trRender(); return true; }
  return true; // nothing else in Jun Jam reacts to keys while transcribing
}
