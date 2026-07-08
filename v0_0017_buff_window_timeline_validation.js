const fs=require("fs");
const vm=require("vm");
const POB=require("./core.js");

const ctx={};
vm.runInNewContext(fs.readFileSync("data.js","utf8")+";this.DB=DB;",ctx);
const DB=ctx.DB;

const state={
  selected:{
    emblem:"emblem_gogyeol",
    weapon:"weapon_gwangchae",
    head:"armor_rusted_shield",
    top:"",
    bottom:"",
    gloves:"",
    shoes:""
  },
  compareSelected:{
    emblem:"emblem_s1_archmage",
    weapon:"weapon_gwangchae",
    head:"armor_rusted_shield",
    top:"",
    bottom:"",
    gloves:"",
    shoes:""
  },
  baseline:{...POB.DEFAULT_SELECTED},
  classEnabled:{swordsman:true},
  mode:"raid",
  stats:{...POB.DEFAULT_STATS},
  env:{...POB.DEFAULT_ENV},
  focusTags:[]
};

const index=fs.readFileSync("index.html","utf8");
const app=fs.readFileSync("app.js","utf8");
const core=fs.readFileSync("core.js","utf8");
const summary=POB.comparisonSummary(DB,state,state.compareSelected,"avg");
const timeline=POB.expectedDamageTimeline(summary);

function uniq(values){
  return [...new Set(values.map(v=>Math.round(Number(v)||0)))];
}

const currentDps=timeline.current.map(p=>p.dps);
const compareDps=timeline.compare.map(p=>p.dps);
const tests=[
  {name:"version marker updated",pass:index.includes("v0.0017")&&app.includes("v0.0017")},
  {name:"timeline exposes one-second raid points",pass:timeline.durationSec===300&&timeline.current.length===301&&timeline.compare.length===301},
  {name:"buff windows create changing DPS",pass:uniq(currentDps).length>=3&&uniq(compareDps).length>=3},
  {name:"downtime windows are visible",pass:timeline.current.some(p=>p.time>=50&&p.time<=60&&Math.round(p.dps)===0)},
  {name:"active buff metadata exists",pass:timeline.current.some(p=>p.activeBuffs>0)&&timeline.current.every(p=>Number.isFinite(p.rawFactor))},
  {name:"current and compare curves can differ",pass:uniq(currentDps).join(",")!==uniq(compareDps).join(",")},
  {name:"cumulative damage remains available",pass:timeline.current.every(p=>Number.isFinite(p.damage))&&timeline.current.at(-1).damage>0},
  {name:"graph still labels per-second DPS",pass:app.includes("초당 예상 DPS / 시간")&&index.includes("초당 예상 DPS")},
  {name:"timeline functions exported",pass:core.includes("damageTimelinePoints")&&core.includes("expectedDamageTimeline")}
];

const report={pass:tests.every(t=>t.pass),tests,sample:{
  first:timeline.current.slice(0,8),
  downtime:timeline.current.filter(p=>p.time>=48&&p.time<=62).slice(0,20),
  compareFirst:timeline.compare.slice(0,8)
}};

fs.writeFileSync("v0_0017_buff_window_timeline_validation_report.json",JSON.stringify(report,null,2),"utf8");
if(!report.pass){
  console.error(JSON.stringify(report,null,2));
  process.exit(1);
}
console.log("v0.0017 buff window timeline validation PASS");
