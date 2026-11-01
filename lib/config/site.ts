import type { SocialLink } from "@/types/site";

/**
 * Production origin. Used for canonical URLs, Open Graph, sitemap and structured data.
 * Override with NEXT_PUBLIC_SITE_URL (e.g. for a staging domain). Without this fallback a production
 * build that is missing the env var would publish `localhost` canonicals and sitemap entries,
 * which prevents Google from indexing the real domain correctly.
 */
const PRODUCTION_URL = "https://jahidkhan.com";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000";
}

/**
 * The ONLY public contact details for the site. Keep them here and nowhere else: the footer, contact
 * page, WhatsApp form and structured data all read from this object.
 * No street address, city or map is published (client request).
 */
const CONTACT_EMAIL = "info@jahidkhan.com";
const CONTACT_PHONE_DISPLAY = "+880 17 6518 0611";
const CONTACT_PHONE_E164 = "+8801765180611";

export const siteConfig = {
  name: "Jahid Khan",
  url: resolveSiteUrl(),
  description:
    "Official website of Jahid Khan — an independent public figure from Sylhet, Bangladesh. Vision, plan and ways to get involved.",
  copyrightYear: 2026,

  /** WhatsApp uses the same Bangladesh number as the phone contact (single source of truth). */
  whatsappNumber: CONTACT_PHONE_E164,

  contact: {
    email: CONTACT_EMAIL,
    phoneDisplay: CONTACT_PHONE_DISPLAY,
    phoneHref: CONTACT_PHONE_E164,
  },

  videos: {
    story: null as string | null,
    vision: null as string | null,
    message: null as string | null,
  },

  showPlaceholderNotices: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTICES !== "false",
} as const;

export const socialLinks: SocialLink[] = [
  { key: "facebook-profile", label: "Facebook Profile", url: "https://www.facebook.com/Jahidkhanjuly36" },
  { key: "facebook-page", label: "Facebook Page", url: "https://www.facebook.com/JCDOsylhet" },
  // Placeholders are skipped everywhere they are rendered (see isPublishedSocial).
  { key: "linkedin", label: "LinkedIn", url: "#" },
  { key: "x", label: "X", url: "#" },
];

/** Social profiles with a real URL — dead "#" placeholders are never rendered or put in structured data. */
export const publishedSocialLinks: SocialLink[] = socialLinks.filter((link) => link.url.startsWith("https://"));
