/* ---------------- menu ---------------- */
let side=store.get('side','hands');
function renderMenu(){
  $('rankLine').textContent=rankLine();
  $('sHands').setAttribute('aria-pressed',side==='hands'); $('sEars').setAttribute('aria-pressed',side==='ears');
  $('handsPane').hidden=side!=='hands'; $('earsPane').hidden=side!=='ears';
  if(side==='ears') renderEarsPane();
  document.body.classList.toggle('earsmode',side==='ears');
  store.set('side',side);
  const bests=store.get('best2',{});
  $('mPractice').setAttribute('aria-pressed',mode==='practice'); $('mGame').setAttribute('aria-pressed',mode==='game');
  $('tierBox').classList.toggle('hide',mode!=='game');
  $('tiers').innerHTML=TIERS.map(t=>{
    const open=tierUnlocked(t);
    const bestAny=Math.max(0,...Object.entries(bests).filter(([k])=>k.startsWith(t.id+':')).map(([,v])=>v));
    const sub=open?`${t.cap===1?'One chord at a time':`Up to ${t.cap} chords`}, ${t.lives} ${t.lives===1?'life':'lives'}${t.mult>1?`, ×${t.mult} points`:''}`:`Score ${t.unlock.score.toLocaleString()} on ${tierOf(t.unlock.tier).name} to unlock`;
    return `<button class="stage${open?'':' locked'}" data-tier="${t.id}" aria-pressed="${t.id===tierId}" ${open?'':'aria-disabled="true"'}><span class="n">♩ = ${t.bpm}</span><span class="t">${t.name}</span><span class="best">${sub}${open&&bestAny?`. Best ${bestAny.toLocaleString()}`:''}</span></button>`;
  }).join('');
  const giant=mode==='game'&&tierOf(tierId).stage===8;
  $('giantNote').classList.toggle('hide',!giant);
  $('stages').innerHTML=STAGES.map(s=>{
    const b=bests[bestKey(tierId,s.n)];
    const dis=giant&&s.n!==8;
    const pressed=giant?s.n===8:s.n===stageN;
    return `<button class="stage" data-n="${s.n}" aria-pressed="${pressed}" ${dis?'disabled':''}><span class="n">Stage ${s.n}</span><span class="t">${s.t}</span><span class="best">${mode==='game'?(b?`Best ${b.toLocaleString()} on ${tierOf(tierId).name}`:'Not played on this tempo'):'Practice at your own pace'}</span></button>`;
  }).join('');
  const t=tierOf(tierId);
  $('startBtn').textContent=mode==='practice'?'Start practice':tierUnlocked(t)?`Start ${t.name} at ♩ = ${t.bpm}`:'Locked';
  $('startBtn').disabled=mode==='game'&&!tierUnlocked(t);
  updateHud();
}
$('stages').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b||b.disabled) return; stageN=+b.dataset.n; renderMenu();});
$('tiers').addEventListener('click',e=>{const b=e.target.closest('.stage'); if(!b) return; tierId=b.dataset.tier; renderMenu();});
$('sHands').onclick=()=>{side='hands';renderMenu();};
$('sEars').onclick=()=>{side='ears';renderMenu();};
$('eReplay').onclick=()=>{ if(EARS.active&&!EARS.answered) earsPlay(); };
$('eNext').onclick=()=>earsNext();
$('eQuit').onclick=()=>earsFinish(true);
$('eOpts').addEventListener('click',e=>{const b=e.target.closest('.eopt'); if(b&&!b.disabled) earsAnswer(b.dataset.id,'click');});
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
  const keyAvg=CIRCLE.map(pc=>{const fs=QUALS.map(q=>fluency(q.id,pc)).filter(f=>f!==null);return {pc,f:fs.length?fs.reduce((a,b)=>a+b,0)/fs.length:null,n:fs.length};}).filter(k=>k.n>=3).sort((a,b)=>a.f-b.f);
  let sum=`You have played ${seen} of ${total} chord and key combinations.`;
  if(weak.length) sum+=` Weakest right now: ${weak.slice(0,5).map(w=>w.sym).join(', ')}.`;
  if(keyAvg.length>=4) sum+=` Your shakiest key overall is ${rootName(defaultRoot(keyAvg[0].pc,false))}.`;
  if(!seen) sum='Nothing here yet. Play a few runs and each chord in each key fills in as you go.';
  $('progSum').textContent=sum;
  let h='<thead><tr><th></th>'+CIRCLE.map(pc=>`<th>${rootName(defaultRoot(pc,false))}</th>`).join('')+'</tr></thead><tbody>';
  let lastStage=0;
  QUALS.forEach(q=>{
    if(q.stage!==lastStage){ lastStage=q.stage; h+=`<tr class="grp"><td colspan="13">${STAGES[q.stage-1].t}</td></tr>`; }
    h+=`<tr><th>${q.suf||'major'}</th>`+CIRCLE.map(pc=>{
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
