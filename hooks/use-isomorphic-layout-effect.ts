import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect on the client (no flash before animations), useEffect during SSR. */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
