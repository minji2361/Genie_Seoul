'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCoreEmotionTestResult } from '@/app/api/supabaseApi';
import { emotions } from '@/app/lib/question';

const emotionItemMap: Record<number, string> = {
    1: '부담감',
    2: '경쟁심',
    3: '억울함',
    4: '열등감',
    5: '외로움',
    6: '그리움',
    7: '질투',
    8: '두려움',
    9: '화',
    10: '무기력',
    11: '허무',
    12: '슬픔',
    13: '불안',
    14: '공포',
    15: '소외',
    16: '적개심',
};

function groupItemsByCategory(items: string[]): Record<string, string[]> {
    return items.reduce((acc, item) => {
        const [category, ...rest] = item.split(':').map((s) => s.trim());
        const name = rest.join(':').trim();
        acc[category] = acc[category] ?? [];
        acc[category].push(name);
        return acc;
    }, {} as Record<string, string[]>);
}

const CoreEmotionResultPage = () => {
    const params = useParams();
    const participantId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [answersMap, setAnswersMap] = useState<Record<number, string[]>>({});
    const [sortedEmotions, setSortedEmotions] = useState<typeof emotions>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await getCoreEmotionTestResult(participantId);
            if (error || !data) {
                setError(true);
                setLoading(false);
                return;
            }

            const answers = Array.isArray(data) ? data[0]?.answers : data.answers;

            const answersRecord: Record<number, string[]> = {};
            Object.entries(emotionItemMap).forEach(([key]) => {
                const id = Number(key);
                const checkedItems = answers?.[id];
                answersRecord[id] = Array.isArray(checkedItems) ? checkedItems : [];
            });

            const emotionCounts = Object.entries(answersRecord).map(([key, items]) => ({
                id: Number(key),
                count: items.length,
            }));

            const sorted = [...emotions].sort((a, b) => {
                const aCount = emotionCounts.find((e) => e.id === a.id)?.count ?? 0;
                const bCount = emotionCounts.find((e) => e.id === b.id)?.count ?? 0;
                return bCount - aCount;
            });

            setAnswersMap(answersRecord);
            setSortedEmotions(sorted);
            setLoading(false);
        };

        fetchData();
    }, [participantId]);

    if (loading) return <p className="text-center mt-20 text-gray-500 text-lg font-light">불러오는 중...</p>;
    if (error)
        return <p className="text-center text-red-600 mt-20 font-semibold text-lg">결과를 불러오지 못했습니다.</p>;

    return (
        <main className="max-w-4xl mx-auto p-6 font-sans text-gray-800">
            <h1 className="text-3xl font-bold mb-12 text-center tracking-wide">핵심 감정 검사 결과 (전체 항목)</h1>

            {sortedEmotions.map((emotion) => {
                const id = emotion.id;

                const allItems: string[] = [];
                emotion.categories.forEach((cat) => {
                    cat.items.forEach((item) => {
                        allItems.push(`${cat.category}: ${item}`);
                    });
                });

                const checkedItems = answersMap[id] || [];
                const groupedItems = groupItemsByCategory(allItems);

                return (
                    <section
                        key={id}
                        className="mb-12 rounded-lg border border-gray-300 bg-white shadow-md p-6"
                        aria-labelledby={`emotion-title-${id}`}
                    >
                        <h2
                            id={`emotion-title-${id}`}
                            className="text-2xl font-semibold mb-6 flex justify-between items-center border-b border-gray-200 pb-2"
                        >
                            <span>{emotionItemMap[id]}</span>
                            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full select-none">
                                선택된 항목: {checkedItems.length}개
                            </span>
                        </h2>

                        <table className="w-full border border-gray-200 rounded-md overflow-hidden text-sm">
                            <thead className="bg-gray-50 text-gray-700 font-semibold">
                                <tr>
                                    <th className="border border-gray-200 px-5 py-3 w-36">카테고리</th>
                                    <th className="border border-gray-200 px-5 py-3">항목</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(groupedItems).map(([category, items]) => (
                                    <tr
                                        key={category}
                                        className="align-top even:bg-gray-50"
                                    >
                                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-700">
                                            {category}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-3">
                                            {items.map((item) => {
                                                const key = `${category}: ${item}`;
                                                const isChecked = checkedItems.includes(key);
                                                return (
                                                    <label
                                                        key={key}
                                                        className={`flex items-center space-x-2 mb-1 cursor-default select-none ${
                                                            isChecked
                                                                ? 'bg-blue-50 text-blue-800 px-2 py-1 rounded'
                                                                : ''
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            disabled
                                                            className="cursor-default rounded border-gray-400 text-gray-700 focus:ring-gray-400"
                                                        />
                                                        <span>{item}</span>
                                                    </label>
                                                );
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                );
            })}
        </main>
    );
};

export default CoreEmotionResultPage;
