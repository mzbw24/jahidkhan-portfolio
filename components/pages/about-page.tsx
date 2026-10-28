import { AboutView } from "./about-view";
import { contentService } from "@/lib/services/content-service";

/** Server Component: loads content through the service layer and hands it to the interactive view. */
export async function AboutPage() {
  const content = await contentService.getAboutContent();
  return <AboutView content={content} />;
}
