/* ---------------- drums: one kit, one simple beat ----------------
   The kind of beat under lofi and slow gospel: a deep kick on 1, a snare on 3 with a little room around it,
   and, if you want it, a hi-hat on 2 and 4 (the jazz player's click). Nothing busy, so the keys have the space.
   The sounds are recorded samples built into the app (js/drumkit.js), or your own if you've loaded some
   (Profile & settings → Sound). A synth kit stands in only if neither will decode. */
const DRUM={buf:{},ready:false,verb:null,verbCtx:null};
const DRUM_VOICES=['kick','snare','hat'];
async function drumsInit(){
  const c=synth.ctx; if(!c||DRUM.ready||DRUM.loading) return; DRUM.loading=true;
  for(const v of DRUM_VOICES){
    let ab=typeof smpDB!=='undefined'?await smpDB.get('custom/'+v):null;   // yours first
    const raw=b64=>{ const bin=atob(b64), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return u.buffer; };
    const tries=ab?[ab]:[raw(DRUM_KIT_DATA[v].ogg),raw(DRUM_KIT_DATA[v].m4a)];   // whichever this browser can read
    DRUM.buf[v]=null; for(const x of tries){ try{ DRUM.buf[v]=await c.decodeAudioData(x.slice(0)); break; }catch(e){} } }
  DRUM.ready=true; DRUM.loading=false;
}
function drumsReload(){ DRUM.ready=false; DRUM.buf={}; return drumsInit(); }   // after loading or clearing your own sounds
// A small room for the snare: a short, dark, decaying burst of noise as the reverb's impulse
function drumVerb(c){
  if(DRUM.verb&&DRUM.verbCtx===c) return DRUM.verb;
  const len=Math.floor(c.sampleRate*1.3), ir=c.createBuffer(2,len,c.sampleRate);
  for(let ch=0;ch<2;ch++){ const d=ir.getChannelData(ch); let lp=0; for(let i=0;i<len;i++){ lp=lp*0.82+(Math.random()*2-1)*0.18; d[i]=lp*Math.pow(1-i/len,3.2); } }
  const cv=c.createConvolver(); cv.buffer=ir; DRUM.verb=cv; DRUM.verbCtx=c; return cv;
}
/* One hit. Samples get a gentle tone shaping (the kick a little rounder, the hat softer); the snare sends some to the room. */
function drumHit(v,t,vel=1,bus=null){
  const c=synth.ctx; if(!c) return; t=Math.max(t,c.currentTime); const out=bus||synth.master, b=DRUM.buf[v];
  const g=c.createGain(); g.gain.value=vel*({kick:1.0,snare:0.8,hat:0.85}[v]||1);   // level-matched against the keys
  const f=c.createBiquadFilter(); f.type='lowpass'; f.frequency.value={kick:1800,snare:7000,hat:9000}[v]; f.Q.value=0.5;
  f.connect(g); g.connect(out);
  if(v==='snare'){ const send=c.createGain(), verb=drumVerb(c); send.gain.value=0.32*vel; f.connect(send); send.connect(verb); verb.connect(out); }
  if(b){ const s=c.createBufferSource(); s.buffer=b; s.connect(f); s.start(t); return; }
  // the stand-in synth kit
  const env=(node,peak,dec)=>{ const e=c.createGain(); e.gain.setValueAtTime(0.0001,t); e.gain.linearRampToValueAtTime(peak,t+0.003); e.gain.exponentialRampToValueAtTime(0.0001,t+dec); node.connect(e); e.connect(f); };
  if(v==='kick'){ const o=c.createOscillator(); o.frequency.setValueAtTime(110,t); o.frequency.exponentialRampToValueAtTime(45,t+0.12); env(o,0.9,0.5); o.start(t); o.stop(t+0.6); }
  else { const n=c.createBufferSource(), len=Math.floor(c.sampleRate*0.3), nb=c.createBuffer(1,len,c.sampleRate), d=nb.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1; n.buffer=nb;
    const hp=c.createBiquadFilter(); hp.type=v==='hat'?'highpass':'bandpass'; hp.frequency.value=v==='hat'?7500:1800; n.connect(hp); env(hp,v==='hat'?0.25:0.5,v==='hat'?0.04:0.18); n.start(t); n.stop(t+0.32); }
}
/* One bar of the beat. hat: hi-hat on 2 and 4. A bar of 3 puts the snare on 3 too; longer bars repeat the idea.
   Every other bar the kick adds a soft pickup before 3, and the snare sits a touch behind the beat: laid back, not stiff. */
function beatBar(t0,spb,beats,info,bus,o={}){
  const lazy=Math.min(0.025,spb*0.04);
  for(let b0=0;b0<beats;b0+=4){ const at=x=>t0+(b0+x)*spb;
    drumHit('kick',at(0),1,bus);
    if(info.bar%2===1&&beats-b0>=3) drumHit('kick',at(1.5),0.55,bus);
    if(beats-b0>=3) drumHit('snare',at(2)+lazy,1,bus);
    if(o.hat) [1,3].forEach(x=>{ if(b0+x<beats) drumHit('hat',at(x),0.9,bus); }); }
}
