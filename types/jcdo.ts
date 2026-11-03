export type JcdoCategory =
  | "health"
  | "safety"
  | "environment"
  | "learning"
  | "community"
  | "events"
  | "organization";

export type JcdoFilter = "all" | JcdoCategory;

export interface JcdoPhoto {
  id: string;
  category: JcdoCategory;
  src: string;
  width: number;
  height: number;
  blur: string;
  title: string;
  alt: string;
}

export interface JcdoLink {
  label: string;
  href: string;
}

export interface JcdoValue {
  title: string;
  text: string;
}

export interface JcdoTheme {
  category: Exclude<JcdoCategory, "events" | "organization">;
  title: string;
  text: string;
}

export interface JcdoStatLabels {
  photos: string;
  posters: string;
  events: string;
  themes: string;
}

export interface JcdoLightboxLabels {
  viewer: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
  thumbnails: string;
  shortcuts: string;
}

export interface JcdoContent {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    sliderLabel: string;
    previous: string;
    next: string;
    pause: string;
    play: string;
    goToSlide: string;
    slideCounter: string;
    values: JcdoValue[];
    valuesLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    text: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    cta: string;
    logoAlt: string;
  };
  stats: {
    title: string;
    note: string;
    labels: JcdoStatLabels;
  };
  programs: {
    eyebrow: string;
    title: string;
    text: string;
    viewAll: string;
    viewPosters: string;
    items: JcdoTheme[];
  };
  activities: {
    eyebrow: string;
    title: string;
    text: string;
    previous: string;
    next: string;
    listLabel: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    text: string;
    filterLabel: string;
    all: string;
    categories: Record<JcdoCategory, string>;
    showing: string;
    openPhoto: string;
    lightbox: JcdoLightboxLabels;
  };
  updates: {
    eyebrow: string;
    title: string;
    text: string;
    facebookCta: string;
    items: { category: JcdoCategory; title: string; text: string; cta: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    call: string;
    facebook: string;
  };
  partners: {
    eyebrow: string;
    title: string;
    text: string;
    websiteLabel: string;
    facebookLabel: string;
    phoneLabel: string;
  };
}

export interface JcdoPageData {
  content: Record<"en" | "bn", JcdoContent>;
  photos: JcdoPhoto[];
}
