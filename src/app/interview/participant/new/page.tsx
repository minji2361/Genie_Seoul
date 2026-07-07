'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import SignaturePad from 'signature_pad';
import { uploadSignature, addGenieInterview } from '@/app/api/supabaseApi';
import { supabase } from '@/app/lib/supabase';
import * as htmlToImage from 'html-to-image';
import {
    CLUBS,
    EVENT_TYPES,
    INITIAL_SURVEY,
    MEETING_TIMES,
    ONEDAY_CLASSES,
    type SurveyArrayKey,
    type SurveyState,
} from '@/app/interview/surveyConfig';

const BASIC_FIELDS = [
    { name: 'name', label: '이름', placeholder: '', type: 'text' },
    { name: 'age', label: '나이', placeholder: '', type: 'text' },
    { name: 'gender', label: '성별', placeholder: '', type: 'text' },
    { name: 'mbti', label: 'MBTI', placeholder: '', type: 'text' },
    {
        name: 'region',
        label: '현재 거주 지역',
        placeholder: 'ex. 노원구 상계동',
        type: 'text',
        fullWidth: true,
    },
    { name: 'hobby', label: '취미', placeholder: '', type: 'text', fullWidth: true },
    { name: 'dream', label: '목표나 꿈', placeholder: '', type: 'text', fullWidth: true },
] as const;

const INTERVIEW_QUESTIONS = [
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

type FormState = {
    name: string;
    age: string;
    gender: string;
    mbti: string;
    region: string;
    hobby: string;
    dream: string;
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

const INITIAL_FORM: FormState = {
    name: '',
    age: '',
    gender: '',
    mbti: '',
    region: '',
    hobby: '',
    dream: '',
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

export default function NewInterviewPage() {
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [agreed, setAgreed] = useState(false);
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [survey, setSurvey] = useState<SurveyState>(INITIAL_SURVEY);
    const [etcChecked, setEtcChecked] = useState(false);

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

    const toggleEtc = () => {
        setEtcChecked((prev) => {
            if (prev) setSurvey((s) => ({ ...s, event_types_etc: '' }));
            return !prev;
        });
    };

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const signaturePadRef = useRef<SignaturePad | null>(null);
    const agreementRef = useRef<HTMLDivElement | null>(null);
    const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ratio = window.devicePixelRatio || 1;
        const width = 300;
        const height = 150;

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(ratio, ratio);

        signaturePadRef.current = new SignaturePad(canvas, {
            penColor: 'black',
            backgroundColor: 'white',
            minWidth: 1,
            maxWidth: 2.5,
        });

        const preventDefault = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
        };

        canvas.addEventListener('touchstart', preventDefault, { passive: false });
        canvas.addEventListener('touchmove', preventDefault, { passive: false });

        return () => {
            canvas.removeEventListener('touchstart', preventDefault);
            canvas.removeEventListener('touchmove', preventDefault);
        };
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAgreementSubmit = async () => {
        if (!agreed || !signaturePadRef.current || signaturePadRef.current.isEmpty()) {
            alert('보안 각서에 동의하고 서명해주세요.');
            return;
        }

        try {
            const node = agreementRef.current;
            if (!node) {
                alert('약속서 캡처에 실패했습니다.');
                return;
            }

            const dataUrl = await htmlToImage.toPng(node);
            setSignatureData(dataUrl);
            setStep(2);
        } catch (err) {
            console.error('html-to-image error:', err);
            alert('서약서 이미지 생성 중 오류 발생');
        }
    };

    const goToSurvey = () => {
        const requiredBasic = ['name', 'age', 'gender', 'mbti', 'region'] as const;
        const missingBasic = requiredBasic.some((key) => !form[key].trim());

        if (missingBasic || !signatureData) {
            alert('기본정보(이름, 나이, 성별, MBTI, 거주 지역)를 모두 작성해주세요.');
            return;
        }

        setStep(3);
    };

    const handleSubmit = async () => {
        const requiredBasic = ['name', 'age', 'gender', 'mbti', 'region'] as const;
        const missingBasic = requiredBasic.some((key) => !form[key].trim());

        if (missingBasic || !signatureData) {
            alert('기본정보(이름, 나이, 성별, MBTI, 거주 지역)를 모두 작성해주세요.');
            return;
        }

        setLoading(true);

        const fileName = `interview-agreement-${Date.now()}.png`;
        const { url: signatureurl, error: uploadError } = await uploadSignature(signatureData, fileName);

        if (uploadError || !signatureurl) {
            const message =
                uploadError && typeof uploadError === 'object' && 'message' in uploadError
                    ? String(uploadError.message)
                    : '서명 업로드에 실패했습니다.';
            alert(message);
            setLoading(false);
            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { error } = await addGenieInterview({
            ...form,
            event_types: survey.event_types,
            event_types_etc: survey.event_types_etc.trim(),
            meeting_times: survey.meeting_times,
            oneday_classes: survey.oneday_classes,
            clubs: survey.clubs,
            signatureurl,
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
            router.push('/interview');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto min-h-screen">
            {step === 1 && (
                <>
                    <div
                        ref={agreementRef}
                        className="border rounded-lg p-10 bg-white text-sm text-gray-800 space-y-6 shadow-lg font-serif w-full max-w-[600px] mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-center underline mb-6 tracking-wide">
                            비밀 유지 서약서
                        </h2>
                        <p>본인은 아래의 조항을 충분히 이해하고 이에 동의하며 서명합니다.</p>
                        <ol className="space-y-3 list-decimal list-inside leading-relaxed">
                            <li>
                                <strong>계약 목적</strong>: 상담사는 내담자의 동의 없이는 상담 내용을 외부에 공개하지
                                않습니다.
                            </li>
                            <li>
                                <strong>영업 비밀 정보</strong>: 교육, 연구, 평가 중 알게 된 비밀 정보는 외부에 유출하지
                                않습니다.
                            </li>
                            <li>
                                <strong>보유 정보 사용 제한</strong>: 내담자 연구 시에는 참여 거부나 중단 시 해로운
                                결과가 없도록 보호합니다.
                            </li>
                            <li>
                                <strong>비밀 유지 기간</strong>: 본 프로그램의 내용을 외부에 누설하지 않으며, 저작권
                                침해 시 법적 책임을 집니다.
                            </li>
                        </ol>

                        <label className="inline-flex items-center pt-4">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                                className="hidden peer"
                            />
                            <div className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-sm flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600">
                                <svg
                                    className="w-3 h-3 text-white hidden peer-checked:block"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <span>상기 내용을 충분히 읽고 이해하였으며 이에 동의합니다.</span>
                        </label>

                        <p className="pt-4 text-sm">
                            작성일: <strong>{today}</strong>
                        </p>

                        <div className="pt-6">
                            <p className="text-sm mb-1">서명:</p>
                            <canvas
                                ref={canvasRef}
                                className="border rounded bg-white touch-none w-[300px] h-[150px]"
                                style={{ touchAction: 'none' }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAgreementSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mt-6"
                    >
                        서약서 동의 및 다음
                    </button>
                </>
            )}

            {step === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니 인터뷰</h3>
                    <p className="text-sm text-gray-500 mb-6">* 기본정보파악</p>

                    <div className="grid gap-5 mb-8 md:grid-cols-2">
                        {BASIC_FIELDS.map((field) => (
                            <div key={field.name} className={'fullWidth' in field && field.fullWidth ? 'md:col-span-2' : ''}>
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
                                    value={form[field.name]}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[80px]"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={goToSurvey}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md text-sm font-semibold"
                    >
                        다음
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니커스텀 인터뷰지</h3>
                    <p className="text-sm text-gray-500 mb-6">* 관심사 조사</p>

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
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={etcChecked}
                                    onChange={toggleEtc}
                                    className="w-4 h-4"
                                />
                                <span className="whitespace-nowrap">기타:</span>
                                <input
                                    type="text"
                                    value={survey.event_types_etc}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSurvey((prev) => ({ ...prev, event_types_etc: value }));
                                        setEtcChecked(value.trim().length > 0);
                                    }}
                                    className="flex-1 border border-gray-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </label>
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
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(2)}
                            disabled={loading}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-1/3 py-2 rounded-md text-sm font-semibold disabled:opacity-60"
                        >
                            이전
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 py-2 rounded-md text-sm font-semibold disabled:bg-gray-400"
                        >
                            {loading ? '제출 중...' : '제출하기'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
