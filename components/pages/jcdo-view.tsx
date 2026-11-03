"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { JcdoAbout } from "@/components/jcdo/jcdo-about";
import { JcdoActivities } from "@/components/jcdo/jcdo-activities";
import { JcdoCta } from "@/components/jcdo/jcdo-cta";
import { JcdoGallery } from "@/components/jcdo/jcdo-gallery";
import { JcdoHero } from "@/components/jcdo/jcdo-hero";
import { JcdoLightbox, type JcdoLightboxState } from "@/components/jcdo/jcdo-lightbox";
import { JcdoPrograms } from "@/components/jcdo/jcdo-programs";
import { JcdoStats } from "@/components/jcdo/jcdo-stats";
import { JcdoUpdates } from "@/components/jcdo/jcdo-updates";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import { useScrollRefresh } from "@/hooks/use-scroll-refresh";
import { countByCategory, photoByNumber, pickPhotos } from "@/lib/jcdo";
import { heroPhotoNumbers, highlightPhotoNumbers } from "@/data/jcdo/gallery";
import { jcdoFacts } from "@/data/jcdo/facts";
import type { JcdoCategory, JcdoFilter, JcdoPageData, JcdoPhoto } from "@/types/jcdo";

/** Representative image per topic (first poster of that topic). */
function coversFor(photos: JcdoPhoto[]): Partial<Record<JcdoCategory, JcdoPhoto>> {
  const covers: Partial<Record<JcdoCategory, JcdoPhoto>> = {};
  for (const photo of photos) covers[photo.category] ??= photo;
  return covers;
}

const COVER_NUMBERS: Partial<Record<JcdoCategory, number>> = {
  health: 75,
  environment: 72,
  community: 58,
  learning: 64,
  safety: 66,
  events: 5,
};

export function JcdoView({ data }: { data: JcdoPageData }) {
  const content = useLocalized(data.content);
  const { photos } = data;
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);
  useScrollRefresh(scope);

  const [filter, setFilter] = useState<JcdoFilter>("all");
  const [lightbox, setLightbox] = useState<JcdoLightboxState | null>(null);

  const counts = useMemo(() => countByCategory(photos), [photos]);
  const covers = useMemo(() => {
    const fallback = coversFor(photos);
    const result: Partial<Record<JcdoCategory, JcdoPhoto>> = { ...fallback };
    for (const [category, n] of Object.entries(COVER_NUMBERS) as [JcdoCategory, number][]) {
      const photo = photoByNumber(photos, n);
      if (photo) result[category] = photo;
    }
    return result;
  }, [photos]);
  const heroSlides = useMemo(() => pickPhotos(photos, heroPhotoNumbers), [photos]);
  const highlights = useMemo(() => pickPhotos(photos, highlightPhotoNumbers), [photos]);
  const logo = photoByNumber(photos, 7);

  const posters = photos.length - counts.events - counts.organization;
  const themes = (Object.keys(counts) as JcdoCategory[]).filter(
    (category) => category !== "events" && category !== "organization" && counts[category] > 0,
  ).length;

  const categoryLabel = useCallback((photo: JcdoPhoto) => content.gallery.categories[photo.category], [content]);

  /** Opens the viewer over the full gallery, starting at `photo`. */
  const openInAll = useCallback(
    (photo: JcdoPhoto) => {
      setLightbox({ photos, index: Math.max(0, photos.findIndex((item) => item.id === photo.id)) });
    },
    [photos],
  );

  return (
    <div ref={scope} className="jcdo-theme bg-background text-foreground">
      <JcdoHero content={content.hero} slides={heroSlides} categoryLabel={categoryLabel} onOpen={openInAll} />
      {logo ? <JcdoAbout content={content.about} logo={logo} website={jcdoFacts.website} /> : null}
      <JcdoStats content={content.stats} counts={{ photos: photos.length, posters, events: counts.events, themes }} />
      <JcdoPrograms content={content.programs} covers={covers} counts={counts} onSelectFilter={setFilter} />
      <JcdoActivities content={content.activities} photos={highlights} openLabel={content.gallery.openPhoto} onOpen={openInAll} />
      <JcdoGallery
        content={content.gallery}
        photos={photos}
        counts={counts}
        filter={filter}
        onFilterChange={setFilter}
        onOpen={(list, index) => setLightbox({ photos: list, index })}
      />
      <JcdoUpdates content={content.updates} covers={covers} facebook={jcdoFacts.facebook} onSelectFilter={setFilter} />
      <JcdoCta cta={content.cta} partners={content.partners} facts={jcdoFacts} />

      <JcdoLightbox
        state={lightbox}
        labels={content.gallery.lightbox}
        categoryLabel={categoryLabel}
        onIndexChange={(index) => setLightbox((current) => (current ? { ...current, index } : current))}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
