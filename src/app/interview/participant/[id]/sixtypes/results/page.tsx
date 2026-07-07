'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';

export default function SixTypeResultsPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            const id = params?.id as string;
            if (!id) return;

            try {
                const { data, error } = await supabase
                    .from('sixtypes')
                    .select('*')
                    .eq('participant_id', id)
                    .maybeSingle();

                if (error) throw error;
                if (!data) {
                    setError('검사 결과가 없습니다.');
                    return;
                }

                setImageUrl(data.image_url);
            } catch (err) {
                console.error(err);
                setError('결과를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [params]);

    if (loading) return <p className="text-center mt-10 text-gray-600">⏳ 결과 불러오는 중...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-6">
            <h1 className="text-3xl font-bold text-center text-indigo-700">6도형 검사 결과</h1>

            {imageUrl && (
                <div className="w-full flex justify-center">
                    <Image src={imageUrl} alt="6도형 이미지" fill className="rounded-xl object-contain border shadow" />
                </div>
            )}

            <div className="text-center pt-6">
                <button
                    onClick={() => router.back()}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-xl transition"
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}
