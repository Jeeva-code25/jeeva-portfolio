import { education, employers } from "@/content/experience";
import { getProjectBySlug } from "@/content/projects";
import { resumeProjectSlugs, resumeSummary } from "@/content/resume";
import { siteConfig } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { formatPeriod } from "@/lib/period";
import { PdfDocument, textWidth, type TextRun } from "@/lib/resume/pdf-document";

const INK: [number, number, number] = [0.07, 0.07, 0.07];
const MUTED: [number, number, number] = [0.33, 0.35, 0.33];
const LINK: [number, number, number] = [0.1, 0.25, 0.55];

const BODY = 9.6;
const LEADING = 12.8;

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/** Builds the downloadable resume from the same content the website renders. */
export function buildResumePdf(): Uint8Array {
  const doc = new PdfDocument({
    title: `${siteConfig.name} \u2014 Resume`,
    author: siteConfig.name,
    subject: siteConfig.title,
  });
  const left = doc.margin.left;
  const right = doc.width - doc.margin.right;

  /** Keeps the heading on the same page as at least two lines of its content. */
  const heading = (label: string) => {
    doc.ensureSpace(64);
    doc.moveDown(8);
    doc.text(label.toUpperCase(), left, 10.5, "bold", INK);
    doc.moveDown(5);
    doc.rule(left, doc.contentWidth);
    doc.moveDown(14);
  };

  /** Bold title on the left and a muted date on the right, on one line. */
  const titleRow = (title: TextRun[], date: string) => {
    doc.ensureSpace(LEADING * 3);
    const dateWidth = textWidth(date, "regular", BODY);
    doc.text(date, right - dateWidth, BODY, "regular", MUTED);
    doc.paragraph(title, { size: 10.4, lineHeight: LEADING, width: doc.contentWidth - dateWidth - 16 });
  };

  const bullet = (runs: TextRun[]) => {
    doc.ensureSpace(LEADING);
    doc.text("\u2022", left + 4, BODY, "regular", MUTED);
    doc.paragraph(runs, { size: BODY, lineHeight: LEADING, x: left + 14, width: doc.contentWidth - 14 });
  };

  // Header
  doc.moveDown(6);
  doc.text(siteConfig.name, left, 22, "bold", INK);
  doc.moveDown(18);
  doc.text(siteConfig.title, left, 11.5, "regular", MUTED);
  doc.moveDown(18);

  const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
  const contact: TextRun[] = [
    { text: siteConfig.location, color: MUTED },
    { text: "  |  ", color: MUTED },
    { text: siteConfig.email, color: LINK, href: `mailto:${siteConfig.email}` },
    { text: "  |  ", color: MUTED },
    { text: siteConfig.phone.replace(" ", "\u00a0"), color: LINK, href: phoneHref },
  ];
  doc.paragraph(contact, { size: BODY, lineHeight: LEADING });
  const profiles: TextRun[] = [
    { text: stripProtocol(siteConfig.github), color: LINK, href: siteConfig.github },
    { text: "  |  ", color: MUTED },
    { text: stripProtocol(siteConfig.linkedin), color: LINK, href: siteConfig.linkedin },
  ];
  if (!/localhost/.test(siteConfig.siteUrl)) {
    profiles.push(
      { text: "  |  ", color: MUTED },
      { text: stripProtocol(siteConfig.siteUrl), color: LINK, href: siteConfig.siteUrl },
    );
  }
  doc.paragraph(profiles, { size: BODY, lineHeight: LEADING });

  heading("Professional Summary");
  doc.paragraph([{ text: resumeSummary }], { size: BODY, lineHeight: LEADING });

  heading("Technical Skills");
  for (const group of skillGroups) {
    doc.paragraph(
      [
        { text: `${group.resumeLabel}:`, font: "bold" },
        { text: ` ${group.skills.map((skill) => skill.name).join(", ")}` },
      ],
      { size: BODY, lineHeight: LEADING, hangingIndent: 10 },
    );
  }

  heading("Professional Experience");
  employers.forEach((entry, index) => {
    if (index > 0) doc.moveDown(6);
    titleRow(
      [
        { text: entry.role, font: "bold" },
        { text: ` \u2014 ${entry.organization}`, color: MUTED },
      ],
      formatPeriod(entry.period, "long"),
    );
    doc.moveDown(1.5);
    for (const item of entry.highlights) bullet([{ text: item }]);
    for (const item of entry.otherWork ?? []) {
      bullet([{ text: `${item.title}:`, font: "bold" }, { text: ` ${item.description}` }]);
    }
  });

  heading("Selected Projects");
  resumeProjectSlugs.forEach((slug, index) => {
    const project = getProjectBySlug(slug);
    if (!project) return;
    const live = project.links.find((link) => link.kind === "live");
    const repo = project.links.find((link) => link.kind === "repo");
    const target = live ?? repo;
    if (index > 0) doc.moveDown(1);
    doc.ensureSpace(LEADING * 3);
    doc.paragraph(
      [
        { text: project.title, font: "bold" },
        { text: `  |  ${project.technologies.join(", ")}`, color: MUTED },
        ...(target
          ? [{ text: `  |  ${live ? "Live demo" : "Repository"}`, color: LINK, href: target.href }]
          : []),
      ],
      { size: BODY, lineHeight: LEADING },
    );
    doc.paragraph([{ text: project.summary }], { size: BODY, lineHeight: LEADING });
  });

  if (education.length > 0) {
    heading("Education");
    for (const item of education) {
      titleRow(
        [{ text: item.abbreviation ? `${item.degree} (${item.abbreviation})` : item.degree, font: "bold" }],
        formatPeriod(item.period, "long"),
      );
      doc.paragraph(
        [{ text: item.location ? `${item.institution}, ${item.location}` : item.institution, color: MUTED }],
        { size: BODY, lineHeight: LEADING },
      );
      doc.moveDown(2);
    }
  }

  return doc.toBytes();
}
