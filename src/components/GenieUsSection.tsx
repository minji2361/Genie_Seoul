import MediaSlot from "@/components/MediaSlot";

const ITEMS = [
  {
    title: "사무실",
    text: "기획부터 소통까지, 지니어스의 일상이 모이는 공간입니다. 아이디어가 현실이 되는 곳을 소개합니다.",
  },
  {
    title: "청소년",
    text: "함께 성장하는 이웃과 프로그램을 연결합니다. 배움과 놀이가 공존하는 지니어스의 이야기입니다.",
  },
  {
    title: "전시회",
    text: "감각을 깨우는 전시와 행사를 기획합니다. 작품과 사람 사이를 잇는 경험을 전합니다.",
  },
];

export default function GenieUsSection() {
  return (
    <section id="genius-recruit" className="bg-white py-14 sm:py-20 lg:py-24 scroll-mt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center text-xl font-bold leading-snug text-genie-purple sm:text-2xl lg:text-3xl">
          우리가 원했던
          <br />
          &apos;지니어스&apos;
        </h2>

        <ul className="mt-12 flex flex-col gap-5 sm:gap-6 lg:mx-auto lg:mt-14 lg:max-w-4xl">
          {ITEMS.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 rounded-2xl border border-genie-lavender bg-white p-4 shadow-[0_6px_20px_rgba(123,75,255,0.06)] sm:p-5 lg:gap-6"
            >
              <div className="w-[100px] shrink-0 sm:w-[120px] lg:w-[140px]">
                <MediaSlot
                  aspectClass="aspect-square"
                  variant="on-light"
                  label="썸네일"
                  hint="정사각"
                  className="rounded-xl !py-4"
                />
              </div>
              <div className="min-w-0 flex-1 py-1">
                <h3 className="text-base font-bold text-genie-purple sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-[#111] sm:text-base">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
