const fs=require("fs");
const vm=require("vm");

const context={module:{exports:{}},console};
vm.createContext(context);
vm.runInContext(fs.readFileSync("data.js","utf8")+";this.DB=DB",context);
vm.runInContext(fs.readFileSync("core.js","utf8")+";this.POB=POB",context);
const {DB,POB}=context;
const close=(a,b,tolerance=1e-9)=>Math.abs(a-b)<=tolerance;
const base={selected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},mode:"raid",stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}};
const calculate=(strongStat,on)=>{
  const state={...base,stats:{...base.stats,strongStat},classEnabled:{swordsman:false,greatsword_warrior:on}};
  return {state,value:POB.normalizedValue(DB,state,state.selected,"avg"),rows:POB.skillDamageRows(DB,state,state.selected,"avg","greatsword_warrior")};
};
const off=calculate(POB.DEFAULT_STATS.strongStat,false);
const current=calculate(POB.DEFAULT_STATS.strongStat,true);
const zero=calculate(0,true);
const half=calculate(2500,true);
const cap=calculate(5000,true);
const over=calculate(7500,true);
const expectedCurrent=25+(POB.DEFAULT_STATS.strongStat/5000)*25;
const checks=[
  ["대검전사 OFF 스킬계수 0%",close(off.value.skillDamage,0),off.value.skillDamage],
  ["무자비한 칼날 기본 +25%",close(zero.value.skillDamage,25),zero.value.skillDamage],
  ["강타 강화 2,500 추가 +12.5%",close(half.value.skillDamage,37.5),half.value.skillDamage],
  ["강타 강화 5,000 총 +50%",close(cap.value.skillDamage,50),cap.value.skillDamage],
  ["강타 강화 상한 초과 +50% 유지",close(over.value.skillDamage,50),over.value.skillDamage],
  ["기본 강타 강화 4,957 연결",close(current.value.skillDamage,expectedCurrent),`${current.value.skillDamage}/${expectedCurrent}`],
  ["대시보드 원본 점수 반응",current.value.rawScore>off.value.rawScore,`${off.value.rawScore}/${current.value.rawScore}`],
  ["대검전사 스킬 예상 피해 반응",current.rows[0].noCrit>off.rows[0].noCrit,`${off.rows[0].noCrit}/${current.rows[0].noCrit}`],
  ["기존 자체 회귀검수",POB.runSelfTest(DB).pass,POB.runSelfTest(DB).tests.length]
].map(([name,pass,detail])=>({name,pass,detail}));
const result={version:"0.0030",pass:checks.every(row=>row.pass),checks};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exit(1);
