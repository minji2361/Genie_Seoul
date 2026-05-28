import Image from "next/image";

const DAY2_WIDTH = 1137;
const DAY2_HEIGHT = 186;

const CARDS = [
  {
    image: "/GenieDay/drawing_class.png",
    category: "아트/드로잉",
    title: "오일파스텔",
    tags: ["힐링", "감성", "드로잉"],
  },
  {
    image: "/GenieDay/perfume_class.png",
    category: "라이프스타일",
    title: "시그니처 향수, 도예",
    tags: ["향기", "나만의무드", "라이프"],
  },
  {
    image: "/GenieDay/photo_class.png",
    category: "미디어",
    title: "브이로그 촬영 기초 스쿨",
    tags: ["영상", "브이로그", "초보촬영"],
  },
] as const;

export function PastGenieDaySection() {
  return (
    <section className="bg-genie-lavender/40 py-12 max-[390px]:py-10 tablet:py-14 desktop:py-16">
      <div className="mx-auto max-w-content px-4 tablet:px-6 desktop:px-8">
        <h2 className="font-appleHB text-4xl text-neutral-900 max-[390px]:text-3xl tablet:text-5xl">
          우리가 함께한 <span className="text-genie-purple">&apos;지니데이&apos;</span>
        </h2>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide max-[390px]:mt-6 tablet:mt-10 tablet:snap-none tablet:gap-5 tablet:overflow-visible desktop:gap-6">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="w-[min(300px,85vw)] shrink-0 snap-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-genie-purple/10 max-[390px]:w-[min(280px,88vw)] tablet:w-auto tablet:min-w-0 tablet:flex-1 tablet:shrink"
            >
              <div className="relative aspect-[291/250] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 390px) 88vw, (max-width: 768px) 33vw, 400px"
                />
              </div>
              <div className="space-y-2 p-4 pt-3 text-left max-[390px]:p-3">
                <span className="font-appleMedium inline-block rounded-full border border-genie-purple bg-white px-3 py-1 text-xs text-genie-purple">
                  {card.category}
                </span>
                <h3 className="font-appleHB text-base leading-snug text-neutral-900 tablet:text-lg">{card.title}</h3>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-appleThin rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="relative mt-6 overflow-hidden rounded-2xl max-[390px]:mt-5 tablet:mt-8">
          <Image
            src="/GenieDay/day2.png"
            alt=""
            width={DAY2_WIDTH}
            height={DAY2_HEIGHT}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 max-[390px]:p-3 tablet:p-5">
            <div className="flex min-w-0 items-center gap-3 tablet:gap-4">
              <p className="font-appleMedium text-center text-xs leading-relaxed text-neutral-800 max-[390px]:text-[11px] tablet:text-2xl">
                지니데이에서 새로운 취향을 발견하고,
                <br />
                같은 관심사를 가진 <span className="font-appleSemiBold text-genie-purple">동네 친구들</span>을 만나보세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
