import { IconBadge, type Tone } from "@/components/shared/icon-badge";
import { isWhatsAppConfigured, normalizeNumber } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config/site";
import type { ContactCard, ContactCardKey } from "@/types/content";

const TONES: Record<ContactCardKey, Tone> = {
  email: "red",
  phone: "blue",
  whatsapp: "green",
  meeting: "purple",
};

/** Values for non-localized fields come from the central config (siteConfig.contact). */
function resolve(card: ContactCard): { value: string; href?: string } {
  if (card.value) return { value: card.value };
  switch (card.key) {
    case "email":
      return { value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` };
    case "phone":
      return { value: siteConfig.contact.phoneDisplay, href: `tel:${siteConfig.contact.phoneHref}` };
    case "whatsapp": {
      if (isWhatsAppConfigured()) {
        const digits = normalizeNumber(siteConfig.whatsappNumber);
        return { value: siteConfig.contact.phoneDisplay, href: `https://wa.me/${digits}` };
      }
      return { value: siteConfig.contact.phoneDisplay };
    }
    default:
      return { value: "" };
  }
}

export function ContactCards({ cards }: { cards: ContactCard[] }) {
  return (
    <div className="container relative z-10 -mt-14">
      <ul data-stagger className="card-surface grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
        {cards.map((card) => {
          const { value, href } = resolve(card);
          return (
            <li key={card.key} className="flex items-start gap-3">
              <IconBadge icon={card.icon} tone={TONES[card.key]} size="lg" />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{card.title}</h3>
                {href ? (
                  <a href={href} className="block break-all text-[13px] text-foreground/85 hover:text-primary">
                    {value}
                  </a>
                ) : (
                  <p className="text-[13px] text-foreground/85">{value}</p>
                )}
                <p className="mt-0.5 text-xs text-muted-foreground">{card.note}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
