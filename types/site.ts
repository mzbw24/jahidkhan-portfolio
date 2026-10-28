import type { FormContent, NavKey } from "./content";

export interface NavItem {
  key: NavKey;
  href: string;
  /** true when the item is a real route (gets active state) rather than a home-page anchor. */
  isRoute: boolean;
}

export interface SocialLink {
  key: "facebook" | "youtube" | "instagram" | "linkedin" | "x";
  label: string;
  url: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  subject: string;
  message: string;
}

/** Error *codes* (keys of FormContent["errors"]) so messages re-translate if the language changes. */
export type ContactErrorCode = keyof FormContent["errors"];
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, ContactErrorCode>>;
