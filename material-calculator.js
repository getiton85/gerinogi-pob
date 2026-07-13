(function(){
  "use strict";

  const CATEGORY_LABELS={metal:"금속 가공",wood:"목재 가공",cloth:"옷감 가공",leather:"가죽 가공"};
  const RECIPES=[
    {id:"iron_ingot",name:"철괴",category:"metal",level:1,time:30,output:3,success:.20,ingredients:{iron_ore:10}},
    {id:"steel_ingot",name:"강철괴",category:"metal",level:1,time:300,output:3,success:.20,ingredients:{iron_ingot:3,coal:4}},
    {id:"alloy_steel",name:"합금강괴",category:"metal",level:2,time:3000,output:3,success:.175,ingredients:{steel_ingot:3,copper_ore:15,coal:8}},
    {id:"special_steel",name:"특수강괴",category:"metal",level:3,time:9000,output:3,success:.15,ingredients:{alloy_steel:4,cupronickel_ore:20,coal:12}},
    {id:"silver_alloy",name:"은합금괴",category:"metal",level:4,time:11400,output:3,success:.125,ingredients:{special_steel:5,silver_ore:20,coal:16}},
    {id:"meteor_iron",name:"운철괴",category:"metal",level:5,time:14400,output:3,success:.12,ingredients:{silver_alloy:5,meteor_ore:20,coal:20}},
    {id:"platinum_steel",name:"백금강괴",category:"metal",level:6,time:18000,output:3,success:.12,ingredients:{meteor_iron:5,platinum_ore:20,coal:20}},

    {id:"lumber",name:"목재",category:"wood",level:1,time:45,output:3,success:.20,ingredients:{log:10}},
    {id:"lumber_plus",name:"목재+",category:"wood",level:1,time:360,output:3,success:.20,ingredients:{lumber:3,tree_sap:4}},
    {id:"high_lumber",name:"상급 목재",category:"wood",level:2,time:3000,output:3,success:.175,ingredients:{lumber_plus:3,high_log:15,tree_sap:8}},
    {id:"high_lumber_plus",name:"상급 목재+",category:"wood",level:3,time:9000,output:3,success:.15,ingredients:{high_lumber:4,high_log_plus:20,tree_sap:12}},
    {id:"top_lumber",name:"최상급 목재",category:"wood",level:4,time:11400,output:3,success:.125,ingredients:{high_lumber_plus:5,top_log:20,tree_sap:16}},
    {id:"top_lumber_plus",name:"최상급 목재+",category:"wood",level:5,time:14400,output:3,success:.12,ingredients:{top_lumber:5,top_log_plus:20,tree_sap:20}},
    {id:"premium_lumber",name:"특급 목재",category:"wood",level:6,time:18000,output:3,success:.12,ingredients:{top_lumber_plus:5,premium_log:20,tree_sap:20}},

    {id:"cloth",name:"옷감",category:"cloth",level:1,time:45,output:3,success:.20,ingredients:{wool:10}},
    {id:"silk",name:"실크",category:"cloth",level:1,time:90,output:2,success:.20,ingredients:{spider_web:10}},
    {id:"cloth_plus",name:"옷감+",category:"cloth",level:1,time:360,output:3,success:.20,ingredients:{cloth:3,wool:4}},
    {id:"high_cloth",name:"상급 옷감",category:"cloth",level:2,time:3000,output:3,success:.175,ingredients:{cloth_plus:3,high_wool:15,wool:8}},
    {id:"high_silk",name:"상급 실크",category:"cloth",level:2,time:4050,output:2,success:.175,ingredients:{silk:4,strong_mushroom_sap:8}},
    {id:"high_cloth_plus",name:"상급 옷감+",category:"cloth",level:3,time:9000,output:3,success:.15,ingredients:{high_cloth:4,high_wool_plus:20,wool:12}},
    {id:"top_cloth",name:"최상급 옷감",category:"cloth",level:4,time:11400,output:3,success:.125,ingredients:{high_cloth_plus:5,top_wool:20,wool:16}},
    {id:"top_silk",name:"최상급 실크",category:"cloth",level:4,time:12900,output:2,success:.125,ingredients:{high_silk:4,top_spider_web:20,strong_mushroom_sap:16}},
    {id:"top_cloth_plus",name:"최상급 옷감+",category:"cloth",level:5,time:14400,output:3,success:.12,ingredients:{top_cloth:5,top_wool_plus:20,wool:20}},
    {id:"premium_cloth",name:"특급 옷감",category:"cloth",level:6,time:18000,output:3,success:.12,ingredients:{top_cloth_plus:5,premium_wool:20,wool:20}},
    {id:"premium_silk",name:"특급 실크",category:"cloth",level:6,time:21600,output:2,success:.12,ingredients:{top_silk:4,premium_spider_web:20,strong_mushroom_sap:20}},

    {id:"leather",name:"가죽",category:"leather",level:1,time:30,output:3,success:.20,ingredients:{raw_leather:10}},
    {id:"leather_plus",name:"가죽+",category:"leather",level:1,time:300,output:3,success:.20,ingredients:{leather:3,tannin_powder:4}},
    {id:"high_leather",name:"상급 가죽",category:"leather",level:2,time:3000,output:3,success:.175,ingredients:{leather_plus:3,high_raw_leather:15,tannin_powder:8}},
    {id:"high_leather_plus",name:"상급 가죽+",category:"leather",level:3,time:9000,output:3,success:.15,ingredients:{high_leather:4,high_raw_leather_plus:20,tannin_powder:12}},
    {id:"top_leather",name:"최상급 가죽",category:"leather",level:4,time:11400,output:3,success:.125,ingredients:{high_leather_plus:5,top_raw_leather:20,tannin_powder:16}},
    {id:"top_leather_plus",name:"최상급 가죽+",category:"leather",level:5,time:14400,output:3,success:.12,ingredients:{top_leather:5,top_raw_leather_plus:20,tannin_powder:20}},
    {id:"premium_leather",name:"특급 가죽",category:"leather",level:6,time:18000,output:3,success:.12,ingredients:{top_leather_plus:5,premium_raw_leather:20,tannin_powder:20}}
  ];

  const RAW_NAMES={
    iron_ore:"철 광석",coal:"석탄",copper_ore:"동 광석",cupronickel_ore:"백동 광석",silver_ore:"은 광석",meteor_ore:"운철 광석",platinum_ore:"백금 광석",
    log:"통나무",tree_sap:"나무 진액",high_log:"상급 통나무",high_log_plus:"상급 통나무+",top_log:"최상급 통나무",top_log_plus:"최상급 통나무+",premium_log:"특급 통나무",
    wool:"양털",spider_web:"거미줄",high_wool:"상급 양털",strong_mushroom_sap:"튼튼 버섯 진액",high_wool_plus:"상급 양털+",top_wool:"최상급 양털",top_spider_web:"최상급 거미줄",top_wool_plus:"최상급 양털+",premium_wool:"특급 양털",premium_spider_web:"특급 거미줄",
    raw_leather:"생가죽",tannin_powder:"타닌 가루",high_raw_leather:"상급 생가죽",high_raw_leather_plus:"상급 생가죽+",top_raw_leather:"최상급 생가죽",top_raw_leather_plus:"최상급 생가죽+",premium_raw_leather:"특급 생가죽"
  };

  const recipeById=new Map(RECIPES.map(recipe=>[recipe.id,recipe]));
  const depthCache=new Map();
  function depthOf(id){
    if(depthCache.has(id))return depthCache.get(id);
    const recipe=recipeById.get(id);
    if(!recipe)return 0;
    const depth=1+Math.max(0,...Object.keys(recipe.ingredients).map(depthOf));
    depthCache.set(id,depth);
    return depth;
  }
  const processingOrder=[...RECIPES].sort((a,b)=>depthOf(b.id)-depthOf(a.id));
  const STORAGE_KEY="mabi_material_calculator_v1";
  let activeCategory="metal";
  let calculationMode="fixed";
  let targets=readTargets();

  const valuePage=document.getElementById("valuePage");
  const materialPage=document.getElementById("materialPage");
  const valuePageBtn=document.getElementById("valuePageBtn");
  const materialPageBtn=document.getElementById("materialPageBtn");
  const categoryTabs=document.getElementById("materialCategoryTabs");
  const targetGrid=document.getElementById("materialTargetGrid");
  const summary=document.getElementById("materialSummary");
  const resultBasis=document.getElementById("materialResultBasis");
  const empty=document.getElementById("materialEmpty");
  const results=document.getElementById("materialResults");
  const rawList=document.getElementById("rawMaterialList");
  const stepBody=document.getElementById("craftStepBody");
  const resetBtn=document.getElementById("materialResetBtn");

  function readTargets(){
    try{
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");
      const clean={};
      RECIPES.forEach(recipe=>{const qty=Math.max(0,Math.floor(Number(saved[recipe.id])||0));if(qty)clean[recipe.id]=qty});
      return clean;
    }catch(error){return {}}
  }
  function saveTargets(){localStorage.setItem(STORAGE_KEY,JSON.stringify(targets))}
  function itemName(id){return (recipeById.get(id)||{}).name||RAW_NAMES[id]||id}
  function formatNumber(value){
    const rounded=Math.round(value*100)/100;
    return Number.isInteger(rounded)?rounded.toLocaleString():rounded.toLocaleString(undefined,{maximumFractionDigits:2});
  }
  function formatDuration(seconds){
    seconds=Math.max(0,Math.round(seconds));
    if(seconds===0)return "0초";
    const days=Math.floor(seconds/86400);seconds-=days*86400;
    const hours=Math.floor(seconds/3600);seconds-=hours*3600;
    const minutes=Math.floor(seconds/60);seconds-=minutes*60;
    return [days&&days+"일",hours&&hours+"시간",minutes&&minutes+"분",seconds&&seconds+"초"].filter(Boolean).join(" ");
  }
  function formatRecipeTime(seconds){
    const hours=Math.floor(seconds/3600);
    const minutes=Math.floor((seconds%3600)/60);
    const rest=seconds%60;
    return [hours&&hours+"시간",minutes&&minutes+"분",rest&&rest+"초"].filter(Boolean).join(" ");
  }

  function calculate(){
    const demand={};
    Object.entries(targets).forEach(([id,qty])=>{if(qty>0)demand[id]=(demand[id]||0)+qty});
    const steps=[];
    let totalSeconds=0;
    let totalCrafts=0;
    processingOrder.forEach(recipe=>{
      const required=demand[recipe.id]||0;
      if(required<=0)return;
      const perCraft=recipe.output+(calculationMode==="expected"?recipe.success:0);
      const crafts=Math.ceil(required/perCraft-1e-10);
      const produced=crafts*perCraft;
      const seconds=crafts*recipe.time;
      steps.push({recipe,required,perCraft,crafts,produced,surplus:Math.max(0,produced-required),seconds});
      totalCrafts+=crafts;
      totalSeconds+=seconds;
      Object.entries(recipe.ingredients).forEach(([ingredient,quantity])=>{
        demand[ingredient]=(demand[ingredient]||0)+quantity*crafts;
      });
    });
    const raw=Object.entries(demand)
      .filter(([id,qty])=>qty>0&&!recipeById.has(id))
      .map(([id,qty])=>({id,name:itemName(id),qty}))
      .sort((a,b)=>b.qty-a.qty||a.name.localeCompare(b.name,"ko"));
    return {steps,raw,totalCrafts,totalSeconds};
  }

  function renderTabs(){
    categoryTabs.innerHTML=Object.entries(CATEGORY_LABELS).map(([id,label])=>
      `<button type="button" class="material-category-tab ${id===activeCategory?"active":""}" data-material-category="${id}" role="tab" aria-selected="${id===activeCategory}">${label}</button>`
    ).join("");
  }
  function renderTargets(){
    targetGrid.innerHTML=RECIPES.filter(recipe=>recipe.category===activeCategory).map(recipe=>
      `<label class="material-target-card">
        <span class="material-target-name">${recipe.name}</span>
        <span class="material-target-meta">Lv.${recipe.level} · ${formatRecipeTime(recipe.time)} · 대성공 ${formatNumber(recipe.success*100)}%</span>
        <span class="material-quantity-control"><input type="number" min="0" step="1" inputmode="numeric" value="${targets[recipe.id]||""}" data-material-target="${recipe.id}" aria-label="${recipe.name} 목표 수량"><b>개</b></span>
      </label>`
    ).join("");
  }
  function renderMode(){
    document.querySelectorAll("[data-material-mode]").forEach(button=>{
      const active=button.dataset.materialMode===calculationMode;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    resultBasis.textContent=calculationMode==="expected"?"대성공 확률을 평균 생산량에 반영 · 제작 횟수 올림":"일반 성공 생산량 기준 · 대성공 미반영";
  }
  function renderResults(){
    const targetEntries=Object.entries(targets).filter(([,qty])=>qty>0);
    const targetQuantity=targetEntries.reduce((sum,[,qty])=>sum+qty,0);
    const result=calculate();
    summary.innerHTML=`
      <div><b>목표 품목</b><strong>${formatNumber(targetEntries.length)}종</strong></div>
      <div><b>목표 수량</b><strong>${formatNumber(targetQuantity)}개</strong></div>
      <div><b>총 제작 횟수</b><strong>${formatNumber(result.totalCrafts)}회</strong></div>
      <div class="time-summary"><b>최종 제작 예상시간</b><strong>${formatDuration(result.totalSeconds)}</strong><small>1개 시설 순차 가공 기준</small></div>`;
    const hasTargets=targetEntries.length>0;
    empty.hidden=hasTargets;
    results.hidden=!hasTargets;
    if(!hasTargets)return;
    rawList.innerHTML=result.raw.map(item=>`<div class="raw-material-item"><span>${item.name}</span><strong>${formatNumber(item.qty)}개</strong></div>`).join("");
    stepBody.innerHTML=result.steps.map(step=>`<tr>
      <td><b>${step.recipe.name}</b><small>${CATEGORY_LABELS[step.recipe.category]} Lv.${step.recipe.level}</small></td>
      <td>${formatNumber(step.required)}개</td>
      <td>${formatNumber(step.perCraft)}개</td>
      <td><strong>${formatNumber(step.crafts)}회</strong></td>
      <td>${formatNumber(step.produced)}개${step.surplus>0?`<small>여유 ${formatNumber(step.surplus)}</small>`:""}</td>
      <td>${formatDuration(step.seconds)}</td>
    </tr>`).join("");
  }
  function renderAll(){renderTabs();renderTargets();renderMode();renderResults()}

  function switchPage(page){
    const material=page==="material";
    valuePage.hidden=material;
    materialPage.hidden=!material;
    valuePageBtn.classList.toggle("active",!material);
    materialPageBtn.classList.toggle("active",material);
    valuePageBtn.setAttribute("aria-selected",String(!material));
    materialPageBtn.setAttribute("aria-selected",String(material));
    if(material)renderAll();
    if(history.replaceState)history.replaceState(null,"",material?"#materials":location.pathname+location.search);
    window.scrollTo({top:0,behavior:"auto"});
  }

  valuePageBtn.addEventListener("click",()=>switchPage("value"));
  materialPageBtn.addEventListener("click",()=>switchPage("material"));
  categoryTabs.addEventListener("click",event=>{
    const button=event.target.closest("[data-material-category]");
    if(!button)return;
    activeCategory=button.dataset.materialCategory;
    renderTabs();renderTargets();
  });
  targetGrid.addEventListener("input",event=>{
    const input=event.target.closest("[data-material-target]");
    if(!input)return;
    const quantity=Math.max(0,Math.floor(Number(input.value)||0));
    if(quantity)targets[input.dataset.materialTarget]=quantity;else delete targets[input.dataset.materialTarget];
    saveTargets();renderResults();
  });
  document.querySelectorAll("[data-material-mode]").forEach(button=>button.addEventListener("click",()=>{
    calculationMode=button.dataset.materialMode;
    renderMode();renderResults();
  }));
  resetBtn.addEventListener("click",()=>{targets={};saveTargets();renderTargets();renderResults()});

  renderAll();
  if(location.hash==="#materials")switchPage("material");
})();
