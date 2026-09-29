/* ---------------- keyboard view ---------------- */
const KB_LO=36, KB_HI=96, WW=20, WH=86, BW=12, BH=54;
const isBlack=m=>[1,3,6,8,10].includes(m%12);
const keyEls={};
function buildKeyboard(){
  const svg=$('kb'); let x=0, whites=[], blacks=[];
  for(let m=KB_LO;m<=KB_HI;m++){
    if(!isBlack(m)){whites.push({m,x});x+=WW;} else blacks.push({m,x:x-BW/2});
  }
  svg.setAttribute('viewBox',`0 0 ${x} ${WH+2}`); svg.setAttribute('preserveAspectRatio','none');
  let html='';
  whites.forEach(k=>{html+=`<rect class="w" data-m="${k.m}" x="${k.x+.5}" y="1" width="${WW-1}" height="${WH}" rx="2"/>`; if(k.m%12===0) html+=`<text x="${k.x+WW/2}" y="${WH-6}" text-anchor="middle">C${k.m/12-1}</text>`;});
  blacks.forEach(k=>{html+=`<rect class="b" data-m="${k.m}" x="${k.x}" y="1" width="${BW}" height="${BH}" rx="1.5"/>`;});
  svg.innerHTML=html;
  svg.querySelectorAll('rect').forEach(r=>{keyEls[r.dataset.m]=r;});
  svg.addEventListener('pointerdown',e=>{const m=e.target.dataset&&e.target.dataset.m; if(m) toggleDraft(+m);});
}
let kbMarks={}; // midi -> class
function paintKeys(){
  for(const m in keyEls){
    const el=keyEls[m], base=isBlack(+m)?'b':'w';
    let cls=base;
    if(kbMarks[m]) cls+=' '+kbMarks[m];
    if(draft.has(+m)) cls+=' draft';
    if(held.has(+m) && !kbMarks[m]) cls+=' held';
    el.setAttribute('class',cls);
  }
}

/* ---------------- staff view ---------------- */
function staffSVG(spelled,roles){
  // spelled: [{di,a,midi}], roles: array of role names
  const W=230,H=236, TOP=64, S=6, X=132;
  const yT=di=>TOP+(38-di)*S;         // treble: F5 top line
  const yB=di=>TOP+76+(26-di)*S+6;    // bass: A3 top line
  let s=`<svg viewBox="0 0 ${W} ${H}" aria-label="Your voicing on the grand staff">`;
  for(let i=0;i<5;i++){s+=`<line class="ln" x1="20" x2="${W-6}" y1="${yT(38-2*i)}" y2="${yT(38-2*i)}"/>`;}
  for(let i=0;i<5;i++){s+=`<line class="ln" x1="20" x2="${W-6}" y1="${yB(26-2*i)}" y2="${yB(26-2*i)}"/>`;}
  s+=`<line class="ln" x1="20" x2="20" y1="${yT(38)}" y2="${yB(18)}"/>`;
  s+=`<text class="clef" x="24" y="${yT(32)+9}" font-size="46">𝄞</text><text class="clef" x="25" y="${yB(24)+8}" font-size="34">𝄢</text>`;
  const notes=spelled.map((n,i)=>({...n,role:roles[i]||'held',treble:n.midi>=60})).sort((a,b)=>a.di-b.di);
  const col={root:'var(--root)',chord:'var(--chord)',tension:'var(--tension)',wrong:'var(--wrong)',held:'var(--ink)',hint:'var(--brass)'};
  ['bass','treble'].forEach(st=>{
    const grp=notes.filter(n=>(st==='treble')===n.treble); if(!grp.length) return;
    const y=st==='treble'?yT:yB, lo=st==='treble'?30:18, hi=st==='treble'?38:26;
    // ledger lines
    const minD=grp[0].di, maxD=grp[grp.length-1].di;
    for(let d=lo-2; d>=minD; d-=2) s+=`<line class="ln" x1="${X-12}" x2="${X+24}" y1="${y(d)}" y2="${y(d)}" style="opacity:.8"/>`;
    for(let d=hi+2; d<=maxD; d+=2) s+=`<line class="ln" x1="${X-12}" x2="${X+24}" y1="${y(d)}" y2="${y(d)}" style="opacity:.8"/>`;
    let prevDi=-99, prevShift=false, accCols=[];
    grp.forEach(n=>{
      let shift=false;
      if(n.di===prevDi+1 && !prevShift) shift=true;
      if(n.di===prevDi) shift=!prevShift;
      prevDi=n.di; prevShift=shift;
      const cx=X+(shift?12:0), cy=y(n.di);
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="6.6" ry="4.8" transform="rotate(-20 ${cx} ${cy})" fill="${col[n.role]}"/>`;
      if(n.a){
        let c=0; while(accCols[c]!==undefined && n.di-accCols[c]<6) c++;
        accCols[c]=n.di;
        s+=`<text class="acc" x="${X-14-c*11}" y="${cy+5}" text-anchor="middle" fill="${col[n.role]}">${ACC[n.a]}</text>`;
      }
    });
  });
  return s+'</svg>';
}
function plainSpell(m){const pc=mod12(m);const [l,a]=ROOT_MAJ[pc];const oct=Math.floor((m-a)/12)-1;return {l,a,oct,di:oct*7+l,name:LETTERS[l]+ACC[a],midi:m};}

/* ---------------- analysis panel ---------------- */
function showAnalysis(ev,target,result,extra){
  const staff=$('staff'), v=$('verdict'), chips=$('chips'), why=$('why'), tags=$('tags');
  kbMarks={};
  if(!ev){ // free play, no target
    const notes=[...extra].sort((a,b)=>a-b);
    const ids=identify(notes);
    if(!ids.length){
      staff.innerHTML=staffSVG(notes.map(plainSpell),[]);
      v.className='verdict'; v.textContent=notes.map(m=>plainSpell(m).name).join(' ');
      chips.innerHTML=''; why.textContent=notes.length<3?'Play three or more notes and I will name the chord.':'No standard chord name fits these notes.'; tags.textContent='';
      paintKeys(); return;
    }
    const top=ids[0], e2=top.ev;
    staff.innerHTML=staffSVG(e2.per.map(p=>({...p.spell,midi:p.midi})),e2.per.map(p=>p.role));
    e2.per.forEach(p=>kbMarks[p.midi]='k-'+p.role);
    v.className='verdict'; v.textContent=top.name+(e2.set.has(0)?'':', rootless');
    chips.innerHTML=e2.per.map(p=>`<span class="r-${p.role}">${p.spell.name}<em>${p.label==='R'?'root':p.label}</em></span>`).join('');
    const alts=ids.slice(1).filter(x=>!x.extra.length).map(x=>x.name+(x.ev.set.has(0)?'':' without root')).slice(0,2);
    why.textContent=alts.length?`Also reads as ${alts.join(', ')}.`:''; tags.textContent='';
    paintKeys(); return;
  }
  staff.innerHTML=staffSVG(ev.per.map(p=>({...p.spell,midi:p.midi})),ev.per.map(p=>p.role));
  ev.per.forEach(p=>kbMarks[p.midi]='k-'+p.role);
  chips.innerHTML=ev.per.map(p=>`<span class="r-${p.role}">${p.spell.name}<em>${p.label==='R'?'root':p.label}</em></span>`).join('');
  if(ev.ok){
    v.className='verdict ok'; v.textContent=`${symText(target)}, nice.`+(result?`  +${result.total}`:'');
    why.textContent=result&&result.mult>1?`Combo ×${result.mult.toFixed(1)}`:'';
    tags.innerHTML=result?result.tags.map(t=>`<span class="${t.p<0?'neg':''}">${t.t} ${t.p>0?'+':''}${t.p}</span>`).join(', '):'';
  }else{
    v.className='verdict no'; v.textContent=`Not ${symText(target)} yet.`;
    why.textContent=ev.reasons.join(' '); tags.textContent='';
  }
  paintKeys();
}
function showHint(target){
  const notes=hintVoicing(target,opts);
  const ev=evaluate(notes,target,opts);
  kbMarks={}; notes.forEach(m=>kbMarks[m]='k-hint');
  $('staff').innerHTML=staffSVG(ev.per.map(p=>({...p.spell,midi:p.midi})),ev.per.map(()=>'hint'));
  $('verdict').className='verdict'; $('verdict').textContent=`One way to play ${symText(target)}`;
  $('chips').innerHTML=ev.per.map(p=>`<span class="r-${p.role}">${p.spell.name}<em>${p.label==='R'?'root':p.label}</em></span>`).join('');
  $('why').textContent='Now find your own version. Hints reset your combo.';
  $('tags').textContent='';
  paintKeys();
}

