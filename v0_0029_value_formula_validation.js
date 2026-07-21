const fs=require("fs");
const vm=require("vm");

const context={module:{exports:{}},console};
vm.createContext(context);
vm.runInContext(fs.readFileSync("data.js","utf8")+";this.DB=DB",context);
vm.runInContext(fs.readFileSync("core.js","utf8")+";this.POB=POB",context);
const {DB,POB}=context;
const close=(a,b,tolerance=1e-9)=>Math.abs(a-b)<=tolerance;
const base={selected:{...POB.DEFAULT_SELECTED},compareSelected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},classEnabled:{swordsman:false,greatsword_warrior:false},mode:"raid",focusTags:[],stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}};
const checks=[];
const check=(name,pass,detail)=>checks.push({name,pass:!!pass,detail});

const baseline=POB.normalizedValue(DB,base,base.baseline,"avg");
check("기준 세팅 100.00",close(baseline.valueScore,100),baseline.valueScore);
check("단일 계산 원본",close(baseline.rawScore,baseline.score),`rawScore=${baseline.rawScore}, calc.score=${baseline.score}`);

const allRuneResults=[];
for(const [category,runes] of Object.entries(DB.runes)){
  for(const rune of runes){
    const slot=category==="emblem"?"emblem":category==="weapon"?"weapon":category==="armor"?"head":"auditAccessory";
    const selection={...base.selected,[slot]:rune.id};
    const value=POB.normalizedValue(DB,base,selection,"avg");
    allRuneResults.push({category,id:rune.id,value:value.valueScore,raw:value.rawScore});
  }
}
check("전체 룬 밸류 유한값",allRuneResults.every(row=>Number.isFinite(row.value)&&row.value>0&&Number.isFinite(row.raw)&&row.raw>0),`${allRuneResults.length}개`);

const weaponA=DB.runes.weapon[0].id;
const weaponB=DB.runes.weapon.find(row=>row.id!==weaponA).id;
const currentState={...base,selected:{...base.selected,weapon:weaponA}};
const current=POB.normalizedValue(DB,currentState,currentState.selected,"avg");
const candidate=POB.normalizedValue(DB,currentState,{...currentState.selected,weapon:weaponB},"avg");
const delta=POB.slotValueDelta(DB,currentState,"weapon",weaponB,"avg");
const expectedDelta=(candidate.valueScore/current.valueScore*100)-100;
check("후보 룬 현재 대비 비율",close(delta.baseDiffPct,expectedDelta),`표시=${delta.baseDiffPct}, 역산=${expectedDelta}`);

const reverseState={...base,selected:{...base.selected,weapon:weaponB}};
const reverse=POB.slotValueDelta(DB,reverseState,"weapon",weaponA,"avg");
const roundTrip=(1+delta.baseDiffPct/100)*(1+reverse.baseDiffPct/100);
check("후보 룬 정·역방향 복원",close(roundTrip,1,1e-8),roundTrip);

const compareState={...currentState,compareSelected:{...currentState.selected,weapon:weaponB}};
const comparison=POB.comparisonSummary(DB,compareState,compareState.compareSelected,"avg");
const expectedComparison=(comparison.compare.valueScore/comparison.current.valueScore*100)-100;
check("비교 세팅 현재 대비 비율",close(comparison.valueDiffPct,expectedComparison),`표시=${comparison.valueDiffPct}, 역산=${expectedComparison}`);

const flatRune=DB.runes.weapon.find(row=>Number((row.effects||{}).flatAttack)>0);
const flatState={...base,selected:{...base.selected,weapon:flatRune.id},baseline:{...base.baseline,weapon:flatRune.id}};
const flatBaseline=POB.normalizedValue(DB,flatState,flatState.selected,"avg");
const weightedInputAttack=flatState.stats.attack*POB.VALUE_WEIGHTS.attack;
check("기준 고정 공격력 중복 방지",close(flatBaseline.projectedAttack,weightedInputAttack,1e-6),`표시 공격력=${flatBaseline.projectedAttack}, 기준=${weightedInputAttack}`);
const flatRemoved=POB.normalizedValue(DB,flatState,{...flatState.selected,weapon:""},"avg");
check("고정 공격력 제거 역반영",flatRemoved.projectedAttack<flatBaseline.projectedAttack,`기준=${flatBaseline.projectedAttack}, 제거=${flatRemoved.projectedAttack}`);

const utilityDb=JSON.parse(JSON.stringify(DB));
utilityDb.runes.accessory.push({id:"accessory_value_formula_audit",name:"밸류 수식 검증",effects:{skillSpeedPct:30,cooldownRecoveryPct:30,recoveryPct:30}});
const utility=POB.normalizedValue(utilityDb,base,{...base.selected,auditAccessory:"accessory_value_formula_audit"},"avg");
check("유틸 옵션 기대딜 제외",close(utility.valueScore,100),utility.valueScore);

const resistLow=POB.normalizedValue(DB,{...base,env:{...base.env,magicResistance:0}},base.selected,"avg");
const resistHigh=POB.normalizedValue(DB,{...base,env:{...base.env,magicResistance:10000}},base.selected,"avg");
check("마도저항 밸류점수 비개입",close(resistLow.valueScore,resistHigh.valueScore),`${resistLow.valueScore}/${resistHigh.valueScore}`);

const included=new Set(["attackPct","enemyDamagePct","flatAttack","critChancePct","critDamagePct","strongHitDamagePct","extraHitChancePct","multiHitDamagePct","skillDamagePct","unarmoredDamagePct","targetIncomingDamageIncreasePct","damagePct","castingSkillDamagePct","chargeSkillDamagePct","ultimateDamagePct","ultimateSkillDamagePct","breakSkillDamagePct","resourceConsumingSkillDamagePct","activeSlot3SkillDamagePct","channelingSkillDamagePct","comboDamagePct","breakExtraDamagePct","defensePct"]);
const excluded=new Set(["skillSpeedPct","cooldownRecoveryPct","castingSpeedPct","chargeSpeedPct","attackSpeedPct","ultimateGaugeGainPct","moveSpeedPct","movementSpeedPct","recoveryPct","healingPct","healingReceivedPct","healFlat","basicExtraHitChancePct","basicAttackDamagePct","allSkillCooldownReductionSec","cooldownFlatSec"]);
const effectKeys=new Set();
for(const runes of Object.values(DB.runes))for(const rune of runes)for(const source of [rune.effects,rune.conditionalAlways,rune.nightBlessing,rune.dragonSeal,rune.erosion,rune.killBonus])for(const [key,value] of Object.entries(source||{}))if(typeof value==="number")effectKeys.add(key);
const unknown=[...effectKeys].filter(key=>!included.has(key)&&!excluded.has(key));
check("룬 수치 효과 분류 누락 없음",unknown.length===0,unknown.length?unknown.join(", "):`${effectKeys.size}종 분류`);

const qa=POB.runSelfTest(DB);
check("기존 자체 회귀검수",qa.pass,`${qa.tests.length}개`);
const result={version:"0.0029",pass:checks.every(row=>row.pass),checks};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exit(1);
