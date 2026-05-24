import Image from "next/image";

const CLUB_CA_WIDTH = 1403;
const CLUB_CA_HEIGHT = 1638;

export function CommunicationMagicSection() {
  return (
    <section id="genie-club" className="bg-genie-lavender/30 py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-6 px-4 max-[390px]:gap-5 tablet:grid-cols-2 tablet:gap-6 tablet:px-6 desktop:max-w-5xl desktop:gap-8 desktop:px-8">
        <div className="text-center tablet:text-left">
          <p className="font-appleThin text-lg font-normal text-neutral-700 max-[390px]:text-base tablet:text-xl desktop:text-3xl">
            관심사가 만나
            <br />
            특별한 인연이 되는 &apos;소통의 마법&apos;
          </p>
          <h2 className="font-appleExtraBold mt-3 text-5xl text-genie-purple max-[390px]:text-4xl tablet:text-6xl desktop:text-7xl">
            지니클럽
          </h2>
          <p className="font-appleThin mt-4 max-w-md text-lg font-normal text-neutral-700 max-[390px]:text-base tablet:text-xl desktop:text-3xl">
            다양한 소모임과 활동을 통해
            <br />
            나만의 커뮤니티를 만들어보세요!
          </p>
        </div>
        <div className="flex justify-center tablet:justify-end">
          <Image
            src="/GenieClub/genie_club_ca.PNG"
            alt="지니클럽 하트 캐릭터"
            width={CLUB_CA_WIDTH}
            height={CLUB_CA_HEIGHT}
            className="h-auto w-full max-w-[220px] max-[390px]:max-w-[180px] tablet:max-w-[260px]"
            sizes="(max-width: 390px) 180px, (max-width: 768px) 220px, 260px"
          />
        </div>
      </div>
    </section>
  );
}
