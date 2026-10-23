import { getAllProjectSlugs } from "@/content/projects";
import { siteConfig } from "@/content/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/about", "/resume", "/contact"];

  const lastModified = "2026-10-23";

  const pages = staticRoutes.map((path) => ({
    url: `${siteConfig.siteUrl}${path || "/"}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectPages = getAllProjectSlugs().map((slug) => ({
    url: `${siteConfig.siteUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...projectPages];
}
