'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'genie-home-popup-hide-until';

/** 관리자 화면에서 설정하지 않았을 때 쓰는 기본값 */
const DEFAULT_POPUP = {
    imageSrc: '/Perfume_poster.jpg',
    imageAlt: '팝업 이미지',
    title: '',
    description: [] as string[],
};

type HomePopupConfig = {
    title: string;
    description: string[];
    image_url: string | null;
    is_active: boolean;
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
    const [config, setConfig] = useState<HomePopupConfig | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetch('/api/popup')
            .then((res) => res.json())
            .then((json) => {
                if (cancelled) return;
                const data = json?.data as HomePopupConfig | null | undefined;
                setConfig(data ?? null);
                if (data?.is_active && !isHiddenForToday()) setOpen(true);
            })
            .catch(() => {
                // 팝업 설정을 못 불러오면 그냥 띄우지 않는다
            });

        return () => {
            cancelled = true;
        };
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

    if (!open || !config) return null;

    const close = () => setOpen(false);

    const closeForToday = () => {
        hideForToday();
        setOpen(false);
    };

    const imageSrc = config.image_url || DEFAULT_POPUP.imageSrc;
    const title = config.title || DEFAULT_POPUP.title;
    const description = config.description.length > 0 ? config.description : DEFAULT_POPUP.description;

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
                            src={imageSrc}
                            alt={title || DEFAULT_POPUP.imageAlt}
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
                    {title && (
                        <h2
                            id="home-popup-title"
                            className="text-lg font-semibold tracking-wide text-white sm:text-xl"
                        >
                            {title}
                        </h2>
                    )}
                    <p className="mt-2 text-sm font-light leading-relaxed text-white/80 sm:text-[15px]">
                        {description.map((line, i) => (
                            <span key={`${i}-${line}`} className="block">
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
