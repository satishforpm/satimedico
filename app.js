
const SB=supabase.createClient('https://atywzeupnehlvhggpzjv.supabase.co','sb_publishable__srJlMj0sHz6U6sGgcFJEg_tW1Pe3_Z');
const $=i=>document.getElementById(i),MAX=15*1048576;
const mk=(a,b,p)=>`<span class="ib" style="background:linear-gradient(135deg,${a},${b})"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg></span>`;
const IC={passport:mk('#2563eb','#4f1fd6','<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="9" r="3.5"/><path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5"/>'),resizer:mk('#0ea5e9','#2563eb','<path d="M4 9V4h5M20 15v5h-5M4 4l7 7M20 20l-7-7"/>'),compressor:mk('#7c3aed','#b200c4','<path d="M12 3v6m0 0-3-3m3 3 3-3M12 21v-6m0 0-3 3m3-3 3 3M4 12h16"/>'),to100:mk('#f59e0b','#ef4444','<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),pdf:mk('#ef4444','#b91c1c','<path d="M6 2h8l5 5v15H6z"/><path d="M14 2v5h5M9 14h6M9 18h6"/>'),bgr:mk('#10b981','#0ea5e9','<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8 7.5 20 18M8 16.5 20 6"/>'),bgc:mk('#ec4899','#8b5cf6','<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2.2-.5-1.3.3-2.3 1.7-2.3H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>'),poster:mk('#f97316','#db2777','<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>')};
const T=[['passport','🪪','Passport Photo Maker','35×45 mm photos + A4 sheet'],['resizer','📐','Photo Resizer','Resize by pixels'],['compressor','🗜️','Image Compressor','Reach a target KB size'],['to100','⚡','Image to 100 KB','One-tap compression'],['pdf','📄','Image to PDF','Many images, one PDF'],['bgr','✂️','Background Remover','Needs AI provider'],['bgc','🎨','Background Changer','Needs AI provider'],['poster','🖼️','Poster Maker','Coming next']];
const html=T.map(t=>`<div class="card tool" onclick="go('${t[0]}')">${IC[t[0]]}<h3>${t[2]}</h3><p>${t[3]}</p></div>`).join('');$('hg').innerHTML=$('tg').innerHTML=html;
const AI={bgr:'AI Background Remover',bgc:'Photo Background Changer',poster:'Poster Maker'};
const msg=(id,t,c='')=>$(id).innerHTML=`<div class="msg ${c}">${t}</div>`;
function go(n){if(AI[n]){$('ait').textContent=AI[n];if(n=='poster')document.querySelector('#v-ai p').textContent='🔧 The Poster Maker editor is the next build step; it is not available yet.';n0=n;n='ai'}
 if(n=='dash'&&!user){n='login'}document.querySelectorAll('.v').forEach(v=>v.classList.toggle('on',v.id=='v-'+n));
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.g==n||(n=='ai'&&a.dataset.g=='tools')));scrollTo(0,0);if(n!='ai')history.replaceState(0,'','#'+n)}
let n0,user=null;
$('th').onclick=()=>{const r=document.documentElement,d=getComputedStyle(r).colorScheme=='dark';r.dataset.theme=d?'light':'dark';try{localStorage.setItem('th',r.dataset.theme)}catch(e){}};
try{const s=localStorage.getItem('th');if(s)document.documentElement.dataset.theme=s}catch(e){}
// ---- image helpers
const imgs={};
function loadImg(f){return new Promise((ok,no)=>{const u=URL.createObjectURL(f),i=new Image();i.onload=()=>ok(i);i.onerror=()=>no();i.src=u})}
const blob=(c,t,q)=>new Promise(r=>c.toBlob(r,t,q));const kb=b=>(b.size/1024).toFixed(1)+' KB';
const ext=t=>t=='image/png'?'png':t=='image/webp'?'webp':'jpg';
function dl(b,name){const u=URL.createObjectURL(b);return `<a class="btn" style="display:inline-block;text-decoration:none;margin-top:8px" download="${name}" href="${u}">⬇ Download</a>`}
document.querySelectorAll('input[data-t]').forEach(inp=>inp.onchange=async()=>{const f=inp.files[0];if(!f)return;const k=inp.dataset.t,box=inp.nextElementSibling;
 if(!/^image\/(jpeg|png|webp)$/.test(f.type)){box.innerHTML='<div class="msg err">Only JPG, PNG or WebP allowed.</div>';return}
 if(f.size>MAX){box.innerHTML='<div class="msg err">File is larger than 15 MB.</div>';return}
 try{const i=await loadImg(f);imgs[k]={i,f};box.innerHTML=`<img class="pv" src="${i.src}" alt="Preview"><div class="msg">${i.naturalWidth}×${i.naturalHeight}px · ${kb(f)}</div>`;
 if(k=='resizer'){$('rw').value=i.naturalWidth;$('rh').value=i.naturalHeight}if(k=='passport')drawP()}catch(e){box.innerHTML='<div class="msg err">Could not read this image.</div>'}});
$('rw').oninput=()=>{const o=imgs.resizer;if(o&&$('rl').checked)$('rh').value=Math.round($('rw').value*o.i.naturalHeight/o.i.naturalWidth)};
$('rh').oninput=()=>{const o=imgs.resizer;if(o&&$('rl').checked)$('rw').value=Math.round($('rh').value*o.i.naturalWidth/o.i.naturalHeight)};
async function doResize(){const o=imgs.resizer;if(!o)return msg('rout','Upload an image first.','err');const w=+$('rw').value,h=+$('rh').value;if(!(w>0&&h>0&&w<=12000&&h<=12000))return msg('rout','Enter valid dimensions (max 12000).','err');
 const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');if($('rf').value=='image/jpeg'){x.fillStyle='#fff';x.fillRect(0,0,w,h)}x.drawImage(o.i,0,0,w,h);
 const t=$('rf').value,b=await blob(c,t,.92);if(!b)return msg('rout','This browser cannot export that format.','err');
 $('rout').innerHTML=`<div class="msg ok">Original: ${o.i.naturalWidth}×${o.i.naturalHeight} (${kb(o.f)}) → Result: ${w}×${h} (${kb(b)})</div><img class="pv" src="${URL.createObjectURL(b)}">`+dl(b,'photokira-resized.'+ext(t))}
$('ck').onchange=()=>$('cc').style.display=$('ck').value=='c'?'block':'none';
async function doComp(m){const k=m=='h'?'to100':'compressor',o=imgs[k],out=m=='h'?'hout':'cout';if(!o)return msg(out,'Upload an image first.','err');
 const target=m=='h'?100:($('ck').value=='c'?+$('cc').value:+$('ck').value);if(!(target>=5))return msg(out,'Enter a valid target (min 5 KB).','err');
 const t=m=='h'?'image/jpeg':$('cf').value,lim=target*1024;let sc=1,best=null,hit=false;
 for(let s=0;s<8&&!hit;s++){const c=document.createElement('canvas');c.width=Math.max(16,Math.round(o.i.naturalWidth*sc));c.height=Math.max(16,Math.round(o.i.naturalHeight*sc));const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(o.i,0,0,c.width,c.height);
  let lo=.2,hi=.95,b;for(let j=0;j<7;j++){const q=(lo+hi)/2;b=await blob(c,t,q);if(b.size>lim)hi=q;else{lo=q;best=b;hit=true}}
  if(!hit){const b2=await blob(c,t,.2);if(!best||b2.size<best.size)best=b2;sc*=.8}}
 const ok=best.size<=lim;$('hout' ==out?'hout':out).innerHTML=`<div class="msg ${ok?'ok':'err'}">Original ${kb(o.f)} → Final ${kb(best)} (target ${target} KB). ${ok?'Target reached.':'Target NOT reached: the image is too detailed for this size even at low quality/reduced dimensions.'}</div><img class="pv" src="${URL.createObjectURL(best)}">`+dl(best,'photokira-compressed.'+ext(t))}
// pdf
let pfiles=[];$('pf').onchange=()=>{for(const f of $('pf').files){if(!/^image\/(jpeg|png|webp)$/.test(f.type)||f.size>MAX){msg('pout','Skipped invalid/too large file: '+f.name,'err');continue}pfiles.push(f)}$('pf').value='';rl()};
function rl(){$('pl').innerHTML=pfiles.map((f,i)=>`<div class="msg">${i+1}. ${f.name} <a class="l" onclick="mv(${i},-1)">↑</a> <a class="l" onclick="mv(${i},1)">↓</a> <a class="l" onclick="pfiles.splice(${i},1);rl()">✕</a></div>`).join('')}
function mv(i,d){const j=i+d;if(j<0||j>=pfiles.length)return;[pfiles[i],pfiles[j]]=[pfiles[j],pfiles[i]];rl()}
async function doPdf(){if(!pfiles.length)return msg('pout','Add at least one image.','err');const {jsPDF}=window.jspdf,d=new jsPDF({orientation:$('po').value,unit:'mm',format:$('ps').value}),m=+$('pm').value||0;
 for(let k=0;k<pfiles.length;k++){const i=await loadImg(pfiles[k]),c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(i,0,0);
  const W=d.internal.pageSize.getWidth()-2*m,H=d.internal.pageSize.getHeight()-2*m,r=Math.min(W/c.width,H/c.height),w=c.width*r,h=c.height*r;if(k)d.addPage();d.addImage(c.toDataURL('image/jpeg',.92),'JPEG',m+(W-w)/2,m+(H-h)/2,w,h)}
 const b=d.output('blob');$('pout').innerHTML=`<div class="msg ok">${pfiles.length} page(s) · ${kb(b)}</div>`+dl(b,'photokira.pdf')}
// passport
function drawP(o){const s=imgs.passport;if(!s)return;const aw=+$('aw').value||35,ah=+$('ah').value||45,k=o||1,W=Math.round(aw/25.4*300*k),H=Math.round(ah/25.4*300*k),c=o?document.createElement('canvas'):$('ac');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle=$('ab').value;x.fillRect(0,0,W,H);
 const i=s.i,z=+$('az').value,sc=Math.max(W/i.naturalWidth,H/i.naturalHeight)*z,w=i.naturalWidth*sc,h=i.naturalHeight*sc;x.drawImage(i,(W-w)/2+(+$('ax').value)*(w-W)/2,(H-h)/2+(+$('ay').value)*(h-H)/2,w,h);if(!o)c.style.width='min(100%,260px)';return c}
['aw','ah','ab','az','ax','ay'].forEach(i=>$(i).oninput=()=>drawP());
async function dlP(sheet){if(!imgs.passport)return alert('Upload a photo first.');const p=drawP(1);let c=p;
 if(sheet){c=document.createElement('canvas');c.width=2480;c.height=3508;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,2480,3508);const g=30;let px=g,py=g;while(py+p.height+g<=3508){if(px+p.width+g>2480){px=g;py+=p.height+g;continue}x.drawImage(p,px,py);px+=p.width+g}}
 const b=await blob(c,'image/jpeg',.95),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=sheet?'photokira-a4-sheet.jpg':'photokira-passport.jpg';a.click()}
// ---- auth
const e=m=>({'Invalid login credentials':'Wrong email or password.','Email not confirmed':'Email not verified yet.'}[m]||m);
function setUser(u){user=u;$('hb').textContent=u?'Account':'Login';$('hb').onclick=()=>go(u?'dash':'login');if(u){$('du').textContent=u.email}}
async function isAdmin(){try{const {data,error}=await SB.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();return !error&&!!data}catch(x){return false}}
try{const r=localStorage.getItem('re');if(r){$('le').value=r;$('lr').checked=true}}catch(x){}
async function login(){const {data,error}=await SB.auth.signInWithPassword({email:$('le').value.trim(),password:$('lp').value});if(error)return msg('lm',e(error.message),'err');
 try{$('lr').checked?localStorage.setItem('re',$('le').value.trim()):localStorage.removeItem('re')}catch(x){}
 setUser(data.user);const ad=await isAdmin();
 $('dr').textContent=ad?'✅ Admin verified. The admin panel is the next build step.':'Plan, usage and projects will appear here.';go('dash')}
let pend='';
async function signup(){pend=$('se').value.trim();const {error}=await SB.auth.signUp({email:pend,password:$('sp').value});if(error)return msg('sm',e(error.message),'err');$('oe').textContent=pend;go('otp')}
const oi=[...Array(6)].map((_,i)=>{const n=document.createElement('input');n.inputMode='numeric';n.maxLength=1;n.autocomplete=i?'off':'one-time-code';n.oninput=()=>{n.value=n.value.replace(/\D/g,'');if(n.value&&oi[i+1])oi[i+1].focus()};n.onkeydown=ev=>{if(ev.key=='Backspace'&&!n.value&&oi[i-1])oi[i-1].focus()};
 n.onpaste=ev=>{const t=(ev.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,6);if(t){ev.preventDefault();oi.forEach((q,j)=>q.value=t[j]||'')}};$('otp').appendChild(n);return n});
async function verify(){const t=oi.map(i=>i.value).join('');if(t.length!=6)return msg('om','Enter all 6 digits.','err');const {data,error}=await SB.auth.verifyOtp({email:pend,token:t,type:'signup'});if(error)return msg('om','Incorrect or expired code.','err');setUser(data.user);go('dash')}
let cd=0;async function resend(){if(cd)return;const {error}=await SB.auth.resend({type:'signup',email:pend});if(error)return msg('om',e(error.message),'err');msg('om','New code sent.','ok');cd=60;const b=$('rs'),t=setInterval(()=>{b.textContent=cd?`Resend (${cd--}s)`:'Resend';if(!cd)clearInterval(t)},1000)}
async function forgot(){const {error}=await SB.auth.resetPasswordForEmail($('fe').value.trim(),{redirectTo:location.origin+location.pathname});msg('fm',error?e(error.message):'If this email exists, a reset link was sent.',error?'err':'ok')}
async function setPw(i,m){const p=$(i).value;if(p.length<8)return msg(m,'Min 8 characters.','err');const {error}=await SB.auth.updateUser({password:p});msg(m,error?e(error.message):'Password updated.',error?'err':'ok')}
async function chEmail(){const {error}=await SB.auth.updateUser({email:$('ce').value.trim()});msg('dm',error?e(error.message):'Confirmation sent to the new email address.',error?'err':'ok')}
async function logout(){await SB.auth.signOut();setUser(null);go('home')}
SB.auth.onAuthStateChange((ev,s)=>{if(ev=='PASSWORD_RECOVERY'){setUser(s.user);go('reset')}});
SB.auth.getSession().then(({data})=>{if(data.session)setUser(data.session.user)});
const h=location.hash.slice(1);go(document.getElementById('v-'+h)&&!location.hash.includes('access_token')?h:'home');
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}));
