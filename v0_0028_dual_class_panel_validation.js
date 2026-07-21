const fs=require("fs");
const vm=require("vm");

const context={module:{exports:{}},console};
vm.createContext(context);
vm.runInContext(fs.readFileSync("data.js","utf8")+";this.DB=DB",context);
vm.runInContext(fs.readFileSync("core.js","utf8")+";this.POB=POB",context);
const {DB,POB}=context;
const index=fs.readFileSync("index.html","utf8");
const app=fs.readFileSync("app.js","utf8");
const base={selected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},mode:"raid",stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}};
const off={...base,classEnabled:{swordsman:false,greatsword_warrior:false}};
const swordsmanOn={...base,classEnabled:{swordsman:true,greatsword_warrior:false}};
const warriorOn={...base,classEnabled:{swordsman:false,greatsword_warrior:true}};
const swordOffRows=POB.skillDamageRows(DB,off,off.selected,"avg","swordsman");
const swordOnRows=POB.skillDamageRows(DB,swordsmanOn,swordsmanOn.selected,"avg","swordsman");
const warriorOffRows=POB.skillDamageRows(DB,off,off.selected,"avg","greatsword_warrior");
const warriorOnRows=POB.skillDamageRows(DB,warriorOn,warriorOn.selected,"avg","greatsword_warrior");
const result={version:"0.0028",checks:[
  ["검술사 독립 패널",index.includes('data-skill-panel="swordsman"')&&index.includes("검술사 스킬 예상 데미지")],
  ["대검전사 독립 패널",index.includes('data-skill-panel="greatsword_warrior"')&&index.includes("대검전사 스킬 예상 데미지")],
  ["검술사 OFF 결과 유지",swordOffRows.length===9&&swordOffRows.every(row=>row.noCrit>0)],
  ["대검전사 OFF 결과 유지",warriorOffRows.length===26&&warriorOffRows.every(row=>row.noCrit>0)],
  ["검술사 ON 패시브 반영",swordOnRows[0].noCrit!==swordOffRows[0].noCrit],
  ["대검전사 ON 패시브 반영",warriorOnRows[0].noCrit!==warriorOffRows[0].noCrit],
  ["상호배타 상태 정규화",app.includes("if(next.classEnabled.swordsman&&next.classEnabled.greatsword_warrior)next.classEnabled.greatsword_warrior=false")],
  ["토글 시 다른 직업 OFF",app.includes("Object.keys(state.classEnabled).forEach(key=>state.classEnabled[key]=false)")],
  ["각 패널 개별 렌더링",app.includes('renderSkillDamagePanel("swordsman")')&&app.includes('renderSkillDamagePanel("greatsword_warrior")')],
  ["기존 자체 회귀검수",POB.runSelfTest(DB).pass]
].map(([name,pass])=>({name,pass}))};
result.pass=result.checks.every(row=>row.pass);
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exit(1);
