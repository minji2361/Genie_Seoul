"use client";

import { useState } from "react";
import { FAQS } from "@/data";

export default function GenieInterviewSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="genie-interview" className="bg-genie-lavender/70 py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-2xl font-bold text-genie-purple lg:text-3xl">자주 묻는 질문</h2>
        <p className="mt-2 text-sm font-normal text-[#333] sm:text-base">로그인 후 FAQ를 확인할 수 있어요.</p>

        <ul className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 lg:mt-10">
          {FAQS.map((faq, idx) => (
            <li
              key={idx}
              className={`overflow-hidden rounded-xl border transition-colors ${
                open === idx ? "border-genie-purple bg-white" : "border-genie-purple/15 bg-white/85"
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="text-sm font-bold leading-snug text-[#111] sm:text-base">{faq.q}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-genie-purple text-lg font-bold transition-colors ${
                    open === idx ? "bg-genie-yellow" : "bg-white"
                  }`}
                  aria-hidden
                >
                  {open === idx ? "−" : "+"}
                </span>
              </button>
              {open === idx ? (
                <div className="border-t border-genie-lavender px-4 pb-4 pt-3">
                  <p className="text-sm font-normal leading-relaxed text-[#333] sm:text-base">{faq.a}</p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
