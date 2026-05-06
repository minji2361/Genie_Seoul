export default function IntroSection() {
  return (
    <section className="py-24 bg-[#111] overflow-hidden">
      <div className="container-genie">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-center">

          {/* Left: copy */}
          <div>
            <p className="section-eyebrow text-[#FFE600]/35 mb-4">WHO WE ARE</p>
            <h2 className="font-display text-6xl lg:text-7xl text-white leading-none mb-8">
              지니는<br />
              <span className="text-[#FFE600]">무엇인가요?</span>
            </h2>
            <div className="space-y-5 text-white/60 text-sm leading-relaxed max-w-md">
              <p>
                지니는 서울 북부 중랑구를 중심으로 활동하는 <strong className="text-white/90 font-bold">청년 문화 커뮤니티 플랫폼</strong>입니다.
                2015년 대학교 팝업 이벤트로 시작해 10년간 청년들의 취향과 성장을 함께해 왔습니다.
              </p>
              <p>
                단순한 모임이 아닙니다. 지니는 개인의 잠재력을 발굴하고 재능을 활용할 수 있도록 돕는 단체입니다.
                청년은 그 자체로 이미 빛나고 있습니다.
              </p>
              <p>
                지니와 함께하면 내 안의 재능, 감성, 경험을 연결할 수 있는 모든 것을 얻을 수 있습니다.
              </p>
            </div>
          </div>

          {/* Right: value cards */}
          <div className="grid grid-cols-2 gap-[2px] bg-white/10">
            {[
              { icon: "🎯", title: "취향 기반 매칭",   desc: "관심사와 라이프스타일을 분석해 딱 맞는 프로그램을 추천합니다." },
              { icon: "🤝", title: "커뮤니티 연결",    desc: "비슷한 취향의 중랑 청년들과 자연스럽게 연결됩니다." },
              { icon: "🌱", title: "성장 지원",         desc: "참여에서 끝나지 않고 지속적인 성장을 함께 설계합니다." },
              { icon: "🗺️", title: "지역 기반 활동",   desc: "중랑구와 서울 북부의 공간, 문화, 사람을 연결합니다." },
            ].map((v) => (
              <div key={v.title} className="bg-[#1a1a1a] p-7">
                <span className="text-2xl mb-4 block">{v.icon}</span>
                <h3 className="font-bold text-white text-base mb-2">{v.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
