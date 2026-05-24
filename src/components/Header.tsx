import Image from "next/image";
import Link from "next/link";

import { AuthNavItem } from "@/components/AuthNavItem";
import { DashboardNavItem } from "@/components/DashboardNavItem";
import { SHOW_GENIE_US } from "@/config/site-sections";

const LOGO_WIDTH = 1072;
const LOGO_HEIGHT = 420;
const NAV = [
  { href: "#story", label: "지니이야기" },
  { href: "#genie-day", label: "Genie-Day" },
  ...(SHOW_GENIE_US ? [{ href: "#genie-us", label: "Genie-Us" as const }] : []),
  { href: "#genie-club", label: "Genie-Club" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-genie-purple">
      <div className="mx-auto flex max-w-content items-center gap-3 overflow-hidden px-4 py-3 tablet:gap-5 tablet:px-6 desktop:gap-6 desktop:px-8">
        <Link href="/" className="relative block h-10 w-[7rem] shrink-0 tablet:h-11 tablet:w-[7.75rem] desktop:h-12 desktop:w-[8.5rem]">
          <Image
            src="/GenieMain/GenieLogo.png"
            alt="genie"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="h-full w-auto object-contain object-left"
          />
        </Link>

        {/* 모바일: 가로 스크롤 / 태블릿+: 줄바꿈 */}
        <nav className="nav-scroll-x scrollbar-hide min-w-0 flex-1 tablet:overflow-visible">
          <ul className="font-paperlogy flex w-max min-w-full list-none flex-nowrap items-center justify-end gap-x-5 p-0 m-0 text-base font-normal text-white/95 max-[390px]:text-sm tablet:w-auto tablet:min-w-0 tablet:gap-x-6 tablet:flex-wrap tablet:justify-end tablet:text-lg desktop:text-xl">
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
