"use client";

import { useEffect, useMemo, useState } from "react";

const NAV_LINKS = [
  { href: "#about-us", label: "지니 이야기" },
  { href: "#genie-day", label: "Genie-Day" },
  { href: "#genie-us", label: "Genie-Us" },
  { href: "#genie-club", label: "Genie-Club" },
  { href: "#genie-login", label: "Genie-Login" },
];

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const navLinks = useMemo(
    () => (isLoggedIn ? [...NAV_LINKS, { href: "#genie-interview", label: "Genie-Interview" }] : NAV_LINKS),
    [isLoggedIn]
  );
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0].href);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    setActiveHref(href);
    const top = (target as HTMLElement).offsetTop - 112;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const updateNavHeight = () => {
      document.documentElement.style.setProperty("--nav-h", "112px");
    };
    const updateActiveTabOnScroll = () => {
      const scrollY = window.scrollY + 130;
      let current = NAV_LINKS[0].href;

      for (const link of navLinks) {
        const section = document.querySelector(link.href) as HTMLElement | null;
        if (section && section.offsetTop <= scrollY) {
          current = link.href;
        }
      }
      setActiveHref(current);
    };

    updateNavHeight();
    updateActiveTabOnScroll();
    window.addEventListener("scroll", updateActiveTabOnScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveTabOnScroll);
      document.documentElement.style.removeProperty("--nav-h");
    };
  }, [navLinks]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#7a17ff] to-[#5c09e8]">
      <div className="container-genie h-[52px] flex items-center justify-center">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="GENIE 홈으로 이동">
          <img src="/logo-placeholder.svg" alt="GENIE 로고" className="h-8 w-auto opacity-95" />
        </button>
      </div>
      <div>
        <nav className="container-genie h-[60px] flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {navLinks.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => handleNavClick(l.href)}
              className={`shrink-0 h-9 px-4 rounded-full text-sm font-bold transition-colors ${
                activeHref === l.href
                  ? "border border-white/70 bg-white text-[#5c09e8] shadow-[0_0_0_2px_rgba(255,255,255,0.15)]"
                  : "border border-white/25 bg-white/8 text-white hover:bg-white/18"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
