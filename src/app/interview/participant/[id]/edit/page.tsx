'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getGenieInterviewById, type GenieInterview } from '@/app/api/supabaseApi';
import { InterviewForm } from '@/app/interview/InterviewForm';
import { brandColor } from '@/lib/brandcolor';

export default function EditInterviewPage() {
    const params = useParams();
    const router = useRouter();
    const [interview, setInterview] = useState<GenieInterview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    useEffect(() => {
        if (!id) return;

        const fetchInterview = async () => {
            const { data, error: fetchError } = await getGenieInterviewById(id);
            if (fetchError) {
                setError(fetchError.message ?? '인터뷰를 불러오지 못했습니다.');
            } else if (!data) {
                setError('인터뷰를 찾을 수 없습니다.');
            } else {
                setInterview(data);
            }
            setLoading(false);
        };

        fetchInterview();
    }, [id]);

    if (loading) {
        return <main className="p-8 max-w-3xl mx-auto text-deepmoss">불러오는 중...</main>;
    }

    if (error || !interview || !id) {
        return (
            <main className="p-8 max-w-3xl mx-auto text-deepmoss">
                <p className="mb-4">{error ?? '데이터가 없습니다.'}</p>
                <button
                    onClick={() => router.push('/interview')}
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: brandColor.deepmoss }}
                >
                    목록으로
                </button>
            </main>
        );
    }

    return <InterviewForm mode="edit" interviewId={id} initialInterview={interview} />;
}
