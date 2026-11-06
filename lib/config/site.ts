import type { SocialLink } from "@/types/site";

const PRODUCTION_URL = "https://jahidkhan.com";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000";
}

const CONTACT_EMAIL = "info@jahidkhan.com";
const CONTACT_PHONE_DISPLAY = "+880 17 6518 0611";
const CONTACT_PHONE_E164 = "+8801765180611";

export const siteConfig = {
  name: "Jahid Khan",
  url: resolveSiteUrl(),
  description:
    "Official website of Jahid Khan — an independent public figure from Sylhet, Bangladesh. Vision, plan and ways to get involved.",
  copyrightYear: 2026,

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
  { key: "linkedin", label: "LinkedIn", url: "#" },
  { key: "x", label: "X", url: "#" },
];

export const publishedSocialLinks: SocialLink[] = socialLinks.filter((link) => link.url.startsWith("https://"));
