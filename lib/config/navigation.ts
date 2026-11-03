import type { NavItem } from "@/types/site";

export const navItems: NavItem[] = [
  { key: "about", href: "/about", isRoute: true },
  { key: "vision", href: "/vision-plan", isRoute: true },
  { key: "service", href: "/#focus-areas", isRoute: false },
  { key: "business", href: "/#business", isRoute: false },
  { key: "projects", href: "/jcdo", isRoute: true },
  { key: "media", href: "/media", isRoute: true },
  { key: "family", href: "/family", isRoute: true },
  { key: "contact", href: "/contact", isRoute: true },
];

export const LANG_STORAGE_KEY = "jk-lang";
