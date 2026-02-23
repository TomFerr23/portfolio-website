"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Autoplay video when card enters viewport
  useEffect(() => {
    if (!project.video || !cardRef.current) return;

    const card = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [project.video]);

  // Mobile: toggle details on tap
  const handleClick = (e: React.MouseEvent) => {
    if (!isMobile) return;
    if (!showDetails && project.description) {
      e.preventDefault();
      setShowDetails(true);
    }
    // second tap follows the link (if url is set)
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target={project.url.startsWith("http") ? "_blank" : undefined}
      rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
      data-cursor="view"
      className="group relative block h-[50vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-lg md:h-auto md:w-[70vw]"
      style={{ aspectRatio: isMobile ? undefined : "3024 / 1534" }}
      onClick={handleClick}
      onHoverStart={() => !isMobile && setShowDetails(true)}
      onHoverEnd={() => !isMobile && setShowDetails(false)}
    >
      {/* Media layer */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: showDetails ? 1.03 : 1 }}
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
            className={`object-contain transition-opacity duration-500 ${
              project.video && isVideoLoaded ? "opacity-0" : "opacity-100"
            }`}
            sizes="85vw"
          />
        )}

        {/* Video */}
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
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </motion.div>

      {/* Bottom gradient — always present (light), gets stronger on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "45%" }}
        animate={{
          background: showDetails
            ? "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.25) 50%, transparent 100%)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Always visible: project number + title + pills */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 md:px-10 md:pb-8">
        <span
          className="mb-1 block text-accent"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            letterSpacing: "0.1em",
          }}
        >
          {project.id}
        </span>

        <h3
          className="mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h3)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>

        {/* Description — reveals on hover / tap */}
        <AnimatePresence>
          {showDetails && project.description && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-[600px] overflow-hidden text-text-primary/80"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-small)",
                lineHeight: 1.5,
              }}
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-text-primary"
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
          <span
            className="pl-1 text-text-secondary"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
            }}
          >
            {project.year}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
