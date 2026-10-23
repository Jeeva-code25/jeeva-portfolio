import { siteConfig } from "@/content/site";
import { buildResumePdf } from "@/lib/resume/build-resume";

export function GET() {
  const pdf = buildResumePdf();
  return new Response(pdf.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${siteConfig.resumeFileName}"`,
      "Content-Length": String(pdf.byteLength),
    },
  });
}
