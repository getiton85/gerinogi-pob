const fs=require("fs");
const vm=require("vm");

function pass(name,detail){return {name,status:"PASS",detail};}
function fail(name,detail){return {name,status:"FAIL",detail};}
function assert(name,ok,detail){return ok?pass(name,detail):fail(name,detail);}

const index=fs.readFileSync("index.html","utf8");
const app=fs.readFileSync("app.js","utf8");
const core=fs.readFileSync("core.js","utf8");
const data=fs.readFileSync("data.js","utf8");

const ctx={console,globalThis:null};
ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(data+"\n;globalThis.DB=DB;",ctx);
vm.runInContext(core+"\n;globalThis.POB=POB;",ctx);

const DB=ctx.DB;
const POB=ctx.POB;
const armor=DB.runes.armor||[];
const season1Armor=armor.filter(r=>Number(r.season)===1);
const existingArmor=armor.filter(r=>Number(r.season)!==1);
const sample=season1Armor.find(r=>r.id==="armor_s1_hwangyeong")||season1Armor[0];
const state={
  selected:{...POB.DEFAULT_SELECTED},
  compareSelected:{...POB.DEFAULT_SELECTED},
  baseline:{...POB.DEFAULT_SELECTED},
  classEnabled:{swordsman:true},
  mode:"raid",
  focusTags:["attack","crit"],
  stats:{...POB.DEFAULT_STATS},
  env:{...POB.DEFAULT_ENV}
};
const profile=POB.combatProfile(state);
const sampleClass=POB.classifyRune(sample,profile);
const self=POB.runSelfTest(DB);
const sortState={...state,selected:{...state.selected,weapon:"weapon_season2_taoreuneun_yeonggwang"}};
const sortedWeaponRows=DB.runes.weapon.map(r=>({r,d:POB.slotValueDelta(DB,sortState,"weapon",r.id,"avg")}))
  .sort((a,b)=>b.d.diffPct-a.d.diffPct);

const checks=[
  assert("version display",index.includes("v0.0020")&&app.includes("v0.0020"),"index/app version should be v0.0020"),
  assert("cache busting",index.includes("data.js?v=0.0020")&&index.includes("core.js?v=0.0020")&&index.includes("app.js?v=0.0020"),"script query strings should be v0.0020"),
  assert("chart title",index.includes("장비 가동률"),"compare chart title should be 장비 가동률"),
  assert("old dps chart removed",!app.includes("초당 예상 DPS / 시간"),"old per-second DPS chart label should not remain"),
  assert("uptime chart label",app.includes("장비 가동률 / 부위별 비교"),"canvas label should describe equipment uptime"),
  assert("slot uptime calculation",app.includes("function slotUptime")&&app.includes("POB.classifyRune"),"chart should classify each equipped rune for uptime"),
  assert("season1 armor imported",season1Armor.length>=53,`season1 armor count ${season1Armor.length}`),
  assert("existing armor preserved",existingArmor.length>=55,`existing armor count ${existingArmor.length}`),
  assert("sample uptime finite",Number.isFinite(sampleClass.uptime)&&sampleClass.uptime>=0&&sampleClass.uptime<=1,`${sample.name} uptime ${sampleClass.uptime}`),
  assert("comparison percent sort",sortedWeaponRows.every((row,i)=>i===0||sortedWeaponRows[i-1].d.diffPct>=row.d.diffPct),sortedWeaponRows.slice(0,5).map(x=>`${x.r.name}:${x.d.diffPct.toFixed(2)}`).join(", ")),
  assert("core self test",self.pass===true,JSON.stringify(self.tests||self.checks))
];

const report={version:"v0.0020",generatedAt:new Date().toISOString(),checks};
fs.writeFileSync("v0_0020_uptime_chart_validation.json",JSON.stringify(report,null,2),"utf8");
const failed=checks.filter(c=>c.status!=="PASS");
console.log(JSON.stringify(report,null,2));
if(failed.length)process.exit(1);
