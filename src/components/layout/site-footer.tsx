import { LogoMark } from "@/components/brand/logo-mark";
import { Container } from "@/components/ui/container";
import { navigation, siteConfig, socialLinks } from "@/content/site";
import { externalProps } from "@/lib/utils";
import Link from "next/link";

const COPYRIGHT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
            <LogoMark className="h-9 w-9" />
            <span>{siteConfig.name}</span>
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {siteConfig.title}. Building web and mobile products — from
            interfaces to integrations and releases.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Connect
          </p>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                  {...externalProps(item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide">{siteConfig.location}</p>
        </Container>
      </div>
    </footer>
  );
}
