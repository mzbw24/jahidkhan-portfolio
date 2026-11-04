import { jcdoGalleryRows } from "@/data/jcdo/gallery";
import { jcdoImageMeta } from "@/data/jcdo/images.generated";
import { jcdoImageSrc } from "@/data/jcdo/photos";
import { yisGalleryRows } from "@/data/yis/gallery";
import { yisImageMeta, yisLogoMeta } from "@/data/yis/images.generated";
import { yisImageSrc } from "@/data/yis/photos";
import type { OrganizationAsset, OrganizationRecord } from "@/types/organizations";

function jcdoAsset(n: number): OrganizationAsset {
  const meta = jcdoImageMeta[n];
  if (!meta) throw new Error(`Missing JCDO image ${n}`);
  return { src: jcdoImageSrc(meta.file), width: meta.width, height: meta.height, blur: meta.blur };
}

function yisAsset(n: number): OrganizationAsset {
  const meta = yisImageMeta[n];
  if (!meta) throw new Error(`Missing YIS image ${n}`);
  return { src: yisImageSrc(meta.file), width: meta.width, height: meta.height, blur: meta.blur };
}

export const organizationRegistry: OrganizationRecord[] = [
  {
    id: "jcdo",
    href: "/jcdo",
    logoShape: "round",
    logo: jcdoAsset(7),
    cover: jcdoAsset(2),
    photoCount: jcdoGalleryRows.length,
  },
  {
    id: "yis",
    href: "/yis",
    logoShape: "tile",
    logo: { src: yisImageSrc(yisLogoMeta.file), width: yisLogoMeta.width, height: yisLogoMeta.height, blur: yisLogoMeta.blur },
    cover: yisAsset(18),
    photoCount: yisGalleryRows.length,
  },
];
