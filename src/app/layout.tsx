import type { Metadata } from "next";

import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/800.css";

import { Providers } from "@/components/Providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "플레이그라운드 genie",
  description:
    "내 취향이 일상이 되는 곳, 가장 가까운 놀이터. 지니데이·지니어스·지니클럽과 동네 모임을 만나보세요.",
  keywords: ["genie", "플레이그라운드", "지니데이", "지니어스", "지니클럽", "모임", "취향"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
