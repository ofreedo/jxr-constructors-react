import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { mainNavLinks, utilityLinks } from "@/data/nav";

/**
 * Nav-link underline: a shared scaleX() mechanism for both the
 * always-on active-page underline and a hover sweep on other links —
 * ported from .main-nav a::after in the original stylesheet. NavLink's
 * isActive gives us the active state for free, replacing what used to
 * be hand-set class="active" markup duplicated on all 7 pages.
 */
const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative py-1 text-[0.92rem] font-medium tracking-[0.02em] uppercase whitespace-nowrap",
    "after:content-[''] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-jxr-blue",
    "after:origin-left after:scale-x-0 after:transition-transform after:duration-250 after:ease-out",
    "hover:text-jxr-blue hover:after:scale-x-100",
    isActive ? "text-jxr-blue after:scale-x-100" : "text-charcoal"
  );

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "items-center gap-7 flex-nowrap whitespace-nowrap",
          "max-[900px]:absolute max-[900px]:top-full max-[900px]:left-0 max-[900px]:right-0",
          "max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-0",
          "max-[900px]:bg-jxr-white max-[900px]:border-b max-[900px]:border-hairline max-[900px]:shadow-lg",
          isOpen ? "flex" : "flex max-[900px]:hidden",
          "max-[1050px]:gap-[18px] max-[1050px]:[&_a]:text-[0.8rem]"
        )}
      >
        {mainNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={cn(
              linkClasses,
              link.mobileOnly && "hidden max-[900px]:block",
              "max-[900px]:px-6 max-[900px]:py-4 max-[900px]:border-b max-[900px]:border-hairline max-[900px]:after:hidden"
            )}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <div className="flex items-center gap-4 ml-2 max-[1050px]:gap-[10px] max-[1050px]:ml-1 max-[900px]:ml-0 max-[900px]:px-6 max-[900px]:py-4">
          {utilityLinks.map((link) => {
            const classes =
              "text-[0.8rem] text-charcoal-soft uppercase tracking-[0.03em] max-[1050px]:text-[0.72rem]";
            return link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener" className={classes}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={classes} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="main-nav"
        onClick={() => setIsOpen((v) => !v)}
        className="hidden max-[900px]:flex flex-col justify-center gap-[5px] w-10 h-10 border border-hairline rounded bg-transparent cursor-pointer shrink-0"
      >
        <span
          className={cn(
            "block w-5 h-0.5 mx-auto bg-jxr-black transition-transform duration-200",
            isOpen && "translate-y-[7px] rotate-45"
          )}
        />
        <span
          className={cn(
            "block w-5 h-0.5 mx-auto bg-jxr-black transition-opacity duration-200",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "block w-5 h-0.5 mx-auto bg-jxr-black transition-transform duration-200",
            isOpen && "-translate-y-[7px] -rotate-45"
          )}
        />
      </button>
    </>
  );
}
