import type { Metadata } from "next";
import { Container } from "@/shared/ui";
import { JobsBoard } from "@/features/jobs";

export const metadata: Metadata = {
  title: "Find Jobs",
  description:
    "Browse AI-matched frontend roles. Filter by work mode, level, salary, and more — sorted by how well they fit you.",
};

export default function JobsPage() {
  return (
    <>
      <section className="border-b border-border/60 pb-2 pt-10">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Find your <span className="text-gradient-brand">match</span>
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Every role is scored against your profile. Filter, sort, and apply to the
            ones you&apos;re most likely to land.
          </p>
        </Container>
      </section>
      <JobsBoard />
    </>
  );
}
