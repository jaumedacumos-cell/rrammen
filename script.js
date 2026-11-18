const $=s=>document.querySelector(s);
const sections=[...document.querySelectorAll('section')];
// Search
const map={home:'home',about:'about',skills:'skills',skill:'skills',html:'skills',animation:'skills','digital design':'skills',digital:'skills',design:'skills',contact:'contact'};
let mt;
function note(t){const m=$('#msg');m.textContent=t;m.classList.add('show');clearTimeout(mt);mt=setTimeout(()=>m.classList.remove('show'),3000)}
function go(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}
function search(){
 const k=$('#q').value.trim().toLowerCase().replace(/\s+/g,' ');
 if(!k){note('Please type a keyword to search.');return}
 let id=map[k];
 if(!id){const hit=Object.keys(map).find(w=>w.startsWith(k)&&k.length>=3);if(hit)id=map[hit]}
 if(!id){note('No results found. Please try again.');return}
 go(id);
 if(id==='skills'){document.querySelectorAll('.card').forEach(c=>c.classList.toggle('hl',c.dataset.k===k||c.dataset.k.startsWith(k)));setTimeout(()=>document.querySelectorAll('.card').forEach(c=>c.classList.remove('hl')),2500)}
}
$('#sb').addEventListener('click',search);
$('#q').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();search()}});
// Nav
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(a.getAttribute('href').slice(1))}));
const links=[...document.querySelectorAll('.links a')];
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}),{threshold:.5}).observe&&sections.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}),{threshold:.45}).observe(s));
// Form
$('#cf').addEventListener('submit',e=>{
 e.preventDefault();
 const p=$('#ph'),m=$('#ms');let ok=true;
 const digits=p.value.replace(/[\s\-+()]/g,'');
 const pe=!p.value.trim()?'Please enter your phone number.':(!/^\d{10,13}$/.test(digits)?'Enter a valid phone number (10–13 digits).':'');
 const me=!m.value.trim()?'Please enter a message.':(m.value.trim().length<10?'Message should be at least 10 characters.':'');
 $('#e1').textContent=pe;$('#e2').textContent=me;
 p.classList.toggle('err',!!pe);m.classList.toggle('err',!!me);
 $('#ok').textContent='';
 if(pe||me)return;
 const b=e.submitter;b.disabled=true;b.textContent='Sending…';
 setTimeout(()=>{b.disabled=false;b.textContent='Send';$('#ok').textContent='Thank you! Your message has been sent.';$('#cf').reset()},900);
});
// Background network
const cv=$('#net'),cx=cv.getContext('2d');let W,H,pts=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;const n=Math.min(90,Math.floor(W*H/16000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+.8}))}
function draw(){cx.clearRect(0,0,W,H);
 for(const a of pts){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
  cx.beginPath();cx.arc(a.x,a.y,a.r,0,7);cx.fillStyle='rgba(150,220,255,.9)';cx.shadowBlur=10;cx.shadowColor='#2ea8ff';cx.fill();cx.shadowBlur=0}
 for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<140){cx.strokeStyle='rgba(90,190,255,'+(.35*(1-d/140))+')';cx.beginPath();cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.stroke()}}
 requestAnimationFrame(draw)}
addEventListener('resize',size);size();draw();
