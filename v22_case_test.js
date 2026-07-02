
const fs=require('fs'),vm=require('vm'); const ctx={console,module:{exports:{}},exports:{},globalThis:null}; ctx.globalThis=ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
const s={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};
function assert(c,m){if(!c)throw new Error(m)} function r(v){return Math.round(v*10)/10}
const base=ctx.POB.normalizedValue(ctx.DB,s,s.selected,'avg'); assert(Math.abs(base.valueScore-100)<0.001,'baseline');
const weapon=ctx.POB.normalizedValue(ctx.DB,s,{...s.selected,weapon:'weapon_death'},'avg'); assert(Number.isFinite(weapon.valueScore)&&weapon.valueScore!==base.valueScore,'weapon');
const stat={...s,stats:{...s.stats,attack:s.stats.attack+1000,extraStat:s.stats.extraStat+100}}; assert(ctx.POB.normalizedValue(ctx.DB,stat,stat.selected,'avg').rawScore>base.rawScore,'stat');
assert(ctx.POB.normalizedValue(ctx.DB,{...s,classEnabled:{swordsman:false}},s.selected,'avg').rawScore!==base.rawScore,'passive');
const abyss=ctx.POB.normalizedValue(ctx.DB,{...s,mode:'abyss'},{...s.selected,head:'armor_conqueror'},'avg');
const raid=ctx.POB.normalizedValue(ctx.DB,{...s,mode:'raid'},{...s.selected,head:'armor_conqueror'},'avg'); assert(abyss.rawScore!==raid.rawScore,'mode');
const d=ctx.POB.derivedStats(s); assert(r(d.breakPct)===3.4,'break'); assert(r(d.skillPowerPct)===3.8,'skill'); assert(r(d.fastAttackPct)===5.3,'fast'); assert(r(d.damageReducePct)===3.3,'reduce');
console.log(JSON.stringify({baseline:base.valueScore, weaponDiff:weapon.diffPct, breakExtra:r(d.breakPct), skillExtra:r(d.skillPowerPct), fastAttackExtra:r(d.fastAttackPct), damageReduceExtra:r(d.damageReducePct)}));
