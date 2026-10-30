import { HomeView } from "./home-view";
import { contentService } from "@/lib/services/content-service";

/** Server Component: loads content through the service layer and hands it to the interactive view. */
export async function HomePage() {
  const [content, featured] = await Promise.all([contentService.getHomeContent(), contentService.getFeaturedMedia()]);
  return <HomeView content={content} featured={featured} />;
}
