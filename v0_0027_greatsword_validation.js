const fs=require("fs");
const vm=require("vm");

const context={module:{exports:{}},console};
vm.createContext(context);
vm.runInContext(fs.readFileSync("data.js","utf8")+";this.DB=DB",context);
vm.runInContext(fs.readFileSync("core.js","utf8")+";this.POB=POB",context);

const {DB,POB}=context;
const warrior=DB.classes.find(row=>row.id==="greatsword_warrior");
const skills=DB.skills.greatsword_warrior;
const byId=id=>skills.find(row=>row.id===id);
const state={
  selected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},
  classEnabled:{swordsman:false,greatsword_warrior:true},mode:"raid",
  stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV,nightTraceLevel:38}
};
const rows=POB.skillDamageRows(DB,state,state.selected,"avg");
const result={
  version:"0.0027",
  checks:[
    ["대검전사 패시브 6개와 시즌 패시브 3개",warrior.passives.filter(p=>!p.common).length===9],
    ["공통 깊어지는 어둠 포함",warrior.passives.filter(p=>p.common).length===1],
    ["대검전사 원본 스킬/폼 16개",skills.length===16],
    ["회전의 각인 19,586×2+39,173",byId("spinning_slash_rotation").damageParts[0].damage===19586&&byId("spinning_slash_rotation").damageParts[0].hits===2&&byId("spinning_slash_rotation").damageParts[1].damage===39173],
    ["반격의 각인 단계 피해",JSON.stringify(byId("rising_smash_counter").damageStages)===JSON.stringify([29530,47911,66293])],
    ["탄력의 각인 단계 피해",JSON.stringify(byId("cleave_elasticity").damageStages)===JSON.stringify([35980,53970,71960])],
    ["대검술 3폼 단계 피해",JSON.stringify(byId("greatsword_earth_sweep").damageStages)===JSON.stringify([40477,58467,76457])&&JSON.stringify(byId("greatsword_heart_pierce").damageStages)===JSON.stringify([40477,58467,76457])&&JSON.stringify(byId("greatsword_wind_cleave").damageStages)===JSON.stringify([71960,98945,125930])],
    ["필사의 일격 198,789",byId("desperate_strike").damage===198789],
    ["차지 단계 분리 26행",rows.length===26],
    ["모든 예상 피해 유한 양수",rows.every(row=>Number.isFinite(row.noCrit)&&row.noCrit>0&&Number.isFinite(row.crit)&&row.crit>=row.noCrit)],
    ["깊어지는 어둠 Lv.38 +3.8%",Math.abs(POB.formulaV2Context(DB,state,state.selected,"avg").calc.finalDamage-3.8)<1e-9],
    ["깊어지는 어둠 150레벨 상한",Math.abs(POB.formulaV2Context(DB,{...state,env:{...state.env,nightTraceLevel:999}},state.selected,"avg").calc.finalDamage-15)<1e-9],
    ["자체 회귀검수",POB.runSelfTest(DB).pass]
  ].map(([name,pass])=>({name,pass}))
};
result.pass=result.checks.every(row=>row.pass);
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exit(1);
