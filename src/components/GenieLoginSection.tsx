"use client";

import { useState } from "react";

const PRIMARY_LOGIN_ID = "minji2361";
const TEMP_LOGIN_ID = "temp-minji";
const LOGIN_PASSWORD = "1111";
const LOGIN_STORAGE_KEY = "genie-login-user";

type GenieLoginSectionProps = {
  isLoggedIn: boolean;
  onLogin: (userId?: string) => void;
  onLogout: () => void;
};

export default function GenieLoginSection({ isLoggedIn, onLogin, onLogout }: GenieLoginSectionProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedId = id.trim();
    const trimmedPassword = password.trim();

    if (!trimmedId) {
      setIsSuccess(false);
      setMessage("아이디를 입력해주세요");
      return;
    }

    if (!trimmedPassword) {
      setIsSuccess(false);
      setMessage("비밀번호를 입력해주세요");
      return;
    }

    const isValidId = trimmedId === PRIMARY_LOGIN_ID || trimmedId === TEMP_LOGIN_ID;
    if (!isValidId) {
      setIsSuccess(false);
      setMessage("아이디를 확인해주세요");
      return;
    }

    if (trimmedPassword !== LOGIN_PASSWORD) {
      setIsSuccess(false);
      setMessage("비밀번호를 확인해주세요");
      return;
    }

    setIsSuccess(true);
    setMessage("로그인에 성공했습니다.");
    localStorage.setItem(LOGIN_STORAGE_KEY, trimmedId);
    onLogin(trimmedId);
    setPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    setIsSuccess(true);
    setMessage("로그아웃 되었습니다.");
    onLogout();
  };

  return (
    <section id="genie-login" className="bg-genie-purple py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:max-w-lg sm:p-8 lg:max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-center text-2xl font-black text-genie-yellow">멤버 로그인</h2>

            {!isLoggedIn ? (
              <>
                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-genie-yellow/90">
                    ID
                  </label>
                  <input
                    name="id"
                    type="text"
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value);
                      setMessage("");
                    }}
                    placeholder="아이디를 입력하세요"
                    className="genie-input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-genie-yellow/90">
                    PASSWORD
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessage("");
                    }}
                    placeholder="비밀번호를 입력하세요"
                    className="genie-input"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-genie-yellow py-3.5 text-center text-sm font-bold text-[#111] transition hover:brightness-95"
                >
                  로그인
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 w-full rounded-full bg-genie-yellow py-3.5 text-center text-sm font-bold text-[#111] transition hover:brightness-95"
              >
                로그아웃
              </button>
            )}
            <p className="text-center text-[11px] font-normal text-white/55">
              테스트 ID: {PRIMARY_LOGIN_ID}, {TEMP_LOGIN_ID}
            </p>
            {message ? (
              <p className={`text-center text-sm ${isSuccess ? "text-emerald-300" : "text-red-300"}`}>{message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
