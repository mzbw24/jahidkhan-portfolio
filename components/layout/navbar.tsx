"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { useLanguage } from "@/hooks/use-language";
import { navItems } from "@/lib/config/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string, isRoute: boolean) {
  if (!isRoute) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { common } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur supports-[backdrop-filter]:bg-navy/85">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <BrandLogo />

        <nav aria-label={common.nav.ariaLabel} className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href, item.isRoute);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-block py-2 text-[13px] font-medium text-white/80 transition-colors hover:text-white",
                      active && "text-white after:absolute after:inset-x-0 after:-bottom-[1px] after:h-0.5 after:bg-primary",
                    )}
                  >
                    {common.nav[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact">
              {common.nav.support}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? common.nav.closeMenu : common.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label={common.nav.ariaLabel} className="border-t border-white/10 bg-navy xl:hidden">
          <ul className="container flex flex-col py-3">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href, item.isRoute);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-3 text-[15px] font-medium text-white/80 hover:bg-white/5 hover:text-white",
                      active && "bg-white/5 text-white",
                    )}
                  >
                    {common.nav[item.key]}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 md:hidden">
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  {common.nav.support}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
