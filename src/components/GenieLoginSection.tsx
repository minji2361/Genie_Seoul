"use client";

import { useState } from "react";

const PRIMARY_LOGIN_ID = "minji2361";
const TEMP_LOGIN_ID = "temp-minji";
const LOGIN_PASSWORD = "1111";
const LOGIN_STORAGE_KEY = "genie-login-user";

type GenieLoginSectionProps = {
  isLoggedIn: boolean;
  onLogin: (userId: string) => void;
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
    <section id="genie-login" className="bg-[#111] py-24 scroll-mt-20">
      <div className="container-genie">
        <div className="max-w-[520px] mx-auto bg-[#1a1a1a] p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-7">
            <h2 className="font-display text-[#FFE600] text-4xl text-center mb-2">Genie-Login</h2>

            {!isLoggedIn ? (
              <>
                <div>
                  <label className="block text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-2">ID</label>
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
                  <label className="block text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-2">PASSWORD</label>
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

                <button type="submit" className="w-full btn-primary text-center py-4 text-base mt-2">
                  로그인
                </button>
              </>
            ) : (
              <button type="button" onClick={handleLogout} className="w-full btn-primary text-center py-4 text-base mt-2">
                로그아웃
              </button>
            )}
            <button type="button" className="w-full btn-primary text-center py-4 text-base hidden" aria-hidden="true">
              회원가입
            </button>
            <p className="text-xs text-[#c9c9c9] text-center">
              현재 로그인 가능 ID: {PRIMARY_LOGIN_ID}, {TEMP_LOGIN_ID}
            </p>
            {message ? (
              <p className={`text-sm text-center ${isSuccess ? "text-[#66ff66]" : "text-[#ff6b6b]"}`}>{message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
