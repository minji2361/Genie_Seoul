import { ADULT_BASIC_FIELDS, ADULT_SECTIONS } from '@/app/interview/adultFormConfig';
import { COLLEGE_BASIC_FIELDS, COLLEGE_SECTIONS } from '@/app/interview/collegeFormConfig';
import { LIFESTYLE_BASIC_FIELDS, LIFESTYLE_SECTIONS } from '@/app/interview/lifestyleFormConfig';

/** DB 저장값: 'current' = 인터뷰지(통합 양식), 'legacy' = 인터뷰지(구) */
export type StoredInterviewType = 'current' | 'legacy';

/** 화면에 그릴 양식: current(통합), adult/college(구 성인/대학생), q12(구 q1~q12 고정 질문) */
export type FormKind = 'current' | 'adult' | 'college' | 'q12';

export const STORED_TYPE_LABEL: Record<StoredInterviewType, string> = {
    current: '인터뷰지',
    legacy: '인터뷰지(구)',
};

type KindSource = {
    interview_type?: StoredInterviewType | null;
    legacy_form?: 'adult' | 'college' | 'q12' | null;
};

export function storedTypeOf(interview: KindSource): StoredInterviewType {
    return interview.interview_type === 'current' ? 'current' : 'legacy';
}

export function getFormKind(interview?: KindSource | null): FormKind {
    if (!interview || interview.interview_type === 'current') return 'current';
    return interview.legacy_form ?? 'q12';
}

export function getFormSpec(kind: Exclude<FormKind, 'q12'>) {
    if (kind === 'college') return { basicFields: COLLEGE_BASIC_FIELDS, sections: COLLEGE_SECTIONS };
    if (kind === 'adult') return { basicFields: ADULT_BASIC_FIELDS, sections: ADULT_SECTIONS };
    return { basicFields: LIFESTYLE_BASIC_FIELDS, sections: LIFESTYLE_SECTIONS };
}
