import type { GalleryItemText } from "@/types/gallery";

export const mediaVideosEn: Record<string, GalleryItemText> = Object.fromEntries(
  Array.from({ length: 22 }, (_, index) => {
    const number = index + 1;
    const title = number === 22 ? "Vision for Sylhet City Corporation" : `Community update ${number}`;
    return [`video-${number}`, { title, alt: `${title} video` }];
  }),
);
