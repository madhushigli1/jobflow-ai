import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
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
        <Eyebrow>
          <Sparkles className="size-3.5" /> AI workspace
        </Eyebrow>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Your unfair advantage
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
