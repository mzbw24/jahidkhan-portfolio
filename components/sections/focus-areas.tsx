import { ArrowRight } from "lucide-react";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import type { HomeContent } from "@/types/content";

export function FocusAreas({ content }: { content: HomeContent["focus"] }) {
  return (
    <section id="focus-areas" className="section-y bg-muted/50">
      <div className="container">
        <div data-reveal>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{content.title}</h2>
          <p className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span aria-hidden="true" className="h-0.5 w-8 shrink-0 bg-primary" />
            {content.text}
          </p>
        </div>

        <ul data-stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.areas.map((area, index) => (
            <li key={area.title}>
              <article className="card-surface card-hover h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <MediaImage
                    media={area.image}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <IconBadge
                    icon={area.icon}
                    tone={toneAt(index)}
                    solidFill
                    square
                    className="absolute bottom-3 left-3 shadow-md"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <h3 className="font-display text-base font-bold leading-snug">{area.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{area.text}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
