import { OrganizationsPage } from "@/components/pages/organizations-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Organizations & Initiatives — JCDO Sylhet and Youth Is Strength",
  description:
    "Community-driven organizations and social initiatives supported by Jahid Khan: JCDO Sylhet (Jalalabad Community Development Organization) and Youth Is Strength (YIS), working for education, awareness, health, environment and an inclusive society.",
  path: "/organizations",
  keywords: [
    "Organizations and Initiatives",
    "JCDO Sylhet",
    "Youth Is Strength",
    "social organizations Sylhet",
    "community development Bangladesh",
    "youth initiatives Bangladesh",
    "Jahid Khan social work",
  ],
});

export default function Page() {
  return <OrganizationsPage />;
}
