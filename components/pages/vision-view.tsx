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
import type { GalleryItem, MediaPageContent } from "@/types/gallery";

export function VisionView({ content, featured, media }: { content: Localized<VisionContent>; featured: Localized<GalleryItem[]>; media: Localized<MediaPageContent> }) {
  const c = useLocalized(content);
  const featuredItems = useLocalized(featured);
  const mediaContent = useLocalized(media);
  const visionVideo = mediaContent.items.find((item) => item.id === "video-22");
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
        variant="vision"
      />
      <VisionIntro content={c.intro} video={visionVideo} labels={mediaContent.labels} />
      <FeaturedMedia items={featuredItems} />
      <ChallengesSection content={c.challenges} />
      <TenPointPlan content={c.plan} />
      <GlobalBand content={c.global} />
      <CtaBanner />
    </div>
  );
}
