const fs = require("fs");
const vm = require("vm");
const DB = vm.runInNewContext(fs.readFileSync("data.js", "utf8") + "\nDB;", {});
const POB = require("./core.js");

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

function approx(a, b, tolerance = 0.05) {
  return Math.abs(Number(a) - Number(b)) <= tolerance;
}

const state = {
  mode: "raid",
  stats: { ...POB.DEFAULT_STATS },
  env: { ...POB.DEFAULT_ENV },
  classEnabled: { swordsman: true },
  selected: { ...POB.DEFAULT_SELECTED },
  baseline: { ...POB.DEFAULT_SELECTED },
  focusTags: []
};

const db = clone(DB);
db.runes.weapon.push(
  {
    id: "weapon_audit_attack_17",
    name: "공격력 17 검수",
    season: 1,
    tag: "검수",
    effects: { flatAttack: 723, attackPct: 17 },
    rawOption: { rawDescription: "공격력이 17% 증가한다." }
  },
  {
    id: "weapon_audit_attack_speed_only",
    name: "공격 속도 검수",
    season: 1,
    tag: "검수",
    effects: { attackSpeedPct: 999 },
    rawOption: { rawDescription: "공격 속도가 999% 증가한다." }
  },
  {
    id: "weapon_audit_basic_only",
    name: "기본 공격 검수",
    season: 1,
    tag: "검수",
    effects: { basicDamagePct: 999, basicAttackDamagePct: 999, basicExtraHitChancePct: 999 },
    rawOption: { rawDescription: "기본 공격 피해와 기본 공격 추가타 확률이 증가한다." }
  }
);

const choose = (weapon) => ({ ...state.selected, weapon });
const valueOf = (weapon) => POB.normalizedValue(db, state, choose(weapon), "avg").valueScore;
const infiniteTrajectory = POB.runeById(db, "weapon_s1_infinite_trajectory");
const speedOnly = valueOf("weapon_audit_attack_speed_only");
const basicOnly = valueOf("weapon_audit_basic_only");
const attackOnly = valueOf("weapon_audit_attack_17");
const trajectory = valueOf("weapon_s1_infinite_trajectory");
const basicTextRune = {
  id: "weapon_audit_basic_text",
  name: "기본 공격력 문구 검수",
  effects: {},
  rawOption: { rawDescription: "기본 공격력이 999% 증가한다." }
};

const tests = [
  {
    name: "self test passes",
    pass: POB.runSelfTest(DB).pass
  },
  {
    name: "infinite trajectory stores basic extra hit separately",
    pass:
      infiniteTrajectory &&
      infiniteTrajectory.effects.basicExtraHitChancePct === 30 &&
      infiniteTrajectory.effects.extraHitChancePct === undefined &&
      infiniteTrajectory.rawOption.always.basicExtraHitChancePct === 30 &&
      infiniteTrajectory.rawOption.always.extraHitChancePct === undefined
  },
  {
    name: "basic attack speed alone does not increase skill value",
    pass: approx(speedOnly, 100, 0.01)
  },
  {
    name: "basic attack damage and basic extra hit do not increase skill value",
    pass: approx(basicOnly, 100, 0.01)
  },
  {
    name: "infinite trajectory value equals attack-only value",
    pass: approx(trajectory, attackOnly, 0.05)
  },
  {
    name: "basic attack wording does not count as attack focus",
    pass: POB.runeFocusScore(basicTextRune, ["attack"]) === 0
  }
];

const report = {
  pass: tests.every((t) => t.pass),
  tests,
  values: {
    empty: 100,
    infiniteTrajectory,
    attackOnly,
    trajectory,
    speedOnly,
    basicOnly
  }
};

fs.writeFileSync(
  "v0_0023_basic_attack_value_validation_report.json",
  JSON.stringify(report, null, 2),
  "utf8"
);

console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exit(1);
