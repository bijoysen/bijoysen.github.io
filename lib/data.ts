export const profile = {
  name: "Bijay Sen",
  firstName: "Bijay",
  lastName: "Sen",
  role: "Frontend Developer",
  greeting: "Hy! I Am",
  tagline: "I build fast, accessible web experiences, and I love what I do.",
  // Career start (June 2012). Years of experience is derived from this date.
  careerStart: "2012-06-01",
  email: "bijoysen2012@gmail.com",
  location: "India",
  cvUrl: "/cv.pdf",
  photo: "/portrait.svg",
  about:
    "I'm a frontend developer focused on building clean, performant, and accessible interfaces. I turn ideas and designs into responsive web apps with modern tooling like React, Next.js, and TypeScript. I care about the little details that make products feel effortless.",
};

export function getYearsOfExperience(from: string = profile.careerStart): number {
  const start = new Date(from);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years -= 1;
  }
  return years;
}

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "twitter" | "linkedin" | "github";
};

export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Twitter", href: "https://twitter.com/", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  title: string;
  description: string;
  icon: "code" | "layout" | "spark" | "device";
};

export const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Building fast, SEO-friendly websites and web apps with React, Next.js, and TypeScript.",
    icon: "code",
  },
  {
    title: "UI Engineering",
    description:
      "Translating Figma designs into pixel-perfect, reusable component systems.",
    icon: "layout",
  },
  {
    title: "Performance",
    description:
      "Optimizing load times, Core Web Vitals, and accessibility for real-world users.",
    icon: "spark",
  },
  {
    title: "Responsive Design",
    description:
      "Crafting layouts that look and feel great across mobile, tablet, and desktop.",
    icon: "device",
  },
];

import type { SkillIconName } from "@/components/Icons";

export type SkillCategory = {
  title: string;
  icon: SkillIconName;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "code",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    icon: "layers",
    items: ["React", "Angular", "Redux", "Vue.js", "jQuery", "Bootstrap"],
  },
  {
    title: "Styling & UI",
    icon: "brush",
    items: [
      "Tailwind CSS",
      "Sass/SCSS",
      "Responsive Design",
      "Cross-browser Compatibility",
      "PSD/Figma to HTML",
    ],
  },
  {
    title: "Build & Tooling",
    icon: "wrench",
    items: [
      "Git",
      "Docker",
      "Webpack",
      "Vite",
      "npm",
      "Yarn",
      "Babel",
      "ESLint",
      "Gulp",
    ],
  },
  {
    title: "APIs & Integration",
    icon: "plug",
    items: ["REST APIs", "AJAX", "JSON", "XML", "GraphQL"],
  },
  {
    title: "Analytics & Tracking",
    icon: "chart",
    items: ["Google Analytics 360"],
  },
  {
    title: "AI-Assisted Development",
    icon: "spark",
    items: ["Cursor", "GitHub Copilot", "Google Gemini Pro"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "E-commerce Storefront",
    description:
      "A responsive online store with cart, filtering, and a fast checkout flow.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Analytics Dashboard",
    description:
      "A data-rich admin dashboard with charts, tables, and dark mode support.",
    tags: ["React", "Charts", "REST API"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Landing Page Kit",
    description:
      "A set of high-converting, animated marketing landing page templates.",
    tags: ["Next.js", "Framer Motion", "SEO"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "Sr. Software Engineer",
    company: "Ericsson India Pvt. Ltd., Kolkata",
    period: "Mar 2022 - Present",
    bullets: [
      "Build and maintain scalable React/JavaScript UIs for enterprise telecom platforms.",
      "Improve performance with code splitting, lazy loading, and asset optimization.",
      "Integrate REST APIs, translate UX designs into responsive cross-browser components.",
      "Mentor juniors and use AI tools (Cursor, Copilot, Gemini) to accelerate delivery.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Indus Net Technologies, Kolkata",
    period: "Nov 2015 - Mar 2022",
    bullets: [
      "Built responsive, pixel-perfect interfaces for global clients using HTML5, CSS3, JS, React, and Angular.",
      "Converted PSD/Figma designs into semantic, SEO-friendly, W3C-compliant markup.",
      "Created reusable component libraries and optimized performance across projects.",
      "Collaborated across teams and supported deployments to deliver milestones on schedule.",
    ],
  },
  {
    role: "Front-End Web Developer",
    company: "Netzrezepte Technologies Pvt. Ltd., Kolkata",
    period: "Nov 2014 - Oct 2015",
    bullets: [
      "Built and maintained responsive websites with HTML, CSS, JavaScript, and jQuery.",
      "Implemented interactive UI features: form validations, sliders, modals, and dynamic content.",
      "Ensured cross-browser/device compatibility and delivered end-to-end solutions on time.",
    ],
  },
  {
    role: "Front-End Web Developer",
    company: "Capital Numbers Infotech, Kolkata",
    period: "Jun 2013 - Nov 2014",
    bullets: [
      "Created responsive pages and landing pages from Photoshop mockups using HTML5, CSS3, and JS.",
      "Integrated templates with CMS/PHP backends and added AJAX-driven dynamic content.",
      "Used Bootstrap and CSS preprocessors within Agile sprints for consistent delivery.",
    ],
  },
  {
    role: "Trainee Web Designer",
    company: "Evika Systems, Kolkata",
    period: "Jun 2012 - Jun 2013",
    bullets: [
      "Coded static and dynamic pages with HTML, CSS, and basic JavaScript under senior guidance.",
      "Built wireframe-aligned layouts and learned web standards, typography, and UI composition.",
      "Performed cross-browser testing and supported client site updates.",
    ],
  },
];
