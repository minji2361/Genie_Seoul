import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function HeroSection() {
  return (
    <section className="bg-genie-purple pb-10 pt-6 max-[390px]:pb-8 max-[390px]:pt-5 tablet:pb-12 tablet:pt-8 desktop:pb-16 desktop:pt-10">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-4 max-[390px]:gap-6 tablet:gap-10 tablet:px-6 desktop:grid-cols-2 desktop:items-center desktop:gap-12 desktop:px-8">
        <div className="flex flex-col gap-3 text-center text-white desktop:text-left">
          <p className="text-sm font-medium text-white/90 max-[390px]:text-xs tablet:text-base">
            내 취향이 일상이 되는 곳,
            <br />
            <span className="font-bold">가장 가까운 놀이터</span>
          </p>
          <p className="text-xl text-genie-yellow font-bold max-[390px]:text-lg tablet:text-2xl desktop:text-3xl">
            플레이그라운드
          </p>
          <p className="text-6xl font-extrabold leading-none text-genie-yellow max-[390px]:text-7xl tablet:text-6xl desktop:text-7xl">
            genie
          </p>
        </div>
        <div className="flex justify-center tablet:justify-center desktop:justify-end">
          <ImagePlaceholder
            label="히어로_지니램프"
            className="aspect-[4/3] w-full max-w-[280px] rounded-2xl max-[390px]:max-w-[240px] tablet:max-w-[320px] desktop:max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
