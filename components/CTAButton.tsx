import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface CTAButtonProps {
  /** If provided, renders an <a> / Next.js <Link>. Otherwise renders <button>. */
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Open in new tab (only when href is set) */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

/* ─── Style maps ─────────────────────────────────────────────────────────── */
const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-accent text-white shadow-sm " +
    "hover:bg-orange-600 active:bg-orange-700 " +
    "focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
  secondary:
    "bg-white text-brand-blue border border-brand-blue " +
    "hover:bg-brand-blue hover:text-white active:bg-brand-blue/90 " +
    "focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-brand-blue border border-neutral-border " +
    "hover:bg-slate-50 active:bg-slate-100 " +
    "focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

/* ─── Arrow icon ─────────────────────────────────────────────────────────── */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-4 h-4 flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ─── Base classes ───────────────────────────────────────────────────────── */
const BASE =
  "inline-flex items-center justify-center font-semibold rounded-lg " +
  "transition-colors duration-150 cursor-pointer select-none " +
  "disabled:opacity-50 disabled:pointer-events-none";

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function CTAButton({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  children,
  ...rest
}: CTAButtonProps & Omit<ComponentPropsWithoutRef<"button">, keyof CTAButtonProps>) {
  const classes = [BASE, variantStyles[variant], sizeStyles[size], className]
    .filter(Boolean)
    .join(" ");

  /* ── Render as Link ── */
  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link href={href} className={classes} {...externalProps}>
        {children}
        <ArrowRight />
      </Link>
    );
  }

  /* ── Render as button ── */
  return (
    <button type="button" className={classes} {...rest}>
      {children}
      <ArrowRight />
    </button>
  );
}
