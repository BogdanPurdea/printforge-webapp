"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LikeButtonProps } from "../types/LikeButtonProps";

export default function LikeButton({ isLiked, onClick }: LikeButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1 text-gray-500 hover:text-orange-accent transition-colors"
            aria-label={isLiked ? "Unlike this model" : "Like this model"}
        >
            {isLiked ? (
                <FaHeart className="w-5 h-5 text-primary" />
            ) : (
                <FaRegHeart className="w-5 h-5" />
            )}
        </button>
    );
}