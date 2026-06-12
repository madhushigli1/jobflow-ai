import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Container, buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

export default function NotFound() {
  return (
    <Container className="grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-background-elevated text-primary">
          <Compass className="size-7" />
        </span>
        <p className="mt-6 text-7xl font-semibold tracking-tight text-gradient">404</p>
        <h1 className="mt-2 text-2xl font-semibold">This page wandered off</h1>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
          back on track.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants(), "group")}>
            <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <Link href="/jobs" className={buttonVariants({ variant: "glass" })}>
            Browse jobs
          </Link>
        </div>
      </div>
    </Container>
  );
}
