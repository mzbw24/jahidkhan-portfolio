"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSwipe } from "@/hooks/use-swipe";
import { format, wrapIndex } from "@/lib/photo-utils";
import { cn } from "@/lib/utils";
import type { GalleryPhoto, PhotoLightboxLabels } from "@/types/photo";

export interface PhotoLightboxState<T extends GalleryPhoto = GalleryPhoto> {
  photos: T[];
  index: number;
}

interface PhotoLightboxProps<T extends GalleryPhoto> {
  state: PhotoLightboxState<T> | null;
  labels: PhotoLightboxLabels;
  categoryLabel: (photo: T) => string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const sizesAttr = "100vw";

export function PhotoLightbox<T extends GalleryPhoto>({ state, labels, categoryLabel, onIndexChange, onClose }: PhotoLightboxProps<T>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const open = state !== null;
  const photos = state?.photos;
  const index = state?.index ?? 0;
  const photo = photos?.[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const length = photos?.length ?? 0;
  const go = useCallback(
    (delta: number) => {
      if (!length) return;
      onIndexChange(wrapIndex(index, delta, length));
    },
    [index, length, onIndexChange],
  );

  // Keep the active thumbnail in view.
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "Home") onIndexChange(0);
      else if (event.key === "End") onIndexChange(length - 1);
      else return;
      event.preventDefault();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, go, length, onIndexChange]);

  const swipe = useSwipe(
    () => go(-1),
    () => go(1),
  );
  const pressedOnBackdrop = useRef(false);

  return (
    <dialog
      ref={dialogRef}
      aria-label={labels.viewer}
      onClose={onClose}
      onPointerDown={(event) => {
        pressedOnBackdrop.current = (event.target as HTMLElement).dataset.dismiss === "true" || event.target === event.currentTarget;
      }}
      onClick={(event) => {
        const wasDrag = swipe.wasDrag();
        const onBackdrop = (event.target as HTMLElement).dataset.dismiss === "true" || event.target === event.currentTarget;
        if (onBackdrop && pressedOnBackdrop.current && !wasDrag) dialogRef.current?.close();
      }}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/90 backdrop:backdrop-blur-sm"
    >
      {photo && photos ? (
        <div data-dismiss="true" className="mx-auto flex h-full w-full max-w-7xl flex-col px-3 py-3 sm:px-6 sm:py-5">
          <header className="flex items-start justify-between gap-4 pb-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold sm:text-lg">{photo.title}</h2>
              <p className="mt-0.5 text-xs text-white/75" aria-live="polite">
                {format(labels.counter, { current: index + 1, total: photos.length })} · {categoryLabel(photo)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={labels.close}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div data-dismiss="true" className="relative flex min-h-0 flex-1 items-center justify-center">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className="absolute left-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/80"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              data-dismiss="true"
              onPointerDown={swipe.onPointerDown}
              style={{ touchAction: "pan-y" }}
              className="relative flex h-full w-full items-center justify-center px-14 sm:px-16"
            >
              <div key={photo.id} className="jcdo-fade-in relative h-full w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={sizesAttr}
                  quality={85}
                  priority
                  draggable={false}
                  className="select-none object-contain [-webkit-user-drag:none]"
                />
              </div>
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
              {[1, -1].map((delta) => {
                const neighbour = photos[wrapIndex(index, delta, photos.length)];
                return neighbour && neighbour.id !== photo.id ? (
                  <Image key={neighbour.id} src={neighbour.src} alt="" width={neighbour.width} height={neighbour.height} sizes={sizesAttr} quality={85} loading="eager" />
                ) : null;
              })}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className="absolute right-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/80"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={labels.thumbnails} className="pt-3">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto p-1">
              {photos.map((thumb, i) => (
                <li key={thumb.id} className="shrink-0">
                  <button
                    type="button"
                    ref={(node) => {
                      thumbRefs.current[i] = node;
                    }}
                    onClick={() => onIndexChange(i)}
                    aria-label={thumb.title}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "relative block h-14 w-14 overflow-hidden rounded-md bg-white/10 ring-2 ring-offset-2 ring-offset-black transition sm:h-16 sm:w-16",
                      i === index ? "ring-white" : "opacity-60 ring-transparent hover:opacity-100",
                    )}
                  >
                    <Image src={thumb.src} alt="" fill sizes="64px" quality={40} className="object-contain" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 hidden text-center text-[11px] text-white/60 sm:block">{labels.shortcuts}</p>
          </nav>
        </div>
      ) : null}
    </dialog>
  );
}
