import type { GalleryAsset, GalleryImageAsset } from "@/types/gallery";
import { generatedImages } from "./assets.generated";
import { galleryManifest } from "./manifest";
import { galleryVideos } from "./videos";

export const galleryImages: GalleryImageAsset[] = galleryManifest.map((entry) => {
  const image = generatedImages[entry.id];
  return {
    kind: "image",
    id: entry.id,
    category: entry.category,
    featured: entry.featured,
    src: image.src,
    thumb: image.thumb,
    width: image.width,
    height: image.height,
    blur: image.blur,
  };
});

/** Featured first, then videos, then the rest in manifest order. */
export const galleryAssets: GalleryAsset[] = [
  ...galleryImages.filter((item) => item.featured),
  ...galleryVideos,
  ...galleryImages.filter((item) => !item.featured),
];
