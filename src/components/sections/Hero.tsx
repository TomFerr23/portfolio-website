"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import HeroScene from "@/components/three/HeroScene";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { SITE_CONFIG } from "@/lib/constants";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 }); // After preloader

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        line1Ref.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        line2Ref.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll parallax - fade out content as user scrolls
  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh items-center justify-center overflow-hidden"
    >
      <HeroScene />

      <div ref={contentRef} className="relative z-10 px-6 text-center md:px-12">
        <span
          ref={labelRef}
          className="mb-6 inline-block uppercase tracking-[0.3em] text-accent opacity-0"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
          }}
        >
          {SITE_CONFIG.role}
        </span>

        <div className="overflow-hidden">
          <div
            ref={line1Ref}
            className="opacity-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Tom
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={line2Ref}
            className="opacity-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Ferrari
          </div>
        </div>

        <p
          ref={taglineRef}
          className="mx-auto mt-8 max-w-[40ch] text-text-secondary opacity-0"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
          }}
        >
          {SITE_CONFIG.tagline}
        </p>
      </div>

      <ScrollIndicator />
    </section>
  );
}
