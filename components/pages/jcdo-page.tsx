import { JsonLd } from "@/components/seo/json-ld";
import { JcdoView } from "./jcdo-view";
import { jcdoFacts } from "@/data/jcdo/facts";
import { contentService } from "@/lib/services/content-service";
import { jcdoOrganizationSchema } from "@/lib/structured-data";

export async function JcdoPage() {
  const data = await contentService.getJcdoContent();
  const logo = data.photos.find((photo) => photo.id === "jcdo-7");
  return (
    <>
      <JsonLd
        data={jcdoOrganizationSchema({
          path: jcdoFacts.path,
          logoUrl: logo?.src ?? "/images/og-cover.png",
          website: jcdoFacts.website,
          facebook: jcdoFacts.facebook,
        })}
      />
      <JcdoView data={data} />
    </>
  );
}
