"use client";

import { Play } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export type VideoKey = keyof typeof siteConfig.videos;

interface WatchButtonProps {
  label: string;
  video: VideoKey;
  variant?: ButtonProps["variant"];
  /** Round play-only button (label becomes the accessible name). */
  circle?: boolean;
  className?: string;
}

/** Opens the configured video, or tells the visitor it isn't available yet. */
export function WatchButton({ label, video, variant = "glass", circle = false, className }: WatchButtonProps) {
  const { common } = useLanguage();

  const handleClick = () => {
    const url = siteConfig.videos[video];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast(common.comingSoon);
    }
  };

  if (circle) {
    return (
      <Button
        type="button"
        variant="glass"
        size="icon"
        aria-label={label}
        onClick={handleClick}
        className={cn("h-14 w-14 rounded-full border-white/60 bg-white/20", className)}
      >
        <Play className="h-6 w-6 fill-white text-white" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant} onClick={handleClick} className={className}>
      <Play className="h-4 w-4 fill-current" aria-hidden="true" />
      {label}
    </Button>
  );
}
