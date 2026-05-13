type Milestone = {
  icon: string;
  badge: string;
  title: string;
  description: string;
};

const MILESTONES: Milestone[] = [
  {
    icon: "🚀",
    badge: "2022",
    title: "프로젝트 시작",
    description: "동네 기반 취향 모임을 실험하며 첫 모임을 열었습니다.",
  },
  {
    icon: "👥",
    badge: "2023",
    title: "멤버 확대",
    description: "지역 파트너와 함께 프로그램 라인업을 다양화했습니다.",
  },
  {
    icon: "🔭",
    badge: "2024",
    title: "브랜드 정비",
    description: "genie 데이·클럽·어스 등 체험형 시리즈를 정립했습니다.",
  },
];

export function GenieHistorySection() {
  return (
    <section className="bg-genie-lavender/60 py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="text-2xl font-extrabold text-genie-purple max-[390px]:text-xl tablet:text-3xl">
          genie 연혁
        </h2>
        <ol className="relative mt-8 space-y-8 pl-6 max-[390px]:mt-6 max-[390px]:space-y-6 tablet:mt-10 tablet:pl-8">
          <span
            aria-hidden
            className="absolute left-[11px] top-2 bottom-2 w-px bg-genie-purple/40 max-[390px]:left-[9px] tablet:left-[13px]"
          />
          {MILESTONES.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border-2 border-genie-purple bg-white text-xs max-[390px]:-left-5 max-[390px]:h-5 max-[390px]:w-5 tablet:-left-8 tablet:h-7 tablet:w-7">
                {item.icon}
              </span>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-genie-purple/10 max-[390px]:p-3 tablet:p-5">
                <span className="inline-block rounded-full bg-genie-purple px-3 py-1 text-xs font-bold text-white">
                  {item.badge}
                </span>
                <h3 className="mt-2 text-lg font-bold text-neutral-900 max-[390px]:text-base">{item.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 max-[390px]:text-xs">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
