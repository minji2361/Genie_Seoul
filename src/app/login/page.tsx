"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-genie-purple">
        <p className="text-white/90">홈으로 이동 중...</p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(id.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-genie-purple px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <Link href="/" className="text-4xl font-extrabold text-genie-yellow">
            genie
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-xl tablet:p-8"
        >
          <h1 className="mb-6 text-center text-xl font-bold text-neutral-900">코치 로그인</h1>

          <label className="mb-4 block">
            {/* <span className="mb-1.5 block text-sm font-medium text-neutral-700">아이디</span> */}
            <input
              autoComplete="email"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-neutral-900 outline-none ring-genie-purple/30 transition focus:border-genie-purple focus:ring-2"
              placeholder="이메일"
              type="email"
              required
            />
          </label>

          <label className="mb-6 block">
            {/* <span className="mb-1.5 block text-sm font-medium text-neutral-700">비밀번호</span> */}
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-neutral-900 outline-none ring-genie-purple/30 transition focus:border-genie-purple focus:ring-2"
              placeholder="비밀번호"
              required
            />
          </label>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-genie-purple px-4 py-3 text-sm font-bold text-white transition hover:bg-[#4a1fb8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <p className="mt-6 text-center">
            <Link href="/" className="text-sm text-neutral-500 hover:text-genie-purple">
              홈으로 돌아가기
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
