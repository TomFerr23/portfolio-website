"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden"
    >
      {/* Label */}
      <span
        className="absolute left-6 top-8 z-10 uppercase tracking-[0.3em] text-accent md:left-12 lg:left-[10vw]"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
        }}
      >
        (02) Selected Work
      </span>

      {/* Horizontal track */}
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
