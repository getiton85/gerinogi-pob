const fs=require("fs");
const vm=require("vm");
const POB=require("./core.js");

const app=fs.readFileSync("app.js","utf8");
const html=fs.readFileSync("index.html","utf8");
const ctx={};
vm.runInNewContext(fs.readFileSync("data.js","utf8")+";this.DB=DB;",ctx);

const tests=[
  {
    name:"version marker updated",
    pass:html.includes("v0.0018")&&html.includes("app.js?v=0.0018")&&app.includes('textContent="v0.0018"')
  },
  {
    name:"x-axis uses adaptive time ticks",
    pass:app.includes("const axisStep=")&&app.includes('t+"초"')&&app.includes("chartW>=980?10")
  },
  {
    name:"per-second labels are not drawn for every point",
    pass:!app.includes("current.forEach((p,i)=>{")&&!app.includes('Math.round(n(p.time))+"초"')
  },
  {
    name:"step-line chart shows buff windows",
    pass:app.includes("ctx.lineTo(x,prevY)")&&app.includes("ctx.lineTo(x,y)")
  },
  {
    name:"average and peak helpers are present",
    pass:app.includes("function drawAverage")&&app.includes("function drawPeak")&&app.includes("최고")
  }
];

const state={
  selected:{emblem:"emblem_gogyeol",weapon:"weapon_gwangchae",head:"armor_rusted_shield",top:"",bottom:"",gloves:"",shoes:""},
  compareSelected:{emblem:"emblem_s1_archmage",weapon:"weapon_gwangchae",head:"armor_rusted_shield",top:"",bottom:"",gloves:"",shoes:""},
  baseline:{...POB.DEFAULT_SELECTED},
  classEnabled:{swordsman:true},
  mode:"raid",
  stats:{...POB.DEFAULT_STATS},
  env:{...POB.DEFAULT_ENV},
  focusTags:[]
};
const summary=POB.comparisonSummary(ctx.DB,state,state.compareSelected,"avg");
const timeline=POB.expectedDamageTimeline(summary);
tests.push({
  name:"timeline data still has one-second DPS points",
  pass:timeline.durationSec===300&&timeline.current.length===301&&timeline.current.some(p=>p.dps!==timeline.current[0].dps)
});
const self=POB.runSelfTest(ctx.DB);
tests.push({
  name:"core regression self test",
  pass:self.pass
});

const report={pass:tests.every(t=>t.pass),tests};
fs.writeFileSync("v0_0018_chart_axis_validation_report.json",JSON.stringify(report,null,2));
if(!report.pass){
  console.error(JSON.stringify(report,null,2));
  process.exit(1);
}
console.log("v0.0018 chart axis validation PASS");
