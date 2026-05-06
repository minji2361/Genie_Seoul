"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/#categories", label: "카테고리" },
  { href: "/#programs",   label: "프로그램" },
  { href: "/#reviews",    label: "후기" },
  { href: "/#history",    label: "히스토리" },
  { href: "/#faq",        label: "FAQ" },
  { href: "/program",     label: "전체 보기" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#111] transition-all ${
        scrolled ? "shadow-[0_4px_0_#FFE600]" : ""
      }`}
    >
      <div className="container-genie h-[60px] flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[26px] text-[#111] tracking-tight leading-none shrink-0 hover:text-[#111] transition-colors"
        >
          GENIE
        </Link>

        {/* Desktop centre nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link text-[13px]">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right CTA */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link href="/#apply" className="btn-outline text-[13px] py-2 px-5">
            문의하기
          </Link>
          <Link href="/#apply" className="btn-primary text-[13px] py-2 px-5">
            무료 신청하기
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] p-1 w-9 h-9"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span className={`block w-6 h-[2px] bg-[#111] transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#111] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#111] transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="lg:hidden bg-[#FFE600] border-t-2 border-[#111]">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block font-display text-xl text-[#111] px-6 py-4 border-b border-[#111]/15 hover:bg-[#f5dc00] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 py-5 flex flex-col gap-3">
            <Link href="/#apply" className="btn-primary block text-center" onClick={() => setMenuOpen(false)}>
              무료 신청하기
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
