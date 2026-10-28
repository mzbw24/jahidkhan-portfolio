import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  /** Use on dark backgrounds. */
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({ eyebrow, title, text, light, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? <p className={cn("eyebrow mb-2", light && "text-red-400")}>{eyebrow}</p> : null}
      <Tag className="font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-[2rem]">{title}</Tag>
      {text ? (
        <p className={cn("mt-3 text-[15px] leading-relaxed", light ? "text-white/80" : "text-muted-foreground")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
