import type { ReactNode } from "react";

type Milestone = {
  date: string;
  dateBadgeClass: string;
  icon: string;
  title: ReactNode;
  description: string;
};

const MILESTONES: Milestone[] = [
  {
    date: "2026.05",
    dateBadgeClass: "bg-genie-purple-deep text-white",
    icon: "🚀",
    title: (
      <span className="rounded-sm bg-genie-yellow px-1 py-0.5 font-bold text-[#111]">
        &apos;지니(Genie)&apos; 청년 문화 스타트업 공식 창업
      </span>
    ),
    description:
      "청년의 아이디어와 문화를 연결하는 '지니(Genie)'를 공식 출범 하였습니다.",
  },
  {
    date: "2025.02",
    dateBadgeClass: "bg-genie-purple text-white",
    icon: "💬",
    title: (
      <>
        [ 지니데이 ] 지역 로컬 크리에이터 초청{" "}
        <span className="rounded-sm bg-genie-yellow px-1 py-0.5 font-bold text-[#111]">원데이클래스 운영</span>
      </>
    ),
    description: "다양한 분야의 로컬 크리에이터와 함께 배우고 교류하는 원데이클래스를 진행하였습니다.",
  },
  {
    date: "2024.04",
    dateBadgeClass: "bg-[#8B6CFD] text-white",
    icon: "🎤",
    title: (
      <>
        [ 지니어스 ] 중랑~노원 지역구 청년 타겟{" "}
        <span className="rounded-sm bg-genie-yellow px-1 py-0.5 font-bold text-[#111]">강연 행사 개최</span>
      </>
    ),
    description: "청년의 성장과 인사이트를 위한 강연을 통해 지역 청년들과 소통하는 시간을 가졌습니다.",
  },
  {
    date: "2024.02",
    dateBadgeClass: "bg-[#B8A6F0] text-white",
    icon: "💜",
    title: (
      <>
        [ 지니클럽 ] 소모임 회원{" "}
        <span className="rounded-sm bg-genie-yellow px-1 py-0.5 font-bold text-[#111]">200명 모집</span>
      </>
    ),
    description:
      "관심사 기반의 다양한 소모임을 통해 200명의 청년들과 함께하는 커뮤니티를 만들었습니다.",
  },
];

export default function PrinciplesSection() {
  return (
    <section id="yeonhyeok" className="bg-white py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <p className="font-display text-2xl font-normal tracking-tight text-genie-purple sm:text-3xl">genie</p>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 sm:mt-8">
          <div className="min-w-0">
            <h2 className="text-4xl font-bold leading-none text-genie-purple sm:text-5xl lg:text-6xl">연혁</h2>
            <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-[#333] sm:mt-4 sm:text-lg">
              지니(Genie)의 걸어온 발자취입니다.
            </p>
          </div>
          <div className="flex shrink-0 gap-1.5 text-lg text-genie-purple/70 sm:text-xl" aria-hidden>
            <span>✦</span>
            <span>✦</span>
            <span className="text-sm opacity-80">✦</span>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-14 lg:mt-16">
          <ol className="relative m-0 list-none p-0">
            {/* 연속 세로선: 부드러운 중간 톤 보라, 원 중심과 정렬 */}
            <div
              className="pointer-events-none absolute bottom-12 left-[21px] top-7 z-0 w-px rounded-full bg-gradient-to-b from-[#E8E2FF] via-[#B9A6F0] to-[#E8E2FF] sm:bottom-14 sm:left-[25px] sm:top-8 lg:left-[27px]"
              aria-hidden
            />

            {MILESTONES.map((m, index) => (
              <li
                key={m.date}
                className={`relative z-[1] flex gap-5 sm:gap-7 lg:gap-8 ${index < MILESTONES.length - 1 ? "pb-16 sm:pb-20" : "pb-4 sm:pb-6"}`}
              >
                <div className="relative flex w-[42px] shrink-0 justify-center sm:w-[50px]">
                  <span
                    className="relative mt-7 h-[14px] w-[14px] shrink-0 rounded-full border-[2.5px] border-genie-purple bg-white shadow-[0_1px_4px_rgba(123,75,255,0.2)] sm:mt-8 sm:h-[18px] sm:w-[18px] sm:border-[3px]"
                    aria-hidden
                  />
                </div>

                <div className="min-w-0 flex-1 rounded-[20px] border border-genie-lavender/70 bg-white p-4 shadow-[0_6px_24px_rgba(123,75,255,0.08),0_2px_8px_rgba(123,75,255,0.06)] sm:p-5 lg:mx-auto lg:max-w-3xl lg:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="flex shrink-0 justify-center sm:block">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0ECFF] text-2xl text-genie-purple sm:h-16 sm:w-16 sm:text-3xl">
                        {m.icon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`-mt-1 inline-block rounded-lg px-2.5 py-1 text-xs font-bold shadow-sm sm:-mt-0.5 sm:text-sm ${m.dateBadgeClass}`}
                      >
                        {m.date}
                      </span>
                      <h3 className="mt-3 text-base font-bold leading-snug text-genie-purple sm:text-lg lg:text-xl">
                        {m.title}
                      </h3>
                      <p className="mt-3 text-sm font-normal leading-relaxed text-[#444] sm:text-base">{m.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
