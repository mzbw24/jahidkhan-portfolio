"use client";

import { useRef } from "react";
import { Image as ImageIcon, LayoutGrid, Mic2 } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import type { YisContent } from "@/types/yis";

interface YisImpactProps {
  content: YisContent["impact"];
  counts: { photos: number; activities: number; moments: number };
}

export function YisImpact({ content, counts }: YisImpactProps) {
  const scope = useRef<HTMLElement>(null);
  useCountUp(scope);
  const items = [
    { icon: ImageIcon, value: counts.photos, label: content.labels.photos },
    { icon: LayoutGrid, value: counts.activities, label: content.labels.activities },
    { icon: Mic2, value: counts.moments, label: content.labels.moments },
  ];
  return (
    <section ref={scope} aria-labelledby="yis-impact-title" className="pb-4">
      <div className="container">
        <div data-reveal className="dark-band rounded-2xl border border-white/10 px-5 py-6 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr]">
            <div className="lg:max-w-[12rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{content.eyebrow}</p>
              <h2 id="yis-impact-title" className="mt-1 font-display text-2xl font-bold">
                {content.title}
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {items.map(({ icon: Icon, value, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-8 w-8 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="text-3xl font-extrabold leading-none">
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
