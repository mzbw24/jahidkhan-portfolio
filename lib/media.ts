import type { GalleryCategory, GalleryFilter, GalleryItem } from "@/types/gallery";

export const CATEGORY_ORDER: GalleryCategory[] = [
  "healthcare", "environment", "infrastructure", "education", "economy", "voice", "events", "portraits",
];

/** Replaces `{name}` tokens. Unknown tokens are left untouched. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

/** 92 → "1:32". Invalid/negative → "0:00". */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const m = Math.floor(whole / 60);
  const s = whole % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function countByKind(items: GalleryItem[]) {
  let images = 0;
  let videos = 0;
  for (const item of items) {
    if (item.kind === "video") videos += 1;
    else images += 1;
  }
  return { images, videos };
}

/** Only offers filters that would show something. Type filters appear only when both kinds exist. */
export function availableFilters(items: GalleryItem[]): GalleryFilter[] {
  const { images, videos } = countByKind(items);
  const filters: GalleryFilter[] = ["all"];
  if (images > 0 && videos > 0) filters.push("images", "videos");
  const present = new Set(items.map((item) => item.category));
  for (const category of CATEGORY_ORDER) if (present.has(category)) filters.push(category);
  return filters;
}

export function filterItems(items: GalleryItem[], filter: GalleryFilter): GalleryItem[] {
  switch (filter) {
    case "all":
      return items;
    case "images":
      return items.filter((item) => item.kind === "image");
    case "videos":
      return items.filter((item) => item.kind === "video");
    default:
      return items.filter((item) => item.category === filter);
  }
}

/** Wraps around: next of the last is the first. */
export function stepIndex(current: number, delta: 1 | -1, length: number): number {
  if (length <= 0) return 0;
  return (current + delta + length) % length;
}
