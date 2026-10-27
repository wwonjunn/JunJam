/* ---------------- menu ---------------- */
/* Home: one card per mode. Modes that aren't built yet show as Coming soon. */
let side='home'; // 'home' | 'hands' | 'ears' | 'lines' | 'reharm' | 'voicings' | 'plan' | 'settings'
const MODES=[
  {id:'hands',name:'Chords',blurb:'Any chord or progression, in every key',stat:()=>{ const ids=STAR_IDS(); return `${ids.reduce((a,id)=>a+starsOf(id),0)} of ${ids.length*STAR_MAX} stars`; }},
  {id:'ears',name:'Ears',blurb:'Hear scale degrees, intervals, chords and progressions',stat:()=>{ const ids=Object.keys(LEVELS); const st=arcStreak(); return `${ids.reduce((a,id)=>a+(EARDATA.stars[id]||0),0)} of ${ids.length*3} stars${st?` · 🔥 ${st}-day streak`:ARCDATA.daily[arcDay()]?'':' · daily wave ready'}`; }},
  {id:'voicings',name:'Voicings',blurb:'One chord, many ways: named two-hand voicings that fill the keyboard',stat:()=>`${vcStarTotal()} of ${VOICINGS.length*3} stars`},
  {id:'lines',name:'Lines',blurb:'Short licks you can drop anywhere, in all 12 keys',stat:()=>`${linesStarTotal()} of ${allLicks().length*3} stars`},
  {id:'reharm',name:'Reharm',blurb:'Swap in substitutions and hear why they work',stat:()=>`${rhStarTotal()} of ${REHARM_MOVES.length*3} stars`},
  {id:'gig',name:'Gig',blurb:'Lead sheets to play from; a band behind you comes later',stat:()=>`${GIG_BUILTIN.length+GDATA.mine.length} charts`},
  {id:'plan',name:'Practice',blurb:'Your own routines: blocks of each mode on a timer, a log and notes',stat:()=>{ if(typeof PLAN==='undefined') return ''; if(PLAN.run) return 'A session is running'; const w=Object.values(planWeek()).reduce((a,b)=>a+b,0), st=planStreak(); return `${Math.round(w)} min this week${st?` · ${st}-day streak`:''}`; }},
];
function renderHome(){
  $('modes').innerHTML=MODES.map((m,i)=>{ const nx=typeof modeNextText==='function'?modeNextText(m.id):''; return `<button class="mode${m.soon?' soon':''}" data-mode="${m.id}" ${m.soon?'aria-disabled="true"':''}><span class="mn">${i+1}</span><span class="mt">${m.name}</span><span class="mb">${m.blurb}</span><span class="ms">${m.soon?'Coming soon':m.stat()}</span>${nx?`<span class="mnext">${gigAccHTML(nx)}</span>`:''}</button>`; }).join('');
}
// Devil unlocks stage by stage: say which stage is selected, how far it is, and where Devil is already open
function devilLockText(){
  const name=id=>{ id=String(id); if(id.startsWith('p:')){ const p=PROG[id.slice(2)], b=PBOSS.find(x=>'p:'+x.id===id); return p?p.short:b?`The boss of ${PROGS.slice(b.from,b.to).map(x=>x.short).join(', ')}`:id==='p:mix'?'Every progression':'The final boss'; } const st=STAGE[+id]; return !st?id:st.boss?`The boss of stages ${st.boss[0]}–${st.boss[st.boss.length-1]}`:st.chapter?'Everything':`Stage ${id}`; };
  const open=STAR_IDS().filter(id=>starsOf(id)>=STAR_MAX).map(name);
  return `Unlocks per stage at ★★★★★. ${name(stageN)} has ${starStr(starsOf(stageN),STAR_MAX)}.${open.length?` Open on: ${open.join(', ')}.`:''}`;
}
function renderMenu(){
  $('rankLine').textContent=rankLine();
  ['home','hands','ears','lines','reharm','voicings','plan','settings'].forEach(s=>$(s+'Pane').hidden=side!==s);
  document.querySelector('.homehead').hidden=side==='settings';
  if(side==='home'){ renderHome(); renderProfileChip(); }
  if(side==='settings') renderSettingsPane();
  if(side==='ears') renderEarsPane();
  if(side==='lines') renderLinesPane();
  if(side==='reharm') renderReharmPane();
  if(side==='voicings') renderVoicingsPane();
  if(side==='plan') renderPlanPane();
  document.body.classList.toggle('nohud',side!=='hands');
  const bests=store.get('best2',{});
  $('mPractice').setAttribute('aria-pressed',mode==='practice'); $('mGame').setAttribute('aria-pressed',mode==='game');
  $('tierBox').classList.toggle('hide',mode!=='game');
  $('tiers').innerHTML=TIERS.map(t=>{
    const open=tierUnlocked(t);
    const bestAny=Math.max(0,...Object.entries(bests).filter(([k])=>k.startsWith(t.id+':')).map(([,v])=>v));
    const sub=t.devil?(open?`Every chord is 🔥: put its 3rd, 5th or 7th in the bass. Roots can be spelled B♯ or F♭. No hints, 1 life, ×${t.mult} points`:devilLockText())
      :open?`${t.cap===1?'One chord at a time':`Up to ${t.cap} chords`}, ${t.lives} ${t.lives===1?'life':'lives'}${t.mult>1?`, ×${t.mult} points`:''}`:`Score ${t.unlock.score.toLocaleString()} on ${tierOf(t.unlock.tier).name} to unlock`;
    return `<button class="stage${open?'':' locked'}" data-tier="${t.id}" aria-pressed="${t.id===tierId}" ${open?'':'aria-disabled="true"'}><span class="n">♩ = ${t.bpm}</span><span class="t">${t.name}</span><span class="best">${sub}${open&&bestAny?`. Best ${bestAny.toLocaleString()}`:''}</span></button>`;
  }).join('');
  const nx=nextUp(), total=STAR_IDS().reduce((a,id)=>a+starsOf(id),0);
  $('starLine').innerHTML=`<b>${total} of ${STAR_IDS().length*STAR_MAX} stars.</b> Earned in Game mode: ★ clear 16 chords in a run, ★★ with 90% right first try. From then on 🔥 chords say which chord tone your left hand has to put at the bottom (you work out the note): ★★★ the 3rd, ★★★★ the 3rd or 5th, ★★★★★ any of them (7th too) at Cherokee tempo without losing a life. Everything stays open either way.`;
  const stars=id=>`<span class="st">${starStr(starsOf(id),STAR_MAX)}${devilOf(id)?` <span class="devil">${'💀'.repeat(devilOf(id))}</span>`:''}</span>`, tag=id=>(chordsStep(id)?`<span class="step">${chordsStep(id)}</span>`:'')+(id===nx?'<span class="nx">Next up</span>':'');
  const later=id=>chordsAhead(id)?' later':'';
  $('stages').innerHTML=STAGES.map(s=>{
    const b=bests[bestKey(tierId,s.n)];
    return `<button class="stage${s.boss?' boss':s.chapter?' boss chapter':''}${later(s.n)}" data-n="${s.n}" aria-pressed="${s.n===stageN}"><span class="n">${s.boss?'👹 Boss':s.chapter?'👑 Chapter boss':`Stage ${s.n}`}${tag(String(s.n))}</span><span class="t">${s.t}</span><span class="best">${stars(s.n)}${mode==='game'?(b?`Best ${b.toLocaleString()} on ${tierOf(tierId).name}`:'Not played on this tempo'):'Practice at your own pace'}</span></button>`;
  }).join('');
  const bestLine=id=>{ const b=bests[bestKey(tierId,id)]; return mode==='game'?(b?`Best ${b.toLocaleString()}`:'Not played on this tempo'):''; };
  const pBossBtn=(id,cls,n,t,sub)=>`<button class="stage boss${cls}${later(id)}" data-p="${id}" aria-pressed="${stageN===id}"><span class="n">${n}${tag(id)}</span><span class="t">${t}</span><span class="best">${stars(id)}${sub}${bestLine(id)?`. ${bestLine(id)}`:''}</span></button>`;
  $('progs').innerHTML=PROGS.map((p,i)=>{
    const id='p:'+p.id, jp=(p.name.match(/\(([^)]*[぀-ヿ一-龯][^)]*)\)/)||[])[1]||(p.minor?'minor key':'');
    const best=bestLine(id);
    const pb=PBOSS.find(b=>b.to===i+1);   // a boss after every four
    return `<button class="stage${later(id)}" data-p="${id}" aria-pressed="${stageN===id}"><span class="n">${jp||'&nbsp;'}${tag(id)}</span><span class="t">${p.short}</span><span class="best">${stars(id)}${progDegrees(p)}${best?`. ${best}`:''}</span></button>`
      +(pb?pBossBtn('p:'+pb.id,'','👹 Boss',PROGS.slice(pb.from,pb.to).map(x=>x.short).join(', '),'Those four, mixed'):'');
  }).join('')+pBossBtn('p:mix',' chapter','👑 Chapter boss','Every progression','A random one each time')
    +pBossBtn('p:final',' final','🔥 Final boss','Everything: every chord stage and every progression','Single chords and whole progressions, mixed');
  const t=tierOf(tierId);
  $('startBtn').textContent=mode==='practice'?'Start practice':tierUnlocked(t)?`Start ${t.name} at ♩ = ${t.bpm}`:'Locked';
  $('startBtn').disabled=mode==='game'&&!tierUnlocked(t);
  $('pathNote').textContent=chordsPathNote(stageN);
  const short=id=>{ const s=pathName(id); return s.replace(/^the boss of /,'👹 ').replace(/^the chapter boss$/,String(id)==='p:mix'?'👑 Every progression':'👑 Everything'); };
  $('pathStrip').innerHTML=NEXT_ORDER.map((id,i)=>{ const st=starsOf(id); return `<button class="pstep${st?' got':''}${id===nx?' now':''}${String(stageN)===id?' sel':''}" data-step="${id}" title="${starStr(st,STAR_MAX)}"><i>${i+1}</i>${gigAccHTML(short(id))}${st?` <b>${'★'.repeat(st)}</b>`:''}</button>`; }).join('<span class="parr">›</span>');
  updateHud();
}
$('pathStrip').addEventListener('click',e=>{ const b=e.target.closest('[data-step]'); if(!b) return; const id=b.dataset.step; briefOpen(/^\d+$/.test(id)?+id:id); });
$('stages').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b||b.disabled) return; stageN=+b.dataset.n; renderMenu();});
$('progs').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b) return; stageN=b.dataset.p; renderMenu();});
$('tiers').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b) return; tierId=b.dataset.tier; renderMenu();});
$('modes').addEventListener('click',e=>{const b=e.target.closest('.mode'); if(!b||b.classList.contains('soon')) return; if(b.dataset.mode==='gig') return gigOpen(); if(b.dataset.mode==='lines') LINES.over=null; side=b.dataset.mode; renderMenu(); $('startOv').scrollTop=0;});
$('startOv').addEventListener('click',e=>{ if(e.target.closest('[data-home]')){ side='home'; LINES.rec=null; renderMenu(); } });
$('lHear').onclick=()=>linesPlay();
$('lLH').onclick=()=>{ LDATA.lh=!LDATA.lh; saveLines(); linesRound(); };
$('lFav').onclick=()=>{ if(LINES.lick){ toggleFav(LINES.lick.id); linesRender(); } };
$('lShow').onclick=()=>{ LINES.revealed=true; linesRender(); };
$('lNext').onclick=()=>linesNext();
$('lQuit').onclick=()=>LINES.results.length?linesFinish(true):linesToMenu();
bindLinesPane(); bindReharmPane(); bindVoicingsPane();
$('trOpenBtn').onclick=trOpen;
/* ---------- getting home: the logo, and the browser's Back button ----------
   Leaving the home screen adds one history step, so Back brings you home instead of off the page. */
const atHome=()=>!$('startOv').hidden&&side==='home'&&!(typeof TR!=='undefined'&&TR.active)&&!GIG.active;
function goHome(){
  clearDraft();
  if(typeof TR!=='undefined'&&TR.active){ if(TR.step==='edit'&&TR.dirty&&!confirm("Leave this transcription? It isn't saved.")) return false; trToMenu(); }
  if(typeof G!=='undefined'&&G&&(G.running||G.paused)){ G.running=false; G.paused=false; cancelAnimationFrame(G.raf); metro.stop(); stopByEar(); }
  if(ARC.active){ arcStop(); arcFxStop(); ARC.active=false; } if(EARS.active) earsToMenu(); if(LINES.active) linesToMenu(); if(REHARM.active) rhToMenu(); if(VC.active){ vcStop(); VC.active=false; } if(CH.active){ chStop(); CH.active=false; } if(GIG.active) gigClose();
  hideOv(); document.body.classList.remove('earsmode','linesmode','trmode','gigmode','vcmode'); ['earsStage','arcStage','linesStage','reharmStage','voiceStage','transStage','gigStage'].forEach(id=>$(id).hidden=true);
  side='home'; LINES.rec=null; $('startOv').hidden=false; document.body.classList.add('menu'); renderMenu(); $('startOv').scrollTop=0; return true;
}
document.addEventListener('click',()=>setTimeout(()=>{ if(!atHome()&&!(history.state&&history.state.away)) history.pushState({away:1},''); }),true);
addEventListener('popstate',()=>{ if(!atHome()&&!goHome()) history.pushState({away:1},''); });
const brand=document.querySelector('.brand'); brand.setAttribute('role','link'); brand.tabIndex=0; brand.title='Home';
brand.onclick=()=>{ if(!atHome()&&goHome()&&history.state&&history.state.away) history.replaceState(null,''); };
brand.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); brand.onclick(); } };
$('profileChip').onclick=()=>{ side='settings'; renderMenu(); $('startOv').scrollTop=0; };
$('eReplay').onclick=earsReplay;
$('eNext').onclick=()=>earsNext();
$('eQuit').onclick=()=>earsFinish(true);
$('eOpts').addEventListener('click',e=>{const b=e.target.closest('.eopt'); if(!b) return; EARS.answered?earsHear(b.dataset.id):earsAnswer(b.dataset.id,'click');});
$('mPractice').onclick=()=>{mode='practice';renderMenu();};
$('mGame').onclick=()=>{mode='game';renderMenu();};
$('optRootless').checked=opts.rootless; $('optWeird').checked=opts.weird; $('optSound').checked=opts.sound; $('optMetro').checked=opts.metro;
$('optRootless').onchange=e=>{opts.rootless=e.target.checked;store.set('rootless',opts.rootless);};
$('optWeird').onchange=e=>{opts.weird=e.target.checked;store.set('weird',opts.weird);};
$('optSound').onchange=e=>{opts.sound=e.target.checked;store.set('sound',opts.sound); if(opts.sound) synth.init(); sndStatus();};
$('optMetro').onchange=e=>{opts.metro=e.target.checked;store.set('metro',opts.metro); synth.init();};
$('snd').onclick=()=>{synth.init(); setTimeout(sndStatus,100);};
$('startBtn').onclick=start;
$('resumeBtn').onclick=resume;
$('quitBtn').onclick=()=>{$('pauseOv').hidden=true; gameOver();};
$('againBtn').onclick=start;
$('menuBtn').onclick=()=>{hideOv(); $('startOv').hidden=false; document.body.classList.add('menu'); renderMenu();};

document.body.classList.add('menu'); const CIRCLE=[0,7,2,9,4,11,6,1,8,3,10,5];
let progReturn='startOv';
function renderProgress(){
  const seen=Object.values(STATS).filter(s=>s.n).length, total=QUALS.length*12;
  const weak=[];
  QUALS.forEach(q=>CIRCLE.forEach(pc=>{const f=fluency(q.id,pc); if(f!==null) weak.push({sym:symText({root:defaultRoot(pc,q.minor),q}),f});}));
  weak.sort((a,b)=>a.f-b.f);
  let sum=`You have played ${seen} of ${total} chord and key combinations.`;
  if(weak.length) sum+=` Weakest right now: ${weak.slice(0,5).map(w=>w.sym).join(', ')}.`;
  const pushed=pushedKeys();
  if(pushed) sum+=` Keys getting the biggest push: ${pushed}.`;
  if(!seen) sum='Nothing here yet. Play a few runs and each chord in each key fills in as you go.'+(pushed?` Keys getting the biggest push: ${pushed}.`:'');
  $('progSum').textContent=sum;
  let h='<thead><tr><th></th>'+CIRCLE.map(pc=>`<th>${rootName(defaultRoot(pc,false))}</th>`).join('')+'</tr></thead><tbody>';
  // Key row: colour from the raw data of both sides (no prior), so it shows what you've actually done
  h+='<tr class="grp"><td colspan="13">Keys, from Hands and Ears together</td></tr><tr><th>overall</th>'+CIRCLE.map(pc=>{
    const hk=handsKeyStat(pc), ek=earsKeyStat(pc), n=hk.n+ek.n, name=rootName(defaultRoot(pc,false));
    const f=n?1-(hk.n*hk.weak+ek.n*ek.weak)/n:null, cls=f===null?'u':f>=0.7?'g':f>=0.4?'m':'b';
    const part=(s,label,unit)=>s.n?`${label} ${Math.round(100*(1-s.weak))}% fluent over ${s.n} ${unit}`:`${label} not seen yet`;
    return `<td class="${cls}" title="${name}: ${part(hk,'Hands','chords')}; ${part(ek,'Ears','answers')}"></td>`;
  }).join('')+'</tr>';
  let lastStage=0;
  QUALS.forEach(q=>{
    if(q.stage!==lastStage){ lastStage=q.stage; h+=`<tr class="grp"><td colspan="13">${STAGES[q.stage-1].t}</td></tr>`; }
    h+=`<tr><th>${q.row||q.suf||'major'}</th>`+CIRCLE.map(pc=>{
      const s=STATS[statKey(q.id,pc)], f=fluency(q.id,pc), sym=symText({root:defaultRoot(pc,q.minor),q});
      const cls=f===null?'u':f>=0.7?'g':f>=0.4?'m':'b';
      const tip=f===null?`${sym}: not seen yet`:`${sym}: seen ${s.n}, right first try ${Math.round(100*s.ft/s.n)}%, about ${s.t.toFixed(1)}s`;
      return `<td class="${cls}" title="${tip}"></td>`;
    }).join('')+'</tr>';
  });
  $('grid').innerHTML=h+'</tbody>';
}
function openProgress(from){ progReturn=from; hideOv(); document.body.classList.add('menu'); renderProgress(); $('progOv').hidden=false; $('progBack').focus(); }
$('progBtn').onclick=()=>openProgress('startOv');
$('progBtn2').onclick=()=>openProgress('overOv');
$('progBack').onclick=()=>{ $('progOv').hidden=true; $(progReturn).hidden=false; if(progReturn==='startOv') renderMenu(); };
$('progReset').onclick=()=>{ if(confirm('Clear all progress history? Best scores stay.')){ STATS={}; store.set('stats',STATS); renderProgress(); } };
$('optSmart').checked=opts.smart;
$('optSmart').onchange=e=>{opts.smart=e.target.checked;store.set('smart',opts.smart);};

buildKeyboard(); renderMenu(); paintKeys();
$('staff').innerHTML=staffSVG([],[]);
initMIDI();
sndStatus();
