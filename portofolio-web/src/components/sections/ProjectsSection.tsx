"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS as DEFAULT_PROJECTS } from "@/data/portfolioData";
import type { Project } from "@/types/project";
import { getProjects } from "@/services/portfolio";
import { supabase } from "@/lib/supabase/client";
import ScrollReveal from "@/components/effects/ScrollReveal";
import TiltCard from "@/components/effects/TiltCard";

export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<Project[]>(DEFAULT_PROJECTS);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    async function loadDynamicProjects() {
      try {
        const liveProjects = await getProjects();
        if (isMounted && liveProjects && liveProjects.length > 0) {
          setProjectsList(liveProjects);
        }
      } catch (err) {
        console.warn("⚠️ Failed to fetch live projects, staying with static defaults:", err);
      }
    }
    loadDynamicProjects();

    // Realtime Supabase Subscription untuk Proyek
    const channel = supabase
      .channel("realtime-projects-web")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          loadDynamicProjects();
        }
      )
      .subscribe();

    window.addEventListener("focus", loadDynamicProjects);

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
      window.removeEventListener("focus", loadDynamicProjects);
    };
  }, []);

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-32 md:py-44 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Featured Projects.
          </h2>
        </ScrollReveal>

        {/* Projects 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projectsList.map((project, index) => {
            const hasImgError = imgErrors[project.id];
            const displayImage = hasImgError
              ? "/projects/manajemen-kontrakan.png"
              : project.image || "/projects/manajemen-kontrakan.png";

            return (
              <ScrollReveal
                key={project.id || `project-${index}`}
                direction="up"
                distance={40}
                duration={0.7}
                delay={index * 0.15}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="group flex flex-col justify-between bg-white rounded-2xl md:rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all duration-300 overflow-hidden h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
                      <Image
                        src={displayImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized={displayImage?.startsWith("http")}
                        onError={() => handleImageError(project.id)}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-1 justify-between min-w-0">
                      <div className="min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 group-hover:text-black transition-colors mb-3 break-words [overflow-wrap:anywhere]">
                          {project.title}
                        </h3>

                        <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6 break-words [overflow-wrap:anywhere]">
                          {project.description}
                        </p>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6 min-w-0">
                            {project.tags.map((tag, tIdx) => (
                              <span
                                key={`${tag}-${tIdx}`}
                                className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold max-w-full truncate"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                        <Link
                          href={`/projects/${project.id}`}
                          className="text-sm font-semibold text-neutral-900 hover:text-black inline-flex items-center gap-1.5 group/btn cursor-pointer"
                        >
                          <span>Lihat Detail Studi Kasus</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </Link>

                        <div className="flex items-center gap-3">
                          {project.githubUrl && project.githubUrl !== "#" && (
                            <motion.a
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} GitHub repository`}
                              className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black transition-colors"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </motion.a>
                          )}
                          {project.demoUrl && project.demoUrl !== "#" && (
                            <motion.a
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} Live demo`}
                              className="p-2.5 rounded-full bg-neutral-900 hover:bg-black text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
