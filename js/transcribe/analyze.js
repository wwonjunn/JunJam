/* Transcribe: turn the helper's raw notes (seconds) into a score (beats, bars, chords). Pure, no DOM.
   Tested by tests/theory.test.js. The helper does the listening; this does the music. */

// Beat trackers often miss the first or last beats: extend the grid back to the start and on to the end
function fillBeats(beats,duration){
  const b=beats.length>1?[...beats]:[0,.5], gap=(b[b.length-1]-b[0])/(b.length-1);
  while(b[0]-gap>-gap*.35) b.unshift(b[0]-gap);
  while(b[b.length-1]+gap<duration+gap) b.push(b[b.length-1]+gap);
  return b;
}
// Seconds → beats, following the detected beats (so a recording that drifts in tempo still lines up)
function beatMapper(beats,shift=0){
  const b=beats.length>1?beats:[0,.5], gap=(b[b.length-1]-b[0])/(b.length-1);
  return t=>{
    if(t<=b[0]) return (t-b[0])/(b[1]-b[0]||gap)-shift;
    if(t>=b[b.length-1]) return b.length-1+(t-b[b.length-1])/gap-shift;
    let lo=0, hi=b.length-1; while(hi-lo>1){ const m=(lo+hi)>>1; if(b[m]<=t) lo=m; else hi=m; }
    return lo+(t-b[lo])/(b[lo+1]-b[lo])-shift;
  };
}
// One line from many notes: at each onset keep the highest confident note (the "skyline"), no overlaps
function topLine(notes,{minConf=.3,minLen=.06,lo=0,hi=127}={}){
  const ok=notes.filter(n=>n.c>=minConf&&n.e-n.s>=minLen&&n.p>=lo&&n.p<=hi).sort((a,b)=>a.s-b.s||b.p-a.p);
  const out=[];
  for(const n of ok){
    const last=out[out.length-1];
    if(last&&n.s-last.s<.04){ if(n.p>last.p) out[out.length-1]={...n}; continue; } // same moment: the top note wins
    if(last&&last.e>n.s) last.e=n.s;                                                     // cut the one before
    out.push({...n});
  }
  return out.filter(n=>n.e-n.s>=.03);
}
// The written melody in beats, cleaned up like the licks (gridTimes); lead sheets also drop ornaments
function melodyBeats(line,toBeat,lead){
  let notes=line.map(n=>({midi:n.p,at:toBeat(n.s),dur:Math.max(.05,toBeat(n.e)-toBeat(n.s)),c:n.c})).filter(n=>n.at>-.25);
  if(lead) notes=notes.filter((n,i)=>n.dur>=.2||(notes[i+1]&&notes[i+1].at-n.at>=.4));       // grace notes and turns go
  const g=gridTimes(notes.map(n=>({at:Math.max(0,n.at),dur:n.dur})));
  return notes.map((n,i)=>({midi:n.midi,gat:lead?Math.round(g[i].gat*2)/2:g[i].gat,gdur:g[i].gdur,tri:!lead&&g[i].tri}))
    .filter((n,i,a)=>!lead||i===0||n.gat>a[i-1].gat).map((n,i,a)=>lead&&a[i+1]?{...n,gdur:Math.min(Math.max(n.gdur,.5),a[i+1].gat-n.gat)}:n);
}
// Chords: score every root and chord type against how much each pitch class sounds in the window
const CHORD_TYPES=['maj','min','dom7','maj7','min7','hdim','dim7','sus7','six','min6'];
function chordAt(bassNotes,harmNotes,t0,t1,minWeight=0){
  const w=Array(12).fill(0); let low=null, lowW=0;
  const add=(n,k)=>{ const ov=Math.min(n.e,t1)-Math.max(n.s,t0); if(ov>0) w[mod12(n.p)]+=ov*(.4+n.c)*k; return ov; };
  bassNotes.forEach(n=>{ const ov=add(n,2); if(ov>lowW){ lowW=ov; low=mod12(n.p); } });
  harmNotes.forEach(n=>add(n,1));
  const max=Math.max(...w), total=w.reduce((a,b)=>a+b,0); if(max<=0||total<minWeight) return null;
  let best=null;
  for(let r=0;r<12;r++) for(const id of CHORD_TYPES){
    const q=Q[id], tones=[...new Set([...q.ct,...q.req])].map(iv=>mod12(r+iv));
    const inW=tones.reduce((a,pc)=>a+w[pc],0), outW=w.reduce((a,x,pc)=>a+(tones.includes(pc)?0:x),0);
    const weakTone=Math.min(...tones.map(pc=>w[pc]))/max;                        // every chord tone should really sound
    const sc=inW-.55*outW-.06*tones.length*max+(low===r?.35*max:0)+(weakTone<.08?-.3*max:0);
    if(!best||sc>best.sc) best={root:r,qid:id,sc};
  }
  return best;
}
function chordsPerBar(bassNotes,harmNotes,toSec,bars,perBar=1){
  const out=[]; const len=4/perBar;
  // how much sounds in a typical bar, so near-silent stretches (fades, gaps) don't get a chord
  const load=b=>{ const t0=toSec(b*len), t1=toSec((b+1)*len); return [...bassNotes,...harmNotes].reduce((a,n)=>a+Math.max(0,Math.min(n.e,t1)-Math.max(n.s,t0))*(.4+n.c),0); };
  const loads=[...Array(bars*perBar).keys()].map(load).sort((a,b)=>a-b), typical=loads[Math.floor(loads.length*.6)]||0;
  for(let b=0;b<bars;b++) for(let h=0;h<perBar;h++){
    const at=b*4+h*len, c=chordAt(bassNotes,harmNotes,toSec(at),toSec(at+len),typical*.2);
    if(c) out.push({at,root:c.root,qid:c.qid});
  }
  return out.filter((c,i,a)=>i===0||c.root!==a[i-1].root||c.qid!==a[i-1].qid);     // a chord lasts until it changes
}
// Key: correlate the melody and harmony with major and minor key profiles (Krumhansl–Kessler)
const KK_MAJ=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88], KK_MIN=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];
function guessKey(notes){
  const w=Array(12).fill(0); notes.forEach(n=>w[mod12(n.p)]+=(n.e-n.s)*(.4+n.c));
  let best={pc:0,minor:false,r:-9};
  for(let k=0;k<12;k++) for(const [prof,minor] of [[KK_MAJ,false],[KK_MIN,true]]){
    const xs=w, ys=xs.map((_,i)=>prof[mod12(i-k)]), mx=xs.reduce((a,b)=>a+b,0)/12, my=ys.reduce((a,b)=>a+b,0)/12;
    const num=xs.reduce((a,x,i)=>a+(x-mx)*(ys[i]-my),0), den=Math.sqrt(xs.reduce((a,x)=>a+(x-mx)**2,0)*ys.reduce((a,y)=>a+(y-my)**2,0))||1;
    if(num/den>best.r) best={pc:k,minor,r:num/den};
  }
  return best;
}
// Instruments: which stem the helper should transcribe, and the range the line lives in
const TR_INSTRUMENTS={piano:{name:'Piano (right hand)',stem:'piano',lo:55,hi:100},guitar:{name:'Guitar',stem:'guitar',lo:40,hi:88},
  sax:{name:'Saxophone',stem:'other',lo:44,hi:84},trumpet:{name:'Trumpet',stem:'other',lo:52,hi:84},voice:{name:'Voice',stem:'vocals',lo:45,hi:84},bass:{name:'Bass',stem:'bass',lo:24,hi:60}};
// Build the whole score from the helper's answer
function buildScore(res,{mode,instrument,shift=0,title='Untitled'}){
  const toBeat=beatMapper(fillBeats(res.beats,res.duration),shift), inst=TR_INSTRUMENTS[instrument]||TR_INSTRUMENTS.piano, lead=mode==='lead';
  const line=topLine(res.notes.target,{lo:inst.lo,hi:inst.hi,minConf:lead?.35:.3});
  const melody=melodyBeats(line,toBeat,lead);
  const totalBeats=Math.max(4,...melody.map(n=>n.gat+n.gdur),toBeat(res.duration));
  const bars=Math.ceil(totalBeats/4);
  // beats back to seconds for the chord windows
  const toSec=b=>{ let lo=-50,hi=res.duration+50; for(let i=0;i<40;i++){ const m=(lo+hi)/2; if(toBeat(m)<b) lo=m; else hi=m; } return (lo+hi)/2; };
  const chords=chordsPerBar(res.notes.bass,res.notes.harmony,toSec,bars,1);
  const key=guessKey([...res.notes.target,...res.notes.harmony]);
  const used=Math.max(melody.length?Math.floor((melody[melody.length-1].gat)/4)+1:1,chords.length?Math.floor(chords[chords.length-1].at/4)+1:1);
  return {v:1,title,mode,instrument,tempo:Math.round(res.tempo),bars:Math.min(bars,used),key:{pc:key.pc,minor:key.minor},melody,chords,soloBars:[]};
}
