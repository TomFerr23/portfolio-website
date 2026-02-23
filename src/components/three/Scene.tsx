"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import ParticleField from "./ParticleField";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop="demand"
    >
      <SceneInner />
    </Canvas>
  );
}

function SceneInner() {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <>
      <ParticleField mouseX={normalizedX} mouseY={normalizedY} />
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
