"use client";

import { useRef } from "react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaGallery } from "@/components/sections/media-gallery";
import { MediaHero } from "@/components/sections/media-hero";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import type { Localized } from "@/types/common";
import type { MediaPageContent } from "@/types/gallery";

export function MediaView({ content }: { content: Localized<MediaPageContent> }) {
  const c = useLocalized(content);
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <MediaHero content={c} />
      <MediaGallery content={c} />
      <CtaBanner />
    </div>
  );
}
