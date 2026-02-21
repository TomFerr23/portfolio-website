import { Project, Skill, SocialLink } from "@/types";

export const SITE_CONFIG = {
  name: "Tommaso Ferrari",
  role: "Fullstack Developer",
  email: "hello@tommasoferrari.com",
  location: "Italy",
  timezone: "Europe/Rome",
  tagline: "Building digital experiences that blend design and engineering into seamless, performant products.",
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Project Alpha",
    description: "A full-stack SaaS platform built with modern web technologies, featuring real-time collaboration and AI-powered insights.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AI"],
    image: "/images/project-1.jpg",
    url: "#",
    year: "2025",
  },
  {
    id: "02",
    title: "Project Beta",
    description: "E-commerce platform with headless CMS integration, optimized for performance and conversion.",
    tags: ["React", "Node.js", "Stripe", "Headless CMS"],
    image: "/images/project-2.jpg",
    url: "#",
    year: "2025",
  },
  {
    id: "03",
    title: "Project Gamma",
    description: "Interactive data visualization dashboard for real-time analytics and monitoring.",
    tags: ["D3.js", "WebSocket", "Go", "Dashboard"],
    image: "/images/project-3.jpg",
    url: "#",
    year: "2024",
  },
  {
    id: "04",
    title: "Project Delta",
    description: "Mobile-first progressive web app with offline capabilities and native-like experience.",
    tags: ["PWA", "React Native", "GraphQL", "AWS"],
    image: "/images/project-4.jpg",
    url: "#",
    year: "2024",
  },
];

export const SKILLS: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "Framer Motion"],
    span: 2,
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL", "REST APIs"],
  },
  {
    category: "DevOps & Cloud",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Vercel"],
  },
  {
    category: "Tools & Workflow",
    items: ["Git", "Figma", "VS Code", "Linux", "Agile", "Testing"],
    span: 2,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com" },
  { label: "LinkedIn", url: "https://linkedin.com" },
  { label: "Twitter", url: "https://twitter.com" },
];

export const NAV_ITEMS = ["About", "Work", "Skills", "Contact"];
