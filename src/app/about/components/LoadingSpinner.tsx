// components/LoadingSpinner.tsx
export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 px-4">
            <svg
                className="animate-spin h-12 w-12 text-neutral-700 mb-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p className="text-lg text-neutral-700 font-semibold">권한 확인 중입니다...</p>
        </div>
    );
}
