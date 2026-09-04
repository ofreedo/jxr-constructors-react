import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const DURATION = 1200;

/**
 * Ports the original's animateCountUp exactly: ease-out cubic
 * (1 - (1-t)^3), 1200ms, triggered by its own IntersectionObserver
 * (threshold 0, rootMargin '0px 0px -60px 0px' to match the reveal
 * system it was always nested inside). Reduced-motion hard-skips
 * straight to the final value, same as the original.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(target: number) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setValue(target);
      return;
    }

    let rafId: number;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const startTime = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / DURATION, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) rafId = requestAnimationFrame(tick);
            };
            rafId = requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, prefersReducedMotion]);

  return { ref, value };
}
