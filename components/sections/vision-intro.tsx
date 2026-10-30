import { Quote } from "lucide-react";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { Icon } from "@/components/shared/icon";
import { MediaImage } from "@/components/shared/media-image";
import { Signature } from "@/components/shared/signature";
import type { VisionContent } from "@/types/content";

export function VisionIntro({ content }: { content: VisionContent["intro"] }) {
  return (
    <section className="section-y">
      <div className="container grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="lg:col-span-5">
          <p className="eyebrow mb-3">{content.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold leading-tight lg:text-[2.1rem]">{content.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{content.text}</p>
          <ul data-stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {content.icons.map((item, index) => (
              <li key={item.title} className="card-surface flex flex-col items-center gap-2 p-3 text-center">
                <IconBadge icon={item.icon} tone={toneAt(index + 3)} size="lg" />
                <span className="text-xs font-semibold">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl lg:col-span-4 lg:max-w-none">
          <MediaImage
            media="portraitPoster2"
            alt={content.portraitAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            className="object-cover"
          />
        </div>

        <div data-reveal className="space-y-3 lg:col-span-3">
          <figure className="rounded-xl bg-tint p-5">
            <Quote className="mb-2 h-6 w-6 fill-primary text-primary" aria-hidden="true" />
            <blockquote className="font-display text-lg font-medium leading-snug">{content.quote.text}</blockquote>
            <figcaption className="mt-3 flex items-center gap-3">
              <Signature className="text-foreground/80" />
              <span className="sr-only">{content.quote.author}</span>
            </figcaption>
          </figure>
          <ul className="card-surface divide-y">
            {content.facts.map((fact) => (
              <li key={fact.title} className="flex items-start gap-3 p-3">
                <Icon name={fact.icon} className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-semibold leading-snug">{fact.title}</p>
                  {fact.text ? <p className="text-[11px] text-muted-foreground">{fact.text}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
