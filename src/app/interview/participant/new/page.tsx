'use client';

import { useState } from 'react';
import { InterviewForm } from '@/app/interview/InterviewForm';
import { INTERVIEW_TYPE_LABEL, type InterviewType } from '@/app/interview/collegeFormConfig';
import { brandColor } from '@/lib/brandcolor';

const TYPE_DESCRIPTION: Record<InterviewType, string> = {
    adult: '지니 QnA 12문항 + 관심사 조사',
    college: '20대 초반 대학생용 인터뷰지 + 관심사 조사',
};

export default function NewInterviewPage() {
    const [interviewType, setInterviewType] = useState<InterviewType | null>(null);

    if (interviewType) {
        return <InterviewForm mode="create" interviewType={interviewType} />;
    }

    return (
        <main className="p-6 max-w-2xl mx-auto min-h-screen text-deepmoss">
            <h1 className="text-2xl font-bold mb-2">인터뷰 유형 선택</h1>
            <p className="text-sm text-gray-500 mb-6">대상자에 맞는 인터뷰지를 선택해 주세요.</p>
            <div className="grid gap-4 sm:grid-cols-2">
                {(Object.keys(INTERVIEW_TYPE_LABEL) as InterviewType[]).map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setInterviewType(type)}
                        className="rounded-lg border-2 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
                        style={{ borderColor: brandColor.deepmoss }}
                    >
                        <p className="text-lg font-bold">{INTERVIEW_TYPE_LABEL[type]}</p>
                        <p className="mt-1 text-sm text-gray-500">{TYPE_DESCRIPTION[type]}</p>
                    </button>
                ))}
            </div>
        </main>
    );
}
