
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
if(ctx.POB.VALUE_WEIGHTS.critChance <= 1 || ctx.POB.VALUE_WEIGHTS.extraChance <= 1 || ctx.POB.VALUE_WEIGHTS.critDamage <= 1 || ctx.POB.VALUE_WEIGHTS.attack <= 1) throw new Error('weights not applied');
const state={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};
const base=ctx.POB.normalizedValue(ctx.DB,state,state.selected,'avg');
const changed={...state,stats:{...state.stats,critStat:state.stats.critStat+1000,extraStat:state.stats.extraStat+100,attack:state.stats.attack+1000}};
const val=ctx.POB.normalizedValue(ctx.DB,changed,changed.selected,'avg');
if(val.rawScore <= base.rawScore) throw new Error('high value stat increase did not raise raw score');
console.log(JSON.stringify({weights:ctx.POB.VALUE_WEIGHTS, base:Math.round(base.rawScore), changed:Math.round(val.rawScore)}));
