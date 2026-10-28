import { VisionPage } from "@/components/pages/vision-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Vision & Plan",
  description:
    "A cleaner, greener, smarter Sylhet: key challenges and solutions, a 10-point plan and global partnerships.",
  path: "/vision-plan",
});

export default function Page() {
  return <VisionPage />;
}
