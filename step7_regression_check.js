
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
function assert(c,m){if(!c)throw new Error(m)}
function r(v){return Math.round(v*10)/10}
const s={selected:{...ctx.POB.DEFAULT_SELECTED},baseline:{...ctx.POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...ctx.POB.DEFAULT_STATS},env:{...ctx.POB.DEFAULT_ENV}};

const qa=ctx.POB.runSelfTest(ctx.DB);
assert(qa.pass,'core self test fail');
assert(qa.counts.emblem===9,'emblem count fail');
assert(qa.counts.weapon===17,'weapon count fail');
assert(qa.counts.armor===55,'armor count fail');

const ids=new Set();
for(const cat of Object.values(ctx.DB.runes)){
  for(const r of cat){
    assert(!ids.has(r.id),'duplicate id '+r.id);
    ids.add(r.id);
  }
}
for(const id of Object.values(ctx.POB.DEFAULT_SELECTED).filter(Boolean)){
  assert(ids.has(id),'default selected missing '+id);
}
const base=ctx.POB.normalizedValue(ctx.DB,s,s.selected,'avg');
assert(Math.abs(base.valueScore-100)<0.001,'normalized base broken');
console.log(JSON.stringify({selfTest:qa.pass,counts:qa.counts,defaultIds:'ok',normalized:base.valueScore}));
