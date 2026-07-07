'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';

export default function FourTypeResultsPage() {
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
                    .from('fourtypes')
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
        <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-3xl shadow-lg space-y-10">
            <h1 className="text-4xl font-extrabold text-center text-indigo-700">4도형 검사 결과</h1>

            {imageUrl ? (
                <div className="w-full flex justify-center">
                    <div className="relative w-full aspect-[1/1.414] max-w-3xl bg-gray-50 rounded-2xl border border-indigo-200 shadow-xl overflow-hidden">
                        <Image src={imageUrl} alt="4도형 이미지" fill className="object-contain" priority />
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-400 italic">이미지 결과가 없습니다.</p>
            )}

            <div className="text-center">
                <button
                    onClick={() => router.back()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md transition duration-300"
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}
