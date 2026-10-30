"use client";

import { useRef } from "react";
import { ChallengesSection } from "@/components/sections/challenges-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { GlobalBand } from "@/components/sections/global-band";
import { FeaturedMedia } from "@/components/sections/featured-media";
import { PageHero } from "@/components/sections/page-hero";
import { TenPointPlan } from "@/components/sections/ten-point-plan";
import { VisionIntro } from "@/components/sections/vision-intro";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import type { Localized } from "@/types/common";
import type { VisionContent } from "@/types/content";
import type { GalleryItem } from "@/types/gallery";

export function VisionView({ content, featured }: { content: Localized<VisionContent>; featured: Localized<GalleryItem[]> }) {
  const c = useLocalized(content);
  const featuredItems = useLocalized(featured);
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <PageHero
        content={c.hero}
        portrait="portrait"
        quotePosition="right"
        video="vision"
        uppercaseTitle
        overlap={false}
      />
      <VisionIntro content={c.intro} />
      <FeaturedMedia items={featuredItems} />
      <ChallengesSection content={c.challenges} />
      <TenPointPlan content={c.plan} />
      <GlobalBand content={c.global} />
      <CtaBanner />
    </div>
  );
}
