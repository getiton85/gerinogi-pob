
const fs = require('fs');
const vm = require('vm');
const codeData = fs.readFileSync('data.js','utf8') + '\n;globalThis.DB = DB;';
const codeCore = fs.readFileSync('core.js','utf8') + '\n;globalThis.POB = POB;';
const ctx = { console, module:{exports:{}}, exports:{}, globalThis:null };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(codeData, ctx);
vm.runInContext(codeCore, ctx);
const qa = ctx.POB.runSelfTest(ctx.DB);
if(!qa.pass) { console.log(JSON.stringify(qa,null,2)); process.exit(2); }
const state = {selected:{...ctx.POB.DEFAULT_SELECTED}, baseline:{...ctx.POB.DEFAULT_SELECTED}, classEnabled:{swordsman:true}, mode:"raid", stats:{...ctx.POB.DEFAULT_STATS}, env:{...ctx.POB.DEFAULT_ENV}};
const before = ctx.POB.normalizedValue(ctx.DB,state,state.selected,"avg");
state.stats.attack += 1000;
state.stats.extraStat += 100;
const after = ctx.POB.normalizedValue(ctx.DB,state,state.selected,"avg");
if(before.rawScore === after.rawScore) { throw new Error("stat change did not affect dashboard score"); }
console.log(JSON.stringify({counts:qa.counts, score:Math.round(before.rawScore), changed:Math.round(after.rawScore)}));
