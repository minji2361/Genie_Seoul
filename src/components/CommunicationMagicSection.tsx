import MediaSlot from "@/components/MediaSlot";

export default function CommunicationMagicSection() {
  return (
    <section id="communication" className="bg-genie-lavender py-16 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 sm:px-8 lg:flex-row lg:justify-center lg:gap-16 lg:px-10">
        <div className="w-[min(100%,260px)] lg:w-[min(100%,300px)]">
          <MediaSlot
            aspectClass="aspect-square"
            variant="on-light"
            label="캐릭터"
            hint="하트 일러스트"
            className="rounded-3xl border border-genie-purple/20"
          />
        </div>
        <h2 className="mt-8 text-3xl font-black text-genie-purple sm:text-4xl lg:mt-0 lg:text-5xl xl:text-6xl">
          소통의 마법
        </h2>
      </div>
    </section>
  );
}
