# Placeholder & unverified content register

Nothing below was verified. Per the project brief, none of it may be presented as fact until
**Jahid Khan** confirms it. Search the codebase for `PLACEHOLDER` to find each item.

## Contact & identity (central config: `lib/config/site.ts`)
| Item | Current value | Action |
|---|---|---|
| WhatsApp recipient | none (`REPLACE_WITH_WHATSAPP_NUMBER`) — form shows "not available yet" until set | Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits, with country code) or edit `siteConfig.whatsappNumber` |
| Email | `info@your-domain.example` | Replace |
| Phone | `+1 (000) 000-0000` | Replace (`phoneDisplay`, `phoneHref`) |
| Social profiles | `#` (links go nowhere) | Replace URLs in `socialLinks` |
| Video URLs | `null` → "not available yet" toast | Set `siteConfig.videos.*` |
| Site URL | `http://localhost:3000` | Set `NEXT_PUBLIC_SITE_URL` before deploy |

## Copied from the supplied design references — confirm wording & truth
- Candidacy label "Independent Mayor Candidate – Sylhet City Corporation" and "Why I'm running" text
- Biography lines & milestones (education, move to California, "Entrepreneur & Community Leader", "Entrepreneur & Business Initiator")
- Quotes attributed to Jahid (English renderings were written for this build; the Bangla originals come from the references)
- The 10-point plan, challenges/solutions, mission/vision wording
- Contact hours "Mon–Fri 9AM–6PM (PST)", meeting preferences
- FAQ answers (written for this build)

## Mock data (marked with a visible "Sample content" badge)
- Statistics (5+, 10+, 1000+, Global Network)
- Projects: three placeholder initiatives — **titles/text are mock; the images are real client posters**

Removed in the media pass (they were demo content): fabricated "Voices From the Community" testimonials and avatars,
mock news items (replaced by a real featured-media strip linking to `/media`), the fake "Sylhet today/tomorrow"
before/after slider, and every generated placeholder illustration.

Hide the badges with `NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTICES=false` once real content replaces these.

## Media
All site images are the client's real files, optimized by `scripts/process-media.py`. Gaps: no real scenic/Sylhet
photography exists, so heroes and bands use a navy gradient instead of stock art. The handwritten-style name is a font,
not a real signature. Legal pages (Privacy Policy / Terms) are plain text only — no pages exist yet.
See `scripts/MEDIA_REPORT.md` for held-back and flagged files.
