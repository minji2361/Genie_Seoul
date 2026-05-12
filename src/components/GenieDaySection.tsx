import MediaSlot from "@/components/MediaSlot";

export default function GenieDaySection() {
  return (
    <section
      id="genie-day"
      className="relative overflow-hidden bg-gradient-to-br from-genie-purple via-[#8B5CFF] to-genie-purple-deep py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,238,0,0.14),transparent_45%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:px-10">
        <div className="order-1 flex w-full max-w-xl flex-col items-center gap-6 sm:gap-8 lg:order-2 lg:flex-1 lg:items-end lg:gap-6 lg:text-right">
          <p className="text-lg font-normal leading-snug text-white sm:text-xl lg:text-2xl lg:leading-snug">
            단 하루만에 펼쳐지는
            <br />
            취향 발견의 마법,
          </p>
          <p className="text-4xl font-black text-genie-yellow sm:text-5xl lg:text-6xl xl:text-7xl">
            지니데이
          </p>
          <p className="text-lg font-normal leading-snug text-white sm:text-xl lg:text-2xl lg:leading-snug">
            다양한 클래스와 사람들을
            <br />
            나만의 취향을 발견해보세요!
          </p>
        </div>
        <div className="order-2 mt-10 flex w-full max-w-[300px] justify-center sm:max-w-[340px] lg:order-1 lg:mt-0 lg:max-w-[min(42vw,420px)] lg:shrink-0">
          <MediaSlot
            aspectClass="aspect-square"
            variant="on-purple"
            label="캐릭터"
            hint="돋보기 일러스트"
            className="w-full rounded-[32px]"
          />
        </div>
      </div>
    </section>
  );
}
