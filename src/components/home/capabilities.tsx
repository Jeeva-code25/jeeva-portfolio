import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/content/skills";
import { Database, Monitor, Plug, Rocket, Server, Smartphone, type LucideIcon } from "lucide-react";

const groupIcons: Record<string, LucideIcon> = {
  web: Monitor,
  mobile: Smartphone,
  backend: Server,
  data: Database,
  integrations: Plug,
  delivery: Rocket,
};

export function Capabilities() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="The toolkit behind the work"
            description="Languages, frameworks, and services I've used to build and ship web apps, mobile apps, and APIs."
          />
        </Reveal>

        <Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => {
              const Icon = groupIcons[group.id] ?? Monitor;
              return (
                <article
                  key={group.id}
                  className="group/card relative flex h-full flex-col overflow-hidden rounded-lg p-6 card"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-3 right-4 select-none font-display text-6xl font-semibold text-foreground/[0.04] transition-colors duration-300 group-hover/card:text-accent-ink/10"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-ink">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{group.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{group.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="rounded-full border border-border px-3 py-1 text-[13px] text-foreground transition-colors duration-200 hover:border-accent-ink hover:text-accent-ink"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {group.skills.length} tools
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
