"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Counts `[data-count]` elements up to their value once they scroll into view.
 * Server HTML and reduced-motion users always see the final number.
 */
export function useCountUp(scope: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
          const target = Number(el.dataset.count);
          if (!Number.isFinite(target)) return;
          const state = { value: 0 };
          el.textContent = "0";
          gsap.to(state, {
            value: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(state.value));
            },
            onComplete: () => {
              el.textContent = String(target);
            },
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });
      });
    }, root);
    return () => {
      mm.revert();
      ctx.revert();
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = el.dataset.count ?? el.textContent;
      });
    };
  }, [scope]);
}
