import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import type { HomeContent } from "@/types/content";

export function BusinessVentures({ content }: { content: HomeContent["business"] }) {
  return (
    <section id="business" className="dark-band">
      <div data-parallax="5" className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]">
        <MediaImage media="connectBand" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />

      <div className="container grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.5fr] lg:py-14">
        <div data-reveal>
          <h2 className="font-display text-3xl font-bold">{content.title}</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">{content.text}</p>
          <Button asChild className="mt-6">
            <Link href={content.cta.href}>
              {content.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul data-stagger className="grid gap-4 sm:grid-cols-3">
          {content.cards.map((card, index) => (
            <li key={card.title} className="card-surface card-hover p-5 text-card-foreground">
              <IconBadge icon={card.icon} tone={toneAt(index + 3)} />
              <h3 className="mt-3 text-sm font-bold leading-snug">{card.title}</h3>
              {card.text ? <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{card.text}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
