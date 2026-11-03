"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { VideoPlayer } from "@/components/shared/video-player";
import { VideoPreview } from "@/components/shared/video-preview";
import { media } from "@/data/media";
import type { GalleryVideoAsset } from "@/types/gallery";
import type { VisionContent } from "@/types/content";

export function VisionVideos({ content }: { content: VisionContent["videos"] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected === null ? null : content.items[selected];

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [selected]);

  return (
    <section className="section-y" aria-labelledby="vision-videos-title">
      <div className="container">
        <div className="mb-8 max-w-2xl"><p className="eyebrow">{content.eyebrow}</p><h2 id="vision-videos-title" className="mt-3 font-display text-4xl font-semibold text-navy dark:text-white sm:text-5xl">{content.title}</h2><p className="mt-3 text-muted-foreground">{content.subtitle}</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((video, index) => { return <button key={video.title} type="button" onClick={() => setSelected(index)} className="group relative aspect-video overflow-hidden rounded-2xl bg-navy text-left shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><VideoPreview src={`/media/videos/vision/vision-video%20(${index + 1}).mp4`} title={video.alt} /><span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" /><span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-lg transition group-hover:scale-110"><Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" /></span><span className="absolute inset-x-4 bottom-4 text-sm font-semibold text-white">{video.title}</span></button>; })}
        </div>
      </div>
      {item && selected !== null ? <div role="dialog" aria-modal="true" aria-label={item.title} className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/90 p-3 backdrop-blur-sm sm:p-6" onClick={() => setSelected(null)}><div className="relative w-full max-w-5xl py-12" onClick={(event) => event.stopPropagation()}><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close video" className="absolute right-0 top-0 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><X aria-hidden="true" /></button><VideoPlayer video={toVideoAsset(selected, item.poster)} title={item.title} labels={content.player} className="w-full" /></div></div> : null}
    </section>
  );
}

function toVideoAsset(index: number, posterKey: keyof typeof media): GalleryVideoAsset {
  const poster = media[posterKey];
  return { kind: "video", id: `vision-video-${index + 1}`, category: "events", sources: [{ src: `/media/videos/vision/vision-video%20(${index + 1}).mp4`, type: "video/mp4" }], poster: { src: poster.src, thumb: poster.src, width: poster.width, height: poster.height, blur: poster.blur ?? "" }, duration: 0, width: 16, height: 9 };
}
