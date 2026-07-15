export const BASIC_FIELDS = [
    { name: 'name', label: '이름', placeholder: '' },
    { name: 'age', label: '나이', placeholder: '' },
    { name: 'gender', label: '성별', placeholder: '' },
    { name: 'mbti', label: 'MBTI', placeholder: '' },
    { name: 'region', label: '현재 거주 지역', placeholder: 'ex. 노원구 상계동' },
    { name: 'hobby', label: '취미', placeholder: '' },
    { name: 'dream', label: '목표나 꿈', placeholder: '' },
    { name: 'major_job', label: '전공/직업', placeholder: '' },
    { name: 'schedule', label: '일정/스케줄', placeholder: '' },
] as const;

export const INTERVIEW_QUESTIONS = [
    {
        name: 'q1_why_qa',
        label: '1. 왜 Q&A 해준다고 했는지',
        placeholder: '',
    },
    {
        name: 'q2_current_interest',
        label: '2. 요즘 나, 이거에 꽂혀있어요!',
        placeholder: '예: 걷기, 향수 모으기, 일기 쓰기, 음악, 아무것도 안 하기 등',
    },
    {
        name: 'q3_one_hour_wish',
        label: '3. 하루에 한 시간쯤 여유가 생긴다면, 뭘 해보고 싶나요?',
        placeholder: '',
    },
    {
        name: 'q4_what_tires',
        label: '4. 요즘 나를 지치게 하는 건 뭐예요?',
        placeholder: '',
    },
    {
        name: 'q5_energy_focus',
        label: '5. 요즘, 나는 어디에 가장 많은 에너지를 쓰고 있나요?',
        placeholder: 'ex. 일, 취업 준비, 관계, 나 자신, 아무것도 하고 있지 않음 등',
    },
    {
        name: 'q6_what_lacking',
        label: '6. 나는 요즘 어떤 것이 부족하다고 느끼나요?',
        placeholder: 'ex. 사람과의 연결, 창의적 활동, 쉬는 시간, 재미, 동기, 공간, 기회 등',
    },
    {
        name: 'q7_local_taste',
        label: '7. 서울 북부에서 사는 나의 "로컬 취향" 한 줄로 소개하기',
        placeholder: 'ex. "나는 우이천을 걸을 때 제일 힐링돼요." "노원역에 이상한 가게 많아서 재밌어요."',
    },
    {
        name: 'q8_ideal_day',
        label: "8. 지니가 '당신만을 위한 하루'를 만들어준다면, 그 하루는 어떤 날이길 바라시나요?",
        placeholder: 'ex. 무엇을 하고, 누구와 함께하며, 언제, 어디서, 어떤 감정을 느끼고 싶나요?',
    },
    {
        name: 'q9_needed_gathering',
        label: '9. 지금 이 동네에서 가장 필요하다고 느끼는 모임이나 활동은 무엇인가요?',
        placeholder: '자유롭게 적어주세요. 실현 불가능해도 괜찮아요.',
    },
    {
        name: 'q10_life_priority',
        label: '10. 인생의 우선 순위가 있다면?',
        placeholder: '예: 가족, 친구, 신념, 종교, 돈, 일, 사랑 등등',
    },
    {
        name: 'q11_one_wish',
        label: '11. 지니가 딱 하나의 소원을 이뤄준다면, 무엇을 해주면 좋을까요?',
        placeholder: '',
    },
    {
        name: 'q12_interview_thoughts',
        label: '12. 인터뷰 소감?',
        placeholder: '',
    },
] as const;

export type InterviewFormState = {
    name: string;
    age: string;
    gender: string;
    mbti: string;
    region: string;
    hobby: string;
    dream: string;
    major_job: string;
    schedule: string;
    q1_why_qa: string;
    q2_current_interest: string;
    q3_one_hour_wish: string;
    q4_what_tires: string;
    q5_energy_focus: string;
    q6_what_lacking: string;
    q7_local_taste: string;
    q8_ideal_day: string;
    q9_needed_gathering: string;
    q10_life_priority: string;
    q11_one_wish: string;
    q12_interview_thoughts: string;
};

export const INITIAL_INTERVIEW_FORM: InterviewFormState = {
    name: '',
    age: '',
    gender: '',
    mbti: '',
    region: '',
    hobby: '',
    dream: '',
    major_job: '',
    schedule: '',
    q1_why_qa: '',
    q2_current_interest: '',
    q3_one_hour_wish: '',
    q4_what_tires: '',
    q5_energy_focus: '',
    q6_what_lacking: '',
    q7_local_taste: '',
    q8_ideal_day: '',
    q9_needed_gathering: '',
    q10_life_priority: '',
    q11_one_wish: '',
    q12_interview_thoughts: '',
};

export const textAreaClass =
    'w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[80px]';
