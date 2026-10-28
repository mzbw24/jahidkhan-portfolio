import { ContactView } from "./contact-view";
import { contentService } from "@/lib/services/content-service";

/** Server Component: loads content through the service layer and hands it to the interactive view. */
export async function ContactPage() {
  const content = await contentService.getContactContent();
  return <ContactView content={content} />;
}
