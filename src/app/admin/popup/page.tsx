'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
    getAdminPopupConfig,
    updateAdminPopupConfig,
    uploadAdminPopupImage,
    type HomePopupConfig,
} from '@/app/api/supabaseApi';
import { useAuth } from '@/app/context/AuthContext';
import { brandColor } from '@/lib/brandcolor';

const EMPTY_CONFIG: HomePopupConfig = {
    title: '',
    description: [],
    image_url: null,
    is_active: false,
};

export default function AdminPopupPage() {
    const { isAuthenticated, role } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [config, setConfig] = useState<HomePopupConfig>(EMPTY_CONFIG);
    const [descriptionText, setDescriptionText] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated || role !== 'admin' || loaded) return;

        (async () => {
            const { data, error: fetchError } = await getAdminPopupConfig();
            if (fetchError) {
                setError(fetchError.message);
            } else if (data) {
                setConfig(data);
                setDescriptionText(data.description.join('\n'));
            }
            setLoaded(true);
        })();
    }, [isAuthenticated, role, loaded]);

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);
        const { url, error: uploadError } = await uploadAdminPopupImage(file);
        setUploading(false);

        if (uploadError || !url) {
            setError(uploadError?.message ?? '이미지 업로드에 실패했습니다.');
            return;
        }

        setConfig((prev) => ({ ...prev, image_url: url }));
        setMessage('이미지를 업로드했습니다. 저장 버튼을 눌러야 반영됩니다.');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setMessage(null);

        const description = descriptionText
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        const { data, error: saveError } = await updateAdminPopupConfig({
            title: config.title,
            description,
            image_url: config.image_url,
            is_active: config.is_active,
        });

        setSaving(false);

        if (saveError) {
            setError(saveError.message);
            return;
        }

        if (data) {
            setConfig(data);
            setDescriptionText(data.description.join('\n'));
        }
        setMessage('저장했습니다.');
    };

    if (!isAuthenticated || role !== 'admin') {
        return null;
    }

    const inputStyle = {
        border: `1px solid ${brandColor.deepmoss}`,
        color: brandColor.deepmoss,
        backgroundColor: '#fff',
    };

    return (
        <main className="p-8 max-w-3xl mx-auto min-h-screen text-deepmoss">
            <div className="flex items-center justify-between mb-8 pb-2 border-b-4" style={{ borderColor: brandColor.orangeish }}>
                <h1 className="text-4xl font-extrabold">팝업 관리</h1>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium hover:underline" style={{ color: brandColor.deepmoss }}>
                        홈으로
                    </Link>
                    <Link href="/admin" className="text-sm font-medium hover:underline" style={{ color: brandColor.deepmoss }}>
                        ← 관리자 홈으로
                    </Link>
                </div>
            </div>

            {!loaded ? (
                <p className="text-gray-400">불러오는 중...</p>
            ) : (
                <div className="flex flex-col gap-6">
                    <section className="flex items-center justify-between rounded-lg border p-5" style={{ borderColor: brandColor.deepmoss }}>
                        <div>
                            <p className="font-semibold">팝업 노출</p>
                            <p className="text-sm text-gray-500">
                                {config.is_active ? '현재 홈페이지에 팝업이 표시됩니다.' : '현재 홈페이지에 팝업이 숨겨져 있습니다.'}
                            </p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={config.is_active}
                            onClick={() => setConfig((prev) => ({ ...prev, is_active: !prev.is_active }))}
                            className="relative h-8 w-14 rounded-full transition-colors"
                            style={{ backgroundColor: config.is_active ? brandColor.deepmoss : '#d1d5db' }}
                        >
                            <span
                                className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform"
                                style={{ transform: config.is_active ? 'translateX(24px)' : 'translateX(0)' }}
                            />
                        </button>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">팝업 제목</label>
                        <input
                            type="text"
                            value={config.title}
                            onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="예: 취'향'저격"
                            className="px-4 py-2.5 rounded-lg shadow-sm focus:outline-none"
                            style={inputStyle}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">팝업 문구 (줄바꿈으로 여러 줄 입력)</label>
                        <textarea
                            value={descriptionText}
                            onChange={(e) => setDescriptionText(e.target.value)}
                            placeholder={'예: 향으로 알아보는\n나만의 성향과 방향성'}
                            rows={4}
                            className="px-4 py-2.5 rounded-lg shadow-sm focus:outline-none resize-y"
                            style={inputStyle}
                        />
                    </section>

                    <section className="flex flex-col gap-3">
                        <label className="font-semibold text-sm">팝업 이미지</label>
                        {config.image_url && (
                            <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-lg overflow-hidden border" style={{ borderColor: brandColor.deepmoss }}>
                                <Image src={config.image_url} alt="팝업 이미지 미리보기" fill className="object-contain bg-neutral-900" />
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            onChange={handleImageSelect}
                            disabled={uploading}
                            className="text-sm"
                        />
                        {uploading && <p className="text-sm text-gray-500">업로드 중...</p>}
                    </section>

                    {error && (
                        <p className="text-sm" style={{ color: brandColor.orangeish }}>
                            {error}
                        </p>
                    )}
                    {message && !error && <p className="text-sm text-green-600">{message}</p>}

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || uploading}
                        className="self-start px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
                        style={{ backgroundColor: brandColor.deepmoss, color: '#fff', border: '2px solid transparent' }}
                    >
                        {saving ? '저장 중...' : '저장'}
                    </button>
                </div>
            )}
        </main>
    );
}
