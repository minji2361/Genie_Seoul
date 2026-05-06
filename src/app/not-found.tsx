import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFE600] flex flex-col items-center justify-center px-5 text-center">
      <p className="section-eyebrow text-[#111]/35 mb-4">PAGE NOT FOUND</p>
      <div className="font-display text-[120px] md:text-[200px] text-[#111] leading-none">
        404
      </div>
      <p className="font-display text-2xl md:text-3xl text-[#111]/45 mb-10">페이지를 찾을 수 없어요</p>
      <Link href="/" className="btn-primary text-base py-4 px-10">
        홈으로 돌아가기 →
      </Link>
    </div>
  );
}
