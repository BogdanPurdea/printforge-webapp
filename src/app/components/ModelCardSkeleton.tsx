import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export function ModelCardSkeleton() {
    return (
        <div className="h-92 w-full bg-card shadow rounded-lg p-4">
            <Skeleton height={192} className="w-full rounded-t-lg " /> {/* image */}
            <Skeleton height={28} width="60%" className="mt-4" /> {/* title */}
            <Skeleton count={2} className="mt-2" /> {/* description */}
            <div className="mt-4 flex items-center justify-between">
                <Skeleton width={60} height={24} />
                <Skeleton width={80} />
            </div>
        </div>
    )
}