export type ProjectCategory = 'all' | 'ai-ml' | 'systems' | 'web-cloud' | 'mobile';

export interface ProjectArchitecture {
  problemSolved: string;
  pipelineDescription: string;
  keyInnovations: string[];
  systemComponents: {
    name: string;
    description: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: ProjectCategory[];
  stack: string[];
  architecture: ProjectArchitecture;
  paperInfo?: {
    title: string;
    conference: string;
    status: string;
  };
  competitionInfo?: {
    name: string;
    status: string;
  };
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  statusBadge?: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export type TimelineType = 'research' | 'internship' | 'education' | 'certification';

export interface TimelineItem {
  id: string;
  type: TimelineType;
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  badge?: string;
  linkText?: string;
  linkUrl?: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  location: string;
  statusText: string;
  bioSummary: string;
  bioDetailed: string;
  email: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
  resumeUrl?: string;
  metrics: {
    value: string;
    label: string;
  }[];
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skillCategories: SkillCategory[];
  timeline: TimelineItem[];
}
