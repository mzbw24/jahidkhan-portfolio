import type { GalleryItemText } from "@/types/gallery";

export const mediaVideosBn: Record<string, GalleryItemText> = Object.fromEntries(
  Array.from({ length: 22 }, (_, index) => {
    const number = index + 1;
    const title = number === 22 ? "সিলেট সিটি কর্পোরেশনের জন্য ভিশন" : `কমিউনিটি আপডেট ${number}`;
    return [`video-${number}`, { title, alt: `${title} ভিডিও` }];
  }),
);
