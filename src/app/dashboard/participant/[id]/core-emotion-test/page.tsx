'use client';

import React, { useState } from 'react';
import { emotions } from '@/app/lib/question';
import { useParams } from 'next/navigation';
import { saveCoreEmotionTest } from '@/app/api/supabaseApi';

const CoreEmotionTest = () => {
    const params = useParams();
    const participantId = params?.id as string;
    const [answers, setAnswers] = useState<Record<number, string[]>>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleCheckboxChange = (emotionId: number, category: string, item: string) => {
        setAnswers((prev) => {
            const updatedAnswers = { ...prev };
            const key = `${category}: ${item}`;

            if (!updatedAnswers[emotionId]) {
                updatedAnswers[emotionId] = [];
            }

            if (updatedAnswers[emotionId].includes(key)) {
                updatedAnswers[emotionId] = updatedAnswers[emotionId].filter((k) => k !== key);
            } else {
                updatedAnswers[emotionId] = [...updatedAnswers[emotionId], key];
            }

            return updatedAnswers;
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage(null);

        if (!participantId) {
            setMessage('❌ 오류:  ID가 없습니다.');
            setLoading(false);
            return;
        }

        try {
            const { error } = await saveCoreEmotionTest(participantId, answers);

            if (error) throw error;
            setMessage('✅ 검사 결과가 성공적으로 저장되었습니다!');

            // 1.5초 정도 메시지 보여준 뒤 뒤로가기
            setTimeout(() => {
                window.history.back();
            }, 1500);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류 발생';
            setMessage(`❌ 저장 중 오류가 발생했습니다. (${errorMessage})`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 font-sans text-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">핵심 감정 검사</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {emotions.map((emotion) => (
                    <section
                        key={emotion.id}
                        className="border border-gray-300 rounded-lg bg-white shadow-sm p-5 hover:shadow-md transition-shadow"
                        aria-labelledby={`emotion-title-${emotion.id}`}
                    >
                        <h2 id={`emotion-title-${emotion.id}`} className="text-xl font-semibold mb-4 text-gray-800">
                            감정 유형 {emotion.id}
                        </h2>

                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 font-semibold">
                                    <th className="border border-gray-300 px-4 py-2 w-32">카테고리</th>
                                    <th className="border border-gray-300 px-4 py-2">항목</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emotion.categories.map((category) => (
                                    <tr key={category.category} className="even:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-3 font-semibold align-top text-gray-700">
                                            {category.category}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            {category.items.map((item) => {
                                                const key = `${category.category}: ${item}`;
                                                const checked = answers[emotion.id]?.includes(key) || false;
                                                return (
                                                    <label
                                                        key={key}
                                                        className="flex items-center mb-2 cursor-pointer select-none text-gray-800"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="mr-3 h-4 w-4 rounded border-gray-400 text-blue-600 focus:ring-blue-500"
                                                            checked={checked}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    emotion.id,
                                                                    category.category,
                                                                    item
                                                                )
                                                            }
                                                        />
                                                        {item}
                                                    </label>
                                                );
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-8 block mx-auto rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
            >
                {loading ? '저장 중...' : '제출하기'}
            </button>

            {message && (
                <p
                    className={`mt-6 text-center font-medium ${
                        message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                    }`}
                    role="alert"
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default CoreEmotionTest;
