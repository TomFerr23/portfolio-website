"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const delay = isMobile ? 0.3 : 1.8;
      const tl = gsap.timeline({ delay });

      // 1. Header
      tl.fromTo(
        "[data-hero='header']",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );

      // 2. Name
      tl.fromTo(
        ".hero-char",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.02, ease: "power3.out" },
        "-=0.2"
      );

      // 3. Photo
      tl.fromTo(
        "[data-hero='photo']",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

      // 4. Gradient sweep
      tl.fromTo(
        "[data-hero='sweep']",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.6"
      );

      // 5. Role text
      tl.fromTo(
        "[data-hero='role-left']",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.8"
      );
      tl.fromTo(
        "[data-hero='role-right']",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );

      // 6. Info block
      tl.fromTo(
        "[data-hero='info'] > *",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" },
        "-=0.3"
      );

      // 7. Bottom bar
      tl.fromTo(
        "[data-hero='bottom']",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Scroll parallax
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-hero='content']", {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "80% top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block opacity-0"
        style={char === " " ? { width: "0.25em" } : undefined}
      >
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative h-svh overflow-hidden bg-bg-primary"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-accent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* ── Golden gradient sweep / arc ── */}
      <div
        data-hero="sweep"
        className="absolute z-[1] opacity-0"
        style={{
          width: "250vw",
          height: "250vw",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "-245vw",
          borderRadius: "50%",
          borderTop: "1.5px solid rgba(212,165,116,0.3)",
          boxShadow:
            "0 -80px 200px rgba(212,165,116,0.1), 0 -20px 80px rgba(212,165,116,0.08), 0 -4px 20px rgba(212,165,116,0.12)",
        }}
      />
      {/* Warm glow above the sweep */}
      <div
        data-hero="sweep"
        className="absolute bottom-[2vh] left-1/2 z-[1] -translate-x-1/2 opacity-0"
        style={{
          width: "80vw",
          height: "25vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,165,116,0.1) 0%, transparent 70%)",
          filter: "blur(25px)",
        }}
      />

      {/* ── Hero header ── */}
      <nav
        data-hero="header"
        className="relative z-50 flex items-center justify-between px-6 py-5 opacity-0 md:px-10 lg:px-16"
      >
        {/* TFX Logo */}
        <a href="#" className="flex items-center gap-1.5">
          <div
            className="flex items-center justify-center rounded-md border border-accent/40 px-2 py-1"
            style={{ background: "rgba(116,148,212,0.08)" }}
          >
            <span
              className="text-accent"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              TFX
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="/cv.pdf"
            className="rounded-full border border-accent/40 px-5 py-1.5 text-accent transition-all duration-200 hover:bg-accent/10"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Download CV
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className="h-[1.5px] w-6 bg-text-primary transition-all duration-300"
            style={{
              transform: mobileMenuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
            }}
          />
          <span
            className="h-[1.5px] w-6 bg-text-primary transition-all duration-300"
            style={{
              transform: mobileMenuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="text-text-primary transition-colors duration-200 hover:text-accent"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 6vw, 2rem)",
                    fontWeight: 300,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="/cv.pdf"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: NAV_ITEMS.length * 0.06, duration: 0.3 }}
                className="mt-4 rounded-full border border-accent/40 px-8 py-3 text-accent transition-all duration-200 hover:bg-accent/10"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-small)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Photo (mobile) — cropped & centered v2 ── */}
      <div className="pointer-events-none absolute inset-x-0 top-[15%] z-20 flex translate-x-[3%] justify-center md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero="photo"
          src="/images/hero-cutout-v2.webp"
          alt={SITE_CONFIG.name}
          className="h-[66vh] w-auto opacity-0"
          style={{
            aspectRatio: "939 / 1296",
            objectFit: "contain",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 64%, transparent 78%)",
            maskImage:
              "linear-gradient(to bottom, black 64%, transparent 78%)",
          }}
        />
      </div>

      {/* ── Photo (desktop) — original framing ── */}
      <div className="pointer-events-none absolute inset-x-0 top-[8%] z-20 hidden justify-center md:flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero="photo"
          src="/images/hero-cutout.webp"
          alt={SITE_CONFIG.name}
          className="h-[105vh] w-auto opacity-0"
          style={{
            aspectRatio: "1014 / 1520",
            objectFit: "contain",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 65%, transparent 72%)",
            maskImage:
              "linear-gradient(to bottom, black 65%, transparent 72%)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div
        data-hero="content"
        className="relative z-10 flex h-[calc(100svh-72px)] flex-col"
      >
        {/* Name */}
        <div className="relative z-10 px-4 pt-[2vh] text-center md:px-8 md:pt-[4vh]">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            {renderChars("Tom Ferrari")}
          </h1>
        </div>

        {/* Photo + Role */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Role text flanking — desktop */}
          <div className="pointer-events-none absolute inset-0 z-30 hidden items-center justify-between px-[6vw] md:flex lg:px-[12vw]">
            <span
              data-hero="role-left"
              className="opacity-0"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2.5vw, 2.4rem)",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
              }}
            >
              CTO & Full Stack
            </span>
            <span
              data-hero="role-right"
              className="opacity-0"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2.5vw, 2.4rem)",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
              }}
            >
              AI Developer
            </span>
          </div>

          {/* Role text — mobile */}
          <div
            data-hero="role-left"
            className="relative z-30 mt-auto text-center md:hidden"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.85rem, 3.5vw, 1.1rem)",
              fontWeight: 300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-text-secondary)",
            }}
          >
            CTO & Full Stack AI Developer
          </div>
        </div>

        {/* Info block */}
        <div
          data-hero="info"
          className="flex flex-col items-center gap-2.5 px-6 pb-10 text-center md:items-start md:gap-4 md:px-[6vw] md:pb-16 md:text-left lg:px-[8vw]"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 opacity-0 backdrop-blur-sm">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-emerald-500" />
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
              }}
            >
              Available for work
            </span>
          </div>

          {/* Tagline */}
          <p
            className="max-w-[38ch] opacity-0"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-small)",
              lineHeight: 1.5,
              color: "var(--color-text-secondary)",
            }}
          >
            {SITE_CONFIG.tagline}
          </p>

          {/* CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-accent/30 px-6 py-2.5 text-accent opacity-0 transition-all duration-300 hover:border-accent hover:bg-accent/10"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Get in touch
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Scroll ── */}
      <div
        data-hero="bottom"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 opacity-0 md:flex"
      >
        <div className="flex flex-col items-center gap-1.5">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-text-secondary)",
            }}
          >
            Scroll
          </span>
          <div className="h-6 w-[1px] animate-pulse bg-text-secondary/40" />
        </div>
      </div>
    </section>
  );
}
