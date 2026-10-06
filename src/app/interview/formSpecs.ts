import { ADULT_BASIC_FIELDS, ADULT_SECTIONS } from '@/app/interview/adultFormConfig';
import { COLLEGE_BASIC_FIELDS, COLLEGE_SECTIONS, type InterviewType } from '@/app/interview/collegeFormConfig';
import { INTERVIEW_QUESTIONS } from '@/app/interview/interviewFormConfig';

export function getFormSpec(type: InterviewType) {
    return type === 'college'
        ? { basicFields: COLLEGE_BASIC_FIELDS, sections: COLLEGE_SECTIONS }
        : { basicFields: ADULT_BASIC_FIELDS, sections: ADULT_SECTIONS };
}

type LayoutSource = {
    interview_type?: 'adult' | 'college' | 'legacy';
    answers?: Record<string, unknown> | null;
} & Record<string, unknown>;

/** 구 인터뷰지(q1~q12 고정 질문) 레이아웃으로 보여줘야 하는 행인지 */
export function usesLegacyLayout(interview: LayoutSource): boolean {
    if (interview.interview_type === 'legacy') return true;
    if (interview.interview_type === 'college') return false;
    const hasNewAnswers = Object.keys(interview.answers ?? {}).length > 0;
    const hasOldAnswers = INTERVIEW_QUESTIONS.some((q) => {
        const value = interview[q.name];
        return typeof value === 'string' && value.trim() !== '';
    });
    return !hasNewAnswers && hasOldAnswers;
}
