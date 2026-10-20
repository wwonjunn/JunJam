/* Gig: "Why it works". Reads a chart's chord symbols and marks the moves that make it sound the way it does:
   ii–V–I (the front door), the backdoor ii–V (iv → ♭VII7 → I), tritone subs, secondary dominants (V of something
   other than home), passing diminished chords, the minor iv, and between every two chords how far the root moves
   (a 4th up is the strongest pull home; a step lifts; a 3rd changes colour; an out-of-key 3rd is drama).
   Rule-based and key-independent (intervals only), so it reads the same in any key you transpose to. */
const GA_MIN=new Set(['min7','min9','min11','min6','hdim','min','mmaj7']);
const GA_DOM=new Set(['dom7','dom9','dom13','d7b9','d7s9','alt','d7b13','d7s11','sus7']);
const GA_PAT={
  iivi:{name:'ii–V–I',why:'The front door home: a minor 7 up a 4th to a 7 chord, then up another 4th to home. The strongest pull there is: the 7 chord\'s 3rd rises a half step to the root, its 7th falls a half step to the 3rd.'},
  iiv:{name:'ii–V',why:'The first two steps of the front door, without the home chord: it sets up a key and then goes somewhere else (common in standards and city pop).'},
  back:{name:'Backdoor',why:'Home from the flat side: iv minor 7 up a 4th to ♭VII7, then a whole step up to I. Borrowed from the minor key, so it lands warm and wistful instead of bright: the ♭VII7\'s A♭ and F (in C) fall a half step onto G and E.'},
  tri:{name:'Tritone sub',why:'A 7 chord a half step above where it\'s going: it has the same two tense notes as the normal V7 (a G7 in disguise), so it slides down a half step into the next chord.'},
  sec:{name:'V of…',why:'A secondary dominant: a 7 chord that resolves up a 4th to a chord that isn\'t home, as if that chord were home for a moment. It borrows that chord\'s V7 to make arriving there stronger.'},
  pdim:{name:'Passing °',why:'A diminished chord between two chords a whole step apart: its bass fills the gap a half step at a time, and every note of it leans into the next chord.'},
  miv:{name:'Minor iv',why:'IV turning minor: the 6th of the key drops a half step (A to A♭ in C). The bittersweet J-pop and gospel move, borrowed from the minor key.'},
};
const GA_MOVE={5:'↑4th',7:'↓4th',1:'↑½',11:'↓½',2:'↑step',10:'↓step',3:'3rd',4:'3rd',8:'3rd',9:'3rd',6:'tritone'};
const GA_MOVE_WHY={'↑4th':'Up a 4th (down a 5th): the strongest root move, it pulls toward home.','↓4th':'Down a 4th: the reverse, softer, like a plagal "amen".','↑½':'Up a half step: a lift.','↓½':'Down a half step: a slide (often a tritone sub).','↑step':'Up a step: momentum, building.','↓step':'Down a step: walking down.','3rd':'A 3rd: the two chords share notes, so it\'s a colour change more than a move.','3rd!':'An out-of-key 3rd (chromatic mediant): dramatic, cinematic.','tritone':'A tritone away: as far as roots can get, a jolt.'};
/* Annotations for every chord in the chart: map "section|bar|chord" → {role, pat, first, move} */
function gigAnalyze(song){
  const out={}, key=song.key, isMaj=q=>!q.minor&&!GA_DOM.has(q.id);
  const roman=pc=>GIG_NUM[mod12(pc-key.pc)];
  song.sections.forEach(sec=>{
    const seq=[]; let last=null;
    sec.bars.forEach((b,bi)=>b.chords.forEach((c,ci)=>{ if(!c.c) return; const id=`${sec.name}|${bi}|${ci}`;
      if(last&&last.c.root.pc===c.c.root.pc&&last.c.qid===c.c.qid) return;   // the same chord held over
      seq.push(last={id,c:c.c,pc:c.c.root.pc,q:Q[c.c.qid]}); }));
    seq.forEach((x,i)=>{ const a=out[x.id]||(out[x.id]={});
      if(i){ const d=mod12(x.pc-seq[i-1].pc); let m=GA_MOVE[d]; if(m==='3rd'&&isMaj(x.q)&&isMaj(seq[i-1].q)&&[3,4,8,9].includes(d)) m='3rd!'; if(m) a.move=m; } });
    const tag=(xs,pat,roles)=>{ if(xs.some(x=>out[x.id].pat)) return; xs.forEach((x,k)=>{ Object.assign(out[x.id],{pat,role:roles[k],first:k===0}); }); };
    for(let i=0;i<seq.length;i++){
      const a=seq[i], b=seq[i+1], c=seq[i+2], up=(x,y)=>y&&mod12(y.pc-x.pc);
      if(b&&GA_MIN.has(a.q.id)&&GA_DOM.has(b.q.id)&&up(a,b)===5){
        if(c&&up(b,c)===5) tag([a,b,c],'iivi',['ii','V','I']);
        else if(c&&up(b,c)===2) tag([a,b,c],'back',['iv','♭VII7','I']);
        else tag([a,b],'iiv',['ii','V']); }
    }
    for(let i=0;i<seq.length;i++){
      const a=seq[i], b=seq[i+1], c=seq[i+2], up=(x,y)=>y&&mod12(y.pc-x.pc);
      if(GA_DOM.has(a.q.id)&&b){
        if(up(a,b)===11) tag([a,b],'tri',['subV','→']);
        else if(up(a,b)===2&&isMaj(b.q)) tag([a,b],'back',['♭VII7','I']);
        else if(up(a,b)===5&&mod12(b.pc-key.pc)!==0) tag([a,b],'sec',[`V/${roman(b.pc)}`,roman(b.pc)]); }
      if(b&&c&&(b.q.id==='dim7'||b.q.id==='dim')&&up(a,b)===1&&up(b,c)===1) tag([a,b,c],'pdim',['','°','']);
      if(b&&mod12(a.pc-key.pc)===5&&isMaj(a.q)&&b.pc===a.pc&&b.q.minor) tag([a,b],'miv',['IV','iv']);
    }
  });
  return out;
}
function gigAnHTML(an){ if(!an) return '';
  const p=an.pat?GA_PAT[an.pat]:null;
  return `<span class="gan">${an.move?`<i class="gmv" data-gmv="${an.move}">${an.move==='3rd!'?'3rd ✦':an.move}</i>`:''}${p&&an.role?`<b class="grole gp-${an.pat}">${gigAccHTML(an.role)}</b>`:''}${p&&an.first?`<span class="gpat gp-${an.pat}" data-gpat="${an.pat}">${p.name}</span>`:''}</span>`;
}
