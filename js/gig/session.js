/* Gig: lead sheets to play from. Pick a tune (or a random one), read the changes, noodle on your keyboard.
   Chord changes only. You can paste in any chart you find (chord sites, a Real Book page you typed up) and keep it.
   The chart turns into a timeline of bars (gigTimeline); today a simple pad plays the changes from it, and later the
   band will play from the same timeline. */
let GDATA=store.get('gig',{});
GDATA.mine=GDATA.mine||[]; GDATA.fav=GDATA.fav||{}; GDATA.tr=GDATA.tr||{}; GDATA.tempo=GDATA.tempo||{};
if(!GDATA.genre) GDATA.genre='all'; if(!GDATA.view) GDATA.view='chords'; if(!GDATA.size) GDATA.size=1; if(GDATA.tones==null) GDATA.tones=true; if(GDATA.click==null) GDATA.click=true;
const saveGig=()=>{ try{ localStorage.setItem('mtc:gig',JSON.stringify(GDATA)); return true; }catch(e){ return false; } };
const GIG={active:false,view:'list',song:null,playing:false};
const GIG_GENRES=[['all','All'],['J-pop','J-pop & city pop'],['Jazz','Jazz standards'],['Latin','Latin'],['Blues','Blues'],['Funk','Funk & soul'],['Pop','Pop'],['mine','Yours'],['fav','♥ Favourites']];

/* ---------------- reading chord symbols ---------------- */
const GIG_SUF={'':'maj',M:'maj',maj:'maj',m:'min',min:'min','-':'min','7':'dom7',maj7:'maj7',M7:'maj7','Δ7':'maj7','Δ':'maj7',ma7:'maj7',j7:'maj7',
  m7:'min7',min7:'min7','-7':'min7','m7♭5':'hdim','ø':'hdim','ø7':'hdim','m7-5':'hdim','-7♭5':'hdim','min7♭5':'hdim','°':'dim',dim:'dim',o:'dim','°7':'dim7',dim7:'dim7',o7:'dim7',
  '+':'aug',aug:'aug','♯5':'aug','+5':'aug',sus:'sus4',sus4:'sus4',sus2:'sus2','6':'six',M6:'six',maj6:'six',m6:'min6','-6':'min6','7sus4':'sus7','7sus':'sus7','9sus4':'sus7','9sus':'sus7','13sus4':'sus7','13sus':'sus7',
  mmaj7:'mmaj7',mM7:'mmaj7','-Δ7':'mmaj7',minmaj7:'mmaj7',maj9:'maj9',M9:'maj9','Δ9':'maj9','9':'dom9',m9:'min9','-9':'min9','13':'dom13','11':'sus7',m11:'min11','-11':'min11',
  '7♭9':'d7b9','7♯9':'d7s9',alt:'alt','7alt':'alt','7♭13':'d7b13','7♯11':'d7s11','9♯11':'d7s11','13♯11':'d7s11','maj7♯11':'mj7s11','Δ7♯11':'mj7s11','maj7♯5':'mj7s5','+maj7':'mj7s5','Δ7♯5':'mj7s5',
  add9:'add9',add2:'add9',madd9:'madd9','m(add9)':'madd9',madd2:'madd9','6/9':'six9','69':'six9','m69':'min6','m6/9':'min6'};
const gigAcc=s=>s.replace(/#/g,'♯').replace(/(^|[^A-Za-z])b(?=[0-9])/g,'$1♭').replace(/♭(?=[0-9])/g,'♭');
// "B♭m7♭5/E" → {root:{l,a,pc}, qid, bass:{l,a,pc}|null, suf:'m7♭5'}; null when it isn't a chord
function gigChord(tok){
  const m=/^([A-G])([♭♯b#]?)(.*?)(?:\/([A-G])([♭♯b#]?))?$/.exec(tok.trim()); if(!m) return null;
  const acc=x=>x==='♭'||x==='b'?-1:x==='♯'||x==='#'?1:0, L='CDEFGAB'.indexOf(m[1]);
  let suf=gigAcc(m[3]).replace(/^min(?!or)/,'m').replace(/^mi(?=[0-9]|$)/,'m');
  if(!/^[A-Za-z0-9♭♯°ø+\-Δ()/.,]*$/.test(suf)||/[a-z]{5,}/i.test(suf.replace(/(maj|min|sus|add|dim|aug|alt)/g,''))) return null; // a word, not a chord
  const key=suf.replace(/[(),]/g,''), qid=GIG_SUF[suf]??GIG_SUF[key]??(
    /^(m|-)(?!aj)/.test(key)?(/7|9|11|13/.test(key)?(/♭5/.test(key)?'hdim':'min7'):'min'):/maj|M7|Δ/.test(key)?'maj7':/dim|°/.test(key)?(/7/.test(key)?'dim7':'dim'):/aug|\+/.test(key)?'aug':/7|9|11|13/.test(key)?'dom7':/sus/.test(key)?'sus4':'maj');
  const root=mkRoot(L,acc(m[2])), bass=m[4]?mkRoot('CDEFGAB'.indexOf(m[4]),acc(m[5])):null;
  return {root,qid,bass,suf:suf.replace(/^-(?=[0-9])/,'m').replace(/^-$/,'m')};
}

/* ---------------- reading a chart ---------------- */
const GIG_META=['title','by','artist','composer','genre','style','feel','tempo','bpm','key','time','form','tags','check'];
/* Text → song. Lines: "name: value" settings, [Section] or "Chorus:" headings, bars between | |.
   Also takes pasted chord-site text: a line of chords without bar lines is one bar per chord, lyric lines are skipped,
   and ChordPro's [Am] inline chords are picked out of lyrics. */
function gigParse(text,id){
  const song={id,text,meta:{},sections:[],form:[]}; let sec=null;
  const addSec=name=>{ let n=name.trim()||'A', k=2; while(song.sections.some(s=>s.name===n)) n=name.trim()+' '+(k++); sec={name:n,bars:[]}; song.sections.push(sec); return sec; };
  const bar=toks=>{ const items=[]; let prev=null;
    if(toks.length===1&&(toks[0]==='%'||toks[0]==='𝄎')){ const p=sec.bars[sec.bars.length-1]; return p?{chords:p.chords,rep:true}:null; }
    const beatwise=toks.some(t=>t==='/'||t==='.');
    for(const t of toks){ if(t==='/'||t==='.'){ if(prev) prev.beats++; continue; }
      const nc=/^(N\.?C\.?|n\.?c\.?)$/.test(t), c=nc?null:gigChord(t); if(!c&&!nc) return null;
      prev={c,text:t,nc,beats:1}; items.push(prev); }
    if(!items.length) return null; if(!beatwise) items.forEach(x=>x.beats=null);
    return {chords:items}; };
  for(let raw of text.split(/\r?\n/)){
    let line=raw.replace(/\t/g,' ').trim(); if(!line||line.startsWith('#')) continue;
    const dir=/^\{(\w+)(?::\s*(.*))?\}$/.exec(line);   // ChordPro {title: …} {start_of_chorus}
    if(dir){ const k=dir[1].toLowerCase(); if(GIG_META.includes(k)) song.meta[k]=(dir[2]||'').trim(); else if(/^(soc|start_of_chorus)$/.test(k)) addSec('Chorus'); else if(/^(sov|start_of_verse)$/.test(k)) addSec('Verse'); else if(/^(sob|start_of_bridge)$/.test(k)) addSec('Bridge'); continue; }
    const kv=/^([A-Za-z]+)\s*:\s*(.+)$/.exec(line);
    if(kv&&GIG_META.includes(kv[1].toLowerCase())){ song.meta[kv[1].toLowerCase()]=kv[2].trim(); continue; }
    const br=/^\[([^\]]+)\]$/.exec(line);   // [A], [Verse]: a heading even when it looks like a chord
    if(br){ addSec(br[1]); continue; }
    const head=/^([A-Za-z][\w '’\-]*?)\s*:\s*$/.exec(line)||/^(Intro|Verse|Pre-?chorus|Chorus|Bridge|Outro|Interlude|Solo|Coda|Ending)(\s*\d*)$/i.exec(line);
    if(head&&!gigChord(head[1])){ addSec(head[1]+(head[2]||'')); continue; }
    if(!sec) addSec('A');
    if(line.includes('|')){ line.split('|').map(s=>s.trim()).filter(s=>s&&!/^:?\s*$/.test(s)).forEach(s=>{ const b=bar(s.replace(/^:|:$/g,'').trim().split(/\s+/)); if(b) sec.bars.push(b); }); continue; }
    const inl=[...line.matchAll(/\[([^\]]+)\]/g)].map(x=>x[1]).filter(x=>gigChord(x));
    if(inl.length){ inl.forEach(t=>sec.bars.push({chords:[{c:gigChord(t),text:t,beats:null}]})); continue; }
    const toks=line.split(/\s+/);
    if(toks.every(t=>t==='%'||t==='/'||gigChord(t)||/^(N\.?C\.?)$/i.test(t))) toks.forEach(t=>{ const b=bar([t]); if(b) sec.bars.push(b); }); // one bar per chord
  }
  song.sections=song.sections.filter(s=>s.bars.length);
  const M=song.meta; song.title=M.title||'Untitled chart'; song.by=M.by||M.artist||M.composer||''; song.genre=M.genre||M.style||'';
  song.feel=M.feel||''; song.tempo=Math.max(30,Math.min(320,parseInt(M.tempo||M.bpm,10)||100)); song.check=!!M.check; song.tags=M.tags||'';
  const ts=/^(\d+)\s*\/\s*(\d+)/.exec(M.time||''); song.beats=ts?(+ts[2]===8?Math.max(2,Math.round(+ts[1]/3)):+ts[1]):4;
  const k=gigChord((M.key||'').replace(/\s*(major|maj)$/i,'').replace(/\s*minor$/i,'m'));
  song.key=k?{pc:k.root.pc,minor:Q[k.qid].minor?1:0,root:k.root}:null;
  if(!song.key){ const f=song.sections[0]&&song.sections[0].bars[0]&&song.sections[0].bars[0].chords[0].c; song.key=f?{pc:f.root.pc,minor:Q[f.qid].minor?1:0,root:f.root}:{pc:0,minor:0,root:mkRoot(0,0)}; }
  const names=song.sections.map(s=>s.name), want=(M.form||'').split(/[\s,–\-]+/).filter(Boolean);
  song.form=want.length&&want.every(n=>names.includes(n))?want:names;
  return song;
}
const gigSlug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const GIG_BUILTIN=GIG_SHEETS.map(t=>{ const s=gigParse(t,''); s.id='b:'+gigSlug(s.title); s.builtin=true; return s; });
const gigAll=()=>[...GIG_BUILTIN,...GDATA.mine.map(m=>{ const s=gigParse(m.text,m.id); s.mine=true; return s; })];
const gigById=id=>gigAll().find(s=>s.id===id);
// The band's timeline: every bar of the form in playing order, with each chord's start beat and length
function gigTimeline(song){
  const out=[]; let beat=0;
  song.form.forEach((name,fi)=>{ const sec=song.sections.find(s=>s.name===name); if(!sec) return;
    sec.bars.forEach((b,bi)=>{ const n=b.chords.length, fixed=b.chords.every(c=>c.beats), per=song.beats/n; let at=0;
      const chords=b.chords.map(c=>{ const d=fixed?c.beats:per, o={...c,at:beat+at,dur:d}; at+=d; return o; });
      out.push({fi,sec:name,bi,beat,chords}); beat+=song.beats; }); });
  return out;
}

/* ---------------- spelling, transposing, numbers ---------------- */
const GIG_FLAT_KEYS={0:[5,10,3,8,1,6],1:[2,7,0,5,10,3]};   // major keys and minor keys written with flats
const gigFlats=k=>GIG_FLAT_KEYS[k.minor?1:0].includes(k.pc);
const GIG_SHARP_NAMES=[[0,0],[0,1],[1,0],[1,1],[2,0],[3,0],[3,1],[4,0],[4,1],[5,0],[5,1],[6,0]], GIG_FLAT_NAMES=[[0,0],[1,-1],[1,0],[2,-1],[2,0],[3,0],[4,-1],[4,0],[5,-1],[5,0],[6,-1],[6,0]];
function gigMove(r,shift,flats){ if(!shift) return r; const pc=mod12(r.pc+shift), [l,a]=(flats?GIG_FLAT_NAMES:GIG_SHARP_NAMES)[pc]; return mkRoot(l,a); }
const GIG_NUM=['I','♭II','II','♭III','III','IV','♯IV','V','♭VI','VI','♭VII','VII'];
const gigShift=s=>GDATA.tr[s.id]||0;
const gigKeyNow=s=>{ const sh=gigShift(s), pc=mod12(s.key.pc+sh); return {pc,minor:s.key.minor,root:sh?defaultRoot(pc,s.key.minor):s.key.root}; };
const gigAccHTML=t=>t.replace(/[♭♯]/g,x=>`<span class="ac">${x}</span>`);
function gigChordHTML(c,song){
  if(c.nc) return '<span class="gch nc">N.C.</span>';
  const sh=gigShift(song), k=gigKeyNow(song), fl=gigFlats(k), r=gigMove(c.c.root,sh,fl), b=c.c.bass&&gigMove(c.c.bass,sh,fl), v=GDATA.view;
  const name=`<span class="gr">${gigAccHTML(rootName(r))}</span><span class="gsuf">${gigAccHTML(c.c.suf)}</span>${b?`<span class="gsl">/${gigAccHTML(rootName(b))}</span>`:''}`;
  const num=GIG_NUM[mod12(r.pc-k.pc)]+c.c.suf+(b?'/'+GIG_NUM[mod12(b.pc-k.pc)]:'');
  return v==='numbers'?`<span class="gch"><span class="gname">${gigAccHTML(num)}</span></span>`:`<span class="gch"><span class="gname">${name}</span>${v==='both'?`<span class="gnum">${gigAccHTML(num)}</span>`:''}</span>`;
}

/* ---------------- screens ---------------- */
function gigOpen(id){
  GIG.active=true; hideOv(); document.body.classList.add('gigmode','nohud'); document.body.classList.remove('menu'); $('gigStage').hidden=false; synth.init();
  if(id&&gigById(id)) gigShow(id); else gigList();
}
function gigClose(){ gigStop(); GIG.active=false; $('gigStage').hidden=true; document.body.classList.remove('gigmode'); kbMarks={}; paintKeys(); }
function gigToMenu(){ gigClose(); side='home'; $('startOv').hidden=false; document.body.classList.add('menu'); renderMenu(); }
const gigOrder=s=>{ const i=GIG_GENRES.findIndex(g=>g[0]===s.genre); return s.mine?-1:i<0?99:i; };
function gigMatches(s){ const g=GDATA.genre, q=(GIG.q||'').toLowerCase();
  if(g==='mine'&&!s.mine) return false; if(g==='fav'&&!GDATA.fav[s.id]) return false; if(!['all','mine','fav'].includes(g)&&s.genre!==g) return false;
  return !q||[s.title,s.by,s.genre,s.feel,s.tags,keyName(s.key.pc,s.key.minor)].join(' ').toLowerCase().includes(q); }
function gigList(){
  gigStop(); GIG.view='list'; GIG.song=null; kbMarks={}; paintKeys();
  const all=gigAll(), list=all.filter(gigMatches).sort((a,b)=>gigOrder(a)-gigOrder(b)||a.title.localeCompare(b.title));
  const count=g=>g==='all'?all.length:g==='mine'?all.filter(s=>s.mine).length:g==='fav'?all.filter(s=>GDATA.fav[s.id]).length:all.filter(s=>s.genre===g).length;
  $('gigBody').innerHTML=`<div class="etop"><span class="etitle">Gig</span><span class="fine">Lead sheets to play from: chord changes, no melodies or lyrics</span></div>
    <div class="giglibbar"><input type="search" id="gigQ" placeholder="Search tunes, composers, feels…" value="${trEsc(GIG.q||'')}" aria-label="Search">
      <button class="go" id="gigRandom" title="A random chart from what's listed">🎲 Random</button><button class="ghost" id="gigAdd">+ Add a chart</button></div>
    <div class="chipsrow">${GIG_GENRES.map(([v,t])=>`<button class="chip" data-genre="${v}" aria-pressed="${GDATA.genre===v}">${t} <span class="fine">${count(v)}</span></button>`).join('')}</div>
    <div class="licks giglist">${list.map(s=>`<button class="lick" data-song="${s.id}"><span class="ln">${trEsc(s.genre||'Chart')} · ${keyName(s.key.pc,s.key.minor)} · ♩ ${s.tempo}${s.mine?' · Yours':''}</span>
      <span class="lt">${trEsc(s.title)}</span><span class="lst">${trEsc(s.by)}</span>${s.feel?`<span class="lst">${trEsc(s.feel)}</span>`:''}
      <span class="fav${GDATA.fav[s.id]?' on':''}" data-fav="${s.id}" title="Favourite">${GDATA.fav[s.id]?'♥':'♡'}</span></button>`).join('')||'<p class="fine">Nothing matches. Try another search, or add the chart yourself.</p>'}</div>
    <p class="fine">Found a chart online (a chord site, a fake book page)? <b>+ Add a chart</b> and paste it in: Jun Jam reads the chords and keeps it under Yours.</p>
    <div class="erow"><button class="ghost" id="gigHome">Back</button></div>`;
  const q=$('gigQ'); q.oninput=()=>{ GIG.q=q.value; const pos=q.selectionStart; gigList(); const n=$('gigQ'); n.focus(); n.setSelectionRange(pos,pos); };
  $('gigRandom').onclick=()=>{ const pool=list.filter(s=>s.id!==GIG.lastId); const s=(pool.length?pool:list)[Math.floor(Math.random()*(pool.length||list.length))]; if(s) gigShow(s.id); };
  $('gigAdd').onclick=()=>gigEdit(null); $('gigHome').onclick=gigToMenu;
  $('gigBody').onclick=e=>{ const f=e.target.closest('[data-fav]'), g=e.target.closest('[data-genre]'), s=e.target.closest('[data-song]');
    if(f){ e.stopPropagation(); if(GDATA.fav[f.dataset.fav]) delete GDATA.fav[f.dataset.fav]; else GDATA.fav[f.dataset.fav]=1; saveGig(); gigList(); return; }
    if(g){ GDATA.genre=g.dataset.genre; saveGig(); gigList(); return; }
    if(s) gigShow(s.dataset.song); };
}
const gigSeg=(attr,items,cur)=>`<div class="seg" role="group">${items.map(([v,t,tip])=>`<button data-${attr}="${v}" aria-pressed="${String(cur)===String(v)}"${tip?` title="${tip}"`:''}>${t}</button>`).join('')}</div>`;
function gigShow(id){
  gigStop(); const s=gigById(id); if(!s) return gigList();
  Object.assign(GIG,{view:'sheet',song:s,lastId:id,tl:gigTimeline(s),pos:0}); GDATA.last=id; saveGig();
  const k=gigKeyNow(s), sh=gigShift(s), tempo=GDATA.tempo[id]||s.tempo;
  const occ={}; s.form.forEach(n=>occ[n]=(occ[n]||0)+1);
  $('gigBody').innerHTML=`<div class="trtop"><button class="ghost" id="gigBack">← All charts</button><span class="etitle">${trEsc(s.title)}</span>
      <span class="gfav${GDATA.fav[id]?' on':''}" id="gigFav" title="Favourite">${GDATA.fav[id]?'♥':'♡'}</span><span class="trspace"></span>
      <button class="ghost" id="gigRand" title="Another random chart">🎲</button><button class="ghost" id="gigEditBtn">${s.mine?'Edit':'Edit a copy'}</button></div>
    <p class="gigsub">${trEsc(s.by)}${s.genre?` · ${trEsc(s.genre)}`:''}${s.feel?` · ${trEsc(s.feel)}`:''}${s.beats!==4?` · ${s.beats} beats a bar`:''}${s.tags?` · ${trEsc(s.tags)}`:''}</p>
    ${s.check?'<p class="fine gigcheck">⚠ Written from memory: worth checking against a chart you trust. <b>Edit a copy</b> to fix anything.</p>':''}
    <div class="gigbar trtransport">
      <button class="go trplay" id="gigPlay" title="Play the changes (Space)">▶</button><span class="trpos" id="gigPos">1</span>
      <span class="trgrp"><span class="fine">Key</span><button class="ghost ic" id="gigDown" title="Down a half step (-)">−</button><b class="gigkey">${gigAccHTML(keyName(k.pc,k.minor))}</b><button class="ghost ic" id="gigUp" title="Up a half step (=)">+</button>${sh?'<button class="ghost trsm" id="gigOrig">Original key</button>':''}</span>
      <span class="trgrp"><span class="fine">♩</span><button class="ghost ic" id="gigSlower">−</button><b id="gigTempo">${tempo}</b><button class="ghost ic" id="gigFaster">+</button></span>
      <span class="trgrp">${gigSeg('gview',[['chords','Chords'],['numbers','Numbers','Roman numerals in this key, like the J-pop degrees in Chords'],['both','Both']],GDATA.view)}</span>
      <span class="trgrp">${gigSeg('gsize',[[.85,'A'],[1,'A'],[1.25,'A']],GDATA.size)}</span>
      <button class="ghost tgl" id="gigTones" aria-pressed="${GDATA.tones}" title="Light up the current chord's notes on the keyboard">Chord tones</button>
      <button class="ghost tgl" id="gigClick" aria-pressed="${GDATA.click}" title="Hi-hat on 2 and 4 while it plays">Click</button></div>
    <div class="gigform">Form: ${s.form.map((n,i)=>`<span class="gform" data-fi="${i}">${trEsc(n)}</span>`).join('')}</div>
    <div class="gigsheet" id="gigSheet" style="--gs:${GDATA.size}">${s.sections.map(sec=>`<div class="gsec"><div class="gsecname">${trEsc(sec.name)}${occ[sec.name]>1?` <span class="fine">×${occ[sec.name]}</span>`:''}${!occ[sec.name]?' <span class="fine">(not in the form)</span>':''}</div>
      <div class="gbars" style="--per:${s.beats===3?4:4}">${sec.bars.map((b,bi)=>`<div class="gbar" data-sec="${trEsc(sec.name)}" data-bi="${bi}">${b.rep?'<span class="grep">𝄎</span>':b.chords.map(c=>gigChordHTML(c,s)).join('')}</div>`).join('')}</div></div>`).join('')}</div>
    <p class="fine">Play along on your keyboard any time. <kbd>Space</kbd> plays the changes, <kbd>−</kbd> <kbd>=</kbd> change key, click a bar to start there. A full band to play with comes later; this is the chart it will read.</p>`;
  const re=()=>gigShow(id), setT=t=>{ GDATA.tempo[id]=Math.max(40,Math.min(300,t)); saveGig(); $('gigTempo').textContent=GDATA.tempo[id]; if(GIG.playing) gigPlay(GIG.pos); };
  $('gigBack').onclick=gigList; $('gigRand').onclick=()=>{ const l=gigAll().filter(gigMatches).filter(x=>x.id!==id); if(l.length) gigShow(l[Math.floor(Math.random()*l.length)].id); };
  $('gigEditBtn').onclick=()=>gigEdit(s);
  $('gigFav').onclick=()=>{ if(GDATA.fav[id]) delete GDATA.fav[id]; else GDATA.fav[id]=1; saveGig(); $('gigFav').textContent=GDATA.fav[id]?'♥':'♡'; $('gigFav').classList.toggle('on',!!GDATA.fav[id]); };
  $('gigPlay').onclick=()=>GIG.playing?gigStop():gigPlay(GIG.pos);
  $('gigUp').onclick=()=>gigTranspose(1); $('gigDown').onclick=()=>gigTranspose(-1); if($('gigOrig')) $('gigOrig').onclick=()=>{ delete GDATA.tr[id]; saveGig(); re(); };
  $('gigSlower').onclick=()=>setT((GDATA.tempo[id]||s.tempo)-4); $('gigFaster').onclick=()=>setT((GDATA.tempo[id]||s.tempo)+4);
  $('gigTones').onclick=()=>{ GDATA.tones=!GDATA.tones; saveGig(); $('gigTones').setAttribute('aria-pressed',GDATA.tones); gigLight(); };
  $('gigClick').onclick=()=>{ GDATA.click=!GDATA.click; saveGig(); $('gigClick').setAttribute('aria-pressed',GDATA.click); };
  $('gigBody').querySelectorAll('[data-gview]').forEach(b=>b.onclick=()=>{ GDATA.view=b.dataset.gview; saveGig(); re(); });
  $('gigBody').querySelectorAll('[data-gsize]').forEach(b=>b.onclick=()=>{ GDATA.size=+b.dataset.gsize; saveGig(); re(); });
  // a bar: start from its first time in the form
  $('gigSheet').onclick=e=>{ const b=e.target.closest('.gbar'); if(!b) return; const i=GIG.tl.findIndex(x=>x.sec===b.dataset.sec&&x.bi===+b.dataset.bi); if(i<0) return;
    GIG.pos=i; if(GIG.playing) gigPlay(i); else { gigMark(i); gigLight(GIG.tl[i].chords[0]); } };
  gigMark(0); gigLight(GIG.tl[0]&&GIG.tl[0].chords[0]);
}
function gigTranspose(d){ const s=GIG.song; if(!s) return; let v=(gigShift(s)+d)%12; if(v>6) v-=12; if(v<-5) v+=12; if(v) GDATA.tr[s.id]=v; else delete GDATA.tr[s.id]; saveGig(); const p=GIG.pos, was=GIG.playing; gigShow(s.id); GIG.pos=p; gigMark(p); if(was) gigPlay(p); }
// highlight the bar at timeline index i (and its place in the form)
function gigMark(i){ const t=GIG.tl&&GIG.tl[i]; document.querySelectorAll('.gbar.on,.gform.on').forEach(x=>x.classList.remove('on')); if(!t) return;
  const el=document.querySelector(`.gbar[data-sec="${CSS.escape(t.sec)}"][data-bi="${t.bi}"]`); if(el){ el.classList.add('on'); if(GIG.playing){ const sh=$('gigStage'), r=el.getBoundingClientRect(), sr=sh.getBoundingClientRect(); if(r.bottom>sr.bottom-20||r.top<sr.top+60) sh.scrollTop+=r.top-sr.top-sr.height/3; } }
  const f=document.querySelector(`.gform[data-fi="${t.fi}"]`); if(f) f.classList.add('on'); if($('gigPos')) $('gigPos').textContent=`${t.sec} · ${t.bi+1}`; }
// the chord's notes on the keyboard: root, chord tones, and the colour tones its symbol names
function gigLight(ch){ if(ch) GIG.lit=ch; ch=GIG.lit; kbMarks={};
  if(GDATA.tones&&GIG.active&&GIG.view==='sheet'&&ch&&ch.c){ const sh=gigShift(GIG.song), q=Q[ch.c.qid], r=mod12(ch.c.root.pc+sh), b=ch.c.bass?mod12(ch.c.bass.pc+sh):null;
    for(const m in keyEls){ const iv=mod12(+m-r); if(iv===0||(b!=null&&mod12(+m-b)===0)) kbMarks[m]='k-root'; else if(q.ct.includes(iv)) kbMarks[m]='k-chord'; else if(q.req.includes(iv)) kbMarks[m]='k-tension'; } }
  paintKeys(); }

/* ---------------- playing the changes (the band's seat, for now a pad and bass) ---------------- */
function gigPlay(from=0){
  gigStop(); const s=GIG.song, tl=GIG.tl; if(!s||!tl.length) return; synth.init();
  const bus=GIG.bus=newBus(); if(!bus) return; GIG.playing=true; $('gigPlay').textContent='❚❚';
  const spb=60/(GDATA.tempo[s.id]||s.tempo), sh=gigShift(s), total=tl.length;
  let i=from%total, t=now()+.12; const cue=[];
  const sched=()=>{ if(!GIG.playing) return;
    while(t<now()+.25){ const bar=tl[i];
      bar.chords.forEach(ch=>{ const at=t+(ch.at-bar.beat)*spb, d=ch.dur*spb*.96; if(!ch.c) return;
        const q=Q[ch.c.qid], root=gigMove(ch.c.root,sh,false); playChord(compUnder({root,q},64),at,d,'mellow',bus,58);
        tone(36+mod12((ch.c.bass||ch.c.root).pc+sh-36),at,d,70,'mellow',bus); cue.push({at,bar:i,ch}); });
      if(GDATA.click) for(let k=1;k<s.beats;k+=2) hat(t+k*spb);
      t+=s.beats*spb; i=(i+1)%total; } };
  const draw=()=>{ if(!GIG.playing) return; while(cue.length&&cue[0].at<=now()+.02){ const c=cue.shift(); if(GIG.pos!==c.bar||GIG.markAt!==c.at){ GIG.pos=c.bar; GIG.markAt=c.at; gigMark(c.bar); gigLight(c.ch); } } GIG.raf=requestAnimationFrame(draw); };
  sched(); GIG.timer=setInterval(sched,40); GIG.raf=requestAnimationFrame(draw);
}
function gigStop(){ GIG.playing=false; clearInterval(GIG.timer); cancelAnimationFrame(GIG.raf); killBus(GIG.bus); GIG.bus=null; if($('gigPlay')) $('gigPlay').textContent='▶'; }

/* ---------------- adding and editing charts ---------------- */
const GIG_TEMPLATE=`title: My tune
by: Composer
genre: J-pop
feel: Ballad
tempo: 90
key: C
[Verse]
Cmaj7 | Am7 | Dm7 G7 | Cmaj7 |
[Chorus]
Fmaj7 | G7 | Em7 | Am7 |
Dm7 | G7 | C | % |`;
const GIG_FORMAT_HELP=`<ul class="fine gighelp"><li><b>Settings</b> on their own lines: <code>title:</code> <code>by:</code> <code>genre:</code> (J-pop, Jazz, Latin, Blues, Funk, Pop) <code>feel:</code> <code>tempo:</code> <code>key:</code> <code>time: 3/4</code> and <code>form: A A B A</code> for the playing order.</li>
  <li><b>Sections</b>: <code>[Verse]</code>, <code>[Chorus]</code>, <code>[A]</code>… <b>Bars</b> go between <code>|</code>. Two chords in a bar split it; <code>C / / G</code> gives three beats then one. <code>%</code> repeats the bar before.</li>
  <li><b>Pasted from a chord site?</b> Lines of chords without <code>|</code> become one bar per chord, lyric lines are skipped, and <code>[Am]</code> chords inside lyrics are picked out. Tidy the bars up after if it matters.</li></ul>`;
function gigEdit(song){
  gigStop(); GIG.view='edit'; kbMarks={}; paintKeys();
  const mine=song&&song.mine, text=song?(mine?song.text:song.text.replace(/^title:\s*(.*)$/m,'title: $1 (my version)').replace(/^check:.*\n?/m,'')):GIG_TEMPLATE;
  $('gigBody').innerHTML=`<div class="trtop"><button class="ghost" id="gigEBack">← Back</button><span class="etitle">${mine?'Edit your chart':song?'Your copy of '+trEsc(song.title):'Add a chart'}</span></div>
    ${GIG_FORMAT_HELP}
    <textarea id="gigText" class="gigtext" spellcheck="false">${trEsc(text)}</textarea>
    <p class="fine" id="gigCheck"></p>
    <div class="erow"><button class="go" id="gigSave">Save</button>${mine?'<button class="ghost" id="gigDel">Delete</button>':''}<button class="ghost" id="gigCancel">Cancel</button></div>`;
  const ta=$('gigText'), check=()=>{ const s=gigParse(ta.value,''), n=s.sections.reduce((a,x)=>a+x.bars.length,0);
    $('gigCheck').textContent=n?`Reads as: ${s.title}, ${keyName(s.key.pc,s.key.minor)}, ${s.sections.length} section${s.sections.length>1?'s':''} (${s.sections.map(x=>`${x.name}: ${x.bars.length} bars`).join(', ')}), form ${s.form.join(' ')}.`:'No bars found yet: put chords between | bar lines.'; return n; };
  ta.oninput=check; check(); ta.focus();
  const back=()=>song?gigShow(song.id):gigList();
  $('gigEBack').onclick=back; $('gigCancel').onclick=back;
  $('gigSave').onclick=()=>{ if(!check()) return trMsg('Add some bars first: chords between | bar lines.','no');
    const id=mine?song.id:'u:'+Date.now().toString(36);
    if(mine) GDATA.mine.find(m=>m.id===id).text=ta.value; else GDATA.mine.push({id,text:ta.value});
    if(!saveGig()){ if(!mine) GDATA.mine.pop(); return trMsg("Couldn't save: this browser's storage is full.",'no'); }
    trMsg('Saved under Yours.','ok'); gigShow(id); };
  if(mine) $('gigDel').onclick=()=>{ if(!confirm(`Delete "${song.title}"?`)) return; GDATA.mine=GDATA.mine.filter(m=>m.id!==song.id); delete GDATA.fav[song.id]; saveGig(); gigList(); };
}

/* ---------------- keys ---------------- */
function gigKey(e){
  if(!GIG.active) return false;
  if(e.target&&['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return e.key==='Escape'?(e.target.blur(),true):true;
  if(e.key==='Escape'){ if(GIG.view==='sheet') gigList(); else if(GIG.view==='edit') GIG.song?gigShow(GIG.song.id):gigList(); else gigToMenu(); return true; }
  if(e.metaKey||e.ctrlKey||e.altKey) return false;
  if(GIG.view==='sheet'){
    if(e.key===' '){ e.preventDefault(); GIG.playing?gigStop():gigPlay(GIG.pos); return true; }
    if(e.key==='-'||e.key==='_'){ gigTranspose(-1); return true; } if(e.key==='='||e.key==='+'){ gigTranspose(1); return true; } }
  const k=e.key.toLowerCase();
  if(k==='z'||k==='x'){ qOct=Math.max(36,Math.min(84,qOct+(k==='x'?12:-12))); paintQwerty(); return true; }
  if(k in QWERTY){ if(!e.repeat){ GIG.qDown=GIG.qDown||{}; if(GIG.qDown[k]==null){ const m=qOct+QWERTY[k]; GIG.qDown[k]=m; noteOn(m,90); } } return true; }
  return true;
}
document.addEventListener('keyup',e=>{ if(!GIG.active||!GIG.qDown) return; const k=e.key.toLowerCase(), m=GIG.qDown[k]; if(m!=null){ delete GIG.qDown[k]; noteOff(m); } });
