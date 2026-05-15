"use client";

import Link from "next/link";

import { useAuth } from "@/app/context/AuthContext";

export function AuthNavItem() {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <button
        type="button"
        onClick={() => logout()}
        className="block whitespace-nowrap font-bold text-genie-yellow hover:text-white"
      >
        로그아웃
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="block whitespace-nowrap font-normal hover:text-genie-yellow"
    >
      로그인
    </Link>
  );
}
