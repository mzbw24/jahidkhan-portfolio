import type { SocialLink } from "@/types/site";

/**
 * Central site configuration.
 * Every value marked PLACEHOLDER is intentionally NOT real. Replace once verified by Jahid Khan.
 */

const PLACEHOLDER_WHATSAPP = "REPLACE_WITH_WHATSAPP_NUMBER"; // PLACEHOLDER — digits with country code, e.g. 15551234567

export const siteConfig = {
  name: "Jahid Khan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Official website of Jahid Khan — an independent public figure from Sylhet, Bangladesh, based in California, USA. Vision, plan and ways to get involved.",
  copyrightYear: 2026,

  /** Single place for the contact-form recipient. Env var wins over the placeholder. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || PLACEHOLDER_WHATSAPP,

  contact: {
    email: "info@your-domain.example", // PLACEHOLDER
    phoneDisplay: "+1 (000) 000-0000", // PLACEHOLDER
    phoneHref: "+10000000000", // PLACEHOLDER
  },

  /** Map / directions query. Generic on purpose: exact address is not public. */
  mapQuery: "California, USA",

  /** Video URLs. null → the "Watch" buttons show a "not available yet" toast. */
  videos: {
    story: null as string | null,
    vision: null as string | null,
    message: null as string | null,
  },

  showPlaceholderNotices: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTICES !== "false",
} as const;

/** PLACEHOLDER URLs — "#" until real profiles are supplied. */
export const socialLinks: SocialLink[] = [
  { key: "facebook", label: "Facebook", url: "#" },
  { key: "youtube", label: "YouTube", url: "#" },
  { key: "instagram", label: "Instagram", url: "#" },
  { key: "linkedin", label: "LinkedIn", url: "#" },
  { key: "x", label: "X", url: "#" },
];
