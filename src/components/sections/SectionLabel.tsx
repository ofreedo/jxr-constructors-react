import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  /** Use on dark-background sections (jxr-blue-bright reads better on black than jxr-blue). */
  dark?: boolean;
  className?: string;
}

/**
 * Small eyebrow label with a short tick-mark line before it. The tick
 * draws in (scaleX 0 -> 1) when the nearest ancestor .reveal/.reveal-group
 * becomes visible — see the `.section-label` rules in index.css, which
 * mirror the original's CSS-only, no-Context approach exactly.
 */
export function SectionLabel({ children, dark = false, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "section-label inline-flex items-center gap-2 text-[0.76rem] font-semibold tracking-[0.12em] uppercase mb-3.5",
        dark ? "text-jxr-blue-bright is-dark" : "text-jxr-blue",
        className
      )}
    >
      {children}
    </div>
  );
}
