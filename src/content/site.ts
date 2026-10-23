import type { NavItem, SiteConfig, SocialLink } from "@/types/portfolio";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig: SiteConfig = {
  name: "Jeevananthan K",
  title: "Full-Stack & Mobile Developer",
  tagline: "Engineering digital experiences across web\u00a0and\u00a0mobile.",
  intro:
    "I work across React, Next.js, React Native, Expo, and Node.js to develop responsive interfaces, integrate APIs, and deliver functional web and mobile applications.",
  description:
    "Jeevananthan K is a full-stack and mobile developer in Chennai, Tamil Nadu, building web and mobile products with React, Next.js, React Native, Expo, and Node.js.",
  location: "Chennai, Tamil Nadu, India",
  email: "jeevananthankumar@gmail.com",
  phone: "+91 8838357996",
  github: "https://github.com/Jeeva-code25",
  linkedin: "https://www.linkedin.com/in/jeevananthan-kumar-77a931317/",
  siteUrl: configuredUrl || "http://localhost:3000",
  ogImage: "/og.png",
  focusLabel: "Full-Stack & Mobile Developer",
  portrait: {
    src: "/images/jeevananthan-k-portrait.webp",
    width: 720,
    height: 900,
    alt: "Portrait of Jeevananthan K",
  },
  resumeFileName: "Jeevananthan-K-Resume.pdf",
  resumePath: "/resume/Jeevananthan-K-Resume.pdf",
};

export const navigation: NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.github, display: "github.com/Jeeva-code25" },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    display: "in/jeevananthan-kumar-77a931317",
  },
  { label: "Email", href: `mailto:${siteConfig.email}`, display: siteConfig.email },
];
