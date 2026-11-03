"use client";

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

const SWIPE_DISTANCE = 50;

/**
 * Horizontal swipe detection via pointer events (touch, pen and mouse drag).
 * Returns `onPointerDown` for the swipe area and `wasDrag()` so click handlers can ignore drags.
 * Pair the area with `touch-action: pan-y` so vertical scrolling still works.
 */
export function useSwipe(onPrev: () => void, onNext: () => void) {
  const cleanup = useRef<(() => void) | null>(null);
  const dragged = useRef(false);
  const handlers = useRef({ onPrev, onNext });

  useEffect(() => {
    handlers.current = { onPrev, onNext };
  });
  useEffect(() => () => cleanup.current?.(), []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    cleanup.current?.();
    dragged.current = false;
    const start = { x: event.clientX, y: event.clientY };
    const stop = () => {
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", stop);
      cleanup.current = null;
    };
    const finish = (up: PointerEvent) => {
      stop();
      const dx = up.clientX - start.x;
      const dy = up.clientY - start.y;
      if (Math.hypot(dx, dy) > 10) dragged.current = true;
      if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) handlers.current.onNext();
        else handlers.current.onPrev();
      }
    };
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", stop);
    cleanup.current = stop;
  }, []);

  const wasDrag = useCallback(() => {
    const value = dragged.current;
    dragged.current = false;
    return value;
  }, []);

  return { onPointerDown, wasDrag };
}
