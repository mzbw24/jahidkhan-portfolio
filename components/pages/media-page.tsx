import { MediaView } from "./media-view";
import { contentService } from "@/lib/services/content-service";

export async function MediaPage() {
  const content = await contentService.getMediaContent();
  return <MediaView content={content} />;
}
