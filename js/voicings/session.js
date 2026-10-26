/* Voicings: learn a named voicing from its card, play it in C and then five more keys from memory (the same learn →
   transfer pattern as Lines and Reharm), then Rush: a timed game that calls out a chord and a voicing name, and
   often asks for the same chord two or three different ways in a row, so the shapes stick as different answers to
   one question. Graded strictly: the exact notes, in the exact layout, in any octave (hands an octave further apart
   or closer is fine). Two hands, so a MIDI keyboard. */
let VCDATA=store.get('voicings',{stars:{},best:{},pool:'learned',fam:'all'});
const saveVc=()=>store.set('voicings',VCDATA);
const VC={active:false};
const VC_KEYS=5, VC_LIVES=3;
// 💚 life voicings in Rush and the bosses: about one in 16, a ●●● voicing with no formula and no shape. Play it in time
// and win a life back (a bonus if you're full); run out of time and nothing's lost.
const VC_LIFE_EVERY=16;
/* Bosses: a gauntlet after every three or four chord types (every voicing of those types once, each in a new key, three
   lives, the Rush clock; a miss comes back later), a chapter boss for each family of chords, and the final boss: all of
   them. Beat one for its 👑. */
const VCHAPTERS=[
  {id:'tri',name:'Triads and colours',bosses:[['maj','min','sus2','sus4'],['dim','aug','add9','madd9']]},
  {id:'maj',name:'Major sevenths',bosses:[['maj7','six','six9'],['maj9','maj13','mj7s11','mj7s5']]},
  {id:'min',name:'Minor and diminished',bosses:[['min7','min6','min69'],['min9','min11','min13'],['mmaj7','hdim','dim7']]},
  {id:'dom',name:'Dominants',bosses:[['dom7','dom9','dom13'],['sus7','sus9','sus13','susb9'],['d7b9','d13b9','d7s9','alt'],['d7b13','d7s5','d7s11','d13s11']]},
  {id:'slash',name:'Slash chords',bosses:[]},
];
VCDATA.boss=VCDATA.boss||{};
// every boss: {id, name, types, kind}
const VBOSSES=[...VCHAPTERS.flatMap(ch=>[...ch.bosses.map((t,i)=>({id:`${ch.id}${i+1}`,name:`Boss: ${t.map(q=>({'':'major',m:'minor'})[vcSym(vcIn(VOICINGS.find(v=>v.qid===q),0)).replace(/^C/,'')]??vcSym(vcIn(VOICINGS.find(v=>v.qid===q),0)).replace(/^C/,'')).join(', ')}`,types:t,kind:'boss',after:t[t.length-1]})),
  {id:ch.id,name:`Chapter boss: ${ch.name}`,types:VTYPES.filter(q=>ch.id==='slash'?q.includes('_'):ch.bosses.flat().includes(q)),kind:'chapter'}]),
  {id:'final',name:'Final boss: every voicing',types:VTYPES,kind:'final'}];
VBOSSES.filter(b=>b.kind==='chapter').forEach(b=>b.after=b.types[b.types.length-1]);
const vcBossCard=b=>`<button class="lick vcboss ${b.kind}" data-vboss="${b.id}"><span class="ln">${b.kind==='final'?'😈 Final boss':b.kind==='chapter'?'👑 Chapter boss':'👹 Boss'}${VCDATA.boss[b.id]?' · beaten 👑':''}</span><span class="lt">${gigAccHTML(b.name.replace(/^(Chapter |Final )?[Bb]oss: /,''))}</span><span class="lst">${VOICINGS.filter(v=>b.types.includes(v.qid)).length} voicings, once each, three lives</span></button>`;

/* ---------------- menu pane ---------------- */
const vcStarTotal=()=>VOICINGS.reduce((a,v)=>a+(VCDATA.stars[v.id]||0),0);
// The hand formula next to a voicing's name, until you've earned ★★ on it: the shape first, the name comes with time
const vcCue=v=>(VCDATA.stars[v.id]||0)<2?`<em class="vcf">${vcHands(v)}</em>`:'';
const vcHands=v=>{ const t=vcIn(v,0), lab=ns=>ns.map(m=>gigAccHTML(vcLab(t,m))).join(' '); return `L ${lab(t.lh)} · R ${lab(t.rh)}`; };
const VC_POOLS={learned:'Voicings you\'ve learned',starter:'Starter set (the easy ones)',all:'Everything'};
function vcPool(){
  const p=VCDATA.pool, learned=VOICINGS.filter(v=>VCDATA.stars[v.id]);
  if(p==='all') return VOICINGS; if(p==='starter') return VOICINGS.filter(v=>v.diff===1);
  if(VFAM[p]) return VOICINGS.filter(v=>v.fam===p);
  return learned.length>=4?learned:VOICINGS.filter(v=>v.diff===1);
}
function renderVoicingsPane(){
  const fam=VCDATA.fam||'all', learned=VOICINGS.filter(v=>VCDATA.stars[v.id]).length;
  const list=VTYPES.map(qid=>{ const vs=VOICINGS.filter(v=>v.qid===qid&&(fam==='all'||v.fam===fam)); if(!vs.length) return '';
    const sym=vcSym(vcIn(vs[0],0))+(qid==='maj'?' major':'');
    return `<div class="vctype" data-qid="${qid}"><div class="sec">${gigAccHTML(sym)} <span>${vs.length} way${vs.length>1?'s':''}</span></div><div class="licks">${vs.map(v=>
      `<button class="lick" data-vc="${v.id}"><span class="ln">${VFAM[v.fam]} · ${'●'.repeat(v.diff)}${'○'.repeat(3-v.diff)}${vcWide(v)?' · <b class="vcw" title="Two octaves or more from the lowest note to the highest: counts for Comp Hero\'s over-two-octaves ask">2 oct+</b>':''}</span><span class="lt">${gigAccHTML(v.name)}</span><span class="lst"><b>${starStr(VCDATA.stars[v.id]||0)}</b>${vcHands(v)}</span></button>`).join('')}</div></div>`; });   // one per chord type (bosses go in after)
  const best=VCDATA.best[VCDATA.pool];
  const withBosses=fam==='all'?VTYPES.map((qid,i)=>{ const html=list[i]||''; const bs=VBOSSES.filter(b=>b.after===qid); return html+(bs.length?`<div class="licks vcbosses">${bs.map(vcBossCard).join('')}</div>`:''); }).join('')+`<div class="licks vcbosses">${vcBossCard(VBOSSES[VBOSSES.length-1])}</div>`:list.join('');
  $('voicingsPane').innerHTML=`<button class="back" data-home>← All modes</button><h2>Voicings</h2>
    <p>The same chord, many ways: ${VOICINGS.length} named voicings over ${VTYPES.length} chord types, written for two hands so they fill the keyboard. Each hand stays within a reach of about a 9th to a 10th. Learn one from its card, play it in six keys, then put it under pressure in Rush. ${vcStarTotal()} of ${VOICINGS.length*3} stars.</p>
    ${chPaneHTML()}
    <div class="vcrush"><div><b>Rush <span class="fine">classic</span></b><span>A chord and a voicing name; play it before the bar runs out. Often the same chord two or three ways in a row. Miss one and it shows you, you play it, and it comes back a few chords later. Three lives.</span></div>
      <div class="vcrushgo"><select id="vcPool">${Object.entries(VC_POOLS).map(([k,n])=>`<option value="${k}"${VCDATA.pool===k?' selected':''}>${n}${k==='learned'?`: ${learned}${learned<4?', so the starter set for now':''}`:''}</option>`).join('')}${Object.entries(VFAM).map(([k,n])=>`<option value="${k}"${VCDATA.pool===k?' selected':''}>${n} only</option>`).join('')}</select>
      <button class="go" id="vcRushBtn">Start Rush</button>${best?`<span class="fine">Best ${best.toLocaleString()}</span>`:''}</div></div>
    <div class="seg vcfam" role="group" aria-label="Family"><button data-fam="all" aria-pressed="${fam==='all'}">All</button>${Object.entries(VFAM).map(([k,n])=>`<button data-fam="${k}" aria-pressed="${fam===k}">${n}</button>`).join('')}</div>
    ${withBosses}
    <p class="fine" style="margin-top:12px">● to ●●● is how hard the shape is. ★ learn it in C. ★★ four of the five new keys right first time without showing the shape. ★★★ all five. A MIDI keyboard is needed: these are two-hand chords.</p>`;
  chBindPane($('voicingsPane'));
}
function bindVoicingsPane(){
  $('voicingsPane').onclick=e=>{ const b=e.target.closest('button'); if(!b||b.dataset.chd||b.id==='chGo') return;
    if(b.dataset.vboss) vcBossStart(b.dataset.vboss);
    else if(b.dataset.vc) vcOpen(b.dataset.vc);
    else if(b.dataset.fam){ VCDATA.fam=b.dataset.fam; saveVc(); renderVoicingsPane(); }
    else if(b.id==='vcRushBtn') vcRushStart(); };
  $('voicingsPane').onchange=e=>{ if(e.target.id==='chSong') return; if(e.target.id==='vcPool'){ VCDATA.pool=e.target.value; saveVc(); renderVoicingsPane(); } };
}

/* ---------------- drawing a voicing ---------------- */
// A small keyboard from the C below the lowest note to the B above the highest, left hand and right hand in two colours,
// each note labelled with its degree. show=false draws the empty keys (the shape hidden).
function vcDiagram(t,show=true){
  const lo=t.notes[0]-mod12(t.notes[0]), hi=t.notes[t.notes.length-1]+11-mod12(t.notes[t.notes.length-1]);
  const W=15, H=64, BWd=9, BHt=40; let x=0, wh=[], bl=[];
  for(let m=lo;m<=hi;m++){ if(!isBlack(m)){ wh.push({m,x}); x+=W; } else bl.push({m,x:x-BWd/2}); }
  const hand=m=>!show?null:t.lh.includes(m)?'lh':t.rh.includes(m)?'rh':null;
  let s=`<svg class="vcdia" viewBox="0 -28 ${x} ${H+30}" preserveAspectRatio="xMidYMid meet" aria-label="The voicing on a keyboard">`;
  wh.forEach(k=>{ const h=hand(k.m); s+=`<rect class="vw${h?' '+h:''}" x="${k.x+.5}" y="0" width="${W-1}" height="${H}" rx="2"/>`; if(k.m%12===0) s+=`<text class="voct" x="${k.x+W/2}" y="${H-4}">C${k.m/12-1}</text>`; });
  bl.forEach(k=>{ const h=hand(k.m); s+=`<rect class="vb${h?' '+h:''}" x="${k.x}" y="0" width="${BWd}" height="${BHt}" rx="1.5"/>`; });
  let px=-99, up=false;   // labels of neighbouring keys take turns on two rows
  if(show) t.notes.forEach(m=>{ const k=wh.find(w=>w.m===m)||bl.find(b=>b.m===m), cx=k.x+(isBlack(m)?BWd:W)/2;
    up=cx-px<14?!up:false; px=cx; s+=`<text class="vlab ${hand(m)}" x="${cx}" y="${up?-15:-4}">${vcLab(t,m)}</text>`; });
  return s+'</svg>';
}
const vcNames=(t,ns)=>ns.map(m=>vcSpell(t,m).name).join(' ');
function vcStaff(t,roles){ $('staff').innerHTML=staffSVG(t.notes.map(m=>({...vcSpell(t,m),midi:m})),roles||t.notes.map(()=>'hint')); }
function vcPlay(t,roll=false){ killBus(VC.bus); const b=VC.bus=newBus(); if(!b) return; const at=now()+.05, vel=Math.round(80*Math.min(1,Math.sqrt(4/t.notes.length)));   // replaces whatever was sounding
  // every note lets go together, before the recordings run out, so none ends early or rings on. (The Wurlitzer's very top
  // notes are all about a second long; those few fade out a little sooner, smoothly, rather than cutting the whole chord short.)
  const d=Math.max(1.2,Math.min(2,...t.notes.map(m=>smpMaxDur(m,vel)).filter(x=>x>1.6).map(x=>x-0.5)));
  t.lh.forEach(m=>tone(m,at,d,vel,'epiano',b)); t.rh.forEach(m=>tone(m,at+(roll?.18:0),d,vel-2,'epiano',b)); }
function vcStop(){ killBus(VC.bus); VC.bus=null; clearTimeout(VC.timer); clearInterval(VC.tick); }
function vcShow(){ synth.init(); hideOv(); document.body.classList.add('nohud','vcmode'); document.body.classList.remove('menu'); $('voiceStage').hidden=false; }
const vcSiblings=v=>VOICINGS.filter(x=>x.qid===v.qid&&x.id!==v.id);

/* ---------------- grading ----------------
   ok: the exact layout, in any octave; or each hand's shape exact with the hands an octave further apart or closer.
   part: fewer notes than the voicing so far and none of them wrong (you're still putting your hands down). */
function vcGrade(t,notes){
  const P=[...new Set(notes)].sort((a,b)=>a-b), T=t.notes, pcs=new Set(T.map(mod12));
  const wrong=P.filter(m=>!pcs.has(mod12(m))), shape=(a,b)=>a.length===b.length&&mod12(a[0])===mod12(b[0])&&a.every((m,i)=>m-a[0]===b[i]-b[0]);
  if(shape(P,T)) return {ok:true,P};
  const nl=t.lh.length;
  if(P.length===T.length&&shape(P.slice(0,nl),t.lh)&&shape(P.slice(nl),t.rh)){ const gap=(P[nl]-P[nl-1])-(t.rh[0]-t.lh[nl-1]); if(Math.abs(gap)===12) return {ok:true,P,note:'Hands an octave '+(gap>0?'further apart':'closer')+' than written, which counts.'}; }
  if(!wrong.length&&P.length<T.length) return {part:true,P};
  const have=new Set(P.map(mod12)), missing=[...pcs].filter(pc=>!have.has(pc)).map(pc=>T.find(m=>mod12(m)===pc));
  let why;
  if(wrong.length) why=`${vcNames(t,wrong.map(m=>m))} ${wrong.length>1?'aren\'t':'isn\'t'} in this voicing.`;
  else if(missing.length) why=`Missing the ${missing.map(m=>`${vcLab(t,m)} (${vcSpell(t,m).name})`).join(', ')}.`;
  else if(mod12(P[0])!==mod12(T[0])) why=`Right notes; the lowest should be the ${vcLab(t,T[0])} (${vcSpell(t,T[0]).name}).`;
  else if(P.length!==T.length) why=`Right notes, but it has ${T.length} notes: left hand ${t.lh.length}, right hand ${t.rh.length}.`;
  else why=`Right notes, different layout. Left hand ${t.lh.map(m=>vcLab(t,m)).join(' ')}, right hand ${t.rh.map(m=>vcLab(t,m)).join(' ')}, from the bottom up.`;
  return {ok:false,P,why,wrong};
}
function vcMark(t,res){ kbMarks={}; const pcs=new Set(t.notes.map(mod12)); res.P.forEach(m=>kbMarks[m]=pcs.has(mod12(m))?(res.ok?'k-chord':'k-tension'):'k-wrong'); paintKeys(); }
function vcHintKeys(t){ kbMarks={}; t.notes.forEach(m=>kbMarks[m]='k-hint'); paintKeys(); }
function vcRelease(){ if(VC.active) VC.tried=false; }   // all keys up: the next try is a new attempt

/* ---------------- learn: the card ---------------- */
function vcOpen(id){
  vcStop(); const v=VOICE[id], t=vcIn(v,0);
  Object.assign(VC,{active:true,mode:'card',v});
  vcShow(); vcHintKeys(t); vcStaff(t);
  const sib=vcSiblings(v);
  $('vcBody').innerHTML=`<div class="etop"><span class="etitle">${gigAccHTML(v.name)}</span><span>${gigAccHTML(vcSym(t))} · ${VFAM[v.fam]} · ${'●'.repeat(v.diff)}${'○'.repeat(3-v.diff)}</span></div>
    <p class="vctip">${gigAccHTML(v.tip)}</p>
    ${vcDiagram(t)}
    <div class="vchands"><span class="lh"><b>Left hand</b> ${t.lh.map(m=>`${vcSpell(t,m).name}<em>${vcLab(t,m)}</em>`).join(' ')}</span><span class="rh"><b>Right hand</b> ${t.rh.map(m=>`${vcSpell(t,m).name}<em>${vcLab(t,m)}</em>`).join(' ')}</span></div>
    ${sib.length?`<div class="sec">Other ways to play ${gigAccHTML(vcSym(t))}</div><div class="vcsib">${sib.map(x=>`<button class="ghost" data-vc="${x.id}">${gigAccHTML(x.name)}</button>`).join('')}</div>`:''}
    <div class="erow"><button class="ghost" id="vcHear">Hear it (R)</button><button class="ghost" id="vcRoll">Hands one after the other</button><button class="go" id="vcGo">Play it: C, then 5 keys</button><button class="ghost" id="vcBack">Back</button></div>`;
  $('vcHear').onclick=()=>vcPlay(t); $('vcRoll').onclick=()=>vcPlay(t,true); $('vcGo').onclick=()=>vcDrillStart(id); $('vcBack').onclick=vcToMenu;
  $('vcBody').querySelectorAll('.vcsib [data-vc]').forEach(b=>b.onclick=()=>vcOpen(b.dataset.vc));
  $('verdict').className='verdict'; $('verdict').textContent=`${vcSym(t)}: ${v.name}`; $('chips').innerHTML=''; $('why').textContent='Play it on your keyboard when you\'re ready, or press Play it.'; $('tags').textContent='';
}

/* ---------------- drill: C with the shape shown, then five keys from memory ---------------- */
function vcDrillStart(id){
  vcStop(); const v=VOICE[id];
  const keys=[0]; while(keys.length<1+VC_KEYS){ keys.push(weightedPick([...Array(12).keys()].filter(x=>!keys.includes(x)).map(pc=>({pc,w:keyWeight(pc,'hands')}))).pc); }
  Object.assign(VC,{active:true,mode:'drill',v,keys,round:0,results:[],clean:0,xp:0});
  vcShow(); vcRound();
}
function vcRound(){
  vcStop(); clearDraft(); const R=VC;
  Object.assign(R,{t:vcIn(R.v,R.keys[R.round]),mistakes:0,shown:R.round===0,done:false,tried:false});
  vcRender(); if(R.shown){ vcHintKeys(R.t); vcStaff(R.t); } else { kbMarks={}; paintKeys(); $('staff').innerHTML=staffSVG([],[]); }
  $('verdict').className='verdict'; $('verdict').textContent=R.round===0?'Copy the shape.':`${vcSym(R.t)}, ${R.v.name}. From memory.`; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
}
function vcRender(){
  const R=VC, t=R.t, learn=R.round===0;
  $('vcBody').innerHTML=`<div class="etop"><span class="etitle">${gigAccHTML(R.v.name)}</span><span>${learn?'Learn it, in C':`New key ${R.round} of ${VC_KEYS}`}</span></div>
    <div class="vcask"><b>${gigAccHTML(vcSym(t))}</b><span>${gigAccHTML(R.v.name)}</span>${vcCue(R.v)}</div>
    ${vcDiagram(t,R.shown||R.done)}
    <div class="lmsg" id="vcMsg"></div>
    <div class="erow"><button class="ghost" id="vcHear">Hear it (R)</button>${!R.shown&&!R.done?'<button class="ghost" id="vcShowB">Show the shape (S)</button>':''}${R.done?'<button class="go" id="vcNext">Next (Enter)</button>':''}<button class="ghost" id="vcEnd">End</button></div>`;
  $('vcHear').onclick=()=>vcPlay(t);
  if($('vcShowB')) $('vcShowB').onclick=vcReveal;
  if($('vcNext')) $('vcNext').onclick=vcNext;
  $('vcEnd').onclick=()=>R.results.length?vcFinish(true):vcToMenu();
}
function vcReveal(){ const R=VC; if(R.mode==='drill'&&!R.shown&&!R.done){ R.shown=true; vcRender(); vcHintKeys(R.t); vcStaff(R.t); } }
function vcNotes(notes){
  const R=VC; if(!R.active) return;
  if(R.mode==='rush') return vcRushNotes(notes);
  if(R.mode!=='drill'||R.done){ showAnalysis(null,null,null,notes); return; }
  const res=vcGrade(R.t,notes); vcMark(R.t,res);
  if(res.ok){
    const clean=R.mistakes===0&&(R.round===0||!R.shown);
    R.done=true; R.results.push({key:R.keys[R.round],clean,mistakes:R.mistakes,shown:R.round>0&&R.shown});
    if(R.round>0&&clean) R.clean++; R.xp+=10+(clean?10:0);
    vcRender(); $('vcMsg').textContent=(clean?'Clean.':`Got it${R.mistakes?`, after ${R.mistakes} wrong tr${R.mistakes>1?'ies':'y'}`:''}.`)+(res.note?' '+res.note:''); $('vcMsg').className='lmsg ok';
    vcStaff(R.t,R.t.notes.map(m=>{ const iv=mod12(m-R.t.root.pc); return iv===0?'root':R.t.q.ct.includes(iv)?'chord':'tension'; }));
    $('verdict').className='verdict ok'; $('verdict').textContent=`${vcSym(R.t)}, ${R.v.name}.`; $('why').textContent='';
    R.timer=setTimeout(vcNext,1300); return;
  }
  if(res.part){ $('vcMsg').textContent='Keep going…'; $('vcMsg').className='lmsg'; return; }
  if(!R.tried){ R.mistakes++; R.tried=true; }
  $('vcMsg').textContent=res.why; $('vcMsg').className='lmsg no';
  if(R.mistakes>=3&&!R.shown) $('why').textContent='Stuck? Press S to show the shape.';
}
function vcNext(){ const R=VC; if(!R.active||R.mode!=='drill'||!R.done) return; clearTimeout(R.timer); R.round++; if(R.round>VC_KEYS) return vcFinish(false); vcRound(); }
function vcFinish(quit){ clearDraft();
  const R=VC; vcStop();
  const learned=R.results.length>0, finished=R.round>VC_KEYS, stars=!learned?0:finished&&R.clean===VC_KEYS?3:finished&&R.clean>=4?2:1;
  const prev=VCDATA.stars[R.v.id]||0; if(stars>prev) VCDATA.stars[R.v.id]=stars;
  addXP(R.xp); saveVc(); R.mode='results';
  $('vcBody').innerHTML=`<h2>${quit?'Session ended':stars===3?'Every key clean':'Voicing done'}</h2>${learned?`<div class="stars eresults" style="margin:0"><span class="stars">${starStr(Math.max(stars,prev))}</span></div>`:''}
    <ul class="lkeys">${R.results.map((r,i)=>`<li><b>${gigAccHTML(vcSym(vcIn(R.v,r.key)))}</b> ${i===0?'learned':r.clean?'clean':r.shown?'with the shape shown':`${r.mistakes} wrong tr${r.mistakes>1?'ies':'y'}`}</li>`).join('')}</ul>
    <p>+${R.xp} XP.${stars<3&&learned?` Next star: ${stars<2?'four of the five new keys clean.':'all five clean.'}`:''}</p>
    <div class="erow"><button class="go" id="vcAgain">Again</button><button class="ghost" id="vcCard">Back to the card</button><button class="ghost" id="vcMenu">All voicings</button></div>`;
  $('vcAgain').onclick=()=>vcDrillStart(R.v.id); $('vcCard').onclick=()=>vcOpen(R.v.id); $('vcMenu').onclick=vcToMenu;
}

/* ---------------- Rush ----------------
   Chains: one chord in one key, asked for in up to three different voicings in a row, then a new chord. The bar
   gives a few seconds per note, shrinking as your streak grows. A wrong try costs time and your combo; running out of
   time costs a life, shows the shape, and you play it before moving on. That voicing then comes back three to five
   chords later in another key, and again if you miss it again. A voicing you haven't learned is shown the first time. */
function vcBossStart(id){ const b=VBOSSES.find(x=>x.id===id); if(!b) return; vcRushStart(b); }
function vcRushStart(boss=null){
  vcStop(); const pool=boss?VOICINGS.filter(v=>boss.types.includes(v.qid)):vcPool();
  Object.assign(VC,{active:true,mode:'rush',boss,deck:boss?shuffled(pool):null,won:false,pool,lives:VC_LIVES,score:0,combo:0,n:0,cleared:0,speed:1,chain:[],again:[],missed:{},seen:new Set(),recent:[],xp:0});
  vcShow(); vcRushNext();
}
function vcRushChain(){
  const R=VC, types=[...new Set(R.pool.map(v=>v.qid))].filter(q=>!R.recent.includes(q));
  const qid=(types.length?types:[...new Set(R.pool.map(v=>v.qid))])[Math.floor(Math.random()*(types.length||1))]||R.pool[0].qid;
  const ways=shuffled(R.pool.filter(v=>v.qid===qid)).slice(0,1+Math.floor(Math.random()*3)), pc=pickKeyPc();
  R.recent=[qid,...R.recent].slice(0,3);
  return ways.map((v,i)=>({v,pc,of:ways.length,i}));
}
function vcRushNext(){
  const R=VC; vcStop(); clearDraft(); if(R.lives<=0) return vcRushOver();
  let due=R.again.findIndex(a=>a.at<=R.n);
  if(R.boss&&!R.deck.length&&due<0&&R.again.length) due=0;   // a boss: the misses still owed come back before it's done
  if(R.boss&&!R.deck.length&&due<0){ R.won=true; return vcRushOver(); }   // every voicing played: the boss is beaten
  let item;
  if(R.n>=4&&due<0&&Math.random()<1/VC_LIFE_EVERY){ const hard=VOICINGS.filter(v=>v.diff===3); item={v:hard[Math.floor(Math.random()*hard.length)],pc:pickKeyPc(),of:1,i:0,life:true}; }
  else if(R.boss&&due<0) item={v:R.deck.pop(),pc:pickKeyPc(),of:1,i:0};
  else if(due>=0&&(R.boss||!R.chain.length)){ const a=R.again.splice(due,1)[0]; item={v:a.v,pc:mod12(a.pc+[5,7,2,10][Math.floor(Math.random()*4)]),of:1,i:0,review:true}; }
  else { if(!R.chain.length) R.chain=vcRushChain(); item=R.chain.shift(); }
  const t=vcIn(item.v,item.pc), fresh=!item.life&&!R.boss&&!VCDATA.stars[item.v.id]&&!R.seen.has(item.v.id);   // a boss never shows the shape (the formula's there)
  R.seen.add(item.v.id);
  const secs=(3+1.15*t.notes.length)*R.speed*(fresh?1.6:1);
  Object.assign(R,{item,t,fresh,secs,left:secs,lost:false,solved:false,tried:false,wrong:0,t0:performance.now()}); R.n++;
  vcRushRender();
  if(fresh){ vcHintKeys(t); vcStaff(t); } else { kbMarks={}; paintKeys(); $('staff').innerHTML=staffSVG([],[]); }
  $('verdict').className='verdict'; $('verdict').textContent=fresh?'New one: copy the shape.':''; $('chips').innerHTML=''; $('why').textContent=''; $('tags').textContent='';
  let last=performance.now();
  R.tick=setInterval(()=>{ const n=performance.now(); R.left-=(n-last)/1000; last=n; const bar=$('vcBar'); if(bar) bar.style.width=Math.max(0,100*R.left/R.secs)+'%';
    if(R.left<=0) vcRushTimeout(); },80);
}
function vcRushRender(){
  const R=VC, it=R.item, t=R.t;
  $('vcBody').innerHTML=`<div class="etop"><span class="etitle">${R.boss?`${R.boss.kind==='final'?'😈':R.boss.kind==='chapter'?'👑':'👹'} ${gigAccHTML(R.boss.name)} · ${R.cleared} of ${R.pool.length}`:'Rush'}</span><span>Score <b>${R.score.toLocaleString()}</b></span><span>Combo <b>${R.combo}</b></span><span class="lives">${[...Array(VC_LIVES)].map((_,k)=>`<i${k<R.lives?'':' class="gone"'}></i>`).join('')}</span></div>
    <div class="ebar vcbar"><i id="vcBar" style="width:${R.lost?0:Math.max(0,100*R.left/R.secs)}%"${R.lost?' class="boss"':''}></i></div>
    <div class="vcask"><b>${gigAccHTML(vcSym(t))}</b><span>${gigAccHTML(it.v.name)}</span>${it.life?'<em class="vclife">💚 +1 life</em>':vcCue(it.v)}${it.of>1?`<em>${it.i+1} of ${it.of} ways</em>`:''}${it.review?'<em>Back again</em>':''}</div>
    ${vcDiagram(t,R.fresh||R.lost)}
    <div class="lmsg" id="vcMsg">${R.lost?'Time. Play it to go on.':''}</div>
    <div class="erow"><button class="ghost" id="vcHear">Hear it (R)</button><button class="ghost" id="vcEnd">End</button></div>`;
  $('vcHear').onclick=()=>vcPlay(t); $('vcEnd').onclick=vcRushOver;
}
function vcRushTimeout(){
  const R=VC; clearInterval(R.tick); if(R.lost) return;
  if(R.item.life){ R.lost=true; R.solved=true; vcRushRender(); vcHintKeys(R.t); vcStaff(R.t); vcPlay(R.t); $('vcMsg').textContent='💚 It got away: no harm done. This was the shape.'; $('vcMsg').className='lmsg'; R.timer=setTimeout(vcRushNext,2200); return; }   // a missed life voicing costs nothing
  R.lost=true; R.lives--; R.combo=0; R.missed[R.item.v.id]=(R.missed[R.item.v.id]||0)+1;
  R.again.push({v:R.item.v,pc:R.item.pc,at:R.n+3+Math.floor(Math.random()*3)});
  R.chain=R.chain.filter(x=>x.v.id!==R.item.v.id);
  vcRushRender(); vcHintKeys(R.t); vcStaff(R.t); vcPlay(R.t);
  $('verdict').className='verdict no'; $('verdict').textContent=R.lives?`${vcSym(R.t)}, ${R.item.v.name}: this one.`:'Out of lives. Play it once, then that\'s the run.';
}
function vcRushNotes(notes){
  const R=VC; if(R.mode!=='rush'||!R.t||R.solved) return;   // solved: waiting for the next one, so playing it again scores nothing
  const res=vcGrade(R.t,notes); vcMark(R.t,res);
  if(res.ok){
    clearInterval(R.tick); R.solved=true;
    if(R.lost){ $('vcMsg').textContent='That\'s it. It\'ll come back.'; $('vcMsg').className='lmsg ok'; R.timer=setTimeout(vcRushNext,900); return; }
    const frac=Math.max(0,R.left/R.secs), mult=1+Math.min(2,R.combo*0.1), pts=Math.round((100+150*frac)*mult*(R.item.v.diff>1?1+0.25*(R.item.v.diff-1):1));
    R.score+=pts; R.combo++; if(!R.item.life) R.cleared++; R.xp+=4; R.speed=Math.max(0.55,R.speed*0.97);
    let life=''; if(R.item.life){ if(R.lives<VC_LIVES){ R.lives++; life='  💚 +1 life!'; } else { R.score+=600; life='  💚 Full on lives: +600'; } }
    $('vcMsg').textContent=`+${pts}${R.combo>1?`  ×${mult.toFixed(1)}`:''}${frac>0.6?'  Quick!':''}${life}`; $('vcMsg').className='lmsg ok';
    $('verdict').className='verdict ok'; $('verdict').textContent=`${vcSym(R.t)}, ${R.item.v.name}.`;
    R.timer=setTimeout(vcRushNext,R.chain.length?380:650); return;
  }
  if(res.part) return;
  if(!R.tried){ R.tried=true; R.wrong++; if(!R.lost){ R.combo=0; R.left-=1.5; } }
  $('vcMsg').textContent=res.why; $('vcMsg').className='lmsg no';
}
function vcRushOver(){
  const R=VC; vcStop(); clearDraft(); R.mode='results';
  if(R.boss) return vcBossOver();
  const key=VCDATA.pool, prev=VCDATA.best[key]||0, rec=R.score>prev; if(rec) VCDATA.best[key]=R.score;
  addXP(R.xp+Math.round(R.score/100)); saveVc();
  const weak=Object.entries(R.missed).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([id])=>VOICE[id]);
  $('vcBody').innerHTML=`<h2>${rec&&R.score?'New best':'Rush over'}</h2><div class="results"><div><b>${R.score.toLocaleString()}</b>score</div><div><b>${R.cleared}</b>voicings</div><div><b>${prev?Math.max(prev,R.score).toLocaleString():'–'}</b>best</div></div>
    ${weak.length?`<div class="sec">Worth another look</div><div class="vcsib">${weak.map(v=>`<button class="ghost" data-vc="${v.id}">${gigAccHTML(vcSym(vcIn(v,0)))}: ${gigAccHTML(v.name)}</button>`).join('')}</div>`:''}
    <div class="erow"><button class="go" id="vcAgain">Again</button><button class="ghost" id="vcMenu">All voicings</button></div>`;
  $('vcBody').querySelectorAll('[data-vc]').forEach(b=>b.onclick=()=>vcOpen(b.dataset.vc));
  $('vcAgain').onclick=vcRushStart; $('vcMenu').onclick=vcToMenu;
  $('verdict').className='verdict'; $('verdict').textContent=''; kbMarks={}; paintKeys();
}

function vcBossOver(){
  const R=VC, b=R.boss, n=R.pool.length; if(R.won) VCDATA.boss[b.id]=true; addXP(R.xp+(R.won?(b.kind==='final'?400:b.kind==='chapter'?150:60):0)); saveVc();
  const weak=Object.entries(R.missed).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([id])=>VOICE[id]);
  $('vcBody').innerHTML=`<h2>${R.won?`👑 ${gigAccHTML(b.name)}: beaten`:`${gigAccHTML(b.name)}: not this time`}</h2>
    <div class="results"><div><b>${R.cleared} of ${n}</b>voicings</div><div><b>${R.score.toLocaleString()}</b>score</div><div><b>${R.lives}</b>lives left</div></div>
    ${weak.length?`<div class="sec">The ones that got you</div><div class="vcsib">${weak.map(v=>`<button class="ghost" data-vc="${v.id}">${gigAccHTML(vcSym(vcIn(v,0)))}: ${gigAccHTML(v.name)}</button>`).join('')}</div>`:''}
    <div class="erow"><button class="go" id="vcAgain">Again</button><button class="ghost" id="vcMenu">All voicings</button></div>`;
  $('vcBody').querySelectorAll('[data-vc]').forEach(x=>x.onclick=()=>vcOpen(x.dataset.vc));
  $('vcAgain').onclick=()=>vcBossStart(b.id); $('vcMenu').onclick=vcToMenu;
}
function vcToMenu(){ clearDraft();
  vcStop(); VC.active=false; $('voiceStage').hidden=true; document.body.classList.remove('vcmode');
  side='voicings'; $('startOv').hidden=false; document.body.classList.add('menu'); kbMarks={}; paintKeys(); renderMenu();
}
function vcKey(e){
  const R=VC; if(!R.active) return false;
  if(e.key==='Escape'){ R.mode==='rush'?vcRushOver():R.mode==='drill'&&R.results.length?vcFinish(true):vcToMenu(); return true; }
  if(e.key==='r'||e.key==='R'){ if(R.mode==='card') vcPlay(vcIn(R.v,0)); else if(R.t) vcPlay(R.t); return true; }
  if((e.key==='s'||e.key==='S')&&R.mode==='drill'){ vcReveal(); return true; }
  if((e.key==='Enter'||e.key===' ')&&R.mode==='drill'&&R.done){ e.preventDefault(); vcNext(); return true; }
  return false;
}
