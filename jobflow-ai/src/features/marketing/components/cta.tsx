import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Reveal, buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

export function CTA() {
  return (
    <Container className="py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border px-6 py-16 text-center sm:px-16">
          {/* glow backdrop */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-card to-accent/10" />
          <div className="absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]" />
          <div className="absolute inset-0 -z-10 bg-dots opacity-20" />

          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Your next offer is closer than your inbox.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Join 12,000+ engineers who found their role with JobFlow AI. Free to start —
            no credit card.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/jobs" className={cn(buttonVariants({ size: "lg" }), "group w-full sm:w-auto")}>
              Get started free
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/ai-tools"
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full sm:w-auto")}
            >
              Explore AI tools
            </Link>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
