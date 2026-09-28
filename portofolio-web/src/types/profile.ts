export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  tiktok: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface PersonalInfo {
  name: string;
  shortName?: string;
  role?: string;
  headline?: string;
  subheadline?: string;
  about?: string;
  tagline: string;
  bio: string;
  status?: string;
  location: string;
  email: string;
  phone?: string;
  avatar?: string;
  resumeUrl: string;
  socialLinks: SocialLinks;
  stats?: StatItem[];
}
