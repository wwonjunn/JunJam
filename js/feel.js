/* ---------------- feel: the Ears hit, in every mode ----------------
   What makes a right answer in Ears satisfying: your notes leave the keys you pressed as bolts, a beat apart (30 ms), land
   on what you got right, and it answers with a few sparks, a small punch and a score floating up. These do the same on
   the page for the other modes. Colours come from the theme; with reduced motion only the result itself shows. */
const FEEL={layer:null};
const feelReduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const feelVar=k=>getComputedStyle(document.documentElement).getPropertyValue(k).trim();
function feelLayer(){ if(!FEEL.layer||!FEEL.layer.isConnected){ const d=document.createElement('div'); d.className='feel'; document.body.appendChild(d); FEEL.layer=d; } return FEEL.layer; }
const feelAt=t=>{ if(!t) return null; if(!t.getBoundingClientRect) return t; const r=t.getBoundingClientRect(); return r.width||r.height?{x:r.left+r.width/2,y:r.top+r.height/2}:null; };
// the top edge of an on-screen key, where a bolt leaves from
function feelKeyTop(m){ const el=keyEls[m]; if(!el) return null; const r=el.getBoundingClientRect(); return r.width?{x:r.left+r.width/2,y:r.top+2}:null; }
// the keys you played light up, low to high
function feelKeys(notes){ if(feelReduce()||!notes) return;
  [...new Set(notes)].sort((a,b)=>a-b).forEach((m,i)=>{ const k=keyEls[m]; if(!k) return;
    setTimeout(()=>{ k.classList.remove('kflash'); void k.getBoundingClientRect(); k.classList.add('kflash'); setTimeout(()=>k.classList.remove('kflash'),340); },i*30); }); }
// bolts from the played keys to a target (an element or {x,y}); land(point) runs as the first one arrives
function feelBolts(notes,target,land,o={}){
  const T=feelAt(target), from=[...new Set(notes||[])].sort((a,b)=>a-b).slice(0,5).map(feelKeyTop).filter(Boolean);
  if(!T){ return; } if(feelReduce()||!from.length){ land&&land(T); return; }
  const L=feelLayer(), col=o.col||feelVar('--brass'), dur=o.dur||170, S=46;   // S: the bolt's own length
  from.forEach((p,i)=>{ const dx=T.x-p.x, dy=T.y-p.y, len=Math.max(0,Math.hypot(dx,dy)-S), b=document.createElement('i');
    b.className='fbolt'; b.style.cssText=`left:${p.x}px;top:${p.y}px;width:${S}px;--a:${Math.atan2(dy,dx)}rad;--len:${len}px;color:${col};background:linear-gradient(90deg,transparent,${col});animation-duration:${dur}ms;animation-delay:${i*30}ms`;
    L.appendChild(b); setTimeout(()=>b.remove(),i*30+dur+80); });
  setTimeout(()=>land&&land(T),dur);
}
// sparks out from a point, and a ring
function feelBurst(x,y,o={}){ if(feelReduce()) return;
  const L=feelLayer(), cols=o.cols||[feelVar('--brass'),feelVar('--good'),feelVar('--chord')], n=o.n||12, sp=o.spread||48;
  for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, d=sp*(.45+Math.random()*.75), s=document.createElement('i'); s.className='fspark';
    s.style.cssText=`left:${x}px;top:${y}px;background:${cols[i%cols.length]};--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px;animation-duration:${420+Math.round(Math.random()*240)}ms`;
    L.appendChild(s); setTimeout(()=>s.remove(),720); }
  if(o.ring!==false){ const r=document.createElement('i'); r.className='fring'; r.style.cssText=`left:${x}px;top:${y}px;border-color:${cols[0]}`; L.appendChild(r); setTimeout(()=>r.remove(),520); }
}
// a word or a score, floating up from a point
function feelPop(x,y,text,o={}){ if(feelReduce()) return; const L=feelLayer(), p=document.createElement('b'); p.className='fpop'+(o.small?' small':''); p.textContent=text;
  p.style.cssText=`left:${x}px;top:${y}px;color:${o.col||feelVar('--brass')}`; L.appendChild(p); setTimeout(()=>p.remove(),950); }
// a small punch on what was hit (not on things the game moves with transform)
function feelPunch(el){ if(!el||!el.classList||feelReduce()) return;
  if(getComputedStyle(el).display==='inline') el.style.display='inline-block';   // a transform needs a box
  el.classList.remove('fpunch'); void el.getBoundingClientRect(); el.classList.add('fpunch'); setTimeout(()=>el.classList.remove('fpunch'),280); }
// all of it: keys light, bolts fly, and on landing sparks, a punch and a word. o: {text, cols, n, punch:false, col}
function feelHit(notes,target,o={}){ feelKeys(notes);
  feelBolts(notes,target,T=>{ if(o.punch!==false) feelPunch(target&&target.classList?target:null); feelBurst(T.x,T.y,o); if(o.text) feelPop(T.x,T.y-(o.dy??26),o.text,o); o.land&&o.land(T); },o); }
