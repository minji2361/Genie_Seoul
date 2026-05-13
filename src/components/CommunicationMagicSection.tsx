import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function CommunicationMagicSection() {
  return (
    <section id="genie-club" className="bg-genie-lavender/30 py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto grid max-w-content items-center gap-6 px-4 tablet:grid-cols-2 tablet:gap-8 tablet:px-6 desktop:grid-cols-2 desktop:gap-10 desktop:px-8">
        <div className="text-center tablet:text-left">
          <p className="text-sm font-medium max-[390px]:text-xs tablet:text-base">
            관심사가 만나<br />특별한 인연이 되는 '소통의 마법'
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-genie-purple max-[390px]:text-3xl tablet:text-5xl desktop:text-6xl">
            지니클럽
          </h2>
          <p className="mt-3 max-w-md text-sm text-neutral-700 max-[390px]:text-xs tablet:text-base">
            다양한 소모임과 활동을 통해<br />나만의 커뮤니티를 만들어보세요!
          </p>
        </div>
        <div className="flex justify-center tablet:justify-end">
          <ImagePlaceholder
            label="소통의마법_하트캐릭터"
            className="aspect-square w-full max-w-[220px] rounded-2xl max-[390px]:max-w-[180px] tablet:max-w-[260px]"
          />
        </div>
      </div>
    </section>
  );
}
