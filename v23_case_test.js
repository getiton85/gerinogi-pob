
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
const s={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};
function assert(c,m){if(!c)throw new Error(m)}
function r(v){return Math.round(v*10)/10}

const base=ctx.POB.normalizedValue(ctx.DB,s,s.selected,'avg');
assert(Math.abs(base.valueScore-100)<0.001,'기준 세팅 100 실패');

const d=ctx.POB.derivedStats(s);
assert(r(d.breakPct)===3.4,'브레이크 표시값 오류: '+d.breakPct);
assert(r(d.skillPowerPct)===3.8,'스킬위력 표시값 오류: '+d.skillPowerPct);
assert(r(d.areaPowerPct)===7.5,'광역강화 표시값 오류: '+d.areaPowerPct);
assert(r(d.fastAttackPct)===5.3,'빠른공격 표시값 오류: '+d.fastAttackPct);
assert(r(d.fastSkillPct)===5.9,'빠른스킬 표시값 오류: '+d.fastSkillPct);
assert(r(d.damageReducePct)===3.3,'피해감소 표시값 오류: '+d.damageReducePct);

const weapon=ctx.POB.normalizedValue(ctx.DB,s,{...s.selected,weapon:'weapon_death'},'avg');
assert(Number.isFinite(weapon.valueScore)&&weapon.valueScore!==base.valueScore,'무기 교체 반응 없음');

const stat={...s,stats:{...s.stats,attack:s.stats.attack+1000,extraStat:s.stats.extraStat+100}};
assert(ctx.POB.normalizedValue(ctx.DB,stat,stat.selected,'avg').rawScore>base.rawScore,'스탯 증가 반응 없음');

console.log(JSON.stringify({
  baseline:base.valueScore,
  breakPct:r(d.breakPct),
  skillPowerPct:r(d.skillPowerPct),
  areaPowerPct:r(d.areaPowerPct),
  fastAttackPct:r(d.fastAttackPct),
  fastSkillPct:r(d.fastSkillPct),
  damageReducePct:r(d.damageReducePct),
  weaponDiff:weapon.diffPct
}));
