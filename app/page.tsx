import { HomePage } from "@/components/pages/home-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "A Stronger Sylhet, Together",
  description:
    "Jahid Khan — independent public figure from Sylhet, Bangladesh. Explore the vision, focus areas, ventures and ways to get involved.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
