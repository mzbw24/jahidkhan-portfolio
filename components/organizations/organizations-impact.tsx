"use client";

import { useRef } from "react";
import { Building2, Images } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import type { OrganizationRecord, OrganizationsContent } from "@/types/organizations";

interface OrganizationsImpactProps {
  content: OrganizationsContent["impact"];
  organizations: OrganizationRecord[];
}

export function OrganizationsImpact({ content, organizations }: OrganizationsImpactProps) {
  const scope = useRef<HTMLElement>(null);
  useCountUp(scope);
  const items = [
    { icon: Building2, value: organizations.length, label: content.labels.organizations },
    { icon: Images, value: organizations.reduce((sum, org) => sum + org.photoCount, 0), label: content.labels.photos },
  ];
  return (
    <section ref={scope} id="impact" aria-labelledby="orgs-impact-title" className="scroll-mt-20 pb-4">
      <div className="container">
        <div data-reveal className="rounded-2xl border bg-card px-5 py-6 shadow-card sm:px-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h2 id="orgs-impact-title" className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                {content.title} <span className="text-primary">{content.accent}</span>
              </h2>
            </div>
            <ul className="grid grid-cols-2 gap-6">
              {items.map(({ icon: Icon, value, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-3xl font-extrabold leading-none">
                      <span data-count={value}>{value}</span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
