"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.a
      href={project.url}
      data-cursor="view"
      className="group relative block h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-lg md:w-[75vw]"
      whileHover="hover"
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        variants={{
          hover: { scale: 1.05 },
        }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="absolute inset-0 bg-bg-elevated">
          {/* Placeholder gradient when no image */}
          <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-secondary" />
        </div>
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="85vw"
          />
        )}
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <span
          className="mb-2 block text-accent"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            letterSpacing: "0.1em",
          }}
        >
          {project.id}
        </span>

        <h3
          className="mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h2)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>

        <div className="mb-3 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-text-secondary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          className="text-text-secondary"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
          }}
        >
          {project.year}
        </span>
      </div>
    </motion.a>
  );
}
