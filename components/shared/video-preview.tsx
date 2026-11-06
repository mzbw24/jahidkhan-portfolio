"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface VideoPreviewPoster {
  src: string;
  blur?: string;
  unoptimized?: boolean;
}

interface VideoPreviewProps {
  src: string;
  type?: string;
  title: string;
  aspectRatio?: string;
  poster?: VideoPreviewPoster;
  sizes?: string;
}

const FRAME_FRAGMENT = "#t=0.1";

export function VideoPreview({
  src,
  type = "video/mp4",
  title,
  aspectRatio = "16 / 9",
  poster,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: VideoPreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [posterFailed, setPosterFailed] = useState(false);
  const [near, setNear] = useState(false);
  const [frameReady, setFrameReady] = useState(false);

  const usePoster = Boolean(poster) && !posterFailed;

  useEffect(() => {
    if (usePoster) return;
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [usePoster]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden bg-navy"
      style={{ aspectRatio }}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/.42),transparent_34%),linear-gradient(135deg,hsl(var(--navy)),hsl(var(--navy-soft)))]"
        aria-hidden="true"
      />
      {usePoster && poster ? (
        <Image
          src={poster.src}
          alt=""
          fill
          sizes={sizes}
          unoptimized={poster.unoptimized ?? true}
          placeholder={poster.blur ? "blur" : "empty"}
          blurDataURL={poster.blur}
          onError={() => setPosterFailed(true)}
          className="object-cover"
        />
      ) : near ? (
        <video
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-label={title}
          disablePictureInPicture
          onLoadedData={() => setFrameReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none",
            frameReady ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={`${src}${FRAME_FRAGMENT}`} type={type} />
        </video>
      ) : null}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
