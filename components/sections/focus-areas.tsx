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

        <ul
          data-stagger
          className="mx-auto mt-8 grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.areas.map((area, index) => (
            <li key={area.title}>
              <article className="card-surface card-hover group flex h-full flex-col overflow-hidden">
                {/* The source posters are portrait (about 4:5), so the frame matches them and nothing is cropped. */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <MediaImage
                    media={area.image}
                    alt={area.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    style={{ objectPosition: "50% 0%" }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent"
                  />
                  <IconBadge
                    icon={area.icon}
                    tone={toneAt(index)}
                    solidFill
                    square
                    className="absolute bottom-3 left-3 shadow-lg ring-2 ring-white/90"
                  />
                </div>
                <div className="flex flex-1 items-start justify-between gap-3 p-4">
                  <div>
                    <h3 className="font-display text-base font-bold leading-snug">{area.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{area.text}</p>
                  </div>
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
