"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Show navbar after scrolling past the hero
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["about", "work", "experience", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: visible ? 0 : -100,
      opacity: visible ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [visible]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sectionMap: Record<string, string> = {
    About: "about",
    Work: "work",
    Experience: "experience",
    Skills: "skills",
    Contact: "contact",
  };

  return (
    <nav
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-40 -translate-y-[100px] opacity-0"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12 lg:px-[10vw]">
        {/* Backdrop */}
        <div className="absolute inset-0 border-b border-bg-elevated/50 bg-bg-primary/80 backdrop-blur-md" />

        {/* Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative z-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-small)",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
          data-cursor="link"
        >
          {SITE_CONFIG.name}
        </button>

        {/* Desktop Nav */}
        <div className="relative z-10 hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const id = sectionMap[item];
            const isActive = activeSection === id;
            return (
              <button
                key={item}
                onClick={() => scrollTo(id)}
                className="relative transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-label)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: isActive
                    ? "var(--color-accent)"
                    : "var(--color-text-secondary)",
                }}
                data-cursor="link"
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                  />
                )}
              </button>
            );
          })}

          {/* CV Download */}
          <a
            href="/Tom-Ferrari-CV.pdf"
            download
            className="rounded-full border border-accent/40 px-4 py-1.5 text-accent transition-colors hover:border-accent hover:bg-accent/10"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
            data-cursor="link"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-10 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          data-cursor="link"
          aria-label="Menu"
        >
          <span
            className="block h-px w-5 bg-text-primary transition-transform duration-300"
            style={{
              transform: mobileOpen
                ? "rotate(45deg) translate(2px, 2px)"
                : "none",
            }}
          />
          <span
            className="block h-px w-5 bg-text-primary transition-all duration-300"
            style={{
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-5 bg-text-primary transition-transform duration-300"
            style={{
              transform: mobileOpen
                ? "rotate(-45deg) translate(2px, -2px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden border-b border-bg-elevated/50 bg-bg-primary/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_ITEMS.map((item) => {
                const id = sectionMap[item];
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(id)}
                    className="text-left transition-colors"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-small)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color:
                        activeSection === id
                          ? "var(--color-accent)"
                          : "var(--color-text-secondary)",
                    }}
                  >
                    {item}
                  </button>
                );
              })}
              <a
                href="/Tom-Ferrari-CV.pdf"
                download
                className="mt-2 inline-block w-fit rounded-full border border-accent/40 px-4 py-1.5 text-accent"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-small)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
