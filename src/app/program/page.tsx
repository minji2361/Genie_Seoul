"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROGRAMS, CATEGORIES } from "@/data";
import type { CategoryKey } from "@/types";

const STATUS_COLOR: Record<string, string> = {
  모집중:   "bg-[#FFE600] text-[#111]",
  진행중:   "bg-[#111] text-[#FFE600]",
  마감임박: "bg-red-500 text-white",
  종료:     "bg-gray-200 text-gray-500",
};

export default function ProgramListPage() {
  const [activeCat,    setActiveCat]    = useState<CategoryKey | "all">("all");
  const [activeStatus, setActiveStatus] = useState<string>("all");

  const filtered = PROGRAMS.filter((p) => {
    const catOk    = activeCat    === "all" || p.category === activeCat;
    const statusOk = activeStatus === "all" || p.status   === activeStatus;
    return catOk && statusOk;
  });

  return (
    <>
      <Navbar />

      {/* ── Page hero ── */}
      <section className="bg-[#FFE600] pt-[60px]">
        <div className="container-genie py-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#111]/38 mb-8">
            <Link href="/" className="hover:text-[#111] transition-colors">홈</Link>
            <span>›</span>
            <span className="text-[#111]">전체 프로그램</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] lg:items-end gap-8">
            <div>
              <span className="tag-pill mb-5 inline-block">ALL PROGRAMS</span>
              <h1 className="font-display text-7xl lg:text-9xl text-[#111] leading-[0.88]">
                프로그램
              </h1>
            </div>
            <div className="lg:text-right pb-2">
              <p className="text-[#111]/55 text-sm leading-relaxed mb-4">
                지니의 모든 프로그램을 한눈에.<br />
                취향에 맞는 활동을 찾아보세요.
              </p>
              <p className="font-display text-4xl text-[#111]">
                총 {PROGRAMS.length}개
              </p>
            </div>
          </div>
        </div>

        {/* Category tab bar */}
        <div className="border-t-2 border-[#111] bg-[#111]">
          <div className="container-genie">
            <div className="flex overflow-x-auto scrollbar-hide">
              {[{ key: "all" as const, nameKr: "전체", nameEn: "ALL" }, ...CATEGORIES].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCat(cat.key as CategoryKey | "all")}
                  className={`shrink-0 px-6 py-4 font-display text-sm tracking-wider transition-all border-b-[3px] ${
                    activeCat === cat.key
                      ? "text-[#FFE600] border-[#FFE600]"
                      : "text-white/35 border-transparent hover:text-white/65"
                  }`}
                >
                  {cat.nameKr}
                  <span className="hidden md:inline ml-1.5 text-[9px] opacity-40">
                    {"nameEn" in cat ? cat.nameEn : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="bg-white min-h-screen">
        <div className="container-genie py-12">

          {/* Status filter + count */}
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <span className="text-[10px] font-bold text-[#aaa] tracking-[3px]">STATUS</span>
            {["all", "모집중", "마감임박", "진행중", "종료"].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`text-xs font-bold px-3.5 py-2 border-2 transition-all ${
                  activeStatus === s
                    ? "bg-[#111] text-[#FFE600] border-[#111]"
                    : "border-[#ddd] text-[#888] hover:border-[#111] hover:text-[#111]"
                }`}
              >
                {s === "all" ? "전체" : s}
              </button>
            ))}
            <span className="ml-auto text-xs text-[#aaa] font-bold">{filtered.length}개</span>
          </div>

          {/* Program grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-32 text-[#bbb]">
              <p className="font-display text-4xl mb-3">해당 프로그램이 없어요</p>
              <p className="text-sm">다른 카테고리나 상태를 선택해보세요.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#111]">
              {filtered.map((prog) => (
                <Link key={prog.id} href={`/program/${prog.id}`} className="block">
                  <article
                    className={`h-full p-7 flex flex-col justify-between gap-5 transition-colors cursor-pointer ${
                      prog.isFeatured
                        ? "bg-[#FFE600] hover:bg-[#f5dc00]"
                        : "bg-white hover:bg-[#FFFBE0]"
                    }`}
                    style={{ minHeight: 240 }}
                  >
                    {/* Top */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold tracking-wider text-[#999]">
                          {prog.categoryLabel}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 ${STATUS_COLOR[prog.status]}`}>
                          {prog.status}
                        </span>
                        {prog.isFeatured && <span className="tag-pill text-[10px]">FEATURED</span>}
                      </div>
                      <h2 className="font-display text-2xl text-[#111] leading-snug mb-1">{prog.title}</h2>
                      <p className="text-sm text-[#555] leading-relaxed">{prog.subtitle}</p>
                    </div>

                    {/* Bottom */}
                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <p className="text-xs font-bold text-[#111]">{prog.date}</p>
                          <p className="text-xs text-[#999] mt-0.5">{prog.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#111]">{prog.price}</p>
                          <p className="text-xs text-[#999]">정원 {prog.capacity}명</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {prog.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-bold px-2 py-0.5 border ${
                              prog.isFeatured ? "border-[#111]/18 text-[#111]/55" : "border-[#ddd] text-[#aaa]"
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <p className="font-display text-sm text-[#111] mt-3">자세히 보기 →</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#FFE600] py-16">
        <div className="container-genie flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-[#111] mb-2">
              원하는 프로그램이 없으신가요?
            </h2>
            <p className="text-[#111]/55 text-sm">새로운 프로그램을 제안하거나 문의해보세요.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/#apply" className="btn-primary py-4 px-8">신청하기 →</Link>
            <a href="mailto:genie@example.com" className="btn-outline py-4 px-8">문의하기</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
