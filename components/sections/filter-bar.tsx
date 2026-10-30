import { cn } from "@/lib/utils";
import type { GalleryFilter } from "@/types/gallery";

interface FilterBarProps {
  filters: GalleryFilter[];
  active: GalleryFilter;
  labels: Record<string, string>;
  groupLabel: string;
  onChange: (filter: GalleryFilter) => void;
}

/** Pill filters. A scrollable single row on small screens, wrapping on large ones. */
export function FilterBar({ filters, active, labels, groupLabel, onChange }: FilterBarProps) {
  return (
    <div role="group" aria-label={groupLabel} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {filters.map((filter) => {
        const selected = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={selected}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] motion-reduce:transform-none",
              selected
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted",
            )}
          >
            {labels[filter]}
          </button>
        );
      })}
    </div>
  );
}
