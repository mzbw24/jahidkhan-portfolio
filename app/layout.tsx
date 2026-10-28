import type { Metadata, Viewport } from "next";
import { Dancing_Script, Inter, Noto_Sans_Bengali, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import { AppProviders } from "@/components/providers/app-providers";
import { siteConfig } from "@/lib/config/site";
import { contentService } from "@/lib/services/content-service";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const script = Dancing_Script({ subsets: ["latin"], variable: "--font-script", display: "swap" });
// Not preloaded: English visitors never download Bengali glyphs; the browser fetches them on demand.
const bengali = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-bengali", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Jahid Khan — A Stronger Sylhet, Together", template: "%s | Jahid Khan" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { type: "website", siteName: siteConfig.name, locale: "en_US", alternateLocale: ["bn_BD"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const common = await contentService.getCommonContent();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${script.variable} ${bengali.variable}`}
    >
      <body>
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
