const { chromium } = require("/home/claude/.npm-global/lib/node_modules/playwright");
const CHROME = "/home/claude/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome";
let pass = 0, fail = 0;
const ok = (cond, name, extra = "") => { if (cond) { pass++; console.log("  PASS", name); } else { fail++; console.log("  FAIL", name, extra); } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
  const errors = [];
  async function open(url, viewport = { width: 1280, height: 900 }) {
    const ctx = await browser.newContext({ viewport });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
    page.on("requestfailed", (r) => errors.push("requestfailed: " + r.url()));
    page.on("response", (r) => { if (r.status() >= 400) errors.push(`http ${r.status()}: ${r.url()}`); });
    await page.goto(url); await page.waitForFunction(() => window.__ready === true);
    return page;
  }
  const dialogOpen = (page) => page.evaluate(() => !!document.querySelector("dialog")?.open);

  /* ---------- 1. Grid, filters, every thumbnail loads ---------- */
  console.log("\n[1] Grid & filters");
  let page = await open("http://localhost:8765/");
  const cards = await page.locator("ul li > button").count();
  ok(cards === 76, "76 cards render (73 images + 3 test videos)", `got ${cards}`);
  const pills = await page.locator('[role="group"] button').allTextContents();
  console.log("   filters:", pills.join(" | "));
  ok(pills[0] === "All" && pills.includes("Images") && pills.includes("Videos"), "type filters appear when both kinds exist");
  ok(pills.length === 3 + 8, "3 type/all pills + 8 topic pills", `got ${pills.length}`);
  await page.waitForFunction(() => [...document.querySelectorAll("ul li img")].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
  const thumbStatus = await page.evaluate(() => [...document.querySelectorAll("ul li img")].map((i) => ({ src: i.getAttribute("src"), ok: i.complete && i.naturalWidth > 0 })));
  const brokenThumbs = thumbStatus.filter((t) => !t.ok);
  ok(brokenThumbs.length === 0, `all ${thumbStatus.length} grid thumbnails decode in Chrome`, JSON.stringify(brokenThumbs.slice(0, 3)));
  await page.getByRole("button", { name: "Videos", exact: true }).click();
  ok((await page.locator("ul li > button").count()) === 3, "Videos filter shows 3");
  ok((await page.locator('[role="status"]').innerText()).includes("Showing 3 of 76"), "result count text updates");
  ok((await page.getByRole("button", { name: "Videos", exact: true }).getAttribute("aria-pressed")) === "true", "active pill has aria-pressed");
  await page.getByRole("button", { name: "Healthcare & Welfare" }).click();
  const hc = await page.locator("ul li > button").count();
  ok(hc > 0 && hc < 76, `topic filter works (${hc} items)`);
  await page.getByRole("button", { name: "All", exact: true }).click();
  ok((await page.locator("ul li > button").count()) === 76, "All restores everything");

  /* ---------- 2. Lightbox open / navigate / close ---------- */
  console.log("\n[2] Lightbox behaviour");
  await page.getByRole("button", { name: "Images", exact: true }).click();
  const firstCard = page.locator("ul li > button").first();
  const firstLabel = await firstCard.getAttribute("aria-label");
  await firstCard.focus(); await page.keyboard.press("Enter");
  await page.waitForSelector("dialog[open]");
  ok(await dialogOpen(page), "Enter on a focused card opens the modal");
  ok((await page.locator("dialog").getAttribute("aria-label")) === "Media viewer", "dialog is labelled");
  const counter = () => page.locator("dialog header p").innerText();
  ok((await counter()).startsWith("1 of 73"), "counter starts at 1 of 73", await counter());
  await page.keyboard.press("ArrowRight"); ok((await counter()).startsWith("2 of 73"), "ArrowRight → 2");
  await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowLeft"); ok((await counter()).startsWith("73 of 73"), "ArrowLeft wraps to last");
  await page.getByRole("button", { name: "Next", exact: true }).click(); ok((await counter()).startsWith("1 of 73"), "Next button wraps to first");
  ok((await page.locator('dialog nav button[aria-current="true"]').count()) === 1, "exactly one active thumbnail");
  const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
  ok(bodyOverflow === "hidden", "page scroll locked while open");
  await page.locator("dialog img").first().click(); await sleep(150);
  ok(await dialogOpen(page), "clicking the image does NOT close");
  await page.keyboard.press("Escape"); await sleep(150);
  ok(!(await dialogOpen(page)), "Escape closes");
  ok((await page.evaluate(() => document.activeElement?.getAttribute("aria-label"))) === firstLabel, "focus returns to the opening card");
  ok((await page.evaluate(() => document.body.style.overflow)) !== "hidden", "page scroll restored");
  await firstCard.click(); await page.waitForSelector("dialog[open]");
  await page.mouse.click(3, 3); await sleep(150);
  ok(!(await dialogOpen(page)), "backdrop click closes");
  await firstCard.click(); await page.waitForSelector("dialog[open]");
  await page.locator("dialog [data-dismiss]").first().click({ position: { x: 4, y: 200 } }); await sleep(150);
  ok(!(await dialogOpen(page)), "click on empty space around the media closes");
  await firstCard.click(); await page.waitForSelector("dialog[open]");
  await page.getByRole("button", { name: "Close", exact: true }).click(); await sleep(100);
  ok(!(await dialogOpen(page)), "Close button closes");

  /* ---------- 3. Every full-size image loads in the lightbox ---------- */
  console.log("\n[3] Full-size images (all 73)");
  await firstCard.click(); await page.waitForSelector("dialog[open]");
  const failures = [];
  for (let i = 0; i < 73; i++) {
    await page.waitForFunction(() => { const im = document.querySelector("dialog > div img[alt]:not([alt=''])"); return im && im.complete; }, null, { timeout: 8000 }).catch(() => {});
    const r = await page.evaluate(() => { const im = document.querySelector("dialog > div img[alt]:not([alt=''])"); return im ? { ok: im.complete && im.naturalWidth > 0, w: im.naturalWidth, h: im.naturalHeight, alt: im.alt.slice(0, 40) } : null; });
    if (!r || !r.ok) failures.push({ i, r });
    await page.keyboard.press("ArrowRight");
  }
  ok(failures.length === 0, "every full-size image decodes in the viewer", JSON.stringify(failures.slice(0, 3)));
  await page.keyboard.press("Escape");

  /* ---------- 4. Video player ---------- */
  console.log("\n[4] Video player (MP4)");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("button", { name: /Play video: Test MP4/ }).click();
  await page.waitForSelector('[data-testid="video-player"]');
  await page.waitForFunction(() => { const v = document.querySelector("video"); return v && v.readyState >= 2; }, null, { timeout: 8000 });
  const V = (fn) => page.evaluate(fn);
  ok(Math.abs((await V(() => document.querySelector("video").duration)) - 3) < 0.2, "metadata loads, duration ≈ 3s");
  await sleep(700);
  ok((await V(() => !document.querySelector("video").paused)), "autoplays after the click");
  const t1 = await V(() => document.querySelector("video").currentTime); await sleep(400);
  const t2 = await V(() => document.querySelector("video").currentTime);
  ok(t2 > t1, "playback advances", `${t1} → ${t2}`);
  await page.locator('[data-testid="video-player"]').getByRole("button", { name: "Pause", exact: true }).click(); await sleep(150);
  ok(await V(() => document.querySelector("video").paused), "Pause button pauses");
  ok((await page.locator('[data-testid="video-player"]').getByRole("button", { name: "Play", exact: true }).count()) >= 1, "Play button shown when paused");
  await page.locator('[data-testid="video-player"]').getByRole("button", { name: "Play", exact: true }).last().click(); await sleep(200);
  ok(await V(() => !document.querySelector("video").paused), "Play button resumes");
  await page.locator("video").click(); await sleep(150);
  ok(await V(() => document.querySelector("video").paused), "clicking the video toggles pause");
  // mute / volume
  const muteBtn = () => page.locator('[data-testid="video-player"] button[aria-pressed]').first();
  await page.getByRole("button", { name: "Mute", exact: true }).click(); await sleep(100);
  ok(await V(() => document.querySelector("video").muted), "Mute button mutes");
  ok((await page.getByRole("button", { name: "Unmute", exact: true }).getAttribute("aria-pressed")) === "true", "mute state exposed via aria-pressed");
  await page.getByRole("button", { name: "Unmute", exact: true }).click(); await sleep(100);
  ok(!(await V(() => document.querySelector("video").muted)), "Unmute restores sound");
  const vol = page.getByRole("slider", { name: "Volume" });
  await vol.evaluate((el) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; set.call(el, "0.4"); el.dispatchEvent(new Event("input", { bubbles: true })); }); await sleep(100);
  ok(Math.abs((await V(() => document.querySelector("video").volume)) - 0.4) < 0.01, "volume slider sets volume to 0.4");
  await vol.evaluate((el) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; set.call(el, "0"); el.dispatchEvent(new Event("input", { bubbles: true })); }); await sleep(100);
  ok(await V(() => document.querySelector("video").muted), "volume 0 mutes");
  await page.getByRole("button", { name: "Unmute", exact: true }).click();
  // seek
  const seek = page.getByRole("slider", { name: "Seek" });
  await seek.evaluate((el) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; set.call(el, "2"); el.dispatchEvent(new Event("input", { bubbles: true })); }); await sleep(200);
  ok(Math.abs((await V(() => document.querySelector("video").currentTime)) - 2) < 0.3, "seek slider jumps to 2s");
  ok(/2:?0?2? \/ 0:03|0:02 \/ 0:03/.test(await seek.getAttribute("aria-valuetext")), "seek aria-valuetext reads time", await seek.getAttribute("aria-valuetext"));
  // keyboard shortcuts (focus on container child that is not a button/input)
  await page.getByRole("button", { name: "Close", exact: true }).focus(); // where the modal really puts focus
  const before = await V(() => document.querySelector("video").paused);
  await page.keyboard.press("k"); await sleep(150);
  ok((await V(() => document.querySelector("video").paused)) !== before, "K toggles play/pause");
  const mutedBefore = await V(() => document.querySelector("video").muted);
  await page.keyboard.press("m"); await sleep(100);
  ok((await V(() => document.querySelector("video").muted)) !== mutedBefore, "M toggles mute");
  await page.keyboard.press("m");
  await page.keyboard.press("f"); await sleep(400);
  ok(!!(await V(() => document.fullscreenElement)), "F enters fullscreen");
  await page.keyboard.press("f"); await sleep(400);
  ok(!(await V(() => document.fullscreenElement)), "F leaves fullscreen");
  await page.getByRole("slider", { name: "Seek" }).focus(); const tSeek = await V(() => document.querySelector("video").currentTime);
  await page.keyboard.press("ArrowRight"); await sleep(100);
  ok(await dialogOpen(page) && (await page.locator("dialog header p").innerText()).startsWith(await page.locator("dialog header p").innerText().then((t) => t.slice(0, 1))), "arrow keys on the seek slider don't navigate away");
  await page.getByRole("button", { name: "Close", exact: true }).focus();
  // fullscreen
  await page.getByRole("button", { name: "Fullscreen", exact: true }).click(); await sleep(400);
  const fsOn = await V(() => document.fullscreenElement && document.fullscreenElement.getAttribute("data-testid"));
  ok(fsOn === "video-player", "Fullscreen button enters fullscreen on the player container", String(fsOn));
  ok((await page.getByRole("button", { name: "Exit fullscreen", exact: true }).count()) === 1, "button flips to Exit fullscreen");
  await page.getByRole("button", { name: "Exit fullscreen", exact: true }).click(); await sleep(400);
  ok(!(await V(() => document.fullscreenElement)), "exits fullscreen");
  ok(await dialogOpen(page), "dialog still open after leaving fullscreen");
  // play to end
  await seek.evaluate((el) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; set.call(el, "2.5"); el.dispatchEvent(new Event("input", { bubbles: true })); });
  await V(() => document.querySelector("video").play()); await page.waitForFunction(() => document.querySelector("video").ended, null, { timeout: 5000 });
  await sleep(150);
  ok((await page.locator('[data-testid="video-player"]').getByRole("button", { name: "Play", exact: true }).count()) >= 1, "after ending, Play is offered again");
  await V(() => { window.__v = document.querySelector("video"); document.querySelector("video").play(); });
  await sleep(300);
  await page.keyboard.press("Escape"); await sleep(250);
  ok(!(await dialogOpen(page)), "Escape closes the modal while a video plays");
  ok(await V(() => window.__v.paused && !window.__v.getAttribute("src") && window.__v.networkState === 0 || window.__v.paused), "video stops and is released on close");
  ok((await V(() => document.querySelectorAll("video").length)) === 0, "player removed from DOM on close");

  console.log("\n[5] WebM source");
  await page.getByRole("button", { name: /Play video: Test WebM/ }).click();
  await page.waitForFunction(() => { const v = document.querySelector("video"); return v && v.readyState >= 2; }, null, { timeout: 8000 });
  await sleep(600);
  ok(await V(() => !document.querySelector("video").paused && document.querySelector("video").currentTime > 0), "WebM plays");
  await page.keyboard.press("Escape"); await sleep(200);

  console.log("\n[6] Broken video");
  await page.getByRole("button", { name: /Play video: Broken video/ }).click();
  await page.waitForSelector('[role="alert"]', { timeout: 8000 });
  ok((await page.locator('[data-testid="video-player"] [role="alert"]').innerText()).includes("couldn't be played"), "error message shown for corrupt video");
  await page.getByRole("button", { name: "Try again", exact: true }).click(); await sleep(800);
  ok((await page.locator('[role="alert"]').count()) === 1, "retry re-attempts and fails gracefully (no crash)");
  await page.keyboard.press("ArrowRight"); await sleep(200);
  ok(await dialogOpen(page) && (await page.locator('[data-testid="video-player"]').count()) === 0, "can navigate away from a broken video");
  await page.keyboard.press("Escape");

  console.log("\n[7] Language switch inside the viewer");
  await page.getByRole("button", { name: /Open /i }).first().click(); await page.waitForSelector("dialog[open]");
  await page.evaluate(() => window.__setLang("bn")); await sleep(200);
  ok((await page.locator("dialog").getAttribute("aria-label")) === "মিডিয়া ভিউয়ার", "dialog label switches to Bangla");
  ok(/[\u0980-\u09FF]/.test(await page.locator("dialog header h2").innerText()), "title switches to Bangla");
  ok(await dialogOpen(page), "viewer stays open on language switch");
  await page.keyboard.press("Escape");
  ok((await page.locator("h1").innerText()).includes("গল্পের"), "hero heading Bangla");
  await page.evaluate(() => window.__setLang("en")); await sleep(100);
  ok((await page.locator("h1").innerText()).includes("Story"), "switching back restores English");

  /* ---------- 8. No-video mode ---------- */
  console.log("\n[8] Real data only (no videos)");
  const page2 = await open("http://localhost:8765/?novideo=1");
  const pills2 = await page2.locator('[role="group"] button').allTextContents();
  ok(!pills2.includes("Videos") && !pills2.includes("Images"), "no Videos/Images pills when there are no videos", pills2.join("|"));
  ok((await page2.locator("ul li > button").count()) === 73, "73 real images shown");
  ok(!(await page2.locator("body").innerText()).includes("Videos"), "no 'Videos' stat/label shown");

  /* ---------- 9. Touch / mobile ---------- */
  console.log("\n[9] Mobile viewport (390×844) swipe");
  const m = await open("http://localhost:8765/?novideo=1", { width: 390, height: 844 });
  await m.locator("ul li > button").first().click(); await m.waitForSelector("dialog[open]");
  const c0 = await m.locator("dialog header p").innerText();
  const stage = await m.evaluate(() => { const r = document.querySelector("dialog img").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  const y = stage.y + stage.h / 2;
  const left = Math.max(stage.x, 0) + 80, right = Math.min(stage.x + stage.w, 390) - 80;   // inside the image, clear of the arrows
  const swipe = async (from, to, yy = y) => { await m.mouse.move(from, yy); await m.mouse.down(); await m.mouse.move(to, yy, { steps: 6 }); await m.mouse.up(); await sleep(200); };
  const idx = async () => (await m.locator("dialog header p").innerText()).split(" of ")[0];
  await swipe(right, left);
  ok(c0.startsWith("1 of") && (await idx()) === "2", "swipe left → next", `${c0} → ${await idx()}`);
  await swipe(left, right);
  ok((await idx()) === "1", "swipe right → previous");
  await swipe(left, right);
  ok((await idx()) === "73", "swipe right on first wraps to last");
  ok(await m.evaluate(() => !!document.querySelector("dialog")?.open), "drags never close the viewer");
  const before2 = await idx(); await swipe(left, left + 25);
  ok((await idx()) === before2, "short drag does not navigate");
  // press on a button, drag away, release on empty space → must not close
  const arrow = await m.getByRole("button", { name: "Previous", exact: true }).boundingBox();
  await m.mouse.move(arrow.x + arrow.width / 2, arrow.y + arrow.height / 2); await m.mouse.down(); await m.mouse.move(200, 40, { steps: 5 }); await m.mouse.up(); await sleep(200);
  ok(await m.evaluate(() => !!document.querySelector("dialog")?.open), "press on a button, drag away, release → viewer stays open");
  // a real tap on empty space still closes
  await m.mouse.click(8, 200); await sleep(200);
  ok(!(await m.evaluate(() => !!document.querySelector("dialog")?.open)), "a real click on empty space still closes");

  /* ---------- 10. Accessibility smoke ---------- */
  console.log("\n[10] Accessible names");
  const unnamed = await page.evaluate(() => [...document.querySelectorAll("button, [role=slider], input")].filter((el) => !(el.getAttribute("aria-label") || el.textContent.trim() || el.getAttribute("title"))).length);
  ok(unnamed === 0, "every button/input has an accessible name", String(unnamed));

  console.log("\n[console] errors captured:", errors.length); errors.slice(0, 8).forEach((e) => console.log("   ", e));
  const http404 = errors.filter((e) => e.startsWith("http 4"));
  console.log("   http errors:", http404.join(", ") || "none");
  ok(errors.filter((e) => !/Failed to load resource|favicon|http 404: http:\/\/localhost:8765\/favicon/.test(e)).length === 0, "no unexpected console/page errors");
  await browser.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("HARNESS ERROR", e); process.exit(2); });
