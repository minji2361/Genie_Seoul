import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const CLUBS = [
  { title: "등산회", desc: "가벼운 코스부터 능선까지 함께 걷습니다.", label: "지니클럽_등산회" },
  { title: "클라이밍", desc: "첫 입문부터 루트 읽기까지 차근차근.", label: "지니클럽_클라이밍" },
  { title: "러닝크루", desc: "밤 달리기와 주말 롱런을 번갈아 진행.", label: "지니클럽_러닝크루" },
  { title: "북클럽", desc: "한 권씩 나눠 읽고 짧은 대화로 마무리.", label: "지니클럽_북클럽" },
];

export function GenieClubSection() {
  return (
    <section className="bg-white py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="text-2xl font-extrabold text-neutral-900 max-[390px]:text-xl tablet:text-3xl">
          우리가 함께한 <span className="text-genie-purple">&apos;지니클럽&apos;</span>
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 max-[390px]:mt-6 tablet:mt-10 tablet:grid-cols-2 tablet:gap-5 desktop:grid-cols-4">
          {CLUBS.map((club) => (
            <article
              key={club.title}
              className="overflow-hidden rounded-2xl bg-genie-lavender/40 ring-1 ring-genie-purple/10"
            >
              <ImagePlaceholder label={club.label} className="h-32 w-full rounded-none text-xs max-[390px]:h-28 tablet:h-36" />
              <div className="p-3 max-[390px]:p-2.5 tablet:p-4">
                <h3 className="text-base font-bold text-neutral-900 max-[390px]:text-sm">{club.title}</h3>
                <p className="mt-1 text-xs leading-snug text-neutral-600 max-[390px]:text-[11px]">{club.desc}</p>
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
                당신의 관심사가 새로운 인연이 됩니다.
                <br />
                <span className="font-bold text-genie-purple">지니클럽</span>에서 
                <span className="font-bold text-genie-purple">함께할 친구들</span>을 만나보세요!
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
