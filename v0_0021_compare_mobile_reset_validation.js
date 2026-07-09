const fs = require("fs");
const path = require("path");
const vm = require("vm");
const POB = require("./core.js");

const root = __dirname;
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const app = read("app.js");
const css = read("style.css");
const html = read("index.html");
const DB = vm.runInNewContext(read("data.js") + "\nDB;", {});

const checks = [];
function check(name, pass, detail = "") {
  checks.push({ name, pass: Boolean(pass), detail });
}

check("version label is v0.0022", html.includes("v0.0022") && app.includes("v0.0022"));
check("compare card uses two-line readable layout", app.includes("compareRuneCardInner") && app.includes("compare-rune-name") && app.includes("compare-rune-meta"));
check("compare percent font is compact", /\.compare-rune-meta b\{[^}]*font-size:12px/.test(css));
check("recommendation uses tag focus and uptime sorting", app.includes("runeRecommendationScore") && app.includes("POB.runeFocusScore") && app.includes("b.uptime-a.uptime"));
check("reset normalizes fresh state and clears stat inputs", app.includes("state=normalizeState(freshState())") && app.includes("[data-stat],[data-env],[data-env-choice]"));
check("mobile page scroll is not trapped in equipment panel", css.includes("@media(max-width:760px)") && css.includes(".equip-panel{position:static;max-height:none;overflow:visible"));

const qa = POB.runSelfTest(DB);
check("core self tests pass", qa.tests.every(t => t.pass), qa.tests.map(t => `${t.pass ? "PASS" : "FAIL"} ${t.name}`).join("; "));

const base = {
  mode: "raid",
  selected: { ...POB.DEFAULT_SELECTED },
  baseline: { ...POB.DEFAULT_SELECTED },
  compareSelected: { ...POB.DEFAULT_SELECTED },
  focusTags: ["attack"],
  stats: { ...POB.DEFAULT_STATS },
  env: { ...POB.DEFAULT_ENV },
  classEnabled: { swordsman: false }
};
const weapon = (DB.runes.weapon || []).find(r => POB.runeFocusScore(r, base.focusTags) > 0.25);
check("tag focus can find a matching weapon rune", Boolean(weapon), weapon ? weapon.name : "no matching rune");
if (weapon) {
  const delta = POB.slotValueDelta(DB, base, "weapon", weapon.id, "avg");
  check("slot delta returns finite value", Number.isFinite(delta.diffPct), String(delta.diffPct));
}

const report = {
  createdAt: new Date().toISOString(),
  pass: checks.every(c => c.pass),
  checks
};
fs.writeFileSync(path.join(root, "v0_0021_compare_mobile_reset_validation.json"), JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify(report, null, 2));
process.exit(report.pass ? 0 : 1);
