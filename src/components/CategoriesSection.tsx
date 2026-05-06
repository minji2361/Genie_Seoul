import { CATEGORIES } from "@/data";
import type { Category } from "@/types";

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const isBlack  = cat.color === "black";
  const isYellow = cat.color === "yellow";

  return (
    <div
      className={`cat-card flex flex-col h-full ${
        isBlack
          ? "bg-[#111] text-white"
          : isYellow
          ? "bg-[#FFE600] text-[#111]"
          : "bg-white text-[#111] border-r-0 border-b-0"
      }`}
    >
      {/* Icon circle */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-5 shrink-0 ${
          isBlack ? "bg-[#FFE600]" : isYellow ? "bg-[#111]" : "bg-[#FFE600]"
        }`}
      >
        {cat.icon}
      </div>

      {/* Big number */}
      <div className={`font-display text-[64px] leading-none mb-1 select-none ${
        isBlack ? "text-white/8" : isYellow ? "text-[#111]/8" : "text-[#111]/8"
      }`}>
        0{index + 1}
      </div>

      <h3 className={`font-display text-2xl mb-1 ${isBlack ? "text-[#FFE600]" : "text-[#111]"}`}>
        {cat.nameKr}
      </h3>

      <p className={`text-[10px] font-bold tracking-[3px] mb-4 ${isBlack ? "text-white/35" : "text-[#111]/35"}`}>
        {cat.nameEn}
      </p>

      <p className={`text-sm leading-relaxed mb-5 flex-1 ${isBlack ? "text-white/60" : "text-[#111]/60"}`}>
        {cat.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {cat.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[10px] font-bold px-2.5 py-1 border ${
              isBlack
                ? "border-white/20 text-white/45"
                : isYellow
                ? "border-[#111]/20 text-[#111]/55"
                : "border-[#111]/18 text-[#111]/55"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-24 bg-white">
      <div className="container-genie">

        {/* Section header — 2-col on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <div>
            <p className="section-eyebrow mb-4">PROGRAM CATEGORIES</p>
            <h2 className="font-display text-6xl lg:text-7xl text-[#111] leading-none">
              카테고리
            </h2>
          </div>
          <p className="text-sm text-[#666] max-w-sm leading-relaxed lg:text-right">
            지니의 4가지 프로그램 카테고리.<br />
            당신의 취향과 일정에 맞는 활동을 찾아보세요.
          </p>
        </div>

        {/* 4-column grid on desktop, 2x2 on tablet, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[#111]">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.key} cat={cat} index={i} />
          ))}
        </div>

        {/* Bottom info strip */}
        <div className="mt-[2px] bg-[#F5F5F5] grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-opacity-0 border-t-0">
          <div className="bg-[#F5F5F5] p-6 sm:col-span-2">
            <p className="text-xs font-bold tracking-widest text-[#999] mb-2">HOW IT WORKS</p>
            <p className="text-sm text-[#555] leading-relaxed">
              관심 분야를 선택하고 신청하면, 지니 팀이 취향과 라이프스타일을 분석해 딱 맞는 프로그램을 연결해 드립니다.
            </p>
          </div>
          <div className="bg-[#FFE600] p-6 flex items-center justify-between lg:justify-center gap-4">
            <span className="font-display text-[#111] text-lg">지금 신청하기</span>
            <a href="#apply" className="font-display text-[#111] text-2xl hover:translate-x-1 transition-transform inline-block">→</a>
          </div>
        </div>
      </div>
    </section>
  );
}
