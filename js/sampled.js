/* ---------------- real instrument sounds (optional, offline after one download) ----------------
   The built-in synth always works, with or without Wi-Fi: it's the offline mode and the fallback. These recorded
   instruments are an upgrade on top: download them once (Profile & settings → Sound) and they're kept in this browser's
   database, so they load from your Mac every time after, Wi-Fi or not. Until they're downloaded, or if they're ever
   cleared, everything plays on the synth as before.
   Wurlitzer EP200 samples by Greg Sullivan (CC BY 3.0, http://www.sullivang.net/). Steinway grand ("Splendid Grand
   Piano") samples released into the public domain by Akai. Both mapped by kinwie for sfzinstruments and hosted by
   smpldsnds on GitHub Pages. Regions: [low key, high key, key centre, tune (cents), volume (dB), file, low vel, high vel]. */
const SMP_MAPS={"wurli":{"base":"https://smpldsnds.github.io/sfzinstruments-greg-sullivan-e-pianos/wurlitzer-ep200/samples/","regions":[[33,35,33,-5,-3.2,"a1pp",1,37],[36,38,33,-5,-3.5,"a1pp",1,37],[39,47,44,-8,-4.2,"ab2pp",1,37],[48,53,51,-10,-4.7,"eb3pp",1,37],[54,59,56,-12,-5.5,"ab3pp",1,37],[60,62,61,-2,-5.2,"db4pp",1,37],[63,68,67,-2,-5.2,"g4pp",1,37],[69,74,73,-5,-5.4,"db5pp",1,37],[75,80,79,-8,-5.4,"g5mp",1,37],[81,89,85,6,-5.6,"db6mp",1,37],[90,96,92,2,-5.7,"ab6mp",1,37],[33,35,33,-5,-3.8,"a1mp",38,65],[36,41,40,-4,-4.2,"e2mp",38,65],[42,47,45,-2,-4.7,"a2mp",38,65],[48,53,51,-9,-5.1,"eb3mp",38,65],[54,59,56,-8,-5.3,"ab3mp",38,65],[60,62,61,4,-5.3,"db4mp",38,65],[63,68,66,7,-5.4,"gb4mp",38,65],[69,71,71,-5,-5.2,"b4mp",38,65],[72,74,73,3,-5.4,"db5mp",38,65],[75,80,79,-8,-5.4,"g5mp",38,65],[81,89,85,6,-5.6,"db6mp",38,65],[90,96,92,2,-5.7,"ab6mp",38,65],[33,35,33,-5,-4.7,"a1f",66,89],[36,38,36,-7,-5.0,"c2f",66,89],[39,44,41,-6,-4.7,"f2f",66,89],[45,50,47,-8,-5.0,"b2f",66,89],[51,53,52,-4,-4.7,"e3f",66,89],[54,59,56,-11,-4.8,"ab3f",66,89],[60,65,61,-2,-4.8,"db4f",66,89],[66,71,68,0,-5.0,"ab4f",66,89],[72,77,73,3,-6.0,"db5f",66,89],[78,80,79,-7,-5.9,"g5f",66,89],[81,89,85,0,-5.9,"db6f",66,89],[90,96,92,0,-5.9,"ab6f",66,89],[33,35,33,-5,-5.3,"a1ff",90,127],[36,38,36,-7,-5.3,"c2ff",90,127],[39,44,41,-6,-5.4,"f2ff",90,127],[45,50,47,-8,-5.4,"b2ff",90,127],[51,53,52,-2,-5.4,"e3ff",90,127],[54,59,56,-8,-5.4,"ab3ff",90,127],[60,62,61,2,-5.4,"db4ff",90,127],[63,65,64,-3,-5.4,"e4ff",90,127],[66,68,67,3,-5.4,"g4ff",90,127],[69,77,73,-1,-3.5,"db5ff",90,127],[78,80,79,-7,-4.9,"g5ff",90,127],[81,89,85,0,-5.5,"db6f",90,127],[90,96,92,0,-6.0,"ab6f",90,127]]},"grand":{"base":"https://smpldsnds.github.io/sfzinstruments-splendid-grand-piano/samples/","regions":[[21,24,23,0,0.0,"Mf B-1",1,127],[25,27,27,0,0.0,"Mf D#0",1,127],[28,30,29,0,0.0,"Mf F0",1,127],[31,32,31,0,0.0,"Mf G0",1,127],[33,34,33,0,0.0,"Mf A0",1,127],[35,35,35,0,0.0,"Mf B0",1,127],[36,37,37,0,0.0,"MF C#1",1,127],[38,39,38,0,0.0,"MF D1",1,127],[40,40,40,0,0.0,"MF E1",1,127],[41,41,41,0,0.0,"MF F1",1,127],[42,44,43,0,0.0,"MF G1",1,127],[45,46,45,0,0.0,"MF A1",1,127],[47,47,47,0,0.0,"MF B1",1,127],[48,49,48,0,0.0,"MF C2",1,127],[50,50,50,0,0.0,"MF D2",1,127],[51,52,52,0,0.0,"MF E2",1,127],[53,54,53,0,0.0,"MF F2",1,127],[55,55,55,0,0.0,"MF G2",1,127],[56,56,56,0,0.0,"MF G#2",1,127],[57,57,57,0,0.0,"MF A2",1,127],[58,58,58,0,0.0,"MF A#2",1,127],[59,59,59,0,0.0,"MF B2",1,127],[60,61,60,0,0.0,"MF C3",1,127],[62,63,62,0,0.0,"MF D3",1,127],[64,64,64,0,0.0,"MF E3",1,127],[65,66,65,0,0.0,"MF F3",1,127],[67,68,67,0,0.0,"MF G3",1,127],[69,69,69,0,0.0,"MF A3",1,127],[70,71,71,0,0.0,"MF B3",1,127],[72,73,72,0,0.0,"MF C4",1,127],[74,75,74,0,0.0,"Mf D4",1,127],[76,76,76,0,0.0,"Mf E4",1,127],[77,78,77,0,0.0,"Mf F4",1,127],[79,79,79,0,0.0,"Mf G4",1,127],[80,80,80,0,0.0,"Mf G#4",1,127],[81,81,81,0,0.0,"Mf A4",1,127],[82,82,82,0,0.0,"Mf A#4",1,127],[83,83,83,0,0.0,"Mf B4",1,127],[84,85,85,0,0.0,"Mf C#5",1,127],[86,86,86,0,0.0,"Mf D5",1,127],[87,87,87,0,0.0,"Mf D#5",1,127],[88,88,88,0,0.0,"Mf E5",1,127],[89,89,89,0,0.0,"Mf F5",1,127],[90,90,90,0,0.0,"Mf F#5",1,127],[91,91,91,0,0.0,"Mf G5",1,127],[92,92,92,0,0.0,"Mf G#5",1,127],[93,93,93,0,0.0,"Mf A5",1,127],[94,94,94,0,0.0,"Mf A#5",1,127],[95,95,95,0,0.0,"Mf B5",1,127],[96,96,96,0,0.0,"Mf C6",1,127],[97,97,97,0,0.0,"Mf C#6",1,127],[98,98,98,0,0.0,"Mf D6",1,127],[99,99,99,0,0.0,"Mf D#6",1,127],[100,100,100,0,0.0,"Mf E6",1,127],[101,101,101,0,0.0,"Mf F6",1,127],[102,102,102,0,0.0,"Mf F#6",1,127],[103,103,103,0,0.0,"Mf G6",1,127],[104,104,104,0,0.0,"Mf G#6",1,127],[105,105,105,0,0.0,"Mf A6",1,127],[106,106,106,0,0.0,"Mf A#6",1,127],[107,107,107,0,0.0,"Mf B6",1,127],[108,108,108,0,0.0,"Mf C7",1,127]]}};
const SMP_INFO={wurli:{name:'Electric piano',long:'Wurlitzer EP200 electric piano',size:'0.9 MB',rel:0.3,gain:1.5},grand:{name:'Grand piano',long:'Steinway grand piano',size:'5.8 MB',rel:0.45,gain:2.4}};   // gain: level-matched to the synth
const SMP={buf:{},ready:{},loading:{},voices:new Map()};
const SMP_FMT=(()=>{ try{ return new Audio().canPlayType('audio/ogg; codecs="opus"')?'ogg':'m4a'; }catch(e){ return 'm4a'; } })();
const smpFiles=id=>[...new Set(SMP_MAPS[id].regions.map(r=>r[5]))];
const smpHave=()=>store.get('sounds',{});
// the sound your keys (and the Keys backing) use: 'synth', or a downloaded instrument once it's loaded
const keysSoundPick=()=>store.get('keysSound','synth');
const keysSampled=()=>{ const k=keysSoundPick(); return k!=='synth'&&SMP.ready[k]?k:null; };
// a database just for sounds, so it never touches the transcriptions'
const smpDB=(()=>{ let p; const open=()=>p||(p=new Promise((ok,no)=>{ const r=indexedDB.open('junjam-sounds',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('files'); r.onsuccess=()=>ok(r.result); r.onerror=()=>no(r.error); }));
  const tx=(mode,f)=>open().then(db=>new Promise((ok,no)=>{ const t=db.transaction('files',mode), q=f(t.objectStore('files')); t.oncomplete=()=>ok(q&&q.result); t.onerror=()=>no(t.error); }));
  return {get:k=>tx('readonly',s=>s.get(k)).catch(()=>null), put:(k,v)=>tx('readwrite',s=>s.put(v,k)), del:k=>tx('readwrite',s=>s.delete(k)).catch(()=>{})}; })();
/* Download an instrument once (needs Wi-Fi this one time). onProgress(done,total). Resolves true when it's all stored. */
async function smpDownload(id,onProgress){
  const files=smpFiles(id), base=SMP_MAPS[id].base; let done=0;
  for(const f of files){ const key=id+'/'+f;
    if(!(await smpDB.get(key))){ const r=await fetch(base+encodeURIComponent(f)+'.'+SMP_FMT); if(!r.ok) throw new Error('Download failed ('+r.status+')'); await smpDB.put(key,await r.arrayBuffer()); }
    onProgress&&onProgress(++done,files.length); }
  const have=smpHave(); have[id]=SMP_FMT; store.set('sounds',have);
  await smpLoad(id); return true;
}
// Load a downloaded instrument from the database into memory (no network). Quietly stays on the synth if anything's missing.
async function smpLoad(id){
  if(SMP.ready[id]||SMP.loading[id]||!smpHave()[id]) return SMP.ready[id]||false;
  const c=synth.ctx; if(!c) return false; SMP.loading[id]=true;
  try{ const out={}, files=smpFiles(id);
    for(const f of files){ const ab=await smpDB.get(id+'/'+f); if(!ab) continue;
      try{ out[f]=await c.decodeAudioData(ab.slice(0)); }
      catch(e){ // a file this browser can't read: try the other format once, if we're online; otherwise its neighbours cover it
        if(navigator.onLine) try{ const r=await fetch(SMP_MAPS[id].base+encodeURIComponent(f)+'.'+(SMP_FMT==='ogg'?'m4a':'ogg')); if(r.ok){ const b=await r.arrayBuffer(); out[f]=await c.decodeAudioData(b.slice(0)); await smpDB.put(id+'/'+f,b); } }catch(e2){} } }
    if(Object.keys(out).length<files.length*0.8) return false;   // too much missing: stay on the synth
    SMP.buf[id]=out; SMP.ready[id]=true; return true;
  }catch(e){ return false; } finally{ SMP.loading[id]=false; }
}
function smpLoadAll(){ Object.keys(smpHave()).forEach(id=>smpLoad(id)); }
async function smpForget(id){ for(const f of smpFiles(id)) await smpDB.del(id+'/'+f); const have=smpHave(); delete have[id]; store.set('sounds',have); delete SMP.buf[id]; SMP.ready[id]=false; if(keysSoundPick()===id) store.set('keysSound','synth'); }
// One note from an instrument: the region for that key and velocity (or the nearest), pitched to the exact key
function smpStart(id,m,vel,t,out){
  const c=synth.ctx, rs=SMP_MAPS[id].regions, v=Math.max(1,Math.min(127,Math.round(vel)));
  const loaded=x=>SMP.buf[id]&&SMP.buf[id][x[5]];
  let r=rs.find(x=>m>=x[0]&&m<=x[1]&&v>=x[6]&&v<=x[7]&&loaded(x));
  if(!r){ const ok=rs.filter(loaded), pool=ok.filter(x=>v>=x[6]&&v<=x[7]); if(!ok.length) return null; r=(pool.length?pool:ok).reduce((a,b)=>Math.abs(b[2]-m)<Math.abs(a[2]-m)?b:a); }
  const b=loaded(r);
  const src=c.createBufferSource(), g=c.createGain(); src.buffer=b; src.playbackRate.value=Math.pow(2,(m-r[2]-r[3]/100)/12);
  const amp=0.9*SMP_INFO[id].gain*Math.pow(v/127,1.4)*Math.pow(10,r[4]/20);
  g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(amp,t+0.004);
  src.connect(g); g.connect(out||synth.master); src.start(t); src.stop(t+b.duration/src.playbackRate.value+0.05);
  return {src,g,id};
}
function smpRelease(v,t,rel){ if(!v) return; try{ v.g.gain.cancelScheduledValues(t); v.g.gain.setValueAtTime(Math.max(v.g.gain.value,0.0001),t); v.g.gain.setTargetAtTime(0.0001,t,rel/3); v.src.stop(t+rel+0.1); }catch(e){} }
// scheduled notes (licks, backing, questions): play for dur, then let go
function smpTone(id,m,when,dur,vel,bus){ const c=synth.ctx, t=Math.max(when,c.currentTime), v=smpStart(id,m,vel,t,bus); if(v) smpRelease(v,t+dur,SMP_INFO[id].rel); return !!v; }
