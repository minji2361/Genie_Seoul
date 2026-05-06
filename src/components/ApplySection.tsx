"use client";

import { useState } from "react";
import type { FormData } from "@/types";

const INTERESTS = ["지니어링", "지니어스", "지니데이", "지니클럽", "번개모임"];

export default function ApplySection() {
  const [form, setForm]           = useState<FormData>({ name: "", email: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="apply" className="bg-[#111] py-24">
      <div className="container-genie">

        {/* 2-col grid: info left, form right */}
        <div className="grid lg:grid-cols-[1fr_520px] gap-16 xl:gap-24 items-start">

          {/* ── LEFT: Copy + interest picker ── */}
          <div>
            <p className="section-eyebrow text-[#FFE600]/35 mb-4">JOIN GENIE</p>
            <h2 className="font-display text-6xl lg:text-7xl text-white leading-none mb-6">
              신청하기
            </h2>
            <p className="text-white/55 text-sm leading-relaxed mb-10 max-w-sm">
              고민이 많은 청년을 대상으로 &apos;변화 전&apos;과 &apos;변화 후&apos;의 모습을 그림으로 체험합니다.
              인터뷰와 코칭을 통해 나의 문제를 해결하고, 변화한 모습을 직접 확인해보세요.
            </p>

            {/* Interest category buttons */}
            <div className="mb-10">
              <p className="text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-4">관심 카테고리 선택</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => setForm({ ...form, interest })}
                    className={`text-sm font-bold px-5 py-2.5 border-2 transition-all ${
                      form.interest === interest
                        ? "bg-[#FFE600] text-[#111] border-[#FFE600]"
                        : "border-white/20 text-white/45 hover:border-[#FFE600] hover:text-[#FFE600]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Info rows */}
            <div className="border border-white/10 divide-y divide-white/10">
              {[
                { label: "참여 대상", value: "중랑 지역 거주 만 19–39세 청년" },
                { label: "참여 비용", value: "무료 (일부 프로그램 재료비 별도)" },
                { label: "모집 방식", value: "온라인 신청 후 개별 연락" },
                { label: "문의",     value: "genie@example.com" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center px-5 py-4">
                  <span className="text-white/38 text-xs font-bold tracking-wider">{r.label}</span>
                  <span className="text-white/65 text-sm">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="bg-[#1a1a1a] p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-20">
                <div className="font-display text-[#FFE600] text-5xl mb-4">신청 완료!</div>
                <p className="text-white/55 text-sm leading-relaxed mb-10">
                  신청해주셔서 감사합니다.<br />
                  빠른 시일 내에 연락드리겠습니다.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", interest: "", message: "" }); }}
                  className="btn-primary"
                >
                  다시 신청하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <h3 className="font-display text-[#FFE600] text-2xl mb-2">신청 폼</h3>

                {[
                  { name: "name",  label: "이름 *",  type: "text",  placeholder: "홍길동",          required: true },
                  { name: "email", label: "이메일 *", type: "email", placeholder: "hello@example.com", required: true },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-2">{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type}
                      value={(form as unknown as Record<string, string>)[f.name]}
                      onChange={handleChange}
                      required={f.required}
                      placeholder={f.placeholder}
                      className="genie-input"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-2">관심 분야</label>
                  <input
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    placeholder="왼쪽에서 선택하거나 직접 입력"
                    className="genie-input"
                  />
                </div>

                <div>
                  <label className="block text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-2">하고 싶은 말</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="자유롭게 남겨주세요"
                    className="genie-input resize-none"
                  />
                </div>

                <button type="submit" className="w-full btn-primary text-center py-4 text-base mt-2">
                  무료로 신청하기 →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
