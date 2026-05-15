import Link from "next/link";

import { AuthNavItem } from "@/components/AuthNavItem";
import { DashboardNavItem } from "@/components/DashboardNavItem";

const NAV = [
  { href: "#story", label: "지니이야기" },
  { href: "#genie-day", label: "Genie-Day" },
  { href: "#genie-us", label: "Genie-Us" },
  { href: "#genie-club", label: "Genie-Club" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-genie-purple">
      <div className="mx-auto flex max-w-content items-center gap-3 overflow-hidden px-4 py-3 tablet:gap-4 tablet:px-6 desktop:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-extrabold tracking-tight text-white"
        >
          genie
        </Link>

        {/* 모바일: 가로 스크롤 / 태블릿+: 줄바꿈 */}
        <nav className="nav-scroll-x scrollbar-hide min-w-0 flex-1 tablet:overflow-visible">
          <ul className="flex w-max min-w-full list-none flex-nowrap items-center justify-end gap-x-4 p-0 m-0 text-sm font-medium text-white/95 max-[390px]:text-xs tablet:w-auto tablet:min-w-0 tablet:flex-wrap tablet:justify-end">
            {NAV.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  className="block whitespace-nowrap hover:text-genie-yellow"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <DashboardNavItem />
            <li className="shrink-0">
              <AuthNavItem />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
