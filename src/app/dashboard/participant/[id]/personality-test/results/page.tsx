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
import { questions } from '@/app/lib/question'; // questions 데이터 import
import AnswerDetails from './AnswerDetails';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function ResultsPage() {
    const { id: participantId } = useParams();
    // results 상태 타입 업데이트: allAnswers 추가
    const [results, setResults] = useState<{
        categoryScores: Record<string, number>;
        allAnswers: Record<string, number>; // allAnswers 필드 추가
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('');
    const [wing, setWing] = useState('');
    const [integration, setIntegration] = useState('');
    const [disintegration, setDisintegration] = useState('');
    const [showAnswerDetails, setShowAnswerDetails] = useState(false); // 새로운 상태 추가

    useEffect(() => {
        const fetchResults = async () => {
            const { data, error } = await supabase
                .from('personality_tests')
                .select('answers')
                .eq('participant_id', participantId)
                .maybeSingle();

            if (error || !data) {
                console.error('Error fetching data or no data found');
                // 오류 발생 시 로딩 상태 해제 및 결과 없음 처리
                setLoading(false);
                setResults(null);
                return;
            }

            const answers = data.answers;
            const scores: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0 };

            // 5점 척도 답변을 합산하여 카테고리별 점수 계산
            for (let i = 1; i <= 9; i++) {
                scores.A += answers[`a${i}`] || 0;
                scores.B += answers[`b${i}`] || 0;
                scores.C += answers[`c${i}`] || 0;
                scores.D += answers[`d${i}`] || 0;
                scores.E += answers[`e${i}`] || 0;
                scores.F += answers[`f${i}`] || 0;
                scores.G += answers[`g${i}`] || 0;
                scores.H += answers[`h${i}`] || 0;
                scores.I += answers[`i${i}`] || 0;
            }

            // results 상태에 categoryScores와 함께 answers도 저장합니다.
            setResults({ categoryScores: scores, allAnswers: answers });
            setLoading(false);

            // 점수가 높은 순서로 정렬하여 주 유형 결정
            const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

            // 에니어그램 유형 문자열 매핑 (D->2, E->3, F->4, A->5, B->6, C->7, G->8, H->9, I->1)
            const enneagramMapping: Record<string, string> = {
                D: '2',
                E: '3',
                F: '4',
                A: '5',
                B: '6',
                C: '7',
                G: '8',
                H: '9',
                I: '1',
            };

            // 통합/분열 방향 매핑
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

            const primaryTypeLetter = sortedScores[0][0];
            const primaryType = enneagramMapping[primaryTypeLetter];

            // 날개(wing) 유형 계산: 주 유형의 양 옆 번호 중 점수가 높은 것 선택
            const wingCandidates = [
                ((parseInt(primaryType) + 8) % 9 || 9).toString(), // 왼쪽 날개 (예: 3 -> 2)
                ((parseInt(primaryType) % 9) + 1).toString(), // 오른쪽 날개 (예: 3 -> 4)
            ];

            const wingType =
                sortedScores
                    .map(([letter, score]) => [enneagramMapping[letter], score] as [string, number])
                    .filter(([type]) => wingCandidates.includes(type))
                    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? ''; // 가장 높은 점수를 가진 날개 선택

            setType(primaryType);
            setWing(wingType);
            setIntegration(integrationMap[primaryType]);
            setDisintegration(disintegrationMap[primaryType]);
        };

        fetchResults();
    }, [participantId]);

    if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;
    if (!results)
        return <p className="text-center text-red-500">결과를 불러오는 데 실패했습니다. 올바른 ID인지 확인해주세요.</p>;

    // 차트 및 표 출력을 위한 순서 정의 (에니어그램 번호 1~9에 해당하는 카테고리 문자)
    const order = ['D', 'E', 'F', 'A', 'B', 'C', 'G', 'H', 'I']; // 2,3,4,5,6,7,8,9,1 순서
    const labelMapping: Record<string, string> = {
        // 카테고리 문자를 에니어그램 번호로 매핑
        D: '2',
        E: '3',
        F: '4',
        A: '5',
        B: '6',
        C: '7',
        G: '8',
        H: '9',
        I: '1',
    };
    const chartLabels = order.map((key) => labelMapping[key]); // 차트 라벨 (유형 번호)
    const chartValues = order.map((key) => results.categoryScores[key]); // 차트 값 (점수)

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
                tension: 0.4, // 곡선 형태로 연결
            },
        ],
    };

    // 사용자의 주요 유형에 해당하는 설명 데이터 찾기
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
                        {chartLabels.map((label, idx) => (
                            <th
                                key={idx}
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

            {/* 유형 설명 섹션 */}
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

            {/* 답변 상세 보기 버튼 */}
            <div className="text-center mt-10">
                <button
                    onClick={() => setShowAnswerDetails(!showAnswerDetails)}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    {showAnswerDetails ? '답변 상세 숨기기' : '내가 선택한 답변 자세히 보기'}
                </button>
            </div>

            {/* AnswerDetails 컴포넌트 렌더링 (showAnswerDetails 상태에 따라) */}
            {showAnswerDetails && results.allAnswers && (
                <AnswerDetails
                    allAnswers={results.allAnswers}
                    labelMapping={labelMapping}
                    categoryScores={results.categoryScores}
                    questions={questions} // questions 데이터를 props로 전달
                />
            )}
        </div>
    );
}
