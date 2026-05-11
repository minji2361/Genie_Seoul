import MediaSlot from "@/components/MediaSlot";

const EVENTS = [
  { date: "2025.04", title: "봄 피크닉", desc: "중랑천 산책 후 모임" },
  { date: "2025.03", title: "드로잉 클래스", desc: "감성 일러스트 체험" },
  { date: "2025.02", title: "북토크", desc: "에세이 나눔의 밤" },
];

export default function HistorySection() {
  return (
    <section id="past-genieday" className="bg-white py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center text-xl font-bold leading-snug text-genie-purple sm:text-2xl lg:text-3xl">
          우리가 함께한
          <br />
          &apos;지니데이&apos;
        </h2>

        <ul className="mt-10 flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:mt-12 lg:gap-8">
          {EVENTS.map((ev) => (
            <li key={ev.title} className="w-[min(72vw,200px)] shrink-0 sm:w-auto">
              <MediaSlot
                aspectClass="aspect-[5/4]"
                variant="on-white"
                label="행사 사진"
                hint="교체"
                className="rounded-xl"
              />
              <p className="mt-2 text-xs font-bold text-genie-purple">{ev.date}</p>
              <p className="mt-0.5 text-sm font-bold text-[#111]">{ev.title}</p>
              <p className="mt-1 text-xs font-normal leading-snug text-[#444]">{ev.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center lg:mt-12">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-bold text-genie-purple hover:underline sm:text-base"
          >
            더 보기
            <span className="text-lg" aria-hidden>
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
