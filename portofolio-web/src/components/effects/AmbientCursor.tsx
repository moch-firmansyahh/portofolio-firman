"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AmbientCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Soft atmospheric glow spring physics dari design awal
  const springGlowConfig = { damping: 28, stiffness: 140, mass: 0.8 };
  const glowX = useSpring(mouseX, springGlowConfig);
  const glowY = useSpring(mouseY, springGlowConfig);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            "button, a, input, textarea, select, [role='button'], .cursor-pointer"
          )
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: glowX,
        y: glowY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.02) 45%, transparent 70%)",
      }}
      animate={{
        scale: isHovered ? 1.25 : 1,
        opacity: isHovered ? 1 : 0.85,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-30 will-change-transform hidden md:block"
    />
  );
}
