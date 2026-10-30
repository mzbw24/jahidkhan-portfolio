import Image, { type ImageProps } from "next/image";
import { media } from "@/data/media";
import type { MediaKey } from "@/types/media";

interface MediaImageProps extends Omit<ImageProps, "src" | "alt" | "width" | "height" | "fill" | "placeholder" | "blurDataURL"> {
  media: MediaKey;
  alt?: string;
  fill?: boolean;
}

export function MediaImage({ media: key, alt = "", fill = false, style, ...rest }: MediaImageProps) {
  const asset = media[key];
  const blur = asset.blur ? ({ placeholder: "blur", blurDataURL: asset.blur } as const) : {};
  const mergedStyle = asset.position ? { objectPosition: asset.position, ...style } : style;

  if (fill) return <Image src={asset.src} alt={alt} fill style={mergedStyle} {...blur} {...rest} />;
  return <Image src={asset.src} alt={alt} width={asset.width} height={asset.height} style={mergedStyle} {...blur} {...rest} />;
}
