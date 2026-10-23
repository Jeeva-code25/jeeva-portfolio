# Jeevananthan K — Portfolio

Personal portfolio for **Jeevananthan K**, Full-Stack & Mobile Developer.

## Stack

- Next.js (App Router, Cache Components) + React + TypeScript
- Tailwind CSS v4
- Motion (`motion/react`)
- Lucide React
- `next-themes`

## Getting started

```bash
npm install
npm run dev
```

Set the production origin (no trailing slash):

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Content

All portfolio data lives in typed files; components only render it.

- `src/content/site.ts` — name, title, hero copy, contact details, social links
- `src/content/experience.ts` — employment (role, period, highlights, projects) and education
- `src/content/projects.ts` — projects and case studies
- `src/content/skills.ts` — skill groups

Periods are structured (`{ year, month }`, or `"present"`) and formatted by `src/lib/period.ts`, so a date only ever changes in `experience.ts`.

## Resume PDF

`/resume/Jeevananthan-K-Resume.pdf` is generated at build time by
`src/app/resume/Jeevananthan-K-Resume.pdf/route.ts` from the same content files
(`src/lib/resume/build-resume.ts`). It is an A4, single-column document using
standard PDF fonts, so the text is selectable and ATS-readable. Edit the content
files and rebuild — there is no separate PDF to maintain.

## Routes

- `/` — Home
- `/projects` — Work, grouped by company and personal projects
- `/projects/[slug]` — Case studies
- `/about` — Background, experience, and education
- `/resume` — Resume view + PDF download
- `/contact` — Contact channels
