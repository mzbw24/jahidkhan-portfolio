import type { Localized } from "./common";
import type { GalleryItem, MediaPageContent } from "./gallery";
import type { FamilyPageContent } from "./family";
import type {
  AboutContent,
  CommonContent,
  ContactContent,
  HomeContent,
  VisionContent,
} from "./content";

export interface ContentRepository {
  getCommon(): Promise<Localized<CommonContent>>;
  getHome(): Promise<Localized<HomeContent>>;
  getAbout(): Promise<Localized<AboutContent>>;
  getVision(): Promise<Localized<VisionContent>>;
  getContact(): Promise<Localized<ContactContent>>;
  getFamily(): Promise<Localized<FamilyPageContent>>;
  /** Full gallery (all items + localized UI strings). */
  getMedia(): Promise<Localized<MediaPageContent>>;
  getFeaturedMedia(): Promise<Localized<GalleryItem[]>>;
}
