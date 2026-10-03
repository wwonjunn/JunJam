/* ---------------- scenes: each theme's background art, painted in code ----------------
   A scene is drawn once onto a canvas behind the app (and again only when the window size changes), so it costs
   nothing while you play. The same painters draw the small previews on the Profile & settings page.
   Every scene uses a fixed random seed, so it looks the same each time. No images are loaded. */
const SCENES={};
function sceneRng(a){ return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const scLerp=(a,b,t)=>a+(b-a)*t;
function scNoiseTile(r,size,alpha,rgb){ const c=document.createElement('canvas'); c.width=c.height=size; const g=c.getContext('2d'), d=g.createImageData(size,size);
  for(let i=0;i<d.data.length;i+=4){ const v=r(); d.data[i]=rgb[0]; d.data[i+1]=rgb[1]; d.data[i+2]=rgb[2]; d.data[i+3]=Math.floor(v*v*v*alpha*255); }
  g.putImageData(d,0,0); return c; }
function scGrain(g,W,H,r,alpha,rgb){ g.save(); g.fillStyle=g.createPattern(scNoiseTile(r,256,alpha,rgb),'repeat'); g.fillRect(0,0,W,H); g.restore(); }
function scBlot(g,x,y,rad,rgb,a){ const gr=g.createRadialGradient(x,y,0,x,y,rad); gr.addColorStop(0,`rgba(${rgb},${a})`); gr.addColorStop(.55,`rgba(${rgb},${a*.45})`); gr.addColorStop(1,`rgba(${rgb},0)`);
  g.fillStyle=gr; g.beginPath(); g.arc(x,y,rad,0,7); g.fill(); }
// an organic closed shape: a circle whose radius wobbles at several frequencies (coastlines, clouds, torn paper)
function scBlob(r,cx,cy,rx,ry,n=90,rough=.32){ const ph=[...Array(9)].map(()=>r()*7), amp=[...Array(9)].map((_,k)=>rough*(r()*.8+.2)/(k+1.3)), pts=[];
  for(let i=0;i<n;i++){ const a=i/n*Math.PI*2; let k=1; for(let j=0;j<9;j++) k+=amp[j]*Math.sin(a*(j+2)+ph[j]); k+=(r()-.5)*rough*.18; pts.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k]); }
  return pts; }
function scPath(g,pts){ g.beginPath(); pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y)); g.closePath(); }
// a ridge line across the width (hills, mountains)
function scRidge(r,W,base,amp,oct=6){ const ph=[...Array(oct)].map(()=>r()*7), out=[]; for(let x=-10;x<=W+10;x+=6){ let y=base; for(let k=0;k<oct;k++) y+=Math.sin(x/W*Math.PI*(1.2+k*k*.9)+ph[k])*amp/(k*.9+1); out.push([x,y]); } return out; }
async function scFonts(list){ try{ await Promise.race([Promise.all(list.map(f=>document.fonts.load(f))),new Promise(r=>setTimeout(r,1500))]); }catch(e){} }

/* =============================== TREASURE MAP =============================== */
function scCompass(g,x,y,R,ink,paper,full,W,H){
  g.save(); g.translate(x,y);
  if(full){ g.strokeStyle='rgba(70,40,12,.22)'; g.lineWidth=.8; for(let i=0;i<32;i++){ const a=i/32*Math.PI*2; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a)*(W+H)*1.2,Math.sin(a)*(W+H)*1.2); g.stroke(); } }
  // rings with ticks
  g.strokeStyle=ink; g.lineWidth=R*.03; g.beginPath(); g.arc(0,0,R,0,7); g.stroke(); g.lineWidth=R*.012; g.beginPath(); g.arc(0,0,R*.92,0,7); g.stroke(); g.beginPath(); g.arc(0,0,R*.56,0,7); g.stroke();
  for(let i=0;i<120;i++){ const a=i/120*Math.PI*2, l=i%10===0?.1:i%5===0?.06:.035; g.beginPath(); g.moveTo(Math.cos(a)*R*.92,Math.sin(a)*R*.92); g.lineTo(Math.cos(a)*R*(.92-l),Math.sin(a)*R*(.92-l)); g.stroke(); }
  // 32 points: short behind long; each point a dark half and a light half
  const pt=(a,len,w)=>{ const c=Math.cos(a), s=Math.sin(a), px=-s*w, py=c*w;
    g.fillStyle=ink; g.beginPath(); g.moveTo(0,0); g.lineTo(c*len,s*len); g.lineTo(px,py); g.closePath(); g.fill();
    g.fillStyle=paper; g.beginPath(); g.moveTo(0,0); g.lineTo(c*len,s*len); g.lineTo(-px,-py); g.closePath(); g.fill(); g.strokeStyle=ink; g.lineWidth=R*.008; g.stroke(); };
  for(let i=0;i<16;i++) pt(i/16*Math.PI*2+Math.PI/16,R*.42,R*.05);
  for(let i=0;i<8;i++) pt(i/8*Math.PI*2+Math.PI/8,R*.66,R*.08);
  for(let i=0;i<4;i++) pt(i/4*Math.PI*2-Math.PI/2,R*1.08,R*.13);
  g.fillStyle=ink; g.beginPath(); g.arc(0,0,R*.07,0,7); g.fill(); g.fillStyle=paper; g.beginPath(); g.arc(0,0,R*.035,0,7); g.fill();
  g.fillStyle=ink; g.font=`italic ${R*.26}px 'IM Fell English',serif`; g.textAlign='center'; g.fillText('N',0,-R*1.14);
  g.restore();
}
function scShip(g,x,y,s,ink,paper,r){
  g.save(); g.translate(x,y); g.scale(s,s); g.lineJoin='round';
  // waves under the hull
  g.strokeStyle=ink; g.lineWidth=1.1; for(let k=0;k<5;k++){ const wx=-70+k*30+r()*8; g.beginPath(); g.moveTo(wx,30+r()*4); g.quadraticCurveTo(wx+8,24,wx+16,30); g.stroke(); }
  // hull
  g.fillStyle=ink; g.beginPath(); g.moveTo(-58,4); g.quadraticCurveTo(-50,28,0,28); g.quadraticCurveTo(46,28,62,-2); g.lineTo(40,6); g.lineTo(-40,8); g.closePath(); g.fill();
  g.strokeStyle=paper; g.lineWidth=1; for(let i=0;i<4;i++){ g.beginPath(); g.moveTo(-44+i*4,12+i*3.5); g.quadraticCurveTo(0,18+i*3,44-i*6,8+i*3); g.stroke(); }
  // masts and sails, each sail hatched
  [[-24,-70],[6,-92],[34,-62]].forEach(([mx,top],m)=>{ g.strokeStyle=ink; g.lineWidth=2; g.beginPath(); g.moveTo(mx,6); g.lineTo(mx,top); g.stroke();
    for(let k=0;k<3;k++){ const y0=top+8+k*((6-top-14)/3), y1=y0+(6-top-14)/3-4, w=18-k*1+(m===1?4:0);
      g.beginPath(); g.moveTo(mx-w,y0); g.quadraticCurveTo(mx,y0-4,mx+w,y0); g.quadraticCurveTo(mx+w+5,(y0+y1)/2,mx+w,y1); g.quadraticCurveTo(mx,y1+4,mx-w,y1); g.quadraticCurveTo(mx-w+5,(y0+y1)/2,mx-w,y0); g.closePath();
      g.fillStyle=paper; g.fill(); g.strokeStyle=ink; g.lineWidth=1.2; g.stroke();
      g.save(); g.clip(); g.lineWidth=.6; for(let h=-w;h<w;h+=3.2){ g.beginPath(); g.moveTo(mx+h,y0); g.lineTo(mx+h+3,y1); g.stroke(); } g.restore(); }
    g.fillStyle=ink; g.beginPath(); g.moveTo(mx,top); g.lineTo(mx+12,top+4); g.lineTo(mx,top+8); g.fill(); });
  g.lineWidth=1; g.beginPath(); g.moveTo(62,-2); g.lineTo(-24,-70); g.moveTo(62,-2); g.lineTo(6,-92); g.stroke();
  g.restore();
}
SCENES.treasure=async(g,W,H,mini)=>{
  await scFonts(["italic 30px 'IM Fell English'","30px 'IM Fell English SC'"]);
  const r=sceneRng(1729), ink='#2b1a0b', paper='#ead6a6', S=Math.min(W,H);
  // aged paper: warm gradient, mottled stains, grain
  const bg=g.createRadialGradient(W*.55,H*.45,S*.1,W*.5,H*.5,Math.hypot(W,H)*.7); bg.addColorStop(0,'#f0dcab'); bg.addColorStop(.55,'#ddc08a'); bg.addColorStop(1,'#a77d45');
  g.fillStyle=bg; g.fillRect(0,0,W,H);
  for(let i=0;i<(mini?14:46);i++) scBlot(g,r()*W,r()*H,S*(.05+r()*.22),r()<.5?'120,78,30':'90,55,20',.05+r()*.11);
  for(let i=0;i<(mini?4:14);i++) scBlot(g,r()*W,r()*H,S*(.01+r()*.03),'60,35,12',.25+r()*.3);            // small dark spots
  // lat/long grid
  g.strokeStyle='rgba(70,40,12,.12)'; g.lineWidth=.7; for(let x=W*.08;x<W;x+=W/9){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,H); g.stroke(); } for(let y=H*.1;y<H;y+=H/7){ g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke(); }
  // rhumb lines from two hidden roses, then the big rose
  [[W*.62,H*.42],[W*.9,H*.8]].forEach(([x,y])=>{ g.strokeStyle='rgba(70,40,12,.16)'; g.lineWidth=.6; for(let i=0;i<32;i++){ const a=i/32*Math.PI*2; g.beginPath(); g.moveTo(x,y); g.lineTo(x+Math.cos(a)*(W+H),y+Math.sin(a)*(W+H)); g.stroke(); } });
  // land: a few coasts, shaded outward with soft ink, filled, inked, hatched inside, with mountains
  const lands=[[W*.2,H*.28,S*.36,S*.26],[W*.86,H*.18,S*.2,S*.3],[W*.48,H*.86,S*.26,S*.16],[W*.08,H*.78,S*.14,S*.1],[W*.66,H*.6,S*.06,S*.045]];
  lands.forEach(([cx,cy,rx,ry],k)=>{ const pts=scBlob(r,cx,cy,rx,ry,mini?70:160,.42);
    g.save(); scPath(g,pts); for(const [lw,a] of [[S*.07,.05],[S*.045,.07],[S*.025,.1],[S*.012,.14]]){ g.strokeStyle=`rgba(50,28,8,${a})`; g.lineWidth=lw; g.stroke(); }
    for(let w=1;w<=3;w++){ g.strokeStyle=`rgba(50,28,8,${.22-w*.05})`; g.lineWidth=.8; g.save(); g.translate(cx,cy); g.scale(1+w*.035,1+w*.045); g.translate(-cx,-cy); scPath(g,pts); g.stroke(); g.restore(); }  // the engraved water lines
    scPath(g,pts); const lg=g.createRadialGradient(cx,cy,0,cx,cy,Math.max(rx,ry)*1.2); lg.addColorStop(0,'#e9d39e'); lg.addColorStop(1,'#cfae6c'); g.fillStyle=lg; g.fill();
    g.clip(); for(let i=0;i<(mini?4:18);i++) scBlot(g,cx+(r()-.5)*rx*2,cy+(r()-.5)*ry*2,Math.max(rx,ry)*(.1+r()*.25),r()<.5?'150,120,60':'110,90,40',.08+r()*.1); g.strokeStyle='rgba(50,28,8,.5)'; g.lineWidth=S*.03; scPath(g,pts); g.stroke();     // inner shading along the coast
    g.lineWidth=.6; g.strokeStyle='rgba(50,28,8,.3)'; for(let i=0;i<(mini?40:160);i++){ const hx=cx+(r()-.5)*rx*2, hy=cy+(r()-.5)*ry*2; g.beginPath(); g.moveTo(hx,hy); g.lineTo(hx+5,hy-5); g.stroke(); }
    for(let i=0;i<(mini?4:Math.round(rx/S*60));i++){ const mx=cx+(r()-.5)*rx*1.1, my=cy+(r()-.5)*ry*1.1, ms=S*(.012+r()*.018);  // mountains, shaded on one side
      g.fillStyle='rgba(60,35,12,.55)'; g.beginPath(); g.moveTo(mx-ms,my); g.lineTo(mx,my-ms*1.5); g.lineTo(mx+ms*.2,my); g.fill();
      g.strokeStyle=ink; g.lineWidth=1; g.beginPath(); g.moveTo(mx-ms,my); g.lineTo(mx,my-ms*1.5); g.lineTo(mx+ms,my); g.stroke(); }
    g.restore();
    scPath(g,pts); g.strokeStyle=ink; g.lineWidth=S*.004+1.2; g.stroke(); });
  // ships and sea swirls
  if(!mini){ scShip(g,W*.6,H*.36,S/780,ink,paper,r); scShip(g,W*.36,H*.6,S/1000,ink,paper,r); scShip(g,W*.82,H*.8,S/700,ink,paper,r); }
  else scShip(g,W*.62,H*.42,S/260,ink,paper,r);
  g.strokeStyle='rgba(43,26,11,.5)'; g.lineWidth=1; for(let i=0;i<(mini?8:40);i++){ const x=r()*W, y=r()*H; g.beginPath(); g.moveTo(x,y); g.bezierCurveTo(x+6,y-6,x+12,y+6,x+18,y); g.stroke(); }
  // the rose, and labels (musical place names)
  scCompass(g,W*.17,H*.68,S*(mini?.2:.13),ink,paper,true,W,H);
  if(!mini){ g.fillStyle='rgba(43,26,11,.72)'; const lab=(t,x,y,sz,rot=0,sc=false)=>{ g.save(); g.translate(x,y); g.rotate(rot); g.font=`${sc?'':'italic '}${sz}px ${sc?"'IM Fell English SC'":"'IM Fell English'"},serif`; g.letterSpacing=sc?`${sz*.25}px`:'1px'; g.textAlign='center'; g.fillText(t,0,0); g.restore(); };
    lab('Terra Modalis',W*.2,H*.27,S*.04,-.08,true); lab('Mare Diatonicum',W*.55,H*.5,S*.034,.05); lab('Sinus Tritonus',W*.73,H*.7,S*.026,-.12); lab('Insula Septima',W*.66,H*.65,S*.018,.04);
    lab('Cape of Good Voicings',W*.86,H*.34,S*.022,.3); lab('Here be Dominants',W*.42,H*.12,S*.022,-.03);
    // a title ribbon
    const bx=W*.5, by=H*.075, bw=S*.36, bh=S*.05; g.save(); g.fillStyle='#ead6a6'; g.strokeStyle=ink; g.lineWidth=1.4;
    [[-1],[1]].forEach(([d])=>{ g.beginPath(); g.moveTo(bx+d*bw*.5,by-bh*.3); g.lineTo(bx+d*(bw*.5+bh*1.2),by-bh*.1); g.lineTo(bx+d*(bw*.5+bh*.8),by+bh*.35); g.lineTo(bx+d*(bw*.5+bh*1.2),by+bh*.8); g.lineTo(bx+d*bw*.5,by+bh*.6); g.closePath(); g.fill(); g.stroke(); });
    g.beginPath(); g.moveTo(bx-bw*.5,by-bh*.5); g.quadraticCurveTo(bx,by-bh*.85,bx+bw*.5,by-bh*.5); g.lineTo(bx+bw*.5,by+bh*.5); g.quadraticCurveTo(bx,by+bh*.15,bx-bw*.5,by+bh*.5); g.closePath(); g.fill(); g.stroke();
    g.fillStyle=ink; g.font=`${bh*.62}px 'IM Fell English SC',serif`; g.letterSpacing=`${bh*.12}px`; g.textAlign='center'; g.fillText('Carta Harmonica',bx,by+bh*.12); g.restore();
    // coffee rings
    [[W*.78,H*.58,S*.07],[W*.3,H*.88,S*.05]].forEach(([x,y,rr])=>{ g.strokeStyle='rgba(95,55,18,.22)'; g.lineWidth=S*.006; g.beginPath(); g.arc(x,y,rr,.3,5.6); g.stroke(); g.lineWidth=S*.002; g.beginPath(); g.arc(x+2,y+1,rr*.94,.9,6); g.stroke(); }); }
  // folds: shadow, crease, highlight
  const fold=(x0,y0,x1,y1)=>{ g.strokeStyle='rgba(70,42,15,.14)'; g.lineWidth=S*.03; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke();
    g.strokeStyle='rgba(60,35,12,.35)'; g.lineWidth=1.3; g.stroke(); g.save(); g.translate(2,2); g.strokeStyle='rgba(255,240,205,.45)'; g.lineWidth=1.2; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); g.restore(); };
  fold(W/3,0,W/3+S*.01,H); fold(W*2/3,0,W*2/3-S*.008,H); fold(0,H/2,W,H/2+S*.01);
  [[W/3,H/2],[W*2/3,H/2]].forEach(([x,y])=>scBlot(g,x,y,S*.06,'250,235,200',.35));     // worn where the folds cross
  scGrain(g,W,H,r,.5,[70,42,15]);
  // burnt, ragged edges and a couple of burn holes
  // (the page minus a ragged oval: one path, so the even-odd fill darkens only the outside)
  // a degree scale around the border, like an old chart's frame
  if(!mini){ const m=S*.035; g.strokeStyle='rgba(43,26,11,.75)'; g.lineWidth=1.4; g.strokeRect(m,m,W-2*m,H-2*m); g.lineWidth=.8; g.strokeRect(m+7,m+7,W-2*m-14,H-2*m-14);
    g.fillStyle='rgba(43,26,11,.7)'; const seg=S*.04; for(let x=m;x<W-m;x+=seg*2){ g.fillRect(x,m,Math.min(seg,W-m-x),7); g.fillRect(x,H-m-7,Math.min(seg,W-m-x),7); }
    for(let y=m;y<H-m;y+=seg*2){ g.fillRect(m,y,7,Math.min(seg,H-m-y)); g.fillRect(W-m-7,y,7,Math.min(seg,H-m-y)); } }
  // burnt edges: ragged char right at the border, fading inward (the page minus a ragged rectangle, filled even-odd)
  for(const [inset,blur,a] of [[S*.06,mini?6:26,.55],[S*.018,mini?2:7,.9]]){ g.save(); const e=[], n=mini?60:260, jag=()=>(r()-.5)*S*.035+(r()<.06?S*.03*r():0);
    for(let i=0;i<n;i++) e.push([inset+jag()+(W-2*inset)*i/n,inset+jag()]); for(let i=0;i<n;i++) e.push([W-inset+jag(),inset+jag()+(H-2*inset)*i/n]);
    for(let i=0;i<n;i++) e.push([W-inset-(W-2*inset)*i/n+jag(),H-inset+jag()]); for(let i=0;i<n;i++) e.push([inset+jag(),H-inset-(H-2*inset)*i/n+jag()]);
    g.beginPath(); g.rect(-40,-40,W+80,H+80); e.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y)); g.closePath(); g.filter=`blur(${blur}px)`; g.fillStyle=`rgba(30,14,2,${a})`; g.fill('evenodd'); g.restore(); }
  if(!mini) [[W*.95,H*.55,S*.03],[W*.04,H*.12,S*.022]].forEach(([x,y,rad])=>{ scBlot(g,x,y,rad*2.2,'40,20,5',.5); const p=scBlob(r,x,y,rad,rad*.8,40,.4); scPath(g,p); g.fillStyle='rgba(20,10,2,.9)'; g.fill(); g.strokeStyle='rgba(150,70,20,.6)'; g.lineWidth=2; g.stroke(); });
  const vg=g.createRadialGradient(W/2,H/2,S*.35,W/2,H/2,Math.hypot(W,H)*.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(40,20,5,.45)'); g.fillStyle=vg; g.fillRect(0,0,W,H);
};

/* =============================== MANUSCRIPT (a collage of old sheet music) =============================== */
function scTorn(r,x,y,w,h,j){ // a rectangle whose edges are torn (jagged), clockwise
  const pts=[], side=(x0,y0,x1,y1,n,amp)=>{ for(let i=0;i<n;i++){ const t=i/n; pts.push([scLerp(x0,x1,t)+(r()-.5)*amp*(y0===y1?0:1),scLerp(y0,y1,t)+(r()-.5)*amp*(x0===x1?0:1)]); } };
  const tear=()=>r()<.5?j:j*.15; side(x,y,x+w,y,24,tear()); side(x+w,y,x+w,y+h,24,tear()); side(x+w,y+h,x,y+h,24,tear()); side(x,y+h,x,y,24,tear()); return pts; }
function scPage(g,r,x,y,w,h,rot,kind,mini){
  g.save(); g.translate(x+w/2,y+h/2); g.rotate(rot); g.translate(-w/2,-h/2);
  const pts=scTorn(r,0,0,w,h,Math.min(w,h)*.035);
  g.save(); g.shadowColor='rgba(40,22,6,.45)'; g.shadowBlur=mini?4:14; g.shadowOffsetX=3; g.shadowOffsetY=4; scPath(g,pts);
  const tone=['#f1e5c8','#ead9b3','#f3e9d2','#e6d1a6','#efdfbd'][Math.floor(r()*5)], pg=g.createLinearGradient(0,0,w,h); pg.addColorStop(0,tone); pg.addColorStop(1,'#d9bf8c'); g.fillStyle=pg; g.fill(); g.restore();
  g.save(); scPath(g,pts); g.clip();
  for(let i=0;i<4;i++) scBlot(g,r()*w,r()*h,Math.min(w,h)*(.1+r()*.35),'140,95,40',.06+r()*.1);
  const ink='rgba(40,26,12,.82)', ink2='rgba(40,26,12,.55)';
  if(kind==='score'){
    const s=Math.max(2.2,h/64), m=w*.07; let yy=h*.12;
    if(r()<.6){ g.fillStyle=ink; g.font=`italic ${s*3.4}px 'IM Fell English',serif`; g.textAlign='center'; g.fillText(['Nocturne','Étude No. 7','Andante','Valse lente','Romance','Prélude'][Math.floor(r()*6)],w/2,yy); yy+=s*4; }
    while(yy+s*5<h*.95){
      g.strokeStyle=ink2; g.lineWidth=Math.max(.6,s*.14); for(let k=0;k<5;k++){ g.beginPath(); g.moveTo(m,yy+k*s); g.lineTo(w-m,yy+k*s); g.stroke(); }
      g.fillStyle=ink; g.font=`${s*5.2}px 'Noto Music',serif`; g.textAlign='left'; g.fillText(r()<.75?'𝄞':'𝄢',m+s*.2,yy+s*3.9);
      let nx=m+s*5, prev=null;
      while(nx<w-m-s*2){ if(r()<.12){ g.lineWidth=s*.16; g.beginPath(); g.moveTo(nx,yy); g.lineTo(nx,yy+s*4); g.stroke(); nx+=s*1.6; prev=null; continue; }
        const step=Math.floor(r()*11)-3, ny=yy+s*4-step*s/2, open=r()<.15;
        g.save(); g.translate(nx,ny); g.rotate(-.35); g.beginPath(); g.ellipse(0,0,s*.62,s*.43,0,0,7); open?(g.lineWidth=s*.16,g.stroke()):g.fill(); g.restore();
        const up=ny>yy+s*2, sx=nx+(up?s*.55:-s*.55), sy=up?ny-s*3.2:ny+s*3.2; g.lineWidth=s*.13; g.beginPath(); g.moveTo(sx,ny); g.lineTo(sx,sy); g.stroke();
        if(prev&&prev.up===up&&r()<.6){ g.lineWidth=s*.42; g.beginPath(); g.moveTo(prev.sx,prev.sy); g.lineTo(sx,sy); g.stroke(); prev=null; } else prev={sx,sy,up};
        nx+=s*(1.5+r()*1.8); }
      yy+=s*(8+r()*3); }
  } else if(kind==='text'){
    const cols=w>h?3:2, cw=(w*.86)/cols, lh=Math.max(2.5,h/70);
    g.fillStyle=ink; g.font=`${lh*2.6}px 'IM Fell English SC',serif`; g.textAlign='center'; g.fillText(['The Musical Times','Le Ménestrel','Gazette Musicale'][Math.floor(r()*3)],w/2,h*.09);
    const words='the of concert a and in to was by his for with that sonata orchestra evening performance pianist hall applause programme symphony audience movement first last theme new minor major opus played noted critics tempo'.split(' ');
    g.textAlign='left'; g.font=`${lh*1.15}px 'IM Fell English',serif`; for(let c=0;c<cols;c++) for(let yy=h*.16;yy<h*.94;yy+=lh*1.55){ if(r()<.06){ yy+=lh; continue; }
      let line='', x0=w*.07+c*cw; while(g.measureText(line).width<cw*.86) line+=words[Math.floor(r()*words.length)]+' '; g.fillStyle=`rgba(40,26,12,${.55+r()*.25})`; g.fillText(line.trim(),x0,yy,cw*.9); }
  } else if(kind==='photo'){
    const ox=w/2, oy=h*.42, orx=w*.36, ory=h*.32;
    g.save(); g.beginPath(); g.ellipse(ox,oy,orx,ory,0,0,7); g.clip(); const ph=g.createRadialGradient(ox,oy-ory*.3,orx*.1,ox,oy,orx*1.1); ph.addColorStop(0,'#cdb58c'); ph.addColorStop(1,'#5e4a2e'); g.fillStyle=ph; g.fillRect(0,0,w,h);
    // a grand piano with its lid up, softly out of focus like an old photograph
    g.save(); g.filter=`blur(${mini?.6:Math.max(1,w/140)}px)`; const u=orx/50; g.fillStyle='rgba(38,26,12,.85)'; g.translate(ox-orx*.55,oy+ory*.2);
    g.beginPath(); g.moveTo(0,0); g.lineTo(62*u,0); g.bezierCurveTo(92*u,-2*u,96*u,-18*u,80*u,-24*u); g.bezierCurveTo(66*u,-28*u,52*u,-14*u,30*u,-16*u); g.lineTo(0,-16*u); g.closePath(); g.fill();   // the case
    g.beginPath(); g.moveTo(4*u,-16*u); g.lineTo(70*u,-52*u); g.lineTo(74*u,-48*u); g.lineTo(36*u,-16*u); g.closePath(); g.fill();   // the raised lid
    g.lineWidth=1.2*u; g.strokeStyle='rgba(38,26,12,.85)'; g.beginPath(); g.moveTo(40*u,-16*u); g.lineTo(58*u,-44*u); g.stroke();  // the prop
    [[6,0],[56,0],[80,-4]].forEach(([lx,ly])=>g.fillRect(lx*u,ly*u,3.5*u,20*u));                                         // legs
    g.fillStyle='rgba(235,220,190,.45)'; g.fillRect(2*u,-4*u,24*u,2.5*u);                                                   // the keys catching light
    g.fillStyle='rgba(38,26,12,.8)'; g.fillRect(-14*u,4*u,14*u,4*u); g.fillRect(-13*u,8*u,2*u,10*u); g.fillRect(-4*u,8*u,2*u,10*u);  // the bench
    g.restore();
    const v=g.createRadialGradient(ox,oy,orx*.4,ox,oy,orx*1.05); v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(30,20,8,.7)'); g.fillStyle=v; g.fillRect(0,0,w,h); g.restore();
    g.strokeStyle='rgba(90,65,30,.7)'; g.lineWidth=Math.max(1,w/120); g.beginPath(); g.ellipse(ox,oy,orx,ory,0,0,7); g.stroke(); g.beginPath(); g.ellipse(ox,oy,orx*1.05,ory*1.05,0,0,7); g.stroke();
    g.fillStyle=ink2; g.font=`italic ${Math.max(6,h/22)}px 'IM Fell English',serif`; g.textAlign='center'; g.fillText(['Salle Pleyel, 1889','The music room, 1902','Steinway Hall, 1911'][Math.floor(r()*3)],w/2,h*.88);
  }
  if(r()<.6){ const fx=w*(.3+r()*.4), fx2=fx+(r()-.5)*20; g.strokeStyle='rgba(80,50,20,.12)'; g.lineWidth=Math.min(w,h)*.03; g.beginPath(); g.moveTo(fx,0); g.lineTo(fx2,h); g.stroke();   // a crease: shadow, line, highlight
    g.strokeStyle='rgba(80,50,20,.3)'; g.lineWidth=1; g.stroke(); g.strokeStyle='rgba(255,245,220,.4)'; g.beginPath(); g.moveTo(fx+1.5,0); g.lineTo(fx2+1.5,h); g.stroke(); }
  if(r()<.35){ const tx=w*(.2+r()*.6), ty=h*(.2+r()*.6), tr=Math.min(w,h)*(.08+r()*.08); g.strokeStyle='rgba(120,75,25,.28)'; g.lineWidth=Math.max(1.5,tr*.08); g.beginPath(); g.arc(tx,ty,tr,r()*2,r()*2+5.4); g.stroke(); scBlot(g,tx,ty,tr,'150,100,40',.07); }
  for(const [lw,a] of [[Math.min(w,h)*.16,.1],[Math.min(w,h)*.07,.14],[Math.min(w,h)*.025,.22]]){ g.strokeStyle=`rgba(120,78,28,${a})`; g.lineWidth=lw; scPath(g,pts); g.stroke(); }   // yellowed, darker edges
  g.restore();
  // a folded corner
  if(r()<.45){ const c=Math.min(w,h)*.12; g.fillStyle='rgba(60,38,14,.25)'; g.beginPath(); g.moveTo(w,h-c); g.lineTo(w-c,h); g.lineTo(w,h); g.closePath(); g.fill();
    g.fillStyle='#e9dab6'; g.beginPath(); g.moveTo(w,h-c); g.lineTo(w-c,h); g.lineTo(w-c*.85,h-c*.85); g.closePath(); g.fill(); g.strokeStyle='rgba(60,38,14,.3)'; g.stroke(); }
  // tape
  if(r()<.55){ const tw=Math.min(w,h)*.32, tx=r()<.5?-tw*.2:w-tw*.8; g.save(); g.translate(tx+tw/2,-4); g.rotate((r()-.5)*.7); g.fillStyle='rgba(236,226,196,.62)'; g.shadowColor='rgba(40,22,6,.25)'; g.shadowBlur=4;
    g.fillRect(-tw/2,-9,tw,18); g.restore(); }
  g.restore();
}
SCENES.manuscript=async(g,W,H,mini)=>{
  await scFonts(["italic 30px 'IM Fell English'","30px 'IM Fell English SC'","30px 'Noto Music'"]);
  const r=sceneRng(1888), S=Math.min(W,H);
  const bg=g.createLinearGradient(0,0,W,H); bg.addColorStop(0,'#9b7a4c'); bg.addColorStop(1,'#6e5232'); g.fillStyle=bg; g.fillRect(0,0,W,H);
  scGrain(g,W,H,r,.4,[40,25,10]);
  // pages laid over each other, rows staggered so the table shows only in slivers
  const kinds=['score','score','score','text','score','photo','score','text','score'], n=mini?8:19, rows=mini?2:3, cols=Math.ceil(n/rows);
  const slots=[...Array(n).keys()].sort(()=>r()-.5);      // pages in a loose grid, drawn in a shuffled order so they overlap every which way
  slots.forEach(i=>{ const row=i%rows, col=Math.floor(i/rows), cw=W/cols, ch=H/rows, big=r()<.75;
    const w=cw*(big?1.25+r()*.45:.6+r()*.3), h=ch*(big?1.25+r()*.5:.55+r()*.35), x=col*cw-cw*.18+(r()-.5)*cw*.5, y=row*ch-ch*.18+(r()-.5)*ch*.5;
    scPage(g,r,x,y,w,h,(r()-.5)*(big?.16:.4),kinds[Math.floor(r()*kinds.length)],mini); });
  scGrain(g,W,H,r,.35,[60,38,14]);
  const vg=g.createRadialGradient(W/2,H/2,S*.3,W/2,H/2,Math.hypot(W,H)*.6); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(45,25,8,.5)'); g.fillStyle=vg; g.fillRect(0,0,W,H);
};

/* =============================== PRISM (glass shards around a ring) =============================== */
SCENES.prism=async(g,W,H,mini)=>{
  const r=sceneRng(42), S=Math.min(W,H), cx=W*.62, cy=H*.42;
  const bg=g.createRadialGradient(cx,cy,0,cx,cy,Math.hypot(W,H)*.7); bg.addColorStop(0,'#1a0c2a'); bg.addColorStop(.5,'#09060f'); bg.addColorStop(1,'#030205'); g.fillStyle=bg; g.fillRect(0,0,W,H);
  const pal=[['#ff3df2','#5b0a6b'],['#8b3dff','#22104f'],['#2de2ff','#0a3b5a'],['#1fd6a8','#0a3d33'],['#ff8a2b','#5a2200'],['#ff4f8b','#4f0a25'],['#3d7bff','#0b1a55'],['#ffd166','#5a3d00']];
  const shard=(blur)=>{ const a=r()*Math.PI*2, d=S*(.08+Math.pow(r(),.7)*.65)*(blur?1.25:1), x=cx+Math.cos(a)*d*1.25, y=cy+Math.sin(a)*d, L=S*(.04+r()*.16)*(blur?1.3:1), Wd=L*(.18+r()*.3), rot=a+(r()-.5)*.9, c=pal[Math.floor(r()*pal.length)];
    g.save(); g.translate(x,y); g.rotate(rot); if(blur) g.filter=`blur(${mini?1.5:2+r()*5}px)`; g.globalAlpha=blur?.35+r()*.3:.6+r()*.35;
    const p=[[-L*.5,0],[-L*.2,-Wd*.5],[L*.35,-Wd*.42],[L*.5,-Wd*.05],[L*.28,Wd*.5],[-L*.3,Wd*.38]];
    const gr=g.createLinearGradient(0,-Wd/2,0,Wd/2); gr.addColorStop(0,c[0]); gr.addColorStop(.45,c[0]+'cc'); gr.addColorStop(1,c[1]);
    scPath(g,p); g.fillStyle=gr; g.fill();
    g.globalCompositeOperation='lighter'; g.strokeStyle='rgba(255,255,255,.45)'; g.lineWidth=1; g.beginPath(); g.moveTo(p[1][0],p[1][1]); g.lineTo(p[2][0],p[2][1]); g.lineTo(p[3][0],p[3][1]); g.stroke();
    const hl=g.createLinearGradient(-L/2,0,L/2,0); hl.addColorStop(0,'rgba(255,255,255,0)'); hl.addColorStop(.6,'rgba(255,255,255,.25)'); hl.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=hl; scPath(g,[[-L*.2,-Wd*.5],[L*.35,-Wd*.42],[L*.3,-Wd*.1],[-L*.25,-Wd*.15]]); g.fill();
    g.restore(); };
  for(let i=0;i<(mini?40:110);i++) shard(true);
  // the glass ring
  g.save(); g.translate(cx,cy); g.rotate(-.5); g.scale(1,.86);
  for(const [lw,col] of [[S*.05,'rgba(255,255,255,.06)'],[S*.028,'rgba(160,200,255,.12)'],[S*.008,'rgba(255,255,255,.55)']]){ g.strokeStyle=col; g.lineWidth=lw; g.beginPath(); g.arc(0,0,S*.17,0,7); g.stroke(); }
  g.globalCompositeOperation='lighter'; const rg=g.createLinearGradient(-S*.17,0,S*.17,0); rg.addColorStop(0,'rgba(255,80,200,.5)'); rg.addColorStop(.5,'rgba(80,220,255,.2)'); rg.addColorStop(1,'rgba(255,170,60,.5)');
  g.strokeStyle=rg; g.lineWidth=S*.014; g.beginPath(); g.arc(0,0,S*.17,0,7); g.stroke(); g.restore();
  g.save(); g.globalCompositeOperation='lighter'; scBlot(g,cx,cy,S*.22,'255,120,60',.25); scBlot(g,cx+S*.04,cy-S*.02,S*.1,'255,255,255',.18); g.restore();
  for(let i=0;i<(mini?45:150);i++) shard(false);
  g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<(mini?20:80);i++){ const x=r()*W, y=r()*H; scBlot(g,x,y,1+r()*3,'255,255,255',.7); } g.restore();
};

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

/* =============================== SKYWARD (an anime sky: vortex, sunbeams, a sea of clouds) =============================== */
SCENES.skyward=async(g,W,H,mini)=>{
  const r=sceneRng(5), S=Math.min(W,H), vx=W*.42, vy=H*.34, sx=W*.86, sy=H*.82;
  const sky=g.createLinearGradient(0,0,0,H); [[0,'#060a24'],[.18,'#121c55'],[.4,'#2f4fae'],[.6,'#7c6cc4'],[.78,'#e39ab4'],[1,'#ffd8b4']].forEach(([o,c])=>sky.addColorStop(o,c)); g.fillStyle=sky; g.fillRect(0,0,W,H);
  // city lights along an upside-down horizon, and stars
  g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<(mini?60:520);i++){ const t=r(), x=t*W, y=H*(.02+.1*Math.sin(t*Math.PI))+r()*H*.07; g.fillStyle=`rgba(255,${200+r()*55|0},${130+r()*80|0},${.4+r()*.6})`; g.fillRect(x,y,1+r()*1.6,1+r()*1.6); }
  for(let i=0;i<(mini?20:160);i++){ g.fillStyle=`rgba(255,255,255,${r()*.8})`; g.fillRect(r()*W,r()*H*.45,1,1); } g.restore();
  // the vortex: soft cloud tufts streaked along a tightening spiral, bright and pale near the eye,
  // ragged dark cloud fragments with lit rims further out
  const spiral=(t)=>{ const a=t*Math.PI*5.2, rr=S*(.03+.9*Math.pow(t,1.35)); return [vx+Math.cos(a)*rr*1.25,vy+Math.sin(a)*rr*.8,a]; };
  g.save(); g.lineCap='round';
  for(let i=0;i<(mini?140:900);i++){ const t=Math.pow(r(),.85), [x,y,a]=spiral(t), size=S*(.008+t*.05)*(.5+r());
    const tan=a+Math.PI/2+.25, len=size*(2+r()*3), inner=t<.3;
    const col=inner?`rgba(${200+r()*55|0},${235+r()*20|0},255,${.12+r()*.22})`:`rgba(${110+r()*90|0},${140+r()*80|0},${230+r()*25|0},${.08+r()*.16})`;
    g.strokeStyle=col; g.lineWidth=size; g.beginPath(); g.moveTo(x-Math.cos(tan)*len,y-Math.sin(tan)*len*.65); g.quadraticCurveTo(x,y,x+Math.cos(tan)*len,y+Math.sin(tan)*len*.65); g.stroke(); }
  for(let i=0;i<(mini?8:46);i++){ const t=.45+r()*.55, [x,y,a]=spiral(t), rx=S*(.03+r()*.07), ry=rx*(.25+r()*.25), pts=scBlob(r,0,0,rx,ry,mini?24:60,.6);
    g.save(); g.translate(x,y); g.rotate(a+Math.PI/2+.3); scPath(g,pts); g.fillStyle=`rgba(${18+r()*20|0},${20+r()*25|0},${60+r()*40|0},${.55+r()*.35})`; g.fill();
    g.strokeStyle=`rgba(${170+r()*60|0},${190+r()*50|0},255,${.25+r()*.3})`; g.lineWidth=1.2; g.stroke(); g.restore(); }
  g.globalCompositeOperation='lighter'; scBlot(g,vx,vy,S*.22,'110,200,255',.4); scBlot(g,vx,vy,S*.07,'235,250,255',.85); g.restore();
  // a sea of clouds: flattened cumulus banks, far and violet to near and sunlit, haze between the banks
  for(let band=0;band<(mini?3:5);band++){ const by=H*(.7+band*.065), n=mini?10:46, sc=1+band*.35;
    for(let i=0;i<n;i++){ const x=r()*W*1.1-W*.05, y=by+(r()-.5)*S*.04, rad=S*(.035+r()*.05)*sc, near=Math.max(0,1-Math.hypot(x-sx,y-sy)/(S*1.2));
      g.save(); g.translate(x,y); g.scale(1.6,.62); const cg=g.createRadialGradient(-rad*.2,-rad*.55,rad*.1,0,0,rad);
      cg.addColorStop(0,`rgba(255,${226+near*29|0},${205+near*40|0},.96)`); cg.addColorStop(.55,`rgba(${222+near*30|0},${168+near*40|0},${206-near*20|0},.9)`); cg.addColorStop(1,`rgba(${150+band*15},${110+band*10},${190},0)`);
      g.fillStyle=cg; g.beginPath(); g.arc(0,0,rad,0,7); g.fill(); g.restore(); }
    const hz=g.createLinearGradient(0,by-S*.05,0,by+S*.04); hz.addColorStop(0,'rgba(255,214,220,0)'); hz.addColorStop(.6,'rgba(255,214,220,.22)'); hz.addColorStop(1,'rgba(255,214,220,0)'); g.fillStyle=hz; g.fillRect(0,by-S*.05,W,S*.09); }
  // the sun: rays and lens ghosts
  g.save(); g.globalCompositeOperation='lighter'; g.translate(sx,sy);
  for(let i=0;i<(mini?6:14);i++){ const a=r()*Math.PI*2, L=S*(.2+r()*.7), w=S*(.002+r()*.006); const rg=g.createLinearGradient(0,0,Math.cos(a)*L,Math.sin(a)*L); rg.addColorStop(0,'rgba(255,245,220,.32)'); rg.addColorStop(1,'rgba(255,245,220,0)');
    g.fillStyle=rg; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a+.012)*L,Math.sin(a+.012)*L); g.lineTo(Math.cos(a-.012)*L,Math.sin(a-.012)*L); g.closePath(); g.fill(); }
  scBlot(g,0,0,S*.3,'255,200,160',.4); scBlot(g,0,0,S*.08,'255,255,245',1); g.restore();
  g.save(); g.globalCompositeOperation='lighter'; for(let k=1;k<=5;k++){ const t=k/6, x=scLerp(sx,vx,t), y=scLerp(sy,vy,t); scBlot(g,x,y,S*(.015+k*.01),k%2?'160,220,255':'255,180,220',.18); } g.restore();
};

/* =============================== CLOUDSEA (golden clouds, a serpent dragon) =============================== */
// a smooth curve through points (Catmull-Rom), sampled n times: [x, y, angle]
function scSpline(P,n){ const out=[]; for(let i=0;i<n;i++){ const u=i/(n-1)*(P.length-1), k=Math.min(P.length-2,Math.floor(u)), t=u-k, p0=P[Math.max(0,k-1)], p1=P[k], p2=P[k+1], p3=P[Math.min(P.length-1,k+2)];
  const f=(a,b,c,d)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t); out.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])]); }
  return out.map((p,i)=>{ const q=out[Math.min(out.length-1,i+1)], o=out[Math.max(0,i-1)]; return [p[0],p[1],Math.atan2(q[1]-o[1],q[0]-o[0])]; }); }
// a cumulus cloud: overlapping puffs merged into one soft shape, then lit as a whole (cream on top, bronze below),
// so it reads as a cloud mass rather than a pile of balls
function scCumulus(g,r,x,y,w,warm){ const n=7+Math.floor(r()*7), h=w*.55, c=document.createElement('canvas'); c.width=Math.ceil(w*1.4); c.height=Math.ceil(h*1.6);
  const q=c.getContext('2d'), ox=c.width/2, oy=c.height*.62; q.filter=`blur(${Math.max(1,w*.012)}px)`; q.fillStyle='#fff';
  const puffs=[]; for(let k=0;k<n;k++){ const t=k/(n-1), px=ox+(t-.5)*w, rad=w*(.1+Math.sin(t*Math.PI)*.17)*(.7+r()*.6), py=oy-Math.sin(t*Math.PI)*h*.35+(r()-.5)*h*.12; puffs.push([px,py,rad]); q.beginPath(); q.arc(px,py,rad,0,7); q.fill(); }
  q.fillRect(ox-w*.48,oy-h*.05,w*.96,h*.18);                               // a flatter base
  q.filter='none'; q.globalCompositeOperation='source-in'; const lg=q.createLinearGradient(0,oy-h*.75,0,oy+h*.25);
  lg.addColorStop(0,warm?'#fff1c6':'#ffe2a6'); lg.addColorStop(.42,warm?'#f7bf62':'#e99c45'); lg.addColorStop(.78,warm?'#c4661f':'#a24d14'); lg.addColorStop(1,warm?'#7a3410':'#561f06'); q.fillStyle=lg; q.fillRect(0,0,c.width,c.height);
  q.globalCompositeOperation='source-atop'; puffs.forEach(([px,py,rad])=>{ const hg=q.createRadialGradient(px-rad*.2,py-rad*.7,0,px,py-rad*.4,rad*1.1); hg.addColorStop(0,'rgba(255,252,236,.45)'); hg.addColorStop(1,'rgba(255,252,236,0)'); q.fillStyle=hg; q.fillRect(0,0,c.width,c.height); });
  g.drawImage(c,x-ox,y-oy); }
SCENES.cloudsea=async(g,W,H,mini)=>{
  const r=sceneRng(888), S=Math.min(W,H);
  const bg=g.createRadialGradient(W*.28,H*.18,S*.05,W*.45,H*.45,Math.hypot(W,H)*.78); [[0,'#fff3c4'],[.18,'#fcc969'],[.45,'#e8902f'],[.75,'#a5500f'],[1,'#4f2205']].forEach(([o,c])=>bg.addColorStop(o,c)); g.fillStyle=bg; g.fillRect(0,0,W,H);
  // far clouds, softened
  g.save(); g.filter=`blur(${mini?2:8}px)`; g.globalAlpha=.75; for(let i=0;i<(mini?8:24);i++) scCumulus(g,r,r()*W*1.2-W*.1,H*(.2+r()*.75),S*(.3+r()*.5),r()<.6); g.restore();
  g.save(); g.globalCompositeOperation='lighter'; scBlot(g,W*.18,H*.06,S*.55,'255,220,140',.55); scBlot(g,W*.18,H*.06,S*.16,'255,250,225',.9); g.restore();
  // soft light from the upper left
  g.save(); g.globalCompositeOperation='lighter'; for(let i=0;i<(mini?4:9);i++){ const a=.45+r()*.55, L=Math.hypot(W,H), w=.02+r()*.035; const rg=g.createLinearGradient(0,0,Math.cos(a)*L,Math.sin(a)*L); rg.addColorStop(0,'rgba(255,240,205,.2)'); rg.addColorStop(.6,'rgba(255,240,205,.05)'); rg.addColorStop(1,'rgba(255,240,205,0)');
    g.fillStyle=rg; g.beginPath(); g.moveTo(-W*.04,-H*.04); g.lineTo(Math.cos(a+w)*L,Math.sin(a+w)*L); g.lineTo(Math.cos(a-w)*L,Math.sin(a-w)*L); g.closePath(); g.fill(); } g.restore();
  // middle clouds
  for(let i=0;i<(mini?6:20);i++) scCumulus(g,r,r()*W*1.1-W*.05,H*(.35+r()*.6),S*(.25+r()*.4),r()<.5);
  // the dragon
  const path=scSpline([[-.06,1.02],[.12,.76],[.3,.72],[.36,.5],[.22,.32],[.3,.15],[.5,.16],[.58,.38],[.7,.52],[.84,.44],[.88,.28],[.78,.18],[.7,.2]].map(([x,y])=>[x*W,y*H]),mini?220:900);
  const N=path.length, th=i=>{ const t=i/(N-1); return S*(.004+.034*Math.pow(Math.sin(Math.min(1,t*1.08)*Math.PI*.92),.8))*(t>.93?1-(t-.93)*4:1); };
  g.lineCap='round';
  for(let i=1;i<N;i++){ const [x0,y0]=path[i-1], [x1,y1]=path[i], w=th(i)*2; g.strokeStyle='#2a1a08'; g.lineWidth=w+2.5; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); }
  for(let i=1;i<N;i++){ const [x0,y0]=path[i-1], [x1,y1,a]=path[i], w=th(i)*2; g.strokeStyle='#6b4a1f'; g.lineWidth=w; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke();
    const nx=Math.cos(a-Math.PI/2)*w*.22, ny=Math.sin(a-Math.PI/2)*w*.22; g.strokeStyle='rgba(222,184,104,.75)'; g.lineWidth=w*.38; g.beginPath(); g.moveTo(x0+nx,y0+ny); g.lineTo(x1+nx,y1+ny); g.stroke(); }   // the lit back
  for(let i=8;i<N-30;i+=mini?4:5){ const [x,y,a]=path[i], w=th(i);                                         // overlapping scales, lit on the back
    for(const off of [-.3,.15]){ const sx=x+Math.cos(a-Math.PI/2)*w*off, sy=y+Math.sin(a-Math.PI/2)*w*off; g.strokeStyle=off<0?'rgba(240,205,130,.5)':'rgba(30,18,6,.35)'; g.lineWidth=Math.max(.8,w*.07);
      g.beginPath(); g.arc(sx,sy,w*.36,a+Math.PI*.55,a+Math.PI*1.45); g.stroke(); }
    if(i%(mini?8:10)===0){ const p1=[x+Math.cos(a+Math.PI/2)*w*.55,y+Math.sin(a+Math.PI/2)*w*.55], p2=[x+Math.cos(a+Math.PI/2)*w*.95,y+Math.sin(a+Math.PI/2)*w*.95];   // belly plates, across the underside
      g.strokeStyle='rgba(245,225,170,.7)'; g.lineWidth=Math.max(1,w*.1); g.beginPath(); g.moveTo(...p1); g.lineTo(...p2); g.stroke(); } }
  for(let i=20;i<N-14;i+=mini?3:2){ const [x,y,a]=path[i], w=th(i), L=w*(1.4+r()*1.6), up=a-Math.PI/2;                // the mane, streaming back
    g.strokeStyle=`rgba(255,250,232,${.5+r()*.4})`; g.lineWidth=Math.max(.8,w*.1); g.beginPath(); g.moveTo(x+Math.cos(up)*w*.8,y+Math.sin(up)*w*.8);
    g.quadraticCurveTo(x+Math.cos(up)*L,y+Math.sin(up)*L,x+Math.cos(up-.9)*L*1.25,y+Math.sin(up-.9)*L*1.25); g.stroke(); }
  // the head, at the end of the path, facing along it
  const [hx,hy,ha]=path[N-1], hs=S*.1; g.save(); g.translate(hx,hy); g.rotate(ha);
  for(let k=0;k<(mini?14:40);k++){ const a=Math.PI*(.55+r()*.9), L=hs*(1.2+r()*1.6); g.strokeStyle=`rgba(255,250,232,${.45+r()*.45})`; g.lineWidth=Math.max(1,hs*.05); g.beginPath(); g.moveTo(-hs*.2,0); g.quadraticCurveTo(Math.cos(a)*L*.6,Math.sin(a)*L*.6-hs*.3,Math.cos(a)*L,Math.sin(a)*L); g.stroke(); }
  g.fillStyle='#6b4a1f'; g.strokeStyle='#2a1a08'; g.lineWidth=2;
  g.beginPath(); g.moveTo(-hs*.4,-hs*.45); g.quadraticCurveTo(hs*.6,-hs*.6,hs*1.35,-hs*.18); g.quadraticCurveTo(hs*1.5,0,hs*1.3,hs*.12); g.lineTo(hs*.5,hs*.18); g.quadraticCurveTo(hs*.9,hs*.42,hs*.3,hs*.5); g.quadraticCurveTo(-hs*.3,hs*.45,-hs*.45,hs*.1); g.closePath(); g.fill(); g.stroke();
  g.strokeStyle='rgba(222,184,104,.8)'; g.lineWidth=hs*.1; g.beginPath(); g.moveTo(-hs*.2,-hs*.35); g.quadraticCurveTo(hs*.6,-hs*.5,hs*1.25,-hs*.16); g.stroke();
  g.strokeStyle='#efe2b8'; g.lineWidth=hs*.12; [[-.25,-.5,-1.1,-1.2],[-.05,-.48,-.75,-1.35]].forEach(([x0,y0,x1,y1])=>{ g.beginPath(); g.moveTo(x0*hs,y0*hs); g.quadraticCurveTo((x0-.2)*hs,(y1+.2)*hs,x1*hs,y1*hs); g.stroke(); });   // horns
  g.fillStyle='#ffd25a'; g.beginPath(); g.ellipse(hs*.5,-hs*.22,hs*.13,hs*.08,-.2,0,7); g.fill(); g.fillStyle='#2a1a08'; g.beginPath(); g.ellipse(hs*.53,-hs*.22,hs*.04,hs*.065,0,0,7); g.fill();
  g.strokeStyle='rgba(60,38,12,.9)'; g.lineWidth=Math.max(1,hs*.04); [[-1,1.8],[1,2.4]].forEach(([d,len])=>{ g.beginPath(); g.moveTo(hs*1.2,hs*.08*d); g.bezierCurveTo(hs*2,hs*.6*d,hs*2.6,-hs*.5*d,hs*(1.2+len*1.4),hs*.5*d); g.stroke(); });   // whiskers
  g.restore();
  // near clouds drifting in front of the body, and birds
  for(let i=0;i<(mini?4:12);i++) scCumulus(g,r,r()*W,H*(.55+r()*.5),S*(.25+r()*.35),r()<.6);
  g.strokeStyle='rgba(70,40,12,.65)'; g.lineWidth=1.2; for(let i=0;i<(mini?3:9);i++){ const x=W*(.58+r()*.3), y=H*(.05+r()*.15), sz=S*(.006+r()*.008); g.beginPath(); g.moveTo(x-sz,y); g.quadraticCurveTo(x-sz*.4,y-sz*.7,x,y); g.quadraticCurveTo(x+sz*.4,y-sz*.7,x+sz,y); g.stroke(); }
  const vg=g.createRadialGradient(W/2,H/2,S*.45,W/2,H/2,Math.hypot(W,H)*.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(60,25,5,.4)'); g.fillStyle=vg; g.fillRect(0,0,W,H);
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
