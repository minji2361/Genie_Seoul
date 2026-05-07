import Link from "next/link";

type FooterProps = {
  isLoggedIn: boolean;
};

export default function Footer({ isLoggedIn }: FooterProps) {
  const navigationLinks = [
    { href: "/#about-us", label: "About us" },
    { href: "/#genie-day", label: "Genie-Day" },
    { href: "/#genie-us", label: "Genie-Us" },
    { href: "/#genie-club", label: "Genie-Club" },
    { href: "/#history", label: "History" },
    { href: "/#genie-login", label: "Genie-Login" },
    ...(isLoggedIn ? [{ href: "/#genie-interview", label: "Genie-Interview" }] : []),
  ];

  return (
    <footer className="bg-[#111] border-t border-white/10">
      <div className="container-genie py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="font-display text-[#FFE600] text-4xl mb-3">GENIE</div>
            <p className="text-white/38 text-xs leading-relaxed mb-6">
              서울 북부 대표 청년 문화<br />스타트업 플랫폼.<br />
              2015년부터 함께해 왔습니다.
            </p>
            <div className="flex gap-2">
              {[
                { label: "IG", href: "#" },
                { label: "KT", href: "#" },
                { label: "YT", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 border border-white/18 flex items-center justify-center text-[10px] font-bold text-white/38 hover:border-[#FFE600] hover:text-[#FFE600] transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <p className="text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-5">PROGRAMS</p>
            <ul className="space-y-3">
              {["지니어링", "지니어스", "지니데이", "지니클럽", "번개모임"].map((p) => (
                <li key={p}>
                  <Link href="/#genie-us" className="text-white/40 text-sm hover:text-[#FFE600] transition-colors">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-5">NAVIGATION</p>
            <ul className="space-y-3">
              {navigationLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 text-sm hover:text-[#FFE600] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#FFE600] text-[10px] font-bold tracking-[3px] mb-5">CONTACT</p>
            <ul className="space-y-3 text-white/40 text-sm">
              <li>
                <a href="mailto:genie@example.com" className="hover:text-[#FFE600] transition-colors">
                  genie@example.com
                </a>
              </li>
              <li>서울특별시 중랑구</li>
              <li className="pt-1 space-y-2">
                {[
                  { href: "#", label: "인스타그램" },
                  { href: "#", label: "카카오 채널" },
                  { href: "#", label: "유튜브" },
                ].map((l) => (
                  <div key={l.label}>
                    <a href={l.href} className="hover:text-[#FFE600] transition-colors block">
                      {l.label}
                    </a>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:justify-between gap-3 text-white/20 text-xs">
          <span>© 2025 GENIE. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/45 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white/45 transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
