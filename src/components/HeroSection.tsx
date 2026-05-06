import Link from "next/link";
import { MARQUEE_ITEMS } from "@/data";

export default function HeroSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="relative bg-[#FFE600] pt-[60px] overflow-hidden">

      {/* Background decorative shapes */}
      <div className="absolute right-[-80px] top-[80px]  w-[420px] h-[420px] rounded-full bg-black/[0.045] pointer-events-none" />
      <div className="absolute right-[120px] top-[130px] w-[200px] h-[200px] rounded-full bg-black/[0.035] pointer-events-none" />
      <div className="absolute left-[-60px]  bottom-[60px] w-[260px] h-[260px] rounded-full bg-black/[0.03]  pointer-events-none" />
      <div className="absolute left-[380px] top-[40px]   w-[80px]  h-[80px]  rounded-full bg-black/[0.04]  pointer-events-none hidden lg:block" />

      <div className="container-genie pt-20 pb-14 lg:pt-24 lg:pb-20 relative">

        {/* Two-column layout on desktop */}
        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-16 lg:items-end">

          {/* LEFT: headline */}
          <div>
            <div className="tag-pill mb-7 animate-fadeUp">서울 북부 청년 커뮤니티</div>

            <h1 className="font-display text-[80px] sm:text-[100px] lg:text-[130px] xl:text-[150px] text-[#111] leading-[0.88] mb-2 animate-fadeUp delay-100">
              중랑에서<br />찾는
            </h1>
            <h1 className="font-display text-[80px] sm:text-[100px] lg:text-[130px] xl:text-[150px] text-[#111]/30 leading-[0.88] mb-10 animate-fadeUp delay-200">
              진짜 '나'
            </h1>

            <div className="flex flex-wrap gap-3 animate-fadeUp delay-300">
              <Link href="/#programs" className="btn-primary text-base py-4 px-8">
                프로그램 둘러보기 →
              </Link>
              <Link href="/#apply" className="btn-outline text-base py-4 px-8">
                무료 신청하기
              </Link>
            </div>
          </div>

          {/* RIGHT: description + stats — desktop only aside */}
          <div className="hidden lg:flex flex-col justify-end gap-8 pb-2 animate-fadeUp delay-300">
            <p className="text-[#111]/60 text-base leading-relaxed border-l-4 border-[#111]/20 pl-5">
              취향 기반 모임·행사·원데이클래스.<br />
              중랑에서 시작하는 청년 문화<br />
              커뮤니티 플랫폼.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-[#111]/10">
              {[
                { num: "10+",  label: "운영 년차" },
                { num: "500+", label: "참여 청년" },
                { num: "4",    label: "프로그램 카테고리" },
                { num: "중랑",  label: "대표 청년단체" },
              ].map((s) => (
                <div key={s.label} className="bg-[#FFE600] p-5">
                  <div className="font-display text-4xl text-[#111]">{s.num}</div>
                  <div className="text-xs text-[#111]/50 font-bold mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stats row */}
        <div className="lg:hidden flex gap-8 mt-12 pt-8 border-t-2 border-[#111]/10 animate-fadeUp delay-400">
          {[
            { num: "10+",  label: "운영 년차" },
            { num: "500+", label: "참여 청년" },
            { num: "4",    label: "카테고리" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-[#111]">{s.num}</div>
              <div className="text-xs text-[#111]/50 font-bold mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mobile description */}
        <p className="lg:hidden text-[#333] text-sm leading-relaxed mt-8 animate-fadeUp delay-400">
          취향 기반 모임·행사·원데이클래스.<br />
          중랑에서 시작하는 청년 문화 커뮤니티 플랫폼.
        </p>
      </div>

      {/* Marquee ticker */}
      <div className="bg-[#111] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="font-display text-[#FFE600] text-sm mx-8 tracking-widest">
              {item}
              <span className="mx-8 text-[#FFE600]/25">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
