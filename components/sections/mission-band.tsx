import { Quote } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";
import type { HomeContent } from "@/types/content";

export function MissionBand({ content }: { content: HomeContent["mission"] }) {
  return (
    <section className="container section-y">
      <div className="grid overflow-hidden rounded-2xl bg-navy text-white lg:grid-cols-[1.9fr_1fr]">
        <div className="relative isolate min-h-[20rem] overflow-hidden p-6 sm:p-10">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-soft to-navy" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_90%_10%,hsl(var(--primary)/0.25),transparent)]" />
          <div data-reveal className="flex h-full flex-col justify-center">
            <Quote className="h-8 w-8 fill-gold text-gold" aria-hidden="true" />
            <h2 className="mt-2 max-w-md font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
              {content.bannerTitle}
            </h2>
            <p className="mt-3 max-w-sm text-[15px] text-white/85">{content.text}</p>
          </div>
        </div>

        <div className="bg-navy-soft p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold">{content.panelTitle}</h3>
          <ul data-stagger className="mt-5 space-y-5">
            {content.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <IconBadge icon={item.icon} tone="red" size="md" className="bg-primary/20 text-red-300" />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  {item.text ? <p className="mt-0.5 text-xs text-white/70">{item.text}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
