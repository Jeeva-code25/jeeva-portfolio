import type { EducationEntry, EmployerEntry } from "@/types/portfolio";

/**
 * Single source of truth for employment and education. The About page, home
 * page, resume page, and the downloadable PDF all read from here, so dates
 * only ever need to change in this file. Most recent first.
 */
export const employers: EmployerEntry[] = [
  {
    id: "apzzo",
    organization: "Apzzo Technologies Private Limited",
    role: "Software Developer",
    period: { start: { year: 2025, month: 11 }, end: { year: 2026, month: 11 } },
    summary:
      "Full-stack web and React Native mobile development as part of the product team — API integration, product features, bug fixes, and application releases.",
    highlights: [
      "Built and refined React Native and Expo screens for FixerFlip, a real-estate app on Android, iOS, and web.",
      "Integrated APIs, Auth0 / OAuth authentication, RevenueCat and Stripe subscriptions, Firebase Cloud Messaging, analytics, and Mapbox.",
      "Fixed bugs and handled application release tasks for Google Play and the App Store.",
      "Contributed to the PointerUp product suite (E-commerce, Grow, Social) alongside the Apzzo engineering team.",
      "Built Monito, a Next.js and TypeScript storefront demo with REST API integration and OTP sign-in.",
    ],
    projectSlugs: ["fixerflip", "pointerup", "monito"],
    otherWork: [
      {
        title: "TinyOne",
        description:
          "Worked on part of a client admin panel, which was discontinued before completion.",
      },
    ],
  },
  {
    id: "corsosoft",
    organization: "Corsosoft Technologies",
    role: "Web Developer",
    period: { start: { year: 2025, month: 3 }, end: { year: 2025, month: 11 } },
    summary:
      "Feature work and maintenance on existing systems and websites.",
    highlights: [
      "Fixed bugs and added MySQL-backed pages to a PHP and CodeIgniter transport management system.",
      "Built SchoolPanda Super Admin pages in React.js with RSuite components and Axios API integration.",
      "Fixed bugs and added pages on existing WordPress websites.",
    ],
    projectSlugs: [
      "wordpress-maintenance",
      "schoolpanda-super-admin",
      "transport-management-system",
    ],
  },
  {
    id: "endless-spark",
    organization: "Endless Spark",
    role: "Web Developer Intern",
    period: { start: { year: 2023, month: 7 }, end: { year: 2023, month: 8 } },
    highlights: [],
    projectSlugs: [],
  },
];

export const education: EducationEntry[] = [
  {
    id: "mca",
    degree: "Master of Computer Applications",
    abbreviation: "MCA",
    institution: "Annamalai University",
    location: "Chidambaram",
    period: { start: { year: 2022 }, end: { year: 2024 } },
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications",
    abbreviation: "BCA",
    institution: "Government Arts College",
    location: "C. Mutlur, Chidambaram",
    period: { start: { year: 2019 }, end: { year: 2022 } },
  },
];
