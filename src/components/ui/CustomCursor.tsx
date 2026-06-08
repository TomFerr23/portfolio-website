"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { lerp } from "@/lib/utils";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const hoveringRef = useRef(false);
  const isTouch = useMediaQuery("(hover: none)");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let raf: number;
    let started = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Dot tracks the pointer 1:1 — zero lag.
      dot.style.transform = `translate3d(${mouse.x - 4}px, ${mouse.y - 4}px, 0)`;
      if (!started) {
        started = true;
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorType = target
        .closest("[data-cursor]")
        ?.getAttribute("data-cursor");
      hoveringRef.current = true;
      setCursorText(cursorType === "view" ? "View" : "");
    };

    const onMouseLeaveInteractive = () => {
      hoveringRef.current = false;
      setCursorText("");
    };

    const animate = () => {
      // Tighter follow → far less "laggy" feel (was 0.15).
      ringPos.x = lerp(ringPos.x, mouse.x, 0.35);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.35);
      ring.style.transform = `translate3d(${ringPos.x - 18}px, ${ringPos.y - 18}px, 0) scale(${hoveringRef.current ? 1.6 : 1})`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);

    const bind = (el: Element) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    };
    const unbind = (el: Element) => {
      el.removeEventListener("mouseenter", onMouseEnterInteractive);
      el.removeEventListener("mouseleave", onMouseLeaveInteractive);
    };

    let bound = Array.from(document.querySelectorAll("a, button, [data-cursor]"));
    bound.forEach(bind);

    raf = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => {
      const next = Array.from(
        document.querySelectorAll("a, button, [data-cursor]")
      );
      bound.forEach(unbind);
      bound = next;
      bound.forEach(bind);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      bound.forEach(unbind);
      observer.disconnect();
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-text-primary mix-blend-difference"
        style={{ willChange: "transform", opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-9 w-9 items-center justify-center rounded-full border border-text-primary mix-blend-difference"
        style={{ willChange: "transform", opacity: 0 }}
      >
        {cursorText && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-text-primary">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
