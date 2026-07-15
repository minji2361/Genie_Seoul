export const EVENT_TYPES = [
    '공연 / 전시',
    '플리마켓 / 셀러 행사',
    '커뮤니티 모임, 취미 체험 (원데이클래스)',
    '취업/창업 관련 프로그램',
] as const;

export const MEETING_TIMES = [
    '평일 오전',
    '평일 낮',
    '평일 저녁',
    '주말 오전',
    '주말 낮',
    '주말 저녁',
    '무관함',
] as const;

export const ONEDAY_CLASSES = ['오일파스텔', '커스텀향수만들기', '도예클래스', '사주 명리학', '퍼스널컬러'] as const;

export const CLUBS = ['배드민턴', '족구', '풋살', '독서모임', '런닝', '맛집탐방'] as const;

export type SurveyArrayKey = 'event_types' | 'meeting_times' | 'oneday_classes' | 'clubs';

export type SurveyState = {
    event_types: string[];
    event_types_etc: string;
    meeting_times: string[];
    oneday_classes: string[];
    oneday_classes_etc: string;
    clubs: string[];
    clubs_etc: string;
};

export const INITIAL_SURVEY: SurveyState = {
    event_types: [],
    event_types_etc: '',
    meeting_times: [],
    oneday_classes: [],
    oneday_classes_etc: '',
    clubs: [],
    clubs_etc: '',
};
