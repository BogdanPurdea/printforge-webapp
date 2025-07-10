"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LikeButtonProps } from "@/app/types/ui/LikeButtonProps";
import { useLikes } from "@/app/hooks/useLikes";

export default function LikeButton({ modelId }: LikeButtonProps) {
    const { isLiked, toggleLike } = useLikes();

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleLike(modelId);
    };
    return (
        <button
            onClick={handleLikeClick}
            className="flex items-center gap-1 text-gray-500 hover:text-orange-accent transition-colors"
            aria-label={isLiked(modelId) ? "Unlike this model" : "Like this model"}
        >
            {isLiked(modelId) ? (
                <FaHeart className="w-5 h-5 text-primary" />
            ) : (
                <FaRegHeart className="w-5 h-5" />
            )}
        </button>
    );
}