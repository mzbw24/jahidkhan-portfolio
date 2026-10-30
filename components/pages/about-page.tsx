import { AboutView } from "./about-view";
import { contentService } from "@/lib/services/content-service";

export async function AboutPage() {
  const content = await contentService.getAboutContent();
  return <AboutView content={content} />;
}
