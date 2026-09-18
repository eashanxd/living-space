import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variantStyles = {
  primary:
    "bg-[#1b2d32] text-white hover:bg-[#14262b] focus-visible:ring-[#1b2d32] disabled:bg-[#7d8e90] disabled:text-white/80",
  secondary:
    "border border-[#d9d1c7] bg-white text-[#1a2b2f] hover:border-[#b8b0a4] hover:bg-[#f7f3ee] focus-visible:ring-[#1a2b2f] disabled:border-[#ddd5cc] disabled:text-[#8d8a86]",
  ghost:
    "text-[#1a2b2f] hover:bg-[#f0ebe3] focus-visible:ring-[#1a2b2f] disabled:text-[#8d8a86]",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f5f0] disabled:cursor-not-allowed active:translate-y-px active:scale-[0.99] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_8px_18px_rgba(27,45,50,0.12)]",
    variantStyles[variant],
    className,
  ].join(" ");

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
