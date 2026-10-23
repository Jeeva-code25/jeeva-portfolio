import { Reveal } from "@/components/motion/reveal";
import { CompactProject, FeatureProject } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjectsByGroup, projectGroups } from "@/content/projects";
import { createMetadata } from "@/lib/seo";
import type { ProjectGroup } from "@/types/portfolio";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Professional work at Apzzo Technologies and Corsosoft Technologies — FixerFlip, PointerUp, SchoolPanda Super Admin — and personal React and Android projects by Jeevananthan K.",
  path: "/projects",
});

const order: ProjectGroup[] = ["apzzo", "corsosoft", "personal"];

export default function ProjectsPage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="border-b border-border bg-radial-glow">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Work"
              title="Professional products and personal builds"
              description="Grouped by where the work happened. Screenshots are captured from public pages; private systems use clearly labelled illustrations."
            />
            <nav aria-label="Work sections" className="mt-8 flex flex-wrap gap-2">
              {order.map((group) => (
                <a
                  key={group}
                  href={`#${group}`}
                  className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors card hover:text-foreground"
                >
                  {projectGroups[group].label}
                </a>
              ))}
            </nav>
          </Reveal>
        </Container>
      </section>

      {order.map((group) => {
        const meta = projectGroups[group];
        const items = getProjectsByGroup(group);
        return (
          <section
            key={group}
            id={group}
            aria-labelledby={`${group}-heading`}
            className="scroll-mt-20 border-b border-border py-16 last:border-0 sm:py-20"
          >
            <Container>
              <Reveal>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {meta.eyebrow}
                    </p>
                    <h2
                      id={`${group}-heading`}
                      className="mt-2 font-display text-3xl font-semibold tracking-tight"
                    >
                      {meta.label}
                    </h2>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-muted sm:text-right">
                    {meta.description}
                  </p>
                </div>
              </Reveal>

              {group === "personal" ? (
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((project) => (
                    <Reveal key={project.slug} className="h-full">
                      <CompactProject project={project} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-12 space-y-20">
                  {items.map((project, index) => (
                    <Reveal key={project.slug}>
                      <FeatureProject
                        project={project}
                        reverse={index % 2 === 1}
                        showEmployer={false}
                      />
                    </Reveal>
                  ))}
                </div>
              )}
            </Container>
          </section>
        );
      })}
    </div>
  );
}
