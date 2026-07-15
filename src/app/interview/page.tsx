'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteGenieInterview, getGenieInterviews, type GenieInterview } from '@/app/api/supabaseApi';
import { interviewLabels as t } from '@/app/interview/labels';
import { brandColor } from '@/lib/brandcolor';

export default function Interview() {
    const [interviews, setInterviews] = useState<GenieInterview[]>([]);
    const [showList, setShowList] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (showList) fetchInterviews();
    }, [showList]);

    const fetchInterviews = async () => {
        const { data, error } = await getGenieInterviews();
        if (error) {
            console.error(error);
        } else {
            setInterviews(data ?? []);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm(t.confirmDelete)) return;

        const { error } = await deleteGenieInterview(id);
        if (error) {
            console.error('?? ??:', error.message);
            alert(t.deleteFailed);
        } else {
            setInterviews((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const filteredInterviews = interviews.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const baseButtonStyle = {
        backgroundColor: brandColor.deepmoss,
        color: '#fff',
        border: '2px solid transparent',
    };

    const hoverButtonStyle = {
        backgroundColor: '#fff',
        color: brandColor.deepmoss,
        border: `2px solid ${brandColor.deepmoss}`,
    };

    const focusRingStyle = {
        boxShadow: `0 0 0 4px ${brandColor.orangeish}88`,
    };

    return (
        <main className="p-8 max-w-6xl mx-auto min-h-screen text-deepmoss">
            <h1
                className="text-4xl font-extrabold mb-8 pb-2 border-b-4"
                style={{ borderColor: brandColor.orangeish }}
            >
                {t.title}
            </h1>

            <section className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/interview/participant/new')}
                    className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-300 focus:outline-none"
                    style={baseButtonStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverButtonStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, baseButtonStyle)}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRingStyle.boxShadow)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={brandColor.orangeish}
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    {t.register}
                </button>

                <button
                    onClick={() => setShowList((prev) => !prev)}
                    className="inline-flex items-center gap-2 font-medium px-5 py-3 rounded-lg shadow-sm transition-colors duration-300 focus:outline-none"
                    aria-pressed={showList}
                    style={baseButtonStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverButtonStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, baseButtonStyle)}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = focusRingStyle.boxShadow)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                    {showList ? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={brandColor.orangeish}
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            {t.hideList}
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={brandColor.orangeish}
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                            {t.showList}
                        </>
                    )}
                </button>
            </section>

            {showList && (
                <>
                    <section className="mb-6">
                        <label htmlFor="search" className="block mb-2 font-semibold">
                            {t.search}
                        </label>
                        <input
                            id="search"
                            type="search"
                            placeholder={t.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md px-4 py-3 rounded-lg shadow-sm focus:outline-none transition"
                            style={{
                                border: `1px solid ${brandColor.deepmoss}`,
                                color: brandColor.deepmoss,
                                backgroundColor: brandColor.enamel,
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 0 3px ${brandColor.orangeish}88`;
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </section>

                    <section
                        className="overflow-x-auto rounded-lg shadow-lg border"
                        style={{ borderColor: brandColor.deepmoss }}
                    >
                        <table className="w-full text-left" style={{ color: brandColor.deepmoss }}>
                            <thead className="bg-gray-100" style={{ backgroundColor: brandColor.enamel }}>
                                <tr>
                                    <th className="py-3 px-5 text-sm font-semibold">{t.colName}</th>
                                    <th className="py-3 px-5 text-sm font-semibold hidden md:table-cell">{t.colAge}</th>
                                    <th className="py-3 px-5 text-sm font-semibold hidden md:table-cell">{t.colGender}</th>
                                    <th className="py-3 px-5 text-sm font-semibold hidden md:table-cell">{t.colMbti}</th>
                                    <th className="py-3 px-5 text-sm font-semibold hidden lg:table-cell">{t.colRegion}</th>
                                    <th className="py-3 px-5 text-sm font-semibold text-center">{t.colActions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInterviews.length > 0 ? (
                                    filteredInterviews.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t hover:bg-enamel transition-colors cursor-pointer"
                                            style={{ borderColor: brandColor.deepmoss }}
                                            onClick={() => router.push(`/interview/participant/${item.id}`)}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    router.push(`/interview/participant/${item.id}`);
                                                }
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                                                    brandColor.enamel;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '';
                                            }}
                                        >
                                            <td className="py-4 px-5 font-medium">{item.name}</td>
                                            <td className="py-4 px-5 hidden md:table-cell">{item.age}</td>
                                            <td className="py-4 px-5 hidden md:table-cell">{item.gender}</td>
                                            <td className="py-4 px-5 hidden md:table-cell">{item.mbti}</td>
                                            <td className="py-4 px-5 hidden lg:table-cell">{item.region}</td>
                                            <td className="py-4 px-5 text-center flex justify-center gap-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/interview/participant/${item.id}`);
                                                    }}
                                                    className="px-4 py-1 rounded-md text-sm transition"
                                                    style={baseButtonStyle}
                                                    onMouseEnter={(e) =>
                                                        Object.assign(e.currentTarget.style, hoverButtonStyle)
                                                    }
                                                    onMouseLeave={(e) =>
                                                        Object.assign(e.currentTarget.style, baseButtonStyle)
                                                    }
                                                    onFocus={(e) =>
                                                        (e.currentTarget.style.boxShadow = focusRingStyle.boxShadow)
                                                    }
                                                    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                                                >
                                                    {t.viewDetail}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/interview/participant/${item.id}/edit`);
                                                    }}
                                                    className="px-4 py-1 rounded-md text-sm transition"
                                                    style={baseButtonStyle}
                                                    onMouseEnter={(e) =>
                                                        Object.assign(e.currentTarget.style, hoverButtonStyle)
                                                    }
                                                    onMouseLeave={(e) =>
                                                        Object.assign(e.currentTarget.style, baseButtonStyle)
                                                    }
                                                    onFocus={(e) =>
                                                        (e.currentTarget.style.boxShadow = focusRingStyle.boxShadow)
                                                    }
                                                    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                                                >
                                                    {t.edit}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(item.id);
                                                    }}
                                                    className="px-4 py-1 rounded-md text-sm transition"
                                                    style={{
                                                        backgroundColor: brandColor.orangeish,
                                                        color: '#fff',
                                                        border: '2px solid transparent',
                                                    }}
                                                    onMouseEnter={(e) =>
                                                        Object.assign(e.currentTarget.style, {
                                                            backgroundColor: '#fff',
                                                            color: brandColor.orangeish,
                                                            border: `2px solid ${brandColor.orangeish}`,
                                                        })
                                                    }
                                                    onMouseLeave={(e) =>
                                                        Object.assign(e.currentTarget.style, {
                                                            backgroundColor: brandColor.orangeish,
                                                            color: '#fff',
                                                            border: '2px solid transparent',
                                                        })
                                                    }
                                                    onFocus={(e) =>
                                                        (e.currentTarget.style.boxShadow = focusRingStyle.boxShadow)
                                                    }
                                                    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                                                >
                                                    {t.delete}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6 text-gray-400">
                                            {t.emptyResult}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </>
            )}
        </main>
    );
}
