import { Quote } from "lucide-react";
import { Container, Section, Eyebrow, Reveal, Avatar } from "@/shared/ui";
import { testimonials } from "@/shared/lib/mock-db";

export function Testimonials() {
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Loved by job seekers</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Offers, not anxiety
          </h2>
        </Reveal>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-2 [&>*]:mb-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08}>
              <figure className="break-inside-avoid rounded-2xl border border-border bg-card/40 p-6">
                <Quote className="size-6 text-primary/60" />
                <blockquote className="mt-4 text-pretty leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
