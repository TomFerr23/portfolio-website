"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { lerp } from "@/lib/utils";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const isTouch = useMediaQuery("(hover: none)");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      setIsHovering(true);
      if (cursorType === "view") {
        setCursorText("View");
      } else if (cursorType === "link") {
        setCursorText("");
      }
    };

    const onMouseLeaveInteractive = () => {
      setIsHovering(false);
      setCursorText("");
    };

    const animate = () => {
      dotPos.x = lerp(dotPos.x, mouse.x, 0.9);
      dotPos.y = lerp(dotPos.y, mouse.y, 0.9);
      ringPos.x = lerp(ringPos.x, mouse.x, 0.15);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.15);

      dot.style.transform = `translate3d(${dotPos.x - 4}px, ${dotPos.y - 4}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x - 20}px, ${ringPos.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, [data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    raf = requestAnimationFrame(animate);

    // Re-observe DOM changes for new interactive elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll("a, button, [data-cursor]");
      newElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [isTouch, reducedMotion, isHovering]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-text-primary mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-text-primary mix-blend-difference transition-[width,height,transform] duration-300"
        style={{ willChange: "transform" }}
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
