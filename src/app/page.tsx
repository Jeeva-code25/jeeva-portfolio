import { Capabilities } from "@/components/home/capabilities";
import { ContactCTA } from "@/components/home/contact-cta";
import { ExperienceSection } from "@/components/home/experience-section";
import { Hero } from "@/components/home/hero";
import { SelectedProjects } from "@/components/home/selected-projects";
import { education, employers } from "@/content/experience";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ path: "/" });

export default function HomePage() {
  const current = employers.filter((entry) => entry.period.end === "present");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    url: siteConfig.siteUrl,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    ...(current.length > 0 && {
      worksFor: current.map((entry) => ({ "@type": "Organization", name: entry.organization })),
    }),
    alumniOf: education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.institution })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <SelectedProjects />
      <ExperienceSection />
      <Capabilities />
      <ContactCTA />
    </>
  );
}
