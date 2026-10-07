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
const isProgStage=()=>typeof stageN==='string';

/* ---------------- stars (Game mode only, no locks) ----------------
   Per chord stage and per progression, five each. Each star needs the ones before it.
   ★ and ★★ are about knowing the chords. From ★★ on, some chords come "on fire": they name the note that has to be
   at the bottom (the 3rd, then also the 5th, then also the 7th), so your left hand learns more than the root.
   ★★★★★ is every inversion at Cherokee tempo without losing a life. */
const STAR_RUN=16, STAR_MAX=5, FIRE_RUN=4;   // a fire star needs at least this many fire chords cleared in the run
const STAR_GOALS=['Clear 16 chords in one Game run.','Clear 16 with 90% right on the first try.',
  `Same again with 🔥 chords, which want the 3rd as the lowest note (clear at least ${FIRE_RUN}).`,
  `Same again, with 🔥 chords asking for the 3rd or the 5th in the bass.`,
  'With every inversion (3rd, 5th and 7th in the bass) at Cherokee tempo or faster, without losing a life.'];
let HSTARS=store.get('hstars',{});
// the old ★★★ (Cherokee tempo, no inversions) counts as ★★ on the five-star ladder
if(store.get('hstarsV',1)<2){ Object.keys(HSTARS).forEach(k=>{ if(HSTARS[k]>2) HSTARS[k]=2; }); store.set('hstars',HSTARS); store.set('hstarsV',2); }
const starsOf=id=>HSTARS[String(id)]||0;
// what the fire chords ask for while you work on the next star: 0 none, 1 the 3rd, 2 the 3rd or 5th, 3 the 3rd, 5th or 7th
const fireLevel=id=>Math.max(0,Math.min(3,starsOf(id)-1));
const FIRE_LABEL={3:'3rd in the bass',5:'5th in the bass',7:'7th in the bass'};
function fireFor(t,lvl){
  const q=t.q; if(q.bass!=null) return null;   // slash chords already say their bass
  const iv={3:q.ct.find(x=>x===3||x===4),5:q.ct.find(x=>x>=6&&x<=8),7:q.ct.find(x=>x===10||x===11)??(q.id==='dim7'?9:undefined)};
  const kinds=[3,5,7].slice(0,lvl).filter(k=>iv[k]!=null); if(!kinds.length) return null;
  const k=kinds[Math.floor(Math.random()*kinds.length)], name=spellNote(60+mod12(t.root.pc+iv[k]),t.root,q).name;
  return {k,iv:iv[k],name};
}
const STAR_IDS=()=>[...STAGES.map(s=>String(s.n)),...PROGS.map(p=>'p:'+p.id),'p:mix'];
function runStars(){
  if(G.practice||G.kills<STAR_RUN) return 0;
  const tries=G.kills+G.escapes;
  if(!tries||G.firstTry/tries<0.9) return 1;
  if(!G.fireLvl||G.fireCleared<FIRE_RUN) return 2;
  if(G.fireLvl<3) return G.fireLvl+2;
  return G.tier.bpm>=240&&G.escapes===0?5:4;
}
function checkStars(){
  const n=runStars(), id=String(stageN);
  if(n>starsOf(id)){ HSTARS[id]=n; store.set('hstars',HSTARS); starToast(n); }
}
function starToast(n){
  const el=document.createElement('div'); el.className='pop startoast';
  el.style.left='50%'; el.style.top=(STRIP+30)+'px';
  el.innerHTML=`<b>${starStr(n,STAR_MAX)}</b><span>New star on this ${isProgStage()?'progression':'stage'}</span>`;
  $('lane').appendChild(el); setTimeout(()=>el.remove(),2300);
}
// "Next up" on the menu: the first thing in a J-pop band keys order that still has stars to earn
const NEXT_ORDER=['1','2','p:royal','p:axis','p:komuro','6','p:canon','p:marusa','p:passdim','p:minorIV','p:turnI','p:turnIII','3','4','p:iiVI','p:backdoor','p:cliche','p:iiVIm','5','7','p:mix'];
function nextUp(){ for(let need=1;need<=STAR_MAX;need++){ const id=NEXT_ORDER.find(x=>starsOf(x)<need); if(id) return id; } return null; }
function nextChords(){
  const st=stageN;
  // Smart mix: weak chord-in-key pairs come up more, and so does every chord in a shaky key
  const kw=opts.smart?[...Array(12).keys()].map(p=>keyWeight(p,'hands')):null;
  if(isProgStage()){
    const p=st==='p:mix'?PROGS[Math.floor(Math.random()*PROGS.length)]:PROG[st.slice(2)];
    let key=Math.floor(Math.random()*12);
    if(opts.smart){ // lean on shaky keys, and on keys where this progression's chords are weak
      const keys=[...Array(12).keys()].map(k=>{ const ch=progChords(p,k); return {k,w:kw[k]*ch.reduce((a,c)=>a+weightOf(c.q.id,c.root.pc),0)/ch.length}; });
      key=weightedPick(keys).k;
    }
    const label=`${p.short} in ${keyName(key,!!p.minor)}`;
    return progChords(p,key).map(c=>({...c,prog:label}));
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
  const t={root:c.root,q:c.q,suf:pickSuf(c.q),rn:c.rn||null,prog:c.prog||null,req:null};
  // fire chords: about one in three, never more than three plain chords in a row
  if(G&&G.fireLvl){ G.fireGap=(G.fireGap||0)+1; if(G.fireGap>3||Math.random()<0.28){ const f=fireFor(t,G.fireLvl); if(f){ t.fire=f; G.fireGap=0; return t; } } }
  if(Math.random()<0.25){
    const list=requestsFor(t,{rootless:opts.rootless,sequence:isProgStage()});
    if(G.practice||G.tier.bpm<=120) list.push('byear','byear');
    t.req=list[Math.floor(Math.random()*list.length)];
  }
  return t;
}
function fillQueue(){ while(G.queue.length<3) nextChords().forEach(c=>G.queue.push(withReq(c))); }
/* By-ear chords: heard once when they appear, then repeated while they're the target, so your hands can stay on the keys.
   Game mode repeats on the beat grid every 1, 2 or 4 bars (about every 3-4 s); Practice every 4 seconds.
   Both run off the metronome's audio clock so the timing stays steady. */
let earBus=null;
const byEarVoice=t=>t.voice||(t.voice=voiceChord(t.q,t.root.pc,'close')); // same voicing every time
function playByEar(t){ killBus(earBus); earBus=newBus(); if(earBus) playChord(byEarVoice(t),now()+0.05,1.6,'epiano',earBus,85); }
function stabByEar(t,when,dur){
  if(!opts.sound||!synth.ctx) return;
  if(!earBus) earBus=newBus();
  if(earBus) playChord(byEarVoice(t),when,dur,'epiano',earBus,72);
}
const byEarTarget=()=>{ const e=G&&G.enemies[0]; return e&&e.t.req==='byear'?e:null; };
const byEarStride=bpm=>4*(bpm<=90?1:bpm<=180?2:4); // in beats: every 1, 2 or 4 bars, about 3-4 s at any tempo
function stopByEar(){ killBus(earBus); earBus=null; }
function symHTML(t){
  const acc=ACC[t.root.a];
  // By ear: the root is shown (naming a root from nothing needs perfect pitch); the chord type is what you hear
  if(t.req==='byear') return `<span class="rt">${LETTERS[t.root.l]}</span>${acc?`<span class="ac">${acc}</span>`:''}<span class="sf q">?</span>`;
  const suf=(t.suf??t.q.suf).replace(/[♭♯]/g,'<span class="g acc">$&</span>').replace(/[°ø]/g,'<span class="g qual">$&</span>');
  const sl=t.q.bass!=null?`<span class="sl">/${bassNote(t)}</span>`:'';
  return `<span class="rt">${LETTERS[t.root.l]}</span>${acc?`<span class="ac">${acc}</span>`:''}${suf?`<span class="sf">${suf}</span>`:''}${sl}`;
}
function renderAhead(){
  // In Progressions, name the progression and key of the chord you're on
  const cur=(G.enemies[0]&&G.enemies[0].t)||G.queue[0], lbl=cur&&cur.prog?cur.prog:'Coming up';
  $('ahead').innerHTML=`<span class="lbl">${lbl}</span>`+G.queue.slice(0,2).map(t=>`<span class="sym">${symHTML(t)}</span>`).join('');
}
const fallTime=()=>BEATS_PER_CHORD*60/G.bpm;

function newGame(){
  const practice=mode==='practice', tier=tierOf(tierId);
  G={running:false,paused:false,practice,tier,bpm:tier.bpm,cap:practice?1:tier.cap,
     score:0,combo:0,maxCombo:0,wave:1,kills:0,lives:practice?Infinity:tier.lives,enemies:[],queue:[],
     cool:0.3,sinceSpawn:99,prev:null,attempts:0,fails:0,hints:0,best:null,escaped:{},missed:{},times:[],slow:[],
     lastSym:null,firstTry:0,escapes:0,raf:0,last:0,id:0,fireLvl:fireLevel(stageN),fireGap:0,fireCleared:0};
  $('lane').querySelectorAll('.enemy,.pop,.shot').forEach(n=>n.remove());
  fillQueue(); renderAhead(); updateHud();
}
function start(){
  document.body.classList.remove('earsmode','nohud');
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
  el.innerHTML=symHTML(t)+(t.rn&&req!=='byear'?`<span class="prog">${t.rn}</span>`:'')+(req?`<span class="req">${REQ_LABEL[req]} ×2</span>`:'')
    +(t.fire?`<span class="req firelab">🔥 ${FIRE_LABEL[t.fire.k]} ×3</span>`:'');
  if(t.fire) el.classList.add('fire');
  if(req==='byear') setTimeout(()=>playByEar(t),150);
  el.style.rotate=((Math.random()*5-2.5).toFixed(1))+'deg';
  $('lane').appendChild(el);
  const laneW=$('lane').clientWidth, w=el.offsetWidth;
  let x, tries=0;
  do{ x=12+Math.random()*Math.max(10,laneW-w-24); tries++; } while(tries<12 && G.enemies.some(e=>Math.abs(e.x-x)<w*0.9));
  const e={id:++G.id,t,el,x,tf:0,w,h:el.offsetHeight,born:performance.now(),misses:0,req};
  if(req==='byear') e.earFrom=(synth.ctx?synth.ctx.currentTime:0)+1.4; // beat repeats start after the first playback
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
    const e=G.enemies.shift(); e.el.remove(); renderAhead(); clearDraft(); if(e.t.req==='byear') stopByEar();
    const key=symText({root:e.t.root,q:e.t.q}); G.escaped[key]=(G.escaped[key]||0)+1; recordStat(e.t,'esc');
    G.lives--; G.escapes++; G.combo=0; G.prev=null; G.cool=Math.max(0.4,60/G.bpm);
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
  // a fire chord also needs its note at the bottom
  if(ev.ok&&e.t.fire&&mod12(Math.min(...notes)-e.t.root.pc)!==e.t.fire.iv){ ev.ok=false;
    const which=e.t.fire.k===3?'3rd':e.t.fire.k===5?'5th':'7th';   // you work out the note; it's named after a second miss
    ev.reasons=[e.misses?`Right notes, but the ${which}, ${e.t.fire.name}, has to be your lowest note.`:`Right notes, but this one is on fire: the ${which} has to be your lowest note.`]; }
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
  if(e.t.fire){ res.tags.push({t:`🔥 ${e.t.fire.name} in the bass`,p:res.total*2}); res.total*=3; G.fireCleared++; }
  if(!G.practice) res.total=Math.round(res.total*G.tier.mult);
  recordStat(e.t,'clear',(performance.now()-e.born)/1000,e.misses===0);
  G.score+=res.total; addXP(res.total/25); G.combo++; G.maxCombo=Math.max(G.maxCombo,G.combo); G.kills++; if(e.misses===0) G.firstTry++; checkStars();
  const secs=(performance.now()-e.born)/1000;
  G.times.push(secs); G.slow.push({sym:symText(e.t),secs});
  G.prev=ev.per.map(p=>p.midi);
  if(!G.best||res.total>G.best.total) G.best={total:res.total,sym:symText(e.t),notes:ev.per.map(p=>p.spell.name),tags:res.tags.filter(t=>t.p>0&&t.t!=='Quick').map(t=>t.t)};
  if(!G.practice && G.kills%8===0){ G.wave++; G.bpm+=G.tier.step; }
  G.enemies.shift(); renderAhead(); if(e.t.req==='byear') stopByEar();
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
// In Practice the clock still runs, at one slow 4 s 'beat', only to repeat by-ear chords (no hi-hat, no pulse)
const metro={timer:null,next:0,beat:0,
  beatLen(){ return G.practice?4:60/G.bpm; },
  start(){
    this.stop(); if(!G) return;
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
      if(opts.metro && !G.practice && c && c.state==='running' && (b===1||b===3)) hat(this.next);
      const be=byEarTarget(), st=G.practice?1:byEarStride(G.bpm);
      if(be && c && c.state==='running' && this.beat%st===0 && this.next>(be.earFrom||0)) stabByEar(be.t,this.next,Math.min(1.2,0.85*60/G.bpm*(G.practice?4:st)));
      setTimeout(()=>pulse(b),Math.max(0,(this.next-now)*1000));
      this.next+=this.beatLen(); this.beat++;
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
function hideOv(){ clearDraft(); ['startOv','pauseOv','overOv','progOv'].forEach(i=>$(i).hidden=true); document.body.classList.remove('menu'); }
function gameOver(){ clearDraft();
  G.running=false; G.paused=false; cancelAnimationFrame(G.raf); metro.stop(); stopByEar();
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
    : `<div><b>${G.score.toLocaleString()}</b>score</div><div><b>${G.kills}</b>chords cleared</div><div><b>${acc}%</b>of attempts correct</div><div><b>${G.bpm}</b>tempo reached</div><div><b>${G.maxCombo}</b>best combo</div><div><b class="stars">${starStr(starsOf(stageN),STAR_MAX)}</b>stars here</div>`;
  $('bestV').innerHTML=G.best?`<div class="sym">${G.best.sym}</div><div>${G.best.notes.join(' ')}, worth ${G.best.total}${G.best.tags.length?`. ${G.best.tags.join(', ')}.`:''}</div>`:'<div>No chords cleared this time.</div>';
  let weak='';
  if(G.practice){
    const slow=[...G.slow].sort((a,b)=>b.secs-a.secs).slice(0,3);
    if(slow.length) weak=`Slowest: ${slow.map(s=>`${s.sym} (${s.secs.toFixed(1)}s)`).join(', ')}.`;
  }
  const trouble={}; Object.entries(G.escaped).forEach(([k,v])=>trouble[k]=(trouble[k]||0)+v*2); Object.entries(G.missed).forEach(([k,v])=>trouble[k]=(trouble[k]||0)+v);
  const top=Object.entries(trouble).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);
  if(top.length) weak+=(weak?' ':'')+`Most missed: ${top.join(', ')}.`;
  if(!G.practice&&G.fireCleared) weak+=(weak?' ':'')+`🔥 chords cleared: ${G.fireCleared}.`;
  if(!G.practice&&starsOf(stageN)<STAR_MAX) weak+=(weak?' ':'')+`Next star: ${STAR_GOALS[starsOf(stageN)]}`;
  $('weak').textContent=weak;
  $('overOv').hidden=false; $('againBtn').focus();
  renderMenu();
}

