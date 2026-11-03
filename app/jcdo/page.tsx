import type { Metadata } from "next";

import { JcdoPage } from "@/components/pages/jcdo-page";
import { jcdoFacts } from "@/data/jcdo/facts";
import { jcdoGalleryRows, jcdoOgPhotoNumber } from "@/data/jcdo/gallery";
import { jcdoImageMeta } from "@/data/jcdo/images.generated";
import { jcdoImageSrc } from "@/data/jcdo/photos";

const SITE_URL = "https://www.jahidkhan.com";

const og = jcdoImageMeta[jcdoOgPhotoNumber];

const canonicalPath = jcdoFacts.path.startsWith("/")
  ? jcdoFacts.path
  : `/${jcdoFacts.path}`;

const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();

const description =
  `Discover Jalalabad Community Development Organization (JCDO Sylhet), ` +
  `its community initiatives, awareness activities, and ${jcdoGalleryRows.length} ` +
  `photographs highlighting community development in Sylhet, Bangladesh.`;

const ogImage = og
  ? {
      url: new URL(jcdoImageSrc(og.file), SITE_URL).toString(),
      width: og.width,
      height: og.height,
      alt: "JCDO Sylhet – Community, Unity, Humanity, Service and Development",
    }
  : undefined;

export const metadata: Metadata = {
  title: {
    absolute: "JCDO Sylhet | Jalalabad Community Development Organization",
  },

  description,

  keywords: [
    "JCDO",
    "JCDO Sylhet",
    "Jalalabad Community Development Organization",
    "Community Development Sylhet",
    "NGO in Sylhet",
    "Community Organization Bangladesh",
    "Social Development Bangladesh",
    "Health Awareness Sylhet",
    "Community Awareness",
    "Volunteer Opportunities Sylhet",
    "Community Initiatives Bangladesh",
  ],

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonicalUrl,
    siteName: "Jahid Khan",
    title: "JCDO Sylhet | Jalalabad Community Development Organization",
    description,
    ...(ogImage ? { images: [ogImage] } : {}),
  },

  twitter: {
    card: "summary_large_image",
    title: "JCDO Sylhet | Jalalabad Community Development Organization",
    description,
    ...(ogImage ? { images: [ogImage.url] } : {}),
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  return <JcdoPage />;
}
