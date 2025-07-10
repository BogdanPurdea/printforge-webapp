'use client';

import { useErrorBoundary } from 'use-error-boundary';
import { ModelsGridErrorBoundaryProps } from '@/app/types/models/ModelsGridErrorBoundaryProps';

export default function ModelsGridErrorBoundary({ children, fallback }: ModelsGridErrorBoundaryProps) {
    const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary();

    if (didCatch) {
        if (fallback) return fallback;

        return (
            <section className="px-6 md:px-24 py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-4">
                        Unable to load 3D models
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {error?.message || "Something went wrong while loading the models grid."}
                    </p>
                    <button
                        onClick={reset}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return <ErrorBoundary>{children}</ErrorBoundary>;
}