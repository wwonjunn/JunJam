/* ---------------- drums: one kit, a beat you pick ----------------
   By default the kind of beat under lofi and slow gospel: a deep kick on 1, a snare on 3 with a little room around it,
   and, if you want it, a hi-hat on 2 and 4 (the jazz player's click). Nothing busy, so the keys have the space.
   Other patterns, or your own, in Profile & settings → Sound (DRUM_PATS below).
   The sounds are recorded samples built into the app (js/drumkit.js), or your own if you've loaded some
   (Profile & settings → Sound). A synth kit stands in only if neither will decode. */
const DRUM={buf:{},ready:false,verb:null,verbCtx:null};
const DRUM_VOICES=['kick','snare','hat'];
const drumRaw=b64=>{ const bin=atob(b64), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return u.buffer; };
async function drumsInit(){
  const c=synth.ctx; if(!c||DRUM.ready) return; if(DRUM.loading) return DRUM.pending;
  DRUM.loading=true;
  DRUM.pending=(async()=>{ do{ DRUM.again=false;   // sounds changed while this ran (a kit picked, a file loaded): go round again
    for(const v of DRUM_VOICES){
      const ov=SND_OVR.kit, kit=ov&&ov!=='builtin'&&typeof LOCAL_KITS!=='undefined'&&LOCAL_KITS[ov];   // a kit just for this song
      let ab=!ov&&typeof smpDB!=='undefined'?await smpDB.get('custom/'+v):null;   // yours first
      const tries=kit?[drumRaw(kit[v])]:ab?[ab]:[drumRaw(DRUM_KIT_DATA[v].ogg),drumRaw(DRUM_KIT_DATA[v].m4a)];   // whichever this browser can read
      let buf=null; for(const x of tries){ try{ buf=await c.decodeAudioData(x.slice(0)); break; }catch(e){} } DRUM.buf[v]=buf; }
  }while(DRUM.again); DRUM.ready=true; DRUM.loading=false; })();
  return DRUM.pending;
}
// after loading or clearing your own sounds; a load already running picks the change up before it finishes
function drumsReload(){ if(DRUM.loading){ DRUM.again=true; return DRUM.pending; } DRUM.ready=false; return drumsInit(); }
// A small room for the snare: a short, dark, decaying burst of noise as the reverb's impulse
// One reverb per bus, so stopping a backing stops its snare tails too (a shared one would leak into every bus it ever fed)
const DRUM_VERBS=new WeakMap();
function drumVerb(c,out){
  if(!(DRUM.verb&&DRUM.verbCtx===c)){ const len=Math.floor(c.sampleRate*1.3), ir=c.createBuffer(2,len,c.sampleRate);
    for(let ch=0;ch<2;ch++){ const d=ir.getChannelData(ch); let lp=0; for(let i=0;i<len;i++){ lp=lp*0.82+(Math.random()*2-1)*0.18; d[i]=lp*Math.pow(1-i/len,3.2); } }
    DRUM.verb=ir; DRUM.verbCtx=c; }
  let cv=DRUM_VERBS.get(out); if(!cv){ cv=c.createConvolver(); cv.buffer=DRUM.verb; cv.connect(out); DRUM_VERBS.set(out,cv); } return cv;
}
const DRUM_MAX={kick:1.2,snare:1.4,hat:0.5};   // seconds a hit may ring before it's faded out
/* One hit. Samples get a gentle tone shaping (the kick a little rounder, the hat softer); the snare sends some to the room. */
function drumHit(v,t,vel=1,bus=null){
  const c=synth.ctx; if(!c) return; t=Math.max(t,c.currentTime); const out=bus||synth.master, b=DRUM.buf[v];
  const g=c.createGain(); g.gain.value=vel*({kick:1.0,snare:0.8,hat:0.85}[v]||1);   // level-matched against the keys
  const f=c.createBiquadFilter(); f.type='lowpass'; f.frequency.value={kick:1800,snare:7000,hat:9000}[v]; f.Q.value=0.5;
  f.connect(g); g.connect(out);
  if(v==='snare'){ const send=c.createGain(), verb=drumVerb(c,out); send.gain.value=0.32*vel; f.connect(send); send.connect(verb); }
  if(b){ const s=c.createBufferSource(), e=c.createGain(), mx=Math.min(b.duration,DRUM_MAX[v]); s.buffer=b; s.connect(e); e.connect(f);
    e.gain.setValueAtTime(1,t); e.gain.setValueAtTime(1,t+mx*0.75); e.gain.linearRampToValueAtTime(0,t+mx); s.start(t); s.stop(t+mx+0.02); return; }
  // the stand-in synth kit
  const env=(node,peak,dec)=>{ const e=c.createGain(); e.gain.setValueAtTime(0.0001,t); e.gain.linearRampToValueAtTime(peak,t+0.003); e.gain.exponentialRampToValueAtTime(0.0001,t+dec); node.connect(e); e.connect(f); };
  if(v==='kick'){ const o=c.createOscillator(); o.frequency.setValueAtTime(110,t); o.frequency.exponentialRampToValueAtTime(45,t+0.12); env(o,0.9,0.5); o.start(t); o.stop(t+0.6); }
  else { const n=c.createBufferSource(), len=Math.floor(c.sampleRate*0.3), nb=c.createBuffer(1,len,c.sampleRate), d=nb.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1; n.buffer=nb;
    const hp=c.createBiquadFilter(); hp.type=v==='hat'?'highpass':'bandpass'; hp.frequency.value=v==='hat'?7500:1800; n.connect(hp); env(hp,v==='hat'?0.25:0.5,v==='hat'?0.04:0.18); n.start(t); n.stop(t+0.32); }
}
/* The beat: a two-bar pattern, sixteen steps a bar (four to a beat), one row each for kick, snare and hi-hat.
   x is a full hit, o a soft one. Pick one in Profile & settings → Sound, or edit any of them into your own.
   sw swings the offbeats (0 straight, 1 full triplet); lazy sets the snare a touch behind the beat. */
const DRUM_PATS={
  laid:  {name:'Laid back', sw:0, lazy:1, k:'x...............x.....o.........', s:'........x...............x.......', h:'....x.......x.......x.......x...'},
  lofi:  {name:'Lofi', sw:0.55, lazy:1, k:'x.........x.....x..o......x.....', s:'....x.......x.......x.......x...', h:'o.o.o.o.o.o.o.o.o.o.o.o.o.o.o.o.'},
  boom:  {name:'Boom bap', sw:0.2, k:'x......x..x.....x.x.......x..o..', s:'....x.......x.......x.......x...', h:'x.o.x.o.x.o.x.o.x.o.x.o.x.o.x.o.'},
  half:  {name:'Half time', sw:0, lazy:1, k:'x.........x.....x.......o.x.....', s:'........x...............x.......', h:'x.o.x.o.x.o.x.o.x.o.x.o.x.o.x.o.'},
  ballad:{name:'Ballad', sw:0, k:'x.......o.......x.......o.......', s:'..............................o.', h:'....x.......x.......x.......x...'},
  bossa: {name:'Bossa', sw:0, k:'x..ox..ox..ox..ox..ox..ox..ox..o', s:'o.....o.....o.......o.....o.....', h:'o.o.o.o.o.o.o.o.o.o.o.o.o.o.o.o.'},
  four:  {name:'Four on the floor', sw:0, k:'x...x...x...x...x...x...x...x...', s:'....o.......o.......o.......o...', h:'..x...x...x...x...x...x...x...x.'},
};
const DRUM_ROWS=[['kick','k'],['snare','s'],['hat','h']];
const DRUM_ROWS_SHOWN=[['hat','h'],['snare','s'],['kick','k']];   // the grid reads like drum notation: hi-hat on top, kick at the bottom
// the pattern picked (yours if you've edited one), or Laid back
function drumPat(){ const id=store.get('drumPat','laid'), c=store.get('drumCustom',null);
  if(id==='custom'&&c&&c.k&&c.k.length===32) return c; return DRUM_PATS[id]||DRUM_PATS.laid; }
/* A song's or a transcription's own beat: null (follow the default above), a pattern's id ('custom': your default's
   Yours), or a pattern of its own ({name,k,s,h,sw,lazy}) */
function drumPatOf(v){ if(v&&typeof v==='object'&&v.k&&v.k.length===32) return v;
  if(v==='custom'){ const c=store.get('drumCustom',null); if(c&&c.k) return c; }
  return typeof v==='string'&&DRUM_PATS[v]?DRUM_PATS[v]:drumPat(); }
/* One bar of the beat. Bars alternate between the pattern's two halves; a bar of 3 plays the first twelve steps,
   longer bars repeat the bar. o.hat: play the hi-hat row (Gig's Hi-hat switch; Comp Hero leaves it out).
   o.after / o.until: only hits from / before these times (starting or stopping partway through a bar). */
function beatBar(t0,spb,beats,info,bus,o={}){
  const p=o.pat||drumPat(), lazy=p.lazy?Math.min(0.025,spb*0.04):0, half=(info.bar%2)*16, sw=p.sw||0;
  for(let b0=0;b0<beats;b0+=4) for(let st=0;st<16&&b0+st/4<beats;st++){
    const t=t0+(b0+st/4)*spb+(st%4===2?sw*spb/6:st%2?sw*spb/12:0);   // swing: the 8th offbeat later, the 16ths a little
    for(const [v,r] of DRUM_ROWS){ if(v==='hat'&&!o.hat) continue; const c=p[r][half+st];
      if(o.after!=null&&t<o.after-1e-3||o.until!=null&&t>=o.until) continue;
      if(c==='x'||c==='o') drumHit(v,t+(v==='snare'?lazy:0),(c==='x'?1:0.55)*(v==='hat'?0.9:1),bus); } }
}

/* Two bars of a beat at 92 bpm with a little bass and keys; the step being played lights up in grid's editor */
async function drumHearBeat(p,host){ synth.init(); await drumsInit(); const spb=60/92, bus=previewBus(Math.ceil((8*spb+1)*1000)); if(!bus) return; const t=now()+.08;
  beatBar(t,spb,4,{bar:0},bus,{hat:true,pat:p}); beatBar(t+4*spb,spb,4,{bar:1},bus,{hat:true,pat:p}); drumHit('kick',t+8*spb,1,bus);
  [[2,'min7',0,4],[7,'dom7',4,4]].forEach(([r,q,at,d])=>{ tone(36+r,t+at*spb,d*spb*.9,84,'bass',bus); playChord(spreadVoice(Q[q],r,null),t+at*spb,d*spb*.9,backSound(),bus,backVel(56)); });
  const me=drumHearBeat.n=(drumHearBeat.n||0)+1, t0=performance.now()+(t-now())*1000;
  const tick=()=>{ const g=host&&host.querySelector('.dgrid'); if(!g||!g.isConnected||me!==drumHearBeat.n) return; const st=Math.floor((performance.now()-t0)/1000/spb*4);
    g.querySelectorAll('.dstep.dnow').forEach(c=>c.classList.remove('dnow')); if(st>=32||PREVIEW!==bus) return;
    if(st>=0) g.querySelectorAll(`.dstep[data-i="${st}"]`).forEach(c=>c.classList.add('dnow')); requestAnimationFrame(tick); };
  requestAnimationFrame(tick); }
/* The beat editor, in Profile (the default) and for one song or transcription. Pick a pattern, or click a step:
   off → full → soft → off. Editing makes it a pattern of its own (o.mine names it). o.value: what's picked now (see
   drumPatOf); o.set(v) keeps a change (and may return what to show as picked now); o.def: offer "Default" (follow Profile's). o.live: something is playing that
   picks the change up by itself, so don't play a preview over it. */
function drumBeatEditor(el,o){
  const draw=()=>{ const v=o.value, p=drumPatOf(v), c=store.get('drumCustom',null), own=v&&typeof v==='object';
    const cur=own?'own':v==null?'def':v==='custom'&&c&&c.k?'custom':DRUM_PATS[v]?v:o.def?'def':'laid';
    const pats=[...(o.def?[['def',{name:`Default (${drumPat().name})`}]]:[]),...Object.entries(DRUM_PATS),...(c&&c.k?[['custom',{name:o.def?'Your default':'Yours'}]]:[]),...(own?[['own',{name:o.mine}]]:[])]
      .filter(([k],i,a)=>!(o.def&&k==='custom'&&store.get('drumPat','laid')==='custom'));   // "Default" already is Yours then
    const name={kick:'Kick',snare:'Snare',hat:'Hi-hat'};
    el.innerHTML=`${o.intro?`<p style="margin-top:14px">${o.intro}</p>`:''}
      <div class="seg dpats" role="group">${pats.map(([k,x])=>`<button data-dpat="${k}" aria-pressed="${k===cur}">${x.name}</button>`).join('')}</div>
      <div class="dgrid">${DRUM_ROWS_SHOWN.map(([v,r])=>`<span class="dname">${name[v]}</span><div class="drow">${[...p[r]].map((ch,i)=>`<button class="dstep${i%4===0?' dbeat':''}${i===16?' bar2':''}" data-r="${r}" data-v="${v}" data-i="${i}" data-c="${ch==='x'?2:ch==='o'?1:0}" aria-label="${name[v]}, bar ${i<16?1:2}, step ${i%16+1}"></button>`).join('')}</div>`).join('')}</div>
      <div class="erow" style="margin-top:6px;align-items:center"><span class="fine" style="margin:0">Swing</span><div class="seg" role="group">${[[0,'Straight'],[0.3,'Light'],[0.6,'Heavy']].map(([x,l])=>`<button data-dsw="${x}" aria-pressed="${Math.abs((p.sw||0)-x)<0.16}">${l}</button>`).join('')}</div>
        ${o.live?'':'<button class="ghost trsm dhear">▶ Hear it</button>'}<span class="fine" style="margin:0">Click a step: once full, twice soft.</span></div>`;
    const hear=()=>{ if(!o.live) drumHearBeat(drumPatOf(o.value),el); };
    const keep=v=>{ const r=o.set(v); o.value=r!==undefined?r:v; draw(); };   // set may say how it kept it (Profile keeps an edit as 'custom')
    const mine=()=>{ const q=drumPatOf(o.value); return {name:o.mine,sw:q.sw||0,lazy:q.lazy||0,k:q.k,s:q.s,h:q.h}; };
    el.querySelectorAll('[data-dpat]').forEach(b=>b.onclick=()=>{ const k=b.dataset.dpat; if(k==='own') return; keep(k==='def'?null:k); hear(); });
    el.querySelectorAll('[data-dsw]').forEach(b=>b.onclick=()=>{ const m=mine(); m.sw=+b.dataset.dsw; keep(m); hear(); });
    if(el.querySelector('.dhear')) el.querySelector('.dhear').onclick=hear;
    el.querySelectorAll('.dstep').forEach(b=>b.onclick=()=>{ const m=mine(), r=b.dataset.r, i=+b.dataset.i, n=(+b.dataset.c+2)%3;   // 0 → 2 → 1 → 0
      m[r]=m[r].slice(0,i)+'.ox'[n]+m[r].slice(i+1); keep(m);
      if(n&&!o.live){ synth.init(); drumsInit().then(()=>{ const bus=previewBus(1500); if(bus) drumHit(b.dataset.v,now()+.02,n===2?1:.55,bus); }); } }); };
  draw(); }

/* Swapping sounds for the song that's open (Gig's Mix, Transcribe's Sound): rows of pickers, each starting on Default
   (Profile's). Nothing is kept per song: soundOvrClear puts Profile's back. onChange: after a swap has loaded. */
function soundOvrClear(){ const kit=SND_OVR.kit!=null; SND_OVR.chords=SND_OVR.bass=SND_OVR.kit=null; SND_OVR.song=null; if(kit) drumsReload(); }
function soundOvrUI(el,onChange){
  const bassName=id=>id==='synth'?'Built-in synth':(SMP_INFO[id]&&SMP_INFO[id].name)||id, kits=typeof LOCAL_KITS!=='undefined'?Object.keys(LOCAL_KITS):[];
  const basses=Object.keys(SMP_INFO).filter(id=>SMP_INFO[id].bass&&smpLocal(id)), defChords=(store.get('backSound','epiano')==='mellow'?'Pad':'Keys');
  const sel=(k,def,opts,cur)=>`<label class="ovrow"><span>${{chords:'Chords',bass:'Bass',kit:'Drum kit'}[k]}</span><select data-ovr="${k}"><option value="">Default (${def})</option>${opts.map(([v,l])=>`<option value="${v}"${cur===v?' selected':''}>${l}</option>`).join('')}</select></label>`;
  el.innerHTML=sel('chords',defChords,BACK_SOUNDS.map(([v,l])=>[v,l]),SND_OVR.chords)
    +(basses.length?sel('bass',bassName(store.get('bassSound','synth')),[['synth','Built-in synth'],...basses.map(id=>[id,bassName(id)])],SND_OVR.bass):'')
    +sel('kit',store.get('drumKit','')||'Profile',[['builtin','Built-in'],...kits.map(k=>[k,k])],SND_OVR.kit);
  el.querySelectorAll('[data-ovr]').forEach(s=>{ s.onpointerdown=e=>e.stopPropagation(); s.onchange=async()=>{ const k=s.dataset.ovr, v=s.value||null; synth.init(); SND_OVR[k]=v;
    if(k==='bass'&&v&&v!=='synth') await smpLoad(v); if(k==='bass'&&!v&&bassSoundPick()!=='synth') await smpLoad(bassSoundPick());
    if(k==='kit') await drumsReload(); if(onChange) onChange(k); }; }); }

/* Your own kits: js/local-kits.js, kept on this Mac. Never committed (.gitignore) and never bundled: it's
   loaded here on the fly, so a copy of Jun Jam without the file just doesn't offer them. Choosing one puts its three
   sounds where Load your own does. The first time the file is found, Loose goes in. */
function localKitUse(name){ const k=typeof LOCAL_KITS!=='undefined'&&LOCAL_KITS[name]; if(!k) return Promise.resolve(false);
  return Promise.all(DRUM_VOICES.map(v=>smpDB.put('custom/'+v,drumRaw(k[v])))).then(()=>{ store.set('drumKit',name); return drumsReload(); }).then(()=>true); }
(function(){ const s=document.createElement('script'); s.src='js/local-kits.js';
  s.onload=async()=>{ const was=store.get('drumKit',''); if(was==='Crate Digger') store.set('drumKit','Loose');   // its new name
    if(was&&!LOCAL_KITS[was]&&was!=='Crate Digger') store.set('drumKit','');   // a kit that's gone: its sounds stay in until you pick another
    if(!store.get('drumKitAuto',false)){ store.set('drumKitAuto',true); await localKitUse('Loose'); }
    if(typeof renderDrumSound==='function'&&document.getElementById('drumSound')) renderDrumSound(); };
  s.onerror=()=>s.remove(); document.head.appendChild(s); })();
