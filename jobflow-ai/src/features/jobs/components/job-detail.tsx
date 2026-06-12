import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Clock,
  Users,
  Building2,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react";
import { Container, Badge, ScoreRing } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import { formatSalary, timeAgo } from "@/shared/utils/format";
import { user } from "@/shared/lib/mock-db";
import type { Job } from "@/shared/types";
import { ApplyButton } from "./apply-button";
import { JobCard } from "./job-card";

export function JobDetail({ job, related }: { job: Job; related: Job[] }) {
  const matchedSkills = job.tags.filter((t) =>
    user.skills.some((s) => s.toLowerCase() === t.toLowerCase()),
  );

  return (
    <Container className="py-10">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to jobs
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* main */}
        <div>
          <header className="glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-3xl font-bold text-white ring-1 ring-white/10",
                  job.company.brand,
                )}
              >
                {job.company.logo}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
                  {job.featured && <Badge variant="primary" size="sm">Featured</Badge>}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {job.company.name} · {job.company.industry}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <Meta icon={MapPin} text={`${job.location} · ${job.workMode}`} />
              <Meta icon={Briefcase} text={`${job.type} · ${job.level}`} />
              <Meta icon={Clock} text={`Posted ${timeAgo(job.postedAt)}`} />
              <Meta icon={Users} text={`${job.applicants} applicants`} />
            </div>
          </header>

          <Section title="About the role">
            <p className="leading-relaxed text-muted-foreground">{job.description}</p>
          </Section>

          <Section title="What you'll do">
            <List items={job.responsibilities} />
          </Section>

          <Section title="What we're looking for">
            <List items={job.requirements} />
          </Section>

          <Section title="Perks & benefits">
            <div className="flex flex-wrap gap-2">
              {job.perks.map((p) => (
                <Badge key={p} variant="outline">{p}</Badge>
              ))}
            </div>
          </Section>
        </div>

        {/* sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Estimated salary</p>
                <p className="mt-0.5 text-xl font-semibold">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    {job.type === "Internship" ? "/mo" : "/yr"}
                  </span>
                </p>
              </div>
              <ScoreRing value={job.matchScore} size={60} />
            </div>
            <ApplyButton className="mt-5" />
          </div>

          {/* AI match breakdown */}
          <div className="border-gradient rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" /> Why you match
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Your profile aligns with{" "}
              <span className="font-medium text-foreground">{job.matchScore}%</span> of this role.
            </p>
            <div className="mt-4 space-y-2">
              {matchedSkills.length > 0 ? (
                matchedSkills.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-success" />
                    <span>{s}</span>
                    <span className="ml-auto text-xs text-muted-foreground">in your profile</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Strong overall fit based on your experience and goals.
                </p>
              )}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Building2 className="size-4 text-primary" /> About {job.company.name}
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Industry" value={job.company.industry} />
              <Row label="Company size" value={job.company.size} />
              <Row label="Work mode" value={job.workMode} />
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Similar roles</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <JobCard key={r.id} job={r} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

function Meta({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="size-4" /> {text}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
