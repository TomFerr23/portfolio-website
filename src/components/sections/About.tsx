"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import TextReveal from "@/components/ui/TextReveal";

const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 1, suffix: "M+", label: "Monthly Revenue" },
  { value: 8, suffix: "+", label: "Team Members" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Accent line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Stats count up
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].value;
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.value).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 py-[15vh] md:px-12 lg:px-[10vw]"
    >
      <span
        className="mb-12 inline-block uppercase tracking-[0.3em] text-accent"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
        }}
      >
        (01) About
      </span>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Image */}
        <div>
          <div
            ref={imageRef}
            className="relative aspect-[3/4] overflow-hidden rounded-lg"
          >
            <Image
              src="/images/profile.jpg"
              alt="Tom Ferrari"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div
            ref={lineRef}
            className="mt-4 h-[2px] bg-accent"
          />
        </div>

        {/* Right: Bio + Stats */}
        <div className="flex flex-col justify-center">
          <TextReveal
            as="h2"
            splitBy="words"
            stagger={0.04}
            className="mb-8 font-light leading-[1.3]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
            }}
          >
            I&apos;m Tom, a CTO and full stack developer who scales e-commerce platforms to €1M+ monthly revenue through technical excellence and AI-powered innovation.
          </TextReveal>

          <TextReveal
            as="p"
            splitBy="words"
            stagger={0.02}
            className="mb-12 leading-relaxed text-text-secondary"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
            }}
          >
            With expertise spanning AI automation, performance optimization, and data-driven growth strategies, I build products that don&apos;t just look great — they convert, perform, and scale. Every line of code is written with intention, every metric tracked with purpose.
          </TextReveal>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex items-baseline gap-1">
                  <span
                    ref={(el) => { statRefs.current[i] = el; }}
                    className="text-accent"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-h2)",
                      fontWeight: 600,
                    }}
                  >
                    0
                  </span>
                  <span
                    className="text-accent"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-h3)",
                    }}
                  >
                    {stat.suffix}
                  </span>
                </div>
                <span
                  className="mt-1 block text-text-secondary"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-label)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
