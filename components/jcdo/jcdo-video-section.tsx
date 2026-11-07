"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { media } from "@/data/media";
import { VideoPlayer } from "@/components/shared/video-player";
import type { GalleryVideoAsset, PlayerLabels } from "@/types/gallery";

const video: GalleryVideoAsset = {
  id: "jcdo-video",
  kind: "video",
  category: "events",
  sources: [{ src: "/images/jcdo/videos/jcdo-video.mp4", type: "video/mp4" }],
  poster: {
    ...media.portraitPoster,
    thumb: media.portraitPoster.src,
    blur: media.portraitPoster.blur ?? "",
  },
  duration: 0,
  width: 16,
  height: 9,
};

const labels: PlayerLabels = {
  play: "Play video",
  pause: "Pause video",
  mute: "Mute video",
  unmute: "Unmute video",
  volume: "Volume",
  seek: "Seek video",
  fullscreen: "Enter fullscreen",
  exitFullscreen: "Exit fullscreen",
  pictureInPicture: "Picture in picture",
  speed: "Playback speed",
  error: "This video could not be played.",
  retry: "Retry",
};

export function JcdoVideoSection({ lang }: { lang: "en" | "bn" }) {
  const previewRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const copy =
    lang === "bn"
      ? {
          eyebrow: "জেসিডিওর কাজ",
          title: "একসাথে মানুষের জন্য কাজ",
          text: "কমিউনিটি, সহমর্মিতা ও বাস্তব উদ্যোগের মাধ্যমে জেসিডিও কীভাবে মানুষের পাশে থাকে—এই ভিডিওতে দেখুন।",
          label: "জেসিডিও ভিডিও দেখুন",
        }
      : {
          eyebrow: "JCDO in action",
          title: "People, purpose and practical action",
          text: "See how JCDO brings compassion, community and practical initiatives together to support people and create lasting change.",
          label: "Watch JCDO video",
        };

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="jcdo-video-title"
      className="section-y"
    >
      <div className="container grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="jcdo-video-title"
            className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            {copy.text}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            {copy.label}
          </button>
        </div>

        <button
          ref={previewRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={copy.label}
          className="group relative block w-full overflow-hidden rounded-2xl bg-black shadow-lift ring-1 ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ aspectRatio: "16 / 9", width: "100%", display: "block" }}
        >
          <div className="absolute inset-0">
            {loaded ? (
              <video
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain"
                aria-hidden="true"
              >
                <source src={video.sources[0]!.src} type="video/mp4" />
              </video>
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary/30 to-slate-900"
                aria-hidden="true"
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10"
              aria-hidden="true"
            />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition duration-300 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
            <span className="absolute bottom-4 left-5 text-left text-sm font-semibold text-white">
              {copy.label}
            </span>
          </div>
        </button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
        >
          <div className="relative w-[min(94vw,1100px)] rounded-2xl border border-white/15 bg-black p-2 text-white shadow-2xl sm:p-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={lang === "bn" ? "ভিডিও বন্ধ করুন" : "Close video"}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <VideoPlayer
              video={video}
              title={copy.title}
              labels={labels}
              autoPlay
              className="max-h-[82vh]"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
