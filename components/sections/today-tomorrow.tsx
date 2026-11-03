"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, GripVertical } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { VisionContent } from "@/types/content";

export function TodayTomorrow({
  content,
}: {
  content: VisionContent["todayTomorrow"];
}) {
  const [reveal, setReveal] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const tomorrowActive = reveal >= 50;
  const activeContent = tomorrowActive ? content.tomorrow : content.today;

  const updateFromPointer = useCallback((clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const percentage = ((clientX - rect.left) / rect.width) * 100;

    setReveal(Math.min(100, Math.max(0, percentage)));
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        setReveal((value) => Math.min(100, value + 5));
        break;
      case "ArrowLeft":
        event.preventDefault();
        setReveal((value) => Math.max(0, value - 5));
        break;
      case "Home":
        event.preventDefault();
        setReveal(0);
        break;
      case "End":
        event.preventDefault();
        setReveal(100);
        break;
    }
  };

  return (
    <section
      className="section-y overflow-hidden"
      aria-labelledby="today-tomorrow-title"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>

          <h2
            id="today-tomorrow-title"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl"
          >
            {content.title}
          </h2>

          <p className="mt-4 text-muted-foreground">{content.text}</p>
        </div>

        <div
          ref={stageRef}
          className="relative mt-10 aspect-[16/10] min-h-[24rem] overflow-hidden rounded-3xl bg-navy shadow-2xl sm:aspect-[16/8] sm:min-h-[32rem]"
          onPointerMove={(event) => {
            if (dragging.current) {
              updateFromPointer(event.clientX);
            }
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          {/* Today image */}
          <Image
            src={content.today.image}
            alt={content.today.alt}
            fill
            priority={false}
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-cover object-center"
          />

          {/* Tomorrow image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `inset(0 0 0 ${100 - reveal}%)`,
            }}
          >
            <Image
              src={content.tomorrow.image}
              alt={content.tomorrow.alt}
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Single active content panel */}
          <div
            key={tomorrowActive ? "tomorrow" : "today"}
            className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy via-navy/85 to-transparent px-5 pb-8 pt-24 text-white transition-opacity duration-300 sm:px-10 sm:pb-12"
            aria-live="polite"
          >
            <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              {activeContent.label}
            </span>

            <h3 className="mt-4 max-w-2xl font-display text-3xl font-semibold sm:text-5xl">
              {activeContent.title}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-lg">
              {activeContent.text}
            </p>
          </div>

          {/* Comparison divider and accessible slider */}
          <div
            className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,.6)]"
            style={{ left: `${reveal}%` }}
          >
            <button
              type="button"
              role="slider"
              aria-label="Compare Sylhet today and tomorrow"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(reveal)}
              aria-valuetext={
                tomorrowActive ? "Showing Tomorrow" : "Showing Today"
              }
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                dragging.current = true;
                updateFromPointer(event.clientX);
              }}
              onPointerMove={(event) => {
                if (dragging.current) {
                  updateFromPointer(event.clientX);
                }
              }}
              onPointerUp={() => {
                dragging.current = false;
              }}
              onPointerCancel={() => {
                dragging.current = false;
              }}
              onKeyDown={handleKeyDown}
              className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 touch-none place-items-center rounded-full border-2 border-white bg-primary text-white shadow-xl transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 sm:h-14 sm:w-14"
            >
              <GripVertical className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Comparison controls */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setReveal(0)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5 dark:text-white dark:hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            {content.today.label}
          </button>

          <span className="hidden text-center text-xs text-muted-foreground sm:block">
            Drag the divider to explore the future vision
          </span>

          <button
            type="button"
            onClick={() => setReveal(100)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5 dark:text-white dark:hover:bg-white/10"
          >
            {content.tomorrow.label}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
