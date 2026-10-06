'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { useAuth } from '@/app/context/AuthContext';
import { brandColor } from '@/lib/brandcolor';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type TypeFilter = 'all' | 'adult' | 'college' | 'legacy';
type DimensionKey = 'age' | 'gender' | 'mbti';
type SurveyKey = 'event_types' | 'meeting_times' | 'oneday_classes' | 'clubs';

type Count = { label: string; count: number };
type CrosstabRow = { group: string; n: number; counts: number[] };

type Stats = {
    type: TypeFilter;
    total: number;
    typeCounts: { adult: number; college: number; legacy: number };
    surveyLabels: Record<SurveyKey, string>;
    distribution: Record<DimensionKey, Count[]>;
    totals: Record<SurveyKey, Count[]>;
    crosstab: Record<DimensionKey, Record<SurveyKey, { options: string[]; rows: CrosstabRow[] }>>;
};

const TYPE_TABS: { key: TypeFilter; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'adult', label: '성인' },
    { key: 'college', label: '대학생' },
    { key: 'legacy', label: '기타(구 인터뷰지)' },
];

const DIMENSIONS: { key: DimensionKey; label: string }[] = [
    { key: 'age', label: '나이대' },
    { key: 'gender', label: '성별' },
    { key: 'mbti', label: 'MBTI' },
];

const SURVEY_KEYS: SurveyKey[] = ['event_types', 'meeting_times', 'oneday_classes', 'clubs'];

function barOptions(horizontal = false) {
    return {
        indexAxis: horizontal ? ('y' as const) : ('x' as const),
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { [horizontal ? 'x' : 'y']: { beginAtZero: true, ticks: { precision: 0 } } },
    };
}

function DistributionChart({ title, data }: { title: string; data: Count[] }) {
    const visible = data.filter((d) => d.count > 0);
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-bold">{title}</h3>
            {visible.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">데이터 없음</p>
            ) : (
                <div className="h-56">
                    <Bar
                        data={{
                            labels: visible.map((d) => d.label),
                            datasets: [{ data: visible.map((d) => d.count), backgroundColor: brandColor.primary }],
                        }}
                        options={barOptions()}
                    />
                </div>
            )}
        </div>
    );
}

export default function AdminStatsPage() {
    const { isAuthenticated, role } = useAuth();
    const [type, setType] = useState<TypeFilter>('all');
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dimension, setDimension] = useState<DimensionKey>('age');
    const [survey, setSurvey] = useState<SurveyKey>('oneday_classes');

    useEffect(() => {
        if (!isAuthenticated || role !== 'admin') return;
        let cancelled = false;
        setLoading(true);
        setError(null);
        fetch(`/api/admin/stats?type=${type}`, { credentials: 'include' })
            .then(async (res) => {
                const json = await res.json().catch(() => ({}));
                if (cancelled) return;
                if (!res.ok) setError(json.error ?? '통계를 불러오지 못했습니다.');
                else setStats(json.data as Stats);
            })
            .catch(() => !cancelled && setError('통계를 불러오지 못했습니다.'))
            .finally(() => !cancelled && setLoading(false));
        return () => {
            cancelled = true;
        };
    }, [isAuthenticated, role, type]);

    if (!isAuthenticated || role !== 'admin') return null;

    const cross = stats?.crosstab[dimension][survey];
    const maxCell = Math.max(1, ...(cross?.rows.flatMap((r) => r.counts) ?? [1]));

    return (
        <main className="p-8 max-w-6xl mx-auto min-h-screen text-deepmoss">
            <div
                className="flex items-center justify-between mb-8 pb-2 border-b-4"
                style={{ borderColor: brandColor.orangeish }}
            >
                <h1 className="text-4xl font-extrabold">신청 통계</h1>
                <Link href="/admin" className="text-sm font-medium hover:underline">
                    ← 관리자
                </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
                {TYPE_TABS.map((tab) => {
                    const active = type === tab.key;
                    const count =
                        stats && tab.key !== 'all' ? ` (${stats.typeCounts[tab.key]})` : '';
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setType(tab.key)}
                            className="rounded-full border px-4 py-1.5 text-sm font-semibold"
                            style={{
                                borderColor: brandColor.deepmoss,
                                backgroundColor: active ? brandColor.deepmoss : '#fff',
                                color: active ? '#fff' : brandColor.deepmoss,
                            }}
                        >
                            {tab.label}
                            {count}
                        </button>
                    );
                })}
                {stats && <span className="ml-2 text-sm text-gray-500">응답 {stats.total}건</span>}
            </div>

            {error && <p className="mb-4 text-red-600">{error}</p>}
            {loading && !stats && <p>불러오는 중...</p>}

            {stats && (
                <div className={loading ? 'opacity-50' : ''}>
                    <section className="mb-10">
                        <h2 className="mb-3 text-xl font-bold">신청자 구성</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <DistributionChart title="나이대" data={stats.distribution.age} />
                            <DistributionChart title="성별" data={stats.distribution.gender} />
                            <DistributionChart title="MBTI" data={stats.distribution.mbti} />
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-3 text-xl font-bold">전체 신청 현황</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {SURVEY_KEYS.map((k) => (
                                <div key={k} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                    <h3 className="mb-3 text-sm font-bold">{stats.surveyLabels[k]}</h3>
                                    <div style={{ height: Math.max(120, stats.totals[k].length * 32) }}>
                                        <Bar
                                            data={{
                                                labels: stats.totals[k].map((d) => d.label),
                                                datasets: [
                                                    {
                                                        data: stats.totals[k].map((d) => d.count),
                                                        backgroundColor: brandColor.primary,
                                                    },
                                                ],
                                            }}
                                            options={barOptions(true)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="mb-3 text-xl font-bold">교차 분석</h2>
                        <div className="mb-4 flex flex-wrap gap-3">
                            <label className="text-sm">
                                기준{' '}
                                <select
                                    value={dimension}
                                    onChange={(e) => setDimension(e.target.value as DimensionKey)}
                                    className="rounded-md border px-2 py-1"
                                    style={{ borderColor: brandColor.deepmoss }}
                                >
                                    {DIMENSIONS.map((d) => (
                                        <option key={d.key} value={d.key}>
                                            {d.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="text-sm">
                                신청 항목{' '}
                                <select
                                    value={survey}
                                    onChange={(e) => setSurvey(e.target.value as SurveyKey)}
                                    className="rounded-md border px-2 py-1"
                                    style={{ borderColor: brandColor.deepmoss }}
                                >
                                    {SURVEY_KEYS.map((k) => (
                                        <option key={k} value={k}>
                                            {stats.surveyLabels[k]}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {cross && cross.rows.length > 0 ? (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-left">
                                            <th className="px-3 py-2">{DIMENSIONS.find((d) => d.key === dimension)?.label}</th>
                                            <th className="px-3 py-2">인원</th>
                                            {cross.options.map((opt) => (
                                                <th key={opt} className="px-3 py-2 text-center">
                                                    {opt}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cross.rows.map((row) => (
                                            <tr key={row.group} className="border-b border-gray-100">
                                                <td className="px-3 py-2 font-semibold">{row.group}</td>
                                                <td className="px-3 py-2">{row.n}</td>
                                                {row.counts.map((c, i) => (
                                                    <td
                                                        key={cross.options[i]}
                                                        className="px-3 py-2 text-center"
                                                        style={{
                                                            backgroundColor: c
                                                                ? `rgba(93, 41, 214, ${0.1 + 0.6 * (c / maxCell)})`
                                                                : undefined,
                                                            color: c / maxCell > 0.6 ? '#fff' : undefined,
                                                        }}
                                                    >
                                                        {c || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">데이터가 없습니다.</p>
                        )}
                        <p className="mt-2 text-xs text-gray-500">중복 선택이 가능한 항목이라 행의 합이 인원보다 클 수 있습니다.</p>
                    </section>
                </div>
            )}
        </main>
    );
}
