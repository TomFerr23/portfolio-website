"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Autoplay video when card enters viewport via IntersectionObserver
  useEffect(() => {
    if (!project.video || !cardRef.current) return;

    const card = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay blocked — poster stays visible */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [project.video]);

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target={project.url.startsWith("http") ? "_blank" : undefined}
      rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
      data-cursor="view"
      className="group relative block h-[50vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-lg md:h-[70vh] md:w-[75vw]"
      whileHover="hover"
    >
      {/* Media layer */}
      <motion.div
        className="absolute inset-0"
        variants={{
          hover: { scale: 1.05 },
        }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Fallback / poster */}
        <div className="absolute inset-0 bg-bg-elevated">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-secondary" />
        </div>

        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              project.video && isVideoLoaded ? "opacity-0" : "opacity-100"
            }`}
            sizes="85vw"
          />
        )}

        {/* Video overlay */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            poster={project.image}
            onCanPlayThrough={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
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
