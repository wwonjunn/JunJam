/* Voicings: Comp Hero. You're the keys player in the band. A real chart from Gig plays (bass and drums), its chords
   scroll toward the hit line as cards, and you land a two-hand voicing on each one as it arrives. Each card asks for a
   kind of voicing (rootless, five notes, spread wide, a different one from your last, one of the named ones),
   never a name you have to remember; when what you play is in the library the game tells you its name, so the names
   come to you. Timing: perfect, good or late; miss the chord altogether and the band loses heart. Smooth voice
   leading (moving your hands as little as possible) scores a bonus. The band meter empties on misses: at zero the
   band walks off. Finish the song to clear it. The Rush and the voicing cards stay as they were (Classic). */
let CHDATA=store.get('comphero',{best:{},stars:{},song:'b:autumn-leaves',diff:'normal'});
const saveCh=()=>store.set('comphero',CHDATA);
const CH={active:false};
const CH_DIFF={easy:{name:'Easy',tempo:0.6,max:96,tags:{any:7,wide:3}},normal:{name:'Normal',tempo:0.8,max:132,tags:{any:3,tension:2,rootless:2,five:2,wide:2}},
  hard:{name:'Hard',tempo:1,max:200,tags:{tension:2,rootless:2,five:2,wide:1,diff:2,named:2}}};
const CH_TAG={any:'any voicing',tension:'with a 9, 11 or 13',rootless:'rootless',five:'5 notes or more',wide:'spread wide',diff:'not your last shape',named:'a named one'};
const CH_SETTLE=SETTLE/1000;   // a chord is read once your hands settle; its time is when they landed
const chSongs=()=>GIG_BUILTIN.filter(s=>gigTimeline(s).some(b=>b.chords.some(c=>c.c)));

/* ---------------- menu card (Voicings pane) ---------------- */
function chPaneHTML(){
  const songs=chSongs(), cur=CHDATA.song, b=CHDATA.best[cur+':'+CHDATA.diff];
  const groups=GIG_GENRES.filter(g=>g[0]!=='all').map(([g,n])=>{ const ss=songs.filter(s=>s.genre===g); return ss.length?`<optgroup label="${n}">${ss.map(s=>`<option value="${s.id}"${s.id===cur?' selected':''}>${trEsc(s.title)}${CHDATA.stars[s.id]?' '+'★'.repeat(CHDATA.stars[s.id]):''}</option>`).join('')}</optgroup>`:''; }).join('');
  return `<div class="vcrush chcard"><div><b>Comp Hero</b><span>You're the keys player. A real chart plays with bass and drums; land a two-hand voicing on every chord as it reaches the line. Each card asks for a kind of voicing, and when you play a named one, it tells you which. Miss chords and the band walks off.</span></div>
    <div class="vcrushgo"><select id="chSong">${groups}</select><div class="seg" role="group">${Object.entries(CH_DIFF).map(([k,d])=>`<button data-chd="${k}" aria-pressed="${CHDATA.diff===k}">${d.name}</button>`).join('')}</div>
    <button class="go" id="chGo">Play</button>${b?`<span class="fine">Best ${b.toLocaleString()}</span>`:''}</div></div>`;
}
function chBindPane(P){
  P.querySelectorAll('[data-chd]').forEach(x=>x.onclick=e=>{ e.stopPropagation(); CHDATA.diff=x.dataset.chd; saveCh(); renderVoicingsPane(); });
  const sel=P.querySelector('#chSong'); if(sel) sel.onchange=e=>{ e.stopPropagation(); CHDATA.song=sel.value; saveCh(); renderVoicingsPane(); };
  const go=P.querySelector('#chGo'); if(go) go.onclick=e=>{ e.stopPropagation(); chStart(CHDATA.song); };
}

/* ---------------- the run ---------------- */
function chStart(id){
  chStop(); synth.init(); drumsInit();
  const song=gigById(id)||chSongs()[0], D=CH_DIFF[CHDATA.diff], bpm=Math.round(Math.min(D.max,song.tempo*D.tempo)), spb=60/bpm;
  const cards=[]; gigTimeline(song).forEach((bar,bi)=>bar.chords.forEach(ch=>{ if(!ch.c) return; const q=Q[ch.c.qid]; if(!q) return;
    cards.push({bi,beat:ch.at,dur:ch.dur,c:ch.c,q,sym:rootName(ch.c.root)+ch.c.suf+(ch.c.bass?'/'+rootName(ch.c.bass):''),state:'up'}); }));
  const t0=now()+2*song.beats*spb+0.3;   // two bars of count-in
  cards.forEach((k,i)=>{ k.t=t0+k.beat*spb; k.end=k.t+k.dur*spb; k.tag=chPickTag(k,D,i); });
  Object.assign(CH,{active:true,mode:'run',song,D,bpm,spb,t0,cards,cur:0,meter:0.6,score:0,combo:0,best:0,hits:{perfect:0,good:0,late:0,miss:0},tagsMet:0,named:{},prev:null,prevShape:null,parts:[],pops:[],shake:0});
  CH.tEnd=cards.length?cards[cards.length-1].end:t0;
  hideOv(); document.body.classList.add('nohud','vcmode'); document.body.classList.remove('menu'); $('voiceStage').hidden=false; $('modetag').textContent='Voicings: Comp Hero';
  $('vcBody').innerHTML=`<div id="chHead"></div><canvas class="chcv" id="chCv"></canvas><div class="lmsg" id="chMsg"></div><p class="fine">Esc ends the song. Play a little early: a chord counts from when your hands land.</p>`;
  $('staff').innerHTML=staffSVG([],[]); $('verdict').className='verdict'; $('verdict').textContent=`${song.title}, ♩ = ${bpm}`; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
  kbMarks={}; paintKeys(); chHead();
  CH.cv=$('chCv'); CH.ctx=CH.cv.getContext('2d'); chSize();
  chBand(); CH.tick=setInterval(chLogic,40); const loop=()=>{ CH.raf=requestAnimationFrame(loop); chDraw(); }; CH.raf=requestAnimationFrame(loop);
}
// what each card asks for: only asks that make sense for that chord (a triad can't be rootless or have a 13)
function chPickTag(k,D,i){
  const ok=t=>t==='rootless'?k.q.rootless&&!k.c.bass:t==='tension'?k.q.ext.length+k.q.req.filter(x=>!k.q.ct.includes(x)).length>0:t==='named'?VOICINGS.some(v=>v.qid===k.c.qid):t==='diff'?i>0:true;
  const pool=Object.entries(D.tags).filter(([t])=>ok(t)); if(!pool.length) return 'any';
  return weightedPick(pool.map(([t,w])=>({t,w}))).t;
}
function chStop(){ clearInterval(CH.tick); cancelAnimationFrame(CH.raf); clearInterval(CH.bandT); killBus(CH.bus); CH.bus=null; }
// the band: bass on each chord's root (or slash note), and the simple beat; no keys, that's you
function chBand(){
  const R=CH, bus=R.bus=newBus(); if(!bus) return; const s=R.song; let bar=-2;
  const bars=Math.ceil((R.tEnd-R.t0)/(s.beats*R.spb));
  const sched=()=>{ if(!R.active||R.mode!=='run') return;
    while(bar<=bars&&R.t0+bar*s.beats*R.spb<now()+0.3){ const t=R.t0+bar*s.beats*R.spb;
      if(bar<0) for(let k=0;k<s.beats;k++) drumHit(k===0?'kick':'hat',t+k*R.spb,k===0?0.9:0.6,bus);   // count-in
      else { beatBar(t,R.spb,s.beats,{bar},bus,{hat:false});
        R.cards.filter(c=>c.bi===bar).forEach(c=>{ const b=c.c.bass||c.c.root; tone(36+mod12(b.pc-36),c.t,Math.min(c.dur*R.spb*0.95,2.4),84,'bass',bus); }); }
      bar++; } };
  sched(); R.bandT=setInterval(sched,50);
}
function chSize(){ const R=CH; if(!R.cv) return; const r=R.cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1); R.dpr=d; R.W=Math.max(300,r.width); R.H=Math.max(140,r.height); R.cv.width=R.W*d; R.cv.height=R.H*d; }
addEventListener('resize',()=>{ if(CH.active) chSize(); });
function chHead(){ const R=CH, h=$('chHead'); if(!h) return; const n=R.cards.length, done=R.cards.filter(c=>c.state!=='up'&&c.state!=='on').length;
  h.innerHTML=`<div class="etop"><span class="etitle">${trEsc(R.song.title)}</span><span>${R.D.name} · ♩ = ${R.bpm}</span><span>Score <b>${R.score.toLocaleString()}</b></span><span>Combo <b>${R.combo}</b></span><span>${done} of ${n}</span></div>
    <div class="chmeter"><span>Band</span><i style="width:${Math.round(R.meter*100)}%" class="${R.meter<0.25?'low':R.meter>0.8?'high':''}"></i></div>`; }

/* ---------------- reading what you play ---------------- */
const chShape=ns=>{ const s=[...new Set(ns)].sort((a,b)=>a-b); return s.map(m=>m-s[0]).join(','); };
// Is it this chord? Slash chords want their bass note at the bottom; the rest is read as the chord above it.
function chValid(k,notes){
  const s=[...new Set(notes)].sort((a,b)=>a-b); if(s.length<3) return false;
  const root=k.c.root; let up=s;
  if(k.c.bass){ if(mod12(s[0]-k.c.bass.pc)!==0) return false; if(k.q.ct.includes(mod12(s[0]-root.pc))) up=s; else up=s.slice(1); }   // C/E: E is a chord tone anyway; C/D: read the chord above the D
  return evaluate(up,{root,q:k.q},{rootless:true,weird:false}).ok;
}
function chNamed(k,notes){ for(const v of VOICINGS){ const t=vcIn(v,k.c.root.pc); if(vcGrade(t,notes).ok) return v; } return null; }
function chTagMet(tag,k,notes,named){
  const s=[...new Set(notes)].sort((a,b)=>a-b), ivs=s.map(m=>mod12(m-k.c.root.pc));
  if(tag==='any') return true;
  if(tag==='rootless') return !ivs.includes(0);
  if(tag==='five') return s.length>=5;
  if(tag==='wide') return s[s.length-1]-s[0]>=19;
  if(tag==='tension') return ivs.some(iv=>!k.q.ct.includes(iv)&&iv!==0);
  if(tag==='diff') return chShape(s)!==CH.prevShape;
  if(tag==='named') return !!named;
  return true;
}
// how far your hands moved from the last voicing: each note to the nearest note of the last one, averaged
function chMove(prev,notes){ if(!prev) return null; return notes.reduce((a,m)=>a+Math.min(...prev.map(p=>Math.abs(p-m))),0)/notes.length; }
function chNotes(notes){
  const R=CH; if(!R.active) return;
  if(R.mode==='over'){ if(notes.length>=3) chStart(R.song.id); return; }   // any chord: play it again
  if(R.mode!=='run') return;
  const at=now()-CH_SETTLE, beat=R.spb;
  // the card you're aiming at: the first one not yet played whose window (half a beat early to its end) holds this moment
  const k=R.cards.find(c=>(c.state==='up'||c.state==='on')&&at>=c.t-beat*0.75&&at<c.end);
  if(!k) return;
  if(!chValid(k,notes)){ chFlash(`Not ${k.sym} yet`,'no'); return; }
  const named=chNamed(k,notes), met=chTagMet(k.tag,k,notes,named), dt=at-k.t;
  const grade=Math.abs(dt)<=0.12?'perfect':Math.abs(dt)<=beat*0.5?'good':'late';
  const mv=chMove(R.prev,[...new Set(notes)]), smooth=mv!=null&&mv<=2;
  R.combo++; R.best=Math.max(R.best,R.combo); R.hits[grade]++; if(met) R.tagsMet++; if(named) R.named[named.id]=(R.named[named.id]||0)+1;
  const mult=1+Math.min(2,R.combo*0.05), pts=Math.round(({perfect:300,good:200,late:100}[grade]+(met&&k.tag!=='any'?150:0)+(named?100:0)+(smooth?60:0))*mult);
  R.score+=pts; R.meter=Math.min(1,R.meter+({perfect:0.06,good:0.045,late:0.02}[grade])*(met?1:0.5));
  Object.assign(k,{state:'hit',grade,met,named,pts,hitAt:now()}); R.prev=[...new Set(notes)]; R.prevShape=chShape(notes);
  chBurst(k); chHead();
  const bits=[{perfect:'Perfect',good:'Good',late:'Late'}[grade],named?named.name:null,k.tag!=='any'?(met?`✓ ${CH_TAG[k.tag]}`:`✗ not ${CH_TAG[k.tag]}`):null,smooth?'smooth':null].filter(Boolean);
  chFlash(`${k.sym}: ${bits.join(' · ')}  +${pts}`,met?'ok':'');
  kbMarks={}; R.prev.forEach(m=>kbMarks[m]=met?'k-chord':'k-tension'); paintKeys();
}
function chLogic(){
  const R=CH; if(!R.active||R.mode!=='run') return; const t=now();
  R.cards.forEach(c=>{ if(c.state==='up'&&t>=c.t) c.state='on';
    if((c.state==='up'||c.state==='on')&&t>=c.end){ c.state='miss'; c.missAt=t; R.combo=0; R.hits.miss++; R.meter-=0.14; R.shake=8; chHead(); chFlash(`Missed ${c.sym}`,'no');
      if(R.meter<=0){ R.meter=0; chOver(false); } } });
  if(R.mode==='run'&&t>R.tEnd+0.6) chOver(true);
}
function chFlash(text,cls){ const m=$('chMsg'); if(m){ m.textContent=text; m.className='lmsg'+(cls?' '+cls:''); } }

/* ---------------- drawing the highway ---------------- */
const CH_PX=150;   // pixels per second of music
function chBurst(k){ const R=CH, x=R.hitX||110, y=R.H*0.5, cols=k.grade==='perfect'?['#ffd23f','#fff3b0','#ffb347']:['#7fd3ff','#b8f2e6','#ffffff'];
  for(let i=0;i<(k.grade==='perfect'?28:16);i++){ const a=Math.random()*7, s=80+Math.random()*220; R.parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:0.6,max:0.6,col:cols[i%cols.length]}); }
  if(k.named) R.pops=[{text:k.named.name+'!',x:x+20,y:y-46,t0:now(),col:'#ffd23f'}]; }   // one name at a time
function chDraw(){
  const R=CH, c=R.ctx; if(!c) return; const t=now(), W=R.W, H=R.H, hx=R.hitX=Math.max(90,W*0.18), dt=1/60;
  c.setTransform(R.dpr,0,0,R.dpr,0,0); c.save(); if(R.shake>0.3){ c.translate((Math.random()-.5)*R.shake,0); R.shake*=0.88; }
  const bg=c.createLinearGradient(0,0,0,H); bg.addColorStop(0,'#141a36'); bg.addColorStop(1,'#232c5c'); c.fillStyle=bg; c.fillRect(0,0,W,H);
  // beat lines scroll with the music
  for(let b=Math.floor((t-R.t0)/R.spb)-2;;b++){ const x=hx+(R.t0+b*R.spb-t)*CH_PX; if(x>W) break; if(x<0) continue; const bar=b%R.song.beats===0;
    c.fillStyle=bar?'rgba(255,255,255,.16)':'rgba(255,255,255,.06)'; c.fillRect(x,8,bar?2:1,H-16); }
  // the cards
  R.cards.forEach(k=>{ const x0=hx+(k.t-t)*CH_PX, x1=hx+(k.end-t)*CH_PX; if(x1<-20||x0>W+20) return;
    const y=H*0.22, h=H*0.56, w=Math.max(40,x1-x0-6);
    let fill='rgba(255,255,255,.10)', edge='rgba(255,255,255,.35)', ink='#e9ecff';
    if(k.state==='on'){ fill='rgba(245,197,66,.20)'; edge='#f5c542'; }
    if(k.state==='hit'){ fill=k.met?'rgba(111,207,151,.28)':'rgba(127,211,255,.22)'; edge=k.grade==='perfect'?'#ffd23f':'#7fd3ff'; }
    if(k.state==='miss'){ fill='rgba(220,60,60,.18)'; edge='rgba(220,60,60,.7)'; ink='rgba(233,236,255,.45)'; }
    const pop=k.state==='hit'?Math.max(0,1-(t-k.hitAt)/0.25)*6:0;
    c.fillStyle=fill; c.strokeStyle=edge; c.lineWidth=2; chRound(c,x0+3-pop/2,y-pop/2,w+pop,h+pop,8); c.fill(); c.stroke();
    c.save(); c.beginPath(); c.rect(x0+3,y,w,h); c.clip();
    c.fillStyle=ink; c.font=`700 ${Math.min(30,h*0.42)}px Barlow Condensed, sans-serif`; c.textBaseline='top'; c.fillText(k.sym,x0+12,y+8);
    c.font=`600 13px Barlow Condensed, sans-serif`; c.fillStyle=k.state==='miss'?ink:k.tag==='any'?'rgba(233,236,255,.6)':'#f5c542'; c.fillText(k.state==='hit'&&k.named?k.named.name:CH_TAG[k.tag],x0+12,y+h-22);
    c.restore(); });
  // the hit line
  const glow=c.createLinearGradient(hx-14,0,hx+14,0); glow.addColorStop(0,'rgba(245,197,66,0)'); glow.addColorStop(0.5,'rgba(245,197,66,.35)'); glow.addColorStop(1,'rgba(245,197,66,0)');
  c.fillStyle=glow; c.fillRect(hx-14,0,28,H); c.fillStyle='#f5c542'; c.fillRect(hx-1.5,4,3,H-8);
  // count-in
  if(t<R.t0){ const left=Math.ceil((R.t0-t)/R.spb); c.fillStyle='rgba(255,255,255,.9)'; c.font='700 40px Barlow Condensed, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(left<=R.song.beats?String(left):'Get ready',W/2,H/2); c.textAlign='left'; }
  R.parts=R.parts.filter(p=>{ p.life-=dt; if(p.life<=0) return false; p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=200*dt; c.globalAlpha=p.life/p.max; c.fillStyle=p.col; c.fillRect(p.x-2,p.y-2,4,4); c.globalAlpha=1; return true; });
  R.pops=R.pops.filter(p=>{ const a=t-p.t0; if(a>1.2) return false; c.globalAlpha=Math.min(1,(1.2-a)*2); c.font='700 22px Barlow Condensed, sans-serif'; c.lineWidth=3; c.strokeStyle='rgba(10,12,30,.7)'; c.strokeText(p.text,p.x,p.y-a*30); c.fillStyle=p.col; c.fillText(p.text,p.x,p.y-a*30); c.globalAlpha=1; return true; });
  c.restore();
}
function chRound(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }

/* ---------------- the end ---------------- */
function chOver(finished,quit){
  const R=CH; if(R.mode!=='run') return; R.mode='over'; chStop(); clearDraft();
  const played=R.hits.perfect+R.hits.good+R.hits.late, reached=played+R.hits.miss, acc=reached?played/reached:0,   // of the chords that came by
     key=R.song.id+':'+CHDATA.diff, prev=CHDATA.best[key]||0;
  const stars=!finished?0:acc>=0.95&&R.tagsMet>=played*0.8?3:acc>=0.85?2:1;
  if(R.score>prev) CHDATA.best[key]=R.score; if(stars>(CHDATA.stars[R.song.id]||0)) CHDATA.stars[R.song.id]=stars;
  addXP(Math.round(R.score/80)+(finished?50:0)); saveCh();
  const names=Object.entries(R.named).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([id,k])=>`${gigAccHTML(VOICE[id].name)}${k>1?` ×${k}`:''}`);
  $('vcBody').innerHTML=`<h2>${finished?(stars===3?'Standing ovation':'Song done'):quit?'Song stopped':'The band walked off'}</h2>
    <div class="results"><div><b>${R.score.toLocaleString()}</b>score</div><div><b>${played} of ${reached}</b>chords landed</div><div><b>${R.hits.perfect}</b>perfect</div><div><b>${R.best}</b>best combo</div><div><b>${R.tagsMet}</b>asks met</div></div>
    ${finished?`<div class="stars eresults" style="margin:0"><span class="stars">${starStr(Math.max(stars,CHDATA.stars[R.song.id]||0))}</span></div>`:''}
    ${names.length?`<p>Named voicings you played: ${names.join(', ')}.</p>`:'<p>None of your voicings were ones from the library this time. Open a card in Voicings to pick up a named one.</p>'}
    <p class="fine">★ finish the song. ★★ land 85% of the chords. ★★★ 95%, and meet the ask on most of them. Best on ${CH_DIFF[CHDATA.diff].name}: ${Math.max(prev,R.score).toLocaleString()}.</p>
    <p class="arcagain"><b>Play any chord to go again.</b></p>
    <div class="erow"><button class="go" id="chAgain">Again</button><button class="ghost" id="chMenu">Back to Voicings</button></div>`;
  $('chAgain').onclick=()=>chStart(R.song.id); $('chMenu').onclick=chToMenu;
  kbMarks={}; paintKeys();
}
function chToMenu(){ chStop(); CH.active=false; clearDraft(); $('voiceStage').hidden=true; document.body.classList.remove('vcmode');
  side='voicings'; $('startOv').hidden=false; document.body.classList.add('menu'); kbMarks={}; paintKeys(); renderMenu(); }
function chKey(e){ if(!CH.active) return false; if(e.key==='Escape'){ CH.mode==='run'?chOver(false,true):chToMenu(); return true; } return false; }
