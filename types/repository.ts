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
import { JcdoPageData } from "./jcdo";
import { OrganizationsPageData } from "./organizations";
import { YisPageData } from "./yis";

export interface ContentRepository {
  getCommon(): Promise<Localized<CommonContent>>;
  getHome(): Promise<Localized<HomeContent>>;
  getAbout(): Promise<Localized<AboutContent>>;
  getVision(): Promise<Localized<VisionContent>>;
  getContact(): Promise<Localized<ContactContent>>;
  getFamily(): Promise<Localized<FamilyPageContent>>;
  getMedia(): Promise<Localized<MediaPageContent>>;
  getFeaturedMedia(): Promise<Localized<GalleryItem[]>>;
  getJcdo(): Promise<JcdoPageData>;
  getYis(): Promise<YisPageData>;
  getOrganizations(): Promise<OrganizationsPageData>;
}
