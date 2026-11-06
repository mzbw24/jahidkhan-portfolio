"use client";

import { Handshake, Medal, Megaphone, Mic2, Trophy, type LucideIcon } from "lucide-react";
import { BlurBackdrop, PhotoImage } from "@/components/shared/photo-image";
import { format } from "@/lib/photo-utils";
import type { YisCategory, YisContent, YisFilter, YisPhoto } from "@/types/yis";

const icons: Record<YisCategory, LucideIcon> = {
  gatherings: Handshake,
  recognition: Medal,
  programs: Mic2,
  sports: Trophy,
  public: Megaphone,
};

interface YisActivitiesProps {
  content: YisContent["activities"];
  covers: Partial<Record<YisCategory, YisPhoto>>;
  counts: Record<YisCategory, number>;
  onSelectFilter: (filter: YisFilter) => void;
}

export function YisActivities({ content, covers, counts, onSelectFilter }: YisActivitiesProps) {
  return (
    <section id="activities" aria-labelledby="yis-activities-title" className="section-y scroll-mt-20">
      <div className="container">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="yis-activities-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{content.text}</p>
        </div>
        <ul data-stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {content.items.map((item, index) => {
            const Icon = icons[item.category];
            const cover = covers[item.category];
            return (
              <li key={item.category} className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                <a
                  href="#gallery"
                  onClick={() => onSelectFilter(item.category)}
                  className="card-surface card-hover group flex h-full flex-col overflow-hidden"
                >
                  {cover ? (
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
                      <BlurBackdrop blur={cover.blur} className="opacity-50" />
                      <PhotoImage
                        photo={cover}
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
                        className="relative h-full w-full max-w-full"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.text}</p>
                    <p className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                      {format(content.viewPhotos, { count: counts[item.category] })} →
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
