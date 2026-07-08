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

const weaponCandidate=DB.runes.weapon.find(r=>r.season===1)||DB.runes.weapon[0];
const emblemCandidate=DB.runes.emblem.find(r=>r.name==="현란함")||DB.runes.emblem[0];
state.compareSelected.weapon=weaponCandidate.id;
state.compareSelected.emblem=emblemCandidate.id;

const summary=POB.comparisonSummary(DB,state,state.compareSelected,"avg");
const timeline=POB.expectedDamageTimeline(summary);
const index=fs.readFileSync(path.join(__dirname,"index.html"),"utf8");
const app=fs.readFileSync(path.join(__dirname,"app.js"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"style.css"),"utf8");

const allRunes=POB.allRunes(DB);
const missingSeason=allRunes.filter(r=>POB.runeSeasonLabel(r).indexOf("시즌")!==0);
const season2Missing=allRunes.filter(r=>r.season===2&&POB.runeSeasonLabel(r)!=="시즌2");

const tests=[
  assert("version marker",index.includes("v=0.0018")&&app.includes("v0.0018"),"cache and visible version are v0.0018"),
  assert("user season labels",POB.runeSeasonLabel(weaponCandidate).includes("시즌")&&POB.runeSeasonLabel(emblemCandidate).includes("시즌"),`${POB.runeSeasonLabel(weaponCandidate)} / ${POB.runeSeasonLabel(emblemCandidate)}`),
  assert("no raw season label in compare options",!app.includes("[${season}]")&&!app.includes("[season2]"),"compare labels use Korean season text"),
  assert("compare option percent",app.includes("deltaPctText(d.diff)")&&app.includes("seasonLabelText(r)"),"compare dropdown includes season and delta percent"),
  assert("all season2 labels normalized",season2Missing.length===0,season2Missing.slice(0,5).map(r=>r.name).join(", ")||"ok"),
  assert("all rune season labels normalized",missingSeason.length===0,missingSeason.slice(0,5).map(r=>r.name).join(", ")||"ok"),
  assert("timeline function exported",typeof POB.expectedDamageTimeline==="function"&&typeof POB.damageTimelinePoints==="function","timeline functions exist"),
  assert("timeline has two curves",timeline.current.length>=10&&timeline.compare.length>=10,"current "+timeline.current.length+" / compare "+timeline.compare.length),
  assert("timeline duration follows raid",timeline.durationSec===300,"duration "+timeline.durationSec),
  assert("timeline monotonic damage",timeline.current.every((p,i,a)=>i===0||p.damage>=a[i-1].damage)&&timeline.compare.every((p,i,a)=>i===0||p.damage>=a[i-1].damage),"monotonic cumulative damage"),
  assert("timeline finite damage",timeline.current.concat(timeline.compare).every(p=>Number.isFinite(p.damage)&&Number.isFinite(p.time)&&Number.isFinite(p.dps)),JSON.stringify(timeline.current.slice(0,2))),
  assert("chart labels changed",index.includes("초당 예상 DPS")&&app.includes("현재 장착 곡선")&&app.includes("비교추가 곡선"),"time chart labels exist"),
  assert("compare css exists",css.includes(".compare-slots")&&css.includes("#compareChart"),"responsive compare styles exist")
];

const report={pass:tests.every(t=>t.pass),tests};
fs.writeFileSync(path.join(__dirname,"v0_0015_timeline_validation_report.json"),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
process.exit(report.pass?0:1);
