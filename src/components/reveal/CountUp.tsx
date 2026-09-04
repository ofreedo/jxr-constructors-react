import { useCountUp } from "@/hooks/useCountUp";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ to, prefix = "", suffix = "", className }: CountUpProps) {
  const { ref, value } = useCountUp<HTMLSpanElement>(to);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
