"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";
import { useLanguage } from "./use-language";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapAnimations(scope: RefObject<HTMLElement | null>) {
  const { lang } = useLanguage();

  useIsomorphicLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]", root);
        if (heroItems.length) {
          gsap.from(heroItems, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "opacity,transform",
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]", root).forEach((group) => {
          const items = Array.from(group.children);
          if (!items.length) return;
          gsap.from(items, {
            opacity: 0,
            y: 32,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]", root).forEach((el) => {
          const amount = Number(el.dataset.parallax ?? 6) || 6;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [scope]);

  // Translated text changes block heights; recalculate trigger positions.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lang]);
}
