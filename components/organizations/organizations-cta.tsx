import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrganizationsContent } from "@/types/organizations";

export function OrganizationsCta({ content }: { content: OrganizationsContent["cta"] }) {
  return (
    <section aria-labelledby="orgs-cta-title" className="section-y">
      <div className="container">
        <div data-reveal className="dark-band grid grid-cols-1 items-center gap-6 rounded-2xl px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <h2 id="orgs-cta-title" className="font-display text-3xl font-bold italic sm:text-4xl">
              {content.title} <span className="text-gold">{content.accent}</span>
            </h2>
            <p className="mt-3 text-white/85">{content.text}</p>
          </div>
          <Button asChild size="lg">
            <Link href="/contact">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              {content.button}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
