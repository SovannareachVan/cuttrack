/**
 * The CutTrack logo mark: a barbell drawn with plain SVG.
 * Kept as inline SVG so it inherits `currentColor` and needs no asset file.
 */
export default function BrandMark({ className = 'sidebar__logo', size = 18 }) {
  return (
    <span className={className} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 6.5v11" />
        <path d="M17.5 6.5v11" />
        <path d="M3.5 9.5v5" />
        <path d="M20.5 9.5v5" />
        <path d="M6.5 12h11" />
      </svg>
    </span>
  );
}
