import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, ArrowUpRight, Calendar, CheckCircle2, Layers, Globe, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Moch. Firmansyah",
    };
  }

  return {
    title: `${project.title} — Case Study | Moch. Firmansyah`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[projectIndex];

  if (!project) {
    notFound();
  }

  // Filter other projects
  const otherProjects = PROJECTS.filter((p) => p.id !== id);

  return (
    <div className="min-h-screen bg-[#F8F9FA] bg-grain-texture text-[#0F172A] py-12 md:py-20 px-6 md:px-12 selection:bg-neutral-900 selection:text-white">
      <div className="max-w-[1000px] mx-auto space-y-12 md:space-y-16">
        {/* Top Bar / Back button */}
        <div className="flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-200 hover:border-neutral-900 text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Portofolio</span>
          </Link>
        </div>

        {/* Project Hero Header */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 font-medium leading-relaxed max-w-2xl">
              {project.subtitle}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0D0D0D] hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Kunjungi Website Live</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200 font-semibold text-sm transition-colors shadow-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Code GitHub</span>
            </a>
          </div>
        </div>

        {/* Cover Showcase Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-200 shadow-md bg-neutral-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1000px"
            className="object-cover"
          />
        </div>

        {/* Detailed Case Study Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          {/* Left / Main Column: Overview & Highlights */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <section className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                <Globe className="w-4 h-4 text-neutral-900" />
                <span>Overview &amp; Tujuan Proyek</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                Latar Belakang &amp; Solusi
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {project.longDescription}
              </p>
            </section>

            {/* Key Features & Architecture Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                  <Layers className="w-4 h-4 text-neutral-900" />
                  <span>Fitur &amp; Arsitektur Utama</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  Kemampuan Sistem
                </h2>
                <div className="space-y-4">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700 font-medium leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Metadata & Tech Stack */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                <Code2 className="w-4 h-4 text-neutral-900" />
                <span>Teknologi Digunakan</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-900 text-xs font-semibold border border-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Specs Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Informasi Proyek
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Kategori</span>
                  <span className="font-semibold text-neutral-900">{project.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Tahun</span>
                  <span className="font-semibold text-neutral-900">{project.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Status</span>
                  <span className="font-semibold text-neutral-900">Live Production</span>
                </div>
                {project.metrics && (
                  <div className="pt-2">
                    <span className="text-neutral-500 block mb-1">Sorotan</span>
                    <span className="font-semibold text-neutral-900 block text-xs">
                      {project.metrics}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Section with full rich Cards */}
        {otherProjects.length > 0 && (
          <section className="pt-16 border-t border-neutral-200 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                  Proyek Lainnya
                </h2>
              </div>
              <Link
                href="/#projects"
                className="text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-2 underline underline-offset-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Lihat Semua Proyek di Beranda</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((otherProj) => (
                <div
                  key={otherProj.id}
                  className="group flex flex-col justify-between bg-white rounded-2xl md:rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
                    <Image
                      src={otherProj.image}
                      alt={otherProj.title}
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
                          {otherProj.title}
                        </h3>
                      </div>

                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6">
                        {otherProj.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {otherProj.tags.map((tag) => (
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
                        href={`/projects/${otherProj.id}`}
                        className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-black inline-flex items-center gap-1.5 group/btn cursor-pointer underline underline-offset-4"
                      >
                        <span>Lihat Project</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <a
                          href={otherProj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${otherProj.title} GitHub repository`}
                          className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-200 transition-colors"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                        <a
                          href={otherProj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${otherProj.title} Live demo`}
                          className="p-2 rounded-xl bg-[#0D0D0D] hover:bg-neutral-800 text-white transition-colors shadow-xs"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
