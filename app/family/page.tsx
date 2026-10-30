import { FamilyPage } from "@/components/pages/family-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Family",
  description: "A collection of family moments, memories and values that keep Jahid Khan grounded.",
  path: "/family",
});

export default function Page() {
  return <FamilyPage />;
}
