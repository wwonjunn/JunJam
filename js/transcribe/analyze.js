/* Transcribe: turn the helper's raw notes (seconds) into a score (beats, bars, chords). Pure, no DOM.
   Tested by tests/theory.test.js. The helper does the listening; this does the music. */

// Beat trackers often miss the first or last beats: extend the grid back to the start and on to the end
function fillBeats(beats,duration){
  const b=beats.length>1?[...beats]:[0,.5], gap=(b[b.length-1]-b[0])/(b.length-1);
  while(b[0]-gap>-gap*.35) b.unshift(b[0]-gap);
  while(b[b.length-1]+gap<duration+gap) b.push(b[b.length-1]+gap);
  return b;
}
// Beat trackers jitter: each beat can land 10-40 ms off (Beat This! works in 20 ms frames), a whole tuplet spot in a
// fast run. Real tempo changes smoothly, so each beat is moved onto a straight line fitted through its neighbours
// (a beat each side): the jitter averages out, and speeding up or slowing down is still followed.
function smoothBeats(res,{half=1,cap=.15}={}){
  const b=res.beats; if(b.length<2*half+2) return res;
  const spb=b.slice(1).map((x,i)=>x-b[i]).sort((x,y)=>x-y)[(b.length-1)>>1];
  const nb=b.map((t,i)=>{ let sw=0,sx=0,sy=0,sxx=0,sxy=0;
    for(let j=Math.max(0,i-half);j<=Math.min(b.length-1,i+half);j++){ const w=half+1-Math.abs(j-i); sw+=w; sx+=w*j; sy+=w*b[j]; sxx+=w*j*j; sxy+=w*j*b[j]; }
    const k=(sw*sxy-sx*sy)/(sw*sxx-sx*sx||1), c=(sy-k*sx)/sw, f=c+k*i;
    return Math.round((t+Math.max(-cap*spb,Math.min(cap*spb,f-t)))*1000)/1000; });
  const at=t=>{ let k=0; for(let i=1;i<b.length;i++) if(Math.abs(b[i]-t)<Math.abs(b[k]-t)) k=i; return nb[k]+(t-b[k]); };
  return {...res,beats:nb,downbeats:(res.downbeats||[]).map(at),smoothed:true};
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
  const out=[]; let g0=null;
  for(const n of ok){
    const last=out[out.length-1];
    if(last&&n.s-g0<.04){ // same moment
      if(n.p>last.p) out[out.length-1]={...n}; continue; }
    g0=n.s;
    if(last&&last.e>n.s) last.e=n.s;                                                     // cut the one before
    out.push({...n});
  }
  return out.filter(n=>n.e-n.s>=.03);
}
/* Rhythm: each beat is split into the number of equal parts that fits its notes best: 1, 2, 4 or 8 (up to 32nds),
   3 (triplets), 5, 6 or 7 (quintuplets, sextuplets, septuplets). Simple divisions are preferred unless the timing
   clearly says otherwise, and a run keeps its division from one beat to the next (changing costs a little).
   times: [{at,dur}] in beats, in order. Returns [{gat,gdur,tri,tup}]: tup is the division when it isn't 1, 2, 4 or 8. */
// a tuplet of D in a beat is written in the next value down: 3 as 8ths, 5 to 7 as 16ths, 9 and up as 32nds
const tupNormal=D=>D<4?2:D<8?4:8;
const TUP_COST={1:0,2:.01,4:.03,3:.05,8:.08,6:.08,5:.12,7:.13};
function tupletGrid(times,{divs=[1,2,4,3,8,6,5,7],change=.01,cost=TUP_COST,slide=.06,slideCost=.3}={}){
  const beatOf=x=>Math.floor(x.at+.04), beats=[...new Set(times.map(beatOf))].sort((a,b)=>a-b), idx=new Map(beats.map(b=>[b,[]]));
  times.forEach((x,i)=>idx.get(beatOf(x)).push(i));
  // the detected beat itself can be a little off: each beat may also slide its frame slightly (at a small cost)
  const slides=[0]; for(let d=.02;d<=slide+1e-9;d+=.02) slides.push(d,-d);
  const fit=(fs,D)=>{ let best=null; for(const dl of slides){ const sl=fs.map(f=>Math.max(0,Math.round((f-dl)*D))); let e=Math.abs(dl)*slideCost*fs.length;
      fs.forEach((f,k)=>e+=Math.abs(f-dl-sl[k]/D)); e+=(sl.length-new Set(sl).size)*.5;   // two notes on one spot: that doesn't fit
      if(!best||e<best.e) best={e,sl}; } return best; };
  const FIT=beats.map(b=>{ const fs=idx.get(b).map(i=>times[i].at-b); return divs.map(D=>fit(fs,D)); });
  const C=FIT.map(r=>r.map((x,j)=>x.e+cost[divs[j]]));
  // best division per beat over the whole line (Viterbi): neighbouring beats pay to change division
  const V=C.map(r=>r.slice()), back=C.map(r=>r.map(()=>0));
  for(let k=1;k<beats.length;k++){ const near=beats[k]-beats[k-1]===1;
    divs.forEach((D,j)=>{ let best=1e9, arg=0; divs.forEach((E,i)=>{ const v=V[k-1][i]+(near&&i!==j?change:0); if(v<best){ best=v; arg=i; } }); V[k][j]+=best; back[k][j]=arg; }); }
  const pick=Array(beats.length); if(beats.length){ let j=V[beats.length-1].indexOf(Math.min(...V[beats.length-1]));
    for(let k=beats.length-1;k>=0;k--){ pick[k]=divs[j]; j=back[k][j]; } }
  const D=Array(times.length), pos=Array(times.length);
  beats.forEach((b,k)=>{ const sl=FIT[k][divs.indexOf(pick[k])].sl; idx.get(b).forEach((i,q)=>{ D[i]=pick[k]; pos[i]=b+sl[q]/pick[k]; }); });
  for(let i=1;i<pos.length;i++) if(pos[i]<=pos[i-1]+1e-6) pos[i]=pos[i-1]+1/D[i-1];   // keep order, one note per spot
  return times.map((x,i)=>{ const unit=1/D[i], own=Math.max(unit,Math.round(x.dur/unit)*unit), nx=pos[i+1], t=[1,2,4,8].includes(D[i])?0:D[i];
    return {gat:pos[i],gdur:nx!==undefined?Math.min(nx-pos[i],own):own,tri:t===3,tup:t,div:D[i]}; });
}
// Every note also keeps when it was really played (seconds into the selection), for the As played view
const asPlayed=(s,e)=>({sec:Math.round(s*1000)/1000,dsec:Math.round(Math.max(.03,e-s)*1000)/1000});
/* One line from notes the helper's models voted on: follow the solo's contour.
   1. Notes that start together are a group. Each group's best-supported note (the top one on a near tie) marks where
      the line is; the line at any moment is the median of those marks within 0.6 s, once there are at least two.
   2. In each group only notes within 10 semitones of the line count (octave ghosts above, comping below drop out),
      a chord of four or more sitting under the line is comping and is skipped, and the best-supported note wins. */
function leadLine(notes,{minConf=.3,minLen=.04,lo=0,hi=127,win=.6,below=10,above=10,chord=4,anchor=.45}={}){
  const ok=notes.filter(n=>n.c>=minConf&&n.e-n.s>=minLen&&n.p>=lo&&n.p<=hi).sort((a,b)=>a.s-b.s||b.p-a.p);
  const groups=[]; ok.forEach(n=>{ const g=groups[groups.length-1]; if(g&&n.s-g[0].s<.04) g.push(n); else groups.push([n]); });
  const marks=groups.filter(g=>g.length<chord).map(g=>g.reduce((a,b)=>b.c>a.c+.05||(Math.abs(b.c-a.c)<=.05&&b.p>a.p)?b:a)).filter(n=>n.c>=anchor);
  const lineAt=t=>{ const ps=marks.filter(m=>Math.abs(m.s-t)<=win).map(m=>m.p).sort((x,y)=>x-y); return ps.length>=2?ps[ps.length>>1]:null; };
  const out=[];
  groups.forEach(g=>{ const r=lineAt(g[0].s), cand=r===null?g:g.filter(n=>n.p>=r-below&&n.p<=r+above);
    if(!cand.length||(g.length>=chord&&r!==null&&Math.max(...g.map(n=>n.p))<r-3)) return;
    const top=Math.max(...cand.map(n=>n.p)), best=cand.reduce((a,b)=>b.c+(b.p===top?.1:0)>a.c+(a.p===top?.1:0)?b:a);
    const last=out[out.length-1]; if(last&&last.e>best.s) last.e=best.s; out.push({...best}); });
  return out.filter(n=>n.e-n.s>=.03);
}
// The written melody in beats on the tuplet grid (tupletGrid); lead sheets keep simple rhythms and drop ornaments
function melodyBeats(line,toBeat,lead){
  let notes=line.map(n=>({midi:n.p,at:toBeat(n.s),dur:Math.max(.05,toBeat(n.e)-toBeat(n.s)),c:n.c,s:n.s,e:n.e})).filter(n=>n.at>-.25);
  if(lead) notes=notes.filter((n,i)=>n.dur>=.2||(notes[i+1]&&notes[i+1].at-n.at>=.4));       // grace notes and turns go
  const g=tupletGrid(notes.map(n=>({at:Math.max(0,n.at),dur:n.dur})),lead?{divs:[1,2]}:{});
  return notes.map((n,i)=>({midi:n.midi,gat:g[i].gat,gdur:g[i].gdur,tri:g[i].tri,tup:g[i].tup,...asPlayed(n.s,n.e)}))
    .filter((n,i,a)=>!lead||i===0||n.gat>a[i-1].gat).map((n,i,a)=>lead&&a[i+1]?{...n,gdur:Math.min(Math.max(n.gdur,.5),a[i+1].gat-n.gat)}:n);
}
// Full parts (piano or guitar with chords): keep every note. Notes that start together are one chord; the chords'
// starts go on the tuplet grid like a line (tupletGrid), and each note keeps its own length, so held notes can overlap.
function partBeats(notes,toBeat,{minConf=.3,minLen=.06,lo=21,hi=108}={}){
  const ok=notes.filter(n=>n.c>=minConf&&n.e-n.s>=minLen&&n.p>=lo&&n.p<=hi).sort((a,b)=>a.s-b.s);
  const evs=[]; ok.forEach(n=>{ const last=evs[evs.length-1]; if(last&&n.s-last.s<.045) last.notes.push(n); else evs.push({s:n.s,notes:[n]}); });
  // overtones: a note exactly one or two octaves above a much louder note that starts with it (real octaves are about as loud)
  evs.forEach(e=>{ e.notes=e.notes.filter(n=>!e.notes.some(m=>m!==n&&(n.p-m.p===12||n.p-m.p===24)&&n.c<m.c*.7)); });
  const at=e=>Math.max(0,toBeat(e.s)), len=n=>Math.max(.05,toBeat(n.e)-toBeat(n.s));
  const g=tupletGrid(evs.map(e=>({at:at(e),dur:Math.max(...e.notes.map(len))})));
  const out=[], seen=new Set();
  evs.forEach((e,i)=>{ if(toBeat(e.s)<=-.25) return; const unit=1/g[i].div;
    e.notes.forEach(n=>{ const k=n.p+'@'+g[i].gat; if(seen.has(k)) return; seen.add(k);
      out.push({midi:n.p,gat:g[i].gat,gdur:Math.min(8,Math.max(unit,Math.round(len(n)/unit)*unit)),tri:g[i].tri,tup:g[i].tup,...asPlayed(n.s,n.e)}); }); });
  return out.sort((a,b)=>a.gat-b.gat||b.midi-a.midi);
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
// Basic Pitch often cuts one held note into pieces: join a same-pitch piece that starts right as the last ends,
// but only if it's a short leftover or clearly quieter. A re-struck note (same chord played again) is just as loud: keep it.
function mergeFragments(notes,gap=.05){
  const byP=new Map(); notes.forEach(n=>{ if(!byP.has(n.p)) byP.set(n.p,[]); byP.get(n.p).push({...n}); });
  const out=[]; byP.forEach(ns=>{ ns.sort((a,b)=>a.s-b.s); let cur=null;
    ns.forEach(n=>{ if(cur&&n.s-cur.e<gap&&n.s>=cur.s&&(n.e-n.s<.04||n.c<cur.c*.8)){ cur.e=Math.max(cur.e,n.e); } else { if(cur) out.push(cur); cur=n; } }); if(cur) out.push(cur); });
  return out.sort((a,b)=>a.s-b.s);
}
/* Sensitivity: how sure a note has to be (c) and how long (l, seconds) to be kept. Lowest → Highest; Medium is the default.
   Best (the models voted): c .7 means two or more models heard it; a note only one model heard scores .3 to .5 by how
   much that model agrees with the others on this recording, so .42 and .38 let in more of those, and .3 all of them.
   Agreement is the strong filter, so even Low keeps notes down to 45 ms (a 32nd at 120 bpm is 62 ms). On test clips,
   Low to Highest go from 96% of the shown notes being right (83% of the notes found) to 87% (90% found).
   Quick (one model) needs length to filter the noise instead. */
const TR_SENS={vote:[{c:.7,l:.07},{c:.7,l:.045},{c:.42,l:.04},{c:.38,l:.035},{c:.3,l:.025}],
  one:[{c:.6,l:.1},{c:.5,l:.08},{c:.4,l:.06},{c:.3,l:.04},{c:.24,l:.03}]};
const TR_SENS_NAMES=['Lowest','Low','Medium','High','Highest'];
// Half-time / double-time: beat trackers often lock onto half or double the real tempo
function scaleBeats(beats,k){ if(k===1||beats.length<2) return beats; if(k<1) return beats.filter((_,i)=>i%2===0);
  const out=[]; beats.forEach((b,i)=>{ out.push(b); if(i+1<beats.length) out.push((b+beats[i+1])/2); }); return out; }
// Instruments: the range the line lives in (and, for full parts, the range of the whole part)
const TR_INSTRUMENTS={piano:{name:'Piano / e-piano',lo:55,hi:100,full:[21,108],grand:true},synth:{name:'Synth lead',lo:36,hi:100,full:[21,108],grand:true},
  guitar:{name:'Guitar',lo:40,hi:88,full:[40,88]},sax:{name:'Saxophone',lo:44,hi:84},trumpet:{name:'Trumpet',lo:52,hi:84},voice:{name:'Voice',lo:45,hi:84},bass:{name:'Bass',lo:24,hi:60}};
/* Which beat is beat 1? Beat trackers find the beats but not the bar. Try each of the four phases and keep the one
   where the music acts most like a downbeat: chords change there, the bass plays there, strong notes start there. */
function guessDownbeat(res){
  const toBeat=beatMapper(fillBeats(res.beats,res.duration),0), n=Math.max(4,Math.ceil(toBeat(res.duration)));
  // the helper's beat model also says where beat 1 is: take the phase most of its downbeats agree on
  if(res.downbeats&&res.downbeats.length>=2){ const v=[0,0,0,0]; res.downbeats.forEach(d=>v[mod12(Math.round(toBeat(d)))%4]++); return v.indexOf(Math.max(...v)); }
  const onset=Array(n+1).fill(0), bassOn=Array(n+1).fill(0), prof=[...Array(n+1)].map(()=>Array(12).fill(0));
  const strength=x=>x.c*Math.min(1,(x.e-x.s)*2);
  const on=(arr,x)=>{ const t=toBeat(x.s), b=Math.round(t); if(b>=0&&b<=n&&Math.abs(t-b)<.2) arr[b]+=strength(x); };
  res.notes.harmony.forEach(x=>{ on(onset,x); const b0=Math.max(0,Math.floor(toBeat(x.s))), b1=Math.min(n,Math.floor(toBeat(x.e)));
    for(let b=b0;b<=b1;b++) prof[b][mod12(x.p)]+=x.c; });
  res.notes.bass.forEach(x=>on(bassOn,x));
  const cos=(u,v)=>{ const d=u.reduce((a,x,i)=>a+x*v[i],0), m=Math.sqrt(u.reduce((a,x)=>a+x*x,0)*v.reduce((a,x)=>a+x*x,0)); return m?d/m:1; };
  const change=prof.map((p,b)=>b?1-cos(prof[b-1],p):0);
  const norm=a=>{ const mx=Math.max(...a)||1; return a.map(x=>x/mx); };
  const O=norm(onset), Bs=norm(bassOn), C=norm(change);
  let best={p:0,sc:-1e9};
  for(let p=0;p<4;p++){
    let on1=0, k1=0, rest=0, k=0;
    for(let b=1;b<=n;b++){ const v=O[b]+2*Bs[b]+3*C[b]; if(b%4===p){ on1+=v; k1++; } else { rest+=v; k++; } }
    const sc=(k1?on1/k1:0)-(k?rest/k:0); if(sc>best.sc) best={p,sc};
  }
  return best.p;
}
// Shift for a chosen beat 1: notes before it become an opening pickup bar instead of being cut off
const shiftFor=p=>p?p-4:0;
// Build the whole score from the helper's answer
const inverseMap=(toBeat,dur)=>b=>{ let lo=-50,hi=dur+50; for(let i=0;i<40;i++){ const m=(lo+hi)/2; if(toBeat(m)<b) lo=m; else hi=m; } return (lo+hi)/2; };
// A score's beats and the recording's seconds, both ways (with no recording, a steady tempo)
function scoreMaps(res,score){
  if(!res){ const spb=60/(score.tempo||100); return {toBeat:t=>t/spb,toSec:b=>b*spb,duration:null}; }
  const toBeat=beatMapper(fillBeats(scaleBeats(res.beats,score.beatScale||1),res.duration),score.shift||0);
  return {toBeat,toSec:inverseMap(toBeat,res.duration),duration:res.duration};
}
function buildScore(res0,{mode,instrument,shift=null,title='Untitled',texture='line',sens=2,beatScale=1}){
  const res={...res0,beats:scaleBeats(res0.beats,beatScale),tempo:res0.tempo*beatScale,
    notes:{...res0.notes,target:res0.engine==='vote'?res0.notes.target:mergeFragments(res0.notes.target),bass:mergeFragments(res0.notes.bass),harmony:mergeFragments(res0.notes.harmony)}};
  const S=TR_SENS[res0.engine==='vote'?'vote':'one'][Math.max(0,Math.min(4,sens))];
  if(shift===null) shift=shiftFor(guessDownbeat(res));
  const toBeat=beatMapper(fillBeats(res.beats,res.duration),shift), inst=TR_INSTRUMENTS[instrument]||TR_INSTRUMENTS.piano, lead=mode==='lead';
  const full=!lead&&texture==='full'&&inst.full;
  const melody=full?partBeats(res.notes.target,toBeat,{lo:inst.full[0],hi:inst.full[1],minConf:S.c,minLen:S.l})
    :melodyBeats((res.engine==='vote'?leadLine:topLine)(res.notes.target,{lo:inst.lo,hi:inst.hi,minConf:S.c+(lead?.05:0),minLen:S.l}),toBeat,lead);
  const totalBeats=Math.max(4,...melody.map(n=>n.gat+n.gdur),toBeat(res.duration));
  const bars=Math.ceil(totalBeats/4);
  const toSec=inverseMap(toBeat,res.duration); // beats back to seconds for the chord windows
  const chords=chordsPerBar(res.notes.bass,res.notes.harmony,toSec,bars,1);
  const key=guessKey([...res.notes.target,...res.notes.harmony]);
  const used=Math.max(melody.length?Math.floor(Math.max(...melody.map(n=>n.gat))/4)+1:1,chords.length?Math.floor(chords[chords.length-1].at/4)+1:1);
  return {v:1,title,mode,instrument,sens,beatScale,texture:full?'full':'line',grand:!!(full&&inst.grand),tempo:Math.round(res.tempo),bars:Math.min(bars,used),key:{pc:key.pc,minor:key.minor},melody,chords,soloBars:[],shift};
}
