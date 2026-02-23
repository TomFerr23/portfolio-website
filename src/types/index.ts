export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  video?: string;
  url: string;
  year: string;
}

export interface Skill {
  category: string;
  items: string[];
  span?: number;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Achievement {
  value: string;
  label: string;
}
