"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

export default function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // On mobile: skip the entire 3D canvas, use a lightweight CSS gradient instead
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-primary" />
        {/* Subtle radial glow to replace 3D particles */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, var(--color-accent) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Scene />
    </div>
  );
}
