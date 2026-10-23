import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-accent text-accent-fg button-edge hover:brightness-105 active:brightness-95",
  secondary: "card text-foreground hover:bg-surface-elevated",
  ghost: "bg-transparent text-muted hover:text-foreground",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
} as const;

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
  download?: string;
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  download,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[color,background-color,filter] duration-150",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (isExternalHref(href) || download) {
      const opensNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          download={download}
          {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
