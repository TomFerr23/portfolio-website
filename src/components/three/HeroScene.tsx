"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Scene />
    </div>
  );
}
