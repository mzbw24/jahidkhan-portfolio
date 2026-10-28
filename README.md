# Jahid Khan — static-first portfolio (Next.js App Router)

Four pages — `/`, `/about`, `/vision-plan`, `/contact` — with an English ⇄ Bangla toggle, light/dark theme,
GSAP animation, and a contact form that opens a pre-filled WhatsApp message. No backend, database or API routes.

> **Status:** source was written in an environment with no network access, so `npm install`, `eslint`,
> `next build` and a browser were **never run**. See "What has and hasn't been verified" below.
> Run `npm run check` first and fix anything it reports.

## Setup
```bash
npm install
cp .env.example .env.local      # then edit values
npm run dev                     # http://localhost:3000
npm run check                   # lint + typecheck + content parity + production build
```
Requires Node 20+ (Node 22 recommended).

| Script | Purpose |
|---|---|
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` (strict, `noUncheckedIndexedAccess`) |
| `npm run check:content` | Asserts `data/en` and `data/bn` have identical structure, icons and image keys |
| `npm run build` | Production build |

## Configure before launch
1. **WhatsApp number** — `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits incl. country code) or `lib/config/site.ts`.
   Until set, the form validates, then shows "not available yet" — it never invents a number.
2. Email, phone, social links, video URLs — `lib/config/site.ts`.
3. Replace every item in **`data/PLACEHOLDERS.md`** with verified content.
4. Real photos — put files in `public/images/` and update `data/media.ts` (no component edits needed).
   Metadata uses `/images/og-cover.png` (a simple generated card — replace with a real one).

## Architecture
```
app/                  route files = thin Server Components + metadata (page.tsx never holds a page)
components/
  pages/              <Name>Page (server, async, fetches via service) → <Name>View (client, picks language, runs GSAP)
  sections/           independent page sections
  shared/             icon, media image, headings, badges, watch button …
  layout/             navbar, footer, language & theme toggles, skip link
  providers/          theme (next-themes), language, toaster
  ui/                 shadcn-style primitives (button, input, textarea, select, label, accordion)
hooks/                use-language, use-gsap-animations, use-isomorphic-layout-effect
lib/
  config/             site config (contact, WhatsApp, flags), navigation
  repositories/       ContentRepository implementation(s) — index.ts is the ONE swap point
  services/           content-service (what UI/pages call)
  whatsapp.ts, validation.ts, metadata.ts, utils.ts
types/                common, content, media, repository, site  (all domain/content interfaces)
data/{en,bn}/         content per page and language (typed against types/content.ts)
data/media.ts         image registry
public/images/        generated SVG placeholders + og-cover.png
scripts/              placeholder generator, en/bn parity check
```
**Moving to a backend later:** implement `ContentRepository` (`types/repository.ts`) with `fetch`/CMS calls and
export it from `lib/repositories/index.ts`. Pages, sections and types stay untouched. For form delivery, replace the
`window` anchor-click in `components/sections/contact-form.tsx` with a request to your endpoint.

**Why `components/pages/`?** It is an addition to the required folders so that each `app/**/page.tsx` can stay a
few lines while the real page lives in a dedicated component.

## How the main features work
- **Language:** `LanguageProvider` stores `en|bn` (localStorage `jk-lang`), updates `<html lang>`, and never navigates,
  so route and theme are preserved. Every string lives in `data/{en,bn}`. Server HTML is English; a stored Bangla
  preference applies right after hydration (brief flash — use a cookie + server read if that matters).
  Page `<title>`/Open Graph metadata is English-only.
- **Theme:** `next-themes` (class strategy, system default). Light and dark tokens are separate HSL sets in
  `app/globals.css`; feature bands are navy in both, deeper in dark mode.
- **Animation:** one hook, `useGsapAnimations`, driven by `data-hero-item | data-reveal | data-stagger | data-parallax`.
  Everything is in a `gsap.context` + `matchMedia("(prefers-reduced-motion: no-preference)")`, reverted on unmount;
  nothing is hidden by CSS, so content is visible without JS or with reduced motion.
- **Contact form:** client validation (error *codes*, so messages re-translate on language switch) → each field on its
  own `*Label:* value` line → `https://wa.me/<number>?text=…` opened via a synthetic link click. The UI says
  "ready in WhatsApp, press Send" and **never claims delivery**. Saving submissions needs a backend.
- **Nav:** only four real routes exist; "Public Service / Business / Projects / Media" jump to home-page sections
  so no menu item can 404. Newsletter box validates but is explicit that nothing is stored.

## What has and hasn't been verified
Verified here (offline): strict TypeScript across all 95 source files against local type shims for third-party
packages · `data/en` vs `data/bn` structural parity · server-render of all four pages in both languages with real
React (one `<h1>` each, no `undefined`/`NaN`, Bangla pages fully Bengali apart from brand/placeholder strings) ·
unit tests for validation, WhatsApp message formatting and URL round-tripping.

**Not** verified (no network/browser): `npm install`, real package types, ESLint, `next build`, Tailwind output,
visual match to the four references, responsive breakpoints, GSAP animation, theme appearance, real WhatsApp
hand-off, keyboard/screen-reader behaviour, Lighthouse/performance. Treat visual fidelity as unreviewed.

## Known gaps / decisions
- Privacy Policy / Terms are text only (no pages). Footer social links are `#` placeholders.
- Hero/portrait art are generic SVG stand-ins, so the reference photography is not reproduced.
- Versions are caret ranges (Next 15.5, Tailwind 3.4, lucide-react pinned to 0.469 for brand icons).
  Moving to Next 16/Tailwind 4 is possible but untested.
