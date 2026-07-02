
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
const state={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};
const base=ctx.POB.normalizedValue(ctx.DB,state,state.selected,'avg');
if(Math.abs(base.valueScore-100)>0.001) throw new Error('baseline not 100');
const sel={...state.selected,weapon:'weapon_death'};
const changed=ctx.POB.normalizedValue(ctx.DB,state,sel,'avg');
if(changed.valueScore===100) throw new Error('changed value not moving');
console.log(JSON.stringify({base:base.valueScore,changed:changed.valueScore}));
