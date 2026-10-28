import { VisionView } from "./vision-view";
import { contentService } from "@/lib/services/content-service";

/** Server Component: loads content through the service layer and hands it to the interactive view. */
export async function VisionPage() {
  const content = await contentService.getVisionContent();
  return <VisionView content={content} />;
}
