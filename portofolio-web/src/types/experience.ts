export interface ExperienceItem {
  id?: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies?: string[];
  type?: "Work" | "Education" | "Freelance" | string;
}
