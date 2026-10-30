import * as React from "react";
import { createRoot } from "react-dom/client";
import { LanguageContext } from "@/components/providers/language-provider";
import { MediaView } from "@/components/pages/media-view";
import { commonEn } from "@/data/en/common";
import { commonBn } from "@/data/bn/common";
import { contentService } from "@/lib/services/content-service";
import type { GalleryItem, MediaPageContent } from "@/types/gallery";
import type { Localized } from "@/types/common";

function App({ media }: { media: Localized<MediaPageContent> }) {
  const [lang, setLang] = React.useState<"en" | "bn">("en");
  (window as any).__setLang = setLang;
  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang: () => setLang((l) => (l === "en" ? "bn" : "en")), common: lang === "en" ? commonEn : commonBn }}>
      <MediaView content={media} />
    </LanguageContext.Provider>
  );
}

(async () => {
  const media = await contentService.getMediaContent();
  const withVideos = process.env.NO_VIDEOS ? false : !new URLSearchParams(location.search).has("novideo");
  if (withVideos) {
    for (const lang of ["en", "bn"] as const) {
      const base = media[lang].items[0] as Extract<GalleryItem, { kind: "image" }>;
      const poster = { src: base.src, thumb: base.thumb, width: base.width, height: base.height, blur: base.blur };
      const mk = (id: string, sources: { src: string; type: string }[], title: string): GalleryItem => ({
        kind: "video", id, category: "events", sources, poster, duration: 3, width: 640, height: 360, title, alt: title,
      });
      media[lang].items.unshift(
        mk("vid-test-mp4", [{ src: "/fixtures/test.mp4", type: "video/mp4" }], lang === "en" ? "Test MP4" : "টেস্ট এমপি৪"),
        mk("vid-test-webm", [{ src: "/fixtures/test.webm", type: "video/webm" }], lang === "en" ? "Test WebM" : "টেস্ট ওয়েবএম"),
        mk("vid-test-broken", [{ src: "/fixtures/broken.mp4", type: "video/mp4" }], lang === "en" ? "Broken video" : "নষ্ট ভিডিও"),
      );
    }
  }
  createRoot(document.getElementById("root")!).render(<App media={media} />);
  (window as any).__ready = true;
})();
