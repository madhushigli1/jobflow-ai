import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/shared/lib/api-client";
import { formatSalary } from "@/shared/utils/format";
import { JobDetail } from "@/features/jobs";

type Params = { params: Promise<{ id: string }> };

/** Prerender a static page for every job at build time. */
export async function generateStaticParams() {
  const { data } = await api.jobs.list();
  return data.map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const job = await api.jobs.get(id);
  if (!job) return { title: "Job not found" };
  return {
    title: `${job.title} at ${job.company.name}`,
    description: `${job.title} · ${job.company.name} · ${formatSalary(job.salaryMin, job.salaryMax)}. ${job.description}`,
  };
}

export default async function JobDetailPage({ params }: Params) {
  const { id } = await params;
  const [job, related] = await Promise.all([api.jobs.get(id), api.jobs.related(id)]);
  if (!job) notFound();
  return <JobDetail job={job} related={related} />;
}
