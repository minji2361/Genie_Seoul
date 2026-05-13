import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-genie-lavender px-5 text-center">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-genie-purple/60">404</p>
      <h1 className="text-5xl font-extrabold text-genie-purple md:text-7xl">페이지 없음</h1>
      <p className="mt-4 max-w-sm text-sm text-neutral-700">요청하신 페이지를 찾을 수 없어요.</p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-genie-yellow px-8 py-3 text-base font-extrabold text-neutral-900 shadow-md transition hover:brightness-95"
      >
        홈으로 돌아가기 →
      </Link>
    </div>
  );
}
