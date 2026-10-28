import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/shared/media-image";
import { Signature } from "@/components/shared/signature";
import type { AboutContent } from "@/types/content";

interface RunningSectionProps {
  running: AboutContent["running"];
  commitment: AboutContent["commitment"];
}

export function RunningSection({ running, commitment }: RunningSectionProps) {
  return (
    <section className="section-y pt-0 lg:pt-0">
      <div className="container grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div data-reveal className="card-surface grid overflow-hidden md:grid-cols-2">
          <div className="p-6 sm:p-8">
            <p className="eyebrow mb-3">{running.eyebrow}</p>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{running.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{running.text}</p>
            <Button asChild className="mt-6">
              <Link href={running.cta.href}>
                {running.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="relative min-h-[16rem]">
            <MediaImage
              media="runningPhoto"
              alt={running.photoAlt}
              fill
              sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <figure data-reveal className="card-surface flex flex-col justify-center p-6 sm:p-8">
          <p className="eyebrow mb-3">{commitment.eyebrow}</p>
          <Quote className="mb-2 h-7 w-7 fill-primary text-primary" aria-hidden="true" />
          <blockquote className="text-[15px] leading-relaxed">{commitment.quote}</blockquote>
          <figcaption className="mt-5">
            <Signature className="text-foreground/80" />
            <span className="mt-1 block text-xs text-muted-foreground">{commitment.signatureCaption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
