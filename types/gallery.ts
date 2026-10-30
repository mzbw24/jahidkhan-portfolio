import type { HeadingContent } from "./content";

export type GalleryCategory =
  | "healthcare" | "environment" | "infrastructure" | "education"
  | "economy" | "voice" | "events" | "portraits";

export type GalleryFilter = "all" | "images" | "videos" | GalleryCategory;

export interface GalleryImageFields {
  /** Full-resolution WebP (lightbox). */
  src: string;
  /** 480px-wide WebP (grid). */
  thumb: string;
  width: number;
  height: number;
  /** Tiny base64 JPEG used as blur-up placeholder. */
  blur: string;
}

interface GalleryBase {
  id: string;
  category: GalleryCategory;
  featured?: boolean;
}

export interface GalleryImageAsset extends GalleryBase, GalleryImageFields {
  kind: "image";
}

export interface VideoSource {
  src: string;
  /** e.g. "video/mp4", "video/webm" */
  type: string;
}

export interface GalleryVideoAsset extends GalleryBase {
  kind: "video";
  /** Ordered by preference; the browser plays the first it supports. */
  sources: VideoSource[];
  poster: GalleryImageFields;
  /** Seconds. */
  duration: number;
  width: number;
  height: number;
}

export type GalleryAsset = GalleryImageAsset | GalleryVideoAsset;

export interface GalleryItemText {
  title: string;
  alt: string;
}

/** Asset + localized text — what the UI renders. */
export type GalleryItem = GalleryAsset & GalleryItemText;

export interface PlayerLabels {
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  volume: string;
  seek: string;
  fullscreen: string;
  exitFullscreen: string;
  pictureInPicture: string;
  speed: string;
  error: string;
  retry: string;
}

export interface MediaLabels {
  /** "{title}" is replaced at runtime. */
  open: string;
  openVideo: string;
  close: string;
  previous: string;
  next: string;
  /** "{current}" and "{total}" are replaced at runtime. */
  counter: string;
  thumbnails: string;
  viewer: string;
  imageBadge: string;
  videoBadge: string;
  shortcuts: string;
  player: PlayerLabels;
}

export interface MediaPageStrings {
  hero: HeadingContent & { eyebrow: string; text: string; cta: string; ctaSecondary: string };
  stats: { photos: string; videos: string; topics: string };
  filterLabel: string;
  filters: Record<"all" | "images" | "videos", string> & Record<GalleryCategory, string>;
  /** "{count}" and "{total}" are replaced at runtime. */
  results: string;
  empty: string;
  labels: MediaLabels;
}

export interface MediaPageContent extends MediaPageStrings {
  items: GalleryItem[];
}
