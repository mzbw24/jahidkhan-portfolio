
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");
const SOURCE_DIRS = ["app", "components", "data", "lib", "hooks"];
const MEDIA_EXT = /\.(jpe?g|png|webp|avif|gif|svg|ico|mp4|webm)$/i;

function existsExact(urlPath) {
  let dir = PUBLIC;
  for (const segment of urlPath.split("/").filter(Boolean)) {
    if (!readdirSync(dir).includes(segment)) return false;
    dir = join(dir, segment);
  }
  return existsSync(dir);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (/\.(ts|tsx|css|mjs)$/.test(name)) yield full;
  }
}

const problems = [];
const checked = new Set();
function check(urlPath, from) {
  const clean = decodeURI(urlPath.split("?")[0].split("#")[0]);
  const key = `${clean}|${from}`;
  if (checked.has(key)) return;
  checked.add(key);
  if (!existsExact(clean)) problems.push({ path: clean, from });
}

const literal = /["'`](\/(?:images|media)\/[^"'`\s$]+)["'`]/g;
for (const dir of SOURCE_DIRS) {
  if (!existsSync(join(ROOT, dir))) continue;
  for (const file of walk(join(ROOT, dir))) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(literal)) {
      if (MEDIA_EXT.test(match[1])) check(match[1], relative(ROOT, file));
    }
  }
}

const manifests = [
  ["data/jcdo/images.generated.ts", "/images/jcdo/"],
  ["data/yis/images.generated.ts", "/images/ys/"],
  ["data/family/images.generated.ts", "/images/family/"],
];
for (const [manifest, prefix] of manifests) {
  const path = join(ROOT, manifest);
  if (!existsSync(path)) continue;
  for (const match of readFileSync(path, "utf8").matchAll(/file: "([^"]+)"/g)) check(prefix + match[1], manifest);
}

const familyData = join(ROOT, "data/en/family.ts");
if (existsSync(familyData)) {
  const text = readFileSync(familyData, "utf8");
  if (text.includes('"image-family.jpeg"')) check("/images/family/image-family.jpeg", "data/en/family.ts");
  const counts = [...text.matchAll(/length:\s*(\d+)\s*\}/g)].map((m) => Number(m[1]));
  const [familyCount, imageCount] = counts;
  for (let i = 1; i <= (familyCount ?? 0); i++) check(`/images/family/image-family (${i}).jpeg`, "data/en/family.ts");
  for (let i = 1; i <= (imageCount ?? 0); i++) check(`/images/family/image (${i}).jpeg`, "data/en/family.ts");
}

if (problems.length > 0) {
  console.error(`\n✖ ${problems.length} referenced asset(s) are missing from /public (or differ in capitalisation):\n`);
  for (const p of problems) console.error(`  ${p.path}\n    referenced in ${p.from}`);
  console.error("\nAdd the file (and commit it), or fix the path. Production servers are case-sensitive.\n");
  process.exit(1);
}
console.log(`✔ verify-assets: ${checked.size} asset reference(s) found in /public with exact capitalisation.`);
