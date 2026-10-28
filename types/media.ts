export type MediaKey =
  | "heroCity" | "portrait" | "portraitCard" | "portraitPodium" | "teaGarden"
  | "cityAerial" | "cityToday" | "cityTomorrow" | "crowd" | "globalBand"
  | "connectBand" | "runningPhoto"
  | "focusEducation" | "focusHealth" | "focusInfrastructure" | "focusEnvironment"
  | "focusWelfare" | "focusDigital" | "focusBusiness" | "focusSafety"
  | "galleryPeople" | "galleryCommunity" | "galleryPartners" | "galleryFuture"
  | "challengeTraffic" | "challengeHospital" | "challengeWaste" | "challengeYouth"
  | "newsPortrait" | "newsCity" | "newsYouth" | "newsVideo"
  | "avatarA" | "avatarB" | "avatarC"
  | "projectA" | "projectB" | "projectC";

export interface MediaAsset {
  src: string;
  width: number;
  height: number;
}
