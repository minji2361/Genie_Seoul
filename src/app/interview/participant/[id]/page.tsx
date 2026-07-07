'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getGenieInterviewById, type GenieInterview } from '@/app/api/supabaseApi';
import { brandColor } from '@/lib/brandcolor';
import { CLUBS, EVENT_TYPES, MEETING_TIMES, ONEDAY_CLASSES } from '@/app/interview/surveyConfig';

const BASIC_FIELDS = [
    { name: 'name', label: '이름', type: 'text' },
    { name: 'age', label: '나이', type: 'text' },
    { name: 'gender', label: '성별', type: 'text' },
    { name: 'mbti', label: 'MBTI', type: 'text' },
    { name: 'region', label: '현재 거주 지역', type: 'text', fullWidth: true },
    { name: 'hobby', label: '취미', type: 'text', fullWidth: true },
    { name: 'dream', label: '목표나 꿈', type: 'text', fullWidth: true },
] as const;

const INTERVIEW_QUESTIONS = [
    { name: 'q1_why_qa', label: '1. 왜 Q&A 해준다고 했는지' },
    { name: 'q2_current_interest', label: '2. 요즘 나, 이거에 꽂혀있어요!' },
    { name: 'q3_one_hour_wish', label: '3. 하루에 한 시간쯤 여유가 생긴다면, 뭘 해보고 싶나요?' },
    { name: 'q4_what_tires', label: '4. 요즘 나를 지치게 하는 건 뭐예요?' },
    { name: 'q5_energy_focus', label: '5. 요즘, 나는 어디에 가장 많은 에너지를 쓰고 있나요?' },
    { name: 'q6_what_lacking', label: '6. 나는 요즘 어떤 것이 부족하다고 느끼나요?' },
    { name: 'q7_local_taste', label: '7. 서울 북부에서 사는 나의 "로컬 취향" 한 줄로 소개하기' },
    {
        name: 'q8_ideal_day',
        label: "8. 지니가 '당신만을 위한 하루'를 만들어준다면, 그 하루는 어떤 날이길 바라시나요?",
    },
    { name: 'q9_needed_gathering', label: '9. 지금 이 동네에서 가장 필요하다고 느끼는 모임이나 활동은 무엇인가요?' },
    { name: 'q10_life_priority', label: '10. 인생의 우선 순위가 있다면?' },
    { name: 'q11_one_wish', label: '11. 지니가 딱 하나의 소원을 이뤄준다면, 무엇을 해주면 좋을까요?' },
    { name: 'q12_interview_thoughts', label: '12. 인터뷰 소감?' },
] as const;

const readOnlyClass =
    'w-full border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none';

export default function InterviewDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [interview, setInterview] = useState<GenieInterview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSurvey, setShowSurvey] = useState(false);

    useEffect(() => {
        const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
        if (!id) return;

        const fetchInterview = async () => {
            const { data, error: fetchError } = await getGenieInterviewById(id);
            if (fetchError) {
                setError('인터뷰를 불러오지 못했습니다.');
            } else if (!data) {
                setError('인터뷰를 찾을 수 없습니다.');
            } else {
                setInterview(data);
            }
            setLoading(false);
        };

        fetchInterview();
    }, [params?.id]);

    if (loading) {
        return <main className="p-8 max-w-3xl mx-auto text-deepmoss">불러오는 중...</main>;
    }

    if (error || !interview) {
        return (
            <main className="p-8 max-w-3xl mx-auto text-deepmoss">
                <p className="mb-4">{error ?? '데이터가 없습니다.'}</p>
                <button
                    onClick={() => router.push('/interview')}
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: brandColor.deepmoss }}
                >
                    목록으로
                </button>
            </main>
        );
    }

    const eventTypes = interview.event_types ?? [];
    const meetingTimes = interview.meeting_times ?? [];
    const onedayClasses = interview.oneday_classes ?? [];
    const clubs = interview.clubs ?? [];
    const etcChecked = !!interview.event_types_etc;

    const renderCheckbox = (label: string, checked: boolean) => (
        <label key={label} className="flex items-center gap-2 cursor-not-allowed">
            <input type="checkbox" checked={checked} readOnly disabled className="w-4 h-4" />
            <span className={checked ? 'text-gray-800' : 'text-gray-400'}>{label}</span>
        </label>
    );

    return (
        <div className="p-6 max-w-2xl mx-auto min-h-screen">
            <button
                onClick={() => router.push('/interview')}
                className="mb-6 text-sm hover:underline"
                style={{ color: brandColor.orangeish }}
            >
                ← 인터뷰 목록
            </button>

            {!showSurvey && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니커스텀 인터뷰지</h3>
                    <p className="text-sm text-gray-500 mb-6">* 기본정보파악</p>

                    <div className="grid gap-5 mb-8 md:grid-cols-2">
                        {BASIC_FIELDS.map((field) => (
                            <div
                                key={field.name}
                                className={'fullWidth' in field && field.fullWidth ? 'md:col-span-2' : ''}
                            >
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    ✨ {field.label}
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    value={interview[field.name] || ''}
                                    readOnly
                                    tabIndex={-1}
                                    className={readOnlyClass}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 mb-8">
                        {INTERVIEW_QUESTIONS.map(({ name, label }) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {label}
                                </label>
                                <textarea
                                    id={name}
                                    name={name}
                                    rows={3}
                                    value={interview[name] || ''}
                                    readOnly
                                    tabIndex={-1}
                                    className={`${readOnlyClass} resize-none min-h-[80px]`}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowSurvey(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md text-sm font-semibold"
                    >
                        다음
                    </button>
                </div>
            )}

            {showSurvey && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니커스텀 인터뷰지</h3>
                    <p className="text-sm text-gray-500 mb-6">* 관심사 조사</p>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            다음 중 가장 관심 있는 행사 유형은?{' '}
                            <span className="text-gray-400">(중복 선택 가능)</span>
                        </p>
                        <div className="space-y-2">
                            {EVENT_TYPES.map((opt) => renderCheckbox(opt, eventTypes.includes(opt)))}
                            <label className="flex items-center gap-2 cursor-not-allowed">
                                <input type="checkbox" checked={etcChecked} readOnly disabled className="w-4 h-4" />
                                <span className="whitespace-nowrap">기타:</span>
                                <input
                                    type="text"
                                    value={interview.event_types_etc || ''}
                                    readOnly
                                    tabIndex={-1}
                                    className="flex-1 border border-gray-300 rounded-md p-1 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            참여하고 싶은 모임 시간대는 언제인가요?
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {MEETING_TIMES.map((opt) => renderCheckbox(opt, meetingTimes.includes(opt)))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            제공받고 싶은 원데이클래스 정보는?
                        </p>
                        <div className="space-y-2">
                            {ONEDAY_CLASSES.map((opt) => renderCheckbox(opt, onedayClasses.includes(opt)))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">참여하고 싶은 동아리는?</p>
                        <div className="space-y-2">{CLUBS.map((opt) => renderCheckbox(opt, clubs.includes(opt)))}</div>
                    </div>

                    <button
                        onClick={() => setShowSurvey(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-full py-2 rounded-md text-sm font-semibold"
                    >
                        이전
                    </button>
                </div>
            )}
        </div>
    );
}
