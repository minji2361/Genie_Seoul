import MediaSlot from "@/components/MediaSlot";

export default function ImageBannerSection() {
  return (
    <section id="banner" className="relative scroll-mt-[var(--nav-h)]">
      <div className="relative w-full min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
        <MediaSlot
          aspectClass="aspect-[21/9] min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]"
          variant="on-light"
          label="배너 이미지 / 영상 스틸"
          hint="full-width 교체"
          className="!rounded-none w-full min-h-[inherit] [&>span]:text-genie-purple"
        />
        <div className="pointer-events-none absolute inset-0 flex w-full flex-col items-start justify-center bg-gradient-to-t from-black/60 via-black/30 to-transparent px-5 text-left sm:px-8 lg:px-10">
          <p className="max-w-4xl text-2xl font-bold leading-snug text-white drop-shadow-md sm:text-3xl lg:text-4xl lg:leading-tight">
            <span className="lg:hidden">
              멀리가지 마세요,
              <br />
              설렘은 <span className="text-genie-yellow">우리동네</span>에
              <br />
              있으니까!
            </span>
            <span className="hidden lg:inline">
              멀리가지 마세요, 설렘은 <span className="text-genie-yellow">우리동네</span>에 있으니까!
            </span>
          </p>
          <p className="mt-4 max-w-4xl text-left text-base font-normal leading-relaxed text-white/90 drop-shadow-md sm:mt-5 sm:text-lg lg:mt-6 lg:text-xl">
            일상에 마법 같은 재미를 더하는 
            <br />
            우리 동네{" "}
            <span className="text-genie-yellow">플레이그라운드 </span>
            <span className="font-bold text-genie-yellow">&apos;지니&apos;</span>
          </p>
        </div>
      </div>
    </section>
  );
}
