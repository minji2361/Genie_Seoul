import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function IntroPhotoSection() {
  return (
    <section className="relative isolate min-h-[220px] overflow-hidden max-[390px]:min-h-[200px] tablet:min-h-[280px] desktop:min-h-[360px]">
      <ImagePlaceholder
        label="인트로_커뮤니티사진"
        className="absolute inset-0 h-full w-full rounded-none text-sm"
      />
      <div className="relative mx-auto flex max-w-content min-h-[inherit] items-end px-4 pb-8 pt-16 tablet:px-6 tablet:pb-10 tablet:pt-24 desktop:px-8 desktop:pb-14">
        <div className="max-w-xl text-white drop-shadow-md">
          <h2 className="text-2xl font-extrabold leading-snug max-[390px]:text-xl tablet:text-3xl desktop:text-4xl">
            멀리 가지 마세요.<br />설렘은 <span className="text-genie-yellow">우리 동네</span>에 있으니까!
          </h2>
          <p className="mt-3 text-sm font-medium text-white/90 max-[390px]:text-xs tablet:text-base">
            일상에 마법 같은 재미를 더하는 <br />
            우리동네 <span className="text-genie-yellow">플레이그라운드 '지니'</span>
          </p>
        </div>
      </div>
    </section>
  );
}
