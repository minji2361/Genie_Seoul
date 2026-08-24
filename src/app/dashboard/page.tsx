'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getParticipants, deleteParticipant } from "@/app/api/supabaseApi";
import { brandColor } from "@/lib/brandcolor";

type Participant = {
    id: string;
    name: string;
    birth_date: string;
    stress: string;
    religion: string;
};

export default function Dashboard() {
    const [participant, setParticipant] = useState<Participant[]>([]);
    const [showList, setShowList] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (showList) fetchParticipant();
    }, [showList]);

    const fetchParticipant = async () => {
        const { data, error } = await getParticipants();
        if (error) {
            console.error(error);
        } else {
            setParticipant(data ?? []);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        const { error } = await deleteParticipant(id);
        if (error) {
            console.error('삭제 오류:', error.message);
            alert(error.message || '삭제에 실패했습니다.');
        } else {
            setParticipant((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const filteredParticipants = participant.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
                코칭 대상자 관리
            </h1>

            <section className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/dashboard/participant/new')}
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
                    코칭 대상자 추가하기
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
                            목록 숨기기
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
                            목록 보기
                        </>
                    )}
                </button>
            </section>

            {showList && (
                <>
                    <section className="mb-6">
                        <label
                            htmlFor="search"
                            className="block mb-2 font-semibold"
                        >
                            이름 검색
                        </label>
                        <input
                            id="search"
                            type="search"
                            placeholder="이름을 입력하세요..."
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
                        <table
                            className="w-full text-left"
                            style={{ color: brandColor.deepmoss }}
                        >
                            <thead
                                className="bg-gray-100"
                                style={{ backgroundColor: brandColor.enamel }}
                            >
                                <tr>
                                    <th className="py-3 px-5 text-sm font-semibold">이름</th>
                                    <th className="py-3 px-5 text-sm font-semibold hidden md:table-cell">생년월일</th>
                                    <th className="py-3 px-5 text-sm font-semibold hidden md:table-cell">
                                        스트레스 요인
                                    </th>
                                    <th className="py-3 px-5 text-sm font-semibold hidden md:table-cell">사는곳(동)</th>
                                    <th className="py-3 px-5 text-sm font-semibold text-center">관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredParticipants.length > 0 ? (
                                    filteredParticipants.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="border-t hover:bg-enamel transition-colors cursor-pointer"
                                            style={{ borderColor: brandColor.deepmoss }}
                                            onClick={() => router.push(`/dashboard/participant/${p.id}`)}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    router.push(`/dashboard/participant/${p.id}`);
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
                                            <td className="py-4 px-5 font-medium">{p.name}</td>
                                            <td className="py-4 px-5 hidden md:table-cell">{p.birth_date}</td>
                                            <td className="py-4 px-5 hidden md:table-cell">{p.stress}</td>
                                            <td className="py-4 px-5 hidden md:table-cell">{p.religion}</td>
                                            <td className="py-4 px-5 text-center flex justify-center gap-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/dashboard/participant/${p.id}`);
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
                                                    상세 보기
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(p.id);
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
                                                    삭제
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-6 text-gray-400"
                                        >
                                            검색된 대상자가 없습니다.
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
