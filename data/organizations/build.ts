import type { OrganizationsPageData } from "@/types/organizations";
import { organizationsContent } from "./content";
import { organizationRegistry } from "./registry";

export function buildOrganizationsPageData(): OrganizationsPageData {
  for (const lang of ["en", "bn"] as const) {
    for (const org of organizationRegistry) {
      if (!organizationsContent[lang].items[org.id]) {
        throw new Error(`Organization "${org.id}" has no ${lang} text in data/organizations/content.ts`);
      }
    }
  }
  return { content: organizationsContent, organizations: organizationRegistry };
}
