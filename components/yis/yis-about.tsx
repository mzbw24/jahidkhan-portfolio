import Image from "next/image";
import { HeartHandshake, Sprout, Users, type LucideIcon } from "lucide-react";
import type { YisContent, YisPageData } from "@/types/yis";

const pillarIcons: LucideIcon[] = [Users, Sprout, HeartHandshake];

interface YisAboutProps {
  content: YisContent["about"];
  logo: YisPageData["logo"];
  lang: "en" | "bn";
}

export function YisAbout({ content, logo, lang }: YisAboutProps) {
  const leadership = lang === "bn"
    ? { eyebrow: "সভাপতির বার্তা", title: "জাহিদ খান — জেসিডিও ও ইয়ুথ ইজ স্ট্রেংথ-এর সভাপতি", text: "তরুণদের শক্তি, দায়িত্বশীল নেতৃত্ব ও সামাজিক উদ্যোগকে একত্র করে জাহিদ খান একটি সহায়ক ও অংশগ্রহণমূলক ভবিষ্যৎ গড়ার কাজ করছেন।", alt: "জাহিদ খানের প্রতিকৃতি" }
    : { eyebrow: "Leadership & youth empowerment", title: "Jahid Khan — President of JCDO and Youth Is Strength", text: "By connecting youth empowerment with social responsibility, Jahid Khan helps create space for young people to contribute, learn and support community-led initiatives.", alt: "Portrait of Jahid Khan" };
  return (
    <section aria-labelledby="yis-about-title" className="section-y">
      <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <figure data-reveal className="mx-auto w-full max-w-xs">
          {/* Full seal on white — contain, never cropped. */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white p-3 shadow-lift ring-1 ring-border">
            <div className="relative h-full w-full">
              <Image
                src="/media/images/portrait-copy.jpeg"
                alt={leadership.alt}
                fill
                sizes="(min-width: 1024px) 320px, 80vw"
                className="object-contain object-bottom"
              />
              <Image
                src={logo.src}
                alt={content.logoAlt}
                fill
                sizes="(min-width: 1024px) 320px, 80vw"
                quality={85}
                placeholder="blur"
                blurDataURL={logo.blur}
                className="object-contain"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted-foreground">{content.logoMotto}</figcaption>
        </figure>

        <div data-reveal>
          <p className="eyebrow">{leadership.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">{leadership.title}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{leadership.text}</p>
          <p className="eyebrow mt-8">{content.eyebrow}</p>
          <h2 id="yis-about-title" className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{content.text}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {content.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index % pillarIcons.length] as LucideIcon;
              return (
                <li key={pillar.title} className="card-surface flex flex-col gap-2 p-4">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="font-semibold">{pillar.title}</p>
                  <p className="text-sm text-muted-foreground">{pillar.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
