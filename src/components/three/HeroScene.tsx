"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

export default function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // On mobile: lightweight animated CSS scene instead of 3D
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-bg-primary" />

        {/* Breathing glow orb */}
        <div
          className="hero-orb absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(70vw, 320px)",
            height: "min(70vw, 320px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.15,
            filter: "blur(40px)",
          }}
        />

        {/* Floating ring 1 */}
        <div
          className="hero-ring-1 absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(55vw, 250px)",
            height: "min(55vw, 250px)",
            borderRadius: "50%",
            border: "1px solid var(--color-accent)",
            opacity: 0.08,
          }}
        />

        {/* Floating ring 2 */}
        <div
          className="hero-ring-2 absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(90vw, 420px)",
            height: "min(90vw, 420px)",
            borderRadius: "50%",
            border: "1px solid var(--color-accent)",
            opacity: 0.05,
          }}
        />

        <style jsx>{`
          @keyframes breathe {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.12; }
            50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.2; }
          }
          @keyframes float-ring-1 {
            0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.08) rotate(180deg); }
          }
          @keyframes float-ring-2 {
            0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(0.95) rotate(-180deg); }
          }
          .hero-orb {
            animation: breathe 6s ease-in-out infinite;
          }
          .hero-ring-1 {
            animation: float-ring-1 10s ease-in-out infinite;
          }
          .hero-ring-2 {
            animation: float-ring-2 14s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Scene />
    </div>
  );
}
