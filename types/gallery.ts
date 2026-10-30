import type { HeadingContent } from "./content";

export type GalleryCategory =
  | "healthcare"
  | "environment"
  | "infrastructure"
  | "education"
  | "economy"
  | "voice"
  | "events"
  | "portraits";

export type GalleryFilter = "all" | "images" | "videos" | GalleryCategory;

export interface GalleryImageFields {
  src: string;
  thumb: string;
  width: number;
  height: number;
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
  type: string;
}

export interface GalleryVideoAsset extends GalleryBase {
  kind: "video";
  sources: VideoSource[];
  poster: GalleryImageFields;
  duration: number;
  width: number;
  height: number;
}

export type GalleryAsset = GalleryImageAsset | GalleryVideoAsset;

export interface GalleryItemText {
  title: string;
  alt: string;
}

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
  open: string;
  openVideo: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
  thumbnails: string;
  viewer: string;
  imageBadge: string;
  videoBadge: string;
  shortcuts: string;
  player: PlayerLabels;
}

export interface MediaPageStrings {
  hero: HeadingContent & { eyebrow: string; text: string };
  stats: { photos: string; videos: string; topics: string };
  filterLabel: string;
  filters: Record<"all" | "images" | "videos", string> &
    Record<GalleryCategory, string>;
  results: string;
  empty: string;
  labels: MediaLabels;
}

export interface MediaPageContent extends MediaPageStrings {
  items: GalleryItem[];
}
