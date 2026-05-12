import MediaSlot from "@/components/MediaSlot";

export default function FindGroupSection() {
  return (
    <section id="find-group" className="bg-white py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8 lg:px-10">
        <h2 className="text-center text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
          <span className="flex flex-wrap items-center justify-center gap-x-1.5">
            <span className="text-black">나에게 맞는</span>
            <span className="text-genie-purple">&apos;모임찾기&apos;</span>
          </span>
          <span className="mt-3 block sm:mt-4">
            <span className="inline-block rounded-xl bg-genie-lavender px-4 py-2.5 text-base font-bold leading-snug text-genie-purple shadow-sm sm:px-5 sm:py-3 sm:text-lg lg:text-xl">
              어떤 클래스를 들어야 할지 고민된다면?
            </span>
          </span>
        </h2>

        <div className="mt-6 flex w-full max-w-4xl flex-row items-stretch justify-center gap-4 sm:mt-8 sm:gap-8 lg:mt-10 lg:max-w-5xl lg:gap-14">
          <p className="min-w-0 flex-1 text-center text-sm font-normal leading-relaxed text-[#111] sm:text-base lg:text-lg">
            지니가 준비한 1분 라이프스타일 테스트를 통해
            <br />
            내 숨겨진 성향을 알아보고,
            <br />
            나에게 가장 잘 맞는 지니데이 클래스와
            <br />
            동네 친구들도 추천 받아보세요!
            <br />
            지니 크루분들께 결과해석도 받아보실 수 있습니다.
          </p>
          <div className="flex min-h-0 w-[110px] shrink-0 sm:w-[180px] lg:w-[240px]">
            <MediaSlot
              aspectClass="h-full min-h-0 w-full"
              variant="on-light"
              label="모임 찾기"
              hint="UI·일러스트"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-genie-yellow px-10 py-3.5 text-sm font-bold text-[#111] shadow-sm transition hover:brightness-95 active:scale-[0.99] sm:px-12 sm:text-base"
          >
            테스트 시작하기 →
          </button>
        </div>
      </div>
    </section>
  );
}
