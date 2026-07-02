const SLOT_LABELS={emblem:"엠블럼",weapon:"무기",head:"머리",top:"상의",bottom:"하의",gloves:"장갑",shoes:"신발"};
function freshState(){return {selected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},classEnabled:{swordsman:false},mode:"raid",rankSlot:"weapon",stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}}}
const STORAGE_KEY="mabi_pob_v12";
const AUTH_SESSION_KEY="mabi_pob_auth_session";
function normalizeNickname(name){return String(name||"").trim()}
function profileKey(name){return "mabi_pob_profile_"+encodeURIComponent(normalizeNickname(name).toLowerCase())}
function sanitizeSelection(sel){const clean={...POB.DEFAULT_SELECTED};for(const key of Object.keys(clean))clean[key]=(sel&&sel[key])||"";return clean}
function normalizeState(next){
  const base=freshState();
  next=next||base;
  next.selected=sanitizeSelection(next.selected);
  next.baseline=sanitizeSelection(next.baseline);
  next.classEnabled={swordsman:false,...(next.classEnabled||{})};
  next.stats={...POB.DEFAULT_STATS,...(next.stats||{})};
  next.env={...POB.DEFAULT_ENV,...(next.env||{})};
  next.mode=next.mode||"raid";
  next.rankSlot=next.rankSlot||"weapon";
  return next;
}
function readJson(key){try{return JSON.parse(localStorage.getItem(key)||"null")}catch(e){return null}}
function readProfile(name){return readJson(profileKey(name))}
let activeProfile=readJson(AUTH_SESSION_KEY);
function loadInitialState(){
  if(activeProfile&&activeProfile.nickname){
    const profile=readProfile(activeProfile.nickname);
    if(profile&&profile.password===activeProfile.password)return normalizeState(profile.state);
    activeProfile=null;localStorage.removeItem(AUTH_SESSION_KEY);
  }
  return normalizeState(readJson(STORAGE_KEY)||freshState());
}
let state=loadInitialState();
function save(){
  state=normalizeState(state);
  if(activeProfile&&activeProfile.nickname){
    localStorage.setItem(profileKey(activeProfile.nickname),JSON.stringify({password:activeProfile.password,state}));
  }else{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  }
}
function n(v){return Number(v)||0} function pct(v){return (Math.round(v*10)/10)+"%"} function plusPct(v){const x=Math.round(v*10)/10;return (x>=0?"+":"")+x+"%"} function fmt(v){return Math.round(v).toLocaleString()}


const authForm=document.getElementById("authForm");
const nicknameInput=document.getElementById("nicknameInput");
const passwordInput=document.getElementById("passwordInput");
const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");
const authStatus=document.getElementById("authStatus");
const resetButton=document.getElementById("resetBtn");
function renderAuth(){
  const logged=!!(activeProfile&&activeProfile.nickname);
  if(nicknameInput)nicknameInput.hidden=logged;
  if(passwordInput)passwordInput.hidden=logged;
  if(loginBtn)loginBtn.hidden=logged;
  if(logoutBtn)logoutBtn.hidden=!logged;
  if(authStatus)authStatus.textContent=logged?activeProfile.nickname+" 저장 중":"비로그인 저장";
}
if(authForm){
  authForm.onsubmit=(event)=>{
    event.preventDefault();
    const nickname=normalizeNickname(nicknameInput.value);
    const password=String(passwordInput.value||"");
    if(!nickname||!password){alert("닉네임과 암호를 입력해줘.");return}
    const profile=readProfile(nickname);
    if(profile&&profile.password!==password){alert("암호가 맞지 않아.");return}
    save();
    activeProfile={nickname,password};
    localStorage.setItem(AUTH_SESSION_KEY,JSON.stringify(activeProfile));
    state=normalizeState(profile&&profile.state?profile.state:freshState());
    nicknameInput.value="";
    passwordInput.value="";
    renderAuth();
    renderAll();
  };
}
if(logoutBtn){
  logoutBtn.onclick=()=>{
    save();
    activeProfile=null;
    localStorage.removeItem(AUTH_SESSION_KEY);
    state=normalizeState(readJson(STORAGE_KEY)||freshState());
    renderAuth();
    renderAll();
  };
}

function runeByIdLocal(id){
  return Object.values(DB.runes).flat().find(r=>r.id===id);
}
function tierBadge(r){
  return r && r.communityTier ? `<em class="tier-badge tier-${String(r.communityTier).replace("+","plus").toLowerCase()}">${r.communityTier}</em>` : "";
}
function normalizeSearchText(text){return String(text||"").toLowerCase().replace(/\s+/g,"").replace(/[+]/g,"")}
function choseong(text){
  const base=0xac00, initial=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  return String(text||"").split("").map(ch=>{
    const code=ch.charCodeAt(0)-base;
    return code>=0&&code<=11171 ? initial[Math.floor(code/588)] : ch;
  }).join("");
}
function runeMatchesQuery(r,query){
  const q=normalizeSearchText(query);
  if(!q)return true;
  const hay=normalizeSearchText((r.name||"")+" "+(r.tag||"")+" "+(r.communityTier||""));
  const cho=normalizeSearchText(choseong((r.name||"")+" "+(r.tag||"")));
  return hay.includes(q)||cho.includes(q);
}

function slotDelta(slot,runeId){
  const currentId = state.selected[slot] || "";
  runeId = runeId || "";
  if(runeId === currentId) return {label:"현재", cls:"same", diff:0};

  const current = POB.normalizedValue(DB,state,state.selected,"avg").valueScore;
  const sel = {...state.selected,[slot]:runeId};
  const candidate = POB.normalizedValue(DB,state,sel,"avg").valueScore;
  const diff = candidate - current;
  const label = `${diff >= 0 ? "+" : ""}${(Math.round(diff*100)/100).toFixed(2)}%`;
  return {label, cls: diff >= 0 ? "up" : "down", diff};
}

function renderRuneRows(slot,query=""){
  const cat=POB.SLOT_CAT[slot], list=DB.runes[cat]||[];
  const noneChoice={r:{id:"",name:"없음",tag:"",communityTier:""},d:slotDelta(slot,"")};
  const runeRows=list.filter(r=>runeMatchesQuery(r,query)).map(r=>({r,d:slotDelta(slot,r.id)}))
    .sort((a,b)=>b.d.diff-a.d.diff || String(a.r.name).localeCompare(String(b.r.name)));
  const allRows=[noneChoice,...runeRows];
  if(allRows.length===1 && query)return '<div class="rune-empty">검색 결과 없음</div>'+renderRuneButton(slot,noneChoice.r,noneChoice.d);
  return allRows.map(({r,d})=>renderRuneButton(slot,r,d)).join("");
}
function renderRuneButton(slot,r,d){
  return '<button type="button" class="rune-choice '+d.cls+'" data-slot="'+slot+'" data-rune="'+r.id+'">'+
    '<span>'+tierBadge(r)+r.name+'</span><b>'+d.label+'</b></button>';
}
function bindRuneChoices(root=equipSlots){
  root.querySelectorAll(".rune-choice").forEach(btn=>{
    btn.onclick=()=>{
      state.selected[btn.dataset.slot]=btn.dataset.rune || "";
      renderAll();
      save();
    };
  });
}
function renderEquip(){
  equipSlots.innerHTML=Object.entries(SLOT_LABELS).map(([slot,label])=>{
    const current=runeByIdLocal(state.selected[slot]);
    return '<div class="slot"><label>'+label+'</label>'+
      '<button type="button" class="slot-toggle" data-slot="'+slot+'"><span>'+(current?current.name:"없음")+'</span><small>열기</small></button>'+
      '<div class="slot-current">현재 기준: <b>'+(current?current.name:"미장착")+'</b></div>'+
      '<div class="rune-menu" id="menu_'+slot+'">'+
      '<div class="rune-search-wrap"><input class="rune-search" data-slot="'+slot+'" type="search" aria-label="룬 이름 또는 초성 검색" title="룬 이름 또는 초성 검색" autocomplete="off"></div>'+
      '<div class="rune-results" id="results_'+slot+'">'+renderRuneRows(slot)+'</div></div></div>';
  }).join("");
  equipSlots.querySelectorAll(".slot-toggle").forEach(btn=>{
    btn.onclick=()=>{
      const slot=btn.dataset.slot;
      const menu=document.getElementById("menu_"+slot);
      if(!menu)return;
      const willOpen=!menu.classList.contains("open");
      document.querySelectorAll(".rune-menu").forEach(m=>m.classList.remove("open"));
      if(willOpen){menu.classList.add("open");const input=menu.querySelector(".rune-search");if(input)setTimeout(()=>input.focus(),0)}
    };
  });
  equipSlots.querySelectorAll(".rune-search").forEach(input=>{
    input.oninput=()=>{
      const slot=input.dataset.slot;
      const results=document.getElementById("results_"+slot);
      results.innerHTML=renderRuneRows(slot,input.value);
      bindRuneChoices(results);
    };
    input.onclick=e=>e.stopPropagation();
  });
  bindRuneChoices();
}

function renderClass(){const on=state.classEnabled.swordsman;if(swordsmanToggle){swordsmanToggle.textContent=on?"ON":"OFF";swordsmanToggle.className="class-toggle "+(on?"on":"off");swordsmanToggle.onclick=e=>{e.preventDefault();e.stopPropagation();state.classEnabled.swordsman=!state.classEnabled.swordsman;renderAll();save()}}if(classPassiveList){classPassiveList.innerHTML=DB.classes[0].passives.map(p=>`<div class="passive-mini ${on?"":"off"}"><b>${p.name}</b><small>${p.note||""}</small></div>`).join("")}}


function updateDerivedPanel(){
  const d=POB.derivedStats(state);
  const box=document.querySelector(".derived-grid");
  if(!box)return;
  const vals=[pct(d.critBase),pct(d.extraBase),pct(d.strongBase),pct(d.multiBase),plusPct(d.breakPct),plusPct(d.skillPowerPct),plusPct(d.areaPowerPct),plusPct(d.fastAttackPct),plusPct(d.fastSkillPct),plusPct(d.damageReducePct),pct(state.stats.critDamageBase)];
  box.querySelectorAll("span").forEach((s,i)=>s.textContent=vals[i]||s.textContent);
}

function renderSettings(){
  const primaryLabels={
    attack:"스탯창 공격력",
    defense:"스탯창 방어력"
  };
  const secondLabels={
    breakPower:"브레이크",
    strongStat:"강타 강화",
    comboStat:"콤보 강화",
    skillPower:"스킬 위력",
    areaPower:"광역 강화",
    recoveryPower:"회복력",
    weakpointDodge:"급소 회피",
    extraStat:"추가타",
    damageReduce:"피해 감소",
    fastAttack:"빠른 공격",
    multiStat:"연타 강화",
    fastSkill:"빠른 스킬",
    extraHp:"추가 체력",
    ultimatePower:"궁극기",
    critStat:"치명타",
    critDamageBase:"기본 치명피해"
  };
  const envLabels={
    skillCycle:"평균 스킬주기",
    basicDelay:"평타 지연",
    abyssKills:"어비스 처치수",
    raidKills:"레이드 처치수",
    unarmoredUptime:"무방비 유지율",
    nightBlessingUptime:"밤의 축복 유지율",
    focusUptime:"집중 유지율",
    nightTraceLevel:"밤의 흔적 레벨",
    galeStacksMax:"질풍태세 최대중첩",
    ultimateCycleSec:"궁극기 주기",
    breakExtensionMultiplier:"브익 배율"
  };
  const derived=POB.derivedStats(state);
  settings.innerHTML=`
    <details class="input-group" open>
      <summary>스탯창 입력</summary>
      <div class="form-grid">
        ${Object.entries(primaryLabels).map(([k,l])=>`<label>${l}<input data-stat="${k}" type="text" inputmode="numeric" value="${state.stats[k]??0}"></label>`).join("")}
      </div>
    </details>
    <details class="input-group" open>
      <summary>두 번째 스탯창 입력</summary>
      <div class="form-grid">
        ${Object.entries(secondLabels).map(([k,l])=>`<label>${l}<input data-stat="${k}" type="text" inputmode="decimal" value="${state.stats[k]??0}"></label>`).join("")}
      </div>
    </details>
    <details class="input-group" open>
      <summary>기타 자동 환산</summary>
      <div class="derived-grid">
        <div><b>치명확률</b><span>${pct(derived.critBase)}</span></div>
        <div><b>추가타</b><span>${pct(derived.extraBase)}</span></div>
        <div><b>강타피해</b><span>${pct(derived.strongBase)}</span></div>
        <div><b>연타피해</b><span>${pct(derived.multiBase)}</span></div>
        <div><b>브레이크</b><span>${plusPct(derived.breakPct)}</span></div>
        <div><b>스킬위력</b><span>${plusPct(derived.skillPowerPct)}</span></div>
        <div><b>광역강화</b><span>${plusPct(derived.areaPowerPct)}</span></div>
        <div><b>빠른공격</b><span>${plusPct(derived.fastAttackPct)}</span></div>
        <div><b>빠른스킬</b><span>${plusPct(derived.fastSkillPct)}</span></div>
        <div><b>피해감소</b><span>${plusPct(derived.damageReducePct)}</span></div>
        <div><b>치명피해</b><span>${pct(state.stats.critDamageBase)}</span></div>
      </div>
    </details>
    <details class="input-group" open>
      <summary>상태/환경 입력</summary>
      <div class="form-grid">
        ${Object.entries(envLabels).map(([k,l])=>`<label>${l}<input data-env="${k}" type="text" inputmode="decimal" value="${state.env[k]}"></label>`).join("")}
      </div>
    </details>
  `;
  settings.querySelectorAll("[data-stat]").forEach(i=>i.oninput=e=>{
    state.stats[e.target.dataset.stat]=n(e.target.value);
    renderDashboard();renderRank();updateDerivedPanel();save();
  });
  settings.querySelectorAll("[data-env]").forEach(i=>i.oninput=e=>{
    state.env[e.target.dataset.env]=n(e.target.value);
    renderDashboard();renderRank();updateDerivedPanel();save();
  });
  saveBaseline.onclick=()=>{state.baseline=JSON.parse(JSON.stringify(state.selected));renderDashboard();save()}
}

function renderDashboard(){const cMin=POB.normalizedValue(DB,state,state.selected,"min"),cAvg=POB.normalizedValue(DB,state,state.selected,"avg"),cMax=POB.normalizedValue(DB,state,state.selected,"max");scoreValue.textContent=(Math.round(cAvg.valueScore*100)/100).toFixed(2);stateCards.innerHTML=[cMin,cAvg,cMax].map(c=>`<div class="state-card"><b>${c.preset.name}</b><span>${(Math.round(c.valueScore*100)/100).toFixed(2)}</span><small>${c.diffPct>=0?"+":""}${(Math.round(c.diffPct*100)/100).toFixed(2)}% / 침식 ${c.preset.erosion} / 용문 ${c.preset.dragon} / 밤축 ${c.preset.night}</small></div>`).join("");const c=cAvg,items=[["공격력",fmt(c.projectedAttack)],["방어력",fmt(c.defense)],["치명",pct(c.critChance)],["치피",pct(c.critDamage)],["추가타",pct(c.extraChance)],["강타",pct(c.strongDamage)],["연타",pct(c.multiDamage)],["적주피",pct(c.enemyDamage)],["무방비",pct(c.unarmored)],["최종피해",pct(c.finalDamage)],["질풍",pct(c.galeDamage)],["스킬계수",pct(c.skillDamage)],["속도보정",pct(c.speedBonus)],["브레이크",pct(c.breakPct)],["피해감소",pct(c.damageReducePct)],["직접DPS",fmt(c.directDps)]];metrics.innerHTML=items.map(([k,v])=>`<div class="metric"><b>${k}</b><span>${v}</span></div>`).join("");const vals=[["공격력",Math.min(100,c.projectedAttack/90000*100)],["치명",c.critChance],["추가타",c.extraChance],["강타",Math.min(100,c.strongDamage)],["연타",Math.min(100,c.multiDamage*2)],["적주피",Math.min(100,c.enemyDamage)],["스킬",Math.min(100,c.skillDamage/3)],["속도",Math.min(100,Math.max(0,c.speedBonus)/3)],["생존",Math.min(100,c.survivalBonus*5)],["직접",Math.min(100,c.directDps/50000*100)]];drawRadar(vals);bars.innerHTML=vals.map(([k,v])=>`<div class="bar-item"><div class="bar-head"><span>${k}</span><span>${pct(v)}</span></div><div class="bar"><div class="fill" style="width:${v}%"></div></div></div>`).join("");renderQA();renderSkillDamage()}
function renderSkillDamage(){
  const panel=document.getElementById("skillDamagePanel");
  if(!panel||!POB.skillDamageRows)return;
  const rows=POB.skillDamageRows(DB,state,state.selected,"avg");
  panel.innerHTML=rows.map(r=>`<div class="skill-card"><div class="skill-head"><div><b>${r.name}</b><small>${r.form||"기본"} · ${r.tags.join(" / ")}</small></div><span>${r.cooldownSec.toFixed(1)}초</span></div><div class="skill-grid"><div><em>노크리</em><strong>${fmt(r.noCrit)}</strong></div><div><em>크리</em><strong>${fmt(r.crit)}</strong></div><div><em>브레이크</em><strong>${fmt(r.breakDamage)}</strong></div><div><em>브레이크 익스텐션</em><strong>${fmt(r.breakExtension)}</strong></div></div><p>1분 노크리 기준 ${fmt(r.damagePerMinute)} · 툴팁 피해 기반</p></div>`).join("");
}
function drawRadar(vals){const canvas=radar,ctx=canvas.getContext("2d"),w=canvas.width,h=canvas.height,cx=w/2,cy=h/2+8,R=118,N=vals.length;ctx.clearRect(0,0,w,h);ctx.strokeStyle="#334155";ctx.lineWidth=1;for(let ring=1;ring<=4;ring++){ctx.beginPath();for(let i=0;i<N;i++){const a=-Math.PI/2+i*2*Math.PI/N,r=R*ring/4,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i==0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.stroke()}vals.forEach(([label],i)=>{const a=-Math.PI/2+i*2*Math.PI/N;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();ctx.fillStyle="#dbe4ee";ctx.font="13px system-ui";ctx.textAlign=Math.cos(a)>.2?"left":Math.cos(a)<-.2?"right":"center";ctx.fillText(label,cx+Math.cos(a)*(R+26),cy+Math.sin(a)*(R+26))});ctx.beginPath();vals.forEach(([_,v],i)=>{const a=-Math.PI/2+i*2*Math.PI/N,r=R*Math.max(0,Math.min(100,v))/100,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i==0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.closePath();ctx.fillStyle="rgba(255,106,24,.35)";ctx.strokeStyle="#ff6a18";ctx.lineWidth=3;ctx.fill();ctx.stroke()}
function renderRank(){document.querySelectorAll(".rank-tab").forEach(b=>{b.classList.toggle("active",b.dataset.rank===state.rankSlot);b.onclick=()=>{state.rankSlot=b.dataset.rank;renderRank()}});const slot=state.rankSlot,cat=POB.SLOT_CAT[slot];ranking.innerHTML=(DB.runes[cat]||[]).map(r=>{const sel={...state.selected,[slot]:r.id};const nv=POB.normalizedValue(DB,state,sel,"avg");return{r,diff:nv.diffPct,value:nv.valueScore}}).sort((a,b)=>b.diff-a.diff).slice(0,80).map((x,i)=>`<div class="rank-row"><b>${i+1}</b><div>${x.r.name}<br><small>${x.r.tag||""} · ${x.value.toFixed(2)}점</small></div><b>${x.diff>=0?"+":""}${(Math.round(x.diff*100)/100).toFixed(2)}%</b></div>`).join("")}
function renderQA(){const qa=POB.runSelfTest(DB);qaPanel.innerHTML=qa.tests.map(t=>`<div class="audit-item"><b class="${t.pass?'ok':'bad'}">${t.pass?'통과':'실패'} · ${t.name}</b><br><span>${t.detail}</span></div>`).join("")}
function renderAll(){renderEquip();renderClass();renderSettings();renderDashboard();renderRank();save()}
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;document.querySelectorAll(".mode").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderDashboard();renderRank();save()});resetButton.onclick=()=>{state=freshState();if(activeProfile&&activeProfile.nickname){localStorage.removeItem(profileKey(activeProfile.nickname))}else{localStorage.removeItem(STORAGE_KEY)}renderAuth();renderAll()};renderAuth();renderAll();