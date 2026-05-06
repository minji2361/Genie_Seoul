# GENIE — 중랑 청년 문화 플랫폼

서울 북부 중랑구를 중심으로 하는 청년 커뮤니티 플랫폼 홈페이지입니다.
**Next.js 14 + TypeScript + Tailwind CSS** 기반으로 제작되었습니다.

---

## 🚀 빠른 시작

```bash
# 1. 압축 해제
unzip genie-site.zip && cd genie-site

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
# → http://localhost:3000

# 4. 프로덕션 빌드
npm run build
npm start
```

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx              루트 레이아웃 (폰트·메타데이터)
│   ├── page.tsx                메인 홈페이지
│   ├── not-found.tsx           404 페이지
│   └── program/
│       ├── page.tsx            전체 프로그램 목록 (서브페이지)
│       └── [id]/page.tsx       프로그램 상세 (동적 라우팅)
├── components/
│   ├── Navbar.tsx              상단 고정 네비게이션 (반응형)
│   ├── HeroSection.tsx         히어로 + 마키 + 통계
│   ├── IntroSection.tsx        지니 소개 + 핵심 가치
│   ├── CategoriesSection.tsx   4가지 카테고리 그리드
│   ├── ProgramsSection.tsx     프로그램 목록 (필터 탭)
│   ├── ReviewsSection.tsx      참여자 후기 그리드
│   ├── HistorySection.tsx      발자취 타임라인
│   ├── FaqSection.tsx          자주 묻는 질문 (아코디언)
│   ├── ApplySection.tsx        신청 폼
│   └── Footer.tsx              푸터
├── data/index.ts               모든 콘텐츠 데이터
├── types/index.ts              TypeScript 타입 정의
└── styles/globals.css          글로벌 CSS + Tailwind
```

---

## 📄 페이지 구성

| 경로 | 설명 |
|---|---|
| `/` | 메인 홈페이지 (Hero → 소개 → 카테고리 → 프로그램 → 후기 → 히스토리 → FAQ → 신청) |
| `/program` | 전체 프로그램 목록 (카테고리·상태 필터) |
| `/program/[id]` | 프로그램 상세 페이지 (동적 라우팅) |

---

## 🎨 디자인 시스템

- **Primary color**: `#FFE600` (지니 옐로우)
- **Black**: `#111111`
- **Font**: Black Han Sans (헤드라인) + Noto Sans KR (본문)
- **Max width**: 1280px
- **반응형**: 모바일(375px) → 태블릿(768px) → 데스크탑(1024px) → 와이드(1280px)

---

## ✏️ 콘텐츠 수정

`src/data/index.ts` 파일에서 모든 콘텐츠를 수정할 수 있습니다:

- `CATEGORIES` — 카테고리 4종
- `PROGRAMS` — 프로그램 목록
- `HISTORY` — 히스토리 타임라인
- `REVIEWS` — 참여자 후기
- `FAQS` — 자주 묻는 질문
- `MARQUEE_ITEMS` — 하단 마키 텍스트

---

## 🔗 추후 연동 예정

- [ ] Notion DB 연동 (프로그램 목록)
- [ ] Google Forms 연동 (신청 폼)
- [ ] 인스타그램 피드 임베드
- [ ] Google Analytics

---

© 2025 GENIE. ALL RIGHTS RESERVED.
