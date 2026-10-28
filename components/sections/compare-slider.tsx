"use client";

import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { MediaImage } from "@/components/shared/media-image";

interface CompareSliderProps {
  todayLabel: string;
  tomorrowLabel: string;
  ariaLabel: string;
}

/** Before/after reveal driven by a native range input: keyboard, touch and screen-reader friendly. */
export function CompareSlider({ todayLabel, tomorrowLabel, ariaLabel }: CompareSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[16/10] select-none overflow-hidden rounded-xl ring-1 ring-white/15 focus-within:ring-2 focus-within:ring-ring sm:aspect-[16/9]">
      <MediaImage media="cityToday" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <MediaImage media="cityTomorrow" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>

      <span className="absolute left-3 top-3 rounded bg-navy/85 px-2.5 py-1 text-xs font-semibold text-white">
        {todayLabel}
      </span>
      <span className="absolute right-3 top-3 rounded bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
        {tomorrowLabel}
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg">
          <ChevronsLeftRight className="h-4 w-4" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={ariaLabel}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
