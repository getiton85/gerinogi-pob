const POB = (() => {
const SLOT_CAT={emblem:"emblem",weapon:"weapon",head:"armor",top:"armor",bottom:"armor",gloves:"armor",shoes:"armor"};
const DEFAULT_SELECTED={emblem:"",weapon:"",head:"",top:"",bottom:"",gloves:"",shoes:""};
const DEFAULT_STATS={attack:57582,defense:18542,breakPower:2914,strongStat:4957,comboStat:1532,skillPower:2729,areaPower:1412,recoveryPower:2468,weakpointDodge:1358,extraStat:2797,damageReduce:2998,fastAttack:2047,multiStat:1681,fastSkill:1757,extraHp:27183,ultimatePower:1366,critStat:8649,critDamageBase:300};
const DEFAULT_ENV={skillCycle:2.5,basicDelay:0.35,abyssKills:20,raidKills:0,unarmoredUptime:0.5,nightBlessingUptime:0.25,focusUptime:0.5,nightTraceLevel:45,galeStacksMax:5,ultimateCycleSec:75,breakExtensionMultiplier:2,gemLines:0};

const VALUE_WEIGHTS={
  attack:1.08,
  critChance:1.18,
  extraChance:1.15,
  critDamage:1.12
};

const NON_DAMAGE_VALUE_EFFECT_KEYS=new Set([
  "attackSpeedPct",
  "skillSpeedPct",
  "castingSpeedPct",
  "chargeSpeedPct",
  "cooldownRecoveryPct",
  "allSkillCooldownReductionSec",
  "recoveryPct",
  "healingReceivedPct",
  "healFlat"
]);

function n(v){return Number(v)||0}
function allRunes(db){return Object.values(db.runes).flat()}
function runeById(db,id){return allRunes(db).find(r=>r.id===id)}
function selectedRunes(db,sel){return Object.values(sel).map(id=>runeById(db,id)).filter(Boolean)}
function add(e,k,v){if(typeof v==="number" && Number.isFinite(v))e[k]=(e[k]||0)+v}
function merge(a,b){const o={...a};for(const[k,v]of Object.entries(b||{}))add(o,k,n(v));return o}

function statePreset(state,kind){
  if(kind==="min")return{name:"최소",erosion:0,dragon:0,night:0,gale:0,nightTrace:0};
  if(kind==="max")return{name:"최대",erosion:100,dragon:1,night:1,gale:n(state.env.galeStacksMax),nightTrace:n(state.env.nightTraceLevel)};
  return{name:"평균",erosion:0,dragon:.5,night:Math.max(0,Math.min(1,n(state.env.nightBlessingUptime))),gale:n(state.env.galeStacksMax)*.5,nightTrace:n(state.env.nightTraceLevel)*.5};
}

function derivedStats(state){
  const s=state.stats||{};
  return {
    critBase:n(s.critStat)*(46/7321),
    extraBase:n(s.extraStat)*(32.5/1469),
    strongBase:n(s.strongStat)*(31/4783),
    multiBase:n(s.multiStat)*(9/1507),
    breakPct:n(s.breakPower)*(3.4/2914),
    comboPct:n(s.comboStat)*(3/1532),
    skillPowerPct:n(s.skillPower)*(3.8/2729),
    areaPowerPct:n(s.areaPower)*(7.5/1412),
    recoveryPct:n(s.recoveryPower)*(4/2468),
    weakpointDodgePct:n(s.weakpointDodge)*(1/1358),
    damageReducePct:n(s.damageReduce)*(3.3/2998),
    fastAttackPct:n(s.fastAttack)*(5.3/2047),
    fastSkillPct:n(s.fastSkill)*(5.9/1757),
    extraHpPct:n(s.extraHp)*(1/27183),
    ultimatePowerPct:n(s.ultimatePower)*(1/1366)};
}

function classEffects(db,state,preset){
  const e={};let directDps=0;
  if(!state.classEnabled.swordsman)return{effects:e,directDps};
  for(const p of db.classes[0].passives){
    for(const[k,v]of Object.entries(p.effects||{})){
      let key=k,val=n(v);
      if(p.id==="rising_gale"&&k==="galePostureDamagePerStackPct"){key="galePostureDamagePct";val=n(v)*preset.gale}
      if(p.id==="deepening_darkness"&&k==="nightTraceFinalDamage"){key="finalDamagePct";val=preset.nightTrace*(1.7/45)}
      add(e,key,val);
    }
    directDps+=n(p.directDps);
  }
  return{effects:e,directDps};
}

function runeEffects(db,state,runes,preset){
  const e={};let directDps=0;
  for(const r of runes){
    for(const[k,v]of Object.entries(r.effects||{}))add(e,k,n(v));
    for(const[k,v]of Object.entries(r.conditionalAlways||{}))add(e,k,n(v));
    if(r.directDps)directDps+=n(r.directDps);
    if(r.periodicDps)directDps+=n(r.periodicDps);
    if(r.directDamage){
      const intv=r.directDamage.intervalFormula==="skill_plus_basic"?n(state.env.skillCycle)+n(state.env.basicDelay):5;
      directDps+=n(r.directDamage.damage)/Math.max(.1,intv);
    }
    if(r.killBonus){
      const kills=state.mode==="abyss"?n(state.env.abyssKills):n(state.env.raidKills);
      if(kills>=20||state.mode==="abyss")for(const[k,v]of Object.entries(r.killBonus))add(e,k,n(v));
    }
    if(r.nightBlessing)for(const[k,v]of Object.entries(r.nightBlessing))add(e,k,n(v)*preset.night);
    if(r.dragonSeal)for(const[k,v]of Object.entries(r.dragonSeal))add(e,k,n(v)*preset.dragon);
    if(r.erosion&&preset.erosion>=100)for(const[k,v]of Object.entries(r.erosion))add(e,k,n(v));
  }
  return{effects:e,directDps};
}

function calc(db,state,sel=state.selected,kind="avg"){
  const preset=statePreset(state,kind);
  const rCur=runeEffects(db,state,selectedRunes(db,sel),preset);
  const cEff=classEffects(db,state,preset);
  const effects=merge(rCur.effects,cEff.effects);
  const directDps=rCur.directDps+cEff.directDps;
  const baseRune=runeEffects(db,state,selectedRunes(db,state.baseline),preset).effects;
  const attackDiff=n(rCur.effects.attackPct)-n(baseRune.attackPct);
  const base=derivedStats(state);

  const projectedAttack=(n(state.stats.attack)+n(effects.flatAttack))*(1+attackDiff/100)*(1+n(cEff.effects.attackPct)/100)*VALUE_WEIGHTS.attack;
  const defense=n(state.stats.defense);
  const critChance=Math.min(100,n(base.critBase)+n(effects.critChancePct));
  const extraChance=Math.min(100,n(base.extraBase)+n(effects.extraHitChancePct));
  const critDamage=n(state.stats.critDamageBase)+n(effects.critDamagePct);
  const strongDamage=n(base.strongBase)+n(effects.strongHitDamagePct);
  const multiDamage=n(base.multiBase)+n(effects.multiHitDamagePct);

  const enemyDamage=n(effects.enemyDamagePct)+n(effects.targetIncomingDamageIncreasePct)+n(effects.damagePct);
  const unarmored=n(effects.unarmoredDamagePct)*n(state.env.unarmoredUptime);
  const gemDamage=gemDamagePct(state);
  const finalDamage=n(effects.finalDamagePct);
  const galeDamage=n(effects.galePostureDamagePct);
  const skillDamage=n(effects.skillDamagePct)+n(effects.ultimateSkillDamagePct)+n(effects.castingSkillDamagePct)+n(effects.chargeSkillDamagePct)+n(effects.channelingSkillDamagePct)+n(effects.breakSkillDamagePct)+n(effects.resourceConsumingSkillDamagePct)+n(effects.activeSlot3SkillDamagePct);
  const speedBonus=n(effects.attackSpeedPct)+n(effects.skillSpeedPct)+n(effects.castingSpeedPct)+n(effects.chargeSpeedPct)+n(effects.cooldownRecoveryPct)+n(base.fastAttackPct)*0.10+n(base.fastSkillPct)*0.10;
  const utilityBonus=n(base.breakPct)*0.03+n(base.comboPct)*0.02+n(base.skillPowerPct)*0.04+n(base.areaPowerPct)*0.02+n(base.ultimatePowerPct)*0.03;
  const survivalBonus=n(base.damageReducePct)*0.015+n(base.extraHpPct)*0.01+n(base.weakpointDodgePct)*0.01;

  const amp=(1+enemyDamage/100)*(1+unarmored/100)*(1+gemDamage/100)*(1+finalDamage/100)*(1+galeDamage/100)*(1+skillDamage/300)*(1+utilityBonus/100)*(1+survivalBonus/100);
  const critEV=1+((critChance*VALUE_WEIGHTS.critChance)/100)*((critDamage*VALUE_WEIGHTS.critDamage)/100-1);
  const extraEV=1+((extraChance*VALUE_WEIGHTS.extraChance)/100)*0.55;
  const strongEV=1+(strongDamage/100)*0.35;
  const multiEV=1+(multiDamage/100)*0.25;
  const score=projectedAttack*amp*critEV*extraEV*strongEV*multiEV+directDps;

  return {
    preset,effects,base,projectedAttack,defense,
    critChance,extraChance,critDamage,strongDamage,multiDamage,
    enemyDamage,unarmored,finalDamage,galeDamage,skillDamage,speedBonus,gemDamagePct:gemDamage,
    breakPct:base.breakPct,comboPct:base.comboPct,skillPowerPct:base.skillPowerPct,areaPowerPct:base.areaPowerPct,
    recoveryPct:base.recoveryPct,weakpointDodgePct:base.weakpointDodgePct,damageReducePct:base.damageReducePct,
    fastAttackPct:base.fastAttackPct,fastSkillPct:base.fastSkillPct,extraHpPct:base.extraHpPct,ultimatePowerPct:base.ultimatePowerPct,
    utilityBonus,survivalBonus,directDps,score,valueWeights:VALUE_WEIGHTS
  };
}



function expectedDamageScore(db,state,sel=state.selected,kind="avg"){
  const c=calc(db,state,sel,kind);
  const s=state.stats||DEFAULT_STATS;
  const d=derivedStats({...state,stats:s});
  const e=c.effects||{};

  const attackBase=Math.max(1,n(s.attack)||1);
  const attackFlat=n(e.attackFlat);
  const attackPct=n(e.attackPct);
  const attackAxis=(attackBase+attackFlat)*(1+attackPct/100);

  const generalPct =
    n(e.damageToEnemyPct)+n(e.enemyDamagePct)+n(e.targetIncomingDamageIncreasePct)+n(e.damagePct)+
    n(e.unarmoredDamagePct)*n(state.env.unarmoredUptime)+n(e.finalDamagePct)+n(e.galePostureDamagePct)+
    n(e.skillDamagePct)+n(e.basicDamagePct)+n(e.basicAttackDamagePct)+
    n(e.braveDamagePct)+n(e.vulnerableDamagePct)+n(e.unshieldedDamagePct)+
    n(e.defenseBreakDamagePct)+n(e.dotDamagePct)+n(e.breakSkillDamagePct)+
    n(e.channelingDamagePct)+n(e.channelingSkillDamagePct)+n(e.castingSkillDamagePct)+
    n(e.chargeSkillDamagePct)+n(e.resourceConsumingSkillDamagePct)+
    n(e.activeSlot3SkillDamagePct)+n(e.ultimateSkillDamagePct);

  const tagPct =
    n(e.strongDamagePct)+n(e.strongHitDamagePct)+
    n(e.multiDamagePct)+n(e.multiHitDamagePct)+
    n(e.finalStrongDamagePct)+n(e.finalMultiDamagePct)+
    n(e.ultimateDamagePct)+n(e.ultimateSkillDamagePct);

  const utilityPct =
    n(d.breakPct)*0.35+n(d.skillPowerPct)*0.75+n(d.areaPowerPct)*0.30+
    n(d.ultimatePowerPct)*0.25;

  const damageAxis=(1+generalPct/100)*(1+gemDamagePct(state)/100)*(1+tagPct/100)*(1+utilityPct/100);

  const critChance=Math.min(100,Math.max(0,n(c.critChance)));
  const critDamage=Math.max(100,n(c.critDamage)||300);
  const critAxis=1+(critChance/100)*((critDamage/100)-1);

  const extraChance=Math.min(100,Math.max(0,n(c.extraChance)));
  const extraAxis=1+extraChance/100;

  const cyclePct=0;
  const cycleAxis=1;

  const directAxis=1+Math.min(0.35,Math.max(0,n(c.directDps))/(attackBase*8));
  const survivalAxis=1+(n(d.damageReducePct)*0.05+n(d.extraHpPct)*0.02+n(d.weakpointDodgePct)*0.02)/100;

  const score=attackAxis*damageAxis*critAxis*extraAxis*cycleAxis*directAxis*survivalAxis;
  return {
    score,
    axes:{attackAxis,damageAxis,critAxis,extraAxis,cycleAxis,directAxis,survivalAxis,generalPct,tagPct,utilityPct,critChance,critDamage,extraChance},
    calc:c
  };
}

function combatProfile(state){
  const mode=state&&state.mode==="abyss"?"abyss":"raid";
  const durationSec=mode==="abyss"?60:300;
  const windowSec=60;
  const downtimeSec=10;
  const windows=Math.max(1,Math.ceil(durationSec/windowSec));
  const activeSec=Math.max(1,durationSec-downtimeSec*windows);
  return {
    mode,
    label:mode==="abyss"?"어비스 1분":"레이드 5분",
    durationSec,
    windowSec,
    downtimeSec,
    windows,
    activeSec
  };
}

function combatDurationSec(state){
  return combatProfile(state).durationSec;
}

function combatModeLabel(state){
  return combatProfile(state).label;
}

function rawValuesByKey(obj,key,out=[]){
  if(!obj||typeof obj!=="object")return out;
  for(const [k,v] of Object.entries(obj)){
    if(k===key)out.push(v);
    if(v&&typeof v==="object")rawValuesByKey(v,key,out);
  }
  return out;
}

function rawNumbersByKey(obj,key){
  return rawValuesByKey(obj,key,[]).map(n).filter(v=>Number.isFinite(v)&&v>0);
}

function hintText(rune){
  const raw=rune&&rune.rawOption?rune.rawOption:{};
  return String(raw.expectedUptimeHint||raw.uptimeRisk||"").toLowerCase();
}

function runeCombatFactor(rune,profile){
  const raw=rune&&rune.rawOption?rune.rawOption:{};
  const hint=hintText(rune);
  let factor=1;

  if(hint.includes("position"))factor*=0.55;
  if(hint.includes("content"))factor*=0.70;
  if(hint.includes("resource")||hint.includes("lowhp")||hint.includes("damagetaken"))factor*=0.65;
  if(hint.includes("classdependent")||hint.includes("allyheal"))factor*=0.75;
  if(hint.includes("breakwindow"))factor*=0.78;
  if(hint.includes("cycle")||hint.includes("frequency"))factor*=0.82;
  if(hint.includes("erosion"))factor*=0.86;
  if(hint.includes("dragonmark"))factor*=0.88;
  if(hint.includes("rampup")||hint.includes("contamination"))factor*=0.80;

  const cooldowns=rawNumbersByKey(raw,"cooldownSec");
  const durations=rawNumbersByKey(raw,"durationSec");
  if(cooldowns.length&&durations.length){
    const cooldown=Math.max(...cooldowns);
    const duration=Math.max(...durations);
    if(cooldown>=30){
      const casts=Math.max(1,Math.floor((profile.durationSec-1)/cooldown)+1);
      const uptime=Math.min(profile.activeSec,casts*duration)/profile.activeSec;
      factor*=clamp(0.45+uptime*0.55,0.45,1);
    }
  }

  return clamp(factor,0.25,1);
}

function selectionCombatFactor(db,sel,profile){
  const selected=selectedRunes(db,sel);
  const factors=selected.map(r=>runeCombatFactor(r,profile)).filter(v=>v<0.995);
  if(!factors.length)return 1;
  const product=factors.reduce((acc,v)=>acc*v,1);
  return clamp(Math.pow(product,1/factors.length),0.35,1);
}

function combatDpsSummary(db,state,sel=state.selected,kind="avg"){
  const current=expectedDamageScore(db,state,sel,kind);
  const baseline=expectedDamageScore(db,state,state.baseline,kind);
  const profile=combatProfile(state);
  const baselineDps=baseline.score||1;
  const rawDelta=current.score-baselineDps;
  const reliability=selectionCombatFactor(db,sel,profile);
  const adjustedDps=baselineDps+rawDelta*reliability;
  const baselineTotal=baselineDps*profile.activeSec;
  const total=adjustedDps*profile.activeSec;
  const diffPct=baselineTotal>0 ? (total/baselineTotal*100)-100 : 0;
  return {
    mode:profile.mode,
    label:profile.label,
    durationSec:profile.durationSec,
    activeSec:profile.activeSec,
    downtimeSec:profile.downtimeSec*profile.windows,
    windows:profile.windows,
    reliability,
    dpsScore:current.score,
    adjustedDpsScore:adjustedDps,
    totalScore:total,
    baselineDpsScore:baselineDps,
    baselineTotalScore:baselineTotal,
    diffPct
  };
}


function normalizedValue(db,state,sel=state.selected,kind="avg"){
  const rawExpected = expectedDamageScore(db,state,sel,kind);
  const baseExpected = expectedDamageScore(db,state,state.baseline,kind);
  const raw = rawExpected.calc;
  const baseScore = baseExpected.score || 1;
  const value = baseScore > 0 ? (rawExpected.score / baseScore) * 100 : 100;
  const combat=combatDpsSummary(db,state,sel,kind);
  const combatValue=combat.baselineDpsScore>0 ? (combat.adjustedDpsScore/combat.baselineDpsScore)*100 : 100;
  return {...raw, rawScore: rawExpected.score, baselineRawScore: baseScore, valueScore: combatValue, rawValueScore: value, diffPct: combatValue - 100, rawDiffPct: value - 100, expectedAxes: rawExpected.axes, combat};
}

function clamp(v,min,max){return Math.max(min,Math.min(max,n(v)))}
function gemDamagePct(state){return clamp(state&&state.env?state.env.gemLines:0,0,3)*22*2.2}
function factorPct(v){return 1+n(v)/100}
function totalSkillDamage(skill){
  if(!skill)return 0;
  if(Array.isArray(skill.damageParts))return skill.damageParts.reduce((sum,p)=>sum+n(p.damage)*Math.max(1,n(p.hits)||1),0);
  return n(skill.damage);
}
function skillCooldownSec(skill,state){
  if(!skill)return 1;
  if(skill.id==="ultimate_flash")return Math.max(1,n(state.env.ultimateCycleSec)||75);
  let cd=n(skill.cooldownSec)||10;
  const focus=clamp(state.env.focusUptime,0,1);
  if(skill.focusCooldownSec)cd=cd*(1-focus)+n(skill.focusCooldownSec)*focus;
  return Math.max(0.5,cd);
}
function skillTagMultiplier(skill,ctx){
  const tags=new Set(skill.tags||[]);
  let m=1;
  if(tags.has("강타"))m*=factorPct(ctx.strongDamage);
  if(tags.has("연타"))m*=factorPct(ctx.multiDamage);
  if(tags.has("광역"))m*=factorPct(ctx.areaDamage);
  if(tags.has("궁극기"))m*=factorPct(ctx.ultimateDamage);
  if(tags.has("비검"))m*=factorPct(ctx.flyingSwordDamage);
  if(tags.has("스킬"))m*=factorPct(ctx.skillDamage);
  return m;
}
function formulaV2Context(db,state,sel=state.selected,kind="avg"){
  const c=normalizedValue(db,state,sel,kind);
  const e=c.effects||{};
  const d=c.base||derivedStats(state);
  const critRate=clamp(c.critChance,0,100)/100;
  const critMultiplier=Math.max(1,n(c.critDamage)/100);
  return {
    calc:c,
    attackA:c.projectedAttack,
    attackBoostB:1+n(e.attackPct)/100,
    damageC:factorPct(c.enemyDamage),
    tagD:1,
    gemE:factorPct(c.gemDamagePct),
    critExpectedF:1+critRate*(critMultiplier-1),
    critMultiplier,
    breakG:factorPct(c.breakPct+n(c.unarmored)),
    breakExtensionG:factorPct(c.breakPct+(n(c.unarmored)*Math.max(1,n(state.env.breakExtensionMultiplier)||2))),
    skillH:factorPct(c.skillDamage),
    defenseI:1,
    counterJ:1,
    extraK:1+clamp(c.extraChance,0,100)/100,
    finalL:factorPct(c.finalDamage),
    strongDamage:c.strongDamage,
    multiDamage:c.multiDamage,
    areaDamage:n(d.areaPowerPct),
    ultimateDamage:n(d.ultimatePowerPct)+n(e.ultimateDamagePct)+n(e.ultimateSkillDamagePct),
    flyingSwordDamage:n(e.flyingSwordDamagePct),
    skillDamage:c.skillDamage
  };
}
function skillDamageRows(db,state,sel=state.selected,kind="avg"){
  const skills=(((db.skills||{}).swordsman)||[]);
  const ctx=formulaV2Context(db,state,sel,kind);
  const common=ctx.damageC*ctx.gemE*ctx.skillH*ctx.finalL;
  return skills.map(skill=>{
    const base=totalSkillDamage(skill);
    const tag=skillTagMultiplier(skill,ctx);
    const noCrit=base*common*tag;
    const crit=noCrit*ctx.critMultiplier;
    const breakDamage=noCrit*ctx.breakG;
    const breakExtension=crit*ctx.breakExtensionG;
    const cooldown=skillCooldownSec(skill,state);
    return {id:skill.id,name:skill.name,form:skill.form||"",tags:skill.tags||[],baseDamage:base,noCrit,crit,breakDamage,breakExtension,cooldownSec:cooldown,damagePerMinute:noCrit*(60/cooldown),source:skill.source||"tooltip"};
  });
}

function validate(db){
  const ids=new Set(),dup=[];
  for(const r of allRunes(db)){if(ids.has(r.id))dup.push(r.id);ids.add(r.id)}
  const counts={emblem:db.runes.emblem.length,weapon:db.runes.weapon.length,armor:db.runes.armor.length,accessory:db.runes.accessory.length};
  const required=[...Object.values(DEFAULT_SELECTED)].filter(Boolean);
  const missing=required.filter(id=>!ids.has(id));
  const result=[];
  result.push({name:"DB 중복 ID",pass:dup.length===0,detail:dup.length?dup.join(", "):"없음"});
  result.push({name:"엠블럼 9개",pass:counts.emblem===9,detail:`${counts.emblem}개`});
  result.push({name:"무기 17개",pass:counts.weapon===17,detail:`${counts.weapon}개`});
  result.push({name:"방어구 55개",pass:counts.armor===55,detail:`${counts.armor}개`});
  result.push({name:"기본 장착 비움",pass:required.length===0,detail:required.length?required.join(", "):"무장착"});
  return{counts,dup,missing,result};
}

function runSelfTest(db){
  const state={selected:{...DEFAULT_SELECTED},baseline:{...DEFAULT_SELECTED},classEnabled:{swordsman:false},mode:"raid",stats:{...DEFAULT_STATS},env:{...DEFAULT_ENV}};
  const val=validate(db);
  state.classEnabled.swordsman=true;
  const c1=calc(db,state,state.selected,"avg");
  state.classEnabled.swordsman=false;
  const c2=calc(db,state,state.selected,"avg");
  state.classEnabled.swordsman=true;
  const modeSel={...state.selected,head:"armor_conqueror"};
  state.mode="raid";
  const cRaid=calc(db,state,modeSel,"avg");
  state.mode="abyss";
  const cAbyss=calc(db,state,modeSel,"avg");
  const raidCombat=combatDpsSummary(db,{...state,mode:"raid"},state.selected,"avg");
  const abyssCombat=combatDpsSummary(db,{...state,mode:"abyss"},state.selected,"avg");
  const changed={...state,stats:{...state.stats,critStat:state.stats.critStat+1000,extraStat:state.stats.extraStat+100}};
  const cChanged=calc(db,changed,changed.selected,"avg");
  const utilityDb=JSON.parse(JSON.stringify(db));
  utilityDb.runes.accessory=[{id:"accessory_utility_value_audit",name:"Utility Value Audit",tag:"audit",effects:{attackSpeedPct:25,skillSpeedPct:25,castingSpeedPct:25,chargeSpeedPct:25,cooldownRecoveryPct:25,recoveryPct:25}}];
  const utilityBase=normalizedValue(utilityDb,state,state.baseline,"avg").valueScore;
  const utilitySelected=normalizedValue(utilityDb,state,{...state.baseline,necklace:"accessory_utility_value_audit"},"avg").valueScore;
  const skillRows=skillDamageRows(db,state,state.selected,"avg");
  const nightAvg=normalizedValue(db,state,{...state.selected,emblem:"emblem_gogyeol"},"avg").preset.night;
  const tests=[
    ...val.result,
    {name:"평균 점수 산출",pass:Number.isFinite(c1.score)&&c1.score>0,detail:Math.round(c1.score).toLocaleString()},
    {name:"패시브 ON/OFF 반응",pass:c1.score!==c2.score,detail:`ON ${Math.round(c1.score)} / OFF ${Math.round(c2.score)}`},
    {name:"어비스/레이드 모드 반응",pass:cRaid.score!==cAbyss.score,detail:`레이드 ${Math.round(cRaid.score)} / 어비스 ${Math.round(cAbyss.score)}`},
    {name:"레이드 5분 / 어비스 1분 전투시간 반영",pass:raidCombat.durationSec===300&&abyssCombat.durationSec===60,detail:`${raidCombat.label} ${raidCombat.durationSec}초 / ${abyssCombat.label} ${abyssCombat.durationSec}초`},
    {name:"직접DPS 산출",pass:Number.isFinite(c1.directDps)&&c1.directDps>=0,detail:Math.round(c1.directDps).toLocaleString()},
    {name:"두 번째 스탯창 대시보드 반영",pass:cChanged.score!==c1.score,detail:`기준 ${Math.round(c1.score)} / 변경 ${Math.round(cChanged.score)}`},{name:"밸류점수 100 기준 정규화",pass:Math.abs(normalizedValue(db,state,state.baseline,"avg").valueScore-100)<0.0001,detail:"기준 세팅 100.00"},{name:"고밸류 스탯 보정 적용",pass:VALUE_WEIGHTS.critChance>1&&VALUE_WEIGHTS.extraChance>1&&VALUE_WEIGHTS.critDamage>1&&VALUE_WEIGHTS.attack>1,detail:`공격 ${VALUE_WEIGHTS.attack} / 치명 ${VALUE_WEIGHTS.critChance} / 추가타 ${VALUE_WEIGHTS.extraChance} / 치피 ${VALUE_WEIGHTS.critDamage}`},{name:"속도/쿨감/회복 직접 밸류 제외",pass:Math.abs(utilitySelected-utilityBase)<0.0001,detail:`기준 ${utilityBase.toFixed(2)} / 유틸 ${utilitySelected.toFixed(2)}`},{name:"밤의 축복 평균 유지율 25%",pass:Math.abs(nightAvg-0.25)<0.0001,detail:`평균 ${nightAvg}`},{name:"스킬 예상 데미지 산출",pass:skillRows.length>=9&&skillRows.every(r=>Number.isFinite(r.noCrit)&&r.noCrit>0&&Number.isFinite(r.crit)&&r.crit>=r.noCrit),detail:`${skillRows.length}개 스킬`}
  ];
  return{counts:val.counts,tests,pass:tests.every(t=>t.pass)};
}

return{SLOT_CAT,DEFAULT_SELECTED,DEFAULT_STATS,DEFAULT_ENV,VALUE_WEIGHTS,NON_DAMAGE_VALUE_EFFECT_KEYS,derivedStats,allRunes,runeById,selectedRunes,calc,normalizedValue,combatProfile,combatDurationSec,combatDpsSummary,formulaV2Context,skillDamageRows,gemDamagePct,validate,runSelfTest};
})();
if(typeof module!=="undefined") module.exports = POB;
