const SLOT_LABELS={emblem:"엠블럼",weapon:"무기",head:"머리",top:"상의",bottom:"하의",gloves:"장갑",shoes:"신발"};
function freshState(){return {selected:{...POB.DEFAULT_SELECTED},compareSelected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},classEnabled:{swordsman:false},mode:"raid",rankSlot:"weapon",focusTags:[],stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}}}
const STORAGE_KEY="mabi_pob_v12";
const AUTH_SESSION_KEY="mabi_pob_auth_session";
function normalizeNickname(name){return String(name||"").trim()}
function profileKey(name){return "mabi_pob_profile_"+encodeURIComponent(normalizeNickname(name).toLowerCase())}
function sanitizeSelection(sel){const clean={...POB.DEFAULT_SELECTED};for(const key of Object.keys(clean))clean[key]=(sel&&sel[key])||"";return clean}
function normalizeState(next){
  const base=freshState();
  next=next||base;
  next.selected=sanitizeSelection(next.selected);
  next.compareSelected=sanitizeSelection(next.compareSelected||next.selected);
  next.baseline=sanitizeSelection(next.baseline);
  next.classEnabled={swordsman:false,...(next.classEnabled||{})};
  next.stats={...POB.DEFAULT_STATS,...(next.stats||{})};
  next.env={...POB.DEFAULT_ENV,...(next.env||{})};
  next.mode=next.mode||"raid";
  next.rankSlot=next.rankSlot||"weapon";
  const validTags=new Set((POB.TAG_FOCUS||[]).map(t=>t.id));
  next.focusTags=[...new Set(Array.isArray(next.focusTags)?next.focusTags:[])].filter(id=>validTags.has(id));
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
const brandTitle=document.querySelector(".brand h1");
const appVersionEl=document.getElementById("appVersion");
if(brandTitle)brandTitle.textContent="게리롱 멋대로 POB식 밸류";
if(appVersionEl)appVersionEl.textContent="v0.0024";
function save(){
  state=normalizeState(state);
  if(activeProfile&&activeProfile.nickname){
    localStorage.setItem(profileKey(activeProfile.nickname),JSON.stringify({password:activeProfile.password,state}));
  }else{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  }
}
function n(v){return Number(v)||0} function pct(v){return (Math.round(v*10)/10)+"%"} function plusPct(v){const x=Math.round(v*10)/10;return (x>=0?"+":"")+x+"%"} function fmt(v){return Math.round(v).toLocaleString()} function fmtScore(v){return Math.round(n(v)*100)/100} function gemPct(lines){return Math.round((n(lines)*22*2.2)*10)/10}
function fmtLarge(v){
  const rounded=Math.round(n(v));
  const sign=rounded<0?"-":"";
  const abs=Math.abs(rounded);
  if(abs>=100000000){
    const eok=Math.floor(abs/100000000);
    const man=Math.floor((abs%100000000)/10000);
    return sign+eok.toLocaleString()+"억"+(man?" "+man.toLocaleString()+"만":"");
  }
  if(abs>=10000){
    const man=Math.round(abs/1000)/10;
    return sign+man.toLocaleString()+"만";
  }
  return rounded===0 ? "0" : sign+"1만 미만";
}


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
function seasonLabelText(r){
  if(!r||!r.id)return "";
  const raw=POB.runeSeasonLabel?POB.runeSeasonLabel(r):(r.season!==undefined?"시즌"+r.season:"시즌2");
  const m=String(raw).match(/(\d+)/);
  return m ? "시즌"+m[1] : String(raw);
}
function seasonNumber(r){
  const m=seasonLabelText(r).match(/(\d+)/);
  return m ? m[1] : "";
}
function seasonBadge(r){
  const num=seasonNumber(r);
  return num ? `<em class="season-badge season-${num}">시즌${num}</em>` : "";
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

  const result = POB.slotValueDelta(DB,state,slot,runeId,"avg");
  const diff = result.diffPct;
  const label = `${diff >= 0 ? "+" : ""}${(Math.round(diff*100)/100).toFixed(2)}%`;
  return {label, cls: diff >= 0 ? "up" : "down", diff};
}
function deltaPctText(diff){
  const rounded=(Math.round(n(diff)*100)/100).toFixed(2);
  return (n(diff)>=0?"+":"")+rounded+"%";
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
    '<span>'+seasonBadge(r)+r.name+'</span><b>'+d.label+'</b></button>';
}
function escapeAttr(v){
  return String(v||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
}
function seasonLabelText(r){
  if(!r||!r.id)return "";
  const raw=POB.runeSeasonLabel?POB.runeSeasonLabel(r):(r.season!==undefined?"시즌"+r.season:"시즌2");
  const m=String(raw).match(/(\d+)/);
  return m ? "시즌"+m[1] : String(raw);
}
function seasonBadge(r){
  const num=seasonNumber(r);
  return num ? `<em class="season-badge season-${num}">시즌${num}</em>` : "";
}
function runeCardInner(r,d){
  const name=(r&&r.name)||"없음";
  const season=seasonBadge(r)||'<em class="season-badge season-none">-</em>';
  return '<span class="rune-choice-name">'+name+'</span>'+
    '<span class="rune-choice-meta"><span>'+season+'</span><b>'+d.label+'</b></span>';
}
function slotDelta(slot,runeId){
  const currentId = state.selected[slot] || "";
  runeId = runeId || "";
  if(runeId === currentId) return {label:"현재", cls:"same", diff:0};
  const result = POB.slotValueDelta(DB,state,slot,runeId,"avg");
  const diff = result.diffPct;
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
    runeCardInner(r,d)+'</button>';
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
  const slotHtml=Object.entries(SLOT_LABELS).map(([slot,label])=>{
    const current=runeByIdLocal(state.selected[slot]);
    return '<div class="slot"><label>'+label+'</label>'+
      '<button type="button" class="slot-toggle" data-slot="'+slot+'"><span>'+(current?current.name:"없음")+'</span><small>열기</small></button>'+
      '<div class="slot-current">현재 기준: <b>'+(current?current.name:"미장착")+'</b></div>'+
      '<div class="rune-menu" id="menu_'+slot+'">'+
      '<div class="rune-search-wrap"><input class="rune-search" data-slot="'+slot+'" type="search" aria-label="룬 이름 또는 초성 검색" title="룬 이름 또는 초성 검색" autocomplete="off"></div>'+
      '<div class="rune-results" id="results_'+slot+'">'+renderRuneRows(slot)+'</div></div></div>';
  }).join("");
  const tagHtml='<div class="focus-tags"><label>룬 비교 태그</label><div class="focus-tag-grid">'+
    (POB.TAG_FOCUS||[]).map(t=>'<button type="button" class="focus-tag '+(state.focusTags.includes(t.id)?"active":"")+'" data-tag="'+t.id+'">#'+t.label+'</button>').join("")+
    '</div><p>선택한 태그는 룬 선택창과 추천 순위의 교체 %에만 반영됩니다.</p></div>';
  equipSlots.innerHTML=slotHtml+tagHtml;
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
  equipSlots.querySelectorAll(".focus-tag").forEach(btn=>{
    btn.onclick=()=>{
      const tag=btn.dataset.tag;
      const set=new Set(state.focusTags||[]);
      if(set.has(tag))set.delete(tag);else set.add(tag);
      state.focusTags=[...set];
      renderAll();
      save();
    };
  });
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
  const gemLines=n(state.env.gemLines);
  const gemOptions=[0,1,2,3].map(v=>`<option value="${v}" ${gemLines===v?"selected":""}>${v===0?"미적용":`${v}줄작 · +${gemPct(v)}%`}</option>`).join("");
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
    <details class="input-group env-group" open>
      <summary>상태/환경 입력</summary>
      <div class="form-grid env-grid">
        <label class="gem-field">보석<input type="hidden" value="${gemLines}"><select data-env-choice="gemLines">${gemOptions}</select><small>22개 보석 기준 · 한 줄당 48.4%</small></label>
        ${Object.entries(envLabels).map(([k,l])=>`<label>${l}<input data-env="${k}" type="text" inputmode="decimal" value="${state.env[k]}"></label>`).join("")}
      </div>
    </details>
  `;
  settings.querySelectorAll("[data-stat]").forEach(i=>i.oninput=e=>{
    state.stats[e.target.dataset.stat]=n(e.target.value);
    renderDashboard();renderComparison();renderRank();updateDerivedPanel();save();
  });
  settings.querySelectorAll("[data-env]").forEach(i=>i.oninput=e=>{
    state.env[e.target.dataset.env]=n(e.target.value);
    renderDashboard();renderComparison();renderRank();updateDerivedPanel();save();
  });
  settings.querySelectorAll("[data-env-choice]").forEach(i=>i.onchange=e=>{
    state.env[e.target.dataset.envChoice]=n(e.target.value);
    renderDashboard();renderComparison();renderRank();updateDerivedPanel();save();
  });
  saveBaseline.onclick=()=>{state.baseline=JSON.parse(JSON.stringify(state.selected));renderDashboard();renderComparison();save()}
}

function syncModeButtons(){
  document.querySelectorAll(".mode").forEach(b=>{
    b.classList.toggle("active",b.dataset.mode===state.mode);
    if(b.dataset.mode==="raid")b.textContent="레이드 5분";
    if(b.dataset.mode==="abyss")b.textContent="어비스 1분";
  });
}
function renderDashboard(){
  syncModeButtons();
  const cMin=POB.normalizedValue(DB,state,state.selected,"min");
  const cAvg=POB.normalizedValue(DB,state,state.selected,"avg");
  const cMax=POB.normalizedValue(DB,state,state.selected,"max");
  scoreValue.textContent=(Math.round(cAvg.valueScore*100)/100).toFixed(2);
  stateCards.innerHTML=[cMin,cAvg,cMax].map(c=>`<div class="state-card"><b>${c.preset.name}</b><span>${(Math.round(c.valueScore*100)/100).toFixed(2)}</span><small>${c.diffPct>=0?"+":""}${(Math.round(c.diffPct*100)/100).toFixed(2)}% / ${c.combat.label} / 실전 ${pct(c.combat.reliability*100)}</small></div>`).join("");
  const c=cAvg,combat=c.combat||POB.combatDpsSummary(DB,state,state.selected,"avg");
  const items=[
    ["전투 기준",combat.label],
    ["전투시간",combat.durationSec+"초"],
    ["실제 공격시간",combat.activeSec+"초"],
    ["공백시간",combat.downtimeSec+"초"],
    ["실전 보정",pct(combat.reliability*100)],
    ["DPS 기준",fmtLarge(combat.adjustedDpsScore)],
    ["총 기대딜",fmtLarge(combat.totalScore)],
    ["공격력",fmt(c.projectedAttack)],
    ["방어력",fmt(c.defense)],
    ["치명",pct(c.critChance)],
    ["치피",pct(c.critDamage)],
    ["추가타",pct(c.extraChance)],
    ["강타",pct(c.strongDamage)],
    ["연타",pct(c.multiDamage)],
    ["적주피",pct(c.enemyDamage)],
    ["무방비",pct(c.unarmored)],
    ["최종피해",pct(c.finalDamage)],
    ["보석증폭",pct(c.gemDamagePct||0)],
    ["질풍",pct(c.galeDamage)],
    ["스킬계수",pct(c.skillDamage)],
    ["속도보정",pct(c.speedBonus)],
    ["브레이크",pct(c.breakPct)],
    ["피해감소",pct(c.damageReducePct)],
    ["직접DPS",fmt(c.directDps)]
  ];
  metrics.innerHTML=items.map(([k,v])=>`<div class="metric"><b>${k}</b><span>${v}</span></div>`).join("");
  const vals=[["공격력",Math.min(100,c.projectedAttack/90000*100)],["치명",c.critChance],["추가타",c.extraChance],["강타",Math.min(100,c.strongDamage)],["연타",Math.min(100,c.multiDamage*2)],["적주피",Math.min(100,c.enemyDamage)],["스킬",Math.min(100,c.skillDamage/3)],["속도",Math.min(100,Math.max(0,c.speedBonus)/3)],["생존",Math.min(100,c.survivalBonus*5)],["직접",Math.min(100,c.directDps/50000*100)]];
  drawRadar(vals);
  bars.innerHTML=vals.map(([k,v])=>`<div class="bar-item"><div class="bar-head"><span>${k}</span><span>${pct(v)}</span></div><div class="bar"><div class="fill" style="width:${v}%"></div></div></div>`).join("");
  renderQA();
  renderSkillDamage();
}
function renderSkillDamage(){
  const panel=document.getElementById("skillDamagePanel");
  if(!panel||!POB.skillDamageRows)return;
  const rows=POB.skillDamageRows(DB,state,state.selected,"avg");
  panel.innerHTML=rows.map(r=>`<div class="skill-card"><div class="skill-head"><div><b>${r.name}</b><small>${r.form||"기본"} · ${r.tags.join(" / ")}</small></div><span>${r.cooldownSec.toFixed(1)}초</span></div><div class="skill-grid"><div><em>노크리</em><strong>${fmt(r.noCrit)}</strong></div><div><em>크리</em><strong>${fmt(r.crit)}</strong></div><div><em>브레이크</em><strong>${fmt(r.breakDamage)}</strong></div><div><em>브레이크 익스텐션</em><strong>${fmt(r.breakExtension)}</strong></div></div><p>1분 노크리 기준 ${fmt(r.damagePerMinute)} · 툴팁 피해 기반</p></div>`).join("");
}
const COMPARE_SLOT_LABELS={emblem:"엠블럼",weapon:"무기",head:"머리",top:"상의",bottom:"하의",gloves:"장갑",shoes:"신발"};
function fmtCombat(v){const value=Math.max(0,Math.floor(n(v)));const eok=Math.floor(value/100000000);const man=Math.floor((value%100000000)/10000);if(eok&&man)return eok.toLocaleString()+"억 "+man.toLocaleString()+"만";if(eok)return eok.toLocaleString()+"억";if(man)return man.toLocaleString()+"만";return "1만 미만"}
function ensureCompareSelection(){state.compareSelected=sanitizeSelection(state.compareSelected||state.selected)}
function compareRows(slot){
  const cat=POB.SLOT_CAT[slot];
  const rows=[{r:{id:"",name:"없음",tag:""},d:slotDelta(slot,"")}].concat((DB.runes[cat]||[]).map(r=>({r,d:slotDelta(slot,r.id)})));
  return rows.sort((a,b)=>b.d.diff-a.d.diff || String(a.r.name).localeCompare(String(b.r.name)));
}
function compareRuneCardInner(r,d){
  const name=(r&&r.name)||"없음";
  const season=seasonBadge(r)||'<em class="season-badge season-none">-</em>';
  return '<span class="compare-rune-name">'+name+'</span>'+
    '<span class="compare-rune-meta"><span>'+season+'</span><b>'+d.label+'</b></span>';
}
function compareChoiceButton(slot,r,d){
  const selected=(state.compareSelected[slot]||"")===(r.id||"")?" selected":"";
  return '<button type="button" class="compare-rune-choice rune-choice '+d.cls+selected+'" data-compare-slot="'+slot+'" data-rune="'+(r.id||"")+'">'+
    compareRuneCardInner(r,d)+'</button>';
}
function compareMenuHtml(slot){
  return compareRows(slot).map(({r,d})=>compareChoiceButton(slot,r,d)).join("");
}
function ensureCompareSelection(){
  state.compareSelected=sanitizeSelection(state.compareSelected||state.selected);
  state.compareSearch=state.compareSearch||{};
}
function compareRows(slot,query=""){
  const cat=POB.SLOT_CAT[slot];
  const noneChoice={r:{id:"",name:"없음",tag:""},d:slotDelta(slot,"")};
  const runeRows=(DB.runes[cat]||[])
    .filter(r=>runeMatchesQuery(r,query))
    .map(r=>({r,d:slotDelta(slot,r.id)}))
    .sort((a,b)=>b.d.diff-a.d.diff || String(a.r.name).localeCompare(String(b.r.name)));
  return [noneChoice,...runeRows];
}
function compareRuneCardInner(r,d){
  const name=(r&&r.name)||"없음";
  const season=seasonBadge(r)||'<em class="season-badge season-none">-</em>';
  return '<span class="compare-rune-name">'+name+'</span>'+
    '<span class="compare-rune-meta"><span>'+season+'</span><b>'+d.label+'</b></span>';
}
function compareMenuHtml(slot){
  const q=(state.compareSearch&&state.compareSearch[slot])||"";
  const rows=compareRows(slot,q);
  const hasRuneResult=rows.some(({r})=>r.id);
  const empty=q&&!hasRuneResult?'<div class="rune-empty">검색 결과 없음</div>':"";
  return '<div class="compare-search-wrap"><input class="compare-rune-search" data-compare-search="'+slot+'" type="search" value="'+escapeAttr(q)+'" placeholder="룬 검색 / 초성 검색" autocomplete="off"></div>'+
    '<div class="compare-rune-results">'+empty+rows.map(({r,d})=>compareChoiceButton(slot,r,d)).join("")+'</div>';
}
function renderCompareEquip(){
  const root=document.getElementById("compareSlots");
  if(!root)return;
  ensureCompareSelection();
  root.innerHTML=Object.keys(COMPARE_SLOT_LABELS).map(slot=>{
    const current=runeByIdLocal(state.compareSelected[slot]);
    const d=slotDelta(slot,state.compareSelected[slot]||"");
    return '<div class="compare-slot" data-compare-wrap="'+slot+'"><span>'+COMPARE_SLOT_LABELS[slot]+'</span>'+
      '<button type="button" class="compare-toggle rune-choice '+d.cls+'" data-compare-toggle="'+slot+'">'+
      compareRuneCardInner(current,d)+'</button>'+
      '<div class="compare-rune-menu" id="compare_menu_'+slot+'">'+compareMenuHtml(slot)+'</div></div>';
  }).join("");
  root.querySelectorAll("[data-compare-toggle]").forEach(btn=>{
    btn.onclick=()=>{
      const slot=btn.dataset.compareToggle;
      const menu=document.getElementById("compare_menu_"+slot);
      if(!menu)return;
      const willOpen=!menu.classList.contains("open");
      root.querySelectorAll(".compare-rune-menu").forEach(m=>m.classList.remove("open"));
      if(willOpen)menu.classList.add("open");
    };
  });
  root.querySelectorAll(".compare-rune-search").forEach(input=>{
    input.onclick=e=>e.stopPropagation();
    input.onkeydown=e=>e.stopPropagation();
    input.oninput=()=>{
      const slot=input.dataset.compareSearch;
      state.compareSearch=state.compareSearch||{};
      state.compareSearch[slot]=input.value;
      renderCompareEquip();
      const menu=document.getElementById("compare_menu_"+slot);
      if(menu)menu.classList.add("open");
      const next=menu&&menu.querySelector(".compare-rune-search");
      if(next){
        next.focus();
        next.setSelectionRange(next.value.length,next.value.length);
      }
    };
  });
  root.querySelectorAll(".compare-rune-choice").forEach(btn=>{
    btn.onclick=()=>{
      state.compareSelected[btn.dataset.compareSlot]=btn.dataset.rune||"";
      renderCompareEquip();
      renderComparison();
      save();
    };
  });
  const copyBtn=document.getElementById("copyCompareBtn");
  if(copyBtn)copyBtn.onclick=e=>{e.preventDefault();e.stopPropagation();state.compareSelected=JSON.parse(JSON.stringify(state.selected));renderCompareEquip();renderComparison();save()}
}
function renderComparison(){const summaryBox=document.getElementById("compareSummary");const chart=document.getElementById("compareChart");if(!summaryBox&&!chart)return;ensureCompareSelection();const s=POB.comparisonSummary(DB,state,state.compareSelected,"avg");const compareNames=Object.keys(COMPARE_SLOT_LABELS).filter(slot=>state.selected[slot]!==state.compareSelected[slot]).map(slot=>{const r=runeByIdLocal(state.compareSelected[slot]);return `${COMPARE_SLOT_LABELS[slot]}: ${r?r.name:"없음"}`});if(summaryBox){summaryBox.innerHTML=[["밸류 차이",plusPct(s.valueDiffPct)],["DPS 차이",plusPct(s.dpsDiffPct)],["총 기대딜 차이",plusPct(s.totalDiffPct)],["현재 DPS",fmtCombat(s.current.combat.adjustedDpsScore)],["비교 DPS",fmtCombat(s.compare.combat.adjustedDpsScore)],["현재 총 기대딜",fmtCombat(s.current.combat.totalScore)],["비교 총 기대딜",fmtCombat(s.compare.combat.totalScore)],["현재 평균 가동률",pct(s.currentClass.averageUptime*100)],["비교 평균 가동률",pct(s.compareClass.averageUptime*100)],["바뀐 부위",compareNames.length?compareNames.join("<br>"):"없음"]].map(([k,v])=>`<div><b>${k}</b><span>${v}</span></div>`).join("")}if(chart)drawCompareChart(chart,s)}
function fmtChartDamage(v){
  const x=Math.max(0,Math.round(n(v)));
  if(x>=100000000){
    const eok=Math.floor(x/100000000);
    const man=Math.floor((x%100000000)/10000);
    return man?`${eok}억 ${man}만`:`${eok}억`;
  }
  if(x>=10000)return Math.floor(x/10000)+"만";
  return "0";
}
function drawCompareChart(canvas,summary){
  const ctx=canvas.getContext("2d"),w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="#0f1722";
  ctx.fillRect(0,0,w,h);
  const padL=58,padR=18,baseY=h-58,topY=36,chartW=w-padL-padR,chartH=baseY-topY;
  const profile=POB.combatProfile?POB.combatProfile(state):(summary.currentClass&&summary.currentClass.profile)||{};
  const slots=Object.keys(COMPARE_SLOT_LABELS);
  function slotUptime(sel,slot){
    const rune=runeByIdLocal(sel&&sel[slot]);
    if(!rune)return {name:"없음",uptime:0,season:""};
    const info=POB.classifyRune?POB.classifyRune(rune,profile):null;
    return {
      name:rune.name,
      uptime:Math.max(0,Math.min(100,Math.round(n(info&&info.uptime)*100))),
      season:POB.runeSeasonLabel?POB.runeSeasonLabel(rune):""
    };
  }
  const rows=slots.map(slot=>({
    slot,
    label:COMPARE_SLOT_LABELS[slot],
    current:slotUptime(state.selected,slot),
    compare:slotUptime(state.compareSelected,slot)
  }));
  ctx.strokeStyle="#26364a";
  ctx.lineWidth=1;
  ctx.font="12px system-ui";
  ctx.textAlign="right";
  for(let i=0;i<=4;i++){
    const y=baseY-chartH*i/4;
    ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(w-padR,y);ctx.stroke();
    ctx.fillStyle="#8fa0b5";ctx.fillText((i*25)+"%",padL-8,y+4);
  }
  const groupW=chartW/Math.max(1,rows.length);
  const barW=Math.max(14,Math.min(34,groupW*.24));
  function drawBar(x,pct,color){
    const fullH=chartH;
    const fillH=fullH*pct/100;
    ctx.fillStyle="#172231";
    ctx.fillRect(x,topY,barW,fullH);
    ctx.fillStyle=color;
    ctx.fillRect(x,baseY-fillH,barW,fillH);
    ctx.strokeStyle="#32445a";
    ctx.strokeRect(x,topY,barW,fullH);
  }
  rows.forEach((row,i)=>{
    const center=padL+groupW*(i+.5);
    const x1=center-barW-4;
    const x2=center+4;
    drawBar(x1,row.current.uptime,"#94a3b8");
    drawBar(x2,row.compare.uptime,"#ff6a18");
    ctx.textAlign="center";
    ctx.font="11px system-ui";
    ctx.fillStyle="#dbe4ee";
    ctx.fillText(row.current.uptime+"%",x1+barW/2,Math.max(topY+12,baseY-chartH*row.current.uptime/100-6));
    ctx.fillStyle="#fff1e8";
    ctx.fillText(row.compare.uptime+"%",x2+barW/2,Math.max(topY+12,baseY-chartH*row.compare.uptime/100-6));
    ctx.fillStyle="#cbd5e1";
    ctx.font="12px system-ui";
    ctx.fillText(row.label,center,baseY+24);
  });
  const currentAvg=Math.round(n(summary.currentClass&&summary.currentClass.averageUptime)*100);
  const compareAvg=Math.round(n(summary.compareClass&&summary.compareClass.averageUptime)*100);
  ctx.textAlign="left";ctx.font="13px system-ui";
  ctx.fillStyle="#94a3b8";ctx.fillText("현재 장착 평균 "+currentAvg+"%",padL,20);
  ctx.fillStyle="#ff6a18";ctx.fillText("비교추가 평균 "+compareAvg+"%",padL+150,20);
  ctx.fillStyle="#8fa0b5";ctx.font="12px system-ui";ctx.fillText("장비 가동률 / 부위별 비교",w-160,20);
}
function drawRadar(vals){const canvas=radar,ctx=canvas.getContext("2d"),w=canvas.width,h=canvas.height,cx=w/2,cy=h/2+8,R=118,N=vals.length;ctx.clearRect(0,0,w,h);ctx.strokeStyle="#334155";ctx.lineWidth=1;for(let ring=1;ring<=4;ring++){ctx.beginPath();for(let i=0;i<N;i++){const a=-Math.PI/2+i*2*Math.PI/N,r=R*ring/4,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i==0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.stroke()}vals.forEach(([label],i)=>{const a=-Math.PI/2+i*2*Math.PI/N;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();ctx.fillStyle="#dbe4ee";ctx.font="13px system-ui";ctx.textAlign=Math.cos(a)>.2?"left":Math.cos(a)<-.2?"right":"center";ctx.fillText(label,cx+Math.cos(a)*(R+26),cy+Math.sin(a)*(R+26))});ctx.beginPath();vals.forEach(([_,v],i)=>{const a=-Math.PI/2+i*2*Math.PI/N,r=R*Math.max(0,Math.min(100,v))/100,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i==0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.closePath();ctx.fillStyle="rgba(255,106,24,.35)";ctx.strokeStyle="#ff6a18";ctx.lineWidth=3;ctx.fill();ctx.stroke()}
function runeRecommendationScore(r,d,profile){
  const info=POB.classifyRune?POB.classifyRune(r,profile):null;
  const uptime=n(info&&info.uptime);
  const focus=state.focusTags&&state.focusTags.length?POB.runeFocusScore(r,state.focusTags):0;
  return {
    diff:n(d.diff),
    uptime,
    focus,
    matches:!state.focusTags.length || focus>0.25
  };
}
function renderRank(){
  document.querySelectorAll(".rank-tab").forEach(b=>{
    b.classList.toggle("active",b.dataset.rank===state.rankSlot);
    b.onclick=()=>{state.rankSlot=b.dataset.rank;renderRank()};
  });
  const slot=state.rankSlot,cat=POB.SLOT_CAT[slot];
  const current=runeByIdLocal(state.selected[slot]);
  const basis='<p class="rank-basis">비교 기준: 현재 장착 '+(current?current.name:"없음")+' · 선택 태그는 이 추천 순위의 %와 정렬에만 반영됩니다.</p>';
  const profile=POB.combatProfile?POB.combatProfile(state):{};
  const rows=(DB.runes[cat]||[]).map(r=>{
    const sel={...state.selected,[slot]:r.id};
    const nv=POB.normalizedValue(DB,state,sel,"avg");
    const tv=POB.slotValueDelta(DB,state,slot,r.id,"avg");
    const rec=runeRecommendationScore(r,tv,profile);
    return{r,diff:tv.diffPct,value:tv.valueScore,combat:nv.combatValueScore,raw:nv.rawValueScore,tag:tv.tagDiffPct,reliability:nv.combat.reliability,uptime:rec.uptime,focus:rec.focus,matches:rec.matches};
  }).filter(x=>x.matches);
  ranking.innerHTML=basis+rows.sort((a,b)=>b.diff-a.diff || b.uptime-a.uptime || b.focus-a.focus || String(a.r.name).localeCompare(String(b.r.name))).slice(0,80).map((x,i)=>`<div class="rank-row"><b>${i+1}</b><div>${seasonBadge(x.r)}${x.r.name}<br><small>${x.r.tag||""} · 비교 ${x.value.toFixed(2)}점 · 가동률 ${Math.round(x.uptime*100)}% · 실전 ${x.combat.toFixed(2)}점${state.focusTags.length?` · 태그 ${x.tag>=0?"+":""}${x.tag.toFixed(2)}%`:""}</small></div><b>${x.diff>=0?"+":""}${(Math.round(x.diff*100)/100).toFixed(2)}%</b></div>`).join("");
}
function renderQA(){const qa=POB.runSelfTest(DB);qaPanel.innerHTML=qa.tests.map(t=>`<div class="audit-item"><b class="${t.pass?'ok':'bad'}">${t.pass?'통과':'실패'} · ${t.name}</b><br><span>${t.detail}</span></div>`).join("")}
function renderAll(){renderEquip();renderCompareEquip();renderClass();renderSettings();renderDashboard();renderComparison();renderRank();save()}
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;syncModeButtons();renderDashboard();renderComparison();renderRank();save()});resetButton.onclick=()=>{state=normalizeState(freshState());if(activeProfile&&activeProfile.nickname){localStorage.removeItem(profileKey(activeProfile.nickname))}else{localStorage.removeItem(STORAGE_KEY)}document.querySelectorAll("[data-stat],[data-env],[data-env-choice]").forEach(input=>{input.value=""});renderAuth();renderAll()};renderAuth();renderAll();
