'use client';

import { useEffect, useMemo, useState } from 'react';
import { deletePopupApplication, getPopupApplications, type PopupApplication } from '@/app/api/supabaseApi';
import { brandColor } from '@/lib/brandcolor';

type PopupApplicationsListProps = {
    /** 삭제 버튼 표시 여부 (관리자 계정만 true) */
    canDelete?: boolean;
};

const GENDER_LABEL: Record<string, string> = { M: '남', F: '여' };

function formatDateTime(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '-';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function PopupApplicationsList({ canDelete = false }: PopupApplicationsListProps) {
    const [items, setItems] = useState<PopupApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [popupFilter, setPopupFilter] = useState('all');

    useEffect(() => {
        (async () => {
            const { data, error: fetchError } = await getPopupApplications();
            if (fetchError) setError(fetchError.message);
            else setItems(data);
            setLoading(false);
        })();
    }, []);

    const popupTitles = useMemo(() => Array.from(new Set(items.map((item) => item.popup_title))), [items]);

    const filtered = items.filter(
        (item) =>
            (popupFilter === 'all' || item.popup_title === popupFilter) &&
            item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );

    const handleDelete = async (item: PopupApplication) => {
        if (!window.confirm(`${item.name}님의 신청 내역을 삭제하시겠습니까?`)) return;
        const { error: deleteError } = await deletePopupApplication(item.id);
        if (deleteError) {
            alert(deleteError.message);
            return;
        }
        setItems((prev) => prev.filter((x) => x.id !== item.id));
    };

    const controlStyle = {
        border: `1px solid ${brandColor.deepmoss}`,
        color: brandColor.deepmoss,
        backgroundColor: '#fff',
    };

    return (
        <section style={{ color: brandColor.deepmoss }}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <input
                    type="search"
                    placeholder="이름 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2.5 rounded-lg shadow-sm focus:outline-none"
                    style={controlStyle}
                />
                <select
                    value={popupFilter}
                    onChange={(e) => setPopupFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-lg shadow-sm focus:outline-none"
                    style={controlStyle}
                >
                    <option value="all">전체 팝업</option>
                    {popupTitles.map((title) => (
                        <option key={title} value={title}>
                            {title || '(제목 없음)'}
                        </option>
                    ))}
                </select>
                <span className="text-sm">
                    총 <strong>{filtered.length}</strong>건
                </span>
            </div>

            {error && (
                <p className="mb-4 text-sm" style={{ color: brandColor.orangeish }}>
                    {error}
                </p>
            )}

            <div className="overflow-x-auto rounded-lg shadow-lg border" style={{ borderColor: brandColor.deepmoss }}>
                <table className="w-full text-left whitespace-nowrap">
                    <thead style={{ backgroundColor: brandColor.enamel }}>
                        <tr>
                            <th className="py-3 px-4 text-sm font-semibold">신청일시</th>
                            <th className="py-3 px-4 text-sm font-semibold">이름</th>
                            <th className="py-3 px-4 text-sm font-semibold">나이</th>
                            <th className="py-3 px-4 text-sm font-semibold">성별</th>
                            <th className="py-3 px-4 text-sm font-semibold">거주지</th>
                            <th className="py-3 px-4 text-sm font-semibold">전화번호</th>
                            <th className="py-3 px-4 text-sm font-semibold">팝업</th>
                            {canDelete && <th className="py-3 px-4 text-sm font-semibold text-center">관리</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={canDelete ? 8 : 7} className="text-center py-6 text-gray-400">
                                    불러오는 중...
                                </td>
                            </tr>
                        ) : filtered.length > 0 ? (
                            filtered.map((item) => (
                                <tr key={item.id} className="border-t" style={{ borderColor: brandColor.deepmoss }}>
                                    <td className="py-3 px-4 text-sm">{formatDateTime(item.created_at)}</td>
                                    <td className="py-3 px-4 font-medium">{item.name}</td>
                                    <td className="py-3 px-4">{item.age}</td>
                                    <td className="py-3 px-4">{GENDER_LABEL[item.gender] ?? item.gender}</td>
                                    <td className="py-3 px-4">{item.region}</td>
                                    <td className="py-3 px-4">{item.phone}</td>
                                    <td className="py-3 px-4 text-sm">{item.popup_title || '-'}</td>
                                    {canDelete && (
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item)}
                                                className="px-3 py-1 rounded-md text-sm text-white"
                                                style={{ backgroundColor: brandColor.orangeish }}
                                            >
                                                삭제
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={canDelete ? 8 : 7} className="text-center py-6 text-gray-400">
                                    신청 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
