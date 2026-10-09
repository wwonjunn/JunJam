/* ---------------- spaced review for Chords ----------------
   Every chord in every key (E♭m11 is one item, Em11 another) has a memory. A chord you miss, play slowly or need the
   hint for joins a small re-learning set and comes back after a few other chords, not straight away (your hand would
   still be there). Each quick, first-try return pushes the next one further out (about 3 → 7 → 16 chords); a slip
   pulls it back in. Gaps are jittered, two reviews never sit side by side, at most two of any six chords are
   reviews, and a review that's only just due may wait a chord or two, so it never settles into a rhythm. When a chord's gap outgrows a run it graduates to days: tomorrow, then a
   few days, then a week or more, and the ones that come due are mixed into your next runs on that stage.
   "Slow" and "quick" are measured against your own typical time, not a fixed number. */
let SRS=store.get('srs',{});
const SRS_SET=5, SRS_GRAD=26, SRS_FIRST=3;
const srsDay=()=>Math.floor(Date.now()/864e5);
const srsItem=k=>SRS[k]||(SRS[k]={ease:2.3,days:0,due:0,reps:0,lapses:0});
const srsJit=g=>Math.max(2,Math.round(g*(0.8+Math.random()*0.45)));
// A run's review state: n counts the chords served so far, learn holds the re-learning set (key -> {due, gap})
function srsStart(pool){
  const S={n:0,reviews:0,lastReview:false,recent:[],hist:[],learn:new Map(),wait:[],graduated:[],keys:new Set(pool)};
  // chords that came due since last time are seeded in, spread out, most overdue first
  const due=[...S.keys].filter(k=>SRS[k]&&SRS[k].reps&&SRS[k].due<=srsDay()).sort((a,b)=>SRS[a].due-SRS[b].due);
  due.slice(0,SRS_SET).forEach((k,i)=>S.learn.set(k,{due:2+i*3+Math.floor(Math.random()*2),gap:SRS_FIRST,from:'due'}));
  S.wait=due.slice(SRS_SET);
  return S;
}
// The next chord, if a review is owed: the most overdue one that isn't among the last two chords, never two reviews in a row
function srsPick(S){
  if(!S||S.lastReview||S.hist.filter(Boolean).length>=2) return null;   // never two in a row, at most two in six
  const owed=[...S.learn.entries()].filter(([k,L])=>L.due<=S.n&&!S.recent.includes(k));
  if(!owed.length) return null;
  owed.sort((a,b)=>(a[1].due-b[1].due)||(Math.random()-.5));
  const [k,L]=owed[0];
  // the longer it's been waiting the likelier it comes now; a review just due often waits a chord or two, so nothing lands on a beat
  if(Math.random()>Math.min(0.9,0.35+0.18*(S.n-L.due))) return null;
  return k;
}
function srsServed(S,key,review){ if(!S) return; S.n++; S.lastReview=!!review; if(review) S.reviews++; S.recent=[key,...S.recent].slice(0,2); S.hist=[!!review,...S.hist].slice(0,6); }
// Your typical time for a chord this run (the median of the clean ones), or a sensible start before there are enough
function srsTypical(times){ const t=[...times].sort((a,b)=>a-b); return t.length>=4?t[t.length>>1]:4; }
function srsGrade(secs,clean,typical){
  if(!clean) return 'fail';
  if(secs>Math.max(typical*1.6,typical+1.5)) return 'slow';
  return secs<typical*0.8?'fast':'good';
}
/* One result. grade: fail (missed, escaped or hinted), slow, good, fast */
function srsResult(S,key,grade){
  if(!S||!S.keys.has(key)) return;
  const it=srsItem(key), L=S.learn.get(key);
  if(grade==='fail'||grade==='slow'){
    if(grade==='fail'){ it.lapses++; it.ease=Math.max(1.4,it.ease-0.2); it.days=0; }
    else it.ease=Math.max(1.4,it.ease-0.05);
    it.due=srsDay();                                  // it comes due again for the next run too
    const gap=L?(grade==='fail'?SRS_FIRST:Math.max(SRS_FIRST,Math.round(L.gap*0.7))):SRS_FIRST;
    if(L||S.learn.size<SRS_SET) S.learn.set(key,{due:S.n+srsJit(gap),gap,from:L?L.from:'miss'});
    else if(!S.wait.includes(key)) S.wait.push(key);
  } else {
    it.reps++;
    if(grade==='fast') it.ease=Math.min(2.8,it.ease+0.05);
    if(L){ const gap=Math.round(L.gap*it.ease*(grade==='fast'?1.3:1));
      if(gap>=SRS_GRAD){ S.learn.delete(key); S.graduated.push(key); it.days=Math.max(1,it.days); it.due=srsDay()+it.days; srsAdmit(S); }
      else S.learn.set(key,{...L,due:S.n+srsJit(gap),gap}); }
    else if(it.due<=srsDay()){ it.days=it.days?Math.round(it.days*it.ease):1; it.due=srsDay()+it.days; }  // seen in passing, on time
  }
  store.set('srs',SRS);
}
// a chord waiting for a free place in the re-learning set takes it, a few chords out
function srsAdmit(S){ while(S.wait.length&&S.learn.size<SRS_SET){ const k=S.wait.shift(); S.learn.set(k,{due:S.n+srsJit(3),gap:SRS_FIRST,from:'wait'}); } }
