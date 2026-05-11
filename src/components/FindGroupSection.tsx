import MediaSlot from "@/components/MediaSlot";

export default function FindGroupSection() {
  return (
    <section id="find-group" className="bg-white py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:gap-16">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold leading-snug text-genie-purple sm:text-2xl lg:text-3xl">
              나에게 맞는
              <br />
              &apos;모임찾기&apos;
            </h2>
            <p className="mt-4 text-sm font-normal leading-relaxed text-[#111] sm:text-base lg:text-lg">
              취향과 일정에 맞는 모임을 찾고,
              <br />
              새로운 사람들과 자연스럽게 연결되세요.
            </p>
            <div className="mt-8 flex justify-center sm:justify-start">
              <button
                type="button"
                className="rounded-full bg-genie-yellow px-10 py-3.5 text-sm font-bold text-[#111] shadow-sm transition hover:brightness-95 active:scale-[0.99] sm:px-12 sm:text-base"
              >
                모임 참여하기
              </button>
            </div>
          </div>
          <div className="mx-auto w-[150px] shrink-0 sm:mx-0 sm:w-[200px] lg:w-[240px]">
            <MediaSlot
              aspectClass="aspect-[3/4]"
              variant="on-light"
              label="모임 찾기"
              hint="UI·일러스트"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
