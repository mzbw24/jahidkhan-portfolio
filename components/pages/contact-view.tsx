"use client";

import { useRef } from "react";
import { ConnectBand } from "@/components/sections/connect-band";
import { ContactCards } from "@/components/sections/contact-cards";
import { ContactMain } from "@/components/sections/contact-main";
import { FaqJoin } from "@/components/sections/faq-join";
import { PageHero } from "@/components/sections/page-hero";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import { useLocalized } from "@/hooks/use-language";
import type { Localized } from "@/types/common";
import type { ContactContent } from "@/types/content";

export function ContactView({ content }: { content: Localized<ContactContent> }) {
  const c = useLocalized(content);
  const scope = useRef<HTMLDivElement>(null);
  useGsapAnimations(scope);

  return (
    <div ref={scope}>
      <PageHero content={c.hero} portrait="portrait" quotePosition="right" />
      <ContactCards cards={c.cards} />
      <ContactMain form={c.form} location={c.location} />
      <ConnectBand content={c.connect} />
      <FaqJoin faq={c.faq} join={c.join} />
    </div>
  );
}
