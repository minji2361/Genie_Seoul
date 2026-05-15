"use client";

import { useAuth } from "@/app/context/AuthContext";
import { DashboardNav } from "@/components/DashboardNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-genie-lavender">
      <DashboardNav />
      <main>{children}</main>
    </div>
  );
}
