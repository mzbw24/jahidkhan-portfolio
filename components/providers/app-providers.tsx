import type { ReactNode } from "react";
import type { Localized } from "@/types/common";
import type { CommonContent } from "@/types/content";
import { ThemeProvider } from "./theme-provider";
import { LanguageProvider } from "./language-provider";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({
  common,
  children,
}: {
  common: Localized<CommonContent>;
  children: ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LanguageProvider common={common}>
        {children}
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}
