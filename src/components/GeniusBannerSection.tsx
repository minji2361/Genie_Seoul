import Image from "next/image";

const US_CA_WIDTH = 1429;
const US_CA_HEIGHT = 1816;

export function GeniusBannerSection() {
  return (
    <section id="genie-us" className="bg-genie-purple py-10 max-[390px]:py-8 tablet:py-12 desktop:py-14">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-6 px-4 max-[390px]:gap-5 tablet:grid-cols-2 tablet:gap-6 tablet:px-6 desktop:max-w-5xl desktop:gap-8 desktop:px-8">
        <div className="text-center text-white tablet:text-left">
          <p className="font-appleThin text-lg font-normal text-white/90 max-[390px]:text-base tablet:text-xl desktop:text-3xl">
            일상의 시야를
            <br />
            넓혀주는 &apos;영감의 마법&apos;
          </p>
          <h2 className="font-appleExtraBold mt-3 text-5xl text-genie-yellow max-[390px]:text-4xl tablet:text-6xl desktop:text-7xl">
            지니어스
          </h2>
          <p className="font-appleThin mt-4 max-w-md text-lg font-normal text-white/90 max-[390px]:text-base tablet:text-xl desktop:text-3xl">
            다양한 분야의 사람들과 함께
            <br />
            생각의 한계를 넘어보세요
          </p>
        </div>
        <div className="flex justify-center tablet:justify-end">
          <Image
            src="/GenidUs/us_ca.png"
            alt="지니어스 망원경 캐릭터"
            width={US_CA_WIDTH}
            height={US_CA_HEIGHT}
            className="h-auto w-full max-w-[220px] max-[390px]:max-w-[180px] tablet:max-w-[260px]"
            sizes="(max-width: 390px) 180px, (max-width: 768px) 220px, 260px"
          />
        </div>
      </div>
    </section>
  );
}
