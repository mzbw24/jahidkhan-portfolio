import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";
import { MediaImage } from "@/components/shared/media-image";
import type { VisionContent } from "@/types/content";

export function ChallengesSection({ content }: { content: VisionContent["challenges"] }) {
  return (
    <section className="section-y pb-6 lg:pb-8">
      <div className="container">
        <div data-reveal className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl">{content.title}</h2>
          <Link href={content.viewAll.href} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline">
            {content.viewAll.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <ul data-stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => (
            <li key={item.title}>
              <article className="card-surface card-hover flex h-full overflow-hidden">
                <div className="relative w-24 shrink-0 sm:w-28">
                  <MediaImage media={item.image} fill sizes="112px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1 space-y-2.5 p-3.5">
                  <h3 className="font-display text-[15px] font-bold leading-snug">{item.title}</h3>
                  <div className="rounded-md bg-red-500/10 p-2">
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-red-700 dark:text-red-300">
                      <CircleAlert className="h-3 w-3" aria-hidden="true" />
                      {content.currentLabel}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{item.issue}</p>
                  </div>
                  <div className="rounded-md bg-emerald-500/10 p-2">
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {content.planLabel}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{item.plan}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
