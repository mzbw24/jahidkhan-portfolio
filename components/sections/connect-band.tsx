import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import type { ContactContent } from "@/types/content";

export function ConnectBand({ content }: { content: ContactContent["connect"] }) {
  return (
    <section className="dark-band">
      <div data-parallax="5" className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]">
        <MediaImage media="connectBand" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />

      <div className="container grid items-center gap-8 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-14">
        <div data-reveal>
          <p className="eyebrow mb-2 text-red-400">{content.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold leading-tight">{content.title}</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">{content.text}</p>
          <Button asChild className="mt-6">
            <Link href={content.cta.href}>
              {content.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul data-stagger className="grid grid-cols-2 gap-3">
          {content.items.map((item, index) => (
            <li
              key={item.title}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-navy-soft/80 p-4 backdrop-blur"
            >
              <IconBadge icon={item.icon} tone={toneAt(index + 3)} solidFill square />
              <span className="text-[13px] font-semibold leading-snug">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
