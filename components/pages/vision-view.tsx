"use client";

import { useRef } from "react";
import { ChallengesSection } from "@/components/sections/challenges-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { GlobalBand } from "@/components/sections/global-band";
import { NewsGrid } from "@/components/sections/news-grid";
import { PageHero } from "@/components/sections/page-hero";
import { TenPointPlan } from "@/components/sections/ten-point-plan";
import { TodayTomorrow } from "@/components/sections/today-tomorrow";
import { VisionIntro } from "@/components/sections/vision-intro";
import { VoicesSection } from "@/components/sections/voices-section";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import type { Localized } from "@/types/common";
import type { VisionContent } from "@/types/content";

export function VisionView({ content }: { content: Localized<VisionContent> }) {
  const c = useLocalized(content);
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <PageHero
        content={c.hero}
        background="heroCity"
        portrait="portrait"
        quotePosition="right"
        video="vision"
        uppercaseTitle
        overlap={false}
      />
      <VisionIntro content={c.intro} />
      <TodayTomorrow content={c.compare} />
      <ChallengesSection content={c.challenges} />
      <TenPointPlan content={c.plan} />
      <GlobalBand content={c.global} />
      <VoicesSection content={c.voices} />
      <CtaBanner />
      <NewsGrid title={c.updatesTitle} showText={false} />
    </div>
  );
}
