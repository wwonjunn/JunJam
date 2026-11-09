/* Your library folder: transcriptions kept as files on this computer instead of inside the browser.
   You pick a folder once (the Jun Jam folder itself: then they go in library/ inside it, which git ignores). Layout:

     library/transcriptions/
       Spain/                 one folder per transcription, named after it
         score.json           the notes, beats and edits (one note per line)
         chords.txt           the chords as plain text, one bar per line: edit it (or have it fixed) and Jun Jam reads it back
         recording.mp3        the recording you imported, as it was
         reading.json         what the helper heard in it, so it reopens ready to play and re-read
       Jazz/                  your Transcribe folders are real folders
         Autumn Leaves/ ...

   A transcription is known by the id inside its score.json, never by its folder's name, so renaming or moving folders
   in Finder is fine. A folder with a score.json is a transcription; one without is a folder of them (one level).
   Without a linked folder nothing changes: transcriptions stay in the browser as before. */
const LIB={on:false,need:false,err:'',pick:null,sub:null,root:null,tr:null,where:new Map(),notes:[]};
const LIB_OK=typeof window!=='undefined'&&typeof window.showDirectoryPicker==='function';
const LIB_KEY='__library';   // the picked folder's handle, kept in the transcriptions' IndexedDB store

/* ---------------- small file helpers ---------------- */
const libSafe=s=>(String(s||'').replace(/[\\/:*?"<>|\u0000-\u001f]/g,'').replace(/^[.\s]+/,'').trim().slice(0,80)||'Untitled');
async function libText(dir,name){ try{ return await (await (await dir.getFileHandle(name)).getFile()).text(); }
  catch(e){ if(e.name==='NotFoundError'||e.name==='TypeMismatchError') return null; throw e; } }
// createWritable writes beside the file and swaps it in on close, so a crash never leaves half a file
async function libWrite(dir,name,data){ const w=await (await dir.getFileHandle(name,{create:true})).createWritable(); await w.write(data); await w.close(); }
async function libHas(dir,name,kind){ try{ kind==='directory'?await dir.getDirectoryHandle(name):await dir.getFileHandle(name); return true; }catch(e){ return false; } }
async function libFreeName(parent,base,except){ let n=base, k=2; while(n!==except&&(await libHas(parent,n,'directory')||await libHas(parent,n,'file'))) n=`${base} ${k++}`; return n; }
const libHash=s=>{ let h=0x811c9dc5; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,0x01000193); } return (h>>>0).toString(16).padStart(8,'0'); };
const libAudioExt=f=>{ const m=/\.([a-z0-9]{2,5})$/i.exec(f.name||''); if(m) return m[1].toLowerCase();
  const t=(f.type||'').split('/')[1]||''; return {mpeg:'mp3','x-m4a':'m4a',mp4:'m4a','x-wav':'wav',wave:'wav',webm:'webm',ogg:'ogg',flac:'flac',aac:'aac'}[t]||'audio'; };
// Copy a folder (and everything in it) into dest as name; used to move or rename when the browser can't move it in place
async function libCopyDir(src,dest,name){ const out=await dest.getDirectoryHandle(name,{create:true});
  for await (const [n,h] of src.entries()){ if(h.kind==='directory') await libCopyDir(h,out,n); else await libWrite(out,n,await h.getFile()); }
  return out; }
async function libMoveDir(parent,name,dest,newName){
  if(parent===dest&&name===newName) return parent.getDirectoryHandle(name);
  const h=await parent.getDirectoryHandle(name);
  if(!LIB.noMove&&typeof h.move==='function'){ try{ await (dest===parent?h.move(newName):h.move(dest,newName)); return dest.getDirectoryHandle(newName); }catch(e){} }
  const out=await libCopyDir(h,dest,newName); await parent.removeEntry(name,{recursive:true}); return out; }

/* score.json: readable, one note or chord per line, small */
function libJSON(o){ const rows=Object.entries(o).filter(([,v])=>v!==undefined).map(([k,v])=>{
    const j=Array.isArray(v)&&v.length&&v.every(x=>x&&typeof x==='object')?'[\n'+v.map(x=>'    '+JSON.stringify(x)).join(',\n')+'\n  ]':JSON.stringify(v);
    return `  ${JSON.stringify(k)}: ${j}`; });
  return '{\n'+rows.join(',\n')+'\n}\n'; }
// what goes in score.json: the score, without what only matters inside the app
function libClean(item){ const {folder,media,id,title,...rest}=item; return {format:'junjam-transcription',version:1,id,title,...rest}; }

/* ---------------- chords.txt ----------------
   One line per bar: "3: Em7 A7@3". A chord on its own starts on beat 1, @3 is beat 3, @2.5 halfway through beat 2.
   An empty bar keeps the chord before it. Accidentals as b and #, so it's easy to type. */
const libSym=c=>{ const o=chordObj(c), a=s=>s.replace(/♭/g,'b').replace(/♯/g,'#').replace(/𝄫/g,'bb').replace(/𝄪/g,'##');
  return a(rootName(o.root))+a(c.suf??o.q.suf)+(c.bass?'/'+a(rootName(mkRoot(c.bass.l,c.bass.a))):''); };
function chordsTxt(s){
  const bars=Math.max(s.bars||0,...s.chords.map(c=>Math.floor(Math.max(0,c.at)/4)+1)), by={};
  s.chords.forEach(c=>{ const b=Math.floor(Math.max(0,c.at)/4+1e-6)+1, beat=+((Math.max(0,c.at)-(b-1)*4)+1).toFixed(3); (by[b]=by[b]||[]).push(libSym(c)+(Math.abs(beat-1)<1e-6?'':'@'+beat)); });
  const head=[`# ${s.title||'Untitled'}: chords. ♩ = ${s.tempo}, ${s.key?keyName(s.key.pc,s.key.minor):''}, 4/4`,
    `# Jun Jam reads this file back when you open the transcription, so you can fix the chords here.`,
    `# One line per bar. A chord on its own starts on beat 1; Em7@3 starts on beat 3, G7@2.5 halfway through beat 2.`,
    `# Two chords with no @ split the bar in half, four take a beat each. An empty bar keeps the chord before it.`,
    `# Write them as on a chart: Dm9  G7b9  C#m7b5  Bbmaj7#11  F/A  E7alt`,''];
  const lines=[]; for(let b=1;b<=bars;b++) lines.push(`${b}: ${(by[b]||[]).join('  ')}`.trimEnd());
  return head.join('\n')+lines.join('\n')+'\n'; }
// back into chords; {chords} or {err:'bar 12: ...'}
function chordsParse(txt){
  if(typeof gigChord!=='function') return {err:"can't read chords right now"};
  const out=[];
  for(const raw of txt.split(/\r?\n/)){
    const line=raw.replace(/^\s*#.*$/,'').trim(); if(!line) continue;
    const m=/^(?:bar\s*)?(\d+)\s*[:.)|-]?\s*(.*)$/i.exec(line); if(!m) return {err:`can't read the line “${raw.trim()}”: start it with the bar number, like “5: Dm7 G7@3”`};
    const bar=+m[1], toks=m[2].replace(/\|/g,' ').split(/\s+/).filter(Boolean); if(bar<1) return {err:`bar ${bar}: bars start at 1`};
    const anyAt=toks.some(t=>t.includes('@')), even={1:[1],2:[1,3],4:[1,2,3,4]}[toks.length];
    if(!anyAt&&toks.length>1&&!even) return {err:`bar ${bar}: with ${toks.length} chords, say where each starts, like “Am7 D7@2 G7@3”`};
    for(let i=0;i<toks.length;i++){
      const [sym,at]=toks[i].split('@'), c=gigChord(sym||'');
      if(!c) return {err:`bar ${bar}: “${sym}” isn't a chord Jun Jam can read`};
      const beat=at!=null&&at!==''?+at:anyAt?(i===0?1:NaN):even[i];
      if(!(beat>=1&&beat<5)) return {err:`bar ${bar}: “${toks[i]}” needs a beat from 1 to 4.99 after the @`};
      const ch={at:+((bar-1)*4+beat-1).toFixed(4),root:c.root.pc,qid:Q[c.qid]?c.qid:'maj7',sp:{l:c.root.l,a:c.root.a},suf:c.suf};
      if(c.bass) ch.bass={l:c.bass.l,a:c.bass.a};
      out.push(ch); } }
  out.sort((a,b)=>a.at-b.at);
  return {chords:out.filter((c,i)=>!out[i+1]||Math.abs(out[i+1].at-c.at)>1e-6)}; }

/* ---------------- reading the library ---------------- */
// One transcription folder: the score (with chords.txt applied when it was changed outside Jun Jam), or null if it isn't one
async function libReadSong(dir,name,parent,folder){
  const txt=await libText(dir,'score.json'); if(txt==null) return null;
  let sc; try{ sc=JSON.parse(txt); }catch(e){ LIB.notes.push(`“${name}”: its score.json can't be read, so it's left out.`); return false; }
  if(!sc||!Array.isArray(sc.melody)||!Array.isArray(sc.chords)){ LIB.notes.push(`“${name}”: its score.json isn't a transcription, so it's left out.`); return false; }
  let rec=null, reading=false;
  for await (const [n,h] of dir.entries()){ if(h.kind!=='file') continue; if(/^recording\./i.test(n)) rec=n; if(n==='reading.json') reading=true; }
  const ct=await libText(dir,'chords.txt');
  if(ct!=null&&libHash(ct)!==sc.chordsHash){
    const p=chordsParse(ct);
    if(p.err) LIB.notes.push(`“${sc.title||name}” chords.txt, ${p.err}. Using its chords from before.`);
    else{ sc.chords=p.chords; sc.chordsHash=libHash(ct); try{ await libWrite(dir,'score.json',libJSON(libClean(sc))); }catch(e){}
      LIB.notes.push(`“${sc.title||name}”: took the chords from its chords.txt.`); } }
  delete sc.format; delete sc.version;
  if(!sc.id) sc.id=trNewId('t');
  if(LIB.where.has(sc.id)&&LIB.where.get(sc.id).dir!==dir){ sc.id=trNewId('t'); try{ await libWrite(dir,'score.json',libJSON(libClean(sc))); }catch(e){} }  // a copied folder: give it its own id
  if(folder) sc.folder='d:'+folder; else delete sc.folder;
  sc.media=!!(rec&&reading);
  LIB.where.set(sc.id,{dir,parent,name,folder,rec});
  return sc; }
async function libScan(){
  LIB.where=new Map(); LIB.notes=[];
  const list=[], folders=[], closed=store.get('trLibClosed',{});
  const dirs=async d=>{ const o=[]; for await (const [n,h] of d.entries()) if(h.kind==='directory'&&!n.startsWith('.')) o.push([n,h]); return o.sort((a,b)=>a[0].localeCompare(b[0])); };
  for(const [name,h] of await dirs(LIB.tr)){
    const s=await libReadSong(h,name,LIB.tr,'');
    if(s){ list.push(s); continue; } if(s===false) continue;
    folders.push({id:'d:'+name,name,closed:!!closed[name]});
    for(const [n2,h2] of await dirs(h)){ const s2=await libReadSong(h2,n2,h,name); if(s2) list.push(s2); } }
  list.sort((a,b)=>(b.saved||0)-(a.saved||0));
  TRDATA={list,folders};
  return TRDATA; }

/* ---------------- linking ---------------- */
async function libInit(){
  if(LIB.on||!LIB_OK) return LIB.on; if(LIB.initP) return LIB.initP;
  return LIB.initP=(async()=>{ try{
    const h=await trDB.get(LIB_KEY); if(!h||!h.handle) return false;
    LIB.pick=h.handle; LIB.sub=h.sub||null;
    const p=await LIB.pick.queryPermission({mode:'readwrite'}).catch(()=>'denied');
    if(p==='granted') return await libOpen();
    LIB.need=true; return false; } finally{ LIB.initP=null; } })(); }
async function libOpen(){
  try{ LIB.root=LIB.sub?await LIB.pick.getDirectoryHandle(LIB.sub,{create:true}):LIB.pick;
    LIB.tr=await LIB.root.getDirectoryHandle('transcriptions',{create:true});
    LIB.on=true; LIB.need=false; LIB.err=''; await libScan(); return true; }
  catch(e){ libFail(); LIB.err=e.name==='NotFoundError'?"The library folder isn't there any more (moved or deleted?). Pick it again.":`Couldn't open the library folder (${e.message}).`; return false; } }
// From a click: ask for the folder (or for permission again), then bring in what this browser has
async function libLink(){
  let h; try{ h=await window.showDirectoryPicker({id:'junjam-library',mode:'readwrite',startIn:'desktop'}); }catch(e){ return false; }   // Jun Jam usually sits on the Desktop
  if(LIB.pick&&!await LIB.pick.isSameEntry(h).catch(()=>false)) libForget();   // another folder: sync it afresh
  // whatever you pick, the files go in a library/ folder inside it (made for you); a folder already called library is used as it is
  LIB.pick=h; LIB.sub=h.name.toLowerCase()==='library'?null:'library'; await trDB.put(LIB_KEY,{handle:h,sub:LIB.sub});
  if(!await libOpen()) return false;
  return libCopyIn(); }
async function libAllow(){
  if(!LIB.pick) return false;
  const p=await LIB.pick.requestPermission({mode:'readwrite'}).catch(()=>'denied'); if(p!=='granted') return false;
  return libOpen(); }
const libForget=()=>{ ['libLicksHash','libLickIds','libProgAt'].forEach(k=>localStorage.removeItem('mtc:'+k)); LIB.progH=null; LIB.lastLicks=null; };   // sync marks belong to one folder
async function libUnlink(){ libForget(); await trDB.del(LIB_KEY); Object.assign(LIB,{on:false,need:false,err:'',pick:null,sub:null,root:null,tr:null,where:new Map(),notes:[]});
  TRDATA=store.get('trans',{list:[]}); TRDATA.folders=TRDATA.folders||[]; }
function libFail(){ if(LIB.on){ TRDATA=store.get('trans',{list:[]}); TRDATA.folders=TRDATA.folders||[]; } LIB.on=false; }
const libWhereName=()=>LIB.sub?`${LIB.pick.name}/${LIB.sub}/transcriptions`:`${LIB.pick?LIB.pick.name:''}/transcriptions`;
// The ones kept in this browser that the folder doesn't have yet (by id), copied in with their recordings.
// The browser keeps its copy; nothing there is deleted.
function libBrowserOnly(){ const old=store.get('trans',{list:[]}); return (old.list||[]).filter(t=>t.id&&!LIB.where.has(t.id)); }
async function libCopyIn(){
  const old=store.get('trans',{list:[]}), names=Object.fromEntries((old.folders||[]).map(f=>[f.id,f.name])), todo=libBrowserOnly();
  let n=0, rec=0; const failed=[];
  for(const t of todo.slice().reverse()){
    try{ const m=t.media?await trDB.get(t.id):null, item={...t}; delete item.folder;
      if(t.folder&&names[t.folder]) item.folder='d:'+libSafe(names[t.folder]);
      await libSave(item,m&&m.file?m:null); n++; if(m&&m.file) rec++; }
    catch(e){ failed.push(t.title); } }
  await libScan();
  return {n,rec,failed}; }

/* ---------------- writing ---------------- */
async function libFolderDir(fid,create=true){ if(!fid||!String(fid).startsWith('d:')) return LIB.tr; return LIB.tr.getDirectoryHandle(libSafe(fid.slice(2)),{create}); }
// Save one: score.json and chords.txt every time; the recording and reading only when given (they're written once)
async function libSave(item,media){
  let w=LIB.where.get(item.id);
  if(w&&!await libHas(w.parent,w.name,'directory')) w=null;   // its folder went away meanwhile: make it again
  if(!w){ const parent=await libFolderDir(item.folder), name=await libFreeName(parent,libSafe(item.title));
    const dir=await parent.getDirectoryHandle(name,{create:true}); w={dir,parent,name,folder:item.folder?libSafe(item.folder.slice(2)):'',rec:null}; LIB.where.set(item.id,w); }
  if(media&&media.file){
    const rec='recording.'+libAudioExt(media.file);
    for await (const [n,h] of w.dir.entries()) if(h.kind==='file'&&/^recording\./i.test(n)&&n!==rec) await w.dir.removeEntry(n);
    await libWrite(w.dir,rec,media.file); await libWrite(w.dir,'reading.json',JSON.stringify({sel:media.sel,raw:media.raw,shift:media.shift}));
    w.rec=rec; }
  const txt=chordsTxt(item), sc=libClean(item); sc.chordsHash=libHash(txt);
  await libWrite(w.dir,'chords.txt',txt); await libWrite(w.dir,'score.json',libJSON(sc));
  return !!(w.rec&&await libHas(w.dir,'reading.json','file')); }
// The recording and what was heard in it, or null
async function libMedia(id){ const w=LIB.where.get(id); if(!w||!w.rec) return null;
  try{ const file=await (await w.dir.getFileHandle(w.rec)).getFile(), r=JSON.parse(await libText(w.dir,'reading.json')||'null'); if(!r) return null;
    return {file,sel:r.sel,raw:r.raw,shift:r.shift}; }catch(e){ return null; } }
// Read one again from its folder (picks up chords.txt or score.json edited since), keeping where it is
async function libReload(id){ const w=LIB.where.get(id); if(!w) return null; return libReadSong(w.dir,w.name,w.parent,w.folder); }
// Deleting moves it to library/deleted (outside transcriptions/, so it's no longer listed); empty that folder in Finder when you're sure
async function libBin(parent,name){ const bin=await LIB.root.getDirectoryHandle('deleted',{create:true}), st=new Date().toISOString().slice(0,10);
  await libMoveDir(parent,name,bin,await libFreeName(bin,`${name} (${st})`)); }
async function libDelete(id){ const w=LIB.where.get(id); if(!w) return; await libBin(w.parent,w.name); LIB.where.delete(id); }
async function libRename(item,title){ const w=LIB.where.get(item.id); item.title=title; if(!w) return libSave(item);
  const name=await libFreeName(w.parent,libSafe(title),w.name);
  if(name!==w.name){ w.dir=await libMoveDir(w.parent,w.name,w.parent,name); w.name=name; }
  return libSave(item); }
async function libMove(item,fid){ const w=LIB.where.get(item.id); if(!w) return;
  const dest=await libFolderDir(fid), name=await libFreeName(dest,w.name);
  w.dir=await libMoveDir(w.parent,w.name,dest,name); w.parent=dest; w.name=name; w.folder=fid?libSafe(fid.slice(2)):'';
  if(fid) item.folder=fid; else delete item.folder; }
async function libNewFolder(name){ const n=await libFreeName(LIB.tr,libSafe(name)); await LIB.tr.getDirectoryHandle(n,{create:true}); return 'd:'+n; }
async function libRenameFolder(fid,name){ const old=libSafe(fid.slice(2)), n=await libFreeName(LIB.tr,libSafe(name),old);
  if(n!==old) await libMoveDir(LIB.tr,old,LIB.tr,n);
  const cl=store.get('trLibClosed',{}); if(cl[old]){ delete cl[old]; cl[n]=true; store.set('trLibClosed',cl); } }
// keep: its transcriptions move out to the top level first
async function libDeleteFolder(fid,keep){ const old=libSafe(fid.slice(2));
  if(keep) for(const t of TRDATA.list.filter(t=>t.folder===fid)) await libMove(t,'');
  await libBin(LIB.tr,old); }   // even when emptied: anything else in it (a folder Jun Jam couldn't read) is kept, not wiped
function libSetClosed(fid,closed){ const cl=store.get('trLibClosed',{}), n=libSafe(fid.slice(2)); if(closed) cl[n]=true; else delete cl[n]; store.set('trLibClosed',cl); }

/* ---------------- your licks and your progress ----------------
   The browser keeps working copies (it's fast and always there); the library folder keeps the copies that last:

     library/licks.json      your own licks (recorded, typed, or sent from a transcription), one per line
     library/progress.json   everything else Jun Jam remembers: stars, streaks, reviews, Gig charts you added, routines,
                             settings (every saved item but the transcriptions, which have their own folders)

   Both are written a few seconds after anything changes. Licks go both ways: change licks.json outside Jun Jam
   and it's read back next time Jun Jam starts (or the folder is linked); a lick added on one side and one deleted on
   the other are both respected (the ids at the last sync tell which is which). Progress comes back from the folder
   when this browser hasn't synced with it yet (a new computer, Chrome cleared), after you say yes. */
const LIB_EXCLUDE=new Set(['trans']);   // the transcriptions live in their own folders
const libProgress=()=>{ const o={}; for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(!k||!k.startsWith('mtc:')) continue; const s=k.slice(4);
    if(LIB_EXCLUDE.has(s)||s.startsWith('lib')) continue; try{ o[s]=JSON.parse(localStorage.getItem(k)); }catch(e){} } return o; };
const libLicksOf=()=>(typeof LDATA!=='undefined'&&LDATA.user)||[];
function libLicksJSON(licks){ return `{\n  "format": "junjam-licks",\n  "version": 1,\n  "licks": [\n${licks.map(l=>'    '+JSON.stringify(l)).join(',\n')}\n  ]\n}\n`; }
// Merge the folder's licks with the browser's, three ways (last: the ids both had at the last sync)
function libMergeLicks(file,browser,last,fileChanged){
  const F=new Map(file.map(l=>[l.id,l])), B=new Map(browser.map(l=>[l.id,l])), was=new Set(last), out=[];
  new Set([...B.keys(),...F.keys()]).forEach(id=>{ const f=F.get(id), b=B.get(id);
    if(f&&b) out.push(fileChanged?f:b);
    else if(b){ if(!(was.has(id)&&fileChanged)) out.push(b); }   // only in the browser: new here, unless the file dropped it since
    else if(!was.has(id)) out.push(f); });                     // only in the file: new there, unless the browser deleted it
  return out; }
// one at a time: the timer, a save and a link could otherwise write the same file at once
const libQueue=f=>(LIB.q=(LIB.q||Promise.resolve()).then(f,f));
const libSyncLicks=()=>libQueue(libSyncLicks1);
async function libSyncLicks1(){
  if(!LIB.on||typeof LDATA==='undefined') return;
  const txt=await libText(LIB.root,'licks.json'); let file=null;
  if(txt!=null){ try{ const d=JSON.parse(txt); if(Array.isArray(d.licks)) file=d.licks.filter(l=>l&&l.id&&Array.isArray(l.notes)); }catch(e){} 
    if(!file){ LIB.notes.push("licks.json can't be read, so your licks there were left as they are (the browser's copy is still here)."); return; } }
  const changed=txt!=null&&libHash(txt)!==store.get('libLicksHash',''), merged=file?libMergeLicks(file,libLicksOf(),store.get('libLickIds',[]),changed):libLicksOf();
  const before=JSON.stringify(libLicksOf());
  if(JSON.stringify(merged)!==before){ merged.forEach(l=>{ l.user=true; }); LDATA.user=merged; if(typeof applyRatings==='function') applyRatings([],LDATA.user); saveLines(); }
  const out=libLicksJSON(LDATA.user); if(out!==txt) await libWrite(LIB.root,'licks.json',out);
  store.set('libLicksHash',libHash(out)); store.set('libLickIds',LDATA.user.map(l=>l.id)); }
const libSaveProgress=()=>libQueue(libSaveProgress1);
async function libSaveProgress1(){
  if(!LIB.on) return; const data=libProgress(), body=JSON.stringify(data), h=libHash(body);
  if(h===LIB.progH) return;
  await libWrite(LIB.root,'progress.json',`{"format":"junjam-progress","version":1,"saved":${Date.now()},"data":${body}}\n`);
  LIB.progH=h; store.set('libProgAt',Date.now()); }
// Bring progress in from the folder when this browser hasn't synced with it (or the folder is newer). true: it reloads
async function libRestoreProgress(ask=true){
  const txt=await libText(LIB.root,'progress.json'); if(txt==null) return false;
  let d; try{ d=JSON.parse(txt); }catch(e){ LIB.notes.push("progress.json can't be read, so nothing was brought in from it."); return false; }
  if(!d||d.format!=='junjam-progress'||!d.data) return false;
  const at=store.get('libProgAt',0); if(at&&d.saved<=at+5000) return false;
  const when=new Date(d.saved).toLocaleString();
  if(ask&&!confirm(`Your library folder has Jun Jam progress saved ${when} (stars, licks, reviews, Gig charts, settings).\n\nBring it into this browser? It replaces what this browser has (a copy of that goes in library/backups first). Your transcriptions aren't affected.`)){ store.set('libProgAt',Date.now()); return false; }
  // what this browser had goes in library/backups first, so saying yes can never lose anything
  try{ const bk=await LIB.root.getDirectoryHandle('backups',{create:true}), st=new Date().toISOString().slice(0,19).replace(/:/g,'-');
    await libWrite(bk,`progress before restore ${st}.json`,JSON.stringify({format:'junjam-progress',version:1,saved:Date.now(),data:libProgress()})+'\n'); }
  catch(e){ LIB.notes.push("Couldn't back up this browser's progress first, so nothing was replaced."); return false; }
  Object.entries(d.data).forEach(([k,v])=>{ if(!LIB_EXCLUDE.has(k)&&!k.startsWith('lib')) try{ localStorage.setItem('mtc:'+k,JSON.stringify(v)); }catch(e){} });
  store.set('libProgAt',d.saved); store.set('libLicksHash',''); store.set('libLickIds',[]);
  location.reload(); return true; }
// Everything after the folder opens: progress first (it may reload), then licks, then keep both written
async function libSyncAll(){
  if(!LIB.on) return;
  try{ if(await libRestoreProgress()) return; }catch(e){}
  try{ await libSyncLicks(); }catch(e){ LIB.notes.push(`Couldn't sync your licks with the folder (${e.message}).`); }
  try{ await libSaveProgress(); }catch(e){}
  if(!LIB.timer){ LIB.timer=setInterval(()=>libSaveSoon(0),10000);
    document.addEventListener('visibilitychange',()=>{ if(document.hidden) libSaveSoon(0); }); } }
// after a change: write what changed (licks right away, progress with it)
function libSaveSoon(ms=800){ if(!LIB.on) return; clearTimeout(LIB.soon);
  LIB.soon=setTimeout(async()=>{ try{ if(libLicksJSON(libLicksOf())!==LIB.lastLicks){ await libSyncLicks(); LIB.lastLicks=libLicksJSON(libLicksOf()); } await libSaveProgress(); }catch(e){} },ms); }

/* ---------------- linking from anywhere ----------------
   Profile shows where things are kept; a small button asks for the folder again after a restart when Chrome needs your OK. */
function libChip(){ let c=document.getElementById('libChip');
  if(!LIB.need){ if(c) c.remove(); return; }
  if(!c){ c=document.createElement('button'); c.id='libChip'; c.className='ghost libchip'; document.body.appendChild(c);
    c.onclick=async()=>{ if(await libAllow()){ libChip(); await libSyncAll(); if(typeof trLibRender==='function') trLibRender(); } }; }
  c.textContent='Library folder: click to allow'; c.title='Your transcriptions, licks and progress are kept in your library folder. Chrome needs your OK again after a restart (choose “Allow on every visit” to stop this).'; }
function libProfileBox(el){ if(!el) return;
  if(!LIB_OK){ el.innerHTML='<p class="fine">This browser can\'t keep files in a folder, so everything stays inside the browser. Use Chrome to keep a library folder.</p>'; return; }
  const left=LIB.on?libBrowserOnly().length:0;
  el.innerHTML=LIB.on?`<p>Kept as files in <b>${trEsc(LIB.pick.name+(LIB.sub?'/'+LIB.sub:''))}</b>: your transcriptions (one folder each), your licks (licks.json) and everything else Jun Jam remembers (progress.json), written a few seconds after each change. The browser keeps a working copy.</p>
      <div class="erow"><button class="ghost" id="libPNow">Save now</button>${left?`<button class="ghost" id="libPCopy">Copy in the ${left} transcription${left>1?'s':''} kept in the browser</button>`:''}<button class="ghost" id="libPOther">Use a different folder…</button></div>`
    :LIB.need?`<p>Your library folder needs your OK again.</p><div class="erow"><button class="go" id="libPAllow">Allow</button></div>`
    :`<p>Everything is kept inside this browser, so clearing Chrome's site data or a computer problem would lose it. Pick the Jun Jam folder and your transcriptions, licks and progress are kept as files in library/ there (git ignores it), so they survive and you can back them up.</p><div class="erow"><button class="go" id="libPLink">Keep them in a folder…</button></div>`;
  const q=id=>el.querySelector('#'+id), redo=()=>libProfileBox(el), link=async()=>{ const r=await libLink(); if(r){ await libSyncAll(); } redo(); libChip(); };
  if(q('libPLink')) q('libPLink').onclick=link; if(q('libPOther')) q('libPOther').onclick=link;
  if(q('libPAllow')) q('libPAllow').onclick=async()=>{ if(await libAllow()) await libSyncAll(); redo(); libChip(); };
  if(q('libPNow')) q('libPNow').onclick=async()=>{ LIB.progH=null; await libSyncLicks(); await libSaveProgress(); q('libPNow').textContent='Saved ✓'; };
  if(q('libPCopy')) q('libPCopy').onclick=async()=>{ await libCopyIn(); redo(); }; }
// at start: open the folder if Chrome still allows it, then sync
// at start (after every script has run, so the chord reader and Lines are there): open the folder if Chrome still allows it, then sync
const libBoot=()=>libInit().then(async on=>{ if(on) await libSyncAll(); libChip(); }).catch(()=>{});
if(LIB_OK){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',libBoot,{once:true}); else setTimeout(libBoot,0); }
