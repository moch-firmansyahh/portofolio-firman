"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Terminal,
  Code2,
  Layers,
  Cpu,
  FileCode,
  Palette,
  Layout,
  GitBranch,
  Database,
  LayoutGrid,
  ShieldCheck,
  Award,
  Users,
  Clock,
  Briefcase,
  Wrench,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1c0 2.8.7 5.4 1.9 7.8l3.7-2.9z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
      />
    </svg>
  );
}

function getSkillIcon(name: string, isCert = false) {
  const n = name.toLowerCase();
  if (isCert || n.includes("google")) return <GoogleLogo className="w-5 h-5" />;
  if (n.includes("react") || n.includes("next")) return <Layers className="w-5 h-5" />;
  if (n.includes("javascript")) return <FileCode className="w-5 h-5" />;
  if (n.includes("html")) return <Layout className="w-5 h-5" />;
  if (n.includes("css") || n.includes("tailwind")) return <Palette className="w-5 h-5" />;
  if (n.includes("python")) return <Terminal className="w-5 h-5" />;
  if (n.includes("java") && !n.includes("javascript")) return <Code2 className="w-5 h-5" />;
  if (n.includes("c++") || n.includes("golang") || n.includes("go")) return <Cpu className="w-5 h-5" />;
  if (n.includes("git")) return <GitBranch className="w-5 h-5" />;
  if (n.includes("figma")) return <LayoutGrid className="w-5 h-5" />;
  if (n.includes("postman")) return <Send className="w-5 h-5" />;
  if (n.includes("antigravity")) return <Sparkles className="w-5 h-5" />;
  if (n.includes("wireshark") || n.includes("security")) return <ShieldCheck className="w-5 h-5" />;
  if (n.includes("mysql") || n.includes("database") || n.includes("data design")) return <Database className="w-5 h-5" />;
  if (n.includes("vs code")) return <FileCode className="w-5 h-5" />;
  if (n.includes("collaboration") || n.includes("team")) return <Users className="w-5 h-5" />;
  if (n.includes("time management")) return <Clock className="w-5 h-5" />;
  if (n.includes("problem-solving") || n.includes("troubleshooting")) return <Wrench className="w-5 h-5" />;
  if (n.includes("analytical")) return <Cpu className="w-5 h-5" />;
  if (n.includes("client")) return <Briefcase className="w-5 h-5" />;
  if (n.includes("certificate") || n.includes("training") || n.includes("dicoding"))
    return <Award className="w-5 h-5" />;
  return <Code2 className="w-5 h-5" />;
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const skillCardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="skills" className="py-32 md:py-44 bg-[#F1F5F9]/60 border-y border-[#E2E8F0] relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Keahlian Teknis &amp; Pencapaian.
          </h2>
        </motion.div>

        {/* Category Tabs with Animated Sliding Pill Indicator */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SKILL_CATEGORIES.map((category, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={category.title}
                onClick={() => setActiveTab(index)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "text-white"
                    : "text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 hover:border-neutral-400 shadow-xs"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategoryPill"
                    className="absolute inset-0 bg-[#0D0D0D] rounded-xl shadow-md z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid with Animated Entrance & Minimalist Editorial Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`grid-${activeTab}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className={`grid gap-4 md:gap-5 ${
              activeTab === 4
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {SKILL_CATEGORIES[activeTab].skills.map((skill) => {
              const isCertTab = activeTab === 4;
              const percentValue =
                skill.level === "Expert"
                  ? "95%"
                  : skill.level === "Advanced"
                  ? "85%"
                  : skill.level === "Proficient"
                  ? "75%"
                  : "100%";

              return (
                <motion.div
                  key={skill.name}
                  variants={skillCardVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`group relative p-5 sm:p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-md cursor-default flex flex-col justify-between ${
                    skill.highlight
                      ? "border-neutral-300 shadow-xs hover:border-neutral-900"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center bg-white border border-neutral-200 shadow-xs transition-transform duration-300 group-hover:scale-105">
                          {getSkillIcon(skill.name, isCertTab)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm sm:text-[15px] text-neutral-900 group-hover:text-black transition-colors leading-snug">
                            {skill.name}
                          </h4>
                          <span className="text-xs text-neutral-500 font-medium mt-0.5 block">
                            {isCertTab
                              ? `${skill.issuer || "Google"} • ${skill.issueDate || "Jun 2026"}`
                              : skill.level}
                          </span>
                        </div>
                      </div>

                      {isCertTab ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 text-[10px] font-mono font-semibold uppercase tracking-wider shrink-0">
                          {skill.level}
                        </span>
                      ) : skill.highlight ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 text-[10px] font-mono font-semibold uppercase tracking-wider shrink-0">
                          Core
                        </span>
                      ) : null}
                    </div>

                    {/* Credential ID info for Certificates */}
                    {isCertTab && skill.credentialId && (
                      <div className="mb-3 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200/80 text-[11px] font-mono text-neutral-600 flex items-center justify-between">
                        <span className="text-neutral-400 font-medium">ID:</span>
                        <span className="font-semibold text-neutral-800 select-all">
                          {skill.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Level / Verification Footer */}
                  {isCertTab ? (
                    <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-neutral-700 font-semibold">Verified Credential</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">Google</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                      <div className="flex justify-between items-center text-[11px] font-mono text-neutral-500">
                        <span>Proficiency</span>
                        <span className="font-semibold text-neutral-900">{percentValue}</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: percentValue }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            skill.highlight ? "bg-neutral-900" : "bg-neutral-600"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
