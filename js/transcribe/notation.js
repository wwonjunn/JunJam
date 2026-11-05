/* Transcribe: sheet music for transcriptions, with chords stacked on one stem, on a grand staff (piano) or one staff.
   Pure string building, no DOM. One rhythm per staff: each stack lasts as long as it's held (until the next stack at most),
   with rests in the gaps and ties where a note crosses a beat or a barline (gsEvents).
   Rhythms down to 32nds, and tuplets (3, 5, 6, 7... notes in a beat) with their number over the beam.
   notes: [{midi,gat,gdur,tri,tup,spell:{l,a,di}}] with gat measured from the start of the line; chords: [{root,q,at}] */
const GS_VALUES=[4,3,2,1.5,1,.75,.5,.375,.25,.125];
/* Where a written value may start in 4/4, so the beat stays readable: a whole on 1, a half or longer on a beat,
   a quarter or dotted quarter on a beat or an "and", anything shorter inside one beat. Rests are stricter: a quarter
   or longer rest only on a beat, a half rest only on 1 or 3. */
function gsFits(p,v,rest){ const on=x=>Math.abs(x-Math.round(x))<1e-6, pos=((p%4)+4)%4;
  if(v>=4) return on(pos/4);
  if(v>=2) return on(pos)&&(!rest||(v===2&&on(pos/2)));
  if(v>=1) return rest?on(pos)&&v===1:on(pos*2);
  return Math.floor(p+1e-6)===Math.floor(p+v-1e-6); }
// Split [p, p+d) into written values, tied (notes) or one after another (rests); nothing crosses a barline
function gsSplit(p,d,rest){ const out=[]; let left=d, guard=0;
  while(left>1e-6&&guard++<64){ const barEnd=(Math.floor(p/4+1e-6)+1)*4, room=Math.min(left,barEnd-p);
    const v=GS_VALUES.find(x=>x<=room+1e-6&&gsFits(p,x,rest)); if(!v) break; out.push({at:p,w:v}); p+=v; left-=v; }
  return out; }
const gsGrid=x=>Math.abs(x*8-Math.round(x*8))<1e-6;   // on the 32nd grid (a tuplet's gaps aren't)
/* A staff's events in order: notes (notes that start together are one stack) and the rests between them. A note
   lasts as long as it's held, or until the next stack; one that crosses a beat it shouldn't, or a barline, is written
   as tied pieces (tieIn: the first piece continues a note from the line before). Tuplets stay inside their beat. */
function gsEvents(notes,lineBeats){
  const by=new Map(); notes.forEach(n=>{ const k=Math.round(n.gat*840); if(!by.has(k)) by.set(k,[]); by.get(k).push(n); });
  const st=[...by.entries()].sort((a,b)=>a[0]-b[0]).map(([k,ns])=>({gat:k/840,notes:ns.sort((a,b)=>a.spell.di-b.spell.di),
    tup:Math.max(...ns.map(n=>n.tup||(n.tri?3:0))),hold:Math.max(...ns.map(n=>n.gdur)),tieIn:ns.some(n=>n.tieIn)}));
  const ev=[], rests=(a,z)=>{ if(!gsGrid(a)) a=Math.ceil(a-1e-6); if(z-a<.125-1e-6) return;
    for(let b=Math.floor(a/4+1e-6)*4;b<z-1e-6;b+=4){ const s0=Math.max(a,b), s1=Math.min(z,b+4);
      if(s0<=b+1e-6&&s1>=b+4-1e-6){ ev.push({rest:true,at:b,w:4,bar:true}); continue; }   // an empty bar: one whole rest in the middle
      gsSplit(s0,s1-s0,true).forEach(x=>ev.push({rest:true,...x})); } };
  let t=0;
  st.forEach((k,i)=>{ const next=i+1<st.length?st[i+1].gat:lineBeats; rests(t,k.gat);
    if(k.tup){ const beatEnd=Math.floor(k.gat+1e-6)+1, slots=Math.max(1,Math.round(Math.min(k.hold,next-k.gat,beatEnd-k.gat)*k.tup)), w=slots/tupNormal(k.tup);
      ev.push({gat:k.gat,w:GS_VALUES.find(v=>v<=w+1e-6)||.125,notes:k.notes,tup:k.tup,first:true,tieIn:k.tieIn}); t=k.gat+slots/k.tup; return; }
    const d=Math.max(.125,Math.min(k.hold,next-k.gat)), ps=gsSplit(k.gat,d,false);
    ps.forEach((x,j)=>ev.push({gat:x.at,w:x.w,notes:k.notes,tup:0,first:j===0,tieIn:j===0&&k.tieIn,tieNext:j<ps.length-1}));
    t=k.gat+d; });
  rests(t,lineBeats);
  return ev;
}
const gsFlags=w=>w<=.125+1e-6?3:w<=.375+1e-6?2:w<1-1e-6?1:0;
// A rest of value w (quarters) at x, drawn (music fonts vary too much from Mac to Mac to trust their glyphs)
function gsRest(x,st,w){ const ink='var(--ink)', ym=st.y(st.mid); let r='';
  if(w>=4-1e-6) r=`<rect x="${x-6}" y="${st.y(st.hi-2)}" width="13" height="5" fill="${ink}"/>`;   // hangs from the 4th line
  else if(w>=2-1e-6) r=`<rect x="${x-6}" y="${ym-5}" width="13" height="5" fill="${ink}"/>`;   // sits on the middle line
  else if(w>=1-1e-6) r=`<path d="M${x-2} ${ym-15} L${x+4} ${ym-7} L${x-1} ${ym-1} L${x+4} ${ym+6} C${x-3} ${ym+3} ${x-4} ${ym+9} ${x} ${ym+13}" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  else { const f=gsFlags(w), y0=ym-9, y1=ym+7+(f-1)*7; r=`<line x1="${x+5}" y1="${y0}" x2="${x-1}" y2="${y1}" stroke="${ink}" stroke-width="1.5"/>`;
    for(let k=0;k<f;k++){ const fy=y0+k*7, fx=x+5-k*2.6; r+=`<circle cx="${fx-6}" cy="${fy+1}" r="2.4" fill="${ink}"/><path d="M${fx-6} ${fy+2} Q${fx-3} ${fy+4} ${fx} ${fy}" fill="none" stroke="${ink}" stroke-width="1.4"/>`; } }
  if([.375,.75,1.5,3].some(v=>Math.abs(w-v)<1e-6)) r+=`<circle cx="${x+10}" cy="${ym-3}" r="1.8" fill="${ink}"/>`;
  return r; }
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
  // chord symbols go above the highest notehead or stem on the top staff; the picture grows upwards when they need room
  const st0=staffs[0], tops=st0.notes.map(n=>st0.y(n.spell.di)-(n.spell.di<st0.mid?36:10));
  const cy=Math.min(14,(tops.length?Math.min(...tops):99)-6), vy=Math.min(0,cy-14);
  let s=`<svg viewBox="0 ${vy} ${W} ${H-vy}" width="${W}" height="${H-vy}" aria-label="Sheet music">`;
  staffs.forEach(st=>{ for(let k=0;k<5;k++) s+=`<line class="ln" x1="8" x2="${W-6}" y1="${st.y(st.hi-2*k)}" y2="${st.y(st.hi-2*k)}"/>`;
    s+=`<text class="clef" x="12" y="${st.cy}" font-size="${st.cs}">${st.clef}</text>`; });
  const top=staffs[0].y(staffs[0].hi), bottom=grand?yB(18):staffs[0].y(staffs[0].lo);
  s+=`<line class="ln" x1="8" x2="8" y1="${top}" y2="${bottom}"/>`;
  for(let b=4;b<=beats;b+=4){ const x=X0+cum[b]-8; s+=`<line class="ln bl" x1="${x}" x2="${x}" y1="${top}" y2="${bottom}"/>`; }
  (chords||[]).forEach(c=>{ if(c.at<beats) s+=`<text class="csym"${c.i!=null?` data-c="${c.i}"`:''} x="${xOf(c.at)-4}" y="${cy}">${symText(c)}</text>`; });
  staffs.forEach(st=>{
    const evs=gsEvents(st.notes,beats), stacks=[];
    evs.forEach((e,q)=>{ if(e.rest) s+=gsRest(e.bar?xOf(e.at+2)-8:xOf(e.at)+4,st,e.w); else stacks.push({...e,q}); });
    // beam groups: notes shorter than a quarter within one beat, with no rest between them
    const groups=[]; let g=null;
    stacks.forEach((k,i)=>{ const short=k.w<1-1e-6, beat=Math.floor(k.gat+1e-6);
      if(short&&g&&g.beat===beat&&stacks[i-1].w<1-1e-6&&stacks[i-1].q===k.q-1) g.items.push(i); else { g=short?{beat,items:[i]}:null; if(g) groups.push(g); } });
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
        if(k.tieNext&&stacks[i+1]){ const x2=xOf(stacks[i+1].gat)+(side?(up?11:-11):0), ty=cy+(up?7:-7);   // a tie to the next piece, on the side away from the stem
          s+=`<path d="M${cx+5} ${ty} Q${(cx+x2)/2} ${ty+(up?9:-9)} ${x2-5} ${ty}" fill="none" stroke="${ink}" stroke-width="1.5"/>`; }
        if(k.tieIn){ const ty=cy+(up?7:-7); s+=`<path d="M${cx-24} ${ty} Q${cx-14} ${ty+(up?8:-8)} ${cx-5} ${ty}" fill="none" stroke="${ink}" stroke-width="1.5"/>`; }
        if(n.spell.a&&k.first&&!k.tieIn){ let c=0; while(accCols[c]!==undefined&&Math.abs(di-accCols[c])<6) c++; accCols[c]=di;
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
