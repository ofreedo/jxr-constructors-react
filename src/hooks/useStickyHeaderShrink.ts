import { useEffect, useState } from "react";

const THRESHOLD = 80;

/**
 * Compacts the header (smaller logo, tighter padding, shadow) once
 * scrolled past 80px. Runs once on mount too, in case the page loads
 * already scrolled — e.g. arriving via an in-page anchor link from
 * another page (/services#general-contracting).
 */
export function useStickyHeaderShrink() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > THRESHOLD);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > THRESHOLD);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isScrolled;
}
