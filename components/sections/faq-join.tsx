import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { MediaImage } from "@/components/shared/media-image";
import type { ContactContent } from "@/types/content";

interface FaqJoinProps {
  faq: ContactContent["faq"];
  join: ContactContent["join"];
}

export function FaqJoin({ faq, join }: FaqJoinProps) {
  return (
    <section className="section-y">
      <div className="container grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <div data-reveal>
          <p className="eyebrow mb-2">{faq.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold">{faq.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.text}</p>
          <Accordion type="single" collapsible className="mt-6 space-y-2.5">
            {faq.items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div data-reveal className="card-surface overflow-hidden self-start">
          <div className="grid sm:grid-cols-[1fr_1.2fr]">
            <div className="relative min-h-[11rem]">
              <MediaImage media="faqPoster" fill sizes="(min-width: 640px) 22vw, 100vw" className="object-cover" />
            </div>
            <div className="flex items-start gap-3 p-5">
              <IconBadge icon="users" tone="red" size="lg" />
              <div>
                <h3 className="font-display text-xl font-bold">{join.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{join.text}</p>
                <Button asChild className="mt-4">
                  <Link href={join.cta.href}>
                    {join.cta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-2 divide-x border-t sm:grid-cols-4">
            {join.items.map((item, index) => (
              <li key={item.title} className="flex flex-col items-center gap-2 px-2 py-4 text-center">
                <IconBadge icon={item.icon} tone={toneAt(index + 3)} size="lg" />
                <span className="text-xs font-medium leading-snug">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
