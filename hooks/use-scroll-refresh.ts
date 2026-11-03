"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Re-measures GSAP scroll triggers whenever the page content changes height (lazy images settling,
 * gallery filters, language switch). Without it, sections below a growing/shrinking gallery can keep
 * stale trigger positions and never reveal.
 */
export function useScrollRefresh(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let timer: number | undefined;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(root);
    window.addEventListener("load", refresh);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
    };
  }, [scope]);
}
