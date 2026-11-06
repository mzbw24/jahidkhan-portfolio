"use client";

import { ArrowUpRight } from "lucide-react";
import { BlurBackdrop, JcdoPhotoImage } from "./jcdo-photo";
import { Button } from "@/components/ui/button";
import type { JcdoCategory, JcdoContent, JcdoFilter, JcdoPhoto } from "@/types/jcdo";

interface JcdoUpdatesProps {
  content: JcdoContent["updates"];
  covers: Partial<Record<JcdoCategory, JcdoPhoto>>;
  facebook: string;
  onSelectFilter: (filter: JcdoFilter) => void;
}

export function JcdoUpdates({ content, covers, facebook, onSelectFilter }: JcdoUpdatesProps) {
  return (
    <section aria-labelledby="jcdo-updates-title" className="section-y">
      <div className="container">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="jcdo-updates-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{content.text}</p>
          </div>
          <Button asChild variant="outline">
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              {content.facebookCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <ul data-stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {content.items.map((item) => {
            const cover = covers[item.category];
            return (
              <li key={item.title}>
                <a
                  href="#gallery"
                  onClick={() => onSelectFilter(item.category)}
                  className="card-surface card-hover group flex h-full flex-col overflow-hidden sm:flex-row md:flex-col"
                >
                  {cover ? (
                    <div className="relative flex aspect-[4/3] shrink-0 items-center justify-center overflow-hidden bg-muted sm:w-2/5 md:w-full">
                      <BlurBackdrop blur={cover.blur} className="opacity-60" />
                      <JcdoPhotoImage
                        photo={cover}
                        sizes="(min-width: 768px) 30vw, (min-width: 640px) 40vw, 92vw"
                        className="relative h-full w-full max-w-full"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.text}</p>
                    {/* <p className="mt-4 text-sm font-semibold text-primary group-hover:underline">{item.cta} →</p> */}
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
