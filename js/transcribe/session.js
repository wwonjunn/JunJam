/* Transcribe: mp3 in, editable sheet music out. The helper (tools/transcriber) does the listening on this Mac;
   this screen imports the recording, asks what you want to see, sends the selection, and lets you fix the result. */
const TR_URL='http://127.0.0.1:8771';
let TRDATA=store.get('trans',{list:[]}); TRDATA.folders=TRDATA.folders||[];
const trNewId=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
TRDATA.list.forEach(t=>{ if(!t.id) t.id=trNewId('t'); });
// false when the browser's storage is full (with a library folder linked, the folder is written instead, by library.js)
const saveTr=()=>{ if(typeof LIB!=='undefined'&&LIB.on) return true; try{ localStorage.setItem('mtc:trans',JSON.stringify(TRDATA)); return true; }catch(e){ return false; } };
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
    <ol><li>Open <b>Terminal</b> (${MODK}+Space, type Terminal, press Enter) and paste this to install the helper:${cmd(`bash ${q((dir||'/path/to/Jun Jam')+'/tools/transcriber/install.sh')}`,'trCmd1')}${where}</li>
    <li>From then on <b>Jun Jam.app starts it for you</b>. If you open Jun Jam another way, start the helper with:${cmd(`"$HOME/Library/Application Support/Jun Jam/transcriber-venv/bin/python" "$HOME/Library/Application Support/Jun Jam/server.py"`,'trCmd2')}</li>
    <li><button class="go" id="trRecheck">Check again</button></li></ol></div>`;
}

/* ---------------- start screen ---------------- */
async function trOpen(){
  trStopAll(); Object.assign(TR,{active:true,step:'start'});
  synth.init(); hideOv(); document.body.classList.add('nohud','trmode'); document.body.classList.remove('menu'); $('transStage').hidden=false;
  $('trBody').innerHTML=`<button class="back" id="trBack">← All modes</button><div class="etop"><span class="etitle">Transcribe a recording</span><span id="trStatus">Checking the helper…</span></div>
    <div id="trLib"></div>${TRDATA.list.length||TRDATA.folders.length?'<div class="sec" style="margin-top:16px">New transcription</div>':''}
    <p>Drop in an mp3 (or any audio file you own). Choose what you want to see, select the part of the song, and it comes back as sheet music with chords that you can fix and save.</p>
    <div id="trGuide"></div>
    <label class="trdrop" id="trDrop"><input type="file" id="trFile" accept="audio/*,.junjam" hidden><b>Choose an audio file</b><span>or drop it here. A .junjam file someone sent you opens here too.</span></label>
    <div class="trhome"><button class="ghost" id="trTabRec" style="margin-left:0">Record from a tab</button><span>Playing it on YouTube or anywhere else in Chrome? Capture that tab's sound while you play the part you want.</span></div>
    <div class="erow" style="margin-top:14px"><button class="ghost" id="trHome">Back</button></div>`;
  $('trHome').onclick=trToMenu; $('trBack').onclick=trToMenu;
  const f=$('trFile'), drop=$('trDrop');
  f.onchange=()=>f.files[0]&&trLoad(f.files[0]);
  drop.ondragover=e=>{ e.preventDefault(); drop.classList.add('over'); }; drop.ondragleave=()=>drop.classList.remove('over');
  drop.ondrop=e=>{ e.preventDefault(); drop.classList.remove('over'); const file=e.dataTransfer.files[0]; if(file) trLoad(file); };
  trLibRender(); (LIB.on?libScan().catch(e=>{ libFail(); LIB.err="Couldn't read the library folder (moved or deleted?). Pick it again."; }):libInit()).then(()=>{ trLibRender(); trLibNotes(); });   // read the folder fresh: Finder changes show up
  $('trBody').onclick=e=>{ const c=e.target.closest('[data-copy]');
    if(c){ navigator.clipboard&&navigator.clipboard.writeText($(c.dataset.copy).textContent); c.textContent='Copied'; setTimeout(()=>c.textContent='Copy',1200); return; }
    if(e.target.id==='trRecheck') trCheck(); if(e.target.id==='trTabRec') trTabRecord(); };
  trCheck();
}
/* ---------------- your transcriptions: folders, rename, move, delete ----------------
   Kept in the browser, or (once you link one) as files in your library folder (library.js): then every change here
   is a change to those files, and the list is read back from the folder. */
function trLibCard(t,i){ return `<button class="lick" draggable="true" data-open="${i}" title="Open. Drag onto a folder to move it; right-click for more"><span class="ln">${t.mode==='lead'?'Lead sheet':(TR_INSTRUMENTS[t.instrument]||{}).name+(t.texture==='full'?' with chords':' line')} · ${t.bars} bars</span><span class="lt">${trEsc(t.title)}</span><span class="lst">♩ = ${t.tempo}, ${keyName(t.key.pc,t.key.minor)}${t.media?' · <b title="The recording is saved with it">♫ with recording</b>':''}</span><span class="more" data-more="${i}" title="Rename, move, delete">⋯</span><span class="del" data-del="${i}" title="Delete">×</span></button>`; }
// Where they're kept, and the link / allow buttons
function trLibWhere(){
  if(!LIB_OK) return '';
  if(LIB.on) return `<div class="trlibwhere fine">Kept as files in <b>${trEsc(libWhereName())}</b><span class="trspace"></span><button class="ghost trsm" id="trLibMore" title="Library folder">Folder ⋯</button></div>`;
  if(LIB.need) return `<div class="trguide trlibneed"><b>Your library folder needs your OK again</b> (Chrome asks after a restart unless you chose “Allow on every visit”).<div class="erow"><button class="go" id="trLibAllow">Allow</button><button class="ghost" id="trLibMore">Other options</button></div></div>`;
  if(LIB.err) return `<div class="trguide trlibneed"><b>${trEsc(LIB.err)}</b><div class="erow"><button class="go" id="trLibLink">Pick the folder</button><button class="ghost" id="trLibOff">Keep them in the browser</button></div></div>`;
  return `<div class="trlibwhere fine">Kept in this browser (clearing Chrome's site data would lose them)<span class="trspace"></span><button class="ghost trsm" id="trLibLink" title="Choose the Jun Jam folder: they go in library/ inside it, as files you can see in Finder">Keep them in a folder…</button></div>`; }
async function trLibAct(f,msg){ let r; try{ r=await f(); }catch(e){ trMsg(`Couldn't do that in your library folder: ${e.message}`,'no'); await libScan().catch(()=>{}); trLibRender(); return; }
  trLibRender(); if(r!==false&&msg) trMsg(typeof msg==='function'?msg(r):msg,'ok'); return r; }
function trLibNotes(){ if(LIB.notes.length){ trMsg(LIB.notes.join(' '),LIB.notes.some(n=>/can't|isn't|Using/.test(n))?'no':'ok'); LIB.notes=[]; } }
function trLibWire(){
  const link=$('trLibLink'), allow=$('trLibAllow'), more=$('trLibMore'), off=$('trLibOff');
  if(link) link.onclick=async()=>{ trMsg('In the window: open Jun Jam, click its library folder, then Select.');
    const r=await libLink(); if(r) await libSyncAll(); libChip(); trLibRender(); if(!r){ trMsg(LIB.err||'No folder picked; they stay in the browser.',LIB.err?'no':''); return; }
    trMsg(`Linked. ${r.n?`Copied your ${r.n} transcription${r.n>1?'s':''} into it${r.rec?` (${r.rec} with the recording)`:''}; the browser keeps its copy too.`:'From now on they\'re saved there.'}${r.failed.length?` Couldn't copy: ${r.failed.join(', ')}.`:''}`,r.failed.length?'no':'ok'); trLibNotes(); };
  if(allow) allow.onclick=async()=>{ if(await libAllow()){ await libSyncAll(); libChip(); trLibRender(); trLibNotes(); } else trMsg("Chrome didn't allow it, so the library can't be read yet.",'no'); };
  if(off) off.onclick=async()=>{ await libUnlink(); trLibRender(); trMsg('Back to the transcriptions kept in this browser.'); };
  if(more) more.onclick=e=>{ const left=LIB.on?libBrowserOnly().length:0;
    trMenu(e,[...(LIB.on?[{t:'Read the folder again',f:()=>trLibAct(libScan,()=>{ trLibNotes(); return 'Read it again.'; })}]:[]),
      ...(left?[{t:`Copy in the ${left} kept in this browser`,f:()=>trLibAct(libCopyIn,r=>`Copied ${r.n}.`)}]:[]),
      {t:'Use a different folder…',f:()=>link?link.onclick():(async()=>{ const r=await libLink(); if(r) await libSyncAll(); trLibRender(); if(r) trMsg('Linked.','ok'); })()},
      null,{t:'Stop using the folder (back to the browser)',f:async()=>{ if(!confirm('Go back to the transcriptions kept in this browser? The files stay in the folder; the browser shows what it had when you linked it.')) return; await libUnlink(); trLibRender(); }}]); };
}
function trLibRender(){
  const el=$('trLib'); if(!el) return;
  if(LIB.need||LIB.err){ el.innerHTML=trLibWhere(); trLibWire(); return; }
  const L=TRDATA.list, F=TRDATA.folders, known=new Set(F.map(f=>f.id)), lib=LIB.on;
  if(!L.length&&!F.length){ el.innerHTML=trLibWhere(); trLibWire(); return; }
  const cards=fid=>L.map((t,i)=>[t,i]).filter(([t])=>(known.has(t.folder)?t.folder:'')===fid).map(([t,i])=>trLibCard(t,i)).join('');
  el.innerHTML=`<div class="trlibbar"><span class="sec">Your transcriptions</span><span class="trspace"></span><button class="ghost trsm" id="trNewFolder">+ New folder</button></div>${trLibWhere()}
    ${F.map(f=>{ const n=L.filter(t=>t.folder===f.id).length, c=cards(f.id);
      return `<div class="trfolder" data-drop="${f.id}"><div class="trfhead" data-ftoggle="${f.id}"><span class="trcaret">${f.closed?'▸':'▾'}</span><b>📁 ${trEsc(f.name)}</b><span class="fine">${n||'empty'}</span><span class="trspace"></span>
        <button class="ghost trsm" data-frename="${f.id}">Rename</button><button class="ghost trsm" data-fdel="${f.id}">Delete</button></div>
        ${f.closed?'':c?`<div class="licks">${c}</div>`:'<p class="fine trfempty">Drag transcriptions here, or use ⋯ → Move.</p>'}</div>`; }).join('')}
    <div class="trfolder trtoplevel" data-drop="">${cards('')?`${F.length?'<div class="fine trloose">Not in a folder</div>':''}<div class="licks">${cards('')}</div>`:F.length?'<p class="fine trfempty">Drag a transcription here to take it out of its folder.</p>':''}</div>`;
  trLibWire();
  const commit=msg=>{ if(!saveTr()) trMsg("Couldn't save that: this browser's storage is full.",'no'); else if(msg) trMsg(msg,'ok'); trLibRender(); };
  const move=(i,fid)=>{ const t=L[i]; if(!t) return; const f=F.find(x=>x.id===fid), msg=`Moved to ${f?f.name:'the top level'}.`;
    if(lib){ if(f) libSetClosed(fid,false); return trLibAct(async()=>{ await libMove(t,fid); await libScan(); },msg); }
    if(fid) t.folder=fid; else delete t.folder; if(f) f.closed=false; commit(msg); };
  const del=i=>{ const t=L[i]; if(!t||!confirm(`Delete “${t.title}”?${lib?' Its folder moves to library/deleted (empty that in Finder when you\'re sure).':' This can\'t be undone.'}`)) return;
    if(lib) return trLibAct(async()=>{ await libDelete(t.id); await libScan(); },'Deleted.');
    L.splice(i,1); if(t.id) trDB.del(t.id); commit('Deleted.'); };
  const rename=i=>{ const t=L[i], n=t&&prompt('Name',t.title); if(!(n&&n.trim())) return;
    if(lib) return trLibAct(async()=>{ await libRename(t,n.trim()); await libScan(); });
    t.title=n.trim(); commit(); };
  const newFolder=async name=>lib?libNewFolder(name):(F.push({id:trNewId('f'),name}),F[F.length-1].id);
  const cardMenu=(e,i)=>{ const t=L[i]; trMenu(e,[{t:'Open',f:()=>trOpenSaved(i)},{t:'Rename',f:()=>rename(i)},{t:'Share as a Jun Jam file',f:()=>trShareSaved(i)},null,
    ...F.filter(f=>f.id!==t.folder).map(f=>({t:`Move to 📁 ${trEsc(f.name)}`,f:()=>move(i,f.id)})),...(t.folder&&known.has(t.folder)?[{t:'Move out of the folder',f:()=>move(i,'')}]:[]),
    {t:'New folder with this in it',f:async()=>{ const n=prompt('Folder name'); if(n&&n.trim()) move(i,await newFolder(n.trim())); }},null,{t:'Delete',f:()=>del(i)}]); };
  const delFolder=(e,fid)=>{ const f=F.find(x=>x.id===fid), inside=L.filter(t=>t.folder===fid);
    const drop=keep=>{ const msg=keep?`Folder deleted; its transcriptions are at the top level now.`:'Folder deleted.';
      if(lib) return trLibAct(async()=>{ await libDeleteFolder(fid,keep); await libScan(); },msg);
      if(!keep){ inside.forEach(t=>{ if(t.id) trDB.del(t.id); }); TRDATA.list=L.filter(t=>t.folder!==fid); } else inside.forEach(t=>delete t.folder);
      TRDATA.folders=F.filter(x=>x!==f); commit(msg); };
    if(!inside.length) return drop(true);
    trMenu(e,[{t:`Delete the folder, keep its ${inside.length} transcription${inside.length>1?'s':''}`,f:()=>drop(true)},
      {t:`Delete the folder and its ${inside.length} transcription${inside.length>1?'s':''}`,f:()=>{ if(confirm(`Delete “${f.name}” and the ${inside.length} transcription${inside.length>1?'s':''} in it?${lib?' The folder moves to library/deleted.':' This can\'t be undone.'}`)) drop(false); }}]); };
  $('trNewFolder').onclick=()=>{ const n=prompt('Folder name'); if(!(n&&n.trim())) return;
    if(lib) return trLibAct(async()=>{ await libNewFolder(n.trim()); await libScan(); });
    newFolder(n.trim()); commit(); };
  el.onclick=e=>{ const g=k=>e.target.closest(`[data-${k}]`);
    if(g('del')) return del(+g('del').dataset.del);
    if(g('more')) return cardMenu(e,+g('more').dataset.more);
    if(g('frename')){ const f=F.find(x=>x.id===g('frename').dataset.frename), n=prompt('Folder name',f.name); if(!(n&&n.trim())) return;
      if(lib) return trLibAct(async()=>{ await libRenameFolder(f.id,n.trim()); await libScan(); });
      f.name=n.trim(); commit(); return; }
    if(g('fdel')) return delFolder(e,g('fdel').dataset.fdel);
    if(g('ftoggle')){ const f=F.find(x=>x.id===g('ftoggle').dataset.ftoggle); f.closed=!f.closed; if(lib){ libSetClosed(f.id,f.closed); trLibRender(); } else commit(); return; }
    if(g('open')) trOpenSaved(+g('open').dataset.open); };
  el.oncontextmenu=e=>{ const c=e.target.closest('[data-open]'); if(c){ e.preventDefault(); cardMenu(e,+c.dataset.open); } };
  // drag a card onto a folder (or below the folders, to take it out)
  el.ondragstart=e=>{ const c=e.target.closest('[data-open]'); if(c){ e.dataTransfer.setData('text/plain',c.dataset.open); e.dataTransfer.effectAllowed='move'; el.classList.add('dragging'); } };
  el.ondragend=()=>{ el.classList.remove('dragging'); el.querySelectorAll('.over').forEach(x=>x.classList.remove('over')); };
  el.ondragover=e=>{ const d=e.target.closest('[data-drop]'); if(!d) return; e.preventDefault(); el.querySelectorAll('.over').forEach(x=>x!==d&&x.classList.remove('over')); d.classList.add('over'); };
  el.ondrop=e=>{ const d=e.target.closest('[data-drop]'), i=e.dataTransfer.getData('text/plain'); if(!d||i==='') return; e.preventDefault();
    if((L[+i].folder||'')!==d.dataset.drop) move(+i,d.dataset.drop); else trLibRender(); };
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
  try{ stream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false,channelCount:2,sampleRate:48000,suppressLocalAudioPlayback:false},preferCurrentTab:false,selfBrowserSurface:'exclude',surfaceSwitching:'include'}); }
  catch(e){ $('trStatus').textContent='Recording cancelled.'; return; }
  const audio=stream.getAudioTracks();
  if(!audio.length){ stream.getTracks().forEach(t=>t.stop()); $('trStatus').textContent='No sound came through. Choose a Chrome tab and tick “Also share tab audio”.'; $('trStatus').className='trno'; return; }
  stream.getVideoTracks().forEach(t=>t.enabled=false); // only the sound is used
  // music, not a call: no echo cancelling, noise suppression or auto volume (asked for above, and again here in case the
  // browser ignored it there), stereo, and a high bitrate so the top end isn't dulled
  audio.forEach(t=>t.applyConstraints({echoCancellation:false,noiseSuppression:false,autoGainControl:false}).catch(()=>{}));
  const rec=new MediaRecorder(new MediaStream(audio),{mimeType:MediaRecorder.isTypeSupported('audio/webm;codecs=opus')?'audio/webm;codecs=opus':'audio/webm',audioBitsPerSecond:320000}), chunks=[];
  const t0=performance.now(), MAX=6*60*1000;
  rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  const finish=()=>{ if(rec.state!=='inactive') rec.stop(); };
  rec.onstop=async()=>{ clearInterval(tick); stream.getTracks().forEach(t=>t.stop()); src.disconnect(); TR.recCancel=null;
    if(!TR.active) return;   // left Transcribe while recording: nothing to load
    const blob=new Blob(chunks,{type:rec.mimeType}); if(blob.size<2000){ trOpen(); return; }
    const when=new Date(), file=new File([blob],`Tab recording ${when.getHours()}.${String(when.getMinutes()).padStart(2,'0')}.webm`,{type:rec.mimeType});
    await trLoad(file); TR.sel=[0,TR.buf.duration]; trDrawWave(); };
  audio[0].onended=finish; // the person pressed Chrome's own Stop sharing
  // a level meter, so it's obvious the sound is coming through
  const ac=synth.ctx, an=ac.createAnalyser(); an.fftSize=512; const src=ac.createMediaStreamSource(new MediaStream(audio)); src.connect(an); const buf=new Uint8Array(an.fftSize);
  TR.recCancel=()=>{ chunks.length=0; finish(); };   // leaving Transcribe stops the tab capture
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
  if(/\.junjam$/i.test(file.name||'')) return trImport(file);   // a shared transcription, not a recording
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
function trStopAll(){ TR.soundTok=(TR.soundTok||0)+1;   // a play still waiting for its sound doesn't start
  if(TR.audio){ TR.audio.onplaying=null; TR.audio.pause(); } TR.token=(TR.token||0)+1; clearInterval(TR.audioTimer); killBus(TR.bus); TR.bus=null; cancelAnimationFrame(TR.raf); TR.playing=false; }

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
  const ctl=new AbortController(); TR.abort=ctl; $('trCancel').onclick=()=>{ ctl.abort(); clearInterval(tick); trSetupRender(); };
  try{
    const wav=await trWav(T.buf,T.sel[0],T.sel[1]);
    const r=await fetch(`${TR_URL}/transcribe`,{method:'POST',body:wav,signal:ctl.signal}), res=await r.json();
    clearInterval(tick); TR.abort=null; if(!TR.active) return;   // left while it was listening
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
// a click anywhere outside the Save menu closes it (one listener for the page)
document.addEventListener('pointerdown',e=>{ if(e.target.closest('.trmenu')) return; ['trExportList','trFixPop','trSoundList','trBeatPop'].forEach(id=>{ const l=$(id); if(l) l.hidden=true; }); });
function trEdit(score,res,savedIndex){
  if(SND_OVR.song!==score){ soundOvrClear(); SND_OVR.song=score; }   // another transcription: Profile's sounds again
  trSensV2(score);   // saved on the old Sensitivity scale: same notes, new name
  trStopAll(); Object.assign(TR,{active:true,step:'edit',soundOK:false,send:null,rec:false,recOn:{},down:new Set(),score,res:res||TR.res||null,saved:savedIndex,sel:TR.sel,undo:[],redo:[],selected:new Set(),rate:TR.rate||1,speed:1,posB:0,loop:null,looping:false,dirty:savedIndex==null,edited:false});
  if(!res){ TR.res=null; } // reopened from the list: no audio, no re-analysis
  const R=!!TR.res, A=!!(TR.url&&TR.res);
  // Laid out like a practice player (after Soundslice and Moises): a slim top bar (title, Save, and a ⋯ menu for everything
  // occasional), the player bar under it, and the sheet music with all the room. The note editor (piano roll) opens under the
  // sheet only when you ask (✎ Edit notes). Rarely touched fixes sit in an Adjust popover; note actions show with a selection.
  $('trBody').innerHTML=`<div class="trtop">
      <button class="ghost" id="trClose" title="Close this transcription">← Close</button>
      <span class="etitle" id="trTitle" title="Click to rename"></span><span class="fine" id="trInfo"></span><span class="trspace"></span><span class="fine" id="trDirty"></span>
      <button class="ghost tgl" id="trSendBtn" title="Turn a few notes of this into a lick to practise in all keys, in Lines">→ Lines</button>
      <button class="go" id="trSaveBtn" title="Save in Jun Jam, with the recording, under Your transcriptions (${MODK}+S)">Save</button>
      <div class="trmenu"><button class="ghost ic" id="trExportBtn" aria-haspopup="true" title="Export, send to Lines, settings, guide">⋯</button><div class="trmenulist" id="trExportList" hidden>
        <button data-exp="junjam">Share as a Jun Jam file <span class="fine">A .junjam with the recording, for a friend with Jun Jam</span></button><hr>
        <button data-exp="pdf">Export PDF <span class="fine">The sheet music, to print or send</span></button>
        <button data-exp="xml">Export MusicXML <span class="fine">MuseScore, Sibelius, Finale, Dorico</span></button><button data-exp="mid">Export MIDI, on the beat</button>${R?'<button data-exp="midp">Export MIDI, as played</button>':''}<hr>
        <button id="trLick">Send to Lines <span class="fine">Pick a few notes in the sheet music (double-click one for its phrase), and send them as a lick</span></button>
        ${TR.buf&&R?'<button id="trSettings">Settings <span class="fine">What to write, instrument and part</span></button>':''}
        <button id="trHelpBtn">Guide <span class="fine">How everything here works</span></button></div></div></div>
    <div class="trtransport" id="trBar">
      <button class="go trplay" id="trPlay" title="Play / pause (Space)">▶</button><button class="ghost ic" id="trStop" title="Stop, back to the start">■</button>
      <span class="trpos" id="trPos">1 · 1</span>
      ${A?`<span class="trgrp" title="What you hear while it plays">${trSeg('src',[['notes','Notes'],['orig','Recording'],['both','Both']],TR.src||'notes')}</span>`:''}
      <span class="trgrp trspeed" title="How fast you hear it back (the transcription stays as it is). [ and ] change it"><button class="ghost ic" id="trSlower" title="Slower ([)">−</button><button class="ghost" id="trSpeedVal" title="Back to 100%"></button><button class="ghost ic" id="trFaster" title="Faster (])">+</button></span>
      <div class="trmenu"><button class="ghost" id="trSoundBtn" aria-haspopup="true" title="The sound the transcription plays on, so it's not the same as your keys">Sound ▾</button><div class="trmenulist" id="trSoundList" hidden></div></div>
      <button class="ghost tgl" id="trLoopBtn" aria-pressed="${!!TR.looping}" title="Loop (Shift+L). Drag across bars in the sheet music to choose which">⟳ Loop</button>
      <button class="ghost tgl" id="trBacking" aria-pressed="${!!TR.backing}" title="Play chords and bass under the notes">Chords</button><div class="trmenu"><button class="ghost tgl" id="trDrumsBtn" aria-haspopup="true" aria-pressed="${!!score.drums}" title="Drums under it: on or off, and this transcription's own beat">Drums ▾</button><div class="trmenulist trbeatpop" id="trBeatPop" hidden></div></div><button class="ghost tgl" id="trMetro" aria-pressed="${!!store.get('trMetro',false)}" title="Metronome: a click on every beat, 1 2 3 4, beat 1 higher. It follows the speed, and the recording's own beat when it plays">Click</button>
      <button class="ghost tgl trrec" id="trRec" aria-pressed="${!!TR.rec}" title="Record: what you play on your keyboard while it plays is written into the transcription">● Rec</button>
      <span class="trhintline" id="trHintLine"></span>
      <div class="trmenu"><button class="ghost" id="trFixBtn" aria-haspopup="true" title="Fix the tempo, where beat 1 is, how many notes it catches">Adjust ▾</button><div class="trmenulist trfixpop" id="trFixPop" hidden><div class="trfix">${R?`<span class="trgrp" title="How sure a note has to be to show. Lower: cleaner, can miss quiet or very fast notes. Higher: catches more, and more stray notes."><span class="fine">Sensitivity</span>${trSeg('sens',TR_SENS_NAMES.map((t,i)=>[i,t]),score.sens??2)}</span>
        <span class="trgrp"><span class="fine">Tempo</span>${trSeg('bs',[[.5,'Half'],[1,'As heard'],[2,'Double']],score.beatScale||1)}</span>
        <span class="trgrp" title="Where beat 1 is. Works from the playhead's bar on; earlier bars stay as they are."><span class="fine">Beat 1</span><span class="seg"><button id="trShiftL" title="Bars from the playhead's bar on: one beat earlier">◀</button><button id="trB1Here" title="The beat at the playhead is beat 1 (from here on)">Here</button><button id="trShiftR" title="Bars from the playhead's bar on: one beat later">▶</button></span><span class="fine" id="trB1From">all bars</span></span>`:''}
        <span class="trgrp"><span class="fine">Piano roll</span>${trSeg('tm',[['beat','On the beat','Notes on the grid, like the sheet music'],['played','As played','Notes where they really were, over the recording']],TR.timing==='played'?'played':'beat')}</span>
        <button class="ghost trq" data-guide="fix" title="What these do">What these do</button></div></div></div>
      <button class="ghost tgl" id="trRollBtn" title="Open the note editor (piano roll) under the sheet music to fix or add notes">✎ Edit notes</button>
      <button class="ghost ic" id="trUndo" title="Undo (${MODK}+Z)">↶</button><button class="ghost ic" id="trRedo" title="Redo (Shift+${MODK}+Z)">↷</button></div>
    <div class="trsend" id="trSend" hidden></div>
    <div class="trscore" id="trScore"></div>
    <div class="trsplit" id="trSplit" title="Drag to make the piano roll taller or shorter; double-click to hide it"></div>
    <div class="trpane" id="trPane"><div class="tredit">
      ${trSeg('tool',[['select','Select','Click notes to select them, drag to move; drag on empty space to select several'],['draw','✎ Draw','Click to add a note, drag to set its length']],TR.tool||'select')}
      <span class="trgrp" title="Where new and moved notes land"><span class="fine">Snap</span>${trSeg('snap',[[1,'♩'],[2,'♪'],[4,'16th'],[8,'32nd'],[3,'Triplet']],TR.snapDiv||4)}</span>
      <span class="trgrp selacts"><button class="ghost ic" data-selact="up" title="Up a half step (↑)">▲</button><button class="ghost ic" data-selact="down" title="Down a half step (↓)">▼</button><button class="ghost ic" data-selact="oup" title="Up an octave (Shift+↑)">+8</button><button class="ghost ic" data-selact="odown" title="Down an octave (Shift+↓)">−8</button><button class="ghost ic" data-selact="del" title="Delete (Delete key)">🗑</button></span>
      <span class="fine" id="trSelInfo"></span><span class="trspace"></span><button class="ghost ic trq" data-guide="edit" title="How editing works">?</button></div>
    <div class="trroll" id="trRoll"></div></div>
`;
  const B=$('trBody');
  // the piano roll is a panel under the sheet music: shown or hidden, and how tall, both remembered; the sheet takes the rest
  const pane=$('trPane'), split=$('trSplit'), rollBtn=$('trRollBtn'), roll=$('trRoll');
  const rollOn=()=>store.get('trEditOn',false), rollH=h=>Math.round(Math.max(90,Math.min(innerHeight*0.7,h)));
  const applyRoll=()=>{ pane.hidden=split.hidden=!rollOn(); rollBtn.setAttribute('aria-pressed',rollOn()); roll.style.height=rollH(store.get('trRollH',innerHeight*0.3))+'px'; };
  applyRoll();
  rollBtn.onclick=()=>{ store.set('trEditOn',!rollOn()); applyRoll(); if(rollOn()) trRollView(); };
  split.ondblclick=()=>rollBtn.click();
  split.onpointerdown=e=>{ e.preventDefault(); const y0=e.clientY, h0=roll.offsetHeight; split.setPointerCapture(e.pointerId); split.classList.add('drag');
    split.onpointermove=ev=>{ roll.style.height=rollH(h0-(ev.clientY-y0))+'px'; };
    split.onpointerup=()=>{ split.onpointermove=null; split.classList.remove('drag'); store.set('trRollH',roll.offsetHeight); }; };
  $('trPlay').onclick=trToggle; $('trStop').onclick=()=>{ trStopAll(); TR.posB=TR.looping&&TR.loop?TR.loop.a:0; trHead(TR.posB); };
  B.querySelectorAll('[data-src]').forEach(b=>b.onclick=()=>{ TR.src=b.dataset.src; trPress('src',b.dataset.src); trResume(); });
  $('trLoopBtn').onclick=trLoopToggle;
  $('trSlower').onclick=()=>trSpeed(-1); $('trFaster').onclick=()=>trSpeed(1); $('trSpeedVal').onclick=()=>trSpeed(0); trSpeedShow();
  $('trSoundBtn').onclick=e=>{ const l=$('trSoundList'); l.hidden=!l.hidden; if(!l.hidden) trSoundMenu(); e.stopPropagation(); };
  $('trDrumsBtn').onclick=e=>{ const p=$('trBeatPop'); p.hidden=!p.hidden; if(!p.hidden) trBeatMenu(); e.stopPropagation(); };
  $('trMetro').onclick=()=>{ const on=!store.get('trMetro',false); store.set('trMetro',on); $('trMetro').setAttribute('aria-pressed',on); trResume(); };
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
  $('trLick').onclick=()=>{ $('trExportList').hidden=true; trSendOpen(); }; $('trSendBtn').onclick=()=>TR.send?trSendClose():trSendOpen(); $('trClose').onclick=()=>trLeave(trOpen,'Close this transcription?');
  $('trTitle').onclick=()=>{ const t=prompt('Name',TR.score.title); if(t&&t.trim()){ TR.score.title=t.trim(); trSetDirty(); trInfo(); } };
  const list=$('trExportList'), fixPop=$('trFixPop'); $('trSaveBtn').onclick=trSave;
  $('trExportBtn').onclick=e=>{ list.hidden=!list.hidden; fixPop.hidden=true; e.stopPropagation(); };
  list.addEventListener('click',e=>{ if(e.target.closest('button')) list.hidden=true; });
  $('trFixBtn').onclick=e=>{ fixPop.hidden=!fixPop.hidden; list.hidden=true; e.stopPropagation(); };
  list.querySelectorAll('[data-exp]').forEach(b=>b.onclick=()=>{ list.hidden=true; const k=b.dataset.exp;
    if(k==='junjam') trShareCurrent(); else if(k==='pdf') trPDF();
    else if(k==='xml') trDownload(toMusicXML(TR.score),'musicxml','application/vnd.recordare.musicxml+xml');
    else trDownload(toMidiFile(TR.score,k==='midp'?trMaps():null),'mid','audio/midi'); });
  // scrolling a view yourself pauses its following for a moment
  ['trRoll','trScore'].forEach(id=>['wheel','touchmove'].forEach(ev=>$(id).addEventListener(ev,()=>{ TR.holdUntil=performance.now()+2500; },{passive:true})));
  trRender(); trHead(0);
}
const trPress=(attr,v)=>$('trBody').querySelectorAll(`[data-${attr}]`).forEach(x=>x.setAttribute('aria-pressed',String(x.dataset[attr==='bs'?'bs':attr])===String(v)));
function trLoopToggle(){ TR.looping=!TR.looping; if(TR.looping&&!TR.loop){ const a=Math.floor((TR.posB||0)/4)*4; TR.loop={a,b:a+4}; }   // nothing chosen yet: the bar you're on
  trLoopShow(); trRollView(); if(TR.looping) trMsg(`Looping bar${TR.loop.b-TR.loop.a>4?'s':''} ${trBars(TR.loop)}. Drag across bars in the sheet music to loop others.`); trResume(); }
// what's looping: named on the button, and tinted over those bars in the sheet music
function trLoopShow(){ const lb=$('trLoopBtn'); if(lb){ lb.setAttribute('aria-pressed',!!TR.looping); lb.textContent=TR.looping&&TR.loop?`⟳ Bar${TR.loop.b-TR.loop.a>4?'s':''} ${trBars(TR.loop)}`:'⟳ Loop'; } trSheetLoop(); }
function trSheetLoop(){ const sc=$('trScore'); if(!sc||!TR.lines) return; sc.querySelectorAll('.trsloop').forEach(x=>x.remove()); if(!TR.looping||!TR.loop) return;
  TR.lines.forEach((L,k)=>{ const n=L.nb*4, a=Math.max(TR.loop.a,L.a), b=Math.min(TR.loop.b,L.a+n); if(b<=a) return;
    const el=sc.querySelector(`[data-line="${k}"]`), svg=el&&el.querySelector('svg'); if(!svg) return;
    const xb=t=>L.X0+(t-L.a>=n?L.cum[n-1]+L.bw[n-1]:L.cum[t-L.a]), sr=svg.getBoundingClientRect(), er=el.getBoundingClientRect(), k2=sr.width/L.W, d=document.createElement('i');
    d.className='trsloop'; d.style.left=(sr.left-er.left+xb(a)*k2)+'px'; d.style.width=((xb(b)-xb(a))*k2)+'px'; el.appendChild(d); }); }
// the beat under a point in the sheet music (null off the music)
function trSheetBeat(x,y){ const el=document.elementFromPoint(x,y), ln=el&&el.closest('#trScore [data-line]'); if(!ln||!TR.lines) return null;
  const L=TR.lines[+ln.dataset.line], svg=ln.querySelector('svg'); if(!L||!svg) return null; const r=svg.getBoundingClientRect(), u=(x-r.left)*L.W/r.width-L.X0;
  let i=0; while(i<L.nb*4-1&&L.cum[i+1]<=u) i++; return Math.max(0,L.a+i+Math.max(0,Math.min(1,(u-L.cum[i])/L.bw[i]))); }
// drag across bars in the sheet to loop them (a plain click still moves the playhead)
window.addEventListener('pointermove',e=>{ const d=TR.sdrag; if(!d||!TR.active) return; if(!d.moved&&Math.hypot(e.clientX-d.x,e.clientY-d.y)<8) return; d.moved=true;
  const b=trSheetBeat(e.clientX,e.clientY); if(b==null) return;
  if(TR.send){ TR.send.a=Math.floor(Math.min(d.b0,b)*4)/4; TR.send.b=Math.ceil(Math.max(d.b0,b)*4)/4; TR.send.own=false; trSendPick(); trSendTint(); trSendRender(); return; }   // sending: the notes you drag across
  TR.loop={a:Math.floor(Math.min(d.b0,b)/4)*4,b:Math.floor(Math.max(d.b0,b)/4)*4+4}; TR.looping=true; trLoopShow(); });
window.addEventListener('pointerup',()=>{ const d=TR.sdrag; if(!d) return; TR.sdrag=null; if(!d.moved) return; TR.sclickSkip=true;
  if(TR.send){ trRollView(); return; }
  TR.posB=TR.loop.a; if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); trRollView(); trMsg(`Looping bar${TR.loop.b-TR.loop.a>4?'s':''} ${trBars(TR.loop)}. Press ⟳ (or Shift+L) to stop looping.`); });
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
   <li><b>Hear</b>: Notes (what was transcribed), Recording (the original), or Both. <b>Speed</b> (− and +, or [ and ]): hear it slower or faster, 25% to 150%, without changing the pitch or the transcription; click the number for 100%. <b>Click</b>: a metronome on every beat, beat 1 higher. <b>Sound</b>: what the transcription plays on, so it sounds different from your keys when you play along.</li>
   <li><b>Chords</b> plays the chord symbols under the notes. Turn it off to hear only the notes.</li>
   <li>While it plays, the views follow the playhead. Scroll yourself and they wait a moment before following again.</li></ul>`],
 ['fix','Fixing the reading',`<p>These change how the recording is read. Any edits you made to notes are replaced (Undo brings them back).</p>
   <ul><li><b>Sensitivity</b>: how sure a note has to be to show. <b>Medium</b> suits most playing. A fast, busy solo still writing too much? <b>Low</b> keeps only surer notes, and <b>Lowest</b> only the notes every model heard. <b>High</b> and <b>Highest</b> catch quiet or very short notes, with more stray ones.</li>
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
   <li>Click a key on the side keyboard, or a note, to hear it. <kbd>${MODK}+Z</kbd> undoes, <kbd>Shift+${MODK}+Z</kbd> redoes.</li></ul>`],
 ['chords','Chords',`<ul><li>The chord lane is the strip above the notes. <b>Click a chord</b> there, or on the sheet music, to change it. <b>Type it</b> (C#13b9, Dbmaj7, F/A, Bbm7b5), or <b>build it</b>: the root letter with ♭ ♮ ♯ (C♯ and D♭ are written as you choose), the type, the 6th or 7th, extensions and alterations (9, 11, 13, ♭9, ♯11...), and a slash bass. You hear each change. <b>Remove</b> takes it out.</li>
   <li><b>Click an empty spot</b> in the lane to add a chord on that beat, so a bar can have two or more. Right-click for the same choices.</li>
   <li>Chords are guessed one per bar. Reharmonised passages are often simplified, so check them by ear with <b>Chords</b> on.</li>
   <li>Lead sheets: <b>solo?</b> at the end of each bar marks it as a solo bar, which leaves it out of the sheet music and exports.</li></ul>`],
 ['keys','Your keyboard',`<ul><li>Play your <b>MIDI keyboard</b>, or the computer keys <kbd>A</kbd> <kbd>W</kbd> <kbd>S</kbd> <kbd>E</kbd> <kbd>D</kbd> <kbd>F</kbd>… (<kbd>Z</kbd> <kbd>X</kbd> change octave). The keys light up on the piano roll's keyboard.</li>
   <li><b>● Rec</b>, then Play: what you play along is written into the transcription, on the snap grid. One Undo takes back the whole take.</li></ul>`],
 ['save','Saving & export',`<ul><li><b>Save ▾ → In Jun Jam</b> (<kbd>${MODK}+S</kbd>) keeps it under <b>Your transcriptions</b> on the Transcribe page, with the recording, so it reopens ready to play, hear the recording and re-read, without importing the audio again. "Not saved" means you have changes.</li>
   <li><b>PDF</b>: the sheet music on white paper. In the print window, set Destination to <b>Save as PDF</b>.</li>
   <li><b>MusicXML</b> opens in MuseScore, Sibelius, Finale and Dorico (tuplets, ties and chord symbols included). <b>MIDI, on the beat</b> is the grid version; <b>MIDI, as played</b> keeps the real timing, for a DAW.</li>
   <li><b>→ Lines</b> (top bar): drag across 3 to 24 notes in the sheet music, choose the chord it's practised over (one chord, the chords as transcribed, or none), name it, send. Give the player's name and their licks group together under that name in Lines.</li>
   <li><b>← Settings</b> goes back to choose a different part of the recording or instrument (it asks first if you have unsaved changes).</li></ul>`],
 ['shortcuts','Shortcuts',`<table class="trkeytable"><tr><td><kbd>Space</kbd></td><td>play / pause</td></tr><tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>playhead a beat (<kbd>Shift</kbd>: a bar), or nudge selected notes</td></tr>
   <tr><td><kbd>↑</kbd> <kbd>↓</kbd></td><td>selected notes a half step (<kbd>Shift</kbd>: an octave)</td></tr><tr><td><kbd>Delete</kbd></td><td>delete selected notes</td></tr>
   <tr><td><kbd>Shift+L</kbd></td><td>loop on / off</td></tr><tr><td><kbd>${MODK}+Z</kbd> / <kbd>Shift+${MODK}+Z</kbd></td><td>undo / redo</td></tr><tr><td><kbd>${MODK}+S</kbd></td><td>save</td></tr>
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
// a wider or narrower window: lay the sheet out again for the new width, at the same place in the music
let trReflowT=0; addEventListener('resize',()=>{ clearTimeout(trReflowT); trReflowT=setTimeout(()=>{ const sc=$('trScore'); if(!TR.active||TR.step!=='edit'||!sc) return;
  const at=sc.scrollTop/Math.max(1,sc.scrollHeight); trScoreView(); sc.scrollTop=at*sc.scrollHeight; },150); });
function trScoreView(){
  const s=TR.score, vis=visibleMelody(s), lines=[], ps=vis.map(n=>n.midi).sort((a,b)=>a-b), low=ps.length&&ps[ps.length>>1]<57; // a low line reads on a bass clef
  // as many bars to a line as fit the width (up to eight), fewer when they're busy, so fast runs stay readable (beats widen like grandStaffSVG's)
  const sn=vis.map(n=>({midi:n.midi,gat:n.gat,gdur:n.gdur,tri:n.tri,tup:n.tup||0,grace:!!n.grace,gord:n.gord||1,spell:{...spellIn(s,n.midi,n.gat),midi:n.midi}}));
  const BW=gsBeatWidths(s.texture==='full'&&s.grand?[sn.filter(n=>n.midi>=60),sn.filter(n=>n.midi<60)]:[sn],s.bars*4);   // each beat's width, for the whole piece
  const barW=b=>[0,1,2,3].reduce((a,k)=>a+BW[b*4+k],0), room=Math.max(560,($('trScore').clientWidth||900)-90);
  TR.lines=[]; const starts=[]; for(let b=0;b<s.bars;){ let n=1, w=barW(b); while(n<8&&b+n<s.bars&&w+barW(b+n)<=room){ w+=barW(b+n); n++; } starts.push([b,n]); b+=n; }
  starts.forEach(([b,nb])=>{
    const at=n=>n.grace?n.gat+TR_GRACE*(n.gord||1):n.gat;   // a grace note goes with the note it leads into (even over a barline)
    const a=b*4, z=a+nb*4, notes=vis.filter(n=>at(n)>=a-1e-6&&at(n)<z-1e-6).map(n=>{ const sp=spellIn(s,n.midi,n.gat);
      return {midi:n.midi,gat:n.gat-a,gdur:Math.min(n.gdur,z-n.gat),tri:n.tri,tup:n.tup||0,grace:!!n.grace,gord:n.gord||1,spell:{...sp,midi:n.midi},name:sp.name}; });
    // a note held over from the line before carries on here, tied, until it ends or the next note starts
    const first=Math.min(nb*4,...notes.map(n=>n.grace?n.gat+TR_GRACE*n.gord:n.gat));
    if(first>.12) vis.filter(n=>n.gat<a-1e-6&&n.gat+n.gdur>a+.12&&!n.tup&&!n.tri&&!n.grace).forEach(n=>{ const sp=spellIn(s,n.midi,n.gat);
      notes.push({midi:n.midi,gat:0,gdur:Math.min(n.gat+n.gdur-a,first,nb*4),tri:false,tup:0,tieIn:true,spell:{...sp,midi:n.midi},name:sp.name}); });
    const chords=s.chords.filter(c=>c.at>=a-1e-6&&c.at<z-1e-6).map(c=>({...chordObj(c),at:c.at-a,i:s.chords.indexOf(c)}));
    const solo=(s.soloBars||[]).filter(x=>x>=b&&x<b+nb);
    const bw=BW.slice(a,a+nb*4);
    const svg=s.texture==='full'?grandStaffSVG({notes,chords,beats:nb*4,grand:!!s.grand,bw}):s.mode==='lead'?lineStaffSVG({notes,chords,total:nb*4},-1,false)
      :grandStaffSVG({notes,chords,beats:nb*4,grand:false,clef:low?'bass':'treble',bw});
    const cum=[0]; bw.forEach(w=>cum.push(cum[cum.length-1]+w));
    TR.lines.push({a,nb,bw,cum,X0:s.mode==='lead'&&s.texture!=='full'?null:64,W:64+cum[nb*4]+16});
    lines.push(`<div class="trline" data-line="${TR.lines.length-1}"><span class="trbar">${b+1}${solo.length?` · solo ${solo.map(x=>x+1).join(', ')}`:''}</span>${svg}<i class="trshead"></i></div>`);
  });
  $('trScore').innerHTML=lines.join('');
  if(s.mode==='lead'&&s.texture!=='full') TR.lines=null; // the lead sheet's staff is drawn by Lines (its own spacing)
  // click the music to put the playhead there
  $('trScore').onclick=e=>{ if(TR.sclickSkip){ TR.sclickSkip=false; return; } const ce=e.target.closest('[data-c]'); if(ce) return trChordEdit(+ce.dataset.c,e);
    const b=trSheetBeat(e.clientX,e.clientY); if(b==null) return; TR.posB=b; if(TR.playing) trPlayScore(TR.posB); else trHead(TR.posB); };
  $('trScore').ondblclick=e=>{ if(e.target.closest('[data-c]')) return; const b=trSheetBeat(e.clientX,e.clientY); if(b!=null) trSendPhrase(b); };   // a note's phrase, ready to send to Lines
  $('trScore').onpointerdown=e=>{ if(e.button||e.target.closest('[data-c]')) return; const b0=trSheetBeat(e.clientX,e.clientY); if(b0!=null) TR.sdrag={x:e.clientX,y:e.clientY,b0,moved:false}; };
  trSheetHead(TR.posB||0); trLoopShow(); trSendTint();
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
  let laneEnd=[-1e9,-1e9];   // chord names too close together alternate between two lines instead of piling up
  s.chords.forEach((c,i)=>{ const txt=symText(chordObj(c)), x=bx(c.at)+3, w=txt.length*8.2; let row=x>laneEnd[0]+2?0:x>laneEnd[1]+2?1:(laneEnd[0]<laneEnd[1]?0:1);
    const tight=x<laneEnd[0]+2||x<laneEnd[1]+2; laneEnd[row]=x+(tight?w*0.8:w);
    h+=`<text x="${x}" y="${row?LY+23:LY+(laneEnd[1]>x-200&&row===0&&tight?11:17)}" class="rchord${row||tight?' rtight':''}" data-chord="${i}">${txt}</text>`; });
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
  trLoopShow(); trRollView(); });
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
    if(e.target.closest('.rlane')){ trChordAdd(Math.max(0,Math.floor(beatAt(pt(e,head).x)+1e-6)),e); return; }
  };
  head.ondblclick=e=>{ const rEl=e.target.closest('[data-beat]'); if(rEl) trSetBeat1(+rEl.dataset.beat); };
  head.oncontextmenu=e=>{ e.preventDefault(); const cEl=e.target.closest('[data-chord]');
    if(cEl){ const i=+cEl.dataset.chord; return trMenu(e,[{t:'Change this chord',f:()=>trChordEdit(i,e)},{t:'Remove it',f:()=>{ trPush(); s.chords.splice(i,1); trRender(); }}]); }
    trBeatMenu(e,trBeatAtX(pt(e,head).x)); };
  head.onpointermove=e=>{ if(TR.rdrag) return; const b=trBeatAtX(pt(e,head).x);
    if(e.target.closest('[data-anchor]')) return trHint('Beat 1 was set here by hand — click the flag to take it away');
    if(e.target.closest('[data-beat]')) return trHint(`${trWhere(b)} — click: play from here · drag: loop · double-click: this is beat 1 · right-click: more`);
    if(e.target.closest('[data-chord]')) return trHint('Chord — click to change it · right-click to remove it');
    if(e.target.closest('.rlane')) return trHint(`Chord lane, bar ${Math.floor(Math.max(0,b)/4)+1} — click an empty spot to add a chord on that beat`); };
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
  document.querySelectorAll('#trBody [data-selact]').forEach(b=>b.disabled=!sel.length); const ed=document.querySelector('#trBody .tredit'); if(ed) ed.classList.toggle('hassel',!!sel.length); }
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
    {t:'Add a chord on this beat',f:()=>trChordAdd(Math.max(0,Math.floor(b+1e-6)),e)}]); }
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
function trRetuple(m){ const by=new Map(); m.forEach(n=>{ if(n.grace) return; const b=Math.floor(n.gat+1e-6); if(!by.has(b)) by.set(b,[]); by.get(b).push(n); });
  const on=(n,D)=>Math.abs((n.gat-Math.floor(n.gat+1e-6))*D-Math.round((n.gat-Math.floor(n.gat+1e-6))*D))<1e-4;
  by.forEach(ns=>{ const cnt={}; ns.forEach(n=>{ if(n.tup) cnt[n.tup]=(cnt[n.tup]||0)+1; }); const D=+Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0]||0;
    const all=D&&ns.every(n=>on(n,D)); ns.forEach(n=>{ const t=all||(D&&on(n,D)&&!on(n,8))?D:0; n.tup=t; n.tri=t===3; }); }); }
// chord symbols: click to change, click an empty spot in the lane to add one
const TR_QUALS=['maj','min','dom7','maj7','min7','hdim','dim7','dim','aug','sus4','sus7','six','min6','mmaj7','maj9','dom9','min9','dom13','min11','d7b9','d7s9','alt','d7s11','add9','six9'];
// Pick a root and a chord type; you hear each choice. Enter = OK, Escape = cancel
/* The chord picker: type the chord (C#13b9, Dbmaj7, F/A), or build it: root letter and ♭ ♮ ♯ (so C♯ and D♭ are
   their own), the type, the 6th or 7th, extensions and alterations, a slash bass. Both stay in step; you hear each change.
   onSave({root,sp,qid,suf,bass}). Enter = OK, Escape = cancel. */
const TR_EXT=[['9','9'],['11','11'],['13','13'],['b9','♭9'],['#9','♯9'],['#11','♯11'],['b13','♭13'],['b5','♭5'],['#5','♯5'],['alt','alt']];
// the suffix for a built chord: st {q: maj|min|dim|hdim|aug|sus4|sus2, s: ''|6|7|maj7, x: Set of TR_EXT keys}
function trSufOf(st){ const x=st.x, nat=['13','11','9'].find(n=>x.has(n)), alts=['b5','#5','b9','#9','#11','b13'].filter(a=>x.has(a)&&!(st.q==='aug'&&a==='#5')&&!(st.q==='hdim'&&a==='b5')).map(a=>a.replace('b','♭').replace('#','♯')).join('');
  if(x.has('alt')) return '7alt'; const s7=st.s;
  const core={maj:s7==='maj7'?'maj'+(nat||'7'):s7==='7'?(nat||'7'):s7==='6'?(x.has('9')?'6/9':'6'):nat?'add'+nat:'',
    min:s7==='maj7'?'m(maj'+(nat||'7')+')':s7==='7'?'m'+(nat||'7'):s7==='6'?(x.has('9')?'m6/9':'m6'):nat?'m(add'+nat+')':'m',
    dim:s7==='7'||s7==='6'?'°7':'°', hdim:nat&&nat!=='9'?'m'+nat+'♭5':'m7♭5',
    aug:s7==='maj7'?'maj7♯5':s7==='7'?(nat||'7')+'♯5':'+',
    sus4:s7==='7'?(nat||'7')+'sus4':nat?'sus4(add'+nat+')':'sus4', sus2:s7==='7'?'7sus2':'sus2'}[st.q];
  return core+alts; }
// a suffix back into the builder (as near as it maps)
function trSufState(suf){ const f=(suf||'').replace(/♭/g,'b').replace(/♯/g,'#'), x=new Set();
  const q=/^(m7b5|ø|m(9|11|13)b5)/.test(f)?'hdim':/^(°|dim|o(?!\w))/.test(f)?'dim':/^(m|min|-)(?!aj)/.test(f)?'min':/^(\+|aug)|^(7|9|11|13)?#5|maj7#5/.test(f)?'aug':/sus2/.test(f)?'sus2':/sus/.test(f)?'sus4':'maj';
  [['b5',/b5/],['#5',/#5/],['b9',/b9/],['#9',/#9/],['#11',/#11/],['b13',/b13/],['alt',/alt/]].forEach(([k,re])=>{ if(re.test(f)) x.add(k); });
  const nat=f.replace(/[b#](5|9|11|13)/g,''); ['9','11','13'].forEach(n=>{ if(new RegExp('(^|[^0-9])'+n+'(?![0-9])').test(nat.replace('6/9','9'))) x.add(n); });
  const s=/maj|M7|Δ|\(maj/.test(f)?'maj7':/6/.test(nat)?'6':/add/.test(f)&&!/7/.test(f)?'':/7|9|11|13|alt/.test(nat)||q==='hdim'?'7':'';
  if(q==='dim'&&/7/.test(f)) return {q,s:'7',x}; return {q,s,x}; }
function trChordPopup(e,c,onSave,onDel,title){
  document.querySelectorAll('.trpop').forEach(x=>x.remove());
  const r0=chordRoot(c); let L=r0.l, A=r0.a, st=trSufState(c.suf??(Q[c.qid]||Q.maj7).suf), bass=c.bass?{...c.bass}:null, bus=null;
  const sym=()=>LETTERS[L]+ACC[A]+trSufOf(st)+(bass?'/'+LETTERS[bass.l]+ACC[bass.a]:'');
  const pop=document.createElement('div'); pop.className='trpop trchordpop';
  const chips=(k,opts,cur)=>opts.map(([v,l])=>`<button data-${k}="${v}" aria-pressed="${cur(v)}">${l}</button>`).join('');
  const BASSES=[null,...[0,1,2,3,4,5,6].flatMap(l=>[[l,-1],[l,0],[l,1]]).filter(([l,a])=>!(a===1&&(l===2||l===6))&&!(a===-1&&(l===3||l===0))).map(([l,a])=>({l,a}))];
  pop.innerHTML=`<div class="tptitle"><input id="tpText" spellcheck="false" autocomplete="off" title="Type a chord: C#13b9, Dbmaj7, F/A"><button class="ghost ic" id="tpHear" title="Hear it">▶</button><span class="fine">${title||''}</span></div>
    <div class="tpline"><span class="fine">Root</span><div class="tpchips" id="tpL"></div><div class="tpchips tpacc" id="tpA"></div></div>
    <div class="tpline"><span class="fine">Type</span><div class="tpchips" id="tpQ"></div></div>
    <div class="tpline"><span class="fine">6th / 7th</span><div class="tpchips" id="tpS"></div></div>
    <div class="tpline"><span class="fine">Add</span><div class="tpchips tpext" id="tpX"></div></div>
    <div class="tpline"><span class="fine">Bass</span><select id="tpB">${BASSES.map((b,i)=>`<option value="${i}">${b?'/'+LETTERS[b.l]+ACC[b.a]:'Root (no slash)'}</option>`).join('')}</select></div>
    <div class="tprow"><span class="fine" id="tpMsg"></span><span class="trspace"></span>${onDel?'<button class="ghost" id="tpDel">Remove</button>':''}<button class="go" id="tpOk">OK</button></div>`;
  const $p=sel=>pop.querySelector(sel);
  const fields=()=>{ const t=(typeof gigChord==='function'&&gigChord(sym()))||null, pc=mod12(LETTER_PC[L]+A);
    return {root:pc,sp:{l:L,a:A},qid:t&&Q[t.qid]?t.qid:'maj7',suf:trSufOf(st),bass:bass||undefined}; };
  const hear=()=>{ killBus(bus); bus=newBus(); if(!bus) return; const f=fields(), t=chordObj(f); playChord(spreadVoice(t.q,f.root,null,48,54,69),now()+.03,1.2,backSound(),bus,backVel(70)); tone(36+mod12(chordBassPc(f)-36),now()+.03,1.2,70,'bass',bus); };
  const draw=(fromText)=>{
    $p('#tpL').innerHTML=chips('l',LETTERS.map((x,i)=>[i,x]),v=>+v===L); $p('#tpA').innerHTML=chips('a',[[-1,'♭'],[0,'♮'],[1,'♯']],v=>+v===A);
    $p('#tpQ').innerHTML=chips('q',[['maj','Major'],['min','Minor'],['dim','Dim'],['hdim','Half-dim'],['aug','Aug'],['sus4','Sus4'],['sus2','Sus2']],v=>v===st.q);
    $p('#tpS').innerHTML=chips('s',[['','None'],['6','6'],['7','7'],['maj7','maj7']],v=>v===st.s);
    $p('#tpX').innerHTML=chips('x',TR_EXT,v=>st.x.has(v));
    $p('#tpB').value=String(bass?BASSES.findIndex(b=>b&&b.l===bass.l&&b.a===bass.a):0);
    if(!fromText){ $p('#tpText').value=sym(); $p('#tpText').classList.remove('bad'); }
    $p('#tpMsg').textContent=''; wire(); };
  const change=()=>{ draw(false); hear(); };
  const wire=()=>{
    pop.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{ L=+b.dataset.l; change(); });
    pop.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{ A=+b.dataset.a; change(); });
    pop.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{ st.q=b.dataset.q; if(st.q==='hdim') st.s='7'; change(); });
    pop.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{ st.s=b.dataset.s; change(); });
    pop.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{ const k=b.dataset.x; st.x.has(k)?st.x.delete(k):st.x.add(k);
      if(['9','11','13'].includes(k)&&st.x.has(k)&&st.s===''&&st.q!=='maj'&&st.q!=='min') st.s='7'; change(); }); };
  // typing: read it as you go (a chord Gig can read), and light up the builder to match
  $p('#tpText').oninput=ev=>{ const v=ev.target.value.trim(), t=v&&typeof gigChord==='function'?gigChord(v):null; ev.target.classList.toggle('bad',!!v&&!t);
    if(!t){ $p('#tpMsg').textContent=v?'Not a chord yet: try C#13b9, Dbmaj7, F/A':''; return; }
    L=t.root.l; A=t.root.a; st=trSufState(t.suf); bass=t.bass?{l:t.bass.l,a:t.bass.a}:null; draw(true); };
  $p('#tpText').onkeydown=ev=>{ ev.stopPropagation(); if(ev.key==='Enter'){ ev.preventDefault(); if(!ev.target.classList.contains('bad')) $p('#tpOk').click(); } if(ev.key==='Escape') pop.remove(); };
  $p('#tpText').onchange=()=>{ if(!$p('#tpText').classList.contains('bad')) hear(); };
  $p('#tpB').onchange=ev=>{ bass=BASSES[+ev.target.value]; change(); };
  $p('#tpHear').onclick=hear; draw(false);
  document.body.appendChild(pop);
  const w=pop.offsetWidth, h=pop.offsetHeight; let y=e.clientY+12; if(y+h>innerHeight-8) y=Math.max(8,e.clientY-h-12);
  pop.style.left=Math.max(8,Math.min(innerWidth-w-8,e.clientX-20))+'px'; pop.style.top=y+'px';
  pop.onkeydown=ev=>{ if(ev.key==='Enter'&&ev.target.tagName!=='INPUT'){ ev.preventDefault(); $p('#tpOk').click(); } };
  $p('#tpOk').onclick=()=>{ const t=$p('#tpText'); if(t.classList.contains('bad')) return; onSave(fields()); pop.remove(); };
  $p('#tpText').focus(); $p('#tpText').select();
  if(onDel) $p('#tpDel').onclick=()=>{ onDel(); pop.remove(); };
  setTimeout(()=>document.addEventListener('pointerdown',function f(ev){ if(!pop.contains(ev.target)){ pop.remove(); document.removeEventListener('pointerdown',f); } }),0);
}
function trChordEdit(i,e){ const s=TR.score, c=s.chords[i];
  trChordPopup(e,c,f=>{ trPush(); const {sp,suf,bass,...rest}=c; s.chords[i]={...rest,...f}; if(!f.bass) delete s.chords[i].bass; trRender(); },()=>{ trPush(); s.chords.splice(i,1); trRender(); },trWhere(c.at)); }
function trChordAdd(at,e){ const s=TR.score, prev=scoreChordAt(s,at)||{root:s.key.pc,qid:'maj7'};
  trChordPopup(e,{...prev},f=>{ trPush(); s.chords=s.chords.filter(c=>Math.abs(c.at-at)>1e-6); const nc={at,...f}; if(!f.bass) delete nc.bass; s.chords.push(nc); s.chords.sort((a,b)=>a.at-b.at); trRender(); },null,`New chord, ${trWhere(at)}`); }

/* How fast you hear it back: 25% to 150% in steps of 5 (dir 0: back to 100%). Only the listening changes; the
   transcription's tempo stays. The recording keeps its pitch. The label shows the tempo you'll hear. */
const TR_SPEEDS=Array.from({length:26},(_,i)=>.25+i*.05);
function trSpeed(dir){ const i=TR_SPEEDS.findIndex(v=>Math.abs(v-TR.speed)<.01), j=dir?Math.max(0,Math.min(TR_SPEEDS.length-1,(i<0?15:i)+dir)):15;
  TR.speed=TR.rate=Math.round(TR_SPEEDS[j]*100)/100; trSpeedShow(); trResume(); }
function trSpeedShow(){ const v=$('trSpeedVal'); if(!v) return; const bpm=Math.round((TR.score.tempo||100)*TR.speed);
  v.innerHTML=`${Math.round(TR.speed*100)}%<span class="fine"> ♩=${bpm}</span>`; v.setAttribute('aria-pressed',TR.speed!==1);
  $('trSlower').disabled=TR.speed<=.25+1e-6; $('trFaster').disabled=TR.speed>=1.5-1e-6; }
// The sound menu: the transcription's own sound (your keys stay what they are, so you can hear yourself over it)
function trSoundMenu(){ const l=$('trSoundList'); if(!l) return; const cur=trSoundPick(), keys=keysSoundPick();
  const inst=Object.entries(SMP_INFO).filter(([id])=>trSoundOK(id)&&SMP_MAPS[id]).map(([id,i])=>[id,i.name]);
  const opt=([id,name])=>`<button data-trsnd="${id}" aria-pressed="${id===cur}">${id===cur?'✓ ':''}${name}${id===keys?'<span class="fine">Same as your keys</span>':''}</button>`;
  l.innerHTML=`<p class="fine trsndhead">Levels <span class="fine">(double-click a slider for 100%)</span></p><div class="mixbox" id="trMixBox"></div><hr><p class="fine trsndhead">Under it <span class="fine">(just for this one; Profile's otherwise)</span></p><div class="ovbox" id="trOvBox"></div><hr><p class="fine trsndhead">The transcription plays on</p>${TR_SOUNDS.map(opt).join('')}${inst.length?'<hr>'+inst.map(opt).join(''):''}`;
  soundOvrUI($('trOvBox'),()=>trResume());
  mixSliders($('trMixBox'),['notes',...(TR.url&&TR.res?['rec']:[]),'band','drums','click','keys'],{live:()=>TR.playing&&TR.mixG,onRec:v=>{ if(TR.audio) TR.audio.volume=Math.min(1,v); }});
  l.querySelectorAll('[data-trsnd]').forEach(b=>b.onclick=async e=>{ e.stopPropagation(); const id=b.dataset.trsnd; store.set('trSound',id); TR.soundOK=false; trSoundMenu();
    if(SMP_MAPS[id]){ b.querySelector('.fine')||b.insertAdjacentHTML('beforeend','<span class="fine">Loading…</span>'); await smpLoad(id); trSoundMenu(); }
    if(TR.playing) trResume(); else { const bus=previewBus(); if(bus){ const t=now()+.05; [67,71,74,72].forEach((m,i)=>trTone(m,t+i*.22,i===3?.6:.2,90,bus)); } } }); }
// Drums under the transcription: on or off, and its own beat (kept with it: score.drums, score.beat; none: Profile's)
function trBeatMenu(){ const el=$('trBeatPop'), s=TR.score; if(!el) return;
  el.innerHTML=`<div class="erow" style="margin:0 0 8px;align-items:center"><button class="ghost tgl" id="trDrumsOn" aria-pressed="${!!s.drums}">${s.drums?'Drums on':'Drums off'}</button><span class="fine" style="margin:0">The beat for this transcription, saved with it. Sounds: Profile → Sound.</span></div><div></div>`;
  $('trDrumsOn').onclick=e=>{ e.stopPropagation(); s.drums=!s.drums; trSetDirty(); $('trDrumsBtn').setAttribute('aria-pressed',!!s.drums); trBeatMenu(); trResume(); };
  drumBeatEditor(el.lastElementChild,{value:s.beat??null,def:true,mine:'This transcription',live:!!(TR.playing&&s.drums),
    set:v=>{ if(v==null) delete s.beat; else s.beat=v; if(!s.drums){ s.drums=true; $('trDrumsBtn').setAttribute('aria-pressed',true); $('trDrumsOn').setAttribute('aria-pressed',true); $('trDrumsOn').textContent='Drums on'; } trSetDirty(); trResume(); }}); }
/* ---------------- playback, save, export, to Lines ---------------- */
/* Playback from the playhead (TR.posB, in beats). Space plays and pauses where it is; Stop goes back to the start.
   What it plays: the transcription, the original recording, or both together (then the notes keep their real timing,
   so you hear them against the recording). On the beat, notes play on the grid at a steady tempo; as played, when they
   were really played. Changing a setting while it plays carries on from the same spot (trResume). */
function trToggle(){ if(TR.playing){ const p=TR.posB; trStopAll(); TR.posB=p; trHead(p); } else trPlayScore(); }
function trResume(){ if(TR.playing) trPlayScore(TR.posB); }
function trPlayScore(from){
  // its sound first: until your instruments are known and the picked one is loaded, the synth would stand in for it
  if(!TR.soundOK){ const tok=TR.soundTok=(TR.soundTok||0)+1; synth.init();
    SMP_LOCAL_READY.then(()=>{ const k=trSoundPick(); return SMP_MAPS[k]&&!SMP.ready[k]?(trMsg(`Loading ${SMP_INFO[k].name}…`),smpLoad(k)):true; })
      .then(()=>{ if(tok!==TR.soundTok) return; TR.soundOK=true; trPlayScore(from); }); return; }
  const s=TR.score; if(from==null) from=TR.posB||0; trStopAll();
  const src=TR.url&&TR.res?TR.src||'notes':'notes', real=trPlayed()||src!=='notes', mp=trMaps(), sp=TR.speed, spb=60/(s.tempo||100);
  const loop=TR.looping&&TR.loop?TR.loop:null; if(loop&&(from<loop.a-1e-6||from>=loop.b-1e-6)) from=loop.a;
  const endB=loop?loop.b:s.bars*4; if(from>=endB-1e-6) from=0;
  const secOf=b=>real?Math.max(0,mp.toSec(b)):b*spb, sec0=secOf(from), T=b=>(secOf(b)-sec0)/sp, endT=T(endB);
  const bus=TR.bus=newBus(); if(!bus) return; TR.playing=true; TR.posB=from; TR.recTake=false;
  const mx=TR.mixG={notes:mixBus(bus,'notes'),band:mixBus(bus,'band'),drums:mixBus(bus,'drums'),click:mixBus(bus,'click')};   // each part's level (Sound ▾)
  const go=t0=>{
    if(src!=='orig'){
      visibleMelody(s).forEach(n=>{ const a=real?(n.sec-sec0)/sp:T(n.gat), d=real?n.dsec/sp:n.gdur*spb*.92/sp; if(a<-.005||a>=endT) return; trTone(n.midi,t0+a,Math.max(.08,Math.min(d,endT-a)),94,mx.notes); });
      let pv=null; if(TR.backing) s.chords.forEach((c,i)=>{ const cz=s.chords[i+1]?s.chords[i+1].at:s.bars*4; if(cz<=from||c.at>=endB) return;
        const a=Math.max(0,T(c.at)), z=Math.min(endT,T(cz)), t=chordObj(c); if(z-a<.05) return;
        pv=spreadVoice(t.q,t.root.pc,pv,48,54,69); playChord(pv,t0+a,(z-a)*.95,backSound(),mx.band,backVel(48)); tone(36+mod12(chordBassPc(c)-36),t0+a,Math.min((z-a)*.95,2.2),66,'bass',mx.band); }); }
    if(s.drums){ drumsInit(); const pat=drumPatOf(s.beat??null);   // drums: bar by bar, so they follow the recording's own beat when it plays
      for(let bar=Math.floor(from/4+1e-6);bar*4<endB-1e-6;bar++){ const a=T(bar*4), z=T(bar*4+4); if(z<=0) continue;
        beatBar(t0+a,(z-a)/4,4,{bar},mx.drums,{hat:true,pat,after:t0-.005,until:t0+endT}); } }
    if(store.get('trMetro',false)) for(let b=Math.ceil(from-1e-6);b<endB-1e-6;b++){ const a=T(b); if(a>=-.005) clickAt(t0+a,mod12(b)%4===0,mx.click); }   // the metronome, beat 1 of each bar higher
    const step=()=>{ if(!TR.playing) return; const el=now()-t0;
      TR.posB=Math.min(endB,real?mp.toBeat(sec0+Math.max(0,el)*sp):from+Math.max(0,el)*sp/spb); trHead(TR.posB);
      if(el<endT) TR.raf=requestAnimationFrame(step); else if(loop) trPlayScore(loop.a); else { trStopAll(); TR.posB=0; trHead(0); } };
    TR.raf=requestAnimationFrame(step);
  };
  if(src==='notes') return go(now()+.1);
  // with the recording: start it, then line the notes up with where it really is once it plays
  const au=TR.audio||(TR.audio=new Audio()); if(au.src!==TR.url) au.src=TR.url;
  au.preservesPitch=true; au.playbackRate=sp; au.volume=Math.min(1,mixGet('rec')); au.currentTime=TR.sel[0]+sec0;
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
  // No library folder yet: Save links it (Chrome's folder window has to open straight from the click). Pick the Jun Jam
  // folder and library/ is made inside it. Cancel and it saves in the browser, as before, and doesn't ask again this time.
  if(LIB_OK&&!LIB.on&&!LIB.declined){
    const ask=LIB.need?libAllow():(trMsg('In the window: open Jun Jam, click its library folder, then Select. (Just this once.)'),libLink());
    if(await ask){ await libSyncAll(); libChip(); } else LIB.declined=true; }
  const s=TR.score; if(!s.id) s.id='t'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const at=TR.saved!=null?TRDATA.list.findIndex(t=>t.id===s.id):-1, old=at>=0&&TRDATA.list[at], withMedia=!!(TR.file&&TR.raw&&TR.res);
  const newMedia=withMedia&&TR.mediaFor!==s.id+'|'+TR.sel;   // the recording goes in once (and again only if the part changed)
  if(LIB.on){
    const item={...s,saved:Date.now()}; if(old&&old.folder) item.folder=old.folder; else delete item.folder;
    try{ item.media=await libSave(item,newMedia?{file:TR.file,sel:TR.sel,raw:TR.raw,shift:TR.shift}:null); }
    catch(e){ return trMsg(`Couldn't save to your library folder: ${e.message}`,'no'); }
    if(newMedia) TR.mediaFor=s.id+'|'+TR.sel;
    if(old) TRDATA.list[at]=item; else TRDATA.list.unshift(item);
    TR.saved=0; TR.dirty=false; trInfo(); return trMsg(`Saved in your library folder${item.media?', with the recording':''}.`,'ok'); }
  if(newMedia){
    try{ await trDB.put(s.id,{file:TR.file,sel:TR.sel,raw:TR.raw,shift:TR.shift}); TR.mediaFor=s.id+'|'+TR.sel; navigator.storage&&navigator.storage.persist&&navigator.storage.persist(); }
    catch(e){ trMsg("The notes are saved, but there wasn't room to keep the recording with them.",'no'); } }
  const item={...s,saved:Date.now(),media:withMedia&&TR.mediaFor===s.id+'|'+TR.sel||!!(old&&old.media)};
  if(old&&old.folder) item.folder=old.folder;
  if(old) TRDATA.list[at]=item; else TRDATA.list.unshift(item);
  if(!saveTr()){ if(old) TRDATA.list[at]=old; else TRDATA.list.shift(); return trMsg("Couldn't save: this browser's storage is full. Delete a few transcriptions on the Transcribe page, then try again.",'no'); }
  TR.saved=0; TR.dirty=false; trInfo(); trMsg(item.media?'Saved with the recording. It\'s under Your transcriptions in Transcribe.':'Saved. It\'s under Your transcriptions in Transcribe.','ok');
}
// Reopen a saved one: with its recording when that was kept, so playback, Hear recording and re-reading all work again
async function trOpenSaved(i){
  let t=TRDATA.list[i]; if(!t) return;
  if(LIB.on){ try{ t=await libReload(t.id)||t; TRDATA.list[i]=t; }catch(e){} trLibNotes(); }   // read it fresh: chords.txt may have been fixed meanwhile
  const sc=JSON.parse(JSON.stringify(t)), m=sc.id&&sc.media?await (LIB.on?libMedia(sc.id):trDB.get(sc.id)):null;
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
  const title=document.title; trMsg('In the print window, set Destination to “Save as PDF”.');
  const go=()=>{ document.title=s.title; f.contentWindow.focus(); f.contentWindow.print(); document.title=title; setTimeout(()=>f.remove(),1000); };
  Promise.race([d.fonts.ready,new Promise(r=>setTimeout(r,1500))]).then(()=>setTimeout(go,50));
}
/* A .junjam file: one transcription, with its recording (and what was heard in it) when there is one, so whoever opens
   it gets playback, Hear recording and re-reading too. Plain JSON; the recording rides along as a data URL. */
const JJ_FORMAT='junjam-transcription';
async function trJunjam(score,media){
  const sc={...score}; delete sc.folder; delete sc.saved; delete sc.media; let m=null;
  if(media&&media.file){ const url=await new Promise((ok,no)=>{ const r=new FileReader(); r.onload=()=>ok(r.result); r.onerror=()=>no(r.error); r.readAsDataURL(media.file); });
    m={name:media.file.name||'recording',type:media.file.type||'',data:url,sel:media.sel,raw:media.raw,shift:media.shift}; }
  return JSON.stringify({format:JJ_FORMAT,version:1,score:sc,media:m});
}
function trSaveAs(data,name,ext,type){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([data],{type})); a.download=(name||'transcription').replace(/[\\/:*?"<>|]/g,'')+'.'+ext;
  document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },500); }
async function trShareCurrent(){ const media=TR.file&&TR.raw?{file:TR.file,sel:TR.sel,raw:TR.raw,shift:TR.shift}:null;
  trSaveAs(await trJunjam(TR.score,media),TR.score.title,'junjam','application/json'); trMsg(media?'Saved a .junjam file with the recording. Send it to anyone with Jun Jam: they open it on the Transcribe page.':'Saved a .junjam file. Send it to anyone with Jun Jam: they open it on the Transcribe page.','ok'); }
async function trShareSaved(i){ const t=TRDATA.list[i]; if(!t) return; const m=t.id&&t.media?await (LIB.on?libMedia(t.id):trDB.get(t.id)):null;
  trSaveAs(await trJunjam(t,m),t.title,'junjam','application/json'); trMsg('Saved a .junjam file. Whoever you send it to opens it on their Transcribe page.','ok'); }
// open one: it joins Your transcriptions (with its recording), then opens
async function trImport(file){
  let d; try{ d=JSON.parse(await file.text()); }catch(e){ return trMsg("That file isn't a Jun Jam transcription.",'no'); }
  if(!d||d.format!==JJ_FORMAT||!d.score||!Array.isArray(d.score.melody)) return trMsg("That file isn't a Jun Jam transcription.",'no');
  const item={...d.score,id:trNewId('t'),saved:Date.now(),media:false};
  if(LIB.on){ let m=null; delete item.folder;
    if(d.media&&d.media.data){ try{ const blob=await (await fetch(d.media.data)).blob(); m={file:new File([blob],d.media.name||'recording',{type:d.media.type||blob.type}),sel:d.media.sel,raw:d.media.raw,shift:d.media.shift}; }catch(e){} }
    try{ item.media=await libSave(item,m); }catch(e){ return trMsg(`Couldn't add it to your library folder: ${e.message}`,'no'); }
    TRDATA.list.unshift(item); trLibRender(); await trOpenSaved(0); return trMsg(`Opened “${item.title}”${item.media?' with its recording':''}. It's in your library folder now.`,'ok'); }
  if(d.media&&d.media.data){ try{ const blob=await (await fetch(d.media.data)).blob(), f=new File([blob],d.media.name||'recording',{type:d.media.type||blob.type});
      await trDB.put(item.id,{file:f,sel:d.media.sel,raw:d.media.raw,shift:d.media.shift}); item.media=true; }
    catch(e){ trMsg("Opened the notes, but there wasn't room to keep the recording.",'no'); } }
  TRDATA.list.unshift(item); if(!saveTr()){ TRDATA.list.shift(); if(item.media) trDB.del(item.id); return trMsg("Couldn't open it: this browser's storage is full. Delete a few transcriptions first.",'no'); }
  trLibRender(); await trOpenSaved(0); trMsg(`Opened “${item.title}”${item.media?' with its recording':''}. It's under Your transcriptions now.`,'ok');
}
function trDownload(data,ext,type){
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([data],{type})); a.download=(TR.score.title||'transcription').replace(/[\\/:*?"<>|]/g,'')+'.'+ext;
  document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },500);
}
// Selected notes become a lick in Lines, with the chords under them
/* ---------------- Send to Lines ----------------
   A panel over the sheet music: drag across the notes you want (or start from what's selected in the piano roll, or
   the looped bars), choose the chord it's practised over (one chord you pick, the chords as transcribed, or none),
   name it, send. TR.send: {a,b} the beats picked, idx the notes, chord mode and pick, name, player. */
const TR_PCN=['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];
function trSendOpen(){ const s=TR.score;
  const sel=[...TR.selected].filter(i=>s.melody[i]), r=TR.send={a:0,b:0,idx:[],mode:null,root:null,qid:null,name:null,player:store.get('lickArtist',''),own:false};
  if(sel.length){ const ns=sel.map(i=>s.melody[i]); r.a=Math.min(...ns.map(n=>n.gat)); r.b=Math.max(...ns.map(n=>n.gat+n.gdur)); r.idx=sel.sort((x,y)=>s.melody[x].gat-s.melody[y].gat); r.own=true; }
  else if(TR.looping&&TR.loop){ r.a=TR.loop.a; r.b=TR.loop.b; trSendPick(); }
  $('trSend').hidden=false; $('trSendBtn').setAttribute('aria-pressed',true); trSendTint(); trSendRender(); }
function trSendClose(){ TR.send=null; const p=$('trSend'); if(p){ p.hidden=true; p.innerHTML=''; } if($('trSendBtn')) $('trSendBtn').setAttribute('aria-pressed',false); trSendTint(); }
// the notes in the picked beats (a full part: the top note of each chord, a lick is one line)
function trSendPick(){ const s=TR.score, r=TR.send; if(!r) return;
  let idx=s.melody.map((n,i)=>i).filter(i=>s.melody[i].gat>=r.a-1e-6&&s.melody[i].gat<r.b-1e-6);
  if(s.texture==='full') idx=idx.filter(i=>!idx.some(j=>j!==i&&Math.abs(s.melody[j].gat-s.melody[i].gat)<1e-6&&s.melody[j].midi>s.melody[i].midi));
  r.idx=idx.sort((x,y)=>s.melody[x].gat-s.melody[y].gat); TR.selected=new Set(idx); }
// the picked beats tinted on the sheet music
function trSendTint(){ const sc=$('trScore'); if(!sc) return; sc.querySelectorAll('.trssend').forEach(x=>x.remove()); const r=TR.send; if(!r||!TR.lines||!(r.b>r.a)) return;
  TR.lines.forEach((L,k)=>{ const n=L.nb*4, a=Math.max(r.a,L.a), b=Math.min(r.b,L.a+n); if(b<=a) return;
    const el=sc.querySelector(`[data-line="${k}"]`), svg=el&&el.querySelector('svg'); if(!svg) return;
    const xb=t=>{ const u=t-L.a, i=Math.min(n-1,Math.floor(u+1e-9)); return L.X0+L.cum[i]+(u-i)*L.bw[i]; };
    const sr=svg.getBoundingClientRect(), er=el.getBoundingClientRect(), k2=sr.width/L.W, d=document.createElement('i');
    d.className='trssend'; d.style.left=(sr.left-er.left+(xb(a)-10)*k2)+'px'; d.style.width=((xb(b)-xb(a))*k2)+'px'; el.appendChild(d); }); }
// what will be sent: the melody of the picked notes (bass notes under the line left out, unless you keep them), the root
// they're measured from, and the chord(s)
function trSendLick(){ const s=TR.score, r=TR.send; let ns=r.idx.map(i=>s.melody[i]).filter(Boolean).sort((a,b)=>a.gat-b.gat); if(!ns.length) return null;
  const keep=mainLineKeep(ns.map(n=>n.midi)), low=ns.filter((n,i)=>!keep[i]); if(!r.keepLow&&low.length&&ns.length-low.length>=1) ns=ns.filter((n,i)=>keep[i]);
  const start=Math.floor(ns[0].gat*2)/2, end=Math.max(...ns.map(n=>n.gat+n.gdur));
  // the chords it's practised over: yours (r.chs, edited on the strip) or the transcription's for these beats; the first starts the lick
  const c0=scoreChordAt(s,ns[0].gat)||{root:s.key.pc,qid:s.key.minor?'min7':'maj7'};
  let chs=(r.chs||[c0,...s.chords.filter(c=>c.at>ns[0].gat+1e-6&&c.at<end-1e-6)]).filter((c,i)=>i===0||c.at<end-1e-6).map(c=>({...c}));
  chs.sort((a,b)=>a.at-b.at); chs[0].at=start; chs=chs.filter((c,i)=>i===0||c.at>chs[i-1].at+1e-6);
  const nochord=!!r.nochord, root=nochord?s.key.pc:chs[0].root;
  let over;
  if(nochord) over=s.key.minor?'min7':'maj7';
  else { const r0=chordRoot(chs[0]);
    over=chs.map((c,i)=>{ const rr=chordRoot(c), next=i<chs.length-1?chs[i+1].at:Math.max(Math.ceil(end),c.at+.5), e=[mod7(rr.l-r0.l),mod12(c.root-chs[0].root),c.qid,Math.max(.5,next-c.at)];
      const suf=c.suf!=null&&c.suf!==Q[c.qid].suf?c.suf:null, bs=c.bass?[mod7(c.bass.l-rr.l),mod12(chordBassPc(c)-c.root)]:null;   // the symbol as written, a slash bass
      if(suf!=null||bs) e.push(suf); if(bs) e.push(bs); return e; });
    if(over.length===1&&over[0].length===4) over=over[0][2]; }
  return {ns,low,start,end,chs,nochord,root,over}; }
// the lick itself, as Lines will have it
function trSendBuild(L){ const r=TR.send, s=TR.score, artist=(r.player||'').trim();
  const lick=Lk('u'+Date.now(),(r.name||'').trim()||`${s.title}, bar ${trBars({a:L.start,b:L.end})}`,2,'Yours',L.over,L.ns.map(n=>[n.midi-60-L.root,n.gdur,Math.round((n.gat-L.start)*1000)/1000]));
  lick.user=true; lick.mainV=1; if(L.nochord) lick.nochord=true; if(artist) lick.artist=artist;
  lick.tip=`From your transcription of ${s.title}${artist?`, played by ${artist}`:''}.`; applyRatings([],[lick]); return lick; }
// the transcription's notes in order (what the start / end buttons step through)
const trSendNotes=()=>visibleMelody(TR.score).map(n=>TR.score.melody.indexOf(n)).sort((x,y)=>TR.score.melody[x].gat-TR.score.melody[y].gat);
// move the start or the end of the pick by one note
function trSendNudge(end,dir){ const r=TR.send, m=TR.score.melody, all=trSendNotes(); if(!r.idx.length) return;
  const pos=r.idx.map(i=>all.indexOf(i)).filter(x=>x>=0).sort((a,b)=>a-b); let lo=pos[0], hi=pos[pos.length-1];
  if(end) hi=Math.max(lo,Math.min(all.length-1,hi+dir)); else lo=Math.min(hi,Math.max(0,lo+dir));
  r.a=m[all[lo]].gat; r.b=m[all[hi]].gat+1e-3; r.own=false; trSendPick(); trSendTint(); trSendRender(); trRollView(); }
// double-click a note: its phrase (notes running on with gaps under half a beat), up to 24 notes
function trSendPhrase(b){ const m=TR.score.melody, all=trSendNotes(); if(!all.length) return;
  let k=0; all.forEach((i,j)=>{ if(Math.abs(m[i].gat-b)<Math.abs(m[all[k]].gat-b)) k=j; });
  const gap=(x,y)=>m[all[y]].gat-(m[all[x]].gat+m[all[x]].gdur); let lo=k, hi=k;
  while(lo>0&&gap(lo-1,lo)<.5&&m[all[lo]].gat-m[all[lo-1]].gat<1.5&&hi-lo<23) lo--;
  while(hi<all.length-1&&gap(hi,hi+1)<.5&&m[all[hi+1]].gat-m[all[hi]].gat<1.5&&hi-lo<23) hi++;
  if(!TR.send) trSendOpen(); const r=TR.send; r.a=m[all[lo]].gat; r.b=m[all[hi]].gat+1e-3; r.own=false; trSendPick(); trSendTint(); trSendRender(); trRollView(); }
// the lick's chords on a strip across its beats (half-beat spots; bar lines where the transcription's bars are)
function trSendStrip(L){ const n=Math.max(1,Math.ceil(L.end-L.start-1e-6)), cells=[];
  for(let k=0;k<n*2;k++){ const at=L.start+k/2; cells.push(`<i data-cb="${at}"${k%2?'':` data-n="${mod12(Math.floor(at+1e-6))%4+1}"`} class="${k%2?'':'cbeat'}${Math.abs(at/4-Math.round(at/4))<1e-6?' cbar':''}" title="Add a chord at ${trWhere(at)}"></i>`); }
  return `<div class="trcstrip" style="--n:${n*2}">${cells.join('')}${L.chs.map((c,i)=>`<button class="trcchip" data-ci="${i}" style="left:${(c.at-L.start)/n*100}%" title="Change or remove this chord">${symText(chordObj(c))}</button>`).join('')}</div>
    <span class="fine trstriphint">Click a chord to change it; click an empty spot to add one there.</span>`; }
function trSendRender(){ const el=$('trSend'), r=TR.send, s=TR.score; if(!el||!r) return;
  const L=trSendLick(), n=L?L.ns.length:0, bars=L?trBars({a:L.start,b:L.end}):'', ok=n>=3&&n<=24;
  if(!r.nameEdited) r.name=`${s.title}${L?`, bar ${bars}`:''}`;
  let preview=''; if(L&&n>=2){ try{ preview=`<div class="lstaff trsendprev">${lineStaffSVG(lickInstance(trSendBuild(L),L.root),-1,false)}</div>`; }catch(e){} }
  el.innerHTML=`<div class="trsendhead"><b>Send to Lines</b><span class="fine">Drag across notes in the sheet music, or double-click a note for its phrase.</span><span class="trspace"></span><button class="ghost ic" id="trSendX" title="Close (Esc)">✕</button></div>
    <div class="trsendmain"><div class="trsendleft">
      <div class="trsendrow"><span class="trsendn">1</span><div><b>${n?`${n} note${n===1?'':'s'}, bar${bars.includes('–')?'s':''} ${bars}`:'No notes picked yet'}</b>
        ${r.idx.length?`<span class="seg trnudge" role="group" title="Move the start or the end by one note"><button data-nudge="s-1" title="Start one note earlier">◂</button><button disabled>Start</button><button data-nudge="s1" title="Start one note later">▸</button></span><span class="seg trnudge" role="group"><button data-nudge="e-1" title="End one note earlier">◂</button><button disabled>End</button><button data-nudge="e1" title="End one note later">▸</button></span>`:''}
        ${TR.looping&&TR.loop?'<button class="ghost trsm" id="trSendLoop">Use the looped bars</button>':''}${n?'<button class="ghost trsm" id="trSendHear">▶ Hear it</button>':''}
        ${L&&L.low.length?`<span class="fine trsendlow">${r.keepLow?`Keeping ${L.low.length} low note${L.low.length===1?'':'s'} under the line.`:`Melody only: ${L.low.length} low note${L.low.length===1?'':'s'} under the line (the bass) left out.`} <a href="#" id="trSendKeep">${r.keepLow?'Melody only':'Keep them'}</a></span>`:''}
        ${n&&!ok?`<span class="fine trsendlow">${n<3?'Pick at least 3 notes.':'24 notes at most: shorter licks travel better.'}</span>`:''}</div></div>
      <div class="trsendrow"><span class="trsendn">2</span><div class="trsendover"><b>Over</b>
        ${L&&!L.nochord?trSendStrip(L):`<span class="fine">${L?'Just the line: Lines plays no chords under it.':'Pick the notes first.'}</span>`}
        <span class="trsendopts"><button class="ghost tgl trsm" id="trSendNoCh" aria-pressed="${!!r.nochord}" title="Just the line, with no chords under it">No chord</button>${r.chs&&!r.nochord?'<a href="#" id="trSendReset">Back to the transcription\'s</a>':''}</span></div></div>
      <div class="trsendrow"><span class="trsendn">3</span><div class="trsendnames"><label><span class="fine">Name</span><input id="trSendName" value="${trEsc(r.name)}"></label><label><span class="fine">Player (optional)</span><input id="trSendWho" value="${trEsc(r.player)}" placeholder="e.g. Chick Corea"></label>
        <button class="go" id="trSendGo"${ok?'':' disabled'}>Send to Lines</button></div></div></div>
      ${preview?`<div class="trsendright"><span class="fine">How it'll look in Lines</span>${preview}</div>`:''}</div>`;
  $('trSendX').onclick=trSendClose;
  if($('trSendLoop')) $('trSendLoop').onclick=()=>{ r.a=TR.loop.a; r.b=TR.loop.b; r.own=false; trSendPick(); trSendTint(); trSendRender(); trRollView(); };
  if($('trSendHear')) $('trSendHear').onclick=trSendHear;
  if($('trSendKeep')) $('trSendKeep').onclick=e=>{ e.preventDefault(); r.keepLow=!r.keepLow; trSendRender(); };
  el.querySelectorAll('[data-nudge]').forEach(b=>b.onclick=()=>{ const v=b.dataset.nudge; trSendNudge(v[0]==='e',+v.slice(1)); });
  $('trSendNoCh').onclick=()=>{ r.nochord=!r.nochord; trSendRender(); };
  if($('trSendReset')) $('trSendReset').onclick=e=>{ e.preventDefault(); r.chs=null; trSendRender(); };
  // the strip: click a chord to change it (the chord picker), an empty spot to add one there
  el.querySelectorAll('[data-ci]').forEach(b=>b.onclick=ev=>{ const L2=trSendLick(), i=+b.dataset.ci, c=L2.chs[i];
    trChordPopup(ev,c,f=>{ r.chs=L2.chs.map(x=>({...x})); r.chs[i]={at:c.at,...f}; if(!f.bass) delete r.chs[i].bass; trSendRender(); trSendHear(); },
      L2.chs.length>1?()=>{ r.chs=L2.chs.filter((x,j)=>j!==i); trSendRender(); }:null,`Chord ${i+1} of the lick`); });
  el.querySelectorAll('[data-cb]').forEach(c=>c.onclick=ev=>{ const L2=trSendLick(), at=+c.dataset.cb, prev=L2.chs.filter(x=>x.at<=at+1e-6).pop()||L2.chs[0];
    trChordPopup(ev,{...prev},f=>{ r.chs=L2.chs.filter(x=>Math.abs(x.at-at)>1e-6).map(x=>({...x})); const nc={at,...f}; if(!f.bass) delete nc.bass; r.chs.push(nc); r.chs.sort((x,y)=>x.at-y.at); trSendRender(); trSendHear(); },null,`New chord, ${trWhere(at)}`); });
  $('trSendName').oninput=e=>{ r.name=e.target.value; r.nameEdited=true; }; $('trSendWho').oninput=e=>{ r.player=e.target.value; };
  el.querySelectorAll('input').forEach(i=>i.onkeydown=e=>{ e.stopPropagation(); if(e.key==='Enter'&&ok) trSendGo(); if(e.key==='Escape') trSendClose(); });   // typing here isn't the computer-keys piano
  $('trSendGo').onclick=trSendGo; }
// hear what will be sent: the notes, over the chord(s) it'll be practised over
function trSendHear(){ const L=trSendLick(); if(!L) return; const s=TR.score, spb=60/(s.tempo||100)/(TR.speed||1), bus=previewBus(Math.ceil(((L.end-L.start)*spb+1.5)*1000)); if(!bus) return; const t0=now()+.08;
  L.ns.forEach(n=>trTone(n.midi,t0+(n.gat-L.start)*spb,Math.max(.1,n.gdur*spb*.92),94,bus));
  const dur=(L.end-L.start)*spb;
  if(!L.nochord){ let pv=null; L.chs.forEach((c,i)=>{ const a=(c.at-L.start)*spb, z=((L.chs[i+1]?L.chs[i+1].at:L.end)-L.start)*spb, t=chordObj(c); pv=spreadVoice(t.q,t.root.pc,pv,48,54,69); playChord(pv,t0+a,Math.max(.2,z-a),backSound(),bus,backVel(44)); tone(36+mod12(chordBassPc(c)-36),t0+a,Math.min(z-a,2.2),66,'bass',bus); }); } }
function trSendGo(){ const r=TR.send, L=trSendLick(); if(!L||L.ns.length<3||L.ns.length>24) return;
  const artist=(r.player||'').trim(); store.set('lickArtist',artist);
  const lick=trSendBuild(L); LDATA.user.push(lick); saveLines();
  const el=$('trSend'); el.innerHTML=`<div class="trsendhead"><b>Sent to Lines: ${trEsc(lick.name)}</b><span class="fine">${lick.diff===1?'Easy':lick.diff===2?'Medium':'Hard'}, under Yours${artist?` and under ${trEsc(artist)}`:''}.</span><span class="trspace"></span>
    <button class="ghost" id="trSendMore">Send another</button><button class="go" id="trSendPlay">Practise it now</button><button class="ghost ic" id="trSendX" title="Close">✕</button></div>`;
  $('trSendX').onclick=trSendClose; $('trSendMore').onclick=()=>{ TR.selected.clear(); trSendOpen(); trRollView(); };
  $('trSendPlay').onclick=()=>trLeave(()=>{ trSendClose(); trToMenu(); side='lines'; renderMenu(); linesStart(lick.id); },'Leave the transcription to practise it?'); }
function trToMenu(){ trStopAll(); if(TR.recCancel) TR.recCancel(); if(TR.abort){ TR.abort.abort(); TR.abort=null; } TR.active=false; $('transStage').hidden=true; document.body.classList.remove('trmode'); side='home'; $('startOv').hidden=false; document.body.classList.add('menu'); renderMenu(); }
function trKey(e){
  if(!TR.active) return false;
  if(e.target&&['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return true;
  if(e.key==='Escape'&&TR.send&&!document.querySelector('.trmenulist:not([hidden]),.trpop,.trguidebox')){ trSendClose(); return true; }
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
  if(!cmd&&(e.key==='['||e.key===']')){ trSpeed(e.key===']'?1:-1); return true; }   // slower / faster
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
