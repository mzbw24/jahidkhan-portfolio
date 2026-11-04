"use client";

import { useCallback, useEffect, useState } from "react";
import { wrapIndex } from "@/lib/photo-utils";

/**
 * Autoplay carousel state. Autoplay is opt-out (play/pause button), pauses on hover, keyboard focus and
 * hidden tabs, and never starts for people who prefer reduced motion.
 */
export function useCarousel(total: number, intervalMs = 6000) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((delta: number) => setActive((current) => wrapIndex(current, delta, total)), [total]);

  useEffect(() => {
    if (!playing || hovered || focused || total < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, total, go, intervalMs]);

  return {
    active,
    setActive,
    go,
    playing,
    togglePlaying: () => setPlaying((value) => !value),
    regionProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "ArrowLeft") go(-1);
        else if (event.key === "ArrowRight") go(1);
      },
    },
  };
}
