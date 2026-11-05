"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlurBackdrop, PhotoImage } from "./photo-image";
import type { GalleryPhoto } from "@/types/photo";

export interface PhotoStripContent {
  eyebrow: string;
  title: string;
  text: string;
  previous: string;
  next: string;
  listLabel: string;
}

interface PhotoStripProps<T extends GalleryPhoto> {
  content: PhotoStripContent;
  photos: T[];
  openLabel: string;
  onOpen: (photo: T) => void;
}

export function PhotoStrip<T extends GalleryPhoto>({
  content,
  photos,
  openLabel,
  onOpen,
}: PhotoStripProps<T>) {
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      aria-labelledby="photo-strip-title"
      className="section-y"
    >
      <div className="container">
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2
              id="photo-strip-title"
              className="mt-2 font-display text-3xl font-bold sm:text-4xl"
            >
              {content.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{content.text}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={content.previous}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={content.next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          aria-label={content.listLabel}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {photos.map((photo) => (
            <li key={photo.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => onOpen(photo)}
                aria-label={openLabel.replace("{title}", photo.title)}
                className="relative flex h-[17rem] items-center justify-center overflow-hidden rounded-2xl border bg-card p-0 shadow-card transition-shadow hover:shadow-lift sm:h-[21rem]"
              >
                <BlurBackdrop blur={photo.blur} className="opacity-40" />
                <PhotoImage
                  photo={photo}
                  sizes="(min-width: 640px) 340px, 270px"
                  className="relative h-full w-auto max-w-none"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
