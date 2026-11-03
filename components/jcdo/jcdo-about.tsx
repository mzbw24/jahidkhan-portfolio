import Image from "next/image";
import { ArrowUpRight, Eye, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JcdoContent, JcdoPhoto } from "@/types/jcdo";

interface JcdoAboutProps {
  content: JcdoContent["about"];
  logo: JcdoPhoto;
  website: string;
}

export function JcdoAbout({ content, logo, website }: JcdoAboutProps) {
  return (
    <section aria-labelledby="jcdo-about-title" className="section-y">
      <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div data-reveal className="mx-auto w-full max-w-sm">
          {/* The emblem is a circle inside a square file: a round frame shows all of it. */}
          <div className="relative aspect-square overflow-hidden rounded-full bg-tint p-2 shadow-lift ring-1 ring-border">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={logo.src}
                alt={content.logoAlt}
                fill
                sizes="(min-width: 1024px) 384px, 80vw"
                quality={85}
                placeholder="blur"
                blurDataURL={logo.blur}
                className="scale-[1.26] object-contain"
              />
            </div>
          </div>
        </div>

        <div data-reveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="jcdo-about-title" className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{content.text}</p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="card-surface flex gap-3 p-4">
              <Target className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-semibold">{content.missionTitle}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{content.missionText}</dd>
              </div>
            </div>
            <div className="card-surface flex gap-3 p-4">
              <Eye className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-semibold">{content.visionTitle}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{content.visionText}</dd>
              </div>
            </div>
          </dl>

          <Button asChild className="mt-6">
            <a href={website} target="_blank" rel="noopener noreferrer">
              {content.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
