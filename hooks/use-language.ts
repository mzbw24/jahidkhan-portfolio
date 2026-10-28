"use client";

import { useContext } from "react";
import { LanguageContext, type LanguageContextValue } from "@/components/providers/language-provider";
import type { Localized } from "@/types/common";

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/** Picks the active-language version of a `{ en, bn }` content object. */
export function useLocalized<T>(content: Localized<T>): T {
  const { lang } = useLanguage();
  return content[lang];
}
