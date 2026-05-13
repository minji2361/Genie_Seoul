import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function FindMeetingSection() {
  return (
    <section className="bg-white py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-10">
          <div className="min-w-0 flex-1 text-center tablet:text-left">
            <h2 className="text-2xl font-extrabold text-neutral-900 max-[390px]:text-xl tablet:text-3xl">
              나에게 맞는 <span className="text-genie-purple">&apos;모임 찾기&apos;</span>
            </h2>
            <p className="mt-2">
              <span className="inline-block rounded-2xl bg-genie-lavender px-3 py-2 text-base font-semibold text-genie-purple max-[390px]:px-2.5 max-[390px]:py-1.5 max-[390px]:text-xs tablet:px-4 tablet:py-2 tablet:text-lg">
                어떤 클래스를 들어야 할지 고민된다면?
              </span>
            </p>
            <p className="mt-2 text-sm font-semibold text-neutral-700 max-[390px]:text-xs tablet:text-base">
              지니가 준비한 1분 라이프스타일 테스트를 통해
              <br />
              내 숨겨진 성향을 알아보고,
              <br />
              나에게 가장 잘 맞는 지니데이 클래스와
              <br />
              동네 친구들도 추천 받아보세요!
              <br />
              지니 크루분들께 결과해석도 받아보실 수 있으십니다.
            </p>
          </div>
          <div className="flex w-full shrink-0 justify-center tablet:w-auto tablet:justify-end">
            <ImagePlaceholder
              label="모임찾기_클립보드일러스트"
              className="aspect-square w-full max-w-[220px] rounded-2xl max-[390px]:max-w-[180px] tablet:max-w-[260px]"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center tablet:mt-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-genie-yellow px-8 py-3 text-base font-extrabold text-neutral-900 shadow-md transition hover:brightness-95 max-[390px]:px-6 max-[390px]:py-2.5 max-[390px]:text-sm"
          >
            모임 신청하기
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
