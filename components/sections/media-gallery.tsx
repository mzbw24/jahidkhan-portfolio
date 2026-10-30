"use client";

import { useMemo, useState } from "react";
import { availableFilters, filterItems, fmt } from "@/lib/media";
import { FilterBar } from "./filter-bar";
import { GalleryCard } from "./gallery-card";
import { Lightbox } from "./lightbox";
import type { GalleryFilter, GalleryItem, MediaPageContent } from "@/types/gallery";

export function MediaGallery({ content }: { content: MediaPageContent }) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filters = useMemo(() => availableFilters(content.items), [content.items]);
  const visible = useMemo(() => filterItems(content.items, filter), [content.items, filter]);

  const handleFilter = (next: GalleryFilter) => {
    setOpenIndex(null);
    setFilter(next);
  };

  return (
    <>
      <div className="sticky top-[72px] z-30 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="container py-3">
          <FilterBar filters={filters} active={filter} labels={content.filters} groupLabel={content.filterLabel} onChange={handleFilter} />
        </div>
      </div>

      <section className="section-y" aria-label={content.hero.title}>
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
