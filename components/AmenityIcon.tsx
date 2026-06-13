// Minimal line icons rendered inside a gold "marquise" lozenge, echoing the
// project's amenity badges. Charcoal stroke on gold for contrast.

const PATHS: Record<string, JSX.Element> = {
  party: (
    <>
      <path d="M4 20l5-13 7 11z" />
      <path d="M15 4l1 2M18 7l2-1M17 11l2 1" />
    </>
  ),
  play: (
    <>
      <path d="M5 20v-6M5 14l9-3M5 8l9-3v6" />
      <circle cx="5" cy="5" r="1.4" />
    </>
  ),
  senior: (
    <>
      <circle cx="10" cy="5" r="2" />
      <path d="M10 8v7M10 11l4 2M10 15l-2 5M10 15l2 5M16 9v11" />
    </>
  ),
  temple: (
    <>
      <path d="M12 3l5 4H7zM7 7v10M17 7v10M5 17h14M7 21h10" />
    </>
  ),
  walk: (
    <>
      <circle cx="12" cy="4" r="1.6" />
      <path d="M12 7l-2 5 2 2v5M12 12l3 1M10 12l-3 6" />
    </>
  ),
  games: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <path d="M8 10v4M6 12h4M15 11h.01M17 14h.01" />
    </>
  ),
  pool: (
    <>
      <path d="M4 16c2 1.5 3 1.5 5 0s3-1.5 5 0 3 1.5 5 0M4 20c2 1.5 3 1.5 5 0s3-1.5 5 0 3 1.5 5 0" />
      <path d="M9 13V5a2 2 0 014 0M9 9h4" />
    </>
  ),
  zumba: (
    <>
      <circle cx="13" cy="4" r="1.6" />
      <path d="M13 7l-3 4 3 3M10 11l-4 1M13 14l1 6M13 14l-3 4" />
    </>
  ),
  sign: (
    <>
      <path d="M12 3v18M12 6h6l-2 2 2 2h-6M12 12H6l2 2-2 2h6" />
    </>
  ),
  yoga: (
    <>
      <circle cx="12" cy="5" r="1.6" />
      <path d="M12 8v4M5 18c3-2 5-2 7-2s4 0 7 2M9 13l-4 1M15 13l4 1" />
    </>
  ),
  hall: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 9h16M8 5v4M14 13h2v3h-2z" />
    </>
  ),
  arbour: (
    <>
      <path d="M4 20V8M20 20V8M4 8h16M6 8V5M18 8V5M9 20v-6h6v6" />
    </>
  ),
  court: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="1" />
      <path d="M12 6v12M4 12h16" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  steam: (
    <>
      <path d="M5 20h14M7 20v-4a5 5 0 0110 0v4" />
      <path d="M9 7c0-1 1-1 1-2M13 7c0-1 1-1 1-2" />
    </>
  ),
  sunset: (
    <>
      <path d="M12 4v3M5 9l2 2M19 9l-2 2M3 16h18M6 16a6 6 0 0112 0" />
    </>
  ),
  structure: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M4 12h16M9 21v-5h6v5" />
    </>
  ),
  paint: (
    <>
      <rect x="4" y="4" width="13" height="6" rx="1" />
      <path d="M17 7h3v4h-7v3M11 14h3v6h-3z" />
    </>
  ),
  window: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1" />
      <path d="M12 4v16M5 12h14" />
    </>
  ),
  floor: (
    <>
      <path d="M3 7h18M3 12h18M3 17h18M8 7v10M14 7v10" />
    </>
  ),
  kitchen: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M4 13h16M8 4v5M8 4a1.5 1.5 0 013 0M14 12v3" />
    </>
  ),
  door: (
    <>
      <path d="M6 21V4h12v17M6 21h12M6 21H4M18 21h2" />
      <circle cx="14.5" cy="12" r="0.8" />
    </>
  ),
  default: (
    <>
      <path d="M12 4l2.4 5.2L20 11l-5.6 1.8L12 18l-2.4-5.2L4 11l5.6-1.8z" />
    </>
  ),
};

export function AmenityIcon({ name, className }: { name: string; className?: string }) {
  const path = PATHS[name] ?? PATHS.default;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {path}
    </svg>
  );
}

/**
 * Gold "marquise" lozenge holding an amenity icon — a thin gold frame with a
 * faint gradient wash and the icon in gold inside. Reads as jewellery, not
 * a flat badge.
 */
export function AmenityBadge({ name }: { name: string }) {
  return (
    <span className="relative grid h-20 w-16 place-items-center transition-transform duration-700 ease-luxe group-hover:-translate-y-1">
      <svg
        viewBox="0 0 64 80"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`mq-${name}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9a876" stopOpacity="0.18" />
            <stop offset="1" stopColor="#c9a876" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* marquise / ogee outline */}
        <path
          d="M32 2 C 50 16, 58 28, 58 40 C 58 52, 50 64, 32 78 C 14 64, 6 52, 6 40 C 6 28, 14 16, 32 2 Z"
          fill={`url(#mq-${name})`}
          stroke="#c9a876"
          strokeWidth="1"
          className="transition-[stroke-width] duration-500 group-hover:[stroke-width:1.5]"
        />
      </svg>
      <AmenityIcon name={name} className="relative h-7 w-7 text-gold" />
    </span>
  );
}
