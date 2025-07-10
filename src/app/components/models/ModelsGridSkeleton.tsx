import { ModelCardSkeleton } from "@/app/components/models/ModelCardSkeleton";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function ModelsGridSkeleton() {
    return (
        <section className="px-6 md:px-24 py-8 bg-background">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 max-w-7xl mx-auto">
                <div className="w-full md:w-auto mt-[31px] md:mt-0 flex justify-center md:flex-1">
                    <Skeleton height={50} width={250} className="mb-4" />
                </div>
                <div className="flex gap-2">
                    <Skeleton circle height={40} width={40} />
                    <Skeleton circle height={40} width={40} />
                    <Skeleton circle height={40} width={40} />
                </div>
                <Skeleton height={40} width={300} className="rounded-3xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {
                    Array.from({ length: 12 }).map((_, idx) => (
                        <ModelCardSkeleton key={idx} />
                    ))
                }
            </div>
        </section>
    )
}