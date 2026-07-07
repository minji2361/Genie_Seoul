import React from 'react';

// Question 인터페이스 수정: num이 숫자와 문자열 모두 가능하게 합니다.
interface Question {
    id: string;
    num: string | number;
    text: string;
    scoreIncluded?: boolean;
}

interface AnswerDetailsProps {
    allAnswers: Record<string, number>;
    questions: Question[];
    hideNonScored?: boolean;
}

const AnswerDetails: React.FC<AnswerDetailsProps> = ({ allAnswers, questions, hideNonScored = false }) => {
    // 5점 척도(애착유형 등)를 고려하여 텍스트 매핑 수정
    const scoreToText = (score?: number) => {
        switch (score) {
            case 5:
                return '매우 그렇다';
            case 4:
                return '대체로 그렇다';
            case 3:
                return '보통이다';
            case 2:
                return '그렇지 않다';
            case 1:
                return '전혀 그렇지 않다';
            default:
                return '미응답';
        }
    };

    const scoreToColorClass = (score?: number) => {
        if (score === 4 || score === 5) return 'text-green-700 font-bold';
        if (score === 3) return 'text-blue-700';
        if (score === 2) return 'text-orange-700';
        if (score === 1) return 'text-red-700 font-bold';
        return 'text-gray-500';
    };

    const filteredQuestions = hideNonScored
        ? questions.filter((q) => q.scoreIncluded !== false && String(q.num) !== '※')
        : questions;

    return (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">상세 답변 내역</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 w-16">번호</th>
                            <th className="border border-gray-300 px-4 py-2 text-left w-3/5">문항</th>
                            <th className="border border-gray-300 px-4 py-2 w-40">나의 선택</th>
                            <th className="border border-gray-300 px-4 py-2 w-28">채점 포함</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuestions.map((question) => {
                            const answerValue = allAnswers[question.id];
                            const selectedText = scoreToText(answerValue);
                            const textColorClass = scoreToColorClass(answerValue);
                            // num이 숫자일 경우를 대비해 String()으로 감싸서 체크
                            const isScored = question.scoreIncluded !== false && String(question.num) !== '※';

                            return (
                                <tr
                                    key={question.id}
                                    className="border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="border border-gray-300 px-4 py-2 text-sm font-medium">
                                        {question.num}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-left text-gray-800 text-sm whitespace-normal break-words">
                                        {question.text}
                                    </td>
                                    <td className={`border border-gray-300 px-4 py-2 text-sm ${textColorClass}`}>
                                        {selectedText}
                                        {typeof answerValue === 'number' && (
                                            <span className="ml-2 text-xs text-gray-400">({answerValue}점)</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                        {isScored ? (
                                            <span className="text-blue-600 font-medium">포함</span>
                                        ) : (
                                            <span className="text-gray-400">제외</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnswerDetails;
