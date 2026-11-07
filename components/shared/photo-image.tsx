import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/types/photo";

interface PhotoImageProps {
  photo: GalleryPhoto;
  sizes: string;
  priority?: boolean;
  quality?: number;
  className?: string;
}

export function PhotoImage({ photo, sizes, priority, quality = 75, className }: PhotoImageProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      quality={quality}
      unoptimized
      priority={priority}
      placeholder="blur"
      blurDataURL={photo.blur}
      draggable={false}
      className={cn("h-auto w-full select-none object-fit object-center", className)}
    />
  );
}

export function BlurBackdrop({ blur, className }: { blur: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 scale-125 bg-cover bg-center blur-2xl", className)}
      style={{ backgroundImage: `url("${blur}")` }}
    />
  );
}
