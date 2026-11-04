"use client";

import { useRef } from "react";
import { OrganizationsCta } from "@/components/organizations/organizations-cta";
import { OrganizationsHero } from "@/components/organizations/organizations-hero";
import { OrganizationsImpact } from "@/components/organizations/organizations-impact";
import { OrganizationsList } from "@/components/organizations/organizations-list";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import type { OrganizationsPageData } from "@/types/organizations";

export function OrganizationsView({ data }: { data: OrganizationsPageData }) {
  const content = useLocalized(data.content);
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <OrganizationsHero content={content.hero} />
      <OrganizationsList content={content} organizations={data.organizations} />
      <OrganizationsImpact content={content.impact} organizations={data.organizations} />
      <OrganizationsCta content={content.cta} />
    </div>
  );
}
