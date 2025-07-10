import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ModelDetailSkeleton() {
    return (
        <section className="flex flex-col md:flex-row min-h-screen items-center justify-between px-4 py-8 md:p-20 gap-8 bg-background">
            {/* Image Skeleton */}
            <div className="w-full max-w-xs md:max-w-md mb-6 md:mb-0 md:mr-10 md:ml-10">
                <Skeleton height={400} className="rounded-lg shadow" />
            </div>

            {/* Details Skeleton */}
            <div className="flex flex-col items-center md:items-start justify-start w-full max-w-md">
                {/* Likes Skeleton */}
                <div className="mt-4 flex items-center justify-center md:justify-start w-full gap-2">
                    <Skeleton circle width={28} height={28} />
                    <Skeleton width={50} height={20} />
                </div>

                {/* Title Skeleton */}
                <div className="mt-4 w-full">
                    <Skeleton height={40} width={`80%`} />
                </div>

                {/* Pill Skeleton */}
                <div className="mt-4">
                    <Skeleton width={100} height={28} borderRadius={999} />
                </div>

                {/* Description Skeleton */}
                <div className="mt-6 w-full">
                    <Skeleton count={4} />
                </div>

                {/* Date Skeleton */}
                <div className="mt-4">
                    <Skeleton width={150} height={20} />
                </div>
            </div>
        </section>
    );
}
