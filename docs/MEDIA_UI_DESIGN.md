# Media Gallery — UI design summary

Route: `/media` · Reference: the supplied gallery mock-up, used for **layout only** (it is Sole Mission-branded sneaker
content; none of its branding, copy or imagery was used). Colours, type and components follow this project's existing
design language (navy feature bands, brand red, Playfair headings, shared Button/pill styles).

## Gallery layout
- **Hero:** navy gradient with a soft red glow (no stock art). Left: eyebrow, two-tone H1, intro. Right: a glass stats card
  whose numbers are *computed from the data* (photos, topics, and videos only when videos exist) — nothing hard-coded.
- **Filter bar:** sticky under the navbar. Pills: *All*, then one per topic that actually has items. *Images / Videos* pills
  appear only when both kinds exist (today: no videos, so they are hidden rather than dead). Active pill = brand red;
  `aria-pressed` + a polite live region ("Showing 12 of 73") announce changes.
- **Grid:** CSS-columns masonry — 2 columns (mobile), 3 (≥640px), 4 (≥1024px), 5 (≥1280px). Every card reserves its exact
  aspect ratio from the file's real dimensions, so nothing shifts while loading. Featured items come first.
- **Card:** the whole card is one `<button>` (keyboard/screen-reader operable). Title sits on a dark gradient for contrast,
  a corner badge marks image vs video (+ duration), hover lifts the card and zooms the image 4%; the first dozen cards
  fade up in a short stagger.

## Media presentation
- Source: the client's ZIP — 100 JPEGs, **0 videos**. 98 unique; **73 published** (see `scripts/MEDIA_REPORT.md`).
- Each published image ships as a **480px WebP thumbnail** (grid) and a **full-resolution WebP** (viewer, q86) with a
  14px blur-up placeholder; originals are not copied. 30.0 MB of JPEG became 17.0 MB + 4.0 MB of thumbnails.
- Eight topics: Healthcare & Welfare, Environment, Infrastructure & Safety, Education/Youth/Culture, Economy & Livelihood,
  Public Voice, Events & Community, Portraits. Titles/alt text exist in English and Bangla for every item.
- Site-wide slots (hero portrait, focus areas, projects, banners) now use real images with per-slot `object-position`
  so subjects stay in frame; decorative stock-style illustrations were removed.

## Lightbox & video interaction
- **Viewer:** native `<dialog>` (focus trapped, page behind inert, focus returns to the card). Header shows title,
  "n of N" and topic; side arrows, arrow keys, swipe (≥60px, mostly horizontal) and a thumbnail strip all navigate and wrap.
- **Closing:** Escape, the × button, a click on the backdrop **or** the empty space around the media. A click only counts if
  the press *also* began on empty space, and the click that ends a drag/swipe is ignored — so swiping never closes it.
- **Player (video items):** custom controls — play/pause (button, click on video, Space/K), mute (M), volume slider, seek
  slider with `m:ss / m:ss` and `aria-valuetext`, fullscreen (F; iOS falls back to the native player), centre play
  overlay when paused, autoplay on open, error panel with *Try again* for unplayable files. Closing or navigating pauses
  and releases the media. Multiple `<source>`s are supported (MP4 first, WebM fallback).

## Responsive behaviour
- **Mobile (<640px):** 2-column grid; filter pills scroll horizontally in one row; viewer is full-screen with 12px
  gutters, 44px arrow buttons overlaying the image, swipe navigation; the volume slider is hidden (mute remains);
  keyboard-hint line hidden.
- **Tablet/laptop:** 3→4 columns; pills wrap; volume slider and shortcut hint appear; arrows sit just outside the media.
- **Desktop (≥1280px):** 5 columns; viewer content capped at 72rem; video capped at 70vh and 56rem wide.

## Light / dark
- All surfaces use the shared HSL tokens: light = white canvas, cool-grey `muted`, 1px `border`, red primary; dark = deep
  navy canvas, lifted `card` surfaces, brighter red for contrast. Inactive pills are bordered cards in both themes.
- Text that sits **on photos** (card titles, badges) always rides a dark gradient/translucent black chip, so contrast does
  not depend on the theme. The hero and the viewer are intentionally dark in both themes (media is judged on a dark
  surface); the player's controls are white on black gradient with a red progress fill. Focus rings are red with an
  offset; hover states are a subtle lift/scale that is disabled under `prefers-reduced-motion`.

> Status: behaviour was verified in real Chrome (see README). The final compiled-Tailwind visuals, theme rendering and
> breakpoints could not be viewed offline and still need a visual pass.
