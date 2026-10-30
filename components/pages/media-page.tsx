import { MediaView } from "./media-view";
import { contentService } from "@/lib/services/content-service";

/** Server Component: loads the gallery through the service layer. */
export async function MediaPage() {
  const content = await contentService.getMediaContent();
  return <MediaView content={content} />;
}
