'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'genie-home-popup-hide-until';

/** 나중에 이미지·문구로 교체하세요 */
const POPUP = {
    imageSrc: '/Perfume_poster.jpg',
    imageAlt: '향수 팝업 포스터',
    title: '취\'향\'저격',
    description: ['향으로 알아보는', '나만의 성향과 방향성', '7월 25일(토) 13:00 ~ 18:00'],
};
function isHiddenForToday(): boolean {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        return Date.now() < Number(raw);
    } catch {
        return false;
    }
}

function hideForToday() {
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    try {
        localStorage.setItem(STORAGE_KEY, String(endOfToday.getTime()));
    } catch {
        // ignore
    }
}

export function HomePopup() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!isHiddenForToday()) setOpen(true);
    }, []);

    useEffect(() => {
        if (!open) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    if (!open) return null;

    const close = () => setOpen(false);

    const closeForToday = () => {
        hideForToday();
        setOpen(false);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-popup-title"
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-label="팝업 닫기"
                onClick={close}
            />

            <div
                className="
          pointer-events-auto
          relative z-10 w-full max-w-[440px] overflow-hidden
          rounded-3xl
          border border-white/10
          bg-[#0b0b0b]/90 backdrop-blur-xl
          shadow-[0_25px_80px_rgba(0,0,0,0.65)]
        "
            >
                <div className="relative w-full bg-black">
                    <div className="relative w-full aspect-[3/4] max-h-[68vh] bg-neutral-900">
                        <Image
                            src={POPUP.imageSrc}
                            alt={POPUP.imageAlt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 92vw, 440px"
                            priority
                        />
                    </div>

                    <button
                        type="button"
                        onClick={close}
                        className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition hover:bg-black/70"
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                <div className="px-5 pb-5 pt-4 text-center sm:px-6 sm:pb-6">
                    <h2
                        id="home-popup-title"
                        className="text-lg font-semibold tracking-wide text-white sm:text-xl"
                    >
                        취&apos;향&apos;저격
                    </h2>
                    <p className="mt-2 text-sm font-light leading-relaxed text-white/80 sm:text-[15px]">
                        {POPUP.description.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </p>

                    <button
                        type="button"
                        onClick={closeForToday}
                        className="mt-4 w-full text-xs text-white/50 transition hover:text-white/80"
                    >
                        오늘 하루 보지 않기
                    </button>
                </div>
            </div>
        </div>
    );
}
