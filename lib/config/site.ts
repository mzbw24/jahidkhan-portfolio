import type { SocialLink } from "@/types/site";

const PLACEHOLDER_WHATSAPP = "+1 (516) 602-8578"; 

export const siteConfig = {
  name: "Jahid Khan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Official website of Jahid Khan — an independent public figure from Sylhet, Bangladesh, based in 8684 188 st Hollis NY 11423, USA. Vision, plan and ways to get involved.",
  copyrightYear: 2026,

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || PLACEHOLDER_WHATSAPP,

  contact: {
    email: "info@jahidkhan.com", 
    phoneDisplay: "+1 (516) 602-8578", 
    phoneHref: "+1 (516) 602-8578", 
  },

  mapQuery: "Jahid A khan 8684 188 st Hollis NY 11423",

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
