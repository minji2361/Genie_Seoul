'use client';

import { COLLEGE_SECTIONS, type CollegeAnswers, type CollegeField, type CollegeSection } from '@/app/interview/collegeFormConfig';
import { textAreaClass } from '@/app/interview/interviewFormConfig';

type CollegeQuestionsProps = {
    answers: CollegeAnswers;
    onChange?: (next: CollegeAnswers) => void;
    readOnly?: boolean;
    sections?: readonly CollegeSection[];
};

const readOnlyClass = `${textAreaClass} bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none resize-none`;

export function CollegeQuestions({ answers, onChange, readOnly = false, sections = COLLEGE_SECTIONS }: CollegeQuestionsProps) {
    const setValue = (name: string, value: string | string[]) => {
        onChange?.({ ...answers, [name]: value });
    };

    const renderField = (field: CollegeField) => {
        const raw = answers[field.name];
        const selected = Array.isArray(raw) ? raw : raw ? [raw] : [];
        const etcValue = typeof answers[`${field.name}_etc`] === 'string' ? (answers[`${field.name}_etc`] as string) : '';

        return (
            <div key={field.name}>
                <p className="block text-sm font-medium text-gray-700 mb-1">{field.label}</p>
                {field.hint && <p className="text-xs text-gray-500 mb-2">{field.hint}</p>}

                {field.kind === 'textarea' && (
                    <textarea
                        rows={3}
                        value={typeof raw === 'string' ? raw : ''}
                        placeholder={field.placeholder}
                        readOnly={readOnly}
                        tabIndex={readOnly ? -1 : undefined}
                        onChange={(e) => setValue(field.name, e.target.value)}
                        className={readOnly ? readOnlyClass : textAreaClass}
                    />
                )}

                {field.kind !== 'textarea' && (
                    <div className="space-y-2">
                        {field.options?.map((opt) => {
                            const checked = selected.includes(opt);
                            return (
                                <label
                                    key={opt}
                                    className={`flex items-start gap-2 ${readOnly ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <input
                                        type={field.kind === 'radio' ? 'radio' : 'checkbox'}
                                        name={field.name}
                                        checked={checked}
                                        disabled={readOnly}
                                        onChange={() => {
                                            if (field.kind === 'radio') {
                                                onChange?.({
                                                    ...answers,
                                                    [field.name]: opt,
                                                    ...(opt !== '기타' && field.etc ? { [`${field.name}_etc`]: '' } : {}),
                                                });
                                            } else {
                                                setValue(
                                                    field.name,
                                                    checked ? selected.filter((v) => v !== opt) : [...selected, opt],
                                                );
                                            }
                                        }}
                                        className="w-4 h-4 mt-1"
                                    />
                                    <span className={readOnly && !checked ? 'text-gray-400' : 'text-gray-800'}>{opt}</span>
                                </label>
                            );
                        })}
                        {field.etc && selected.includes('기타') && (
                            <input
                                type="text"
                                value={etcValue}
                                readOnly={readOnly}
                                placeholder="기타 내용"
                                onChange={(e) => setValue(`${field.name}_etc`, e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-8 mb-8">
            {sections.map((section) => (
                <section key={section.title} className="space-y-5">
                    <h4 className="text-base font-bold text-gray-800 border-b border-gray-200 pb-1">{section.title}</h4>
                    {section.note && (
                        <p className="text-sm leading-6 text-gray-600 bg-gray-50 rounded-md p-3">{section.note}</p>
                    )}
                    {section.fields.map(renderField)}
                </section>
            ))}
        </div>
    );
}
