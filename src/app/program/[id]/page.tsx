import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplySection from "@/components/ApplySection";
import { PROGRAMS, REVIEWS } from "@/data";

const STATUS_COLOR: Record<string, string> = {
  모집중:   "bg-[#FFE600] text-[#111]",
  진행중:   "bg-[#111] text-[#FFE600]",
  마감임박: "bg-red-500 text-white",
  종료:     "bg-gray-200 text-gray-500",
};

type Props = { params: { id: string } };

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ id: p.id }));
}

export default function ProgramDetailPage({ params }: Props) {
  const program = PROGRAMS.find((p) => p.id === params.id);
  if (!program) notFound();

  const related = PROGRAMS.filter(
    (p) => p.category === program.category && p.id !== program.id
  ).slice(0, 3);

  const programReviews = REVIEWS.filter(
    (r) => r.program === program.title
  ).slice(0, 2);

  const isBlack = program.category === "genius";

  const STEPS = [
    { step: "01", title: "노방 / 온라인 홍보",     desc: "지역 청년 취향 데이터를 위한 Q&A 인터뷰" },
    { step: "02", title: "홈페이지 신청",           desc: "QR 코드 및 링크를 통해 지니 홈페이지 접속 후 신청" },
    { step: "03", title: "설문 / 취향 테스트",      desc: "관심사, 라이프스타일, 활동 성향을 체크하는 간단한 테스트" },
    { step: "04", title: "프로그램 매칭 & 시작",    desc: "결과에 따라 동아리, 원데이클래스, 문화행사 제안 후 참여" },
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className={`pt-[60px] ${isBlack ? "bg-[#111]" : "bg-[#FFE600]"}`}>
        <div className="container-genie py-16">

          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 text-[11px] font-bold mb-8 ${isBlack ? "text-white/28" : "text-[#111]/38"}`}>
            <Link href="/" className="hover:opacity-70 transition-opacity">홈</Link>
            <span>›</span>
            <Link href="/program" className="hover:opacity-70 transition-opacity">전체 프로그램</Link>
            <span>›</span>
            <span className={isBlack ? "text-white" : "text-[#111]"}>{program.title}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">

            {/* Title block */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="tag-pill">{program.categoryLabel}</span>
                <span className={`text-xs font-bold px-3 py-1 ${STATUS_COLOR[program.status]}`}>
                  {program.status}
                </span>
              </div>
              <h1 className={`font-display text-5xl lg:text-7xl xl:text-8xl leading-[0.88] mb-4 ${isBlack ? "text-white" : "text-[#111]"}`}>
                {program.title}
              </h1>
              <p className={`text-xl ${isBlack ? "text-white/45" : "text-[#111]/55"}`}>
                {program.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {program.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] font-bold px-3 py-1 border ${
                      isBlack ? "border-white/18 text-white/45" : "border-[#111]/18 text-[#111]/55"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div className={`border-2 p-7 ${isBlack ? "border-white/18 bg-white/5" : "border-[#111] bg-white/35"}`}>
              <p className={`text-[10px] font-bold tracking-[3px] mb-5 ${isBlack ? "text-white/35" : "text-[#111]/38"}`}>
                프로그램 정보
              </p>
              <dl className="space-y-4 mb-7">
                {[
                  { dt: "일시",   dd: program.date },
                  { dt: "장소",   dd: program.location },
                  { dt: "정원",   dd: `${program.capacity}명` },
                  { dt: "참가비", dd: program.price },
                ].map((r) => (
                  <div key={r.dt} className="flex justify-between gap-4 items-center">
                    <dt className={`text-xs font-bold tracking-wider ${isBlack ? "text-white/35" : "text-[#111]/38"}`}>{r.dt}</dt>
                    <dd className={`text-sm font-bold ${isBlack ? "text-white" : "text-[#111]"}`}>{r.dd}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#apply"
                className={`block text-center font-bold text-sm py-4 transition-opacity hover:opacity-85 ${
                  isBlack ? "bg-[#FFE600] text-[#111]" : "bg-[#111] text-[#FFE600]"
                }`}
              >
                신청하기 →
              </a>
            </div>
          </div>
        </div>

        {/* Tag ticker strip */}
        {!isBlack && (
          <div className="bg-[#111] py-3">
            <div className="container-genie flex gap-8 overflow-x-auto scrollbar-hide">
              {program.tags.map((tag) => (
                <span key={tag} className="font-display text-[#FFE600] text-sm tracking-widest whitespace-nowrap">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Body ── */}
      <section className="bg-white py-20">
        <div className="container-genie">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 xl:gap-20">

            {/* Main content */}
            <div>
              <h2 className="font-display text-4xl text-[#111] mb-6">프로그램 소개</h2>
              <p className="text-[#555] leading-loose text-base mb-14 max-w-prose">
                {program.description}
              </p>

              {/* Process steps */}
              <div className="border-t-2 border-[#111] pt-10 mb-14">
                <h3 className="font-display text-3xl text-[#111] mb-8">진행 방식</h3>
                <div className="grid sm:grid-cols-2 gap-[2px] bg-[#eee]">
                  {STEPS.map((s) => (
                    <div key={s.step} className="bg-white p-6 flex gap-5 items-start">
                      <div className="w-11 h-11 bg-[#FFE600] flex items-center justify-center font-display text-sm text-[#111] shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <p className="font-bold text-[#111] mb-1.5">{s.title}</p>
                        <p className="text-sm text-[#777] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program reviews (if any) */}
              {programReviews.length > 0 && (
                <div className="border-t-2 border-[#111] pt-10">
                  <h3 className="font-display text-3xl text-[#111] mb-8">참여자 후기</h3>
                  <div className="grid sm:grid-cols-2 gap-[2px] bg-[#111]">
                    {programReviews.map((r) => (
                      <div key={r.id} className="bg-[#F5F5F5] p-6">
                        <div className="flex gap-0.5 mb-3">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <span key={i} className="text-[#FFE600] text-sm" style={{ fontFamily: "serif" }}>★</span>
                          ))}
                        </div>
                        <p className="text-sm text-[#444] leading-relaxed mb-4">&ldquo;{r.content}&rdquo;</p>
                        <p className="text-xs text-[#999] font-bold">{r.name} · 만 {r.age}세</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Tags */}
              <div className="bg-[#F5F5F5] p-6">
                <p className="text-[10px] font-bold tracking-[3px] text-[#999] mb-4">TAGS</p>
                <div className="flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold bg-[#FFE600] text-[#111] px-3 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="border-2 border-[#111] p-6">
                <p className="text-[10px] font-bold tracking-[3px] text-[#999] mb-4">SHARE</p>
                <div className="flex gap-2 flex-wrap">
                  {["링크 복사", "카카오", "인스타"].map((s) => (
                    <button
                      key={s}
                      className="text-xs font-bold border border-[#ddd] px-3 py-2 hover:border-[#111] hover:bg-[#FFE600] transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Related programs */}
              {related.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-[3px] text-[#999] mb-4">관련 프로그램</p>
                  <div className="space-y-[2px] bg-[#111]">
                    {related.map((r) => (
                      <Link key={r.id} href={`/program/${r.id}`} className="block">
                        <div className="bg-white p-5 hover:bg-[#FFFBE0] transition-colors">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[10px] font-bold text-[#999]">{r.categoryLabel}</p>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 ${STATUS_COLOR[r.status]}`}>{r.status}</span>
                          </div>
                          <p className="font-bold text-[#111] text-sm leading-snug">{r.title}</p>
                          <p className="text-xs text-[#999] mt-0.5">{r.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back */}
              <Link
                href="/program"
                className="block text-center font-bold text-sm border-2 border-[#111] py-3 hover:bg-[#111] hover:text-[#FFE600] transition-all"
              >
                ← 전체 프로그램 목록
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ApplySection />
      <Footer />
    </>
  );
}
