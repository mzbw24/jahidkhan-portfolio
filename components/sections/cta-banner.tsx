"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/shared/media-image";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

/** "Together for a brighter Sylhet" banner — identical on every page, text comes from common content. */
export function CtaBanner() {
  const { common } = useLanguage();
  const { cta } = common;
  const lastIndex = cta.scriptLines.length - 1;

  return (
    <section className="dark-band">
      <div data-parallax="5" className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]">
        <MediaImage media="crowd" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-navy/70" />
      <div className="container grid items-center gap-8 py-14 lg:grid-cols-2 lg:py-20">
        <p data-reveal className="font-script text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {cta.scriptLines.map((line, index) => (
            <span key={line} className={cn("block", index === lastIndex && "text-gold sm:ml-10")}>
              {line}
            </span>
          ))}
        </p>
        <div
          data-reveal
          className="max-w-md rounded-xl border border-white/10 bg-navy-soft/90 p-6 backdrop-blur lg:ml-auto"
        >
          <h2 className="font-display text-xl font-bold sm:text-2xl">{cta.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{cta.text}</p>
          <Button asChild className="mt-5">
            <Link href="/contact">
              {cta.button}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
