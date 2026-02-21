"use client";

import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-GB", {
        timeZone: SITE_CONFIG.timezone,
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-bg-elevated px-6 py-6 md:px-12 lg:px-[10vw]">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span
          className="text-text-secondary"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            letterSpacing: "0.05em",
          }}
        >
          Local time — {time} CET (NL)
        </span>

        <span
          className="text-text-secondary"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
          }}
        >
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
        </span>
      </div>
    </footer>
  );
}
