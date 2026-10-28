import Image, { type ImageProps } from "next/image";
import { media } from "@/data/media";
import type { MediaKey } from "@/types/media";

interface MediaImageProps extends Omit<ImageProps, "src" | "alt" | "width" | "height" | "fill"> {
  media: MediaKey;
  /** Leave empty for decorative images. */
  alt?: string;
  fill?: boolean;
}

/** Resolves a registry key to a next/image with correct intrinsic dimensions (prevents layout shift). */
export function MediaImage({ media: key, alt = "", fill = false, ...rest }: MediaImageProps) {
  const asset = media[key];
  if (fill) return <Image src={asset.src} alt={alt} fill {...rest} />;
  return <Image src={asset.src} alt={alt} width={asset.width} height={asset.height} {...rest} />;
}
