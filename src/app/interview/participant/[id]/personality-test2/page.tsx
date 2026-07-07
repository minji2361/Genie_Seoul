'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { questions2 } from '@/app/lib/question';
import { savePersonalityTest2 } from '@/app/api/supabaseApi';

export default function PersonalityTest() {
    const params = useParams();
    const router = useRouter();
    const participantId = params?.id as string;
    const storageKey = `personality_test2_${participantId}`;

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

        const unanswered = questions2.some((q) => !answers[q.id]);
        if (unanswered) {
            alert('모든 문항에 응답해야 합니다.');
            return;
        }

        setIsSubmitting(true);

        const { error } = await savePersonalityTest2(participantId, answers);

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

            {/* 검사 시작 안내문 추가 */}
            <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg mb-3">✓ 검사 시작 안내문</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-800">
                    <li>
                        17세~19세 사춘기 시절, 마음이 편안했던 시기의 나를 떠올리세요.
                        <span className="block ml-4 text-gray-600">
                            (시험, 군대, 직장 적응으로 바뀐 모습이 아니라, 본래의 나를 기준으로 합니다.)
                        </span>
                    </li>
                    <li>
                        배워서 익힌 행동이 아니라, 원래 성향을 체크하세요.
                        <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
                            <li>
                                예시1) 군대에서 시간 지키는 습관이 생겼어도, 원래는 느긋하다면 &quot;느긋함&quot;에
                                체크.
                            </li>
                            <li>예시2) 직장에서 적극적으로 변했어도, 원래는 조용하다면 &quot;조용함&quot;에 체크.</li>
                        </ul>
                    </li>
                    <li>
                        원하는 이상적인 모습이 아니라, 실제 평소 모습을 기준으로 하세요.
                        <span className="block ml-4 text-gray-600">
                            (되고 싶은 내가 아니라, 지금의 내가 하는 행동에 체크합니다.)
                        </span>
                    </li>
                </ol>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-2 py-2 w-24">번호</th>
                            <th className="border border-gray-300 px-4 py-2 w-2/5 text-left">문항</th>
                            {/* PDF 양식에 맞춘 4점 척도 */}
                            <th className="border border-gray-300 px-2 py-2 w-24">매우 그렇다</th>
                            <th className="border border-gray-300 px-2 py-2 w-24">그렇다</th>
                            <th className="border border-gray-300 px-2 py-2 w-24">아니다</th>
                            <th className="border border-gray-300 px-2 py-2 w-24">전혀 아니다</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions2.map((question) => (
                            <tr
                                key={question.id}
                                className="border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                                    {question.num}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-left w-2/5 whitespace-normal break-words">
                                    {question.text}
                                </td>
                                {/* 4점 척도 매핑: 4, 3, 2, 1 */}
                                {[4, 3, 2, 1].map((value) => (
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
