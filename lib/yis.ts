import type { YisCategory, YisFilter, YisPhoto } from "@/types/yis";

export const YIS_CATEGORIES: YisCategory[] = ["gatherings", "recognition", "programs", "sports", "public"];

export function filterYisPhotos(photos: YisPhoto[], filter: YisFilter): YisPhoto[] {
  return filter === "all" ? photos : photos.filter((photo) => photo.category === filter);
}

export function countYisByCategory(photos: YisPhoto[]): Record<YisCategory, number> {
  const counts: Record<YisCategory, number> = { gatherings: 0, recognition: 0, programs: 0, sports: 0, public: 0 };
  for (const photo of photos) counts[photo.category] += 1;
  return counts;
}

export function yisPhotoByNumber(photos: YisPhoto[], n: number): YisPhoto | undefined {
  return photos.find((photo) => photo.id === `yis-${n}`);
}

export function pickYisPhotos(photos: YisPhoto[], numbers: readonly number[]): YisPhoto[] {
  return numbers.flatMap((n) => {
    const photo = yisPhotoByNumber(photos, n);
    return photo ? [photo] : [];
  });
}
