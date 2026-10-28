import type { IconName } from "@/types/common";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

const TONES = ["red", "blue", "orange", "green", "purple"] as const;
export type Tone = (typeof TONES)[number];

export function toneAt(index: number): Tone {
  return TONES[index % TONES.length] ?? "red";
}

const soft: Record<Tone, string> = {
  red: "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400",
  blue: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  orange: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  green: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  purple: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
};

const solid: Record<Tone, string> = {
  red: "bg-red-600 text-white",
  blue: "bg-blue-600 text-white",
  orange: "bg-orange-500 text-white",
  green: "bg-emerald-600 text-white",
  purple: "bg-violet-600 text-white",
};

interface IconBadgeProps {
  icon: IconName;
  tone?: Tone;
  solidFill?: boolean;
  square?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4",
  md: "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
  lg: "h-14 w-14 [&_svg]:h-6 [&_svg]:w-6",
};

export function IconBadge({ icon, tone = "red", solidFill, square, size = "md", className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        square ? "rounded-lg" : "rounded-full",
        sizes[size],
        solidFill ? solid[tone] : soft[tone],
        className,
      )}
    >
      <Icon name={icon} />
    </span>
  );
}
