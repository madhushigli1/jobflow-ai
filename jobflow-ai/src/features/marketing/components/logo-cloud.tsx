const companies = [
  "Vercel",
  "Linear",
  "Stripe",
  "Figma",
  "Notion",
  "Ramp",
  "Supabase",
  "Perplexity",
];

export function LogoCloud() {
  return (
    <section className="border-b-2 border-foreground bg-background">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-5 sm:px-8">
        <p className="label hidden shrink-0 text-muted-foreground md:block">Candidates hired at</p>
        <div className="mask-fade-edges relative flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker gap-10">
            {[...companies, ...companies].map((name, i) => (
              <span key={i} className="shrink-0 font-serif text-2xl italic text-foreground/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
