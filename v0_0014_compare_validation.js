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
  return {name,pass:!!pass,detail:String(detail)};
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

state.compareSelected.weapon=DB.runes.weapon[0]&&DB.runes.weapon[0].id||"";
state.compareSelected.emblem=DB.runes.emblem[0]&&DB.runes.emblem[0].id||"";

const summary=POB.comparisonSummary(DB,state,state.compareSelected,"avg");
const currentCurve=POB.diminishingPoints(summary.current);
const compareClass=POB.classifySelection(DB,state.compareSelected,state);
const index=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
const app=fs.readFileSync(path.join(__dirname,"app.js"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"style.css"),"utf8");

const tests=[
  assert("version marker",index.includes("v=0.0014")&&app.includes("v0.0014"),"cache and visible version are v0.0014"),
  assert("compare ui mounted",index.includes("compareSlots")&&index.includes("compareChart")&&index.includes("copyCompareBtn"),"compare panel ids exist"),
  assert("compare renderer wired",app.includes("renderCompareEquip")&&app.includes("renderComparison")&&app.includes("drawCompareChart"),"renderer functions exist"),
  assert("compare css exists",css.includes(".compare-slots")&&css.includes("#compareChart"),"responsive compare styles exist"),
  assert("comparison finite",Number.isFinite(summary.valueDiffPct)&&Number.isFinite(summary.dpsDiffPct)&&Number.isFinite(summary.totalDiffPct),JSON.stringify({value:summary.valueDiffPct,dps:summary.dpsDiffPct,total:summary.totalDiffPct})),
  assert("uptime classified",compareClass.averageUptime>0&&compareClass.averageUptime<=1&&compareClass.runes.length>=1,JSON.stringify({uptime:compareClass.averageUptime,runes:compareClass.runes.length})),
  assert("diminishing curve",currentCurve.length===7&&currentCurve.every(p=>Number.isFinite(p.curve)&&p.curve>=0&&p.curve<=100),JSON.stringify(currentCurve)),
  assert("mode duration",POB.combatDurationSec({...state,mode:"raid"})===300&&POB.combatDurationSec({...state,mode:"abyss"})===60,"raid 300 / abyss 60")
];

const report={pass:tests.every(t=>t.pass),tests};
fs.writeFileSync(path.join(__dirname,"v0_0014_compare_validation_report.json"),JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
process.exit(report.pass?0:1);
