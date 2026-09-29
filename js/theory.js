/* Jun Jam: music theory core. Pure functions, no DOM. Tested by tests/theory.test.js */
// THEORY-START
const LETTERS=['C','D','E','F','G','A','B'];
const LETTER_PC=[0,2,4,5,7,9,11];
const ACC={'-2':'𝄫','-1':'♭','0':'','1':'♯','2':'𝄪'};
const BASE_LABEL={0:'R',1:'♭9',2:'9',3:'♭3',4:'3',5:'11',6:'♯11',7:'5',8:'♭13',9:'13',10:'♭7',11:'7'};
const DOM3={3:'♯9'};
const mod12=x=>((x%12)+12)%12;
function Qd(id,suf,stage,ct,req,ext,o={}){
  return {id,suf,stage,ct,req,ext,imp:o.imp||[],rootless:!!o.rootless,anyOf:o.anyOf||null,minor:!!o.minor,lab:Object.assign({},BASE_LABEL,o.lab||{})};
}
const QUALS=[
  Qd('maj','',1,[0,4,7],[4,7],[]),
  Qd('min','m',1,[0,3,7],[3,7],[],{minor:1}),
  Qd('dim','°',1,[0,3,6],[3,6],[],{minor:1,lab:{6:'♭5'}}),
  Qd('aug','+',1,[0,4,8],[4,8],[],{lab:{8:'♯5'}}),
  Qd('sus4','sus4',1,[0,5,7],[5,7],[],{lab:{5:'4'}}),
  Qd('sus2','sus2',1,[0,2,7],[2,7],[],{lab:{2:'2'}}),
  Qd('maj7','maj7',2,[0,4,7,11],[4,11],[2,9,6],{rootless:1}),
  Qd('dom7','7',2,[0,4,7,10],[4,10],[9,2,1,3,6,8],{rootless:1,lab:DOM3}),
  Qd('min7','m7',2,[0,3,7,10],[3,10],[2,5,9],{rootless:1,minor:1}),
  Qd('hdim','m7♭5',2,[0,3,6,10],[3,6,10],[2,5,8],{rootless:1,minor:1,lab:{6:'♭5'}}),
  Qd('dim7','°7',2,[0,3,6,9],[3,6,9],[2,5,8],{rootless:1,minor:1,lab:{6:'♭5',9:'°7'}}),
  Qd('six','6',3,[0,4,7,9],[4,9],[2],{rootless:1,lab:{9:'6'}}),
  Qd('min6','m6',3,[0,3,7,9],[3,9],[2,5],{rootless:1,minor:1,lab:{9:'6'}}),
  Qd('sus7','7sus4',3,[0,5,7,10],[5,10],[1,2,9],{rootless:1,lab:{5:'4'}}),
  Qd('mmaj7','m(maj7)',3,[0,3,7,11],[3,11],[2,5,9],{rootless:1,minor:1}),
  Qd('maj9','maj9',4,[0,4,7,11],[4,11,2],[6,9],{rootless:1}),
  Qd('dom9','9',4,[0,4,7,10],[4,10,2],[6,9],{rootless:1}),
  Qd('min9','m9',4,[0,3,7,10],[3,10,2],[5,9],{rootless:1,minor:1}),
  Qd('dom13','13',4,[0,4,7,10],[4,10,9],[2,6],{rootless:1,imp:[2]}),
  Qd('min11','m11',4,[0,3,7,10],[3,10,5],[2,9],{rootless:1,minor:1,imp:[2]}),
  Qd('d7b9','7♭9',5,[0,4,7,10],[4,10,1],[9,3,6,8],{rootless:1,lab:DOM3}),
  Qd('d7s9','7♯9',5,[0,4,7,10],[4,10,3],[8,1,6],{rootless:1,lab:DOM3}),
  Qd('alt','7alt',5,[0,4,10],[4,10],[1,3,6,8],{rootless:1,anyOf:[1,3,6,8],lab:DOM3}),
  Qd('d7b13','7♭13',5,[0,4,10],[4,10,8],[1,2,3],{rootless:1,lab:DOM3}),
  Qd('d7s11','7♯11',5,[0,4,7,10],[4,10,6],[2,9],{rootless:1}),
  Qd('mj7s11','maj7♯11',5,[0,4,7,11],[4,11,6],[2,9],{rootless:1}),
  Qd('mj7s5','maj7♯5',5,[0,4,8,11],[4,8,11],[2,6],{rootless:1,lab:{8:'♯5'}}),
];
const Q=Object.fromEntries(QUALS.map(q=>[q.id,q]));

// default root spellings, index = pitch class, value = [letterIdx, accidental]
const ROOT_MAJ=[[0,0],[1,-1],[1,0],[2,-1],[2,0],[3,0],[3,1],[4,0],[5,-1],[5,0],[6,-1],[6,0]];
const ROOT_MIN=[[0,0],[0,1],[1,0],[2,-1],[2,0],[3,0],[3,1],[4,0],[4,1],[5,0],[6,-1],[6,0]];
function mkRoot(l,a){return {l,a,pc:mod12(LETTER_PC[l]+a)};}
function rootName(r){return LETTERS[r.l]+ACC[r.a];}
function spellingsFor(pc){
  const out=[];
  for(let l=0;l<7;l++){let a=mod12(pc-LETTER_PC[l]); if(a>6)a-=12; if(Math.abs(a)<=1) out.push([l,a]);}
  return out;
}
function defaultRoot(pc,minor){const [l,a]=(minor?ROOT_MIN:ROOT_MAJ)[pc];return mkRoot(l,a);}
function weirdRoot(pc){
  const d=ROOT_MAJ[pc], alts=spellingsFor(pc).filter(s=>!(s[0]===d[0]&&s[1]===d[1]));
  if(!alts.length) return null;
  const [l,a]=alts[Math.floor(Math.random()*alts.length)]; return mkRoot(l,a);
}
function degOf(label){const n=parseInt(String(label).replace(/[^0-9]/g,''),10)||1;return ((n-1)%7)+1;}
function spellNote(midi,root,q){
  const iv=mod12(midi-root.pc);
  const deg=iv===0?1:degOf(q.lab[iv]);
  let l=(root.l+deg-1)%7;
  let a=mod12(midi-LETTER_PC[l]); if(a>6)a-=12;
  if(Math.abs(a)>2){ // fall back to a plain spelling
    const s=spellingsFor(mod12(midi)); const pick=s.find(x=>x[1]===0)||s[0]; l=pick[0]; a=pick[1];
  }
  const oct=Math.floor((midi-a)/12)-1;
  return {l,a,oct,di:oct*7+l,name:LETTERS[l]+ACC[a]};
}
function symText(t){return rootName(t.root)+t.q.suf;}

function evaluate(notes,target,opts){
  const {root,q}=target;
  const sorted=[...new Set(notes)].sort((a,b)=>a-b);
  const per=sorted.map(m=>{
    const iv=mod12(m-root.pc);
    const allowed=q.ct.includes(iv)||q.req.includes(iv)||q.ext.includes(iv);
    const role=!allowed?'wrong':iv===0?'root':q.ct.includes(iv)?'chord':'tension';
    return {midi:m,iv,label:q.lab[iv],role,spell:spellNote(m,root,q)};
  });
  const set=new Set(per.map(p=>p.iv));
  const reasons=[];
  if(set.size<3) reasons.push('Play at least 3 different notes.');
  const wrong=per.filter(p=>p.role==='wrong');
  if(wrong.length){
    const names=[...new Set(wrong.map(w=>`${w.spell.name} (${w.label})`))];
    reasons.push(`${names.join(', ')} ${names.length>1?"don't":"doesn't"} belong in ${symText(target)}.`);
    if(wrong.some(w=>w.iv===5) && q.ct.includes(4)) reasons.push('A natural 11 clashes with the major 3rd, so it counts as an avoid note here.');
    if(wrong.some(w=>w.iv===4) && q.ct.includes(3)) reasons.push('This chord needs a minor 3rd, so the major 3rd is out.');
  }
  const req=[...q.req];
  if(!(q.rootless&&opts.rootless)) req.unshift(0);
  const missing=req.filter(r=>!set.has(r));
  if(missing.length) reasons.push('Missing the '+missing.map(r=>q.lab[r]==='R'?'root':q.lab[r]).join(', ')+'.');
  if(q.anyOf && !q.anyOf.some(x=>set.has(x))) reasons.push('Needs at least one alteration: ♭9, ♯9, ♯11 or ♭13.');
  return {ok:reasons.length===0,per,set,reasons,missing};
}

const LIL={1:52,2:51,3:48,4:46,5:45,6:46,7:34}; // low interval limits (lowest note, MIDI)
function voiceLeadDist(a,b){
  const near=(x,arr)=>Math.min(...arr.map(y=>Math.abs(x-y)));
  const d1=a.reduce((s,x)=>s+near(x,b),0)/a.length;
  const d2=b.reduce((s,x)=>s+near(x,a),0)/b.length;
  return (d1+d2)/2;
}
function scoreVoicing(ev,target,prev,progress,combo){
  const tags=[]; let pts=100;
  const notes=ev.per.map(p=>p.midi), n=notes.length;
  const tens=new Set(ev.per.filter(p=>p.role==='tension').map(p=>p.iv)).size;
  if(tens){pts+=tens*30;tags.push({t:tens===1?'1 tension':`${tens} tensions`,p:tens*30});}
  const hasRoot=ev.set.has(0);
  if(!hasRoot){pts+=40;tags.push({t:'Rootless',p:40});}
  if(n>3){const b=Math.min(n-3,5)*10;pts+=b;tags.push({t:`${n} notes`,p:b});}
  const gaps=notes.slice(1).map((m,i)=>m-notes[i]);
  if(n>=5 && gaps.slice(-4).join()==='5,5,5,4' || n===5 && gaps.join()==='5,5,5,4'){pts+=60;tags.push({t:'So What voicing',p:60});}
  else if(n>=3 && gaps.every(g=>g===5)){pts+=40;tags.push({t:'Quartal',p:40});}
  const span=notes[n-1]-notes[0];
  if(n>=4 && span>=15){pts+=25;tags.push({t:'Open voicing',p:25});}
  if(n===3 && hasRoot && ev.set.size===3 && target.q.rootless && !ev.set.has(7) && mod12(notes[0]-target.root.pc)===0 && ev.per.every(p=>p.role!=='tension')){pts+=10;tags.push({t:'Shell',p:10});}
  let mud=0; gaps.forEach((g,i)=>{if(LIL[g]!==undefined && notes[i]<LIL[g]) mud++;});
  if(mud){pts-=20*mud;tags.push({t:'Muddy low end',p:-20*mud});}
  if(prev && prev.length){
    const d=voiceLeadDist(notes,prev);
    if(d<=1.5){pts+=60;tags.push({t:'Silky voice leading',p:60});}
    else if(d<=3){pts+=30;tags.push({t:'Smooth voice leading',p:30});}
  }
  const sp=Math.round(50*Math.max(0,1-progress));
  if(sp>0){pts+=sp; if(sp>=30) tags.push({t:'Quick',p:sp});}
  const mult=1+Math.min(combo,10)*0.1;
  return {total:Math.max(10,Math.round(pts*mult)),tags,mult};
}

function hintVoicing(target,opts){
  const {root,q}=target;
  let ivs=[...q.req];
  if(!(q.rootless&&opts.rootless)) ivs.unshift(0);
  if(q.anyOf && !q.anyOf.some(x=>ivs.includes(x))) ivs.push(q.anyOf[0]);
  while(new Set(ivs).size<3){
    const add=q.ext.find(x=>!ivs.includes(x)) ?? q.ct.find(x=>!ivs.includes(x));
    if(add===undefined) break; ivs.push(add);
  }
  if(q.rootless && opts.rootless && ivs.length<4){const add=q.ext.find(x=>!ivs.includes(x)); if(add!==undefined) ivs.push(add);}
  ivs=[...new Set(ivs)].sort((a,b)=>a-b);
  const out=[]; let prev=52;
  ivs.forEach((iv,i)=>{let m=prev+mod12(root.pc+iv-prev); if(i>0&&m===prev) m+=12; if(i===0&&m<53) m+=0; out.push(m); prev=m;});
  // pull whole voicing into a nice middle register
  while(out[0]<52) out.forEach((_,i)=>out[i]+=12);
  while(out[out.length-1]>79) out.forEach((_,i)=>out[i]-=12);
  return out;
}

const STAGES=[
  {n:1,t:'Triads'},
  {n:2,t:'Seventh chords'},
  {n:3,t:'Sixths, sus and m(maj7)'},
  {n:4,t:'Ninths, elevenths, thirteenths'},
  {n:5,t:'Altered dominants and ♯11s'},
  {n:6,t:'ii–V–I in every key'},
  {n:7,t:'Everything'},
];
const TIERS=[
  {id:'misty',   name:'Misty',           bpm:60, step:3, cap:1,lives:5,mult:1},
  {id:'autumn',  name:'Autumn Leaves',   bpm:120,step:5, cap:1,lives:3,mult:1.25},
  {id:'atrain',  name:'Take the A Train',bpm:160,step:6, cap:2,lives:3,mult:1.5},
  {id:'cherokee',name:'Cherokee',        bpm:240,step:8, cap:3,lives:3,mult:2},
  {id:'giant',   name:'Giant Steps',     bpm:290,step:10,cap:3,lives:1,mult:3,unlock:{tier:'cherokee',score:3000}},
];
function iiVI(keyPc){
  const minor=Math.random()<0.4;
  const kpc=keyPc===undefined?Math.floor(Math.random()*12):keyPc;
  const k=defaultRoot(kpc,minor);
  const at=(steps,semis)=>{const l=(k.l+steps)%7;let a=mod12(kpc+semis-LETTER_PC[l]);if(a>6)a-=12;return mkRoot(l,a);};
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  if(!minor) return [
    {root:at(1,2),q:Q[pick(['min7','min7','min9','min11'])]},
    {root:at(4,7),q:Q[pick(['dom7','dom9','dom13','dom13'])]},
    {root:k,q:Q[pick(['maj7','maj9','six','maj7'])]},
  ];
  return [
    {root:at(1,2),q:Q['hdim']},
    {root:at(4,7),q:Q[pick(['d7b9','alt','d7b13'])]},
    {root:k,q:Q[pick(['min6','mmaj7','min9','min7'])]},
  ];
}
// Name what was played: try every root and quality, keep the ones that fit, rank like a pianist would
function identify(notes){
  const sorted=[...new Set(notes)].sort((a,b)=>a-b);
  if(new Set(sorted.map(mod12)).size<3) return [];
  const out=[];
  for(let pc=0;pc<12;pc++) for(const q of QUALS){
    const t={root:defaultRoot(pc,q.minor),q};
    const ev=evaluate(sorted,t,{rootless:true});
    if(!ev.ok) continue;
    const extra=[...ev.set].filter(iv=>!q.ct.includes(iv)&&!q.req.includes(iv)&&!q.imp.includes(iv));
    let sc=0;
    if(mod12(sorted[0]-pc)===0) sc+=10;
    if(!ev.set.has(0)) sc-=4;
    sc-=extra.length*1.5+q.stage*0.1;
    out.push({t,ev,extra,sc,name:symText(t)+(extra.length?` (add ${extra.map(iv=>q.lab[iv]).join(', ')})`:'')});
  }
  out.sort((a,b)=>b.sc-a.sc);
  const seen=new Set(); // one reading per root, the best one
  return out.filter(x=>!seen.has(x.t.root.pc)&&seen.add(x.t.root.pc));
}

// Bandleader requests: optional constraints on a chord, worth double when met
const REQ_LABEL={byear:'by ear',rootless:'rootless',shell:'shell: root, 3, 7',nine:'add the 9',inverted:'inverted',open:'open voicing',smooth:'smooth voice leading'};
function requestsFor(t,o){
  const q=t.q, r=['open'];
  if(q.rootless && o.rootless) r.push('rootless');
  if(['maj7','dom7','min7'].includes(q.id)) r.push('shell');
  if(!q.req.includes(2) && (q.ct.includes(2)||q.ext.includes(2))) r.push('nine');
  if(q.stage===1) r.push('inverted');
  if(o.sequence) r.push('smooth','smooth');
  return r;
}
function meetsRequest(kind,ev,t,prev){
  const notes=ev.per.map(p=>p.midi), n=notes.length, span=notes[n-1]-notes[0], q=t.q;
  switch(kind){
    case 'rootless': return !ev.set.has(0);
    case 'shell': {
      const third=q.req.includes(3)?3:4, sev=q.req.find(x=>x===10||x===11);
      return ev.set.size===3 && ev.set.has(0) && ev.set.has(third) && ev.set.has(sev) && mod12(notes[0]-t.root.pc)===0;
    }
    case 'nine': return ev.set.has(2);
    case 'inverted': return mod12(notes[0]-t.root.pc)!==0;
    case 'open': return q.stage===1 ? span>=12 : (n>=4 && span>=15);
    case 'smooth': return !!(prev&&prev.length) && voiceLeadDist(notes,prev)<=2;
    case 'byear': return true;
  }
  return false;
}
// THEORY-END
