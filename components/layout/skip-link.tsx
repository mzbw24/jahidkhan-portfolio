"use client";

import { useLanguage } from "@/hooks/use-language";

export function SkipLink() {
  const { common } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {common.skipLink}
    </a>
  );
}
