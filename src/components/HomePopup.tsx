'use client';

import Image from 'next/image';
import { useEffect, useState, type FormEvent } from 'react';
import { AGE_OPTIONS, GENDER_OPTIONS } from '@/app/interview/collegeFormConfig';

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
    content_type: 'text' | 'link';
    link_url: string | null;
    apply_enabled?: boolean;
};

const INITIAL_APPLY_FORM = { name: '', age: '', gender: '', region: '', phone: '', website: '' };

/** 숫자만 입력해도 000-0000-0000 형태로 맞춰 준다 */
function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const fieldClass =
    'w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none';

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
    const [applyOpen, setApplyOpen] = useState(false);
    const [applyForm, setApplyForm] = useState(INITIAL_APPLY_FORM);
    const [applying, setApplying] = useState(false);
    const [applyError, setApplyError] = useState<string | null>(null);
    const [applied, setApplied] = useState(false);

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

    const handleApply = async (e: FormEvent) => {
        e.preventDefault();
        if (applying) return;

        const { name, age, gender, region, phone } = applyForm;
        if (!name.trim() || !age || !gender || !region.trim() || !phone) {
            setApplyError('모든 항목을 입력해 주세요.');
            return;
        }
        if (!/^\d{3}-\d{4}-\d{4}$/.test(phone)) {
            setApplyError('전화번호는 000-0000-0000 형식으로 입력해 주세요.');
            return;
        }

        setApplying(true);
        setApplyError(null);
        try {
            const res = await fetch('/api/popup/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applyForm),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                setApplyError(json.error ?? '신청에 실패했습니다. 잠시 후 다시 시도해 주세요.');
                return;
            }
            setApplied(true);
            setApplyForm(INITIAL_APPLY_FORM);
        } catch {
            setApplyError('신청에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        } finally {
            setApplying(false);
        }
    };

    const setApplyField = (key: keyof typeof INITIAL_APPLY_FORM, value: string) =>
        setApplyForm((prev) => ({ ...prev, [key]: value }));

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
          relative z-10 w-full max-w-[440px] max-h-[92vh] overflow-y-auto overscroll-contain
          [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.28)_transparent]
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:my-4 [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25
          [&::-webkit-scrollbar-thumb:hover]:bg-white/40
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
                    {config.content_type === 'link' && config.link_url ? (
                        <a
                            href={config.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-sm font-light leading-relaxed text-white/80 underline underline-offset-4 transition hover:text-white sm:text-[15px]"
                        >
                            {description.map((line, i) => (
                                <span key={`${i}-${line}`} className="block">
                                    {line}
                                </span>
                            ))}
                        </a>
                    ) : (
                        <p className="mt-2 text-sm font-light leading-relaxed text-white/80 sm:text-[15px]">
                            {description.map((line, i) => (
                                <span key={`${i}-${line}`} className="block">
                                    {line}
                                </span>
                            ))}
                        </p>
                    )}

                    {config.apply_enabled && (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => setApplyOpen((prev) => !prev)}
                                aria-expanded={applyOpen}
                                className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                            >
                                신청하기
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-out ${
                                    applyOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    {applied ? (
                                        <p className="rounded-xl bg-white/10 px-4 py-5 text-sm text-white">
                                            신청이 완료되었습니다. 감사합니다!
                                        </p>
                                    ) : (
                                        <form onSubmit={handleApply} className="space-y-3 text-left" noValidate>
                                            <input
                                                type="text"
                                                value={applyForm.name}
                                                onChange={(e) => setApplyField('name', e.target.value)}
                                                placeholder="이름"
                                                maxLength={30}
                                                aria-label="이름"
                                                className={fieldClass}
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <select
                                                    value={applyForm.age}
                                                    onChange={(e) => setApplyField('age', e.target.value)}
                                                    aria-label="나이"
                                                    className={`${fieldClass} [&>option]:text-black`}
                                                >
                                                    <option value="">나이</option>
                                                    {AGE_OPTIONS.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={applyForm.gender}
                                                    onChange={(e) => setApplyField('gender', e.target.value)}
                                                    aria-label="성별"
                                                    className={`${fieldClass} [&>option]:text-black`}
                                                >
                                                    <option value="">성별</option>
                                                    {GENDER_OPTIONS.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <input
                                                type="text"
                                                value={applyForm.region}
                                                onChange={(e) => setApplyField('region', e.target.value)}
                                                placeholder="거주지 (예: 중랑구 상봉동)"
                                                maxLength={60}
                                                aria-label="거주지"
                                                className={fieldClass}
                                            />
                                            <input
                                                type="tel"
                                                inputMode="numeric"
                                                value={applyForm.phone}
                                                onChange={(e) => setApplyField('phone', formatPhone(e.target.value))}
                                                placeholder="전화번호 (000-0000-0000)"
                                                aria-label="전화번호"
                                                className={fieldClass}
                                            />
                                            {/* 봇 방지용 숨김 입력: 사람은 채우지 않는다 */}
                                            <input
                                                type="text"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                aria-hidden="true"
                                                value={applyForm.website}
                                                onChange={(e) => setApplyField('website', e.target.value)}
                                                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                                            />
                                            {applyError && <p className="text-xs text-red-300">{applyError}</p>}
                                            <button
                                                type="submit"
                                                disabled={applying}
                                                className="w-full rounded-xl border border-white/40 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                                            >
                                                {applying ? '신청 중...' : '신청 완료'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

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
