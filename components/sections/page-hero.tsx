"use client";

import Image from "next/image";
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
  background?: MediaKey;
  banner?: string;
  portrait: MediaKey;
  quotePosition?: "left" | "right";
  uppercaseTitle?: boolean;
  overlap?: boolean;
  variant?: "home" | "about" | "vision" | "contact";
}

export function PageHero({
  content,
  background,
  banner,
  portrait,
  quotePosition = "right",
  uppercaseTitle = false,
  overlap = true,
}: PageHeroProps) {
  const quoteLeft = quotePosition === "left";
  const hasImage = Boolean(background || banner);

  return (
    <section
      className={cn(
        "dark-band relative isolate overflow-hidden bg-navy",
        banner ? "lg:min-h-[35rem]" : "min-h-[30rem] lg:min-h-[35rem]",
      )}
    >
      {banner ? (
        <>
          <div className="relative w-full lg:hidden">
            <Image
              src={banner}
              alt=""
              width={0}
              height={0}
              priority
              sizes="100vw"
              className="block h-auto w-full"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent"
            />
          </div>

          {/* Desktop: original parallax background */}
          <div
            data-parallax="6"
            className="absolute inset-x-0 -top-[8%] -z-10 hidden h-[116%] lg:block"
          >
            <Image
              src={banner}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </>
      ) : background ? (
        <div
          data-parallax="6"
          className="absolute inset-x-0 -top-[8%] -z-10 h-[116%]"
        >
          <MediaImage
            media={background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-soft to-navy"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_80%_15%,hsl(var(--primary)/0.30),transparent)]"
          />
        </>
      )}

      <div
        className={cn(
          "absolute inset-0 -z-10",
          banner && "hidden lg:block",
          hasImage &&
            (quoteLeft
              ? "bg-gradient-to-l from-navy via-navy/80 to-navy/20"
              : "bg-gradient-to-r from-navy via-navy/80 to-navy/20"),
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-t from-navy/70 via-transparent to-transparent",
          banner && "hidden lg:block",
        )}
      />

      <div
        className={cn(
          "container relative grid gap-8 lg:min-h-[37rem] lg:grid-cols-12 lg:items-center",
          banner
            ? "pt-6 sm:pt-8 lg:pt-12"
            : "min-h-[26rem] pt-12 lg:min-h-[37rem]",
          overlap ? "pb-24 lg:pb-28" : "pb-12 lg:pb-14",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 right-0 h-[60%] w-[70%] opacity-40 sm:w-[55%] lg:h-full lg:w-[36%] lg:opacity-100",
            quoteLeft
              ? "lg:left-[24%] lg:right-auto"
              : "lg:left-[41%] lg:right-auto",
          )}
        >
          {/* <MediaImage
            media={portrait}
            alt={content.portraitAlt}
            fill
            priority
            sizes="(min-width: 1024px) 36vw, 70vw"
            className="object-contain [-webkit-mask-image:radial-gradient(ellipse_80%_75%_at_50%_38%,#000_52%,transparent_100%)] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_38%,#000_52%,transparent_100%)]"
          /> */}
        </div>

        <div
          className={cn(
            "relative z-10 lg:row-start-1",
            quoteLeft ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-6",
          )}
        >
          <p
            data-hero-item
            className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white/75 sm:mb-4 sm:text-xs sm:tracking-[0.3em]"
          >
            {content.eyebrow}
          </p>
          <h1
            data-hero-item
            className={cn(
              "font-display text-[2rem] font-bold leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.6rem]",
              uppercaseTitle && "uppercase tracking-tight",
            )}
          >
            <HeadingText
              title={content.title}
              accent={content.accent}
              titleEnd={content.titleEnd}
              stack
            />
          </h1>
          <p
            data-hero-item
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:max-w-md"
          >
            {content.text}
          </p>

          {content.chips ? (
            <ul
              data-hero-item
              className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-x-6"
            >
              {content.chips.map((chip, index) => (
                <li
                  key={chip.title}
                  className="flex items-center gap-2 text-xs font-medium text-white/90"
                >
                  <IconBadge
                    icon={chip.icon}
                    tone={toneAt(index)}
                    size="sm"
                    className="h-8 w-8 shrink-0"
                  />
                  {chip.title}
                </li>
              ))}
            </ul>
          ) : null}

          {content.primaryCta || content.secondaryCta ? (
            <div
              data-hero-item
              className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap"
            >
              {content.primaryCta ? (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={content.primaryCta.href}>
                    {content.primaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
              {content.secondaryCta?.video ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white sm:w-auto"
                >
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
              "relative z-10 max-w-sm border-l-2 border-gold/60 pl-4 sm:max-w-md lg:max-w-none lg:border-l-0 lg:pl-0 lg:row-start-1",
              quoteLeft
                ? "lg:col-span-3 lg:col-start-1"
                : "lg:col-span-3 lg:col-start-10",
            )}
          >
            <Quote
              className="mb-2 h-7 w-7 fill-gold text-gold sm:h-9 sm:w-9"
              aria-hidden="true"
            />
            <blockquote className="font-display text-lg font-semibold leading-snug sm:text-2xl">
              {content.quote.text}
            </blockquote>
            {content.quote.author ? (
              <figcaption className="mt-2 text-sm text-white/80">
                {content.quote.author}
              </figcaption>
            ) : null}
            <div className="mt-3">
              <Signature />
              {content.scriptTagline ? (
                <p className="mt-1 font-script text-lg text-gold">
                  {content.scriptTagline}
                </p>
              ) : null}
            </div>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
