import MediaSlot from "@/components/MediaSlot";

export default function GenieDaySection() {
  return (
    <section
      id="genie-day"
      className="relative overflow-hidden bg-gradient-to-br from-genie-purple via-[#8B5CFF] to-genie-purple-deep py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,238,0,0.14),transparent_45%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8 sm:flex-row sm:justify-between sm:gap-10 lg:px-10 lg:gap-14">
        <p className="text-center text-4xl font-black text-genie-yellow sm:text-left sm:text-5xl lg:text-6xl xl:text-7xl">
          지니데이
        </p>
        <div className="mt-8 w-[min(100%,220px)] shrink-0 sm:mt-0 lg:w-[min(100%,300px)]">
          <MediaSlot
            aspectClass="aspect-square"
            variant="on-purple"
            label="캐릭터"
            hint="돋보기 일러스트"
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
