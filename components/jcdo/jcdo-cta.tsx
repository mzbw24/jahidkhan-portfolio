import { Facebook, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JcdoContent } from "@/types/jcdo";

interface JcdoCtaProps {
  cta: JcdoContent["cta"];
  partners: JcdoContent["partners"];
  facts: { website: string; websiteLabel: string; facebook: string; phoneHref: string; phoneDisplay: string };
}

export function JcdoCta({ cta, partners, facts }: JcdoCtaProps) {
  return (
    <>
      <section aria-labelledby="jcdo-cta-title" className="dark-band">
        <div className="container grid grid-cols-1 items-center gap-6 py-12 lg:grid-cols-[1fr_auto] lg:py-16">
          <div data-reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{cta.eyebrow}</p>
            <h2 id="jcdo-cta-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-3 text-white/85">{cta.text}</p>
          </div>
          <div data-reveal className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
              <a href={facts.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {cta.call}
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href={facts.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" aria-hidden="true" />
                {cta.facebook}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="jcdo-partners-title" className="section-y">
        <div className="container">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{partners.eyebrow}</p>
            <h2 id="jcdo-partners-title" className="mt-2 font-display text-3xl font-bold">
              {partners.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{partners.text}</p>
          </div>
          <ul data-stagger className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { icon: Globe, label: partners.websiteLabel, text: facts.websiteLabel, href: facts.website, external: true },
              { icon: Facebook, label: partners.facebookLabel, text: "JCDOsylhet", href: facts.facebook, external: true },
              { icon: Phone, label: partners.phoneLabel, text: facts.phoneDisplay, href: facts.phoneHref, external: false },
            ].map(({ icon: Icon, label, text, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card-surface card-hover flex h-full flex-col items-center gap-2 p-5 text-center"
                >
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
                  <span className="break-all text-sm font-semibold">{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
