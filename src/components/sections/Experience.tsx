"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import TextReveal from "@/components/ui/TextReveal";
import { EXPERIENCE, ACHIEVEMENTS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const achievementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate achievement cards
      achievementRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            delay: i * 0.08,
          }
        );
      });

      // Animate experience timeline entries
      timelineRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="px-6 py-[15vh] md:px-12 lg:px-[10vw]"
    >
      <span
        className="mb-4 inline-block uppercase tracking-[0.3em] text-accent"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
        }}
      >
        (03) Experience
      </span>

      <TextReveal
        as="h2"
        splitBy="words"
        stagger={0.05}
        className="mb-16"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h2)",
          fontWeight: 600,
        }}
      >
        Proven Track Record
      </TextReveal>

      {/* Key Achievements Grid */}
      <div className="mb-20 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {ACHIEVEMENTS.map((achievement, i) => (
          <div
            key={achievement.label}
            ref={(el) => { achievementRefs.current[i] = el; }}
            className="group rounded-lg border border-bg-elevated bg-bg-secondary p-4 transition-colors hover:border-accent/30 lg:p-6"
          >
            <span
              className="block text-accent"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-h3)",
                fontWeight: 600,
              }}
            >
              {achievement.value}
            </span>
            <span
              className="mt-1 block text-text-secondary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {achievement.label}
            </span>
          </div>
        ))}
      </div>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-bg-elevated md:block md:left-[120px] lg:left-[160px]" />

        <div className="space-y-12 md:space-y-16">
          {EXPERIENCE.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.role}`}
              ref={(el) => { timelineRefs.current[i] = el; }}
              className="relative md:pl-[160px] lg:pl-[200px]"
            >
              {/* Period - left side on desktop */}
              <span
                className="mb-2 block text-text-secondary md:absolute md:left-0 md:top-1 md:mb-0 md:w-[100px] md:text-right lg:w-[140px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-label)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {exp.period}
              </span>

              {/* Dot on timeline */}
              <div className="absolute left-[-4px] top-2 hidden h-2 w-2 rounded-full bg-accent md:left-[117px] md:block lg:left-[157px]" />

              {/* Content */}
              <div>
                <h3
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-h3)",
                    fontWeight: 600,
                  }}
                >
                  {exp.role}
                </h3>
                <span
                  className="mb-4 block text-accent"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-small)",
                  }}
                >
                  {exp.company}
                </span>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight) => (
                    <motion.li
                      key={highlight}
                      className="flex gap-3 text-text-secondary"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-small)",
                        lineHeight: 1.6,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
