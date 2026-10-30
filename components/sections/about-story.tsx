import { Quote } from "lucide-react";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import { Signature } from "@/components/shared/signature";
import type { AboutContent } from "@/types/content";

interface AboutStoryProps {
  story: AboutContent["story"];
  values: AboutContent["values"];
}

export function AboutStory({ story, values }: AboutStoryProps) {
  return (
    <section id="story" className="section-y">
      <div className="container grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="lg:col-span-4">
          <p className="eyebrow mb-3">{story.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold leading-tight">{story.title}</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6">
            <Signature className="text-foreground/80" />
            <p className="mt-1 text-xs text-muted-foreground">{story.signatureCaption}</p>
          </div>
        </div>

        <figure data-reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl lg:col-span-4 lg:max-w-none">
          <MediaImage
            media="portraitFull"
            alt={story.portraitAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            className="object-contain"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-navy/95 p-4 text-white">
            <div className="flex gap-3">
              <Quote className="h-6 w-6 shrink-0 fill-primary text-primary" aria-hidden="true" />
              <div>
                <p className="text-[13px] leading-snug">{story.quote.text}</p>
                {story.quote.author ? <p className="mt-1.5 text-xs text-white/70">{story.quote.author}</p> : null}
              </div>
            </div>
          </figcaption>
        </figure>

        <div data-reveal className="lg:col-span-4">
          <p className="eyebrow mb-3">{values.eyebrow}</p>
          <ul data-stagger className="space-y-2">
            {values.items.map((item, index) => (
              <li key={item.title} className="flex items-center gap-3 rounded-lg bg-muted/60 p-3">
                <IconBadge icon={item.icon} tone={toneAt(index + 3)} size="sm" />
                <div>
                  <p className="text-[13px] font-semibold leading-tight">{item.title}</p>
                  {item.text ? <p className="text-xs text-muted-foreground">{item.text}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
