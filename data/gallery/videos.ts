import type { GalleryVideoAsset } from "@/types/gallery";
import { generatedImages } from "./assets.generated";

const poster = (id: keyof typeof generatedImages) => generatedImages[id];

export const galleryVideos: GalleryVideoAsset[] = Array.from({ length: 22 }, (_, index) => {
  const number = index + 1;
  const posterId = ["img-011", "img-015", "img-027", "img-044", "img-049", "img-085"][index % 6] as keyof typeof generatedImages;
  return {
    kind: "video",
    id: `video-${number}`,
    category: index % 3 === 0 ? "events" : index % 3 === 1 ? "voice" : "infrastructure",
    featured: number === 22,
    sources: [{ src: `/media/videos/video-${number}.mp4`, type: "video/mp4" }],
    poster: poster(posterId),
    duration: 180 + index * 17,
    width: 16,
    height: 9,
  };
});
