interface Drawbox {
    setIsErasing: (value: boolean) => void;
    isErasing: boolean;
    handleClear: () => void;
    handleSave: () => void;
    lineColor: string;
    setLineColor: (value: string) => void;
    eraserSize: number;
    setEraserSize: (value: number) => void;
}

export default function Drawbox({
    setIsErasing,
    isErasing,
    handleClear,
    handleSave,
    lineColor,
    setLineColor,
    eraserSize,
    setEraserSize,
}: Drawbox) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 p-4 shadow-sm bg-white rounded-xl">
            <button
                onClick={() => setIsErasing(false)}
                className={`px-4 py-2 rounded-md border text-sm transition ${
                    !isErasing ? 'border-gray-800 font-semibold' : 'border-gray-300 text-gray-600'
                }`}
            >
                ✏️ 그리기
            </button>

            <button
                onClick={() => setIsErasing(true)}
                className={`px-4 py-2 rounded-md border text-sm transition ${
                    isErasing ? 'border-gray-800 font-semibold' : 'border-gray-300 text-gray-600'
                }`}
            >
                🧽 지우개
            </button>

            <button
                onClick={handleClear}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
                🗑 전체 지우기
            </button>

            <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
                💾 저장
            </button>

            <div className="w-[240px] h-[40px] flex items-center justify-start">
                {!isErasing ? (
                    <label className="flex items-center gap-2 text-sm text-gray-700 w-full">
                        🎨 선 색상
                        <input
                            type="color"
                            value={lineColor}
                            onChange={(e) => setLineColor(e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                        />
                    </label>
                ) : (
                    <label className="flex items-center gap-2 text-sm text-gray-700 w-full">
                        🔧 크기
                        <input
                            type="range"
                            min={5}
                            max={50}
                            value={eraserSize}
                            onChange={(e) => setEraserSize(Number(e.target.value))}
                            className="w-full accent-gray-700"
                        />
                        <span className="whitespace-nowrap">{eraserSize}px</span>
                    </label>
                )}
            </div>
        </div>
    );
}
