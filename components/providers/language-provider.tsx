"use client";

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang, Localized } from "@/types/common";
import type { CommonContent } from "@/types/content";
import { LANG_STORAGE_KEY } from "@/lib/config/navigation";

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  common: CommonContent;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLang(value: string | null): value is Lang {
  return value === "en" || value === "bn";
}

interface LanguageProviderProps {
  common: Localized<CommonContent>;
  children: ReactNode;
}

/**
 * Holds the active language. Switching never navigates, so the current route and theme are preserved.
 * Server HTML is always English; a stored Bangla preference is applied right after hydration.
 */
export function LanguageProvider({ common, children }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (isLang(stored)) setLangState(stored);
    } catch {
      /* storage unavailable (private mode) — stay on English */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => setLang(lang === "en" ? "bn" : "en"), [lang, setLang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggleLang, common: common[lang] }),
    [lang, setLang, toggleLang, common],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
