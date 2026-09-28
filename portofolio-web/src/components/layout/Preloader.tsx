"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    // 60fps/120fps display refresh synchronized progress (~2.2s loading)
    const totalDuration = 2200;
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressRatio = Math.min(elapsed / totalDuration, 1);

      // Smooth easeOutQuad progress curve
      const easedProgress = progressRatio * (2 - progressRatio);
      const currentPercent = Math.round(easedProgress * 100);

      setProgress(currentPercent);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Unblock scroll immediately at 100% and dismiss preloader
        document.body.style.overflow = "unset";
        setIsLoading(false);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader-slideup"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.1, // Slower, buttery-smooth curtain lift
              ease: [0.76, 0, 0.24, 1], // Award-winning custom cubic bezier
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F8F9FA] bg-grain-texture select-none overflow-hidden will-change-transform"
        >
          {/* Center Brand & Loading Counter */}
          <div className="flex flex-col items-center text-center space-y-4 px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
              {PERSONAL_INFO.name}
            </h1>

            {/* Subtitle with percentage */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-neutral-500 font-medium">
              <span>PORTFOLIO LOADING</span>
              <span className="font-bold text-neutral-900 font-mono min-w-[40px] text-left">
                {progress}%
              </span>
            </div>

            {/* Continuous Fluid Progress Loading Bar */}
            <div className="w-52 sm:w-64 h-[2px] bg-neutral-200 overflow-hidden relative rounded-full mt-2">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-neutral-900 rounded-full transition-[width] duration-75 ease-out will-change-[width]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
