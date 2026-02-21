export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
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
