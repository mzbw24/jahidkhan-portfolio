"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { availableFilters, filterItems, fmt } from "@/lib/media";
import { FilterBar } from "./filter-bar";
import { GalleryCard } from "./gallery-card";
import { Lightbox } from "./lightbox";
import type { GalleryFilter, GalleryItem, MediaPageContent } from "@/types/gallery";

export function MediaGallery({ content }: { content: MediaPageContent }) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("filter") === "videos") setFilter("videos");
  }, []);
  const [query, setQuery] = useState("");

  const filters = useMemo(() => availableFilters(content.items), [content.items]);
  const visible = useMemo(() => {
    const filtered = filterItems(content.items, filter);
    const normalized = query.trim().toLocaleLowerCase();
    return normalized ? filtered.filter((item) => `${item.title} ${item.category}`.toLocaleLowerCase().includes(normalized)) : filtered;
  }, [content.items, filter, query]);

  const handleFilter = (next: GalleryFilter) => {
    setOpenIndex(null);
    setFilter(next);
  };

  return (
    <>
      <div className="sticky top-[72px] z-30 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="container flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar filters={filters} active={filter} labels={content.filters} groupLabel={content.filterLabel} onChange={handleFilter} />
          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">{content.filterLabel}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search media" className="h-10 w-full rounded-full border bg-background pl-9 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring" />
          </label>
        </div>
      </div>

      <section id="media-gallery" className="section-y scroll-mt-28" aria-label={content.hero.title}>
        <div className="container">
          <p role="status" aria-live="polite" className="mb-5 text-xs text-muted-foreground">
            {fmt(content.results, { count: visible.length, total: content.items.length })}
          </p>

          {visible.length > 0 ? (
            <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 xl:columns-5">
              {visible.map((item, position) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  position={position}
                  labels={content.labels}
                  onOpen={() => setOpenIndex(position)}
                />
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">{content.empty}</p>
          )}
        </div>
      </section>

      <Lightbox
        items={visible}
        index={openIndex}
        labels={content.labels}
        categoryLabel={(item: GalleryItem) => content.filters[item.category]}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
