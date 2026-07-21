
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
function assert(c,m){if(!c)throw new Error(m)}
function r(v){return Math.round(v*10)/10}
const s={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};

const base=ctx.POB.normalizedValue(ctx.DB,s,s.selected,'avg');

const weaponSel={...s.selected,weapon:'weapon_death'};
const weapon=ctx.POB.normalizedValue(ctx.DB,s,weaponSel,'avg');
assert(weapon.valueScore!==base.valueScore,'weapon swap no response');

const statState={...s,stats:{...s.stats,attack:s.stats.attack+1000,extraStat:s.stats.extraStat+100,skillPower:s.stats.skillPower+500}};
const stat=ctx.POB.normalizedValue(ctx.DB,statState,statState.selected,'avg');
assert(stat.rawScore!==base.rawScore,'stat input no response');

const offState={...s,classEnabled:{swordsman:false}};
const off=ctx.POB.normalizedValue(ctx.DB,offState,offState.selected,'avg');
assert(off.rawScore!==base.rawScore,'passive toggle no response');

const raid=ctx.POB.normalizedValue(ctx.DB,{...s,mode:'raid'},{...s.selected,head:'armor_conqueror'},'avg');
const abyss=ctx.POB.normalizedValue(ctx.DB,{...s,mode:'abyss'},{...s.selected,head:'armor_conqueror'},'avg');
assert(raid.rawScore!==abyss.rawScore,'raid/abyss no response');

const rankSlot='weapon';
const candidates=ctx.DB.runes.weapon.map(r=>{
  const sel={...s.selected,[rankSlot]:r.id};
  const nv=ctx.POB.normalizedValue(ctx.DB,s,sel,'avg');
  return {name:r.name,value:nv.valueScore,diff:nv.diffPct};
}).sort((a,b)=>b.diff-a.diff);
assert(candidates.length===ctx.DB.runes.weapon.length&&candidates.length>=45,'weapon rank count wrong');
assert(Number.isFinite(candidates[0].diff),'rank diff invalid');

console.log(JSON.stringify({
  base:base.valueScore,
  weaponDiff:weapon.diffPct,
  statChanged:stat.rawScore!==base.rawScore,
  passiveChanged:off.rawScore!==base.rawScore,
  modeChanged:raid.rawScore!==abyss.rawScore,
  topWeapon:candidates[0]
}));
