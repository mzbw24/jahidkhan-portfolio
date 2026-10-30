import type { FormContent, NavKey } from "./content";

export interface NavItem {
  key: NavKey;
  href: string;
  isRoute: boolean;
}

export interface SocialLink {
  key: "facebook-profile" | "facebook-page" | "youtube" | "instagram" | "linkedin" | "x";
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

export type ContactErrorCode = keyof FormContent["errors"];
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, ContactErrorCode>>;
