import { Reveal } from "@/components/motion/reveal";
import { BrowserFrame, PhoneFrame, ProjectMedia } from "@/components/projects/project-media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectsByGroup,
  projectGroups,
} from "@/content/projects";
import { absoluteUrl, createMetadata } from "@/lib/seo";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return createMetadata({ title: "Project not found", noIndex: true });
  }
  const meta = createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
  if (project.preview.type === "screenshot") {
    const image = project.preview.image;
    meta.openGraph = {
      ...meta.openGraph,
      images: [{ url: absoluteUrl(image.src), width: image.width, height: image.height, alt: image.alt }],
    };
  }
  return meta;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-semibold tracking-tight">{children}</h2>;
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading project" className="pb-20 sm:pb-24">
      <div className="border-b border-border bg-radial-glow">
        <Container className="py-12 sm:py-16">
          <div className="h-5 w-20 rounded bg-surface-elevated" />
          <div className="mt-8 flex gap-2">
            <div className="h-6 w-20 rounded-full bg-surface-elevated" />
            <div className="h-6 w-24 rounded-full bg-surface-elevated" />
          </div>
          <div className="mt-5 h-12 w-2/3 max-w-xl rounded-md bg-surface-elevated" />
          <div className="mt-4 h-5 w-full max-w-2xl rounded bg-surface-elevated" />
          <div className="mt-2 h-5 w-4/5 max-w-xl rounded bg-surface-elevated" />
        </Container>
      </div>
      <Container className="mt-12">
        <div className="aspect-[16/10] w-full rounded-lg card" />
      </Container>
    </div>
  );
}

async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const group = projectGroups[project.group];
  const siblings = getProjectsByGroup(project.group);
  const index = siblings.findIndex((item) => item.slug === project.slug);
  const next = siblings[(index + 1) % siblings.length];
  const mobileGallery = project.gallery?.filter((image) => image.device === "mobile") ?? [];
  const desktopGallery = project.gallery?.filter((image) => image.device === "desktop") ?? [];

  return (
    <article className="pb-20 sm:pb-24">
      <header className="border-b border-border bg-radial-glow">
        <Container className="py-12 sm:py-16">
          <Link
            href={`/projects#${project.group}`}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{group.label}</Badge>
            <Badge tone="outline">{project.category}</Badge>
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
            {project.summary}
          </p>

          {project.links.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link, i) => (
                <Button key={link.href} href={link.href} variant={i === 0 ? "primary" : "secondary"}>
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </Button>
              ))}
            </div>
          ) : null}
        </Container>
      </header>

      <Container className="mt-12">
        <Reveal>
          <ProjectMedia
            preview={project.preview}
            gallery={project.gallery}
            preload
            sizes="(min-width: 1152px) 1088px, 100vw"
          />
        </Reveal>
      </Container>

      <Container className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div className="min-w-0 space-y-12">
          <section>
            <SectionTitle>Overview</SectionTitle>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.overview}</p>
          </section>

          <section>
            <SectionTitle>My contribution</SectionTitle>
            <ul className="mt-4 max-w-2xl space-y-3">
              {project.contributions.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-foreground">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {project.subProducts ? (
            <section>
              <SectionTitle>The suite</SectionTitle>
              <div className="mt-6 space-y-10">
                {project.subProducts.map((product, i) => (
                  <Reveal key={product.name}>
                    <div className="grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
                      <ProjectMedia
                        preview={product.preview}
                        sizes="(min-width: 1024px) 420px, 100vw"
                        className={i % 2 === 1 ? "md:order-2" : undefined}
                      />
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                          PointerUp · 0{i + 1}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                          {product.name}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{product.summary}</p>
                        {product.links?.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </a>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          {project.examples ? (
            <section>
              <SectionTitle>{project.examples.title}</SectionTitle>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {project.examples.intro}
              </p>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {project.examples.sites.map((site) => (
                  <li key={site.href}>
                    <a
                      href={site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <BrowserFrame host={new URL(site.href).host.replace(/^www\./, "")}>
                        <Image
                          src={site.image.src}
                          alt={site.image.alt}
                          fill
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
                        />
                      </BrowserFrame>
                      <span className="mt-3 flex items-center justify-between gap-3">
                        <span className="font-medium">{site.name}</span>
                        <span className="text-xs text-muted">{site.type}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {mobileGallery.length > 0 ? (
            <section>
              <SectionTitle>App screens</SectionTitle>
              <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
                {mobileGallery.map((image) => (
                  <li key={image.src}>
                    <figure>
                      <PhoneFrame image={image} sizes="(min-width: 768px) 180px, 45vw" />
                      <figcaption className="mt-3 text-center text-xs text-muted">
                        {image.caption}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {desktopGallery.length > 0 ? (
            <section>
              <SectionTitle>{mobileGallery.length > 0 ? "On the web" : "Screens"}</SectionTitle>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {desktopGallery.map((image) => (
                  <li key={image.src}>
                    <figure>
                      <BrowserFrame host={image.sourceUrl ? new URL(image.sourceUrl).host.replace(/^www\./, "") : undefined}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-top"
                        />
                      </BrowserFrame>
                      {image.caption ? (
                        <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                          {image.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-5 rounded-lg p-6 card">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {project.group === "personal" ? "Type" : "Company"}
              </dt>
              <dd className="mt-1.5 font-medium">
                {project.group === "personal" ? "Personal project" : group.label}
              </dd>
              {project.context ? <dd className="mt-1 text-sm text-muted">{project.context}</dd> : null}
            </div>
            {project.role ? (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Role</dt>
                <dd className="mt-1.5 font-medium">{project.role}</dd>
              </div>
            ) : null}
            {project.status ? (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Status</dt>
                <dd className="mt-1.5 font-medium">{project.status}</dd>
              </div>
            ) : null}
            {project.technologies.length > 0 ? (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Technologies
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md bg-surface-elevated px-2.5 py-1 text-xs text-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>

          {next && next.slug !== project.slug ? (
            <Link
              href={`/projects/${next.slug}`}
              prefetch
              className="group flex items-center justify-between gap-4 rounded-lg p-5 transition-colors card hover:bg-surface-elevated"
            >
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Next in {group.label}
                </span>
                <span className="mt-1 block font-medium">{next.title}</span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          ) : null}
        </aside>
      </Container>
    </article>
  );
}
