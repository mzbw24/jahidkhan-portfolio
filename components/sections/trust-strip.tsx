import { IconBadge, toneAt } from "@/components/shared/icon-badge";
import type { IconItem } from "@/types/common";

export function TrustStrip({ items }: { items: IconItem[] }) {
  return (
    <div className="container relative z-10 -mt-14">
      <ul
        data-stagger
        className="card-surface grid gap-x-4 gap-y-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:p-5"
      >
        {items.map((item, index) => (
          <li key={item.title} className="flex items-center gap-3">
            <IconBadge icon={item.icon} tone={toneAt(index)} />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight">{item.title}</p>
              {item.text ? <p className="mt-0.5 text-xs text-muted-foreground">{item.text}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
