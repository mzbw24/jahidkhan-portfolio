import Link from "next/link";
import { ArrowRight, Quote, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeadingText } from "@/components/shared/heading-text";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import { Signature } from "@/components/shared/signature";
import type { HeroContent } from "@/types/content";
import type { MediaKey } from "@/types/media";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  content: HeroContent;
  /** Optional photo behind the hero. Without it a navy gradient is used (no decorative stock art). */
  background?: MediaKey;
  portrait: MediaKey;
  /** Which side the pull-quote sits on (copy goes to the other side). */
  quotePosition?: "left" | "right";
  uppercaseTitle?: boolean;
  /** Reserve space for a floating strip (trust strip / contact cards) that overlaps the hero bottom. */
  overlap?: boolean;
}

export function PageHero({
  content,
  background,
  portrait,
  quotePosition = "right",
  uppercaseTitle = false,
  overlap = true,
}: PageHeroProps) {
  const quoteLeft = quotePosition === "left";

  return (
    <section className="dark-band">
      {background ? (
        <div data-parallax="6" className="absolute inset-x-0 -top-[8%] -z-10 h-[116%]">
          <MediaImage media={background} fill priority sizes="100vw" className="object-cover" />
        </div>
      ) : (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-soft to-navy" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_80%_15%,hsl(var(--primary)/0.30),transparent)]"
          />
        </>
      )}
      <div
        className={cn(
          "absolute inset-0 -z-10",
          background && (quoteLeft
            ? "bg-gradient-to-l from-navy via-navy/80 to-navy/20"
            : "bg-gradient-to-r from-navy via-navy/80 to-navy/20"),
        )}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

      <div className={cn(
          "container relative grid min-h-[32rem] gap-8 pt-12 lg:min-h-[37rem] lg:grid-cols-12 lg:items-center",
          overlap ? "pb-28" : "pb-14",
        )}>
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 right-0 h-[60%] w-[70%] opacity-40 sm:w-[55%] lg:h-full lg:w-[36%] lg:opacity-100",
            quoteLeft ? "lg:left-[24%] lg:right-auto" : "lg:left-[41%] lg:right-auto",
          )}
        >
          <MediaImage
            media={portrait}
            alt={content.portraitAlt}
            fill
            priority
            sizes="(min-width: 1024px) 36vw, 70vw"
            className="object-cover [-webkit-mask-image:radial-gradient(ellipse_80%_75%_at_50%_38%,#000_52%,transparent_100%)] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_38%,#000_52%,transparent_100%)]"
          />
        </div>

        <div
          className={cn(
            "relative z-10 lg:row-start-1",
            quoteLeft ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-6",
          )}
        >
          <p data-hero-item className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/75">
            {content.eyebrow}
          </p>
          <h1
            data-hero-item
            className={cn(
              "font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.6rem]",
              uppercaseTitle && "uppercase tracking-tight",
            )}
          >
            <HeadingText title={content.title} accent={content.accent} titleEnd={content.titleEnd} stack />
          </h1>
          <p data-hero-item className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base">
            {content.text}
          </p>

          {content.chips ? (
            <ul data-hero-item className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {content.chips.map((chip, index) => (
                <li key={chip.title} className="flex items-center gap-2 text-xs font-medium text-white/90">
                  <IconBadge icon={chip.icon} tone={toneAt(index)} size="sm" className="h-8 w-8" />
                  {chip.title}
                </li>
              ))}
            </ul>
          ) : null}

          {content.primaryCta || content.secondaryCta ? (
            <div data-hero-item className="mt-7 flex flex-wrap gap-3">
              {content.primaryCta ? (
                <Button asChild size="lg">
                  <Link href={content.primaryCta.href}>
                    {content.primaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
              {content.secondaryCta?.video ? (
                <Button asChild variant="outline" size="lg" className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white">
                  <Link href="/media?filter=videos#videos">
                    <VideoIcon className="h-4 w-4" aria-hidden="true" />
                    {content.secondaryCta.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        {content.quote ? (
          <figure
            data-hero-item
            className={cn(
              "relative z-10 max-w-xs lg:row-start-1 lg:max-w-none",
              quoteLeft ? "lg:col-span-3 lg:col-start-1" : "lg:col-span-3 lg:col-start-10",
            )}
          >
            <Quote className="mb-2 h-9 w-9 fill-gold text-gold" aria-hidden="true" />
            <blockquote className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              {content.quote.text}
            </blockquote>
            {content.quote.author ? (
              <figcaption className="mt-2 text-sm text-white/80">{content.quote.author}</figcaption>
            ) : null}
            <div className="mt-3">
              <Signature />
              {content.scriptTagline ? (
                <p className="mt-1 font-script text-lg text-gold">{content.scriptTagline}</p>
              ) : null}
            </div>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
