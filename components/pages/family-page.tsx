import { contentService } from "@/lib/services/content-service";
import { FamilyView } from "./family-view";

export async function FamilyPage() {
  const content = await contentService.getFamilyContent();
  return <FamilyView content={content} />;
}
