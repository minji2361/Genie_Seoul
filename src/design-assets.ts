/**
 * 디자인 에셋 / 폰트 메모
 * - 폰트 실제 로드: `src/app/layout.tsx` 의 `@fontsource/noto-sans-kr/*` (Google CDN 대신 번들)
 * - 아래 `FONT_GOOGLE_URL` 은 외부로 바꿀 때 참고용 URL입니다.
 */

/** 외부 CDN으로 전환 시 `layout.tsx` import 대신 `<link>` 에 사용 */
export const FONT_GOOGLE_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap";

/** 향후 실제 이미지로 교체할 때 `public/` 기준 경로 */
export const IMAGE_PATHS = {
  referenceMobileDesign: "/Genie_design_mobile.jpg",
  logoGenie: "/assets/logo-genie.png",
  heroGenieLamp: "/assets/hero-genie.png",
  introCommunityPhoto: "/assets/intro-community.jpg",
  storyMapIllustration: "/assets/story-map.png",
  genieDayMagnifier: "/assets/genie-day-magnifier.png",
  findMeetingClipboard: "/assets/find-meeting.png",
  geniusTelescope: "/assets/genius-telescope.png",
  communicationHeart: "/assets/communication-heart.png",
  footerBicycle: "/assets/footer-bicycle.png",
} as const;

export const FONT_FAMILY_NOTO_SANS_KR =
  '"Noto Sans KR", system-ui, -apple-system, sans-serif';
