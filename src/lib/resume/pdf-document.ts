/**
 * Minimal single-purpose PDF writer for the resume: A4 pages, the built-in
 * Helvetica fonts (so text stays selectable and ATS-readable), word wrapping
 * from the standard font metrics, simple rules, and URI link annotations.
 * Deterministic output — no timestamps — so the route can be prerendered.
 */

export type FontName = "regular" | "bold";

export interface TextRun {
  text: string;
  font?: FontName;
  color?: Color;
  href?: string;
}

type Color = [number, number, number];

// Advance widths (1/1000 em) for WinAnsi codes 32–126, from the standard AFM files.
// prettier-ignore
const HELVETICA = [
  278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,
  278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,
  611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,
  556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,
];
// prettier-ignore
const HELVETICA_BOLD = [
  278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,
  333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,
  611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,
  611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,
];

const WIN_ANSI_EXTRAS: Record<string, { code: number; regular: number; bold: number }> = {
  "\u2013": { code: 0x96, regular: 556, bold: 556 },
  "\u2014": { code: 0x97, regular: 1000, bold: 1000 },
  "\u2022": { code: 0x95, regular: 350, bold: 350 },
  "\u00b7": { code: 0xb7, regular: 278, bold: 278 },
  "\u2018": { code: 0x91, regular: 222, bold: 278 },
  "\u2019": { code: 0x92, regular: 222, bold: 278 },
  "\u201c": { code: 0x93, regular: 333, bold: 500 },
  "\u201d": { code: 0x94, regular: 333, bold: 500 },
  "\u00a0": { code: 0x20, regular: 278, bold: 278 },
};

function charCode(char: string) {
  const extra = WIN_ANSI_EXTRAS[char];
  if (extra) return extra.code;
  const code = char.charCodeAt(0);
  return code >= 32 && code <= 126 ? code : 0x3f;
}

function charWidth(char: string, font: FontName) {
  const extra = WIN_ANSI_EXTRAS[char];
  if (extra) return font === "bold" ? extra.bold : extra.regular;
  const code = char.charCodeAt(0);
  const table = font === "bold" ? HELVETICA_BOLD : HELVETICA;
  return code >= 32 && code <= 126 ? table[code - 32] : 556;
}

export function textWidth(text: string, font: FontName, size: number) {
  let total = 0;
  for (const char of text) total += charWidth(char, font);
  return (total * size) / 1000;
}

function pdfString(text: string) {
  let out = "(";
  for (const char of text) {
    const code = charCode(char);
    if (code === 0x28 || code === 0x29 || code === 0x5c) out += "\\" + String.fromCharCode(code);
    else out += String.fromCharCode(code);
  }
  return out + ")";
}

/** Document-information strings use UTF-16BE, not the page fonts' WinAnsi encoding. */
function pdfTextString(text: string) {
  let hex = "<FEFF";
  for (let i = 0; i < text.length; i++) hex += text.charCodeAt(i).toString(16).padStart(4, "0").toUpperCase();
  return hex + ">";
}

const fmt = (n: number) => (Math.round(n * 100) / 100).toString();
const rgb = ([r, g, b]: Color) => `${fmt(r)} ${fmt(g)} ${fmt(b)}`;

interface Page {
  ops: string[];
  links: { x: number; y: number; w: number; h: number; href: string }[];
}

export class PdfDocument {
  readonly width = 595.28;
  readonly height = 841.89;
  readonly margin = { top: 44, right: 54, bottom: 40, left: 54 };
  private pages: Page[] = [];
  private page!: Page;
  /** Baseline cursor, measured from the bottom of the page. */
  y = 0;

  constructor(private readonly meta: { title: string; author: string; subject?: string }) {
    this.addPage();
  }

  get contentWidth() {
    return this.width - this.margin.left - this.margin.right;
  }

  addPage() {
    this.page = { ops: [], links: [] };
    this.pages.push(this.page);
    this.y = this.height - this.margin.top;
  }

  /** Start a new page when fewer than `needed` points remain. */
  ensureSpace(needed: number) {
    if (this.y - needed < this.margin.bottom) this.addPage();
  }

  moveDown(points: number) {
    this.y -= points;
  }

  text(text: string, x: number, size: number, font: FontName = "regular", color: Color = [0.07, 0.07, 0.07], href?: string) {
    const ref = font === "bold" ? "F2" : "F1";
    this.page.ops.push(
      `BT /${ref} ${fmt(size)} Tf ${rgb(color)} rg ${fmt(x)} ${fmt(this.y)} Td ${pdfString(text)} Tj ET`,
    );
    if (href) {
      this.page.links.push({ x, y: this.y - size * 0.25, w: textWidth(text, font, size), h: size * 1.15, href });
    }
  }

  rule(x: number, width: number, color: Color = [0.8, 0.8, 0.8], thickness = 0.6) {
    this.page.ops.push(
      `${rgb(color)} RG ${fmt(thickness)} w ${fmt(x)} ${fmt(this.y)} m ${fmt(x + width)} ${fmt(this.y)} l S`,
    );
  }

  /**
   * Lays out runs of mixed-font text with word wrapping. The first line starts
   * at `x + firstIndent`; continuation lines start at `x + hangingIndent`.
   */
  paragraph(
    runs: TextRun[],
    options: { size: number; lineHeight: number; x?: number; width?: number; hangingIndent?: number },
  ) {
    const x = options.x ?? this.margin.left;
    const width = options.width ?? this.contentWidth;
    const indent = options.hangingIndent ?? 0;
    type Word = { text: string; font: FontName; color?: Color; href?: string; space: boolean };
    const words: Word[] = [];
    for (const run of runs) {
      const parts = run.text.split(/( +)/);
      for (const part of parts) {
        if (part === "") continue;
        if (/^ +$/.test(part)) {
          if (words.length) words[words.length - 1].space = true;
          continue;
        }
        words.push({ text: part, font: run.font ?? "regular", color: run.color, href: run.href, space: false });
      }
    }

    const lines: Word[][] = [];
    let line: Word[] = [];
    let lineWidth = 0;
    const spaceWidth = (font: FontName) => textWidth(" ", font, options.size);
    for (const word of words) {
      const max = width - (lines.length === 0 ? 0 : indent);
      const w = textWidth(word.text, word.font, options.size);
      const prev = line[line.length - 1];
      const gap = prev?.space ? spaceWidth(prev.font) : 0;
      if (line.length && lineWidth + gap + w > max) {
        lines.push(line);
        line = [word];
        lineWidth = w;
      } else {
        line.push(word);
        lineWidth += gap + w;
      }
    }
    if (line.length) lines.push(line);

    lines.forEach((words, index) => {
      this.ensureSpace(options.lineHeight);
      let cursor = x + (index === 0 ? 0 : indent);
      words.forEach((word, i) => {
        this.text(word.text, cursor, options.size, word.font, word.color, word.href);
        cursor += textWidth(word.text, word.font, options.size);
        if (word.space && i < words.length - 1) cursor += spaceWidth(word.font);
      });
      this.moveDown(options.lineHeight);
    });
  }

  toBytes(): Uint8Array {
    const objects: string[] = [];
    const add = (body: string) => {
      objects.push(body);
      return objects.length;
    };

    const catalogId = add("");
    const pagesId = add("");
    const fontRegular = add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    );
    const fontBold = add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    );
    const infoId = add(
      `<< /Title ${pdfTextString(this.meta.title)} /Author ${pdfTextString(this.meta.author)}${
        this.meta.subject ? ` /Subject ${pdfTextString(this.meta.subject)}` : ""
      } /Producer (jeeva-portfolio) >>`,
    );

    const pageIds: number[] = [];
    for (const page of this.pages) {
      const stream = page.ops.join("\n");
      const contentId = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
      const annotIds = page.links.map((link) =>
        add(
          `<< /Type /Annot /Subtype /Link /Rect [${fmt(link.x)} ${fmt(link.y)} ${fmt(link.x + link.w)} ${fmt(
            link.y + link.h,
          )}] /Border [0 0 0] /A << /S /URI /URI ${pdfString(link.href)} >> >>`,
        ),
      );
      pageIds.push(
        add(
          `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${fmt(this.width)} ${fmt(this.height)}] ` +
            `/Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${contentId} 0 R` +
            (annotIds.length ? ` /Annots [${annotIds.map((id) => `${id} 0 R`).join(" ")}]` : "") +
            " >>",
        ),
      );
    }
    objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R /Lang (en) >>`;
    objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

    // Every string above is single-byte (WinAnsi), so string length equals byte length.
    let out = "%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n";
    const offsets: number[] = [];
    objects.forEach((body, i) => {
      offsets.push(out.length);
      out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xref = out.length;
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const offset of offsets) out += `${String(offset).padStart(10, "0")} 00000 n \n`;
    out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
    return bytes;
  }
}
