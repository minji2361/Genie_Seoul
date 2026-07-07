'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { attachmentQuestions } from '@/app/lib/question';
import AnswerDetails from './AnswerDetails';
// 아이콘 사용을 위해 lucide-react 설치가 필요합니다: npm install lucide-react
import {
    ChevronDown,
    ChevronUp,
    Activity,
    ShieldCheck,
    Heart,
    AlertCircle,
    CheckCircle2,
    Lightbulb,
} from 'lucide-react';

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

type ResultsState = {
    anxietyScore: number;
    avoidanceScore: number;
    allAnswers: Record<string, number>;
};

const REVERSE_ITEMS = [3, 15, 19, 22, 25, 27, 29, 33];

const attachmentTypeData = [
    {
        type: '안정형',
        color: 'indigo',
        name: '안정형 (Secure)',
        description:
            '타인과 가까워지는 것을 편안하게 느끼며, 자신과 타인에 대해 긍정적인 모델을 가지고 있습니다. 관계에서 적절한 의존과 독립의 균형을 유지합니다.',
        strengths: [
            '감정 표현과 공유가 자연스럽고 솔직함',
            '갈등 상황에서 방어적이지 않고 협력적임',
            '자존감이 높고 타인의 의도를 긍정적으로 해석',
        ],
        weaknesses: ['상대방이 불안/회피형일 경우 과도하게 맞춰주다 소모될 수 있음'],
        advice: '지금의 건강한 관계 맺기 방식을 유지하세요. 갈등이 생겨도 당신의 회복 탄력성을 믿고 대화로 풀어가면 됩니다.',
    },
    {
        type: '불안형',
        color: 'rose',
        name: '불안형 (Preoccupied)',
        description:
            '친밀함에 대한 욕구가 강하며 타인으로부터의 인정과 수용에 민감합니다. 관계가 멀어질까 봐 불안해하거나 과도하게 몰입하는 경향이 있습니다.',
        strengths: ['관계의 변화를 빠르게 알아차리는 민감성', '타인에게 헌신적이고 따뜻한 태도'],
        weaknesses: ['상대의 사소한 행동에 거절감을 느낌', '자신의 감정을 조절하는 데 어려움을 겪음'],
        advice: '자신의 가치를 타인의 반응에서 찾지 마세요. 혼자만의 시간을 즐기는 연습과 감정 일기를 통해 내면의 평온을 찾는 것이 중요합니다.',
    },
    {
        type: '거부회피형',
        color: 'blue',
        name: '거부회피형 (Dismissive)',
        description:
            '독립성과 자율성을 매우 중요하게 생각하며, 감정적인 친밀함이 지나치게 깊어지는 것에 거부감을 느낄 수 있습니다. 자신에게 의지하는 사람을 부담스러워합니다.',
        strengths: ['위기 상황에서도 감정에 휘둘리지 않는 냉철함', '자신의 일과 목표에 대한 높은 집중력'],
        weaknesses: ['상대의 감정적 요구를 무시하거나 회피함', '진정한 속마음을 털어놓는 것이 어려움'],
        advice: '가까워지는 것이 당신의 자유를 뺏는 것은 아닙니다. 작은 감정부터 조금씩 표현하는 연습을 통해 연결감을 경험해 보세요.',
    },
    {
        type: '공포회피형',
        color: 'purple',
        name: '공포회피형 (Fearful)',
        description:
            '타인과 가까워지고 싶어 하면서도 동시에 상처받는 것에 대한 두려움이 큽니다. 관계에서 다가가고 싶지만 도망치고 싶은 모순된 감정을 자주 느낍니다.',
        strengths: ['풍부한 공감 능력과 타인에 대한 깊은 이해력'],
        weaknesses: ['관계에 대한 극심한 혼란과 감정 기복', '타인을 신뢰하는 데 매우 긴 시간이 걸림'],
        advice: '상처받는 것에 대한 두려움을 인정하되, 안전한 사람과 천천히 신뢰를 쌓아가는 경험을 반복하는 것이 치유의 핵심입니다.',
    },
];

export default function AttachmentResultsPage() {
    const params = useParams();
    const participantId = params?.id as string;

    const [results, setResults] = useState<ResultsState | null>(null);
    const [loading, setLoading] = useState(true);
    const [attachmentType, setAttachmentType] = useState('');
    const [showAnswerDetails, setShowAnswerDetails] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            const { data } = await supabase
                .from('attachment_tests')
                .select('answers')
                .eq('participant_id', participantId)
                .maybeSingle();

            if (!data?.answers) return setLoading(false);

            const answers = data.answers as Record<string, number>;

            let anxiety = 0;
            let avoidance = 0;

            attachmentQuestions.forEach((q) => {
                const val = answers[q.id];
                if (!val) return;
                const score = REVERSE_ITEMS.includes(q.num) ? 6 - val : val;
                if (q.num % 2 === 0) anxiety += score;
                else avoidance += score;
            });

            setResults({
                anxietyScore: anxiety,
                avoidanceScore: avoidance,
                allAnswers: answers,
            });

            const highA = anxiety >= 54;
            const highB = avoidance >= 54;

            if (!highA && !highB) setAttachmentType('안정형');
            else if (highA && !highB) setAttachmentType('불안형');
            else if (!highA && highB) setAttachmentType('거부회피형');
            else setAttachmentType('공포회피형');

            setLoading(false);
        };

        fetchResults();
    }, [participantId]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-200 rounded-full mb-4"></div>
                    <p className="text-slate-500 font-medium italic">당신의 데이터를 분석하고 있습니다...</p>
                </div>
            </div>
        );

    if (!results)
        return <p className="text-center mt-20 text-red-500 font-bold underline">데이터를 찾을 수 없습니다.</p>;

    const typeInfo = attachmentTypeData.find((t) => t.type === attachmentType);

    const chartData = {
        datasets: [
            {
                data: [{ x: results.avoidanceScore, y: results.anxietyScore }],
                backgroundColor: '#6366f1',
                pointRadius: 12,
                pointHoverRadius: 15,
                pointBorderColor: '#fff',
                pointBorderWidth: 4,
                pointShadowBlur: 10,
                pointShadowColor: 'rgba(0,0,0,0.3)',
            },
        ],
    };

    const chartOptions: ChartOptions<'scatter'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                callbacks: {
                    label: (ctx) => `회피 ${ctx.parsed.x} / 불안 ${ctx.parsed.y}`,
                },
            },
        },
        scales: {
            x: {
                min: 18,
                max: 90,
                title: { display: true, text: '회피성 수치 (Avoidance)', font: { weight: 'bold' } },
                grid: {
                    color: (ctx) => (ctx.tick?.value === 54 ? '#fca5a5' : '#f1f5f9'),
                    lineWidth: (ctx) => (ctx.tick?.value === 54 ? 2 : 1),
                },
            },
            y: {
                min: 18,
                max: 90,
                title: { display: true, text: '불안성 수치 (Anxiety)', font: { weight: 'bold' } },
                grid: {
                    color: (ctx) => (ctx.tick?.value === 54 ? '#fca5a5' : '#f1f5f9'),
                    lineWidth: (ctx) => (ctx.tick?.value === 54 ? 2 : 1),
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-[#fcfdfe] py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-indigo-100">
                        <ShieldCheck className="w-4 h-4" /> Comprehensive Analysis Report
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        애착 유형 분석 결과
                    </h1>
                    <div className="h-1.5 w-24 bg-indigo-500 rounded-full mb-6"></div>
                    <p className="text-slate-500 text-lg max-w-2xl text-center leading-relaxed">
                        답변하신 데이터를 바탕으로 귀하의 심리적 애착 지도를 생성했습니다.
                        <br />본 결과는 타인과의 관계에서 나타나는 고유한 패턴을 보여줍니다.
                    </p>
                </div>

                {/* Score Summary & Chart */}
                <div className="grid lg:grid-cols-5 gap-8 mb-12">
                    {/* Chart Card */}
                    <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center gap-2 mb-8">
                            <Activity className="w-5 h-5 text-indigo-500" />
                            <h3 className="text-xl font-bold text-slate-800">애착 사분면 그래프</h3>
                        </div>
                        <div className="h-[400px]">
                            <Scatter
                                data={chartData}
                                options={chartOptions}
                            />
                        </div>
                    </div>

                    {/* Result Summary Card */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-10 rounded-[2rem] shadow-xl flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Heart className="w-48 h-48" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-indigo-100 font-medium mb-2">당신의 주요 애착 유형은</p>
                            <h2 className="text-4xl font-black mb-10 leading-tight">{attachmentType}</h2>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-bold uppercase tracking-wider text-indigo-100">
                                        <span>회피성 지수 (Avoidance)</span>
                                        <span>{results.avoidanceScore} / 90</span>
                                    </div>
                                    <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div
                                            className="bg-white h-full transition-all duration-1000 ease-out"
                                            style={{ width: `${(results.avoidanceScore / 90) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-bold uppercase tracking-wider text-indigo-100">
                                        <span>불안성 지수 (Anxiety)</span>
                                        <span>{results.anxietyScore} / 90</span>
                                    </div>
                                    <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div
                                            className="bg-white h-full transition-all duration-1000 ease-out"
                                            style={{ width: `${(results.anxietyScore / 90) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="relative z-10 mt-8 text-sm text-indigo-200/80 italic font-light">
                            * 점수가 54점 이상일 경우 해당 경향성이 높다고 판단합니다.
                        </p>
                    </div>
                </div>

                {/* Detailed Analysis Section */}
                {typeInfo && (
                    <div className="space-y-8 mb-16">
                        {/* Description Card */}
                        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-indigo-100 p-2.5 rounded-xl">
                                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                                </span>
                                <h3 className="text-2xl font-black text-slate-800">{typeInfo.name}의 특징</h3>
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed">{typeInfo.description}</p>
                        </div>

                        {/* Pros and Cons */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100">
                                <h3 className="font-black text-emerald-700 mb-6 flex items-center gap-2 text-xl">
                                    <Heart className="w-6 h-6" /> 관계적 강점
                                </h3>
                                <ul className="space-y-4">
                                    {typeInfo.strengths.map((s, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-emerald-900/80 font-medium"
                                        >
                                            <span className="mt-1 w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-rose-50/50 p-8 rounded-[2rem] border border-rose-100">
                                <h3 className="font-black text-rose-700 mb-6 flex items-center gap-2 text-xl">
                                    <AlertCircle className="w-6 h-6" /> 주의 및 개선점
                                </h3>
                                <ul className="space-y-4">
                                    {typeInfo.weaknesses.map((w, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-rose-900/80 font-medium"
                                        >
                                            <span className="mt-1 w-2 h-2 bg-rose-400 rounded-full flex-shrink-0" />
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Growth Guide Card */}
                        <div className="bg-slate-900 p-10 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-3xl rounded-full"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                                <div className="p-4 bg-amber-400 rounded-2xl">
                                    <Lightbulb className="w-10 h-10 text-slate-900" />
                                </div>
                                <div>
                                    <h3 className="text-amber-400 font-black text-xl mb-3 uppercase tracking-wider">
                                        나를 위한 성장 가이드
                                    </h3>
                                    <p className="text-slate-300 text-lg leading-relaxed">{typeInfo.advice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex flex-col items-center">
                    <button
                        onClick={() => setShowAnswerDetails(!showAnswerDetails)}
                        className="group flex items-center gap-3 px-12 py-5 bg-white border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95"
                    >
                        {showAnswerDetails ? (
                            <>
                                답변 상세 내역 숨기기 <ChevronUp className="w-6 h-6" />
                            </>
                        ) : (
                            <>
                                문항별 응답 결과 보기{' '}
                                <ChevronDown className="w-6 h-6 transition-transform group-hover:translate-y-1" />
                            </>
                        )}
                    </button>

                    {showAnswerDetails && (
                        <div className="w-full mt-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 overflow-hidden">
                                <div className="mb-8 border-b border-slate-100 pb-6">
                                    <h3 className="text-2xl font-black text-slate-800 italic">Raw Data Analysis</h3>
                                    <p className="text-slate-400">각 질문에 대해 답변하신 점수 데이터입니다.</p>
                                </div>
                                <AnswerDetails
                                    allAnswers={results.allAnswers}
                                    questions={attachmentQuestions}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
