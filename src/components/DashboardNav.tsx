"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";

export function DashboardNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-genie-purple">
      <div className="mx-auto flex max-w-content items-center gap-3 overflow-hidden px-4 py-3 tablet:px-6 desktop:px-8">
        <Link href="/" className="shrink-0 text-lg font-extrabold text-genie-yellow">
          genie
        </Link>
        <nav className="nav-scroll-x scrollbar-hide flex min-w-0 flex-1 justify-end">
          <ul className="m-0 flex w-max min-w-full list-none flex-nowrap items-center justify-end gap-x-4 p-0 text-sm font-medium text-white/95">
            <li className="shrink-0">
              <Link href="/" className="whitespace-nowrap hover:text-genie-yellow">
                홈
              </Link>
            </li>
            <li className="shrink-0">
              <Link href="/dashboard" className="whitespace-nowrap hover:text-genie-yellow">
                대시보드
              </Link>
            </li>
            {isDashboard ? (
              <li className="shrink-0">
                <Link
                  href="/dashboard/participant/new"
                  className="whitespace-nowrap hover:text-genie-yellow"
                >
                  대상자 등록
                </Link>
              </li>
            ) : null}
            <li className="shrink-0">
              <button
                type="button"
                onClick={() => logout()}
                className="whitespace-nowrap font-bold text-genie-yellow hover:text-white"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
