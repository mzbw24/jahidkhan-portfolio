"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

/** Reversible EN ⇄ BN switch. Shows the language you will switch TO. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLang, common } = useLanguage();
  const targetLang = lang === "en" ? "bn" : "en";

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={common.controls.languageAria}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      <Globe className="h-[18px] w-[18px]" aria-hidden="true" />
      <span lang={targetLang}>{common.controls.languageLabel}</span>
    </button>
  );
}
