"use client";

import * as React from "react";
import { api } from "@/shared/lib/api-client";
import type { Application, ApplicationStage } from "@/shared/types";

/**
 * Loads applications and exposes an optimistic `move` to change a card's stage.
 * (In a real app, `move` would PATCH the api and reconcile.)
 */
export function useApplications() {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    api.applications.list().then((res) => {
      if (active) {
        setApplications(res.data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const move = React.useCallback((id: string, stage: ApplicationStage) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, stage } : a)),
    );
  }, []);

  return { applications, loading, move };
}
