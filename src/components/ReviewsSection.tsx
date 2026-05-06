import { REVIEWS } from "@/data";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < count ? "text-[#FFE600]" : "text-[#ddd]"}`}
          style={{ fontFamily: "serif" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="container-genie">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4">
          <div>
            <p className="section-eyebrow mb-4">PARTICIPANT REVIEWS</p>
            <h2 className="font-display text-6xl lg:text-7xl text-[#111] leading-none">
              참여자 후기
            </h2>
          </div>
          <div className="flex items-end gap-6">
            <div className="text-right">
              <div className="font-display text-5xl text-[#111]">4.9</div>
              <Stars count={5} />
              <p className="text-xs text-[#999] mt-1">{REVIEWS.length}개 후기 평균</p>
            </div>
          </div>
        </div>

        {/* Review grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#111]">
          {REVIEWS.map((review, idx) => {
            const isYellow = idx === 0; // first card featured
            return (
              <div
                key={review.id}
                className={`p-7 flex flex-col gap-5 ${
                  isYellow ? "bg-[#FFE600]" : idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                }`}
              >
                {/* Top: stars + program tag */}
                <div className="flex items-center justify-between">
                  <Stars count={review.rating} />
                  <span
                    className={`text-[10px] font-bold tracking-wider px-2.5 py-1 ${
                      isYellow ? "bg-[#111] text-[#FFE600]" : "bg-[#111] text-[#FFE600]"
                    }`}
                  >
                    {review.program}
                  </span>
                </div>

                {/* Quote */}
                <p
                  className={`text-sm leading-relaxed flex-1 ${
                    isYellow ? "text-[#111]/75" : "text-[#444]"
                  }`}
                >
                  &ldquo;{review.content}&rdquo;
                </p>

                {/* Author */}
                <div
                  className={`flex items-center gap-3 pt-4 border-t ${
                    isYellow ? "border-[#111]/15" : "border-[#eee]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display text-sm ${
                      isYellow ? "bg-[#111] text-[#FFE600]" : "bg-[#FFE600] text-[#111]"
                    }`}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <p
                      className={`font-bold text-sm ${
                        isYellow ? "text-[#111]" : "text-[#111]"
                      }`}
                    >
                      {review.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isYellow ? "text-[#111]/50" : "text-[#999]"
                      }`}
                    >
                      만 {review.age}세
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stat strip */}
        <div className="mt-[2px] grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[#111]">
          {[
            { num: "98%",  label: "재참여 의향" },
            { num: "96%",  label: "지인 추천 의향" },
            { num: "500+", label: "누적 참여자" },
            { num: "4.9",  label: "평균 만족도" },
          ].map((s) => (
            <div key={s.label} className="bg-[#F5F5F5] p-6 text-center">
              <div className="font-display text-4xl text-[#111] mb-1">{s.num}</div>
              <div className="text-xs text-[#999] font-bold tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
