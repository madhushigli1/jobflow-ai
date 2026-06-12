import { Container, Section, Eyebrow, Reveal, Avatar } from "@/shared/ui";
import { testimonials } from "@/shared/lib/mock-db";

export function Testimonials() {
  return (
    <Section className="border-b-2 border-foreground">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Loved by job seekers</Eyebrow>
          <h2 className="mt-5 font-serif text-5xl font-light tracking-tight sm:text-6xl">
            Offers, not anxiety
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08}>
              <figure className="flex h-full flex-col bg-card p-8">
                <span className="font-serif text-6xl leading-none text-accent">“</span>
                <blockquote className="-mt-4 font-serif text-2xl font-light leading-snug text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-foreground pt-5">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="label text-muted-foreground">{t.role}</p>
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
