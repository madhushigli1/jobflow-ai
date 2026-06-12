import type { Metadata } from "next";
import { Container, Eyebrow } from "@/shared/ui";
import { AiTools } from "@/features/ai-tools";

export const metadata: Metadata = {
  title: "AI Tools",
  description:
    "Analyze your resume, generate tailored cover letters, and score your fit for any role — powered by AI.",
};

export default function AiToolsPage() {
  return (
    <Container className="py-12">
      <div className="max-w-2xl">
        <Eyebrow>AI Workspace</Eyebrow>
        <h1 className="mt-5 font-serif text-5xl font-light tracking-tight sm:text-6xl">
          Your unfair <span className="italic text-accent">advantage</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Three AI tools to sharpen every application — analyze your resume, write a
          tailored cover letter, and score your fit before you apply.
        </p>
      </div>

      <div className="mt-10">
        <AiTools />
      </div>
    </Container>
  );
}
