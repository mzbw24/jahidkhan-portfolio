import { MediaPage } from "@/components/pages/media-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Media Gallery",
  description:
    "Campaign posters, portraits and event moments from Jahid Khan — browse by topic and view each in a full-screen viewer.",
  path: "/media",
});

export default function Page() {
  return <MediaPage />;
}
