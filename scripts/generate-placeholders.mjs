// Generates neutral, generic SVG placeholder illustrations into public/images.
// These are NOT photos of anyone. Replace with real photography (update data/media.ts).
// Run: node scripts/generate-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const wrap = (w, h, title, defs, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title><defs>${defs}</defs>${body}</svg>`;

const grad = (id, stops, vertical = true) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join("")}</linearGradient>`;

const label = (w, h, text = "Placeholder image") =>
  `<text x="14" y="${h - 14}" font-family="Arial, sans-serif" font-size="${Math.max(11, Math.round(w / 60))}" fill="#fff" fill-opacity=".55">${text}</text>`;

function hills(w, baseY, color, amp, seed, opacity = 1) {
  const r = rng(seed);
  const p1 = r() * 6, p2 = r() * 6;
  let d = `M0 ${baseY}`;
  for (let x = 0; x <= w; x += 20) {
    const y = baseY - amp * (0.55 + 0.3 * Math.sin(x / (w / 4) + p1) + 0.15 * Math.sin(x / (w / 9) + p2));
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return `<path d="${d} L${w} 9999 L0 9999 Z" fill="${color}" fill-opacity="${opacity}"/>`;
}

function skyline(w, baseY, color, seed, minH, maxH, windows = false, x0 = 0, x1 = w) {
  const r = rng(seed);
  let out = "";
  let x = x0;
  while (x < x1) {
    const bw = 24 + r() * 46;
    const bh = minH + r() * (maxH - minH);
    out += `<rect x="${x.toFixed(0)}" y="${(baseY - bh).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}" fill="${color}"/>`;
    if (windows) {
      for (let wy = baseY - bh + 10; wy < baseY - 8; wy += 14) {
        for (let wx = x + 6; wx < x + bw - 8; wx += 12) {
          if (r() > 0.55) out += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="5" height="7" fill="#ffd77a" fill-opacity=".8"/>`;
        }
      }
    }
    x += bw + 2 + r() * 6;
  }
  return out;
}

function person(cx, baseY, s, suit = "#1d3a6e", skin = "#c8956d", hair = "#1b1b1f", opts = {}) {
  const hr = 22 * s;
  const headY = baseY - 150 * s;
  return `<g>
    <path d="M${cx - 62 * s} ${baseY} Q${cx - 62 * s} ${headY + 62 * s} ${cx} ${headY + 56 * s} Q${cx + 62 * s} ${headY + 62 * s} ${cx + 62 * s} ${baseY} Z" fill="${suit}"/>
    <rect x="${cx - 9 * s}" y="${headY + 30 * s}" width="${18 * s}" height="${26 * s}" fill="${skin}"/>
    <ellipse cx="${cx}" cy="${headY}" rx="${hr}" ry="${hr * 1.18}" fill="${skin}"/>
    ${opts.cap ? `<path d="M${cx - hr * 1.05} ${headY - hr * 0.3} Q${cx} ${headY - hr * 1.9} ${cx + hr * 1.05} ${headY - hr * 0.3} Z" fill="#f3f3f0"/>` : opts.hijab ? `<path d="M${cx - hr * 1.3} ${headY + hr * 1.5} Q${cx - hr * 1.5} ${headY - hr * 1.6} ${cx} ${headY - hr * 1.5} Q${cx + hr * 1.5} ${headY - hr * 1.6} ${cx + hr * 1.3} ${headY + hr * 1.5} Q${cx} ${headY + hr * 0.9} ${cx - hr * 1.3} ${headY + hr * 1.5} Z" fill="${opts.hijab}"/>` : `<path d="M${cx - hr} ${headY - hr * 0.1} Q${cx} ${headY - hr * 1.7} ${cx + hr} ${headY - hr * 0.1} Q${cx} ${headY - hr * 0.7} ${cx - hr} ${headY - hr * 0.1} Z" fill="${hair}"/>`}
    ${opts.beard ? `<path d="M${cx - hr * 0.9} ${headY + hr * 0.3} Q${cx} ${headY + hr * 1.9} ${cx + hr * 0.9} ${headY + hr * 0.3} Q${cx} ${headY + hr * 0.9} ${cx - hr * 0.9} ${headY + hr * 0.3} Z" fill="${opts.beard}"/>` : ""}
  </g>`;
}

function group(w, baseY, n, seed, s = 1) {
  const r = rng(seed);
  const suits = ["#1d3a6e", "#2b2f3a", "#46524a", "#3a2f4d", "#1f4a5c"];
  const skins = ["#c8956d", "#a9744f", "#d9a77d", "#8d5a3b"];
  let out = "";
  for (let i = 0; i < n; i++) {
    const cx = ((i + 0.5) / n) * w + (r() - 0.5) * 24;
    const sc = s * (0.85 + r() * 0.3);
    out += person(cx, baseY + r() * 14, sc, suits[i % suits.length], skins[Math.floor(r() * skins.length)], "#1b1b1f", {
      beard: r() > 0.6 ? "#2a211c" : undefined,
    });
  }
  return out;
}

function cross(cx, cy, s, color = "#e60012") {
  return `<rect x="${cx - s}" y="${cy - s * 0.32}" width="${s * 2}" height="${s * 0.64}" rx="3" fill="${color}"/><rect x="${cx - s * 0.32}" y="${cy - s}" width="${s * 0.64}" height="${s * 2}" rx="3" fill="${color}"/>`;
}

function tree(cx, baseY, s, color = "#2f7d46") {
  return `<rect x="${cx - 4 * s}" y="${baseY - 30 * s}" width="${8 * s}" height="${30 * s}" fill="#5b3b25"/><circle cx="${cx}" cy="${baseY - 52 * s}" r="${30 * s}" fill="${color}"/><circle cx="${cx - 18 * s}" cy="${baseY - 38 * s}" r="${20 * s}" fill="${color}"/><circle cx="${cx + 18 * s}" cy="${baseY - 38 * s}" r="${20 * s}" fill="${color}"/>`;
}

const files = {};
const add = (name, svg) => (files[name] = svg);

/* ---- Portraits (generic silhouettes, intentionally faceless) ---- */
function portraitSvg(name, w, h, backdrop, extra = "") {
  const cx = w / 2;
  const body = `
    ${backdrop}
    <path d="M${cx - 330} ${h} Q${cx - 330} ${h * 0.62} ${cx - 140} ${h * 0.575} L${cx} ${h * 0.64} L${cx + 140} ${h * 0.575} Q${cx + 330} ${h * 0.62} ${cx + 330} ${h} Z" fill="#1d3a6e"/>
    <path d="M${cx - 95} ${h * 0.585} L${cx} ${h * 0.7} L${cx + 95} ${h * 0.585} L${cx + 60} ${h * 0.56} L${cx - 60} ${h * 0.56} Z" fill="#f4f4f1"/>
    <path d="M${cx - 18} ${h * 0.66} L${cx + 18} ${h * 0.66} L${cx + 26} ${h * 0.86} L${cx} ${h * 0.9} L${cx - 26} ${h * 0.86} Z" fill="#d1141f"/>
    <path d="M${cx - 16} ${h * 0.72} L${cx + 16} ${h * 0.72} M${cx - 18} ${h * 0.78} L${cx + 18} ${h * 0.78} M${cx - 20} ${h * 0.84} L${cx + 20} ${h * 0.84}" stroke="#1d3a8c" stroke-width="7"/>
    <rect x="${cx - 42}" y="${h * 0.47}" width="84" height="${h * 0.1}" rx="20" fill="#bb8560"/>
    <ellipse cx="${cx}" cy="${h * 0.37}" rx="132" ry="162" fill="#c8956d"/>
    <path d="M${cx - 140} ${h * 0.35} Q${cx - 130} ${h * 0.17} ${cx} ${h * 0.165} Q${cx + 130} ${h * 0.17} ${cx + 140} ${h * 0.35} Q${cx + 118} ${h * 0.25} ${cx} ${h * 0.26} Q${cx - 118} ${h * 0.25} ${cx - 140} ${h * 0.35} Z" fill="#1a1a1f"/>
    <path d="M${cx - 120} ${h * 0.4} Q${cx} ${h * 0.55} ${cx + 120} ${h * 0.4} Q${cx + 100} ${h * 0.5} ${cx} ${h * 0.51} Q${cx - 100} ${h * 0.5} ${cx - 120} ${h * 0.4} Z" fill="#2a211c" fill-opacity=".85"/>
    ${extra}
    <text x="${cx}" y="${h * 0.95}" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#fff" fill-opacity=".6">PHOTO PLACEHOLDER</text>`;
  add(name, wrap(w, h, "Placeholder portrait (replace with official photo)", "", body));
}
portraitSvg("portrait", 800, 1000, "");
portraitSvg("portrait-card", 800, 1000, `<defs>${grad("pc", [[0, "#cfd8e6"], [1, "#8ea3bf"]])}</defs><rect width="800" height="1000" fill="url(#pc)"/><circle cx="140" cy="180" r="90" fill="#fff" fill-opacity=".25"/><circle cx="660" cy="320" r="130" fill="#fff" fill-opacity=".18"/><circle cx="600" cy="120" r="50" fill="#fff" fill-opacity=".2"/>`);
portraitSvg("portrait-podium", 800, 1000, `<defs>${grad("pp", [[0, "#2c5b3a"], [1, "#16301f"]])}</defs><rect width="800" height="1000" fill="url(#pp)"/>${[80, 250, 560, 700].map((x, i) => tree(x, 560 + i * 20, 3.2, "#3d8a52")).join("")}`,
  `<rect x="${400 - 190}" y="820" width="380" height="180" fill="#8a5a32"/><rect x="${400 - 190}" y="820" width="380" height="14" fill="#a5703f"/><rect x="${400 + 60}" y="690" width="6" height="140" fill="#222"/><circle cx="${400 + 63}" cy="684" r="12" fill="#222"/>`);

/* ---- Wide scenes ---- */
add("hero-city", wrap(1600, 800, "Placeholder city at dusk", grad("s", [[0, "#1a2556"], [0.55, "#b2506b"], [0.85, "#f2a65e"], [1, "#f6c27a"]]) + grad("r", [[0, "#3a3f6e"], [1, "#12172e"]]),
  `<rect width="1600" height="800" fill="url(#s)"/>
   ${hills(1600, 520, "#2a2650", 220, 1)}${hills(1600, 560, "#1c1b3d", 170, 2)}
   ${skyline(1600, 640, "#12172e", 7, 40, 190, true)}
   <rect y="640" width="1600" height="160" fill="url(#r)"/>
   ${skyline(1600, 640, "#2b3158", 8, 20, 90).replace(/<rect /g, '<rect transform="translate(0 1280) scale(1 -1)" opacity=".35" ')}
   ${label(1600, 800)}`));
add("tea-garden", wrap(1600, 700, "Placeholder green hills", grad("s", [[0, "#9fd0e6"], [1, "#e8f3ea"]]),
  `<rect width="1600" height="700" fill="url(#s)"/>${hills(1600, 330, "#5f9e6e", 170, 3)}${hills(1600, 440, "#3f8a52", 190, 4)}${hills(1600, 560, "#2f7a45", 200, 5)}${hills(1600, 700, "#236137", 230, 6)}
   ${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${470 + i * 26} Q800 ${430 + i * 26} 1600 ${480 + i * 26}" stroke="#1d5a30" stroke-opacity=".35" stroke-width="3" fill="none"/>`).join("")}${label(1600, 700)}`));
add("city-aerial", wrap(1200, 700, "Placeholder river city", grad("s", [[0, "#6fb2e0"], [1, "#d7ecf7"]]) + grad("w", [[0, "#4a7fa8"], [1, "#2b5675"]]),
  `<rect width="1200" height="700" fill="url(#s)"/>${hills(1200, 330, "#6f8fa8", 150, 9, 0.7)}${hills(1200, 380, "#4e8a62", 120, 10)}
   ${skyline(1200, 470, "#8d99a8", 11, 40, 150)}${skyline(1200, 500, "#c1624a", 12, 30, 90)}
   <path d="M0 520 Q300 480 600 540 T1200 520 L1200 700 L0 700 Z" fill="url(#w)"/>
   <rect x="380" y="530" width="460" height="12" fill="#e9e4da"/>${[400, 520, 640, 760].map((x) => `<rect x="${x}" y="540" width="6" height="40" fill="#e9e4da"/>`).join("")}${label(1200, 700)}`));
add("city-today", wrap(1000, 600, "Placeholder: Sylhet today", grad("s", [[0, "#9a948a"], [1, "#d9d3c7"]]),
  `<rect width="1000" height="600" fill="url(#s)"/>${hills(1000, 300, "#7b7a6e", 90, 13, 0.6)}${skyline(1000, 470, "#7d6f66", 14, 30, 110)}${skyline(1000, 540, "#a1665a", 15, 20, 70)}
   <rect y="500" width="1000" height="100" fill="#55524d"/><rect y="545" width="1000" height="6" fill="#d8c26b" fill-opacity=".7"/>
   ${[100, 340, 620, 820].map((x) => `<rect x="${x}" y="515" width="56" height="26" rx="6" fill="#b34a3c"/>`).join("")}${label(1000, 600)}`));
add("city-tomorrow", wrap(1000, 600, "Placeholder: Sylhet tomorrow", grad("s", [[0, "#5fb0e8"], [1, "#eaf6fb"]]) + grad("g", [[0, "#8fd0e6"], [1, "#3b88a8"]]),
  `<rect width="1000" height="600" fill="url(#s)"/>${hills(1000, 330, "#5fa27a", 110, 16, 0.8)}${skyline(1000, 470, "url(#g)", 17, 80, 290)}
   <rect y="470" width="1000" height="130" fill="#3a7f98"/>${[60, 260, 520, 780, 920].map((x) => tree(x, 500, 1.1)).join("")}
   <path d="M0 540 Q500 500 1000 545" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none"/>${label(1000, 600)}`));
add("crowd", wrap(1600, 600, "Placeholder rally crowd", grad("s", [[0, "#2a1a2a"], [0.5, "#7a2a2a"], [1, "#e0783a"]]),
  `<rect width="1600" height="600" fill="url(#s)"/>${[200, 520, 900, 1300].map((x, i) => `<rect x="${x}" y="${120 + i * 14}" width="${150}" height="90" fill="${i % 2 ? "#0f6b3f" : "#0f6b3f"}" fill-opacity=".85"/><circle cx="${x + 75}" cy="${165 + i * 14}" r="30" fill="#c1121f"/>`).join("")}
   ${[0, 1, 2].map((row) => `<g fill="#10121c" fill-opacity="${0.55 + row * 0.2}">${Array.from({ length: 28 }, (_, i) => `<circle cx="${i * 62 + (row % 2) * 31 + 20}" cy="${400 + row * 60}" r="${20 + row * 4}"/><rect x="${i * 62 + (row % 2) * 31 - 8}" y="${420 + row * 60}" width="${56 + row * 8}" height="120"/>`).join("")}</g>`).join("")}
   <rect width="1600" height="600" fill="#0a1020" fill-opacity=".25"/>${label(1600, 600)}`));
add("global-band", wrap(1600, 500, "Placeholder: California to Sylhet", grad("s", [[0, "#1b2a5c"], [0.6, "#c0536b"], [1, "#f0a35e"]]),
  `<rect width="1600" height="500" fill="url(#s)"/>${hills(1600, 360, "#2a2650", 150, 18)}${skyline(1600, 440, "#12172e", 19, 40, 160, true, 760, 1600)}
   <rect y="440" width="1600" height="60" fill="#12172e"/>
   <g fill="#c0392b"><rect x="170" y="140" width="14" height="300"/><rect x="480" y="140" width="14" height="300"/><rect x="60" y="300" width="560" height="10"/></g>
   <path d="M0 360 Q177 150 177 150 Q330 330 487 150 Q487 150 640 360" stroke="#c0392b" stroke-width="5" fill="none"/>${label(1600, 500)}`));
add("connect-band", wrap(1400, 600, "Placeholder group conversation", grad("s", [[0, "#10203f"], [1, "#2b3b63"]]),
  `<rect width="1400" height="600" fill="url(#s)"/><circle cx="1000" cy="200" r="220" fill="#fff" fill-opacity=".05"/>${group(1100, 600, 5, 21, 1.45).replace("<g>", '<g transform="translate(300 0)"><g>')}</g>${label(1400, 600)}`));
add("running-photo", wrap(900, 560, "Placeholder community meeting", grad("s", [[0, "#e8d8b8"], [1, "#b38f6a"]]),
  `<rect width="900" height="560" fill="url(#s)"/>${hills(900, 330, "#6e8f5e", 100, 22, 0.8)}${[110, 760].map((x) => tree(x, 420, 2.2)).join("")}${person(330, 560, 2.6, "#1d3a6e")}${person(600, 560, 2.5, "#f1efe8", "#8d5a3b", "#fff", { cap: true, beard: "#e8e8e8" })}${label(900, 560)}`));

/* ---- Focus areas (600x400) ---- */
const focus = {
  education: ["#c9d9ee", "#7c9bc4", () => `<rect x="170" y="190" width="260" height="150" fill="#f2ede4"/><path d="M150 190 L300 110 L450 190 Z" fill="#b85a3a"/>${[200, 250, 300, 350, 400].map((x) => `<rect x="${x - 6}" y="200" width="12" height="130" fill="#d9d2c4"/>`).join("")}${group(600, 380, 4, 23, 0.7)}`],
  health: ["#dff0f2", "#8fc6cf", () => `<rect x="160" y="110" width="280" height="240" fill="#f8fafb"/>${cross(300, 190, 44)}${[190, 250, 310, 370].map((x) => `<rect x="${x}" y="260" width="34" height="34" fill="#9bc4d0"/>`).join("")}`],
  infrastructure: ["#bcd7ea", "#6f9bb7", () => `<path d="M0 330 L600 330 L600 400 L0 400 Z" fill="#4b4f57"/><path d="M0 250 Q300 90 600 250" stroke="#6b7480" stroke-width="12" fill="none"/>${[100, 180, 260, 340, 420, 500].map((x) => `<rect x="${x}" y="${170 + Math.abs(x - 300) / 12}" width="5" height="${160 - Math.abs(x - 300) / 12}" fill="#6b7480"/>`).join("")}<rect x="0" y="330" width="600" height="8" fill="#e9e4da"/>`],
  environment: ["#cdeac8", "#6fb36f", () => `${hills(600, 300, "#4d9a5a", 110, 24)}${[110, 230, 360, 480].map((x, i) => tree(x, 360 + (i % 2) * 14, 1.6)).join("")}`],
  welfare: ["#f4e1cf", "#d9a47d", () => group(600, 360, 3, 25, 1.4)],
  digital: ["#cfd9f2", "#6b86c9", () => `<rect x="150" y="110" width="300" height="190" rx="12" fill="#1b2548"/><rect x="164" y="124" width="272" height="162" fill="#2c4fa8"/>${Array.from({ length: 24 }, (_, i) => `<circle cx="${190 + (i % 8) * 32}" cy="${150 + Math.floor(i / 8) * 40}" r="7" fill="#9fc0ff" fill-opacity="${0.4 + (i % 5) * 0.12}"/>`).join("")}<rect x="250" y="300" width="100" height="14" fill="#1b2548"/>`],
  business: ["#c5d6ea", "#7f9cc0", () => `${skyline(600, 360, "#2b3b63", 26, 90, 250, true)}`],
  safety: ["#d6d2ea", "#8a80c4", () => `${skyline(600, 380, "#3b3f6b", 27, 50, 140)}<path d="M300 90 L400 130 L400 220 Q400 290 300 330 Q200 290 200 220 L200 130 Z" fill="#6d4bc4"/><path d="M262 210 L292 240 L342 170" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`],
};
for (const [k, [a, b, draw]] of Object.entries(focus)) {
  add(`focus-${k}`, wrap(600, 400, `Placeholder: ${k}`, grad("s", [[0, a], [1, b]]), `<rect width="600" height="400" fill="url(#s)"/>${draw()}${label(600, 400)}`));
}

/* ---- Gallery (700x460) ---- */
const gallery = {
  people: ["#d9c7a8", "#9a7b57", () => group(700, 470, 5, 31, 1.5)],
  community: ["#cfe0cf", "#6e9a6e", () => `${[90, 600].map((x) => tree(x, 420, 2)).join("")}<rect x="250" y="260" width="200" height="14" fill="#8a5a32"/><rect x="260" y="274" width="10" height="90" fill="#8a5a32"/><rect x="430" y="274" width="10" height="90" fill="#8a5a32"/>${person(350, 300, 1.6)}${group(700, 470, 3, 32, 1.2)}`],
  partners: ["#cfd6e6", "#7d8fb3", () => `<rect x="120" y="290" width="460" height="18" fill="#6b4a2b"/><rect x="170" y="258" width="360" height="34" fill="#f4f2ec"/>${group(700, 300, 4, 33, 1.3)}`],
  future: ["#f7d9a8", "#e0786a", () => `<circle cx="350" cy="250" r="110" fill="#ffe9a8" fill-opacity=".8"/>${hills(700, 400, "#4f7d62", 120, 34)}${skyline(700, 410, "#2b3b63", 35, 60, 210, false, 260, 700)}`],
};
for (const [k, [a, b, draw]] of Object.entries(gallery)) {
  add(`gallery-${k === "partners" ? "partners" : k}`, wrap(700, 460, `Placeholder: ${k}`, grad("s", [[0, a], [1, b]]), `<rect width="700" height="460" fill="url(#s)"/>${draw()}${label(700, 460)}`));
}

/* ---- Challenges (360x520) ---- */
const challenge = {
  traffic: ["#9aa0a8", "#5a5f68", () => `<rect y="300" width="360" height="220" fill="#3f4249"/><rect y="400" width="360" height="6" fill="#d8c26b" fill-opacity=".8"/>${[20, 150, 250].map((x, i) => `<rect x="${x}" y="${330 + i * 30}" width="80" height="40" rx="8" fill="${["#b34a3c", "#d8c26b", "#4a6fb3"][i]}"/>`).join("")}${skyline(360, 300, "#2e3138", 41, 80, 190)}`],
  hospital: ["#d6ecf2", "#8ec0cf", () => `<rect x="50" y="180" width="260" height="340" fill="#f8fafb"/>${cross(180, 270, 42)}${[80, 150, 220].flatMap((x) => [330, 400, 460].map((y) => `<rect x="${x}" y="${y}" width="34" height="34" fill="#9bc4d0"/>`)).join("")}`],
  waste: ["#b9b09b", "#6f6a58", () => `${[60, 140, 230, 300].map((x, i) => `<ellipse cx="${x}" cy="${470 - (i % 2) * 20}" rx="${60 + i * 6}" ry="${50}" fill="${["#6b5a3a", "#3a6b4a", "#7a3a3a", "#3a4a7a"][i]}"/>`).join("")}${skyline(360, 330, "#4a4538", 42, 60, 150)}`],
  youth: ["#f1d6b8", "#c58f66", () => group(360, 520, 3, 43, 1.9)],
};
for (const [k, [a, b, draw]] of Object.entries(challenge)) {
  add(`challenge-${k}`, wrap(360, 520, `Placeholder: ${k}`, grad("s", [[0, a], [1, b]]), `<rect width="360" height="520" fill="url(#s)"/>${draw()}`));
}

/* ---- News + projects (600x380) ---- */
const card = {
  "news-portrait": ["#2a3b63", "#10203f", () => person(300, 400, 2.4)],
  "news-city": ["#6fb2e0", "#d7ecf7", () => `${hills(600, 250, "#4e8a62", 90, 51)}${skyline(600, 330, "#8d99a8", 52, 40, 140)}<rect y="330" width="600" height="50" fill="#3a6f8f"/>`],
  "news-youth": ["#e8d8b8", "#b38f6a", () => group(600, 400, 5, 53, 1.3)],
  "news-video": ["#1b2a5c", "#f0a35e", () => `${hills(600, 270, "#2a2650", 90, 54)}${skyline(600, 330, "#12172e", 55, 30, 120, true)}<rect y="330" width="600" height="50" fill="#12172e"/>`],
  "project-a": ["#cfe0cf", "#6e9a6e", () => `${[90, 510].map((x) => tree(x, 340, 1.8)).join("")}${group(600, 390, 3, 61, 1.2)}`],
  "project-b": ["#cfd9f2", "#6b86c9", () => `<rect x="150" y="90" width="300" height="130" fill="#f4f2ec"/>${group(600, 390, 4, 62, 1.1)}`],
  "project-c": ["#c5d6ea", "#7f9cc0", () => `${skyline(600, 330, "#2b3b63", 63, 80, 200, true)}${group(600, 400, 3, 64, 1)}`],
};
for (const [k, [a, b, draw]] of Object.entries(card)) {
  add(k, wrap(600, 380, `Placeholder: ${k}`, grad("s", [[0, a], [1, b]]), `<rect width="600" height="380" fill="url(#s)"/>${draw()}${label(600, 380)}`));
}

/* ---- Avatars (240x280): generic, not real people ---- */
const avatar = (name, bg, suit, skin, opts) =>
  add(name, wrap(240, 280, "Placeholder avatar", grad("s", [[0, bg], [1, "#8aa0bd"]]), `<rect width="240" height="280" fill="url(#s)"/>${person(120, 300, 1.35, suit, skin, "#1b1b1f", opts)}`));
avatar("avatar-a", "#cbd6e6", "#3a5a8c", "#c8956d", {});
avatar("avatar-b", "#d9d2c4", "#f1efe8", "#8d5a3b", { cap: true, beard: "#ececec" });
avatar("avatar-c", "#e3d6e6", "#5a4a7a", "#d9a77d", { hijab: "#e8e3ef" });

for (const [name, svg] of Object.entries(files)) writeFileSync(join(OUT, `${name}.svg`), svg);
console.log(`Wrote ${Object.keys(files).length} placeholder SVGs to public/images`);
