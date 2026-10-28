import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export function createMetadata({ title, description, path }: PageMeta): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: ["/images/og-cover.png"],
    },
  };
}
