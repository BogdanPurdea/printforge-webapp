'use client'

import { ModelDetailPageProps } from "@/app/types/ModelDetailPageProps"
import { getModelById } from "@/app/lib/models"
import Pill from "@/app/components/Pill"
import LikeButton from "@/app/components/LikeButton"
import { useLikes } from "@/app/hooks/useLikes"
import { useEffect, useState, use } from "react"
import { Model } from "@/app/types/Model"
import ModelDetailSkeleton from '@/app/components/ModelDetailSkeleton';

export default function ModelDetailPage({ params }: ModelDetailPageProps) {
    const { id } = use(params);
    const [model, setModel] = useState<Model | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { isLiked, toggleLike } = useLikes();

    useEffect(() => {
        const fetchModelDetails = async () => {
            try {
                const modelDetails = await getModelById(id);
                setModel(modelDetails);
            } catch (err) {
                console.error('Error fetching model details:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };

        fetchModelDetails();
    }, [id]);

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (model) {
            toggleLike(model.id);
        }
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
                <h2 className="text-2xl font-bold text-red-600">Failed to load model</h2>
                <p className="text-foreground text-base md:text-lg mt-6 text-center md:text-left">{error}</p>
            </div>
        );
    }

    if (!model) {
        return <ModelDetailSkeleton />;
    }

    return (
        <section className="flex flex-col md:flex-row min-h-screen items-center justify-between px-4 py-8 md:p-20 gap-8">
            <img
                src={model.image}
                alt={model.name}
                className="w-full max-w-xs md:max-w-md mb-6 md:mb-0 md:mr-10 md:ml-10 rounded-lg shadow"
            />
            <div className="flex flex-col items-center md:items-start justify-start w-full max-w-md">
                <div className="mt-4 flex items-center justify-center md:justify-start w-full gap-2">
                    <LikeButton isLiked={isLiked(model.id)} onClick={handleLikeClick} />
                    <span className="text-sm text-gray-500 ml-1">{model.likes}</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-4 mt-4 text-center md:text-left">{model.name}</h1>
                <Pill className="bg-blue-100 text-blue-800 mb-4">{model.category}</Pill>
                <p className="text-base md:text-lg mb-4 mt-4 text-center md:text-left">{model.description}</p>
                <p className="text-sm text-muted-foreground text-center md:text-left">Added on {new Date(model.dateAdded).toLocaleDateString()}</p>
            </div>
        </section>
    )
}