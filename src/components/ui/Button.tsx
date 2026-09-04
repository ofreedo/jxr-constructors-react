import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "hero-primary" | "outline" | "outline-light";

const variantClasses: Record<Variant, string> = {
  primary: "bg-jxr-black text-jxr-white hover:bg-jxr-blue border-transparent",
  "hero-primary": "bg-jxr-blue text-jxr-white hover:bg-jxr-black border-transparent",
  outline: "bg-transparent text-jxr-black border-jxr-black hover:bg-jxr-black hover:text-jxr-white",
  "outline-light":
    "bg-transparent text-jxr-white border-white/60 hover:bg-jxr-white hover:text-jxr-black",
};

const baseClasses =
  "inline-block px-[26px] py-3 rounded font-semibold text-[0.88rem] tracking-[0.03em] uppercase text-center border cursor-pointer transition-colors duration-150";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  href,
  to,
  target,
  rel,
  type,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
