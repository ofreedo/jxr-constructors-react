import { useEffect, useState } from "react";

const THRESHOLD = 4;

/**
 * Homepage-only: the header starts fully hidden so the black-screen
 * hero animation owns the whole viewport with nothing competing for
 * attention. Reveals permanently once the user genuinely scrolls,
 * independent of whether the hero animation itself has finished —
 * once they've started interacting with the page, normal navigation
 * should be available right away. Never re-hides.
 *
 * Checks actual scrollY inside the handler (not just "a scroll event
 * fired") since resize/reflow can spuriously fire near-zero scroll
 * events that shouldn't count — this was a real bug caught and fixed
 * in the original vanilla-JS build of this site.
 */
export function useHeroIntroReveal() {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    function checkScroll() {
      if (window.scrollY > THRESHOLD) {
        setIsRevealed(true);
        window.removeEventListener("scroll", checkScroll);
      }
    }
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return isRevealed;
}
