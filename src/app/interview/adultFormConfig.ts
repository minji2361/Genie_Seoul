import type { CollegeSection } from '@/app/interview/collegeFormConfig';
import { AGE_OPTIONS, GENDER_OPTIONS, MBTI_OPTIONS } from '@/app/interview/collegeFormConfig';

// 직장인/성인 인터뷰 기본정보 (int_interviews 의 기존 컬럼에 저장 → 통계 공통 집계 가능)
export const ADULT_BASIC_FIELDS = [
    { name: 'name', label: '성함', placeholder: '', kind: undefined, options: undefined },
    { name: 'age', label: '나이', placeholder: '', kind: 'select', options: AGE_OPTIONS },
    { name: 'gender', label: '성별', placeholder: '', kind: 'select', options: GENDER_OPTIONS },
    { name: 'mbti', label: 'MBTI', placeholder: '', kind: 'select', options: MBTI_OPTIONS },
    { name: 'major_job', label: '직업(직종)', placeholder: '', kind: undefined, options: undefined },
    { name: 'region', label: '주 활동 동네', placeholder: '직장 근처, 거주지 근처 등', kind: undefined, options: undefined },
] as const;

export const ADULT_SECTIONS: readonly CollegeSection[] = [
    {
        title: '1. 기본 정보',
        fields: [
            {
                name: 'housing',
                label: '주거 형태',
                kind: 'radio',
                options: ['1인 가구(자취/독립)', '가족과 거주', '기타'],
                etc: true,
            },
            {
                name: 'free_time_style',
                label: '퇴근 후 / 주말 보내는 방식',
                kind: 'radio',
                options: ['주로 혼자', '가족/연인/친구', '자기계발/운동'],
            },
        ],
    },
    {
        title: '2. 라이프스타일 & 환경 맥락',
        fields: [
            {
                name: 'rest_style',
                label: '퇴근 후나 주말에 보통 어떻게 쉬시나요?',
                kind: 'textarea',
                hint: '(1인 가구) 혼자 보내는 시간이 많아 외롭거나 일상이 단조롭다고 느낄 때가 있는지? / (가족 거주) 집 외에 나만의 독립된 공간이나 혼자만의 시간이 필요하다고 느낄 때가 있는지?',
            },
            {
                name: 'life_satisfaction',
                label: '요즘 일상 만족도는 어떠신가요?',
                kind: 'radio',
                options: ['일-집 반복으로 매너리즘/노잼시기', '일과 삶의 균형(워라밸) 찾는 중', '바쁘고 여유 없음'],
            },
        ],
    },
    {
        title: '3. 인간관계 & 모임 피로도',
        fields: [
            {
                name: 'group_experience',
                label: '직장 외 동호회, 당근, 소모임, 학원 등을 참여해 본 적이 있으신가요?',
                kind: 'textarea',
                hint: "참여해 보셨다면, 반대로 '아 나랑 안 맞는다' 하고 그만두게 된 이유가 있으셨나요? (예: 나이대/성향 불일치, 사생활 침해, 기싸움/친목 파벌, 비효율적인 시간 소모 등)",
            },
            {
                name: 'distance_preference',
                label: '퇴근 후/주말 모임에서 선호하는 인간관계 거리감은?',
                kind: 'radio',
                options: [
                    'A) 클린 활동형: 회사/사생활 얘기 없이 오직 취미 활동만 깔끔하게 즐기는 관계',
                    'B) 잔잔한 소통형: 취향이나 일상적인 대화 정도 가볍게 나누는 관계',
                    'C) 소셜 네트워크형: 사적으로도 친해지고 네트워크를 형성하는 관계',
                ],
            },
        ],
    },
    {
        title: '4. 취미 경험 & 힐링 성향',
        fields: [
            {
                name: 'hobby_dropout',
                label: '최근 시도하려다 포기했거나 지속하지 못한 취미가 있나요? 그 이유는?',
                kind: 'textarea',
                hint: '(예: 퇴근 후 의지력 부족, 혼자 하려니 안 함, 정기적 참여 부담, 비용 대비 효과 부족 등)',
            },
            {
                name: 'healing_style',
                label: '일/인간관계로 에너지가 완전히 방전됐을 때, 나를 진짜 힐링시켜 주는 건?',
                kind: 'checkbox',
                options: [
                    '혼자 집에서 완전히 쉬기 (OTT, 독서, 잔잔한 휴식)',
                    '러닝/헬스/스포츠 등 액티비티로 스트레스 풀기',
                    '마음 맞는 소수와 맛있는 음식 먹으며 대화하기',
                    '공방/원데이 클래스 등 무언가에 몰입하기',
                ],
            },
        ],
    },
    {
        title: '5. 니즈 정의 & 마무리',
        note:
            '[진행자 멘트] "OO님은 취미가 없으셨던 게 아니라, [예: 퇴근 후 피곤해서 의지는 부족하지만, 회사 연장선 같은 부담스러운 친목 모임은 피하고 싶었던 성향]이시네요! OO님의 주거/직장 라이프스타일과 원하는 거리감에 맞춘 취미 추천·연결 플랫폼이 있다면 이용해 볼 의향이 있으신가요?"',
        fields: [
            {
                name: 'needs_summary',
                label: '니즈 정리 (OO님의 성향)',
                kind: 'textarea',
                placeholder: '예: 퇴근 후 피곤해서 의지는 부족하지만, 회사 연장선 같은 부담스러운 친목 모임은 피하고 싶었던 성향',
            },
            {
                name: 'participation_intent',
                label: '이용 의향 및 응답',
                kind: 'textarea',
            },
        ],
    },
];
