import { Container, Section, Eyebrow, Reveal } from "@/shared/ui";

const steps = [
  {
    n: "01",
    title: "Build your profile",
    desc: "Add your skills, experience, and what you're looking for. It takes two minutes — and powers everything else.",
  },
  {
    n: "02",
    title: "Get matched instantly",
    desc: "Our engine scores thousands of roles against your profile and surfaces the ones you're most likely to land.",
  },
  {
    n: "03",
    title: "Apply with AI",
    desc: "One-click apply with autofilled details and a tailored cover letter, generated and ready to edit.",
  },
  {
    n: "04",
    title: "Track to the offer",
    desc: "Every application flows across your board automatically. Watch your pipeline turn into offers.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-b-2 border-foreground">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 font-serif text-5xl font-light tracking-tight sm:text-6xl">
            From sign-up to signed offer
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group flex h-full flex-col bg-card p-7 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="font-serif text-5xl">{s.n}</span>
                <span className="mt-4 h-0.5 w-10 bg-accent transition-colors group-hover:bg-accent-foreground" />
                <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-accent-foreground/80">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
