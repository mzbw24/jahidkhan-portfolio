"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoCarousel } from "@/components/shared/photo-carousel";
import type { YisContent, YisPhoto } from "@/types/yis";

interface YisHeroProps {
  content: YisContent["hero"];
  slides: YisPhoto[];
  categoryLabel: (photo: YisPhoto) => string;
  onOpen: (photo: YisPhoto) => void;
}

export function YisHero({ content, slides, categoryLabel, onOpen }: YisHeroProps) {
  return (
    <section aria-labelledby="yis-hero-title" className="dark-band">
      <div className="container grid grid-cols-1 items-center gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:py-16">
        <div className="order-2 min-w-0 lg:order-1">
          <p data-hero-item className="mb-4 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold ring-1 ring-gold/40">
            {content.eyebrow}
          </p>
          <h1 id="yis-hero-title" data-hero-item className="font-display text-4xl font-extrabold leading-[1.12] sm:text-5xl xl:text-6xl">
            {content.title} <span className="block text-gold">{content.accent}</span>
          </h1>
          <p data-hero-item className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            {content.text}
          </p>
          <div data-hero-item className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#activities">
                {content.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href="#gallery">{content.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <PhotoCarousel
          slides={slides}
          labels={content}
          categoryLabel={categoryLabel}
          onOpen={onOpen}
          className="order-1 min-w-0 lg:order-2"
        />
      </div>
    </section>
  );
}
