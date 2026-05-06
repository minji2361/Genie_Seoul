import type { Category, Program, HistoryItem } from "@/types";

export const CATEGORIES: Category[] = [
  {
    key: "geniering",
    nameKr: "지니어링",
    nameEn: "GENIERING",
    desc: "자기개발·성장·루틴·독서·토론으로 나를 단단하게 만드는 시간",
    tags: ["자기개발", "성장", "독서", "토론", "루틴"],
    color: "white",
    icon: "📚",
  },
  {
    key: "genius",
    nameKr: "지니어스",
    nameEn: "GENIE-US",
    desc: "문화행사·전시·공연·강연으로 감성을 채우는 시간",
    tags: ["문화행사", "전시", "공연", "강연"],
    color: "black",
    icon: "🎭",
  },
  {
    key: "genieday",
    nameKr: "지니데이",
    nameEn: "GENIE DAY",
    desc: "원데이클래스·체험형 프로그램으로 새로운 취미를 발견하는 하루",
    tags: ["원데이클래스", "체험", "워크숍"],
    color: "yellow",
    icon: "🎨",
  },
  {
    key: "genieclub",
    nameKr: "지니클럽",
    nameEn: "GENIE CLUB",
    desc: "동아리·소모임·번개모임으로 취향이 맞는 사람들과 연결되는 공간",
    tags: ["동아리", "소모임", "번개"],
    color: "white",
    icon: "👥",
  },
];

export const PROGRAMS: Program[] = [
  {
    id: "p1",
    title: "마음 전시회 2025",
    subtitle: "Before & After 갤러리 · 캐릭터링",
    category: "genius",
    categoryLabel: "지니어스",
    date: "2025.04.28 까지",
    status: "모집중",
    isFeatured: true,
    description:
      "고민이 있는 청년을 대상으로 '변화 전'과 '변화 후'의 모습을 그림으로 체험합니다. 인터뷰와 코칭을 통해 나의 문제를 해결하고, 변화한 모습을 직접 확인해보세요. 전문 일러스트레이터와 함께 나만의 캐릭터를 만들어 전시합니다.",
    capacity: 20,
    location: "중랑구 문화공간",
    price: "무료",
    tags: ["전시", "캐릭터링", "Before&After"],
  },
  {
    id: "p2",
    title: "중랑 독서 클럽",
    subtitle: "함께 읽고 나누는 시간",
    category: "geniering",
    categoryLabel: "지니어링",
    date: "매주 토요일 오전 11시",
    status: "모집중",
    description:
      "매주 한 권의 책을 함께 읽고 생각을 나눕니다. 독서가 어렵게 느껴지는 분들도 환영해요. 주제는 자기개발, 소설, 에세이 등 매달 투표로 선정합니다.",
    capacity: 10,
    location: "상봉동 카페 (장소 변동 가능)",
    price: "무료 (음료비 개인 부담)",
    tags: ["독서", "토론", "성장"],
  },
  {
    id: "p3",
    title: "드로잉 원데이클래스",
    subtitle: "초보도 OK! 감성 일러스트",
    category: "genieday",
    categoryLabel: "지니데이",
    date: "2025.04.26 (토) 14:00",
    status: "마감임박",
    description:
      "그림을 전혀 못 그려도 괜찮아요. 강사와 함께 나만의 감성 일러스트를 완성해보세요. 수채화 기법을 활용해 엽서 크기의 작품을 2점 완성합니다. 재료는 모두 제공됩니다.",
    capacity: 12,
    location: "망우동 스튜디오",
    price: "15,000원 (재료비 포함)",
    tags: ["드로잉", "일러스트", "원데이"],
  },
  {
    id: "p4",
    title: "중랑 북부 피크닉",
    subtitle: "가볍게 만나는 번개 모임",
    category: "genieclub",
    categoryLabel: "지니클럽",
    date: "매월 셋째 주 일요일",
    status: "모집중",
    description:
      "한강 북부, 용마산, 중랑천 주변에서 가볍게 만나는 피크닉 번개 모임입니다. 돗자리와 간식을 들고 나와 새로운 사람들과 대화를 나눠보세요.",
    capacity: 15,
    location: "중랑천 일대 (당일 공지)",
    price: "무료",
    tags: ["피크닉", "번개", "소모임"],
  },
  {
    id: "p5",
    title: "커리어 토크쇼",
    subtitle: "다양한 직업인과의 솔직한 대화",
    category: "geniering",
    categoryLabel: "지니어링",
    date: "2025.05.10 (토) 15:00",
    status: "모집중",
    description:
      "디자이너, 개발자, 크리에이터, 사회적기업가 등 다양한 분야에서 활동 중인 청년 직업인들을 초청해 솔직한 커리어 이야기를 나눕니다. Q&A 세션도 진행됩니다.",
    capacity: 30,
    location: "중랑구 청년공간 (예정)",
    price: "무료",
    tags: ["커리어", "토크쇼", "성장"],
  },
  {
    id: "p6",
    title: "도예 원데이클래스",
    subtitle: "손으로 빚는 나만의 컵",
    category: "genieday",
    categoryLabel: "지니데이",
    date: "2025.05.17 (토) 13:00",
    status: "모집중",
    description:
      "흙을 직접 빚어 나만의 컵을 만드는 도예 체험 클래스입니다. 초벌 후 유약 작업까지 강사가 도와드리며, 약 3주 후 완성품을 수령할 수 있습니다.",
    capacity: 8,
    location: "상봉동 도예공방",
    price: "25,000원 (재료비·소성비 포함)",
    tags: ["도예", "공예", "원데이"],
  },
];

export const HISTORY: HistoryItem[] = [
  {
    period: "2015–2017",
    events: [
      "대학교 팝업 이벤트 시작 (건국대, 고려대)",
      "서울 마이 어서스 in 고대 — 첫 번째 대규모 청년 행사",
      "지역 청년 취향 인터뷰 프로젝트 시작",
      "대학교 공동체 BRAIN SCHOOL 개최",
    ],
  },
  {
    period: "2016–2017",
    events: [
      "인산을 용무 데이터 전시회 개최",
      "청년 자신만의 연료 찾기 캠프",
      "나의 재능이 예술이다 매력적인 강연 시리즈",
      "지역 네트워크 70명 달성",
    ],
  },
  {
    period: "2023–2024",
    events: [
      "피스샾 팝업스토어 at 대학로 성황리 개최",
      "피스샾 팝업 팝업 행 in 마이션",
      "중랑 지역 커뮤니티 본격 확장",
      "마음 전시회 첫 개최 — 참가자 200명 돌파",
    ],
  },
  {
    period: "2025 & Beyond",
    events: [
      "지니 홈페이지 공식 런칭",
      "사회적 가치 연계 프로그램 확대",
      "서울 북부 청년 문화 생태계 구축 목표",
    ],
  },
];

export const REVIEWS = [
  {
    id: "r1",
    name: "김○○",
    age: 26,
    program: "마음 전시회",
    content:
      "내가 어떤 사람인지 막연하게만 알고 있었는데, 그림으로 시각화해보니 생각보다 많이 성장해 있더라고요. 좋은 경험이었습니다.",
    rating: 5,
  },
  {
    id: "r2",
    name: "이○○",
    age: 29,
    program: "중랑 독서 클럽",
    content:
      "혼자선 절대 못 읽을 것 같은 책을 함께 읽게 됐어요. 각자 다른 시각으로 해석한 걸 들을 때마다 새로운 관점이 생겨요.",
    rating: 5,
  },
  {
    id: "r3",
    name: "박○○",
    age: 24,
    program: "드로잉 원데이클래스",
    content:
      "미대도 아니고 그림이라곤 낙서밖에 못 그리는데, 진짜 엽서가 완성됐어요. 강사님이 너무 친절하셨고 분위기도 편했습니다.",
    rating: 5,
  },
  {
    id: "r4",
    name: "최○○",
    age: 31,
    program: "커리어 토크쇼",
    content:
      "이직 고민이 많았는데 현직자 분들의 솔직한 이야기를 들으니 방향이 조금 보이는 것 같았어요. 용기가 생겼습니다.",
    rating: 4,
  },
  {
    id: "r5",
    name: "정○○",
    age: 27,
    program: "중랑 북부 피크닉",
    content:
      "새로운 동네에 이사 왔는데 아는 사람이 없었어요. 피크닉 한 번에 중랑 친구가 세 명 생겼습니다. 지니 찐 추천!",
    rating: 5,
  },
  {
    id: "r6",
    name: "윤○○",
    age: 23,
    program: "도예 원데이클래스",
    content:
      "완성품 받았을 때 너무 뿌듯했어요. 직접 만든 컵으로 커피 마시니까 맛이 다른 것 같은 느낌? 재수강하고 싶습니다.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "지니 프로그램은 누구나 참여할 수 있나요?",
    a: "기본적으로 서울 북부(중랑구 및 인근) 지역 거주 만 19–39세 청년을 대상으로 합니다. 일부 프로그램은 지역 무관하게 참여 가능하니 공지를 확인해주세요.",
  },
  {
    q: "참가비가 있나요?",
    a: "대부분의 프로그램은 무료입니다. 원데이클래스 등 재료비가 발생하는 경우는 프로그램 상세 페이지에 명시되어 있습니다.",
  },
  {
    q: "신청 후 취소할 수 있나요?",
    a: "프로그램 시작 48시간 전까지 이메일로 취소 신청이 가능합니다. 유료 프로그램은 취소 시 전액 환불됩니다.",
  },
  {
    q: "프로그램을 제안하고 싶어요.",
    a: "신청 폼의 '하고 싶은 말' 란에 아이디어를 남겨주세요. 지니 팀이 검토 후 연락드립니다.",
  },
];

export const MARQUEE_ITEMS = [
  "GENIERING",
  "GENIE-US",
  "GENIE DAY",
  "GENIE CLUB",
  "중랑청년",
  "FIND YOUR GENIE",
  "서울북부",
  "청년문화",
];
