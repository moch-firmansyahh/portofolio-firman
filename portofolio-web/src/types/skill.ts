export interface Skill {
  id?: string;
  name: string;
  level?: "Core" | "Proficient" | "Advanced" | "Expert" | string;
  percent?: number | string;
  logo?: string;
  highlight?: boolean;
  issuer?: string;
  issueDate?: string;
  credentialId?: string;
  category?: string;
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: Skill[];
}
