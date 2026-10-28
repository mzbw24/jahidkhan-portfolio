"use client";

import { useLanguage } from "@/hooks/use-language";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

/** Flags mock content. Hidden when NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTICES=false. */
export function PlaceholderBadge({ className }: { className?: string }) {
  const { common } = useLanguage();
  if (!siteConfig.showPlaceholderNotices) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300",
        className,
      )}
    >
      {common.placeholderBadge}
    </span>
  );
}
