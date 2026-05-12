import MediaSlot from "@/components/MediaSlot";

type ClassCardIcon = "palette" | "lotus" | "clapperboard";

type ClassCard = {
  key: string;
  category: string;
  title: string;
  hashtags: string[];
  icon: ClassCardIcon;
  mediaLabel: string;
  mediaHint: string;
};

const CLASS_CARDS: ClassCard[] = [
  {
    key: "oil-pastel",
    category: "아트/드로잉",
    title: "오일파스텔",
    hashtags: ["힐링", "감성", "드로잉"],
    icon: "palette",
    mediaLabel: "클래스 이미지",
    mediaHint: "오일파스텔",
  },
  {
    key: "spring-picnic",
    category: "라이프스타일",
    title: "봄 피크닉 산책",
    hashtags: ["야외", "만남", "중랑천"],
    icon: "lotus",
    mediaLabel: "클래스 이미지",
    mediaHint: "피크닉",
  },
  {
    key: "vlog-school",
    category: "미디어",
    title: "브이로그 촬영 기초 스쿨",
    hashtags: ["영상", "입문", "크리에이터"],
    icon: "clapperboard",
    mediaLabel: "클래스 이미지",
    mediaHint: "브이로그",
  },
];

function CardCategoryIcon({ type }: { type: ClassCardIcon }) {
  const common = "h-5 w-5 text-white";
  switch (type) {
    case "palette":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3a7 7 0 0 0-7 7c0 1.5.5 2.9 1.3 4L5 18l4-1.3A7 7 0 1 0 12 3Zm-1 4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm3.5 1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm2.8 2.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM9.5 14a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
          />
        </svg>
      );
    case "lotus":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            fill="currentColor"
            d="M12 4c-1.2 2-3 3.5-5.2 4.2.3 2.3 1.5 4.4 3.4 5.8H14c1.9-1.4 3.1-3.5 3.4-5.8C15.2 7.5 13.4 6 12 4Zm-6.5 6C3.8 11.5 3 13.2 3 15c0 2.2 1.8 4 4 4h1.5c-1.5-1.5-2.5-3.5-2.8-5.7-.5-.4-1-.9-1.2-1.3Zm13 0c-.2.4-.7.9-1.2 1.3-.3 2.2-1.3 4.2-2.8 5.7H17c2.2 0 4-1.8 4-4 0-1.8-.8-3.5-2.5-5Z"
          />
        </svg>
      );
    case "clapperboard":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            fill="currentColor"
            d="M4 7h16v10H4V7Zm2 2v6h12V9H6Zm1.5-4L8 6h2l-.5-1H9l-.5-1Zm3 0L11 6h2l-.5-1h-1l-.5-1Zm3 0L14 6h2l-.5-1h-1l-.5-1Z"
          />
          <path fill="currentColor" d="M4 17h16v3H4v-3Z" opacity="0.85" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HistorySection() {
  return (
    <section id="past-genieday" className="bg-white py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
          <span className="flex flex-wrap items-center justify-center gap-x-1.5">
            <span className="text-genie-black">우리가 함께한</span>
            <span className="text-genie-purple">&apos;지니데이&apos;</span>
          </span>
        </h2>
        {/* <h2 className="text-center text-xl font-bold leading-snug text-genie-purple sm:text-2xl lg:text-3xl">
          우리가 함께한
          <br />
          &apos;지니데이&apos;
        </h2> */}

        <ul className="mt-10 flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:mt-12 lg:gap-8">
          {CLASS_CARDS.map((card) => (
            <li
              key={card.key}
              className="w-[min(82vw,280px)] shrink-0 sm:w-auto"
            >
              <article className="text-left">
                <div className="relative">
                  <MediaSlot
                    aspectClass="aspect-[5/4]"
                    variant="on-white"
                    label={card.mediaLabel}
                    hint={card.mediaHint}
                    className="rounded-[20px]"
                  />
                  <div
                    className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-genie-purple shadow-md sm:left-3.5 sm:top-3.5"
                    aria-hidden
                  >
                    <CardCategoryIcon type={card.icon} />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <span className="inline-block rounded-full border border-genie-purple bg-white px-3 py-1 text-[11px] font-semibold leading-none text-genie-purple sm:text-xs">
                    {card.category}
                  </span>
                  <h3 className="mt-2.5 text-base font-bold leading-snug text-[#111] sm:mt-3 sm:text-lg">
                    {card.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {card.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-md bg-[#F0F0F0] px-2 py-1 text-[10px] font-medium leading-none text-[#555] sm:text-[11px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 lg:mt-12">
          <div
            className="flex items-center gap-3 rounded-2xl border border-genie-purple/10 bg-[#F5F3FF] px-4 py-3.5 shadow-sm sm:gap-5 sm:rounded-3xl sm:px-6 sm:py-4 lg:gap-6 lg:px-8"
            role="region"
            aria-label="지니데이 안내"
          >
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              <svg
                className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <circle cx="24" cy="24" r="22" className="fill-genie-purple" />
                <path
                  fill="white"
                  d="M24 33.2c-.35 0-.7-.12-.98-.36-3.9-3.35-6.45-6.1-7.92-8.35-1.4-2.15-2.1-3.95-2.1-5.34 0-2.35 1.85-4.25 4.12-4.25 1.28 0 2.5.6 3.28 1.64a4.05 4.05 0 0 1 3.6-2.24 4.05 4.05 0 0 1 3.6 2.24c.78-1.04 2-1.64 3.28-1.64 2.27 0 4.12 1.9 4.12 4.25 0 1.39-.7 3.19-2.1 5.34-1.47 2.25-4.02 5-7.92 8.35a1.45 1.45 0 0 1-.98.36Z"
                />
              </svg>
              <div className="hidden h-11 w-px shrink-0 bg-genie-purple/20 sm:block" aria-hidden />
            </div>

            <div className="min-w-0 flex-1 text-left text-[13px] font-normal leading-snug text-[#111] sm:text-sm sm:leading-relaxed lg:text-base">
              <p>지니데이에서 새로운 취향을 발견하고,</p>
              <p className="mt-0.5 sm:mt-1">
                같은 관심사를 가진{" "}
                <span className="font-bold text-genie-purple">동네 친구들</span>을
                만나보세요!
              </p>
            </div>

            <div className="w-14 shrink-0 self-center sm:w-[72px] lg:w-[88px]" aria-hidden>
              <svg
                className="h-auto w-full text-genie-purple"
                viewBox="0 0 88 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="11" r="3.5" />
                  <path d="M24 14.5V30M24 17L17 8M24 17L31 8M24 30l-4 12M24 30l4 12" />
                  <circle cx="58" cy="11" r="3.5" />
                  <path d="M58 14.5V30M58 17L51 8M58 17L65 8M58 30l-4 12M58 30l4 12" />
                </g>
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  d="M8 8l2 2M78 6l2 3M6 24l2-2M82 22l-2 2M12 14l2-2M74 16l2-2"
                />
                <circle cx="6" cy="12" r="1.2" fill="currentColor" />
                <circle cx="82" cy="10" r="1.2" fill="currentColor" />
                <circle cx="84" cy="26" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
