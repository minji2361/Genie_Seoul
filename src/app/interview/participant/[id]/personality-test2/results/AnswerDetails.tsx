import React from 'react';

interface Question {
    id: string;
    num: string;
    text: string;
    scoreIncluded?: boolean;
}

interface AnswerDetailsProps {
    allAnswers: Record<string, number>;
    questions: Question[];
    hideNonScored?: boolean; // true면 ※ 문항 숨김
}

const AnswerDetails: React.FC<AnswerDetailsProps> = ({ allAnswers, questions, hideNonScored = false }) => {
    const scoreToText = (score?: number) => {
        switch (score) {
            case 4:
                return '매우 그렇다';
            case 3:
                return '그렇다';
            case 2:
                return '아니다';
            case 1:
                return '전혀 아니다';
            default:
                return '미응답';
        }
    };

    const scoreToColorClass = (score?: number) => {
        switch (score) {
            case 4:
                return 'text-green-700 font-bold';
            case 3:
                return 'text-blue-700';
            case 2:
                return 'text-orange-700';
            case 1:
                return 'text-red-700 font-bold';
            default:
                return 'text-gray-500';
        }
    };

    const filteredQuestions = hideNonScored
        ? questions.filter((q) => q.scoreIncluded !== false && q.num !== '※')
        : questions;

    return (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">내가 선택한 모든 답변</h2>

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
                            const isScored = question.scoreIncluded !== false && question.num !== '※';

                            return (
                                <tr
                                    key={question.id}
                                    className="border border-gray-300"
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
                                            <span className="ml-2 text-xs text-gray-500">({answerValue}점)</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                        {isScored ? (
                                            <span className="text-blue-700 font-medium">포함</span>
                                        ) : (
                                            <span className="text-gray-500">제외</span>
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
