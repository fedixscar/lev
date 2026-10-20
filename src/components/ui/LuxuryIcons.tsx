import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Parisian Place Vendôme 4-Point Faceted Star Lozenge
 * Pure, balanced, aristocratic — zero cartoonish floating dots.
 */
export function GoldStarLozenge({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
    </svg>
  );
}

/**
 * Classical Haute Joaillerie Faceted Diamond
 */
export function LuxuryDiamond({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="12" y1="22" x2="9" y2="9" />
      <line x1="12" y1="22" x2="15" y2="9" />
      <line x1="6" y1="3" x2="9" y2="9" />
      <line x1="18" y1="3" x2="15" y2="9" />
    </svg>
  );
}

/**
 * Essence Teardrop / Hydro-Distillation Drop
 */
export function LuxuryDrop({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 9a3 3 0 0 1 3 3" opacity="0.6" />
    </svg>
  );
}

/**
 * Haute Parfumerie Atomizer Flacon Vaporizer
 */
export function LuxuryAtomizer({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Bottle Body */}
      <rect x="5" y="10" width="14" height="12" rx="3" />
      {/* Neck */}
      <path d="M9 10V6h6v4" />
      {/* Spray Nozzle */}
      <path d="M8 6h8" />
      <path d="M12 4v2" />
      {/* Mist Rays */}
      <path d="M19 4l2-1" />
      <path d="M20 7l2 1" />
      <path d="M19 10l2 1" />
    </svg>
  );
}

/**
 * Imperial Laurel / Terroir Craft Seal
 */
export function LuxuryCrown({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M4 19h16" />
    </svg>
  );
}
