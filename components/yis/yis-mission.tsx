import { Eye, Target } from "lucide-react";
import type { YisContent } from "@/types/yis";

export function YisMission({ content }: { content: YisContent["mission"] }) {
  return (
    <section aria-labelledby="yis-mission-title" className="bg-tint section-y">
      <div className="container">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="yis-mission-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {content.title}
          </h2>
        </div>
        <div data-stagger className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
          {[
            { icon: Target, title: content.missionTitle, text: content.missionText },
            { icon: Eye, title: content.visionTitle, text: content.visionText },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-surface p-6">
              <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
