"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticleFieldProps {
  mouseX: number;
  mouseY: number;
}

export default function ParticleField({ mouseX, mouseY }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Reduced particle count for better performance
  const particleCount = 800;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 2;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.02;

    targetRotation.current.x = mouseY * 0.3;
    targetRotation.current.y = mouseX * 0.3;

    pointsRef.current.rotation.x +=
      (targetRotation.current.x - pointsRef.current.rotation.x) * 0.02;

    // Invalidate to keep rendering (since we use frameloop="demand")
    state.invalidate();
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#7494D4"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}
