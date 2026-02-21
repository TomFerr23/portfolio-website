"use client";

import TextReveal from "@/components/ui/TextReveal";
import SkillCard from "@/components/ui/SkillCard";
import { SKILLS } from "@/lib/constants";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-[15vh] md:px-12 lg:px-[10vw]">
      <span
        className="mb-4 inline-block uppercase tracking-[0.3em] text-accent"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
        }}
      >
        (04) Expertise
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
        Skills & Technologies
      </TextReveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.category} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
