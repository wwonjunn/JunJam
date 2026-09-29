/* ---------------- state ---------------- */
const $=id=>document.getElementById(id);
const store={get(k,d){try{const v=localStorage.getItem('mtc:'+k);return v===null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem('mtc:'+k,JSON.stringify(v));}catch(e){}}};
const opts={rootless:store.get('rootless',true),weird:store.get('weird',false),sound:store.get('sound',true),metro:store.get('metro',false)};
let stageN=store.get('stage',2);
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


/* ---------------- shared XP and rank (both Hands and Ears feed it) ---------------- */
const RANKS=[[0,'Woodshedder'],[500,'Sitting in'],[2000,'Sideman'],[6000,'Bandleader'],[15000,'Legend']];
function addXP(n){ if(n>0) store.set('xp',store.get('xp',0)+Math.round(n)); }
function rankLine(){
  const xp=store.get('xp',0); let i=0; while(i+1<RANKS.length&&xp>=RANKS[i+1][0]) i++;
  const next=RANKS[i+1];
  return `${RANKS[i][1]}, ${xp.toLocaleString()} XP`+(next?`. ${ (next[0]-xp).toLocaleString()} more to ${next[1]}.`:'.');
}
