import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealGroupProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export function RevealGroup({ children, as: Tag = "div", className }: RevealGroupProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <Tag ref={ref} data-visible={isVisible || undefined} className={cn("reveal-group", className)}>
      {children}
    </Tag>
  );
}
