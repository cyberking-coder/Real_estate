// Gold "V" monogram for Basil Vrundavan — placeholder echoing the brand
// emblem. Replace with the exact logo by dropping public/logo.png and
// swapping this for an <img>.

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 54"
      className={className}
      role="img"
      aria-label="Basil Vrundavan"
      fill="none"
    >
      <defs>
        <linearGradient id="logo-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6cd92" />
          <stop offset="1" stopColor="#b8923f" />
        </linearGradient>
      </defs>
      {/* flourish curl above the left arm */}
      <path
        d="M22 12 C16 6 24 1 27 9 C28 12 27 14 25 15"
        stroke="url(#logo-gold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* the V */}
      <path
        d="M21 14 L32 46 L43 14"
        stroke="url(#logo-gold)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
