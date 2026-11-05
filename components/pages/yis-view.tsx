"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { PhotoLightbox, type PhotoLightboxState } from "@/components/shared/photo-lightbox";
import { PhotoStrip } from "@/components/shared/photo-strip";
import { YisAbout } from "@/components/yis/yis-about";
import { YisActivities } from "@/components/yis/yis-activities";
import { YisCta } from "@/components/yis/yis-cta";
import { YisGallery } from "@/components/yis/yis-gallery";
import { YisHero } from "@/components/yis/yis-hero";
import { YisImpact } from "@/components/yis/yis-impact";
import { YisMission } from "@/components/yis/yis-mission";
import { yisCoverNumbers, yisHeroNumbers, yisHighlightNumbers } from "@/data/yis/gallery";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLanguage, useLocalized } from "@/hooks/use-language";
import { useScrollRefresh } from "@/hooks/use-scroll-refresh";
import { countYisByCategory, filterYisPhotos, pickYisPhotos, yisPhotoByNumber } from "@/lib/yis";
import type { YisCategory, YisFilter, YisPageData, YisPhoto } from "@/types/yis";

export function YisView({ data }: { data: YisPageData }) {
  const { lang } = useLanguage();
  const content = useLocalized(data.content);
  const { photos, logo } = data;
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);
  useScrollRefresh(scope);

  const [filter, setFilter] = useState<YisFilter>("all");
  const [lightbox, setLightbox] = useState<PhotoLightboxState<YisPhoto> | null>(null);

  const counts = useMemo(() => countYisByCategory(photos), [photos]);
  const filtered = useMemo(() => filterYisPhotos(photos, filter), [photos, filter]);
  const heroSlides = useMemo(() => pickYisPhotos(photos, yisHeroNumbers), [photos]);
  const highlights = useMemo(() => pickYisPhotos(photos, yisHighlightNumbers), [photos]);
  const covers = useMemo(() => {
    const result: Partial<Record<YisCategory, YisPhoto>> = {};
    for (const [category, n] of Object.entries(yisCoverNumbers) as [YisCategory, number][]) {
      result[category] = yisPhotoByNumber(photos, n);
    }
    return result;
  }, [photos]);

  const categoryLabel = useCallback((photo: YisPhoto) => content.gallery.categories[photo.category], [content]);
  const openInAll = useCallback(
    (photo: YisPhoto) => setLightbox({ photos, index: Math.max(0, photos.findIndex((item) => item.id === photo.id)) }),
    [photos],
  );

  return (
    <div ref={scope}>
      <YisHero content={content.hero} slides={heroSlides} categoryLabel={categoryLabel} onOpen={openInAll} />
      <YisAbout content={content.about} logo={logo} lang={lang} />
      <YisMission content={content.mission} />
      <YisActivities content={content.activities} covers={covers} counts={counts} onSelectFilter={setFilter} />
      <PhotoStrip content={content.highlights} photos={highlights} openLabel={content.gallery.openPhoto} onOpen={openInAll} />
      <YisImpact
        content={content.impact}
        counts={{ photos: photos.length, activities: Object.values(counts).filter((count) => count > 0).length, moments: counts.programs }}
      />
      <YisGallery
        content={content.gallery}
        photos={filtered}
        total={photos.length}
        counts={counts}
        filter={filter}
        onFilterChange={setFilter}
        onOpen={(index) => setLightbox({ photos: filtered, index })}
      />
      <YisCta content={content.cta} />

      <PhotoLightbox
        state={lightbox}
        labels={content.gallery.lightbox}
        categoryLabel={categoryLabel}
        onIndexChange={(index) => setLightbox((current) => (current ? { ...current, index } : current))}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
