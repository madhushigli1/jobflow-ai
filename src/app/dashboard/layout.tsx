import { api } from "@/shared/lib/api-client";
import { Container, Avatar, Progress } from "@/shared/ui";
import { SubNav } from "@/shared/layout/sub-nav";
import { dashboardNav } from "@/config/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.user.get();

  return (
    <div className="pb-16">
      <section className="border-b-2 border-foreground pt-10">
        <Container>
          <div className="flex flex-col gap-6 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={user.name} size="lg" />
              <div>
                <h1 className="font-serif text-4xl font-light tracking-tight">
                  Welcome back, {user.name.split(" ")[0]}
                </h1>
                <p className="label mt-1 text-muted-foreground">
                  {user.title} · {user.location}
                </p>
              </div>
            </div>

            <div className="w-full max-w-xs border-2 border-foreground bg-card p-4">
              <div className="label flex items-center justify-between">
                <span className="text-muted-foreground">Profile strength</span>
                <span className="font-semibold text-accent">{user.profileStrength}%</span>
              </div>
              <Progress value={user.profileStrength} className="mt-2.5" />
            </div>
          </div>

          <SubNav items={dashboardNav} />
        </Container>
      </section>

      <Container className="pt-8">{children}</Container>
    </div>
  );
}
