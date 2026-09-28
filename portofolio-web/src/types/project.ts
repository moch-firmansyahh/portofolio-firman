export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics?: string;
  year: string;
  demoUrl: string;
  githubUrl: string;
  highlights?: string[];
  featured?: boolean;
}
