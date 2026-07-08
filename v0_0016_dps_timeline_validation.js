const fs=require("fs");
const path=require("path");
const vm=require("vm");

const codeData=fs.readFileSync(path.join(__dirname,"data.js"),"utf8")+"\n;globalThis.DB=DB;";
const codeCore=fs.readFileSync(path.join(__dirname,"core.js"),"utf8")+"\n;globalThis.POB=POB;";
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(codeData,ctx);
vm.runInContext(codeCore,ctx);
const DB=ctx.DB;
const POB=ctx.POB;

function assert(name,pass,detail){
  return {name,pass:!!pass,detail:String(detail||"")};
}

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

const weaponCandidate=DB.runes.weapon.find(r=>r.season===1)||DB.runes.weapon[0];
const emblemCandidate=DB.runes.emblem.find(r=>r.season===0)||DB.runes.emblem[0];
state.compareSelected.weapon=weaponCandidate.id;
state.compareSelected.emblem=emblemCandidate.id;

const summary=POB.comparisonSummary(DB,state,state.compareSelected,"avg");
const timeline=POB.expectedDamageTimeline(summary);
const index=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
const app=fs.readFileSync(path.join(__dirname,"app.js"),"utf8");

const allPoints=timeline.current.concat(timeline.compare);
const dpsValues=allPoints.map(p=>p.dps);
const damageValues=allPoints.map(p=>p.damage);

const tests=[
  assert("version marker",index.includes("v=0.0018")&&app.includes("v0.0018"),"cache and visible version are v0.0018"),
  assert("chart title",index.includes("초당 예상 DPS"),"chart title is DPS-based"),
  assert("chart uses dps axis",app.includes("maxDps")&&app.includes("n(p.dps)/maxDps")&&!app.includes("n(p.damage)/maxDamage"),"canvas plots per-second expected DPS"),
  assert("chart keeps two curves",app.includes("현재 장착 곡선")&&app.includes("비교추가 곡선"),"current and comparison legends exist"),
  assert("timeline exports dps",allPoints.length>=20&&dpsValues.every(Number.isFinite),"timeline points contain finite dps"),
  assert("timeline keeps cumulative damage for summary",damageValues.every(Number.isFinite)&&damageValues.some(v=>v>0),"damage remains available"),
  assert("raid duration",timeline.durationSec===300,"duration "+timeline.durationSec),
  assert("season labels",POB.runeSeasonLabel(weaponCandidate).startsWith("시즌")&&POB.runeSeasonLabel(emblemCandidate).startsWith("시즌"),`${POB.runeSeasonLabel(weaponCandidate)} / ${POB.runeSeasonLabel(emblemCandidate)}`)
];

const report={pass:tests.every(t=>t.pass),tests};
fs.writeFileSync(path.join(__dirname,"v0_0016_dps_timeline_validation_report.json"),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
process.exit(report.pass?0:1);
