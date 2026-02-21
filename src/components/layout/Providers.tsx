"use client";

import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap-config";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Preloader from "@/components/sections/Preloader";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Providers({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (reducedMotion) {
      setIsLoading(false);
      return;
    }

    const lenisInstance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Stop scroll during preloader
    lenisInstance.stop();

    lenisRef.current = lenisInstance;

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, [reducedMotion]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.start();
      // Refresh ScrollTrigger after content is visible
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, []);

  return (
    <>
      {!reducedMotion && (
        <Preloader isLoading={isLoading} onComplete={handlePreloaderComplete} />
      )}
      <CustomCursor />
      <GrainOverlay />
      <div
        style={{
          opacity: isLoading && !reducedMotion ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
