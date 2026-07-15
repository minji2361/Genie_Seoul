'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    addGenieInterview,
    updateGenieInterview,
    type GenieInterview,
} from '@/app/api/supabaseApi';
import { supabase } from '@/app/lib/supabase';
import {
    BASIC_FIELDS,
    INITIAL_INTERVIEW_FORM,
    INTERVIEW_QUESTIONS,
    textAreaClass,
    type InterviewFormState,
} from '@/app/interview/interviewFormConfig';
import {
    CLUBS,
    EVENT_TYPES,
    INITIAL_SURVEY,
    MEETING_TIMES,
    ONEDAY_CLASSES,
    type SurveyArrayKey,
    type SurveyState,
} from '@/app/interview/surveyConfig';

type InterviewFormProps = {
    mode: 'create' | 'edit';
    interviewId?: string;
    initialInterview?: GenieInterview;
};

function toFormState(interview?: GenieInterview): InterviewFormState {
    if (!interview) return INITIAL_INTERVIEW_FORM;
    return {
        name: interview.name ?? '',
        age: interview.age ?? '',
        gender: interview.gender ?? '',
        mbti: interview.mbti ?? '',
        region: interview.region ?? '',
        hobby: interview.hobby ?? '',
        dream: interview.dream ?? '',
        major_job: interview.major_job ?? '',
        schedule: interview.schedule ?? '',
        q1_why_qa: interview.q1_why_qa ?? '',
        q2_current_interest: interview.q2_current_interest ?? '',
        q3_one_hour_wish: interview.q3_one_hour_wish ?? '',
        q4_what_tires: interview.q4_what_tires ?? '',
        q5_energy_focus: interview.q5_energy_focus ?? '',
        q6_what_lacking: interview.q6_what_lacking ?? '',
        q7_local_taste: interview.q7_local_taste ?? '',
        q8_ideal_day: interview.q8_ideal_day ?? '',
        q9_needed_gathering: interview.q9_needed_gathering ?? '',
        q10_life_priority: interview.q10_life_priority ?? '',
        q11_one_wish: interview.q11_one_wish ?? '',
        q12_interview_thoughts: interview.q12_interview_thoughts ?? '',
    };
}

function toSurveyState(interview?: GenieInterview): SurveyState {
    if (!interview) return INITIAL_SURVEY;
    return {
        event_types: interview.event_types ?? [],
        event_types_etc: interview.event_types_etc ?? '',
        meeting_times: interview.meeting_times ?? [],
        oneday_classes: interview.oneday_classes ?? [],
        oneday_classes_etc: interview.oneday_classes_etc ?? '',
        clubs: interview.clubs ?? [],
        clubs_etc: interview.clubs_etc ?? '',
    };
}

export function InterviewForm({ mode, interviewId, initialInterview }: InterviewFormProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<InterviewFormState>(() => toFormState(initialInterview));
    const [survey, setSurvey] = useState<SurveyState>(() => toSurveyState(initialInterview));
    const [eventEtcChecked, setEventEtcChecked] = useState(!!initialInterview?.event_types_etc);
    const [onedayEtcChecked, setOnedayEtcChecked] = useState(!!initialInterview?.oneday_classes_etc);
    const [clubsEtcChecked, setClubsEtcChecked] = useState(!!initialInterview?.clubs_etc);

    const toggleSurveyItem = (key: SurveyArrayKey, value: string) => {
        setSurvey((prev) => {
            const list = prev[key];
            const exists = list.includes(value);
            return {
                ...prev,
                [key]: exists ? list.filter((v) => v !== value) : [...list, value],
            };
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateBasicInfo = () => {
        const requiredBasic = ['name', 'age', 'gender', 'mbti', 'region'] as const;
        const missingBasic = requiredBasic.some((key) => !form[key].trim());

        if (missingBasic) {
            alert('기본정보(이름, 나이, 성별, MBTI, 거주 지역)를 모두 작성해주세요.');
            return false;
        }

        return true;
    };

    const goToSurvey = () => {
        if (!validateBasicInfo()) return;
        setStep(2);
    };

    const buildPayload = () => ({
        ...form,
        event_types: survey.event_types,
        event_types_etc: survey.event_types_etc.trim(),
        meeting_times: survey.meeting_times,
        oneday_classes: survey.oneday_classes,
        oneday_classes_etc: survey.oneday_classes_etc.trim(),
        clubs: survey.clubs,
        clubs_etc: survey.clubs_etc.trim(),
        signatureurl: initialInterview?.signatureurl ?? '',
    });

    const handleSubmit = async () => {
        if (!validateBasicInfo()) return;

        setLoading(true);

        if (mode === 'edit') {
            if (!interviewId) {
                setLoading(false);
                alert('수정할 인터뷰를 찾을 수 없습니다.');
                return;
            }

            const { error } = await updateGenieInterview(interviewId, buildPayload());
            setLoading(false);

            if (error) {
                alert(error.message ?? '수정 중 오류가 발생했습니다.');
            } else {
                alert('인터뷰 수정이 완료되었습니다.');
                router.push('/interview');
            }
            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { error } = await addGenieInterview({
            ...buildPayload(),
            counselorId: user?.id ?? '',
        });

        setLoading(false);

        if (error) {
            const message =
                error && typeof error === 'object' && 'message' in error
                    ? String(error.message)
                    : '등록 중 오류가 발생했습니다.';
            alert(message);
        } else {
            alert('인터뷰 등록이 완료되었습니다.');
            router.push('/dashboard');
        }
    };

    const renderEtcField = (
        checked: boolean,
        value: string,
        onToggle: () => void,
        onTextChange: (value: string) => void,
    ) => (
        <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onToggle} className="w-4 h-4" />
            <span className="whitespace-nowrap">기타:</span>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    const next = e.target.value;
                    onTextChange(next);
                }}
                className="flex-1 border border-gray-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
            />
        </label>
    );

    return (
        <div className="p-6 max-w-2xl mx-auto min-h-screen">
            {step === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니 QnA</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        * 기본정보파악{mode === 'edit' ? ' (수정)' : ''}
                    </p>

                    <div className="space-y-6 mb-8">
                        {BASIC_FIELDS.map((field) => (
                            <div key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    ✨ {field.label}
                                </label>
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    rows={3}
                                    value={form[field.name]}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                    className={textAreaClass}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 mb-8">
                        {INTERVIEW_QUESTIONS.map(({ name, label, placeholder }) => (
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
                                    value={form[name]}
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                    className={textAreaClass}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={goToSurvey}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md text-sm font-semibold"
                    >
                        다음
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니 QnA</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        * 관심사 조사{mode === 'edit' ? ' (수정)' : ''}
                    </p>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            다음 중 가장 관심 있는 행사 유형은?{' '}
                            <span className="text-gray-400">(중복 선택 가능)</span>
                        </p>
                        <div className="space-y-2">
                            {EVENT_TYPES.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={survey.event_types.includes(opt)}
                                        onChange={() => toggleSurveyItem('event_types', opt)}
                                        className="w-4 h-4"
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                            {renderEtcField(
                                eventEtcChecked,
                                survey.event_types_etc,
                                () => {
                                    setEventEtcChecked((prev) => {
                                        if (prev) setSurvey((s) => ({ ...s, event_types_etc: '' }));
                                        return !prev;
                                    });
                                },
                                (value) => {
                                    setSurvey((prev) => ({ ...prev, event_types_etc: value }));
                                    setEventEtcChecked(value.trim().length > 0);
                                },
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            참여하고 싶은 모임 시간대는 언제인가요?
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {MEETING_TIMES.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={survey.meeting_times.includes(opt)}
                                        onChange={() => toggleSurveyItem('meeting_times', opt)}
                                        className="w-4 h-4"
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            제공받고 싶은 원데이클래스 정보는?
                        </p>
                        <div className="space-y-2">
                            {ONEDAY_CLASSES.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={survey.oneday_classes.includes(opt)}
                                        onChange={() => toggleSurveyItem('oneday_classes', opt)}
                                        className="w-4 h-4"
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                            {renderEtcField(
                                onedayEtcChecked,
                                survey.oneday_classes_etc,
                                () => {
                                    setOnedayEtcChecked((prev) => {
                                        if (prev) setSurvey((s) => ({ ...s, oneday_classes_etc: '' }));
                                        return !prev;
                                    });
                                },
                                (value) => {
                                    setSurvey((prev) => ({ ...prev, oneday_classes_etc: value }));
                                    setOnedayEtcChecked(value.trim().length > 0);
                                },
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">참여하고 싶은 동아리는?</p>
                        <div className="space-y-2">
                            {CLUBS.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={survey.clubs.includes(opt)}
                                        onChange={() => toggleSurveyItem('clubs', opt)}
                                        className="w-4 h-4"
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                            {renderEtcField(
                                clubsEtcChecked,
                                survey.clubs_etc,
                                () => {
                                    setClubsEtcChecked((prev) => {
                                        if (prev) setSurvey((s) => ({ ...s, clubs_etc: '' }));
                                        return !prev;
                                    });
                                },
                                (value) => {
                                    setSurvey((prev) => ({ ...prev, clubs_etc: value }));
                                    setClubsEtcChecked(value.trim().length > 0);
                                },
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            disabled={loading}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-1/3 py-2 rounded-md text-sm font-semibold disabled:opacity-60"
                        >
                            이전
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 py-2 rounded-md text-sm font-semibold disabled:bg-gray-400"
                        >
                            {loading ? (mode === 'edit' ? '수정 중...' : '제출 중...') : mode === 'edit' ? '수정하기' : '제출하기'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
