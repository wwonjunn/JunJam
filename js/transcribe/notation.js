/* Transcribe: sheet music for transcriptions, with chords stacked on one stem, on a grand staff (piano) or one staff.
   Pure string building, no DOM. One rhythm per staff: each stack lasts until the next stack on that staff.
   Rhythms down to 32nds, and tuplets (3, 5, 6, 7... notes in a beat) with their number over the beam.
   notes: [{midi,gat,gdur,tri,tup,spell:{l,a,di}}] with gat measured from the start of the line; chords: [{root,q,at}] */
const GS_VALUES=[4,3,2,1.5,1,.75,.5,.375,.25,.125];
// Group a staff's notes into stacks (notes that start together) and give each a written length w (in quarters)
function gsStacks(notes,lineBeats){
  const by=new Map(); notes.forEach(n=>{ const k=Math.round(n.gat*840); if(!by.has(k)) by.set(k,[]); by.get(k).push(n); });
  const st=[...by.entries()].sort((a,b)=>a[0]-b[0]).map(([k,ns])=>({gat:k/840,notes:ns.sort((a,b)=>a.spell.di-b.spell.di),
    tup:Math.max(...ns.map(n=>n.tup||(n.tri?3:0))),hold:Math.max(...ns.map(n=>n.gdur))}));
  st.forEach((s,i)=>{ const next=i+1<st.length?st[i+1].gat:lineBeats, barEnd=(Math.floor(s.gat/4+1e-6)+1)*4, beatEnd=Math.floor(s.gat+1e-6)+1;
    if(s.tup){ const slots=Math.max(1,Math.round(Math.min(s.hold,next-s.gat,beatEnd-s.gat)*s.tup)), w=slots/tupNormal(s.tup);
      s.w=GS_VALUES.find(v=>v<=w+1e-6)||.125; s.d=slots/s.tup; }
    else { const d=Math.min(s.hold,next-s.gat,barEnd-s.gat); s.w=GS_VALUES.find(v=>v<=d+1e-6)||.125; s.d=s.w; } });
  return st;
}
const gsFlags=w=>w<=.125+1e-6?3:w<=.375+1e-6?2:w<1-1e-6?1:0;
function grandStaffSVG({notes,chords,beats=16,grand=true,clef='treble'}){
  // busy beats get wider, so eight 32nds still read
  const per=Array(beats).fill(0); notes.forEach(n=>{ const b=Math.floor(n.gat+1e-6); if(b>=0&&b<beats) per[b]++; });
  const bw=per.map(c=>Math.max(44,c*15+10)), cum=[0]; bw.forEach(w=>cum.push(cum[cum.length-1]+w));
  const X0=64, W=X0+cum[beats]+16, xOf=b=>{ const i=Math.max(0,Math.min(beats-1,Math.floor(b+1e-9))); return X0+cum[i]+(b-i)*bw[i]; };
  const T0=36, B0=grand?T0+100:null, H=grand?B0+76:T0+86;
  const bass1=!grand&&clef==='bass';
  const yT=bass1?di=>T0+(26-di)*5:di=>T0+(38-di)*5, yB=di=>B0+(26-di)*5;
  const staffs=grand?[{y:yT,lo:30,hi:38,mid:34,notes:notes.filter(n=>n.midi>=60),clef:'𝄞',cy:yT(32)+9,cs:44},{y:yB,lo:18,hi:26,mid:22,notes:notes.filter(n=>n.midi<60),clef:'𝄢',cy:yB(24)+8,cs:32}]
                :bass1?[{y:yT,lo:18,hi:26,mid:22,notes,clef:'𝄢',cy:yT(24)+8,cs:32}]:[{y:yT,lo:30,hi:38,mid:34,notes,clef:'𝄞',cy:yT(32)+9,cs:44}];
  const ink='var(--ink)';
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-label="Sheet music">`;
  staffs.forEach(st=>{ for(let k=0;k<5;k++) s+=`<line class="ln" x1="8" x2="${W-6}" y1="${st.y(st.hi-2*k)}" y2="${st.y(st.hi-2*k)}"/>`;
    s+=`<text class="clef" x="12" y="${st.cy}" font-size="${st.cs}">${st.clef}</text>`; });
  const top=staffs[0].y(staffs[0].hi), bottom=grand?yB(18):staffs[0].y(staffs[0].lo);
  s+=`<line class="ln" x1="8" x2="8" y1="${top}" y2="${bottom}"/>`;
  for(let b=4;b<=beats;b+=4){ const x=X0+cum[b]-8; s+=`<line class="ln" x1="${x}" x2="${x}" y1="${top}" y2="${bottom}"/>`; }
  (chords||[]).forEach(c=>{ if(c.at<beats) s+=`<text class="csym" x="${xOf(c.at)-4}" y="14">${symText(c)}</text>`; });
  staffs.forEach(st=>{
    const stacks=gsStacks(st.notes,beats);
    // beam groups: notes shorter than a quarter within one beat
    const groups=[]; let g=null;
    stacks.forEach((k,i)=>{ const short=k.w<1-1e-6, beat=Math.floor(k.gat+1e-6);
      if(short&&g&&g.beat===beat&&stacks[i-1].w<1-1e-6) g.items.push(i); else { g=short?{beat,items:[i]}:null; if(g) groups.push(g); } });
    const inG=new Map(); groups.forEach(gr=>gr.items.forEach(i=>inG.set(i,gr)));
    const upOf=ks=>{ const all=ks.flatMap(i=>stacks[i].notes.map(n=>n.spell.di)); return all.reduce((a,b)=>a+b,0)/all.length<st.mid; };
    stacks.forEach((k,i)=>{
      const x=xOf(k.gat), up=upOf(inG.get(i)&&inG.get(i).items.length>1?inG.get(i).items:[i]), open=k.w>=2-1e-6;
      const dis=k.notes.map(n=>n.spell.di), lo=Math.min(...dis), hi=Math.max(...dis);
      for(let d=st.lo-2;d>=lo;d-=2) s+=`<line class="ln" x1="${x-10}" x2="${x+10}" y1="${st.y(d)}" y2="${st.y(d)}"/>`;
      for(let d=st.hi+2;d<=hi;d+=2) s+=`<line class="ln" x1="${x-10}" x2="${x+10}" y1="${st.y(d)}" y2="${st.y(d)}"/>`;
      // seconds in a chord sit on the other side of the stem
      let prev=-99, side=false; const accCols=[];
      k.notes.forEach(n=>{ const di=n.spell.di; side=di-prev===1?!side:false; prev=di;
        const cx=x+(side?(up?11:-11):0), cy=st.y(di);
        s+=open?`<ellipse cx="${cx}" cy="${cy}" rx="6" ry="4.3" transform="rotate(-20 ${cx} ${cy})" fill="none" stroke="${ink}" stroke-width="1.8"/>`
               :`<ellipse cx="${cx}" cy="${cy}" rx="6.4" ry="4.6" transform="rotate(-20 ${cx} ${cy})" fill="${ink}"/>`;
        if(n.spell.a){ let c=0; while(accCols[c]!==undefined&&Math.abs(di-accCols[c])<6) c++; accCols[c]=di;
          s+=`<text class="acc" x="${x-14-c*10}" y="${cy+5}" text-anchor="middle" fill="${ink}">${ACC[n.spell.a]}</text>`; }
        if([.375,.75,1.5,3].some(v=>Math.abs(k.w-v)<1e-6)) s+=`<circle cx="${x+(up?12:10)+ (side?11:0)}" cy="${cy-(di%2===0?5:0)}" r="1.8" fill="${ink}"/>`;
      });
      if(k.w>=4-1e-6) return;
      const gr=inG.get(i); if(gr&&gr.items.length>1) return; // beamed below
      const sx=up?x+5.6:x-5.6, y0=up?st.y(lo):st.y(hi), y1=up?st.y(hi)-34:st.y(lo)+34;
      s+=`<line x1="${sx}" x2="${sx}" y1="${y0}" y2="${y1}" stroke="${ink}" stroke-width="1.4"/>`;
      for(let f=0;f<gsFlags(k.w);f++){ const fy=y1+(up?f*7:-f*7); s+=`<path d="M${sx} ${fy} q9 ${up?8:-8} 7 ${up?20:-20}" fill="none" stroke="${ink}" stroke-width="2"/>`; }
      if(k.tup) s+=`<text class="csym" x="${x}" y="${up?y1-6:y1+16}" text-anchor="middle">${k.tup}</text>`;
    });
    groups.filter(gr=>gr.items.length>1).forEach(gr=>{
      const up=upOf(gr.items), ends=gr.items.map(i=>{ const dis=stacks[i].notes.map(n=>n.spell.di); return up?st.y(Math.max(...dis))-32:st.y(Math.min(...dis))+32; });
      const by=up?Math.min(...ends):Math.max(...ends), xs=gr.items.map(i=>xOf(stacks[i].gat)+(up?5.6:-5.6)), th=4, off=up?7:-7;
      gr.items.forEach((i,j)=>{ const dis=stacks[i].notes.map(n=>n.spell.di); s+=`<line x1="${xs[j]}" x2="${xs[j]}" y1="${st.y(up?Math.min(...dis):Math.max(...dis))}" y2="${by}" stroke="${ink}" stroke-width="1.4"/>`; });
      s+=`<rect x="${xs[0]}" y="${up?by:by-th}" width="${xs[xs.length-1]-xs[0]}" height="${th}" fill="${ink}"/>`;
      // 16th and 32nd beams: joined between neighbours that both have them, a stub on a note that has them alone
      for(let L=2;L<=3;L++){ const has=j=>gsFlags(stacks[gr.items[j]].w)>=L, yL=(up?by:by-th)+off*(L-1);
        gr.items.forEach((i,j)=>{ if(!has(j)) return; const nxt=j+1<gr.items.length&&has(j+1), prv=j>0&&has(j-1);
          if(nxt) s+=`<rect x="${xs[j]}" y="${yL}" width="${xs[j+1]-xs[j]}" height="${th}" fill="${ink}"/>`;
          else if(!prv){ const w=9, x1=j===gr.items.length-1?xs[j]-w:xs[j]; s+=`<rect x="${x1}" y="${yL}" width="${w}" height="${th}" fill="${ink}"/>`; } }); }
      const tup=stacks[gr.items[0]].tup;
      if(tup) s+=`<text class="csym" x="${(xs[0]+xs[xs.length-1])/2}" y="${up?by-6:by+16}" text-anchor="middle">${tup}</text>`;
    });
  });
  return s+'</svg>';
}
