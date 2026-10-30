"use client";

import { useRef } from "react";
import { AboutStory } from "@/components/sections/about-story";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JourneySection } from "@/components/sections/journey-section";
import { PageHero } from "@/components/sections/page-hero";
import { RunningSection } from "@/components/sections/running-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { VisionBand } from "@/components/sections/vision-band";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import type { Localized } from "@/types/common";
import type { AboutContent } from "@/types/content";

export function AboutView({ content }: { content: Localized<AboutContent> }) {
  const c = useLocalized(content);
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <PageHero content={c.hero} background="galleryPeople" portrait="portrait" quotePosition="right" />
      <TrustStrip items={c.trust} />
      <AboutStory story={c.story} values={c.values} />
      <VisionBand content={c.vision} layout="split" />
      <div className="pt-12 lg:pt-16">
        <JourneySection content={c.journey} />
      </div>
      <RunningSection running={c.running} commitment={c.commitment} />
      <CtaBanner />
    </div>
  );
}
