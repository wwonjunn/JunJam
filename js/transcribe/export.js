/* Transcribe: spelling, MIDI and MusicXML export. Pure, no DOM. Tested by tests/theory.test.js
   score: {title, tempo, bars, key:{pc,minor}, melody:[{midi,gat,gdur,tri}], chords:[{at,root,qid}], soloBars:[bar...]} */

const scoreChordAt=(score,at)=>score.chords.filter(c=>c.at<=at+1e-6).pop()||null;
const chordObj=c=>({root:defaultRoot(c.root,Q[c.qid].minor),q:Q[c.qid]});
// Spell a melody note from the chord it sits over (so F♯ over D7, G♭ over A♭m), falling back to the key
function spellIn(score,midi,at){
  const c=scoreChordAt(score,at);
  if(c){ const t=chordObj(c), sp=spellNote(midi,t.root,t.q); if(Math.abs(sp.a)<=1) return sp; }
  const k=defaultRoot(score.key?score.key.pc:0,score.key&&score.key.minor), opts=spellingsFor(mod12(midi));
  const pk=opts.find(([,a])=>a===0)||opts.find(([,a])=>k.a<0?a<0:a>0)||opts[0], oct=Math.floor((midi-pk[1])/12)-1;
  return {l:pk[0],a:pk[1],oct,di:oct*7+pk[0],name:LETTERS[pk[0]]+ACC[pk[1]]};
}
// The melody the score shows and plays: notes in "solo" bars are hidden on lead sheets
const visibleMelody=score=>score.melody.filter(n=>!(score.soloBars||[]).includes(Math.floor(n.gat/4+1e-6)));

/* ---------------- MIDI (type 1: tempo, melody, chords) ---------------- */
// played: the score's scoreMaps, to write the notes when they were really played instead of on the grid
function toMidiFile(score,played=null){
  const PPQ=480, vlq=n=>{ const b=[n&127]; while(n>>=7) b.unshift((n&127)|128); return b; };
  const track=evs=>{ evs.sort((a,b)=>a.t-b.t||a.o-b.o); let last=0; const bytes=[];
    evs.forEach(e=>{ bytes.push(...vlq(Math.max(0,Math.round(e.t)-last)),...e.d); last=Math.max(last,Math.round(e.t)); });
    bytes.push(0,0xff,0x2f,0); return [0x4d,0x54,0x72,0x6b,(bytes.length>>>24)&255,(bytes.length>>>16)&255,(bytes.length>>>8)&255,bytes.length&255,...bytes]; };
  const us=Math.round(60e6/(score.tempo||100));
  const name=[...new TextEncoder().encode(score.title||'Jun Jam transcription')].slice(0,60);
  const t0=track([{t:0,o:0,d:[0xff,0x51,3,(us>>16)&255,(us>>8)&255,us&255]},{t:0,o:0,d:[0xff,0x58,4,4,2,24,8]},{t:0,o:0,d:[0xff,0x03,name.length,...name]}]);
  const bps=(score.tempo||100)/60, at=b=>played?Math.max(0,played.toSec(b))*bps:b;
  const mel=[]; visibleMelody(score).forEach(n=>{ const s=played&&n.sec!=null?n.sec*bps:n.gat, e=played&&n.sec!=null?(n.sec+n.dsec)*bps:n.gat+n.gdur;
    mel.push({t:s*PPQ,o:1,d:[0x90,n.midi,96]},{t:e*PPQ-2,o:0,d:[0x80,n.midi,0]}); });
  const ch=[]; score.chords.forEach((c,i)=>{ const end=at(score.chords[i+1]?score.chords[i+1].at:score.bars*4), t=chordObj(c), c0=at(c.at);
    const notes=[36+mod12(c.root-36),...[...new Set([...t.q.ct,...t.q.req])].map(iv=>48+mod12(c.root+iv)).sort((a,b)=>a-b)];
    notes.forEach(m=>ch.push({t:c0*PPQ,o:1,d:[0x91,m,64]},{t:end*PPQ-4,o:0,d:[0x81,m,0]})); });
  const head=[0x4d,0x54,0x68,0x64,0,0,0,6,0,1,0,3,(PPQ>>8)&255,PPQ&255];
  return new Uint8Array([...head,...t0,...track(mel),...track(ch)]);
}

/* ---------------- MusicXML (chord symbols, ties, tuplets) ----------------
   840 divisions per quarter, so 32nds and tuplets of 3, 5, 6 and 7 are all whole numbers. */
const XDIV=840, XBAR=4*XDIV;
const XTYPES=[[4,'whole',0],[3,'half',1],[2,'half',0],[1.5,'quarter',1],[1,'quarter',0],[.75,'eighth',1],[.5,'eighth',0],[.375,'16th',1],[.25,'16th',0],[.125,'32nd',0],[.0625,'64th',0]];
const XKIND={maj:'major',min:'minor',dim:'diminished',aug:'augmented',maj7:'major-seventh',dom7:'dominant',min7:'minor-seventh',hdim:'half-diminished',
  dim7:'diminished-seventh',six:'major-sixth',min6:'minor-sixth',sus7:'suspended-fourth',sus4:'suspended-fourth',sus2:'suspended-second',mmaj7:'major-minor',maj9:'major-ninth',dom9:'dominant-ninth',min9:'minor-ninth'};
const xesc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const xfifths=k=>{ const order=[0,7,2,9,4,11,6,1,8,3,10,5]; let f=order.indexOf(mod12(k.minor?k.pc+3:k.pc)); if(f>6) f-=12; return f; };
const xharmony=c=>{ const o=chordObj(c); return `<harmony><root><root-step>${LETTERS[o.root.l]}</root-step>${o.root.a?`<root-alter>${o.root.a}</root-alter>`:''}</root><kind text="${xesc(o.q.suf)}">${XKIND[o.q.id]||'major'}</kind></harmony>`; };
// Split [s,e) (divisions) into writable pieces. In a beat written as a tuplet of D (tupAt(beat)), pieces are whole tuplet spots.
function xmlPieces(s,e,tupAt=()=>0){
  const out=[]; let t=s;
  while(t<e-.5){
    const beat=Math.floor(t/XDIV+1e-9), bEnd=(beat+1)*XDIV, D=tupAt(beat);
    if(D){ const slot=XDIV/D, end=Math.min(e,bEnd), n=Math.round((end-t)/slot);
      if(n>=1&&Math.abs(end-t-n*slot)<1&&Math.abs((t-beat*XDIV)/slot-Math.round((t-beat*XDIV)/slot))<1e-6){
        const N=tupNormal(D); let left=n;
        while(left>0){ const v=XTYPES.find(x=>x[0]*N<=left+1e-9&&Math.abs(x[0]*N-Math.round(x[0]*N))<1e-9)||XTYPES[XTYPES.length-1], k=Math.max(1,Math.round(v[0]*N));
          out.push({d:k*slot,type:v,tup:D,N,beat}); left-=k; t+=k*slot; }
        continue; } }
    // plain values; don't run into the next tuplet beat
    let lim=e; for(let b=beat+1;b*XDIV<e;b++) if(tupAt(b)){ lim=b*XDIV; break; }
    if(D) lim=Math.min(lim,bEnd);
    const left=lim-t, v=XTYPES.find(x=>x[0]*XDIV<=left+.5);
    const d=v?Math.round(v[0]*XDIV):Math.round(left); out.push({d,type:v||XTYPES[XTYPES.length-1],tup:0}); t+=d;
  }
  return out;
}
// Tuplet brackets: start on the first piece of a beat's tuplet, stop on its last
function xmlMarkTuplets(items){ items.forEach((it,i)=>{ if(!it.p||!it.p.tup) return; const same=o=>o&&o.p&&o.p.tup===it.p.tup&&o.p.beat===it.p.beat;
  it.tStart=!same(items.slice(0,i).reverse().find(o=>o.p)); it.tStop=!same(items.slice(i+1).find(o=>o.p)); }); }
function xmlNote({p,pitch='',rest=false,chord=false,tieStart=false,tieStop=false,voice=null,staff=null,tStart=false,tStop=false}){
  const [,type,dot]=p.type, nots=(tieStop?'<tied type="stop"/>':'')+(tieStart?'<tied type="start"/>':'')+(!chord&&tStart?'<tuplet type="start" bracket="yes"/>':'')+(!chord&&tStop?'<tuplet type="stop"/>':'');
  return `<note>${chord?'<chord/>':''}${rest?'<rest/>':pitch}<duration>${p.d}</duration>${tieStop?'<tie type="stop"/>':''}${tieStart?'<tie type="start"/>':''}${voice!=null?`<voice>${voice}</voice>`:''}<type>${type}</type>${dot?'<dot/>':''}`+
    (p.tup?`<time-modification><actual-notes>${p.tup}</actual-notes><normal-notes>${p.N}</normal-notes></time-modification>`:'')+(staff!=null?`<staff>${staff}</staff>`:'')+
    (nots?`<notations>${nots}</notations>`:'')+'</note>';
}
function xmlHead(score,partName){
  return `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">\n`+
    `<score-partwise version="4.0"><work><work-title>${xesc(score.title||'Transcription')}</work-title></work><identification><encoding><software>Jun Jam</software></encoding></identification>`+
    `<part-list><score-part id="P1"><part-name>${xesc(partName)}</part-name></score-part></part-list><part id="P1">`;
}
const xmlTempo=score=>`<direction placement="above"><direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>${score.tempo||100}</per-minute></metronome></direction-type><sound tempo="${score.tempo||100}"/></direction>`;
// which beats (numbered from the start of the piece) are written as tuplets, from the notes that start in them
function xmlTupBeats(notes){ const m=new Map(); notes.forEach(n=>{ const t=n.tup||(n.tri?3:0); if(t) m.set(Math.floor(n.gat+1e-6),t); }); return b=>m.get(b)||0; }

function toMusicXML(score){
  if(score.texture==='full') return toMusicXMLFull(score);
  const vis=visibleMelody(score), tupAt=xmlTupBeats(vis);
  // melody as integer divisions, with no overlaps
  const mel=vis.map(n=>({...n,s:Math.round(n.gat*XDIV),e:Math.round((n.gat+n.gdur)*XDIV)})).sort((a,b)=>a.s-b.s);
  mel.forEach((n,i)=>{ if(mel[i+1]&&n.e>mel[i+1].s) n.e=mel[i+1].s; if(n.e<=n.s) n.e=n.s+1; });
  const pitchXml=(midi,at)=>{ const sp=spellIn(score,midi,at); return `<pitch><step>${LETTERS[sp.l]}</step>${sp.a?`<alter>${sp.a}</alter>`:''}<octave>${sp.oct}</octave></pitch>`; };
  let xml=xmlHead(score,score.mode==='lead'?'Lead sheet':(TR_INSTRUMENTS[score.instrument]||{name:'Solo'}).name);
  for(let b=0;b<score.bars;b++){
    const b0=b*XBAR, b1=b0+XBAR;
    xml+=`<measure number="${b+1}">`;
    if(b===0) xml+=`<attributes><divisions>${XDIV}</divisions><key><fifths>${xfifths(score.key||{pc:0})}</fifths>${score.key&&score.key.minor?'<mode>minor</mode>':''}</key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>`+xmlTempo(score);
    if((score.soloBars||[]).includes(b)) xml+=`<direction placement="above"><direction-type><words>Solo</words></direction-type></direction>`;
    let t=b0; const items=[];
    const restTo=to=>{ if(to>t){ xmlPieces(t,to,tupAt).forEach(p=>{ items.push({t,p,rest:true}); t+=p.d; }); t=to; } };
    mel.filter(n=>n.e>b0&&n.s<b1).forEach(n=>{
      const s=Math.max(n.s,b0,t), e=Math.min(n.e,b1); if(e<=s) return;
      restTo(s); const ps=xmlPieces(s,e,tupAt);
      ps.forEach((p,i)=>{ items.push({t,p,pitch:pitchXml(n.midi,n.gat),tieStop:i>0||n.s<b0,tieStart:i<ps.length-1||n.e>b1}); t+=p.d; });
    });
    restTo(b1); xmlMarkTuplets(items);
    const out=items.map(it=>({t:it.t,xml:xmlNote(it)}));
    // each chord symbol goes before the first note or rest at or after its time
    score.chords.filter(c=>Math.round(c.at*XDIV)>=b0&&Math.round(c.at*XDIV)<b1).forEach(c=>{ const ct=Math.round(c.at*XDIV), i=out.findIndex(o=>o.t>=ct);
      out.splice(i<0?out.length:i,0,{t:ct,xml:xharmony(c)}); });
    xml+=out.map(o=>o.xml).join('')+'</measure>';
  }
  return xml+'</part></score-partwise>\n';
}

// Full parts: chords as <chord/> stacks; piano on two staves (right hand treble, left hand bass), one rhythm per staff
function toMusicXMLFull(score){
  const staves=score.grand?2:1, staffOf=m=>staves===2&&m<60?2:1, vis=visibleMelody(score);
  const pitchXml=(midi,at)=>{ const sp=spellIn(score,midi,at); return `<pitch><step>${LETTERS[sp.l]}</step>${sp.a?`<alter>${sp.a}</alter>`:''}<octave>${sp.oct}</octave></pitch>`; };
  let xml=xmlHead(score,(TR_INSTRUMENTS[score.instrument]||{name:'Part'}).name);
  for(let b=0;b<score.bars;b++){
    const b0=b*XBAR, b1=b0+XBAR;
    xml+=`<measure number="${b+1}">`;
    if(b===0) xml+=`<attributes><divisions>${XDIV}</divisions><key><fifths>${xfifths(score.key||{pc:0})}</fifths>${score.key&&score.key.minor?'<mode>minor</mode>':''}</key><time><beats>4</beats><beat-type>4</beat-type></time>`+
      (staves===2?'<staves>2</staves><clef number="1"><sign>G</sign><line>2</line></clef><clef number="2"><sign>F</sign><line>4</line></clef>':'<clef><sign>G</sign><line>2</line></clef>')+'</attributes>'+xmlTempo(score);
    for(let st=1;st<=staves;st++){
      if(st>1) xml+=`<backup><duration>${XBAR}</duration></backup>`;
      const voice=st===1?1:5, all=vis.filter(n=>staffOf(n.midi)===st), tupAt=xmlTupBeats(all), ns=all.filter(n=>Math.round(n.gat*XDIV)>=b0&&Math.round(n.gat*XDIV)<b1);
      // stacks: notes starting together; each lasts until the next stack on this staff (or the bar line)
      const by=new Map(); ns.forEach(n=>{ const k=Math.round(n.gat*XDIV); if(!by.has(k)) by.set(k,[]); by.get(k).push(n); });
      const stacks=[...by.entries()].sort((x,y)=>x[0]-y[0]);
      const items=[]; let t=b0;
      const restTo=to=>{ if(to>t){ xmlPieces(t,to,tupAt).forEach(p=>{ items.push({t,p,rest:true,voice,staff:st}); t+=p.d; }); t=to; } };
      stacks.forEach(([k,group],i)=>{
        if(k<t) return; restTo(k);
        const next=i+1<stacks.length?stacks[i+1][0]:b1, hold=Math.round(Math.max(...group.map(n=>n.gdur))*XDIV), end=Math.min(next,b1,Math.max(k+1,k+hold));
        const sorted=group.sort((x,y)=>x.midi-y.midi), ps=xmlPieces(k,end,tupAt);
        ps.forEach((p,j)=>{ items.push({t,p,notes:sorted,tieStart:j<ps.length-1,tieStop:j>0,voice,staff:st}); t+=p.d; });
      });
      restTo(b1); xmlMarkTuplets(items);
      const out=items.map(it=>({t:it.t,x:it.rest?xmlNote(it):it.notes.map((n,c)=>xmlNote({...it,chord:c>0,pitch:pitchXml(n.midi,n.gat)})).join('')}));
      if(st===1) score.chords.filter(c=>Math.round(c.at*XDIV)>=b0&&Math.round(c.at*XDIV)<b1).forEach(c=>{ const ct=Math.round(c.at*XDIV), i=out.findIndex(e=>e.t>=ct);
        out.splice(i<0?out.length:i,0,{t:ct,x:xharmony(c)}); });
      xml+=out.map(e=>e.x).join('');
    }
    xml+='</measure>';
  }
  return xml+'</part></score-partwise>\n';
}
