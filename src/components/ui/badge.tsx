import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "muted" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em]",
        tone === "neutral" && "bg-surface-elevated text-muted hairline",
        tone === "accent" && "bg-accent-soft text-foreground",
        tone === "outline" && "text-foreground hairline",
        tone === "muted" && "px-0 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
