import MediaSlot from "@/components/MediaSlot";

export default function GeniusCalloutSection() {
  return (
    <section
      id="genie-us"
      className="relative overflow-hidden bg-gradient-to-br from-genie-lavender via-[#f2edff] to-genie-lavender py-16 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8 sm:flex-row sm:justify-between sm:gap-10 lg:px-10 lg:gap-14">
        <p className="text-center text-4xl font-black text-genie-purple sm:text-left sm:text-5xl lg:text-6xl xl:text-7xl">
          지니어스
        </p>
        <div className="mt-8 w-[min(100%,220px)] shrink-0 sm:mt-0 lg:w-[min(100%,300px)]">
          <MediaSlot
            aspectClass="aspect-square"
            variant="on-light"
            label="캐릭터"
            hint="망원경 일러스트"
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
