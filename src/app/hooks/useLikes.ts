'use client'

import { useState, useEffect, useCallback } from 'react';
import { getLikesFromStorage, saveLikesToStorage } from '@/app/lib/likes';

export function useLikes() {
    const [likes, setLikes] = useState<number[]>([]);

    useEffect(() => {
        setLikes(getLikesFromStorage());
    }, []);

    const toggleLike = useCallback((modelId: number) => {
        setLikes(currentLikes => {
            const newLikes = currentLikes.includes(modelId)
                ? currentLikes.filter(id => id !== modelId)
                : [...currentLikes, modelId];
            saveLikesToStorage(newLikes);
            return newLikes;
        });
    }, []);

    const isLiked = useCallback((modelId: number) => {
        return likes.includes(modelId);
    }, [likes]);

    return { likes, toggleLike, isLiked }
}