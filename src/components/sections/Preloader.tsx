"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap-config";

interface PreloaderProps {
  isLoading: boolean;
  onComplete: () => void;
}

export default function Preloader({ isLoading, onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isLoading || hasAnimated.current) return;
    if (!containerRef.current || !counterRef.current || !nameRef.current) return;

    hasAnimated.current = true;

    const container = containerRef.current;
    const counter = counterRef.current;
    const name = nameRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current();
      },
    });

    const counterObj = { value: 0 };

    // Phase 1: Counter 0 -> 100
    tl.to(counterObj, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) counter.textContent = Math.round(counterObj.value).toString();
      },
    });

    // Phase 2: Counter fades out, name appears
    tl.to(counter, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.fromTo(
      name,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.1"
    );

    // Phase 3: Hold, then exit
    tl.to({}, { duration: 0.4 });

    tl.to(container, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Safety fallback: if animation hasn't completed in 6s, force complete
    const fallback = setTimeout(() => {
      if (isLoading) {
        tl.kill();
        onCompleteRef.current();
      }
    }, 6000);

    return () => {
      clearTimeout(fallback);
      // Don't kill the timeline on cleanup — let it finish
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="relative flex flex-col items-center">
        <span
          ref={counterRef}
          className="text-accent"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
          }}
        >
          0
        </span>
        <div
          ref={nameRef}
          className="absolute text-center opacity-0"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
          }}
        >
          Tom Ferrari
        </div>
      </div>
    </div>
  );
}
