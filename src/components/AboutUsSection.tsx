import MediaSlot from "@/components/MediaSlot";

export default function AboutUsSection() {
  return (
    <section id="story" className="bg-white py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-2xl font-bold text-genie-purple sm:text-3xl lg:text-4xl">지니 이야기</h2>

        <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="min-w-0 max-w-3xl flex-1 space-y-5 sm:space-y-6">
            <p className="text-base font-normal leading-relaxed text-[#111] sm:text-lg lg:text-xl">
              지니는 <span className="font-bold">서울 경기 북부</span>를 무대로 활동하는
              <br />
              <span className="font-bold">청년 문화 스타트업 플랫폼</span>입니다.
            </p>

            <p className="text-sm font-normal leading-relaxed text-[#111] sm:text-base lg:text-lg">
              중랑구에서 성북구까지,
              <br />
              우리 동네 청년들이 굳이 멀리 나가지 않고도
              <br />
              일상 속 활력을 찾을 수 있도록 지역만의 매력과 색깔을
              <br />
              담은 맞춤형 커뮤니티를 만들었습니다.
            </p>

            <p className="text-sm font-normal leading-relaxed text-[#111] sm:text-base lg:text-lg">
              단순한 친목을 넘어, 청년들의 진짜 &apos;취향&apos;을 기반으로
              <br />
              다양한 모임과 행사, 원데이 클래스를 큐레이션 합니다.
              <br />
              코드가 통하는 사람들과 함께 관심사를 나누고,
              <br />
              <span className="box-decoration-clone rounded-sm bg-genie-yellow px-1.5 py-0.5 font-semibold text-[#111] [box-decoration-break:clone]">
                새로운 나를 발견하는 시간을 경험해 보세요.
              </span>
            </p>
          </div>

          <div className="mx-auto w-full max-w-[240px] shrink-0 sm:mx-0 lg:max-w-[min(100%,360px)]">
            <MediaSlot
              aspectClass="aspect-[4/5]"
              variant="on-light"
              label="서울 중랑구"
              hint="맵 일러스트"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
