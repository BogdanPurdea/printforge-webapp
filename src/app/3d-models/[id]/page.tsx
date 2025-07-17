import { ModelDetailPageProps } from "@/types/models/ModelDetailPageProps"
import { getModelById } from "@/lib/server/models"
import Pill from "@/app/components/shared/Pill"
import LikeButton from "@/app/components/shared/LikeButton";
import { notFound } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react";
import CommentList from "@/app/components/comments/CommentList";
import CommentsSkeleton from "@/app/components/comments/CommentsSkeleton";

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
    const { id } = await params;
    const model = await getModelById(id);

    if (!model) {
        notFound();
    }

    return (
        <>
            <section className="flex flex-col md:flex-row min-h-screen items-center justify-between px-4 py-8 md:p-20 gap-8">
                <Image
                    src={model.image}
                    alt={model.name}
                    width={500}
                    height={500}
                    className="w-full max-w-xs md:max-w-md mb-6 md:mb-0 md:mr-10 md:ml-10 rounded-lg shadow"
                />
                <div className="flex flex-col items-center md:items-start justify-start w-full max-w-md">
                    <div className="mt-4 flex items-center justify-center md:justify-start w-full gap-2">
                        <LikeButton modelId={model.id} />
                        <span className="text-sm text-gray-500 ml-1">{model.likes}</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 mt-4 text-center md:text-left">{model.name}</h1>
                    <Pill className="bg-blue-100 text-blue-800 mb-4">{model.category}</Pill>
                    <p className="text-base md:text-lg mb-4 mt-4 text-center md:text-left">{model.description}</p>
                    <p className="text-sm text-muted-foreground text-center md:text-left">Added on {new Date(model.dateAdded).toLocaleDateString()}</p>
                </div>
            </section>
            <section className="px-4 py-8 md:px-20">
                <Suspense fallback={<CommentsSkeleton />}>
                    <CommentList modelId={id} />
                </Suspense>
            </section>
        </>
    )
}