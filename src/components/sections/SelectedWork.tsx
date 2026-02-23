"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // On mobile: use native horizontal scroll (no GSAP pin)
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: native horizontal scroll
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="work"
        className="relative py-[10vh]"
      >
        <span
          className="mb-8 block px-6 uppercase tracking-[0.3em] text-accent"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
          }}
        >
          (02) Selected Work
        </span>

        <div className="relative">
          <div
            className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Scroll hint arrow */}
          <div className="pointer-events-none absolute right-0 top-0 flex h-full w-12 items-center justify-center bg-gradient-to-l from-bg-primary/80 to-transparent">
            <svg
              className="scroll-hint-arrow h-5 w-5 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <style jsx>{`
            @keyframes nudge-right {
              0%, 100% { transform: translateX(0); opacity: 0.6; }
              50% { transform: translateX(4px); opacity: 1; }
            }
            .scroll-hint-arrow {
              animation: nudge-right 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </section>
    );
  }

  // Desktop: GSAP horizontal scroll with pin
  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden"
    >
      <span
        className="absolute left-6 top-8 z-10 uppercase tracking-[0.3em] text-accent md:left-12 lg:left-[10vw]"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
        }}
      >
        (02) Selected Work
      </span>

      <div
        ref={trackRef}
        className="flex h-svh items-center gap-8 pl-6 pr-[10vw] pt-16 md:gap-12 md:pl-12 lg:pl-[10vw]"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
