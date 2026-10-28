import type { Localized } from "./common";
import type {
  AboutContent,
  CommonContent,
  ContactContent,
  HomeContent,
  VisionContent,
} from "./content";

/**
 * Contract every content source must satisfy.
 * Today: `LocalContentRepository` (typed files in /data).
 * Later: an API/CMS-backed repository — only lib/repositories/index.ts changes.
 */
export interface ContentRepository {
  getCommon(): Promise<Localized<CommonContent>>;
  getHome(): Promise<Localized<HomeContent>>;
  getAbout(): Promise<Localized<AboutContent>>;
  getVision(): Promise<Localized<VisionContent>>;
  getContact(): Promise<Localized<ContactContent>>;
}
