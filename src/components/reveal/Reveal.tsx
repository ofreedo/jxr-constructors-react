import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, as: Tag = "div", className, style }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <Tag ref={ref} data-visible={isVisible || undefined} className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}
