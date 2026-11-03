"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, GripVertical } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { media } from "@/data/media";
import type { VisionContent } from "@/types/content";

export function TodayTomorrow({ content }: { content: VisionContent["todayTomorrow"] }) {
  const [reveal, setReveal] = useState(50);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const updateFromPointer = useCallback((clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setReveal(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);
  const tomorrow = reveal >= 50;

  return (
    <section className="section-y bg-muted/35" aria-labelledby="today-tomorrow-title">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="today-tomorrow-title" className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">{content.title}</h2>
          <p className="mt-4 text-muted-foreground">{content.text}</p>
        </div>

        <div
          ref={stageRef}
          className="relative mt-10 min-h-[30rem] overflow-hidden rounded-[2rem] bg-navy shadow-2xl touch-none select-none"
          onPointerMove={(event) => { if (dragging.current) updateFromPointer(event.clientX); }}
          onPointerUp={() => { dragging.current = false; }}
          onPointerCancel={() => { dragging.current = false; }}
          onPointerLeave={() => { dragging.current = false; }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); setReveal(100); }
            if (event.key === "ArrowLeft") { event.preventDefault(); setReveal(0); }
            if (event.key === "Home") { event.preventDefault(); setReveal(0); }
            if (event.key === "End") { event.preventDefault(); setReveal(100); }
          }}
          tabIndex={0}
          role="group"
          aria-label={content.hint}
        >
          <ComparisonPanel content={content.today} />
          <div className="absolute inset-0 overflow-hidden transition-[clip-path] duration-300 ease-out" style={{ clipPath: `inset(0 0 0 ${100 - reveal}%)` }} aria-hidden={!tomorrow}>
            <ComparisonPanel content={content.tomorrow} />
          </div>
          <div className="absolute inset-y-0 z-20 w-px bg-white/75 shadow-[0_0_24px_rgba(255,255,255,.55)] transition-[left] duration-300 ease-out" style={{ left: `${reveal}%` }}>
            <button
              type="button"
              aria-label={tomorrow ? content.today.label : content.tomorrow.label}
              onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); dragging.current = true; updateFromPointer(event.clientX); }}
              className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-primary text-white shadow-xl transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <GripVertical className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm font-medium">
          <button type="button" onClick={() => setReveal(0)} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-navy transition hover:bg-navy/5 dark:text-white dark:hover:bg-white/10"><ArrowLeft className="h-4 w-4" />{content.today.label}</button>
          <p className="hidden text-center text-xs text-muted-foreground sm:block">{content.hint}</p>
          <button type="button" onClick={() => setReveal(100)} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-navy transition hover:bg-navy/5 dark:text-white dark:hover:bg-white/10">{content.tomorrow.label}<ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}

function ComparisonPanel({ content }: { content: VisionContent["todayTomorrow"]["today"] }) {
  const image = media[content.image];
  return (
    <article className="absolute inset-0 flex items-end">
      <Image src={image.src} alt={content.alt} fill sizes="(min-width: 1024px) 90vw, 100vw" className="object-contain object-center opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
      <div className="relative z-10 max-w-xl p-7 text-white sm:p-10">
        <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">{content.label}</span>
        <h3 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">{content.title}</h3>
        <p className="mt-3 max-w-lg text-white/75 sm:text-lg">{content.text}</p>
      </div>
    </article>
  );
}
