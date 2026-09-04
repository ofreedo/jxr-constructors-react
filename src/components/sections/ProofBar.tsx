import { CountUp } from "@/components/reveal/CountUp";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ProofBarProps {
  /**
   * "hero-sync" is homepage-only: starts color-matched to the hero's
   * own near-black (#060708) background with content invisible,
   * settling into the normal palette (--jxr-black + hairline border) on
   * the same 2.75s timer as HeroAnimated's own content fade-in — ported
   * from the original's `.hero-animated ~ .proof-bar` sibling-selector
   * rule, applied here directly via the variant prop instead since
   * React doesn't need the sibling-selector indirection.
   */
  variant?: "default" | "hero-sync";
}

const stats = [
  { value: <CountUp to={30} prefix="$" suffix="M+" />, label: "Construction Delivered" },
  { value: "Zero", label: "Safety Violations" },
  { value: "Zero", label: "Terminated or Delayed Contracts" },
  { value: "SDVOSB / DVBE", label: "Certified Small Business" },
];

export function ProofBar({ variant = "default" }: ProofBarProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHeroSync = variant === "hero-sync" && !prefersReducedMotion;

  return (
    <div
      className={cn("border-t", isHeroSync ? "animate-proof-bar-settle border-transparent" : "bg-jxr-black border-white/[0.08]")}
      style={isHeroSync ? { background: "#060708" } : undefined}
    >
      <div
        className={cn(
          "max-w-container mx-auto flex flex-wrap max-[980px]:flex-wrap max-[600px]:flex-col",
          isHeroSync && "opacity-0 animate-proof-bar-content-fade"
        )}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 min-w-[200px] max-[980px]:basis-1/2 max-[600px]:basis-full px-6 py-5.5 text-center border-r border-white/[0.08] max-[600px]:border-r-0 max-[600px]:border-t last:border-r-0 max-[600px]:first:border-t-0"
          >
            <span className="block font-head text-2xl text-white mb-0.5">{stat.value}</span>
            <span className="text-[0.76rem] tracking-[0.05em] uppercase text-white/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
