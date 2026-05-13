import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const CARDS = [
  { title: "포토데이", meta: "2024.03 · 성수", label: "지니데이_포토데이" },
  { title: "시네마데이", meta: "2024.05 · 홍대", label: "지니데이_시네마데이" },
  { title: "푸드데이", meta: "2024.07 · 을지로", label: "지니데이_푸드데이" },
];

export function PastGenieDaySection() {
  return (
    <section className="bg-genie-lavender/40 py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="text-2xl font-extrabold text-neutral-900 max-[390px]:text-xl tablet:text-3xl">
          우리가 함께한 <span className="text-genie-purple">&apos;지니데이&apos;</span>
        </h2>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 max-[390px]:mt-6 tablet:mt-10 tablet:grid tablet:grid-cols-2 tablet:overflow-visible desktop:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="min-w-[240px] flex-1 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-genie-purple/10 max-[390px]:min-w-[220px] tablet:min-w-0"
            >
              <ImagePlaceholder label={card.label} className="h-36 w-full rounded-none rounded-t-2xl text-xs" />
              <div className="flex items-start gap-2 p-4 max-[390px]:p-3">
                <span className="mt-0.5 text-genie-purple" aria-hidden>
                  ✦
                </span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">{card.title}</h3>
                  <p className="text-xs text-neutral-600">{card.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-[#F3E8FF] p-4 shadow-sm ring-1 ring-genie-purple/10 max-[390px]:mt-5 max-[390px]:p-3 tablet:mt-8 tablet:p-5">
          <div className="flex flex-col items-stretch gap-4 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-6">
            <div className="flex min-w-0 flex-1 items-center gap-3 tablet:gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-genie-purple text-white shadow-sm tablet:h-12 tablet:w-12"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="h-10 w-px shrink-0 bg-genie-purple/25" aria-hidden />
              <p className="text-sm font-medium leading-relaxed text-neutral-800 max-[390px]:text-xs tablet:text-base">
                지니데이에서 새로운 취향을 발견하고,
                <br />
                같은 관심사를 가진 <span className="font-bold text-genie-purple">동네 친구들</span>을 만나보세요!
              </p>
            </div>
            <div className="flex shrink-0 justify-center tablet:justify-end">
              <ImagePlaceholder
                label="지니데이_친구일러스트"
                className="h-24 w-28 rounded-xl text-xs max-[390px]:h-20 max-[390px]:w-24 tablet:h-28 tablet:w-32"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
