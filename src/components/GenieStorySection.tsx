import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function GenieStorySection() {
  return (
    <section id="story" className="bg-white py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="flex items-center gap-2 text-2xl font-extrabold text-neutral-900 max-[390px]:text-xl tablet:text-3xl">
          <span aria-hidden className="text-genie-purple">
            ✦
          </span>
          지니 이야기
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700 max-[390px]:text-xs tablet:mt-6 tablet:max-w-3xl tablet:text-base">
          지니는 <span className="font-bold">서울 경기 북부</span>를 무대로 활동하는 <br />
          <span className="font-bold">청년 문화 스타트업 플랫폼</span>입니다.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700 max-[390px]:text-xs tablet:mt-6 tablet:max-w-3xl tablet:text-base">
          중랑구에서 성북구까지,<br />
          우리 동네 청년들이 굳이 멀리 나가지 않고도<br />
          일상 속 활력을 찾을 수 있도록 지역만의 매력과 색깔을 <br />
          담은 맞춤형 커뮤니티를 만들었습니다.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700 max-[390px]:text-xs tablet:mt-6 tablet:max-w-3xl tablet:text-base">
          단순한 친목을 넘어, 청년들의 진짜 &apos;취향&apos;을 기반으로
          <br />
          다양한 모임과 행사, 원데이 클래스를 큐레이션 합니다.
          <br />
          코드가 통하는 사람들과 함께 관심사를 나누고,
          <br />
          <span className="rounded-sm bg-genie-yellow px-0.5 font-medium text-black">
            새로운 나를 발견하는 시간을 경험해보세요.
          </span>
        </p>
        <div className="mt-8 max-[390px]:mt-6 tablet:mt-10">
          <ImagePlaceholder
            label="지도_서울경기일러스트"
            className="h-56 w-full rounded-2xl text-sm max-[390px]:h-48 tablet:h-64 desktop:h-72"
          />
        </div>
      </div>
    </section>
  );
}
