import type { ContentRepository } from "@/types/repository";
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

/**
 * Reads content from typed local files. Methods are async on purpose so a future
 * API/CMS repository can be dropped in without touching any caller.
 */
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
};
