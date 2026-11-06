import Image from "next/image";
import { ArrowUpRight, Eye, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JcdoContent, JcdoPhoto } from "@/types/jcdo";

interface JcdoAboutProps {
  content: JcdoContent["about"];
  logo: JcdoPhoto;
  website: string;
  lang: "en" | "bn";
}

export function JcdoAbout({ content, website, lang }: JcdoAboutProps) {
  const leadership =
    lang === "bn"
      ? {
          eyebrow: "উপদেষ্টার বার্তা",
          title: "জাহিদ খান — জেসিডিও-এর উপদেষ্টা",
          text: "মানুষের মর্যাদা, সামাজিক দায়িত্ব ও কমিউনিটি উন্নয়নের প্রতি অঙ্গীকার নিয়ে জাহিদ খান জেসিডিওর উদ্যোগগুলোকে এগিয়ে নিচ্ছেন।",
          alt: "জাহিদ খানের প্রতিকৃতি",
        }
      : {
          eyebrow: "Advisor's message",
          title: "Jahid Khan — Advisor of JCDO",
          text: "With a commitment to dignity, social responsibility and community development, Jahid Khan supports JCDO initiatives that serve people and create practical opportunities.",
          alt: "Portrait of Jahid Khan",
        };
  return (
    <section aria-labelledby="jcdo-about-title" className="section-y">
      <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div data-reveal className="mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-tint p-2 shadow-lift ring-1 ring-border">
            <Image
              src="/media/images/portrait-copy.jpeg"
              alt={leadership.alt}
              fill
              sizes="(min-width: 1024px) 300px, 80vw"
              className="object-cover object-top"
            />
            <div className="relative h-full w-full overflow-hidden rounded-full">
            
            </div>
          </div>
        </div>

        <div data-reveal>
          <p className="eyebrow">{leadership.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {leadership.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {leadership.text}
          </p>
          <div
            className="my-6 grid grid-cols-4 gap-2"
            aria-label="JCDO leadership gallery"
          >
            {[1, 3, 4, 5].map((number) => (
              <div
                key={number}
                className="relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={`/images/jcdo/jk-info (${number}).jpeg`}
                  alt={`Jahid Khan leadership moment ${number}`}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2
            id="jcdo-about-title"
            className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl"
          >
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {content.text}
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="card-surface flex gap-3 p-4">
              <Target
                className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <dt className="font-semibold">{content.missionTitle}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {content.missionText}
                </dd>
              </div>
            </div>
            <div className="card-surface flex gap-3 p-4">
              <Eye
                className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <dt className="font-semibold">{content.visionTitle}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {content.visionText}
                </dd>
              </div>
            </div>
          </dl>

          <Button asChild className="mt-6">
            <a href={website} target="_blank" rel="noopener noreferrer">
              {content.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
