import { cache } from "react";
import { contentRepository } from "@/lib/repositories";

export const contentService = {
  getCommonContent: cache(() => contentRepository.getCommon()),
  getHomeContent: cache(() => contentRepository.getHome()),
  getAboutContent: cache(() => contentRepository.getAbout()),
  getVisionContent: cache(() => contentRepository.getVision()),
  getContactContent: cache(() => contentRepository.getContact()),
  getFamilyContent: cache(() => contentRepository.getFamily()),
  getMediaContent: cache(() => contentRepository.getMedia()),
  getFeaturedMedia: cache(() => contentRepository.getFeaturedMedia()),
   getJcdoContent: cache(() => contentRepository.getJcdo()),
     getYisContent: cache(() => contentRepository.getYis()),
  getOrganizationsContent: cache(() => contentRepository.getOrganizations()),
};
