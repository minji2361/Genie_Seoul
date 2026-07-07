'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { typeData } from '@/app/lib/context';
import { questions2 } from '@/app/lib/question';
import AnswerDetails from './AnswerDetails';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

type Question = {
    id: string;
    num: string;
    text: string;
    scoreIncluded?: boolean;
};

type ResultsState = {
    categoryScores: Record<string, number>;
    allAnswers: Record<string, number>;
};

const enneagramOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const integrationMap: Record<string, string> = {
    '1': '7',
    '2': '4',
    '3': '6',
    '4': '1',
    '5': '8',
    '6': '9',
    '7': '5',
    '8': '2',
    '9': '3',
};

const disintegrationMap: Record<string, string> = {
    '1': '4',
    '2': '8',
    '3': '9',
    '4': '2',
    '5': '7',
    '6': '3',
    '7': '1',
    '8': '5',
    '9': '6',
};

function getTypeFromQuestionId(questionId: string): string {
    return questionId.split('_')[0].replace('t', ''); // t8_1 -> 8
}

function calculateCategoryScores(answers: Record<string, number>, questions: Question[]): Record<string, number> {
    const initialScores: Record<string, number> = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
    };

    for (const question of questions) {
        if (question.scoreIncluded === false || question.num === '※') continue;

        const value = answers[question.id];
        if (typeof value !== 'number') continue;

        const type = getTypeFromQuestionId(question.id);
        if (initialScores[type] != null) {
            initialScores[type] += value;
        }
    }

    return initialScores;
}

function getWingType(primaryType: string, scores: Record<string, number>): string {
    const typeNum = parseInt(primaryType, 10);
    const leftWing = typeNum === 1 ? '9' : String(typeNum - 1);
    const rightWing = typeNum === 9 ? '1' : String(typeNum + 1);

    return scores[leftWing] >= scores[rightWing] ? leftWing : rightWing;
}

export default function ResultsPage() {
    const params = useParams();
    const participantId = params?.id as string;

    const [results, setResults] = useState<ResultsState | null>(null);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('');
    const [wing, setWing] = useState('');
    const [integration, setIntegration] = useState('');
    const [disintegration, setDisintegration] = useState('');
    const [showAnswerDetails, setShowAnswerDetails] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!participantId) {
                setLoading(false);
                setResults(null);
                return;
            }

            const { data, error } = await supabase
                .from('personality_tests2')
                .select('answers')
                .eq('participant_id', participantId)
                .maybeSingle();

            if (error || !data?.answers) {
                console.error('Error fetching data or no data found', error);
                setLoading(false);
                setResults(null);
                return;
            }

            const answers = data.answers as Record<string, number>;
            const scores = calculateCategoryScores(answers, questions2);

            setResults({
                categoryScores: scores,
                allAnswers: answers,
            });

            const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
            const primaryType = sortedScores[0]?.[0] ?? '';
            const wingType = primaryType ? getWingType(primaryType, scores) : '';

            setType(primaryType);
            setWing(wingType);
            setIntegration(primaryType ? integrationMap[primaryType] : '');
            setDisintegration(primaryType ? disintegrationMap[primaryType] : '');
            setLoading(false);
        };

        fetchResults();
    }, [participantId]);

    if (loading) {
        return <p className="text-center text-gray-600">로딩 중...</p>;
    }

    if (!results) {
        return <p className="text-center text-red-500">결과를 불러오는 데 실패했습니다. 올바른 ID인지 확인해주세요.</p>;
    }

    const chartLabels = enneagramOrder;
    const chartValues = enneagramOrder.map((typeNum) => results.categoryScores[typeNum] || 0);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: '점수',
                data: chartValues,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
            },
        ],
    };

    const typeInfo = typeData.find((data) => data.type === type);

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <header className="text-center border-b pb-4 mb-6">
                <h1 className="text-2xl font-bold">에니어그램 성격 유형 검사 결과</h1>
                <p className="text-sm text-gray-500">ID: {participantId}</p>
            </header>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-center mb-4">유형별 점수 분포</h2>
                <Line
                    data={chartData}
                    options={{ responsive: true, plugins: { legend: { display: false } } }}
                />
            </div>

            <h2 className="text-xl font-semibold text-center mb-4">유형별 점수표</h2>
            <table className="w-full text-center border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        {chartLabels.map((label) => (
                            <th
                                key={label}
                                className="border border-gray-300 px-4 py-2"
                            >
                                유형 {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {chartValues.map((value, idx) => (
                            <td
                                key={idx}
                                className="border border-gray-300 px-4 py-2"
                            >
                                {value}점
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <h2 className="text-xl font-semibold text-center mb-4">나의 에니어그램 유형</h2>
            <table className="w-full text-center border-collapse border border-gray-300 mb-6">
                <tbody>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">나의 유형</th>
                        <th className="border border-gray-300 px-4 py-2">날개</th>
                        <th className="border border-gray-300 px-4 py-2">통합 방향</th>
                        <th className="border border-gray-300 px-4 py-2">분열 방향</th>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">{type} 유형</td>
                        <td className="border border-gray-300 px-4 py-2">{wing} 유형</td>
                        <td className="border border-gray-300 px-4 py-2">{integration} 유형</td>
                        <td className="border border-gray-300 px-4 py-2">{disintegration} 유형</td>
                    </tr>
                </tbody>
            </table>

            {typeInfo ? (
                <div className="mt-8 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">
                            나의 유형: {typeInfo.name} ({type} 유형)
                        </h2>

                        <div className="bg-gray-50 border-l-4 border-blue-300 p-4 rounded">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">핵심 특성</h3>
                            <p className="text-gray-700 leading-relaxed">{typeInfo.core_traits.description}</p>
                            <p className="text-gray-700 mt-2">
                                <span className="font-semibold text-blue-600">동기:</span>{' '}
                                {typeInfo.core_traits.motivation}
                            </p>
                            <p className="text-gray-700 mt-2">
                                <span className="font-semibold text-blue-600">핵심 가치:</span>{' '}
                                {typeInfo.core_traits.key_values.join(', ')}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-green-700 mb-3">상태별 성향</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                                <h4 className="text-md font-semibold text-green-600 mb-2">긍정적 상태</h4>
                                <ul className="list-disc pl-5 text-gray-800 space-y-1">
                                    {typeInfo.states.positive.map((state, idx) => (
                                        <li key={idx}>{state}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                                <h4 className="text-md font-semibold text-red-600 mb-2">부정적 상태</h4>
                                <ul className="list-disc pl-5 text-gray-800 space-y-1">
                                    {typeInfo.states.negative.map((state, idx) => (
                                        <li key={idx}>{state}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-purple-700 mb-3">강점과 약점</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-md font-medium text-purple-600 mb-2">강점</h4>
                                <ul className="list-disc pl-5 text-gray-800 space-y-1">
                                    {typeInfo.strengths.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-md font-medium text-purple-600 mb-2">약점</h4>
                                <ul className="list-disc pl-5 text-gray-800 space-y-1">
                                    {typeInfo.weaknesses.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-8">유형 {type}에 대한 설명이 아직 준비되지 않았습니다.</p>
            )}

            <div className="text-center mt-10">
                <button
                    onClick={() => setShowAnswerDetails(!showAnswerDetails)}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    {showAnswerDetails ? '답변 상세 숨기기' : '내가 선택한 답변 자세히 보기'}
                </button>
            </div>

            {showAnswerDetails && results.allAnswers && (
                <AnswerDetails
                    allAnswers={results.allAnswers}
                    questions={questions2}
                />
            )}
        </div>
    );
}
