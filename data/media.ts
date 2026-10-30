import type { MediaAsset, MediaKey } from "@/types/media";
import { generatedImages, type GeneratedImageId } from "./gallery/assets.generated";

function at(id: GeneratedImageId, position?: string): MediaAsset {
  const image = generatedImages[id];
  return { src: image.src, width: image.width, height: image.height, blur: image.blur, position };
}

export const media: Record<MediaKey, MediaAsset> = {
  portrait: at("img-064", "50% 18%"),
  portraitFull: at("img-013", "50% 30%"),
  portraitPoster: at("img-085", "50% 35%"),
  portraitPoster2: at("img-001", "50% 35%"),
  focusEducation: at("img-027", "50% 58%"),
  focusHealth: at("img-044", "50% 50%"),
  focusInfrastructure: at("img-049", "50% 58%"),
  focusEnvironment: at("img-015", "50% 58%"),
  focusWelfare: at("img-046", "50% 58%"),
  focusDigital: at("img-031", "50% 46%"),
  focusBusiness: at("img-011", "50% 54%"),
  focusSafety: at("img-028", "50% 30%"),
  galleryPeople: at("img-050", "50% 40%"),
  galleryCommunity: at("img-029", "50% 50%"),
  galleryPartners: at("img-025", "50% 50%"),
  galleryFuture: at("img-052", "50% 50%"),
  challengeTraffic: at("img-024", "60% 40%"),
  challengeHospital: at("img-051", "60% 40%"),
  challengeWaste: at("img-089", "60% 40%"),
  challengeYouth: at("img-094", "60% 40%"),
  projectA: at("img-012", "50% 32%"),
  projectB: at("img-092", "50% 38%"),
  projectC: at("img-017", "50% 40%"),
  crowd: at("img-052", "50% 50%"),
  connectBand: at("img-035", "50% 50%"),
  runningPhoto: at("img-061", "50% 22%"),
  faqPoster: at("img-023", "50% 46%"),
};
