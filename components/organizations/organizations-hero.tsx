
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { OrganizationsContent } from "@/types/organizations";

export function OrganizationsHero({
  content,
}: {
  content: OrganizationsContent["hero"];
}) {
  return (
    <section
      aria-labelledby="orgs-hero-title"
      className="dark-band relative isolate overflow-hidden"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_85%_10%,hsl(var(--primary)/0.30),transparent)]"
      />

      <div className="container relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">

        {/* Left: Hero content */}
        <div className="relative z-10">
          <p
            data-hero-item
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/75 sm:text-xs"
          >
            {content.eyebrow}
          </p>

          <h1
            id="orgs-hero-title"
            data-hero-item
            className="max-w-2xl font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            {content.title}
            <span className="block text-gold">
              {content.accent}
            </span>
          </h1>

          <p
            data-hero-item
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {content.text}
          </p>

          <div
            data-hero-item
            className="mt-7 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <a href="#organizations">
                {content.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="glass"
            >
              <a href="#impact">
                <BarChart3 className="h-4 w-4" />
                {content.secondaryCta}
              </a>
            </Button>
          </div>
        </div>

        {/* Right: Hero image */}
        <div
          data-hero-item
          className="relative mx-auto w-full max-w-2xl"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl">
            <Image
              src={"/images/ys/ys (14).jpeg"}
              alt={"Hero Image for Organizations"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />
          </div>

          {/* Decorative accent */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}
