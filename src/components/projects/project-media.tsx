import { Illustration } from "@/components/projects/illustrations";
import { cn } from "@/lib/utils";
import type { ProjectImage, ProjectPreview } from "@/types/portfolio";
import Image from "next/image";
import type { ReactNode } from "react";

function hostOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function IllustrationTag({ label }: { label: string }) {
  return (
    <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-md bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted hairline">
      <span className="h-1.5 w-1.5 rounded-full border border-current" aria-hidden />
      Illustration · {label}
    </span>
  );
}

/** Shared top bar so browser and phone previews line up at the same height. */
function FrameBar({ label }: { label?: string }) {
  return (
    <div className="flex h-8 items-center gap-3 border-b border-border bg-surface px-3">
      <div className="flex gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
      </div>
      {label ? (
        <span className="truncate font-mono text-[10px] tracking-wide text-muted">{label}</span>
      ) : null}
    </div>
  );
}

export function BrowserFrame({
  host,
  children,
  className,
  aspectRatio,
}: {
  host?: string;
  children: ReactNode;
  className?: string;
  /** Defaults to 16:10; pass the image's own ratio for wider or taller captures. */
  aspectRatio?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg card", className)}>
      <FrameBar label={host} />
      <div className="relative aspect-[16/10] overflow-hidden bg-preview-bg" style={aspectRatio ? { aspectRatio } : undefined}>
        {children}
      </div>
    </div>
  );
}

function StageFrame({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg card">
      <FrameBar label={label} />
      <div className="relative overflow-hidden bg-preview-bg">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
        {children}
      </div>
    </div>
  );
}

function stageLabel(images: ProjectImage[]) {
  if (images.length > 1) return `app preview · ${images.length} screens`;
  return images[0]?.caption ? `app preview · ${images[0].caption.toLowerCase()}` : "app preview";
}

export function PhoneFrame({
  image,
  sizes = "(min-width: 1024px) 220px, 40vw",
  preload = false,
  className,
}: {
  image: ProjectImage;
  sizes?: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[460/974] overflow-hidden rounded-[1.4rem] border-[5px] border-foreground/85 bg-preview-bg shadow-[var(--card-shadow)]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover object-top"
      />
    </div>
  );
}

/** Tinted stage with up to three phone screenshots. */
export function PhoneShowcase({ images, preload = false }: { images: ProjectImage[]; preload?: boolean }) {
  const shown = images.slice(0, 3);
  const label = stageLabel(images);
  if (shown.length === 1) {
    return (
      <StageFrame label={label}>
        <div className="relative flex aspect-[16/10] items-center justify-center py-[6%]">
          <PhoneFrame
            image={shown[0]}
            preload={preload}
            sizes="(min-width: 1024px) 260px, 40vw"
            className="h-full w-auto"
          />
        </div>
      </StageFrame>
    );
  }
  return (
    <StageFrame label={label}>
      <div className="relative grid aspect-[16/10] grid-cols-3 items-center gap-3 px-5 sm:gap-5 sm:px-10">
        {shown.map((image, index) => (
          <PhoneFrame
            key={image.src}
            image={image}
            preload={preload && index === 0}
            sizes="(min-width: 1024px) 180px, 28vw"
            className={cn(index === 1 ? "translate-y-0" : "translate-y-4 sm:translate-y-6")}
          />
        ))}
      </div>
    </StageFrame>
  );
}

export function ProjectMedia({
  preview,
  gallery,
  preload = false,
  sizes = "(min-width: 1024px) 640px, 100vw",
  className,
  imageClassName,
}: {
  preview: ProjectPreview;
  gallery?: ProjectImage[];
  preload?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}) {
  if (preview.type === "illustration") {
    if (preview.device === "mobile") {
      return (
        <div className={className}>
          <StageFrame label="app preview">
            <div className="relative flex aspect-[16/10] items-center justify-center py-5">
              <div
                role="img"
                aria-label={`${preview.label} (illustration, not a screenshot)`}
                className={cn(
                  "h-full overflow-hidden rounded-[1.4rem] border-[5px] border-foreground/85 aspect-[300/600]",
                  imageClassName,
                )}
              >
                <Illustration kind={preview.kind} />
              </div>
            </div>
            <IllustrationTag label={preview.label.replace(/^Illustrative\s*/i, "")} />
          </StageFrame>
        </div>
      );
    }

    return (
      <BrowserFrame className={className}>
        <div
          role="img"
          aria-label={`${preview.label} (illustration, not a screenshot)`}
          className={cn("absolute inset-0", imageClassName)}
        >
          <Illustration kind={preview.kind} />
        </div>
        <IllustrationTag label={preview.label.replace(/^Illustrative\s*/i, "")} />
      </BrowserFrame>
    );
  }

  const { image } = preview;

  if (image.device === "mobile") {
    const mobiles = (gallery ?? []).filter((item) => item.device === "mobile");
    return (
      <div className={className}>
        <PhoneShowcase images={mobiles.length ? mobiles : [image]} preload={preload} />
      </div>
    );
  }

  return (
    <BrowserFrame
      host={hostOf(image.sourceUrl)}
      className={className}
      aspectRatio={image.width * 10 === image.height * 16 ? undefined : `${image.width} / ${image.height}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover object-top", imageClassName)}
      />
    </BrowserFrame>
  );
}
