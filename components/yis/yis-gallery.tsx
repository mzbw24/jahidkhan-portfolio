"use client";

import { useEffect, useState } from "react";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoImage } from "@/components/shared/photo-image";
import { format } from "@/lib/photo-utils";
import { cn } from "@/lib/utils";
import type { YisCategory, YisContent, YisFilter, YisPhoto } from "@/types/yis";

const PAGE_SIZE = 12;
const ORDER: YisCategory[] = ["gatherings", "recognition", "programs", "sports", "public"];

interface YisGalleryProps {
  content: YisContent["gallery"];
  photos: YisPhoto[];
  total: number;
  counts: Record<YisCategory, number>;
  filter: YisFilter;
  onFilterChange: (filter: YisFilter) => void;
  onOpen: (index: number) => void;
}

export function YisGallery({ content, photos, total, counts, filter, onFilterChange, onOpen }: YisGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter]);

  const shown = photos.slice(0, visibleCount);
  const remaining = photos.length - shown.length;
  const filters: { key: YisFilter; label: string; count: number }[] = [
    { key: "all", label: content.all, count: total },
    ...ORDER.map((category) => ({ key: category as YisFilter, label: content.categories[category], count: counts[category] })),
  ];

  return (
    <section id="gallery" aria-labelledby="yis-gallery-title" className="section-y scroll-mt-20">
      <div className="container">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="yis-gallery-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{content.text}</p>
        </div>

        <div role="group" aria-label={content.filterLabel} className="mt-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onFilterChange(item.key)}
              aria-pressed={filter === item.key}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                filter === item.key ? "border-primary bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted",
              )}
            >
              {item.label}
              <span className="text-xs opacity-80">({item.count})</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {format(content.showing, { count: shown.length, total: photos.length })}
        </p>

        {/* Masonry via CSS columns: every tile keeps the photo's own aspect ratio, so nothing is cropped. */}
        <ul className="mt-5 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {shown.map((photo, index) => (
            <li key={photo.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => onOpen(index)}
                aria-label={format(content.openPhoto, { title: photo.title })}
                className="group relative block w-full overflow-hidden rounded-xl border bg-muted shadow-card transition-shadow hover:shadow-lift"
              >
                <PhotoImage
                  photo={photo}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/75 to-transparent p-2.5 pt-8 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="line-clamp-2">{photo.title}</span>
                  <ZoomIn className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {remaining > 0 ? (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
              {content.showMore} ({remaining})
            </Button>
            <Button variant="ghost" onClick={() => setVisibleCount(photos.length)}>
              {content.showAll}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
