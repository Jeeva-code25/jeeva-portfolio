import { Reveal } from "@/components/motion/reveal";
import { CompactProject, FeatureProject } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProjects, getHomePersonalProjects } from "@/content/projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SelectedProjects() {
  const professional = getFeaturedProjects().filter((project) => project.group !== "personal");
  const personal = getHomePersonalProjects();

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Products I've worked on"
              description="Work from Apzzo and Corsosoft, plus personal projects — each scoped to the part I actually built."
            />
            <Button href="/projects" variant="secondary" className="shrink-0 self-start sm:self-auto">
              All work
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 space-y-20 sm:space-y-24">
          {professional.map((project, index) => (
            <Reveal key={project.slug}>
              <FeatureProject project={project} reverse={index % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 border-t border-border pt-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Personal projects
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Built on my own — a full-stack app with its own API, a frontend website, and a
                  native Android app.
                </p>
              </div>
              <Link
                href="/projects#personal"
                prefetch
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                All personal projects
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {personal.map((project) => (
                <CompactProject key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
