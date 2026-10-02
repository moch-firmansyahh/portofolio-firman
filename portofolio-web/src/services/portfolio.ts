import { supabase } from "@/lib/supabase/client";
import {
  PROJECTS as STATIC_PROJECTS,
  SKILL_CATEGORIES as STATIC_SKILL_CATEGORIES,
  PERSONAL_INFO as STATIC_PERSONAL_INFO,
  EXPERIENCES as STATIC_EXPERIENCES,
} from "@/data/portfolioData";
import type { Project } from "@/types/project";
import type { Skill, SkillCategory } from "@/types/skill";
import type { PersonalInfo } from "@/types/profile";
import type { ExperienceItem } from "@/types/experience";

// Database row schemas for type-safe Supabase mapping
interface DbProjectRow {
  id: string | number;
  title?: string;
  subtitle?: string;
  category?: string;
  image?: string;
  description?: string;
  long_description?: string;
  longDescription?: string;
  tags?: string[] | null;
  metrics?: string | null;
  year?: string | number;
  demo_url?: string;
  demoUrl?: string;
  github_url?: string;
  githubUrl?: string;
  highlights?: string[] | null;
  featured?: boolean;
}

interface DbSkillRow {
  id?: string | number;
  name: string;
  category?: string;
  level?: string;
  percent?: number | string;
  logo?: string;
  highlight?: boolean;
  issuer?: string;
  issue_date?: string;
  issueDate?: string;
  credential_id?: string;
  credentialId?: string;
}

interface DbProfileRow {
  name?: string;
  role?: string;
  headline?: string;
  subheadline?: string;
  about?: string;
  tagline?: string;
  bio?: string;
  status?: string;
  shortName?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  resume_url?: string;
  resumeUrl?: string;
  social_links?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
  };
}

interface DbExperienceRow {
  id?: string | number;
  period?: string;
  role?: string;
  company?: string;
  location?: string;
  description?: string;
  technologies?: string[] | null;
}

/**
 * Wrapper Promise.race dengan timeout dan penanganan rejection yang aman.
 * Menghindari unhandled promise rejection dan memory leak timer.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`⏳ Supabase query timed out after ${ms}ms. Using fallback data.`);
      resolve(fallback);
    }, ms);
  });

  const safePromise = promise
    .then((res) => {
      clearTimeout(timer);
      return res;
    })
    .catch((err) => {
      clearTimeout(timer);
      console.warn("⚠️ Supabase query failed:", err instanceof Error ? err.message : err);
      return fallback;
    });

  return Promise.race([safePromise, timeoutPromise]);
}

/**
 * Mengambil daftar proyek dari Supabase, dengan fallback ke static data
 */
export async function getProjects(): Promise<Project[]> {
  const fetchPromise = (async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase projects error:", error.message);
      return STATIC_PROJECTS;
    }

    const rows = data as unknown as DbProjectRow[];
    return rows.map((d) => ({
      id: String(d.id),
      title: d.title || "",
      subtitle: d.subtitle || "",
      category: d.category || "Web App",
      image: d.image || "/projects/manajemen-kontrakan.png",
      description: d.description || "",
      longDescription: d.long_description || d.longDescription || d.description || "",
      tags: Array.isArray(d.tags) ? d.tags : [],
      metrics: d.metrics || undefined,
      year: String(d.year || "2024"),
      demoUrl: d.demo_url || d.demoUrl || "#",
      githubUrl: d.github_url || d.githubUrl || "#",
      highlights: Array.isArray(d.highlights) ? d.highlights : [],
      featured: Boolean(d.featured),
    }));
  })();

  return withTimeout(fetchPromise, 3500, STATIC_PROJECTS);
}

/**
 * Mengambil satu proyek berdasarkan ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  const normalized = decodeURIComponent(id).toLowerCase().trim();
  const found = projects.find((p) => {
    if (String(p.id).toLowerCase() === normalized) return true;
    const titleSlug = (p.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return titleSlug === normalized;
  });
  return found || null;
}

/**
 * Mengambil daftar kategori keahlian dari Supabase
 */
export async function getSkillCategories(): Promise<SkillCategory[]> {
  const fetchPromise = (async (): Promise<SkillCategory[]> => {
    const { data, error } = await supabase
      .from("skills")
      .select("*");

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase skills error:", error.message);
      return STATIC_SKILL_CATEGORIES;
    }

    const rows = data as unknown as DbSkillRow[];
    const categoryMap = new Map<string, Skill[]>();

    rows.forEach((row) => {
      const cat = row.category || "Technical Skills";
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
      }
      categoryMap.get(cat)!.push({
        id: row.id ? String(row.id) : undefined,
        name: row.name,
        category: cat,
        level: row.level || "Proficient",
        percent: row.percent,
        logo: row.logo,
        highlight: Boolean(row.highlight),
        issuer: row.issuer,
        issueDate: row.issue_date || row.issueDate,
        credentialId: row.credential_id || row.credentialId,
      });
    });

    // Urutan standar agar tab utama tetap rapi di awal, diikuti kategori baru dari admin
    const predefinedOrder = [
      "Front-End Web Development",
      "Programming Languages",
      "Developer Tools",
      "Soft Skills & Professional",
      "Achievements & Certifications",
    ];

    const result: SkillCategory[] = [];
    predefinedOrder.forEach((title) => {
      if (categoryMap.has(title)) {
        result.push({ title, skills: categoryMap.get(title)! });
        categoryMap.delete(title);
      }
    });

    // Kategori kustom baru yang ditambahkan dari admin (seperti "Backend")
    categoryMap.forEach((skills, title) => {
      result.push({ title, skills });
    });

    return result.length > 0 ? result : STATIC_SKILL_CATEGORIES;
  })();

  return withTimeout(fetchPromise, 3500, STATIC_SKILL_CATEGORIES);
}

/**
 * Mengambil data profil dari Supabase
 */
export async function getProfile(): Promise<PersonalInfo> {
  const fetchPromise = (async (): Promise<PersonalInfo> => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Supabase profile error:", error.message);
      return STATIC_PERSONAL_INFO;
    }

    const row = data as unknown as DbProfileRow;
    const social = row.social_links || row.socialLinks || {};

    return {
      name: row.name || STATIC_PERSONAL_INFO.name,
      shortName: row.shortName || STATIC_PERSONAL_INFO.shortName,
      role: row.role || row.headline || STATIC_PERSONAL_INFO.role,
      headline: row.headline,
      subheadline: row.subheadline || row.about || STATIC_PERSONAL_INFO.subheadline,
      about: (row.about && row.about.trim().length > 0) ? row.about : STATIC_PERSONAL_INFO.about,
      tagline: (row.tagline && row.tagline.trim().length > 0) ? row.tagline : STATIC_PERSONAL_INFO.tagline,
      bio: (row.bio && row.bio.trim().length > 0) ? row.bio : STATIC_PERSONAL_INFO.bio,
      status: row.status || STATIC_PERSONAL_INFO.status,
      location: row.location || STATIC_PERSONAL_INFO.location,
      email: row.email || STATIC_PERSONAL_INFO.email,
      phone: row.phone || STATIC_PERSONAL_INFO.phone,
      avatar: row.avatar,
      resumeUrl: row.resume_url || row.resumeUrl || STATIC_PERSONAL_INFO.resumeUrl,
      socialLinks: {
        github: social.github || STATIC_PERSONAL_INFO.socialLinks.github,
        linkedin: social.linkedin || STATIC_PERSONAL_INFO.socialLinks.linkedin,
        instagram: social.instagram || STATIC_PERSONAL_INFO.socialLinks.instagram,
        tiktok: social.tiktok || STATIC_PERSONAL_INFO.socialLinks.tiktok,
      },
      stats: STATIC_PERSONAL_INFO.stats,
    };
  })();

  return withTimeout(fetchPromise, 3500, STATIC_PERSONAL_INFO);
}

const MONTH_NAMES_MAP: Record<string, number> = {
  jan: 1, januari: 1, january: 1,
  feb: 2, februari: 2, february: 2,
  mar: 3, maret: 3, march: 3,
  apr: 4, april: 4,
  mei: 5, may: 5,
  jun: 6, juni: 6, june: 6,
  jul: 7, juli: 7, july: 7,
  agu: 8, ags: 8, agust: 8, agustus: 8, aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  okt: 10, oct: 10, oktober: 10, october: 10,
  nov: 11, nop: 11, november: 11,
  des: 12, dec: 12, desember: 12, december: 12,
};

function parseSingleDateScore(str?: string, isEnd = false): number {
  if (!str) return 0;
  const s = str.trim().toLowerCase();
  if (["present", "sekarang", "current", "saat ini", "now", "skrg"].some((k) => s.includes(k))) {
    return 999999;
  }
  const yearMatch = s.match(/\b(19\d\d|20\d\d)\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 0;
  if (!year) return 0;

  let month = isEnd ? 12 : 1;
  for (const [mName, mNum] of Object.entries(MONTH_NAMES_MAP)) {
    const regex = new RegExp(`\\b${mName}\\b`, "i");
    if (regex.test(s)) {
      month = mNum;
      break;
    }
  }
  return year * 100 + month;
}

export function sortExperiences<T extends { period?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const periodA = a.period || "";
    const periodB = b.period || "";

    const partsA = periodA.split(/\s*(?:[-–—/]|to|s\/d|sampai|until)\s*/i).filter(Boolean);
    const partsB = periodB.split(/\s*(?:[-–—/]|to|s\/d|sampai|until)\s*/i).filter(Boolean);

    const endA = partsA.length >= 2 ? parseSingleDateScore(partsA[partsA.length - 1], true) : parseSingleDateScore(partsA[0], false);
    const endB = partsB.length >= 2 ? parseSingleDateScore(partsB[partsB.length - 1], true) : parseSingleDateScore(partsB[0], false);

    if (endA !== endB) {
      return endB - endA;
    }

    const startA = parseSingleDateScore(partsA[0], false);
    const startB = parseSingleDateScore(partsB[0], false);
    return startB - startA;
  });
}

/**
 * Mengambil daftar riwayat pendidikan & pengalaman dari Supabase
 */
export async function getExperiences(): Promise<ExperienceItem[]> {
  const fetchPromise = (async (): Promise<ExperienceItem[]> => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*");

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase experiences error:", error.message);
      return sortExperiences(STATIC_EXPERIENCES);
    }

    const rows = data as unknown as DbExperienceRow[];
    const mapped = rows.map((row) => ({
      id: row.id ? String(row.id) : undefined,
      period: row.period || "",
      role: row.role || "",
      company: row.company || "",
      location: row.location || "",
      description: row.description || "",
      technologies: Array.isArray(row.technologies) ? row.technologies : [],
    }));

    return sortExperiences(mapped);
  })();

  return withTimeout(fetchPromise, 3500, sortExperiences(STATIC_EXPERIENCES));
}
