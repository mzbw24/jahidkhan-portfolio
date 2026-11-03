import Image from "next/image";
import { cn } from "@/lib/utils";
import type { JcdoPhoto } from "@/types/jcdo";

interface JcdoPhotoImageProps {
  photo: JcdoPhoto;
  sizes: string;
  priority?: boolean;
  quality?: number;
  className?: string;
}

export function JcdoPhotoImage({ photo, sizes, priority, quality = 75, className }: JcdoPhotoImageProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder="blur"
      blurDataURL={photo.blur}
      draggable={false}
      className={cn("h-auto w-full select-none object-contain", className)}
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
