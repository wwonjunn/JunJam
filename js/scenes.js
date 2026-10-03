/* ---------------- scenes: each theme's background art, painted in code ----------------
   A scene is drawn once onto a canvas behind the app (and again only when the window size changes), so it costs
   nothing while you play. The same painters draw the small previews on the Profile & settings page.
   Every scene uses a fixed random seed, so it looks the same each time. No images are loaded. */
const SCENES={};
function sceneRng(a){ return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function scBlot(g,x,y,rad,rgb,a){ const gr=g.createRadialGradient(x,y,0,x,y,rad); gr.addColorStop(0,`rgba(${rgb},${a})`); gr.addColorStop(.55,`rgba(${rgb},${a*.45})`); gr.addColorStop(1,`rgba(${rgb},0)`);
  g.fillStyle=gr; g.beginPath(); g.arc(x,y,rad,0,7); g.fill(); }
// a ridge line across the width (hills, mountains)
function scRidge(r,W,base,amp,oct=6){ const ph=[...Array(oct)].map(()=>r()*7), out=[]; for(let x=-10;x<=W+10;x+=6){ let y=base; for(let k=0;k<oct;k++) y+=Math.sin(x/W*Math.PI*(1.2+k*k*.9)+ph[k])*amp/(k*.9+1); out.push([x,y]); } return out; }

/* =============================== GOLDEN HOUR (layered hills at sunset) =============================== */
function scPine(g,x,y,h,col,lit){ g.fillStyle=col; g.fillRect(x-h*.025,y-h*.18,h*.05,h*.2); for(let k=0;k<5;k++){ const ty=y-h*.15-k*h*.17, tw=h*(.34-k*.055); g.beginPath(); g.moveTo(x-tw,ty); g.lineTo(x,ty-h*.3); g.lineTo(x+tw,ty); g.closePath(); g.fill();
  if(lit){ g.fillStyle=lit; g.beginPath(); g.moveTo(x,ty-h*.3); g.lineTo(x+tw,ty); g.lineTo(x+tw*.45,ty); g.closePath(); g.fill(); g.fillStyle=col; } } }
SCENES.golden=async(g,W,H,mini)=>{
  const r=sceneRng(77), S=Math.min(W,H), sx=W*.84, sy=H*.3;
  const sky=g.createLinearGradient(0,0,0,H*.62); [[0,'#2f2466'],[.25,'#6b3f9e'],[.5,'#c25d9a'],[.72,'#f1907a'],[.9,'#ffc58f'],[1,'#ffe2b2']].forEach(([o,c])=>sky.addColorStop(o,c)); g.fillStyle=sky; g.fillRect(0,0,W,H);
  g.save(); g.globalCompositeOperation='lighter'; scBlot(g,sx,sy,S*.6,'255,170,90',.35); scBlot(g,sx,sy,S*.16,'255,235,190',.7); scBlot(g,sx,sy,S*.05,'255,255,240',1); g.restore();
  // streaky clouds lit from below
  for(let i=0;i<(mini?10:34);i++){ const x=r()*W, y=H*(.04+r()*.34), w=S*(.2+r()*.5), h=S*(.008+r()*.025);
    g.save(); g.translate(x,y); g.rotate(-.06+r()*.05); g.scale(1,h/w); const cg=g.createRadialGradient(0,0,0,0,0,w); const warm=y/H;
    cg.addColorStop(0,`rgba(${warm>.25?'255,170,150':'230,120,190'},${.35+r()*.3})`); cg.addColorStop(1,'rgba(255,150,170,0)'); g.fillStyle=cg; g.beginPath(); g.arc(0,0,w,0,7); g.fill(); g.restore(); }
  // ridges from far to near, mist between them, pines on the nearer ones
  const layers=[['#8a7fc2','#6f6aa8',.44,.05],['#7183b5','#5b6e9e',.5,.06],['#5f8a8e','#46707a',.57,.07],['#4f8a5c','#356b47',.65,.08],['#5a9a3f','#3c7a33',.75,.09],['#7bb043','#4d8f34',.87,.07]];
  layers.forEach(([top,bot,base,amp],li)=>{ const ridge=scRidge(r,W,H*base,S*amp,6); g.beginPath(); g.moveTo(-10,H+10); ridge.forEach(([x,y])=>g.lineTo(x,y)); g.lineTo(W+10,H+10); g.closePath();
    const lg=g.createLinearGradient(0,H*base-S*amp,0,H); lg.addColorStop(0,top); lg.addColorStop(1,bot); g.fillStyle=lg; g.fill();
    if(li>=2){ g.save(); g.clip(); const lit=g.createLinearGradient(sx,0,0,0); lit.addColorStop(0,'rgba(255,210,120,.28)'); lit.addColorStop(1,'rgba(255,210,120,0)'); g.fillStyle=lit; g.fillRect(0,0,W,H); g.restore(); }
    if(li>=2){ const n=mini?6+li*2:12+li*16, th=S*(.03+li*.022); for(let k=0;k<n;k++){ const i=Math.floor(r()*ridge.length), [px,py]=ridge[i]; scPine(g,px,py+th*.2+r()*th*.3,th*(.7+r()*.6),li>3?'#173b22':'#24503a',li>3?'rgba(160,200,90,.35)':null); } }
    if(li<layers.length-1){ const my=H*(base+.05), mg=g.createLinearGradient(0,my-S*.08,0,my+S*.05); mg.addColorStop(0,'rgba(255,240,235,0)'); mg.addColorStop(.6,'rgba(255,236,230,.32)'); mg.addColorStop(1,'rgba(255,240,235,0)'); g.fillStyle=mg; g.fillRect(0,my-S*.08,W,S*.13); }
  });
  // grass strokes in the foreground and one big pine on the right
  g.strokeStyle='rgba(200,230,120,.35)'; g.lineWidth=1; for(let i=0;i<(mini?40:420);i++){ const x=r()*W, y=H*(.9+r()*.1); g.beginPath(); g.moveTo(x,y); g.lineTo(x+(r()-.5)*4,y-S*(.01+r()*.02)); g.stroke(); }
  scPine(g,W*.86,H*1.02,S*.62,'#13301c','rgba(150,190,80,.4)');
};

/* =============================== PIXEL AUTUMN (pixel art: a stone tower in an autumn wood) =============================== */
SCENES.pixel=async(g,W,H,mini)=>{
  const PX=mini?2:4, pw=Math.ceil(W/PX), ph=Math.ceil(H/PX), c=document.createElement('canvas'); c.width=pw; c.height=ph; const p=c.getContext('2d'), r=sceneRng(1031);
  const px=(x,y,w,h,col)=>{ p.fillStyle=col; p.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h)); };
  // sky in bands with a dithered seam between each
  const bands=['#ffd89a','#ffc884','#ffb672','#ffa463','#ff9457'], bh=ph*.62/bands.length;
  bands.forEach((col,i)=>{ px(0,i*bh,pw,bh+1,col); if(i) for(let x=0;x<pw;x+=2) px(x+((i&1)),i*bh-1,1,1,bands[i-1]); });
  // sun rays and clouds
  for(let i=0;i<6;i++){ p.fillStyle='rgba(255,240,200,.18)'; p.beginPath(); p.moveTo(pw*.05+i*pw*.12,0); p.lineTo(pw*.12+i*pw*.12,0); p.lineTo(pw*.35+i*pw*.12,ph*.6); p.lineTo(pw*.28+i*pw*.12,ph*.6); p.fill(); }
  for(let i=0;i<(mini?4:9);i++){ const cx=r()*pw, cy=ph*(.05+r()*.3), w=pw*(.06+r()*.1); for(let k=0;k<6;k++){ const bx=cx+(r()-.5)*w, by=cy+(r()-.5)*w*.25, rr=w*(.2+r()*.25);
    for(let y=-rr;y<rr;y++){ const half=Math.sqrt(rr*rr-y*y)*1.6; px(bx-half,by+y,half*2,1,y<-rr*.3?'#fff4d8':'#ffe6b8'); } } }
  // two mountain ranges, lit on the left face
  [[ph*.62,ph*.3,'#f0a774','#e08d5e'],[ph*.66,ph*.22,'#d9784e','#c4623e']].forEach(([base,amp,lit,sh],k)=>{ const peaks=[...Array(4+k)].map(()=>[r()*pw,base-amp*(.5+r()*.5)]);
    for(let x=0;x<pw;x++){ let top=base; peaks.forEach(([pxk,py])=>{ top=Math.min(top,py+Math.abs(x-pxk)*(.9+k*.3)); }); const pk=peaks.reduce((a,b)=>Math.abs(b[0]-x)<Math.abs(a[0]-x)?b:a); px(x,top,1,ph-top,x<pk[0]?lit:sh); } });
  // the wood: round canopies in reds and oranges, shaded below
  const leaves=['#a8231f','#c8322a','#e2552f','#f08a3b','#f7b84a'];
  for(let i=0;i<(mini?50:220);i++){ const cx=r()*pw, cy=ph*(.62+r()*.2), rr=2+r()*(mini?4:9), col=leaves[Math.floor(r()*leaves.length)];
    for(let y=-rr;y<=rr;y++){ const half=Math.sqrt(rr*rr-y*y); px(cx-half,cy+y,half*2+1,1,col); if(y>rr*.4) px(cx-half,cy+y,half*2+1,1,'rgba(90,20,15,.35)'); }
    if(r()<.5) px(cx-rr*.4,cy-rr*.5,2,1,'#ffd27a'); }
  // pines
  const pine=(x,y,h)=>{ for(let k=0;k<h;k++){ const w=Math.max(1,Math.round((k/h)*h*.42)); px(x-w,y-h+k,w*2+1,1,(k%4<2)?'#3f6b3a':'#2f5a33'); px(x+w-1,y-h+k,1,1,'#5f8f4a'); } px(x,y,2,Math.max(2,h*.15),'#4a3020'); };
  pine(pw*.9,ph*.86,mini?18:46); pine(pw*.78,ph*.84,mini?12:30); pine(pw*.05,ph*.9,mini?14:34); pine(pw*.97,ph*.95,mini?20:56);
  // ground with grass noise, stones and mushrooms
  px(0,ph*.82,pw,ph*.18,'#f0b54a'); for(let i=0;i<pw*ph*.03;i++) px(r()*pw,ph*(.82+r()*.18),1,1,['#e09a3a','#ffd37a','#d98a2e'][Math.floor(r()*3)]);
  for(let i=0;i<4;i++){ const sx=pw*(.16+i*.06), sy=ph*(.9+i*.015); px(sx,sy,8*PX/4,3,'#9a8d9c'); px(sx+1,sy,6*PX/4,1,'#b7aab8'); }
  for(let i=0;i<5;i++){ const mx=pw*(.3+r()*.6), my=ph*(.86+r()*.1); px(mx,my,2,3,'#f3e7d3'); px(mx-2,my-2,6,2,'#d0302a'); px(mx-1,my-2,1,1,'#fff'); px(mx+2,my-2,1,1,'#fff'); }
  // the tower: stone courses, a shingled cone roof, windows, a door, vines
  const tx=Math.round(pw*.16), tw=Math.round(mini?14:30), tt=Math.round(ph*.3), tb=Math.round(ph*.86);
  for(let y=tt;y<tb;y++) for(let x=tx;x<tx+tw;x++){ const row=Math.floor((y-tt)/3), off=(row%2)*3, mortar=(y-tt)%3===0||((x-tx+off)%6===0);
    px(x,y,1,1,mortar?'#5e5266':(x-tx<tw*.3?'#a597a8':x-tx>tw*.75?'#7a6c80':'#8f8193')); }
  const rh=Math.round(tw*1.1); for(let y=0;y<rh;y++){ const half=Math.round((y/rh)*(tw*.7)); for(let x=-half;x<=half;x++) px(tx+tw/2+x,tt-rh+y,1,1,((x+y)%4===0)?'#3d2626':(y%3===0?'#4a2f2f':'#5c3a3a')); }
  [[.3,.25],[.62,.5],[.3,.7]].forEach(([fx,fy])=>{ const wx=tx+Math.round(tw*fx), wy=Math.round(tt+(tb-tt)*fy); px(wx-1,wy-1,7,9,'#4a2e1e'); px(wx,wy,5,7,'#8fb9d6'); px(wx+2,wy,1,7,'#4a2e1e'); px(wx,wy+3,5,1,'#4a2e1e'); });
  px(tx+tw*.35,tb-12,tw*.32,12,'#6b4a2e'); for(let y=tb-12;y<tb;y+=2) px(tx+tw*.35,y,tw*.32,1,'#5a3c24'); px(tx+tw*.6,tb-6,1,1,'#ffd27a');
  for(let v=0;v<(mini?3:7);v++){ let x=tx+r()*tw, y=tb-2; for(let s=0;s<(mini?14:40);s++){ px(x,y,1,1,s%5===0?'#f08a3b':'#d94f22'); x+=Math.round(r()*2-1); y-=1; if(x<tx) x=tx; if(x>tx+tw-1) x=tx+tw-1; } }
  g.imageSmoothingEnabled=false; g.drawImage(c,0,0,pw*PX,ph*PX);   // each art pixel becomes a PX-sized block
};

/* ---------- painting a scene onto its canvas ---------- */
async function paintScene(cv,id,mini){
  const fn=SCENES[id]; if(!fn) return;
  const dpr=Math.min(mini?2:1.5,devicePixelRatio||1), W=cv.clientWidth||innerWidth, H=cv.clientHeight||innerHeight;
  cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); const g=cv.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
  await fn(g,W,H,mini);
}
