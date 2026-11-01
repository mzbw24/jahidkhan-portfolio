import { CalendarDays } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/config/site";
import type { ContactContent } from "@/types/content";

interface ContactMainProps {
  form: ContactContent["form"];
  direct: ContactContent["direct"];
}

/** Form on the left; direct email/phone on the right. No address, map or third-party embed is published. */
export function ContactMain({ form, direct }: ContactMainProps) {
  return (
    <section id="contact-form" className="section-y">
      <div className="container grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div data-reveal>
          <p className="eyebrow mb-2">{form.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold">{form.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{form.text}</p>
          <ContactForm content={form} />
        </div>

        <div data-reveal>
          <p className="eyebrow mb-2">{direct.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold">{direct.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{direct.text}</p>

          <ul className="mt-6 space-y-4">
            <li className="card-surface flex items-center gap-3 p-4">
              <IconBadge icon="mail" tone="red" size="lg" />
              <div className="min-w-0">
                <p className="text-xs font-semibold">{direct.emailLabel}</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="block break-all text-sm hover:text-primary"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </li>
            <li className="card-surface flex items-center gap-3 p-4">
              <IconBadge icon="phone" tone="blue" size="lg" />
              <div className="min-w-0">
                <p className="text-xs font-semibold">{direct.phoneLabel}</p>
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="block text-sm hover:text-primary">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-red-500/10 p-4">
            <CalendarDays className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold">{direct.meetingLabel}</p>
              <p className="text-sm">{direct.meeting}</p>
              <p className="text-xs text-muted-foreground">{direct.meetingNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
