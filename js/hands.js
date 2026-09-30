/* ---------------- game ---------------- */
const BEATS_PER_CHORD=16;   // each chord gets 4 bars of 4/4 to land
const MIN_VIS=5;            // chords never cross the lane faster than this (seconds), for readability
const STRIP=46;             // look-ahead strip height
const PRACTICE_FALL=3, HOVER=0.62;
let mode=store.get('mode','game'), tierId=store.get('tier','autumn');
const tierOf=id=>TIERS.find(t=>t.id===id)||TIERS[1];
const bestKey=(tid,st)=>`${tid}:${st}`;
function tierUnlocked(t){
  if(!t.unlock) return true;
  const bests=store.get('best2',{});
  return Object.entries(bests).some(([k,v])=>k.startsWith(t.unlock.tier+':')&&v>=t.unlock.score);
}
function nextChords(){
  const st=stageN;
  // Smart mix: weak chord-in-key pairs come up more, and so does every chord in a shaky key
  const kw=opts.smart?[...Array(12).keys()].map(p=>keyWeight(p,'hands')):null;
  if(st===6){
    if(!opts.smart) return iiVI();
    const keys=[...Array(12).keys()].map(k=>({k,w:kw[k]*(weightOf('min7',(k+2)%12)+weightOf('dom7',(k+7)%12)+weightOf('maj7',k))/3}));
    return iiVI(weightedPick(keys).k);
  }
  const pool=st===7?QUALS:QUALS.filter(q=>q.stage===st);
  let q, pc, tries=0;
  if(opts.smart){
    const items=[]; pool.forEach(qq=>{for(let p=0;p<12;p++) if(G.lastSym!==qq.id+p) items.push({q:qq,pc:p,w:weightOf(qq.id,p)*kw[p]});});
    const pick=weightedPick(items); q=pick.q; pc=pick.pc;
  } else {
    do{ q=pool[Math.floor(Math.random()*pool.length)]; pc=Math.floor(Math.random()*12); tries++; }
    while(G.lastSym && tries<10 && G.lastSym===q.id+pc);
  }
  G.lastSym=q.id+pc;
  let root=defaultRoot(pc,q.minor);
  if(opts.weird && Math.random()<0.4){const w=weirdRoot(pc); if(w) root=w;}
  return [{root,q}];
}
function withReq(c){
  const t={root:c.root,q:c.q,suf:pickSuf(c.q),req:null};
  if(Math.random()<0.25){
    const list=requestsFor(t,{rootless:opts.rootless,sequence:stageN===6});
    if(G.practice||G.tier.bpm<=120) list.push('byear','byear');
    t.req=list[Math.floor(Math.random()*list.length)];
  }
  return t;
}
function fillQueue(){ while(G.queue.length<3) nextChords().forEach(c=>G.queue.push(withReq(c))); }
let earBus=null;
function playByEar(t){ killBus(earBus); earBus=newBus(); if(earBus) playChord(voiceChord(t.q,t.root.pc,'close'),now()+0.05,1.6,'epiano',earBus,85); }
function symHTML(t){
  if(t.req==='byear') return '<span class="rt q">?</span>';
  const acc=ACC[t.root.a];
  const suf=(t.suf??t.q.suf).replace(/([♭♯°ø])/g,'<span class="g">$1</span>');
  return `<span class="rt">${LETTERS[t.root.l]}</span>${acc?`<span class="ac">${acc}</span>`:''}${suf?`<span class="sf">${suf}</span>`:''}`;
}
function renderAhead(){
  $('ahead').innerHTML='<span class="lbl">Coming up</span>'+G.queue.slice(0,2).map(t=>`<span class="sym">${symHTML(t)}</span>`).join('');
}
const fallTime=()=>BEATS_PER_CHORD*60/G.bpm;

function newGame(){
  const practice=mode==='practice', tier=tierOf(tierId);
  G={running:false,paused:false,practice,tier,bpm:tier.bpm,cap:practice?1:tier.cap,
     score:0,combo:0,maxCombo:0,wave:1,kills:0,lives:practice?Infinity:tier.lives,enemies:[],queue:[],
     cool:0.3,sinceSpawn:99,prev:null,attempts:0,fails:0,hints:0,best:null,escaped:{},missed:{},times:[],slow:[],
     lastSym:null,raf:0,last:0,id:0};
  $('lane').querySelectorAll('.enemy,.pop,.shot').forEach(n=>n.remove());
  fillQueue(); renderAhead(); updateHud();
}
function start(){
  document.body.classList.remove('earsmode');
  const tier=tierOf(tierId);
  if(mode==='game' && !tierUnlocked(tier)) return;
  synth.init();
  store.set('stage',stageN); store.set('mode',mode); store.set('tier',tierId);
  newGame(); G.running=true;
  hideOv(); kbMarks={}; paintKeys(); $('staff').innerHTML=staffSVG([],[]); $('verdict').className='verdict'; $('verdict').textContent='Play the lowest chord.'; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
  G.last=performance.now(); G.raf=requestAnimationFrame(tick); metro.start();
}
function spawn(){
  fillQueue();
  const t=G.queue.shift(); fillQueue(); renderAhead();
  const el=document.createElement('div'); el.className='enemy';
  const req=t.req;
  el.innerHTML=symHTML(t)+(req?`<span class="req">${req==='byear'?'by ear':REQ_LABEL[req]} ×2</span>`:'');
  if(req==='byear') setTimeout(()=>playByEar(t),150);
  el.style.rotate=((Math.random()*5-2.5).toFixed(1))+'deg';
  $('lane').appendChild(el);
  const laneW=$('lane').clientWidth, w=el.offsetWidth;
  let x, tries=0;
  do{ x=12+Math.random()*Math.max(10,laneW-w-24); tries++; } while(tries<12 && G.enemies.some(e=>Math.abs(e.x-x)<w*0.9));
  const e={id:++G.id,t,el,x,tf:0,w,h:el.offsetHeight,born:performance.now(),misses:0,req};
  el.style.transform=`translate(${x}px,${STRIP-e.h}px)`;
  G.enemies.push(e); G.sinceSpawn=0;
}
function tick(now){
  if(!G||!G.running) return;
  const dt=Math.min(0.05,(now-G.last)/1000); G.last=now;
  const fall=fallTime(), laneH=$('lane').clientHeight, bottom=laneH-6;
  G.cool-=dt; G.sinceSpawn+=dt;
  const stagger=G.cap>1?4*60/G.bpm:0;
  if(G.enemies.length<G.cap && G.cool<=0 && G.sinceSpawn>=stagger) spawn();
  const start=G.practice?0:Math.max(0,1-fall/MIN_VIS);
  G.enemies.forEach((e,i)=>{
    let vis;
    if(G.practice){ e.tf=Math.min(HOVER,e.tf+dt/PRACTICE_FALL); vis=e.tf; }
    else { e.tf+=dt/fall; vis=start+(1-start)*Math.min(1,e.tf); }
    const py=STRIP+vis*(bottom-STRIP)-e.h*(1-vis)-e.h*vis;
    e.el.style.transform=`translate(${e.x}px,${py}px)`;
    e.el.classList.toggle('target',i===0);
    e.el.classList.toggle('danger',!G.practice && e.tf>0.75);
  });
  if(!G.practice && G.enemies.length && G.enemies[0].tf>=1){
    const e=G.enemies.shift(); e.el.remove();
    const key=symText({root:e.t.root,q:e.t.q}); G.escaped[key]=(G.escaped[key]||0)+1; recordStat(e.t,'esc');
    G.lives--; G.combo=0; G.prev=null; G.cool=Math.max(0.4,60/G.bpm);
    const lane=$('lane'); lane.classList.remove('hurt'); void lane.offsetWidth; lane.classList.add('hurt');
    updateHud();
    if(G.lives<=0){ gameOver(); return; }
  }
  G.raf=requestAnimationFrame(tick);
}
function submit(notes){
  if(!G||!G.running){ showAnalysis(null,null,null,notes); return; }
  if(!G.enemies.length) return;
  const e=G.enemies[0];
  const ev=evaluate(notes,e.t,opts);
  G.attempts++;
  if(!ev.ok){
    G.fails++; G.combo=0; e.misses++; recordStat(e.t,'miss');
    const key=symText({root:e.t.root,q:e.t.q}); G.missed[key]=(G.missed[key]||0)+1;
    e.el.classList.remove('shake'); void e.el.offsetWidth; e.el.classList.add('shake');
    showAnalysis(ev,e.t,null);
    if(e.t.req==='byear' && e.misses<3){
      kbMarks={}; notes.forEach(m=>kbMarks[m]='k-hint'); paintKeys();
      $('staff').innerHTML=staffSVG([...new Set(notes)].sort((a,b)=>a-b).map(plainSpell),[]);
      $('verdict').textContent='Not it yet.'; $('chips').innerHTML=''; $('why').textContent='Press R to hear it again.';
      updateHud(); return;
    }
    if(G.practice){
      if(e.misses===2) $('why').textContent+=' Stuck? Press ? for a sample voicing.';
      if(e.misses>=3){ const r=ev.reasons.join(' '); showHint(e.t); $('why').textContent=r+' Here is one way to play it. Now try your own.'; }
    }
    updateHud(); return;
  }
  const res=scoreVoicing(ev,e.t,G.prev,G.practice?0.5:Math.min(1,e.tf),G.combo);
  let reqNote='';
  if(e.req){
    if(meetsRequest(e.req,ev,e.t,G.prev)){ res.tags.push({t:'Request met',p:res.total}); res.total*=2; G.reqMet=(G.reqMet||0)+1; }
    else reqNote=`The request was ${REQ_LABEL[e.req]}, so no double points this time.`;
  }
  if(!G.practice) res.total=Math.round(res.total*G.tier.mult);
  recordStat(e.t,'clear',(performance.now()-e.born)/1000,e.misses===0);
  G.score+=res.total; addXP(res.total/25); G.combo++; G.maxCombo=Math.max(G.maxCombo,G.combo); G.kills++;
  const secs=(performance.now()-e.born)/1000;
  G.times.push(secs); G.slow.push({sym:symText(e.t),secs});
  G.prev=ev.per.map(p=>p.midi);
  if(!G.best||res.total>G.best.total) G.best={total:res.total,sym:symText(e.t),notes:ev.per.map(p=>p.spell.name),tags:res.tags.filter(t=>t.p>0&&t.t!=='Quick').map(t=>t.t)};
  if(!G.practice && G.kills%8===0){ G.wave++; G.bpm+=G.tier.step; }
  G.enemies.shift();
  G.cool=G.practice?0.5:Math.max(0.4,60/G.bpm);
  fx(e,res);
  showAnalysis(ev,e.t,res); if(reqNote) $('why').textContent=(($('why').textContent||'')+' '+reqNote).trim(); updateHud();
}
function fx(e,res){
  const lane=$('lane'), r=e.el.getBoundingClientRect(), lr=lane.getBoundingClientRect();
  const cx=r.left-lr.left+r.width/2, cy=r.top-lr.top+r.height/2;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce){
    const shot=document.createElement('div'); shot.className='shot';
    shot.style.left=cx+'px'; shot.style.height=Math.max(10,lr.height-cy)+'px';
    lane.appendChild(shot); requestAnimationFrame(()=>{shot.style.opacity='0';}); setTimeout(()=>shot.remove(),320);
  }
  e.el.classList.add('dead'); setTimeout(()=>e.el.remove(),380);
  const pop=document.createElement('div'); pop.className='pop';
  pop.style.left=Math.min(Math.max(cx,70),lane.clientWidth-70)+'px'; pop.style.top=Math.max(STRIP+4,cy-10)+'px';
  const shown=res.tags.filter(t=>t.p>0 && t.t!=='Quick').slice(0,2).map(t=>t.t).join(', ');
  pop.innerHTML=`<b>+${res.total}</b>${shown?`<span>${shown}</span>`:''}`;
  lane.appendChild(pop); setTimeout(()=>pop.remove(),1300);
}

/* ---------------- tempo pulse + hi-hat ---------------- */
let noiseBuf=null;
function hat(t){
  const c=synth.ctx; if(!c) return;
  if(!noiseBuf){ noiseBuf=c.createBuffer(1,c.sampleRate*0.2,c.sampleRate); const d=noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; }
  const src=c.createBufferSource(); src.buffer=noiseBuf;
  const hp=c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=7000;
  const g=c.createGain(); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.5,t+0.002); g.gain.exponentialRampToValueAtTime(0.0001,t+0.06);
  src.connect(hp); hp.connect(g); g.connect(synth.master); src.start(t); src.stop(t+0.08);
}
function pulse(b){
  const el=$('beat'); if(!G||!G.running||G.practice) return;
  el.classList.add('on'); setTimeout(()=>el.classList.remove('on'),90);
}
const metro={timer:null,next:0,beat:0,
  start(){
    this.stop(); if(!G||G.practice) return;
    const c=synth.ctx; const now=c?c.currentTime:performance.now()/1000;
    this.next=now+0.1; this.beat=0; this.timer=setInterval(()=>this.pump(),25);
  },
  stop(){ clearInterval(this.timer); this.timer=null; },
  pump(){
    if(!G||!G.running) return;
    const c=synth.ctx, now=c&&c.state==='running'?c.currentTime:performance.now()/1000;
    if(this.next<now-0.5) this.next=now+0.05; // recover after a stall
    while(this.next<now+0.12){
      const b=this.beat%4;
      if(opts.metro && c && c.state==='running' && (b===1||b===3)) hat(this.next);
      setTimeout(()=>pulse(b),Math.max(0,(this.next-now)*1000));
      this.next+=60/G.bpm; this.beat++;
    }
  }
};

/* ---------------- HUD, overlays ---------------- */
function updateHud(){
  const practice=G?G.practice:mode==='practice';
  $('score').textContent=G?G.score.toLocaleString():0; $('combo').textContent=G?G.combo:0; $('wave').textContent=G?G.wave:1;
  $('tempo').textContent=practice?'rubato':(G?G.bpm:tierOf(tierId).bpm);
  $('beat').classList.toggle('off',practice);
  $('waveStat').classList.toggle('hide',practice);
  $('lives').classList.toggle('hide',practice);
  $('modetag').textContent=practice?'Practice':tierOf(G?G.tier.id:tierId).name;
  const t=G?G.tier:tierOf(tierId), lives=G?G.lives:t.lives;
  $('lives').innerHTML=Array.from({length:t.lives},(_,i)=>`<i class="${i<lives?'':'gone'}"></i>`).join('');
}
function pause(){ G.running=false; G.paused=true; cancelAnimationFrame(G.raf); metro.stop(); $('pauseOv').hidden=false; $('quitBtn').textContent=G.practice?'End session':'End run'; $('resumeBtn').focus(); }
function resume(){ $('pauseOv').hidden=true; G.paused=false; G.running=true; G.last=performance.now(); G.raf=requestAnimationFrame(tick); metro.start(); }
function hideOv(){ ['startOv','pauseOv','overOv','progOv'].forEach(i=>$(i).hidden=true); document.body.classList.remove('menu'); }
function gameOver(){
  G.running=false; G.paused=false; cancelAnimationFrame(G.raf); metro.stop();
  const acc=G.attempts?Math.round(100*(G.attempts-G.fails)/G.attempts):0;
  const avg=G.times.length?(G.times.reduce((a,b)=>a+b,0)/G.times.length).toFixed(1):'–';
  let newBest=false;
  if(!G.practice){
    const bests=store.get('best2',{}), k=bestKey(G.tier.id,stageN), prevBest=bests[k]||0;
    if(G.score>prevBest){bests[k]=G.score; store.set('best2',bests); newBest=G.score>0;}
  }
  $('overTitle').textContent=G.practice?'Practice session':newBest?'New best':'Run over';
  $('results').innerHTML=G.practice
    ? `<div><b>${G.kills}</b>chords played</div><div><b>${acc}%</b>of attempts correct</div><div><b>${avg}s</b>average per chord</div>`
    : `<div><b>${G.score.toLocaleString()}</b>score</div><div><b>${G.kills}</b>chords cleared</div><div><b>${acc}%</b>of attempts correct</div><div><b>${G.bpm}</b>tempo reached</div><div><b>${G.maxCombo}</b>best combo</div>`;
  $('bestV').innerHTML=G.best?`<div class="sym">${G.best.sym}</div><div>${G.best.notes.join(' ')}, worth ${G.best.total}${G.best.tags.length?`. ${G.best.tags.join(', ')}.`:''}</div>`:'<div>No chords cleared this time.</div>';
  let weak='';
  if(G.practice){
    const slow=[...G.slow].sort((a,b)=>b.secs-a.secs).slice(0,3);
    if(slow.length) weak=`Slowest: ${slow.map(s=>`${s.sym} (${s.secs.toFixed(1)}s)`).join(', ')}.`;
  }
  const trouble={}; Object.entries(G.escaped).forEach(([k,v])=>trouble[k]=(trouble[k]||0)+v*2); Object.entries(G.missed).forEach(([k,v])=>trouble[k]=(trouble[k]||0)+v);
  const top=Object.entries(trouble).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);
  if(top.length) weak+=(weak?' ':'')+`Most missed: ${top.join(', ')}.`;
  $('weak').textContent=weak;
  $('overOv').hidden=false; $('againBtn').focus();
  renderMenu();
}

