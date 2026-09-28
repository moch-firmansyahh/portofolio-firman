"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Sparkles, Calendar } from "lucide-react";
import { GithubIcon } from "./icons";
import Image from "next/image";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0F172A] border border-[#E2E8F0] shadow-soft transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Image Header */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#F1F5F9]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
            <div className="absolute bottom-4 left-6 sm:left-8">
              <span className="px-3 py-1 rounded-full bg-[#0D0D0D] text-white text-xs font-semibold shadow-xs">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-20rem)] overflow-y-auto">
            <div>
              <div className="flex items-center gap-3 text-xs text-[#64748B] mb-1">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.year}
                </span>
                {project.metrics && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-neutral-900">
                      {project.metrics}
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                {project.title}
              </h3>
              <p className="text-base text-[#64748B] mt-1 font-medium">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <div className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              <p>{project.longDescription}</p>
            </div>

            {/* Key Features / Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  <Sparkles className="w-4 h-4 text-neutral-900" />
                  <span>Fitur &amp; Arsitektur Utama</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
                Technologies &amp; Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#0F172A] text-xs font-medium border border-[#E2E8F0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E2E8F0]">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0D0D0D] hover:bg-neutral-800 text-white font-semibold text-sm transition-all duration-200 shadow-xs"
              >
                <span>Kunjungi Website Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-900 hover:text-black font-semibold text-sm transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
