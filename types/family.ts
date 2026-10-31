import type { PlayerLabels } from "@/types/gallery";

export type FamilyCategory = "all" | "family-life" | "celebrations" | "children" | "travel";

export interface FamilyPhoto {
  id: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  category: Exclude<FamilyCategory, "all">;
}

export interface FamilyVideo {
  id: string;
  src: string;
  poster: string;
  title: string;
  description: string;
  category: Exclude<FamilyCategory, "all">;
}

export interface FamilyPageContent {
  hero: { eyebrow: string; title: string; accent: string; text: string; primaryCta: string; videoCta: string; imageAlt: string };
  album: { title: string; subtitle: string; all: string; items: Array<{ category: Exclude<FamilyCategory, "all">; title: string; text: string; image: string }> };
  photos: { eyebrow: string; title: string; subtitle: string; viewAll: string; filters: Record<FamilyCategory, string>; items: FamilyPhoto[] };
  videos: { eyebrow: string; title: string; subtitle: string; viewAll: string; items: FamilyVideo[] };
  story: { eyebrow: string; title: string; text: string; cta: string; quote: string; author: string };
  values: { eyebrow: string; title: string; text: string; items: Array<{ title: string; text: string }> };
  ui: { close: string; previous: string; next: string; play: string; pause: string; video: string; photo: string; player: PlayerLabels };
}
