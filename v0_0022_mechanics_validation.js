const fs = require("fs");
const vm = require("vm");
const DB = vm.runInNewContext(fs.readFileSync("data.js", "utf8") + "\nDB;", {});
const POB = require("./core.js");

const selected = {
  ...POB.DEFAULT_SELECTED,
  emblem: "emblem_s1_archmage",
  weapon: "weapon_s1_sword_dance_plus",
  head: "armor_s1_nun_meon_yeeonja",
  top: "armor_s1_apdojeogin_him",
  bottom: "armor_s1_seomsehan_sonnollim",
  gloves: "armor_s1_yuseong",
  shoes: "armor_s1_beongae_chaejjik"
};

const state = {
  mode: "raid",
  stats: { ...POB.DEFAULT_STATS },
  env: { ...POB.DEFAULT_ENV },
  classEnabled: { swordsman: true },
  selected,
  baseline: { ...POB.DEFAULT_SELECTED }
};

const profile = POB.combatProfile(state);
const mechanics = POB.mechanicProfile(DB, state, selected, profile);
const classified = POB.classifySelection(DB, selected, state);
const score = POB.normalizedValue(DB, state, selected, "avg");
const byId = Object.fromEntries(classified.runes.map((r) => [r.id, r]));

const missingSeason1ArmorIds = [
  "armor_s1_yuseong",
  "armor_s1_chosinseong",
  "armor_s1_changbaekhan_seomgwang",
  "armor_s1_illeongineun_bulkkoch",
  "armor_s1_ullyeopeojineun_cheondung",
  "armor_s1_beongae_chaejjik"
];

const tests = [
  {
    name: "missing season1 armor runes are registered",
    pass: missingSeason1ArmorIds.every((id) => Boolean(POB.runeById(DB, id)))
  },
  {
    name: "blind prophet shortens awakening cycle",
    pass: mechanics.awakeningReduction >= 38 && mechanics.effectiveAwakeningCooldown < 90
  },
  {
    name: "awakening-linked armor gains uptime but is not permanent",
    pass:
      byId.armor_s1_apdojeogin_him &&
      byId.armor_s1_apdojeogin_him.uptime >= 0.2 &&
      byId.armor_s1_apdojeogin_him.uptime < 1 &&
      byId.armor_s1_seomsehan_sonnollim &&
      byId.armor_s1_seomsehan_sonnollim.uptime >= 0.2 &&
      byId.armor_s1_seomsehan_sonnollim.uptime < 1
  },
  {
    name: "giant fragment armor is affected by awakening support without becoming 100 percent uptime",
    pass: ["armor_s1_yuseong", "armor_s1_beongae_chaejjik"].every((id) => {
      const row = byId[id];
      return row && row.uptime >= 0.7 && row.uptime < 1;
    })
  },
  {
    name: "sword dance plus is treated as near-permanent",
    pass: byId.weapon_s1_sword_dance_plus && byId.weapon_s1_sword_dance_plus.uptime >= 0.94
  },
  {
    name: "mechanic-aware value score is finite",
    pass: Number.isFinite(score.valueScore) && score.valueScore > 0
  }
];

const report = {
  pass: tests.every((t) => t.pass),
  tests,
  mechanics,
  averageUptime: classified.averageUptime,
  valueScore: score.valueScore,
  inspectedRunes: Object.fromEntries(
    Object.entries(byId).map(([id, row]) => [id, { uptime: row.uptime, score: row.score }])
  )
};

fs.writeFileSync(
  "v0_0022_mechanics_validation_report.json",
  JSON.stringify(report, null, 2),
  "utf8"
);

console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exit(1);
