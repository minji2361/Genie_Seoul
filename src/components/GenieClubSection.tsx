import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const CLUB2_WIDTH = 1111;
const CLUB2_HEIGHT = 207;

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
        <h2 className="font-appleHB text-4xl text-neutral-900 max-[390px]:text-3xl tablet:text-5xl">
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
