import type { Localized } from "./common";

export interface OrganizationAsset {
  src: string;
  width: number;
  height: number;
  blur: string;
}

export interface OrganizationRecord {
  id: string;
  href: string;
  logoShape: "round" | "tile";
  logo: OrganizationAsset;
  cover: OrganizationAsset;
  photoCount: number;
}

export interface OrganizationText {
  name: string;
  description: string;
  cta: string;
  logoAlt: string;
  coverAlt: string;
}

export interface OrganizationsContent {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
  list: { eyebrow: string; title: string; text: string; ariaLabel: string };
  impact: {
    eyebrow: string;
    title: string;
    accent: string;
    labels: { organizations: string; photos: string };
    note: string;
  };
  cta: { title: string; accent: string; text: string; button: string };
  items: Record<string, OrganizationText>;
}

export interface OrganizationsPageData {
  content: Localized<OrganizationsContent>;
  organizations: OrganizationRecord[];
}
