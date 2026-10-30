import type { NavItem } from "@/types/site";

/**
 * Only four real routes exist. Other menu entries jump to home-page sections,
 * so no navigation link can 404.
 */
export const navItems: NavItem[] = [
  { key: "home", href: "/", isRoute: true },
  { key: "about", href: "/about", isRoute: true },
  { key: "vision", href: "/vision-plan", isRoute: true },
  { key: "service", href: "/#focus-areas", isRoute: false },
  { key: "business", href: "/#business", isRoute: false },
  { key: "projects", href: "/#projects", isRoute: false },
  { key: "media", href: "/media", isRoute: true },
  { key: "family", href: "/family", isRoute: true },
  { key: "contact", href: "/contact", isRoute: true },
];

export const LANG_STORAGE_KEY = "jk-lang";
