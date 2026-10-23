export type ProjectGroup = "apzzo" | "corsosoft" | "personal";

export type SkillLevel = "working" | "proficient" | "familiar";

export interface SocialLink {
  label: string;
  href: string;
  display: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Compact label for the resume, e.g. "Frontend". */
  resumeLabel: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "repo" | "play" | "appstore";
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  device: "desktop" | "mobile";
  caption?: string;
  /** Public page the screenshot was captured from. */
  sourceUrl?: string;
}

export type IllustrationKind =
  | "logistics"
  | "school-admin"
  | "social"
  | "android-quiz";

/**
 * "screenshot" = a genuine capture of the real interface.
 * "illustration" = an illustrative mockup; never present it as a real screenshot.
 */
export type ProjectPreview =
  | { type: "screenshot"; image: ProjectImage }
  | { type: "illustration"; kind: IllustrationKind; device: "desktop" | "mobile"; label: string };

export interface SubProduct {
  name: string;
  summary: string;
  preview: ProjectPreview;
  links?: ProjectLink[];
}

export interface ExampleSite {
  name: string;
  type: string;
  href: string;
  image: ProjectImage;
}

export interface Project {
  slug: string;
  title: string;
  group: ProjectGroup;
  category: string;
  summary: string;
  overview: string;
  role?: string;
  contributions: string[];
  technologies: string[];
  links: ProjectLink[];
  preview: ProjectPreview;
  gallery?: ProjectImage[];
  galleryNote?: string;
  subProducts?: SubProduct[];
  examples?: { title: string; intro: string; sites: ExampleSite[] };
  status?: string;
  context?: string;
  featured?: boolean;
}

/** `month` is 1–12; omit it when only the year is known. */
export interface YearMonth {
  year: number;
  month?: number;
}

export interface Period {
  start: YearMonth;
  end: YearMonth | "present";
}

export interface EmployerEntry {
  id: string;
  organization: string;
  role: string;
  period: Period;
  location?: string;
  summary?: string;
  highlights: string[];
  /** Projects with their own case-study page. */
  projectSlugs: string[];
  /** Work worth mentioning that has no project page. */
  otherWork?: { title: string; description: string }[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  abbreviation?: string;
  institution: string;
  location?: string;
  period: Period;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  /** Production origin without trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  siteUrl: string;
  ogImage: string;
  focusLabel?: string;
  portrait: { src: string; width: number; height: number; alt: string };
  resumeFileName: string;
  resumePath: string;
}
