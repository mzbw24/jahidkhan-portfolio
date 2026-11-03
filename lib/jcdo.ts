import type { JcdoCategory, JcdoFilter, JcdoPhoto } from "@/types/jcdo";

export const JCDO_CATEGORY_ORDER: JcdoCategory[] = [
  "health",
  "safety",
  "environment",
  "learning",
  "community",
  "events",
  "organization",
];

export function filterPhotos(photos: JcdoPhoto[], filter: JcdoFilter): JcdoPhoto[] {
  return filter === "all" ? photos : photos.filter((photo) => photo.category === filter);
}

export function countByCategory(photos: JcdoPhoto[]): Record<JcdoCategory, number> {
  const counts: Record<JcdoCategory, number> = {
    health: 0, safety: 0, environment: 0, learning: 0, community: 0, events: 0, organization: 0,
  };
  for (const photo of photos) counts[photo.category] += 1;
  return counts;
}

export function photoByNumber(photos: JcdoPhoto[], n: number): JcdoPhoto | undefined {
  return photos.find((photo) => photo.id === `jcdo-${n}`);
}

export function pickPhotos(photos: JcdoPhoto[], numbers: readonly number[]): JcdoPhoto[] {
  return numbers.flatMap((n) => {
    const photo = photoByNumber(photos, n);
    return photo ? [photo] : [];
  });
}

/** Wraps around: next of the last is the first. */
export function wrapIndex(current: number, delta: number, length: number): number {
  if (length <= 0) return 0;
  return (((current + delta) % length) + length) % length;
}

export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}
