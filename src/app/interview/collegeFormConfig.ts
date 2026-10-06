export type InterviewType = 'adult' | 'college';

/** DB 저장값: 'legacy' 는 직장인/대학생 구분 이전에 작성된 구 인터뷰지 */
export type StoredInterviewType = InterviewType | 'legacy';

export const STORED_TYPE_LABEL: Record<StoredInterviewType, string> = {
    adult: '성인',
    college: '대학생',
    legacy: '기타(구 인터뷰지)',
};

export const INTERVIEW_TYPE_LABEL: Record<InterviewType, string> = {
    adult: '직장인/성인',
    college: '대학생',
};

// 대학생 인터뷰 기본정보 (int_interviews 의 기존 컬럼에 저장 → 통계 공통 집계 가능)
export const COLLEGE_BASIC_FIELDS = [
    { name: 'name', label: '성함', placeholder: '' },
    { name: 'age', label: '나이', placeholder: '' },
    { name: 'gender', label: '성별', placeholder: '' },
    { name: 'mbti', label: 'MBTI', placeholder: '' },
    { name: 'major_job', label: '학과(학년)', placeholder: '' },
    { name: 'region', label: '주 활동 동네', placeholder: '학교 근처, 자취방 근처 등' },
] as const;

export type CollegeField = {
    name: string;
    label: string;
    kind: 'textarea' | 'radio' | 'checkbox';
    options?: readonly string[];
    /** 마지막 옵션이 '기타'일 때 직접 입력 허용 (`${name}_etc` 에 저장) */
    etc?: boolean;
    hint?: string;
    placeholder?: string;
};

export type CollegeSection = {
    title: string;
    fields: readonly CollegeField[];
    /** 진행자 안내 문구 (입력란 없음) */
    note?: string;
};

export const COLLEGE_SECTIONS: readonly CollegeSection[] = [
    {
        title: '1. 기본 정보',
        fields: [
            {
                name: 'housing',
                label: '주거 형태',
                kind: 'radio',
                options: ['자취/기숙사', '부모님 집 통학', '기타'],
                etc: true,
            },
            {
                name: 'free_time_style',
                label: '평소 공강/주말 보내는 방식',
                kind: 'radio',
                options: ['주로 혼자', '동기/친구/연인', '알바/과제/스펙'],
            },
        ],
    },
    {
        title: '2. 라이프스타일 & 주거 맥락',
        fields: [
            {
                name: 'living_life',
                label: '자취/통학 생활 어떠세요?',
                kind: 'textarea',
                hint: '(자취) 혼자 생활하면서 외롭거나 심심해서 뭐라도 하고 싶을 때가 있는지? / (통학) 왕복 이동시간 피로도 때문에 집에 가면 보통 뭐 하면서 쉬는지?',
            },
            {
                name: 'campus_life',
                label: '요즘 캠퍼스 라이프/일상이 어떠신가요?',
                kind: 'radio',
                options: ['시험/과제/알바로 바쁨', '일상이 단조롭고 심심함', '기타'],
                etc: true,
            },
        ],
    },
    {
        title: '3. 인간관계 & 모임 피로도',
        fields: [
            {
                name: 'group_experience',
                label: '과모임, 학과 동아리, 외부 소모임 해보신 적 있나요?',
                kind: 'textarea',
                hint: '참여해 보셨다면, 혹시 불편했거나 부담스러웠던 경험이 있었나요? (예: 술자리/뒷풀이 강요, 과한 친목/파벌, 사적인 질문, 지속적인 참여 압박 등)',
            },
            {
                name: 'distance_preference',
                label: '새로운 사람을 만난다면 어느 정도의 거리감이 편하신가요?',
                kind: 'radio',
                options: [
                    'A) 클린 활동형: 사적인 공유 없이 취미/활동만 딱 하고 깔끔하게 헤어지는 관계',
                    'B) 잔잔한 소통형: 활동하면서 소소하게 취향/관심사 대화 정도 나누는 관계',
                    'C) 깊은 친목형: 사적 고민도 나누고 뒷풀이도 자주 가지는 관계',
                ],
            },
        ],
    },
    {
        title: '4. 취미 경험 & 힐링 성향',
        fields: [
            {
                name: 'hobby_dropout',
                label: '시도해 봤다가 그만두었거나, 마음만 먹고 못 해본 취미가 있나요? 그 이유는?',
                kind: 'textarea',
                hint: '(예: 혼자 하니 게을러짐, 같이 할 사람이 없음, 대학생 입장에서 비용 부담 등)',
            },
            {
                name: 'healing_style',
                label: '시험기간이나 과제로 기가 팍 깎였을 때, 나를 진짜 힐링시켜 주는 건?',
                kind: 'checkbox',
                options: [
                    '방에서 혼자 OTT/유튜브 보기',
                    '밖에서 땀 흘리며 운동/액티비티',
                    '마음 맞는 1~2명과 맛있는 거 먹으며 수다 떨기',
                    '뜨개질/다꾸/드로잉 등 혼자 사부작거리기',
                ],
            },
        ],
    },
    {
        title: '5. 니즈 정의 & 마무리',
        note:
            '[진행자 멘트] "OO님은 취미를 안 하고 싶었던 게 아니라, [예: 사적 부담이 있는 과모임은 싫지만, 혼자 할 때의 게으름을 잡아줄 적당한 모임]이 필요하셨네요! 대학생 주머니 사정에 부담 없으면서 이런 라이프스타일에 맞춘 취미 모임/플랫폼이 있다면 참여해 볼 의향이 있으신가요?"',
        fields: [
            {
                name: 'needs_summary',
                label: '니즈 정리 (OO님에게 필요한 모임)',
                kind: 'textarea',
                placeholder: '예: 사적 부담이 있는 과모임은 싫지만, 혼자 할 때의 게으름을 잡아줄 적당한 모임',
            },
            {
                name: 'participation_intent',
                label: '참여 의향 및 응답',
                kind: 'textarea',
            },
        ],
    },
];

export type CollegeAnswers = Record<string, string | string[]>;

/** 읽기용: 답변을 사람이 읽는 문자열로 변환 */
export function formatCollegeAnswer(field: CollegeField, answers: CollegeAnswers): string {
    const value = answers[field.name];
    const etc = typeof answers[`${field.name}_etc`] === 'string' ? (answers[`${field.name}_etc`] as string).trim() : '';
    const items = Array.isArray(value) ? [...value] : value ? [value] : [];
    const text = items
        .map((item) => (field.etc && item === '기타' && etc ? `기타: ${etc}` : item))
        .join(', ');
    return text || '-';
}
