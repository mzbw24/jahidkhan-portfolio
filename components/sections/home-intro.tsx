import Link from "next/link";
import { ArrowRight, Check, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeadingText } from "@/components/shared/heading-text";
import { MediaImage } from "@/components/shared/media-image";
import { Signature } from "@/components/shared/signature";
import type { HomeContent } from "@/types/content";

export function HomeIntro({ content }: { content: HomeContent["intro"] }) {
  return (
    <section className="section-y">
      <div className="container grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="lg:col-span-5">
          <p className="eyebrow mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
            {content.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight lg:text-[2.1rem]">
            <HeadingText title={content.title} accent={content.accent} />
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{content.text}</p>
          <ul className="mt-5 space-y-2.5">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-sm">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6">
            <Link href={content.cta.href}>
              {content.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div data-reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl lg:col-span-4 lg:max-w-none">
          <MediaImage
            media="portraitPoster"
            alt={content.portraitAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            className="object-cover"
          />
        </div>

        <div data-reveal className="space-y-4 lg:col-span-3">
          <figure className="rounded-2xl bg-tint p-6">
            <Quote className="mb-2 h-7 w-7 fill-primary text-primary" aria-hidden="true" />
            <blockquote className="font-display text-xl font-medium leading-snug">{content.quote}</blockquote>
            <Signature className="mt-3 block text-foreground/80" />
          </figure>
          <div className="card-surface flex items-center gap-3 overflow-hidden">
            <div className="min-w-0 flex-1 p-4">
              <p className="text-[13px] font-semibold leading-snug">{content.globalTitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">{content.globalText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
