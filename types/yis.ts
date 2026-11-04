import type { GalleryPhoto, PhotoCarouselLabels, PhotoLightboxLabels } from "./photo";

export type YisCategory = "gatherings" | "recognition" | "programs" | "sports" | "public";
export type YisFilter = "all" | YisCategory;

export interface YisPhoto extends GalleryPhoto {
  category: YisCategory;
}

export interface YisContent {
  hero: PhotoCarouselLabels & {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    text: string;
    logoAlt: string;
    logoMotto: string;
    pillars: { title: string; text: string }[];
  };
  mission: {
    eyebrow: string;
    title: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
  };
  highlights: {
    eyebrow: string;
    title: string;
    text: string;
    previous: string;
    next: string;
    listLabel: string;
  };
  activities: {
    eyebrow: string;
    title: string;
    text: string;
    viewPhotos: string;
    items: { category: YisCategory; title: string; text: string }[];
  };
  impact: {
    eyebrow: string;
    title: string;
    note: string;
    labels: { photos: string; activities: string; moments: string };
  };
  gallery: {
    eyebrow: string;
    title: string;
    text: string;
    filterLabel: string;
    all: string;
    categories: Record<YisCategory, string>;
    showing: string;
    showMore: string;
    showAll: string;
    openPhoto: string;
    lightbox: PhotoLightboxLabels;
  };
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    primary: string;
    secondary: string;
  };
}

export interface YisPageData {
  content: Record<"en" | "bn", YisContent>;
  photos: YisPhoto[];
  logo: { src: string; width: number; height: number; blur: string };
}
