'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { attachmentQuestions } from '@/app/lib/question';
import { saveAttachmentTest } from '@/app/api/supabaseApi';

export default function AttachmentTest() {
    const params = useParams();
    const router = useRouter();
    const participantId = params?.id as string;
    const storageKey = `attachment_test_${participantId}`;

    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const savedAnswers = localStorage.getItem(storageKey);
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, [storageKey]);

    const handleAnswerChange = useCallback(
        (questionId: string, value: number) => {
            setAnswers((prev) => {
                const updatedAnswers = { ...prev, [questionId]: value };
                localStorage.setItem(storageKey, JSON.stringify(updatedAnswers));
                return updatedAnswers;
            });
        },
        [storageKey]
    );

    const handleSubmit = async () => {
        if (!participantId) {
            alert('잘못된 접근입니다.');
            return;
        }

        const unanswered = attachmentQuestions.some((q) => !answers[q.id]);
        if (unanswered) {
            alert('모든 문항에 응답해야 합니다.');
            return;
        }

        setIsSubmitting(true);

        const { error } = await saveAttachmentTest(participantId, answers);

        if (error) {
            console.error(error);
            alert('저장 실패: ' + error.message);
            setIsSubmitting(false);
        } else {
            alert('검사 결과가 저장되었습니다.');
            localStorage.removeItem(storageKey);
            setIsSubmitted(true);
            router.back();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6">성인애착유형검사</h2>

            <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-3">✓ 검사 시작 안내문</h3>
                <p className="text-sm text-gray-800 mb-2">
                    다음 질문들은 귀하가 다른 사람과의 관계에서 어떻게 느끼는지를 알아보기 위한 것입니다. 가까운 정도에
                    따라 표시를 해주시기 바랍니다.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-800">
                    <li>현재 자신이 가장 일상적이고 자연스럽게 느끼는 관계 패턴을 떠올리며 응답해주세요.</li>
                    <li>
                        너무 깊게 고민하지 마시고, 처음 읽었을 때 직관적으로 떠오르는 느낌에 체크하는 것이 좋습니다.
                    </li>
                </ol>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-center text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-2 py-2 w-16">번호</th>
                            <th className="border border-gray-300 px-4 py-2 w-1/3 text-left">내용</th>
                            <th className="border border-gray-300 px-1 py-2 w-20">전혀 그렇지 않다 (1점)</th>
                            <th className="border border-gray-300 px-1 py-2 w-20">그렇지 않다 (2점)</th>
                            <th className="border border-gray-300 px-1 py-2 w-20">보통이다 (3점)</th>
                            <th className="border border-gray-300 px-1 py-2 w-20">대체로 그렇다 (4점)</th>
                            <th className="border border-gray-300 px-1 py-2 w-20">매우 그렇다 (5점)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attachmentQuestions.map((question) => (
                            <tr
                                key={question.id}
                                className="border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">
                                    {question.num}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-left w-1/3 whitespace-normal break-words">
                                    {question.text}
                                </td>
                                {/* 5점 척도 매핑: 1, 2, 3, 4, 5 */}
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <td
                                        key={value}
                                        className="border border-gray-300 px-2 py-2"
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={value}
                                            checked={answers[question.id] === value}
                                            onChange={() => handleAnswerChange(question.id, value)}
                                            className="w-5 h-5 cursor-pointer accent-blue-500"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={handleSubmit}
                disabled={isSubmitting || isSubmitted}
                className={`mt-6 font-bold py-3 px-8 rounded-lg block mx-auto transition-colors ${
                    isSubmitting || isSubmitted
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
                {isSubmitted ? '제출 완료' : isSubmitting ? '제출 중...' : '검사 제출'}
            </button>
        </div>
    );
}
