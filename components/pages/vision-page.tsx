import { VisionView } from "./vision-view";
import { contentService } from "@/lib/services/content-service";

/** Server Component: loads content through the service layer and hands it to the interactive view. */
export async function VisionPage() {
  const [content, featured, media] = await Promise.all([
    contentService.getVisionContent(),
    contentService.getFeaturedMedia(),
    contentService.getMediaContent(),
  ]);
  return <VisionView content={content} featured={featured} media={media} />;
}
