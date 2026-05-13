import Link from "next/link";

const NAV = [
  { href: "#story", label: "지니이야기" },
  { href: "#genie-day", label: "Genie-Day" },
  { href: "#genie-us", label: "Genie-Us" },
  { href: "#genie-club", label: "Genie-Club" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-genie-purple">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 tablet:px-6 desktop:px-8">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
          genie
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm font-medium text-white/95 max-[390px]:text-xs">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-genie-yellow">
              {item.label}
            </a>
          ))}
        </nav>
      </div> 
    </header>
  );
}
