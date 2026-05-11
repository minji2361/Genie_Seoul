import MediaSlot from "@/components/MediaSlot";

const CLUBS = [
  { title: "독서 모임", desc: "2025.03 함께 읽고 나누는 저녁" },
  { title: "러닝 크루", desc: "2025.02 가볍게 달리는 아침" },
  { title: "필름 클럽", desc: "2025.01 영화와 대화" },
  { title: "핸드메이드", desc: "2024.12 만드는 즐거움" },
];

export default function GenieClubSection() {
  return (
    <section id="genie-club" className="bg-white pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center text-xl font-bold leading-snug text-genie-purple sm:text-2xl lg:text-3xl">
          우리가 함께한
          <br />
          &apos;지니클럽&apos;
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mx-auto lg:mt-14 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12">
          {CLUBS.map((c) => (
            <li key={c.title} className="flex flex-col items-center text-center">
              <MediaSlot
                aspectClass="aspect-[4/3]"
                variant="on-white"
                label="사진"
                hint="교체"
                className="w-full rounded-xl"
              />
              <p className="mt-3 text-sm font-bold text-[#111] sm:text-base">{c.title}</p>
              <p className="mt-1 text-xs font-normal leading-snug text-[#444] sm:text-sm">{c.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center lg:mt-14">
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
