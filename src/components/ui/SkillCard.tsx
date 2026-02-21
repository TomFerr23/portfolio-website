"use client";

import { motion } from "framer-motion";
import { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="rounded-xl border border-transparent bg-bg-elevated p-6 md:p-8"
      style={{
        gridColumn: skill.span ? `span ${skill.span}` : undefined,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.33, 1, 0.68, 1],
      }}
      whileHover={{
        borderColor: "rgba(116, 148, 212, 0.2)",
        y: -4,
        transition: { duration: 0.3 },
      }}
    >
      <span
        className="mb-2 block text-accent"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
          letterSpacing: "0.1em",
        }}
      >
        0{index + 1}
      </span>

      <h3
        className="mb-4"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h3)",
          fontWeight: 600,
        }}
      >
        {skill.category}
      </h3>

      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-bg-primary bg-bg-primary px-3 py-1 text-text-secondary"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-small)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
