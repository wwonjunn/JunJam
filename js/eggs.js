/* Easter eggs: very rarely, a hit, a boss, a last life or a results screen gets a quiet nod to an anime, a game or a
   show instead of the usual effect. Rare on purpose: a small chance each time (a kill is about 1 in 400), and after one
   shows up, none for the next three minutes, in any mode. No pictures, only shapes, emoji and a few words.
   To see one now, from the console: EGG.force='kame' (any id below), then trigger the event. */
const EGG={force:null};
const EGG_GAP=3*60*1000;   // only so two never come back to back
function egg(list,p){
  if(EGG.force){ const f=list.find(x=>x.id===EGG.force); if(f) EGG.force=null; return f||null; }
  if(Math.random()>=p||Date.now()-store.get('eggAt',0)<EGG_GAP) return null;
  store.set('eggAt',Date.now()); return list[Math.floor(Math.random()*list.length)];
}
const eggReduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Ears: drawn on the lane's canvas (arcfx.js) ---------------- */
// the castle tower, where the big moves come from
const eggTower=()=>({x:arcWallX()+14,y:arcGround()-58});
const EGG_EARS_HIT=[
  // a grand piano falls out of the sky onto it
  {id:'piano',go:({tx,ty,land})=>{ const F=arcFx;
    F.shots.push({t0:F.t,dur:.55,x1:tx,y1:ty,land:()=>{ land(); arcPop(tx+28,ty-6,'*plonk*','#ffffff',13); },
      draw:(c,k)=>{ const y=-50+(ty+10)*k*k; c.save(); c.translate(tx,y); c.rotate(.25-k*.25); c.font=`44px ${ARC_FONT}`; c.textAlign='center'; c.textBaseline='bottom'; c.fillStyle='#000'; c.fillText('🎹',0,0); c.restore(); }}); }},
  // Kamehameha: a ball of light charges on the tower, then a beam
  {id:'kame',go:({tx,ty,land})=>{ const F=arcFx, T=eggTower(), ch=.6;
    F.shots.push({t0:F.t,dur:.9,x1:tx,y1:ty,land:()=>{ land(); arcPop(T.x+30,T.y-26,'HA!','#bfefff',15); },
      draw:(c,k)=>{ const a=k*.9, r=a<ch?4+12*(a/ch):16; c.save(); c.shadowColor='#6fd8ff'; c.shadowBlur=22;
        if(a>=ch){ const f=Math.min(1,(a-ch)/(.9-ch)), ex=T.x+(tx-T.x)*f, ey=T.y+(ty-T.y)*f;
          c.lineCap='round'; c.strokeStyle='rgba(90,200,255,.9)'; c.lineWidth=18; c.beginPath(); c.moveTo(T.x,T.y); c.lineTo(ex,ey); c.stroke();
          c.strokeStyle='#fff'; c.lineWidth=6; c.beginPath(); c.moveTo(T.x,T.y); c.lineTo(ex,ey); c.stroke(); }
        const g=c.createRadialGradient(T.x,T.y,1,T.x,T.y,r); g.addColorStop(0,'#fff'); g.addColorStop(.5,'#9fe6ff'); g.addColorStop(1,'rgba(60,170,255,0)');
        c.fillStyle=g; c.beginPath(); c.arc(T.x,T.y,r*(1+.08*Math.sin(F.t*60)),0,7); c.fill(); c.restore(); }}); }},
  // Rasengan: a spinning ball, carried straight in
  {id:'rasengan',go:({tx,ty,land})=>{ const F=arcFx, T=eggTower();
    F.shots.push({t0:F.t,dur:.5,x1:tx,y1:ty,land,
      draw:(c,k)=>{ const x=T.x+(tx-T.x)*k, y=T.y+(ty-T.y)*k, r=13; c.save(); c.shadowColor='#7fc8ff'; c.shadowBlur=18;
        const g=c.createRadialGradient(x,y,1,x,y,r); g.addColorStop(0,'#fff'); g.addColorStop(.6,'#8fd0ff'); g.addColorStop(1,'rgba(70,150,255,.25)');
        c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=1.6;
        for(let i=0;i<3;i++){ const s=F.t*26+i*2.1; c.beginPath(); c.ellipse(x,y,r*.85,r*.35,s,0,4.2); c.stroke(); } c.restore(); }}); }},
];
// a kill can also go like Team Rocket: off into the sky, and a twinkle
const EGG_EARS_KILL=[...EGG_EARS_HIT,
  {id:'blastoff',go:({tx,ty,land,M,o})=>{ const F=arcFx;
    F.shots.push({kind:'bolt',x0:arcKeyX((o.notes||[60])[0]),y0:F.H+4,x1:tx,y1:ty,t0:F.t,dur:.17,combo:o.combo||0,land:()=>{ land(); F.parts=F.parts.filter(p=>p.kind!=='chunk');   // it flies off whole
      const d=F.dying[F.dying.length-1]; if(d&&d.kind==='pop'){ d.kind='egg'; d.draw=(c,a)=>{ const k=Math.min(1,a/1.1), x=d.x+(F.W*.85-d.x)*k, y=d.y-(d.y-18)*k;
        if(k<.9){ c.save(); c.translate(x,y); c.rotate(k*14); c.scale(1-k*.85,1-k*.85); c.font=`${d.size}px ${ARC_FONT}`; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='#000'; c.fillText(M.face,0,0); c.restore(); }
        else { c.save(); c.globalAlpha=Math.max(0,1-(a-1.1)/.5); c.font=`${14+10*Math.abs(Math.sin(a*12))}px ${ARC_FONT}`; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='#000'; c.fillText('✨',x,y); c.restore(); }
        return a<1.6; }; } }}); }},
];
// a boss steps out with JoJo's menacing ゴゴゴ around it; any monster, Metal Gear's "!"
const EGG_EARS_BOSS=[{id:'gogo',draw:(c,x,top,a,size)=>{ c.save(); c.font='900 20px "Hiragino Mincho ProN","Yu Mincho",serif'; c.textAlign='center'; c.lineWidth=3; c.strokeStyle='rgba(30,0,40,.8)'; c.fillStyle='#b26bff';
  const w=size*.55+16; [[-w,.3],[-w+6,.75],[w,.2],[w+6,.65]].forEach(([dx,fy],i)=>{ const y=top+fy*size, b=Math.sin(a*5+i)*3, al=.55+.45*Math.abs(Math.sin(a*2+i)); c.globalAlpha=al; c.strokeText('ゴ',x+dx,y+b); c.fillText('ゴ',x+dx,y+b); }); c.restore(); }}];
const EGG_EARS_SPAWN=[{id:'alert',draw:(c,x,y,a)=>{ if(a>1) return; y-=10; const s=a<.12?a/.12*1.3:a<.2?1.3-(a-.12)/.08*.3:1; c.save(); c.translate(x,y-8); c.scale(s,s); c.font='900 30px "Barlow Condensed",sans-serif'; c.textAlign='center'; c.lineWidth=4; c.strokeStyle='#5a0000'; c.fillStyle='#ff3b30'; c.strokeText('!',0,0); c.fillText('!',0,0); c.restore(); }}];
function eggSpawn(M){ const g=M.boss?egg(EGG_EARS_BOSS,1/12):egg(EGG_EARS_SPAWN,1/400); if(g) M.egg=g.draw; }
// down to the last life: Sans has a word
const EGG_LAST=[{id:'sans',text:'* you feel like you\'re going to have a bad time.'}];
function eggEarsLast(){ const g=egg(EGG_LAST,1/15); if(!g) return; const F=arcFx, t0=F.t;
  F.over.push(c=>{ const a=F.t-t0; if(a>3.4) return false; const n=Math.min(g.text.length,Math.floor(a*28));
    c.save(); c.font='13px "Courier New",monospace'; const w=Math.min(F.W-20,c.measureText(g.text).width+26), x=(F.W-w)/2, y=12; c.globalAlpha=a>3?1-(a-3)/.4:1; c.fillStyle='#000'; c.fillRect(x,y,w,34); c.strokeStyle='#fff'; c.lineWidth=3; c.strokeRect(x,y,w,34);
    c.fillStyle='#fff'; c.textBaseline='middle'; c.fillText(g.text.slice(0,n),x+12,y+17); c.restore(); return true; }); }
// out of lives
const EGG_EARS_OVER=[{id:'died',go:el=>{ el.textContent='YOU DIED'; el.classList.add('egg-died'); }}];

/* ---------------- Chords: on the falling lane (hands.js) ---------------- */
function eggEl(lane,cls,html,x,y,ms){ const d=document.createElement('div'); d.className=cls; d.innerHTML=html; if(x!=null) d.style.left=x+'px'; if(y!=null) d.style.top=y+'px'; lane.appendChild(d); setTimeout(()=>d.remove(),ms); return d; }
const EGG_CHORDS_KILL=[
  {id:'piano',go:(lane,el,cx,cy)=>{ const d=eggEl(lane,'eggpiano','🎹',cx,cy,900); d.style.setProperty('--fall',(cy+40)+'px'); setTimeout(()=>eggEl(lane,'pop egg-small','*plonk*',cx+34,cy-6,1300),430); return {wait:430}; }},
  {id:'kame',go:(lane,el,cx,cy,lr)=>{ const d=eggEl(lane,'eggbeam','',cx,null,700); d.style.height=Math.max(10,lr.height-cy)+'px'; eggEl(lane,'pop egg-small','HA!',cx+30,lr.height-40,1300); return {wait:150}; }},
  // Fist of the North Star: it's already dead, it just doesn't know yet
  {id:'omae',go:(lane,el,cx,cy)=>{ eggEl(lane,'eggsay','お前はもう死んでいる',cx,cy-46,1100); setTimeout(()=>eggEl(lane,'pop egg-nani','NANI?!',cx,cy-10,1300),900); return {wait:1000,shot:true}; }},
];
const EGG_CHORDS_FIRE=[{id:'super',go:lane=>{ eggEl(lane,'eggbox','It\'s super effective!',null,null,1900); return {shot:true}; }}];
function eggChordsKill(e,lane,cx,cy,lr){ if(eggReduce()) return null; const g=egg(e.t.fire?EGG_CHORDS_FIRE:EGG_CHORDS_KILL,e.t.fire?1/40:1/400); return g?g.go(lane,e.el,cx,cy,lr)||{}:null; }
function eggChordsLast(){ const g=egg(EGG_LAST,1/15); if(g) eggEl($('lane'),'eggbox egg-ut',g.text,null,null,3600); }
const EGG_CHORDS_OVER=[{id:'krillin',go:el=>{ el.textContent='Run over (Krillin moment)'; }}];

/* ---------------- results screens ---------------- */
const EGG_COMP_WIN=[{id:'saymyname',go:el=>{ el.textContent='Say my name.'; }}];
const EGG_COMP_LOSE=[{id:'ramen',go:el=>{ el.textContent='The band walked off (to Ichiraku Ramen)'; }}];
const EGG_LINES_WIN=[{id:'omedetou',go:el=>{ el.innerHTML='Congratulations. <span class="fine">(clap clap clap)</span>'; }},{id:'plusultra',go:el=>{ el.textContent='Plus Ultra'; }}];
function eggTitle(el,list,p){ if(!el) return; const g=egg(list,p); if(g) g.go(el); }
