import Image from "next/image";

const STORY_TITLE_WIDTH = 1001;
const STORY_TITLE_HEIGHT = 260;
const MAP_IMAGE_WIDTH = 1014;
const MAP_IMAGE_HEIGHT = 947;

export function GenieStorySection() {
  return (
    <section id="story" className="bg-white py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <div className="grid grid-cols-1 items-center gap-6 max-[390px]:gap-5 tablet:grid-cols-2 tablet:items-stretch tablet:gap-6 desktop:gap-8">
          <div className="min-w-0">
            <h2 className="m-0">
              <Image
                src="/GenieStory/GenieHistoryTxt.png"
                alt="지니 이야기"
                width={STORY_TITLE_WIDTH}
                height={STORY_TITLE_HEIGHT}
                className="h-auto w-full max-w-[220px] max-[390px]:max-w-[200px] tablet:max-w-[300px] desktop:max-w-[360px]"
                sizes="(max-width: 390px) 200px, (max-width: 768px) 300px, 360px"
              />
            </h2>
            <p className="font-appleThin mt-4 text-lg font-normal leading-relaxed text-neutral-700 max-[390px]:text-base tablet:mt-6 tablet:text-xl desktop:text-2xl">
              지니는 <span className="font-appleHB">서울 경기 북부</span>를 무대로 활동하는 <br />
              <span className="font-appleHB">청년 문화 스타트업 플랫폼</span>입니다.
            </p>
            <p className="font-appleSemiBold mt-4 text-base leading-relaxed text-neutral-700 max-[390px]:text-sm tablet:mt-6 tablet:text-lg desktop:text-xl">
              중랑구에서 성북구까지,<br />
              우리 동네 청년들이 굳이 멀리 나가지 않고도<br />
              일상 속 활력을 찾을 수 있도록 지역만의 매력과 색깔을 <br />
              담은 맞춤형 커뮤니티를 만들었습니다.
            </p>
            <p className="font-appleSemiBold mt-4 text-base leading-relaxed text-neutral-700 max-[390px]:text-sm tablet:mt-6 tablet:text-lg desktop:text-xl">
              단순한 친목을 넘어, 청년들의 진짜 &apos;취향&apos;을 기반으로
              <br />
              다양한 모임과 행사, 원데이 클래스를 큐레이션 합니다.
              <br />
              코드가 통하는 사람들과 함께 관심사를 나누고,
              <br />
              <span className="font-appleSemiBold rounded-sm bg-genie-yellow px-0.5 text-black">
                새로운 나를 발견하는 시간을 경험해보세요.
              </span>
            </p>
          </div>

          <div className="flex w-full justify-center tablet:h-full tablet:items-center tablet:justify-start">
            <div className="relative aspect-[1014/947] w-full tablet:aspect-auto tablet:h-full tablet:max-w-[480px] tablet:min-h-0">
              <Image
                src="/GenieStory/Gyenoggi.png"
                alt="서울·경기 지역 일러스트"
                fill
                className="rounded-2xl object-contain tablet:object-center"
                sizes="(max-width: 767px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
