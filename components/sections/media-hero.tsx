import { Images, LayoutGrid, Video } from "lucide-react";
import { HeadingText } from "@/components/shared/heading-text";
import { countByKind } from "@/lib/media";
import type { MediaPageContent } from "@/types/gallery";

export function MediaHero({ content }: { content: MediaPageContent }) {
  const { images, videos } = countByKind(content.items);
  const topics = new Set(content.items.map((item) => item.category)).size;

  const stats = [
    { icon: Images, value: images, label: content.stats.photos },
    ...(videos > 0 ? [{ icon: Video, value: videos, label: content.stats.videos }] : []),
    { icon: LayoutGrid, value: topics, label: content.stats.topics },
  ];

  return (
    <section className="dark-band">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-soft to-navy" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_85%_10%,hsl(var(--primary)/0.28),transparent)]" />

      <div className="container grid items-end gap-8 py-14 lg:grid-cols-[1.5fr_1fr] lg:py-20">
        <div>
          <p data-hero-item className="eyebrow mb-3 text-red-400">
            {content.hero.eyebrow}
          </p>
          <h1 data-hero-item className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            <HeadingText title={content.hero.title} accent={content.hero.accent} titleEnd={content.hero.titleEnd} stack />
          </h1>
          <p data-hero-item className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
            {content.hero.text}
          </p>
        </div>

        <ul data-hero-item className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-white/10 lg:p-5">
          {stats.map(({ icon: StatIcon, value, label }) => (
            <li key={label} className="flex flex-col items-center gap-1 py-1 text-center lg:flex-row lg:gap-4 lg:py-3 lg:text-left">
              <StatIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
              <p className="font-display text-2xl font-bold leading-none">{value}</p>
              <p className="text-xs text-white/70">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}