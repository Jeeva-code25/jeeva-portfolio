import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { education, employers } from "@/content/experience";
import { getProjectBySlug } from "@/content/projects";
import { resumeProjectSlugs, resumeSummary } from "@/content/resume";
import { skillGroups } from "@/content/skills";
import { siteConfig, socialLinks } from "@/content/site";
import { externalProps } from "@/lib/utils";
import { formatPeriod } from "@/lib/period";
import { createMetadata } from "@/lib/seo";
import { Download } from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Resume",
  description: `Resume of ${siteConfig.name}, ${siteConfig.title}. Read it online or download the PDF.`,
  path: "/resume",
});

function ResumeHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{children}</h2>
  );
}

export default function ResumePage() {
  const selectedProjects = resumeProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== undefined);

  return (
    <div className="pb-20 sm:pb-24">
      <section className="border-b border-border bg-radial-glow">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Resume"
                title="Experience at a glance"
                description="Read the summary below or download the PDF."
              />
              <Button
                href={siteConfig.resumePath}
                download={siteConfig.resumeFileName}
                size="lg"
                className="shrink-0 self-start sm:self-auto"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="mt-12">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-lg p-6 card sm:p-10">
            <header className="border-b border-border pb-6">
              <h1 className="font-display text-3xl font-semibold tracking-tight">{siteConfig.name}</h1>
              <p className="mt-1.5 text-muted">{siteConfig.title}</p>
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                <span>{siteConfig.location}</span>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent-ink">
                  {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-accent-ink">
                  {siteConfig.phone}
                </a>
                {socialLinks
                  .filter((link) => link.label !== "Email")
                  .map((link) => (
                    <a key={link.label} href={link.href} className="hover:text-accent-ink" {...externalProps(link.href)}>
                      {link.label}
                    </a>
                  ))}
              </p>
            </header>

            <section className="border-b border-border py-6">
              <ResumeHeading>Professional summary</ResumeHeading>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{resumeSummary}</p>
            </section>

            <section className="border-b border-border py-6">
              <ResumeHeading>Technical skills</ResumeHeading>
              <ul className="mt-4 space-y-2.5">
                {skillGroups.map((group) => (
                  <li key={group.id} className="text-sm leading-relaxed">
                    <span className="font-medium">{group.resumeLabel}: </span>
                    <span className="text-muted">
                      {group.skills.map((skill) => skill.name).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-b border-border py-6">
              <ResumeHeading>Professional experience</ResumeHeading>
              <ul className="mt-4 space-y-7">
                {employers.map((entry) => (
                  <li key={entry.id}>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="font-semibold">
                        {entry.role}
                        <span className="font-normal text-muted"> — {entry.organization}</span>
                      </h3>
                      <p className="shrink-0 font-mono text-[11px] text-muted">
                        {formatPeriod(entry.period)}
                      </p>
                    </div>
                    {entry.highlights.length > 0 || entry.otherWork ? (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-border-strong">
                        {entry.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                        {entry.otherWork?.map((item) => (
                          <li key={item.title}>
                            <span className="font-medium text-foreground">{item.title}:</span> {item.description}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {entry.projectSlugs.length > 0 ? (
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {entry.projectSlugs.map((slug) => {
                          const project = getProjectBySlug(slug);
                          if (!project) return null;
                          return (
                            <Link
                              key={slug}
                              href={`/projects/${slug}`}
                              prefetch
                              className="font-medium underline-offset-4 hover:text-accent-ink hover:underline"
                            >
                              {project.title} →
                            </Link>
                          );
                        })}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>

            <section className={education.length > 0 ? "border-b border-border py-6" : "pt-6"}>
              <ResumeHeading>Selected projects</ResumeHeading>
              <ul className="mt-4 space-y-4">
                {selectedProjects.map((project) => (
                  <li key={project.slug} className="text-sm leading-relaxed">
                    <p>
                      <Link href={`/projects/${project.slug}`} prefetch className="font-medium hover:text-accent-ink">
                        {project.title}
                      </Link>
                      <span className="text-muted"> | {project.technologies.join(", ")}</span>
                    </p>
                    <p className="mt-1 text-muted">{project.summary}</p>
                  </li>
                ))}
              </ul>
            </section>

            {education.length > 0 ? (
              <section className="pt-6">
                <ResumeHeading>Education</ResumeHeading>
                <ul className="mt-4 space-y-2">
                  {education.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <span>
                        <span className="font-medium">
                          {item.degree}
                          {item.abbreviation ? ` (${item.abbreviation})` : null}
                        </span>
                        <span className="text-muted">
                          {" "}
                          — {item.institution}
                          {item.location ? `, ${item.location}` : null}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[11px] text-muted">
                        {formatPeriod(item.period)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
