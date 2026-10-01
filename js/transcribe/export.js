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
function toMidiFile(score){
  const PPQ=480, vlq=n=>{ const b=[n&127]; while(n>>=7) b.unshift((n&127)|128); return b; };
  const track=evs=>{ evs.sort((a,b)=>a.t-b.t||a.o-b.o); let last=0; const bytes=[];
    evs.forEach(e=>{ bytes.push(...vlq(Math.max(0,Math.round(e.t)-last)),...e.d); last=Math.max(last,Math.round(e.t)); });
    bytes.push(0,0xff,0x2f,0); return [0x4d,0x54,0x72,0x6b,(bytes.length>>>24)&255,(bytes.length>>>16)&255,(bytes.length>>>8)&255,bytes.length&255,...bytes]; };
  const us=Math.round(60e6/(score.tempo||100));
  const name=[...new TextEncoder().encode(score.title||'Jun Jam transcription')].slice(0,60);
  const t0=track([{t:0,o:0,d:[0xff,0x51,3,(us>>16)&255,(us>>8)&255,us&255]},{t:0,o:0,d:[0xff,0x58,4,4,2,24,8]},{t:0,o:0,d:[0xff,0x03,name.length,...name]}]);
  const mel=[]; visibleMelody(score).forEach(n=>{ mel.push({t:n.gat*PPQ,o:1,d:[0x90,n.midi,96]},{t:(n.gat+n.gdur)*PPQ-2,o:0,d:[0x80,n.midi,0]}); });
  const ch=[]; score.chords.forEach((c,i)=>{ const end=(score.chords[i+1]?score.chords[i+1].at:score.bars*4), t=chordObj(c);
    const notes=[36+mod12(c.root-36),...[...new Set([...t.q.ct,...t.q.req])].map(iv=>48+mod12(c.root+iv)).sort((a,b)=>a-b)];
    notes.forEach(m=>ch.push({t:c.at*PPQ,o:1,d:[0x91,m,64]},{t:end*PPQ-4,o:0,d:[0x81,m,0]})); });
  const head=[0x4d,0x54,0x68,0x64,0,0,0,6,0,1,0,3,(PPQ>>8)&255,PPQ&255];
  return new Uint8Array([...head,...t0,...track(mel),...track(ch)]);
}

/* ---------------- MusicXML (one part, chord symbols, ties, triplets) ---------------- */
function toMusicXML(score){
  if(score.texture==='full') return toMusicXMLFull(score);
  const DIV=12, BAR=48, esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const TYPES=[[48,'whole',0],[36,'half',1],[24,'half',0],[18,'quarter',1],[12,'quarter',0],[9,'eighth',1],[6,'eighth',0],[3,'16th',0]];
  const KIND={maj:'major',min:'minor',dim:'diminished',aug:'augmented',maj7:'major-seventh',dom7:'dominant',min7:'minor-seventh',hdim:'half-diminished',
    dim7:'diminished-seventh',six:'major-sixth',min6:'minor-sixth',sus7:'suspended-fourth',sus4:'suspended-fourth',sus2:'suspended-second',mmaj7:'major-minor',maj9:'major-ninth',dom9:'dominant-ninth',min9:'minor-ninth'};
  const fifths=k=>{ const order=[0,7,2,9,4,11,6,1,8,3,10,5]; let f=order.indexOf(mod12(k.minor?k.pc+3:k.pc)); if(f>6) f-=12; return f; };
  // melody as integer divisions, clipped to bars and with no overlaps
  const mel=visibleMelody(score).map(n=>({...n,s:Math.round(n.gat*DIV),e:Math.round((n.gat+n.gdur)*DIV)})).sort((a,b)=>a.s-b.s);
  mel.forEach((n,i)=>{ if(mel[i+1]&&n.e>mel[i+1].s) n.e=mel[i+1].s; if(n.e<=n.s) n.e=n.s+1; });
  const pitchXml=(midi,at)=>{ const sp=spellIn(score,midi,at); return `<pitch><step>${LETTERS[sp.l]}</step>${sp.a?`<alter>${sp.a}</alter>`:''}<octave>${sp.oct}</octave></pitch>`; };
  const noteXml=(dur,body,{tri=false,tieStart=false,tieStop=false,rest=false}={})=>{
    const base=tri?dur*3/2:dur, t=TYPES.find(x=>x[0]===base)||TYPES.find(x=>x[0]<=base)||TYPES[TYPES.length-1];
    return `<note>${rest?'<rest/>':body}<duration>${dur}</duration>${tieStop?'<tie type="stop"/>':''}${tieStart?'<tie type="start"/>':''}<type>${t[1]}</type>${t[2]?'<dot/>':''}`+
      (tri?'<time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>':'')+
      ((tieStart||tieStop)?`<notations>${tieStop?'<tied type="stop"/>':''}${tieStart?'<tied type="start"/>':''}</notations>`:'')+'</note>';
  };
  // split a length into writable values (whole, dotted, plain), plus 8th- and quarter-note triplets
  const pieces=(len,tri)=>{ if(tri&&(len===4||len===8)) return [{d:len,tri:true}]; const out=[]; let left=len;
    while(left>0){ const v=[48,36,24,18,12,9,6,3].find(x=>x<=left); if(!v){ out.push({d:left}); break; } out.push({d:v}); left-=v; } return out; };
  let xml=`<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">\n`+
    `<score-partwise version="4.0"><work><work-title>${esc(score.title||'Transcription')}</work-title></work><identification><encoding><software>Jun Jam</software></encoding></identification>`+
    `<part-list><score-part id="P1"><part-name>${score.mode==='lead'?'Lead sheet':'Solo'}</part-name></score-part></part-list><part id="P1">`;
  for(let b=0;b<score.bars;b++){
    const b0=b*BAR, b1=b0+BAR;
    xml+=`<measure number="${b+1}">`;
    if(b===0) xml+=`<attributes><divisions>${DIV}</divisions><key><fifths>${fifths(score.key||{pc:0})}</fifths>${score.key&&score.key.minor?'<mode>minor</mode>':''}</key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>`+
      `<direction placement="above"><direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>${score.tempo||100}</per-minute></metronome></direction-type><sound tempo="${score.tempo||100}"/></direction>`;
    if((score.soloBars||[]).includes(b)) xml+=`<direction placement="above"><direction-type><words>Solo</words></direction-type></direction>`;
    // chord symbols and notes, in time order
    const evs=[]; score.chords.filter(c=>Math.round(c.at*DIV)>=b0&&Math.round(c.at*DIV)<b1).forEach(c=>evs.push({t:Math.round(c.at*DIV),c}));
    let t=b0;
    const out=[];
    const flushTo=to=>{ if(to>t){ pieces(to-t).forEach(p=>out.push({t,xml:noteXml(p.d,'',{rest:true})})); t=to; } };
    mel.filter(n=>n.e>b0&&n.s<b1).forEach(n=>{
      const s=Math.max(n.s,b0), e=Math.min(n.e,b1);
      flushTo(s);
      const ps=pieces(e-s,n.tri&&n.s>=b0&&n.e<=b1);
      ps.forEach((p,i)=>{ out.push({t,xml:noteXml(p.d,pitchXml(n.midi,n.gat),{tri:p.tri,tieStop:i>0||n.s<b0,tieStart:i<ps.length-1||n.e>b1})}); t+=p.d; });
    });
    flushTo(b1);
    // place each chord symbol before the first note or rest at or after its time
    evs.forEach(ev=>{ const i=out.findIndex(o=>o.t>=ev.t), c=chordObj(ev.c), sym=symText({root:c.root,q:c.q});
      const h=`<harmony><root><root-step>${LETTERS[c.root.l]}</root-step>${c.root.a?`<root-alter>${c.root.a}</root-alter>`:''}</root><kind text="${esc(c.q.suf)}">${KIND[c.q.id]||'major'}</kind></harmony>`;
      out.splice(i<0?out.length:i,0,{t:ev.t,xml:h,sym}); });
    xml+=out.map(o=>o.xml).join('')+'</measure>';
  }
  return xml+'</part></score-partwise>\n';
}

// Full parts: chords as <chord/> stacks; piano on two staves (right hand treble, left hand bass), one rhythm per staff
function toMusicXMLFull(score){
  const DIV=12, BAR=48, esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const TYPES=[[48,'whole',0],[36,'half',1],[24,'half',0],[18,'quarter',1],[12,'quarter',0],[9,'eighth',1],[6,'eighth',0],[3,'16th',0]];
  const KIND={maj:'major',min:'minor',dim:'diminished',aug:'augmented',maj7:'major-seventh',dom7:'dominant',min7:'minor-seventh',hdim:'half-diminished',
    dim7:'diminished-seventh',six:'major-sixth',min6:'minor-sixth',sus7:'suspended-fourth',sus4:'suspended-fourth',sus2:'suspended-second',mmaj7:'major-minor',maj9:'major-ninth',dom9:'dominant-ninth',min9:'minor-ninth'};
  const fifths=k=>{ const order=[0,7,2,9,4,11,6,1,8,3,10,5]; let f=order.indexOf(mod12(k.minor?k.pc+3:k.pc)); if(f>6) f-=12; return f; };
  const staves=score.grand?2:1, staffOf=m=>staves===2&&m<60?2:1;
  const pieces=(len,tri)=>{ if(tri&&(len===4||len===8)) return [{d:len,tri:true}]; const out=[]; let left=len;
    while(left>0){ const v=[48,36,24,18,12,9,6,3].find(x=>x<=left); if(!v){ out.push({d:left}); break; } out.push({d:v}); left-=v; } return out; };
  const note=({chord=false,pitch='',rest=false,d,tri=false,tieStart=false,tieStop=false,voice,staff})=>{
    const base=tri?d*3/2:d, t=TYPES.find(x=>x[0]===base)||TYPES.find(x=>x[0]<=base)||TYPES[TYPES.length-1];
    return `<note>${chord?'<chord/>':''}${rest?'<rest/>':pitch}<duration>${d}</duration>${tieStop?'<tie type="stop"/>':''}${tieStart?'<tie type="start"/>':''}<voice>${voice}</voice><type>${t[1]}</type>${t[2]?'<dot/>':''}`+
      (tri?'<time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>':'')+`<staff>${staff}</staff>`+
      ((tieStart||tieStop)?`<notations>${tieStop?'<tied type="stop"/>':''}${tieStart?'<tied type="start"/>':''}</notations>`:'')+'</note>';
  };
  const pitchXml=(midi,at)=>{ const sp=spellIn(score,midi,at); return `<pitch><step>${LETTERS[sp.l]}</step>${sp.a?`<alter>${sp.a}</alter>`:''}<octave>${sp.oct}</octave></pitch>`; };
  const vis=visibleMelody(score);
  let xml=`<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">\n`+
    `<score-partwise version="4.0"><work><work-title>${esc(score.title||'Transcription')}</work-title></work><identification><encoding><software>Jun Jam</software></encoding></identification>`+
    `<part-list><score-part id="P1"><part-name>${(TR_INSTRUMENTS[score.instrument]||{name:'Part'}).name}</part-name></score-part></part-list><part id="P1">`;
  for(let b=0;b<score.bars;b++){
    const b0=b*BAR, b1=b0+BAR;
    xml+=`<measure number="${b+1}">`;
    if(b===0) xml+=`<attributes><divisions>${DIV}</divisions><key><fifths>${fifths(score.key||{pc:0})}</fifths>${score.key&&score.key.minor?'<mode>minor</mode>':''}</key><time><beats>4</beats><beat-type>4</beat-type></time>`+
      (staves===2?'<staves>2</staves><clef number="1"><sign>G</sign><line>2</line></clef><clef number="2"><sign>F</sign><line>4</line></clef>':'<clef><sign>G</sign><line>2</line></clef>')+'</attributes>'+
      `<direction placement="above"><direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>${score.tempo||100}</per-minute></metronome></direction-type><sound tempo="${score.tempo||100}"/></direction>`;
    for(let st=1;st<=staves;st++){
      if(st>1) xml+=`<backup><duration>${BAR}</duration></backup>`;
      const voice=st===1?1:5, ns=vis.filter(n=>staffOf(n.midi)===st&&Math.round(n.gat*DIV)>=b0&&Math.round(n.gat*DIV)<b1);
      // stacks: notes starting together; each lasts until the next stack on this staff (or the bar line)
      const by=new Map(); ns.forEach(n=>{ const k=Math.round(n.gat*DIV); if(!by.has(k)) by.set(k,[]); by.get(k).push(n); });
      const stacks=[...by.entries()].sort((x,y)=>x[0]-y[0]);
      const out=[]; let t=b0;
      const rest=to=>{ if(to>t){ pieces(to-t).forEach(p=>out.push({t,x:note({rest:true,d:p.d,voice,staff:st})})); t=to; } };
      stacks.forEach(([k,group],i)=>{
        rest(k); const next=i+1<stacks.length?stacks[i+1][0]:b1, hold=Math.round(Math.max(...group.map(n=>n.gdur))*DIV);
        const end=Math.min(next,b1,Math.max(k+1,k+hold)), tri=group.some(n=>n.tri), ps=pieces(end-k,tri);
        const sorted=group.sort((x,y)=>x.midi-y.midi);
        ps.forEach((p,j)=>{ out.push({t,x:sorted.map((n,c)=>note({chord:c>0,pitch:pitchXml(n.midi,n.gat),d:p.d,tri:p.tri,tieStart:j<ps.length-1,tieStop:j>0,voice,staff:st})).join('')}); t+=p.d; });
      });
      rest(b1);
      if(st===1) score.chords.filter(c=>Math.round(c.at*DIV)>=b0&&Math.round(c.at*DIV)<b1).forEach(c=>{ const ct=Math.round(c.at*DIV), o=chordObj(c), i=out.findIndex(e=>e.t>=ct);
        out.splice(i<0?out.length:i,0,{t:ct,x:`<harmony><root><root-step>${LETTERS[o.root.l]}</root-step>${o.root.a?`<root-alter>${o.root.a}</root-alter>`:''}</root><kind text="${esc(o.q.suf)}">${KIND[o.q.id]||'major'}</kind></harmony>`}); });
      xml+=out.map(e=>e.x).join('');
    }
    xml+='</measure>';
  }
  return xml+'</part></score-partwise>\n';
}
