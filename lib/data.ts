export const profile = {
  name: "Bijay Sen",
  firstName: "Bijay",
  lastName: "Sen",
  role: "Frontend Developer",
  greeting: "Hey! I am",
  tagline: "I build fast, accessible web experiences, and I love what I do.",
  // Career start (June 2012). Years of experience is derived from this date.
  careerStart: "2012-06-01",
  email: "bijoysen2012@gmail.com",
  location: "Kolkata, India",
  cvUrl: "/cv.pdf",
  photo: "/portrait.svg",
  about: {
    headline: "Building interfaces that scale",
    paragraphs: [
      "I'm a senior frontend engineer delivering scalable, enterprise-grade web applications for global MNCs and IT services clients across telecom, e-commerce, and media.",
      "My core strengths lie in JavaScript, TypeScript, React, and Angular — backed by deep expertise in HTML5, CSS3, modern UI architecture, performance optimization, REST API integration, and analytics with Google Analytics 360.",
      "Currently serving as Sr. Software Engineer at Ericsson, I ship production frontend solutions within Agile, cross-functional teams. My career has progressed from web design to senior engineering, supported by continuous upskilling and certifications in JavaScript, TypeScript, and Angular.",
    ],
    focusAreas: [
      "Enterprise UI",
      "Performance",
      "REST APIs",
      "Agile Delivery",
      "Tailwind CSS",
      "AI-Assisted Dev",
    ],
  },
};

export function getYearsOfExperience(from: string = profile.careerStart): number {
  return getExperienceDuration(from).years;
}

export function getExperienceDuration(from: string = profile.careerStart): {
  years: number;
  months: number;
} {
  const start = new Date(from);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (now.getDate() < start.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}

export function formatExperienceDuration(
  from: string = profile.careerStart,
): string {
  const { years, months } = getExperienceDuration(from);
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "Year" : "Years"}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "Month" : "Months"}`);
  }
  return parts.length > 0 ? parts.join(" ") : "0 Months";
}

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "twitter" | "linkedin" | "github";
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/bijoysen", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bijoy-sen",
    icon: "linkedin",
  },
];

export const contact = {
  kicker: "Get In Touch",
  title: "Let's Connect",
  description:
    "Exploring senior frontend roles — recruiters and hiring managers, feel free to reach out.",
  availability: "Open to new opportunities",
  timezone: "IST, GMT+5:30",
  privacyNote:
    "Your details are only used to reply to your message and are never shared or sold.",
  // Deployed Apps Script Web App URL (see README "Contact form setup")
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbx1CO2nu3MMHmMHjbH2vm-K_QcLUbMkv9wTttWgDXQQ2ERxONOnhweIhRY9jz-DYw-lrA/exec",
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
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
    title: "Deployment & CI/CD",
    icon: "rocket",
    items: ["Vercel", "GitHub Actions", "GitHub Pages"],
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
      "Architect and maintain scalable React/JavaScript UIs powering enterprise telecom platforms.",
      "Boost application performance through strategic code splitting, lazy loading, and asset optimization.",
      "Integrate complex REST APIs and translate intricate UX designs into responsive, cross-browser components.",
      "Mentor junior engineers and champion AI-assisted workflows (Cursor, Copilot, Gemini) to accelerate delivery.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Indus Net Technologies, Kolkata",
    period: "Nov 2015 - Mar 2022",
    bullets: [
      "Delivered responsive, pixel-perfect interfaces for global clients using HTML5, CSS3, JS, React, and Angular.",
      "Transformed PSD/Figma designs into semantic, SEO-friendly, W3C-compliant markup.",
      "Engineered reusable component libraries that streamlined development and improved performance across projects.",
      "Partnered with cross-functional teams and led deployment support to consistently hit project milestones.",
    ],
  },
  {
    role: "Front-End Web Developer",
    company: "Netzrezepte Technologies Pvt. Ltd., Kolkata",
    period: "Nov 2014 - Oct 2015",
    bullets: [
      "Developed and maintained responsive, production-grade websites using HTML, CSS, JavaScript, and jQuery.",
      "Built interactive UI features — form validation, sliders, modals, and dynamic content — to enhance user engagement.",
      "Guaranteed cross-browser and cross-device compatibility, delivering end-to-end solutions on schedule.",
    ],
  },
  {
    role: "Front-End Web Developer",
    company: "Capital Numbers Infotech, Kolkata",
    period: "Jun 2013 - Nov 2014",
    bullets: [
      "Crafted responsive pages and high-converting landing pages from Photoshop mockups using HTML5, CSS3, and JavaScript.",
      "Integrated front-end templates with CMS/PHP backends, adding AJAX-driven dynamic content for richer UX.",
      "Leveraged Bootstrap and CSS preprocessors within Agile sprints to ensure consistent, on-time delivery.",
    ],
  },
  {
    role: "Trainee Web Designer",
    company: "Evika Systems, Kolkata",
    period: "Jun 2012 - Jun 2013",
    bullets: [
      "Coded static and dynamic pages with HTML, CSS, and JavaScript under senior engineer mentorship.",
      "Built wireframe-aligned layouts while mastering web standards, typography, and UI composition fundamentals.",
      "Conducted cross-browser testing and supported ongoing client site updates and maintenance.",
    ],
  },
];
