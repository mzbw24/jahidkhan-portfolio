// import type { Metadata } from "next";
// import { siteConfig } from "@/lib/config/site";

// interface PageMeta {
//   title: string;
//   description: string;
//   path: string;
// }

// export function createMetadata({ title, description, path }: PageMeta): Metadata {
//   const url = new URL(path, siteConfig.url).toString();
//   return {
//     title,
//     description,
//     alternates: { canonical: url },
//     openGraph: {
//       type: "website",
//       url,
//       title: `${title} | ${siteConfig.name}`,
//       description,
//       siteName: siteConfig.name,
//       images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: siteConfig.name }],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${title} | ${siteConfig.name}`,
//       description,
//       images: ["/images/og-cover.png"],
//     },
//   };
// }


import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: { url: string; width: number; height: number; alt: string };
}

export function createMetadata({ title, description, path, keywords, image }: PageMeta): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = image ?? { url: "/images/og-cover.png", width: 1200, height: 630, alt: siteConfig.name };
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage.url],
    },
  };
}
