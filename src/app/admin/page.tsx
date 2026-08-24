'use client';

import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
    deleteAdminRecords,
    getAdminInterviews,
    getAdminParticipants,
    updateAdminInterviewRetain,
    updateAdminParticipantRetain,
    type AdminInterview,
    type AdminParticipant,
} from '@/app/api/supabaseApi';
import { useAuth } from '@/app/context/AuthContext';
import { brandColor } from '@/lib/brandcolor';

type RecordType = 'interview' | 'dashboard';
type PeriodBucket = '1주' | '2주' | '3주' | '그외';
type TypeFilter = 'all' | RecordType;
type PeriodFilter = 'all' | PeriodBucket;

type UnifiedRecord = {
    id: string;
    type: RecordType;
    name: string;
    counselorName: string;
    createdAt: string;
    retain: boolean;
    detail: { label: string; value: string }[];
};

const TYPE_LABEL: Record<RecordType, string> = {
    interview: '인터뷰',
    dashboard: '대시보드',
};

function getElapsedDays(createdAt: string): number {
    const created = new Date(createdAt).getTime();
    if (Number.isNaN(created)) return 0;
    return Math.max(0, Math.floor((Date.now() - created) / (24 * 60 * 60 * 1000)));
}

function getPeriodBucket(days: number): PeriodBucket {
    if (days <= 7) return '1주';
    if (days <= 14) return '2주';
    if (days <= 21) return '3주';
    return '그외';
}

function recordKey(record: Pick<UnifiedRecord, 'type' | 'id'>): string {
    return `${record.type}:${record.id}`;
}

function toUnifiedRecords(interviews: AdminInterview[], participants: AdminParticipant[]): UnifiedRecord[] {
    const fromInterviews: UnifiedRecord[] = interviews.map((item) => ({
        id: item.id,
        type: 'interview',
        name: item.name,
        counselorName: item.counselor_name,
        createdAt: item.created_at,
        retain: Boolean(item.retain),
        detail: [
            { label: '나이', value: item.age },
            { label: '성별', value: item.gender },
            { label: 'MBTI', value: item.mbti },
            { label: '지역', value: item.region },
        ],
    }));

    const fromParticipants: UnifiedRecord[] = participants.map((p) => ({
        id: p.id,
        type: 'dashboard',
        name: p.name,
        counselorName: p.counselor_name,
        createdAt: p.created_at,
        retain: Boolean(p.retain),
        detail: [
            { label: '생년월일', value: p.birth_date },
            { label: '스트레스 요인', value: p.stress },
            { label: '사는곳(동)', value: p.religion },
        ],
    }));

    return [...fromInterviews, ...fromParticipants].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export default function AdminPage() {
    const { isAuthenticated, role } = useAuth();

    const [interviews, setInterviews] = useState<AdminInterview[]>([]);
    const [participants, setParticipants] = useState<AdminParticipant[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
    const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [confirmStage, setConfirmStage] = useState<0 | 1 | 2>(0);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        setError(null);

        const [interviewsResult, participantsResult] = await Promise.all([
            getAdminInterviews(),
            getAdminParticipants(),
        ]);

        if (interviewsResult.error || participantsResult.error) {
            setError(interviewsResult.error?.message ?? participantsResult.error?.message ?? '목록을 불러오지 못했습니다.');
        } else {
            setInterviews(interviewsResult.data);
            setParticipants(participantsResult.data);
            setLoaded(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!isAuthenticated || role !== 'admin' || loaded) return;
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, role, loaded]);

    const handleToggleRetain = async (record: UnifiedRecord) => {
        const nextRetain = !record.retain;
        setTogglingId(record.id);

        const { error: toggleError } =
            record.type === 'interview'
                ? await updateAdminInterviewRetain(record.id, nextRetain)
                : await updateAdminParticipantRetain(record.id, nextRetain);

        if (toggleError) {
            alert(toggleError.message);
        } else if (record.type === 'interview') {
            setInterviews((prev) =>
                prev.map((item) => (item.id === record.id ? { ...item, retain: nextRetain } : item)),
            );
        } else {
            setParticipants((prev) =>
                prev.map((p) => (p.id === record.id ? { ...p, retain: nextRetain } : p)),
            );
        }

        setTogglingId(null);
    };

    const records = useMemo(() => toUnifiedRecords(interviews, participants), [interviews, participants]);

    const filteredRecords = useMemo(() => {
        return records.filter((record) => {
            if (typeFilter !== 'all' && record.type !== typeFilter) return false;
            if (periodFilter !== 'all' && getPeriodBucket(getElapsedDays(record.createdAt)) !== periodFilter) {
                return false;
            }
            if (searchTerm && !record.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });
    }, [records, typeFilter, periodFilter, searchTerm]);

    const selectableFilteredRecords = useMemo(
        () => filteredRecords.filter((r) => !r.retain),
        [filteredRecords],
    );
    const allFilteredSelected =
        selectableFilteredRecords.length > 0 &&
        selectableFilteredRecords.every((r) => selectedKeys.has(recordKey(r)));

    const toggleSelected = (record: UnifiedRecord) => {
        if (record.retain) return;
        const key = recordKey(record);
        setSelectedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const toggleSelectAllFiltered = () => {
        setSelectedKeys((prev) => {
            const next = new Set(prev);
            if (allFilteredSelected) {
                selectableFilteredRecords.forEach((r) => next.delete(recordKey(r)));
            } else {
                selectableFilteredRecords.forEach((r) => next.add(recordKey(r)));
            }
            return next;
        });
    };

    const selectOverdueForBulkDelete = () => {
        const overdue = records.filter((r) => !r.retain && getPeriodBucket(getElapsedDays(r.createdAt)) === '그외');
        setSelectedKeys(new Set(overdue.map(recordKey)));
        setDeleteError(null);
        setDeleteNotice(null);
        setConfirmStage(overdue.length > 0 ? 1 : 0);
    };

    const selectedRecords = useMemo(
        () => records.filter((r) => selectedKeys.has(recordKey(r))),
        [records, selectedKeys],
    );

    const handleConfirmDelete = async () => {
        setDeleting(true);
        setDeleteError(null);

        const participantIds = selectedRecords.filter((r) => r.type === 'dashboard').map((r) => r.id);
        const interviewIds = selectedRecords.filter((r) => r.type === 'interview').map((r) => r.id);

        const { data, error: deleteErrorResult } = await deleteAdminRecords(participantIds, interviewIds);

        setDeleting(false);

        if (deleteErrorResult || !data) {
            setDeleteError(deleteErrorResult?.message ?? '삭제에 실패했습니다.');
            return;
        }

        setSelectedKeys(new Set());
        setConfirmStage(0);

        const parts = [`대시보드 ${data.deletedParticipants}건`, `인터뷰 ${data.deletedInterviews}건`];
        if (data.skippedRetainCount > 0) parts.push(`보관 처리로 제외됨 ${data.skippedRetainCount}건`);
        setDeleteNotice(`삭제 완료: ${parts.join(', ')}`);

        await fetchAll();
    };

    if (!isAuthenticated || role !== 'admin') {
        return null;
    }

    const selectStyle = {
        border: `1px solid ${brandColor.deepmoss}`,
        color: brandColor.deepmoss,
        backgroundColor: '#fff',
    };

    return (
        <main className="p-8 max-w-6xl mx-auto min-h-screen text-deepmoss">
            <div className="flex items-center justify-between mb-8 pb-2 border-b-4" style={{ borderColor: brandColor.orangeish }}>
                <h1 className="text-4xl font-extrabold">관리자</h1>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium hover:underline" style={{ color: brandColor.deepmoss }}>
                        홈으로
                    </Link>
                    <Link href="/admin/popup" className="text-sm font-medium hover:underline" style={{ color: brandColor.deepmoss }}>
                        팝업 관리 →
                    </Link>
                </div>
            </div>

            <section className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
                        className="px-4 py-2.5 rounded-lg shadow-sm focus:outline-none"
                        style={selectStyle}
                    >
                        <option value="all">전체</option>
                        <option value="interview">인터뷰</option>
                        <option value="dashboard">대시보드</option>
                    </select>

                    <select
                        value={periodFilter}
                        onChange={(e) => setPeriodFilter(e.target.value as PeriodFilter)}
                        className="px-4 py-2.5 rounded-lg shadow-sm focus:outline-none"
                        style={selectStyle}
                    >
                        <option value="all">전체 기간</option>
                        <option value="1주">1주 이내</option>
                        <option value="2주">2주 이내</option>
                        <option value="3주">3주 이내</option>
                        <option value="그외">그외 (3주 초과)</option>
                    </select>

                    <input
                        type="search"
                        placeholder="이름을 입력하세요..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2.5 rounded-lg shadow-sm focus:outline-none"
                        style={{
                            border: `1px solid ${brandColor.deepmoss}`,
                            color: brandColor.deepmoss,
                            backgroundColor: brandColor.enamel,
                        }}
                    />
                </div>

                <button
                    onClick={fetchAll}
                    disabled={loading}
                    className="px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
                    style={{ backgroundColor: brandColor.deepmoss, color: '#fff', border: '2px solid transparent' }}
                >
                    {loading ? '불러오는 중...' : '새로고침'}
                </button>
            </section>

            {error && (
                <p className="mb-6 text-sm" style={{ color: brandColor.orangeish }}>
                    {error}
                </p>
            )}
            {deleteNotice && (
                <p className="mb-6 text-sm" style={{ color: brandColor.deepmoss }}>
                    {deleteNotice}
                </p>
            )}

            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm" style={{ color: brandColor.deepmoss }}>
                    총 {filteredRecords.length}건 {selectedKeys.size > 0 && `· ${selectedKeys.size}건 선택됨`}
                </p>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setDeleteError(null);
                            setDeleteNotice(null);
                            setConfirmStage(1);
                        }}
                        disabled={selectedKeys.size === 0}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
                        style={{ backgroundColor: brandColor.orangeish, color: brandColor.deepmoss, border: '1px solid transparent' }}
                    >
                        선택 삭제
                    </button>
                    <button
                        type="button"
                        onClick={selectOverdueForBulkDelete}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        style={{ backgroundColor: '#fff', color: brandColor.deepmoss, border: `1px solid ${brandColor.deepmoss}` }}
                    >
                        3주 초과 일괄삭제
                    </button>
                </div>
            </div>

            <section
                className="overflow-x-auto rounded-lg shadow-lg border"
                style={{ borderColor: brandColor.deepmoss }}
            >
                <table className="w-full text-left" style={{ color: brandColor.deepmoss }}>
                    <thead className="bg-gray-100" style={{ backgroundColor: brandColor.enamel }}>
                        <tr>
                            <th className="py-3 px-5">
                                <input
                                    type="checkbox"
                                    checked={allFilteredSelected}
                                    onChange={toggleSelectAllFiltered}
                                    disabled={selectableFilteredRecords.length === 0}
                                    aria-label="전체 선택"
                                />
                            </th>
                            <th className="py-3 px-5 text-sm font-semibold">구분</th>
                            <th className="py-3 px-5 text-sm font-semibold">이름</th>
                            <th className="py-3 px-5 text-sm font-semibold">담당 코치</th>
                            <th className="py-3 px-5 text-sm font-semibold hidden md:table-cell">등록일</th>
                            <th className="py-3 px-5 text-sm font-semibold">경과일</th>
                            <th className="py-3 px-5 text-sm font-semibold">보관</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map((record) => {
                                const days = getElapsedDays(record.createdAt);
                                const isOverdue = days > 21;
                                const isExpanded = expandedId === record.id;

                                return (
                                    <Fragment key={record.id}>
                                        <tr
                                            onClick={() => setExpandedId(isExpanded ? null : record.id)}
                                            className="border-t cursor-pointer hover:bg-black/5"
                                            style={{ borderColor: brandColor.deepmoss }}
                                        >
                                            <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedKeys.has(recordKey(record))}
                                                    onChange={() => toggleSelected(record)}
                                                    disabled={record.retain}
                                                    aria-label={`${record.name} 선택`}
                                                />
                                            </td>
                                            <td className="py-4 px-5">
                                                <span
                                                    className="px-2 py-1 rounded-full text-xs font-semibold"
                                                    style={{
                                                        backgroundColor: brandColor.enamel,
                                                        color: brandColor.deepmoss,
                                                    }}
                                                >
                                                    {TYPE_LABEL[record.type]}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5 font-medium">{record.name}</td>
                                            <td className="py-4 px-5">{record.counselorName}</td>
                                            <td className="py-4 px-5 hidden md:table-cell">
                                                {record.createdAt.slice(0, 10)}
                                            </td>
                                            <td
                                                className="py-4 px-5 font-medium"
                                                style={{ color: isOverdue ? brandColor.orangeish : undefined }}
                                            >
                                                {days}일
                                            </td>
                                            <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleRetain(record)}
                                                    disabled={togglingId === record.id}
                                                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors disabled:opacity-50"
                                                    style={
                                                        record.retain
                                                            ? {
                                                                  backgroundColor: '#fff',
                                                                  color: brandColor.deepmoss,
                                                                  border: `1px solid ${brandColor.deepmoss}`,
                                                              }
                                                            : {
                                                                  backgroundColor: brandColor.deepmoss,
                                                                  color: '#fff',
                                                                  border: '1px solid transparent',
                                                              }
                                                    }
                                                >
                                                    {togglingId === record.id
                                                        ? '처리 중...'
                                                        : record.retain
                                                          ? '보관 취소'
                                                          : '보관'}
                                                </button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr style={{ backgroundColor: brandColor.enamel }}>
                                                <td colSpan={7} className="px-5 py-4">
                                                    <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                                                        {record.detail.map((d) => (
                                                            <div key={d.label}>
                                                                <dt className="text-xs text-gray-500">{d.label}</dt>
                                                                <dd className="font-medium">{d.value || '-'}</dd>
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-400">
                                    {loading ? '불러오는 중...' : '조회된 데이터가 없습니다.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {confirmStage > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" style={{ color: brandColor.deepmoss }}>
                        {confirmStage === 1 ? (
                            <>
                                <h2 className="mb-2 text-lg font-bold">선택한 항목을 삭제할까요?</h2>
                                <p className="mb-4 text-sm">
                                    인터뷰 {selectedRecords.filter((r) => r.type === 'interview').length}건, 대시보드{' '}
                                    {selectedRecords.filter((r) => r.type === 'dashboard').length}건, 총{' '}
                                    {selectedRecords.length}건을 삭제합니다. 서명 파일도 함께 삭제되며 되돌릴 수 없습니다.
                                </p>
                                <ul className="mb-5 max-h-48 overflow-y-auto rounded-lg border text-sm" style={{ borderColor: brandColor.deepmoss }}>
                                    {selectedRecords.map((r) => (
                                        <li key={recordKey(r)} className="border-b px-3 py-2 last:border-b-0" style={{ borderColor: brandColor.enamel }}>
                                            <span className="mr-2 text-xs opacity-70">[{TYPE_LABEL[r.type]}]</span>
                                            {r.name}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setConfirmStage(0)}
                                        className="px-4 py-2 rounded-lg text-sm font-medium"
                                        style={{ border: `1px solid ${brandColor.deepmoss}` }}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setConfirmStage(2)}
                                        className="px-4 py-2 rounded-lg text-sm font-semibold"
                                        style={{ backgroundColor: brandColor.deepmoss, color: '#fff' }}
                                    >
                                        다음
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="mb-2 text-lg font-bold" style={{ color: brandColor.orangeish }}>
                                    정말 삭제하시겠습니까?
                                </h2>
                                <p className="mb-5 text-sm">
                                    총 {selectedRecords.length}건이 완전히 삭제되며 되돌릴 수 없습니다.
                                </p>
                                {deleteError && (
                                    <p className="mb-4 text-sm" style={{ color: brandColor.orangeish }}>
                                        {deleteError}
                                    </p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setConfirmStage(0)}
                                        disabled={deleting}
                                        className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                                        style={{ border: `1px solid ${brandColor.deepmoss}` }}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleConfirmDelete}
                                        disabled={deleting}
                                        className="px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                                        style={{ backgroundColor: brandColor.orangeish, color: brandColor.deepmoss }}
                                    >
                                        {deleting ? '삭제 중...' : '삭제'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
