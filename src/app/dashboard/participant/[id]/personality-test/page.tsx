'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { questions } from '@/app/lib/question';
import { savePersonalityTest } from '@/app/api/supabaseApi';

export default function PersonalityTest() {
    const params = useParams();
    const router = useRouter();
    const participantId = params?.id as string;
    const storageKey = `personality_test_${participantId}`;

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

        const unanswered = questions.some((q) => !answers[q.id]);
        if (unanswered) {
            alert('모든 문항에 응답해야 합니다.');
            return;
        }

        setIsSubmitting(true);

        const { error } = await savePersonalityTest(participantId, answers);

        if (error) {
            console.error(error);
            alert('저장 실패: ' + error.message);
            setIsSubmitting(false); // 실패하면 다시 눌러도 되도록
        } else {
            alert('검사 결과가 저장되었습니다.');
            localStorage.removeItem(storageKey);
            setIsSubmitted(true); // 제출 완료 상태
            router.back();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6">성격 유형 검사</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 w-10">번호</th>
                            <th className="border border-gray-300 px-4 py-2 w-2/5 text-left">문항</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">매우 그렇다</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">그렇다</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">보통이다</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">아니다</th>
                            <th className="border border-gray-300 px-4 py-2 w-24">전혀 아니다</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr
                                key={question.id}
                                className="border border-gray-300"
                            >
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-left w-2/5 whitespace-normal break-words">
                                    {question.text}
                                </td>
                                {[5, 4, 3, 2, 1].map((value) => (
                                    <td
                                        key={value}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={value}
                                            checked={answers[question.id] === value}
                                            onChange={() => handleAnswerChange(question.id, value)}
                                            className="w-5 h-5 cursor-pointer"
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
                className={`mt-6 font-bold py-2 px-6 rounded-lg block mx-auto ${
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
