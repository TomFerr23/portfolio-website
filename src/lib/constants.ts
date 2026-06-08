import { Project, Skill, SocialLink, Experience, Achievement } from "@/types";

export const SITE_CONFIG = {
  name: "Tom Ferrari",
  role: "CTO & Full Stack AI Developer",
  email: "tomferrari.dev@gmail.com",
  location: "Den Haag, Netherlands",
  timezone: "Europe/Amsterdam",
  tagline: "I build custom AI solutions with token-optimized architectures that cut costs up to 70%, full-context memory via knowledge graphs and Obsidian, and intelligent automation that helps businesses scale.",
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
    title: "Jarvis",
    description:
      "A personal AI command center for marketing teams. Generate on-brand images with full brand context preloaded, spin up custom specialist agents (funnels, email, ads, copy, CRO), upload and RAG over your own memory, and route any task to the right specialist — all backed by persistent long-term memory that compounds over time.",
    tags: ["Next.js", "Claude API", "RAG Memory", "Custom Agents", "Image Gen"],
    image: "/images/project-jarvis.jpg",
    url: "#",
    year: "2026",
  },
  {
    id: "02",
    title: "Bracelet Customizer",
    description: "Headless e-commerce product configurator synced with Shopify — real-time inventory, drag-and-drop charm placement, and a conversion-optimized checkout flow that became the brand's primary revenue engine.",
    tags: ["React", "Shopify Storefront API", "GraphQL", "Embedded App"],
    image: "/images/project-1.jpg",
    video: "/videos/charms-customizer.mp4",
    url: "#",
    year: "2025",
  },
  {
    id: "03",
    title: "FinanceFlow",
    description: "Personal finance dashboard with real-time portfolio tracking, spending analytics by category, currency conversion, and stock watchlist — built as a full-stack side project to sharpen data visualization skills.",
    tags: ["Next.js", "TypeScript", "Redux", "Tailwind CSS"],
    image: "/images/project-2.jpg",
    url: "https://financeflow-teal-ten.vercel.app",
    year: "2025",
  },
  {
    id: "04",
    title: "Second Brain",
    description:
      "A living knowledge graph in Obsidian that connects every note, folder, and link into one interconnected memory. It feeds full, structured context into my AI agents — turning scattered docs into retrievable long-term memory via RAG, so the system always works with complete brand and project context.",
    tags: ["Obsidian", "Knowledge Graph", "RAG", "Memory", "Markdown"],
    image: "/images/project-obsidian.jpg",
    url: "#",
    year: "2026",
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
    category: "SEO & GEO",
    items: ["GEO / AI Visibility", "AI Search Optimization", "SEMrush", "Ahrefs", "Screaming Frog", "Google Search Console", "GA4", "Hotjar"],
    span: 2,
  },
  {
    category: "Workflow & Deploy",
    items: ["Vibe Coding", "Rapid Prototyping", "Fast Deploy / CI-CD", "Git", "GitHub Actions", "Vercel"],
    span: 2,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", url: "https://linkedin.com/in/tommaso-ferrari-it" },
  { label: "GitHub", url: "https://github.com" },
];

export const NAV_ITEMS = ["About", "Work", "Experience", "Skills", "Contact"];
