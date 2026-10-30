import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeadingText } from "@/components/shared/heading-text";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import type { BandContent } from "@/types/content";
import type { MediaKey } from "@/types/media";
import { cn } from "@/lib/utils";

interface VisionBandProps {
  content: BandContent;
  background?: MediaKey;
  layout: "row" | "split";
}

export function VisionBand({ content, background, layout }: VisionBandProps) {
  const split = layout === "split";

  return (
    <section id="vision" className="dark-band">
      {background ? (
        <div data-parallax="5" className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]">
          <MediaImage media={background} fill sizes="100vw" className="object-cover" />
        </div>
      ) : null}
      <div
        aria-hidden="true"
        className={background ? "absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/55" : "absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-soft to-navy"}
      />
      {!background ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(50%_100%_at_90%_0%,hsl(var(--primary)/0.22),transparent)]" />
      ) : null}

      <div className={cn("container py-12 lg:py-14", split && "grid items-center gap-8 lg:grid-cols-2")}>
        <div data-reveal className={cn(!split && "flex flex-wrap items-end justify-between gap-6")}>
          <div className="max-w-xl">
            {content.eyebrow ? <p className="eyebrow mb-2 text-red-400">{content.eyebrow}</p> : null}
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              <HeadingText title={content.title} accent={content.accent} titleEnd={content.titleEnd} />
            </h2>
            {content.text ? <p className="mt-3 text-[15px] leading-relaxed text-white/85">{content.text}</p> : null}
          </div>
          {content.cta ? (
            <Button asChild variant={split ? "primary" : "outline"} className={cn(split ? "mt-6" : "bg-white text-navy hover:bg-white/90")}>
              <Link href={content.cta.href}>
                {content.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          ) : null}
        </div>

        <ul
          data-stagger
          className={cn(
            "grid gap-3",
            split
              ? "sm:grid-cols-2"
              : "mt-8 grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-0",
          )}
        >
          {content.items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                split
                  ? "flex items-start gap-3 rounded-lg border border-white/10 bg-navy-soft/80 p-4 backdrop-blur"
                  : "flex flex-col gap-3 lg:border-l lg:border-white/10 lg:px-5 lg:first:border-l-0 lg:first:pl-0",
              )}
            >
              <IconBadge icon={item.icon} tone={toneAt(index)} solidFill square size={split ? "md" : "md"} />
              <div>
                <p className="text-sm font-semibold leading-snug">{item.title}</p>
                {item.text ? <p className="mt-1 text-xs leading-relaxed text-white/75">{item.text}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
