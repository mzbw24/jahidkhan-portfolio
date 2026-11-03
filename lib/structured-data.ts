import { publishedSocialLinks, siteConfig } from "@/lib/config/site";

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

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

export function jcdoOrganizationSchema(input: { path: string; logoUrl: string; website: string; facebook: string }) {
  const orgId = `${siteConfig.url}${input.path}#organization`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId,
      name: "Jalalabad Community Development Organization (JCDO Sylhet)",
      alternateName: ["JCDO", "JCDO Sylhet"],
      url: input.website,
      logo: `${siteConfig.url}${input.logoUrl}`,
      telephone: siteConfig.contact.phoneHref,
      areaServed: { "@type": "AdministrativeArea", name: "Sylhet, Bangladesh" },
      sameAs: [input.facebook, input.website],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteConfig.url}${input.path}#webpage`,
      url: `${siteConfig.url}${input.path}`,
      name: "JCDO Sylhet — Community Development Organization",
      inLanguage: ["en", "bn"],
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId },
    },
  ];
}