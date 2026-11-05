/* ---------------- themes ----------------
   A theme is a set of CSS variables and component styles (css/themes.css, keyed by data-theme on <html>), its fonts,
   and optionally background art: a painted scene (js/scenes.js, drawn once and kept still) or, for Neon Grid, a slow
   wireframe animation. This file runs in <head>, before the page draws, so there is no flash of the old look.
   The Profile & settings page shows each theme as a live preview tile (data-skin), painted by the same code.
   tier: for a future shop ('free' now; 'deluxe' marks the most detailed ones). Add a theme here, a block in
   css/themes.css, and (optionally) a painter in js/scenes.js. */
const THEMES=[
  {id:'classic',name:'Classic',tier:'free',tag:'Midnight blue and brass, the original. Follows your system, or pick Dark or Light.',fonts:null},
  {id:'manuscript',name:'Manuscript',tier:'free',tag:'Old sheet music: parchment, faint staves, iron-gall ink, rust-red stamps.',
    fonts:'family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=IM+Fell+DW+Pica:ital@0;1'},
  {id:'studio',name:'Studio',tier:'free',tag:'Clean, with character: bold outlines, hard shadows, a pastel for every mode.',
    fonts:'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=DM+Mono:wght@500'},
  {id:'neon',name:'Neon Grid',tier:'deluxe',tag:'Techno: a glowing grid, rainbow lines, 3D wireframes drifting behind everything.',
    fonts:'family=Space+Grotesk:wght@400;500;600;700&family=Unbounded:wght@500;700;800&family=JetBrains+Mono:wght@500;700'},
  {id:'pixel',name:'Pixel Autumn',tier:'deluxe',scene:true,tag:'Pixel art: a stone tower in an autumn wood, leaves drifting down.',
    fonts:'family=Pixelify+Sans:wght@400;500;700&family=Silkscreen&family=Nunito:wght@400;600;700'},
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
  root.dataset.skin=t.id; root.classList.toggle('skin-art',!!t.scene); themeFonts(t); themeSet('theme',t.id); themeSet('shade',shade);
  const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.content=getComputedStyle(root).getPropertyValue('--bg').trim()||'#0d1636';
  skinArt(t);
}

/* ---------- painted scenes: one still canvas behind the app, repainted only when the window size changes ---------- */
const ART={cv:null,id:null,timer:0,leaves:null};
function skinArt(t){
  skinMotion(t.id);
  if(!t.scene||typeof paintScene!=='function'){ if(ART.cv){ ART.cv.remove(); ART.cv=null; ART.id=null; } skinLeaves(false); return; }
  const go=()=>{ if(!ART.cv){ ART.cv=document.createElement('canvas'); ART.cv.className='skinart'; ART.cv.setAttribute('aria-hidden','true'); document.body.prepend(ART.cv); }
    ART.id=t.id; ART.cv.style.opacity=0; paintScene(ART.cv,t.id,false).then(()=>{ if(ART.id===t.id) ART.cv.style.opacity=1; }); skinLeaves(t.id==='pixel'); };
  document.body?go():addEventListener('DOMContentLoaded',go,{once:true});
}
addEventListener('resize',()=>{ if(!ART.cv) return; clearTimeout(ART.timer); ART.timer=setTimeout(()=>paintScene(ART.cv,ART.id,false),250); });
// Pixel Autumn's falling leaves: a dozen small elements moved by CSS only (transform), so they cost almost nothing
function skinLeaves(on){
  if(!on){ if(ART.leaves){ ART.leaves.remove(); ART.leaves=null; } return; }
  if(ART.leaves) return; const box=document.createElement('div'); box.className='leaves'; box.setAttribute('aria-hidden','true');
  box.innerHTML=[...Array(14)].map((_,i)=>`<i style="left:${(i*7.3+3)%100}%;animation-delay:${-(i*1.7)%12}s;animation-duration:${9+(i*3)%7}s;--sway:${20+(i*13)%50}px;--c:${['#e2552f','#f08a3b','#c8322a','#f7b84a','#7b5a2a'][i%5]}"></i>`).join('');
  document.body.prepend(box); ART.leaves=box;
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
  return `<span class="skinprev" data-skin="${t.id}" aria-hidden="true">${t.scene?`<canvas class="sp-art" data-scene="${t.id}"></canvas>`:'<span class="sp-deco"></span>'}
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
    <div class="skingrid">${THEMES.map(t=>`<button class="skintile" data-pick="${t.id}" aria-pressed="${t.id===cur}">${themePreview(t)}<span class="skinname">${t.name}${t.tier==='deluxe'?'<span class="skintier">Deluxe</span>':''}</span><span class="skintag">${t.tag}</span></button>`).join('')}</div>
    <div class="shaderow" ${cur==='classic'?'':'hidden'}><span class="fine">Classic</span><div class="seg" role="group">${[['auto','Auto'],['dark','Dark'],['light','Light']].map(([v,l])=>`<button data-shade="${v}" aria-pressed="${shade===v}">${l}</button>`).join('')}</div></div>
    <h2>Sound</h2><p>Backing chords: the sound of the chords that play under you in Gig, Lines, Reharm and Transcribe.</p>
    <div class="seg" role="group">${BACK_SOUNDS.map(([v,l,tip])=>`<button data-bsound="${v}" aria-pressed="${backSound()===v}" title="${tip}">${l}</button>`).join('')}</div>
    <button class="ghost" id="bsHear">▶ Hear it</button>
    <p style="margin-top:14px">Your keys: the sound of what you play, the licks, and the Keys backing. The real instruments download once (Wi-Fi this one time), then work offline. The built-in synth always works.</p>
    <div id="keysSound"></div>
    <div id="bassSound"></div>
    <p class="fine" id="smpCredit">Wurlitzer EP200 samples by Greg Sullivan (CC BY 3.0). Steinway grand samples: public domain, released by Akai. Both via sfzinstruments.</p>
    <p style="margin-top:14px">Drums: the kit. The sounds are built in and work offline. Want a particular kit? Load your own kick, snare and hi-hat samples (a free lofi kit, say) and Gig plays those instead.</p>
    <div id="drumSound"></div>
    <div id="drumBeat"></div>
    <p class="fine">Built-in kit: Sonic Pi samples (freesound.org, CC0).</p>`;
  const P=$('settingsPane');
  P.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{ applyTheme(b.dataset.pick); P.querySelectorAll('[data-pick]').forEach(x=>x.setAttribute('aria-pressed',x===b)); P.querySelector('.shaderow').hidden=b.dataset.pick!=='classic'; renderProfileChip(); });
  P.querySelectorAll('[data-shade]').forEach(b=>b.onclick=()=>{ applyTheme('classic',b.dataset.shade); P.querySelectorAll('[data-shade]').forEach(x=>x.setAttribute('aria-pressed',x===b)); });
  P.querySelectorAll('[data-bsound]').forEach(b=>b.onclick=()=>{ setBackSound(b.dataset.bsound); P.querySelectorAll('[data-bsound]').forEach(x=>x.setAttribute('aria-pressed',x===b)); $('bsHear').click(); });
  renderKeysSound(); renderBassSound(); renderDrumSound();
  if($('smpCredit')) $('smpCredit').hidden=smpOwnKeys();
  $('bsHear').onclick=()=>{ const bus=previewBus(); if(!bus) return; let pv=null, t=now()+.05;
    [[2,'min9'],[7,'dom13'],[0,'maj9']].forEach(([r,q],i)=>{ pv=spreadVoice(Q[q],r,pv); playChord(pv,t+i*.9,.85,backSound(),bus,backVel(62)); tone(36+mod12(r-36),t+i*.9,.85,80,'bass',bus); }); };
  $('profName').oninput=e=>{ themeSet('profileName',e.target.value.trim()); renderProfileChip(); P.querySelector('.avatar').textContent=(e.target.value.trim()||'J').charAt(0).toUpperCase(); };
  // paint the scene previews one after another, so the page stays responsive
  (async()=>{ for(const cv of P.querySelectorAll('canvas[data-scene]')){ await new Promise(r=>requestAnimationFrame(r)); if(cv.isConnected) await paintScene(cv,cv.dataset.scene,true); } })();
}
// Your keys: synth, or a real instrument (download once, offline after)
function renderKeysSound(msg){
  const el=$('keysSound'); if(!el) return; const cur=keysSoundPick(), have=smpHave();
  const opt=(id,name,sub)=>`<button class="keyopt" data-ks="${id}" aria-pressed="${cur===id}"><b>${name}</b><span class="fine">${sub}</span></button>`;
  el.innerHTML=`<div class="keyopts">${opt('synth','Built-in synth','Always works, offline')}${Object.entries(SMP_INFO).filter(([id,i])=>i.keys&&(smpLocal(id)||!smpOwnKeys())).map(([id,i])=>opt(id,i.name,smpLocal(id)?'Yours':have[id]?(SMP.ready[id]?'Downloaded · works offline':'Downloaded · loads when you play'):`Download once · ${i.size}`)).join('')}</div>
    <div class="erow" style="margin-top:6px"><button class="ghost" id="ksHear">▶ Hear your keys</button>${Object.keys(have).some(id=>SMP_INFO[id]&&SMP_INFO[id].keys&&!smpLocal(id))?'<button class="ghost" id="ksForget">Remove downloads</button>':''}<span class="fine" id="ksMsg">${msg||''}</span></div>`;
  el.querySelectorAll('[data-ks]').forEach(b=>b.onclick=async()=>{ const id=b.dataset.ks, pick=renderKeysSound.pick=(renderKeysSound.pick||0)+1; synth.init(); killBus(PREVIEW);   // the newest click wins
    if(id==='synth'||have[id]){ store.set('keysSound',id); if(id!=='synth') await smpLoad(id); if(pick!==renderKeysSound.pick) return; renderKeysSound(); $('ksHear').click(); return; }
    if(!navigator.onLine) return renderKeysSound('No Wi-Fi right now: the download needs it once. The synth keeps playing until then.');
    b.disabled=true; const m=$('ksMsg');
    try{ await smpDownload(id,(d,n)=>{ m.textContent=`Downloading ${SMP_INFO[id].name}… ${d} of ${n}`; }); if(pick!==renderKeysSound.pick) return; store.set('keysSound',id); renderKeysSound(`${SMP_INFO[id].long} downloaded. It works offline from now on.`); $('ksHear').click(); }
    catch(e){ renderKeysSound(`Couldn't finish the download (${e.message}). The synth keeps playing; try again when you're online.`); } });
  $('ksHear').onclick=()=>{ const bus=previewBus(); if(!bus) return; const t=now()+.05;
    [[60,64,67,71],[62,65,69,72],[59,62,67,69]].forEach((ch,i)=>playChord(ch,t+i*.6,.55,'epiano',bus,70)); [79,77,76,74,72].forEach((m,i)=>tone(m,t+1.85+i*.15,i===4?.45:.15,80,'epiano',bus)); };
  if($('ksForget')) $('ksForget').onclick=async()=>{ if(!confirm('Remove the downloaded instruments? The synth plays until you download them again.')) return; for(const id of Object.keys(smpHave()).filter(id=>SMP_INFO[id]&&SMP_INFO[id].keys&&!smpLocal(id))) await smpForget(id); renderKeysSound('Removed. The built-in synth is playing.'); };
}
// Bass: the built-in synth, or your own (js/local-sounds.js); shown only when you have one
function renderBassSound(msg){
  const el=$('bassSound'); if(!el) return; const mine=Object.entries(SMP_INFO).filter(([id,i])=>i.bass&&smpLocal(id)); if(!mine.length){ el.innerHTML=''; return; }
  const cur=bassSoundPick(), opt=(id,name,sub)=>`<button class="keyopt" data-bs="${id}" aria-pressed="${cur===id}"><b>${name}</b><span class="fine">${sub}</span></button>`;
  el.innerHTML=`<p style="margin-top:14px">Bass: the bass under the backings in Gig, Lines, Reharm, Ears and Comp Hero.</p>
    <div class="keyopts">${opt('synth','Built-in synth','Round and soft')}${mine.map(([id,i])=>opt(id,i.name,'Yours')).join('')}</div>
    <div class="erow" style="margin-top:6px"><button class="ghost" id="bassHear">▶ Hear the bass</button><span class="fine">${msg||''}</span></div>`;
  el.querySelectorAll('[data-bs]').forEach(b=>b.onclick=async()=>{ synth.init(); store.set('bassSound',b.dataset.bs); if(b.dataset.bs!=='synth') await smpLoad(b.dataset.bs); renderBassSound(); $('bassHear').click(); });
  $('bassHear').onclick=()=>{ const bus=previewBus(); if(!bus) return; const t=now()+.05, spb=.42;   // a bar and a bit of walking bass
    [36,40,43,45,38,41,45,47].forEach((m,i)=>tone(m,t+i*spb,spb*.9,90,'bass',bus)); };
}
// The Hear buttons in Sound share one bus: pressing one stops whatever the last one was playing, and nothing runs past 3 seconds
let PREVIEW=null;
function previewBus(ms=3000){ synth.init(); killBus(PREVIEW); clearTimeout(previewBus.t); const b=PREVIEW=newBus(); if(!b) return null;
  previewBus.t=setTimeout(()=>{ if(PREVIEW===b){ killBus(b); PREVIEW=null; } },ms); return b; }
// Drums: the built-in kit, or your own samples for any of the three sounds (kept in this browser, offline)
async function renderDrumSound(msg){
  const el=$('drumSound'); if(!el) return; const mine={}; for(const v of DRUM_VOICES) mine[v]=!!(await smpDB.get('custom/'+v));
  const name={kick:'Kick',snare:'Snare',hat:'Hi-hat'};
  el.innerHTML=`<div class="keyopts">${DRUM_VOICES.map(v=>`<div class="keyopt"><b>${name[v]}</b><span class="fine">${mine[v]?'Your sample':'Built in'}</span>
      <div class="erow" style="margin-top:6px"><label class="ghost trsm" style="cursor:pointer">Load your own<input type="file" accept="audio/*" data-dload="${v}" hidden></label>${mine[v]?`<button class="ghost trsm" data-dclear="${v}">Use built-in</button>`:''}</div></div>`).join('')}</div>
    ${typeof LOCAL_KITS!=='undefined'?`<div class="erow" style="margin-top:8px;align-items:center"><span class="fine" style="margin:0">Your kits</span><select id="drumKit" class="drumkitsel"><option value="">Choose a kit…</option>${Object.keys(LOCAL_KITS).map(k=>`<option${store.get('drumKit','')===k?' selected':''}>${trEsc(k)}</option>`).join('')}</select></div>`:''}
    <div class="erow" style="margin-top:6px"><button class="ghost" id="drumHear">▶ Hear the beat</button><span class="fine" id="drumMsg">${msg||''}</span></div>`;
  el.querySelectorAll('[data-dload]').forEach(inp=>inp.onchange=async()=>{ const f=inp.files[0]; if(!f) return; synth.init(); const ab=await f.arrayBuffer();
    try{ await synth.ctx.decodeAudioData(ab.slice(0)); }catch(e){ return renderDrumSound("Couldn't read that file. Try a WAV, MP3, AIFF or M4A."); }
    await smpDB.put('custom/'+inp.dataset.dload,ab); store.set('drumKit',''); await drumsReload(); renderDrumSound(`${name[inp.dataset.dload]}: ${trEsc(f.name)} loaded. It works offline from now on.`); $('drumHear').click(); });
  if($('drumKit')) $('drumKit').onchange=async e=>{ const k=e.target.value; if(!k) return; synth.init(); await localKitUse(k); renderDrumSound(`${trEsc(k)} kit: kick, snare and hi-hat.`); $('drumHear').click(); };
  el.querySelectorAll('[data-dclear]').forEach(b=>b.onclick=async()=>{ await smpDB.del('custom/'+b.dataset.dclear); store.set('drumKit',''); await drumsReload(); renderDrumSound('Back to the built-in sound.'); });
  $('drumHear').onclick=()=>drumHearBeat();
  renderDrumBeat();
}
// Two bars of the beat at 92 bpm with a little bass and keys, the step being played lit in the grid
async function drumHearBeat(){ synth.init(); await drumsInit(); const spb=60/92, bus=previewBus(Math.ceil((8*spb+1)*1000)); if(!bus) return; const t=now()+.08;
  beatBar(t,spb,4,{bar:0},bus,{hat:true}); beatBar(t+4*spb,spb,4,{bar:1},bus,{hat:true}); drumHit('kick',t+8*spb,1,bus);
  [[2,'min7',0,4],[7,'dom7',4,4]].forEach(([r,q,at,d])=>{ tone(36+r,t+at*spb,d*spb*.9,84,'bass',bus); playChord(spreadVoice(Q[q],r,null),t+at*spb,d*spb*.9,backSound(),bus,backVel(56)); });
  const me=drumHearBeat.n=(drumHearBeat.n||0)+1, t0=performance.now()+(t-now())*1000;
  const tick=()=>{ const g=$('drumGrid'); if(!g||me!==drumHearBeat.n) return; const st=Math.floor((performance.now()-t0)/1000/spb*4);
    g.querySelectorAll('.dstep.dnow').forEach(c=>c.classList.remove('dnow')); if(st>=32||PREVIEW!==bus) return;
    if(st>=0) g.querySelectorAll(`.dstep[data-i="${st}"]`).forEach(c=>c.classList.add('dnow')); requestAnimationFrame(tick); };
  requestAnimationFrame(tick); }
/* The beat: the patterns to pick from, and a grid to edit. Click a step: off → full → soft → off. Editing any pattern
   makes it yours (kept as "Yours", one at a time); the patterns themselves never change. */
function renderDrumBeat(){
  const el=$('drumBeat'); if(!el) return; const id=store.get('drumPat','laid'), c=store.get('drumCustom',null), p=drumPat(), cur=id==='custom'&&c&&c.k?'custom':(DRUM_PATS[id]?id:'laid');
  const pats=[...Object.entries(DRUM_PATS),...(c&&c.k?[['custom',{name:'Yours'}]]:[])];
  const name={kick:'Kick',snare:'Snare',hat:'Hi-hat'};
  el.innerHTML=`<p style="margin-top:14px">The beat: pick a pattern, or click the grid to make your own. It plays in Gig and Comp Hero, with whatever kit is loaded.</p>
    <div class="seg dpats" role="group">${pats.map(([k,v])=>`<button data-dpat="${k}" aria-pressed="${k===cur}">${v.name}</button>`).join('')}</div>
    <div class="dgrid" id="drumGrid">${DRUM_ROWS.map(([v,r])=>`<span class="dname">${name[v]}</span><div class="drow">${[...p[r]].map((ch,i)=>`<button class="dstep${i%4===0?' dbeat':''}${i===16?' bar2':''}" data-r="${r}" data-v="${v}" data-i="${i}" data-c="${ch==='x'?2:ch==='o'?1:0}" aria-label="${name[v]}, bar ${i<16?1:2}, step ${i%16+1}"></button>`).join('')}</div>`).join('')}</div>
    <div class="erow" style="margin-top:6px;align-items:center"><span class="fine" style="margin:0">Swing</span><div class="seg" role="group">${[[0,'Straight'],[0.3,'Light'],[0.6,'Heavy']].map(([v,l])=>`<button data-dsw="${v}" aria-pressed="${Math.abs((p.sw||0)-v)<0.16}">${l}</button>`).join('')}</div>
      <span class="fine" style="margin:0">Full step: click once. Soft: twice.</span></div>`;
  // editing: copy what's showing into Yours first
  const mine=()=>{ const q=drumPat(); return {name:'Yours',sw:q.sw||0,lazy:q.lazy||0,k:q.k,s:q.s,h:q.h}; };
  const save=(m,hear)=>{ store.set('drumCustom',m); store.set('drumPat','custom'); renderDrumBeat(); if(hear) drumHearBeat(); };
  el.querySelectorAll('[data-dpat]').forEach(b=>b.onclick=()=>{ store.set('drumPat',b.dataset.dpat); renderDrumBeat(); drumHearBeat(); });
  el.querySelectorAll('[data-dsw]').forEach(b=>b.onclick=()=>{ const m=mine(); m.sw=+b.dataset.dsw; save(m,true); });
  el.querySelectorAll('.dstep').forEach(b=>b.onclick=()=>{ const m=mine(), r=b.dataset.r, i=+b.dataset.i, n=(+b.dataset.c+2)%3;   // 0 → 2 → 1 → 0
    m[r]=m[r].slice(0,i)+'.ox'[n]+m[r].slice(i+1); save(m,false);
    if(n){ synth.init(); drumsInit().then(()=>{ const bus=previewBus(1500); if(bus) drumHit(b.dataset.v,now()+.02,n===2?1:.55,bus); }); } });
}
// the chip on the home card that opens Profile & settings
function renderProfileChip(){ const c=$('profileChip'); if(!c) return; const name=themeGet('profileName','');
  c.innerHTML=`<span class="avatar" aria-hidden="true">${(name||'J').charAt(0).toUpperCase()}</span><span class="pcname">${name?name.replace(/</g,'&lt;'):'Profile'}</span><span class="pcgear" aria-hidden="true">⚙</span>`;
  c.title='Profile & settings: your name and the look of the app'; }

applyTheme(themeGet('theme','classic'));
