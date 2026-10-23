import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig, socialLinks } from "@/content/site";
import { externalProps } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-lg px-6 py-12 card sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
            <div className="relative max-w-2xl">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span>Contact</span>
                <span className="h-3 w-px bg-border-strong" aria-hidden />
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {siteConfig.location}
                </span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Let&apos;s build something thoughtful.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted text-pretty">
                Open to conversations about web and mobile product engineering.
                Email is the quickest way to reach me.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={`mailto:${siteConfig.email}`} size="lg">
                  Email me
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact details
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
                      {...externalProps(link.href)}
                    >
                      {link.label === "Email" ? siteConfig.email : link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
