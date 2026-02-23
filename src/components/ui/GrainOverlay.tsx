"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function GrainOverlay() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Disable grain on mobile — SVG feTurbulence filter is a GPU hog
  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04]"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
