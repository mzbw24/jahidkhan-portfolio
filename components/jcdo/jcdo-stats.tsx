"use client";

import { useRef } from "react";
import { Image as ImageIcon, LayoutGrid, Medal, Megaphone } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import type { JcdoContent } from "@/types/jcdo";

interface JcdoStatsProps {
  content: JcdoContent["stats"];
  counts: { photos: number; posters: number; events: number; themes: number };
}

export function JcdoStats({ content, counts }: JcdoStatsProps) {
  const scope = useRef<HTMLElement>(null);
  useCountUp(scope);

  const items = [
    { icon: ImageIcon, value: counts.photos, label: content.labels.photos },
    { icon: Megaphone, value: counts.posters, label: content.labels.posters },
    { icon: Medal, value: counts.events, label: content.labels.events },
    { icon: LayoutGrid, value: counts.themes, label: content.labels.themes },
  ];

  return (
    <section ref={scope} aria-labelledby="jcdo-stats-title" className="pb-4">
      <div className="container">
        <div data-reveal className="dark-band rounded-2xl border border-white/10 px-5 py-6 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr]">
            <h2 id="jcdo-stats-title" className="font-display text-2xl font-bold lg:max-w-[10rem]">
              {content.title}
            </h2>
            <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {items.map(({ icon: Icon, value, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-8 w-8 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="text-2xl font-extrabold leading-none sm:text-3xl">
                      <span data-count={value}>{value}</span>
                    </p>
                    <p className="mt-1 text-xs text-white/80">{label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-[11px] text-white/60">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
