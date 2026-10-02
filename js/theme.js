/* ---------------- themes ----------------
   A theme is a set of CSS variables and component styles (css/themes.css, keyed by data-theme on <html>), its fonts,
   and optionally a moving background. This file runs in <head>, before the page draws, so there is no flash of the
   old look. The Profile & settings page (renderSettingsPane) shows each theme as a live preview: the preview tiles
   carry data-skin, which css/themes.css styles with the same variables. Add a theme by adding an entry here and a
   block in css/themes.css. */
const THEMES=[
  {id:'classic',name:'Classic',tag:'Midnight blue and brass, the original. Follows your system, or pick Dark or Light.',fonts:null},
  {id:'neon',name:'Neon Grid',tag:'Techno: a glowing grid, rainbow lines, 3D wireframes drifting behind everything.',
    fonts:'family=Space+Grotesk:wght@400;500;600;700&family=Unbounded:wght@500;700;800&family=JetBrains+Mono:wght@500;700'},
  {id:'manuscript',name:'Manuscript',tag:'Old sheet music: parchment, iron-gall ink, rust-red stamps, scratches and stains.',
    fonts:'family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=IM+Fell+DW+Pica:ital@0;1'},
  {id:'studio',name:'Studio',tag:'Clean, with character: bold outlines, hard shadows, a pastel for every mode.',
    fonts:'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=DM+Mono:wght@500'},
];
const themeGet=(k,d)=>{ try{ const v=localStorage.getItem('mtc:'+k); return v==null?d:JSON.parse(v); }catch(e){ return d; } };
const themeSet=(k,v)=>{ try{ localStorage.setItem('mtc:'+k,JSON.stringify(v)); }catch(e){} };
function themeFonts(t){ if(!t||!t.fonts||document.getElementById('font-'+t.id)) return;
  const l=document.createElement('link'); l.id='font-'+t.id; l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?'+t.fonts+'&display=swap'; document.head.appendChild(l); }
// Classic has a light and a dark side: 'auto' follows the system
function applyTheme(id,shade){
  const t=THEMES.find(x=>x.id===id)||THEMES[0], root=document.documentElement;
  if(shade==null) shade=themeGet('shade','auto');
  root.dataset.theme=t.id==='classic'?(shade==='auto'?'':shade):t.id;
  if(!root.dataset.theme) delete root.dataset.theme;
  root.dataset.skin=t.id; themeFonts(t); themeSet('theme',t.id); themeSet('shade',shade);
  const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.content=getComputedStyle(root).getPropertyValue('--bg').trim()||'#0d1636';
  skinMotion(t.id);
}

/* ---------- Neon Grid: wireframe solids rotating in 3D, edges in a moving rainbow ---------- */
const NEON={raf:0,cv:null,last:0};
function neonSolids(){
  const p=(1+Math.sqrt(5))/2, ico=[[-1,p,0],[1,p,0],[-1,-p,0],[1,-p,0],[0,-1,p],[0,1,p],[0,-1,-p],[0,1,-p],[p,0,-1],[p,0,1],[-p,0,-1],[-p,0,1]];
  const edges=(vs,len)=>{ const e=[]; for(let i=0;i<vs.length;i++) for(let j=i+1;j<vs.length;j++){ const d=Math.hypot(vs[i][0]-vs[j][0],vs[i][1]-vs[j][1],vs[i][2]-vs[j][2]); if(Math.abs(d-len)<.01) e.push([i,j]); } return e; };
  // a torus as rings and spokes
  const tv=[], te=[], R=1.15, r=.45, U=18, V=8;
  for(let u=0;u<U;u++) for(let v=0;v<V;v++){ const a=u/U*2*Math.PI, b=v/V*2*Math.PI; tv.push([(R+r*Math.cos(b))*Math.cos(a),(R+r*Math.cos(b))*Math.sin(a),r*Math.sin(b)]);
    te.push([u*V+v,u*V+(v+1)%V],[u*V+v,((u+1)%U)*V+v]); }
  // a stellated octahedron (two interlocked tetrahedra)
  const so=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[-1,1,1],[1,-1,1],[1,1,-1]], se=[];
  for(let i=0;i<4;i++) for(let j=i+1;j<4;j++){ se.push([i,j]); se.push([i+4,j+4]); }
  return [{v:ico,e:edges(ico,2),x:.84,y:.2,s:.17,sp:[.13,.21,.05]},{v:tv,e:te,x:.1,y:.82,s:.15,sp:[.17,-.09,.11]},{v:so,e:se,x:.16,y:.22,s:.07,sp:[-.23,.16,.19]},{v:ico,e:edges(ico,2),x:.62,y:.9,s:.06,sp:[.3,.12,-.2]}];
}
function neonFrame(ts){
  const cv=NEON.cv; if(!cv) return; NEON.raf=requestAnimationFrame(neonFrame);
  if(ts-NEON.last<33&&!NEON.still) return; NEON.last=ts;            // about 30 frames a second is plenty for a backdrop
  const dpr=Math.min(2,devicePixelRatio||1), W=innerWidth, H=innerHeight;
  if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){ cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); }
  const g=cv.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,W,H); g.globalCompositeOperation='lighter';
  const t=ts/1000, S=Math.min(W,H);
  NEON.solids.forEach((o,k)=>{
    const [ax,ay,az]=o.sp.map(v=>v*t), cx=o.x*W, cy=o.y*H+Math.sin(t*.4+k)*12, sc=o.s*S;
    const P=o.v.map(([x,y,z])=>{ let X=x, Y=y*Math.cos(ax)-z*Math.sin(ax), Z=y*Math.sin(ax)+z*Math.cos(ax);
      [X,Z]=[X*Math.cos(ay)+Z*Math.sin(ay),-X*Math.sin(ay)+Z*Math.cos(ay)]; [X,Y]=[X*Math.cos(az)-Y*Math.sin(az),X*Math.sin(az)+Y*Math.cos(az)];
      const f=3.2/(3.2+Z*.55); return [cx+X*sc*f,cy+Y*sc*f,Z]; });
    o.e.forEach(([i,j],n)=>{ const a=P[i], b=P[j], depth=(a[2]+b[2])/2, hue=(n*9+t*40+k*80)%360, al=.18+.32*(1-(depth+1.8)/3.6);
      g.strokeStyle=`hsla(${hue},95%,62%,${Math.max(.06,al)*.35})`; g.lineWidth=4; g.beginPath(); g.moveTo(a[0],a[1]); g.lineTo(b[0],b[1]); g.stroke();
      g.strokeStyle=`hsla(${hue},100%,72%,${Math.max(.08,al)})`; g.lineWidth=1.1; g.stroke(); });
  });
  if(NEON.still){ cancelAnimationFrame(NEON.raf); NEON.raf=0; }
}
function skinMotion(id){
  if(id!=='neon'){ if(NEON.cv){ cancelAnimationFrame(NEON.raf); NEON.cv.remove(); NEON.cv=null; } return; }
  if(NEON.cv) return;
  const go=()=>{ const cv=document.createElement('canvas'); cv.className='skincanvas'; cv.setAttribute('aria-hidden','true'); document.body.prepend(cv);
    NEON.cv=cv; NEON.solids=neonSolids(); NEON.still=matchMedia('(prefers-reduced-motion: reduce)').matches; NEON.raf=requestAnimationFrame(neonFrame); };
  document.body?go():addEventListener('DOMContentLoaded',go,{once:true});
}
document.addEventListener('visibilitychange',()=>{ if(!NEON.cv) return; if(document.hidden){ cancelAnimationFrame(NEON.raf); NEON.raf=0; } else if(!NEON.raf&&!NEON.still) NEON.raf=requestAnimationFrame(neonFrame); });

/* ---------- Profile & settings (a pane on the home card) ---------- */
function themePreview(t){
  return `<span class="skinprev" data-skin="${t.id}" aria-hidden="true"><span class="sp-deco"></span>
    <span class="sp-card"><span class="sp-title">Jun Jam</span><span class="sp-chord">C<sup>maj7</sup></span><span class="sp-row"><span class="sp-btn">Start</span><span class="sp-ghost">Ears</span></span></span>
    <span class="sp-keys">${'<i></i>'.repeat(10)}</span><span class="sp-sw"><i style="background:var(--brass)"></i><i style="background:var(--chord)"></i><i style="background:var(--good)"></i><i style="background:var(--wrong)"></i></span></span>`;
}
function renderSettingsPane(){
  THEMES.forEach(themeFonts);                       // the previews show each theme's own type
  const cur=themeGet('theme','classic'), shade=themeGet('shade','auto'), name=themeGet('profileName','');
  $('settingsPane').innerHTML=`<button class="back" data-home>← All modes</button>
    <div class="profhead"><span class="avatar big" aria-hidden="true">${(name||'J').trim().charAt(0).toUpperCase()}</span>
      <div class="profinfo"><label class="fine" for="profName">Your name</label><input id="profName" maxlength="24" placeholder="Player" value="${name.replace(/"/g,'&quot;')}"><p class="rank">${rankLine()}</p></div></div>
    <h2>Look</h2><p>Pick a theme. It changes the whole app right away, and stays picked next time.</p>
    <div class="skingrid">${THEMES.map(t=>`<button class="skintile" data-pick="${t.id}" aria-pressed="${t.id===cur}">${themePreview(t)}<span class="skinname">${t.name}</span><span class="skintag">${t.tag}</span></button>`).join('')}</div>
    <div class="shaderow" ${cur==='classic'?'':'hidden'}><span class="fine">Classic</span><div class="seg" role="group">${[['auto','Auto'],['dark','Dark'],['light','Light']].map(([v,l])=>`<button data-shade="${v}" aria-pressed="${shade===v}">${l}</button>`).join('')}</div></div>`;
  const P=$('settingsPane');
  P.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{ applyTheme(b.dataset.pick); renderSettingsPane(); renderProfileChip(); });
  P.querySelectorAll('[data-shade]').forEach(b=>b.onclick=()=>{ applyTheme('classic',b.dataset.shade); renderSettingsPane(); });
  $('profName').oninput=e=>{ themeSet('profileName',e.target.value.trim()); renderProfileChip(); P.querySelector('.avatar').textContent=(e.target.value.trim()||'J').charAt(0).toUpperCase(); };
}
// the chip on the home card that opens Profile & settings
function renderProfileChip(){ const c=$('profileChip'); if(!c) return; const name=themeGet('profileName','');
  c.innerHTML=`<span class="avatar" aria-hidden="true">${(name||'J').charAt(0).toUpperCase()}</span><span class="pcname">${name?name.replace(/</g,'&lt;'):'Profile'}</span><span class="pcgear" aria-hidden="true">⚙</span>`;
  c.title='Profile & settings: your name and the look of the app'; }

applyTheme(themeGet('theme','classic'));
