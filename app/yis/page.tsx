import { YisPage } from "@/components/pages/yis-page";
import { yisFacts } from "@/data/yis/facts";
import { yisGalleryRows, yisOgPhotoNumber } from "@/data/yis/gallery";
import { yisImageMeta } from "@/data/yis/images.generated";
import { yisImageSrc } from "@/data/yis/photos";
import { createMetadata } from "@/lib/metadata";

const og = yisImageMeta[yisOgPhotoNumber];

export const metadata = createMetadata({
  title: "Youth Is Strength (YIS) — Youth-led Social Organization",
  description: `Youth Is Strength (YIS) is a youth-led social and voluntary organization. Explore its activities and a gallery of ${yisGalleryRows.length} photos from gatherings, programs, recognition events and community occasions.`,
  path: yisFacts.path,
  keywords: [
    "Youth Is Strength",
    "YIS",
    "Tarunnoi Shakti",
    "youth organization Bangladesh",
    "youth-led initiative",
    "social organization Sylhet",
    "voluntary organization Bangladesh",
    "community engagement youth",
  ],
  image: og
    ? { url: yisImageSrc(og.file), width: og.width, height: og.height, alt: "Youth Is Strength members at a group gathering" }
    : undefined,
});

export default function Page() {
  return <YisPage />;
}
