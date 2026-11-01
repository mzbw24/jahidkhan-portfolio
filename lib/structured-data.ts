import { publishedSocialLinks, siteConfig } from "@/lib/config/site";

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

/**
 * Tells Google who this site is about. Only facts already published on the site are used:
 * name, website, portrait, public email and real social profiles. No address, phone or location.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/media/images/portrait.png`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    sameAs: publishedSocialLinks.map((link) => link.url),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: `${siteConfig.name} — Official Website`,
    inLanguage: ["en", "bn"],
    publisher: { "@id": personId },
    about: { "@id": personId },
  };
}

export function profilePageSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteConfig.url}${path}`,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  };
}
