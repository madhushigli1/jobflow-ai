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
      <section className="border-b border-border/60 bg-gradient-to-b from-card/40 to-transparent pt-10">
        <Container>
          <div className="flex flex-col gap-6 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={user.name} size="lg" />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome back, {user.name.split(" ")[0]}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user.title} · {user.location}
                </p>
              </div>
            </div>

            <div className="w-full max-w-xs rounded-xl border border-border bg-card/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile strength</span>
                <span className="font-semibold text-primary">{user.profileStrength}%</span>
              </div>
              <Progress value={user.profileStrength} className="mt-2" />
            </div>
          </div>

          <SubNav items={dashboardNav} />
        </Container>
      </section>

      <Container className="pt-8">{children}</Container>
    </div>
  );
}
