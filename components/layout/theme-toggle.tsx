"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

/** Icon swap is pure CSS (dark: variant) so there is no hydration mismatch. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { common } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={common.controls.themeAria}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-white/90 transition-colors hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
    </button>
  );
}
