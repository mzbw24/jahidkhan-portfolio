import type { Metadata, Viewport } from "next";
import {
  Dancing_Script,
  Inter,
  Noto_Sans_Bengali,
  Playfair_Display,
} from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import { AppProviders } from "@/components/providers/app-providers";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config/site";
import { contentService } from "@/lib/services/content-service";
import { personSchema, websiteSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const script = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});
const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  preload: false,
});

const ogImage = {
  url: "/images/og-cover.png",
  width: 1200,
  height: 630,
  alt: "Jahid Khan — A Stronger Sylhet, Together",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Jahid Khan — A Stronger Sylhet, Together",
    template: "%s | Jahid Khan",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
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
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    url: "/",
    title: "Jahid Khan — A Stronger Sylhet, Together",
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jahid Khan — A Stronger Sylhet, Together",
    description: siteConfig.description,
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const common = await contentService.getCommonContent();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${script.variable} ${bengali.variable}`}
    >
      <body>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <AppProviders common={common}>
          <SkipLink />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
