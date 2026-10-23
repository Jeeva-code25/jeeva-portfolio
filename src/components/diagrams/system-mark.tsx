export function SystemMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect
        x="24"
        y="24"
        width="232"
        height="232"
        rx="8"
        stroke="currentColor"
        strokeOpacity="0.18"
      />
      <circle cx="88" cy="96" r="10" stroke="currentColor" strokeOpacity="0.55" />
      <circle cx="192" cy="88" r="8" fill="currentColor" fillOpacity="0.55" />
      <circle cx="168" cy="176" r="12" stroke="currentColor" strokeOpacity="0.7" />
      <circle cx="96" cy="188" r="7" fill="currentColor" fillOpacity="0.35" />
      <path
        d="M98 100L184 92M184 96L172 168M160 176L102 184M96 178L90 106"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path
        d="M88 96H56M192 88H228M168 176H220M96 188H48"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeDasharray="3 4"
      />
      <rect
        x="118"
        y="118"
        width="44"
        height="44"
        rx="4"
        stroke="currentColor"
        strokeOpacity="0.45"
      />
      <path
        d="M130 140H150M140 130V150"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
    </svg>
  );
}
