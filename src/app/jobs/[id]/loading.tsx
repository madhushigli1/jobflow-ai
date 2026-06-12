import { Container, Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <Container className="py-10">
      <Skeleton className="h-4 w-24" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="mt-8 h-5 w-40" />
          <Skeleton className="mt-3 h-24 w-full" />
          <Skeleton className="mt-8 h-5 w-40" />
          <Skeleton className="mt-3 h-32 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </div>
    </Container>
  );
}
