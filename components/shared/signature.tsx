import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

/**
 * Typographic stand-in for a handwritten signature. Replace with Jahid's real signature
 * (SVG/PNG) before launch — do not publish this font rendering as an authentic signature.
 */
export function Signature({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("font-script text-3xl leading-none sm:text-4xl", className)}>
      {siteConfig.name}
    </span>
  );
}
