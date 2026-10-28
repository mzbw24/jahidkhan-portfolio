import { cache } from "react";
import { contentRepository } from "@/lib/repositories";

/** UI-facing service. Components/pages depend on this, never on /data or a concrete repository. */
export const contentService = {
  getCommonContent: cache(() => contentRepository.getCommon()),
  getHomeContent: cache(() => contentRepository.getHome()),
  getAboutContent: cache(() => contentRepository.getAbout()),
  getVisionContent: cache(() => contentRepository.getVision()),
  getContactContent: cache(() => contentRepository.getContact()),
};
