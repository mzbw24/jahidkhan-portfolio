"use client";

import { useRef } from "react";
import { ChallengesSection } from "@/components/sections/challenges-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { GlobalBand } from "@/components/sections/global-band";
import { FeaturedMedia } from "@/components/sections/featured-media";
import { PageHero } from "@/components/sections/page-hero";
import { TenPointPlan } from "@/components/sections/ten-point-plan";
import { VisionIntro } from "@/components/sections/vision-intro";
import { VisionVideos } from "@/components/sections/vision-videos";
import { TodayTomorrow } from "@/components/sections/today-tomorrow";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import { visionEn } from "@/data/en/vision";
import { visionBn } from "@/data/bn/vision";
import type { Localized } from "@/types/common";
import type { VisionContent } from "@/types/content";
import type { GalleryItem } from "@/types/gallery";

export function VisionView({ content, featured }: { content: Localized<VisionContent>; featured: Localized<GalleryItem[]> }) {
  const c = useLocalized(content ?? { en: visionEn, bn: visionBn });
  const featuredItems = useLocalized(featured ?? { en: [], bn: [] });
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <PageHero
        content={c.hero}
        banner="/images/banners/mission-vision.png"
        portrait="portraitFull"
        quotePosition="right"
        uppercaseTitle
        overlap={false}
      />
      <VisionIntro content={c.intro} />
      <VisionVideos content={c.videos} />
      <TodayTomorrow content={c.todayTomorrow} />
      <FeaturedMedia items={featuredItems} />
      <ChallengesSection content={c.challenges} />
      <TenPointPlan content={c.plan} />
      <GlobalBand content={c.global} />
      <CtaBanner />
    </div>
  );
}
