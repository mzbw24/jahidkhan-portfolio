// Verifies English and Bangla content have the exact same shape (keys, array lengths, media keys, icons).
// Run with: node --experimental-strip-types scripts/check-content-parity.mjs
import { commonEn } from "../data/en/common.ts";
import { commonBn } from "../data/bn/common.ts";
import { homeEn } from "../data/en/home.ts";
import { homeBn } from "../data/bn/home.ts";
import { aboutEn } from "../data/en/about.ts";
import { aboutBn } from "../data/bn/about.ts";
import { visionEn } from "../data/en/vision.ts";
import { visionBn } from "../data/bn/vision.ts";
import { contactEn } from "../data/en/contact.ts";
import { contactBn } from "../data/bn/contact.ts";

const NON_TRANSLATED = new Set(["icon", "image", "href", "key", "kind", "video", "id"]);
const OPTIONAL_KEYS = new Set(["titleEnd"]); // heading part only some languages need
const LANGUAGE_NEUTRAL = new Set(["contact.form.fields.email.placeholder", "contact.form.fields.phone.placeholder"]);
const problems = [];

function walk(a, b, path) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
      problems.push(`${path}: array length differs (${a?.length} vs ${b?.length})`);
      return;
    }
    a.forEach((item, i) => walk(item, b[i], `${path}[${i}]`));
    return;
  }
  if (a && typeof a === "object") {
    if (!b || typeof b !== "object") return problems.push(`${path}: missing object in bn`);
    const ak = Object.keys(a).filter((k) => !OPTIONAL_KEYS.has(k)).sort().join(",");
    const bk = Object.keys(b).filter((k) => !OPTIONAL_KEYS.has(k)).sort().join(",");
    if (ak !== bk) problems.push(`${path}: keys differ\n   en: ${ak}\n   bn: ${bk}`);
    for (const k of Object.keys(a)) if (k in b) walk(a[k], b[k], `${path}.${k}`);
    return;
  }
  const leaf = path.split(".").pop().replace(/\[\d+\]$/, "");
  if (typeof a !== typeof b) problems.push(`${path}: type differs`);
  else if (NON_TRANSLATED.has(leaf)) {
    if (a !== b) problems.push(`${path}: non-translated value differs ("${a}" vs "${b}")`);
  } else if (typeof a === "string" && a !== "" && a === b && /[A-Za-z]{4,}/.test(a) && !LANGUAGE_NEUTRAL.has(path)) {
    problems.push(`${path}: bn value identical to en ("${a}") — untranslated?`);
  }
}

const pairs = {
  common: [commonEn, commonBn],
  home: [homeEn, homeBn],
  about: [aboutEn, aboutBn],
  vision: [visionEn, visionBn],
  contact: [contactEn, contactBn],
};
for (const [name, [en, bn]] of Object.entries(pairs)) walk(en, bn, name);

if (problems.length) {
  console.error(`Content parity check FAILED (${problems.length}):`);
  problems.forEach((p) => console.error(" - " + p));
  process.exit(1);
}
console.log("Content parity check passed: en and bn share identical structure for all pages.");
