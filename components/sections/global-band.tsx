import { MapPin } from "lucide-react";
import { HeadingText } from "@/components/shared/heading-text";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import type { VisionContent } from "@/types/content";

export function GlobalBand({ content }: { content: VisionContent["global"] }) {
  return (
    <section className="dark-band">
      <div data-parallax="5" className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]">
        <MediaImage media="globalBand" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/30" />

      <div className="container py-12 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal className="max-w-xl">
            <h2 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
              <HeadingText title={content.title} accent={content.accent} titleEnd={content.titleEnd} />
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">{content.text}</p>
          </div>
          <div data-reveal className="flex items-center gap-3 text-xs font-semibold" aria-hidden="false">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
              {content.californiaLabel}
            </span>
            <span aria-hidden="true" className="h-px w-8 border-t border-dashed border-white/50" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {content.sylhetLabel}
            </span>
          </div>
        </div>

        <ul data-stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, index) => (
            <li key={item.title} className="flex items-center gap-3 rounded-lg border border-white/10 bg-navy-soft/80 p-3.5 backdrop-blur">
              <IconBadge icon={item.icon} tone={toneAt(index)} solidFill square />
              <div>
                <p className="text-[13px] font-semibold leading-tight">{item.title}</p>
                {item.text ? <p className="mt-0.5 text-xs text-white/70">{item.text}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
