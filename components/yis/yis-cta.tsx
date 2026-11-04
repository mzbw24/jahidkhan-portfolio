import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { YisContent } from "@/types/yis";

export function YisCta({ content }: { content: YisContent["cta"] }) {
  return (
    <section aria-labelledby="yis-cta-title" className="dark-band">
      <div className="container grid grid-cols-1 items-center gap-6 py-12 lg:grid-cols-[1fr_auto] lg:py-16">
        <div data-reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{content.eyebrow}</p>
          <h2 id="yis-cta-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-white/85">{content.text}</p>
        </div>
        <div data-reveal className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/contact">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              {content.primary}
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/organizations">
              {content.secondary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
