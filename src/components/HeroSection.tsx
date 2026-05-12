import MediaSlot from "@/components/MediaSlot";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-genie-purple pb-12 pt-[calc(var(--nav-h)+20px)] text-center sm:pb-16 sm:pt-[calc(var(--nav-h)+24px)] lg:pb-20 lg:pt-[calc(var(--nav-h)+28px)] scroll-mt-0"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:px-8 lg:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:text-left">
        <div className="max-w-xl lg:flex-1">
          <p className="text-lg font-normal leading-snug text-white sm:text-xl lg:text-2xl lg:leading-snug">
            내 취향이 일상이 되는 곳,
          </p>
          <p className="text-lg font-normal leading-snug text-white sm:text-xl lg:text-2xl lg:leading-snug">
          {/* <p className="mt-3 text-base font-normal leading-relaxed text-white/95 sm:text-lg lg:mt-4 lg:text-xl"> */}
            중랑에서 만나는 나만의 커뮤니티
          </p>
          <p className="mt-4 text-lg font-bold leading-snug text-white sm:mt-5 sm:text-xl lg:text-2xl">
            가장 가까운 놀이터
          </p>
          <p className="mt-3 text-xl font-normal leading-snug text-genie-yellow sm:text-2xl lg:mt-4 lg:text-3xl xl:text-4xl">
            플레이그라운드
          </p>
          <p className="font-display mt-6 text-5xl font-normal leading-none tracking-tight text-white sm:mt-8 sm:text-6xl lg:mt-10 lg:text-7xl xl:text-8xl">
            genie
          </p>
        </div>

        <div className="mt-10 flex w-full max-w-[300px] justify-center sm:max-w-[340px] lg:mt-0 lg:max-w-[min(42vw,420px)] lg:shrink-0">
          <MediaSlot
            aspectClass="aspect-square"
            variant="on-purple"
            label="히어로 캐릭터"
            hint="램프·유령 일러스트"
            className="w-full rounded-[32px]"
          />
        </div>
      </div>
    </section>
  );
}
