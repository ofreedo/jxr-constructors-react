import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useStickyHeaderShrink } from "@/hooks/useStickyHeaderShrink";
import { useHeroIntroReveal } from "@/hooks/useHeroIntroReveal";
import { Button } from "@/components/ui/Button";
import MainNav from "./MainNav";

interface SiteHeaderProps {
  /** True only on the homepage — enables the hidden-until-scroll hero-intro behavior. */
  isHeroIntro?: boolean;
}

export default function SiteHeader({ isHeroIntro = false }: SiteHeaderProps) {
  const isScrolled = useStickyHeaderShrink();
  const isRevealed = useHeroIntroReveal();

  // On every other page the header is a normal sticky element. On the
  // homepage it's permanently position:fixed (never switches to
  // sticky) — switching would reserve layout space the instant it's
  // revealed and visibly shift the page, which is exactly the bug this
  // was built to avoid in the original implementation.
  const heroIntroClasses = isHeroIntro
    ? cn(
        "fixed top-0 left-0 right-0 transition-opacity duration-400",
        isRevealed ? "opacity-100 visible" : "opacity-0 invisible",
        "motion-reduce:opacity-100 motion-reduce:visible motion-reduce:transition-none"
      )
    : "sticky top-0";

  return (
    <header
      className={cn(
        "bg-jxr-white border-b border-hairline z-[100] transition-shadow duration-250",
        heroIntroClasses,
        isScrolled && "shadow-[0_2px_12px_rgba(20,22,26,0.08)]"
      )}
    >
      <div
        className={cn(
          "max-w-container mx-auto px-6 flex items-center justify-between flex-nowrap relative transition-[padding] duration-250",
          isScrolled ? "py-2" : "py-3.5"
        )}
      >
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span
            className={cn(
              "inline-block transition-[height] duration-250",
              isScrolled ? "h-12" : "h-[72px]"
            )}
          >
            <img
              src="/assets/logo/nav-logo.png"
              alt="JXR Constructors, Inc."
              className="h-full w-auto object-contain"
            />
          </span>
        </Link>

        <MainNav />

        <Button to="/contact" variant="primary" className="max-[900px]:hidden shrink-0 whitespace-nowrap">
          Contact Us
        </Button>
      </div>
    </header>
  );
}
