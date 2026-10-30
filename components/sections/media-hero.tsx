import Link from "next/link";
import { ArrowDownRight, ArrowRight, Images, LayoutGrid, Play, Video } from "lucide-react";
import { HeadingText } from "@/components/shared/heading-text";
import { MediaImage } from "@/components/shared/media-image";
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
    <section className="media-hero dark-band">
      <MediaImage media="galleryCommunity" alt="Community gathering in Sylhet" fill priority sizes="100vw" className="media-hero__image" />
      <div className="media-hero__veil" aria-hidden="true" />
      <div className="media-hero__glow" aria-hidden="true" />
      <div className="container relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] lg:gap-16">
          <div className="max-w-3xl">
            <p data-hero-item className="eyebrow mb-5 text-blue-200">{content.hero.eyebrow}</p>
            <h1 data-hero-item className="max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              <HeadingText title={content.hero.title} accent={content.hero.accent} titleEnd={content.hero.titleEnd} stack />
            </h1>
            <p data-hero-item className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{content.hero.text}</p>
            <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/media?filter=videos#videos" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition duration-300 ease-in-out hover:scale-[1.03] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15"><Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" /></span>
                {content.hero.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="#media-gallery" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition duration-300 ease-in-out hover:scale-[1.03] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                {content.hero.ctaSecondary}
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside data-hero-item className="rounded-[1.75rem] border border-white/20 bg-navy/55 p-5 shadow-2xl backdrop-blur-xl sm:p-6" aria-label={content.stats.topics}>
            <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">{content.hero.eyebrow}</span>
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_5px_hsl(var(--primary)/0.18)]" aria-hidden="true" />
            </div>
            <ul className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-white/10">
              {stats.map(({ icon: StatIcon, value, label }) => (
                <li key={label} className="flex flex-col gap-1 rounded-xl bg-white/5 p-3 text-center lg:flex-row lg:items-center lg:gap-4 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-4 lg:text-left">
                  <StatIcon className="mx-auto h-5 w-5 text-blue-300 lg:mx-0" aria-hidden="true" />
                  <span className="font-display text-2xl font-bold text-white">{value}</span>
                  <span className="text-xs text-white/65">{label}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <div className="container relative z-10 pb-5">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/55"><span className="h-px w-10 bg-white/30" />{content.stats.photos} <span aria-hidden="true">/</span> {content.stats.videos} <span aria-hidden="true">/</span> {content.stats.topics}</div>
      </div>
    </section>
  );
}
