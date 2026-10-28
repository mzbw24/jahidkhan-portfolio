import { MediaImage } from "@/components/shared/media-image";
import { CompareSlider } from "./compare-slider";
import type { VisionContent } from "@/types/content";

export function TodayTomorrow({ content }: { content: VisionContent["compare"] }) {
  return (
    <section className="dark-band">
      <div data-parallax="5" className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]">
        <MediaImage media="cityAerial" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
      <div className="container grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.5fr] lg:py-14">
        <div data-reveal>
          <h2 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">{content.title}</h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/85">{content.text}</p>
        </div>
        <div data-reveal>
          <CompareSlider
            todayLabel={content.today}
            tomorrowLabel={content.tomorrow}
            ariaLabel={content.sliderLabel}
          />
        </div>
      </div>
    </section>
  );
}
