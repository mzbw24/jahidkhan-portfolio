"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { VideoPlayer } from "@/components/shared/video-player";
import { fmt, stepIndex } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { GalleryItem, MediaLabels } from "@/types/gallery";

interface LightboxProps {
  items: GalleryItem[];
  /** null = closed */
  index: number | null;
  labels: MediaLabels;
  categoryLabel: (item: GalleryItem) => string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE_DISTANCE = 60;

/**
 * Modal viewer built on the native <dialog>: focus is trapped, the page behind is inert, Escape closes,
 * and focus returns to the card that opened it. Backdrop click, arrows and swipe are layered on top.
 */
export function Lightbox({ items, index, labels, categoryLabel, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** True when the last pointer gesture was a drag — its trailing click must not count as an outside click. */
  const dragged = useRef(false);
  /** A click only dismisses if the press also began on a dismiss area (not on a button/image). */
  const pressedOnDismiss = useRef(false);
  const open = index !== null;
  const item = index !== null ? items[index] : undefined;

  // Sync native dialog with state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Preload neighbours, keep active thumbnail in view.
  useEffect(() => {
    if (index === null) return;
    for (const delta of [1, -1] as const) {
      const neighbour = items[stepIndex(index, delta, items.length)];
      if (neighbour?.kind === "image") {
        const img = new window.Image();
        img.src = neighbour.src;
      }
    }
    thumbRefs.current[index]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [index, items]);

  const go = useCallback(
    (delta: 1 | -1) => {
      if (index === null) return;
      onIndexChange(stepIndex(index, delta, items.length));
    },
    [index, items.length, onIndexChange],
  );

  // Arrow keys are handled on the document, not the dialog: if the focused element is removed
  // (e.g. after "Try again"), key events land on <body>, which a dialog-level handler would miss.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return; // sliders own their arrow keys
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, go]);

  // Swipe tracking uses window-level listeners so the release is seen even when it lands on an arrow
  // button or outside the image (pointer capture would retarget plain clicks, so it is not used).
  const swipeCleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => swipeCleanup.current?.(), []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swipeCleanup.current?.();
    dragged.current = false;
    const start = { x: event.clientX, y: event.clientY };
    const stop = () => {
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", stop);
      swipeCleanup.current = null;
    };
    const finish = (up: PointerEvent) => {
      stop();
      const dx = up.clientX - start.x;
      const dy = up.clientY - start.y;
      if (Math.hypot(dx, dy) > 10) dragged.current = true;
      if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    };
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", stop);
    swipeCleanup.current = stop;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={labels.viewer}
      onClose={onClose}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        pressedOnDismiss.current = event.target === event.currentTarget || target.dataset.dismiss === "true";
      }}
      onClick={(event) => {
        // Backdrop, or empty space around the media (elements marked data-dismiss), closes the viewer —
        // but only for a genuine click: the press must have started there too and must not be a drag/swipe.
        const wasDrag = dragged.current;
        dragged.current = false;
        const target = event.target as HTMLElement;
        const onDismiss = event.target === event.currentTarget || target.dataset.dismiss === "true";
        if (onDismiss && pressedOnDismiss.current && !wasDrag) dialogRef.current?.close();
      }}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {item && index !== null ? (
        <div data-dismiss="true" className="mx-auto flex h-full w-full max-w-6xl flex-col px-3 py-3 sm:px-6 sm:py-5">
          <header className="flex items-start justify-between gap-4 pb-3">
            <div className="min-w-0">
              <h2 className="truncate font-display text-lg font-bold sm:text-xl">{item.title}</h2>
              <p className="mt-0.5 text-xs text-white/70">
                {fmt(labels.counter, { current: index + 1, total: items.length })} · {categoryLabel(item)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={labels.close}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div data-dismiss="true" className="relative flex min-h-0 flex-1 items-center justify-center">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className="absolute left-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/75 sm:-left-1"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              data-dismiss="true"
              className="flex h-full w-full items-center justify-center px-12 sm:px-14"
              onPointerDown={item.kind === "image" ? onPointerDown : undefined}
              style={{ touchAction: item.kind === "image" ? "pan-y" : undefined }}
            >
              {item.kind === "video" ? (
                <VideoPlayer key={item.id} video={item} title={item.title} labels={labels.player} className="w-full max-w-4xl" />
              ) : (
                <Image
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 60vw, 90vw"
                  placeholder="blur"
                  blurDataURL={item.blur}
                  priority
                  unoptimized
                  draggable={false}
                  className="max-h-full w-auto max-w-full select-none rounded-lg object-contain shadow-2xl [-webkit-user-drag:none]"
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className="absolute right-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/75 sm:-right-1"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={labels.thumbnails} className="pt-3">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {items.map((thumb, i) => (
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
                      "relative block h-14 w-11 overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-black transition sm:h-16 sm:w-12",
                      i === index ? "ring-primary" : "opacity-60 ring-transparent hover:opacity-100",
                    )}
                  >
                    <Image
                      src={thumb.kind === "video" ? thumb.poster.thumb : thumb.thumb}
                      alt=""
                      fill
                      sizes="48px"
                      unoptimized
                      className="object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 hidden text-center text-[11px] text-white/55 sm:block">{labels.shortcuts}</p>
          </nav>
        </div>
      ) : null}
    </dialog>
  );
}
