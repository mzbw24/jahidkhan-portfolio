import { JsonLd } from "@/components/seo/json-ld";
import { OrganizationsView } from "./organizations-view";
import { contentService } from "@/lib/services/content-service";
import { organizationsCollectionSchema } from "@/lib/structured-data";

export async function OrganizationsPage() {
  const data = await contentService.getOrganizationsContent();
  return (
    <>
      <JsonLd
        data={organizationsCollectionSchema({
          path: "/organizations",
          items: data.organizations.map((org) => ({ name: data.content.en.items[org.id]?.name ?? org.id, href: org.href })),
        })}
      />
      <OrganizationsView data={data} />
    </>
  );
}
