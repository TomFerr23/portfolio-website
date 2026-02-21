"use client";

import { useRef, useEffect, CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import SplitType from "split-type";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  splitBy?: "chars" | "words" | "lines";
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  triggerStart?: string;
  once?: boolean;
}

export default function TextReveal({
  children,
  as = "div",
  splitBy = "words",
  stagger = 0.03,
  className = "",
  style,
  delay = 0,
  triggerStart = "top 85%",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const el = ref.current;
    const split = new SplitType(el, {
      types: splitBy === "chars" ? "chars,words" : splitBy,
    });

    const targets =
      splitBy === "chars" ? split.chars : splitBy === "words" ? split.words : split.lines;

    if (!targets) return;

    gsap.set(targets, { y: "100%", opacity: 0 });

    if (splitBy === "chars" || splitBy === "words") {
      const wrappers = el.querySelectorAll(".word");
      wrappers.forEach((w) => {
        (w as HTMLElement).style.overflow = "hidden";
        (w as HTMLElement).style.display = "inline-block";
      });
    }

    if (splitBy === "lines") {
      targets.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
    }

    const tween = gsap.to(targets, {
      y: "0%",
      opacity: 1,
      stagger,
      duration: 0.8,
      ease: "power3.out",
      delay,
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      split.revert();
    };
  }, [children, splitBy, stagger, delay, triggerStart, once, reducedMotion]);

  const Tag = as;

  return (
    // Always use a div wrapper for the ref, render semantic tag inside
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
