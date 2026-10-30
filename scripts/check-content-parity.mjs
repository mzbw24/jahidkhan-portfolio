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
import { mediaEn } from "../data/en/media.ts";
import { mediaBn } from "../data/bn/media.ts";
import { mediaItemsEn } from "../data/en/media-items.ts";
import { mediaItemsBn } from "../data/bn/media-items.ts";
import { mediaVideosEn } from "../data/en/media-videos.ts";
import { mediaVideosBn } from "../data/bn/media-videos.ts";
import { galleryManifest } from "../data/gallery/manifest.ts";
import { generatedImages } from "../data/gallery/assets.generated.ts";
import { galleryVideos } from "../data/gallery/videos.ts";
import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

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
  media: [mediaEn, mediaBn],
};
for (const [name, [en, bn]] of Object.entries(pairs)) walk(en, bn, name);

// ---- gallery integrity ----
const root = fileURLToPath(new URL("..", import.meta.url));
const exists = (p) => existsSync(root + "public" + p);
const hasBn = /[\u0980-\u09FF]/;
const ids = [...galleryManifest.map((m) => m.id), ...galleryVideos.map((v) => v.id)];
const idSet = new Set(ids);
if (idSet.size !== ids.length) problems.push("gallery: duplicate ids");
for (const [lang, items, vids] of [["en", mediaItemsEn, mediaVideosEn], ["bn", mediaItemsBn, mediaVideosBn]]) {
  const text = { ...items, ...vids };
  for (const id of ids) {
    const t = text[id];
    if (!t || !t.title || !t.alt) problems.push(`gallery ${lang}: missing title/alt for ${id}`);
    else if (lang === "bn" && !hasBn.test(t.title)) problems.push(`gallery bn: title for ${id} has no Bengali`);
    else if (lang === "en" && hasBn.test(t.title)) problems.push(`gallery en: title for ${id} contains Bengali`);
  }
  for (const id of Object.keys(text)) if (!idSet.has(id)) problems.push(`gallery ${lang}: text for unknown id ${id}`);
}
for (const m of galleryManifest) {
  const g = generatedImages[m.id];
  if (!g) { problems.push(`gallery: ${m.id} missing in generated assets`); continue; }
  for (const f of [g.src, g.thumb]) if (!exists(f)) problems.push(`gallery: file missing ${f}`);
}
for (const v of galleryVideos) {
  for (const src of v.sources) if (!exists(src.src)) problems.push(`gallery: video file missing ${src.src}`);
  for (const f of [v.poster.src, v.poster.thumb]) if (!exists(f)) problems.push(`gallery: poster missing ${f}`);
}
// Site-wide registry (data/media.ts) is parsed as text: every at("img-NNN") must be a real generated asset.
const registry = readFileSync(root + "data/media.ts", "utf8");
const slots = [...registry.matchAll(/^\s+(\w+): at\("(img-\d+)"/gm)];
for (const [, key, id] of slots) if (!generatedImages[id]) problems.push(`media registry: ${key} -> unknown asset ${id}`);
console.log(`Gallery: ${galleryManifest.length} images, ${galleryVideos.length} videos, ${slots.length} site-wide image slots checked.`);

if (problems.length) {
  console.error(`Content parity check FAILED (${problems.length}):`);
  problems.forEach((p) => console.error(" - " + p));
  process.exit(1);
}
console.log("Content parity check passed: en and bn share identical structure for all pages.");
