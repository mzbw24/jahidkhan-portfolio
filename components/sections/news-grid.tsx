"use client";

import { CalendarDays, Youtube } from "lucide-react";
import { MediaImage } from "@/components/shared/media-image";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { WatchButton } from "@/components/shared/watch-button";
import { useLanguage } from "@/hooks/use-language";

interface NewsGridProps {
  /** Overrides the default section title (e.g. "Latest Updates"). */
  title?: string;
  showText?: boolean;
}

export function NewsGrid({ title, showText = true }: NewsGridProps) {
  const { common } = useLanguage();
  const { news } = common;

  return (
    <section id="news" className="section-y">
      <div className="container">
        <div data-reveal className="flex flex-wrap items-end gap-x-4 gap-y-2">
          <SectionHeading title={title ?? news.title} text={showText ? news.text : undefined} />
          <PlaceholderBadge className="mb-1" />
        </div>

        <ul data-stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {news.items.map((item) => (
            <li key={item.title}>
              <article className="card-surface card-hover h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <MediaImage
                    media={item.image}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                    {item.tag}
                  </span>
                  {item.kind === "video" ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <WatchButton circle label={item.title} video="vision" />
                    </div>
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-bold leading-snug">{item.title}</h3>
                  {item.kind === "video" ? (
                    <p className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Youtube className="h-4 w-4 text-primary" aria-hidden="true" />
                        {news.watchLabel}
                      </span>
                      <span>{item.duration}</span>
                    </p>
                  ) : (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.date}
                    </p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
