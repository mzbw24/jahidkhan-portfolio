import "./setup";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LanguageContext } from "@/components/providers/language-provider";
import { commonEn } from "@/data/en/common";
import { commonBn } from "@/data/bn/common";
import { HomeView } from "@/components/pages/home-view";
import { AboutView } from "@/components/pages/about-view";
import { VisionView } from "@/components/pages/vision-view";
import { ContactView } from "@/components/pages/contact-view";
import { MediaView } from "@/components/pages/media-view";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { contentService } from "@/lib/services/content-service";

const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ");
const bnChars = /[\u0980-\u09FF]/g;

async function main() {
  const [home, about, vision, contact, mediaContent, featured] = await Promise.all([contentService.getHomeContent(), contentService.getAboutContent(), contentService.getVisionContent(), contentService.getContactContent(), contentService.getMediaContent(), contentService.getFeaturedMedia()]);
  const pages: Record<string, React.ReactElement> = {
    home: <HomeView content={home} featured={featured} />, about: <AboutView content={about} />, vision: <VisionView content={vision} featured={featured} />, contact: <ContactView content={contact} />, media: <MediaView content={mediaContent} />,
  };
  let failures = 0;
  for (const lang of ["en", "bn"] as const) {
    const common = lang === "en" ? commonEn : commonBn;
    for (const [name, view] of Object.entries(pages)) {
      const tree = (
        <LanguageContext.Provider value={{ lang, setLang() {}, toggleLang() {}, common }}>
          <Navbar />{view}<Footer />
        </LanguageContext.Provider>
      );
      const html = renderToStaticMarkup(tree);
      const t = text(html);
      const h1 = (html.match(/<h1/g) || []).length;
      const bn = (t.match(bnChars) || []).length;
      const bad = /undefined|\[object Object\]|NaN/.test(t);
      const imgs = (html.match(/<img/g) || []).length;
      const emptyAlt = (html.match(/<img[^>]*alt=""/g) || []).length;
      const srcs = [...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => m[1]!);
      const badSrc = srcs.filter((u) => !u.startsWith("/media/") && !u.startsWith("data:"));
      const svgPlaceholders = srcs.filter((u) => u.endsWith(".svg"));
      if (badSrc.length || svgPlaceholders.length) { failures++; console.log("  ^^ FAIL image sources:", [...new Set(badSrc)].slice(0, 5)); }
      const latinLeak = lang === "bn" ? [...new Set((t.match(/[A-Za-z][A-Za-z'’]{3,}/g) || []))].sort() : [];
      console.log(`${lang} ${name.padEnd(7)} html=${(html.length / 1024).toFixed(0)}KB  h1=${h1}  imgs=${imgs} (decorative ${emptyAlt})  bengaliChars=${bn}  badTokens=${bad}`);
      if (h1 !== 1 || bad || (lang === "bn" && bn < 200) || (lang === "en" && bn > 5)) { failures++; console.log("  ^^ FAIL"); }
      if (lang === "bn") console.log("   latin words in bn render:", latinLeak.join(", "));
    }
  }
  if (failures) { console.log("FAILURES:", failures); process.exit(1); }
  console.log("SSR smoke test passed");
}
main();
