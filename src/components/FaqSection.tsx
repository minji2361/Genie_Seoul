"use client";

import { useState } from "react";
import { FAQS } from "@/data";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#F5F5F5]">
      <div className="container-genie">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 xl:gap-24 items-start">

          {/* Left: heading */}
          <div className="lg:sticky lg:top-24">
            <p className="section-eyebrow mb-4">FREQUENTLY ASKED</p>
            <h2 className="font-display text-6xl lg:text-7xl text-[#111] leading-none mb-6">
              자주 묻는<br />질문
            </h2>
            <p className="text-sm text-[#666] leading-relaxed">
              더 궁금한 점이 있으시면<br />
              신청 폼에서 직접 문의해주세요.
            </p>
            <a
              href="#apply"
              className="inline-block mt-6 font-bold text-sm text-[#111] border-b-2 border-[#FFE600] pb-0.5 hover:border-[#111] transition-colors"
            >
              문의하기 →
            </a>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col gap-[2px]">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`border-2 transition-colors ${
                  open === idx ? "border-[#111] bg-white" : "border-transparent bg-white"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  <span className="font-bold text-[#111] text-base leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 border-2 border-[#111] flex items-center justify-center font-display text-lg transition-all ${
                      open === idx ? "bg-[#FFE600]" : "bg-white"
                    }`}
                  >
                    {open === idx ? "−" : "+"}
                  </span>
                </button>

                {open === idx && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-[#eee] pt-5">
                      <p className="text-sm text-[#555] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
