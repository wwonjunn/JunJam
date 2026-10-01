/* ---------------- menu ---------------- */
/* Home: one card per mode. Modes that aren't built yet show as Coming soon. */
let side='home'; // 'home' | 'hands' | 'ears' | 'lines' | 'reharm'
const MODES=[
  {id:'hands',name:'Chords',blurb:'Any chord or progression, in every key',stat:()=>{ const ids=STAR_IDS(); return `${ids.reduce((a,id)=>a+starsOf(id),0)} of ${ids.length*3} stars`; }},
  {id:'ears',name:'Ears',blurb:'Hear scale degrees, intervals, chords and progressions',stat:()=>{ const ids=Object.keys(LEVELS); return `${ids.reduce((a,id)=>a+(EARDATA.stars[id]||0),0)} of ${ids.length*3} stars`; }},
  {id:'groove',name:'Groove',blurb:'Comping in time: feel, pushes, kime, genre recipes',soon:true},
  {id:'lines',name:'Lines',blurb:'Short licks you can drop anywhere, in all 12 keys',stat:()=>`${linesStarTotal()} of ${allLicks().length*3} stars`},
  {id:'reharm',name:'Reharm',blurb:'Swap in substitutions and hear why they work',stat:()=>`${rhStarTotal()} of ${REHARM_MOVES.length*3} stars`},
  {id:'gig',name:'Gig',blurb:'A full song form with a band behind you',soon:true},
];
function renderHome(){
  $('modes').innerHTML=MODES.map((m,i)=>`<button class="mode${m.soon?' soon':''}" data-mode="${m.id}" ${m.soon?'aria-disabled="true"':''}><span class="mn">${i+1}</span><span class="mt">${m.name}</span><span class="mb">${m.blurb}</span><span class="ms">${m.soon?'Coming soon':m.stat()}</span></button>`).join('');
}
function renderMenu(){
  $('rankLine').textContent=rankLine();
  ['home','hands','ears','lines','reharm'].forEach(s=>$(s+'Pane').hidden=side!==s);
  if(side==='home') renderHome();
  if(side==='ears') renderEarsPane();
  if(side==='lines') renderLinesPane();
  if(side==='reharm') renderReharmPane();
  document.body.classList.toggle('nohud',side!=='hands');
  const bests=store.get('best2',{});
  $('mPractice').setAttribute('aria-pressed',mode==='practice'); $('mGame').setAttribute('aria-pressed',mode==='game');
  $('tierBox').classList.toggle('hide',mode!=='game');
  $('tiers').innerHTML=TIERS.map(t=>{
    const open=tierUnlocked(t);
    const bestAny=Math.max(0,...Object.entries(bests).filter(([k])=>k.startsWith(t.id+':')).map(([,v])=>v));
    const sub=open?`${t.cap===1?'One chord at a time':`Up to ${t.cap} chords`}, ${t.lives} ${t.lives===1?'life':'lives'}${t.mult>1?`, ×${t.mult} points`:''}`:`Score ${t.unlock.score.toLocaleString()} on ${tierOf(t.unlock.tier).name} to unlock`;
    return `<button class="stage${open?'':' locked'}" data-tier="${t.id}" aria-pressed="${t.id===tierId}" ${open?'':'aria-disabled="true"'}><span class="n">♩ = ${t.bpm}</span><span class="t">${t.name}</span><span class="best">${sub}${open&&bestAny?`. Best ${bestAny.toLocaleString()}`:''}</span></button>`;
  }).join('');
  const nx=nextUp(), total=STAR_IDS().reduce((a,id)=>a+starsOf(id),0);
  $('starLine').innerHTML=`<b>${total} of ${STAR_IDS().length*3} stars.</b> Earned in Game mode: ★ clear 16 chords in a run, ★★ with 90% right first try, ★★★ at Cherokee tempo or faster without losing a life. Everything stays open either way.`;
  const stars=id=>`<span class="st">${starStr(starsOf(id))}</span>`, tag=id=>id===nx?'<span class="nx">Next up</span>':'';
  $('stages').innerHTML=STAGES.map(s=>{
    const b=bests[bestKey(tierId,s.n)];
    return `<button class="stage" data-n="${s.n}" aria-pressed="${s.n===stageN}"><span class="n">Stage ${s.n}${tag(String(s.n))}</span><span class="t">${s.t}</span><span class="best">${stars(s.n)}${mode==='game'?(b?`Best ${b.toLocaleString()} on ${tierOf(tierId).name}`:'Not played on this tempo'):'Practice at your own pace'}</span></button>`;
  }).join('');
  const bestLine=id=>{ const b=bests[bestKey(tierId,id)]; return mode==='game'?(b?`Best ${b.toLocaleString()}`:'Not played on this tempo'):''; };
  $('progs').innerHTML=PROGS.map(p=>{
    const id='p:'+p.id, jp=(p.name.match(/\(([^)]*[぀-ヿ一-龯][^)]*)\)/)||[])[1]||(p.minor?'minor key':'');
    const best=bestLine(id);
    return `<button class="stage" data-p="${id}" aria-pressed="${stageN===id}"><span class="n">${jp||'&nbsp;'}${tag(id)}</span><span class="t">${p.short}</span><span class="best">${stars(id)}${progDegrees(p)}${best?`. ${best}`:''}</span></button>`;
  }).join('')+`<button class="stage" data-p="p:mix" aria-pressed="${stageN==='p:mix'}"><span class="n">&nbsp;${tag('p:mix')}</span><span class="t">All of them, mixed</span><span class="best">${stars('p:mix')}A random progression each time${bestLine('p:mix')?`. ${bestLine('p:mix')}`:''}</span></button>`;
  const t=tierOf(tierId);
  $('startBtn').textContent=mode==='practice'?'Start practice':tierUnlocked(t)?`Start ${t.name} at ♩ = ${t.bpm}`:'Locked';
  $('startBtn').disabled=mode==='game'&&!tierUnlocked(t);
  updateHud();
}
$('stages').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b||b.disabled) return; stageN=+b.dataset.n; renderMenu();});
$('progs').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b) return; stageN=b.dataset.p; renderMenu();});
$('tiers').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b) return; tierId=b.dataset.tier; renderMenu();});
$('modes').addEventListener('click',e=>{const b=e.target.closest('.mode'); if(!b||b.classList.contains('soon')) return; side=b.dataset.mode; renderMenu(); $('startOv').scrollTop=0;});
$('startOv').addEventListener('click',e=>{ if(e.target.closest('[data-home]')){ side='home'; LINES.rec=null; renderMenu(); } });
$('lHear').onclick=()=>linesPlay();
$('lLH').onclick=()=>{ LDATA.lh=!LDATA.lh; saveLines(); linesRound(); };
$('lFav').onclick=()=>{ if(LINES.lick){ toggleFav(LINES.lick.id); linesRender(); } };
$('lShow').onclick=()=>{ LINES.revealed=true; linesRender(); };
$('lNext').onclick=()=>linesNext();
$('lQuit').onclick=()=>LINES.results.length?linesFinish(true):linesToMenu();
bindLinesPane(); bindReharmPane();
$('trOpenBtn').onclick=trOpen;
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
