import { EducationList, ExperienceTimeline } from "@/components/home/experience-section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, socialLinks } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { externalProps } from "@/lib/utils";
import { Download } from "lucide-react";
import Image from "next/image";

export const metadata = createMetadata({
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.title} in ${siteConfig.location}, working on web, mobile, and admin products at Apzzo Technologies and Corsosoft Technologies.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="border-b border-border bg-radial-glow">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="A developer who cares about the whole product."
              description={siteConfig.intro}
            />
          </Reveal>
        </Container>
      </section>

      <Container className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <section className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Background</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              <p>
                I&apos;m a {siteConfig.title.toLowerCase()} based in {siteConfig.location}. I work
                across React and Next.js on the web, React Native and Expo on mobile, and Node.js
                services that connect them to real product infrastructure.
              </p>
              <p>
                At Apzzo Technologies I&apos;ve worked on FixerFlip, a real-estate investing app on
                Android, iOS, and the web, where my work covered interface improvements,
                authentication, subscriptions, payments, push notifications, analytics, maps, and
                app releases. I&apos;ve also contributed to PointerUp, Apzzo&apos;s e-commerce and
                marketing product suite.
              </p>
              <p>
                Before that, at Corsosoft Technologies, I built Super Admin pages for SchoolPanda in
                React and RSuite, added pages and fixed bugs in a PHP/CodeIgniter transport
                management system, and maintained two WordPress websites.
              </p>
              <p>
                Earlier personal projects — restaurant sites, games, quizzes, a MERN blog, and two
                Kotlin Android apps — are where I built the fundamentals.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <aside className="overflow-hidden rounded-lg card">
            <div className="relative aspect-[5/4] bg-portrait">
              <Image
                src={siteConfig.portrait.src}
                alt={siteConfig.portrait.alt}
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <dl className="space-y-4 p-6 text-sm">
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="mt-1 font-medium">{siteConfig.title}</dd>
              </div>
              <div>
                <dt className="text-muted">Location</dt>
                <dd className="mt-1 font-medium">{siteConfig.location}</dd>
              </div>
              {socialLinks.map((link) => (
                <div key={link.label}>
                  <dt className="text-muted">{link.label}</dt>
                  <dd className="mt-1 font-medium">
                    <a
                      href={link.href}
                      className="break-all underline-offset-4 hover:text-accent-ink hover:underline"
                      {...externalProps(link.href)}
                    >
                      {link.display}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3 px-6 pb-6">
              <Button href={siteConfig.resumePath} download={siteConfig.resumeFileName}>
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </Button>
              <Button href="/resume" variant="secondary">
                View resume
              </Button>
            </div>
          </aside>
        </Reveal>
      </Container>

      <Container className="mt-20">
        <Reveal>
          <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight">
            Professional experience
          </h2>
          <ExperienceTimeline />
          <EducationList />
        </Reveal>
      </Container>
    </div>
  );
}
