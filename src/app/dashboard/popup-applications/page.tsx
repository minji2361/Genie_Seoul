'use client';

import Link from 'next/link';
import { PopupApplicationsList } from '@/components/PopupApplicationsList';
import { brandColor } from '@/lib/brandcolor';

export default function PopupApplicationsPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen text-deepmoss">
            <div
                className="flex items-center justify-between mb-8 pb-2 border-b-4"
                style={{ borderColor: brandColor.orangeish }}
            >
                <h1 className="text-4xl font-extrabold">팝업 신청자 목록</h1>
                <div className="flex items-center gap-4 text-sm font-medium">
                    <Link href="/dashboard" className="hover:underline" style={{ color: brandColor.deepmoss }}>
                        대시보드
                    </Link>
                    <Link href="/interview" className="hover:underline" style={{ color: brandColor.deepmoss }}>
                        인터뷰
                    </Link>
                </div>
            </div>
            <PopupApplicationsList />
        </div>
    );
}
