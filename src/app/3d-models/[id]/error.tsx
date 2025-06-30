'use client'

import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}){
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Error in 3D model page:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
            <p className="text-gray-700 mb-4">{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Try again
            </button>
        </div>
    )
}