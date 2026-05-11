"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#story", labelKr: "지니이야기", labelEn: null as string | null },
  { href: "#genie-day", labelKr: "지니데이", labelEn: "Genie Day" },
  { href: "#genie-us", labelKr: "지니어스", labelEn: "Genie Us" },
  { href: "#genie-club", labelKr: "지니클럽", labelEn: "Genie Club" },
];

type NavbarProps = {
  isLoggedIn: boolean;
};

function NavLabel({
  labelKr,
  labelEn,
  active,
}: {
  labelKr: string;
  labelEn: string | null;
  active: boolean;
}) {
  if (!labelEn) {
    return <span className="text-[11px] font-bold sm:text-xs">{labelKr}</span>;
  }
  return (
    <span className="flex flex-col items-center gap-0.5 leading-none">
      <span className="text-[11px] font-bold sm:text-xs">{labelKr}</span>
      <span
        className={`text-[9px] font-semibold sm:text-[10px] ${active ? "text-[#111]/65" : "text-white/85"}`}
      >
        {labelEn}
      </span>
    </span>
  );
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const headerRef = useRef<HTMLElement>(null);
  const navScrollRef = useRef<HTMLElement>(null);
  const blockNavClickRef = useRef(false);
  const extraLinks = useMemo(
    () => (isLoggedIn ? [{ href: "#genie-interview", labelKr: "FAQ", labelEn: null as string | null }] : []),
    [isLoggedIn]
  );
  const navLinks = [...NAV_LINKS, ...extraLinks];
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0].href);

  const handleNavClick = (href: string) => {
    if (blockNavClickRef.current) {
      blockNavClickRef.current = false;
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    setActiveHref(href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === "undefined") {
      document.documentElement.style.setProperty("--nav-h", "72px");
      return;
    }
    const apply = () => {
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--nav-h");
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const getNav = () =>
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "72", 10);

    const onScroll = () => {
      const threshold = window.scrollY + getNav() + 24;
      let current = NAV_LINKS[0].href;
      for (const link of navLinks) {
        const el = document.querySelector(link.href) as HTMLElement | null;
        if (!el) continue;
        const sectionTop = el.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= threshold) current = link.href;
      }
      setActiveHref(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navLinks]);

  useEffect(() => {
    const el = navScrollRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const startX = e.clientX;
      const startScroll = el.scrollLeft;
      let moved = false;

      const onPointerMove = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        if (Math.abs(dx) > 8) moved = true;
        if (moved) el.scrollLeft = startScroll - dx;
      };

      const onPointerUp = () => {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        if (moved) blockNavClickRef.current = true;
      };

      document.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerup", onPointerUp);
    };

    el.addEventListener("pointerdown", onPointerDown);
    return () => el.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <header ref={headerRef} className="fixed left-0 right-0 top-0 z-50 bg-genie-purple shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col lg:max-w-7xl">
        <div className="flex items-center justify-between border-b border-white/15 px-4 py-2 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-8 min-w-[76px] shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-white/45 bg-white/10 px-2.5 sm:h-9 sm:min-w-[88px]"
            aria-label="홈으로 이동"
          >
            <span className="text-[10px] font-bold tracking-wide text-white">로고</span>
          </button>
          <a
            href="#genie-login"
            className="shrink-0 text-sm font-normal text-white hover:text-white/85 sm:text-base"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#genie-login")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            로그인
          </a>
        </div>

        <div className="flex flex-nowrap items-center gap-2 px-4 py-2 sm:gap-3 sm:px-6 lg:px-10">
          <nav
            ref={navScrollRef}
            className="min-h-9 min-w-0 flex-1 cursor-grab overflow-x-auto overscroll-x-contain scroll-smooth [-webkit-overflow-scrolling:touch] active:cursor-grabbing touch-pan-x scrollbar-hide select-none"
            aria-label="섹션 바로가기 (좌우로 스크롤)"
          >
            <div className="flex w-max items-center justify-start gap-1.5 py-0.5 sm:justify-end sm:gap-2 sm:pl-0 sm:pr-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => handleNavClick(l.href)}
                  className={`shrink-0 rounded-full px-2.5 py-2 transition-colors sm:px-4 sm:py-2.5 ${
                    activeHref === l.href
                      ? "bg-genie-yellow text-[#111] shadow-sm"
                      : "text-white/95 hover:bg-white/15"
                  }`}
                >
                  <NavLabel labelKr={l.labelKr} labelEn={l.labelEn} active={activeHref === l.href} />
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
