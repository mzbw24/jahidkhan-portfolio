export type MediaKey =
  | "portrait" | "portraitFull" | "portraitPoster" | "portraitPoster2"
  | "focusEducation" | "focusHealth" | "focusInfrastructure" | "focusEnvironment"
  | "focusWelfare" | "focusDigital" | "focusBusiness" | "focusSafety"
  | "galleryPeople" | "galleryCommunity" | "galleryPartners" | "galleryFuture"
  | "challengeTraffic" | "challengeHospital" | "challengeWaste" | "challengeYouth"
  | "projectA" | "projectB" | "projectC"
  | "crowd" | "connectBand" | "runningPhoto" | "faqPoster";

export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  position?: string;
  blur?: string;
}
