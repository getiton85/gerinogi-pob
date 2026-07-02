
const fs=require('fs'),vm=require('vm');
const ctx={console,module:{exports:{}},exports:{},globalThis:null};
ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js','utf8')+';globalThis.DB=DB;',ctx);
vm.runInContext(fs.readFileSync('core.js','utf8')+';globalThis.POB=POB;',ctx);
function assert(c,m){if(!c)throw new Error(m)}
const DB=ctx.DB, POB=ctx.POB;

const counts={emblem:DB.runes.emblem.length,weapon:DB.runes.weapon.length,armor:DB.runes.armor.length};
assert(counts.emblem===9,'엠블럼 개수 오류 '+counts.emblem);
assert(counts.weapon===17,'무기 개수 오류 '+counts.weapon);
assert(counts.armor===55,'방어구 개수 오류 '+counts.armor);

const ids=new Map(), names=new Map(), suspicious=[], missingEffects=[];
const badNamePatterns=[/저주의 룬\s?[AB]$/,/저주룬\s?[AB]$/i,/temp/i,/test/i,/임시/i,/todo/i,/placeholder/i];

for(const [cat, arr] of Object.entries(DB.runes)){
  for(const r of arr){
    assert(r.id && r.name, 'id/name 누락');
    if(ids.has(r.id)) throw new Error('중복 id '+r.id);
    ids.set(r.id, r.name);

    const key=cat+'::'+r.name;
    if(names.has(key)) suspicious.push({type:'duplicate_name_same_category', cat, name:r.name});
    names.set(key, r.id);

    for(const p of badNamePatterns){
      if(p.test(r.name)) suspicious.push({type:'bad_temp_name', cat, id:r.id, name:r.name, pattern:String(p)});
    }

    if(!r.effects || typeof r.effects!=='object'){
      // 스택/상태 전용 룬처럼 effects가 별도 필드로 없는 룬은 보고만 하고 실패로 보지 않는다.
      missingEffects.push({cat,id:r.id,name:r.name});
    }else{
      for(const [k,v] of Object.entries(r.effects)){
        if(typeof v==='number') assert(Number.isFinite(v), '숫자 효과 오류 '+r.name+' '+k);
      }
    }
  }
}

for(const [slot,id] of Object.entries(POB.DEFAULT_SELECTED)){
  if(!id) continue;
  assert(ids.has(id), '기본 장착 id 누락 '+slot+' '+id);
}

const qa=POB.runSelfTest(DB);
assert(qa.pass, 'core self test fail');

const state={selected:{...POB.DEFAULT_SELECTED},baseline:{...POB.DEFAULT_SELECTED},classEnabled:{swordsman:true},mode:'raid',stats:{...POB.DEFAULT_STATS},env:{...POB.DEFAULT_ENV}};
const base=POB.normalizedValue(DB,state,state.selected,'avg');
assert(Math.abs(base.valueScore-100)<0.001, '기준 세팅 100 아님');

const hasBadTemp=suspicious.some(x=>x.type==='bad_temp_name');
assert(!hasBadTemp, '임시 이름 남음 '+JSON.stringify(suspicious));

console.log(JSON.stringify({counts, suspicious, missingEffects, baseline:base.valueScore, selfTest:qa.pass}, null, 2));
