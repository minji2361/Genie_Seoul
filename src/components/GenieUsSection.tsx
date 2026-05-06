"use client";

import { useState } from "react";
import { PROGRAMS } from "@/data";
import type { CategoryKey } from "@/types";

const FILTERS: { key: CategoryKey | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "geniering", label: "지니어링" },
  { key: "genius", label: "지니어스" },
  { key: "genieday", label: "지니데이" },
  { key: "genieclub", label: "지니클럽" },
];

const STATUS_COLOR: Record<string, string> = {
  모집중: "bg-[#FFE600] text-[#111]",
  진행중: "bg-[#111] text-[#FFE600]",
  마감임박: "bg-red-500 text-white",
  종료: "bg-gray-200 text-gray-500",
};

export default function GenieUsSection() {
  const [active, setActive] = useState<CategoryKey | "all">("all");
  const filtered = active === "all" ? PROGRAMS : PROGRAMS.filter((p) => p.category === active);
  const featured = PROGRAMS[0];
  const list = active === "all" ? filtered.slice(1) : filtered;

  return (
    <section id="genie-us" className="py-24 bg-[#F5F5F5] scroll-mt-20">
      <div className="container-genie">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-4">
          <div>
            <p className="section-eyebrow mb-4">CURRENT PROGRAMS</p>
            <h2 className="font-display text-6xl lg:text-7xl text-[#111] leading-none">
              진행 중인<br />프로그램
            </h2>
          </div>
          <span className="self-start lg:self-auto font-bold text-sm text-[#888] whitespace-nowrap">한 페이지에서 전체 확인</span>
        </div>
        <div className="flex gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`font-bold text-sm px-5 py-2.5 border-2 border-[#111] transition-all ${
                active === f.key ? "bg-[#111] text-[#FFE600]" : "bg-white text-[#111] hover:bg-[#FFE600]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {active === "all" && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-[2px] mb-[2px] bg-[#111]">
            <div className="block">
              <div className="bg-[#FFE600] p-8 lg:p-10 flex flex-col justify-between min-h-[320px] h-full hover:bg-[#f5dc00] transition-colors cursor-pointer">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="tag-pill">FEATURED</span>
                    <span className="font-bold text-xs text-[#111]/55 tracking-wider">{featured.categoryLabel}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 ${STATUS_COLOR[featured.status]}`}>{featured.status}</span>
                  </div>
                  <h3 className="font-display text-4xl lg:text-5xl text-[#111] mb-2 leading-tight">{featured.title}</h3>
                  <p className="text-[#111]/55 text-base">{featured.subtitle}</p>
                </div>
                <div className="flex items-end justify-between mt-6 pt-6 border-t-2 border-[#111]/15">
                  <div>
                    <p className="text-sm font-bold text-[#111]">{featured.date}</p>
                    <p className="text-sm text-[#111]/55 mt-1">{featured.location}</p>
                  </div>
                  <span className="font-display text-2xl text-[#111]">자세히 보기 →</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              {PROGRAMS.slice(1, 4).map((prog) => (
                <div key={prog.id} className="flex-1 block">
                  <div className="bg-white p-5 h-full flex flex-col justify-between hover:bg-[#FFFBE0] transition-colors cursor-pointer min-h-[100px]">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold tracking-wider text-[#999]">{prog.categoryLabel}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 ${STATUS_COLOR[prog.status]}`}>{prog.status}</span>
                      </div>
                      <p className="font-bold text-[#111] text-sm leading-snug">{prog.title}</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <p className="text-xs text-[#999]">{prog.date}</p>
                      <p className="text-xs font-bold text-[#111]">{prog.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-0">
          {list.map((prog) => (
            <div key={prog.id} className="block">
              <div className="prog-card bg-white">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold tracking-wider text-[#999]">{prog.categoryLabel}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 ${STATUS_COLOR[prog.status]}`}>{prog.status}</span>
                  </div>
                  <p className="font-bold text-[#111] text-base">{prog.title}</p>
                  <p className="text-sm text-[#555] mt-0.5">{prog.subtitle}</p>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-sm font-bold text-[#111]">{prog.date}</p>
                  <p className="text-xs text-[#999] mt-0.5">{prog.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#111]">{prog.price}</p>
                  <p className="text-xs text-[#999]">정원 {prog.capacity}명</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
