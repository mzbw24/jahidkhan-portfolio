import { AboutPage } from "@/components/pages/about-page";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/metadata";
import { profilePageSchema } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "About",
  description:
    "The story, values, milestones and personal commitment of Jahid Khan — a proud son of Sylhet with a global perspective.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <JsonLd data={profilePageSchema("/about")} />
      <AboutPage />
    </>
  );
}
