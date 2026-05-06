import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-[132px] overflow-hidden bg-gradient-to-b from-[#6f14ff] to-[#4e00d5]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.12),transparent_30%)]" />

      <div className="container-genie relative pt-14 pb-14 lg:pt-16 lg:pb-20 text-center">
        <p className="text-white/95 text-[30px] sm:text-[42px] lg:text-[56px] font-display leading-[1.15]">
          중랑에서 찾는<br />
          진짜 &apos;나&apos;
        </p>
        <p className="mt-7 text-white/90 text-[28px] sm:text-[34px] lg:text-[44px] font-display leading-[1.2]">
          내 취향이 일상이 되는 곳,<br />
          <span className="text-[#FFE600]">가장 가까운 놀이터</span>
        </p>

        <div className="mt-8 text-[#FFE600]">
          <p className="font-display text-3xl sm:text-4xl lg:text-5xl">플레이그라운드</p>
          <p className="font-display text-5xl sm:text-6xl lg:text-7xl leading-none mt-2">genie</p>
        </div>

        {/* Replace this with actual hero character image later */}
        <div className="mt-10 mx-auto w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] rounded-[36px] border-2 border-dashed border-white/45 bg-white/10 flex items-center justify-center">
          <div className="text-white/80 text-sm font-bold tracking-wide">
            HERO IMAGE
            <br />
            PLACEHOLDER
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/#genie-us" className="btn-primary text-base py-4 px-8">
            프로그램 보기
          </Link>
          <Link href="/#genie-login" className="btn-outline text-base py-4 px-8 !text-white !border-white hover:!bg-white hover:!text-[#5c09e8]">
            로그인
          </Link>
        </div>
      </div>
    </section>
  );
}
