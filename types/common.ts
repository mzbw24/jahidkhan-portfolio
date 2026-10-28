export type Lang = "en" | "bn";

/** Content that exists once per supported language. */
export type Localized<T> = Record<Lang, T>;

export type IconName =
  | "users" | "plane" | "graduation" | "heart" | "building" | "leaf" | "shield"
  | "lightbulb" | "pin" | "mail" | "phone" | "message" | "calendar" | "clock"
  | "globe" | "handshake" | "pulse" | "recycle" | "trees" | "bus" | "briefcase"
  | "cpu" | "landmark" | "eye" | "home" | "book" | "sprout" | "network" | "trend"
  | "smartphone" | "stethoscope" | "banknote" | "handHeart" | "scale" | "video"
  | "play" | "arrowRight" | "quote" | "send" | "car" | "hospital" | "compass"
  | "target" | "award" | "mic" | "newspaper" | "wifi" | "droplets" | "map"
  | "rocket" | "flag" | "star";

export interface Cta {
  label: string;
  href: string;
}

export interface IconItem {
  icon: IconName;
  title: string;
  text?: string;
}
