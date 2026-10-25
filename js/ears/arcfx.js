/* Ears game: the lane, drawn on a canvas. The game logic lives in arcade.js; this only draws what happens.
   A scene that changes with how far you've got (meadow, dusk, night, lava), a portal the monster steps out of,
   a walk with a bob and a lean, and the feedback: a bolt from the key you played up to the monster, a freeze frame on
   impact, sparks, score pops, knock-back for a brute's armour, a fireball arc, and on a miss a wind-up, a charge
   and a hit that cracks the castle. Emoji for the characters, to keep it simple and silly. */
const arcFx={cv:null,ctx:null,raf:0,W:0,H:0,dpr:1,parts:[],shots:[],dying:[],shake:0,freeze:0,flash:0,flashCol:'',banner:null,theme:0,themeF:0,mon:null,disp:1,born:0,last:0,t:0,wallHit:0};
const ARC_FONT='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const ARC_THEMES=[
  {sky:['#a9d8ff','#e8f5ff'],far:'#a7d3a0',near:'#86c07a',ground:'#6fa85f',path:'#dcc797',deco:'cloud'},
  {sky:['#ff9e7a','#ffe0bf'],far:'#d39a7c',near:'#b9795f',ground:'#9a604a',path:'#e6c29a',deco:'cloud'},
  {sky:['#141a44','#3a3f80'],far:'#2c3570',near:'#222a5a',ground:'#1b2149',path:'#454b80',deco:'star'},
  {sky:['#2a0808','#86290f'],far:'#4a160e',near:'#35100a',ground:'#220a07',path:'#8e3a17',deco:'ember'},
];
const ARC_RM=matchMedia('(prefers-reduced-motion: reduce)'), arcReduce=()=>ARC_RM.matches;   // read once, checked every frame
function arcFxStart(cv){
  arcFxStop(); const F=arcFx; F.cv=cv; F.ctx=cv.getContext('2d'); F.parts=[]; F.shots=[]; F.dying=[]; F.mon=null; F.banner=null; F.shake=0; F.flash=0; F.wallHit=0;
  arcFxSize(); F.last=performance.now(); const loop=ts=>{ F.raf=requestAnimationFrame(loop); arcFxFrame(ts); }; F.raf=requestAnimationFrame(loop);
}
function arcFxStop(){ cancelAnimationFrame(arcFx.raf); arcFx.raf=0; }
function arcFxSize(){ const F=arcFx; if(!F.cv) return; const r=F.cv.getBoundingClientRect(); F.dpr=Math.min(2,devicePixelRatio||1);
  F.cw=r.width; F.W=Math.max(200,r.width); F.H=Math.max(120,r.height); F.cv.width=Math.round(F.W*F.dpr); F.cv.height=Math.round(F.H*F.dpr); }
// lane geometry: the wall on the left, the portal on the right, the path along the bottom
const arcGround=()=>arcFx.H-26, arcWallX=()=>62, arcPortalX=()=>arcFx.W-56;
const arcMonX=x=>arcWallX()+46+x*(arcPortalX()-arcWallX()-46);
const ARC_SEG=0.36;   // spacing of a serpent's body segments, in head sizes
// where the head is drawn: a long enemy steps out far enough that its whole tail is in view
const arcHeadX=(M,d)=>arcMonX(d)-((M&&M.left||1)-1)*(M&&M.size||40)*ARC_SEG*d;
function arcFxTheme(i){ const F=arcFx; i=Math.max(0,Math.min(ARC_THEMES.length-1,i)); if(i!==F.theme){ F.theme=i; F.themeF=0; } }
function arcFxBanner(text,col){ arcFx.banner={text,col:col||'#f5c542',t0:arcFx.t}; }
const arcPop=(x,y,text,col,size=18)=>arcFx.parts.push({kind:'text',x,y,vx:0,vy:-38,life:1.1,max:1.1,text,col,size});
function arcBurst(x,y,n,cols,speed=220,size=3,grav=0){ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, s=speed*(0.35+Math.random()*0.8);
  arcFx.parts.push({kind:'spark',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-(grav?80:0),life:0.35+Math.random()*0.45,max:0.8,col:cols[i%cols.length],size:size*(0.6+Math.random()*0.8),grav}); } }

/* ---------------- events from the game ---------------- */
// a key you played (midi) → where on the lane the bolt starts: straight above that key, at the bottom of the canvas
function arcKeyX(m){ const F=arcFx, el=keyEls[m]; if(!el||!F.cv) return F.W/2; const r=el.getBoundingClientRect(), c=F.cv.getBoundingClientRect(); return Math.max(8,Math.min(F.W-8,r.left+r.width/2-c.left)); }
function arcFxHit(o){ // o: {notes, kill, fire, brute, pts, quick}
  const F=arcFx; if(!F.mon&&ARC.mon){ F.mon=ARC.mon; F.disp=ARC.mon.x; F.born=F.t; }   // answered before the frame caught up
  const M=F.mon; if(!M) return;
  const tx=arcHeadX(M,F.disp), ty=arcGround()-(M.size||40)*0.6, from=o.notes&&o.notes.length?o.notes:[60];
  const land=()=>{ F.freeze=F.t+(o.kill?0.09:0.06); F.shake=Math.max(F.shake,o.fire?14:o.kill?6:4);
    const cols=o.fire?['#ff6b2b','#ffd23f','#ff3d00','#fff3b0']:['#ffffff','#f5c542','#7fd3ff','#b8f2e6'];
    arcBurst(tx,ty,o.fire?46:o.kill?26:14,cols,o.fire?320:240,o.fire?4.5:3);
    if(o.fire) F.parts.push({kind:'ring',x:tx,y:ty,life:0.5,max:0.5,col:'#ffb347'});
    arcPop(tx,ty-34,`+${o.pts}`,o.fire?'#ff7a2b':'#f5c542',o.fire?26:20);
    if(o.quick) arcPop(tx+30,ty-12,'Quick!','#7fd3ff',14);
    if(o.kill){ F.dying.push({face:M.face,x:tx,y:ty,size:M.size||40,t0:F.t,kind:'pop'}); F.mon=null;
      for(let i=0;i<5;i++) F.parts.push({kind:'chunk',x:tx,y:ty,vx:(Math.random()-.5)*260,vy:-120-Math.random()*160,life:0.9,max:0.9,face:M.face,size:12+Math.random()*8,rot:Math.random()*6,vr:(Math.random()-.5)*14,grav:520}); }
    else { M.kb=F.t; for(let i=0;i<6;i++) F.parts.push({kind:'spark',x:tx,y:ty-14,vx:(Math.random()-.5)*200,vy:-80-Math.random()*120,life:0.7,max:0.7,col:'#c9d3e6',size:4,grav:500,sq:1}); }   // armour flies off
    F.flash=o.fire?0.35:0.12; F.flashCol=o.fire?'255,140,40':'255,255,255'; };
  if(o.fire){ F.shots.push({kind:'fire',x0:arcWallX()+10,y0:arcGround()-60,x1:tx,y1:ty,t0:F.t,dur:0.42,land}); return; }
  from.slice(0,4).forEach((m,i)=>F.shots.push({kind:'bolt',x0:arcKeyX(m),y0:F.H+4,x1:tx,y1:ty,t0:F.t+i*0.03,dur:0.17,land:i===0?land:null,combo:o.combo||0}));
}
// one note of a melody or a bass line, right: a small bolt pops the last segment off the tail
function arcFxSeg(m){ const F=arcFx, M=F.mon||ARC.mon; if(!M) return; if(!F.mon){ F.mon=M; F.disp=M.x; F.born=F.t; }
  const size=M.size||40, y=arcGround()-size*0.2-4; M.left++; const x=arcHeadX(M,F.disp)+(M.left-1)*size*ARC_SEG; M.left--;   // where that segment was
  F.shots.push({kind:'bolt',x0:arcKeyX(m),y0:F.H+4,x1:x,y1:y,t0:F.t,dur:0.14,combo:ARC.combo,land:()=>{ arcBurst(x,y,12,['#bff0a0','#ffffff','#f5c542'],200,3); arcPop(x,y-20,'✓','#bff0a0',18); M.kb=F.t; }}); }
function arcFxMiss(){
  const F=arcFx, M=F.mon; F.mon=null;
  const x0=M?arcHeadX(M,F.disp):arcPortalX();
  F.dying.push({face:M?M.face:'👾',x:x0,y:arcGround()-(M?M.size:40)*0.6,size:M?M.size:40,t0:F.t,kind:'charge',x0,segs:M?M.left:0});
}
function arcFxWallHit(){ const F=arcFx; F.wallHit=F.t; F.shake=arcReduce()?4:16; F.flash=0.3; F.flashCol='220,40,40';
  arcBurst(arcWallX()+18,arcGround()-30,22,['#8a7f6a','#b9ad94','#5e5546'],260,4,600); }

/* ---------------- drawing ---------------- */
function arcFxFrame(ts){
  const F=arcFx, c=F.ctx; if(!c) return; if(Math.abs(F.cv.clientWidth-F.cw)>1) arcFxSize();   // the window changed size (a resize event isn't always sent)
  const dt=Math.min(0.05,(ts-F.last)/1000)*(F.slow||1); F.last=ts; F.t+=dt;   // F.slow: slow motion, for checking the animation
  const frozen=F.t<F.freeze, step=frozen?0:dt;
  const R=ARC, th=ARC_THEMES[F.theme]; F.themeF=Math.min(1,F.themeF+dt*1.5);
  // the monster the game has right now: a new one steps out of the portal
  if(R.mon&&R.mon!==F.mon&&now()>=R.walk.t0-0.02){ F.mon=R.mon; F.disp=R.mon.x; F.born=F.t; }
  if(F.mon&&R.mon===F.mon&&!R.done){ const W=R.walk, tt=now(); if(tt>=W.t0) F.mon.x=Math.max(0,W.x0*(W.t1-tt)/(W.t1-W.t0)); }
  if(F.mon&&!frozen) F.disp+=(F.mon.x-F.disp)*Math.min(1,dt*14);
  c.setTransform(F.dpr,0,0,F.dpr,0,0);
  const sh=F.shake*(arcReduce()?0.3:1); F.shake=Math.max(0,F.shake-dt*40);
  c.save(); if(sh>0.3) c.translate((Math.random()-.5)*sh,(Math.random()-.5)*sh*0.6);
  arcFxScene(c,th);
  arcFxCastle(c);
  arcFxPortal(c);
  if(F.mon) arcFxMonster(c,F.mon);
  arcFxDying(c);
  arcFxShots(c,step);
  arcFxParts(c,step);
  c.restore();
  if(F.flash>0){ c.fillStyle=`rgba(${F.flashCol},${Math.min(0.55,F.flash)})`; c.fillRect(0,0,F.W,F.H); F.flash=Math.max(0,F.flash-dt*1.6); }
  if(F.banner) arcFxBannerDraw(c);
}
function arcFxScene(c,th){
  const F=arcFx, W=F.W, H=F.H, g=arcGround();
  const sky=c.createLinearGradient(0,0,0,g); sky.addColorStop(0,th.sky[0]); sky.addColorStop(1,th.sky[1]); c.fillStyle=sky; c.fillRect(0,0,W,H);
  const t=F.t;
  if(th.deco==='star'){ for(let i=0;i<40;i++){ const x=(i*97.3)%W, y=(i*37.7)%(g-40), a=0.4+0.6*Math.abs(Math.sin(t*1.3+i)); c.fillStyle=`rgba(255,255,230,${a})`; c.fillRect(x,y,1.6,1.6); } }
  if(th.deco==='cloud'){ c.fillStyle='rgba(255,255,255,.75)'; for(let i=0;i<4;i++){ const x=((i*W/3.2+t*(6+i*2))%(W+120))-60, y=16+i*11; c.beginPath(); c.ellipse(x,y,26,8,0,0,7); c.ellipse(x+18,y-4,18,8,0,0,7); c.fill(); } }
  if(th.deco==='ember'){ for(let i=0;i<24;i++){ const x=(i*71.1+Math.sin(t+i)*8)%W, y=g-((t*28+i*41)%g); c.fillStyle=`rgba(255,${120+i*4%100},40,${0.5+0.4*Math.sin(t*3+i)})`; c.fillRect(x,y,2,2); } }
  const hills=(col,amp,base,freq,spd)=>{ c.fillStyle=col; c.beginPath(); c.moveTo(0,g); for(let x=0;x<=W;x+=8) c.lineTo(x,base-amp*(0.6+0.4*Math.sin(x*freq+t*spd))*(0.7+0.3*Math.sin(x*freq*2.3))); c.lineTo(W,g); c.fill(); };
  hills(th.far,26,g-30,0.012,0.05); hills(th.near,16,g-10,0.021,0.09);
  c.fillStyle=th.ground; c.fillRect(0,g,W,H-g);
  c.fillStyle=th.path; c.fillRect(0,g+5,W,7);
  c.fillStyle='rgba(0,0,0,.12)'; for(let x=(-t*30)%24;x<W;x+=24) c.fillRect(x,g+7,10,2);   // the path's stones drift a touch, so the lane feels alive
}
function arcFxCastle(c){
  const F=arcFx, x=arcWallX(), g=arcGround(), lives=ARC.lives, hit=F.t-F.wallHit<0.4?Math.sin((F.t-F.wallHit)*60)*(1-(F.t-F.wallHit)/0.4)*4:0;
  c.save(); c.translate(x+hit,g+4); c.font=`58px ${ARC_FONT}`; c.fillStyle='#000'; c.textAlign='center'; c.textBaseline='bottom'; c.fillText('🏰',0,0);
  c.strokeStyle='rgba(30,20,10,.75)'; c.lineWidth=2;   // cracks for each life lost
  if(lives<ARC.maxLives){ c.beginPath(); c.moveTo(-12,-40); c.lineTo(-6,-30); c.lineTo(-10,-22); c.lineTo(-3,-14); c.stroke(); }
  if(lives<ARC.maxLives-1){ c.beginPath(); c.moveTo(14,-46); c.lineTo(8,-36); c.lineTo(13,-27); c.lineTo(6,-18); c.lineTo(9,-8); c.stroke(); }
  c.restore();
  if(lives<=1&&Math.random()<0.25) arcFx.parts.push({kind:'smoke',x:x+(Math.random()-.5)*20,y:g-52,vx:(Math.random()-.5)*8,vy:-22,life:1.6,max:1.6,size:6});
  if(ARC.spell>=ARC_SPELL){ c.save(); c.globalAlpha=0.5+0.3*Math.sin(F.t*8); c.fillStyle='#ff7a2b'; c.beginPath(); c.arc(x+10,g-62,6+2*Math.sin(F.t*10),0,7); c.fill(); c.restore(); }   // the fireball, ready on the tower
}
function arcFxPortal(c){
  const F=arcFx, R=ARC, x=arcPortalX(), g=arcGround();
  // it swirls open just before a new monster steps out, and closes behind it
  let k=0; if(R.mode==='run'&&R.mon&&R.walk){ if(F.mon!==R.mon) k=Math.max(0,Math.min(1,(now()-(R.walk.t0-0.3))/0.3)); else k=Math.max(0,Math.min(1,1-(F.t-F.born-0.35)/0.3)); }
  if(k<=0.02) return;
  c.save(); c.translate(x,g-26); c.scale(k,k);
  const grd=c.createRadialGradient(0,0,2,0,0,30); grd.addColorStop(0,'rgba(190,120,255,.95)'); grd.addColorStop(0.6,'rgba(110,40,200,.55)'); grd.addColorStop(1,'rgba(60,0,120,0)');
  c.fillStyle=grd; c.beginPath(); c.ellipse(0,0,18,30,0,0,7); c.fill();
  c.strokeStyle='rgba(230,200,255,.9)'; c.lineWidth=2; c.setLineDash([6,5]); c.lineDashOffset=-F.t*40; c.beginPath(); c.ellipse(0,0,16,28,0,0,7); c.stroke(); c.setLineDash([]);
  c.restore();
}
function arcFxMonster(c,M){
  const F=arcFx, x=arcHeadX(M,F.disp), g=arcGround(), age=F.t-F.born, size=M.size||40;
  const pop=Math.min(1,age/0.28), ease=1-Math.pow(1-pop,3);   // steps out of the portal
  const walkT=F.t*(M.brute?7:10), bob=Math.abs(Math.sin(walkT))*(M.brute?3:5), lean=Math.sin(walkT)*0.08;
  const kb=M.kb&&F.t-M.kb<0.25?(1-(F.t-M.kb)/0.25):0;   // the stagger after a hit
  const near=1-F.disp, hurry=near>0.75?Math.sin(F.t*40)*1.5:0;   // close to the wall it jitters: hurry up
  c.save(); c.fillStyle='rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(x,g+3,size*0.38*ease,5*ease,0,0,7); c.fill(); c.restore();
  for(let i=(M.left||1)-1;i>=1;i--){ const sx=x+i*size*ARC_SEG, sb=Math.abs(Math.sin(walkT-i*0.7))*3, r=size*0.2*ease;   // one body segment per note still to play
    c.fillStyle='rgba(0,0,0,.18)'; c.beginPath(); c.ellipse(sx,g+3,r,3,0,0,7); c.fill();
    const grd=c.createRadialGradient(sx-r*0.3,g-r-sb-r*0.3,1,sx,g-r-sb,r); grd.addColorStop(0,'#bff0a0'); grd.addColorStop(1,'#4f9a3c');
    c.fillStyle=grd; c.beginPath(); c.arc(sx,g-r-sb,r,0,7); c.fill(); c.strokeStyle='rgba(30,60,20,.6)'; c.lineWidth=1.5; c.stroke(); }
  c.save(); c.translate(x+hurry+kb*10,g-bob*ease); c.rotate(-lean-kb*0.35); c.scale(ease*(1+bob*0.012),ease*(1-bob*0.01));
  c.font=`${size}px ${ARC_FONT}`; c.fillStyle='#000'; c.textAlign='center'; c.textBaseline='bottom'; c.fillText(M.face,0,0);
  if(kb>0&&'filter' in c){ c.filter=`brightness(${1+kb*2.2})`; c.globalAlpha=kb; c.fillText(M.face,0,0); c.filter='none'; c.globalAlpha=1; }
  c.restore();
  if(M.max>1){ for(let i=0;i<M.max;i++){ const on=i<M.hp; c.fillStyle=on?'#6fa8ff':'rgba(255,255,255,.35)'; c.strokeStyle='#1d2b4f'; c.lineWidth=1.5; c.beginPath(); const px=x-8+i*16, py=g-size-14;
    c.moveTo(px,py-6); c.lineTo(px+6,py); c.lineTo(px,py+6); c.lineTo(px-6,py); c.closePath(); c.fill(); c.stroke(); } }   // armour pips
}
function arcFxDying(c){
  const F=arcFx, g=arcGround();
  F.dying=F.dying.filter(d=>{ const a=F.t-d.t0;
    if(d.kind==='pop'){ if(a>0.35) return false; const k=a/0.35; c.save(); c.globalAlpha=1-k; c.translate(d.x,d.y+12); c.scale(1+k*0.9,1+k*0.9); c.font=`${d.size}px ${ARC_FONT}`; c.fillStyle='#000'; c.textAlign='center'; c.textBaseline='bottom'; c.fillText('💥',0,0); c.restore(); return true; }
    // a miss: wind up (lean back), charge at the wall, bounce off it and fade
    const wind=0.16, run=0.24, x1=arcWallX()+30;
    let x=d.x0, rot=0, alpha=1, y=d.y;
    if(a<wind){ x=d.x0+8*(a/wind); rot=0.25*(a/wind); }
    else if(a<wind+run){ const k=(a-wind)/run; x=d.x0+8+(x1-d.x0-8)*k*k; rot=-0.3; if(Math.random()<0.6) F.parts.push({kind:'spark',x:x+16,y:y-8-Math.random()*16,vx:120,vy:0,life:0.18,max:0.18,col:'rgba(255,255,255,.8)',size:2,line:1}); }   // speed lines
    else { if(!d.hit){ d.hit=1; arcFxWallHit(); } const k=Math.min(1,(a-wind-run)/0.5); x=x1+60*k; y=d.y-50*Math.sin(k*Math.PI)*0.6; rot=k*4; alpha=1-k; if(k>=1) return false; }
    c.save(); c.globalAlpha=alpha; c.translate(x,y+24); c.rotate(rot); c.font=`${d.size}px ${ARC_FONT}`; c.fillStyle='#000'; c.textAlign='center'; c.textBaseline='bottom'; c.fillText(d.face,0,0); c.restore(); return true; });
}
function arcFxShots(c,dt){
  const F=arcFx;
  F.shots=F.shots.filter(s=>{ const a=F.t-s.t0; if(a<0) return true; const k=Math.min(1,a/s.dur);
    let x,y;
    if(s.kind==='fire'){ x=s.x0+(s.x1-s.x0)*k; y=s.y0+(s.y1-s.y0)*k-Math.sin(k*Math.PI)*70;
      for(let i=0;i<3;i++) F.parts.push({kind:'spark',x,y,vx:(Math.random()-.5)*60,vy:(Math.random()-.5)*60,life:0.3,max:0.3,col:['#ffd23f','#ff6b2b','#ff3d00'][i],size:5});
      c.save(); c.font=`30px ${ARC_FONT}`; c.fillStyle='#000'; c.textAlign='center'; c.textBaseline='middle'; c.translate(x,y); c.rotate(k*8); c.fillText('🔥',0,0); c.restore(); }
    else { const e=1-Math.pow(1-k,2); x=s.x0+(s.x1-s.x0)*e; y=s.y0+(s.y1-s.y0)*e;
      const hue=s.combo>=10?'255,120,60':s.combo>=5?'190,120,255':'245,197,66';   // the bolt warms up with your combo
      const tx=s.x0+(s.x1-s.x0)*Math.max(0,e-0.25), ty=s.y0+(s.y1-s.y0)*Math.max(0,e-0.25);
      const grd=c.createLinearGradient(tx,ty,x,y); grd.addColorStop(0,`rgba(${hue},0)`); grd.addColorStop(1,`rgba(${hue},1)`);
      c.save(); c.shadowColor=`rgba(${hue},1)`; c.shadowBlur=14; c.strokeStyle=grd; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(tx,ty); c.lineTo(x,y); c.stroke();
      c.fillStyle='#fff'; c.beginPath(); c.arc(x,y,5,0,7); c.fill(); c.restore(); }
    if(k>=1){ if(s.land) s.land(); return false; } return true; });
}
function arcFxParts(c,dt){
  const F=arcFx;
  F.parts=F.parts.filter(p=>{ p.life-=dt; if(p.life<=0) return false; const k=p.life/p.max;
    p.x+=(p.vx||0)*dt; p.y+=(p.vy||0)*dt; if(p.grav) p.vy+=p.grav*dt; if(p.vr) p.rot+=p.vr*dt;
    if(p.kind==='text'){ c.save(); c.globalAlpha=Math.min(1,k*1.6); c.font=`700 ${p.size*(1+0.25*(1-k))}px Barlow Condensed, sans-serif`; c.textAlign='center'; c.lineWidth=3; c.strokeStyle='rgba(20,20,40,.55)'; c.strokeText(p.text,p.x,p.y); c.fillStyle=p.col; c.fillText(p.text,p.x,p.y); c.restore(); }
    else if(p.kind==='ring'){ c.save(); c.globalAlpha=k; c.strokeStyle=p.col; c.lineWidth=4*k; c.beginPath(); c.arc(p.x,p.y,(1-k)*90,0,7); c.stroke(); c.restore(); }
    else if(p.kind==='chunk'){ c.save(); c.globalAlpha=k; c.translate(p.x,p.y); c.rotate(p.rot); c.font=`${p.size}px ${ARC_FONT}`; c.fillStyle='#000'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(p.face,0,0); c.restore(); }
    else if(p.kind==='smoke'){ c.fillStyle=`rgba(90,90,90,${0.35*k})`; c.beginPath(); c.arc(p.x,p.y,p.size*(2-k),0,7); c.fill(); }
    else if(p.line){ c.strokeStyle=p.col; c.lineWidth=1.5; c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(p.x+14,p.y); c.stroke(); }
    else { c.globalAlpha=Math.min(1,k*1.5); c.fillStyle=p.col; const s=p.size*(p.sq?1:k+0.3); c.fillRect(p.x-s/2,p.y-s/2,s,s); c.globalAlpha=1; }
    return true; });
}
function arcFxBannerDraw(c){
  const F=arcFx, b=F.banner, a=F.t-b.t0, dur=1.6; if(a>dur){ F.banner=null; return; }
  const inK=Math.min(1,a/0.25), outK=a>dur-0.3?(a-(dur-0.3))/0.3:0, x=F.W/2+(1-inK)*F.W*0.6-outK*F.W*0.6;
  c.save(); c.globalAlpha=1-outK; c.fillStyle='rgba(15,18,40,.72)'; c.fillRect(0,F.H/2-24,F.W,44);
  c.font=`700 26px Barlow Condensed, sans-serif`; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle=b.col; c.fillText(b.text,x,F.H/2-2); c.restore();
}
