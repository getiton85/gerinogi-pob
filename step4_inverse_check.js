
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
function assert(c,m){if(!c)throw new Error(m)}
function r(v){return Math.round(v*10)/10}
const s={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};

function derivedWith(partial){
  const ss={...s,stats:{...s.stats,...partial}};
  return ctx.POB.derivedStats(ss);
}
let d0=derivedWith({breakPower:0,skillPower:0,fastAttack:0,damageReduce:0});
assert(r(d0.breakPct)===0,'break 0 fail');
assert(r(d0.skillPowerPct)===0,'skill 0 fail');
assert(r(d0.fastAttackPct)===0,'fast attack 0 fail');
assert(r(d0.damageReducePct)===0,'damage reduce 0 fail');

let dHalf=derivedWith({breakPower:1457,skillPower:1364.5,fastAttack:1023.5,damageReduce:1499});
assert(r(dHalf.breakPct)===1.7,'break half fail');
assert(r(dHalf.skillPowerPct)===1.9,'skill half fail');
assert(r(dHalf.fastAttackPct)===2.7,'fast half fail');
assert(r(dHalf.damageReducePct)===1.7,'reduce half fail');

let dDouble=derivedWith({breakPower:5828,skillPower:5458,fastAttack:4094,damageReduce:5996});
assert(r(dDouble.breakPct)===6.8,'break double fail');
assert(r(dDouble.skillPowerPct)===7.6,'skill double fail');
assert(r(dDouble.fastAttackPct)===10.6,'fast double fail');
assert(r(dDouble.damageReducePct)===6.6,'reduce double fail');

console.log(JSON.stringify({
  zero:{break:r(d0.breakPct),skill:r(d0.skillPowerPct),fast:r(d0.fastAttackPct),reduce:r(d0.damageReducePct)},
  half:{break:r(dHalf.breakPct),skill:r(dHalf.skillPowerPct),fast:r(dHalf.fastAttackPct),reduce:r(dHalf.damageReducePct)},
  double:{break:r(dDouble.breakPct),skill:r(dDouble.skillPowerPct),fast:r(dDouble.fastAttackPct),reduce:r(dDouble.damageReducePct)}
}));
