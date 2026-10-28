"use client";

import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { useLanguage } from "@/hooks/use-language";
import type { VisionContent } from "@/types/content";

/** The plan is a real ordered sequence, so numbering carries meaning here. */
export function TenPointPlan({ content }: { content: VisionContent["plan"] }) {
  const { lang } = useLanguage();
  const format = new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en", { minimumIntegerDigits: 2 });

  return (
    <section id={content.id} className="section-y">
      <div className="container">
        <h2 data-reveal className="font-display text-2xl font-bold uppercase sm:text-3xl">
          {content.title}
        </h2>
        <ol data-stagger className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {content.items.map((item, index) => (
            <li key={item.title} className="card-surface card-hover relative p-4">
              <span className="absolute right-3 top-3 text-[11px] font-semibold text-muted-foreground">
                {format.format(index + 1)}
              </span>
              <IconBadge icon={item.icon} tone={toneAt(index)} size="md" />
              <h3 className="mt-3 text-[13px] font-bold leading-snug">{item.title}</h3>
              {item.text ? <p className="mt-1 text-xs leading-snug text-muted-foreground">{item.text}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
