import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function GenieDayBannerSection() {
  return (
    <section
      id="genie-day"
      className="bg-genie-purple py-10 max-[390px]:py-8 tablet:py-12 desktop:py-14"
    >
      <div className="mx-auto grid max-w-content items-center gap-6 px-4 tablet:grid-cols-2 tablet:gap-8 tablet:px-6 desktop:grid-cols-2 desktop:gap-10 desktop:px-8">
        <div className="text-center text-white tablet:text-left">
          <p className="text-sm font-medium text-white/90 max-[390px]:text-xs tablet:text-base">
            단 하루 만에 펼쳐지는 취향 발견의 마법
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-genie-yellow max-[390px]:text-3xl tablet:text-5xl desktop:text-6xl">
            지니데이
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/90 text-neutral-700 max-[390px]:text-xs tablet:text-base">
            다양한 클래스와 사람들을 만나<br />나만의 취향을 발견해보세요!
          </p>
        </div>
        <div className="flex justify-center tablet:justify-end">
          <ImagePlaceholder
            label="지니데이_돋보기캐릭터"
            className="aspect-square w-full max-w-[220px] rounded-2xl max-[390px]:max-w-[180px] tablet:max-w-[260px]"
          />
        </div>
      </div>
    </section>
  );
}
