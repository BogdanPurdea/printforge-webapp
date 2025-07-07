"use client"

import Link from "next/link"
import Pill from "./Pill"
import { ModelCardProps } from "../types/ModelCardProps"
import { useLikes } from "../hooks/useLikes"
import LikeButton from "./LikeButton"

export default function ModelCard({ model, onLikeChange }: ModelCardProps) {
    const { isLiked, toggleLike } = useLikes();

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the link from navigating
        e.stopPropagation(); // Stop the event from bubbling up
        // Determine current status BEFORE toggling
        const wasLiked = isLiked(model.id);

        toggleLike(model.id); // This updates the state

        // If it was liked, it means it's now unliked, so trigger the parent update
        if (onLikeChange && wasLiked) {
            onLikeChange(model.id);
        }
    };

    return (
        <div className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden h-full flex flex-col">
            <Link href={`/3d-models/${model.id}`} className="block" aria-labelledby={`model-${model.id}-title`}>
                <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/3d-models/${model.id}`} className="block" aria-labelledby={`model-${model.id}-title`}>
                    <h2 id={`model-${model.id}-title`} className="text-lg font-semibold mb-2 text-gray-900 hover:text-orange-accent transition-colors">{model.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{model.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <Pill>{model.category}</Pill>
                    <div className="flex items-center gap-2">
                        <LikeButton
                            isLiked={isLiked(model.id)}
                            onClick={handleLikeClick}
                        />
                        <span className="text-sm text-muted-foreground">{model.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}