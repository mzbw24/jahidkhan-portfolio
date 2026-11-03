import { siteConfig, socialLinks } from "@/lib/config/site";

const facebookPage = socialLinks.find((link) => link.key === "facebook-page");

export const jcdoFacts = {
  name: "Jalalabad Community Development Organization",
  shortName: "JCDO Sylhet",
  path: "/jcdo",
  website: "https://www.jcdosylhet.com",
  websiteLabel: "www.jcdosylhet.com",
  facebook: facebookPage?.url ?? "https://www.facebook.com/JCDOsylhet",
  phoneHref: `tel:${siteConfig.contact.phoneHref}`,
  phoneDisplay: siteConfig.contact.phoneDisplay,
} as const;
