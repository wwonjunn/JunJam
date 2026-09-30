/* ---------------- state ---------------- */
const $=id=>document.getElementById(id);
const store={get(k,d){try{const v=localStorage.getItem('mtc:'+k);return v===null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem('mtc:'+k,JSON.stringify(v));}catch(e){}}};
const opts={rootless:store.get('rootless',true),weird:store.get('weird',false),sound:store.get('sound',true),metro:store.get('metro',false)};
// stageN: a chord stage number, or 'p:<progression id>' / 'p:mix' for Progressions
// v2 save format: stage 6 used to be ii–V–I; that moved to Progressions and stage 6 is now Pop colours
if(store.get('v',1)<2){
  if(store.get('stage')===6) store.set('stage','p:iiVI');
  const b=store.get('best2',{});
  Object.keys(b).forEach(k=>{ const [tier,st]=k.split(':'); if(st==='6'){ b[tier+':p:iiVI']=b[k]; delete b[k]; } });
  store.set('best2',b); store.set('v',2);
}
const validStage=s=>typeof s==='number'?s>=1&&s<=STAGES.length:s==='p:mix'||(typeof s==='string'&&!!PROG[s.slice(2)]);
let stageN=store.get('stage',2); if(!validStage(stageN)) stageN=Math.min(STAGES.length,+stageN||2); // e.g. the removed stage 8
let G=null; // running game
opts.smart=store.get('smart',true);
let STATS=store.get('stats',{});
const statKey=(qid,pc)=>qid+':'+pc;
function fluency(qid,pc){
  const s=STATS[statKey(qid,pc)]; if(!s||!s.n) return null;
  const acc=(s.ft||0)/s.n, speed=Math.min(1,Math.max(0,(8-(s.t==null?8:s.t))/6));
  return 0.6*acc+0.4*speed;
}
const weightOf=(qid,pc)=>{const f=fluency(qid,pc); return f===null?2.5:1+3*(1-f);};
function recordStat(t,kind,secs,firstTry){
  const k=statKey(t.q.id,t.root.pc), s=STATS[k]||(STATS[k]={n:0,ft:0,t:null,miss:0,esc:0});
  if(kind==='clear'){ s.n++; if(firstTry) s.ft++; s.t=s.t==null?secs:s.t*0.7+secs*0.3; }
  else if(kind==='esc'){ s.n++; s.esc++; s.t=s.t==null?10:s.t*0.7+10*0.3; }
  else if(kind==='miss'){ s.miss++; }
  store.set('stats',STATS);
}
function weightedPick(items){ const tot=items.reduce((a,x)=>a+x.w,0); let r=Math.random()*tot; for(const x of items){ r-=x.w; if(r<=0) return x; } return items[items.length-1]; }
let lastTarget=null;

/* ---------------- key profile (shared by Hands and Ears) ----------------
   How shaky each of the 12 keys is, 0 solid to 1 shaky. Hands: fluency of every chord played in that key.
   Ears: accuracy and speed of answers in that key (EARDATA.keys, times scaled by the world's target). */
function handsKeyStat(pc){
  let n=0, w=0;
  QUALS.forEach(q=>{ const f=fluency(q.id,pc); if(f!==null){ const s=STATS[statKey(q.id,pc)]; n+=s.n; w+=s.n*(1-f); } });
  return {n,weak:n?w/n:0.5};
}
function earsKeyStat(pc){
  const s=(EARDATA.keys||{})[pc]; if(!s||!s.n) return {n:0,weak:0.5};
  const speed=s.t==null?0:Math.min(1,Math.max(0,(2-s.t)/1.5));
  return {n:s.n,weak:1-(0.6*s.ok/s.n+0.4*speed)};
}
// Blend both sides. The side asking trusts its own data twice as much; a neutral prior fills in until there is data.
function keyWeak(pc,side){
  const h=handsKeyStat(pc), e=earsKeyStat(pc), c=n=>n/(n+5);
  const wh=c(h.n)*(side==='hands'?2:1), we=c(e.n)*(side==='ears'?2:1), wp=0.5;
  return (wh*h.weak+we*e.weak+wp*0.5)/(wh+we+wp);
}
const keyWeight=(pc,side)=>1+3*keyWeak(pc,side);
// The keys getting the biggest push right now, for display. Null until anything has been recorded.
function pushedKeys(n=3){
  const pcs=[...Array(12).keys()];
  if(!pcs.some(pc=>handsKeyStat(pc).n||earsKeyStat(pc).n)) return null;
  return pcs.map(pc=>({pc,w:keyWeak(pc)})).sort((a,b)=>b.w-a.w).slice(0,n).map(k=>rootName(defaultRoot(k.pc,false))).join(', ');
}


/* ---------------- shared XP and rank (both Hands and Ears feed it) ---------------- */
const RANKS=[[0,'Woodshedder'],[500,'Sitting in'],[2000,'Sideman'],[6000,'Bandleader'],[15000,'Legend']];
const starStr=n=>'★'.repeat(n)+'☆'.repeat(3-n);
function addXP(n){ if(n>0) store.set('xp',store.get('xp',0)+Math.round(n)); }
function rankLine(){
  const xp=store.get('xp',0); let i=0; while(i+1<RANKS.length&&xp>=RANKS[i+1][0]) i++;
  const next=RANKS[i+1];
  return `${RANKS[i][1]}, ${xp.toLocaleString()} XP`+(next?`. ${ (next[0]-xp).toLocaleString()} more to ${next[1]}.`:'.');
}
