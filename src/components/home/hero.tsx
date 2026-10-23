import { SystemMark } from "@/components/diagrams/system-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const step = (index: number) => ({ animationDelay: `${index * 60}ms` });

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

      <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-24">
        <div className="min-w-0">
          {siteConfig.focusLabel ? (
            <p
              className="hero-in inline-flex items-center gap-2 rounded-md bg-accent-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground"
              style={step(0)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" aria-hidden />
              {siteConfig.focusLabel}
            </p>
          ) : null}

          <h1
            className="hero-in mt-7 max-w-[15ch] font-display text-[2rem] font-semibold leading-[1.06] min-[400px]:text-[2.3rem] tracking-tight text-balance sm:text-[3.25rem] lg:text-[3.6rem]"
            style={step(1)}
          >
            {siteConfig.tagline}
          </h1>

          <p
            className="hero-in mt-6 max-w-[34rem] text-base leading-relaxed text-muted text-pretty sm:text-lg sm:leading-relaxed"
            style={step(2)}
          >
            {siteConfig.intro}
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={step(3)}>
            <Button href="/projects" size="lg">
              Explore Projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/resume" variant="secondary" size="lg">
              View Resume
            </Button>
            <Button href="/contact" variant="ghost" size="lg" className="px-4">
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-portrait card">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
            <SystemMark className="pointer-events-none absolute -right-8 -top-6 h-44 w-44 text-foreground opacity-25" />
            <Image
              src={siteConfig.portrait.src}
              alt={siteConfig.portrait.alt}
              fill
              preload
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 384px, 90vw"
              className="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-md bg-background/85 p-4 backdrop-blur-sm hairline sm:inset-x-5 sm:bottom-5">
              <p className="font-display text-lg font-semibold tracking-tight">{siteConfig.name}</p>
              <p className="mt-0.5 text-sm text-muted">{siteConfig.title}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Web · Mobile · APIs · Integrations
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
