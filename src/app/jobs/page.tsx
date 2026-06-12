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
      <section className="border-b-2 border-foreground pb-6 pt-12">
        <Container>
          <span className="label text-muted-foreground">The Index — 12 open roles</span>
          <h1 className="mt-3 font-serif text-5xl font-light tracking-tight sm:text-6xl">
            Find your <span className="italic text-accent">match</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Every role is scored against your profile. Filter, sort, and apply to the
            ones you&apos;re most likely to land.
          </p>
        </Container>
      </section>
      <JobsBoard />
    </>
  );
}
