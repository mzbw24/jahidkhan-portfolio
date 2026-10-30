import type { Cta, IconItem, IconName } from "./common";
import type { MediaKey } from "./media";

/* ---------- Shared building blocks ---------- */

export interface HeadingContent {
  eyebrow?: string;
  /** Heading is rendered as `title` + `accent` (brand red) + `titleEnd`. Empty strings are skipped. */
  title: string;
  accent?: string;
  titleEnd?: string;
  text?: string;
}

export interface QuoteContent {
  text: string;
  author?: string;
}

export interface HeroContent extends HeadingContent {
  eyebrow: string;
  text: string;
  primaryCta?: Cta;
  /** `video: true` renders a "watch" button that is wired to siteConfig.videos. */
  secondaryCta?: { label: string; video?: boolean };
  quote?: QuoteContent;
  scriptTagline?: string;
  portraitAlt: string;
  chips?: IconItem[];
}

export interface ImageCard {
  image: MediaKey;
  icon: IconName;
  title: string;
  text: string;
}

export interface BandContent extends HeadingContent {
  cta?: Cta;
  items: IconItem[];
}

export interface StatItem {
  icon: IconName;
  value: string;
  label: string;
}

/* ---------- Common (layout-level) content ---------- */

export type NavKey =
  | "home" | "about" | "vision" | "service" | "business" | "projects" | "media" | "contact";

export interface CommonContent {
  siteTagline: string;
  skipLink: string;
  nav: Record<NavKey, string> & {
    support: string;
    openMenu: string;
    closeMenu: string;
    ariaLabel: string;
  };
  controls: {
    languageLabel: string;
    languageAria: string;
    themeAria: string;
  };
  footer: {
    quickLinks: string;
    contactTitle: string;
    location: string;
    locationNote: string;
    connect: string;
    socialLabel: string;
    rights: string;
    privacy: string;
    terms: string;
    tagline: string;
    newsletter: {
      title: string;
      text: string;
      placeholder: string;
      button: string;
      invalid: string;
      notConnected: string;
    };
  };
  cta: {
    scriptLines: string[];
    title: string;
    text: string;
    button: string;
  };
  mediaTeaser: { title: string; text: string; cta: string };
  placeholderBadge: string;
  notFound: { title: string; text: string; button: string };
}

/* ---------- Home ---------- */

export interface HomeContent {
  hero: HeroContent;
  trust: IconItem[];
  intro: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    bullets: string[];
    cta: Cta;
    quote: string;
    californiaTitle: string;
    californiaText: string;
    portraitAlt: string;
  };
  vision: BandContent;
  focus: { title: string; text: string; areas: ImageCard[] };
  mission: {
    bannerTitle: string;
    text: string;
    panelTitle: string;
    items: IconItem[];
  };
  business: { title: string; text: string; cta: Cta; cards: IconItem[] };
  projects: {
    title: string;
    text: string;
    items: { image: MediaKey; tag: string; title: string; text: string }[];
  };
  stats: StatItem[];
}

/* ---------- About ---------- */

export interface AboutContent {
  hero: HeroContent;
  trust: IconItem[];
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    signatureCaption: string;
    quote: QuoteContent;
    portraitAlt: string;
  };
  values: { eyebrow: string; items: IconItem[] };
  vision: BandContent;
  journey: {
    eyebrow: string;
    title: string;
    steps: IconItem[];
    gallery: { image: MediaKey; title: string; text: string }[];
  };
  running: {
    eyebrow: string;
    title: string;
    text: string;
    cta: Cta;
    photoAlt: string;
  };
  commitment: { eyebrow: string; quote: string; signatureCaption: string };
}

/* ---------- Vision & plan ---------- */

export interface VisionContent {
  hero: HeroContent;
  intro: {
    eyebrow: string;
    title: string;
    text: string;
    icons: IconItem[];
    quote: QuoteContent;
    facts: IconItem[];
    portraitAlt: string;
  };
  challenges: {
    title: string;
    viewAll: Cta;
    currentLabel: string;
    planLabel: string;
    items: { image: MediaKey; title: string; issue: string; plan: string }[];
  };
  plan: { id: string; title: string; items: IconItem[] };
  global: {
    title: string;
    accent: string;
    titleEnd?: string;
    text: string;
    items: IconItem[];
    californiaLabel: string;
    sylhetLabel: string;
  };
}

/* ---------- Contact ---------- */

export type ContactCardKey = "email" | "phone" | "whatsapp" | "location" | "meeting";
export type SubjectKey = "general" | "support" | "volunteer" | "business" | "media" | "other";

export interface ContactCard {
  key: ContactCardKey;
  icon: IconName;
  title: string;
  /** Localized value; when omitted the value is read from siteConfig. */
  value?: string;
  note: string;
}

export interface FormField {
  label: string;
  placeholder: string;
}

export interface FormContent {
  eyebrow: string;
  title: string;
  text: string;
  fields: {
    name: FormField;
    email: FormField;
    countryCode: { label: string };
    phone: FormField;
    subject: FormField & { options: Record<SubjectKey, string> };
    message: FormField;
  };
  submit: string;
  submitting: string;
  privacy: string;
  noBackendNote: string;
  errors: {
    required: string;
    email: string;
    phone: string;
    nameShort: string;
    messageShort: string;
    subject: string;
  };
  toast: {
    success: string;
    notConfigured: string;
    error: string;
  };
  whatsapp: {
    heading: string;
    labels: { name: string; email: string; phone: string; subject: string; message: string };
  };
}

export interface ContactContent {
  hero: HeroContent;
  cards: ContactCard[];
  form: FormContent;
  location: {
    eyebrow: string;
    title: string;
    text: string;
    mapTitle: string;
    addressLabel: string;
    address: string;
    addressNote: string;
    directions: string;
    hoursLabel: string;
    hours: string;
    hoursValue: string;
    meetingLabel: string;
    meeting: string;
    meetingNote: string;
  };
  connect: {
    eyebrow: string;
    title: string;
    text: string;
    cta: Cta;
    items: IconItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    text: string;
    items: { question: string; answer: string }[];
  };
  join: { title: string; text: string; cta: Cta; items: IconItem[] };
}
