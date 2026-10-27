/* Lines practice: a line of the week and a short daily session. No race and no rhythm grading: the notes in order,
   over their chord, in any octave, as in the drill (whose engine this uses; the library and drill stay as Classic).
   Line of the week: one line for the whole week. The first session learns it in its own key and goes straight on into
   that day's new keys; each day has its share of keys from memory, spread over the days that are left, so it reaches all
   12 by Sunday (start midweek and each day takes a few more). The keys go round the circle of 4ths (C F B♭ E♭...), the
   way players work a line through all 12, and "All the keys left" does the rest in one go. All 12 done: it joins your
   vocabulary with a badge. After a session, play any chord to carry on.
   Daily practice, about five minutes, one button: today's new keys of the weekly line (and one key you've done, to keep
   it), three older lines that are due back (spaced review: each clean one waits longer next time, about 1, 2, 5, 11
   days; a slip brings it back tomorrow), and one new line to learn. Playing it keeps a day streak. */
LDATA.week=LDATA.week||{}; LDATA.srs=LDATA.srs||{}; LDATA.daily=LDATA.daily||{}; LDATA.vocab=LDATA.vocab||{};
const lpDay=()=>arcDay(), lpDayN=()=>Math.floor(new Date(lpDay()+'T12:00:00').getTime()/864e5);   // a day number, from the local date
const LP_KEYS=12;
// the order the weekly line visits the keys: its own key, then round the circle of 4ths (C F B♭ E♭ A♭ D♭ G♭ B E A D G)
const lpKeyOrder=()=>[...Array(12)].map((_,i)=>mod12(i*5));
// candidates for a weekly line: real lines of a fair length, not already in your vocabulary, easiest first as you go
function lpWeeklyPool(){ const all=allLicks().filter(l=>l.notes.length>=5&&l.notes.length<=16&&!LDATA.vocab[l.id]);
  const lvl=Math.min(3,1+Math.floor(Object.keys(LDATA.vocab).length/4)); return all.filter(l=>l.diff<=lvl).length?all.filter(l=>l.diff<=lvl):all; }
function lpWeek(){
  const id=arcWeek(); let w=LDATA.week[id];
  if(!w||!lickById(w.id)){ const pool=lpWeeklyPool().length?lpWeeklyPool():allLicks(), rng=arcRng(arcSeed('line'+id)); w=LDATA.week[id]={id:pool[Math.floor(rng()*pool.length)].id,done:[],learned:false,days:{}}; saveLines(); }
  return w;
}
// days left in this week, today included (the week ends on Sunday)
const lpDaysLeft=()=>{ const d=new Date().getDay(); return d===0?1:8-d; };
// Today's share, fixed for the day the first time it's asked for (so finishing it doesn't hand out more): the learn key
// on the first day, then the next keys round the circle, never more than 6 new ones in a day
function lpTodayKeys(w){
  const order=lpKeyOrder(), day=lpDay(); w.quota=w.quota||{};
  if(!w.quota[day]){ const left=order.filter(k=>!w.done.includes(k)), fresh=left.filter(k=>w.learned||k!==order[0]);
    w.quota[day]=[...(w.learned||!left.includes(order[0])?[]:[order[0]]),...fresh.slice(0,Math.min(6,Math.max(1,Math.ceil(fresh.length/lpDaysLeft()))))]; saveLines(); }
  return w.quota[day].filter(k=>!w.done.includes(k));
}
const lpKeysLeft=w=>lpKeyOrder().filter(k=>!w.done.includes(k));
// lines due back today, most overdue first
function lpDue(){ const t=lpDayN(); return Object.entries(LDATA.srs).filter(([id,s])=>lickById(id)&&s.due<=t).sort((a,b)=>a[1].due-b[1].due).map(([id])=>id); }
function lpNewLine(exclude){ const seen=new Set([...Object.keys(LDATA.srs),...Object.keys(LDATA.stars)]);
  const pool=allLicks().filter(l=>!seen.has(l.id)&&!exclude.includes(l.id)&&l.notes.length>=3); if(!pool.length) return null;
  const d=Math.min(...pool.map(l=>l.diff)); const easy=pool.filter(l=>l.diff===d); return easy[Math.floor(Math.random()*easy.length)]; }
const lpRandKey=(not=0)=>{ let k; do{ k=Math.floor(Math.random()*12); } while(k===not); return k; };
// Today's session, as drill steps: {id, key, learn, label, kind}
function lpPlan(kind){
  const w=lpWeek(), plan=[];
  const weekly=all=>{ const keys=all?lpKeysLeft(w):lpTodayKeys(w), own=lpKeyOrder()[0];
    keys.forEach(k=>{ const learn=!w.learned&&k===own; plan.push({id:w.id,key:k,learn,label:'Line of the week'+(learn?': learn it':': new key'),kind:'week'}); });
    if(!all&&w.learned&&w.done.length>1&&keys.length) plan.push({id:w.id,key:w.done[Math.floor(Math.random()*w.done.length)],learn:false,label:'Line of the week: a key you have',kind:'weekkeep'}); };
  if(kind==='week'||kind==='weekall'){ weekly(kind==='weekall'); return plan; }
  weekly();
  lpDue().filter(id=>id!==w.id).slice(0,3).forEach(id=>plan.push({id,key:lpRandKey(),learn:false,label:'Review',kind:'review'}));
  const nl=lpNewLine([w.id,...plan.map(p=>p.id)]); if(nl){ plan.push({id:nl.id,key:0,learn:true,label:'New line: learn it',kind:'new'}); plan.push({id:nl.id,key:lpRandKey(),learn:false,label:'New line: another key',kind:'new2'}); }
  return plan;
}
function lpStart(kind){
  const plan=lpPlan(kind); if(!plan.length){ renderLinesPane(); return; }
  Object.assign(LINES,{active:true,lick:lickById(plan[0].id),keys:[],round:0,clean:0,results:[],bus:null,xp:0,advance:0,plan,planKind:kind,after:null});
  synth.init(); hideOv(); document.body.classList.add('nohud','linesmode'); document.body.classList.remove('menu');
  $('linesStage').hidden=false; $('lResults').hidden=true; $('lPlay').hidden=false;
  linesRound();
}
// after the session: the weekly line's keys, spaced review, the streak
function lpFinish(quit){
  const L=LINES, w=lpWeek(), t=lpDayN();
  L.results.forEach(r=>{ const st=r.step; if(!st) return;
    if(st.kind==='week'){ if(!w.done.includes(st.key)) w.done.push(st.key); if(st.learn) w.learned=true; }
    if(st.kind==='review'||st.kind==='new2'){ const s=LDATA.srs[st.id]||{gap:0,reps:0};
      s.gap=r.clean?Math.max(1,Math.round((s.gap||0.5)*2.2)):1; s.reps++; s.due=t+s.gap; LDATA.srs[st.id]=s; } });
  if(L.results.some(r=>r.step&&r.step.kind==='week')) w.days[lpDay()]=(w.days[lpDay()]||0)+L.results.filter(r=>r.step&&r.step.kind==='week').length;
  const finishedWeek=w.done.length>=LP_KEYS&&!LDATA.vocab[w.id]; if(finishedWeek){ LDATA.vocab[w.id]=arcWeek(); const s=LDATA.srs[w.id]||{}; LDATA.srs[w.id]={gap:7,reps:(s.reps||0)+1,due:t+7}; }
  if(L.results.length&&L.planKind==='daily') LDATA.daily[lpDay()]={steps:L.results.length,clean:L.results.filter(r=>r.clean).length};
  addXP(L.xp+(finishedWeek?150:0)); saveLines();
  $('lPlay').hidden=true; $('lResults').hidden=false;
  const lick=id=>lickById(id), rows=L.results.map(r=>`<li><b>${r.step.label}</b> ${lick(r.step.id).name}, in ${keyName(r.ref,false).replace(' major','')}: ${r.step.learn?'learned':r.clean?'clean':r.revealed?'with the notes showing':`${r.mistakes} restart${r.mistakes>1?'s':''}`}</li>`).join('');
  const streak=lpStreak(), left=lpKeysLeft(w).length, more=!quit&&w.learned&&left>0;
  $('lResults').innerHTML=`<h2>${quit?'Session ended':finishedWeek?'All 12 keys: it\'s yours':'Practice done'}</h2>
    <ul class="lkeys">${rows}</ul>
    <p>${finishedWeek?`🏅 <b>${lick(w.id).name}</b> joins your vocabulary. It'll come back for review now and then.`:`Line of the week: ${w.done.length} of ${LP_KEYS} keys.`}${L.planKind==='daily'&&L.results.length?` 🔥 ${streak}-day streak.`:''} +${L.xp} XP.</p>
    ${more?`<p class="fine">Play any chord for the ${left} key${left>1?'s':''} left of the line of the week.</p><button class="go" id="lMore">All ${left} keys left</button><button class="ghost" id="lBack">Back to Lines</button>`:'<p class="fine">Play any chord to go back.</p><button class="go" id="lBack">Back to Lines</button>'}`;
  $('lBack').onclick=linesToMenu; if(more) $('lMore').onclick=()=>lpStart('weekall'); ($('lMore')||$('lBack')).focus();
  L.after=more?()=>lpStart('weekall'):linesToMenu;   // the next chord you play
}
function lpStreak(){ let n=0; const d=new Date(); if(!LDATA.daily[arcDay(d)]) d.setDate(d.getDate()-1); while(LDATA.daily[arcDay(d)]){ n++; d.setDate(d.getDate()-1); } return n; }

/* ---------------- the cards at the top of Lines ---------------- */
function lpPaneHTML(){
  const w=lpWeek(), L=lickById(w.id), inst=lickInstance(L,0), order=lpKeyOrder(), today=lpTodayKeys(w), done=LDATA.daily[lpDay()], streak=lpStreak();
  const due=lpDue().filter(id=>id!==w.id).length, plan=lpPlan('daily');
  const cal=[...Array(14)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-13+i); const r=LDATA.daily[arcDay(d)]; return `<i class="${r?'on':''}${i===13?' today':''}" title="${arcDay(d)}">${r?'✓':''}</i>`; }).join('');
  const dots=order.map(k=>`<i class="${w.done.includes(k)?'on':today.includes(k)?'next':''}" title="${keyName(k,false).replace(' major','')}">${rootName(defaultRoot(k,false))}</i>`).join('');
  const vocab=Object.keys(LDATA.vocab).filter(id=>lickById(id));
  return `<div class="arctoday lptoday">
    <button class="arcw arcday" data-lp="daily"><span class="lt">Today's practice ${done?'✓':''}</span><span class="lst">${done?`Done today (${done.clean} of ${done.steps} clean). Again for more practice.`:`About five minutes: ${today.length?`${today.length} new key${today.length>1?'s':''} of the line of the week, `:''}${due?`${Math.min(3,due)} line${Math.min(3,due)>1?'s':''} due back, `:''}one new line. ${plan.length} steps.`}</span><span class="fine">${streak?`🔥 ${streak}-day streak`:'Start a streak'}</span><span class="arccal">${cal}</span></button>
    <div class="arcw arcweek lpweek"><span class="lt">Line of the week${LDATA.vocab[w.id]?' 🏅':''}</span><span class="lst"><b>${L.name}</b> · ${lickLabel(L)} · over ${inst.chords.map(c=>symText(c)).join(' → ')}</span>
      <span class="lpkeys">${dots}</span><span class="fine">${w.done.length>=LP_KEYS?'All 12 keys done this week.':w.learned?`${w.done.length} of 12 keys. Today: ${today.map(k=>rootName(defaultRoot(k,false))).join(', ')||'done'}.`:`Not learned yet: the first session teaches it in C${today.length>1?`, then ${today.length-1} new key${today.length===2?'':'s'} round the circle of 4ths`:''}.`}</span>
      <span class="erow" style="margin-top:6px">${today.length?`<button class="go" data-lp="week">${w.learned?`Today's keys (${today.length})`:'Learn it'}</button>`:''}${w.learned&&lpKeysLeft(w).length>today.length?`<button class="${today.length?'ghost':'go'}" data-lp="weekall">All ${lpKeysLeft(w).length} keys left</button>`:''}${!w.learned?'<button class="ghost" data-lp="swap">A different line</button>':''}</span></div></div>
    ${vocab.length?`<p class="fine">Your vocabulary 🏅 ${vocab.map(id=>lickById(id).name).join(', ')}</p>`:''}
    <div class="sec arcclassic">Classic library <span class="fine">every line, the learn-then-five-keys drill</span></div>`;
}
function lpSwap(){ const id=arcWeek(), w=LDATA.week[id]; if(!w||w.learned) return; const pool=lpWeeklyPool().filter(l=>l.id!==w.id); if(!pool.length) return;
  w.id=pool[Math.floor(Math.random()*pool.length)].id; saveLines(); renderLinesPane(); }
