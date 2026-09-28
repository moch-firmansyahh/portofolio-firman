"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolioData";
import ScrollReveal from "./ScrollReveal";

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 md:py-44 bg-[#F1F5F9]/50 border-t border-[#E2E8F0] relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Pengalaman &amp; Perjalanan.
          </h2>
        </ScrollReveal>

        {/* Timeline List with dynamic scroll-linked animated center line */}
        <div
          ref={containerRef}
          className="relative max-w-3xl mx-auto space-y-12 before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-neutral-200"
        >
          {/* Animated drawing line on scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-4 md:left-1/2 -translate-x-px w-0.5 bg-neutral-900 z-0 origin-top shadow-xs"
          />

          {EXPERIENCES.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-6 md:gap-12`}
              >
                {/* Timeline node with pulsing halo */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-neutral-900 shadow-xs z-10">
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-neutral-900/20 -z-10"
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                </div>

                {/* Content Card with ScrollReveal */}
                <div className="ml-10 md:ml-0 w-full md:w-[calc(50%-2rem)]">
                  <ScrollReveal
                    direction={isEven ? "left" : "right"}
                    distance={35}
                    duration={0.65}
                    delay={index * 0.1}
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-neutral-200 shadow-xs hover:shadow-md transition-all duration-300 cursor-default"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 text-xs font-bold shadow-xs">
                          {exp.period}
                        </span>
                        <span className="text-xs text-neutral-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-[#64748B] mb-3">
                        {exp.company}
                      </p>

                      <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Tech Used */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E2E8F0]">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] font-medium text-[#0F172A]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
