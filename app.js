const $=s=>document.querySelector(s);
let S=JSON.parse(localStorage.getItem("agenticarena")||'{"done":{},"steps":{},"xp":0,"daily":0}');
const save=()=>{localStorage.setItem("agenticarena",JSON.stringify(S));hud();};
const SH=["#f5b301","#e09f00","#d99200","#c98a00","#f2a900","#b58100","#e8a317","#f7c331","#cf9500"];
const lvlOf=x=>Math.floor(x/100)+1;
function hud(){dash();$("#xp").textContent=S.xp+" XP";$("#lvl").textContent="Lv "+lvlOf(S.xp);$("#xpfill").style.width=(S.xp%100)+"%";}
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),1800);}
const cnt=t=>TRACKS.find(x=>x.id==t).quests.filter((_,i)=>S.done[t+i]).length;
function tracks(){$("#tracks").innerHTML=TRACKS.map(t=>`<div class="card panel track" style="--c:${SH[TRACKS.indexOf(t)]}" data-id="${t.id}"><div class="ic">${t.icon}</div><h3>${t.name}</h3><p>${t.blurb}</p><div class="prog"><i style="width:${cnt(t.id)/t.quests.length*100}%"></i></div><small class="small">${cnt(t.id)}/${t.quests.length} quests</small></div>`).join("");
document.querySelectorAll(".track").forEach(e=>e.onclick=()=>openMap(e.dataset.id));
$("#badges").innerHTML=TRACKS.map(t=>`<div class="badge ${cnt(t.id)==t.quests.length?"on":""}" title="${t.name}">${t.icon}</div>`).join("");}
let cur=null;
function openMap(id){cur=id;const t=TRACKS.find(x=>x.id==id);t.color=SH[TRACKS.indexOf(t)];$("#map-sec").hidden=false;$("#map-title").textContent=t.icon+" "+t.name;$("#map-blurb").textContent=t.blurb;
const pts=[[170,170],[400,80],[630,170]];let next=t.quests.findIndex((_,i)=>!S.done[id+i]);
let h=`<defs><linearGradient id="gr" x1="0" x2="1"><stop offset="0" stop-color="${t.color}"/><stop offset="1" stop-color="#8a6200"/></linearGradient></defs>
<g opacity=".5" fill="#f5b301"><circle cx="60" cy="40" r="2" fill="#f5b301"/><circle cx="300" cy="30" r="2" fill="#f5b301"/><circle cx="560" cy="50" r="2" fill="#f5b301"/><circle cx="740" cy="30" r="2" fill="#f5b301"/><circle cx="200" cy="230" r="2" fill="#f5b301"/><circle cx="500" cy="235" r="2" fill="#fff"/></g>
<path d="M${pts[0]} Q250 20 ${pts[1]} T${pts[2]}" stroke="url(#gr)" stroke-width="8" fill="none" stroke-dasharray="4 16" stroke-linecap="round"/>`;
t.quests.forEach((q,i)=>{const [x,y]=pts[i],d=S.done[id+i],lock=i>next&&next!=-1;
h+=`<g class="node ${lock?"locked":""}" data-i="${i}">${i==next?`<circle class="pulse" cx="${x}" cy="${y}" r="38" fill="${t.color}"/>`:""}<circle class="main" cx="${x}" cy="${y}" r="30" fill="${d?"#f5b301":"#fffdf2"}" stroke="${t.color}" stroke-width="5"/><text x="${x}" y="${y+9}" text-anchor="middle" font-size="26" font-weight="800" fill="${d?"#fff":"#8a6200"}">${d?"✔":lock?"×":i+1}</text><text x="${x}" y="${y+62}" text-anchor="middle" font-size="15" font-weight="700" fill="#3b2f0b">${q.t.length>26?q.t.slice(0,24)+"…":q.t}</text></g>`;});
$("#map").innerHTML=h;document.querySelectorAll(".node").forEach(n=>n.onclick=()=>{if(!n.classList.contains("locked"))quest(+n.dataset.i)});
$("#map-sec").scrollIntoView({behavior:"smooth",block:"start"});}
function quest(i){const t=TRACKS.find(x=>x.id==cur),q=t.quests[i];
$("#mc").innerHTML=`<p class="pill">${t.icon} ${t.name} • Quest ${i+1}</p><h3>${q.t}</h3><p>${q.lesson}</p><h4>Challenge</h4><p>${q.q}</p>${q.o.map((o,k)=>`<button class="opt" data-k="${k}">${o}</button>`).join("")}<p id="fb" class="small"></p>`;
$("#modal").hidden=false;
document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=+b.dataset.k==q.a;b.classList.add(ok?"ok":"bad");
if(ok){document.querySelectorAll(".opt").forEach(x=>x.disabled=true);$("#fb").textContent="Correct! +"+(S.done[cur+i]?0:30)+" XP";if(!S.done[cur+i]){S.done[cur+i]=1;S.xp+=30;if(cnt(cur)==t.quests.length){S.xp+=50;toast("Badge unlocked: "+t.name)}else toast("+30 XP");save();tracks();}
setTimeout(()=>{$("#modal").hidden=true;openMap(cur)},1300);}else $("#fb").textContent="Not quite. Re-read the lesson and try again.";});}
$("#mx").onclick=()=>$("#modal").hidden=true;$("#modal").onclick=e=>{if(e.target.id=="modal")$("#modal").hidden=true};
$("#roads").innerHTML=ROADMAPS.map((r,ri)=>`<div class="card panel road"><h3>🗺️ ${r.name}</h3><small>${r.weeks}</small>${r.steps.map((s,si)=>`<div class="step ${S.steps[ri+"-"+si]?"done":""}" data-k="${ri}-${si}"><div class="dot">${S.steps[ri+"-"+si]?"✔":""}</div><span>${s}</span></div>`).join("")}</div>`).join("");
document.querySelectorAll(".step").forEach(e=>e.onclick=()=>{const k=e.dataset.k;S.steps[k]=!S.steps[k];if(S.steps[k]){S.xp+=10;toast("+10 XP")}save();e.classList.toggle("done");e.querySelector(".dot").textContent=S.steps[k]?"✔":""});
$("#proj").innerHTML=PROJECTS.map(p=>`<div class="card panel"><span class="lvl ${p.lvl}">${p.lvl}</span><h3>${p.t}</h3><p>${p.d}</p></div>`).join("");
$("#uses").innerHTML=USECASES.map((u,i)=>`<div class="card panel"><div class="num">${"0"+(i+1)}</div><h3>${u.t}</h3><p>${u.d}</p></div>`).join("");
const dp=PROBLEMS[new Date().getDate()%PROBLEMS.length];
$("#dailybox").innerHTML=`<span class="lvl Starter">Today's problem</span><h3>${dp.t}</h3><textarea placeholder="Type your answer..."></textarea><button class="btn sm" id="sub">Submit +20 XP</button> <small class="small">Hint: ${dp.h}</small>`;
$("#sub").onclick=()=>{const d=new Date().toDateString();if(S.daily==d){toast("Already done today")}else if($("#dailybox textarea").value.trim().length<10){toast("Write a bit more")}else{S.daily=d;S.xp+=20;save();toast("+20 XP. Come back tomorrow!")}};
$("#real").innerHTML=REAL.map(r=>`<div class="rl"><b>${r.t}</b>${r.d}</div>`).join("");
$("#wa").href=WA_LINK;$("#reset").onclick=()=>{if(confirm("Reset all progress?")){localStorage.removeItem("agenticarena");location.reload()}};
hud();tracks();
function dash(){const total=27,done=Object.keys(S.done).length,badges=TRACKS.filter(t=>cnt(t.id)==t.quests.length).length,steps=Object.values(S.steps).filter(Boolean).length,rs=ROADMAPS.reduce((a,r)=>a+r.steps.length,0);
const set=(i,v)=>{const e=document.getElementById(i);if(e)e.textContent=v};
set("ov-quests",done+"/"+total);set("ov-badges",badges+"/9");set("ov-steps",steps);set("ov-lvl",lvlOf(S.xp));
const ranks=["Rookie","Scout","Analyst","Evaluator","Specialist","Architect"];set("rank",ranks[Math.min(ranks.length-1,lvlOf(S.xp)-1)]);
const g=(id,p)=>{const e=document.getElementById(id);if(e){e.style.setProperty("--p",p);e.querySelector("b").textContent=p+"%"}};
g("g1",S.xp%100);g("g2",Math.round(done/total*100));g("g3",Math.round(steps/rs*100));
const tl=document.getElementById("timeline");if(tl){const r=TRACKS.map(t=>[t.name,cnt(t.id)]).filter(x=>x[1]>0).slice(0,4);tl.innerHTML=r.length?r.map(x=>`<div class="tl"><span>${x[0]}</span><em>${x[1]}/3</em></div>`).join(""):'<div class="tl"><span>No quests started yet</span><em>Start</em></div>'}}
function clock(){const d=new Date();set2("date",d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}));set2("time",d.toLocaleTimeString("en-GB"))}
function set2(i,v){const e=document.getElementById(i);if(e)e.textContent=v}
clock();setInterval(clock,1000);
const secs=[...document.querySelectorAll("#snav a")];addEventListener("scroll",()=>{let cur=secs[0];secs.forEach(a=>{const e=document.querySelector(a.getAttribute("href"));if(e&&!e.hidden&&e.getBoundingClientRect().top<200)cur=a});secs.forEach(a=>a.classList.toggle("on",a==cur))});
document.getElementById("resume").onclick=e=>{const t=TRACKS.find(t=>cnt(t.id)>0&&cnt(t.id)<3)||TRACKS[0];e.preventDefault();openMap(t.id)};
const _p=new URLSearchParams(location.search);if(_p.get("track"))openMap(_p.get("track"));if(_p.get("quest")!==null){cur=_p.get("track");quest(+_p.get("quest"))}
