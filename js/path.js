/* The recommended order in every mode. Nothing is locked: a card ahead of the path is dimmed, and picking it says what's
   recommended first, the way a game map shows the next world. Voicings keeps its own path (VPATH, in voicings/session.js).
   Chords: NEXT_ORDER (hands.js), stages and progressions woven together: triads and sevenths, then the pop progressions
   that only need those, then sixths and sus, the jazz progressions, the extended and altered stages, the bosses.
   Ears: hear notes in a key, then the distance between two notes, then whole melodies, then chords, then progressions.
   Lines: Medium after five Easy licks with a star, Hard after five Medium. Reharm: its three tiers in order. */
const ARC_PATH=['degrees','intervals','melody','chords','progs'];
const LINES_GATE=5, RH_GATE=3;
// a Chords stage or progression by name
const pathName=id=>{ id=String(id); if(id.startsWith('p:')){ const p=PROG[id.slice(2)], b=PBOSS.find(x=>'p:'+x.id===id); return p?p.short:b?`the boss of ${PROGS.slice(b.from,b.to).map(x=>x.short).join(', ')}`:id==='p:mix'?'the chapter boss':'the final boss'; }
  const st=STAGE[+id]; return !st?id:st.boss?`the boss of stages ${st.boss[0]}–${st.boss[st.boss.length-1]}`:st.chapter?'the chapter boss':st.t; };
const chordsStep=id=>NEXT_ORDER.indexOf(String(id))+1;
// the step before this one, if neither has a star yet
function chordsPrereq(id){ id=String(id); if(starsOf(id)) return null; const i=NEXT_ORDER.indexOf(id); if(i<=0) return null; const p=NEXT_ORDER[i-1]; return starsOf(p)?null:p; }
const chordsAhead=id=>{ const nx=nextUp(); return !starsOf(String(id))&&nx&&NEXT_ORDER.indexOf(String(id))>NEXT_ORDER.indexOf(nx); };
function chordsPathNote(id){ const p=chordsPrereq(id); return p?`Recommended first: ★ on ${pathName(p)} (step ${chordsStep(p)}).`:''; }
// Ears worlds in the game
const earsNextWorld=()=>ARC_PATH.find(w=>!arcStars(w))||ARC_PATH.find(w=>arcStars(w)<3)||ARC_PATH[0];
function earsPrereq(w){ const i=ARC_PATH.indexOf(w); if(i<=0||arcStars(w)) return null; const p=ARC_PATH[i-1]; return arcStars(p)?null:p; }
// Lines: how many licks of a difficulty have a star
const linesStarred=d=>allLicks().filter(l=>l.diff===d&&LDATA.stars[l.id]).length;
function linesPathNote(d){ if(d<2) return ''; const n=linesStarred(d-1); return n>=LINES_GATE?'':`Recommended first: a star on ${LINES_GATE} ${LDIFF[d-1]} licks (${n} so far).`; }
// Reharm tiers
const RH_TIER=['','Everyday moves','Colour and motion','The modern sound'];
function reharmPathNote(t){ if(t<2) return ''; const n=REHARM_MOVES.filter(m=>m.tier===t-1&&RHDATA.stars[m.id]).length; return n>=RH_GATE?'':`Recommended after ★ on ${RH_TIER[t-1].toLowerCase()} (${n} of ${RH_GATE}).`; }
// the home cards: what's next in each mode
function modeNextText(id){
  if(id==='hands'){ const n=nextUp(); return n?`Next: ${pathName(n)}`:''; }
  if(id==='voicings') return `Next: ${vcTypeName(vcNextType())}`;
  if(id==='ears') return `Next: ${arcWorld(earsNextWorld()).name}`;
  if(id==='lines'){ const d=[1,2,3].find(d=>linesStarred(d)<LINES_GATE)||3; return `Next: ${LDIFF[d]} licks`; }
  if(id==='reharm'){ const m=[...REHARM_MOVES].sort((a,b)=>a.tier-b.tier).find(m=>!RHDATA.stars[m.id]); return m?`Next: ${m.name}`:''; }
  return '';
}
