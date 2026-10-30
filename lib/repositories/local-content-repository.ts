import type { Lang, Localized } from "@/types/common";
import type { GalleryItem, GalleryItemText, MediaPageContent } from "@/types/gallery";
import type { ContentRepository } from "@/types/repository";
import { galleryAssets } from "@/data/gallery/assets";
import { mediaEn } from "@/data/en/media";
import { mediaBn } from "@/data/bn/media";
import { mediaItemsEn } from "@/data/en/media-items";
import { mediaItemsBn } from "@/data/bn/media-items";
import { mediaVideosEn } from "@/data/en/media-videos";
import { mediaVideosBn } from "@/data/bn/media-videos";
import { commonEn } from "@/data/en/common";
import { commonBn } from "@/data/bn/common";
import { homeEn } from "@/data/en/home";
import { homeBn } from "@/data/bn/home";
import { aboutEn } from "@/data/en/about";
import { aboutBn } from "@/data/bn/about";
import { visionEn } from "@/data/en/vision";
import { visionBn } from "@/data/bn/vision";
import { contactEn } from "@/data/en/contact";
import { contactBn } from "@/data/bn/contact";
import { familyEn } from "@/data/en/family";
import { familyBn } from "@/data/bn/family";

const itemText: Localized<Record<string, GalleryItemText>> = {
  en: { ...mediaItemsEn, ...mediaVideosEn },
  bn: { ...mediaItemsBn, ...mediaVideosBn },
};

/** Joins non-localized assets with their localized text. Fails loudly if any asset has no text. */
function buildItems(lang: Lang): GalleryItem[] {
  return galleryAssets.map((asset) => {
    const text = itemText[lang][asset.id];
    if (!text) throw new Error(`Missing ${lang} title/alt for gallery item "${asset.id}"`);
    return { ...asset, ...text };
  });
}

export const localContentRepository: ContentRepository = {
  async getCommon() {
    return { en: commonEn, bn: commonBn };
  },
  async getHome() {
    return { en: homeEn, bn: homeBn };
  },
  async getAbout() {
    return { en: aboutEn, bn: aboutBn };
  },
  async getVision() {
    return { en: visionEn, bn: visionBn };
  },
  async getContact() {
    return { en: contactEn, bn: contactBn };
  },
  async getFamily() {
    return { en: familyEn, bn: familyBn };
  },
  async getMedia() {
    const en: MediaPageContent = { ...mediaEn, items: buildItems("en") };
    const bn: MediaPageContent = { ...mediaBn, items: buildItems("bn") };
    return { en, bn };
  },
  async getFeaturedMedia() {
    return {
      en: buildItems("en").filter((item) => item.featured),
      bn: buildItems("bn").filter((item) => item.featured),
    };
  },
};
