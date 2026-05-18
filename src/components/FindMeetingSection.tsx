import Image from "next/image";

const DAY_LIST_WIDTH = 1254;
const DAY_LIST_HEIGHT = 1254;

export function FindMeetingSection() {
  return (
    <section className="bg-white py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-6 px-4 max-[390px]:gap-5 tablet:grid-cols-2 tablet:gap-6 tablet:px-6 desktop:max-w-5xl desktop:gap-8 desktop:px-8">
          <div className="text-center tablet:text-left">
            <h2 className="font-appleHB text-3xl text-neutral-900 max-[390px]:text-2xl tablet:text-4xl desktop:text-5xl">
              나에게 맞는 <span className="text-genie-purple">&apos;모임 찾기&apos;</span>
            </h2>
            <p className="mt-3">
              <span className="font-appleSemiBold inline-block rounded-2xl bg-genie-lavender px-3 py-2 text-lg text-genie-purple max-[390px]:px-2.5 max-[390px]:py-1.5 max-[390px]:text-base tablet:px-4 tablet:py-2.5 tablet:text-xl desktop:px-5 desktop:py-3 desktop:text-2xl">
                어떤 클래스를 들어야 할지 고민된다면?
              </span>
            </p>
            <p className="font-appleMedium mt-3 text-base text-neutral-700 max-[390px]:text-sm tablet:text-xl desktop:text-2xl">
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
          <div className="flex justify-center tablet:justify-end">
            <Image
              src="/GenieDay/day_list.PNG"
              alt="모임 찾기 클립보드 일러스트"
              width={DAY_LIST_WIDTH}
              height={DAY_LIST_HEIGHT}
              className="aspect-square h-auto w-full max-w-[220px] max-[390px]:max-w-[180px] tablet:max-w-[260px]"
              sizes="(max-width: 390px) 180px, (max-width: 768px) 220px, 260px"
            />
          </div>
        </div>
        {/* <div className="mt-6 flex justify-center tablet:mt-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-genie-yellow px-8 py-3 text-base font-extrabold text-neutral-900 shadow-md transition hover:brightness-95 max-[390px]:px-6 max-[390px]:py-2.5 max-[390px]:text-sm"
          >
            모임 신청하기
            <span aria-hidden>→</span>
          </button>
        </div> */}
    </section>
  );
}
