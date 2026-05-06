import type { Metadata } from "next";

// ── 폰트 직접 내장 (Google Fonts 외부 요청 없음, OFL 라이선스) ──
import "@fontsource/black-han-sans";           // 400 weight only (display font)
import "@fontsource/noto-sans-kr/300.css";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/900.css";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "GENIE — 중랑 청년 문화 플랫폼",
  description:
    "서울 북부 대표 청년 문화 스타트업 플랫폼. 취향 기반 모임·행사·원데이클래스.",
  keywords: ["중랑", "청년", "문화", "커뮤니티", "원데이클래스", "동아리"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
