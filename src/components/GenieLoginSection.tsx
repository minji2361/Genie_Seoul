"use client";

import { useState } from "react";

export default function GenieLoginSection() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="genie-login" className="bg-[#111] py-24 scroll-mt-20">
      <div className="container-genie">
        <div className="max-w-[520px] mx-auto bg-[#1a1a1a] p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-7">
            <h2 className="font-display text-[#FFE600] text-4xl text-center mb-2">Genie-Login</h2>

            <div>
              <label className="block text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-2">ID</label>
              <input
                name="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                placeholder="아이디를 입력하세요"
                className="genie-input"
              />
            </div>

            <div>
              <label className="block text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-2">PASSWORD</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
                className="genie-input"
              />
            </div>

            <button type="submit" className="w-full btn-primary text-center py-4 text-base mt-2">
              로그인
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
