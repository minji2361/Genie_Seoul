'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getGenieInterviewById, type GenieInterview } from '@/app/api/supabaseApi';
import { brandColor } from '@/lib/brandcolor';
import { BASIC_FIELDS, INTERVIEW_QUESTIONS, textAreaClass } from '@/app/interview/interviewFormConfig';
import { CLUBS, EVENT_TYPES, MEETING_TIMES, ONEDAY_CLASSES } from '@/app/interview/surveyConfig';

const readOnlyClass = `${textAreaClass} bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none resize-none`;

function joinChecked(selected: string[] | null | undefined, etc?: string | null) {
    const items = [...(selected ?? [])];
    const etcText = etc?.trim();
    if (etcText) items.push(`기타: ${etcText}`);
    return items.length > 0 ? items.join(', ') : '-';
}

function buildInterviewCopyText(interview: GenieInterview) {
    const lines: string[] = [];
    let index = 1;

    const pushLine = (label: string, value: string) => {
        lines.push(`${index}. ${label} : ${value || '-'}`);
        index += 1;
    };

    for (const field of BASIC_FIELDS) {
        pushLine(field.label, interview[field.name] || '');
    }

    for (const question of INTERVIEW_QUESTIONS) {
        const label = question.label.replace(/^\d+\.\s*/, '');
        pushLine(label, interview[question.name] || '');
    }

    pushLine('관심 있는 행사 유형', joinChecked(interview.event_types, interview.event_types_etc));
    pushLine('참여하고 싶은 모임 시간대', joinChecked(interview.meeting_times));
    pushLine('제공받고 싶은 원데이클래스', joinChecked(interview.oneday_classes, interview.oneday_classes_etc));
    pushLine('참여하고 싶은 동아리', joinChecked(interview.clubs, interview.clubs_etc));

    return lines.join('\n');
}

async function copyTextToClipboard(text: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!ok) {
        throw new Error('클립보드 복사에 실패했습니다.');
    }
}

export default function InterviewDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [interview, setInterview] = useState<GenieInterview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSurvey, setShowSurvey] = useState(false);
    const [copying, setCopying] = useState(false);

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

    const handleCopy = async () => {
        if (!interview || copying) return;

        setCopying(true);
        try {
            await copyTextToClipboard(buildInterviewCopyText(interview));
            alert('인터뷰 내용을 복사했습니다.');
        } catch (err) {
            console.error(err);
            alert('복사에 실패했습니다. 브라우저 권한을 확인해 주세요.');
        } finally {
            setCopying(false);
        }
    };

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

    const renderCheckbox = (label: string, checked: boolean) => (
        <label key={label} className="flex items-center gap-2 cursor-not-allowed">
            <input type="checkbox" checked={checked} readOnly disabled className="w-4 h-4" />
            <span className={checked ? 'text-gray-800' : 'text-gray-400'}>{label}</span>
        </label>
    );

    const renderEtcReadonly = (checked: boolean, value: string) => (
        <label className="flex items-center gap-2 cursor-not-allowed">
            <input type="checkbox" checked={checked} readOnly disabled className="w-4 h-4" />
            <span className="whitespace-nowrap">기타:</span>
            <input
                type="text"
                value={value || ''}
                readOnly
                tabIndex={-1}
                className="flex-1 border border-gray-300 rounded-md p-1 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none"
            />
        </label>
    );

    return (
        <div className="p-6 max-w-2xl mx-auto min-h-screen">
            <div className="mb-6 flex items-center justify-between gap-3">
                <button
                    onClick={() => router.push('/interview')}
                    className="text-sm hover:underline"
                    style={{ color: brandColor.orangeish }}
                >
                    ← 인터뷰 목록
                </button>
                <button
                    type="button"
                    onClick={handleCopy}
                    disabled={copying}
                    className="shrink-0 rounded-md px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    style={{ backgroundColor: brandColor.deepmoss }}
                >
                    {copying ? '복사 중...' : '복사하기'}
                </button>
            </div>

            {!showSurvey && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니 QnA</h3>
                    <p className="text-sm text-gray-500 mb-6">* 기본정보파악</p>

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
                                    className={readOnlyClass}
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
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">🌟 지니 QnA</h3>
                    <p className="text-sm text-gray-500 mb-6">* 관심사 조사</p>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            다음 중 가장 관심 있는 행사 유형은?{' '}
                            <span className="text-gray-400">(중복 선택 가능)</span>
                        </p>
                        <div className="space-y-2">
                            {EVENT_TYPES.map((opt) => renderCheckbox(opt, eventTypes.includes(opt)))}
                            {renderEtcReadonly(!!interview.event_types_etc, interview.event_types_etc)}
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
                            {renderEtcReadonly(!!interview.oneday_classes_etc, interview.oneday_classes_etc)}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="block text-sm font-medium text-gray-700 mb-3">참여하고 싶은 동아리는?</p>
                        <div className="space-y-2">
                            {CLUBS.map((opt) => renderCheckbox(opt, clubs.includes(opt)))}
                            {renderEtcReadonly(!!interview.clubs_etc, interview.clubs_etc)}
                        </div>
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
