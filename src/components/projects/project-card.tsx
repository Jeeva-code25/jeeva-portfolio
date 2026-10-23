import { ProjectMedia } from "@/components/projects/project-media";
import { Badge } from "@/components/ui/badge";
import { projectGroups } from "@/content/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const hoverZoom =
  "transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none";

function ExternalLinks({ project, max = 3 }: { project: Project; max?: number }) {
  if (project.links.length === 0) return null;
  return (
    <>
      {project.links.slice(0, max).map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {link.label}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`} prefetch
      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
    >
      Case study
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      />
      <span className="sr-only">: {project.title}</span>
    </Link>
  );
}

export function FeatureProject({
  project,
  reverse = false,
  preload = false,
  showEmployer = true,
}: {
  project: Project;
  reverse?: boolean;
  preload?: boolean;
  showEmployer?: boolean;
}) {
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <Link
        href={`/projects/${project.slug}`} prefetch
        tabIndex={-1}
        aria-hidden
        className={cn("block rounded-lg", reverse && "lg:order-2")}
      >
        <ProjectMedia
          preview={project.preview}
          gallery={project.gallery}
          preload={preload}
          sizes="(min-width: 1024px) 620px, 100vw"
          className={hoverZoom}
        />
      </Link>

      <div className={cn("min-w-0", reverse && "lg:order-1")}>
        {showEmployer ? (
          <div className="mb-4">
            <Badge tone="accent">{projectGroups[project.group].label}</Badge>
          </div>
        ) : null}
        <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          <Link href={`/projects/${project.slug}`} prefetch className="hover:text-accent-ink">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {project.category}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty">
          {project.summary}
        </p>
        {project.status ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" aria-hidden />
            {project.status}
          </p>
        ) : null}
        {project.technologies.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.slice(0, 6).map((tech) => (
              <li key={tech} className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted hairline">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <CaseStudyLink project={project} />
          <ExternalLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function CompactProject({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-xl p-3 card transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_var(--border-strong),var(--card-shadow)]">
      <Link href={`/projects/${project.slug}`} prefetch tabIndex={-1} aria-hidden className="block overflow-hidden rounded-lg">
        <ProjectMedia
          preview={project.preview}
          gallery={project.gallery}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className={hoverZoom}
        />
      </Link>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {project.category}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} prefetch className="hover:text-accent-ink">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">{project.summary}</p>
        {project.technologies.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-md bg-surface-elevated px-2 py-0.5 text-[11px] text-muted">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
            <CaseStudyLink project={project} />
            <ExternalLinks project={project} max={2} />
          </div>
        </div>
      </div>
    </article>
  );
}
