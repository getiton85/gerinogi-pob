
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
function assert(c,m){if(!c)throw new Error(m)}
function r(v){return Math.round(v*10)/10}
const s={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};

const d=ctx.POB.derivedStats(s);
const base=ctx.POB.normalizedValue(ctx.DB,s,s.selected,'avg');
const expected = {
  breakPct:3.4,
  skillPowerPct:3.8,
  areaPowerPct:7.5,
  fastAttackPct:5.3,
  fastSkillPct:5.9,
  damageReducePct:3.3
};
for(const [k,v] of Object.entries(expected)){
  assert(r(d[k])===v, `${k} expected ${v}, got ${r(d[k])}`);
}
assert(Math.abs(base.valueScore-100)<0.001,'baseline value must be 100');
assert(Number.isFinite(base.rawScore)&&base.rawScore>0,'raw score invalid');
console.log(JSON.stringify({derived:{
  breakPct:r(d.breakPct),
  skillPowerPct:r(d.skillPowerPct),
  areaPowerPct:r(d.areaPowerPct),
  fastAttackPct:r(d.fastAttackPct),
  fastSkillPct:r(d.fastSkillPct),
  damageReducePct:r(d.damageReducePct)
}, baseline:base.valueScore, rawScore:Math.round(base.rawScore)}));
