import type { YisPhoto } from "@/types/yis";
import { yisGalleryRows } from "./gallery";
import { yisImageMeta, yisLogoMeta } from "./images.generated";

export function yisImageSrc(file: string): string {
  return `/images/ys/${encodeURIComponent(file)}`;
}

export function buildYisPhotos(): YisPhoto[] {
  return yisGalleryRows.map(([n, category, title]) => {
    const meta = yisImageMeta[n];
    if (!meta) throw new Error(`Missing generated image metadata for YIS image ${n}`);
    return {
      id: `yis-${n}`,
      category,
      src: yisImageSrc(meta.file),
      width: meta.width,
      height: meta.height,
      blur: meta.blur,
      title,
      alt: `${title} — Youth Is Strength`,
    };
  });
}

export function getYisLogo() {
  return { src: yisImageSrc(yisLogoMeta.file), width: yisLogoMeta.width, height: yisLogoMeta.height, blur: yisLogoMeta.blur };
}
