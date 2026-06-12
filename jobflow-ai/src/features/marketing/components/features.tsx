import {
  Target,
  LayoutGrid,
  PenLine,
  BarChart3,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Container, Section, Eyebrow, Reveal, StaggerGroup } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

const features = [
  {
    icon: Target,
    title: "AI match scoring",
    desc: "Every role is scored 0–100 against your skills and goals, so you apply where you'll actually win.",
    span: "lg:col-span-2",
    accent: "from-primary/20 to-transparent",
  },
  {
    icon: PenLine,
    title: "Tailored cover letters",
    desc: "Generate a letter that sounds like you, tuned to each job — in seconds.",
    span: "",
    accent: "from-accent/20 to-transparent",
  },
  {
    icon: LayoutGrid,
    title: "One-board tracking",
    desc: "Drag applications across Saved → Applied → Interview → Offer. Never lose track again.",
    span: "",
    accent: "from-indigo/20 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Search analytics",
    desc: "Response, interview, and offer rates over time — know what's working and double down.",
    span: "lg:col-span-2",
    accent: "from-success/20 to-transparent",
  },
  {
    icon: Zap,
    title: "One-click apply",
    desc: "Your profile, autofilled. Apply in a tap and JobFlow logs it for you.",
    span: "",
    accent: "from-warning/20 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "Your data is yours. No recruiters spamming your inbox, ever.",
    span: "lg:col-span-2",
    accent: "from-primary/20 to-transparent",
  },
];

export function Features() {
  return (
    <Section id="features">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Everything in one place</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            The whole job search,
            <span className="text-gradient-brand"> handled.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop juggling tabs, docs, and spreadsheets. JobFlow brings discovery,
            tracking, and AI assistance into a single, beautiful workspace.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Reveal key={f.title} className={f.span}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40">
                <div
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                    f.accent,
                  )}
                />
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background-elevated text-primary">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </article>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
