import { Quote } from "lucide-react";
import { MediaImage } from "@/components/shared/media-image";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";
import type { VisionContent } from "@/types/content";

/** SAMPLE testimonials only — replace with real, consented quotes before launch. */
export function VoicesSection({ content }: { content: VisionContent["voices"] }) {
  return (
    <section className="section-y">
      <div className="container">
        <div data-reveal className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl">{content.title}</h2>
          <PlaceholderBadge />
        </div>
        <ul
          data-stagger
          className="-mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
        >
          {content.items.map((item) => (
            <li key={item.role} className="min-w-[85%] snap-start md:min-w-0">
              <figure className="card-surface flex h-full items-center gap-4 p-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
                  <MediaImage media={item.image} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <Quote className="mb-1 h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                  <blockquote className="text-[13px] leading-snug">{item.quote}</blockquote>
                  <figcaption className="mt-2 text-xs text-muted-foreground">{item.role}</figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
