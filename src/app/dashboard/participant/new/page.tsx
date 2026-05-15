'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import SignaturePad from 'signature_pad';
import { uploadSignature, addNewParticipant } from '@/app/api/supabaseApi';
import { supabase } from '@/app/lib/supabase';
import * as htmlToImage from 'html-to-image';

export default function NewParticipantPage() {
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [agreed, setAgreed] = useState(false);
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        birth_date: '',
        stress: '',
        religion: '',
    });

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const signaturePadRef = useRef<SignaturePad | null>(null);
    const agreementRef = useRef<HTMLDivElement | null>(null);
    const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ratio = window.devicePixelRatio || 1;
        const width = 300;
        const height = 150;

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(ratio, ratio);

        signaturePadRef.current = new SignaturePad(canvas, {
            penColor: 'black',
            backgroundColor: 'white',
            minWidth: 1,
            maxWidth: 2.5,
        });

        const preventDefault = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
        };

        canvas.addEventListener('touchstart', preventDefault, { passive: false });
        canvas.addEventListener('touchmove', preventDefault, { passive: false });

        return () => {
            canvas.removeEventListener('touchstart', preventDefault);
            canvas.removeEventListener('touchmove', preventDefault);
        };
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAgreementSubmit = async () => {
        if (!agreed || !signaturePadRef.current || signaturePadRef.current.isEmpty()) {
            alert('보안 각서에 동의하고 서명해주세요.');
            return;
        }

        try {
            const node = agreementRef.current;
            if (!node) {
                alert('약속서 캡처에 실패했습니다.');
                return;
            }

            // 서약서 전체 이미지로 캡처
            const dataUrl = await htmlToImage.toPng(node);
            setSignatureData(dataUrl);
            setStep(2);
        } catch (err) {
            console.error('html-to-image error:', err);
            alert('서약서 이미지 생성 중 오류 발생');
        }
    };

    const handleSubmit = async () => {
        const { name, birth_date, stress, religion } = form;
        if (!name || !birth_date || !stress || !religion || !signatureData) {
            alert('모든 필드를 작성해주세요.');
            return;
        }

        setLoading(true);

        const fileName = `agreement-full-${Date.now()}.png`;
        const { url: signatureurl, error: uploadError } = await uploadSignature(signatureData, fileName);

        if (uploadError || !signatureurl) {
            const message =
                uploadError && typeof uploadError === 'object' && 'message' in uploadError
                    ? String(uploadError.message)
                    : '서명 업로드에 실패했습니다.';
            alert(message);
            setLoading(false);
            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { error } = await addNewParticipant({
            name,
            birth_date,
            stress,
            religion,
            signatureurl,
            counselorId: user?.id ?? '',
        });

        setLoading(false);

        if (error) {
            alert('등록 중 오류 발생');
        } else {
            alert('등록 완료되었습니다.');
            router.push('/dashboard');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto min-h-screen">
            {step === 1 && (
                <>
                    <div
                        ref={agreementRef}
                        className="border rounded-lg p-10 bg-white text-sm text-gray-800 space-y-6 shadow-lg font-serif w-full max-w-[600px] mx-auto"
                    >
                        <h2 className="text-2xl font-bold text-center underline mb-6 tracking-wide">
                            비밀 유지 서약서
                        </h2>
                        <p>본인은 아래의 조항을 충분히 이해하고 이에 동의하며 서명합니다.</p>
                        <ol className="space-y-3 list-decimal list-inside leading-relaxed">
                            <li>
                                <strong>계약 목적</strong>: 상담사는 내담자의 동의 없이는 상담 내용을 외부에 공개하지
                                않습니다.
                            </li>
                            <li>
                                <strong>영업 비밀 정보</strong>: 교육, 연구, 평가 중 알게 된 비밀 정보는 외부에 유출하지
                                않습니다.
                            </li>
                            <li>
                                <strong>보유 정보 사용 제한</strong>: 내담자 연구 시에는 참여 거부나 중단 시 해로운
                                결과가 없도록 보호합니다.
                            </li>
                            <li>
                                <strong>비밀 유지 기간</strong>: 본 프로그램의 내용을 외부에 누설하지 않으며, 저작권
                                침해 시 법적 책임을 집니다.
                            </li>
                        </ol>

                        <label className="inline-flex items-center pt-4">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                                className="hidden peer"
                            />
                            <div className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-sm flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600">
                                <svg
                                    className="w-3 h-3 text-white hidden peer-checked:block"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <span>상기 내용을 충분히 읽고 이해하였으며 이에 동의합니다.</span>
                        </label>

                        <p className="pt-4 text-sm">
                            작성일: <strong>{today}</strong>
                        </p>

                        <div className="pt-6">
                            <p className="text-sm mb-1">서명:</p>
                            <canvas
                                ref={canvasRef}
                                className="border rounded bg-white touch-none w-[300px] h-[150px]"
                                style={{ touchAction: 'none' }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAgreementSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mt-6"
                    >
                        서약서 동의 및 다음
                    </button>
                </>
            )}

            {step === 2 && (
                <div className="bg-white  p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">상담 대상자 정보</h3>
                    <div className="grid gap-5 mb-6 md:grid-cols-2">
                        {[
                            { name: 'name', label: '이름', placeholder: '이름을 입력하세요', type: 'text' },
                            { name: 'birth_date', label: '생년월일', placeholder: '', type: 'date' },
                            { name: 'stress', label: '스트레스요인', placeholder: '인간관계', type: 'text' },
                            { name: 'religion', label: '사는곳(동)', placeholder: '광진구 자양동', type: 'text' },
                        ].map(({ name, label, placeholder, type }) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {label}
                                </label>
                                <input
                                    id={name}
                                    name={name}
                                    type={type}
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md text-sm font-semibold disabled:bg-gray-400"
                    >
                        {loading ? '등록 중...' : '참여자 등록'}
                    </button>
                </div>
            )}
        </div>
    );
}
