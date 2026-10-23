import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { education, employers } from "@/content/experience";
import { getProjectBySlug } from "@/content/projects";
import { formatPeriod, isoYearMonth } from "@/lib/period";
import { cn } from "@/lib/utils";
import type { Period } from "@/types/portfolio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function PeriodLabel({ period, className }: { period: Period; className?: string }) {
  const [start, end] = formatPeriod(period).split(" – ");
  return (
    <p className={cn("font-mono text-xs tracking-wide text-foreground", className)}>
      <time dateTime={isoYearMonth(period.start)}>{start}</time>
      <span className="text-muted"> – </span>
      {period.end === "present" ? (
        <span className="text-accent-ink">{end}</span>
      ) : (
        <time dateTime={isoYearMonth(period.end)}>{end}</time>
      )}
    </p>
  );
}

export function ExperienceTimeline() {
  return (
    <ol className="relative">
      {employers.map((entry, index) => {
        const projects = entry.projectSlugs
          .map((slug) => getProjectBySlug(slug))
          .filter((project) => project !== undefined);
        const current = entry.period.end === "present";
        return (
          <li
            key={entry.id}
            className="relative grid gap-4 border-t border-border py-9 pl-6 md:grid-cols-[230px_1fr] md:gap-10 md:pl-0"
          >
            <span
              className={cn(
                "absolute left-0 top-[2.6rem] h-2 w-2 rounded-full md:hidden",
                current ? "bg-accent-ink" : "bg-border-strong",
              )}
              aria-hidden
            />
            {index < employers.length - 1 ? (
              <span className="absolute bottom-0 left-[3px] top-[3.3rem] w-px bg-border md:hidden" aria-hidden />
            ) : null}

            <div>
              <PeriodLabel period={entry.period} />
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-balance">
                {entry.organization}
              </h3>
              <p className="mt-1 text-sm text-muted">{entry.role}</p>
            </div>

            <div className="min-w-0">
              {entry.summary ? (
                <p className="max-w-2xl text-base leading-relaxed text-muted">{entry.summary}</p>
              ) : null}

              {entry.highlights.length > 0 ? (
                <ul className={cn("max-w-2xl space-y-2.5", entry.summary && "mt-5")}>
                  {entry.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-ink" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {projects.length > 0 ? (
                <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/projects/${project.slug}`}
                        prefetch
                        className="group flex h-full flex-col justify-between gap-3 rounded-md p-4 transition-colors card hover:bg-surface-elevated"
                      >
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            {project.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted">{project.category}</span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}

              {entry.otherWork?.map((item) => (
                <p key={item.title} className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  <span className="font-medium text-foreground">{item.title}</span> — {item.description}
                </p>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function EducationList() {
  if (education.length === 0) return null;
  return (
    <div className="mt-6 border-t border-border pt-9">
      <h3 className="font-display text-xl font-semibold tracking-tight">Education</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {education.map((item) => (
          <li key={item.id} className="rounded-md p-5 card">
            <PeriodLabel period={item.period} className="text-muted" />
            <p className="mt-3 font-medium leading-snug">
              {item.degree}
              {item.abbreviation ? <span className="text-muted"> ({item.abbreviation})</span> : null}
            </p>
            <p className="mt-1 text-sm text-muted">
              {item.institution}
              {item.location ? `, ${item.location}` : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Experience"
              title="Professional experience"
              description="Where I've worked, most recent first — with the projects I contributed to."
            />
            <Link
              href="/about"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              More about me
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-12">
            <ExperienceTimeline />
            <EducationList />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
