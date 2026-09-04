import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

/**
 * React Router doesn't auto-scroll to an in-page anchor on navigation
 * the way native <a href="page.html#section"> links do — this restores
 * that behavior for the cross-page anchors used throughout the site
 * (/services#general-contracting, /projects#orpa, etc.), and resets
 * scroll to the top for any navigation without a hash.
 */
function useScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
}

export default function Layout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  useScrollRestoration();

  return (
    <>
      <SiteHeader isHeroIntro={isHomePage} />
      <Outlet />
      <SiteFooter />
    </>
  );
}
