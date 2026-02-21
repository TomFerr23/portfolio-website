"use client";

import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section
      id="contact"
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-[15vh] text-center md:px-12 lg:px-[10vw]"
    >
      <span
        className="mb-8 inline-block uppercase tracking-[0.3em] text-accent"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
        }}
      >
        (05) Contact
      </span>

      <TextReveal
        as="h2"
        splitBy="chars"
        stagger={0.02}
        className="mb-4"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-display)",
          fontWeight: 700,
          lineHeight: 0.95,
        }}
      >
        Let&apos;s work
      </TextReveal>

      <TextReveal
        as="h2"
        splitBy="chars"
        stagger={0.02}
        className="mb-12"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-display)",
          fontWeight: 700,
          lineHeight: 0.95,
        }}
      >
        together.
      </TextReveal>

      {/* Email */}
      <MagneticButton className="mb-12" strength={0.2}>
        <motion.button
          onClick={() => copy(SITE_CONFIG.email)}
          className="group relative overflow-hidden rounded-full border border-text-secondary/20 px-8 py-4 transition-colors hover:border-accent"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className="text-text-primary transition-colors group-hover:text-accent"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-body)",
            }}
          >
            {copied ? "Copied!" : SITE_CONFIG.email}
          </span>
        </motion.button>
      </MagneticButton>

      {/* Social Links */}
      <div className="flex gap-8">
        {SOCIAL_LINKS.map((link) => (
          <MagneticButton key={link.label} strength={0.4}>
            <motion.a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors hover:text-accent"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-small)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
              whileHover={{ scale: 1.1 }}
            >
              {link.label}
            </motion.a>
          </MagneticButton>
        ))}
      </div>
    </section>
  );
}
