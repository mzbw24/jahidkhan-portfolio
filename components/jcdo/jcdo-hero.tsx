"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurBackdrop } from "./jcdo-photo";
import { useSwipe } from "@/hooks/use-swipe";
import { format, wrapIndex } from "@/lib/jcdo";
import { cn } from "@/lib/utils";
import type { JcdoContent, JcdoPhoto } from "@/types/jcdo";

interface JcdoHeroProps {
  content: JcdoContent["hero"];
  slides: JcdoPhoto[];
  categoryLabel: (photo: JcdoPhoto) => string;
  onOpen: (photo: JcdoPhoto) => void;
}

const AUTOPLAY_MS = 6000;

export function JcdoHero({ content, slides, categoryLabel, onOpen }: JcdoHeroProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((delta: number) => setActive((current) => wrapIndex(current, delta, total)), [total]);

  useEffect(() => {
    if (!playing || hovered || focused || total < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, total, go]);

  const swipe = useSwipe(
    () => go(-1),
    () => go(1),
  );
  const current = slides[active];

  return (
    <section aria-labelledby="jcdo-hero-title" className="dark-band">
      <div className="container grid grid-cols-1 items-center gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:py-16">
        <div className="order-2 min-w-0 lg:order-1">
          <p data-hero-item className="mb-4 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold ring-1 ring-gold/40">
            {content.eyebrow}
          </p>
          <h1 id="jcdo-hero-title" data-hero-item className="font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl xl:text-6xl">
            {content.title} <span className="block text-gold">{content.accent}</span>
          </h1>
          <p data-hero-item className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            {content.text}
          </p>
          <div data-hero-item className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#programs">
                {content.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href="#gallery">{content.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <div
          data-hero-item
          role="region"
          aria-roledescription="carousel"
          aria-label={content.sliderLabel}
          className="order-1 min-w-0 lg:order-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(-1);
            else if (event.key === "ArrowRight") go(1);
          }}
        >
          <div
            onPointerDown={swipe.onPointerDown}
            style={{ touchAction: "pan-y" }}
            className="relative aspect-square max-h-[70vh] w-full overflow-hidden rounded-2xl bg-black/30 ring-1 ring-white/15 sm:aspect-[4/3] lg:aspect-[5/4]"
          >
            {slides.map((slide, i) => {
              const near = i === active || i === wrapIndex(active, 1, total) || i === wrapIndex(active, -1, total);
              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={format(content.slideCounter, { current: i + 1, total })}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
                    i === active ? "z-10 opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <BlurBackdrop blur={slide.blur} className="opacity-70" />
                  <div className="absolute inset-0 bg-black/25" />
                  <button
                    type="button"
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => {
                      if (!swipe.wasDrag()) onOpen(slide);
                    }}
                    aria-label={slide.title}
                    className="absolute inset-0 cursor-zoom-in"
                  >
                    {near ? (
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        priority={i === 0}
                        quality={80}
                        placeholder="blur"
                        blurDataURL={slide.blur}
                        draggable={false}
                        className="select-none object-contain drop-shadow-2xl"
                      />
                    ) : null}
                  </button>
                </div>
              );
            })}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">{current ? categoryLabel(current) : null}</p>
              <p className="truncate text-sm font-medium sm:text-base">{current?.title}</p>
            </div>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={content.previous}
              className="absolute left-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-black/75"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={content.next}
              className="absolute right-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-black/75"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? content.pause : content.play}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </button>
            <div className="no-scrollbar flex min-w-0 flex-1 items-center justify-end gap-2 overflow-x-auto p-1">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={format(content.goToSlide, { n: i + 1 })}
                  aria-current={i === active ? "true" : undefined}
                  className={cn(
                    "relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-white/10 ring-2 transition sm:h-12 sm:w-12",
                    i === active ? "ring-gold" : "opacity-65 ring-transparent hover:opacity-100",
                  )}
                >
                  <Image src={slide.src} alt="" fill sizes="48px" quality={40} className="object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-8">
        <ul aria-label={content.valuesLabel} data-stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {content.values.map((value) => (
            <li key={value.title} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="font-display text-lg font-bold text-gold">{value.title}</p>
              <p className="text-xs text-white/80">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
