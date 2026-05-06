import { HISTORY } from "@/data";

export default function HistorySection() {
  return (
    <section id="history" className="py-24 bg-[#111]">
      <div className="container-genie">

        {/* Header — horizontal on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="section-eyebrow text-[#FFE600]/35 mb-4">GENIE&apos;S FOOTSTEPS</p>
            <h2 className="font-display text-6xl lg:text-7xl text-white leading-none">
              지니의<br />
              <span className="text-[#FFE600]">발자취</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:text-right">
            2015년부터 시작된 지니의 여정.<br />
            중랑 청년들과 함께 만들어온 이야기입니다.
          </p>
        </div>

        {/* Timeline: 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10">
          {HISTORY.map((item, idx) => (
            <div
              key={item.period}
              className={`p-8 flex flex-col ${
                idx === 3 ? "bg-[#FFE600]" : idx % 2 === 0 ? "bg-[#111]" : "bg-[#1a1a1a]"
              }`}
            >
              {/* Period badge */}
              <div className={`inline-block self-start px-3 py-1 mb-6 ${idx === 3 ? "bg-[#111]" : "bg-[#FFE600]"}`}>
                <span className={`font-display text-sm tracking-wider ${idx === 3 ? "text-[#FFE600]" : "text-[#111]"}`}>
                  {item.period}
                </span>
              </div>

              {/* Events list */}
              <ul className="space-y-3 flex-1">
                {item.events.map((ev, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${idx === 3 ? "bg-[#111]" : "bg-[#FFE600]"}`} />
                    <span className={`text-sm leading-relaxed ${idx === 3 ? "text-[#111]/70" : "text-white/55"}`}>
                      {ev}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-[1px] bg-[#FFE600] flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-8">
          <div>
            <p className="font-display text-[#111] text-3xl lg:text-4xl">함께 멋진 일을 만들어요</p>
            <p className="text-[#111]/55 text-sm mt-1">지니와 함께 중랑의 청년 문화를 만들어가세요.</p>
          </div>
          <a href="#apply" className="btn-primary self-start md:self-auto text-base py-4 px-10">
            지금 참여하기 →
          </a>
        </div>
      </div>
    </section>
  );
}
