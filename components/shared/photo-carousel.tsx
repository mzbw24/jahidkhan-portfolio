"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { BlurBackdrop } from "./photo-image";
import { useCarousel } from "@/hooks/use-carousel";
import { useSwipe } from "@/hooks/use-swipe";
import { format, wrapIndex } from "@/lib/photo-utils";
import { cn } from "@/lib/utils";
import type { GalleryPhoto, PhotoCarouselLabels } from "@/types/photo";

interface PhotoCarouselProps<T extends GalleryPhoto> {
  slides: T[];
  labels: PhotoCarouselLabels;
  categoryLabel: (photo: T) => string;
  onOpen: (photo: T) => void;
  className?: string;
}

export function PhotoCarousel<T extends GalleryPhoto>({ slides, labels, categoryLabel, onOpen, className }: PhotoCarouselProps<T>) {
  const total = slides.length;
  const { active, setActive, go, playing, togglePlaying, regionProps } = useCarousel(total);
  const swipe = useSwipe(
    () => go(-1),
    () => go(1),
  );
  const current = slides[active];

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.label} className={className} {...regionProps}>
      <div
        onPointerDown={swipe.onPointerDown}
        style={{ touchAction: "pan-y" }}
        className="relative aspect-square max-h-[70vh] w-full overflow-hidden rounded-2xl bg-black/30 ring-1 ring-white/15 sm:aspect-[4/3] lg:aspect-[5/4]"
      >
        {slides.map((slide, i) => {
          const near = i === active || i === wrapIndex(active, 1, total) || i === wrapIndex(active, -1, total);
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={format(labels.slideCounter, { current: i + 1, total })}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
                i === active ? "z-10 opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <BlurBackdrop blur={slide.blur} className="opacity-70" />
              <div className="absolute inset-0 bg-black/25" />
              <button
                type="button"
                tabIndex={i === active ? 0 : -1}
                onClick={() => {
                  if (!swipe.wasDrag()) onOpen(slide);
                }}
                aria-label={slide.title}
                className="absolute inset-0 cursor-zoom-in"
              >
                {near ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    priority={i === 0}
                    quality={80}
                    placeholder="blur"
                    blurDataURL={slide.blur}
                    draggable={false}
                    className="select-none object-cover drop-shadow-2xl"
                  />
                ) : null}
              </button>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">{current ? categoryLabel(current) : null}</p>
          <p className="truncate text-sm font-medium sm:text-base">{current?.title}</p>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={labels.previous}
          className="absolute left-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-black/75"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={labels.next}
          className="absolute right-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-black/75"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={togglePlaying}
          aria-label={playing ? labels.pause : labels.play}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        </button>
        <div className="no-scrollbar flex min-w-0 flex-1 items-center justify-end gap-2 overflow-x-auto p-1">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={format(labels.goToSlide, { n: i + 1 })}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-white/10 ring-2 transition sm:h-12 sm:w-12",
                i === active ? "ring-gold" : "opacity-65 ring-transparent hover:opacity-100",
              )}
            >
              <Image src={slide.src} alt="" fill sizes="48px" quality={40} className="object-contain" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
