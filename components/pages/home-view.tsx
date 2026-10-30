"use client";

import { useRef } from "react";
import { BusinessVentures } from "@/components/sections/business-ventures";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FocusAreas } from "@/components/sections/focus-areas";
import { HomeIntro } from "@/components/sections/home-intro";
import { MissionBand } from "@/components/sections/mission-band";
import { FeaturedMedia } from "@/components/sections/featured-media";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StatsStrip } from "@/components/sections/stats-strip";
import { TrustStrip } from "@/components/sections/trust-strip";
import { VisionBand } from "@/components/sections/vision-band";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import type { Localized } from "@/types/common";
import type { HomeContent } from "@/types/content";
import type { GalleryItem } from "@/types/gallery";

export function HomeView({ content, featured }: { content: Localized<HomeContent>; featured: Localized<GalleryItem[]> }) {
  const c = useLocalized(content);
  const featuredItems = useLocalized(featured);
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <PageHero content={c.hero} portrait="portrait" quotePosition="left" video="message" />
      <TrustStrip items={c.trust} />
      <HomeIntro content={c.intro} />
      <VisionBand content={c.vision} layout="row" />
      <FocusAreas content={c.focus} />
      <MissionBand content={c.mission} />
      <BusinessVentures content={c.business} />
      <ProjectsSection content={c.projects} />
      <StatsStrip items={c.stats} />
      <FeaturedMedia items={featuredItems} />
      <CtaBanner />
    </div>
  );
}
