import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const ITEMS = [
  {
    team: "삼색팀",
    tags: ["#기획", "#디자인"],
    desc: "브랜드 경험을 다듬고 실제 배포까지 이어 본 팀 프로젝트입니다.",
    label: "지니어스_삼색팀",
  },
  {
    team: "노마드랩",
    tags: ["#개발", "#데이터"],
    desc: "작은 아이디어를 빠르게 검증하며 사용자 피드백을 반영했습니다.",
    label: "지니어스_노마드랩",
  },
];

export function GeniusListSection() {
  return (
    <section className="bg-white py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="text-2xl font-extrabold text-neutral-900 max-[390px]:text-xl tablet:text-3xl">
          우리가 함께한 <span className="text-genie-purple">&apos;지니어스&apos;</span>
        </h2>
        <ul className="mt-8 space-y-6 max-[390px]:mt-6 tablet:mt-10">
          {ITEMS.map((item) => (
            <li
              key={item.team}
              className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-genie-lavender/50 p-4 ring-1 ring-genie-purple/10 tablet:flex-row tablet:items-stretch tablet:p-5 desktop:gap-6"
            >
              <ImagePlaceholder
                label={item.label}
                className="h-40 w-full shrink-0 rounded-xl tablet:h-auto tablet:w-48 desktop:w-56"
              />
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="text-xl font-extrabold text-neutral-900">{item.team}</h3>
                <p className="mt-2 text-sm font-semibold text-genie-purple">{item.tags.join(" ")}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 max-[390px]:text-xs">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
  
    </section>
  );
}
