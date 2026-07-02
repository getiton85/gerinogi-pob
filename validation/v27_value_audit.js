const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
const DB=ctx.DB, POB=ctx.POB;
function assert(condition,message){if(!condition)throw new Error(message)}
const state={selected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}};
const baseline=POB.normalizedValue(DB,state,state.baseline,'avg');
const auditDb=JSON.parse(JSON.stringify(DB));
auditDb.runes.accessory=[{id:'accessory_utility_value_audit',name:'Utility Value Audit',tag:'audit',effects:{attackSpeedPct:40,skillSpeedPct:40,castingSpeedPct:40,chargeSpeedPct:40,cooldownRecoveryPct:40,recoveryPct:40}}];
const utility=POB.normalizedValue(auditDb,state,{...state.baseline,necklace:'accessory_utility_value_audit'},'avg');
assert(Math.abs(utility.valueScore-baseline.valueScore)<0.0001,'utility options changed damage value');
const stronger=POB.normalizedValue(DB,state,{...state.selected,weapon:'weapon_death'},'avg');
assert(Number.isFinite(stronger.valueScore),'damage value calculation failed');
const qa=POB.runSelfTest(DB);
assert(qa.pass,'core self audit failed');
console.log(JSON.stringify({baseline:baseline.valueScore,utility:utility.valueScore,weaponDeathDiff:Math.round(stronger.diffPct*100)/100,qa:qa.pass},null,2));
