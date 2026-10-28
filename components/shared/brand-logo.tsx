"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

/** Always rendered on a dark surface (navbar / footer), so text is white in both themes. */
export function BrandLogo({ className }: { className?: string }) {
  const { common } = useLanguage();
  return (
    <Link href="/" className={cn("inline-flex flex-col leading-none text-white", className)} aria-label="Jahid Khan — home">
      <span className="text-[1.6rem] font-extrabold tracking-tight">
        JAHID <span className="text-primary">KHAN</span>
      </span>
      <span className="mt-1 text-[0.6rem] font-medium tracking-[0.14em] text-white/70">{common.siteTagline}</span>
    </Link>
  );
}
