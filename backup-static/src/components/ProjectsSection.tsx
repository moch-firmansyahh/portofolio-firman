"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 md:py-44 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Featured Projects
          </h2>
        </ScrollReveal>

        {/* Projects 2-Column Responsive Grid with Layout Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS.map((project, index) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              distance={40}
              duration={0.7}
              delay={index * 0.15}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="group flex flex-col justify-between bg-white rounded-2xl md:rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all duration-300 overflow-hidden h-full">
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 group-hover:text-black transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-black inline-flex items-center gap-1.5 group/btn cursor-pointer underline underline-offset-4"
                      >
                        <span>Lihat Project</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <motion.a
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-200 transition-colors"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} Live demo`}
                          className="p-2 rounded-xl bg-[#0D0D0D] hover:bg-neutral-800 text-white transition-colors shadow-xs"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
