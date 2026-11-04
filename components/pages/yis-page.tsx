import { JsonLd } from "@/components/seo/json-ld";
import { YisView } from "./yis-view";
import { yisFacts } from "@/data/yis/facts";
import { contentService } from "@/lib/services/content-service";
import { yisOrganizationSchema } from "@/lib/structured-data";

export async function YisPage() {
  const data = await contentService.getYisContent();
  return (
    <>
      <JsonLd data={yisOrganizationSchema({ path: yisFacts.path, logoUrl: data.logo.src })} />
      <YisView data={data} />
    </>
  );
}
