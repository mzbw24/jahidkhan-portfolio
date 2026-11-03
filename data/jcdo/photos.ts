import type { JcdoPhoto } from "@/types/jcdo";
import { jcdoGalleryRows } from "./gallery";
import { jcdoImageMeta } from "./images.generated";

export function jcdoImageSrc(file: string): string {
  return `/images/jcdo/${encodeURIComponent(file)}`;
}

export function buildJcdoPhotos(): JcdoPhoto[] {
  return jcdoGalleryRows.map(([n, category, title]) => {
    const meta = jcdoImageMeta[n];
    if (!meta) throw new Error(`Missing generated image metadata for JCDO image ${n}`);
    return {
      id: `jcdo-${n}`,
      category,
      src: jcdoImageSrc(meta.file),
      width: meta.width,
      height: meta.height,
      blur: meta.blur,
      title,
      alt: `${title} — JCDO Sylhet`,
    };
  });
}
