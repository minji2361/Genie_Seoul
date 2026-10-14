import type { CollegeSection } from '@/app/interview/collegeFormConfig';

// 통합 인터뷰지(1:1 심층 라이프스타일 인터뷰) 기본정보 (int_interviews 의 기존 컬럼에 저장 → 통계 공통 집계 가능)
// '구분'(occupation_type)은 answers 에 저장되고, 구분 값에 따라 major_job 라벨이 바뀝니다.
export const OCCUPATION_TYPES = ['대학생', '직장인/기타'] as const;

export const OCCUPATION_TYPE_KEY = 'occupation_type';

export const MAJOR_JOB_LABEL: Record<(typeof OCCUPATION_TYPES)[number], string> = {
    대학생: '학과(학년)',
    '직장인/기타': '직업(직종)',
};

export const MAJOR_JOB_DEFAULT_LABEL = '직업(직종) / 학과(학년)';

// 드롭다운 선택지 (통계의 나이대/성별/MBTI 집계가 읽는 형식과 맞춤)
export const AGE_OPTIONS = Array.from({ length: 46 }, (_, i) => `${i + 15}세`);
export const GENDER_OPTIONS = ['여성', '남성', '기타'] as const;
export const MBTI_OPTIONS = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
] as const;

export const BASIC_SELECT_OPTIONS: Record<string, readonly string[]> = {
    age: AGE_OPTIONS,
    gender: GENDER_OPTIONS,
    mbti: MBTI_OPTIONS,
};

export const LIFESTYLE_BASIC_FIELDS = [
    { name: 'name', label: '성함', placeholder: '' },
    { name: 'age', label: '나이', placeholder: '' },
    { name: 'gender', label: '성별', placeholder: '' },
    { name: 'mbti', label: 'MBTI', placeholder: '' },
    { name: 'major_job', label: MAJOR_JOB_DEFAULT_LABEL, placeholder: '' },
    { name: 'region', label: '주 활동 동네', placeholder: '직장·학교 근처, 거주지 근처 등' },
] as const;

export const LIFESTYLE_SECTIONS: readonly CollegeSection[] = [
    {
        title: '☕️ 1:1 심층 라이프스타일 인터뷰지',
        note: '• 진행 팁: 질문을 순서대로 딱딱하게 묻기보다, 자연스러운 대화 속에서 상대방의 이야기를 경청하며 꼬리 질문을 던져주세요.',
        fields: [],
    },
    {
        title: '[오프닝] 라포 형성 (약 3분)',
        note: '"안녕하세요 OO님! 저번에 길거리에서 뵙고 이렇게 따로 와주셔서 다시 한번 감사드려요. 오늘 인터뷰는 딱딱한 조사 아니구, 요즘 어떻게 지내시는지 편하게 수다 떨듯이 얘기 나누는 자리니까 마음 편히 편하게 말씀해 주세요. 30분 정도면 끝나요!"',
        fields: [],
    },
    {
        title: '[PART 1] 현재 일상 & 스케줄 파악 (약 7분)',
        note: '목적: 대상자의 평소 생활 반경과 시간 활용 패턴(스케줄) 파악',
        fields: [
            {
                name: 'q1_weekday_routine',
                label: 'Q1. 평일 루틴 & 스케줄',
                kind: 'textarea',
                hint: '• "요즘 평일에는 하루 일과가 보통 어떻게 되세요? 몇 시쯤 일어나서 주로 어디서 시간을 보내시는지 궁금해요."\n• (대학생이면) "공강이나 수업 끝난 저녁 시간엔 주로 뭐 하세요?"\n• (직장인/일반이면) "퇴근 후나 주중에 주로 움직이는 동네나 활동 반경이 있으신가요?"',
            },
            {
                name: 'q2_weekend_schedule',
                label: 'Q2. 주말 및 여가 스케줄',
                kind: 'textarea',
                hint: '• "주말이나 쉬는 날에는 스케줄을 꽉 채워서 바쁘게 보내시는 편인가요, 아니면 집에서 푹 쉬면서 비워두시는 편인가요?"',
            },
        ],
    },
    {
        title: '[PART 2] 관심사 & 최근 고민 파악 (약 8분)',
        note: '목적: 최근 눈에 띄는 관심사와 일상 속에서 느끼는 답답함/고민(니즈) 발굴',
        fields: [
            {
                name: 'q3_interest',
                label: 'Q3. 요즘 관심사',
                kind: 'textarea',
                hint: '• "요즘 일상에서 가장 관심사나 눈에 띄는 거 있으세요? (예: 맛집, 팝업스토어, 운동, 유튜브, 특정 콘텐츠 등)"\n• "평소에 \'아 이거 한번 제대로 해보고 싶다\' 하고 호기심 생겼던 활동이 혹시 있으신가요?"',
            },
            {
                name: 'q4_concern',
                label: 'Q4. 최근 고민 및 일상 만족도',
                kind: 'textarea',
                hint: '• "반대로 요즘 생활하면서 은근히 고민되는 부분이나, \'아 요즘 좀 단조롭다, 심심하다\' 하는 답답함은 없으신가요?"\n• "만약 지금 일상에서 딱 한 가지를 바꿀 수 있다면 어떤 걸 바꾸고 싶으세요?"',
            },
        ],
    },
    {
        title: '[PART 3] 성향 및 인간관계 거리감 파악 (약 7분)',
        note: '목적: 에너지 충전 방식, 성향, 그리고 사람을 만날 때 선호하는 거리감 파악',
        fields: [
            {
                name: 'q5_energy',
                label: 'Q5. 에너지 충전 방식 (성향)',
                kind: 'textarea',
                hint: '• "평소 성향은 에너지를 어떻게 채우시는 편이세요? 혼자만의 시간을 가져야 충전되는 스타일이신가요, 아니면 사람들을 만나야 에너지가 나시는 편이세요?"\n• "체력이나 멘탈이 방전됐을 때 나만의 확실한 충전(힐링) 방법이 있으신가요?"',
            },
            {
                name: 'q6_relationship',
                label: 'Q6. 인간관계 및 모임 스타일',
                kind: 'textarea',
                hint: '• "혹시 주변에 새로운 사람들을 만나거나 모임(동아리, 소모임 등)에 나간 적이 있으신가요?"\n• "새로운 모임에 나갈 때, 어떤 분위기나 거리감이 가장 편하게 느껴지세요? (예: 사적 얘기 없이 활동만 깔끔하게 하기 vs 가볍게 취향 공유하기 등)"',
            },
        ],
    },
    {
        title: '[PART 4] 마무리 및 데이터 누적 & 보상 안내 (약 5분)',
        note: '목적: 정량 성향 체크(애니어그램) 유도 및 1:1 대면 코칭 혜택 안내',
        fields: [],
    },
];
