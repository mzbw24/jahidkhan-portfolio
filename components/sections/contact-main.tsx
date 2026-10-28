import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/config/site";
import type { ContactContent } from "@/types/content";

interface ContactMainProps {
  form: ContactContent["form"];
  location: ContactContent["location"];
}

export function ContactMain({ form, location }: ContactMainProps) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&z=6&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.mapQuery)}`;

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
          <p className="eyebrow mb-2">{location.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold">{location.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{location.text}</p>

          <div className="mt-6 aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
            <iframe
              title={location.mapTitle}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>

          <div className="card-surface mt-4 flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <IconBadge icon="building" tone="blue" size="lg" />
              <div>
                <p className="text-xs font-semibold">{location.addressLabel}</p>
                <p className="text-sm">{location.address}</p>
                <p className="text-xs text-muted-foreground">{location.addressNote}</p>
              </div>
            </div>
            <Link
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:underline"
            >
              {location.directions}
            </Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-blue-500/10 p-4">
              <Clock className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold">{location.hoursLabel}</p>
                <p className="text-sm">{location.hours}</p>
                <p className="text-xs text-muted-foreground">{location.hoursValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-red-500/10 p-4">
              <CalendarDays className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold">{location.meetingLabel}</p>
                <p className="text-sm">{location.meeting}</p>
                <p className="text-xs text-muted-foreground">{location.meetingNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
