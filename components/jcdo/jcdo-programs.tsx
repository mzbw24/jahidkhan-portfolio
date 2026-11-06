"use client";

import { BookOpen, HeartPulse, Home, Leaf, ShieldCheck, type LucideIcon } from "lucide-react";
import { BlurBackdrop, JcdoPhotoImage } from "./jcdo-photo";
import { format } from "@/lib/jcdo";
import type { JcdoCategory, JcdoContent, JcdoFilter, JcdoPhoto } from "@/types/jcdo";

const icons: Partial<Record<JcdoCategory, LucideIcon>> = {
  learning: BookOpen,
  health: HeartPulse,
  environment: Leaf,
  community: Home,
  safety: ShieldCheck,
};

interface JcdoProgramsProps {
  content: JcdoContent["programs"];
  covers: Partial<Record<JcdoCategory, JcdoPhoto>>;
  counts: Record<JcdoCategory, number>;
  onSelectFilter: (filter: JcdoFilter) => void;
}

export function JcdoPrograms({ content, covers, counts, onSelectFilter }: JcdoProgramsProps) {
  return (
    <section id="programs" aria-labelledby="jcdo-programs-title" className="section-y scroll-mt-20">
      <div className="container">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="jcdo-programs-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{content.text}</p>
          </div>
          <a
            href="#gallery"
            onClick={() => onSelectFilter("all")}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {content.viewAll} →
          </a>
        </div>

        <ul data-stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {content.items.map((item, itemIndex) => {
            const Icon = icons[item.category] ?? BookOpen;
            const cover = covers[item.category];
            return (
              <li key={item.category} className={itemIndex < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                <a
                  href="#gallery"
                  onClick={() => onSelectFilter(item.category)}
                  className="card-surface card-hover group flex h-full flex-col overflow-hidden"
                >
                  {cover ? (
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
                      <BlurBackdrop blur={cover.blur} className="opacity-60" />
                      <JcdoPhotoImage
                        photo={cover}
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
                        className="relative h-full w-full max-w-full drop-shadow-lg"
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
                      {format(content.viewPosters, { count: counts[item.category] })} →
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
