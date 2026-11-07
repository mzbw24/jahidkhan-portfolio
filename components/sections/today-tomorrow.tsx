"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, GripVertical } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { VisionContent } from "@/types/content";

const STEP = 5;

export function TodayTomorrow({ content }: { content: VisionContent["todayTomorrow"] }) {
  const [reveal, setReveal] = useState(50);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const tomorrowActive = reveal >= 50;
  const active = tomorrowActive ? content.tomorrow : content.today;

  const clamp = (value: number) => Math.min(100, Math.max(0, value));

  const updateFromPointer = useCallback((clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setReveal(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, () => void> = {
      ArrowRight: () => setReveal((v) => clamp(v + STEP)),
      ArrowUp: () => setReveal((v) => clamp(v + STEP)),
      ArrowLeft: () => setReveal((v) => clamp(v - STEP)),
      ArrowDown: () => setReveal((v) => clamp(v - STEP)),
      PageUp: () => setReveal((v) => clamp(v + 20)),
      PageDown: () => setReveal((v) => clamp(v - 20)),
      Home: () => setReveal(0),
      End: () => setReveal(100),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    move();
  };

  const smooth = dragging ? "" : "transition-[clip-path,left] duration-300 ease-out motion-reduce:transition-none";

  return (
    <section className="section-y overflow-hidden" aria-labelledby="today-tomorrow-title">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2
            id="today-tomorrow-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-4xl lg:text-5xl"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">{content.text}</p>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl bg-navy shadow-2xl ring-1 ring-black/5 sm:mt-10 sm:rounded-3xl">
          <div
            ref={stageRef}
            className="relative aspect-video w-full select-none"
            style={{ touchAction: "pan-y" }}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              setDragging(true);
              updateFromPointer(event.clientX);
            }}
            onPointerMove={(event) => {
              if (dragging) updateFromPointer(event.clientX);
            }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            onLostPointerCapture={() => setDragging(false)}
          >
            <Image
              src={content.today.image}
              alt={content.today.alt}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              quality={80}
              unoptimized
              draggable={false}
              className="object-cover"
            />
            <div className={cn("absolute inset-0", smooth)} style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>
              <Image
                src={content.tomorrow.image}
                alt={content.tomorrow.alt}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                quality={80}
                unoptimized
                draggable={false}
                className="object-cover"
              />
            </div>

            {/* Corner labels */}
            <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur sm:left-4 sm:top-4 sm:text-xs">
              {content.tomorrow.label}
            </span>
            <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur sm:right-4 sm:top-4 sm:text-xs">
              {content.today.label}
            </span>

            {/* Divider line */}
            <div
              aria-hidden="true"
              className={cn("pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_16px_rgba(255,255,255,.7)]", smooth)}
              style={{ left: `${reveal}%` }}
            />

            <button
              type="button"
              role="slider"
              aria-label={`${content.today.label} / ${content.tomorrow.label}`}
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(reveal)}
              aria-valuetext={active.label}
              onKeyDown={handleKeyDown}
              className={cn(
                "absolute top-1/2 z-30 grid h-11 w-11 [--half:1.375rem] sm:[--half:1.75rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-primary text-white shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:h-14 sm:w-14",
                smooth,
              )}
              style={{ left: `clamp(var(--half), ${reveal}%, calc(100% - var(--half)))` }}
            >
              <GripVertical className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden bg-gradient-to-t from-navy via-navy/80 to-transparent px-8 pb-8 pt-20 text-white md:block lg:px-10"
              aria-hidden="true"
            >
              <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                {active.label}
              </span>
              <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold lg:text-4xl">{active.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 lg:text-base">{active.text}</p>
            </div>
          </div>

          <div className="bg-navy px-4 pb-5 pt-4 text-white md:sr-only" aria-live="polite">
            <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
              {active.label}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{active.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{active.text}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 grid grid-cols-2 items-center gap-2 sm:mt-5 sm:flex sm:justify-between sm:gap-3">
          <button
            type="button"
            onClick={() => setReveal(0)}
            aria-pressed={reveal === 0}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5 dark:text-white dark:hover:bg-white/10 sm:justify-start"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {content.today.label}
          </button>
          <p className="order-last col-span-2 text-center text-xs text-muted-foreground sm:order-none sm:col-span-1">{content.hint}</p>
          <button
            type="button"
            onClick={() => setReveal(100)}
            aria-pressed={reveal === 100}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5 dark:text-white dark:hover:bg-white/10 sm:justify-end"
          >
            {content.tomorrow.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
