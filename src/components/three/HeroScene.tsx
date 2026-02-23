"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

export default function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // On mobile: Aceternity-inspired aurora + grid + spotlight
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-bg-primary" />

        {/* ── Dot grid pattern (Aceternity style) ── */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #7494D4 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── Aurora gradient blobs — vivid layer ── */}
        <div
          className="absolute inset-0"
          style={{ filter: "blur(80px) saturate(2)", opacity: 0.5 }}
        >
          <div
            className="aurora-blob-1 absolute"
            style={{
              width: "100vw",
              height: "100vw",
              top: "-10%",
              left: "-30%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #7494D4 0%, #4A6FA5 35%, transparent 65%)",
            }}
          />
          <div
            className="aurora-blob-2 absolute"
            style={{
              width: "90vw",
              height: "90vw",
              top: "15%",
              right: "-30%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #9AB4E8 0%, #5B7EC2 30%, transparent 65%)",
            }}
          />
          <div
            className="aurora-blob-3 absolute"
            style={{
              width: "80vw",
              height: "80vw",
              bottom: "0%",
              left: "10%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #3D5A80 0%, #2C4A6E 35%, transparent 65%)",
            }}
          />
        </div>

        {/* ── Spotlight beam from top center ── */}
        <div
          className="aurora-spotlight absolute"
          style={{
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "140vw",
            height: "80vh",
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(116,148,212,0.15) 48%, rgba(154,180,232,0.08) 50%, rgba(116,148,212,0.15) 52%, transparent 60%)",
          }}
        />

        {/* ── Center glow pulse ── */}
        <div
          className="aurora-pulse absolute left-1/2 top-[38%]"
          style={{
            width: "50vw",
            height: "50vw",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(116,148,212,0.25) 0%, rgba(116,148,212,0.08) 40%, transparent 70%)",
          }}
        />

        {/* ── Radial vignette — fades edges into dark ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, transparent 20%, #0A0A0A 100%)",
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
