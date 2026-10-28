import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import type { AboutContent } from "@/types/content";

export function JourneySection({ content }: { content: AboutContent["journey"] }) {
  return (
    <section className="section-y pt-0 lg:pt-0">
      <div className="container grid gap-8 lg:grid-cols-[1fr_1.7fr]">
        <div data-reveal>
          <p className="eyebrow mb-2">{content.eyebrow}</p>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{content.title}</h2>
          {/* A real sequence of life stages → an ordered list with a timeline rail. */}
          <ol className="relative mt-6 space-y-5 border-l-2 border-primary/30 pl-6">
            {content.steps.map((step, index) => (
              <li key={step.title} className="relative flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-4 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
                />
                <IconBadge icon={step.icon} tone={toneAt(index)} size="lg" />
                <div>
                  <h3 className="text-sm font-bold">{step.title}</h3>
                  {step.text ? <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.text}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ul data-stagger className="grid gap-4 sm:grid-cols-2">
          {content.gallery.map((item) => (
            <li key={item.title}>
              <figure className="card-surface card-hover h-full overflow-hidden">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <MediaImage
                    media={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-3.5">
                  <p className="text-[13px] font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.text}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
