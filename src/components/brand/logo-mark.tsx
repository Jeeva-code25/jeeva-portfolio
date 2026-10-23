import { cn } from "@/lib/utils";

/** "JK" ligature monogram: the J's stem doubles as the K's spine. Keep in sync with public/favicon.svg. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("h-8 w-8 shrink-0", className)}>
      <rect width="32" height="32" rx="8" className="fill-accent" />
      <g
        className="stroke-accent-fg"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 8v11.5a4 4 0 0 1-4 4" />
        <path d="M13 16.5L21.5 8" />
        <path d="M16.8 12.7L22.5 23.5" />
      </g>
    </svg>
  );
}
