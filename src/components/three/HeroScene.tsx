"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

export default function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // On mobile: Aceternity-inspired aurora background
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-bg-primary" />

        {/* Aurora container - blurred gradient blobs with slow movement */}
        <div
          className="absolute inset-0"
          style={{ filter: "blur(60px) saturate(1.5)", opacity: 0.3 }}
        >
          {/* Primary aurora blob */}
          <div
            className="aurora-blob-1 absolute"
            style={{
              width: "80vw",
              height: "80vw",
              top: "10%",
              left: "-10%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #7494D4 0%, #4A6FA5 40%, transparent 70%)",
            }}
          />

          {/* Secondary aurora blob */}
          <div
            className="aurora-blob-2 absolute"
            style={{
              width: "70vw",
              height: "70vw",
              top: "25%",
              right: "-15%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #9AB4E8 0%, #6B7FBF 35%, transparent 70%)",
            }}
          />

          {/* Deep accent blob */}
          <div
            className="aurora-blob-3 absolute"
            style={{
              width: "60vw",
              height: "60vw",
              bottom: "15%",
              left: "20%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #3D5A80 0%, #2C4A6E 40%, transparent 70%)",
            }}
          />

          {/* Highlight shimmer */}
          <div
            className="aurora-blob-4 absolute"
            style={{
              width: "50vw",
              height: "50vw",
              top: "35%",
              left: "30%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, #B8CCEC 0%, #7494D4 30%, transparent 65%)",
            }}
          />
        </div>

        {/* Subtle noise overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Radial vignette to fade edges into dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, #0A0A0A 100%)",
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
