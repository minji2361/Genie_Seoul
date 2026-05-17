import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-genie-purple pb-10 pt-6 max-[390px]:pb-8 max-[390px]:pt-5 tablet:pb-12 tablet:pt-8 desktop:pb-16 desktop:pt-10">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-6 px-4 max-[390px]:gap-5 tablet:grid-cols-2 tablet:gap-6 tablet:px-6 desktop:max-w-5xl desktop:gap-8 desktop:px-8">
        <div className="flex flex-col items-center gap-3 text-white desktop:gap-4">
          <div className="flex w-full flex-col items-center gap-3 text-center desktop:gap-4">
            <p className="font-paperlogyLight text-lg text-white/90 max-[390px]:text-base tablet:text-xl desktop:text-3xl">
              내 취향이 일상이 되는 곳,
            </p>
            <p className="font-paperlogyBold text-lg text-white max-[390px]:text-base tablet:text-xl desktop:text-3xl">
              가장 가까운 놀이터
            </p>
            <p className="font-gmarket text-3xl text-genie-yellow max-[390px]:text-2xl tablet:text-4xl desktop:text-6xl">
              플레이그라운드
            </p>
          </div>
          <div className="relative h-20 w-full max-w-[240px] max-[390px]:h-[4.5rem] max-[390px]:max-w-[260px] tablet:h-28 tablet:max-w-[300px] desktop:h-40 desktop:max-w-[400px]">
            <Image
              src="/GenieMain/GenieLogoShadow.png"
              alt="genie"
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 768px) 260px, (max-width: 1439px) 300px, 400px"
            />
          </div>
        </div>
        <div className="flex justify-center tablet:justify-start">
          <div className="relative h-[200px] w-full max-w-[260px] max-[390px]:h-[180px] max-[390px]:max-w-[240px] tablet:h-[280px] tablet:max-w-[360px] desktop:h-[380px] desktop:max-w-[480px]">
            <Image
              src="/GenieMain/genie_main.png"
              alt="genie 메인 일러스트"
              fill
              priority
              className="rounded-2xl object-contain"
              sizes="(max-width: 390px) 240px, (max-width: 768px) 360px, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
