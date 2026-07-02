
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
const DB=ctx.DB, POB=ctx.POB;
function assert(c,m){if(!c)throw new Error(m)}
function r(v){return Math.round(v*10)/10}
const s={selected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}};
const base=POB.normalizedValue(DB,s,s.selected,'avg');
assert(Math.abs(base.valueScore-100)<0.001,'기준 세팅 100 실패');
assert(Number.isFinite(base.rawScore)&&base.rawScore>0,'기대딜 rawScore 오류');
assert(base.expectedAxes && base.expectedAxes.attackAxis>0 && base.expectedAxes.damageAxis>0,'기대딜 축 누락');
const weapon=POB.normalizedValue(DB,s,{...s.selected,weapon:'weapon_death'},'avg');
assert(Number.isFinite(weapon.valueScore),'무기 교체 기대딜 계산 실패');
assert(weapon.valueScore!==base.valueScore,'무기 교체 반응 없음');
const attackUpState={...s,stats:{...s.stats,attack:s.stats.attack+1000}};
const attackUp=POB.normalizedValue(DB,attackUpState,attackUpState.selected,'avg');
assert(attackUp.rawScore>base.rawScore,'공격력 증가 반영 없음');
const extraUpState={...s,stats:{...s.stats,extraStat:s.stats.extraStat+300}};
const extraUp=POB.normalizedValue(DB,extraUpState,extraUpState.selected,'avg');
assert(extraUp.rawScore>base.rawScore,'추가타 증가 반영 없음');
const d=POB.derivedStats(s);
assert(r(d.breakPct)===3.4,'브레이크 환산 깨짐');
assert(r(d.skillPowerPct)===3.8,'스킬위력 환산 깨짐');
assert(r(d.areaPowerPct)===7.5,'광역강화 환산 깨짐');
const qa=POB.runSelfTest(DB);
assert(qa.pass,'기존 코어 테스트 실패');
console.log(JSON.stringify({
  baseline:base.valueScore,
  rawScore:Math.round(base.rawScore),
  axes:Object.fromEntries(Object.entries(base.expectedAxes).map(([k,v])=>[k,typeof v==='number'?Math.round(v*1000)/1000:v])),
  weaponDeathDiff:r(weapon.diffPct),
  attackUp:r(attackUp.diffPct),
  extraUp:r(extraUp.diffPct),
  derived:{break:r(d.breakPct),skill:r(d.skillPowerPct),area:r(d.areaPowerPct)}
},null,2));
