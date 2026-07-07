"use client";

import { useAuth } from "@/app/context/AuthContext";
import { InterviewNav } from "@/components/InterviewNav";

export function InterviewShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-genie-lavender">
      <InterviewNav />
      <main>{children}</main>
    </div>
  );
}
