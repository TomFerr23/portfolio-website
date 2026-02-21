"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span
        className="text-text-secondary uppercase tracking-[0.3em]"
        style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-label)" }}
      >
        Scroll
      </span>
      <motion.div
        className="h-8 w-[1px] bg-text-secondary"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
