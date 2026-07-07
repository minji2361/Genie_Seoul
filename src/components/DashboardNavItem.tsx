"use client";

import Link from "next/link";

import { useAuth } from "@/app/context/AuthContext";

export function DashboardNavItem() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <li className="shrink-0">
        <Link
          href="/dashboard"
          className="block whitespace-nowrap hover:text-genie-yellow"
        >
          Dashboard
        </Link>
      </li>
      <li className="shrink-0">
        <Link
          href="/interview"
          className="block whitespace-nowrap hover:text-genie-yellow"
        >
          Interview
        </Link>
      </li>
    </>
  );
}
