"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/hooks/use-language";
import type { GalleryItem } from "@/types/gallery";

/** Teaser strip of featured gallery items. Real media only; links through to /media. */
export function FeaturedMedia({ items }: { items: GalleryItem[] }) {
  const { common } = useLanguage();
  const { mediaTeaser } = common;

  return (
    <section id="media" className="section-y">
      <div className="container">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={mediaTeaser.title} text={mediaTeaser.text} />
          <Button asChild variant="outline">
            <Link href="/media">
              {mediaTeaser.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <ul data-stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {items.map((item) => {
            const thumb = item.kind === "video" ? item.poster : item;
            return (
              <li key={item.id}>
                <Link href="/media" className="group relative block overflow-hidden rounded-xl border bg-muted shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none">
                  <div className="relative" style={{ aspectRatio: `${thumb.width} / ${thumb.height}` }}>
                    <Image
                      src={thumb.thumb}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                      placeholder="blur"
                      blurDataURL={thumb.blur}
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
