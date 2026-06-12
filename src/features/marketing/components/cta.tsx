import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Reveal, buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

export function CTA() {
  return (
    <Container className="py-20">
      <Reveal>
        <div className="relative overflow-hidden border-2 border-foreground bg-accent text-accent-foreground shadow-brutal-lg">
          <div className="px-6 py-16 text-center sm:px-16">
            <span className="label inline-block text-accent-foreground/80">Start free today</span>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
              Your next offer is closer than your inbox.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-accent-foreground/85">
              Join 12,000+ engineers who found their role with JobFlow. Free to start —
              no credit card.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "group w-full shadow-[4px_4px_0_0_hsl(var(--accent-foreground))] hover:shadow-[2px_2px_0_0_hsl(var(--accent-foreground))] sm:w-auto",
                )}
              >
                Get started free
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/ai-tools"
                className="label flex h-13 items-center justify-center border-2 border-accent-foreground px-7 text-accent-foreground transition-colors hover:bg-accent-foreground hover:text-accent"
              >
                Explore AI tools
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
