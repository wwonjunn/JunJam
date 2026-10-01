/* ---------------- input: MIDI + fallback ---------------- */
const held=new Set(); let gesture=new Set(), settleTimer=null; const SETTLE=140;
const draft=new Set();
function noteOn(m,v){
  if(typeof LINES!=='undefined'&&(LINES.active||LINES.rec)){ synth.init(); held.add(m); synth.on(m,v); linesNote(m); return; } // lines take single notes, not chords
  synth.init(); held.add(m); gesture.add(m); synth.on(m,v);
  kbMarks={}; paintKeys();
  clearTimeout(settleTimer); settleTimer=setTimeout(commitGesture,SETTLE);
}
function noteOff(m){
  held.delete(m); synth.off(m);
  if(held.size===0 && !settleTimer) gesture=new Set();
  paintKeys();
}
function commitGesture(){
  settleTimer=null;
  const notes=[...gesture];
  gesture= held.size? new Set(held) : new Set();
  routeNotes(notes);
}
function toggleDraft(m){
  synth.init();
  if(typeof LINES!=='undefined'&&(LINES.active||LINES.rec)){ synth.on(m,80); setTimeout(()=>synth.off(m,0.5),400); linesNote(m); return; }
  if(draft.has(m)){draft.delete(m);} else {draft.add(m); synth.on(m,80); setTimeout(()=>synth.off(m,0.6),500);}
  kbMarks={}; paintKeys();
}
function submitDraft(){ if(!draft.size) return; const n=[...draft]; draft.clear(); routeNotes(n); }
function routeNotes(n){ if(EARS.active) earsNotes(n); else submit(n); }

async function initMIDI(){
  const el=$('midi');
  if(!navigator.requestMIDIAccess){el.textContent='No Web MIDI here. Try Chrome or Edge.';el.className='midi bad';return;}
  try{
    const acc=await navigator.requestMIDIAccess({sysex:false});
    const bind=()=>{
      const names=[];
      acc.inputs.forEach(inp=>{inp.onmidimessage=onMsg; names.push(inp.name);});
      if(names.length){el.textContent=names[0].replace(/\s*MIDI.*$/i,'')+(names.length>1?` +${names.length-1}`:'');el.className='midi on';}
      else {el.textContent='No MIDI keyboard found';el.className='midi';}
    };
    bind(); acc.onstatechange=bind;
  }catch(e){
    el.textContent='MIDI blocked here. Open the page in its own Chrome tab.'; el.className='midi bad';
  }
}
function onMsg(e){
  const [st,d1,d2]=e.data, cmd=st&0xf0;
  if(cmd===0x90 && d2>0) noteOn(d1,d2);
  else if(cmd===0x80 || (cmd===0x90 && d2===0)) noteOff(d1);
}
const QWERTY={a:0,w:1,s:2,e:3,d:4,f:5,t:6,g:7,y:8,h:9,u:10,j:11,k:12,o:13,l:14,p:15,';':16,"'":17};
let qOct=60;
document.addEventListener('keydown',e=>{
  if(typeof EARS!=='undefined' && EARS.active && earsKey(e)) return;
  if(typeof LINES!=='undefined' && LINES.active && linesKey(e)) return;
  if((e.key==='r'||e.key==='R') && G && G.running && G.enemies.length && G.enemies[0].t.req==='byear'){ playByEar(G.enemies[0].t); return; }
  if(e.metaKey||e.ctrlKey||e.altKey) return;
  const k=e.key.toLowerCase();
  if(e.key==='Escape'){ if(G&&G.running) pause(); else if(G&&G.paused) resume(); return; }
  if(e.target && (e.target.tagName==='BUTTON'||e.target.tagName==='INPUT') && (e.key==='Enter'||e.key===' ')) return;
  if(e.key==='?'||e.key==='/'){ if(G&&G.running&&G.enemies.length){G.combo=0;G.hints++;updateHud();showHint(G.enemies[0].t);} e.preventDefault(); return;}
  if(e.key==='Enter'||e.key===' '){submitDraft();e.preventDefault();return;}
  if(e.key==='Backspace'){draft.clear();paintKeys();return;}
  if(k==='z'){qOct=Math.max(36,qOct-12);return;}
  if(k==='x'){qOct=Math.min(84,qOct+12);return;}
  if(k in QWERTY && !e.repeat){toggleDraft(qOct+QWERTY[k]);}
});

