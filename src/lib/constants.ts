import { Project, Skill, SocialLink, Experience, Achievement } from "@/types";

export const SITE_CONFIG = {
  name: "Tom Ferrari",
  role: "CTO & Full Stack Developer",
  email: "tomferrari.dev@gmail.com",
  location: "Den Haag, Netherlands",
  timezone: "Europe/Amsterdam",
  tagline: "Scaling e-commerce platforms to €1M+ monthly revenue through AI-powered automation, performance optimization, and data-driven growth strategies.",
};

export const EXPERIENCE: Experience[] = [
  {
    role: "CTO",
    company: "ECP Agency & The Cocoa Circle",
    period: "February 2023 — Present",
    highlights: [
      "Lead dual CTO responsibilities across two companies, managing a team of 8+ and coordinating external agencies",
      "Architected e-commerce platforms generating €1M+ monthly revenue with 3% conversion rate improvement",
      "Reduced page load time by 40%, achieving 'Good' Core Web Vitals scores across all properties",
      "Pioneered AI integration (Claude, GPT-4, Gemini) reducing manual work tasks by 60%",
      "Achieved first-page rankings for 150+ keywords; improved organic traffic by 25% YoY",
      "Collaborated on €500K+/month ad campaigns (Meta, TikTok, Pinterest), improving ROAS by 35%",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "ECP Agency",
    period: "February 2022 — February 2023",
    highlights: [
      "Developed responsive websites using React, Tailwind CSS, and Shopify theme customisation for e-commerce",
      "Built custom Shopify and WordPress solutions; implemented CI/CD pipelines reducing deployment time by 70%",
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { value: "€1M+", label: "Monthly Revenue" },
  { value: "40%", label: "Faster Page Speed" },
  { value: "+25%", label: "Organic Traffic YoY" },
  { value: "€500K+", label: "Monthly Ad Spend" },
  { value: "3%", label: "Conversion Rate Lift" },
  { value: "8+", label: "Team Size" },
  { value: "100+", label: "Page 1 Keywords" },
  { value: "+35%", label: "ROAS Improvement" },
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Bracelet Customizer",
    description: "Headless e-commerce product configurator synced with Shopify — real-time inventory, drag-and-drop charm placement, and a conversion-optimized checkout flow that became the brand's primary revenue engine.",
    tags: ["React", "Shopify API", "Headless Commerce", "Node.js"],
    image: "/images/project-1.jpg",
    video: "/videos/charms-customizer.mp4",
    url: "#",
    year: "2024",
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
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    span: 2,
  },
  {
    category: "Backend",
    items: ["Node.js", "REST APIs", "GraphQL"],
  },
  {
    category: "AI Tools",
    items: ["Claude Code", "ChatGPT API", "Gemini", "Perplexity"],
  },
  {
    category: "E-commerce",
    items: ["Shopify", "WooCommerce", "WordPress"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "React Native"],
  },
  {
    category: "SEO & Analytics",
    items: ["SEMrush", "Ahrefs", "Screaming Frog", "Google Search Console", "GA4", "Hotjar"],
    span: 2,
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "GitHub Actions", "Vercel", "Netlify", "Monday", "Jira"],
    span: 2,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", url: "https://linkedin.com/in/tommaso-ferrari-it" },
  { label: "GitHub", url: "https://github.com" },
];

export const NAV_ITEMS = ["About", "Work", "Experience", "Skills", "Contact"];
