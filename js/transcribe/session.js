/* Transcribe: mp3 in, editable sheet music out. The helper (tools/transcriber) does the listening on this Mac;
   this screen imports the recording, asks what you want to see, sends the selection, and lets you fix the result. */
const TR_URL='http://127.0.0.1:8771';
let TRDATA=store.get('trans',{list:[]});
const saveTr=()=>store.set('trans',TRDATA);
/* A saved transcription keeps its recording and the helper's reading too, so it reopens ready to play, hear and re-read
   without importing the audio again. They live in IndexedDB on this computer (audio is too big for localStorage). */
const trDB=(()=>{ let p; const open=()=>p||(p=new Promise((ok,no)=>{ const r=indexedDB.open('junjam',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('trmedia'); r.onsuccess=()=>ok(r.result); r.onerror=()=>no(r.error); }));
  const tx=(mode,f)=>open().then(db=>new Promise((ok,no)=>{ const t=db.transaction('trmedia',mode), q=f(t.objectStore('trmedia')); t.oncomplete=()=>ok(q.result); t.onerror=()=>no(t.error); }));
  return {get:k=>tx('readonly',st=>st.get(k)).catch(()=>null), put:(k,v)=>tx('readwrite',st=>st.put(v,k)), del:k=>tx('readwrite',st=>st.delete(k)).catch(()=>{})}; })();
const trEsc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const TR={active:false,timing:store.get('trTiming','beat'),backing:store.get('trBacking',true)};

/* ---------------- helper status and install guide ---------------- */
async function trHelperOk(){ try{ const c=new AbortController(); setTimeout(()=>c.abort(),1500); const r=await fetch(TR_URL+'/health',{signal:c.signal}), h=await r.json(); TR.health=h; return h.ok; }catch(e){ TR.health=null; return false; } }
// The models vote when the helper has the extra ones (version 2: the piano model and YourMT3+); an older helper only has Basic Pitch
const trCanBest=()=>!!(TR.health&&TR.health.version>=2&&(TR.health.engines||[]).some(e=>e==='piano'||e==='yourmt3'));
// the folder Jun Jam is in (when opened from disk), as this computer writes paths
const trWin=/Win/.test(navigator.platform||navigator.userAgent);
function trProjectDir(){ if(location.protocol!=='file:') return null; let p=decodeURIComponent(location.pathname); p=p.slice(0,p.lastIndexOf('/'));
  return trWin?p.replace(/^\/([A-Za-z]:)/,'$1').replace(/\//g,'\\'):p; }
function trInstallGuide(){
  const dir=trProjectDir(), q=s=>`"${s}"`, cmd=(t,id)=>`<div class="trcmd"><code id="${id}">${t.replace(/</g,'&lt;')}</code><button class="ghost" data-copy="${id}">Copy</button></div>`;
  const where=dir?'':`<span class="fine">Replace the path with the folder Jun Jam is in.</span>`;
  const intro=`<b>Transcribing needs a helper program on this computer, and it isn't running.</b> Everything else in Jun Jam works without it. It's a one-time install (about 4 GB with its models, 5 to 15 minutes, nothing else needed, not even Python).`;
  if(trWin) return `<div class="trguide">${intro}
    <ol><li>Open <b>PowerShell</b> (press the Windows key, type PowerShell, press Enter) and paste this to install the helper:${cmd(`powershell -ExecutionPolicy Bypass -File ${q((dir||'C:\\path\\to\\Jun Jam')+'\\tools\\transcriber\\install.ps1')}`,'trCmd1')}${where}</li>
    <li>When it's done, double-click <b>Start Jun Jam helper</b> on your Desktop. Leave that window open while you transcribe.</li>
    <li><button class="go" id="trRecheck">Check again</button></li></ol></div>`;
  return `<div class="trguide">${intro}
    <ol><li>Open <b>Terminal</b> (Cmd+Space, type Terminal, press Enter) and paste this to install the helper:${cmd(`bash ${q((dir||'/path/to/Jun Jam')+'/tools/transcriber/install.sh')}`,'trCmd1')}${where}</li>
    <li>From then on <b>Jun Jam.app starts it for you</b>. If you open Jun Jam another way, start the helper with:${cmd(`"$HOME/Library/Application Support/Jun Jam/transcriber-venv/bin/python" "$HOME/Library/Application Support/Jun Jam/server.py"`,'trCmd2')}</li>
    <li><button class="go" id="trRecheck">Check again</button></li></ol></div>`;
}

/* ---------------- start screen ---------------- */
async function trOpen(){
  trStopAll(); Object.assign(TR,{active:true,step:'start'});
  synth.init(); hideOv(); document.body.classList.add('nohud','trmode'); document.body.classList.remove('menu'); $('transStage').hidden=false;
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">Transcribe a recording</span><span id="trStatus">Checking the helper…</span></div>
    ${TRDATA.list.length?`<div class="sec">Your transcriptions</div><div class="licks trlib">${TRDATA.list.map((t,i)=>`<button class="lick" data-open="${i}"><span class="ln">${t.mode==='lead'?'Lead sheet':(TR_INSTRUMENTS[t.instrument]||{}).name+(t.texture==='full'?' with chords':' line')} · ${t.bars} bars</span><span class="lt">${trEsc(t.title)}</span><span class="lst">♩ = ${t.tempo}, ${keyName(t.key.pc,t.key.minor)}${t.media?' · <b title="The recording is saved with it">♫ with recording</b>':''}</span><span class="del" data-del="${i}" title="Delete">×</span></button>`).join('')}</div>
    <div class="sec" style="margin-top:16px">New transcription</div>`:''}
    <p>Drop in an mp3 (or any audio file you own). Choose what you want to see, select the part of the song, and it comes back as sheet music with chords that you can fix and save.</p>
    <div id="trGuide"></div>
    <label class="trdrop" id="trDrop"><input type="file" id="trFile" accept="audio/*" hidden><b>Choose an audio file</b><span>or drop it here</span></label>
    <div class="trhome"><button class="ghost" id="trRec" style="margin-left:0">Record from a tab</button><span>Playing it on YouTube or anywhere else in Chrome? Capture that tab's sound while you play the part you want.</span></div>
    <div class="erow" style="margin-top:14px"><button class="ghost" id="trHome">Back</button></div>`;
  $('trHome').onclick=trToMenu;
  const f=$('trFile'), drop=$('trDrop');
  f.onchange=()=>f.files[0]&&trLoad(f.files[0]);
  drop.ondragover=e=>{ e.preventDefault(); drop.classList.add('over'); }; drop.ondragleave=()=>drop.classList.remove('over');
  drop.ondrop=e=>{ e.preventDefault(); drop.classList.remove('over'); const file=e.dataTransfer.files[0]; if(file) trLoad(file); };
  $('trBody').onclick=e=>{ const d=e.target.closest('[data-del]'), o=e.target.closest('[data-open]'), c=e.target.closest('[data-copy]');
    if(d){ e.stopPropagation(); if(confirm('Delete this transcription?')){ const [t]=TRDATA.list.splice(+d.dataset.del,1); if(t&&t.id) trDB.del(t.id); saveTr(); trOpen(); } return; }
    if(o){ trOpenSaved(+o.dataset.open); return; }
    if(c){ navigator.clipboard&&navigator.clipboard.writeText($(c.dataset.copy).textContent); c.textContent='Copied'; setTimeout(()=>c.textContent='Copy',1200); return; }
    if(e.target.id==='trRecheck') trCheck(); if(e.target.id==='trRec') trTabRecord(); };
  trCheck();
}
async function trCheck(){
  const ok=await trHelperOk(); TR.helper=ok; if(!$('trStatus')) return;
  $('trStatus').textContent=ok?'Helper ready':'Helper not running'; $('trStatus').className=ok?'trok':'trno';
  if(ok&&TR.health.version<2){ $('trStatus').textContent='Helper is out of date: quit and reopen Jun Jam.app, or run the install again'; $('trStatus').className='trno'; }
  if(ok&&!trCanBest()&&$('trEngNote')){ $('trEngNote').hidden=false; $('trEngNote').textContent='Your helper only has one of the three models: run the install command again for the full set (about 1 GB more).'; }
  if(TR.buf&&$('trEst')) trDrawWave();
  if($('trGuide')) $('trGuide').innerHTML=ok?'':trInstallGuide();
  if($('trGo')) $('trGo').classList.toggle('dim',!ok);   // still clickable: it explains what's missing
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
  const T=TR, inst=TR_INSTRUMENTS[T.instrument]||TR_INSTRUMENTS.piano;
  $('trBody').innerHTML=`<div class="trtop"><button class="ghost" id="trBack">← Back</button><span class="etitle">${T.title.replace(/</g,'&lt;')}</span><span id="trStatus"></span></div>
    <div class="trform">
      <label>Write it as</label><div class="trmodes"><button class="trpick" data-mode="solo" aria-pressed="${T.mode==='solo'}"><b>Solo transcription</b><span>One instrument's part, note for note, with the chords under it.</span></button>
        <button class="trpick" data-mode="lead" aria-pressed="${T.mode==='lead'}"><b>Lead sheet</b><span>The tune's melody and chord changes. Mark solo sections afterwards to leave them out.</span></button></div>
      ${T.mode==='solo'?`<label for="trInst">Instrument</label><div class="trctl"><select id="trInst">${Object.entries(TR_INSTRUMENTS).map(([k,v])=>`<option value="${k}"${k===T.instrument?' selected':''}>${v.name}</option>`).join('')}</select>
        ${inst.full?trSeg('tex',[['line','Single line','The top line only: the solo'],['full',`With chords${inst.grand?' (both hands)':''}`,'Every note, chords stacked'+(inst.grand?', on a grand staff':'')]],T.texture):''}</div>`
        :`<label>Melody</label><div class="trctl fine">Taken from the vocals, or the lead instrument if there are none.</div>`}
      <label>Part</label><div><div class="trwavewrap" id="trWaveWrap"><canvas class="trwave" id="trWave" height="110"></canvas>
          <i class="trhandle" id="trH0" title="Drag to set the start"></i><i class="trhandle" id="trH1" title="Drag to set the end"></i><i class="trwhead" id="trWHead"></i></div>
        <div class="trctl"><button class="ghost" id="trPlaySel">▶ Play part</button><button class="ghost" id="trAll">Whole recording</button>
          <span class="fine">Speed</span>${trSeg('rate',[[.5,'50%'],[.75,'75%'],[1,'100%']],T.rate||1)}<span class="fine trright" id="trSelT"></span></div>
        <p class="fine">Drag the handles to set the start and end, or click the waveform to move the nearer one. 30 to 90 seconds works best for a solo.</p></div>
    </div>
    <div id="trGuide"></div>
    <div class="trgo"><span class="fine" id="trEngNote" hidden></span><span class="fine" id="trEst"></span><button class="go" id="trGo">Transcribe</button></div>`;
  $('trBack').onclick=()=>{ trStopAll(); trOpen(); }; $('trGo').onclick=()=>TR.helper?trRun():(trCheck(),$('trGuide').scrollIntoView({behavior:'smooth',block:'center'}),trMsg('The helper isn\'t running yet: follow the steps above, then press Transcribe again.','no'));
  $('trBody').onclick=e=>{ const c=e.target.closest('[data-copy]'); if(c){ navigator.clipboard&&navigator.clipboard.writeText($(c.dataset.copy).textContent); c.textContent='Copied'; setTimeout(()=>c.textContent='Copy',1200); } if(e.target.id==='trRecheck') trCheck(); };
  $('trBody').querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ T.mode=b.dataset.mode; trSetupRender(); });
  $('trBody').querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ T.rate=+b.dataset.rate; if(TR.audio) TR.audio.playbackRate=T.rate; $('trBody').querySelectorAll('[data-rate]').forEach(x=>x.setAttribute('aria-pressed',x===b)); });
  if($('trInst')) $('trInst').onchange=e=>{ T.instrument=e.target.value; if(!TR_INSTRUMENTS[T.instrument].full) T.texture='line'; trSetupRender(); };
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
  g.fillStyle=css.getPropertyValue('--brass'); g.globalAlpha=.22; g.fillRect(x0,0,x1-x0,h); g.globalAlpha=1;
  for(let x=0;x<w;x++){ let mx=0; for(let i=x*step;i<(x+1)*step&&i<d.length;i+=4) mx=Math.max(mx,Math.abs(d[i]));
    g.fillStyle=x>=x0&&x<=x1?css.getPropertyValue('--brass'):css.getPropertyValue('--muted'); g.fillRect(x,h/2-mx*h/2,1,Math.max(1,mx*h)); }
  if($('trSelT')) $('trSelT').textContent=`${fmtT(T.sel[0])} to ${fmtT(T.sel[1])} (${Math.round(T.sel[1]-T.sel[0])} s)`;
  if($('trEst')){ const d=T.sel[1]-T.sel[0], q=!trCanBest(); $('trEst').textContent=`About ${Math.max(q?3:10,Math.round(d*(q?.15:1.3)))} s`; }
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
  const vote=trCanBest(), t0=performance.now();
  $('trBody').innerHTML=`<div class="etop"><span class="etitle">${T.title.replace(/</g,'&lt;')}</span></div>
    <p class="rhwhat">Listening… <span id="trEl">0</span> s</p><p class="fine">${vote?`Taking the drums out, then three models listen and vote on every note. Usually about ${Math.max(10,Math.round((T.sel[1]-T.sel[0])*1.3))} s for this part; the first time also loads the models.`:'Taking the drums out and finding the notes and the beat. Usually a few seconds; longer the very first time.'}</p>
    <div class="erow"><button class="ghost" id="trCancel">Cancel</button></div>`;
  const tick=setInterval(()=>{ if($('trEl')) $('trEl').textContent=Math.round((performance.now()-t0)/1000); },500);
  const ctl=new AbortController(); $('trCancel').onclick=()=>{ ctl.abort(); clearInterval(tick); trSetupRender(); };
  try{
    const wav=await trWav(T.buf,T.sel[0],T.sel[1]);
    const r=await fetch(`${TR_URL}/transcribe`,{method:'POST',body:wav,signal:ctl.signal}), res=await r.json();
    clearInterval(tick);
    if(!res.ok) throw new Error(res.error||'The helper could not transcribe this.');
    T.raw=res; T.res=prepRes(res);
    // every part starts on Medium sensitivity
    const sc=buildScore(T.res,{mode:T.mode,instrument:T.mode==='lead'?'voice':T.instrument,title:T.title,texture:T.texture,sens:2}); T.shift=sc.shift;
    trEdit(sc,T.res,null);
  }catch(e){ clearInterval(tick); if(e.name==='AbortError') return; $('trBody').innerHTML=`<p class="lmsg no">${String(e.message||e).replace(/</g,'&lt;')}</p><div class="erow"><button class="go" id="trBack">Back</button></div>`; $('trBack').onclick=trSetupRender; }
}

/* ---------------- the editor ---------------- */
const PXB=46, ROW=11, RULER=16, LANE=26; // the ruler (beat numbers, click to set beat 1) sits above the chord lane
/* The editor. Top: what it is, and Save (in Jun Jam, PDF, MusicXML, MIDI) / Lines / Close. Under it a transport bar that stays in view
   (play, where you are, what you hear, loop, speed, undo). Then "Fix the reading" (re-reads the recording), the
   sheet music (click it to play from there) and the piano roll. Messages pop up at the bottom of the screen. */
function trEdit(score,res,savedIndex){
  trStopAll(); Object.assign(TR,{active:true,step:'edit',rec:false,recOn:{},down:new Set(),score,res:res||TR.res||null,saved:savedIndex,sel:TR.sel,undo:[],redo:[],selected:new Set(),rate:TR.rate||1,speed:1,posB:0,loop:null,looping:false,dirty:savedIndex==null,edited:false});
  if(!res){ TR.res=null; } // reopened from the list: no audio, no re-analysis
  const R=!!TR.res, A=!!(TR.url&&TR.res);
  $('trBody').innerHTML=`<div class="trtop">${TR.buf&&R?'<button class="ghost" id="trSettings" title="Back to what to write, instrument and part">← Settings</button>':''}
      <span class="etitle" id="trTitle" title="Click to rename"></span><span class="fine" id="trInfo"></span><span class="trspace"></span><span class="fine" id="trDirty"></span>
      <div class="trmenu"><button class="go" id="trExportBtn" aria-haspopup="true">Save ▾</button><div class="trmenulist" id="trExportList" hidden>
        <button data-exp="app">In Jun Jam <span class="fine">With the recording, under Your transcriptions (Cmd+S)</span></button>
        <button data-exp="pdf">PDF <span class="fine">The sheet music, to print or send</span></button><hr>
        <button data-exp="xml">MusicXML <span class="fine">MuseScore, Sibelius, Finale, Dorico</span></button><button data-exp="mid">MIDI, on the beat</button>${R?'<button data-exp="midp">MIDI, as played</button>':''}</div></div>
      <button class="ghost" id="trLick" title="Select 3 to 16 notes in the piano roll first">→ Lines</button><button class="ghost" id="trClose">Close</button></div>
    <div class="trtransport" id="trBar">
      <button class="go trplay" id="trPlay" title="Play / pause (Space)">▶</button><button class="ghost" id="trStop" title="Stop, back to the start">■</button>
      <span class="trpos" id="trPos">1 · 1</span>
      ${A?`<span class="trgrp"><span class="fine">Hear</span>${trSeg('src',[['notes','Notes'],['orig','Recording'],['both','Both']],TR.src||'notes')}</span>`:''}
      <span class="trgrp"><span class="fine">Speed</span>${trSeg('speed',[[.5,'50%'],[.75,'75%'],[1,'100%']],TR.speed)}</span>
      <button class="ghost tgl" id="trLoopBtn" aria-pressed="${!!TR.looping}" title="Loop (Shift+L). Drag across the beat numbers to choose the bars">⟳ Loop</button>
      <button class="ghost tgl" id="trBacking" aria-pressed="${!!TR.backing}" title="Play chords and bass under the notes">Chords</button>
      <button class="ghost tgl trrec" id="trRec" aria-pressed="${!!TR.rec}" title="Record: what you play on your keyboard while it plays is written into the transcription">● Rec</button>
      <span class="trspace"></span>
      <button class="ghost ic" id="trUndo" title="Undo (Cmd+Z)">↶</button><button class="ghost ic" id="trRedo" title="Redo (Shift+Cmd+Z)">↷</button>
      <button class="ghost" id="trHelpBtn" title="How everything here works">? Guide</button></div>
    <div class="trfix">${R?`<span class="trgrp" title="How sure a note has to be to show. Lower: cleaner, can miss quiet or very fast notes. Higher: catches more, and more stray notes."><span class="fine">Sensitivity</span>${trSeg('sens',TR_SENS_NAMES.map((t,i)=>[i,t]),score.sens??2)}</span>
      <span class="trgrp"><span class="fine">Tempo</span>${trSeg('bs',[[.5,'Half'],[1,'As heard'],[2,'Double']],score.beatScale||1)}</span>
      <span class="trgrp" title="Where beat 1 is. Works from the playhead's bar on; earlier bars stay as they are."><span class="fine">Beat 1</span><span class="seg"><button id="trShiftL" title="Bars from the playhead's bar on: one beat earlier">◀</button><button id="trB1Here" title="The beat at the playhead is beat 1 (from here on)">Here</button><button id="trShiftR" title="Bars from the playhead's bar on: one beat later">▶</button></span><span class="fine" id="trB1From">all bars</span></span>`:''}
      <span class="trgrp"><span class="fine">Roll</span>${trSeg('tm',[['beat','On the beat','Notes on the grid, like the sheet music'],['played','As played','Notes where they really were, over the recording']],TR.timing==='played'?'played':'beat')}</span>
      <button class="ghost ic trq" data-guide="fix" title="What these do">?</button></div>
    <div class="trscore" id="trScore"></div>
    <div class="tredit">
      <span class="trgrp"><span class="fine">Tool</span>${trSeg('tool',[['select','Select','Click notes to select them, drag to move; drag on empty space to select several'],['draw','✎ Draw','Click to add a note, drag to set its length']],TR.tool||'select')}</span>
      <span class="trgrp" title="Where new and moved notes land"><span class="fine">Snap</span>${trSeg('snap',[[1,'♩'],[2,'♪'],[4,'16th'],[8,'32nd'],[3,'Triplet']],TR.snapDiv||4)}</span>
      <span class="trgrp"><button class="ghost ic" data-selact="up" title="Up a half step (↑)">▲</button><button class="ghost ic" data-selact="down" title="Down a half step (↓)">▼</button><button class="ghost ic" data-selact="oup" title="Up an octave (Shift+↑)">+8</button><button class="ghost ic" data-selact="odown" title="Down an octave (Shift+↓)">−8</button><button class="ghost ic" data-selact="del" title="Delete (Delete key)">🗑</button></span>
      <span class="fine" id="trSelInfo"></span><span class="trspace"></span><button class="ghost ic trq" data-guide="edit" title="How editing works">?</button></div>
    <div class="trroll" id="trRoll"></div>
    <div class="trhintline" id="trHintLine"></div>`;
  const B=$('trBody');
  $('trPlay').onclick=trToggle; $('trStop').onclick=()=>{ trStopAll(); TR.posB=TR.looping&&TR.loop?TR.loop.a:0; trHead(TR.posB); };
  B.querySelectorAll('[data-src]').forEach(b=>b.onclick=()=>{ TR.src=b.dataset.src; trPress('src',b.dataset.src); trResume(); });
  $('trLoopBtn').onclick=trLoopToggle;
  B.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{ TR.speed=+b.dataset.speed; TR.rate=TR.speed; trPress('speed',b.dataset.speed); trResume(); });
  $('trBacking').onclick=()=>{ TR.backing=!TR.backing; store.set('trBacking',TR.backing); $('trBacking').setAttribute('aria-pressed',TR.backing); trResume(); };
  $('trUndo').onclick=trUndo; $('trRedo').onclick=trRedo; $('trHelpBtn').onclick=()=>trGuide('start');
  $('trRec').onclick=()=>{ TR.rec=!TR.rec; $('trRec').setAttribute('aria-pressed',TR.rec); if(TR.rec) trMsg(TR.playing?'Recording: play along and your notes are written in.':'Rec is on: press Play, then play along on your keyboard.'); };
  if($('trShiftL')){ $('trShiftL').onclick=()=>trNudgeBars(-1); $('trShiftR').onclick=()=>trNudgeBars(1);
    $('trB1Here').onclick=()=>{ const b=Math.round(TR.posB||0); if(mod12(b)%4===0) return trMsg('The playhead is already on beat 1. Put it on the beat that should be 1 first: click the beat numbers or the sheet music.'); trSetBeat1(b); }; }
  B.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{ TR.tool=b.dataset.tool; trPress('tool',TR.tool); trMsg(TR.tool==='draw'?'Draw: click in the piano roll to add a note, drag to set its length.':'Select: click notes to select, drag to move them.'); });
  B.querySelectorAll('[data-snap]').forEach(b=>b.onclick=()=>{ TR.snapDiv=+b.dataset.snap; trPress('snap',TR.snapDiv); });
  B.querySelectorAll('[data-selact]').forEach(b=>b.onclick=()=>trSelAct(b.dataset.selact));
  B.querySelectorAll('[data-guide]').forEach(b=>b.onclick=()=>trGuide(b.dataset.guide));
  if($('trSettings')) $('trSettings').onclick=()=>trLeave(()=>{ trStopAll(); TR.step='setup'; trSetupRender(); },'Go back to the settings?');
  B.querySelectorAll('[data-sens]').forEach(b=>b.onclick=()=>trRebuild({sens:+b.dataset.sens},`Sensitivity: ${b.textContent.toLowerCase()}.`));
  B.querySelectorAll('[data-bs]').forEach(b=>b.onclick=()=>trRebuild({beatScale:+b.dataset.bs,shift:null},b.dataset.bs==='1'?'Tempo as heard.':`Read in ${b.textContent.toLowerCase()} time.`));
  B.querySelectorAll('[data-tm]').forEach(b=>b.onclick=()=>{ TR.timing=b.dataset.tm; store.set('trTiming',TR.timing); trPress('tm',TR.timing); trRollView();
    trMsg(TR.timing==='played'?'As played: every note where it really was, over the recording. Edits here move the sheet music too.':'On the beat: notes on the grid, like the sheet music.'); trResume(); });
  $('trLick').onclick=trToLick; $('trClose').onclick=()=>trLeave(trOpen,'Close this transcription?');
  $('trTitle').onclick=()=>{ const t=prompt('Name',TR.score.title); if(t&&t.trim()){ TR.score.title=t.trim(); trSetDirty(); trInfo(); } };
  const list=$('trExportList'); $('trExportBtn').onclick=e=>{ list.hidden=!list.hidden; e.stopPropagation(); };
  document.addEventListener('pointerdown',e=>{ if(list&&!list.hidden&&!e.target.closest('.trmenu')) list.hidden=true; });
  list.querySelectorAll('[data-exp]').forEach(b=>b.onclick=()=>{ list.hidden=true; const k=b.dataset.exp;
    if(k==='app') trSave(); else if(k==='pdf') trPDF();
    else if(k==='xml') trDownload(toMusicXML(TR.score),'musicxml','application/vnd.recordare.musicxml+xml');
    else trDownload(toMidiFile(TR.score,k==='midp'?trMaps():null),'mid','audio/midi'); });
  // scrolling a view yourself pauses its following for a moment
  ['trRoll','trScore'].forEach(id=>['wheel','touchmove'].forEach(ev=>$(id).addEventListener(ev,()=>{ TR.holdUntil=performance.now()+2500; },{passive:true})));
  trRender(); trHead(0);
}
const trPress=(attr,v)=>$('trBody').querySelectorAll(`[data-${attr}]`).forEach(x=>x.setAttribute('aria-pressed',String(x.dataset[attr==='bs'?'bs':attr])===String(v)));
function trLoopToggle(){ TR.looping=!TR.looping; if(TR.looping&&!TR.loop){ const a=Math.floor((TR.posB||0)/4)*4; TR.loop={a,b:a+4}; }
  $('trLoopBtn').setAttribute('aria-pressed',TR.looping); trRollView(); if(TR.looping) trMsg(`Looping bar${TR.loop.b-TR.loop.a>4?'s':''} ${trBars(TR.loop)}. Drag across the beat numbers to loop other bars.`); trResume(); }
const trBars=l=>{ const a=Math.floor(l.a/4)+1, b=Math.ceil(l.b/4); return b>a?`${a}–${b}`:`${a}`; };
// leaving with unsaved edits asks first
function trLeave(go,q){ if(TR.dirty&&!confirm(`${q} ${TR.saved==null?'This transcription isn\'t saved yet.':'Your changes since the last save will be lost.'}`)) return; trStopAll(); go(); }
function trSetDirty(){ TR.dirty=true; const d=$('trDirty'); if(d) d.textContent='Not saved'; }
/* The guide: one window with a tab per topic. Each ? button opens it on its own topic. */
const TR_GUIDE=[
 ['start','Quick start',`<p>The transcription is in two views: <b>sheet music</b> on top, and the <b>piano roll</b> under it (each bar is a block, each note a bar of colour; the keyboard down the side shows the pitches).</p>
   <ol><li>Press <kbd>Space</kbd> (or ▶) to hear it. <b>Hear</b> switches between the notes, the recording, or both together, which is the quickest way to spot a wrong note.</li>
   <li>Is beat 1 in the right place? Watch the chords and bar lines while it plays. If they're off, see <a data-gt="fix">Fixing the reading</a>.</li>
   <li>Too many stray notes, or too few? Change <b>Sensitivity</b>.</li>
   <li>Fix single notes in the piano roll: see <a data-gt="edit">Editing notes</a>.</li>
   <li><b>Save ▾</b> keeps it in Jun Jam with its recording, or makes a PDF, or a file for MuseScore or a DAW.</li></ol>`],
 ['play','Playing',`<ul><li><kbd>Space</kbd> plays and pauses from the playhead (the red line). <b>■</b> goes back to the start.</li>
   <li>Click the <b>beat numbers</b> above the piano roll, or anywhere in the <b>sheet music</b>, to move the playhead there.</li>
   <li><b>Loop</b>: drag across the beat numbers to loop those bars. <kbd>Shift+L</kbd> or ⟳ Loop turns it on and off.</li>
   <li><b>Hear</b>: Notes (what was transcribed), Recording (the original), or Both. <b>Speed</b> slows everything down without changing the pitch.</li>
   <li><b>Chords</b> plays the chord symbols under the notes. Turn it off to hear only the notes.</li>
   <li>While it plays, the views follow the playhead. Scroll yourself and they wait a moment before following again.</li></ul>`],
 ['fix','Fixing the reading',`<p>These change how the recording is read. Any edits you made to notes are replaced (Undo brings them back).</p>
   <ul><li><b>Sensitivity</b>: how sure a note has to be to show. <b>Low</b> or <b>Medium</b> suits fast, busy playing (fewer stray notes). <b>High</b> catches quiet or very short notes, with more stray ones.</li>
   <li><b>Tempo</b>: if the beat was heard at half or double speed (everything looks twice too fast or too slow), pick Half or Double.</li>
   <li><b>Beat 1</b>: each bar starts on the downbeat that was heard. If the bars go off from some point on:
     <ol><li>Put the playhead on the beat that should be 1 (click the beat numbers or the sheet music).</li><li>Press <b>Here</b>. The bars from there on start there; the ones before stay as they are.</li></ol>
     Or move them a beat at a time with <b>◀</b> <b>▶</b> (from the playhead's bar on; from the start, all bars). Quicker still: <b>double-click</b> the beat number that should be 1, or right-click it.
     A small flag on the beat numbers marks each place you set beat 1. Click a flag to take it away.</li>
   <li><b>Roll</b>: <b>On the beat</b> shows the notes on the grid, like the sheet music. <b>As played</b> shows them where they really were, over the recording's waveform. If something looks right As played but wrong On the beat, it's the beat or beat 1, not the notes.</li></ul>`],
 ['edit','Editing notes',`<p>All note editing happens in the piano roll. The line under it always says what a click or drag will do where your mouse is.</p>
   <ul><li><b>Select</b> tool: click a note to select it (<kbd>Shift</kbd>-click for more), or drag on empty space to draw a box around several. Drag a note to move it: sideways in time, up and down in pitch. Drag its <b>right edge</b> to make it longer or shorter.</li>
   <li><b>✎ Draw</b> tool: click to add a note, and drag to set its length. (With Select, double-click adds a note.) In a single line, drawing where a note already starts replaces it: the quickest way to fix a wrong note.</li>
   <li><b>Snap</b>: where notes land when you add or move them (quarter, 8th, 16th, 32nd, triplets). Notes in a tuplet beat keep to its spots.</li>
   <li>With notes selected: <b>▲ ▼</b> (<kbd>↑</kbd> <kbd>↓</kbd>) a half step, <b>+8 −8</b> (<kbd>Shift+↑</kbd> <kbd>Shift+↓</kbd>) an octave, <kbd>←</kbd> <kbd>→</kbd> nudge in time, <b>🗑</b> (<kbd>Delete</kbd>) removes.</li>
   <li><b>Right-click</b> a note or a beat for everything you can do there.</li>
   <li>Click a key on the side keyboard, or a note, to hear it. <kbd>Cmd+Z</kbd> undoes, <kbd>Shift+Cmd+Z</kbd> redoes.</li></ul>`],
 ['chords','Chords',`<ul><li>The chord lane is the strip above the notes. <b>Click a chord</b> to change its root and type, or remove it.</li>
   <li><b>Click an empty spot</b> in the lane to add a chord at the start of that bar. Right-click for the same choices.</li>
   <li>Chords are guessed one per bar. Reharmonised passages are often simplified, so check them by ear with <b>Chords</b> on.</li>
   <li>Lead sheets: <b>solo?</b> at the end of each bar marks it as a solo bar, which leaves it out of the sheet music and exports.</li></ul>`],
 ['keys','Your keyboard',`<ul><li>Play your <b>MIDI keyboard</b>, or the computer keys <kbd>A</kbd> <kbd>W</kbd> <kbd>S</kbd> <kbd>E</kbd> <kbd>D</kbd> <kbd>F</kbd>… (<kbd>Z</kbd> <kbd>X</kbd> change octave). The keys light up on the piano roll's keyboard.</li>
   <li><b>● Rec</b>, then Play: what you play along is written into the transcription, on the snap grid. One Undo takes back the whole take.</li></ul>`],
 ['save','Saving & export',`<ul><li><b>Save ▾ → In Jun Jam</b> (<kbd>Cmd+S</kbd>) keeps it under <b>Your transcriptions</b> on the Transcribe page, with the recording, so it reopens ready to play, hear the recording and re-read, without importing the audio again. "Not saved" means you have changes.</li>
   <li><b>PDF</b>: the sheet music on white paper. In the print window, set Destination to <b>Save as PDF</b>.</li>
   <li><b>MusicXML</b> opens in MuseScore, Sibelius, Finale and Dorico (tuplets, ties and chord symbols included). <b>MIDI, on the beat</b> is the grid version; <b>MIDI, as played</b> keeps the real timing, for a DAW.</li>
   <li><b>→ Lines</b>: select 3 to 16 notes and save them as a lick to practise in all keys.</li>
   <li><b>← Settings</b> goes back to choose a different part of the recording or instrument (it asks first if you have unsaved changes).</li></ul>`],
 ['shortcuts','Shortcuts',`<table class="trkeytable"><tr><td><kbd>Space</kbd></td><td>play / pause</td></tr><tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>playhead a beat (<kbd>Shift</kbd>: a bar), or nudge selected notes</td></tr>
   <tr><td><kbd>↑</kbd> <kbd>↓</kbd></td><td>selected notes a half step (<kbd>Shift</kbd>: an octave)</td></tr><tr><td><kbd>Delete</kbd></td><td>delete selected notes</td></tr>
   <tr><td><kbd>Shift+L</kbd></td><td>loop on / off</td></tr><tr><td><kbd>Cmd+Z</kbd> / <kbd>Shift+Cmd+Z</kbd></td><td>undo / redo</td></tr><tr><td><kbd>Cmd+S</kbd></td><td>save</td></tr>
   <tr><td><kbd>A</kbd> <kbd>W</kbd> <kbd>S</kbd>… <kbd>Z</kbd> <kbd>X</kbd></td><td>play notes, change octave</td></tr><tr><td><kbd>Esc</kbd></td><td>close a menu, then the transcription</td></tr></table>`]];
function trGuide(topic='start'){
  document.querySelectorAll('.trguidebox').forEach(x=>x.remove());
  const box=document.createElement('div'); box.className='trguidebox'; box.setAttribute('role','dialog');
  box.innerHTML=`<div class="trguidecard"><div class="trguidetabs">${TR_GUIDE.map(([k,t])=>`<button data-gt="${k}">${t}</button>`).join('')}</div><div class="trguidebody" id="trGuideBody"></div><button class="go" id="trGuideOk">Got it</button></div>`;
  document.body.appendChild(box);
  const show=k=>{ const g=TR_GUIDE.find(x=>x[0]===k)||TR_GUIDE[0]; box.querySelector('#trGuideBody').innerHTML=`<h3>${g[1]}</h3>${g[2]}`;
    box.querySelectorAll('.trguidetabs [data-gt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gt===g[0])); };
  box.onclick=e=>{ const t=e.target.closest('[data-gt]'); if(t){ e.preventDefault(); show(t.dataset.gt); } else if(e.target===box) box.remove(); };
  box.querySelector('#trGuideOk').onclick=()=>box.remove(); show(topic);
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
function trRestore(u){ const o=JSON.parse(u); TR.score=o.score; TR.shift=o.sh; if(TR.raw) TR.res=prepRes(TR.raw,TR.score.anchors||[]); TR.selected.clear(); trPress('sens',TR.score.sens??2); trPress('bs',TR.score.beatScale||1); trSetDirty(); trRender(); }
function trUndo(){ const u=TR.undo.pop(); if(!u) return trMsg('Nothing to undo.'); TR.redo.push(trSnap0()); trRestore(u); }
function trRedo(){ const u=TR.redo.pop(); if(!u) return trMsg('Nothing to redo.'); TR.undo.push(trSnap0()); trRestore(u); }
// Re-read the helper's answer with different settings (fewer or more notes, half or double time, beat 1). Hand edits are
// replaced, so say so; Undo brings them back.
function trReread(opts,msg){ const s=TR.score, had=TR.edited; trPush(false);
  TR.score={...buildScore(TR.res,{mode:s.mode,instrument:s.instrument,title:s.title,texture:s.texture||'line',sens:s.sens??2,beatScale:s.beatScale||1,shift:TR.shift,...opts}),soloBars:s.soloBars};
  TR.shift=TR.score.shift; TR.selected.clear(); TR.edited=false; trPress('sens',TR.score.sens); trPress('bs',TR.score.beatScale);
  trRender(); trMsg(msg+(had?' Your note edits were replaced: Undo brings them back.':'')); trResume(); }
function trRebuild(over,msg){ if(TR.res) trReread(over,msg); }
// "Beat 1 is here": from this point on the bars start here (earlier bars stay as they were). Undo takes it back.
function trSetBeat1(beat){ if(!TR.res) return; if(mod12(Math.round(beat))%4===0) return trMsg('That beat is already beat 1.');
  if(!TR.raw){ let sh=(TR.shift||0)+mod12(beat)%4; while(sh>0) sh-=4; return trReread({shift:sh},'Beat 1 set. The score is redrawn from there.'); }
  const t=trMaps().toSec(Math.round(beat)), A=(TR.score.anchors||[]).filter(a=>Math.abs(a-t)>.25).concat(t).sort((x,y)=>x-y);
  TR.res=prepRes(TR.raw,A); trReread({shift:null},`Beat 1 set at bar ${Math.floor(beat/4)+1}: the bars from here on start there.`); }
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
    h+=`<rect x="${x0}" y="0" width="${w}" height="${RULER}" class="rruler${one?' one':''}" data-beat="${b}"></rect><text x="${x0+4}" y="12" class="rbeatn${one?' one':''}">${b<0?'':one?(b/4+1)+'.':''}${b<0?'·':mod12(b)%4+1}</text>`; }
  if(pl){ h+=`<rect x="0" y="${RULER}" width="${W}" height="${WV}" class="rwavebg"/><g transform="translate(0 ${RULER})"><path d="${trWavePath(W,X.dur,X.k,WV)}" class="rwave"/></g>`;
    for(let t=0;t<X.dur;t+=5) h+=`<text x="${t*X.k+3}" y="${RULER+WV-3}" class="rsec">${fmtT(t).slice(0,-2)}</text>`; }
  for(let b=0;b<s.bars;b++){ const solo=(s.soloBars||[]).includes(b), x0=bx(b*4), w=bx(b*4+4)-x0;
    h+=`<rect x="${x0}" y="${LY}" width="${w}" height="${LANE}" class="rlane${solo?' solo':''}" data-bar="${b}"/>`+(s.mode==='lead'?`<text x="${x0+w-4}" y="${LY+16}" text-anchor="end" class="rsolo" data-solo="${b}">${solo?'solo ✓':'solo?'}</text>`:''); }
  s.chords.forEach((c,i)=>{ h+=`<text x="${bx(c.at)+3}" y="${LY+17}" class="rchord" data-chord="${i}">${symText(chordObj(c))}</text>`; });
  if(TR.loop&&TR.looping) h+=`<rect x="${bx(TR.loop.a)}" y="0" width="${bx(TR.loop.b)-bx(TR.loop.a)}" height="${RULER}" class="rloop"/>`;
  // where you set beat 1 by hand: a small flag (click it to take it away)
  (s.anchors||[]).forEach((a,i)=>{ const x=pl?a*X.k:trMaps().toBeat(a)*PXB;
    h+=`<g class="ranchor" data-anchor="${i}"><rect x="${x-2}" y="0" width="16" height="${RULER}" fill="transparent"/><path d="M${x} 0V${RULER}M${x} 1h11l-3 4 3 4h-11"/><text x="${x+3}" y="9">1</text></g>`; });
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
  TR.roll={lo,hi,y,score:s,X,pl,HH}; roll.scrollTop=keepT; roll.scrollLeft=viewChanged?keepL*W/Math.max(1,oldW):keepL; // switching views keeps roughly the same place in view
  if(firstDraw&&ps.length){ const mid=ps.slice().sort((a,b)=>a-b)[ps.length>>1]; roll.scrollTop=Math.max(0,y(mid)+HH-roll.clientHeight/2); } // open centred on the notes
  trRollEvents(); trKeysLit(); trSelInfo();
}
// Dragging survives redraws: the drag lives in TR.drag and the window follows the pointer
const trPt=(e,el)=>{ const r=el.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; };
// snap to 16ths, or to the spots of the note's own tuplet (a sextuplet note moves between sextuplet spots)
const trSnap=(b,D=4)=>Math.max(0,Math.round(b*D)/D);
// Edits keep both timings: as played, a note moves freely and its written place is re-snapped; on the beat, it snaps and keeps its feel (how early or late it was played)
window.addEventListener('pointermove',e=>{ const d=TR.drag, svg=$('trSvg'); if(!d||!svg||!TR.active) return; const s=TR.score, p=trPt(e,svg), px=p.x-d.p0.x, dy=Math.round((d.p0.y-p.y)/ROW);
  const pl=trPlayed(), mp=trMaps(), k=trPXS(), dx=px/PXB, ds=px/k, G=TR.snapDiv||4;
  if(d.mode!=='box'&&!d.pushed){ if(Math.abs(px)<3&&dy===0) return; if(!d.fresh) trPush(); d.pushed=true; }   // a click alone changes nothing
  if(d.mode==='move') d.orig.forEach(o=>{ const midi=Math.max(21,Math.min(108,o.midi+dy));
    if(pl){ const sec=Math.max(0,o.sec+ds), b=mp.toBeat(sec), gat=Math.abs(ds)<.01?o.gat:trSnap(b,trDivAt(Math.floor(b+.04),o.k,G)); s.melody[o.k]={...s.melody[o.k],midi,sec:Math.round(sec*1000)/1000,gat,tri:gat===o.gat&&o.tri}; }
    else { const gat=trSnap(o.gat+dx,o.tup||G); s.melody[o.k]={...s.melody[o.k],midi,gat,sec:gat===o.gat?o.sec:Math.max(0,Math.round((o.sec+mp.toSec(gat)-mp.toSec(o.gat))*1000)/1000)}; } });
  else if(d.mode==='len') d.orig.forEach(o=>{
    if(pl){ const dsec=Math.max(.05,o.dsec+ds); s.melody[o.k]={...s.melody[o.k],dsec:Math.round(dsec*1000)/1000,gdur:Math.max(1/G,trSnap(mp.toBeat(o.sec+dsec),G)-o.gat),tri:false}; }
    else { const u=1/(o.tup||G), gdur=Math.max(u,trSnap(o.gdur+dx,o.tup||G)); s.melody[o.k]={...s.melody[o.k],gdur,dsec:Math.max(.05,Math.round((mp.toSec(o.gat+gdur)-mp.toSec(o.gat))*1000)/1000),tri:false}; } });
  else { const x0=Math.min(p.x,d.p0.x), x1=Math.max(p.x,d.p0.x), y0=Math.min(p.y,d.p0.y), y1=Math.max(p.y,d.p0.y), X=TR.roll.X;
    TR.selected=new Set(s.melody.map((n,i)=>i).filter(i=>{ const n=s.melody[i], ny=TR.roll.y(n.midi)+ROW/2; return X.nx(n)<x1&&X.nx(n)+X.nw(n)>x0&&ny>y0&&ny<y1; })); }
  trRollView(); });
// the beat ruler: a click plays from there (or moves the playhead), a drag sets the loop
window.addEventListener('pointermove',e=>{ const r=TR.rdrag, head=$('trHeadSvg'); if(!r||!head||!TR.active) return; const x=trPt(e,head).x; if(Math.abs(x-r.x0)<5&&!r.moved) return;
  r.moved=true; const a=trBeatAtX(Math.min(x,r.x0)), b=trBeatAtX(Math.max(x,r.x0)); TR.loop={a:Math.max(0,Math.floor(a)),b:Math.max(Math.floor(a)+1,Math.ceil(b))}; TR.looping=true;
  const lb=$('trLoopBtn'); if(lb) lb.setAttribute('aria-pressed',true); trRollView(); });
window.addEventListener('pointerup',e=>{ const r=TR.rdrag; if(!r) return; TR.rdrag=null; const head=$('trHeadSvg');
  if(!r.moved&&head){ TR.posB=Math.max(0,trBeatAtX(r.x0)); if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); }
  else if(r.moved){ TR.posB=TR.loop.a; if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); trMsg(`Looping bar${TR.loop.b-TR.loop.a>4?'s':''} ${trBars(TR.loop)}. Shift+L or ⟳ Loop turns it off.`); } });
window.addEventListener('pointerup',()=>{ const d=TR.drag; if(!d) return; TR.drag=null; if(d.mode!=='box'&&(d.pushed||d.fresh)){ if(d.fresh) TR.lastLen=s0len(d); trTidy(); trRender(); } else trSelInfo(); });
const s0len=d=>{ const n=TR.score.melody[d.orig[0].k]; return n?n.gdur:TR.lastLen; };
function trRollEvents(){
  const svg=$('trSvg'), head=$('trHeadSvg'), s=TR.score;
  const pt=(e,el=svg)=>trPt(e,el);
  const toPitch=py=>TR.roll.hi-Math.floor(py/ROW);
  const keys=$('trKeys'); if(keys) keys.onpointerdown=e=>{ const k=e.target.closest('[data-key]'); if(k){ const m=+k.dataset.key; synth.init(); synth.on(m,80); setTimeout(()=>synth.off(m,.3),300); } };
  head.onpointerdown=e=>{
    const aEl=e.target.closest('[data-anchor]'); if(aEl){ trDropAnchor(+aEl.dataset.anchor); e.preventDefault(); return; }
    if(e.button===2) return;
    const rEl=e.target.closest('[data-beat]'), cEl=e.target.closest('[data-chord]'), sEl=e.target.closest('[data-solo]');
    if(rEl){ TR.rdrag={x0:pt(e,head).x,moved:false}; e.preventDefault(); return; }
    const beatAt=trBeatAtX;
    if(sEl){ trPush(); const b=+sEl.dataset.solo, sb=s.soloBars||(s.soloBars=[]); sb.includes(b)?sb.splice(sb.indexOf(b),1):sb.push(b); trRender(); return; }
    if(cEl){ trChordEdit(+cEl.dataset.chord,e); return; }
    if(e.target.closest('.rlane')){ trChordAdd(Math.max(0,Math.floor(beatAt(pt(e,head).x)/4)*4),e); return; }
  };
  head.ondblclick=e=>{ const rEl=e.target.closest('[data-beat]'); if(rEl) trSetBeat1(+rEl.dataset.beat); };
  head.oncontextmenu=e=>{ e.preventDefault(); const cEl=e.target.closest('[data-chord]');
    if(cEl){ const i=+cEl.dataset.chord; return trMenu(e,[{t:'Change this chord',f:()=>trChordEdit(i,e)},{t:'Remove it',f:()=>{ trPush(); s.chords.splice(i,1); trRender(); }}]); }
    trBeatMenu(e,trBeatAtX(pt(e,head).x)); };
  head.onpointermove=e=>{ if(TR.rdrag) return; const b=trBeatAtX(pt(e,head).x);
    if(e.target.closest('[data-anchor]')) return trHint('Beat 1 was set here by hand — click the flag to take it away');
    if(e.target.closest('[data-beat]')) return trHint(`${trWhere(b)} — click: play from here · drag: loop · double-click: this is beat 1 · right-click: more`);
    if(e.target.closest('[data-chord]')) return trHint('Chord — click to change it · right-click to remove it');
    if(e.target.closest('.rlane')) return trHint(`Chord lane, bar ${Math.floor(Math.max(0,b)/4)+1} — click an empty spot to add a chord`); };
  head.onpointerleave=()=>trHint('');
  svg.onpointerdown=e=>{
    const p=pt(e), nEl=e.target.closest('.rnote');
    if(nEl){ const i=+nEl.dataset.i, n=s.melody[i]; synth.init(); synth.on(n.midi,80); setTimeout(()=>synth.off(n.midi,.3),260); // hear it
      if(!e.shiftKey&&!TR.selected.has(i)) TR.selected.clear(); TR.selected.add(i);
      const edge=p.x>TR.roll.X.nx(n)+TR.roll.X.nw(n)-7;
      TR.drag={mode:edge?'len':'move',p0:p,orig:[...TR.selected].map(k=>({k,...s.melody[k]}))};
      trRollView(); e.preventDefault(); return; }
    if(TR.tool==='draw'){ const i=trAddNote(p); if(i>=0){ TR.selected=new Set([i]); TR.drag={mode:'len',fresh:true,p0:p,orig:[{k:i,...s.melody[i]}]}; trRollView(); } e.preventDefault(); return; }
    TR.selected.clear(); TR.drag={mode:'box',p0:p}; e.preventDefault();
  };
  svg.oncontextmenu=e=>{ e.preventDefault(); const nEl=e.target.closest('.rnote'); if(nEl){ const i=+nEl.dataset.i; if(!TR.selected.has(i)) TR.selected=new Set([i]); trRollView(); trNoteMenu(e); }
    else trBeatMenu(e,trBeatAtX(pt(e).x)); };
  svg.onpointermove=e=>{ if(TR.drag) return; const p=pt(e), nEl=e.target.closest('.rnote');
    if(nEl){ const n=s.melody[+nEl.dataset.i], edge=p.x>TR.roll.X.nx(n)+TR.roll.X.nw(n)-7; svg.style.cursor=edge?'ew-resize':'grab';
      trHint(`${trNoteName(n.midi)} · ${trWhere(n.gat)} — ${edge?'drag to change its length':'drag to move it (up/down: pitch) · right-click for more'}`); }
    else { svg.style.cursor=TR.tool==='draw'?'crosshair':'default'; const b=trBeatAtX(p.x);
      trHint(`${trNoteName(toPitch(p.y))} · ${trWhere(b)} — ${TR.tool==='draw'?'click to add a note here, drag to set its length':'drag to select notes · double-click to add one · right-click for more'}`); } };
  svg.onpointerleave=()=>trHint('');
  svg.ondblclick=e=>{ if(e.target.closest('.rnote')||TR.tool==='draw') return; const i=trAddNote(pt(e)); if(i>=0){ TR.selected=new Set([i]); trTidy(); trRender(); } };
}
/* ---------------- editing helpers: add, name, hint line, selection, right-click menus ---------------- */
// a new note where you clicked, on the snap grid (or the beat's tuplet), as long as the last note you drew
function trAddNote(p){ const s=TR.score, mp=trMaps(), G=TR.snapDiv||4, m=TR.roll.hi-Math.floor(p.y/ROW);
  const b=trPlayed()?mp.toBeat(p.x/trPXS()):p.x/PXB, D=trDivAt(Math.floor(b+.04),-1,G), at=Math.max(0,Math.floor(b*D+1e-6)/D), len=Math.max(1/D,TR.lastLen||.5);
  if(s.melody.some(n=>n.midi===m&&Math.abs(n.gat-at)<1e-6)) return -1;
  trPush(); const sec=Math.max(0,mp.toSec(at));
  // a single line has one note at a time: drawing over a note replaces it (that's how you fix a wrong one)
  if(s.texture!=='full'){ const k=s.melody.length; s.melody=s.melody.filter(n=>Math.abs(n.gat-at)>1e-6); TR.selected.clear(); if(s.melody.length<k) trMsg(`Replaced the note at ${trWhere(at)}.`); } synth.init(); synth.on(m,80); setTimeout(()=>synth.off(m,.3),260);
  s.melody.push({midi:m,gat:at,gdur:len,tri:D===3,tup:[1,2,4,8].includes(D)?0:D,sec:Math.round(sec*1000)/1000,dsec:Math.max(.05,Math.round((mp.toSec(at+len)-sec)*1000)/1000)});
  return s.melody.length-1; }
const trNoteName=m=>plainSpell(m).name+(Math.floor(m/12)-1);
const trWhere=b=>{ const bb=Math.max(0,b); return `bar ${Math.floor(bb/4)+1}, beat ${+((bb%4)+1).toFixed(2)}`; };
function trHint(t){ const h=$('trHintLine'); if(h) h.textContent=t||(TR.selected.size?'':'Hover over the piano roll to see what a click or drag does there.'); }
function trSelInfo(){ const el=$('trSelInfo'); if(!el) return; const s=TR.score, sel=[...TR.selected].map(i=>s.melody[i]).filter(Boolean).sort((a,b)=>a.gat-b.gat||a.midi-b.midi);
  el.textContent=sel.length?`${sel.length} note${sel.length>1?'s':''} selected: ${sel.slice(0,6).map(n=>trNoteName(n.midi)).join(' ')}${sel.length>6?' …':''} (${trWhere(sel[0].gat)})`:'No notes selected';
  document.querySelectorAll('#trBody [data-selact]').forEach(b=>b.disabled=!sel.length); }
// selected notes: transpose, octave, delete
function trSelAct(k){ const s=TR.score, sel=[...TR.selected]; if(!sel.length) return trMsg('Select notes first: click one, or drag a box around several.');
  if(k==='del'){ trPush(); s.melody=s.melody.filter((n,i)=>!TR.selected.has(i)); TR.selected.clear(); trRender(); trMsg(`Deleted ${sel.length} note${sel.length>1?'s':''}. Undo brings ${sel.length>1?'them':'it'} back.`); return; }
  const d={up:1,down:-1,oup:12,odown:-12}[k]; trPush(); sel.forEach(i=>s.melody[i].midi=Math.max(21,Math.min(108,s.melody[i].midi+d))); trRender();
  const n=s.melody[sel[0]]; synth.init(); synth.on(n.midi,80); setTimeout(()=>synth.off(n.midi,.3),260); }
// a small menu where you right-clicked
function trMenu(e,items){ document.querySelectorAll('.trctx').forEach(x=>x.remove());
  const m=document.createElement('div'); m.className='trmenulist trctx'; m.innerHTML=items.map((it,i)=>it?`<button data-mi="${i}"${it.off?' disabled':''}>${it.t}${it.k?`<span class="fine">${it.k}</span>`:''}</button>`:'<hr>').join('');
  document.body.appendChild(m); m.style.position='fixed'; m.style.left=Math.min(innerWidth-260,e.clientX)+'px'; m.style.top=Math.min(innerHeight-m.offsetHeight-8,e.clientY)+'px';
  m.querySelectorAll('[data-mi]').forEach(b=>b.onclick=()=>{ m.remove(); items[+b.dataset.mi].f(); });
  setTimeout(()=>document.addEventListener('pointerdown',function f(ev){ if(!m.contains(ev.target)){ m.remove(); document.removeEventListener('pointerdown',f); } }),0); }
function trNoteMenu(e){ const n=TR.score.melody[[...TR.selected][0]], b=n?n.gat:0, many=TR.selected.size>1;
  trMenu(e,[{t:'Play from here',f:()=>{ TR.posB=b; trPlayScore(b); }},{t:many?'Delete these notes':'Delete',k:'Delete',f:()=>trSelAct('del')},null,
    {t:'Up a half step',k:'↑',f:()=>trSelAct('up')},{t:'Down a half step',k:'↓',f:()=>trSelAct('down')},{t:'Up an octave',k:'Shift+↑',f:()=>trSelAct('oup')},{t:'Down an octave',k:'Shift+↓',f:()=>trSelAct('odown')},null,
    {t:'Beat 1 is here (bars from here on)',off:!TR.res,f:()=>trSetBeat1(Math.round(b))}]); }
function trBeatMenu(e,b){ const bar=Math.floor(Math.max(0,b)/4);
  trMenu(e,[{t:'Play from here',f:()=>{ TR.posB=Math.max(0,b); trPlayScore(TR.posB); }},{t:`Loop bar ${bar+1}`,f:()=>{ TR.loop={a:bar*4,b:bar*4+4}; TR.looping=false; trLoopToggle(); }},null,
    {t:'Beat 1 is here (bars from here on)',off:!TR.res,f:()=>trSetBeat1(Math.round(b))},{t:'Bars from here: one beat earlier',off:!TR.res,f:()=>trNudgeBars(-1,b)},{t:'Bars from here: one beat later',off:!TR.res,f:()=>trNudgeBars(1,b)},null,
    {t:'Add a chord in this bar',f:()=>trChordAdd(bar*4,e)}]); }
function trDropAnchor(i){ if(!TR.raw) return; const A=(TR.score.anchors||[]).filter((_,k)=>k!==i);
  TR.res=prepRes(TR.raw,A); trReread({shift:null},'Beat 1 mark removed: those bars follow the detected downbeats again.'); }
// move the bar lines one beat, from the bar at b on (from the start: all of them)
function trNudgeBars(d,b=TR.posB){ if(!TR.res) return; const bar=Math.floor(Math.max(0,b)/4);
  if(bar===0||!TR.raw) return trReshift(d);
  trSetBeat1(bar*4+(d<0?-1:1)); }
// keep notes in time order; a single line can't run into its next note (full parts can overlap: chords and held notes)
function trTidy(){ const m=TR.score.melody; const sel=[...TR.selected].map(i=>m[i]); m.sort((a,b)=>a.gat-b.gat||b.midi-a.midi); trRetuple(m);
  if(TR.score.texture!=='full') for(let i=0;i<m.length-1;i++){ if(m[i].gat+m[i].gdur>m[i+1].gat) m[i].gdur=Math.max(.05,m[i+1].gat-m[i].gat);
    if(m[i].sec!=null&&m[i+1].sec!=null&&m[i].sec<m[i+1].sec&&m[i].sec+m[i].dsec>m[i+1].sec) m[i].dsec=Math.max(.03,m[i+1].sec-m[i].sec); }
  TR.selected=new Set(sel.map(n=>m.indexOf(n)).filter(i=>i>=0)); }
// the division a beat is written in: its notes' tuplet, else 16ths (skip: the note being moved)
function trDivAt(beat,skip,dflt=4){ const ns=TR.score.melody.filter((n,i)=>i!==skip&&Math.floor(n.gat+1e-6)===beat&&n.tup); return ns.length?ns[0].tup:dflt; }
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
  const bus=TR.bus=newBus(); if(!bus) return; TR.playing=true; TR.posB=from; TR.recTake=false;
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
/* Your keyboard (MIDI, or the computer keys) in Transcribe: you hear it, the key lights up on the piano roll's keyboard,
   and with Rec on, notes you play while it plays back are written in, on the beat's grid (or its tuplet). */
function trMidi(m,v){
  if(v>0){ TR.down.add(m); if(TR.rec&&TR.playing&&TR.step==='edit') TR.recOn[m]={b:TR.posB}; else if(TR.rec&&TR.step==='edit'&&!TR.recWarned){ TR.recWarned=true; trMsg('Rec is on: press Play (Space), then play along.'); } }
  else { TR.down.delete(m); const st=TR.recOn[m]; delete TR.recOn[m]; if(st) trRecNote(m,st.b,TR.posB); }
  trKeysLit(); }
function trKeysLit(){ const k=$('trKeys'); if(!k) return; k.querySelectorAll('[data-key]').forEach(r=>r.classList.toggle('kdown',TR.down.has(+r.dataset.key))); }
function trRecNote(m,b0,b1){ const s=TR.score; if(!(b1>b0)) b1=b0+.25;
  const D=trDivAt(Math.floor(b0+.04)), gat=trSnap(b0,D), gdur=Math.max(1/D,trSnap(b1-b0,D)), mp=trMaps();
  if(s.melody.some(n=>n.midi===m&&Math.abs(n.gat-gat)<1e-6)) return;            // already there
  if(!TR.recTake){ trPush(); TR.recTake=true; }                                    // one undo per take
  const sec=Math.max(0,mp.toSec(gat)); s.melody.push({midi:m,gat,gdur,tri:D===3,tup:[1,2,4,8].includes(D)?0:D,sec:Math.round(sec*1000)/1000,dsec:Math.max(.05,Math.round((mp.toSec(gat+gdur)-sec)*1000)/1000)});
  trTidy(); trSetDirty(); trInfo(); trScoreView(); trRollView(); }
const TR_QW={a:0,w:1,s:2,e:3,d:4,f:5,t:6,g:7,y:8,h:9,u:10,j:11,k:12,o:13,l:14,p:15,';':16,"'":17};
document.addEventListener('keyup',e=>{ if(typeof TR==='undefined'||!TR.active||!TR.qDown) return; const m=TR.qDown[e.key.toLowerCase()]; if(m!=null){ delete TR.qDown[e.key.toLowerCase()]; noteOff(m); } });
// the playhead: in the piano roll, on the sheet music (a line over the bar being played), and as bar · beat
function trHead(b){ const pos=$('trPos'); if(pos){ const bb=Math.max(0,b); pos.textContent=`${Math.floor(bb/4)+1} · ${Math.floor(bb%4)+1}`; }
  const bf=$('trB1From'); if(bf){ const bar=Math.floor(Math.max(0,b)/4); bf.textContent=bar?`from bar ${bar+1} on`:'all bars'; }
  const pb=$('trPlay'); if(pb) pb.textContent=TR.playing?'❚❚':'▶';
  const h=$('trHead'); if(h){ const x=trHeadX(b); h.setAttribute('x1',x); h.setAttribute('x2',x); if(TR.playing&&trFollow()) trFollowRoll(x,b); }
  trSheetHead(b); }
// While it plays, the views follow the playhead, unless you've just scrolled them yourself (then they wait 2.5 s)
const trFollow=()=>!(TR.holdUntil>performance.now());
function trFollowRoll(x,b){ const roll=$('trRoll'), R0=TR.roll; if(!roll||!R0) return;
  const vis=roll.clientWidth-46; if(x<roll.scrollLeft||x>roll.scrollLeft+vis*.85) roll.scrollLeft=Math.max(0,x-vis*.15);   // the keyboard column is 46 px
  const s=TR.score, pl=trPlayed(), t=pl?trMaps().toSec(b):0;
  const now=s.melody.filter(n=>pl?n.sec<=t+.05&&n.sec+n.dsec>t:n.gat<=b+.1&&n.gat+n.gdur>b);
  if(!now.length) return; const lo=Math.min(...now.map(n=>R0.y(n.midi))), hi=Math.max(...now.map(n=>R0.y(n.midi)))+ROW, h=roll.clientHeight-R0.HH;
  if(lo<roll.scrollTop||hi>roll.scrollTop+h) roll.scrollTop=Math.max(0,(lo+hi)/2-h/2); }
function trSheetHead(b){ const sc=$('trScore'); if(!sc||!TR.lines) return;
  TR.lines.forEach((L,k)=>{ const el=sc.querySelector(`[data-line="${k}"]`); if(!el) return; const hd=el.querySelector('.trshead'), svg=el.querySelector('svg');
    const inside=b>=L.a-1e-6&&b<L.a+L.nb*4-1e-6&&(TR.playing||b>0);
    if(!inside||!svg){ hd.style.display='none'; return; }
    const i=Math.min(L.nb*4-1,Math.floor(b-L.a+1e-9)), x=L.X0+L.cum[i]+(b-L.a-i)*L.bw[i], sr=svg.getBoundingClientRect(), er=el.getBoundingClientRect();
    hd.style.display='block'; hd.style.left=(sr.left-er.left+x*sr.width/L.W)+'px';
    if(TR.playing&&trFollow()){ const er=el.getBoundingClientRect(), cr=sc.getBoundingClientRect(); if(er.top<cr.top||er.bottom>cr.bottom) sc.scrollTop+=er.top-cr.top-6; } }); }
async function trSave(){
  const s=TR.score; if(!s.id) s.id='t'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const old=TR.saved!=null&&TRDATA.list[TR.saved], withMedia=!!(TR.file&&TR.raw&&TR.res);
  if(withMedia&&TR.mediaFor!==s.id+'|'+TR.sel){   // the recording goes in once (and again only if the part changed)
    try{ await trDB.put(s.id,{file:TR.file,sel:TR.sel,raw:TR.raw,shift:TR.shift}); TR.mediaFor=s.id+'|'+TR.sel; navigator.storage&&navigator.storage.persist&&navigator.storage.persist(); }
    catch(e){ trMsg("The notes are saved, but there wasn't room to keep the recording with them.",'no'); } }
  const item={...s,saved:Date.now(),media:withMedia&&TR.mediaFor===s.id+'|'+TR.sel||!!(old&&old.media)};
  if(old) TRDATA.list[TR.saved]=item; else { TRDATA.list.unshift(item); TR.saved=0; if(TRDATA.list.length>40){ const t=TRDATA.list.pop(); if(t.id) trDB.del(t.id); } }
  saveTr(); TR.dirty=false; trInfo(); trMsg(item.media?'Saved with the recording. It\'s under Your transcriptions in Transcribe.':'Saved. It\'s under Your transcriptions in Transcribe.','ok');
}
// Reopen a saved one: with its recording when that was kept, so playback, Hear recording and re-reading all work again
async function trOpenSaved(i){
  const sc=JSON.parse(JSON.stringify(TRDATA.list[i])), m=sc.id&&sc.media?await trDB.get(sc.id):null;
  if(m&&m.file){ try{ trMsg('Opening…'); const buf=await synth.ctx.decodeAudioData(await m.file.arrayBuffer()); if(TR.url) URL.revokeObjectURL(TR.url);
      Object.assign(TR,{buf,file:m.file,url:URL.createObjectURL(m.file),title:sc.title,sel:m.sel,mode:sc.mode,instrument:sc.mode==='lead'?'piano':sc.instrument,texture:sc.texture,raw:m.raw,shift:m.shift,mediaFor:sc.id+'|'+m.sel});
      return trEdit(sc,prepRes(m.raw,sc.anchors||[]),i); }catch(e){ trMsg("Couldn't open its recording, so it opens as notes only.",'no'); } }
  Object.assign(TR,{buf:null,file:null,raw:null,res:null,mediaFor:null}); if(TR.url){ URL.revokeObjectURL(TR.url); TR.url=null; }
  trEdit(sc,null,i);
}
// PDF: the sheet music on white paper in a print window, where Chrome offers Save as PDF
function trPDF(){
  const s=TR.score, lines=[...$('trScore').querySelectorAll('.trline')].map(el=>{ const c=el.cloneNode(true); c.querySelectorAll('.trshead').forEach(x=>x.remove()); return c.outerHTML; }).join('');
  const cs=getComputedStyle(document.documentElement), v=k=>cs.getPropertyValue(k).trim(), fonts=[...document.querySelectorAll('link[rel=stylesheet][href*="fonts.googleapis"]')].map(l=>l.outerHTML).join('');
  const f=document.createElement('iframe'); f.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0'; document.body.appendChild(f);
  const d=f.contentDocument; d.open(); d.write(`<!doctype html><html><head><meta charset="utf-8"><title>${trEsc(s.title)}</title>${fonts}<style>
    @page{margin:14mm} :root{--ink:#111} body{margin:0;font-family:${v('--body')};color:#111}
    h1{font-family:${v('--hand')};font-size:30px;margin:0 0 2px;text-align:center} .sub{text-align:center;font-size:13px;color:#555;margin:0 0 14px}
    .trline{position:relative;break-inside:avoid;margin-bottom:6px} .trline svg{max-width:100%;height:auto;display:block}
    .trbar{position:absolute;left:4px;top:0;font-size:10px;color:#666} .ln{stroke:#111;stroke-width:1;opacity:.6}
    .clef{fill:#111;font-family:'Bravura','Noto Music','Segoe UI Symbol','Apple Symbols',serif} .acc{font-family:'Noto Music',${v('--body')};font-size:15px;font-weight:600}
    .csym{font-family:${v('--hand')};font-weight:700;font-size:15px;fill:#111} .foot{text-align:center;font-size:10px;color:#999;margin-top:14px}</style></head>
    <body><h1>${trEsc(s.title)}</h1><p class="sub">${s.mode==='lead'?'Lead sheet':(TR_INSTRUMENTS[s.instrument]||{}).name||''} · ♩ = ${s.tempo} · ${keyName(s.key.pc,s.key.minor)}</p>${lines}<p class="foot">Transcribed with Jun Jam</p></body></html>`); d.close();
  const title=document.title; trMsg('In the print window, set Destination to "Save as PDF".');
  const go=()=>{ document.title=s.title; f.contentWindow.focus(); f.contentWindow.print(); document.title=title; setTimeout(()=>f.remove(),1000); };
  Promise.race([d.fonts.ready,new Promise(r=>setTimeout(r,1500))]).then(()=>setTimeout(go,50));
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
  if(e.key==='Escape'){ const pops=document.querySelectorAll('.trpop,.trguidebox,.trctx,.trmenulist:not([hidden])');
    if(pops.length){ pops.forEach(x=>x.classList.contains('trmenulist')&&!x.classList.contains('trctx')?x.hidden=true:x.remove()); return true; }
    if(TR.step==='edit') trLeave(trOpen,'Close this transcription?'); else if(TR.step==='setup') trOpen(); else trToMenu(); return true; }
  if(TR.step!=='edit'||document.querySelector('.trguidebox')) return true;
  const s=TR.score, sel=[...TR.selected], cmd=e.metaKey||e.ctrlKey;
  if(e.key===' '){ e.preventDefault(); trToggle(); return true; }
  if(cmd&&e.key.toLowerCase()==='z'){ e.preventDefault(); e.shiftKey?trRedo():trUndo(); return true; }
  if(cmd&&e.key.toLowerCase()==='y'){ e.preventDefault(); trRedo(); return true; }
  if(cmd&&e.key.toLowerCase()==='s'){ e.preventDefault(); trSave(); return true; }
  if(!cmd&&e.shiftKey&&e.key.toLowerCase()==='l'){ trLoopToggle(); return true; }
  // the computer keys as a piano (as in Hands): A W S E D F T G Y H U J K O L P ; '   Z / X: octave down / up
  const qk=e.key.toLowerCase();
  if(!cmd&&!e.altKey&&!e.shiftKey&&(qk==='z'||qk==='x')){ qOct=Math.max(36,Math.min(84,qOct+(qk==='x'?12:-12))); paintQwerty(); trMsg(`Computer keys play from C${qOct/12-1}.`); return true; }
  if(!cmd&&!e.altKey&&!e.shiftKey&&qk in TR_QW){ if(!e.repeat){ TR.qDown=TR.qDown||{}; if(TR.qDown[qk]==null){ const m=qOct+TR_QW[qk]; TR.qDown[qk]=m; noteOn(m,90); } } return true; }
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){ e.preventDefault(); const dir=e.key==='ArrowRight'?1:-1;
    if(!sel.length){ const st=e.shiftKey?4:1; TR.posB=Math.max(0,Math.min(s.bars*4-1e-3,(dir>0?Math.floor(TR.posB/st+1e-6)+1:Math.ceil(TR.posB/st-1e-6)-1)*st)); if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); return true; }
    trPush(); const mp=trMaps(); sel.forEach(i=>{ const n=s.melody[i], u=1/(n.tup||4), g=Math.max(0,n.gat+dir*u); n.sec=Math.max(0,n.sec+mp.toSec(g)-mp.toSec(n.gat)); n.gat=g; }); trTidy(); trRender(); return true; }
  if((e.key==='Delete'||e.key==='Backspace')&&sel.length){ trPush(); s.melody=s.melody.filter((n,i)=>!TR.selected.has(i)); TR.selected.clear(); trRender(); return true; }
  if((e.key==='ArrowUp'||e.key==='ArrowDown')&&sel.length){ e.preventDefault(); trPush(); const d=(e.key==='ArrowUp'?1:-1)*(e.shiftKey?12:1); sel.forEach(i=>s.melody[i].midi+=d); trRender(); return true; }
  return true; // nothing else in Jun Jam reacts to keys while transcribing
}
