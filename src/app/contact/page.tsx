import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { externalProps } from "@/lib/utils";
import { GitBranch, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType } from "react";

export const metadata = createMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} by email at ${siteConfig.email}, by phone, or on GitHub and LinkedIn.`,
  path: "/contact",
});

type Channel = {
  label: string;
  value: string;
  href?: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const channels: Channel[] = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  { label: "GitHub", value: "github.com/Jeeva-code25", href: siteConfig.github, icon: GitBranch },
  {
    label: "LinkedIn",
    value: "Jeevananthan Kumar",
    href: siteConfig.linkedin,
    icon: Link2,
  },
  { label: "Location", value: siteConfig.location, icon: MapPin },
];

export default function ContactPage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="border-b border-border bg-radial-glow">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Start a conversation"
              description="For roles, freelance work, or questions about a project — email is the quickest way to reach me."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${siteConfig.email}`} size="lg">
                Send an email
              </Button>
              <Button href="/resume" variant="secondary" size="lg">
                View resume
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="mt-12">
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map(({ label, value, href, icon: Icon }) => {
              const body = (
                <>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-foreground">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="mt-0.5 block font-medium [overflow-wrap:anywhere]">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label} className="min-w-0">
                  {href ? (
                    <a
                      href={href}
                      className="flex h-full items-start gap-4 rounded-lg p-5 transition-colors card hover:bg-surface-elevated"
                      {...externalProps(href)}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex h-full items-start gap-4 rounded-lg p-5 card">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
