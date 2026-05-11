import Link from "next/link";

type FooterProps = {
  isLoggedIn: boolean;
};

export default function Footer({ isLoggedIn }: FooterProps) {
  const navigationLinks = [
    { href: "/#story", label: "지니이야기" },
    { href: "/#genie-day", label: "지니데이 (Genie Day)" },
    { href: "/#genie-us", label: "지니어스 (Genie Us)" },
    { href: "/#genie-club", label: "지니클럽 (Genie Club)" },
    { href: "/#yeonhyeok", label: "연혁" },
    { href: "/#find-group", label: "모임찾기" },
    { href: "/#past-genieday", label: "지나온 지니데이" },
    { href: "/#genie-login", label: "로그인" },
    ...(isLoggedIn ? [{ href: "/#genie-interview", label: "FAQ" }] : []),
  ];

  return (
    <footer className="border-t border-white/10 bg-genie-purple-deep">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:max-w-7xl lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
          <div>
            <div className="font-display text-3xl font-normal text-genie-yellow sm:text-4xl">genie</div>
            <p className="mt-3 text-xs font-normal leading-relaxed text-white/55 sm:text-sm">
              중랑 청년 문화 커뮤니티.
              <br />
              취향과 사람을 잇습니다.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-genie-yellow/90">바로가기</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {navigationLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-normal text-white/60 transition hover:text-genie-yellow sm:text-base"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-normal text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} genie. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white/70">
              개인정보처리방침
            </a>
            <a href="#" className="transition hover:text-white/70">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
