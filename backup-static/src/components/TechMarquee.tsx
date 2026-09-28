"use client";

import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Next.js",
  "C++",
  "Python",
  "Java",
  "Go (Golang)",
  "Git & GitHub",
  "VS Code",
  "Figma",
  "Wireshark",
  "MySQL Workbench",
  "Google AI Certified",
];

export default function TechMarquee() {
  return (
    <div className="py-6 bg-[#FFFFFF] border-y border-[#E2E8F0] overflow-hidden select-none relative shadow-xs">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-8 items-center will-change-transform transform-gpu"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 26,
        }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-4 text-sm sm:text-base font-bold text-neutral-500 tracking-tight uppercase group hover:text-black transition-colors"
          >
            <span className="text-neutral-900 group-hover:text-black transition-colors">
              {item}
            </span>
            <span className="text-neutral-300 font-mono select-none">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
