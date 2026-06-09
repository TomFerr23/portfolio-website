"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";

const ROLE_LEFT = "CTO & Full Stack";
const ROLE_RIGHT = "AI Developer";
const ROLE_FULL = "CTO & Full Stack AI Developer";

const CAPS = [
  {
    n: "01",
    title: "Forward Deployed Engineering",
    sub: "Embedded with your team, shipping in your stack.",
  },
  {
    n: "02",
    title: "Vibe-Coding · Rapid Shipping",
    sub: "Idea to production in days, not quarters.",
  },
  {
    n: "03",
    title: "Systems Architecture",
    sub: "Tailored, scalable foundations for the business.",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // ── Entrance animation ──
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const delay = isMobile ? 0.3 : 1.8;
      const tl = gsap.timeline({ delay });

      // Editorial accents
      tl.fromTo(
        "[data-hero='accent']",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Header
      tl.fromTo(
        "[data-hero='header']",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.6"
      );

      // Name — mask-wipe reveal (chars rise from behind clip)
      tl.fromTo(
        ".hero-char",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.035,
          ease: "power4.out",
        },
        "-=0.2"
      );

      // Photo
      tl.fromTo(
        "[data-hero='photo']",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Gradient sweep
      tl.fromTo(
        "[data-hero='sweep']",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.6"
      );

      // Role text — slide in, then scramble/decode
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
      tl.to(
        "[data-hero='role-left']",
        {
          duration: 1.3,
          scrambleText: { text: "{original}", chars: "upperCase", speed: 0.5 },
        },
        "-=0.4"
      );
      tl.to(
        "[data-hero='role-right']",
        {
          duration: 1.3,
          scrambleText: { text: "{original}", chars: "upperCase", speed: 0.5 },
        },
        "<"
      );

      // Info block
      tl.fromTo(
        "[data-hero='info'] > *",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" },
        "-=0.9"
      );

      // Bottom bar
      tl.fromTo(
        "[data-hero='bottom']",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // Pulsing horizon — subtle breathing loop (atmosphere)
      gsap.to("[data-hero='sweep']", {
        opacity: 0.7,
        duration: 4.5,
        delay: delay + 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // ── Scroll parallax (content fades out) + scroll progress ──
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero='content']",
        { y: 0, opacity: 1 },
        {
          y: -60,
          opacity: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "70% top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 600);
    window.addEventListener("load", refresh);

    // Site-wide scroll progress bar
    const onScroll = () => {
      if (!progressRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progressRef.current.style.transform = `scaleY(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  // ── Magnetic CTA ──
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "elastic.out(1,0.4)" });

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── Live local time (Den Haag / Europe-Amsterdam) ──
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => {
      if (clockRef.current) {
        clockRef.current.textContent = `Den Haag · ${fmt.format(new Date())}`;
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const renderChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block opacity-0"
        style={char === " " ? { width: "0.25em" } : undefined}
      >
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative h-svh overflow-hidden bg-bg-primary"
    >
      {/* ── Scroll progress (site-wide, right edge) ── */}
      <div className="pointer-events-none fixed right-0 top-0 z-[60] h-screen w-[2px] bg-white/[0.04]">
        <div
          ref={progressRef}
          className="h-full w-full origin-top bg-accent/60"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-accent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* drifting aurora blobs */}
        <div
          className="aurora-blob-1 absolute"
          style={{
            top: "-20%",
            left: "-15%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(116,148,212,0.10) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="aurora-blob-2 absolute"
          style={{
            bottom: "-25%",
            right: "-15%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,165,116,0.08) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        {/* animated film grain */}
        <div
          className="grain-anim absolute opacity-[0.05] mix-blend-soft-light"
          style={{
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ── Editorial accents (desktop) ── */}
      <div
        data-hero="accent"
        className="pointer-events-none absolute inset-6 z-40 hidden opacity-0 md:block lg:inset-8"
      >
        <span className="absolute left-0 top-0 h-7 w-7 border-l border-t border-accent/25" />
        <span className="absolute right-0 top-0 h-7 w-7 border-r border-t border-accent/25" />
        <span className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-accent/25" />
        <span className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-accent/25" />
      </div>

      {/* Vertical edge labels (desktop) — right is a live clock */}
      <span
        ref={clockRef}
        data-hero="accent"
        className="absolute right-7 top-1/2 z-40 hidden -translate-y-1/2 opacity-0 md:block lg:right-9"
        style={{
          writingMode: "vertical-rl",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--color-text-secondary)",
        }}
      >
        Den Haag
      </span>
      <span
        data-hero="accent"
        className="absolute left-7 top-1/2 z-40 hidden -translate-y-1/2 opacity-0 md:block lg:left-9"
        style={{
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--color-text-secondary)",
        }}
      >
        Portfolio © 2026
      </span>

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

      {/* ── Photo (mobile) ── */}
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
            maskImage: "linear-gradient(to bottom, black 64%, transparent 78%)",
          }}
        />
      </div>

      {/* ── Photo (desktop) ── */}
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
            maskImage: "linear-gradient(to bottom, black 65%, transparent 72%)",
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
            className="overflow-hidden pb-[0.08em]"
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
              {ROLE_LEFT}
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
              {ROLE_RIGHT}
            </span>
          </div>

          <div
            data-hero="role-left"
            className="relative z-30 mt-auto mb-7 text-center md:hidden"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.9rem, 3.6vw, 1.15rem)",
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(245, 240, 235, 0.9)",
            }}
          >
            {ROLE_FULL}
          </div>
        </div>

        {/* Info block — left stack + right capabilities index */}
        <div
          data-hero="info"
          className="relative flex flex-col items-center gap-4 px-6 pb-10 text-center md:flex-row md:items-end md:justify-between md:px-[6vw] md:pb-16 md:text-left lg:px-[8vw]"
        >
          {/* Left: badge, tagline, CTA */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-500" />
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
              className="max-w-[38ch]"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-small)",
                lineHeight: 1.5,
                color: "var(--color-text-secondary)",
              }}
            >
              {SITE_CONFIG.tagline}
            </p>

            {/* CTA row — prominent gold primary + quiet secondary */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                ref={ctaRef}
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3 font-semibold text-bg-primary transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#D4A574",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-label)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  boxShadow: "0 8px 30px -8px rgba(212,165,116,0.5)",
                }}
              >
                Get in touch
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-1.5 text-text-secondary transition-colors duration-200 hover:text-text-primary"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-label)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                View work
                <span className="block h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
              </a>
            </div>

            {/* Reassurance microcopy */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                opacity: 0.7,
              }}
            >
              Usually replies within 24h · Den Haag (CET)
            </span>
          </div>

          {/* Right: numbered capabilities index (desktop) */}
          <div className="hidden flex-col gap-5 border-t border-accent/15 pt-5 text-right md:flex">
            {CAPS.map((cap) => (
              <div key={cap.n} className="group flex flex-col items-end">
                <div className="flex items-baseline justify-end gap-2.5">
                  <span
                    className="text-accent transition-opacity duration-300"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.2em",
                      opacity: 0.7,
                    }}
                  >
                    {cap.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {cap.title}
                  </span>
                </div>
                <span
                  className="mt-1 max-w-[30ch]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    lineHeight: 1.45,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {cap.sub}
                </span>
              </div>
            ))}
          </div>
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
