"use client";

import { Play } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
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

/** Opens the configured video URL. Renders nothing while `siteConfig.videos[video]` is null. */
export function WatchButton({ label, video, variant = "glass", circle = false, className }: WatchButtonProps) {
  const url = siteConfig.videos[video];
  // No video configured → render nothing (never a dead control).
  if (!url) return null;

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
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
