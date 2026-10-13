/* ---------------- drums: a small synth kit and the grooves Gig plays ----------------
   Every sound is made here (no samples): an 808-style kick with a pitch drop, a tighter acoustic-style kick, a snare
   (noise + body), a clap (three quick bursts and a tail), rim, closed and open hats, a ride, a shaker, toms, a crash,
   and an 808 sub bass that slides between notes for the R&B style.
   Grooves are 16 steps a bar (12 for swing): x accent, o normal, . ghost, - rest. Each bar can vary, the last bar
   of a section gets a fill, the first a crash, and timing and velocity are humanised a little. */
let DRUM_NOISE=null;
function drumNoise(c){ if(!DRUM_NOISE){ DRUM_NOISE=c.createBuffer(1,c.sampleRate*2,c.sampleRate); const d=DRUM_NOISE.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; } return DRUM_NOISE; }
// Which real kit plays a voice in the current groove, when the real drums are downloaded
let DRUM_CUR='pop';
const DRUM_KIT={rnb:'k808',pop:'linn',funk:'linn',samba:'linn',rock:'acoustic',ballad:'acoustic',swing:'acoustic',bossa:'acoustic'};
const DRUM_KIT_VOICE={swing:{ride:'linn'},bossa:{rim:'linn',shaker:'linn'},ballad:{rim:'linn'},rock:{hat:'linn'}};
function drumHit(kind,t,vel=1,bus=null){
  const c=synth.ctx; if(!c) return; t=Math.max(t,c.currentTime); const out=bus||synth.master;
  if(typeof smpDrum==='function'){ const kit=(DRUM_KIT_VOICE[DRUM_CUR]||{})[kind]||DRUM_KIT[DRUM_CUR]; if(smpDrum(kit,kind,t,vel,bus)) return; }   // recorded drums when downloaded
  const env=(peak,att,dec,node)=>{ const g=c.createGain(); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(peak*vel,t+att); g.gain.exponentialRampToValueAtTime(0.0001,t+att+dec); node.connect(g); g.connect(out); return g; };
  const noise=(dur,type,f,q=0.7)=>{ const s=c.createBufferSource(); s.buffer=drumNoise(c); const fl=c.createBiquadFilter(); fl.type=type; fl.frequency.value=f; fl.Q.value=q; s.connect(fl); s.start(t,Math.random()*1.5); s.stop(t+dur+0.05); return fl; };
  const osc=(type,f0,f1,dur)=>{ const o=c.createOscillator(); o.type=type; o.frequency.setValueAtTime(f0,t); if(f1) o.frequency.exponentialRampToValueAtTime(f1,t+dur); o.start(t); o.stop(t+Math.max(dur,0.05)+0.6); return o; };
  switch(kind){
    case '808': { const o=osc('sine',150,44,0.08), ws=c.createWaveShaper(), k=new Float32Array(256); for(let i=0;i<256;i++){ const x=i/128-1; k[i]=Math.tanh(2.2*x); } ws.curve=k;
      o.connect(ws); env(0.95,0.002,0.62,ws); env(0.25,0.001,0.012,noise(0.02,'highpass',3000)); break; }   // body + a little click
    case 'kick': { const o=osc('sine',120,48,0.06); env(0.9,0.002,0.26,o); env(0.2,0.001,0.01,noise(0.02,'highpass',2500)); break; }
    case 'snare': env(0.5,0.001,0.17,noise(0.25,'bandpass',1900,0.6)); env(0.35,0.001,0.08,osc('triangle',200,170,0.08)); break;
    case 'clap': { const f=noise(0.3,'bandpass',1250,1.1), g=c.createGain(); f.connect(g); g.connect(out);
      [0,0.011,0.022].forEach(d=>{ g.gain.setValueAtTime(0.0001,t+d); g.gain.linearRampToValueAtTime(0.55*vel,t+d+0.001); g.gain.exponentialRampToValueAtTime(0.06*vel,t+d+0.009); });
      g.gain.setValueAtTime(0.3*vel,t+0.03); g.gain.exponentialRampToValueAtTime(0.0001,t+0.2); break; }
    case 'rim': env(0.35,0.001,0.03,noise(0.05,'bandpass',1700,3)); env(0.18,0.001,0.025,osc('square',1650,0,0.03)); break;
    case 'hat': env(0.22,0.001,0.035,noise(0.06,'highpass',7800,0.9)); break;
    case 'ohat': env(0.2,0.002,0.3,noise(0.4,'highpass',7200,0.9)); break;
    case 'ride': env(0.12,0.002,0.55,noise(0.7,'highpass',5200,0.8)); { const a=osc('square',523,0,0.6), b=osc('square',784,0,0.6), hp=c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=3500; a.connect(hp); b.connect(hp); env(0.03,0.002,0.5,hp); } break;
    case 'shaker': env(0.12,0.012,0.05,noise(0.1,'bandpass',6200,1.5)); break;
    case 'tomhi': env(0.6,0.002,0.22,osc('sine',210,150,0.2)); break;
    case 'tomlo': env(0.65,0.002,0.3,osc('sine',140,95,0.28)); break;
    case 'crash': env(0.2,0.003,1.5,noise(1.7,'highpass',4200,0.7)); break;
  }
}
// 808 sub bass: a sine with a short slide in and a touch of saturation so it carries on small speakers
function sub808(m,t,dur,vel,bus,from){
  const c=synth.ctx; if(!c) return;
  if(typeof smp808==='function'&&smp808(m,t,dur,vel,bus)) return;   // the real 808, pitched, when downloaded t=Math.max(t,c.currentTime); const f=440*Math.pow(2,(m-69)/12);
  const o=c.createOscillator(), ws=c.createWaveShaper(), g=c.createGain(), k=new Float32Array(256); for(let i=0;i<256;i++){ const x=i/128-1; k[i]=Math.tanh(1.6*x); } ws.curve=k;
  o.type='sine'; o.frequency.setValueAtTime(from?440*Math.pow(2,(from-69)/12):f*1.06,t); o.frequency.exponentialRampToValueAtTime(f,t+(from?0.09:0.03));
  o.connect(ws); ws.connect(g); g.connect(bus||synth.master);
  const pk=0.5*vel, hold=Math.max(0.25,dur-0.08);
  g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(pk,t+0.008); g.gain.exponentialRampToValueAtTime(pk*0.7,t+0.3); g.gain.setValueAtTime(pk*0.7,t+hold); g.gain.exponentialRampToValueAtTime(0.0001,t+hold+0.15);
  o.start(t); o.stop(t+hold+0.2);
}
/* The grooves. Each voice is one or more patterns (picked bar by bar); steps per beat: 4 (16ths) or 3 (swing triplets).
   half: the backbeat on 3 (half-time, at slow R&B tempos). bass808: the bass plays the 808 sub. */
const DRUM_STYLES={
  rnb:{name:'R&B / trap soul',steps:4,bass808:true,v:{
    '808':['x-----x---x-----','x-----x-x----x--','x--x------x--x--'],
    clap:['--------x-------'],
    hat:['xoxoxoxoxoxoxoxo','xoxoxoxoxoxoxoxo','xoxoxoxoxo-oxoxo'],
    ohat:['-------------o--','----------------']},rolls:0.4,fill:'rnb'},
  pop:{name:'Pop / J-pop',steps:4,v:{
    kick:['x-------x-x-----','x-------x-------','x-----x-x-------'],
    snare:['----x-------x---','----x-------x--.'],
    hat:['x-o-x-o-x-o-x-o-']},fill:'snare'},
  rock:{name:'Rock / anime',steps:4,v:{
    kick:['x-----x-x-------','x-x---x-x---x---'],
    snare:['----x-------x---'],
    hat:['x-x-x-x-x-x-x-x-'],ohat:['--------------o-','----------------']},fill:'toms'},
  funk:{name:'Funk',steps:4,v:{
    kick:['x--x--x---x--x--','x--x---x--x-----'],
    snare:['----x--.-.--x--.','----x-.--.-.x---'],
    hat:['xoxoxoxoxoxoxoxo']},fill:'snare'},
  swing:{name:'Swing',steps:3,v:{
    ride:['x--x-xx--x-x','x--x-xx--xxx'],
    hat:['---x-----x--'],
    kick:['.--.--.--.--'],
    snare:['------------','-------.----','----.-------']},fill:'swing'},
  bossa:{name:'Bossa nova',steps:4,v:{
    rim:['x--x--x---x--x--','x--x---x--x--x--'],
    kick:['x--x----x--x----'],
    shaker:['xooxooxoxooxooxo']},fill:null},
  samba:{name:'Samba / Latin',steps:4,v:{
    kick:['x--xx--xx--xx--x'],
    rim:['x-x--x-x-x--x-x-'],
    hat:['oxoxoxoxoxoxoxox']},fill:'snare'},
  ballad:{name:'Ballad',steps:4,v:{
    kick:['x-------x-------','x-------x-x-----'],
    rim:['--------x-------'],
    hat:['o-.-o-.-o-.-o-.-']},fill:null},
};
const DRUM_VOL={'808':0.9,kick:0.95,snare:0.75,clap:0.7,rim:0.6,hat:0.5,ohat:0.45,ride:0.6,shaker:0.5,tomhi:0.7,tomlo:0.75,crash:0.55};
// Which groove suits a song, from its feel and genre
function drumStyleFor(song){ return drumStyleOf((song.feel||'').toLowerCase())||drumStyleOf((song.genre||'').toLowerCase())||'pop'; }   // the feel decides; the genre if the feel says nothing
function drumStyleOf(f){
  if(!f) return null;
  if(/even 8ths/.test(f)) return 'pop';
  if(/swing|bebop|bop|waltz|modal|up tempo|jazz/.test(f)) return 'swing';
  if(/bossa|bolero/.test(f)) return 'bossa';
  if(/samba|latin|calypso|salsa|afro|cha/.test(f)) return 'samba';
  if(/ballad|slow/.test(f)) return 'ballad';
  if(/funk|disco|16th/.test(f)) return 'funk';
  if(/r&b|rnb|soul|neo|trap|hip|smooth|groove/.test(f)) return 'rnb';
  if(/rock|punk|fast|anthem|anime/.test(f)) return 'rock';
  if(/pop|8ths/.test(f)) return 'pop';
  return null;
}
/* One bar. info: {bar (count from the start), first (first bar of a section), last (last bar of a section)} */
function drumBar(id,t0,spb,beats,info,bus){
  const S=DRUM_STYLES[id]; if(!S) return; DRUM_CUR=id; const per=S.steps, step=spb/per, n=beats*per, r=Math.random;
  const hum=()=>(r()-0.5)*0.008, velOf=ch=>ch==='x'?1:ch==='o'?0.62:ch==='.'?0.28:0;
  const fillFrom=info.last&&S.fill&&r()<0.75?(beats-1)*per:n;   // the last beat of a section is a fill
  const roll=S.rolls&&fillFrom===n&&r()<S.rolls;                    // or, now and then, a hat roll on the last beat
  Object.entries(S.v).forEach(([voice,pats])=>{ const p=pats[r()<0.6?0:Math.floor(r()*pats.length)];   // mostly the main pattern, sometimes a variation
    for(let i=0;i<Math.min(n,fillFrom);i++){ const v=velOf(p[i%p.length]); if(!v) continue;
      if(roll&&voice==='hat'&&i>=n-per) continue;
      drumHit(voice,t0+i*step+hum(),v*DRUM_VOL[voice]*(0.9+r()*0.2),bus); } });
  if(roll){ const k=r()<0.5?3:4, b=t0+(beats-1)*spb, sub=spb/(k*2);   // triplet or 32nd hats, getting louder
    for(let j=0;j<k*2;j++) drumHit('hat',b+j*sub+hum(),DRUM_VOL.hat*(0.35+0.6*j/(k*2)),bus); }
  if(fillFrom<n){ const b=t0+(beats-1)*spb;
    if(S.fill==='toms'){ ['tomhi','tomhi','tomlo','tomlo'].forEach((v,j)=>drumHit(v,b+j*spb/4+hum(),DRUM_VOL[v],bus)); }
    else if(S.fill==='rnb'){ for(let j=0;j<6;j++) drumHit('hat',b+j*spb/6,DRUM_VOL.hat*(0.4+j*0.1),bus); drumHit('808',b+spb/2,DRUM_VOL['808']*0.8,bus); }
    else if(S.fill==='swing'){ [0,2].forEach(j=>drumHit('snare',b+j*spb/3+hum(),0.45,bus)); drumHit('kick',b+2*spb/3,0.5,bus); }
    else for(let j=0;j<4;j++) drumHit('snare',b+j*spb/4+hum(),DRUM_VOL.snare*(0.55+j*0.15),bus); }
  if(info.first&&info.bar>0&&id!=='bossa'&&id!=='ballad') drumHit('crash',t0+hum(),DRUM_VOL.crash,bus);
}
