import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
        This route doesn’t exist
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page may have moved, or the link might be outdated. Head back to the
        homepage or browse projects.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/projects" variant="secondary">
          View projects
        </Button>
      </div>
    </Container>
  );
}
