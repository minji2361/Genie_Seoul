import type { Metadata } from "next";

import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/800.css";

import { Providers } from "@/components/Providers";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const siteUrl = getSiteUrl();

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "etSlSFKIMQcKvqbM9n7nZh57Z2ZoBFeu11E6YUspRQc";
const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "지니랜드 | 내 취향이 일상이 되는 곳",
  description: "우리동네 플레이그라운드 '지니'",
  keywords: ["genie", "플레이그라운드", "지니데이", "지니어스", "지니클럽", "모임", "취향", "genie-land"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "지니랜드",
    title: "지니랜드 | 내 취향이 일상이 되는 곳",
    description: "우리동네 플레이그라운드 '지니'",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: googleVerification,
    ...(naverVerification
      ? { other: { "naver-site-verification": naverVerification } }
      : {}),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <title>지니랜드 | 내 취향이 일상이 되는 곳</title>
        <meta name="description" content="우리동네 플레이그라운드 '지니'" />
        <meta name="robots" content="index,follow" />
        <meta
          name="google-site-verification"
          content="etSlSFKIMQcKvqbM9n7nZh57Z2ZoBFeu11E6YUspRQc"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
