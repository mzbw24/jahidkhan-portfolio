import Image from "next/image";
import { ImageIcon, Play } from "lucide-react";
import { fmt, formatTime } from "@/lib/media";
import type { GalleryItem, MediaLabels } from "@/types/gallery";

interface GalleryCardProps {
  item: GalleryItem;
  position: number;
  labels: MediaLabels;
  onOpen: () => void;
}

/** One thumbnail. The whole card is a real <button> so it is keyboard- and screen-reader-operable. */
export function GalleryCard({ item, position, labels, onOpen }: GalleryCardProps) {
  const isVideo = item.kind === "video";
  const thumb = isVideo ? item.poster : item;

  return (
    <li
      className="mb-3 break-inside-avoid animate-fade-up sm:mb-4"
      style={{ animationDelay: `${Math.min(position, 12) * 40}ms`, animationFillMode: "both" }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={fmt(isVideo ? labels.openVideo : labels.open, { title: item.title })}
        className="group relative block w-full overflow-hidden rounded-xl border bg-muted text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none"
      >
        <div className="relative w-full" style={{ aspectRatio: `${thumb.width} / ${thumb.height}` }}>
          <Image
            src={thumb.thumb}
            alt=""
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            placeholder="blur"
            blurDataURL={thumb.blur}
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
          {isVideo ? (
            <>
              <Play className="h-3 w-3 fill-white" aria-hidden="true" />
              {formatTime(item.duration)}
            </>
          ) : (
            <ImageIcon className="h-3 w-3" aria-hidden="true" />
          )}
          <span className="sr-only">{isVideo ? labels.videoBadge : labels.imageBadge}</span>
        </span>

        {isVideo ? (
          <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 ring-1 ring-white/60 backdrop-blur transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" aria-hidden="true" />
          </span>
        ) : null}

        <p className="absolute inset-x-0 bottom-0 p-3 text-[13px] font-semibold leading-snug text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]">
          {item.title}
        </p>
      </button>
    </li>
  );
}
