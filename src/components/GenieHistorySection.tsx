import Image from "next/image";

const GENIE_HISTORY_LOGO_WIDTH = 247;
const GENIE_HISTORY_LOGO_HEIGHT = 91;

type Milestone = {  icon: string;
  badge: string;
  title: string;
  description: string;
};

const MILESTONES: Milestone[] = [
  {
    icon: "🚀",
    badge: "2024.02",
    title: "[지니클럽] 소모임 회원 200명 모집",
    description: "관심사 기반의 다양한 소모임을 통해 200명의 청년들과 함께하는 커뮤니티를 만들었습니다.",
  },
  {
    icon: "👥",
    badge: "2024.04",
    title: "[지니어스] 중랑~노원 지역구 청년 타겟 강연 행사 개최",
    description: "청년의 성장과 인사이트를 위한 강연을 통해 지역 청년들과 소통하는 시간을 가졌습니다.",
  },
  {
    icon: "🔭",
    badge: "2025.02",
    title: "[지니데이] 크리에이터 초청 원데이클래스 운영",
    description: "다양한 분야의 로컬 크리에이터와 함께 배우고 교류하는 원데이클래스를 진행하였습니다.",
  },
  {
    icon: "🔭",
    badge: "2026.05",
    title: "'지니(Genie)' 청년 문화 스타트업 공식 창업",
    description: "청년의 아이디어와 문화를 연결하는 '지니(Genie)'를 공식 출범하였습니다.",
  }
];

export function GenieHistorySection() {
  return (
    <section className="bg-genie-lavender/60 py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-4xl leading-none max-[390px]:text-3xl tablet:text-5xl desktop:text-6xl">
          <Image
            src="/GenieStory/GenieHistory.png"
            alt="genie"
            width={GENIE_HISTORY_LOGO_WIDTH}
            height={GENIE_HISTORY_LOGO_HEIGHT}
            className="h-[1em] w-auto shrink-0"
            sizes="(max-width: 390px) 36px, (max-width: 768px) 48px, 60px"
          />
          <span className="font-paperlogyBlack text-genie-purple">연혁</span>
        </h2>
        <p className="font-appleSemiBold mt-4 text-lg leading-relaxed text-neutral-700 max-[390px]:text-base tablet:mt-6 tablet:text-xl desktop:text-2xl">
            지니(Genie)의 걸어온 발자취입니다.
        </p>
        <ol className="relative mt-8 space-y-8 pl-6 max-[390px]:mt-6 max-[390px]:space-y-6 tablet:mt-10 tablet:pl-8">
          <span
            aria-hidden
            className="absolute left-[11px] top-2 bottom-2 w-px bg-genie-purple/40 max-[390px]:left-[9px] tablet:left-[13px]"
          />
          {MILESTONES.map((item) => (
            <li key={item.title} className="relative">
              <span
                aria-hidden
                className="absolute -left-6 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-genie-purple bg-white max-[390px]:-left-5 tablet:-left-8"
              />
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-genie-purple/10 max-[390px]:p-3 tablet:p-5">
                <span className="inline-block rounded-full bg-genie-purple px-3 py-1.5 text-sm font-bold text-white max-[390px]:text-xs tablet:px-4 tablet:py-2 tablet:text-base">
                  {item.badge}
                </span>
                <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5 max-[390px]:mt-2 max-[390px]:gap-x-2 tablet:gap-x-4">
                  <div className="row-span-2 flex items-stretch self-center">
                    <span className="flex aspect-square h-full w-auto min-h-[4rem] min-w-[4rem] shrink-0 items-center justify-center rounded-full border-2 border-genie-purple bg-white text-2xl leading-none max-[390px]:min-h-[3.5rem] max-[390px]:min-w-[3.5rem] max-[390px]:text-xl tablet:min-h-[4.5rem] tablet:min-w-[4.5rem] tablet:text-3xl">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="font-paperlogyBlack col-start-2 row-start-1 text-xl leading-snug text-neutral-900 max-[390px]:text-lg tablet:text-2xl">
                    {item.title}
                  </h3>
                  <p className="font-appleMedium col-start-2 row-start-2 text-base leading-relaxed text-neutral-600 max-[390px]:text-sm tablet:text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
