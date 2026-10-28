import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";
import type { StatItem } from "@/types/content";

/** Mock statistics — replace with verified figures. */
export function StatsStrip({ items }: { items: StatItem[] }) {
  return (
    <section className="border-y bg-muted/40">
      <div className="container py-8">
        <ul data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-4">
              <IconBadge icon={item.icon} tone={toneAt(index)} size="lg" />
              <div>
                <p className="font-display text-2xl font-bold leading-none text-primary">{item.value}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{item.label}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <PlaceholderBadge />
        </div>
      </div>
    </section>
  );
}
