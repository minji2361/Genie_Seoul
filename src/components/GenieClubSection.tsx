import Image from "next/image";

const CLUB2_WIDTH = 1111;
const CLUB2_HEIGHT = 207;

const CLUBS = [
  {
    image: "/GenieClub/book_crew.jpg",
    title: "독서토론",
    descLine1: "책을 통해 생각을 나누고,",
    descLine2: "서로의 시야를 넓히는 시간",
    label: "지니클럽_독서토론",
  },
  {
    image: "/GenieClub/running_crew.jpg",
    title: "중랑천 러닝크루",
    descLine1: "함께 뛰며 건강도 챙기고",
    descLine2: "일상의 스트레스도 날려요!",
    label: "지니클럽_러닝크루",
  },
  {
    image: "/GenieClub/boardgame_crew.jpg",
    title: "중랑구 보드게임 검은조직",
    descLine1: "보드게임 한 판으로 친해지는 우리!",
    descLine2: "전략도 우정도 레벨 업!",
    label: "지니클럽_보드게임",
  },
  {
    image: "/GenieClub/soccer_crew.jpg",
    title: "족발킹 (족구동아리)",
    descLine1: "족구로 하나되는 에너지!",
    descLine2: "함께 땀 흘리고 웃어요!",
    label: "지니클럽_족구",
  },
] as const;
export function GenieClubSection() {
  return (
    <section className="bg-white py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="font-appleHB text-4xl text-neutral-900 max-[390px]:text-3xl tablet:text-5xl">
          우리가 함께한 <span className="text-genie-purple">&apos;지니클럽&apos;</span>
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 max-[390px]:mt-6 tablet:mt-10 tablet:grid-cols-2 tablet:gap-5 desktop:grid-cols-4">
          {CLUBS.map((club) => (
            <article
              key={club.label}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-genie-purple/10"
            >
              <div className="relative aspect-[437/278] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={club.image}
                  alt={club.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 390px) 50vw, (max-width: 768px) 25vw, 300px"
                />
              </div>
              <div className="px-3 pb-4 pt-3 text-center max-[390px]:px-2.5 max-[390px]:pb-3 tablet:px-4 tablet:pb-5">
                <h3 className="font-appleHB text-lg text-genie-purple max-[390px]:text-base tablet:text-xl">
                  {club.title}
                </h3>
                <div className="mx-auto my-2 h-px w-8 bg-genie-purple max-[390px]:my-1.5" aria-hidden />
                <p className="font-appleMedium text-sm leading-relaxed text-neutral-700 max-[390px]:text-xs">
                  {club.descLine1}
                  <br />
                  {club.descLine2}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="relative mt-6 overflow-hidden rounded-2xl max-[390px]:mt-5 tablet:mt-8">
          <Image
            src="/GenieClub/club2.png"
            alt=""
            width={CLUB2_WIDTH}
            height={CLUB2_HEIGHT}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 max-[390px]:p-3 tablet:p-5">
            <div className="flex min-w-0 -translate-x-4 items-center gap-3 max-[390px]:-translate-x-5 tablet:translate-x-0 tablet:gap-4">
              <p className="font-appleMedium text-center text-xs leading-relaxed text-neutral-800 max-[390px]:text-[11px] tablet:text-2xl">
                당신의 관심사가 새로운 인연이 됩니다.
                <br />
                <span className="font-bold text-genie-purple">지니클럽</span>에서{" "}
                <span className="font-bold text-genie-purple">함께할 친구들</span>을 만나보세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
