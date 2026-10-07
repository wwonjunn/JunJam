/* ---------------- audio ---------------- */
const synth={ctx:null,voices:new Map(),
  init(){
    if(!this.ctx){
      const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      this.ctx=new AC(); this.master=this.ctx.createGain(); this.master.gain.value=0.22;
      const comp=this.ctx.createDynamicsCompressor(); this.master.connect(comp); comp.connect(this.ctx.destination);
    }
    if(this.ctx.state!=='running') this.ctx.resume().then(sndStatus,sndStatus);
    sndStatus();
  },
  on(m,v=90){
    if(!opts.sound) return;
    if(!this.ctx||this.ctx.state!=='running'){ sndStatus(); if(this.ctx) this.ctx.resume(); if(!this.ctx) return; }
    this.off(m,0.03);
    const c=this.ctx,t=c.currentTime,f=440*Math.pow(2,(m-69)/12),vel=v/127;
    const car=c.createOscillator(), mod=c.createOscillator(), mg=c.createGain(), g=c.createGain();
    car.type='sine'; mod.type='sine'; car.frequency.value=f; mod.frequency.value=f;
    mg.gain.setValueAtTime(f*(0.4+1.4*vel),t); mg.gain.exponentialRampToValueAtTime(f*0.04,t+0.9);
    mod.connect(mg); mg.connect(car.frequency);
    const peak=0.08+0.3*vel;
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(peak,t+0.006);
    g.gain.exponentialRampToValueAtTime(peak*0.3,t+1.3); g.gain.exponentialRampToValueAtTime(0.0001,t+7);
    car.connect(g); g.connect(this.master); car.start(t); mod.start(t); car.stop(t+7.1); mod.stop(t+7.1);
    this.voices.set(m,{g,car,mod});
  },
  off(m,rel=0.3){
    const vo=this.voices.get(m); if(!vo||!this.ctx) return;
    const t=this.ctx.currentTime;
    try{vo.g.gain.cancelScheduledValues(t); vo.g.gain.setValueAtTime(Math.max(vo.g.gain.value,0.0001),t);
      vo.g.gain.exponentialRampToValueAtTime(0.0001,t+rel); vo.car.stop(t+rel+0.05); vo.mod.stop(t+rel+0.05);}catch(e){}
    this.voices.delete(m);
  }
};

function sndStatus(){
  const b=document.getElementById('snd'); if(!b) return;
  const blocked=opts.sound && (!synth.ctx || synth.ctx.state!=='running');
  b.hidden=!blocked;
}
// Browsers only allow audio after a click or key press on the page, and MIDI notes don't count.
// So unlock audio on the first real gesture anywhere.
['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,()=>{ if(opts.sound) synth.init(); },{capture:true}));
document.addEventListener('visibilitychange',()=>{ if(!document.hidden && synth.ctx && synth.ctx.state!=='running') sndStatus(); });


/* ---------------- scheduled tones (used by Ears and "by ear" chords) ----------------
   Every question gets its own bus, so stopping a question fades everything it scheduled. */
const TIMBRES=['epiano','mellow','pluck'];
/* The backing-chord sound everywhere chords play under you (Gig, Lines, Reharm, Transcribe): Keys or Pad.
   One setting, picked in Gig or in Profile & settings. Ears keeps its own sounds. */
const BACK_SOUNDS=[['epiano','Keys','Electric piano'],['mellow','Pad','Soft, held']];
const backSound=()=>{ const s=store.get('backSound',null)??(store.get('gig',{}).sound); return s==='mellow'?'mellow':'epiano'; };
const setBackSound=s=>store.set('backSound',s==='mellow'?'mellow':'epiano');
const backVel=v=>backSound()==='mellow'?Math.round(v*.82):v;   // the pad sits a little softer than the keys
function newBus(){
  synth.init(); const c=synth.ctx; if(!c) return null;
  const g=c.createGain(); g.gain.value=1; g.connect(synth.master); return g;
}
function killBus(bus){
  if(!bus||!synth.ctx) return;
  const t=synth.ctx.currentTime;
  try{ bus.gain.cancelScheduledValues(t); bus.gain.setValueAtTime(bus.gain.value,t); bus.gain.linearRampToValueAtTime(0,t+0.06); }catch(e){}
  setTimeout(()=>{try{bus.disconnect();}catch(e){}},200);
}
const now=()=>synth.ctx?synth.ctx.currentTime:0;
function tone(m,when,dur=0.9,vel=90,timbre='epiano',bus=null){
  const c=synth.ctx; if(!c) return;
  const t=Math.max(when,c.currentTime), f=440*Math.pow(2,(m-69)/12), v=vel/127, out=bus||synth.master;
  const g=c.createGain(); g.connect(out);
  const end=t+dur+0.5, nodes=[];
  if(timbre==='mellow'){
    const o1=c.createOscillator(), o2=c.createOscillator(), lp=c.createBiquadFilter();
    o1.type='triangle'; o2.type='sine'; o1.frequency.value=f; o2.frequency.value=f*2;
    const g2=c.createGain(); g2.gain.value=0.25; lp.type='lowpass'; lp.frequency.value=2200;
    o1.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(g);
    const pk=0.1+0.22*v;
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(pk,t+0.04);
    g.gain.setValueAtTime(pk*0.8,t+dur); g.gain.exponentialRampToValueAtTime(0.0001,end);
    nodes.push(o1,o2);
  } else if(timbre==='bass'){ // a clean electric-bass note: round sine body, a little triangle for definition, a soft pluck that settles
    const o=c.createOscillator(), o2=c.createOscillator(), g2=c.createGain(), lp=c.createBiquadFilter();
    o.type='sine'; o.frequency.value=f; o2.type='triangle'; o2.frequency.value=f; g2.gain.value=0.3;
    lp.type='lowpass'; lp.Q.value=0.6; lp.frequency.setValueAtTime(Math.min(2000,f*12),t); lp.frequency.exponentialRampToValueAtTime(Math.max(220,f*3),t+0.3);
    o.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(g);
    const pk=0.25+0.3*v, hold=Math.max(0.3,dur-0.06);
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(pk,t+0.006); g.gain.exponentialRampToValueAtTime(pk*0.6,t+0.28);
    g.gain.setValueAtTime(pk*0.6,t+hold); g.gain.exponentialRampToValueAtTime(0.0001,t+hold+0.12);
    nodes.push(o,o2);
  } else if(timbre==='pluck'){
    const o=c.createOscillator(), lp=c.createBiquadFilter();
    o.type='sawtooth'; o.frequency.value=f; lp.type='lowpass'; lp.Q.value=2;
    lp.frequency.setValueAtTime(Math.min(12000,f*8),t); lp.frequency.exponentialRampToValueAtTime(f*1.5,t+0.5);
    o.connect(lp); lp.connect(g);
    const pk=0.06+0.16*v;
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(pk,t+0.004);
    g.gain.exponentialRampToValueAtTime(pk*0.15,t+Math.min(dur,1.2)); g.gain.exponentialRampToValueAtTime(0.0001,end);
    nodes.push(o);
  } else {
    const car=c.createOscillator(), mod=c.createOscillator(), mg=c.createGain();
    car.frequency.value=f; mod.frequency.value=f;
    mg.gain.setValueAtTime(f*(0.4+1.4*v),t); mg.gain.exponentialRampToValueAtTime(f*0.04,t+0.9);
    mod.connect(mg); mg.connect(car.frequency); car.connect(g);
    const pk=0.08+0.3*v;
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(pk,t+0.006);
    g.gain.exponentialRampToValueAtTime(pk*0.35,t+Math.min(dur,1.2)); g.gain.exponentialRampToValueAtTime(0.0001,end);
    nodes.push(car,mod);
  }
  nodes.forEach(n=>{n.start(t); n.stop(end+0.05);});
}
/* Backing voicing (Gig and Transcribe): open and spread, so busy chords don't turn to mush. The 3rd (or the sus note) and the 7th
   (or 6th; the 5th on a triad, or when it's altered), then one colour tone the symbol asks for, stacked so no two
   neighbours are closer than a minor 3rd. The bass plays the root, so it's left out up here. Each chord sits as
   close as it can to the one before. r: the root's pitch class; lo0..lo1: where the lowest note may start; top: the
   highest note allowed (Transcribe keeps it low, under the solo). */
function spreadVoice(q,r,prev,lo0=52,lo1=60,top=79){
  const ct=q.ct, has=x=>ct.includes(x);
  const third=[3,4,5,2].find(has), sev=[10,11].find(has)??(q.id==='dim7'||q.id==='six'||q.id==='min6'||q.id==='six9'?9:null);
  const fifth=[6,8].find(has)??(sev==null?7:null);
  const colour=(q.id==='alt'?[1,8]:q.req).find(x=>![0,third,sev,fifth,7].includes(x));
  const ivs=[third,sev,fifth,colour].filter(x=>x!=null); if(ivs.length<3&&has(7)&&!ivs.includes(7)) ivs.push(7); // two notes sound thin: add the 5th on top
  const pcs=ivs.map(x=>mod12(r+x));
  const build=lo=>{ const out=[]; let m=lo; pcs.forEach((pc,k)=>{ m=k?out[k-1]+3:lo; while(mod12(m)!==pc) m++; out.push(m); }); return out; };
  const target=prev?prev.reduce((a,b)=>a+b,0)/prev.length:(lo0+top)/2-3, avg=v=>v.reduce((a,b)=>a+b,0)/v.length;
  let best=null; for(let lo=lo0;lo<=lo1;lo++){ const v=build(lo); if(v[v.length-1]>top) continue; if(!best||Math.abs(avg(v)-target)<Math.abs(avg(best)-target)) best=v; }
  return best||build(lo0);
}
function playChord(notes,when,dur,timbre,bus,vel=80){ notes.forEach(m=>tone(m,when,dur,vel,timbre,bus)); }
